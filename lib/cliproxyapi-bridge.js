const SETTINGS_NAMESPACE = 'llm-pi-ai'
const RESPONSE_LIMIT_BYTES = 4 * 1024 * 1024
const DSH_REASONING_LEVELS = new Set(['minimal', 'low', 'medium', 'high', 'xhigh', 'max'])

/** Build the rich CLIProxyAPI catalog endpoint from a DSH inference base URL. */
export function cliProxyCatalogUrl(baseURL) {
  const url = new URL(String(baseURL).trim())
  const path = url.pathname.replace(/\/+$/, '')
  // CLIProxyAPI's Codex-style inference endpoint may be configured as
  // /backend-api, while its catalog always lives beside it at /v1/models.
  const root = path.endsWith('/backend-api') ? path.slice(0, -'/backend-api'.length) : path
  url.pathname = root.endsWith('/v1') ? `${root}/models` : `${root}/v1/models`
  url.search = ''
  url.hash = ''
  url.searchParams.set('client_version', 'pi')
  return url.toString()
}

/** Convert CLIProxyAPI/Codex reasoning names into DSH's canonical selector levels. */
export function reasoningEffortsFromCliProxy(levels) {
  if (!Array.isArray(levels)) return undefined
  const names = levels
    .map((entry) => typeof entry === 'string' ? entry : entry?.effort)
    .filter((entry) => typeof entry === 'string')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean)

  const efforts = {}
  for (const name of names) {
    if (name === 'none') efforts.off = 'none'
    else if (DSH_REASONING_LEVELS.has(name)) efforts[name] = name
  }
  // CLIProxyAPI may expose Codex's newer "ultra" spelling. DSH currently has
  // no separate ultra position, so preserve it as the wire value of max only
  // when a real max level was not advertised.
  if (names.includes('ultra') && efforts.max === undefined) efforts.max = 'ultra'

  // DSH rejects a reasoning map that offers only "off". Such a catalog entry
  // is simply a non-reasoning model.
  return Object.keys(efforts).some((level) => level !== 'off') ? efforts : false
}

/** Map one rich catalog row to a DSH llm-pi-ai model profile. */
export function modelFromCliProxy(entry) {
  if (!isRecord(entry) || String(entry.visibility ?? '').trim().toLowerCase() === 'hide') return undefined
  const id = nonBlank(entry.slug) ?? nonBlank(entry.id)
  if (id === undefined) return undefined

  const name = nonBlank(entry.display_name) ?? nonBlank(entry.name)
  const contextWindow = positiveInteger(
    entry.context_window,
    entry.max_context_window,
    entry.context_length,
  )
  const maxTokens = positiveInteger(
    entry.max_tokens,
    entry.max_output_tokens,
    entry.max_completion_tokens,
  )
  const advertisedInput = Array.isArray(entry.input_modalities)
    ? [...new Set(entry.input_modalities
      .map((value) => typeof value === 'string' ? value.trim().toLowerCase() : '')
      .filter((value) => value === 'text' || value === 'image'))]
    : undefined
  // A visible CLIProxyAPI catalog row is a chat model. Keep DSH's conservative
  // text floor even when an upstream row only advertises its extra modality.
  const input = advertisedInput === undefined
    ? undefined
    : advertisedInput.includes('text') ? advertisedInput : ['text', ...advertisedInput]
  const reasoningEfforts = reasoningEffortsFromCliProxy(entry.supported_reasoning_levels)

  return {
    id,
    ...(name === undefined || name === id ? {} : { name }),
    ...(contextWindow === undefined ? {} : { contextWindow }),
    ...(maxTokens === undefined ? {} : { maxTokens }),
    ...(input === undefined || input.length === 0 ? {} : { input }),
    ...(reasoningEfforts === undefined ? {} : { reasoningEfforts }),
  }
}

/** Parse the rich response. A normal OpenAI `data[]` response is not accepted. */
export function parseCliProxyCatalog(payload) {
  if (!isRecord(payload) || !Array.isArray(payload.models)) return undefined
  const models = []
  const seen = new Set()
  for (const entry of payload.models) {
    const model = modelFromCliProxy(entry)
    if (model === undefined || seen.has(model.id)) continue
    seen.add(model.id)
    models.push(model)
  }
  return models
}

/**
 * Preserve fields a user added manually while replacing remotely-owned model
 * capabilities with the newest catalog values.
 */
export function mergeCliProxyModels(remoteModels, configuredModels = []) {
  const configured = new Map(
    (Array.isArray(configuredModels) ? configuredModels : [])
      .filter((entry) => isRecord(entry) && nonBlank(entry.id) !== undefined)
      .map((entry) => [entry.id, entry]),
  )
  return remoteModels.map((remote) => {
    const prior = configured.get(remote.id)
    if (prior === undefined) return remote
    const {
      id: _id,
      name: _name,
      contextWindow: _contextWindow,
      maxTokens: _maxTokens,
      input: _input,
      reasoningEfforts: _reasoningEfforts,
      ...manual
    } = prior
    return { ...manual, ...remote }
  })
}

/** Fetch and recognize a CLIProxyAPI rich catalog without exposing credentials to the browser. */
export async function fetchCliProxyCatalog(options) {
  const {
    baseURL,
    apiKey,
    headers = {},
    timeoutMs = 10_000,
    fetchImpl = globalThis.fetch,
  } = options
  const url = cliProxyCatalogUrl(baseURL)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(new Error(`catalog request timed out after ${timeoutMs}ms`)), timeoutMs)
  try {
    const requestHeaders = { Accept: 'application/json', ...headers }
    if (nonBlank(apiKey) !== undefined && !hasHeader(requestHeaders, 'authorization')) {
      requestHeaders.Authorization = `Bearer ${apiKey.trim()}`
    }
    const response = await fetchImpl(url, { method: 'GET', headers: requestHeaders, signal: controller.signal })
    if (!response.ok) {
      const error = new Error(`CLIProxyAPI catalog ${url} returned HTTP ${response.status}`)
      error.code = response.status === 401 || response.status === 403 ? 'INVALID_CREDENTIAL' : 'CATALOG_HTTP_ERROR'
      throw error
    }
    const declared = Number(response.headers?.get?.('content-length') ?? Number.NaN)
    if (Number.isFinite(declared) && declared > RESPONSE_LIMIT_BYTES) {
      throw new Error(`CLIProxyAPI catalog exceeds ${RESPONSE_LIMIT_BYTES} bytes`)
    }
    const text = await response.text()
    if (Buffer.byteLength(text, 'utf8') > RESPONSE_LIMIT_BYTES) {
      throw new Error(`CLIProxyAPI catalog exceeds ${RESPONSE_LIMIT_BYTES} bytes`)
    }
    let payload
    try {
      payload = JSON.parse(text)
    } catch (cause) {
      throw new Error(`CLIProxyAPI catalog ${url} returned invalid JSON`, { cause })
    }
    return { url, models: parseCliProxyCatalog(payload) }
  } finally {
    clearTimeout(timer)
  }
}

/** Install automatic CLIProxyAPI-to-DSH settings synchronization. */
export function installCliProxyBridge(ctx, config = {}, runtime = {}) {
  const logger = ctx.logger ?? console
  const explicitRoutes = new Set((config.cliProxyRoutes ?? []).map((route) => String(route).trim()).filter(Boolean))
  const refreshMs = Math.max(1, Number(config.cliProxyRefreshMinutes ?? 15)) * 60_000
  const timeoutMs = Math.max(1, Number(config.cliProxyRequestTimeoutMs ?? 10_000))
  const status = new Map()
  let disposed = false
  let selfUpdating = false
  let timer
  let inFlight
  let queued = false

  const sync = async (reason = 'manual') => {
    if (disposed || config.cliProxySync === false) return summary(status, false)
    if (inFlight !== undefined) {
      queued = true
      return inFlight
    }
    inFlight = syncCliProxyProviders(ctx, {
      explicitRoutes,
      probeAll: config.cliProxyProbeAllCustomProviders !== false,
      timeoutMs,
      status,
      logger,
      reason,
      ...runtime.fetchImpl === undefined ? {} : { fetchImpl: runtime.fetchImpl },
      beforeUpdate: () => { selfUpdating = true },
      afterUpdate: () => { selfUpdating = false },
    }).finally(() => {
      inFlight = undefined
      if (queued && !disposed) {
        queued = false
        void sync('queued')
      }
    })
    return inFlight
  }

  const schedule = (reason) => {
    if (disposed || config.cliProxySync === false) return
    queueMicrotask(() => { void sync(reason) })
  }
  const settingsDisposer = typeof ctx.on === 'function'
    ? ctx.on('settings/updated', (namespace) => {
      if (namespace === SETTINGS_NAMESPACE && !selfUpdating) schedule('settings')
    })
    : undefined
  const credentialDisposer = typeof ctx.on === 'function'
    ? ctx.on('credentials/reference-updated', (ref) => {
      const section = ctx.settings?.get?.(SETTINGS_NAMESPACE)
      const relevant = isRecord(section?.providers) && Object.entries(section.providers).some(([route, profile]) =>
        isCandidate(route, profile, explicitRoutes, config.cliProxyProbeAllCustomProviders !== false)
        && profile.apiKeyEnv === ref)
      // DSH's custom-provider card commits the profile before its API key.
      // If the first probe raced that write and got 401, this event queues the
      // immediate authenticated retry after the credential has committed.
      if (relevant) schedule('credential')
    })
    : undefined

  if (config.cliProxySync !== false) {
    schedule('startup')
    timer = setInterval(() => { void sync('interval') }, refreshMs)
    timer.unref?.()
  }

  const controller = {
    refresh: () => sync('manual'),
    status: () => summary(status, config.cliProxySync !== false),
    dispose() {
      disposed = true
      if (timer !== undefined) clearInterval(timer)
      settingsDisposer?.()
      credentialDisposer?.()
    },
  }
  if (typeof ctx.effect === 'function') ctx.effect(() => () => controller.dispose(), 'better-basicfun: CLIProxyAPI model sync')
  return controller
}

export async function syncCliProxyProviders(ctx, options = {}) {
  const explicitRoutes = options.explicitRoutes instanceof Set ? options.explicitRoutes : new Set()
  const status = options.status instanceof Map ? options.status : new Map()
  const logger = options.logger ?? ctx.logger ?? console
  const beforeUpdate = options.beforeUpdate ?? (() => {})
  const afterUpdate = options.afterUpdate ?? (() => {})
  const section = ctx.settings?.get?.(SETTINGS_NAMESPACE)
  if (!isRecord(section?.providers)) return summary(status)
  const candidates = Object.entries(section.providers).filter(([route, profile]) =>
    isCandidate(route, profile, explicitRoutes, options.probeAll !== false))

  const patches = {}
  await Promise.all(candidates.map(async ([route, profile]) => {
    const startedAt = new Date().toISOString()
    try {
      const apiKey = nonBlank(profile.apiKeyEnv) === undefined
        ? undefined
        : (await ctx.credentials?.resolve?.(profile.apiKeyEnv))?.value
      const result = await fetchCliProxyCatalog({
        baseURL: profile.baseURL,
        apiKey,
        headers: isRecord(profile.headers) ? profile.headers : {},
        timeoutMs: options.timeoutMs ?? 10_000,
        ...options.fetchImpl === undefined ? {} : { fetchImpl: options.fetchImpl },
      })
      // A normal OpenAI-compatible response is a successful negative probe.
      if (result.models === undefined) {
        status.set(route, { route, state: 'not-cliproxyapi', checkedAt: startedAt, url: result.url })
        return
      }
      // Never erase a working route because an account is temporarily absent.
      if (result.models.length === 0) {
        status.set(route, { route, state: 'empty', checkedAt: startedAt, url: result.url, models: 0 })
        logger.warn?.(`better-basicfun: CLIProxyAPI route "${route}" returned an empty catalog; keeping existing models`)
        return
      }
      const models = mergeCliProxyModels(result.models, profile.models)
      status.set(route, {
        route,
        state: 'ready',
        checkedAt: startedAt,
        url: result.url,
        models: models.length,
        reasoningModels: models.filter((model) => isRecord(model.reasoningEfforts)).length,
      })
      if (!jsonEqual(models, profile.models)) patches[route] = { models }
    } catch (error) {
      status.set(route, {
        route,
        state: 'error',
        checkedAt: startedAt,
        error: errorMessage(error),
        code: error?.code,
      })
      const explicit = explicitRoutes.has(route)
      ;(explicit ? logger.warn : logger.debug)?.call(
        logger,
        `better-basicfun: model probe for "${route}" failed: ${errorMessage(error)}`,
      )
    }
  }))

  if (Object.keys(patches).length > 0) {
    beforeUpdate()
    try {
      await ctx.settings.update(SETTINGS_NAMESPACE, { providers: patches })
      for (const [route, patch] of Object.entries(patches)) {
        logger.info?.(`better-basicfun: synchronized ${patch.models.length} CLIProxyAPI models for "${route}"`)
      }
    } finally {
      afterUpdate()
    }
  }
  return summary(status)
}

function summary(status, enabled = true) {
  const routes = [...status.values()].sort((left, right) => left.route.localeCompare(right.route))
  return {
    enabled,
    routes,
    ready: routes.filter((route) => route.state === 'ready').length,
    errors: routes.filter((route) => route.state === 'error').length,
  }
}

function isCandidate(route, profile, explicitRoutes, probeAll) {
  if (!isRecord(profile) || nonBlank(profile.baseURL) === undefined) return false
  if (explicitRoutes.size > 0) return explicitRoutes.has(route)
  return probeAll && (profile.api === undefined || String(profile.api).startsWith('openai-'))
}

function positiveInteger(...values) {
  return values.find((value) => Number.isSafeInteger(value) && value > 0)
}

function nonBlank(value) {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined
}

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasHeader(headers, target) {
  return Object.keys(headers).some((name) => name.toLowerCase() === target)
}

function jsonEqual(left, right) {
  return JSON.stringify(left) === JSON.stringify(right)
}

function errorMessage(error) {
  return error instanceof Error ? error.message : String(error)
}
