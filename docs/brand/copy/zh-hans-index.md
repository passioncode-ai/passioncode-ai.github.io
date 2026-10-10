Contract: brand-contract v1

<!-- Generated from zh-hans/index.html; edit source and rerun scripts/extract-public-copy.py. -->

PassionCode.ai｜不绑定特定智能体的操作系统，面向 AI 原生团队

搭建一个由智能体干活、你能看到全部过程的工作空间。Fabric 是你的项目及其智能体的家；你的编码智能体可以创建新的智能体，也可以改造你已有的智能体；Switchboard、Fabric Dashboards 和 Project Observatory 负责运行它们，并展示它们做过的事。开源且免费。

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

Fabric 是你的项目及其智能体的家。你的编码智能体可以创建新的智能体，也可以改造你已有的智能体。开源，在你自己的机器上运行，并且免费

个人使用，免费

→

面向你的组织

↗

基于 AGPL-3.0 开源 Fabric 0.3.4 · Switchboard 0.6.16 · Dashboards 0.6.7 · Observatory 0.21.0

账号

服务

项目

邮件

+

你的智能体

FABRIC · 你的项目的家

01 / 为什么

## 你的智能体工作了一周

## 然后它散了架

它跑在错误的账号上，或撞上了用量限制。它忘了昨天学到的东西，也没人能说清它改了什么。你下一个智能体又从零开始。

在你自己的机器上，以开源方式运行PassionCode.ai 是一个本地、开源的 AI 智能体工作空间，基于 GNU AGPL-3.0。它在你自己的机器上运行，无需注册，也没有锁定。

配合你已有的智能体Claude Code、Codex 以及之后出现的工具，用你已有的订阅即可。

一份可打开的记录项目看板保存决策、任务和版本发布。Observatory 列出发生了什么变化，附有证据和下一步。每个下载都会写明版本和 SHA-256。

阅读愿景：是什么让智能体持续工作，以及一个智能体如何成长为一个组织

02 / 工作原理

## 从一条命令开始

## 到协同工作的智能体

六个步骤，按使用顺序排列。每一步都会说明：现已可用、预览版，还是发展方向。

01

现已提供

### 进入

终端npx @passioncode-ai/passioncode@latest update

一条命令即可把技能（skills）安装到 Claude Code 或 Codex 中。Fabric 是单独的预览版下载。

安装技能

02

预览版

### 接入

智能体创建一个，或改造在别处构建的智能体

项目打开一个文件夹，或创建一个项目

Fabric 的首屏提供四个操作，分成两组。

Fabric 目前能做什么

03

现已提供

### 第一个智能体

新建创建一个 Fabric 智能体，根据已合并的 pull request 起草版本说明

改造让此仓库适配 Fabric

你的编码智能体会先提出问题、展示计划，然后再做任何修改。

创建或改造一个智能体

04

现已提供

### 扩展

每个智能体都运行在它应该使用的账号上，看板和花费集中在一个窗口里。

Fabric Dashboards

05

部分已提供

### 协同工作，并随时查看

在 Fabric 预览版中，智能体共享同一个项目看板并进行交接；Observatory 展示发生了什么变化，并附有证据。

Project Observatory

06

发展方向

### 组织

企业按角色部署智能体，工作在你的多台机器之间流转

同样的能力会覆盖团队的多台机器；我们正在构建，目前可按需提供。

面向你的组织

03 / 两种进入方式

## 为你自己，

## 或为你的组织

个人使用 · 免费

### 你自己的智能体工作空间

用一条命令安装技能，用 Claude Code 或 Codex 构建你的第一个智能体，工作需要哪个工具时再添加哪个。大约二十分钟。

开始使用

→

组织 · ENTERPRISE

### AI 原生组织

我们把智能体带到你组织的机器上，把它们连接起来，让你看到它们在做什么；数据留在你自己的机器或你自己的云上。

估算并提交申请

→

04 / 工具

## 现在就能使用的工具

每个工具都可以单独使用，步骤说明对应上面的流程。版本号为当前发布版本。

Fabric

你的项目及其智能体的家：每个项目的目标、看板、决策和版本发布。

早期预览版

0.3.4

· macOS · 步骤 2 和 5

↗

Fabric Switchboard

选择每个智能体运行所用的账号，并随时看到用量限制。

版本

0.6.16

· macOS + Windows · 步骤 4

↗

Fabric Dashboards

在一个窗口里查看每个本地智能体服务，由你或智能体来操作。

版本

0.6.7

· macOS · 步骤 4

↗

Project Observatory

每个项目发生了什么变化、什么需要关注，都附有证据。

版本

0.21.0

· macOS + Linux · 步骤 5

↗

Fabric Inbox

Gmail 和 Cloudflare 邮件合在一个列表里，重要的排在前面；智能体按策略回复。

开发预览版

0.14.0

· macOS · 步骤 5

↗

PassionCode.ai 启动器

一条命令安装技能，教智能体用 Fabric 来构建。

CLI

0.1.32

· Node.js 18+ · 步骤 1 和 3

↗

预览版意味着尚未完成：Fabric 处于早期预览，它的对话功能还不能回复；Fabric Inbox 处于开发预览，真实模型的回复尚未验证。每个产品页面在下载前都会列出要求和限制。机器可读的版本信息：/api/releases。

05 / 开源

## 使用这些工具

## 阅读源代码

Fabric、Fabric Inbox、Switchboard、Observatory 和 Fabric Dashboards 基于 AGPL-3.0 开源：你可以检查它们、从源码构建，或贡献修复。AGPL 未涵盖的使用方式，可申请商业许可证。

已发布的版本沿用其发布时的许可证：Switchboard 至 0.3.1-beta.1、Observatory 至 0.8.1 以及 Fabric Dashboards 0.1.0 为 MIT；Switchboard 0.4.0-beta.1、Observatory 0.8.2 至 0.9.1，以及 Fabric Dashboards 0.2.0 和 0.3.0 为 PolyForm Noncommercial 或 Internal Use。 Fabric 0.2.0 预览版构建于 Fabric 源码公开之前。访问 GitHub 上的 PassionCode ↗

06 / 常见问题

## 人们最先问的问题

PassionCode.ai 免费吗？

免费。所有工具都基于 GNU AGPL-3.0 开源：你可以免费下载、使用、研究和修改。如果你要把它放进闭源产品，或运行修改后的托管服务而不公开其源代码，可以申请商业许可证。

它支持哪些智能体？

它不绑定特定智能体。目前 Claude Code、Kilo Code 和 Hermes Agent 可连接 Fabric，Codex 和 Cline 在 Fabric 内运行，更多已在计划中：按层级列出的完整名单。

我的数据会去哪里？

你的工作留在你自己的电脑和你自己的云账号上。Fabric Switchboard 以及自 0.3.2 版起的 Fabric 会发送匿名使用计数：只有次数和类别，绝不包含名称、路径或内容。你可以在 Switchboard 的“关于”窗口或 Fabric 的“设置”中关闭。具体发送了什么。

关于

## 写在前面

## 来自创始人

我是 Sergey，Nicegram 的联合创始人，该产品拥有 6000 万用户。

我最初是把 PassionCode 当作自己与 AI 智能体共事的工作场所来搭建的。后来它成长为一种方式：任何人都能把自己的环境变成智能体工作空间，组织也能借此成为 AI 原生组织。

它基于 GNU AGPL-3.0 开源，个人使用免费；AGPL 未涵盖的使用方式，可通过商业许可证获得授权。

在 Twitter 上关注

↗

Sergey · @sshlg93

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
