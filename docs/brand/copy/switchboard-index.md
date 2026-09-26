Contract: brand-contract v1

<!-- Generated from switchboard/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Switchboard | Claude Code & Codex account manager | PassionCode.ai

Manage Claude Code and Codex accounts, inspect usage limits and switch managed requests. Download the open-source Switchboard beta for macOS and Windows.

Skip to content

PassionCode

.ai

The toolkit

What’s next

About

Download

↓

FABRIC SWITCHBOARD · BY PASSIONCODE

Your accounts.

A clearer switch.

Keep your Claude Code and Codex CLI accounts in one local workbench. See reported usage, separate work from personal accounts, and choose what handles your next request.

Download Switchboard

↓

View source

↗

Open source · MIT · macOS + Windows · Desktop + CLI

ONE TOOL / YOUR ACCOUNTS

CLAUDE CODE

+

CODEX CLI

GET SWITCHBOARD

Pick your platform.

Latest public beta:

0.3.1-beta.1

. Both downloads include the desktop app and the

switchboard

CLI.

⌘

macOS

Universal · Apple silicon + Intel

macOS 14 or later · ZIP archive

Download for macOS

↓

Developer ID signed. Not yet notarized by Apple; macOS may block the first launch. Read the installation notes before opening.

⊞

Windows

x64 · Desktop installer + CLI

ZIP archive · WebView2 required

Download for Windows

↓

Unsigned beta, cross-built for Windows. SmartScreen may show a warning. Execution on a Windows machine has not yet been verified.

Release notes & checksums

↗

Installation notes

↗

All releases

↗

This is an early beta. Real provider login and end-to-end requests with live accounts are not yet verified. Review the release notes and use accounts you are comfortable testing with.

INSIDE SWITCHBOARD

One view of your accounts.

The actual Switchboard interface, shown with synthetic demo accounts.

Browser demo · no real accounts, credentials or provider requests.

A LOCAL WORKBENCH

Less account juggling.

More context at a glance.

01 / ACCOUNTS

Start where you are.

Explicitly capture the current CLI account, sign in through the official CLI, or import Claude Swap profiles. Choose what you bring into Switchboard.

02 / BOUNDARIES

Work stays with work.

Group accounts into pools such as work and personal. Routing stays within the same provider and pool.

03 / USAGE

See the limits you have.

Inspect reported quota windows, reset times and the age of each check. Unsupported or unknown usage stays clearly marked.

04 / SWITCHING

Change the next request.

Select a managed route or opt into quota-aware rotation. An in-flight response keeps the identity it started with.

05 / LOCAL STORAGE

Keep credentials on your machine.

Saved secrets use macOS Keychain or Windows DPAPI. Isolated CLI launches create the local access-token copy the official client needs.

06 / YOUR WORKFLOW

Use a window. Or your terminal.

The desktop and CLI share the same runtime. Keep the app or

switchboard serve

running for managed sessions.

THE FIRST SESSION

Bring an account.

Choose how it runs.

01

Add an account

Capture your current authorization or use the official CLI login. Give the account a label and a pool.

02

Check what is known

Review account identity and reported usage. Managed selection and the current native CLI account are shown separately.

03

Launch your session

Use managed mode for switching between requests, or isolated mode for a direct session pinned to one account.

BEFORE YOU START

A few useful distinctions.

Does Switchboard replace Claude Code or Codex?

No. It manages accounts and launches the official CLIs. Install Claude Code or Codex separately for sign-in and sessions. Switchboard does not include a provider subscription or API credits.

Does it change my current CLI account automatically?

Capture is an explicit action. Managed route selection is separate from native activation. Native Claude activation and automatic rotation are opt-in operations; check the confirmation before enabling them.

What is the difference between managed and isolated?

Managed sessions send requests through a local proxy and follow your selected route on subsequent requests. Isolated sessions connect directly using a separate account home; later route selections do not change them.

Is Switchboard the same thing as Fabric?

Switchboard is the account-management tool available today. Fabric is our CEO AI agent in development, focused on coordinating agents and projects. Both belong to the PassionCode toolkit.

Explore what we’re building with Fabric

.

Can I inspect or build it myself?

Yes. Switchboard is open source under the MIT license. The

repository

includes build instructions, source, tests and release evidence.

OPEN SOURCE · LOCAL FIRST

Your setup. Your source.

Try the beta, inspect how it works, and tell us where it needs to improve.

Download Switchboard

↑

Report an issue

↗

PassionCode

.ai

From vibe coding to passion coding.

Switchboard

Observatory

Fabric

GitHub & source

About

Design system

Twitter

↗
