# Changelog

## 1.3.0 - 2026-09-02

- Remove all frontend injection, React dependencies, custom sliders, and static model-name capability guesses; DSH's native controls are now the only UI.
- Add a host-only CLIProxyAPI catalog bridge; inference traffic still goes directly from DSH to the configured provider.
- Fetch `/v1/models?client_version=pi` and map rich model names, capacities, modalities, and reasoning levels into native `llm-pi-ai` model profiles.
- Refresh on startup, settings changes, relevant credential changes, and a configurable interval without erasing working models on empty/error responses.
- Keep credentials out of the frontend path and expose bridge diagnostics through `dsh_resources kind=cliproxyapi`.

## 1.2.1 - 2026-09-01

- Rebuild the composer control from the smooth upstream implementation to avoid renderer churn.
- Keep the animated slider, add clear per-level ticks, and expose official manual choices behind **Advanced settings**.
- Leave native DeepSeek and unsupported/unknown models on DSH's own controls.

## 1.2.0 - 2026-09-01

- Rename the bundle to `better-basicfun`.
- Merge the default Workspace/resource tool and reasoning-capability protection with a third-party effort slider.
- Keep the slider animated but restrained, add clear per-level tick marks, and expose the original manual choices under **Advanced settings**.
- Keep native DSH providers on their native model/reasoning controls and leave unknown models untouched.
- Add validation and regression tests for provider classification, wire-format mappings, and non-destructive updates.

## 1.0.0 - 2026-09-01

- Create and register `$DSH_HOME/workspace` as the default DSH Workspace.
- Add complete paged DSH resource discovery through native Host services.
- Expose unredacted settings, resolved credentials, credential records, full skill definitions, complete session documents, plugin inventory, and DSH_HOME files.
- Use the official validated `Config` schema and report native storage backends/forms through `ctx.storage`.
- Preserve DSH's normal mutation boundary in `read-only` and `workspace-write` modes.
- Add Windows, macOS, and Linux-compatible path handling and tests.
