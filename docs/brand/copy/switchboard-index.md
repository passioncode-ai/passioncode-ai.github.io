Contract: brand-contract v1

<!-- Generated from switchboard/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Switchboard | Claude Code & Codex account manager | PassionCode.ai

Manage Claude Code and Codex accounts, inspect usage limits and switch managed requests. Download Switchboard for macOS and Windows.

Skip to content

PassionCode

.ai

Vision

For you

For organizations

The tools

About

English

Русский

Deutsch

Français

Polski

한국어

Español

Português (Brasil)

简体中文

日本語

Download

↓

FABRIC SWITCHBOARD · BY PASSIONCODE

# Your accounts

# A clearer switch

Keep your Claude Code and Codex CLI accounts in one local workbench: see the usage each one reports, and choose which account handles the next request

IN THE TOOLKIT The accounts: which account each agent runs on, with its usage limits in view. Step 4 of how it works. All the tools

Download Switchboard

↓

View source

↗

Open source · macOS + Windows · Desktop + CLI

ONE TOOL / YOUR ACCOUNTS

CLAUDE CODE

+

CODEX CLI

GET SWITCHBOARD

## Pick your platform

Latest release: 0.6.16. Both downloads include the desktop app and the switchboard CLI.

⌘

### macOS

Universal · Apple silicon + Intel
macOS 14 or later · ZIP archive

Download for macOS

↓

Developer ID signed and notarized by Apple. Open the ZIP, move Fabric Switchboard to Applications and open it from there.

⊞

### Windows

x64 · Desktop installer + CLI
ZIP archive · WebView2 required

Download for Windows

↓

Built natively on Windows, not yet Authenticode-signed, so SmartScreen may show a warning. The installer includes the CLI.

☰

### Before you open it

Switchboard manages accounts and launches the official CLIs. It does not replace them.

Claude Code or Codex CLI, installed separately. Switchboard includes no provider subscription or API credits.

macOS 14 or later, on Apple silicon or Intel.

Windows x64 with WebView2. The Windows build is not yet Authenticode-signed.

The app keeps running in the menu bar after you close its window, and opens at login; quit it from its menu.

macOS ZIP · SHA-256

df7b94a8843711d80891ec91e800585eb1fd4db1440c735975615d1f4d3c7905

Windows ZIP · SHA-256

dfba522d80e4153d45614a04506d8093c0c3374e9d23068b87f4ed29cf13c2a2

Compare before opening: shasum -a 256 in Terminal, Get-FileHash in PowerShell. A different value means a different file; download it again.

Release notes & checksums

↗

Installation notes

↗

All releases

↗

Review the release notes before you upgrade. Acceptance with live provider accounts on each platform is tracked openly in the repository.

THE PROBLEM

## Limits run out

## before the work does

A long session can reach an account’s usage limit halfway through a task. Then the work waits while you sign out, find another account and sign back in.

Switchboard keeps the work going. With rotation on, the next request moves to another account in the same pool, and the session stays open.

INSIDE SWITCHBOARD

## One view of your accounts

The actual Switchboard interface, shown with synthetic demo accounts.

Browser demo of 0.6.13 · no real accounts, credentials or provider requests

A LOCAL WORKBENCH

## Less account juggling

## More context at a glance

01 / ACCOUNTS

### Start where you are

Explicitly capture the current CLI account, sign in through the official CLI, or import Claude Swap profiles. Choose what you bring into Switchboard.

02 / BOUNDARIES

### Work stays with work

Group accounts into pools such as work and personal. Routing stays within the same provider and pool.

03 / USAGE

### See the limits you have

Inspect reported quota windows, reset times and the age of each check. Unsupported or unknown usage stays clearly marked.

04 / SWITCHING

### Change the next request

Select a managed route or opt into quota-aware rotation. An in-flight response keeps the identity it started with.

05 / LOCAL STORAGE

### Keep credentials on your machine

Saved secrets use macOS Keychain or Windows DPAPI. Isolated CLI launches create the local access-token copy the official client needs.

06 / YOUR WORKFLOW

### Use a window or your terminal

The desktop and CLI share the same runtime. Keep the app or switchboard serve running for managed sessions.

FOR AGENTS · NEW IN 0.4

## Your agent can see

## its own limits

Switchboard includes switchboard mcp, a local MCP server. Claude Code, Codex or another MCP client can read the usage that’s left and move its next request to another account. No tool accepts or returns a credential.

01 / USAGE

### Read what’s left

Remaining quota for each account and window, with reset times and the age of each check. Unknown usage is reported as unknown, never as zero.

02 / SWITCHING

### Switch before the limit

An agent can choose the account for its session’s next request, within the same provider and pool. Changing the Claude Code login for every session on the Mac needs an explicit global flag.

03 / PROJECT RULES

### Optional project rules

Start a project folder on a chosen account, if you want to. Rules stay visible in the app, can be paused or set to expire, and never stop rotation.

01

### Launch from Switchboard

Sessions you launch from the app or the CLI get the tools when the switchboard CLI can be found. Isolated sessions get the read-only tools. On macOS, the Agents panel links the CLI inside the app to ~/.local/bin.

02

### Or connect an agent yourself

claude mcp add --scope user switchboard -- switchboard mcp
codex mcp add switchboard -- switchboard mcp

THE FIRST SESSION

## Bring an account

## Choose how it runs

01

### Add an account

Capture your current authorization or use the official CLI login. Give the account a label and a pool.

02

### Check what is known

Review account identity and reported usage. Managed selection and the current native CLI account are shown separately.

03

### Launch your session

Use managed mode for switching between requests, or isolated mode for a direct session pinned to one account.

BEFORE YOU START

## A few useful distinctions

Does Switchboard replace Claude Code or Codex?

No. It manages accounts and launches the official CLIs. Install Claude Code or Codex separately for sign-in and sessions. Switchboard does not include a provider subscription or API credits.

Does it change my current CLI account automatically?

Capture is an explicit action. Managed route selection is separate from native activation. Native Claude activation and automatic rotation are opt-in operations; check the confirmation before enabling them.

What is the difference between managed and isolated?

Managed sessions send requests through a local proxy and follow your selected route on subsequent requests. Isolated sessions connect directly using a separate account home; later route selections do not change them.

Is Switchboard the same thing as Fabric?

Switchboard is the account-management tool available today. Fabric, in early preview, is the home for your projects and their agents. Both belong to the PassionCode toolkit. Explore what we’re building with Fabric.

Which agents work with Switchboard?

Claude Code, Codex and the other popular coding agents — Hermes, Kilo Code, Cline, Goose, OpenCode and more. See all 30 and how each connects.

Can a project keep its own accounts?

Yes. Create a project, add its folders — for example several related repositories — and choose its accounts. Sessions launched from those folders use only those accounts, automatic switching stays inside them, and agents working in other projects never switch to them.

Does Switchboard send any data?

Release builds count installs, days of use and how many accounts are connected, by provider and type. They never send account names, e-mail addresses, sign-ins, pool names or what you do with your accounts. A random installation number shared by the PassionCode.ai tools on your computer lets one person count once. Turn it off in About → Share anonymous usage counts; the switch applies to every PassionCode.ai tool. What exactly is sent.

Can I inspect or build it myself?

Yes. Switchboard is open source under the GNU AGPL-3.0. For use the AGPL doesn’t cover, a commercial license is available from passioncode.ai/business. Releases up to and including v0.3.1-beta.1 were published under MIT and remain available under it. The current download, 0.6.16, is released under the AGPL. v0.4.0-beta.1 was released under PolyForm Noncommercial or Internal Use and keeps that license. The repository includes build instructions, source, tests and release evidence.

PART OF THE PASSIONCODE TOOLKIT

## Accounts are one part

## of the setup

Switchboard manages Claude Code and Codex accounts. Project Observatory keeps the projects those agents work on in view. Fabric Dashboards shows the local agent services on your Mac in one window. Fabric, the home for your projects and their agents, is in early preview.

Explore Observatory

↗

Fabric Dashboards release

↗

Meet Fabric

↗

All the tools

↗

OPEN SOURCE · LOCAL FIRST

## Your setup, your source

Try it, inspect how it works, and tell us where it needs to improve.

Download Switchboard

↑

Report an issue

↗

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
