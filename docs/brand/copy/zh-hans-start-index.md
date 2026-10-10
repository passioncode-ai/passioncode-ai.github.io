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

别再构建会腐坏、彼此不交流的智能体了。五个步骤，大约二十分钟，每一步单独也有用

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

PassionCode.ai 启动器会把 Fabric Agent Adapter 技能、Observatory Log 和工作规则安装到你的编码智能体中。无需账号，也无需密钥。

npx @passioncode-ai/passioncode@latest update

启动器 0.1.31 · 之后请重启你的智能体 · 已开启自动更新；关闭自动更新

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

04

### 运行并查看

Fabric Dashboards 在一个窗口中显示每个本地智能体服务；你的智能体可以通过 MCP 启动、停止并打开它们。

下载 Fabric Dashboards

0.6.7

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

05

### 添加下一个智能体，查看整个家族

以同样的方式构建下一个智能体，并让它加入 Fabric 中的同一个项目。从 Fabric 启动的 Claude Code、Kilo Code 和 Hermes Agent 共用该项目的看板、记忆和交接，因此一个智能体可以从另一个停下的地方接着做。目前可以连接哪些智能体

我们推荐的工具

## 让智能体完成

## 它们开始的工作

对于你的智能体所做的改动，我们推荐 task-pipeline，一个独立的开源技能，来自 sshlg-skills 系列：它把每项变更从简报一路带到验收，每道关卡通过之前不会继续往下走。

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
