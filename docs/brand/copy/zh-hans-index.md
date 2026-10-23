Contract: brand-contract v1

<!-- Generated from zh-hans/index.html; edit source and rerun scripts/extract-public-copy.py. -->

PassionCode.ai｜不绑定特定智能体的操作系统，面向 AI 原生团队

搭建一个由智能体干活、你能看到全部过程的工作空间。Fabric 是你的项目及其智能体的家；你的编码智能体可以创建新的智能体，也可以适配你已有的智能体；Switchboard、Fabric Dashboards 和 Project Observatory 负责运行它们，并展示它们做过的事。开源且免费。

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

从 vibe coding 到 passion coding

# 不绑定特定智能体的操作系统，面向 AI 原生团队

搭建一个由智能体干活、你能看到全部过程的工作空间

Fabric 是你的项目及其智能体的家。Switchboard、Dashboards、Observatory 和 Inbox 既能与它配合，也能单独使用。现在一条命令就能把它们全部装好

个人使用，免费

→

面向你的组织

↗

基于 AGPL-3.0 开源 Fabric 0.3.11 · Switchboard 0.6.78 · Dashboards 0.7.27 · Observatory 0.29.0

账号

服务

项目

邮件

+

你的智能体

FABRIC · 你的项目的家

用一分半钟讲清 PassionCode.ai 是什么、为谁而做、如何工作，带旁白和字幕。画面为演示数据；编码智能体的控制台是文字示例

阅读文字稿

你的智能体能正常工作一周。然后一切开始散架。用错了账号。忘了学到的东西。也没人说得清它改了什么。PassionCode.ai是不绑定特定智能体的操作系统，面向 AI 原生团队：一个由智能体干活、你能看到全部过程的工作空间。它运行在你自己的机器上，开源，使用你已有的智能体和订阅。智能体做过的工作，都留下你能打开查看的记录。对你来说，一条命令就能装好 Fabric、它周围的工具和技能，你的编码智能体也能替你运行这条命令。Fabric 目前是预览版，是你的项目及其智能体的家。你的编码智能体会先展示计划，然后再做任何修改。每个工具都能配合 Fabric使用，也能单独使用。Switchboard：每个智能体都用对的账号，额度一目了然。Dashboards：状态、花费和控制，集中在一个窗口。Observatory：发生了什么变化，附带依据。Inbox 目前是预览版：智能体只按你的规则回复邮件。连接到 Fabric 的智能体共享同一项目的看板、记忆和工作交接，一个停下的地方，另一个就能接着做。对组织，我们把智能体部署到组织的机器上并连接起来，展示每个智能体花了多少、交付了什么。智能体容易启动，却难以长期维持。我们正在构建把它们凝聚在一起的东西。

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

现已可用

### 进入

终端npx @passioncode-ai/passioncode@latest setup

PassionCode.ai 启动器的一条命令即可装好各个工具、它们的 MCP 服务器和技能（skills），也可以让你的编码智能体来运行。Fabric 是早期预览版，还需要 Docker 和 Supabase CLI。

开始设置

02

预览版

### 接入

智能体创建一个，或适配在别处构建的智能体

项目打开一个文件夹，或创建一个项目

Fabric 的首屏提供四个操作，分成两组。

Fabric 目前能做什么

03

现已可用

### 第一个智能体

新建创建一个 Fabric 智能体，根据已合并的 pull request 起草版本说明

适配让此仓库适配 Fabric

你的编码智能体会先提出问题、展示计划，然后再做任何修改。

创建或适配一个智能体

04

现已可用

### 扩展

每个智能体都运行在它应该使用的账号上，看板和花费集中在一个窗口里。

Fabric Dashboards

05

部分现已可用

### 协同工作，并随时查看

连接到 Fabric 的智能体共用一个项目的看板、记忆和交接；Observatory 展示发生了什么变化，并附有证据。

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

用一条命令装好工具，再用 Claude Code 或 Codex 构建你的第一个智能体。大约二十分钟。

npx @passioncode-ai/passioncode@latest setup

开始使用

→

组织 · ENTERPRISE

### AI 原生组织

我们把智能体带到你组织的机器上，把它们连接起来，让你看到每个智能体花了多少、交付了什么；数据留在你自己的机器或你自己的云上。

估算并提交申请

→

04 / 工具

## 现在就能使用的工具

Fabric 是你的项目及其智能体的家。后面的四个工具既能与 Fabric 配合，也能单独使用。每个工具都标出它在“如何运作”中的步骤，版本号为当前发布版本。

Fabric

你的项目及其智能体的家：每个项目的目标、看板、决策和版本发布。

早期预览版

0.3.11

· macOS · 步骤 2 和 5

↗

可配合 Fabric，也可单独使用

Fabric Switchboard

选择每个智能体运行所用的账号，并随时看到用量限制。

版本

0.6.78

· macOS + Windows · 步骤 4

↗

Fabric Dashboards

在一个窗口里查看每个本地智能体服务，由你或智能体来操作。

版本

0.7.27

· macOS + Windows + Linux · 步骤 4

↗

Project Observatory

每个项目发生了什么变化、什么需要关注，都附有证据。

版本

0.29.0

· macOS + Windows + Linux · 步骤 5

↗

Fabric Inbox

Gmail 和 Cloudflare 邮件合在一个列表里，重要的排在前面；智能体按策略回复。

开发预览版

0.32.3

· macOS + Windows + Linux · 步骤 5

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

它不绑定特定智能体。目前 Claude Code、Codex、Kilo Code、Hermes Agent 和 Kimi Code 可连接 Fabric，Cline 在 Fabric 内运行，更多已在计划中：按层级列出的完整名单。

我的数据会去哪里？

你的工作留在你自己的电脑和你自己的云账号上。Fabric Switchboard 以及自 0.3.2 版起的 Fabric 会发送匿名使用计数：只有次数和类别，绝不包含名称、路径或内容。你可以在 Switchboard 的“关于”窗口或 Fabric 的“设置”中关闭。具体发送了什么。

关于

## 我们怎么走到这里的

我是 Sergey Sheleg，Nicegram 的联合创始人兼 CPO。Nicegram 是一款 Telegram 第三方客户端，安装量超过 5700 万。同时我也是 eSIM Plus 的联合创始人。在此之前，我在 Ultimate Guitar 负责 Android 和增长产品，他们的应用触达超过 3.5 亿人。我的工作横跨产品、增长、营销、AI 和区块链。

我在 PassionCode 的联合创始人是 Serge Khurs，他是 Teslasuit 的联合创始人兼 CTO。Teslasuit 是一套全身套装，集成触觉反馈、肌肉电刺激、传感器和动作追踪，应用于医疗、训练、工业和国防领域。现在他为大型国际数字公司提供 AI 和后端系统方面的工程咨询。

我们两个人都带团队，起步方式也一样：先为自己的智能体搭建工作空间。我们不断试验，摸索出工作空间应该怎么组织，持续调优内部流程，把多年积累的技术和产品经验融进去。

慢慢地，它变成了一套面向 AI 原生智能体团队的方案：工作空间长什么样，智能体系统怎么搭建，怎么嵌入组织。我们把它做成了软件，让每次运行结果一致。今天它就在跑我们自己的工作。

后来我们发现，需要它的不止我们两个人：任何和 AI 智能体打交道的人，无论是做开发、营销、财务、广告，还是任何可以自动化的重复工作，都用得上。这套软件会根据工作来调整，所以我们把它开源了。装上它，改造你的工作空间，让它变成智能体驱动的，然后用 Claude Code 本该有的方式去用它。

在我们的团队里，同一个问题反复出现。人们把任务的一部分丢给聊天窗口，拿到结果再交回给人，流程却一点没变。真正要改变的，是流程。

这就是我们为组织做的事。如果你想让智能体在真实的业务流程中接管重复工作，我们把 PassionCode 接入你的系统，帮你引入定制智能体来跑这些流程。告诉我们你的流程 →

它基于 GNU AGPL-3.0 开源，个人使用免费；AGPL 未涵盖的使用方式，可通过商业许可证获得授权。

在 X 上关注

↗

Sergey Sheleg · 联合创始人，PassionCode

### 致投资者

PassionCode.ai 以 GNU AGPL-3.0 开源，个人使用免费。我们为组织提供商业许可和服务。上文介绍的两位联合创始人在打造它。联系：commercial@passioncode.ai

### 致贡献者

每个产品的仓库都是公开的，并写明了测试命令。发现问题就修复，然后提交拉取请求：如何贡献

### 如果你要报道我们

一句话介绍：PassionCode.ai 是面向 AI 原生团队的工具集，以 GNU AGPL-3.0 开源。

视频 · 标志（SVG） · 标志（PNG） · commercial@passioncode.ai

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
