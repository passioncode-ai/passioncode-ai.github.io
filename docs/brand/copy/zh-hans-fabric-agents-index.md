Contract: brand-contract v1

<!-- Generated from zh-hans/fabric/agents/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric 支持的编码智能体 | Fabric | PassionCode.ai

截至 2026 年 10 月 8 日，Fabric 0.3.2 已连接 Claude Code、Kilo Code 和 Hermes Agent；Codex 和 Cline 可在 Fabric 中运行，但没有 Fabric 的工具；计划中接下来还有五个智能体。

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

下载

↓

FABRIC · 受支持的编码智能体

# 编码智能体

# Fabric 支持哪些

Fabric 能在你的项目里启动哪些智能体，其中哪些能用上 Fabric 自己的工具，以及接下来是哪些

截至 2026 年 10 月 8 日 · 已发布的应用为 Fabric 0.3.2

在已发布的应用中，Fabric 已连接 Claude Code, Kilo Code 和 Hermes Agent：它在项目的终端里启动智能体，并在该会话期间为其提供 Fabric 的工具。Codex 和 Cline 可在 Fabric 中运行，但还没有 Fabric 的工具。计划中接下来还有五个智能体，再往后是下面列出的其余智能体。Fabric Switchboard 为 Claude Code 和 Codex 切换订阅账号，其他智能体的 API 密钥账号则通过 Switchboard 切换。

01 / “支持”是什么意思

## 三个层级

## 每个智能体属于其中一级

“与 Fabric 配合使用”可以有不同的含义，所以本页为每个智能体标明了所处的层级。

已连接

### 带着 Fabric 的工具启动

Fabric 在项目的终端里启动智能体。仅在该会话期间，智能体能使用 Fabric 自己的工具：认领、交接、记忆和看板。这一访问权限由仅限一次会话的凭据提供，不会向智能体自己的设置里写入任何内容。

在 FABRIC 中运行

### 在项目文件夹中启动

Fabric 在项目的文件夹中启动智能体，所以它处理的是该项目的文件。它还没有 Fabric 的工具。

计划中

### 已列入计划，按顺序

我们打算连接这个智能体。下方的计划给出的是先后顺序，不是日期。

02 / 已连接

## 已连接

## 会话期间可用 Fabric 的工具

Claude Code、Kilo Code 和 Hermes Agent，三个都已在发布的应用中。

已连接的智能体，截至 2026 年 10 月 8 日

智能体

官方网站

当前状态

Claude Code

claude.com

已发布，在 Fabric 0.3 中

Kilo Code

kilo.ai

已发布，在 Fabric 0.3.2 中

Hermes Agent

hermes-agent.nousresearch.com

已发布，在 Fabric 0.3.2 中

Kilo Code 从其 KILO_CONFIG_CONTENT 变量读取会话设置，项目自身的 kilo.json 无法覆盖这些设置。我们于 2026 年 10 月 5 日在 Kilo 7.4.17 上验证了这一点。Hermes Agent 通过开放的 Agent Client Protocol 连接：Fabric 打开它的会话，并通过本地桥接把 Fabric 的工具交给它，同一天在 Hermes 0.21.4 上验证。Hermes 需要先在它自己的设置中选好模型，才能回答。

03 / 在 FABRIC 中运行

## 在 Fabric 中运行

## 尚未连接

Fabric 在项目文件夹中启动智能体。它在那里工作，但没有 Fabric 的工具。

在 Fabric 中运行的智能体，截至 2026 年 10 月 8 日

智能体

官方网站

当前状态

Codex

github.com/openai/codex

在项目文件夹中运行，暂无 Fabric 的工具

Cline

cline.bot

已发布，在 Fabric 0.3.2 中；每次使用工具前都会询问，暂无 Fabric 的工具

04 / 计划中

## 计划中

## 按此顺序

接下来五个作为一组，最后九个我们逐个判断。它们都还没有 Fabric 的工具。

计划中的编码智能体，按顺序，截至 2026 年 10 月 8 日

智能体

官方网站

顺序

omp (oh-my-pi)

omp.sh

接下来，作为一组

pi

pi.dev

接下来，作为一组

OpenClaw

openclaw.ai

接下来，作为一组

OpenHands

openhands.dev

接下来，作为一组

Cursor CLI

cursor.com/cli

接下来，作为一组

Command Code

commandcode.ai

逐个判断

DeepSeek Harness

deepseek.com/harness

逐个判断

LangChain Deep Agents (dcode)

docs.langchain.com

逐个判断

Letta

letta.com

逐个判断

Strix

strix.ai

逐个判断

goose

goose-docs.ai

逐个判断

Qwen Code

github.com/QwenLM/qwen-code

逐个判断

Gemini CLI

geminicli.com

逐个判断

OpenCode

opencode.ai

逐个判断

### 桌面应用和编辑器

Zed、ZCode、Proto、CodeGPT、Freebuff 和 HackerAI 是其他程序无法启动的桌面应用和编辑器。它们可以改为作为 Fabric 本地中枢的客户端。每一个都需要有各自记录在案的接入说明，这些说明已列入计划，尚未编写。

计划中的桌面应用和编辑器，截至 2026 年 10 月 8 日

应用

官方网站

接入方式

Zed

zed.dev

本地中枢的客户端，接入说明已列入计划

ZCode

zcode.z.ai

本地中枢的客户端，接入说明已列入计划

Proto

proto.erp.ai

本地中枢的客户端，接入说明已列入计划

CodeGPT

codegpt.co

本地中枢的客户端，接入说明已列入计划

Freebuff

freebuff.com

本地中枢的客户端，接入说明已列入计划

HackerAI

hackerai.co

本地中枢的客户端，接入说明已列入计划

05 / 计划中的智能体如何连接

## 一个开放协议

## 面向计划中的智能体

计划中的智能体通过 Agent Client Protocol（ACP）连接。它在建立会话时会带上该会话的 MCP 服务器，凡是支持它的智能体，Fabric 都能驱动。

06 / 为什么是这些智能体

## 依据

## 人们实际在用什么

我们依据 OpenRouter 的公开应用排名挑选，查看于 2026 年 10 月 5 日。其每日前 30 名中，有 15 个是编码智能体或智能体运行框架（harness）。自 Fabric 0.3.2 起已连接的 Hermes Agent 占比最大。

07 / 账号

## 账号切换

## 目前支持 Claude Code 和 Codex

Fabric Switchboard 为 Claude Code 和 Codex 切换订阅账号。自 0.6.1 起，它也适用于其他智能体：每个智能体都能用上 Switchboard 的工具，而接受自定义端点的智能体可以让请求经由 Switchboard 发出，由 Switchboard 切换它的 API 密钥账号。有哪些智能体，以及各自如何连接。

下载 macOS 版

↓

了解 Switchboard

↗

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
