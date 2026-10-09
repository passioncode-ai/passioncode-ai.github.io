Contract: brand-contract v1

<!-- Generated from zh-Hans/dashboards/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Dashboards | 你的本地智能体服务，汇聚一处

在一个 Mac 窗口里查看你的本地智能体服务：看哪些需要处理，打开各自的仪表盘，也让你的智能体通过 MCP 使用同样的工具。

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

日本語

下载

↓

FABRIC DASHBOARDS · macOS

# 你的智能体服务

# 一处查看全部

一个 Mac 应用就能看到哪些服务在运行、哪些需要处理、最近发生了什么，每个服务自己的仪表盘也在其中

家族成员 健康、花费与控制：每个智能体服务的状态、花费和更新，都在一个窗口里。完整家族

下载 macOS 版 ↓

查看源代码 ↗

版本 0.6.5 · macOS 13+ · Apple silicon + Intel

你的本地服务 / 汇聚一处

窗口

## 每个智能体服务

## 一屏查看

哪些已就绪、哪些需要你、花费多少一目了然，需要的操作一键可达。每个服务的仪表盘都在应用内打开。

来自开发版本的真实应用 · 示例服务取自 Fabric Agent Adapter 套件，不含真实数据

服务自己的仪表盘，在应用内打开

01 / 让工作始终在视野中

## 一扇窗，

## 看见干活的工具

Fabric Dashboards 会发现你 Mac 上兼容的服务。每个服务各司其职；你得到一个统一的地方来查看和控制它们。

### 看哪些需要你

服务状态、最新活动和需要关注的事项集中显示。探测偶尔变慢，不会被立刻当作故障。

### 打开真正的仪表盘

每个服务自己的界面在应用内打开，并已登录。Project Observatory 就是目前可用的兼容服务之一。

### 处理下一步

启动、停止或重启服务，查看日志，使用服务契约开放的操作。退出 Dashboards 后，你的服务仍继续运行。

0.6 版本新增

## 花费、控制台

## 和可信的更新

0.6 系列版本新增的内容，从 10 月 6 日的 0.6.0 到 2026 年 10 月 8 日的 0.6.5。

### Spend 页面列出全部限额

Spend 页面列出每个智能体适用的限额：最需要你关注的一项，在已停止工作或越过限额时显示红色，达到 80% 时显示琥珀色；展开某个智能体即可看到它的每项限额、对应时间窗口和已花费的金额。你的智能体可以通过 MCP 读取同一份列表。

### 仪表盘旁边的智能体控制台

在服务仪表盘旁边打开一个真实的终端，在该智能体的仓库中运行 Claude Code、Codex 或其他运行环境。如果 Fabric Switchboard 已把该文件夹绑定到某个项目，会话就使用该项目的账号启动。

### 先检查再安装的更新

应用会自行更新：版本必须带有组织签名并与校验和一致才会安装，且在控制台或命令仍在运行时会等待。你可以在“设置”中关闭自动安装。

### 让智能体家族保持最新

Settings → Estate updates 会监视 Fabric Agent Contract 和 PassionCode.ai 技能，并可在核对发布者之后于后台更新这些技能。该开关默认关闭。

### 英文或俄文

Settings → Language：跟随这台 Mac，可选 English 或 Русский。窗口、菜单和托盘会同时切换。

02 / 获取 Fabric Dashboards

## 一次下载

## 你的服务仍归你

### macOS

版本 0.6.5。适用于 Apple silicon 和 Intel 的通用 DMG，需要 macOS 13 或更高版本。已使用 Developer ID 签名、公证并装订。

下载 Fabric Dashboards ↓

打开 DMG，把 Fabric Dashboards 拖到“应用程序”，然后打开它。应用会在登录时启动；你可以在“设置”中更改。

### 打开之前

服务需单独安装。在安装兼容的服务之前，列表为空属于正常情况；Dashboards 不会把本机每个进程都当作智能体服务。

可以试试 Project Observatory，或者用 Fabric Agent Adapter做一个你自己的服务。应用本身不需要账号或 API 密钥。

DMG SHA-256

b1d1d7253a32a059686725befb1b9ead53252688a3ce0ae995de3a91106a3ea3

版本说明与校验和 ↗

安装指南 ↗

03 / 给你的智能体

## 同样的服务，

## 从你的智能体调用

在你的客户端中注册应用的 MCP 服务器。智能体可以列出服务、获取仪表盘链接，并使用应用规则所开放的操作。

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

把应用安装到“应用程序”之后，请让你的智能体调用 list_services。结果为空表示还没有安装任何服务。其他 MCP 客户端可以把同一个可执行文件当作 stdio 服务器运行。参见 MCP 设置指南。

04 / 须知

## 适合你的现有环境

我需要 Fabric 吗？

不需要。Fabric Dashboards 可以独立使用。它是 Fabric 的工具之一，在你用上 Fabric 的早期预览版之前，它就能显示兼容的服务。

哪些服务会出现？

发布了本地描述文件、支持 fabric-service/0.1的服务。Project Observatory 支持它。Fabric Agent Contract 定义协议，Adapter 帮你实现协议。

它是开源的吗？

Fabric Dashboards 是开源的，采用 GNU AGPL-3.0 许可证。也提供商业许可证：passioncode.ai/business。0.1.0 版本沿用 MIT 许可证；0.2.0 和 0.3.0 版本沿用 PolyForm Noncommercial or Internal Use 许可证。0.3.1 版本是首个采用 AGPL 的版本。

属于你的智能体工作空间

## 从你已经在用的

## 服务开始

用 Observatory 查看项目，用 Switchboard 配置账号，只添加你的工作需要的工具。

了解这些工具 ↗

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
