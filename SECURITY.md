# Security policy

## Deliberate sensitive-data capability

This plugin is intentionally high privilege on the read axis. Its model-facing `dsh_resources` tool can return unredacted DSH settings, resolved credential values, credential records, complete session records, plugin files, skill bodies, memory, and files below `DSH_HOME`. Returned data can be sent to the configured model provider.

Install this plugin only when that disclosure model is acceptable. Do not install it on a shared or untrusted DSH deployment. DSH itself is experimental software; its [upstream safety notice](https://github.com/deepseek-ai/deepseek-harness/blob/master/SAFETY.md) recommends least privilege and warns that plugins can access credentials and files.

The capability is read-only. The plugin does not change the active permission preset, grant mutation access outside the Workspace, create symlinks, execute subprocesses, open network connections, or collect telemetry.

## Reporting a vulnerability

Please use GitHub private vulnerability reporting. Do not put real credentials, private sessions, or personal data in a public issue.

In scope:

- writes outside the configured Workspace performed by `dsh_resources`;
- network transmission initiated by the plugin itself;
- path traversal outside `DSH_HOME` that does not rely on a user-created link inside `DSH_HOME`;
- package contents not declared by the package allowlist;
- a difference between documented and actual sensitive-data exposure.
