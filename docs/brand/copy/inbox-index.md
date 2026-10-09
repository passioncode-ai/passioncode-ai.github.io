Contract: brand-contract v1

<!-- Generated from inbox/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Inbox | Mail with what matters first · macOS preview | PassionCode.ai

Fabric Inbox is Fabric’s mail tool and works on its own: Gmail and Cloudflare mailboxes in one list with important mail first, and agents on your own addresses. Development preview for macOS.

Skip to content

PassionCode

.ai

Products

Switchboard

Observatory

Inbox

Fabric

English

Русский

Español

Português (Brasil)

GitHub

↗

FABRIC INBOX · DEVELOPMENT PREVIEW

# Your mail

# Important first

Bring Gmail and Cloudflare mailboxes into one list, with important mail first and agents for your own domains that answer what you allow and draft the rest

IN THE FAMILY Mail: the addresses agents read and answer within the policy you set. The whole family

Download for macOS

↓

See what it does

↓

Development preview 0.12.0 · macOS 12 or later · open source under AGPL-3.0

FABRIC INBOX / MAIL + AGENTS

IMPORTANT

+

ANSWERED

01 / WHAT IT DOES

## Less to read

## Less to answer

Inbox sorts every account the same way, and gives the addresses on your domains someone to answer them.

IMPORTANT FIRST

### What needs you, on top

A person’s unread mail, security and sign-in mail, monitoring alerts, app review rejections, failed payments and failed builds come first. Newsletters, notifications, billing and the rest sit in collapsed groups with counts. Each row says why it is there.

YOUR DOMAINS

### Every address in one place

Turn on mail for a domain of your Cloudflare account, bring in the addresses it already has and add new ones. Each existing address keeps forwarding a copy where it went before. Mail to an address with no mailbox is listed, never dropped.

AGENTS, WITHIN YOUR RULES

### Sends only what it may

An agent has its own instructions, knowledge and tools and can serve several addresses. It sends an answer only when it rests on its knowledge, fits a topic you allowed and stays within its daily limit. Everything else waits as a draft with the reason.

GET FABRIC INBOX

## A development preview

## for your Mac

Latest preview: 0.12.0. The Mac app creates its mail server in your own Cloudflare account and opens it; your mail stays with your accounts.

⌘

### macOS

Universal · Apple silicon + Intel · macOS 12 or later
DMG installer · Developer ID signed and notarized by Apple

Download for macOS

↓

Open the DMG and drag Fabric Inbox to Applications.

☰

### Before you open it

On first open, choose Create my server on Cloudflare.

A Cloudflare account; the free plan works

An API token you create in its dashboard, with the permissions the app lists

For Gmail: an OAuth client from your own Google Cloud project

The setup guide lists every setting.

macOS DMG · SHA-256

a8e55bc8c8ad8837f079ad161104096cd14f1c09e08efaa883028642c0f136c7

Compare before opening: shasum -a 256 in Terminal. A different value means a different file; download it again.

Release notes & checksum

↗

Installation notes

↗

All releases

↗

This is a development preview. Agent answers have not yet been tried with a real model call, and Gmail has not yet been accepted on a real account. General IMAP and Outlook support are planned; neither is offered as a working integration today.

FOR AGENTS

## Everything the app does,

## an agent can do

Your server answers the Model Context Protocol at /mcp. Each function of the app is also an MCP tool, so Claude Code or another MCP client can read, sort and send mail and manage addresses within the level of its key.

01

### Make a key

In the app, open Settings → Agent access. Choose a name, a level (read, mail or admin) and whether it may send. The secret is shown once.

02

### Connect your agent

The app prints the whole command: claude mcp add --transport http fabric-inbox https://<your-server>/mcp with the key’s two headers. Then ask for list_accounts.

02 / THE PASSIONCODE FAMILY

## A tool with its own job

Inbox handles mail. Switchboard manages Claude Code and Codex accounts. Project Observatory keeps the projects those agents work on in view. Fabric is the CEO AI agent we’re building to coordinate the work.

Explore Switchboard

↗

Explore Observatory

↗

Meet Fabric

↗

BEFORE YOU START

## Where Inbox stands

Where does my mail go?

To the server the app creates in your own Cloudflare account. Gmail accounts connect through an OAuth client from your own Google Cloud project.

Will it answer my mail by itself?

Only on addresses you give an agent, and only answers its rules allow. Automatic, bulk and no-reply mail is never answered, and every run records exactly what was sent.

Does it support any mail account?

Not yet. Cloudflare mailboxes and Gmail work in the preview. General IMAP and Outlook support are planned.

Is the source public?

Yes. Fabric Inbox is open source under the GNU AGPL-3.0. For use the AGPL doesn’t cover, a commercial license is available from passioncode.ai/business. It began as Cloudflare’s Agentic Inbox template, which keeps its own Apache-2.0 notice. The repository includes the source, tests and release notes.

Is Inbox the Fabric agent?

No. Inbox is a mail client; its agents answer your addresses within the rules you set. Fabric is our CEO AI agent, in early preview. They belong to the same toolkit and have different roles.

PassionCode

.ai

From vibe coding to passion coding

Get started

Vision

For organizations

Switchboard

Observatory

Inbox

Dashboards

Fabric

GitHub & source

About

Design system

Privacy

commercial@passioncode.ai

Twitter

↗
