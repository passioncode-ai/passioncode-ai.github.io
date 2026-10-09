Contract: brand-contract v1

<!-- Generated from zh-hans/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

开始使用 | 安装你的 AI 智能体工作空间 | PassionCode.ai

安装 PassionCode.ai 技能，添加 Fabric，用 Claude Code 或 Codex 创建你的第一个 Fabric 智能体，转换现有项目，在 Fabric Dashboards 中运行它，并把下一个智能体加入同一个智能体家族。免费且开源。

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

别再做那些会腐烂、又彼此不通气的智能体。五个步骤，大约二十分钟，从第一个智能体到一个看得见的智能体家族。每一步本身都有用，结果够用就可以在任何一步停下

需要 Node.js 18+ 以及 Claude Code 或 Codex Fabric 需要搭载 Apple silicon 的 macOS

01

安装技能

02

添加 Fabric

03

创建或转换智能体

04

运行并查看

05

添加下一个智能体

+

参与贡献

## 步骤

01

### 安装技能

PassionCode.ai 启动器会把 Fabric Agent Adapter 技能、Observatory Log 和工作规则安装到 Claude Code、Codex 以及其他受支持的智能体中。无需账号，无需密钥。

npx @passioncode-ai/passioncode@latest update

启动器 0.1.31 · 它会按其固定的版本安装智能体家族成员 · 之后请重启你的智能体。自动更新默认开启。如需关闭，请参阅关闭自动更新。

02

### 添加 Fabric

Fabric 是 CEO AI 智能体：每个项目都有一个放置其目标、看板、决策和版本的家。它是早期预览版：需要 Docker 和 Supabase CLI，它的对话会保存消息，但目前还不会回复。

下载 Fabric

0.3.3

macOS 版

↓

要求与限制

Apple silicon · 已签名并公证 · SHA-256 88922ad23da5190cb330bee837b23e687fdac0f039d1fef13e5d80ddee492446 · 版本说明

03

### 创建或转换智能体

在 Claude Code 或 Codex 中，直接说出你的需求。Fabric Agent Adapter 技能会构建一个兼容 Fabric 的服务：契约、仪表盘、测试和一致性检查。

新建 创建一个 Fabric 智能体，每天早上检查我们的应用商店评论并起草回复

转换 让此仓库适配 Fabric

现有的智能体、MCP 服务器或命令行工具保留原有代码；适配器会在其外围补上 Fabric 所需的部分。Adapter 快速入门 · 契约

04

### 运行并查看

Fabric Dashboards 在一个窗口中显示每个本地智能体服务；你的智能体可以通过 MCP 启动、停止并打开它们。

下载 Fabric Dashboards

0.6.7

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

然后按你的工作需要添加：Fabric Switchboard（智能体需要多个账号时）；Project Observatory（查看各个项目的变化）；Fabric Inbox（处理邮件）。

05

### 添加下一个智能体，查看整个家族

当工作需要时，用同样的方式构建下一个智能体，并让它加入 Fabric 中的同一个项目。从 Fabric 启动的 Claude Code、Kilo Code 和 Hermes Agent 共用该项目的看板、记忆和交接，所以一个可以接着另一个停下的地方继续。Fabric Dashboards 在一个窗口里同时显示两者的状态和花费。

下一个 创建一个 Fabric 智能体，把已起草的评论回复整理成给董事会的每周摘要

每个新智能体都会加入一个你已经看得见的家族，而不是变成又一个需要你记住的脚本。智能体家族如何成长 · 目前可连接的智能体

我们推荐的工具

## 让智能体完成

## 它们开始的工作

对于你的智能体所做的改动，我们推荐 task-pipeline，一个独立的开源技能，来自 sshlg-skills 技能家族。它让一项改动依次经过分阶段的关卡，从需求说明、计划到测试、部署和验收，每道关卡通过之前不会继续往下走。

npx sshlg-skills install

GitHub 上的 task-pipeline · 它不属于 PassionCode.ai，也不依赖 PassionCode.ai 的任何部分

参与贡献

## 发现要修的地方？

## 提交 Pull Request

每个产品仓库都是公开的。每个仓库都在 AGENTS.md 中写明了测试命令，在 README 中写明了快速入门；你的编码智能体可以读懂这两处，其余的交给它。

### 选一个仓库

Fork 你在用的产品，或浏览整个组织。带标签的 issue 是不错的起点。

### 运行它的关卡

阅读仓库的 AGENTS.md 和组织的 CONTRIBUTING.md，做出修改，并反复运行测试命令直到通过。

### 提交 Pull Request

提交即表示你同意该仓库的 CLA.md；无需勾选任何选项。我们会审阅每一个 pull request 并回复。

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

有少数仓库是内部的，仅协作者可见：团队的知识库和组织结构图。想加入团队吗？给 Sergey 写信。

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
