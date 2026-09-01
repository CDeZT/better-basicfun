import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import z from '@deepseek-ai/schemastery'
import {
  RESOURCE_KINDS,
  boundedContentLimit,
  boundedListLimit,
  ensureWorkspaceLayout,
  formatToolOutput,
  listLoaderPlugins,
  normalizedOffset,
  pageArray,
  pageText,
  registerDefaultWorkspace,
  resolveWorkspaceConfig,
  resolveDshResourcePath,
  resourcePaths,
  samePath,
  truncateUtf8,
} from './core.js'

export const name = 'default-workspace'
export const inject = [
  'workspaceRegistry',
  'skills',
  'tools',
  'systemPrompt',
  'loader',
  'fs',
  'settings',
  'credentials',
  'storage',
]

// Keep deployment-varying choices in the validated DSH profile configuration.
// The pure helpers retain defensive defaults for direct imports and tests.
export const Config = z.object({
  dshHome: z.string(),
  workspacePath: z.string(),
  title: z.string().default('Default workspace'),
  pinFirst: z.boolean().default(true),
  memoryMaxBytes: z.number().step(1).min(1).default(32 * 1024),
  defaultListLimit: z.number().step(1).min(1).max(500).default(50),
  defaultContentLimit: z.number().step(1).min(1).max(64 * 1024).default(32 * 1024),
  maxBinaryReadBytes: z.number().step(1).min(1).default(64 * 1024 * 1024),
})

export async function apply(ctx, config = {}) {
  const paths = resolveWorkspaceConfig(config)
  await ensureWorkspaceLayout(paths)
  const workspace = await registerDefaultWorkspace(ctx.workspaceRegistry, paths)
  const resources = resourcePaths(paths)

  ctx.systemPrompt.context({
    name: 'default-workspace:resources',
    order: 115,
    text: (request) => isDefaultSession(request, paths.workspacePath)
      ? resourceContext(paths, resources)
      : '',
  })

  ctx.systemPrompt.context({
    name: 'default-workspace:memory',
    order: 116,
    text: (request) => isDefaultSession(request, paths.workspacePath)
      ? memoryContext(resources.memory, paths.memoryMaxBytes)
      : '',
  })

  ctx.tools.register(resourceTool(ctx, paths, workspace))
  ctx.logger?.info?.(`dsh-default-workspace: ready at ${paths.workspacePath}`)
}

function resourceTool(ctx, paths, workspace) {
  return {
    name: 'dsh_resources',
    description: 'Read complete DSH host resources through native DSH services, including sensitive settings and credentials. Supports paged plugin, skill, session, storage, and DSH_HOME file access. This tool never writes.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        kind: {
          type: 'string',
          enum: RESOURCE_KINDS,
          description: 'Resource category to inspect.',
        },
        id: {
          type: 'string',
          description: 'Optional session id. With kind=sessions, return that session record instead of the session list.',
        },
        name: {
          type: 'string',
          description: 'Skill name for kind=skills.',
        },
        ref: {
          type: 'string',
          description: 'Credential reference (for example DEEPSEEK_API_KEY) for kind=credential.',
        },
        key: {
          type: 'string',
          description: 'Credential record key in <scope>/<id> form for kind=credential.',
        },
        path: {
          type: 'string',
          description: 'Absolute path under DSH_HOME or DSH_HOME-relative path for kind=list or kind=file.',
        },
        encoding: {
          type: 'string',
          enum: ['utf8', 'base64'],
          description: 'File output encoding for kind=file. Defaults to utf8.',
        },
        offset: {
          type: 'integer',
          description: 'Zero-based item, character, event-document, or byte offset for pagination.',
        },
        limit: {
          type: 'integer',
          description: 'Maximum list items (1-500) or content characters/bytes (1-65536), depending on kind.',
        },
      },
      required: ['kind'],
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    async execute(args, exec) {
      if (!RESOURCE_KINDS.includes(args.kind)) throw new Error(`unknown DSH resource kind: ${String(args.kind)}`)
      const value = await inspectResource(ctx, paths, workspace, args, exec)
      return formatToolOutput(value)
    },
    presentCall(args) {
      return {
        card: 'generic',
        title: `Inspect DSH ${args.kind}`,
        kind: 'read',
        rawInput: args.id ?? args.kind,
      }
    },
    isConcurrencySafe: () => true,
  }
}

async function inspectResource(ctx, paths, workspace, args, exec) {
  const resources = resourcePaths(paths)
  const offset = normalizedOffset(args.offset)
  const listLimit = boundedListLimit(args.limit ?? paths.defaultListLimit)
  const contentLimit = boundedContentLimit(args.limit ?? paths.defaultContentLimit)
  switch (args.kind) {
    case 'overview':
      return {
        workspace: {
          id: workspace.id,
          title: workspace.title,
          path: workspace.path,
          status: await workspace.status(),
        },
        paths: resources,
        permissions: {
          readOnly: 'All resource inspection, including sensitive settings and credential values, remains available; this plugin performs no mutation.',
          workspaceWrite: 'The same complete read access remains available. Normal Workspace files are writable through DSH tools; DSH host state remains outside the write boundary.',
          dangerFullAccess: 'DSH applies its standard unrestricted mutation policy.',
        },
        nativeServices: ['ctx.loader', 'ctx.skills', 'ctx.sessionQuery', 'ctx.fs', 'ctx.settings', 'ctx.credentials', 'ctx.storage'],
        sensitiveDataWarning: 'This plugin intentionally makes sensitive DSH information model-readable. Tool results may be sent to the configured model provider.',
      }
    case 'plugins':
      return {
        source: 'ctx.loader (same mechanism as the official Host plugin inventory)',
        profileRoot: resources.profiles,
        ...pageArray(listLoaderPlugins(ctx.loader), offset, listLimit),
        detailAccess: 'Use kind=list and kind=file under the profileRoot to inspect every installed package manifest and source file.',
      }
    case 'skills': {
      const view = {
        cwd: exec.agent?.session?.header?.cwd ?? paths.workspacePath,
        signal: exec.signal,
        scope: exec.agent,
      }
      if (args.name !== undefined) {
        const skill = await ctx.skills.get(args.name, view)
        if (skill === undefined) return { name: args.name, found: false }
        return {
          name: args.name,
          found: true,
          document: pageText(JSON.stringify(skill, null, 2), offset, contentLimit),
        }
      }
      const skills = await ctx.skills.list(view)
      return {
        projectSkillRoot: resources.projectSkills,
        userSkillRoot: resources.userSkills,
        ...pageArray(skills, offset, listLimit),
        detailAccess: 'Repeat with name=<skill name> to read the complete native skill definition and body in pages.',
      }
    }
    case 'memory':
      return readNativeFile(ctx, paths, resources.memory, 'utf8', offset, contentLimit, exec.signal)
    case 'sessions':
      return inspectSessions(ctx, args.id, offset, listLimit, contentLimit, exec.signal, resources.sessions)
    case 'storage': {
      const listing = await listNativeDirectory(ctx, paths, args.path ?? resources.storage, offset, listLimit, exec.signal)
      return {
        ...listing,
        source: 'ctx.storage + ctx.fs.listDir',
        nativeStorage: {
          backendNames: ctx.storage.backend.names(),
          formNames: [...ctx.storage.forms.keys()],
        },
      }
    }
    case 'settings': {
      const descriptors = ctx.settings.describe({ redactSecrets: false })
      return {
        source: 'ctx.settings.describe({ redactSecrets: false })',
        sensitive: true,
        document: pageText(JSON.stringify(descriptors, null, 2), offset, contentLimit),
      }
    }
    case 'credential':
      return inspectCredential(ctx, args)
    case 'list':
      return listNativeDirectory(ctx, paths, args.path ?? '.', offset, listLimit, exec.signal)
    case 'file':
      if (args.path === undefined) throw new Error('kind=file requires path')
      return readNativeFile(ctx, paths, args.path, args.encoding ?? 'utf8', offset, contentLimit, exec.signal)
    default:
      throw new Error(`unreachable DSH resource kind: ${args.kind}`)
  }
}

async function inspectSessions(ctx, id, offset, listLimit, contentLimit, signal, sessionsRoot) {
  const query = ctx.get?.('sessionQuery')
  if (query === undefined) {
    return {
      root: sessionsRoot,
      available: false,
      note: 'ctx.sessionQuery is not mounted in this profile; raw session persistence remains host-owned.',
    }
  }
  if (id !== undefined) {
    const record = await query.readSession(id)
    return {
      root: sessionsRoot,
      id,
      document: pageText(JSON.stringify(record, null, 2), offset, contentLimit),
    }
  }
  const allRecords = await query.listSessions(signal)
  const records = pageArray(allRecords, offset, listLimit)
  const titleResults = typeof query.readTitleSnapshots === 'function'
    ? await query.readTitleSnapshots(records.items.map((record) => record.header.id), signal)
    : []
  const titleById = new Map()
  for (const result of titleResults) {
    if (result.status === 'fulfilled' && result.value.title !== undefined) {
      titleById.set(result.value.session.id, result.value.title)
    }
  }
  return {
    root: sessionsRoot,
    ...records,
    items: records.items.map((record) => ({
      ...record,
      title: titleById.get(record.header.id),
    })),
  }
}

async function inspectCredential(ctx, args) {
  if (args.ref !== undefined) {
    return {
      sensitive: true,
      ref: args.ref,
      resolved: await ctx.credentials.resolve(args.ref),
      description: await ctx.credentials.describe(args.ref),
    }
  }
  if (args.key !== undefined) {
    return {
      sensitive: true,
      key: args.key,
      record: await ctx.credentials.readRecord(args.key),
      description: await ctx.credentials.describeRecord(args.key),
    }
  }
  return {
    sensitive: true,
    records: await ctx.credentials.listRecords(),
    note: 'The native credential service can enumerate stored record keys but intentionally has no reference-name enumeration API. Use kind=file on .credentials.yaml for every persisted reference, or pass ref to resolve environment/.env/file-backed values.',
  }
}

async function nativeTarget(ctx, paths, requestedPath, signal) {
  const hostPath = resolveDshResourcePath(paths.dshHome, requestedPath)
  const target = await ctx.fs.resolve(hostPath, { cwd: paths.workspacePath, signal })
  const info = await ctx.fs.stat(target, signal)
  if (info === undefined) throw new Error(`DSH resource does not exist: ${hostPath}`)
  return { hostPath, target, info }
}

async function listNativeDirectory(ctx, paths, requestedPath, offset, limit, signal) {
  const { hostPath, target, info } = await nativeTarget(ctx, paths, requestedPath, signal)
  if (info.type !== 'directory') throw new Error(`DSH resource is not a directory: ${hostPath}`)
  const entries = await ctx.fs.listDir(target, signal)
  const projected = entries.map((entry) => ({
    name: entry.name,
    type: entry.type,
    path: entry.target.displayPath,
    ...(entry.size === undefined ? {} : { size: entry.size }),
    ...(entry.version === undefined ? {} : { version: entry.version }),
  }))
  return {
    source: 'ctx.fs.listDir',
    requestedPath: hostPath,
    resolvedPath: target.displayPath,
    ...pageArray(projected, offset, limit),
  }
}

async function readNativeFile(ctx, paths, requestedPath, encoding, offset, limit, signal) {
  const { hostPath, target, info } = await nativeTarget(ctx, paths, requestedPath, signal)
  if (info.type !== 'file') throw new Error(`DSH resource is not a regular file: ${hostPath}`)
  if (encoding === 'base64') {
    if (info.size !== undefined && info.size > paths.maxBinaryReadBytes) {
      throw new Error(`binary DSH resource is ${info.size} bytes; increase maxBinaryReadBytes from ${paths.maxBinaryReadBytes} to read it`)
    }
    const bytes = await ctx.fs.readBytes(target, signal, paths.maxBinaryReadBytes)
    const start = normalizedOffset(offset)
    const cap = boundedContentLimit(limit)
    const page = bytes.slice(start, start + cap)
    const nextOffset = start + page.length < bytes.length ? start + page.length : null
    return {
      source: 'ctx.fs.readBytes',
      requestedPath: hostPath,
      resolvedPath: target.displayPath,
      encoding: 'base64',
      offset: start,
      limit: cap,
      totalBytes: bytes.length,
      nextOffset,
      eof: nextOffset === null,
      content: Buffer.from(page).toString('base64'),
    }
  }
  const content = await ctx.fs.readText(target, signal)
  return {
    source: 'ctx.fs.readText',
    requestedPath: hostPath,
    resolvedPath: target.displayPath,
    encoding: 'utf8',
    document: pageText(content, offset, limit),
  }
}

function resourceContext(paths, resources) {
  return `DSH default Workspace is active at ${JSON.stringify(paths.workspacePath)}. The read-only dsh_resources tool provides complete, paged access to DSH plugins and their files, skill definitions and bodies, Workspace memory, full session records, storage files, unredacted settings, and credential values through native DSH services. Sensitive tool results may be sent to the configured model provider. Workspace-local skills live at ${JSON.stringify(resources.projectSkills)}; user-wide DSH skills live at ${JSON.stringify(resources.userSkills)}. Host settings, credentials, profiles, raw sessions, and storages remain outside the Workspace write boundary.`
}

function memoryContext(memoryPath, maxBytes) {
  let content
  try {
    content = readFileSync(memoryPath, 'utf8')
  } catch (error) {
    if (error?.code === 'ENOENT') return ''
    return `DSH Workspace memory at ${JSON.stringify(memoryPath)} could not be read: ${String(error)}`
  }
  const trimmed = content.trim()
  if (trimmed.length === 0) return ''
  return `Persistent DSH Workspace memory from ${JSON.stringify(memoryPath)}:\n\n${truncateUtf8(trimmed, maxBytes)}`
}

function isDefaultSession(request, workspacePath) {
  const cwd = request.agent?.session?.header?.cwd
  return typeof cwd === 'string' && samePath(cwd, workspacePath)
}

export default { name, inject, Config, apply }
