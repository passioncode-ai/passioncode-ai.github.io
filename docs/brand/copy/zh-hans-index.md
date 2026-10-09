Contract: brand-contract v1

<!-- Generated from zh-hans/index.html; edit source and rerun scripts/extract-public-copy.py. -->

PassionCode.ai｜面向 AI 智能体的开源工作空间

搭建属于你自己的 AI 智能体工作空间。CEO AI 智能体 Fabric 记录项目；你的编码智能体创建新智能体，并转换你已有的智能体；Fabric Dashboards、Switchboard 和 Project Observatory 负责运行与监控。开源，免费。

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

从 vibe coding 到 passion coding

# 不绑定特定智能体的操作系统，面向 AI 原生团队

搭建一个由智能体干活、你能看到全部过程的工作空间

我们的 CEO AI 智能体 Fabric 记录每个项目的目标、决策和版本。你的编码智能体创建新智能体，并转换你已有的智能体。开源，运行在你自己的机器上，免费

个人使用，免费

→

面向你的组织

↗

基于 AGPL-3.0 开源 Fabric 0.3.2 · Switchboard 0.6.14 · Dashboards 0.6.5 · Observatory 0.19.4

账号

服务

项目

邮件

+

你的智能体

FABRIC · CEO AI 智能体

路径

## 从一个智能体

## 到 AI 原生组织

先为一项工作建一个智能体。工作需要时，再加下一个。它们组成一个你看得见、信得过、能不断扩大的家族，这个家族也会随团队一起成长。

01

现已提供

### 一个智能体

你用 Claude Code、Codex 或其他编码智能体，为一项工作建一个智能体。Fabric Agent Adapter 技能为它配上契约、仪表盘和测试。

02

现已提供

### 两个相互沟通的智能体

接入 Fabric 的智能体共用一个项目的看板、记忆和交接，一个智能体可以接着另一个停下的地方继续，每一次交接你都能读到。

03

发展方向

### 一条链

智能体排成一个流程：一个负责准备，下一个负责检查，最后由人批准。

04

部分已提供

### 自行运转的家族

Fabric Dashboards 显示每个智能体的健康状况和花费，工具会自行更新，Project Observatory 记录改动了什么、决定了什么。让智能体互相照看，是我们前进的方向。

05

发展方向

### 团队

你邀请其他人加入同样的循环：每个人有自己的工作空间、与其角色相应的智能体，以及各自被允许做的事。

06

发展方向

### 组织

智能体覆盖每一个工作空间，人们验证并构建自己的智能体，组织能看清工作是怎样运转的。

阅读愿景：智能体为什么需要运行框架（harness），以及这个家族如何成长

愿景

## 做你热爱的事

## 其余交给智能体

不必再把一条条工具链接起来，不必再弄懂每个部件如何配合，也不必再亲手做机器能做的事。从一句话开始——帮我做出我需要的——让工作空间随你一起成长。每个智能体都会从你手上接走一件例行事务，于是每一周都为你真正喜欢的工作留出更多时间。

零门槛起步用语言，不用流水线。你描述结果，智能体搭建步骤。

本地运行，开源在你自己的机器上，代码人人可读，基于 GNU AGPL-3.0。

设计上就注重安全每个智能体能做什么由你设定，每个操作都留有证据。

由你塑造从无到有，可以手动配置，也可以交给智能体。

任意智能体Claude Code、Kilo Code 和 Hermes Agent 目前可连接 Fabric，Codex 和 Cline 在 Fabric 内运行，更多智能体已在计划中。哪些智能体，处于哪个层级

现状：你用一条命令和你的编码智能体开始。通过与 Fabric 对话来开始，是 Fabric 的发展方向。

第一周

第一个月

第一个季度

例行事务你自己的工作

这只是对发展方向的示意，并非实测数据：智能体接手的例行事务越多，一周里属于你的时间就越多

01 / 如何运作

## 从一台空白的 Mac

## 到智能体开始工作

四个步骤，每一步单独用都有价值。从你需要的那步开始，工作需要时再加其余的。

01

### 创建你的工作空间

用一条命令安装智能体技能，再加上 Fabric：它是 CEO AI 智能体，为每个项目提供一个存放目标、看板、决策和版本的家。

npx @passioncode-ai/passioncode@latest update

Fabric 早期预览版 0.3.2 适用于 Apple silicon 的 macOS · 启动器 0.1.31

分步指南

→

02

### 创建智能体

向 Claude Code 或 Codex 说出你需要的智能体：版本发布员、支持工单分诊员、每周报告。Fabric Agent Adapter 技能会把它构建成服务，并配有自己的契约、仪表盘和测试。以后 Fabric 会通过对话为你完成这件事；目前由你的编码智能体借助同一个技能来完成。

你 创建一个 Fabric 智能体，根据已合并的 pull request 起草发布说明

03

### 转换你已有的东西

智能体、MCP 服务器、命令行工具，甚至整个项目，都能成为兼容 Fabric 的服务，无需重写。一致性探针会告诉你还缺什么。

你 让此仓库适配 Fabric

Fabric Agent Adapter 0.8.1 · Fabric Agent Contract

04

### 运行它们，看清一切

Fabric Dashboards 在一个窗口里显示所有服务，并允许智能体启动和停止它们。Switchboard 为每个智能体选择运行所用的账号。Project Observatory 带着证据，显示每个项目发生了什么变化。

选择工具

↓

从头到尾，都归你。 一切都运行在你自己的机器和账号上。每一行代码都以 GNU AGPL-3.0 公开在 GitHub 上。无需注册，无需付费，也不会被锁定在某一个模型或厂商。

02 / 选择你的路径

## 使用它，改进它，

## 或在工作中运行它

个人使用 · 免费

### 安装并使用

下载应用，安装技能，构建你自己的智能体。开源，无需账号，无需付费。

开始使用

→

贡献 · GITHUB

### 让它变得更好

每个产品都有公开的源代码、issue 和测试命令。提交 pull request：我们会审阅每一个，提交即表示你同意 CLA。

如何贡献

↗

企业 · 商业

### 为你的团队打造的 AI 工作空间

我们梳理你的流程，估算智能体能接手多少工作，并与你一起或为你搭建工作空间。需要时包含商业许可证。

估算并提交申请

→

03 / 工具

## 现在就能使用的工具

每个工具都有自己的下载和版本，可以单独使用，组合起来更好。下面列出的是当前版本。

Fabric

CEO AI 智能体：为每个项目的目标、看板、决策和版本提供一个家。

家族中的角色：一个项目里所有智能体共用的家

早期预览版

0.3.2

· macOS

↗

Fabric Switchboard

选择每个智能体运行所用的账号，并随时看到用量限制。

家族中的角色：账号

版本

0.6.14

· macOS + Windows

↗

Fabric Dashboards

在一个窗口里查看每个本地智能体服务，由你或智能体来操作。

家族中的角色：健康状况、花费与控制

版本

0.6.5

· macOS

↗

Project Observatory

每个项目发生了什么变化、什么需要关注，都附有证据。

家族中的角色：记忆与证据

版本

0.19.4

· macOS + Linux

↗

Fabric Inbox

Gmail 和 Cloudflare 邮件合在一个列表里，重要的排在前面；智能体按策略回复。

家族中的角色：邮件

开发预览版

0.12.0

· macOS

↗

PassionCode.ai 启动器

一条命令安装技能，教智能体用 Fabric 来构建。

家族中的角色：技能及其更新

CLI

0.1.31

· Node.js 18+

↗

预览版意味着尚未完成：Fabric 处于早期预览，它的对话功能还不能回复；Fabric Inbox 处于开发预览，真实模型的回复尚未验证。每个产品页面在下载前都会列出要求和限制。机器可读的版本信息：/api/releases。

04 / 面向构建者

## 带上你自己的智能体

## 构建你自己的工作流

使用 Claude Code、Codex，或适合你工作的其他智能体。安装技能，通过 MCP 连接单个工具，或让你自己的服务使用 Fabric 的开放契约。

从技能开始

### PassionCode.ai 启动器

一条命令安装 Fabric Agent Adapter、Observatory Log 和组织的工作规则。不需要 Fabric 应用或账号。

npx @passioncode-ai/passioncode@latest update

Node.js 18+。安装后请重启你的智能体。自动更新默认开启，也可以关闭。

设置与更新控制 ↗

构建服务

### Fabric Agent Adapter

把你自己的项目或智能体变成兼容 Fabric 的服务。工具集和技能会引导设置；一致性探针检查契约。兼容的服务会出现在 Fabric Dashboards 中。

模式（schema）和协议位于 Fabric Agent Contract。

构建你的第一个服务 ↗

开发中 · 从源码构建

### Fabric VR

Fabric 的远程界面，从 Meta Quest 开始。需要头显并从源码构建；目前还没有已发布的版本。

了解 Fabric VR ↗

PRE-ALPHA · 从源码构建

### Okolos

PassionCode.ai 的浏览器安全扩展，用于清除为你的 AI 暗中埋下的隐藏指令。源代码公开，可自行构建；目前还没有已发布的版本。

了解 Okolos ↗

05 / 面向组织

## 你的流程，

## 由你拥有的智能体来运行

移动应用发布团队、SaaS 团队、营销机构：同一个工作空间会适应不同的工作。告诉我们你的团队现在怎样工作，在任何人签字之前，先看到智能体可以接手多少小时工作的估算。面向 1 到 1000 人设计；需要集成的组织可选用 PassionCode for Enterprise。

估算你的节省

→

版本发布与应用商店上架发布说明、商店详情、截图、评论回复

营销素材与报告素材变体、活动报告、客户更新

支持与共享收件箱分诊、草稿、按策略分派

工程与 QA评审、检查、发布关卡、证据

06 / 开源

## 使用这些工具

## 阅读源代码

Fabric、Fabric Inbox、Switchboard、Observatory 和 Fabric Dashboards 基于 AGPL-3.0 开源：你可以检查它们、从源码构建，或贡献修复。AGPL 未涵盖的使用方式，可申请商业许可证。

公开仓库 · AGPL-3.0

↗

### Fabric

CEO AI 智能体：桌面应用、内核、决策和发布流程。

github.com/passioncode-ai/fabric

公开仓库 · AGPL-3.0

↗

### Fabric Switchboard

桌面应用、CLI、构建说明、issue 和版本说明。

github.com/passioncode-ai/fabric-switchboard

公开仓库 · AGPL-3.0

↗

### Fabric Dashboards

macOS 应用、测试、运行手册，以及附校验和的版本说明。

github.com/passioncode-ai/fabric-dashboards

公开仓库 · AGPL-3.0

↗

### Project Observatory

本地仪表盘、CLI、设置指南、测试和安全模型。

github.com/passioncode-ai/project-observatory-dashboard

公开仓库 · AGPL-3.0

↗

### Fabric Inbox

Mac 应用、邮件服务器、智能体工具、测试，以及附校验和的版本说明。

github.com/passioncode-ai/fabric-inbox

公开仓库 · AGPL-3.0

↗

### Fabric Agent Adapter

Agent Skills、Python 和 Node 工具集，以及一致性探针。

github.com/passioncode-ai/fabric-agent-adapter

已发布的版本沿用其发布时的许可证：Switchboard 至 0.3.1-beta.1、Observatory 至 0.8.1 以及 Fabric Dashboards 0.1.0 为 MIT；Switchboard 0.4.0-beta.1、Observatory 0.8.2 至 0.9.1，以及 Fabric Dashboards 0.2.0 和 0.3.0 为 PolyForm Noncommercial 或 Internal Use。 Fabric 0.2.0 预览版构建于 Fabric 源代码公开之前。可提供商业许可证：告诉我们你的用途。访问 GitHub 上的 PassionCode ↗

07 / 常见问题

## 人们最先问的问题

PassionCode.ai 免费吗？

免费。所有工具都基于 GNU AGPL-3.0 开源：你可以免费下载、使用、研究和修改。如果你要把它放进闭源产品，或运行修改后的托管服务而不公开其源代码，可以申请商业许可证。

它支持哪些智能体？

它不绑定特定智能体。目前 Claude Code、Kilo Code 和 Hermes Agent 可连接 Fabric，Codex 和 Cline 在 Fabric 内运行，更多已在计划中：按层级列出的完整名单。任何智能体、MCP 服务器或命令行工具，都可以通过 Fabric Agent Adapter 成为兼容 Fabric 的服务。

如何把现有项目或智能体变成 Fabric 智能体？

安装 PassionCode.ai 启动器（npx @passioncode-ai/passioncode@latest update），然后让你的编码智能体把项目适配到 Fabric。Fabric Agent Adapter 技能会把它封装成服务，附带契约、仪表盘和一致性检查。指南介绍了具体步骤。

Fabric 会自己创建智能体吗？

目前还不会。Fabric 处于早期预览：它记录每个项目的看板、决策和版本，它的对话功能还不能回复。通过对话创建智能体是我们的方向；目前由你的编码智能体借助 Fabric Agent Adapter 技能来完成。

我的数据会去哪里？

你的工作留在你自己的电脑和你自己的云账号上。Fabric Switchboard 以及自 0.3.2 版起的 Fabric 会发送匿名使用计数：只有次数和类别，绝不包含名称、路径或内容。你可以在 Switchboard 的“关于”窗口或 Fabric 的“设置”中关闭。具体发送了什么。

PassionCode.ai 能为我的公司搭建吗？

可以。描述你的团队和流程，我们会回复估算和方案：带你上手的引导式部署，或由我们为你搭建并运行的工作空间。

08 / 关于

## 与工作

## 同步构建

我是 Sergey。我在为日常工作中已经有 AI 智能体的团队打造 PassionCode。

出发点很实际：先让配置更容易管理，再为工作的完成方式带来更多结构。Switchboard、Observatory 和 Fabric Dashboards 现已可用；CEO AI 智能体 Fabric 正在开发中，处于早期预览。

关注构建过程、决策和接下来的版本。

在 Twitter 上关注

↗

Sergey · @sshlg93

从一个有用的工具开始

## 你的工作空间

## 从一条命令开始

安装技能，创建你的第一个智能体，其余的在它们值得加入你的工作时再添加。

免费开始

→

面向你的组织

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
