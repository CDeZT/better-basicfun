import assert from 'node:assert/strict'
import test from 'node:test'
import {
  cliProxyCatalogUrl,
  fetchCliProxyCatalog,
  installCliProxyBridge,
  mergeCliProxyModels,
  modelFromCliProxy,
  parseCliProxyCatalog,
  reasoningEffortsFromCliProxy,
  syncCliProxyProviders,
} from '../lib/cliproxyapi-bridge.js'

async function eventually(predicate, message) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (predicate()) return
    await new Promise((resolve) => setImmediate(resolve))
  }
  assert.fail(message)
}

test('catalog URL keeps deployment paths and adds the rich pi query', () => {
  assert.equal(
    cliProxyCatalogUrl('http://127.0.0.1:8317/v1/'),
    'http://127.0.0.1:8317/v1/models?client_version=pi',
  )
  assert.equal(
    cliProxyCatalogUrl('https://gateway.example/team/openai/v1'),
    'https://gateway.example/team/openai/v1/models?client_version=pi',
  )
  assert.equal(
    cliProxyCatalogUrl('https://gateway.example'),
    'https://gateway.example/v1/models?client_version=pi',
  )
  assert.equal(
    cliProxyCatalogUrl('https://gateway.example/team/backend-api/'),
    'https://gateway.example/team/v1/models?client_version=pi',
  )
})

test('reasoning levels map into DSH names without inventing unsupported positions', () => {
  assert.deepEqual(reasoningEffortsFromCliProxy([
    { effort: 'none' },
    { effort: 'low' },
    { effort: 'high' },
  ]), { off: 'none', low: 'low', high: 'high' })
  assert.deepEqual(reasoningEffortsFromCliProxy(['low', 'ultra']), { low: 'low', max: 'ultra' })
  assert.deepEqual(reasoningEffortsFromCliProxy(['max', 'ultra']), { max: 'max' })
  assert.equal(reasoningEffortsFromCliProxy([{ effort: 'none' }]), false)
  assert.equal(reasoningEffortsFromCliProxy(undefined), undefined)
})

test('rich model rows map all DSH capability fields and hidden rows are skipped', () => {
  assert.deepEqual(modelFromCliProxy({
    slug: 'gpt-test',
    display_name: 'GPT Test',
    context_window: 200000,
    max_tokens: 32000,
    input_modalities: ['text', 'image', 'audio', 'image'],
    supported_reasoning_levels: [{ effort: 'none' }, { effort: 'medium' }, { effort: 'high' }],
  }), {
    id: 'gpt-test',
    name: 'GPT Test',
    contextWindow: 200000,
    maxTokens: 32000,
    input: ['text', 'image'],
    reasoningEfforts: { off: 'none', medium: 'medium', high: 'high' },
  })
  assert.equal(modelFromCliProxy({ slug: 'image-only', visibility: 'hide' }), undefined)
  assert.deepEqual(modelFromCliProxy({ slug: 'vision', input_modalities: ['image'] }), {
    id: 'vision',
    input: ['text', 'image'],
  })
})

test('only CLIProxyAPI rich models[] responses are recognized', async () => {
  assert.equal(parseCliProxyCatalog({ object: 'list', data: [{ id: 'plain' }] }), undefined)
  assert.deepEqual(parseCliProxyCatalog({ models: [{ slug: 'a' }, { slug: 'a' }, { slug: 'b' }] }), [
    { id: 'a' },
    { id: 'b' },
  ])

  let authorization
  const fetched = await fetchCliProxyCatalog({
    baseURL: 'http://127.0.0.1:8317/v1',
    apiKey: 'secret',
    fetchImpl: async (url, init) => {
      assert.equal(url, 'http://127.0.0.1:8317/v1/models?client_version=pi')
      authorization = init.headers.Authorization
      return new Response(JSON.stringify({ models: [{ slug: 'remote' }] }), {
        headers: { 'content-type': 'application/json' },
      })
    },
  })
  assert.equal(authorization, 'Bearer secret')
  assert.deepEqual(fetched.models, [{ id: 'remote' }])
})

test('merge preserves manual compat while remote capability data stays authoritative', () => {
  assert.deepEqual(mergeCliProxyModels([
    { id: 'a', name: 'Remote A', contextWindow: 200, reasoningEfforts: { high: 'high' } },
  ], [
    { id: 'a', name: 'Old A', contextWindow: 100, maxTokens: 10, compat: { supportsDeveloperRole: false } },
    { id: 'stale-manual' },
  ]), [{
    id: 'a',
    name: 'Remote A',
    contextWindow: 200,
    reasoningEfforts: { high: 'high' },
    compat: { supportsDeveloperRole: false },
  }])
})

test('bridge enriches only rich CLIProxyAPI routes and writes a narrow provider patch', async () => {
  const state = {
    providers: {
      cliproxyapi: {
        api: 'openai-responses',
        apiKeyEnv: 'CLIPROXY_KEY',
        baseURL: 'http://cliproxy.local:8317/v1',
        models: [{ id: 'old', compat: { supportsDeveloperRole: false } }],
      },
      ordinary: {
        api: 'openai-completions',
        baseURL: 'http://ordinary.local/v1',
        models: [{ id: 'plain' }],
      },
    },
  }
  const updates = []
  const ctx = {
    settings: {
      get(namespace) { assert.equal(namespace, 'llm-pi-ai'); return state },
      async update(namespace, patch) {
        assert.equal(namespace, 'llm-pi-ai')
        updates.push(patch)
        for (const [route, profile] of Object.entries(patch.providers)) {
          state.providers[route] = { ...state.providers[route], ...profile }
        }
      },
    },
    credentials: {
      async resolve(ref) {
        assert.equal(ref, 'CLIPROXY_KEY')
        return { value: 'bridge-secret', source: 'test' }
      },
    },
  }
  const status = new Map()
  const result = await syncCliProxyProviders(ctx, {
    status,
    logger: { info() {}, warn() {}, debug() {} },
    fetchImpl: async (url, init) => {
      if (url.startsWith('http://ordinary.local')) {
        return new Response(JSON.stringify({ object: 'list', data: [{ id: 'plain' }] }))
      }
      assert.equal(init.headers.Authorization, 'Bearer bridge-secret')
      return new Response(JSON.stringify({
        models: [{
          slug: 'gpt-live',
          display_name: 'GPT Live',
          context_window: 400000,
          input_modalities: ['text', 'image'],
          supported_reasoning_levels: [{ effort: 'low' }, { effort: 'high' }],
        }],
      }))
    },
  })

  assert.equal(updates.length, 1)
  assert.deepEqual(updates[0], {
    providers: {
      cliproxyapi: {
        models: [{
          id: 'gpt-live',
          name: 'GPT Live',
          contextWindow: 400000,
          input: ['text', 'image'],
          reasoningEfforts: { low: 'low', high: 'high' },
        }],
      },
    },
  })
  assert.equal(state.providers.ordinary.models[0].id, 'plain')
  assert.equal(result.ready, 1)
  assert.equal(status.get('ordinary').state, 'not-cliproxyapi')
})

test('empty rich catalogs never erase an existing DSH model list', async () => {
  let updates = 0
  const ctx = {
    settings: {
      get() {
        return { providers: { cliproxyapi: { baseURL: 'http://proxy/v1', models: [{ id: 'keep' }] } } }
      },
      async update() { updates += 1 },
    },
  }
  const result = await syncCliProxyProviders(ctx, {
    logger: { warn() {}, debug() {} },
    fetchImpl: async () => new Response('{"models":[]}'),
  })
  assert.equal(updates, 0)
  assert.equal(result.routes[0].state, 'empty')
})

test('a credential committed after the provider queues an immediate authenticated retry', async () => {
  let key
  let updates = 0
  const handlers = new Map()
  const state = {
    providers: {
      cliproxyapi: {
        api: 'openai-responses',
        apiKeyEnv: 'CLIPROXYAPI_KEY',
        baseURL: 'http://proxy/v1',
        models: [{ id: 'initial' }],
      },
    },
  }
  const ctx = {
    settings: {
      get() { return state },
      async update(_namespace, patch) {
        updates += 1
        state.providers.cliproxyapi = { ...state.providers.cliproxyapi, ...patch.providers.cliproxyapi }
      },
    },
    credentials: {
      async resolve() { return key === undefined ? undefined : { value: key, source: 'test' } },
    },
    on(event, handler) {
      handlers.set(event, handler)
      return () => handlers.delete(event)
    },
    effect() {},
    logger: { info() {}, warn() {}, debug() {} },
  }
  const bridge = installCliProxyBridge(ctx, { cliProxyRefreshMinutes: 1440 }, {
    fetchImpl: async (_url, init) => {
      if (init.headers.Authorization !== 'Bearer ready') return new Response('', { status: 401 })
      return new Response(JSON.stringify({ models: [{ slug: 'authenticated' }] }))
    },
  })

  await eventually(() => bridge.status().errors === 1, 'startup probe did not observe the missing key')
  key = 'ready'
  handlers.get('credentials/reference-updated')?.('CLIPROXYAPI_KEY')
  await eventually(() => bridge.status().ready === 1 && updates === 1, 'credential update did not retry the catalog')
  assert.equal(state.providers.cliproxyapi.models[0].id, 'authenticated')
  bridge.dispose()
})
