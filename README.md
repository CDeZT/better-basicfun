# better-basicfun

An installable, cross-platform DSH bundle that combines a persistent default Workspace with a conservative, native-first reasoning-capability guard.

This is a DSH plugin, not a Codex plugin. It never bridges to `~/.codex`.

Source: <https://github.com/CDeZT/better-basicfun> · Release: <https://github.com/CDeZT/better-basicfun/releases/latest> · Community: <https://github.com/deepseek-ai/deepseek-harness/discussions/5344>

## Important security warning

This plugin deliberately exposes sensitive DSH data to the model. `dsh_resources` can return unredacted settings, resolved credential values, credential records, full session records, plugin files, skill bodies, memory, and files below `DSH_HOME`. Tool results may be sent to the configured model provider. Install it only on a trusted personal deployment; read [SECURITY.md](SECURITY.md) first.

## What it does

- Creates and registers `$DSH_HOME/workspace` as **Default workspace** (normally `~/.dsh/workspace`).
- Moves that Workspace to the front of DSH's durable Workspace order, so the Web/Desktop new-session flow can use it as the most recent fallback.
- Creates `AGENTS.md`, `MEMORY.md`, and `.dsh/skills/` without overwriting existing files.
- Loads `MEMORY.md` into requests made from the default Workspace.
- Adds the read-only `dsh_resources` tool for complete plugin inventory and package files, skill bodies, memory, full session records, storage files, unredacted settings and credentials, and every file below `DSH_HOME`.
- Keeps `$DSH_HOME/settings.yaml`, `.credentials.yaml`, profiles, sessions, and storages outside the `workspace-write` boundary.
- Audits third-party model capability mappings in the native `llm-pi-ai` settings namespace.
- Fills only a small, evidence-backed fallback set (`gemini-3.7-flash-high`, `hy4-preview`, and `hy3`/`hy3-x`) when a mapping is absent; explicit mappings always win.
- Leaves native DSH providers (including DeepSeek's native route), unknown models, and invalid user-authored mappings untouched except for a diagnostic log entry.
- Does not replace the DSH Composer model trigger or remove manual model/reasoning selection. The third-party-only slider is inserted inside the native menu, while native DSH controls remain authoritative.

The reasoning guard is deliberately host-only. It does not send requests, alter provider endpoints, infer unsupported effort levels, or guess a wire format. DSH's existing `reasoningEfforts` mapping is the source of truth for model-specific request encoding.

The browser-side enhancement adds a restrained, native range slider for non-native providers. It uses clearly visible per-level tick marks and keeps the original DSH menu rows behind an **Advanced settings** item, so detailed manual selection remains available. Native DeepSeek routes bypass the slider and use DSH's own controls.

The dedicated `workspace` child is a narrow write boundary inside DSH's home. Do **not** use the whole `$DSH_HOME` directory as a Workspace: in `workspace-write`, that would make credentials, configuration, profiles, and session databases writable. DSH filesystem sandbox modes restrict writes, not reads; resource discovery is provided by `dsh_resources` rather than by weakening the write boundary.

DSH already discovers both `<workspace>/.dsh/skills` and `$DSH_HOME/skills`; this bundle does not require `customSkillDirs`.

## Native resource access and pagination

The tool is backed by `ctx.loader`, `ctx.skills`, `ctx.sessionQuery`, `ctx.fs`, `ctx.settings`, `ctx.credentials`, and `ctx.storage`. Its `kind` values are `overview`, `plugins`, `skills`, `memory`, `sessions`, `storage`, `settings`, `credential`, `list`, and `file`. `kind=storage` also reports the mounted native storage backend and form names before listing the corresponding DSH storage directory.

Use `offset` and `limit` to continue a result. A `nextOffset` value means another page is available; the plugin does not silently replace a complete list with “last N” entries. For `skills`, pass `name` to read a complete native definition/body. For `sessions`, pass `id` to read a complete session document. `list` and `file` accept any DSH_HOME-relative or DSH_HOME-contained path, including profiles and installed package files.

The lexical path check blocks `..` traversal outside `DSH_HOME` while allowing DSH's own package links. Text and structured resources are page-addressable. Binary reads use native `ctx.fs.readBytes` and are bounded by `maxBinaryReadBytes` to avoid accidental unbounded allocations.

## Install in DSH Desktop

Pack or download the `.tgz`, then run the DSH command bundled with DSH Desktop:

```powershell
& "$env:APPDATA\DSH Desktop\host-commands\desktop\bin\dsh.cmd" plugin --profile desktop add "C:\path\to\better-basicfun-1.2.0.tgz"
```

Restart DSH Desktop after installation. `dsh plugin` adds the package's `dsh.bundle` layer automatically.

## Configuration

Defaults require no configuration. To override them, add a later layer in `$DSH_HOME/profiles/desktop/cordis.patch.yml`:

```yaml
- id: better-basicfun
  config:
    workspacePath: 'D:\DSH\Default'
    title: 'Default workspace'
    pinFirst: true
    memoryMaxBytes: 32768
    defaultListLimit: 50
    defaultContentLimit: 32768
    maxBinaryReadBytes: 67108864
    reasoningGuard: true
```

Patch config values replace the row's complete config, so restate every non-default key you want to keep.

For temporary testing, `DSH_DEFAULT_WORKSPACE` can override the default path without editing the profile. An explicit `workspacePath` in plugin configuration takes precedence.

## Permission behavior

- `read-only`: every `dsh_resources` operation works, including sensitive reads; no mutation is performed.
- `workspace-write`: the same complete read access remains available. Normal files, `MEMORY.md`, and Workspace-local skills can be changed; host settings and state stay outside the allowed write root.
- `danger-full-access`: DSH applies its standard unrestricted policy.

The plugin never changes DSH's sandbox mode and never uses symlinks or junctions to bypass canonical path containment.

The package contains no `preinstall`, `install`, `postinstall`, or `prepare` script. It ships built JavaScript and can be installed from a GitHub release tarball without a build step.

The bundled slider code is credited in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

## Official mechanisms used

- DSH bundle packaging and automatic profile-layer registration: <https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/develop/basic/publish.md>
- Workspace registry and host-owned Workspace model: <https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/workspace.md>
- Native skill discovery roots, including `<workspace>/.dsh/skills` and `$DSH_HOME/skills`: <https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/skills.md>
- Native `AGENTS.md` instructions: <https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/context/agent-instructions/README.md>
- Session query service: <https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/session-query/tool-session-query/README.md>
- Filesystem and sandbox behavior: <https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/filesystem.md>

## Uninstall

```powershell
& "$env:APPDATA\DSH Desktop\host-commands\desktop\bin\dsh.cmd" plugin --profile desktop remove better-basicfun
```

Uninstalling unregisters the plugin. It intentionally leaves the Workspace directory and user-authored `MEMORY.md`, skills, and files in place.
