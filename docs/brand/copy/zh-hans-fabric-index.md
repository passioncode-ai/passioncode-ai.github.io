Contract: brand-contract v1

<!-- Generated from zh-hans/fabric/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric | 你的项目及其智能体的家 · macOS 早期预览版 | PassionCode.ai

Fabric 是你的项目及其智能体的家，是适用于 Apple silicon 和 Intel 的 macOS 早期预览版。它把项目的看板、决策、工作和版本保存在同一个地方，就在你的 Mac 上。

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

FABRIC · 早期预览版

# 你的项目的家

# 及其智能体

Fabric 把每个项目的目标、看板、决策和版本保存在你的 Mac 上，供参与工作的每一个智能体使用。我们正在把它构建成你的智能体的 CEO

工具包成员 一个项目里每个智能体共享的家：目标、看板、决策和版本。第 2 步和第 5 步，见工作原理。全部工具

下载 macOS 版

↓

了解工作流程

↓

早期预览版 0.3.4 · 适用于搭载 Apple silicon 或 Intel 的 macOS

首屏 · 四个操作

创建智能体

给它起名，说明它做什么，选择它的文件夹和编码智能体

适配智能体

把在别处构建的智能体带进来，使用新分支

打开项目

一个文件夹，或包含多个项目的文件夹

创建项目

为项目的目标、看板和版本创建一个新的家

智能体的实际工作在编码智能体的控制台中运行

问题所在

## 项目的存续时间

## 比一次对话更长

智能体可以完成一项任务，团队却仍然丢掉任务背后的原因。上下文散落在各个聊天里，决策需要重复说明，还得有人把工作重新拼起来。

我们围绕 项目来构建 Fabric：目标、团队、决策和历史，都应当在下一次会话之后依然保留。

运行循环 · 发展方向

## 从意图

## 到经过核对的结果

这是我们正在朝着设计的工作流程。它描述的是 Fabric 的发展方向，并不表示每一步现在都已可用。

01

### 理解项目

把项目的目标、当前状态和相关上下文汇集到同一个地方。

02

### 把工作说清楚

把目标转化为有负责人、预期结果和明确边界的工作。

03

### 协调执行

在人、智能体和可重复的流程之间分配工作，同时不丢失项目的上下文。

04

### 复盘并持续学习

对照凭证核对结果。把决策和经验留给下一个周期。

走进 Fabric

## 上次做到哪里

## 需要你处理的事

真实的 Fabric 窗口，使用合成演示空间：四个项目和 28 天的工作。

主页 · 合成演示项目，没有真实账号或仓库

看板 · 等你决定的事

版本 · 纳入了什么、为什么、由什么确认

我们如何构建它

## 责任仍在人

协调是 Fabric 的发展方向，它不会取代你。项目为了什么、每个智能体被允许做什么，都由你决定。

权限

### 许可保持明确

目标、职责和限制属于项目。智能体有把握，并不等于获得了行动的许可。

选择

### 智能体可以替换

更换服务商或执行工作的智能体时，项目应当保留它的目标和历史。

凭证

### 结果要有凭据

完成的任务应当附带人可以核对的东西，而不只是智能体说一句“做完了”。

获取 Fabric

## 早期预览版

## 适用于你的 Mac

最新预览版：0.3.4。Fabric 在你的 Mac 上运行，使用本地数据库；你的项目只留在这台机器上。

⌘

### macOS

Apple silicon 和 Intel（通用）· macOS 13 或更高版本
DMG 安装包 · 已使用 Developer ID 签名并通过 Apple 公证

下载 macOS 版

↓

打开 DMG，把 Fabric 拖到“应用程序”。同一个 DMG 可在搭载 Apple silicon 和 Intel 的 Mac 上运行。

☰

### 打开之前

Fabric 会在 Docker 内用 Supabase CLI 启动自己的本地数据库。

Docker Desktop 或 OrbStack，处于运行状态

Supabase CLI：brew install supabase/tap/supabase

已登录的 Claude Code 或 Codex CLI，供智能体执行工作

如果缺少 Docker 或 CLI，Fabric 会在首次启动时告诉你缺的是哪一个。请参阅 Fabric 支持哪些编码智能体，以及每个智能体在其中能做什么。

版本说明与校验和

↗

查看源代码

↗

这是早期预览版。你可以保存项目、决策看板、任务、目标、工作脉搏，以及附有凭据的版本。与 Fabric 的对话会保存你的消息，但 Fabric 还不会回答。新版本不会自动升级现有数据库，而是会告诉你需要运行的命令。在这台 Mac 上注册的智能体可以通过 Fabric 的本地智能体中枢，向 Fabric 申请访问已连接的产品，例如 Fabric Inbox；每个请求由你允许或拒绝，也可以随时在设置中撤销。自 0.3.2 起，Fabric 会发送匿名的使用次数统计，只有次数和类别，绝不包含名称、路径或内容；可在“设置 → 分享使用次数”中关闭，此设置适用于你 Mac 上的每一个 PassionCode.ai 应用。

Fabric 是开源的，采用 GNU AGPL-3.0 许可证；对于 AGPL 未涵盖的使用方式，可向以下地址获取商业许可证：passioncode.ai/business。该 0.3.4 预览版由 CI 根据这份公开源代码构建、签名并公证。

同一套工具集的一部分

## Switchboard 管理账号

账号管理工具独立于 Fabric 运行。

下载 Switchboard

↓

返回工具集

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
