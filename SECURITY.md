# Security policy

## Deliberate sensitive-data capability

This plugin is intentionally high privilege on the read axis. Its model-facing `dsh_resources` tool can return unredacted DSH settings, resolved credential values, credential records, complete sessions, plugin files, skill bodies, memory, and files below `DSH_HOME`. Returned data can be sent to the configured model provider.

Install it only when that disclosure model is acceptable. Do not install it on a shared or untrusted DSH deployment. DSH's [upstream safety notice](https://github.com/deepseek-ai/deepseek-harness/blob/master/SAFETY.md) recommends least privilege and warns that plugins can access credentials and files.

Resource inspection is read-only. The plugin does not change DSH's permission preset, widen the Workspace write root, create links, execute subprocesses, inject browser code, or collect telemetry.

When CLIProxyAPI synchronization is enabled, the DSH host sends an authenticated `GET` request to the model-catalog endpoint derived from each selected custom Provider Base URL. The API key is resolved by the host and is not exposed to the browser. Limit synchronization to trusted routes with `cliProxyRoutes` when automatic probing is not appropriate.

## Reporting a vulnerability

Please use GitHub private vulnerability reporting. Do not include real credentials, private sessions, or personal data in a public issue.

In scope:

- writes outside the configured Workspace performed by `dsh_resources`;
- network requests to destinations other than configured Provider catalog endpoints;
- accidental credential exposure to the frontend or logs;
- path traversal outside `DSH_HOME` that does not rely on a user-created link inside `DSH_HOME`;
- package contents not declared by the package allowlist;
- a difference between documented and actual sensitive-data exposure.
