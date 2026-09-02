# better-basicfun

An installable, cross-platform DSH bundle that fills a small set of missing host-side fundamentals: a persistent default Workspace, complete resource inspection, and synchronization of CLIProxyAPI's rich model catalog into native DSH Provider settings.

It is not a Codex plugin, does not read `~/.codex`, does not inject or modify DSH frontend code, and does not proxy inference. DSH's native model and reasoning selector remains authoritative.

Source: <https://github.com/CDeZT/better-basicfun> · Release: <https://github.com/CDeZT/better-basicfun/releases/latest> · Community: <https://github.com/deepseek-ai/deepseek-harness/discussions/5344>

## Features

- Creates and registers `$DSH_HOME/workspace` as the default Workspace.
- Creates `AGENTS.md`, `MEMORY.md`, and `.dsh/skills/` without overwriting user files.
- Loads persistent memory for sessions in the default Workspace.
- Adds the read-only `dsh_resources` tool for plugins, skills, memory, sessions, storage, settings, credentials, and files below `DSH_HOME`.
- Synchronizes CLIProxyAPI's rich model catalog on the host so DSH's native selector receives dynamic capability metadata.
- Contains no React dependency, DOM injection, frontend slider, or static model-name capability guesses.

This plugin deliberately exposes sensitive DSH data to the model. `dsh_resources` can return unredacted settings, resolved credentials, complete sessions, and files below `DSH_HOME`; tool results may be sent to the configured model provider. Read [SECURITY.md](SECURITY.md) before installing.

## CLIProxyAPI native catalog bridge

Configure a DSH custom Provider with the real CLIProxyAPI inference URL. The plugin only synchronizes the catalog:

```text
GET {baseURL}/models?client_version=pi
  → CLIProxyAPI rich models[] catalog
  → DSH models[] (id/name/contextWindow/maxTokens/input/reasoningEfforts)
  → llm-pi-ai settings
  → native DSH model/reasoning selector
```

Inference remains direct: `DSH → configured CLIProxyAPI Base URL → model service`.

Example:

```yaml
llm-pi-ai:
  providers:
    cliproxyapi:
      displayName: CLIProxyAPI
      apiKeyEnv: CLIPROXYAPI_KEY
      api: openai-responses
      baseURL: http://127.0.0.1:8317/v1
      models:
        - id: placeholder
```

DSH currently cannot save a custom Provider with no models. During initial setup, use DSH's **Fetch available models** action and select at least one result before saving; no hand-written placeholder is needed. The bridge enriches the selected list after the Provider is saved.

The bridge refreshes at startup, after `llm-pi-ai` changes, after a relevant API key changes, and every 15 minutes by default. Plain OpenAI `{"data": [...]}` responses are ignored. Empty or failed responses never erase a working model list. API keys are resolved on the DSH host and sent only to the configured Provider catalog endpoint, never to the browser.

Enter only the normal inference Base URL, such as `http://127.0.0.1:8317/v1`. Do not append `/models` or `?client_version=pi`; the bridge constructs the rich catalog URL itself.

Reasoning levels are mapped from the remote catalog only: `none` becomes DSH `off`; canonical levels remain unchanged; and `ultra` occupies DSH's current `max` position only when no real `max` is advertised. The bridge never guesses capabilities from model names. `default_reasoning_level` is not written because DSH currently has no safe equivalent per-model default field.

## Install in DSH Desktop

```powershell
& "$env:APPDATA\DSH Desktop\host-commands\desktop\bin\dsh.cmd" plugin --profile desktop add "C:\path\to\better-basicfun-1.3.0.tgz"
```

Restart DSH Desktop after installation.

## Workspace and permission boundary

The Workspace is `$DSH_HOME/workspace`; its skills are in `.dsh/skills`, while user-level skills remain in `$DSH_HOME/skills`. Profiles, sessions, storage, settings, and credentials stay outside the Workspace write boundary.

Do not use all of `$DSH_HOME` as a Workspace: `workspace-write` would then allow changes to private DSH state. This plugin provides read-only discovery through native host services without widening that boundary. No `customSkillDirs` change is needed.

`dsh_resources` supports `overview`, `plugins`, `skills`, `memory`, `sessions`, `storage`, `settings`, `credential`, `cliproxyapi`, `list`, and `file`. The `cliproxyapi` view reports synchronization status without returning credentials.

## Configuration

Defaults require no configuration. Example override:

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
    cliProxySync: true
    cliProxyProbeAllCustomProviders: true
    cliProxyRoutes: []
    cliProxyRefreshMinutes: 15
    cliProxyRequestTimeoutMs: 10000
```

An empty `cliProxyRoutes` probes custom OpenAI-compatible Base URLs but only writes when a rich `models[]` response is recognized. Use `cliProxyRoutes: [cliproxyapi]` to restrict probing to named routes.

## Uninstall

```powershell
& "$env:APPDATA\DSH Desktop\host-commands\desktop\bin\dsh.cmd" plugin --profile desktop remove better-basicfun
```

Uninstalling leaves user-authored Workspace files, memory, and skills intact.
