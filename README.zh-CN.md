# better-basicfun

这是一个可直接安装、兼容 Windows/macOS/Linux 的 DSH bundle。它只补充 DSH 当前缺少的宿主端基础能力：默认工作区、完整资源检查，以及 CLIProxyAPI 富模型目录到 DSH 原生 Provider 配置的同步。

它不是 Codex 插件，不读取 `~/.codex`，不注入或修改 DSH 前端，也不代理推理请求。模型和思考强度仍由 DSH 原生选择器展示与选择。

源码仓库：<https://github.com/CDeZT/better-basicfun> · 发布包：<https://github.com/CDeZT/better-basicfun/releases/latest> · 官方社区帖子：<https://github.com/deepseek-ai/deepseek-harness/discussions/5344>

## 功能

- 创建并注册 `$DSH_HOME/workspace`（通常是 `~/.dsh/workspace`）为默认工作区。
- 创建但绝不覆盖 `AGENTS.md`、`MEMORY.md` 和 `.dsh/skills/`。
- 为默认工作区会话加载持久记忆。
- 注册只读工具 `dsh_resources`，检查插件、skills、memory、会话、storage、settings、credentials 和 `DSH_HOME` 文件。
- 在宿主端同步 CLIProxyAPI 富模型目录，使 DSH 原生模型/思考强度选择器获得动态能力数据。
- 不包含 React、DOM 注入、前端滑块或按模型名称猜测能力的静态表。

本插件会有意把敏感 DSH 数据暴露给模型。`dsh_resources` 可以返回未脱敏 settings、解析后的凭据值、完整会话和 `DSH_HOME` 文件；工具结果可能被发送给模型服务商。安装前请阅读 [SECURITY.md](SECURITY.md)。

## CLIProxyAPI 原生目录 bridge

在 DSH 自定义 Provider 中填写 CLIProxyAPI 的真实推理地址。插件只做目录同步：

```text
GET {baseURL}/models?client_version=pi
  → CLIProxyAPI models[] 富目录
  → DSH models[]（id/name/contextWindow/maxTokens/input/reasoningEfforts）
  → 写回 llm-pi-ai settings
  → DSH 原生模型与思考强度选择器
```

聊天/工具调用链路不经过插件：

```text
DSH → 你配置的 CLIProxyAPI Base URL → 模型服务
```

示例配置：

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

DSH 当前不允许保存完全没有模型的自定义 Provider。首次配置时，推荐直接点击 DSH 的“获取可用模型”，全选或至少选择一个模型后再保存；不需要手写占位模型。插件会在保存后自动用富目录补全这些模型。

bridge 在插件启动、`llm-pi-ai` 设置变化、相关 API Key 变化和默认每 15 分钟同步一次。普通 OpenAI `{"data": [...]}` 响应不会触发修改；只有 CLIProxyAPI `{"models": [...]}` 富响应才会被识别。请求失败或返回空目录时不会清空已有模型。

Base URL 只填写正常推理地址，例如 `http://127.0.0.1:8317/v1`。不要在这里添加 `/models` 或 `?client_version=pi`；插件会自动构造并请求对应的富目录地址。

能力映射规则：

- `none` 映射到 DSH 的 `off`，wire value 仍为 `none`。
- `minimal/low/medium/high/xhigh/max` 原样映射。
- 只有 `ultra` 而没有 `max` 时，使用 DSH 目前最高的 `max` 位置，wire value 保留为 `ultra`。
- 不根据模型名称猜测任何未返回的能力。
- CLIProxyAPI 的 `default_reasoning_level` 暂不写入，因为 DSH 当前模型 profile 没有安全、等价的逐模型默认值字段。

API Key 只由 DSH 宿主端解析，并只发送到该 Provider 配置的目录地址，不会进入浏览器。

## 安装

在 PowerShell 中执行：

```powershell
& "$env:APPDATA\DSH Desktop\host-commands\desktop\bin\dsh.cmd" plugin --profile desktop add "C:\path\to\better-basicfun-1.3.0.tgz"
```

安装后重启 DSH Desktop。

## 默认布局与权限边界

- 默认工作区：`$DSH_HOME/workspace`
- 工作区技能：`$DSH_HOME/workspace/.dsh/skills`
- DSH 用户级技能：`$DSH_HOME/skills`
- 持久记忆：`$DSH_HOME/workspace/MEMORY.md`
- profiles、sessions、storages 和凭据仍位于 `$DSH_HOME`，但不属于工作区写入边界

不要把整个 `$DSH_HOME` 设置为工作区，否则 `workspace-write` 会允许模型修改 DSH 凭据、配置和会话。插件通过 DSH 的宿主服务提供完整只读发现，无需扩大写入边界，也不需要配置 `customSkillDirs`。

`dsh_resources` 的 `kind` 包括 `overview`、`plugins`、`skills`、`memory`、`sessions`、`storage`、`settings`、`credential`、`cliproxyapi`、`list` 和 `file`。`kind=cliproxyapi` 返回最近一次同步状态，不返回凭据。

## 可选配置

默认无需配置。覆盖配置示例：

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

`cliProxyRoutes: []` 会探测所有带 Base URL 的 OpenAI 兼容自定义 Provider，但只对富 `models[]` 响应写入。若只探测指定路由，使用 `cliProxyRoutes: [cliproxyapi]`。

## 卸载

```powershell
& "$env:APPDATA\DSH Desktop\host-commands\desktop\bin\dsh.cmd" plugin --profile desktop remove better-basicfun
```

卸载不会删除工作区、记忆、skills 或用户文件。
