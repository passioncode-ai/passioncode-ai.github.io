Contract: brand-contract v1

<!-- Generated from zh-hans/start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

开始使用 | 安装你的 AI 智能体工作空间 | PassionCode.ai

一条命令安装 PassionCode.ai，或者把一条提示词交给 Claude Code 或 Codex：工具、对应的 MCP 服务器和技能。同一条命令也能检查并修复已有的配置。免费且开源。

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

安装设置

↓

开始使用 · 免费且开源

# 从一台空白的电脑到你的第一个智能体

构建持续工作、并且知道其他智能体做过什么的智能体。一条命令安装工具，同一条命令之后也能检查它们

需要 Node.js 18+ 以及 Claude Code 或 Codex Fabric 在所有系统上都需要 Docker 和 Supabase CLI

→

一条命令

01

创建或适配一个智能体

02

运行并查看

03

添加下一个智能体

+

参与贡献

一条命令

## 安装一切，

## 或检查已有配置

在 macOS 上，一条命令从签名发布版安装你选择的工具，将它们的 MCP 服务器连接到 Claude Code、Codex、Gemini CLI 和 Kimi Code，并添加技能。在 Windows 和 Linux 上，先从各应用的页面下载应用，再运行同一条命令来安装技能和 MCP 服务器。在已经配置好的电脑上，同一条命令会检查所有配置、修复问题并显示变更内容。

### 自己运行

npx @passioncode-ai/passioncode@latest setup

需要 Node.js 18+ · 签名、校验和或公证失败的内容不会安装 · 完成后请重启你的编码智能体 · 只检查不做任何更改：

npx @passioncode-ai/passioncode@latest doctor

### 或者让编码智能体来做

把这条提示词复制到 Claude Code、Codex 或其他编码智能体中。它会运行命令，完成它能完成的部分，然后给你一份简短清单，列出只有你能做的事：登录、授予访问权限、在工具自己的提示中输入密钥。

在这台电脑上安装 PassionCode.ai，如果已经安装过则检查并修复。运行 npx --yes @passioncode-ai/passioncode@latest setup --yes --json（需要 Node 18 或更高版本），阅读它的 JSON 输出：在 macOS 上，它会从签名发布版安装缺失的应用；在 Windows 和 Linux 上，它会改为给出每个应用的下载页面；在所有系统上，它都会安装技能和所有 MCP 服务器，修复问题，然后再次检查所有内容。不要手动下载或安装任何东西，也不要停止或终止正在运行的应用。然后逐一运行它列出的产品引导步骤中智能体可以执行的部分，不要在聊天中向我索要密钥或密码（工具会打开自己的隐藏提示），最后运行 npx --yes @passioncode-ai/passioncode@latest doctor。简要告诉我你安装或修复了什么、哪些仍然失败，以及只有我才能做的编号步骤（比如登录，或者在 Windows 和 Linux 上从各应用的页面安装应用并重新运行命令），并提醒我重启你以加载新的技能和 MCP 服务器。

Fabric 是早期预览版，在所有系统上都需要 Docker 和 Supabase CLI。在 macOS 上，两者都在电脑上时，这条命令会安装它，否则会告诉你还需要添加什么；在 Windows 和 Linux 上，请先从 Fabric 页面下载并安装。

想手动操作？

01

### 添加 Fabric

Fabric 是你的项目及其智能体的家：每个项目的目标、看板、决定和版本都保存在这里。它的首屏提供四个操作：创建智能体、适配已有智能体、打开项目或创建项目。它是早期预览版：需要 Docker 和 Supabase CLI；对话会保存消息，但还不会回复。

下载 Fabric

0.3.5

macOS 版

↓

适用于 Windows 和 Linux

要求与限制

Apple silicon 和 Intel · 已签名并公证 · SHA-256 1e54fe557f2752817bb00303a93d595c812609b355f6850420026663cf39b98b · 版本说明

02

### 添加 Fabric Dashboards

Fabric Dashboards 在一个窗口中显示所有本地智能体服务。下载后，通过 MCP 把它连接到你的编码智能体。

下载 Fabric Dashboards

0.7.10

↓

适用于 Windows 和 Linux

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

Switchboard、Project Observatory 和 Fabric Inbox 各有自己的下载：Switchboard · Observatory · Inbox

## 后续步骤

01

### 创建或适配一个智能体

在 Claude Code 或 Codex 中，直接说出你的需求，或从 Fabric 的创建和适配操作开始；无论哪种方式，工作都在你的编码智能体控制台中运行。Fabric Agent Adapter 技能会先提出问题，并在修改任何内容前展示计划；适配会在新的 fabric-adapter 分支上进行。你会得到一份契约、一个仪表盘、测试和一份符合性报告。

新建 创建一个 Fabric 智能体，每天早上检查我们的应用商店评论并起草回复

适配 让此仓库适配 Fabric

02

### 运行并查看

Fabric Dashboards 在一个窗口中显示所有本地智能体服务；你的智能体可以通过 MCP 启动、停止和打开它们。这条命令会在 macOS 上安装它，并把它连接到你的编码智能体。

03

### 把下一个智能体加入同一个项目

以同样的方式构建下一个智能体，并让它加入 Fabric 中的同一个项目。连接到 Fabric 的智能体共用一个项目的看板、记忆和交接，因此一个智能体可以从另一个停下的地方接着做。目前可以连接哪些智能体

对于你的智能体所做的更改，我们推荐 task-pipeline，这是一个独立的开源技能：它的作用和安装方法

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

投资者

参与贡献

媒体

设计系统

隐私

commercial@passioncode.ai

X

↗
