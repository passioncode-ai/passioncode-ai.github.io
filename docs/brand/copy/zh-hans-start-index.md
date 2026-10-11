Contract: brand-contract v1

<!-- Generated from zh-hans/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

开始使用 | 安装你的 AI 智能体工作空间 | PassionCode.ai

安装 PassionCode.ai 技能，添加 Fabric，用 Claude Code 或 Codex 创建你的第一个 Fabric 智能体，或适配现有项目，在 Fabric Dashboards 中运行它，并把下一个智能体加入同一个项目。免费且开源。

跳到正文

PassionCode

.ai

愿景

个人

组织

工具

关于

简体中文

English

Русский

Deutsch

Français

Polski

한국어

Español

Português (Brasil)

日本語

获取工具

↓

开始使用 · 免费且开源

# 从一台空白的 Mac 到你的第一个智能体

构建能持续工作、并知道其他智能体做过什么的智能体。五个步骤，约二十分钟，每一步都可单独发挥作用

需要 Node.js 18+ 以及 Claude Code 或 Codex Fabric 需要搭载 Apple silicon 或 Intel 的 macOS

01

安装技能

02

添加 Fabric

03

创建或适配一个智能体

04

运行并查看

05

添加下一个智能体

+

参与贡献

## 步骤

01

### 安装技能

PassionCode.ai 启动器会把 Fabric Agent Adapter 技能、Observatory Log 和工作规则安装到你的编码智能体中。无需账号，无需密钥。它不会安装 Fabric：Fabric 是下一步，需要单独下载。

npx @passioncode-ai/passioncode@latest update

启动器 0.1.32 · 之后请重启你的智能体 · 已开启自动更新；关闭自动更新

02

### 添加 Fabric

Fabric 是你的项目及其智能体的家：每个项目的目标、看板、决定和版本都保存在这里。它的首屏提供四个操作：创建智能体、适配已有智能体、打开项目或创建项目。它是早期预览版：需要 Docker 和 Supabase CLI；对话会保存消息，但还不会回复。

下载 Fabric

0.3.4

macOS 版

↓

要求与限制

Apple silicon 和 Intel · 已签名并公证 · SHA-256 4d8e8da80bcf490fed955dd627ed64b76a1c53c50aa89de49ac6eaeed91f0653 · 版本说明

03

### 创建或适配一个智能体

在 Claude Code 或 Codex 中，直接说出你的需求，或从 Fabric 的创建和适配操作开始；无论哪种方式，工作都在你的编码智能体控制台中运行。Fabric Agent Adapter 技能会先提出问题，并在修改任何内容前展示计划；适配会在新的 fabric-adapter 分支上进行。你会得到一份契约、一个仪表盘、测试和一份符合性报告。

新建 创建一个 Fabric 智能体，每天早上检查我们的应用商店评论并起草回复

适配 让此仓库适配 Fabric

04

### 运行并查看

Fabric Dashboards 在一个窗口中显示每个本地智能体服务；你的智能体可以通过 MCP 启动、停止并打开它们。

下载 Fabric Dashboards

0.6.7

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

05

### 把下一个智能体加入同一个项目

以同样的方式构建下一个智能体，并让它加入 Fabric 中的同一个项目。从 Fabric 启动的 Claude Code、Kilo Code 和 Hermes Agent 共用该项目的看板、记忆和交接，因此一个智能体可以从另一个停下的地方接着做。目前可以连接哪些智能体

我们推荐的工具

## 让智能体完成

## 它们开始的工作

对于你的智能体所做的改动，我们推荐 task-pipeline，一个独立的开源技能，来自 sshlg-skills 集合：它会把每项改动从简报带到验收，每个关卡通过后才继续。

npx sshlg-skills install

GitHub 上的 task-pipeline · 它不属于 PassionCode.ai，也不依赖 PassionCode.ai 的任何部分

参与贡献

## 发现要修的地方？

## 提交 Pull Request

所有产品仓库都是公开的，测试命令写在 AGENTS.md 中。请遵循组织的 CONTRIBUTING.md 并提交 pull request；提交即表示你同意仓库的 CLA.md。

fabric

fabric-switchboard

fabric-dashboards

fabric-inbox

project-observatory-dashboard

fabric-agent-adapter

fabric-agent-contract

passioncode

okolos

fabric-vr

passioncode-ai.github.io

面向组织

## 想让它在

## 整个团队中运行吗？

我们梳理你的流程，评估智能体能接手哪些工作，并与你一起或为你完成搭建。

估算并提交申请

→

PassionCode

.ai

从 vibe coding 到 passion coding

开始使用

愿景

组织

Switchboard

Observatory

Inbox

Dashboards

Fabric

GitHub 与源代码

关于

设计系统

隐私

commercial@passioncode.ai

Twitter

↗
