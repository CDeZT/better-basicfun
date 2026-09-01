import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { isAbsolute, join, relative, resolve, sep } from 'node:path'

export const RESOURCE_KINDS = Object.freeze([
  'overview',
  'plugins',
  'skills',
  'memory',
  'sessions',
  'storage',
  'settings',
  'credential',
  'list',
  'file',
])

const DEFAULT_MEMORY_MAX_BYTES = 32 * 1024
const DEFAULT_LIST_LIMIT = 50
const MAX_LIST_LIMIT = 500
const DEFAULT_CONTENT_LIMIT = 32 * 1024
const MAX_CONTENT_LIMIT = 64 * 1024

export function resolveDshHome(configured, env = process.env, userHome = homedir()) {
  const selected = configured ?? nonBlank(env.DSH_HOME) ?? join(userHome, '.dsh')
  return resolve(expandHome(selected, userHome))
}

export function resolveWorkspaceConfig(config = {}, env = process.env, userHome = homedir()) {
  const dshHome = resolveDshHome(config.dshHome, env, userHome)
  const configuredWorkspace = nonBlank(config.workspacePath) ?? nonBlank(env.DSH_DEFAULT_WORKSPACE)
  // A dedicated child is a narrow canonical write boundary. Never make the
  // entire DSH home the Workspace: that would put credentials, profiles, and
  // session state inside workspace-write's writable root.
  const defaultWorkspace = join(dshHome, 'workspace')
  const workspacePath = resolve(expandHome(configuredWorkspace ?? defaultWorkspace, userHome))
  const title = nonBlank(config.title) ?? 'Default workspace'
  const pinFirst = config.pinFirst ?? true
  const memoryMaxBytes = positiveInteger(config.memoryMaxBytes, DEFAULT_MEMORY_MAX_BYTES, 'memoryMaxBytes')
  const defaultListLimit = boundedListLimit(config.defaultListLimit ?? DEFAULT_LIST_LIMIT)
  const defaultContentLimit = boundedContentLimit(config.defaultContentLimit ?? DEFAULT_CONTENT_LIMIT)
  const maxBinaryReadBytes = positiveInteger(config.maxBinaryReadBytes, 64 * 1024 * 1024, 'maxBinaryReadBytes')
  return {
    dshHome,
    workspacePath,
    title,
    pinFirst,
    memoryMaxBytes,
    defaultListLimit,
    defaultContentLimit,
    maxBinaryReadBytes,
  }
}

export async function ensureWorkspaceLayout(paths) {
  await mkdir(paths.workspacePath, { recursive: true })
  await mkdir(join(paths.workspacePath, '.dsh', 'skills'), { recursive: true })
  await mkdir(join(paths.dshHome, 'skills'), { recursive: true })
  // Keep the standard DSH resource roots addressable on a fresh install.
  // These are empty directories only; no settings, credentials, profiles, or
  // session data are created or overwritten here.
  for (const root of ['profiles', 'sessions', 'storages']) {
    await mkdir(join(paths.dshHome, root), { recursive: true })
  }

  const files = workspaceFileTemplates(paths)
  for (const [path, content] of files) await writeNewFile(path, content)
}

export async function registerDefaultWorkspace(workspaceRegistry, paths) {
  const workspace = await workspaceRegistry.create(paths.workspacePath, paths.title)
  if (paths.pinFirst) {
    const first = workspaceRegistry.list()[0]
    if (first !== undefined && first.id !== workspace.id) {
      await workspaceRegistry.insertBefore(workspace.id, first.id)
    }
  }
  return workspace
}

export function workspaceFileTemplates(paths) {
  const memoryPath = join(paths.workspacePath, 'MEMORY.md')
  const resources = resourcePaths(paths)
  return new Map([
    [join(paths.workspacePath, 'README.md'), defaultReadme(paths, resources)],
    [join(paths.workspacePath, 'AGENTS.md'), defaultAgents(paths, resources)],
    [memoryPath, defaultMemory()],
  ])
}

export function resourcePaths(paths) {
  return {
    defaultWorkspace: paths.workspacePath,
    projectSkills: join(paths.workspacePath, '.dsh', 'skills'),
    userSkills: join(paths.dshHome, 'skills'),
    profiles: join(paths.dshHome, 'profiles'),
    sessions: join(paths.dshHome, 'sessions'),
    storage: join(paths.dshHome, 'storages'),
    settings: join(paths.dshHome, 'settings.yaml'),
    credentials: join(paths.dshHome, '.credentials.yaml'),
    memory: join(paths.workspacePath, 'MEMORY.md'),
  }
}

export async function readMemory(paths) {
  const memoryPath = join(paths.workspacePath, 'MEMORY.md')
  let content
  try {
    content = await readFile(memoryPath, 'utf8')
  } catch (error) {
    if (error?.code === 'ENOENT') return ''
    throw error
  }
  return truncateUtf8(content, paths.memoryMaxBytes)
}

export async function listStorageFiles(root, limit) {
  const cap = boundedListLimit(limit)
  const results = []
  await walk(root, '', results, cap)
  return results
}

export function listLoaderPlugins(loader) {
  const phases = Object.freeze({
    0: 'pending',
    1: 'loading',
    2: 'active',
    3: 'failed',
    4: null,
    5: 'unloading',
  })
  const entries = []
  for (const entry of loader.entries()) {
    if (entry.options?.group) continue
    entries.push({
      entryId: String(entry.id),
      moduleName: String(entry.options?.name ?? ''),
      enabled: !entry.disabled,
      fiberPhase: entry.fiber === undefined ? null : (phases[entry.fiber.state] ?? 'unknown'),
    })
  }
  return entries
}

export function boundedListLimit(value) {
  const number = Number(value)
  if (!Number.isInteger(number) || number < 1) return DEFAULT_LIST_LIMIT
  return Math.min(number, MAX_LIST_LIMIT)
}

export function boundedContentLimit(value) {
  const number = Number(value)
  if (!Number.isInteger(number) || number < 1) return DEFAULT_CONTENT_LIMIT
  return Math.min(number, MAX_CONTENT_LIMIT)
}

export function normalizedOffset(value) {
  const number = Number(value ?? 0)
  if (!Number.isInteger(number) || number < 0) throw new TypeError('offset must be a non-negative integer')
  return number
}

export function pageArray(values, offset = 0, limit = DEFAULT_LIST_LIMIT) {
  const start = normalizedOffset(offset)
  const cap = boundedListLimit(limit)
  const items = values.slice(start, start + cap)
  const nextOffset = start + items.length < values.length ? start + items.length : null
  return { offset: start, limit: cap, total: values.length, nextOffset, items }
}

export function pageText(value, offset = 0, limit = DEFAULT_CONTENT_LIMIT) {
  const text = String(value)
  const start = normalizedOffset(offset)
  const cap = boundedContentLimit(limit)
  const content = text.slice(start, start + cap)
  const nextOffset = start + content.length < text.length ? start + content.length : null
  return {
    offset: start,
    limit: cap,
    totalCharacters: text.length,
    nextOffset,
    eof: nextOffset === null,
    content,
  }
}

export function resolveDshResourcePath(dshHome, input = '.') {
  const root = resolve(dshHome)
  const candidate = resolve(root, input)
  const path = relative(root, candidate)
  if (path === '' || (path !== '..' && !path.startsWith(`..${sep}`) && !isAbsolute(path))) return candidate
  throw new Error(`DSH resource path must stay under DSH_HOME: ${String(input)}`)
}

export function samePath(left, right, platform = process.platform) {
  const normalizedLeft = resolve(left)
  const normalizedRight = resolve(right)
  return platform === 'win32'
    ? normalizedLeft.toLowerCase() === normalizedRight.toLowerCase()
    : normalizedLeft === normalizedRight
}

export function formatToolOutput(value) {
  return JSON.stringify(value, null, 2)
}

export function truncateUtf8(value, maxBytes) {
  const text = String(value)
  if (Buffer.byteLength(text, 'utf8') <= maxBytes) return text
  const marker = '\n… [truncated by dsh-default-workspace]'
  const markerBytes = Buffer.byteLength(marker, 'utf8')
  const budget = Math.max(0, maxBytes - markerBytes)
  let low = 0
  let high = text.length
  while (low < high) {
    const middle = Math.ceil((low + high) / 2)
    if (Buffer.byteLength(text.slice(0, middle), 'utf8') <= budget) low = middle
    else high = middle - 1
  }
  return text.slice(0, low) + marker
}

async function walk(root, subpath, output, limit) {
  if (output.length >= limit) return
  const directory = join(root, subpath)
  let entries
  try {
    entries = await readdir(directory, { withFileTypes: true })
  } catch (error) {
    if (error?.code === 'ENOENT') return
    throw error
  }
  entries.sort((a, b) => a.name.localeCompare(b.name))
  for (const entry of entries) {
    if (output.length >= limit) return
    const childRelative = subpath.length === 0 ? entry.name : join(subpath, entry.name)
    const childAbsolute = join(root, childRelative)
    if (entry.isSymbolicLink()) {
      output.push({ path: childRelative, kind: 'symlink' })
      continue
    }
    if (entry.isDirectory()) {
      output.push({ path: childRelative, kind: 'directory' })
      await walk(root, childRelative, output, limit)
      continue
    }
    const metadata = await stat(childAbsolute)
    output.push({
      path: childRelative,
      kind: 'file',
      size: metadata.size,
      modifiedAt: metadata.mtime.toISOString(),
    })
  }
}

async function writeNewFile(path, content) {
  try {
    await writeFile(path, content, { encoding: 'utf8', flag: 'wx' })
  } catch (error) {
    if (error?.code !== 'EEXIST') throw error
  }
}

function expandHome(path, userHome) {
  if (path === '~') return userHome
  if (path.startsWith('~/') || path.startsWith('~\\')) return join(userHome, path.slice(2))
  return path
}

function nonBlank(value) {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined
}

function positiveInteger(value, fallback, field) {
  if (value === undefined) return fallback
  if (!Number.isInteger(value) || value < 1) throw new TypeError(`${field} must be a positive integer`)
  return value
}

function defaultReadme(paths, resources) {
  return `# DSH Default Workspace

This directory is managed as the safe default Workspace by the \`better-basicfun\` plugin.

- Normal files in this directory are writable in DSH's \`workspace-write\` mode.
- \`MEMORY.md\` is persistent memory for sessions in this Workspace.
- Project-local skills belong in \`.dsh/skills/<skill-name>/SKILL.md\`.
- User-wide DSH skills belong in \`${resources.userSkills}\` and are discovered by DSH automatically.
- Use the read-only \`dsh_resources\` tool to inspect installed plugins and source files, complete skill bodies, memory, full session records, storage files, unredacted settings, and credentials.
- DSH settings, credentials, profiles, and raw state remain outside the Workspace write boundary.
- Third-party reasoning controls are capability-gated; native DSH model controls remain authoritative.

Security: this plugin intentionally makes sensitive DSH information readable by the model. Tool results may be sent to the configured model provider.

DSH home: \`${paths.dshHome}\`
Default Workspace: \`${paths.workspacePath}\`
`
}

function defaultAgents(paths, resources) {
  return `# Default Workspace Guidance

This is the user's DSH default Workspace. Work normally inside \`${paths.workspacePath}\`.

Use the \`dsh_resources\` tool whenever the user asks about DSH state. It provides complete paged reads of installed plugins and files, skills, persistent memory, previous sessions, storage, unredacted settings, and credentials through native DSH services. It never grants mutation rights outside the Workspace.

Maintain durable user-approved notes in \`${resources.memory}\`. Put Workspace-local skills under \`${resources.projectSkills}\`. DSH also discovers user-wide skills under \`${resources.userSkills}\` without custom skill-directory configuration.

For reasoning controls, trust a model's explicit \`reasoningEfforts\` mapping first. The better-basicfun guard only fills a small evidence-backed set for third-party gateways and leaves unknown or native models untouched.

Sensitive resource results may be sent to the configured model provider. Follow the user's request and the active DSH permission preset for every mutation.
`
}

function defaultMemory() {
  return `# DSH Workspace Memory

Durable notes explicitly approved by the user belong here. Keep entries concise, factual, and easy to revise.
`
}
