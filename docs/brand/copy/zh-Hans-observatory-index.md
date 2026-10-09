Contract: brand-contract v1

<!-- Generated from zh-Hans/observatory/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Project Observatory | 智能体所操作项目的本地仪表盘 | PassionCode.ai

查看各个项目有什么变化、哪些需要处理，以及已知的 API 密钥在哪里留下了副本。Project Observatory 是 PassionCode.ai 的开源本地仪表盘，提供英文和俄文界面。

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

PROJECT OBSERVATORY · BY PASSIONCODE

# 你的项目

# 重新尽在眼前

在本地仪表盘里查看智能体所处理的项目有什么变化、哪些需要处理，以及已知的 API 密钥在哪里留下了副本，界面提供英文和俄文

家族成员 记忆与证据：每个项目发生了什么变化、做出了什么决定、哪些需要处理。完整家族

开始使用

↓

查看源代码

↗

开源 · macOS + Linux · Python 3.11+

一个视图 / 你的项目

项目

+

发现项

Observatory 内部

## 先看需要处理的事

真实的 Observatory 概览，由引擎基于一家虚构公司的项目渲染。

合成的演示环境 · 不含真实项目、仓库或凭据

一个本地的 OBSERVATORY

## 少一些猜测

## 一眼看到更多证据

01 / 清单

### 知道有什么

选择你想观察的项目文件夹。Observatory 会找出其中的仓库，并保存一份本地登记表，每条关联都附有判定规则。

02 / 活动

### 看什么在变动

提交、工作区状态，以及只存在于这台机器上的工作，覆盖范围内的每个项目，并附上各自按周统计的走势。

03 / 发现项

### 从重要的事开始

每条发现项都附有证据和下一步，按从严重到提示的顺序排列。被静音的发现项会记录是谁、何时、为何静音。

04 / 密钥

### 找出已知密钥的副本

凭据元数据与值分开存放。系统会把选定的对话记录、日志和 SQLite 存储，与本地已知的密钥进行比对；发现项绝不会重复显示密钥的值。

05 / 你的语言

### 英文或俄文

仪表盘默认是英文。可以为工作空间设置俄文，也可以用侧栏中的 EN/RU 切换；计数会采用各语言自己的复数形式。

06 / 智能体

### 给下一个智能体上下文

命令行、MCP 工具和 Claude Code 插件共用同一份本地事实。集成和后台任务在你选择启用之前保持关闭。

获取 OBSERVATORY

## 从你自己的工作空间开始

最新版本：0.19.4。首次本地观察不需要 API 密钥。你可以交给编码智能体来完成安装，也可以自己动手。

01

### 安装发行包

下载 project_observatory-0.19.4-py3-none-any.whl 和 SHA256SUMS，来自版本 0.19.4，用以下命令校验：shasum -a 256 -c SHA256SUMS --ignore-missing，然后在支持 SQLite 扩展的独立 Python 3.11+ 环境中，pip install --no-deps 安装 wheel，再安装它的 [full] 额外依赖，使用 -c "$(project-observatory full-path)/requirements-full.lock"，即该版本测试所用的依赖集合。在 macOS 上，请使用 Homebrew 的 Python。

02

### 创建私有工作空间

project-observatory full init，然后用 full configure sources projects选择要观察的文件夹。配置、密钥和历史都保存在已安装的代码之外。

03

### 观察并打开

project-observatory full local，然后 full open。若要使用俄文：full configure interface locale ru。

04

### 连接你的智能体

MCP 服务器使用 stdio：claude mcp add observatory --scope user -e OBSERVATORY_HOME="$OBSERVATORY_HOME" -- "$(python -c 'import sys; print(sys.executable)')" "$(project-observatory full-path)/mcp/server.py"，然后请求 observatory_overview。

安装指南

↗

入门与集成

↗

所有版本

↗

Mac 应用：ProjectObservatory-0.19.4-macos.zip，已用 Developer ID 签名并通过 Apple 公证，适用于 macOS 14+。它会打开仪表盘，并使用上面安装的引擎；请用同一份 SHA256SUMS。

校验它。当前版本 0.19.4采用 AGPL 许可证，自首个采用 AGPL 的 0.10.0 起的每个版本都是如此；0.9.1 及更早版本沿用其发布时的许可证。

已知值扫描会把选定的文件与本地已知的密钥比对。它无法找到未知的机密，也无法证明不再有任何副本；本地存在副本，并不能说明其他人拿到了密钥。实时的服务商轮换和外部 MCP 主机不在离线测试套件的范围内。

开始之前

## 几点值得分清的区别

Observatory 会上传我的项目或密钥吗？

不会。清单、历史和观察结果都保存在你机器上的私有工作空间里。可选的集成各有自己的访问权限，每一项都需用你自己的账号单独启用。

它会读取什么？

只读取你配置的文件夹和来源。full doctor 会报告哪些已启用、哪些缺失；当某个来源没有被测量时，仪表盘会明确说明，而不是显示为零。

它和 Switchboard 是一回事吗？

不是。Switchboard 管理你的 Claude Code 和 Codex 账号，Observatory 则让这些智能体所处理的项目保持在视野中。两者都是你现在就能用的开源 PassionCode 工具。

那 Fabric 呢？

Fabric 是我们的 CEO AI 智能体，处于早期预览阶段，专注于协调智能体和项目。Observatory 现在就可使用，是一个独立的本地工具。了解 Fabric。

我可以自己查看或构建吗？

是的。Project Observatory 是开源的，采用 GNU AGPL-3.0 许可证。如果你的用途不在 AGPL 涵盖范围内，可向以下地址申请商业许可证：passioncode.ai/business。已发布的版本沿用各自的许可证：0.8.1 及更早版本采用 MIT，0.8.2 至 0.9.1 采用 PolyForm Noncommercial or Internal Use。 这个仓库包含源代码、测试、安全模型和版本说明。

开源 · 本地优先

## 你的项目，你的证据

建立私有工作空间，观察你自己的文件夹，并告诉我们哪里还需要改进。

开始使用

↑

报告问题

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
