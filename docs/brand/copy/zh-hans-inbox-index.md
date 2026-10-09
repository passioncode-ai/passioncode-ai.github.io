Contract: brand-contract v1

<!-- Generated from zh-hans/inbox/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Inbox | 重要邮件优先 · macOS 预览版 | PassionCode.ai

Fabric Inbox 是 Fabric 的邮件工具，可独立使用：把 Gmail 和 Cloudflare 邮箱放进同一个列表，重要邮件优先，并让智能体负责你自己的地址。macOS 开发中的预览版。

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

GitHub

↗

FABRIC INBOX · 开发中的预览版

# 你的邮件

# 重要的优先

把 Gmail 和 Cloudflare 邮箱汇入同一个列表，重要邮件优先；你自己域名下的地址由智能体负责，能回复的按你允许的范围回复，其余起草成草稿

家族成员 邮件：智能体读取并在你设定的策略范围内回复的地址。完整家族

下载 macOS 版

↓

看看它能做什么

↓

开发预览版 0.12.0 · macOS 12 或更高版本 · 以 AGPL-3.0 开源

FABRIC INBOX / 邮件 + 智能体

重要

+

已回复

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

获取 FABRIC INBOX

## 开发中的预览版

## 适用于你的 Mac

最新预览版：0.12.0。Mac 应用会在你自己的 Cloudflare 账号中创建它的邮件服务器并将其打开；你的邮件只留在你自己的账号里。

⌘

### macOS

通用版 · Apple silicon + Intel · macOS 12 或更高版本
DMG 安装包 · 已使用 Developer ID 签名并通过 Apple 公证

下载 macOS 版

↓

打开 DMG，把 Fabric Inbox 拖到“应用程序”。

☰

### 打开之前

首次打开时，选择 Create my server on Cloudflare。

一个 Cloudflare 账号；免费套餐即可

你在其控制台中创建的 API 令牌，权限以应用列出的为准

如果使用 Gmail：来自你自己的 Google Cloud 项目的 OAuth 客户端

这个设置指南列出了所有设置。

macOS DMG · SHA-256

a8e55bc8c8ad8837f079ad161104096cd14f1c09e08efaa883028642c0f136c7

打开前请比对：shasum -a 256 在“终端”中。如果值不同，说明是另一个文件；请重新下载。

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

你的服务器在以下地址使用 Model Context Protocol 应答 /mcp。应用的每个功能同时也是一个 MCP 工具，因此 Claude Code 或其他 MCP 客户端可以在其密钥的权限级别内读取、分拣和发送邮件，并管理地址。

01

### 创建密钥

在应用中，打开 Settings → Agent access。选择名称、级别（read、mail 或 admin），以及它是否可以发送。密钥只显示一次。

02

### 连接你的智能体

应用会输出完整的命令：claude mcp add --transport http fabric-inbox https://<your-server>/mcp 其中带有密钥的两个请求头。然后请求 list_accounts。

02 / PASSIONCODE 家族

## 各有各的职责

Inbox 处理邮件。Switchboard 管理 Claude Code 和 Codex 账号。Project Observatory 让这些智能体所处理的项目一目了然。Fabric 是我们正在打造的 CEO AI 智能体，负责协调这些工作。

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

不是。Inbox 是邮件客户端；它的智能体在你设定的规则范围内回复你的地址。Fabric 是我们的 CEO AI 智能体，目前是早期预览版。它们属于同一套工具集，但职责不同。

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
