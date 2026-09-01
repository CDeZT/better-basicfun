import assert from 'node:assert/strict'
import test from 'node:test'
import {
  applyKnownThirdPartyDefaults,
  auditThirdPartyProviders,
  isNativeProvider,
  knownEfforts,
  validateReasoningEfforts,
} from '../lib/reasoning.js'

test('native DeepSeek routes are never enhanced', () => {
  assert.equal(isNativeProvider('deepseek-official', {}), true)
  assert.equal(isNativeProvider('custom', { baseURL: 'https://api.deepseek.com/v1' }), true)
  assert.equal(isNativeProvider('cli-antigravity', { baseURL: 'http://192.168.1.197:8317/v1' }), false)
  assert.equal(knownEfforts('deepseek-official', 'deepseek-v4'), undefined)
})

test('known third-party fallbacks are narrow and exact', () => {
  assert.deepEqual(knownEfforts('cli-antigravity', 'gemini-3.7-flash-high'), {
    low: 'low', medium: 'medium', high: 'high', max: 'max',
  })
  assert.deepEqual(knownEfforts('cli-antigravity', 'hy4-preview'), { off: 'no_think', high: 'high' })
  assert.equal(knownEfforts('cli-antigravity', 'unknown-model'), undefined)
})

test('reasoning mapping validation rejects illegal levels and wire values', () => {
  assert.deepEqual(validateReasoningEfforts({ off: null, high: 'high' }), [])
  assert.deepEqual(validateReasoningEfforts({ bizarre: 'high' }), ['unknown DSH level bizarre'])
  assert.deepEqual(validateReasoningEfforts({ high: '' }), ['high must map to a non-empty string or null'])
})

test('defaults fill only evidence-backed third-party models and preserve native/unknown entries', async () => {
  const state = {
    providers: {
      'deepseek-official': { models: [{ id: 'deepseek-v4' }] },
      'cli-antigravity': {
        models: [
          { id: 'gemini-3.7-flash-high' },
          { id: 'hy4-preview' },
          { id: 'unknown-model' },
          { id: 'already-configured', reasoningEfforts: { high: 'custom-high' } },
        ],
      },
    },
  }
  const settings = {
    writable: true,
    get(namespace) { assert.equal(namespace, 'llm-pi-ai'); return state },
    async update(namespace, patch) {
      assert.equal(namespace, 'llm-pi-ai')
      state.providers = patch.providers
    },
  }
  const result = await applyKnownThirdPartyDefaults(settings)
  assert.deepEqual(result, { filled: 2, skipped: false })
  assert.equal(state.providers['deepseek-official'].models[0].reasoningEfforts, undefined)
  assert.deepEqual(state.providers['cli-antigravity'].models[0].reasoningEfforts, {
    low: 'low', medium: 'medium', high: 'high', max: 'max',
  })
  assert.deepEqual(state.providers['cli-antigravity'].models[1].reasoningEfforts, { off: 'no_think', high: 'high' })
  assert.equal(state.providers['cli-antigravity'].models[2].reasoningEfforts, undefined)
  assert.deepEqual(auditThirdPartyProviders(state).missing, [{ route: 'cli-antigravity', model: 'unknown-model', fallback: undefined }])
})

