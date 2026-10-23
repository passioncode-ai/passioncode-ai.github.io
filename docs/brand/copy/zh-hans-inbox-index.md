Contract: brand-contract v1

<!-- Generated from zh-hans/inbox/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Inbox | 重要邮件优先 · 桌面预览版 | PassionCode.ai

Fabric Inbox 是 Fabric 的邮件工具，可独立使用：把 Gmail 和 Cloudflare 邮箱放进同一个列表，重要邮件优先，并让智能体负责你自己的地址。macOS、Windows 和 Linux 开发中的预览版。

跳到正文

PassionCode

.ai

产品

Switchboard

Observatory

Inbox

Fabric

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

FABRIC INBOX · 开发中的预览版

# 你的邮件

# 重要的优先

把 Gmail 和 Cloudflare 邮箱放进同一个列表，重要邮件优先。你自己域名上的智能体回复你允许的内容，其余留成草稿

工具包成员 邮件：智能体在你设定的策略内读取和回复的地址。第 5 步，见工作原理。全部工具

一条命令全部装好 →

下载 macOS 版

↓

看看它能做什么

↓

开发预览版 0.32.3 · macOS 12+ · Windows · Linux · 以 AGPL-3.0 开源

FABRIC INBOX / 邮件 + 智能体

重要

+

已回复

0.15 新功能

## 你的编码智能体

## 在 Inbox 中工作

0.15 版本将 Claude Code 或 Codex 放在你的邮件旁边，让它帮你配置 Inbox。控制台从 0.15.1 开始可用：0.15.0 中无法启动。智能体如何连接 ↓

智能体控制台

### 智能体在侧边面板中

Claude Code 或 Codex 运行在邮件窗口右侧，已连接到这个 Inbox，能执行应用中的所有操作。用工具栏按钮打开它，View → Agent Console 或 ⌃⌘T（Windows 和 Linux 上为 Ctrl+Shift+T）。每个会话获得一个你选定级别的密钥，会话结束时自动撤销。Mac App Store 版本没有控制台。

由你的智能体配置

### 无需复制地址或密钥

你的编码智能体在你的 Cloudflare 账户中创建服务器，然后在你于应用中允许后自行连接。你粘贴令牌、登录并选择 Allow。欢迎界面提供 Use the server your agent set up。

未收取的邮件

### 服务器未能收取的邮件

当一封邮件既无法接受也无法拒绝时，域名的设置会列出它是发给谁的、什么时间、以及原因。发件人可能收到了退信，这样你知道该问谁。

01 / 它能做什么

## 少读一些

## 少回一些

Inbox 以同样的方式分拣每个账号，并让你域名下的地址有智能体来回复。

重要的优先

### 需要你处理的放在最上面

真人发来的未读邮件、安全和登录邮件、监控告警、应用审核被拒、付款失败和构建失败排在最前。新闻通讯、通知、账单和其余邮件收在折叠的分组里，并标出数量。每一行都会说明它为什么在这里。

你的域名

### 所有地址集中在一处

为你 Cloudflare 账号中的某个域名开启邮件，导入它已有的地址，也可以新增地址。每个已有的地址仍会把一份副本转发到原来的去处。发往没有邮箱的地址的邮件会被列出，绝不会丢弃。

智能体，遵守你的规则

### 只发允许发送的

智能体有自己的指令、知识和工具，可以负责多个地址。只有当回答确实基于它的知识、属于你允许的话题，并且没有超出每日上限时，它才会发送。其余的都会作为草稿等待，并附上原因。

全部收件箱 · 示例地址和邮件，无真实账号

获取 FABRIC INBOX

## 开发中的预览版

## 适用于 Mac、Windows 和 Linux

最新预览版：0.32.3。应用会在你自己的 Cloudflare 账号中创建邮件服务器并将其打开；你的邮件只留在你自己的账号里。

⌘

### macOS

通用版 · Apple silicon + Intel · macOS 12 或更高版本
DMG 安装包 · 已使用 Developer ID 签名并通过 Apple 公证

下载 macOS 版

↓

打开 DMG，把 Fabric Inbox 拖到“应用程序”。

0.15.2 之前的 Mac 版本无法自行更新：下载一次 0.15.2，直接覆盖安装。之后的版本恢复自动更新。

⊞

### Windows 和 Linux

版本 0.32.3 同时提供 Windows 安装程序（x64 和 arm64，无需管理员权限，自 0.14.1 起已使用 Authenticode 签名），以及 Linux 的 AppImage 和 .deb（x64 和 arm64）。

下载 Windows 和 Linux 版本

↗

Windows 应用和 AppImage 会自动更新；通过 .deb 安装的副本不会自动更新，请安装下一个 .deb。在 Linux 上，应用将你的登录信息保存在 Secret Service（GNOME Keyring 或 KWallet）中，没有它则无法启动。

☰

### 打开之前

首次打开时，选择 Create my server on Cloudflare。如果你的编码智能体创建了服务器，改为选择 Use the server your agent set up。

一个 Cloudflare 账号；免费套餐即可

你在其控制台中创建的 API 令牌，权限以应用列出的为准

如果使用 Gmail：来自你自己的 Google Cloud 项目的 OAuth 客户端

这个设置指南列出了所有设置。

macOS DMG · SHA-256

4c2c554844a8b3b311bd1a6f91226a82c07133ccfc66e508059d089a11e62b5d

打开前请比对：shasum -a 256（终端）。值不同说明文件不同，请重新下载。

版本说明与校验和

↗

安装说明

↗

所有版本

↗

这是开发中的预览版。智能体的回答尚未用真实的模型调用试过，Gmail 也尚未在真实账号上通过验收。通用 IMAP 和 Outlook 支持已列入计划；目前都不是可用的集成。

面向智能体

## 应用能做的一切，

## 智能体也能做

你的服务器通过 Model Context Protocol 应答，地址为 /mcp。应用的每个功能同时也是一个 MCP 工具，因此 Claude Code 或其他 MCP 客户端可以在其密钥的权限级别内读取、分拣和发送邮件，并管理地址。

01

### 给你的智能体一句话

在应用中，打开 Settings → Agent access。它首先显示要给你的编码智能体的那句话。智能体在你的 Cloudflare 账户中创建服务器，并在你选择 Allow 后自行连接；你无需复制任何地址或密钥。智能体的操作步骤在智能体配置指南。

02

### 或者自己创建密钥

在同一界面，选择名称、级别（read、mail 或 admin）以及是否允许发送。密钥只显示一次。

03

### 连接你的智能体

对于你自己创建的密钥，应用会输出完整命令：claude mcp add --transport http fabric-inbox https://<your-server>/mcp 其中带有密钥的两个请求头。然后让智能体调用 list_accounts。

02 / PASSIONCODE 工具包

## 各有各的职责

Inbox 处理邮件。Switchboard 管理 Claude Code 和 Codex 账号。Project Observatory 让你随时看到这些智能体正在做的项目。Fabric 处于早期预览阶段，是你的项目及其智能体的家。

了解 Switchboard

↗

了解 Observatory

↗

认识 Fabric

↗

开始之前

## Inbox 的现状

我的邮件会去哪里？

去往应用在你自己的 Cloudflare 账号中创建的服务器。Gmail 账号通过来自你自己的 Google Cloud 项目的 OAuth 客户端连接。

它会自己回复我的邮件吗？

只在你交给智能体的地址上，并且只回复它的规则允许的内容。自动发送的邮件、群发邮件和无需回复的邮件绝不会回复，每次运行都会准确记录发出了什么。

它支持任何邮件账号吗？

目前还不支持。预览版中可用的是 Cloudflare 邮箱和 Gmail。通用 IMAP 和 Outlook 支持已列入计划。

源代码是公开的吗？

是的。Fabric Inbox 是开源的，采用 GNU AGPL-3.0 许可证。对于 AGPL 未涵盖的使用方式，可向以下地址获取商业许可证：passioncode.ai/business。它最初源自 Cloudflare 的 Agentic Inbox 模板，该模板保留其自有的 Apache-2.0 声明。仓库包含源代码、测试和版本说明。

Inbox 就是 Fabric 智能体吗？

不是。Inbox 是邮件客户端；它的智能体在你设定的规则范围内回复你的地址。Fabric，处于早期预览阶段，是你的项目及其智能体的家。它们属于同一个工具包，各有不同的角色。

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
