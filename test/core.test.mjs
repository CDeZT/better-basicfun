import assert from 'node:assert/strict'
import { mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { apply } from '../lib/index.js'
import {
  ensureWorkspaceLayout,
  listLoaderPlugins,
  pageArray,
  pageText,
  readMemory,
  registerDefaultWorkspace,
  resolveDshResourcePath,
  resolveWorkspaceConfig,
  samePath,
  truncateUtf8,
} from '../lib/core.js'

test('default path is a dedicated child rather than the writable DSH private root', () => {
  const dshHome = join(tmpdir(), 'example-dsh-home')
  const userHome = join(tmpdir(), 'example-user-home')
  const resolved = resolveWorkspaceConfig({}, { DSH_HOME: dshHome }, userHome)
  assert.equal(resolved.dshHome, dshHome)
  assert.equal(resolved.workspacePath, join(dshHome, 'workspace'))
  assert.notEqual(resolved.workspacePath, resolved.dshHome)
})

test('environment workspace override supports isolated deployment', () => {
  const dshHome = join(tmpdir(), 'example-dsh-home')
  const workspace = join(tmpdir(), 'example-dsh-workspace')
  const resolved = resolveWorkspaceConfig(
    {},
    { DSH_HOME: dshHome, DSH_DEFAULT_WORKSPACE: workspace },
    join(tmpdir(), 'example-user-home'),
  )
  assert.equal(resolved.workspacePath, workspace)
})

test('workspace layout is non-destructive and creates native skill and memory locations', async () => {
  const root = await mkdtemp(join(tmpdir(), 'dsh-default-workspace-'))
  const paths = resolveWorkspaceConfig({ dshHome: root })
  try {
    await ensureWorkspaceLayout(paths)
    const memoryPath = join(paths.workspacePath, 'MEMORY.md')
    await writeFile(memoryPath, '# User memory\nkeep this', 'utf8')
    await ensureWorkspaceLayout(paths)
    assert.equal(await readFile(memoryPath, 'utf8'), '# User memory\nkeep this')
    assert.match(await readFile(join(paths.workspacePath, 'AGENTS.md'), 'utf8'), /dsh_resources/)
    assert.equal(await readMemory(paths), '# User memory\nkeep this')
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('workspace registration reuses the path and pins it first', async () => {
  const calls = []
  const target = { id: 'default', path: 'X', title: 'Default', status: async () => 'ok' }
  const other = { id: 'other' }
  const registry = {
    async create(path, title) {
      calls.push(['create', path, title])
      return target
    },
    list() {
      return [other, target]
    },
    async insertBefore(id, beforeId) {
      calls.push(['insertBefore', id, beforeId])
    },
  }
  await registerDefaultWorkspace(registry, { workspacePath: 'X', title: 'Default', pinFirst: true })
  assert.deepEqual(calls, [
    ['create', 'X', 'Default'],
    ['insertBefore', 'default', 'other'],
  ])
})

test('loader inventory mirrors official entry state without group rows', () => {
  const loader = {
    entries() {
      return [
        { id: 'group', options: { group: true, name: 'group' } },
        { id: 'active', options: { name: 'plugin-a' }, disabled: false, fiber: { state: 2 } },
        { id: 'disabled', options: { name: 'plugin-b' }, disabled: true },
      ]
    },
  }
  assert.deepEqual(listLoaderPlugins(loader), [
    { entryId: 'active', moduleName: 'plugin-a', enabled: true, fiberPhase: 'active' },
    { entryId: 'disabled', moduleName: 'plugin-b', enabled: false, fiberPhase: null },
  ])
})

test('path comparison follows Windows case-insensitive identity', () => {
  assert.equal(samePath('C:\\Users\\A\\Work', 'c:\\users\\a\\work', 'win32'), true)
})

test('UTF-8 truncation never exceeds the byte budget', () => {
  const result = truncateUtf8('汉字'.repeat(100), 80)
  assert.ok(Buffer.byteLength(result, 'utf8') <= 80)
  assert.match(result, /truncated/)
})

test('array and text pagination expose a lossless continuation offset', () => {
  assert.deepEqual(pageArray(['a', 'b', 'c'], 1, 1), {
    offset: 1,
    limit: 1,
    total: 3,
    nextOffset: 2,
    items: ['b'],
  })
  assert.deepEqual(pageText('abcdef', 2, 3), {
    offset: 2,
    limit: 3,
    totalCharacters: 6,
    nextOffset: 5,
    eof: false,
    content: 'cde',
  })
})

test('DSH resource paths cannot escape DSH_HOME lexically', () => {
  const root = join(tmpdir(), 'dsh-resource-root')
  assert.equal(resolveDshResourcePath(root, join('profiles', 'desktop')), join(root, 'profiles', 'desktop'))
  assert.throws(() => resolveDshResourcePath(root, join('..', 'outside')), /must stay under DSH_HOME/)
})

test('registered tool exposes unredacted native settings, credentials, and DSH files', async () => {
  const dshHome = await mkdtemp(join(tmpdir(), 'dsh-full-resource-test-'))
  const workspacePath = join(dshHome, 'workspace')
  let tool
  const workspace = {
    id: 'workspace-id',
    title: 'Default workspace',
    path: workspacePath,
    async status() { return 'ok' },
  }
  const ctx = {
    workspaceRegistry: {
      async create() { return workspace },
      list() { return [workspace] },
      async insertBefore() {},
    },
    systemPrompt: { context() {} },
    tools: { register(value) { tool = value } },
    loader: { entries() { return [] } },
    settings: {
      describe(options) {
        assert.equal(options.redactSecrets, false)
        return [{ ns: 'provider', value: { token: 'settings-secret' } }]
      },
    },
    credentials: {
      async resolve(ref) { return { value: `secret-for-${ref}`, source: 'file' } },
      async describe() { return { configured: true, source: 'file', writable: true } },
      async listRecords() { return [] },
    },
    storage: {},
    skills: { async list() { return [] } },
    fs: nativeFsMock(),
    get() { return undefined },
    logger: { info() {} },
  }
  try {
    await apply(ctx, { dshHome, workspacePath })
    await writeFile(join(dshHome, '.credentials.yaml'), 'DEMO_SECRET: visible', 'utf8')
    const exec = { signal: new AbortController().signal, agent: { session: { header: { cwd: workspacePath } } } }

    const settings = JSON.parse(await tool.execute({ kind: 'settings' }, exec))
    assert.match(settings.document.content, /settings-secret/)

    const credential = JSON.parse(await tool.execute({ kind: 'credential', ref: 'DEMO_SECRET' }, exec))
    assert.equal(credential.resolved.value, 'secret-for-DEMO_SECRET')

    const file = JSON.parse(await tool.execute({ kind: 'file', path: '.credentials.yaml' }, exec))
    assert.equal(file.document.content, 'DEMO_SECRET: visible')
  } finally {
    await rm(dshHome, { recursive: true, force: true })
  }
})

function nativeFsMock() {
  return {
    async resolve(path) { return { targetKey: path, displayPath: path } },
    async stat(target) {
      try {
        const value = await stat(target.targetKey)
        return { type: value.isDirectory() ? 'directory' : value.isFile() ? 'file' : 'other', size: value.size, version: String(value.mtimeMs) }
      } catch (error) {
        if (error.code === 'ENOENT') return undefined
        throw error
      }
    },
    async listDir(target) {
      return Promise.all((await readdir(target.targetKey, { withFileTypes: true })).map(async (entry) => {
        const path = join(target.targetKey, entry.name)
        const value = await stat(path)
        return {
          name: entry.name,
          type: entry.isDirectory() ? 'directory' : entry.isFile() ? 'file' : 'other',
          target: { targetKey: path, displayPath: path },
          size: value.size,
          version: String(value.mtimeMs),
        }
      }))
    },
    async readText(target) { return readFile(target.targetKey, 'utf8') },
    async readBytes(target, _signal, maxBytes) {
      const bytes = await readFile(target.targetKey)
      if (bytes.length > maxBytes) throw new Error('too large')
      return bytes
    },
  }
}
