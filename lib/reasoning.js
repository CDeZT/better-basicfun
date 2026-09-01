const SETTINGS_NAMESPACE = 'llm-pi-ai'
const STANDARD_LEVELS = Object.freeze(['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'])

// These are deliberately narrow, evidence-backed fallbacks.  Unknown models
// are left alone instead of being presented with a guessed effort ladder.
const KNOWN_THIRD_PARTY_EFFORTS = Object.freeze([
  {
    test: (_route, id) => id === 'gemini-3.7-flash-high',
    efforts: { low: 'low', medium: 'medium', high: 'high', max: 'max' },
  },
  {
    test: (_route, id) => id === 'hy4-preview',
    efforts: { off: 'no_think', high: 'high' },
  },
  {
    test: (_route, id) => id === 'hy3' || id === 'hy3-x',
    efforts: { low: 'low', high: 'high' },
  },
])

export function isNativeProvider(route, profile = {}) {
  const routeName = String(route).trim().toLowerCase()
  if (routeName === 'deepseek-official' || routeName.startsWith('deepseek-official/')) return true
  if (routeName === 'deepseek' && profile.api !== 'openai-completions') return true
  const baseURL = typeof profile.baseURL === 'string' ? profile.baseURL.trim() : ''
  if (baseURL.length > 0) {
    try {
      const host = new URL(baseURL).hostname.toLowerCase()
      if (host === 'api.deepseek.com' || host.endsWith('.api.deepseek.com')) return true
    } catch {
      // Invalid URLs are handled by the adapter; they are not treated as native.
    }
  }
  return false
}

export function knownEfforts(route, modelId, profile = {}) {
  if (isNativeProvider(route, profile)) return undefined
  const id = String(modelId).trim().toLowerCase()
  const match = KNOWN_THIRD_PARTY_EFFORTS.find((entry) => entry.test(String(route), id))
  return match === undefined ? undefined : { ...match.efforts }
}

export function validateReasoningEfforts(efforts) {
  const errors = []
  if (efforts === undefined) return errors
  if (!isRecord(efforts)) return ['reasoningEfforts must be an object']
  for (const [level, wire] of Object.entries(efforts)) {
    if (!STANDARD_LEVELS.includes(level)) {
      errors.push(`unknown DSH level ${level}`)
      continue
    }
    if (wire !== null && (typeof wire !== 'string' || wire.trim().length === 0)) {
      errors.push(`${level} must map to a non-empty string or null`)
    }
  }
  return errors
}

export function auditThirdPartyProviders(section) {
  const result = { checked: 0, nativeSkipped: 0, missing: [], invalid: [] }
  if (!isRecord(section?.providers)) return result
  for (const [route, rawProfile] of Object.entries(section.providers)) {
    if (!isRecord(rawProfile)) continue
    if (isNativeProvider(route, rawProfile)) {
      result.nativeSkipped += 1
      continue
    }
    for (const model of modelEntries(rawProfile)) {
      result.checked += 1
      const id = model.id
      if (typeof id !== 'string' || id.trim().length === 0) continue
      if (model.reasoningEfforts === undefined) {
        const fallback = knownEfforts(route, id, rawProfile)
        result.missing.push({ route, model: id, fallback })
        continue
      }
      const errors = validateReasoningEfforts(model.reasoningEfforts)
      if (errors.length > 0) result.invalid.push({ route, model: id, errors })
    }
  }
  return result
}

export async function applyKnownThirdPartyDefaults(settings, logger = noopLogger) {
  if (!isSettingsWritable(settings)) return { filled: 0, skipped: true }
  let section
  try {
    section = settings.get(SETTINGS_NAMESPACE)
  } catch (error) {
    logger.warn?.('settings read failed:', errorMessage(error))
    return { filled: 0, skipped: true }
  }
  if (!isRecord(section?.providers)) return { filled: 0, skipped: false }

  let filled = 0
  let changed = false
  const providers = Object.fromEntries(Object.entries(section.providers).map(([route, rawProfile]) => {
    if (!isRecord(rawProfile) || isNativeProvider(route, rawProfile)) return [route, rawProfile]
    let nextProfile = rawProfile
    if (Array.isArray(rawProfile.models)) {
      let modelsChanged = false
      const models = rawProfile.models.map((rawModel) => {
        if (!isRecord(rawModel) || rawModel.reasoningEfforts !== undefined) return rawModel
        const fallback = knownEfforts(route, rawModel.id, rawProfile)
        if (fallback === undefined) return rawModel
        filled += 1
        changed = true
        modelsChanged = true
        return { ...rawModel, reasoningEfforts: fallback }
      })
      if (modelsChanged) nextProfile = { ...nextProfile, models }
    }
    if (isRecord(rawProfile.modelOverrides)) {
      let overridesChanged = false
      const modelOverrides = Object.fromEntries(Object.entries(rawProfile.modelOverrides).map(([id, rawModel]) => {
        if (!isRecord(rawModel) || rawModel.reasoningEfforts !== undefined) return [id, rawModel]
        const fallback = knownEfforts(route, id, rawProfile)
        if (fallback === undefined) return [id, rawModel]
        filled += 1
        changed = true
        overridesChanged = true
        return [id, { ...rawModel, reasoningEfforts: fallback }]
      }))
      if (overridesChanged) nextProfile = { ...nextProfile, modelOverrides }
    }
    return [route, nextProfile]
  }))

  if (changed) {
    try {
      await settings.update(SETTINGS_NAMESPACE, { providers })
    } catch (error) {
      logger.warn?.('settings update failed:', errorMessage(error))
      return { filled: 0, skipped: true }
    }
  }
  return { filled, skipped: false }
}

export function installReasoningGuard(ctx) {
  const settings = ctx.settings
  const logger = ctx.logger ?? console
  if (!settings || typeof settings.get !== 'function') {
    logger.warn?.('reasoning guard disabled: settings service unavailable')
    return
  }

  const audit = async () => {
    const result = await applyKnownThirdPartyDefaults(settings, logger)
    let section
    try { section = settings.get(SETTINGS_NAMESPACE) } catch { return result }
    const report = auditThirdPartyProviders(section)
    for (const item of report.invalid) logger.warn?.(`invalid reasoning mapping for ${item.route}/${item.model}:`, item.errors.join('; '))
    for (const item of report.missing) {
      if (item.fallback === undefined) logger.info?.(`no evidence-backed reasoning ladder for ${item.route}/${item.model}; leaving native defaults unchanged`)
    }
    if (result.filled > 0) logger.info?.(`filled ${result.filled} evidence-backed third-party reasoning ladder(s)`)
    return result
  }

  void audit()
  const dispose = typeof ctx.on === 'function'
    ? ctx.on('settings/updated', (namespace) => {
      if (namespace === SETTINGS_NAMESPACE) void audit()
    })
    : undefined
  if (typeof ctx.effect === 'function') ctx.effect(() => dispose, 'better-basicfun: reasoning guard')
}

function modelEntries(profile) {
  const entries = []
  if (Array.isArray(profile.models)) entries.push(...profile.models)
  if (isRecord(profile.modelOverrides)) entries.push(...Object.values(profile.modelOverrides))
  return entries
}

function isSettingsWritable(settings) {
  return typeof settings?.get === 'function' && typeof settings?.update === 'function' && settings.writable !== false
}

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function errorMessage(error) {
  return error instanceof Error ? error.message : String(error)
}

const noopLogger = { warn() {}, info() {} }
