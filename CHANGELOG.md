# Changelog

## 1.0.0 - 2026-09-01

- Create and register `$DSH_HOME/workspace` as the default DSH Workspace.
- Add complete paged DSH resource discovery through native Host services.
- Expose unredacted settings, resolved credentials, credential records, full skill definitions, complete session documents, plugin inventory, and DSH_HOME files.
- Use the official validated `Config` schema and report native storage backends/forms through `ctx.storage`.
- Preserve DSH's normal mutation boundary in `read-only` and `workspace-write` modes.
- Add Windows, macOS, and Linux-compatible path handling and tests.
