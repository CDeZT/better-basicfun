# dsh-default-workspace

这是一个可直接安装、兼容 Windows/macOS/Linux 的 DSH bundle，不是 Codex 插件，也不会读取或桥接 `~/.codex`。

源码仓库：<https://github.com/CDeZT/dsh-default-workspace> · 发布包：<https://github.com/CDeZT/dsh-default-workspace/releases/latest> · 官方社区帖子：<https://github.com/deepseek-ai/deepseek-harness/discussions/5344>

本插件会有意把敏感 DSH 数据暴露给模型：`dsh_resources` 可以返回未脱敏 settings、解析后的凭据值、凭据记录、完整会话、插件文件、skill 正文、memory 和 `DSH_HOME` 下的文件。工具结果可能被发送给模型服务商。安装前请阅读 [SECURITY.md](SECURITY.md)。

## 默认布局

- 默认工作区：`$DSH_HOME/workspace`，通常是 `~/.dsh/workspace`
- 工作区技能：`$DSH_HOME/workspace/.dsh/skills`
- DSH 用户级技能：`$DSH_HOME/skills`
- 持久记忆：`$DSH_HOME/workspace/MEMORY.md`
- DSH profiles、sessions、storages 和凭据：继续留在 `$DSH_HOME`，但不属于工作区写入边界

这里特意不把整个 `$DSH_HOME` 设成工作区。否则 `workspace-write` 会允许模型修改 DSH 凭据、配置、插件 profile 和会话数据。DSH 的沙箱限制写入而不限制读取；插件通过 `ctx.loader`、`ctx.skills`、`ctx.sessionQuery`、`ctx.fs`、`ctx.settings`、`ctx.credentials` 和 `ctx.storage` 提供完整只读资源发现。

## 安装

在 PowerShell 中执行：

```powershell
& "$env:APPDATA\DSH Desktop\host-commands\desktop\bin\dsh.cmd" plugin --profile desktop add "C:\path\to\dsh-default-workspace-1.0.0.tgz"
```

安装后重启 DSH Desktop。插件会自动：

1. 创建并注册默认工作区；
2. 将其移到 DSH 工作区顺序首位，供新会话作为最近工作区使用；
3. 创建但绝不覆盖 `AGENTS.md`、`MEMORY.md` 和 `.dsh/skills`；
4. 向该工作区的会话注入资源说明和持久记忆；
5. 注册只读工具 `dsh_resources`，可以查看 DSH 自己的插件和文件、完整 skills、memory、完整会话、storage 文件、未脱敏 settings 和 credentials。

不需要修改 `customSkillDirs`。DSH 原生就会扫描工作区的 `.dsh/skills` 和 `$DSH_HOME/skills`。

`dsh_resources` 的 `kind` 包括 `overview`、`plugins`、`skills`、`memory`、`sessions`、`storage`、`settings`、`credential`、`list` 和 `file`。通过 `offset`/`limit` 连续分页；返回 `nextOffset` 时继续读取，不会静默丢弃前后内容。`skills` 传 `name`、`sessions` 传 `id` 可以读取完整正文；`list`/`file` 可以遍历和读取 `DSH_HOME` 下的 profiles、已安装包和其他文件。`storage` 还会通过原生 `ctx.storage` 报告已挂载的 backend/form，再列出对应目录。

## 权限语义

- `read-only`：可以查询资源、读取技能、记忆和会话；不能修改文件。
- `workspace-write`：可以修改默认工作区内的普通文件、`MEMORY.md` 和工作区技能；不能修改父目录中的 DSH 私有状态。
- `danger-full-access`：仍完全遵循 DSH 自己的标准策略。

插件不会创建符号链接或 junction，也不会绕过 DSH 的 canonical path 检查。

## 可选配置

默认无需配置。如果要换路径，在 `$DSH_HOME/profiles/desktop/cordis.patch.yml` 中加入更晚的覆盖层：

```yaml
- id: default-workspace
  config:
    workspacePath: 'D:\DSH\Default'
    title: 'Default workspace'
    pinFirst: true
    memoryMaxBytes: 32768
    defaultListLimit: 50
    defaultContentLimit: 32768
    maxBinaryReadBytes: 67108864
```

## 卸载

```powershell
& "$env:APPDATA\DSH Desktop\host-commands\desktop\bin\dsh.cmd" plugin --profile desktop remove dsh-default-workspace
```

卸载不会删除工作区和用户写入的记忆、skills 或普通文件。
