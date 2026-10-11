Contract: brand-contract v1

<!-- Generated from zh-hans/switchboard/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Switchboard | Claude Code & Codex 账号管理器 | PassionCode.ai

管理 Claude Code 和 Codex 账号，查看用量限制，切换托管请求。下载适用于 macOS 和 Windows 的 Switchboard。

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

FABRIC SWITCHBOARD · PASSIONCODE 出品

# 你的账号

# 更清楚的切换

把 Claude Code 和 Codex CLI 账号放在同一个本地工作台：查看每个账号上报的用量，并选择由哪个账号处理下一次请求

工具包成员 账号：每个智能体运行在哪个账号上，并可查看其用量限制。第 4 步，见工作原理。全部工具

下载 Switchboard

↓

查看源代码

↗

开源 · macOS + Windows · 桌面应用 + CLI

一个工具 / 你的账号

CLAUDE CODE

+

CODEX CLI

获取 SWITCHBOARD

## 选择你的平台

最新版本：0.6.16。两个下载包都包含桌面应用和 switchboard CLI。

⌘

### macOS

通用版 · Apple 芯片 + Intel
macOS 14 或更高版本 · ZIP 压缩包

下载 macOS 版

↓

已使用 Developer ID 签名，并通过 Apple 公证。打开 ZIP，将 Fabric Switchboard 移到“应用程序”文件夹，再从那里打开。

⊞

### Windows

x64 · 桌面安装程序 + CLI
ZIP 压缩包 · 需要 WebView2

下载 Windows 版

↓

在 Windows 上原生构建，尚未使用 Authenticode 签名，因此 SmartScreen 可能显示警告。安装程序包含 CLI。

☰

### 打开之前

Switchboard 管理账号并启动官方 CLI，不会取代它们。

需单独安装 Claude Code 或 Codex CLI。Switchboard 不包含任何服务商订阅或 API 额度。

macOS 14 或更高版本，Apple 芯片或 Intel 均可。

带 WebView2 的 Windows x64。Windows 版本尚未使用 Authenticode 签名。

关闭窗口后，应用会继续在菜单栏中运行，并在登录时自动打开；请从其菜单中退出。

macOS ZIP · SHA-256

df7b94a8843711d80891ec91e800585eb1fd4db1440c735975615d1f4d3c7905

Windows ZIP · SHA-256

dfba522d80e4153d45614a04506d8093c0c3374e9d23068b87f4ed29cf13c2a2

打开前请比对：shasum -a 256（终端）、Get-FileHash（PowerShell）。值不同说明文件不同，请重新下载。

版本说明和校验和

↗

安装说明

↗

所有版本

↗

升级前请先阅读版本说明。各平台使用真实服务商账号的验收情况，在代码仓库中公开跟踪。

问题所在

## 限额用完了

## 工作却还没做完

一次长会话可能在任务进行到一半时达到账号的用量限制。接着工作只能等待：你要退出登录、找到另一个账号，再重新登录。

Switchboard 让 工作 继续进行。开启轮换后，下一次请求会转到同一账号池中的另一个账号，会话保持打开。

SWITCHBOARD 内部

## 一个视图看全部账号

Switchboard 的真实界面，使用合成的演示账号。

0.6.13 的浏览器演示 · 无真实账号、凭据或服务商请求

本地工作台

## 少一些账号切换的折腾

## 一眼看到更多上下文

01 / 账号

### 从你现在的状态开始

可以明确捕获当前的 CLI 账号，通过官方 CLI 登录，或导入 Claude Swap 配置。由你决定把哪些账号带入 Switchboard。

02 / 边界

### 工作归工作

把账号分入账号池，例如工作和个人。路由只在同一服务商、同一账号池内进行。

03 / 用量

### 看清你还剩多少额度

查看上报的配额窗口、重置时间和每次检查距今的时长。不支持或未知的用量会明确标出。

04 / 切换

### 改变下一次请求

选择托管路由，或选择启用按配额轮换。正在进行的响应沿用它开始时的账号身份。

05 / 本地存储

### 凭据留在你的电脑上

保存的密钥使用 macOS Keychain 或 Windows DPAPI。隔离的 CLI 启动会生成官方客户端所需的本地访问令牌副本。

06 / 你的工作方式

### 用窗口，或用终端

桌面应用和 CLI 共用同一个运行时。托管会话需要保持应用或 switchboard serve 处于运行状态。

面向智能体 · 0.4 新增

## 你的智能体可以看到

## 自己的限额

Switchboard 包含 switchboard mcp，这是一个本地 MCP 服务器。Claude Code、Codex 或其他 MCP 客户端可以读取剩余用量，并把下一次请求转到另一个账号。没有任何工具会接收或返回凭据。

01 / 用量

### 读取剩余额度

每个账号和每个窗口的剩余配额，附带重置时间和每次检查距今的时长。未知的用量会报告为未知，绝不记为零。

02 / 切换

### 在达到限额之前切换

智能体可以为其会话的下一次请求选择账号，范围限于同一服务商和同一账号池。若要更改这台 Mac 上所有会话的 Claude Code 登录，需要明确指定 global 标志。

03 / 项目规则

### 可选的项目规则

如果需要，可以让某个项目文件夹从指定账号开始。规则在应用中始终可见，可以暂停或设置到期，并且不会阻止轮换。

01

### 从 Switchboard 启动

从应用或 CLI 启动的会话，在能找到 switchboard CLI 时会获得这些智能体工具。隔离会话只获得只读工具。在 macOS 上，“智能体”面板会把应用内的 CLI 链接到 ~/.local/bin。

02

### 或者自行连接智能体

claude mcp add --scope user switchboard -- switchboard mcp
codex mcp add switchboard -- switchboard mcp

第一次会话

## 带入一个账号

## 选择运行方式

01

### 添加账号

捕获你当前的授权，或使用官方 CLI 登录。为账号设置标签和账号池。

02

### 核对已知信息

查看账号身份和上报的用量。托管选择和当前的原生 CLI 账号分开显示。

03

### 启动会话

使用托管模式可在请求之间切换账号；使用隔离模式则是固定在某一个账号上的直连会话。

开始之前

## 几点值得分清的区别

Switchboard 会取代 Claude Code 或 Codex 吗？

不会。它管理账号并启动官方 CLI。登录和会话需要另行安装 Claude Code 或 Codex。Switchboard 不包含服务商订阅或 API 额度。

它会自动更改我当前的 CLI 账号吗？

捕获是一个需要明确执行的操作。托管路由的选择与原生激活相互独立。原生 Claude 激活和自动轮换都需要你主动选择开启；启用前请先查看确认提示。

托管和隔离有什么区别？

托管会话通过本地代理发送请求，后续请求会沿用你选择的路由。隔离会话使用单独的账号主目录直接连接；之后的路由选择不会改变它们。

Switchboard 和 Fabric 是同一个东西吗？

Switchboard 是现已可用的账号管理工具。Fabric 是你的项目及其智能体的家，目前为早期预览版。两者都属于 PassionCode 工具包。了解我们用 Fabric 在构建什么。

哪些智能体可以与 Switchboard 配合使用？

Claude Code、Codex 以及其他常用的编码智能体，包括 Hermes、Kilo Code、Cline、Goose、OpenCode 等。查看全部 30 个及各自的连接方式。

项目可以有自己的账号吗？

可以。创建一个项目，添加它的文件夹（例如几个相关的代码仓库），再选择它的账号。从这些文件夹启动的会话只使用这些账号，自动切换也只在这些账号之间进行，其他项目中的智能体不会切换到它们。

Switchboard 会发送数据吗？

发布版本会统计安装数、使用天数以及已连接的账号数量，按服务商和类型划分。它们绝不会发送账号名称、e-mail 地址、登录信息、账号池名称，也不会发送你对账号做了什么。你电脑上的 PassionCode.ai 工具共用一个随机的安装编号，使同一个人只被计一次。可在“关于” → “共享匿名使用统计”中关闭；该开关对所有 PassionCode.ai 工具生效。具体发送了什么。

我可以自己查看或构建吗？

可以。Switchboard 是基于 GNU AGPL-3.0 的开源软件。对于 AGPL 未涵盖的用途，可从以下地址获取商业许可证：passioncode.ai/business。截至 v0.3.1-beta.1（含）的版本以 MIT 许可证发布，并继续按该许可证提供。当前下载的版本 0.6.16，以 AGPL 发布。v0.4.0-beta.1 以 PolyForm Noncommercial or Internal Use 发布，并保持该许可证。 这个仓库包含构建说明、源代码、测试和发布证据。

PASSIONCODE 工具包的一部分

## 账号只是

## 整套环境的一部分

Switchboard 管理 Claude Code 和 Codex 账号。Project Observatory 让你查看这些智能体正在处理的项目。Fabric Dashboards 在一个窗口中显示你 Mac 上的本地智能体服务。Fabric 是你的项目及其智能体的家，目前为早期预览版。

了解 Observatory

↗

Fabric Dashboards 版本

↗

认识 Fabric

↗

全部工具

↗

开源 · 本地优先

## 你的环境，你的源代码

试用它，查看它的工作方式，并告诉我们哪里需要改进。

下载 Switchboard

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
