Contract: brand-contract v1

<!-- Generated from observatory/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Project Observatory | Local dashboard for agent-operated projects | PassionCode.ai

See what changed across your projects, what needs attention and where known API keys left a copy. Project Observatory is an open-source local dashboard from PassionCode.ai, in English or Russian.

Skip to content

PassionCode

.ai

The tools

Your workflow

For builders

About

Download

↓

PROJECT OBSERVATORY · BY PASSIONCODE

# Your projects

# Back in view

See what changed across your agents’ projects, what needs attention and where known API keys left a copy, in a local dashboard available in English or Russian

Get started

↓

View source

↗

Open source · macOS + Linux · Python 3.11+

ONE VIEW / YOUR PROJECTS

PROJECTS

+

FINDINGS

INSIDE OBSERVATORY

## What needs attention, first

The actual Observatory overview, rendered by the engine over a fictional company’s projects.

Synthetic demo estate · no real projects, repositories or credentials

A LOCAL OBSERVATORY

## Less guessing

## More evidence at a glance

01 / INVENTORY

### Know what exists

Choose the project folder you want to observe. Observatory finds the repositories inside it and keeps a local registry, with the rule behind every link.

02 / ACTIVITY

### See what moved

Commits, working-tree state and work that exists only on this machine, across every project in scope, with the week-by-week shape of each.

03 / FINDINGS

### Start with what matters

Findings come with their evidence and a next step, ordered from critical to info. Silenced findings keep who silenced them, when and why.

04 / KEYS

### Find copies of known keys

Credential metadata stays separate from values. Selected transcripts, logs and SQLite stores are compared with keys already known locally; findings never repeat a value.

05 / YOUR LANGUAGE

### English or Russian

The dashboard is English by default. Set Russian for the workspace, or switch with EN/RU in the rail; counts use each language’s plural forms.

06 / AGENTS

### Give the next agent context

A CLI, MCP tools and a Claude Code plugin share the same local facts. Integrations and background jobs stay off until you choose them.

GET OBSERVATORY

## Start with your own workspace

Latest release: 0.16.0. No API key is needed for the first local observation. Hand the setup to your coding agent, or run it yourself.

01

### Install the release

Download project_observatory-0.16.0-py3-none-any.whl and SHA256SUMS from release 0.16.0, check them with shasum -a 256 -c SHA256SUMS --ignore-missing, then, in an isolated Python 3.11+ environment with SQLite extension support, pip install --no-deps the wheel and then its [full] extra with -c "$(project-observatory full-path)/requirements-full.lock", the dependency set the release was tested with. On macOS, use Homebrew Python.

02

### Create a private workspace

project-observatory full init, then choose the folder to observe with full configure sources projects. Configuration, keys and history stay outside the installed code.

03

### Observe and open

project-observatory full local, then full open. For Russian: full configure interface locale ru.

04

### Connect your agent

The MCP server speaks stdio: claude mcp add observatory --scope user -e OBSERVATORY_HOME="$OBSERVATORY_HOME" -- "$(python -c 'import sys; print(sys.executable)')" "$(project-observatory full-path)/mcp/server.py", then ask for observatory_overview.

Installation guide

↗

Onboarding & integrations

↗

All releases

↗

Mac app: ProjectObservatory-0.16.0-macos.zip, signed with a Developer ID and notarized by Apple, for macOS 14+. It opens on the dashboard and uses the engine installed above; check it against the same SHA256SUMS.

The current release, 0.16.0, is under the AGPL, like every release since 0.10.0, the first under the AGPL; 0.9.1 and earlier keep the license they shipped with.

Known-value scanning compares selected artifacts with keys already known locally. It cannot find unknown secrets or prove that no copy remains, and a local copy is not evidence that anyone else obtained a key. Live provider rotation and external MCP hosts are outside the offline test suite.

BEFORE YOU START

## A few useful distinctions

Does Observatory upload my projects or keys?

No. The inventory, history and observations live in your private workspace on your machine. Optional integrations have their own access; each is enabled separately with your own account.

What does it read?

Only the folders and sources you configure. full doctor reports what is enabled and what is missing, and the dashboard says when a source was not measured instead of showing zero.

Is it the same thing as Switchboard?

No. Switchboard manages your Claude Code and Codex accounts. Observatory keeps the projects those agents work on in view. Both are open-source PassionCode tools you can use today.

And Fabric?

Fabric is our CEO AI agent, in early preview, focused on coordinating agents and projects. Observatory is available now as a separate local tool. Explore Fabric.

Can I inspect or build it myself?

Yes. Project Observatory is open source under the GNU AGPL-3.0. For use the AGPL doesn’t cover, a commercial license is available from contact@passioncode.ai. Released versions keep their license: 0.8.1 and earlier under MIT, 0.8.2 to 0.9.1 under PolyForm Noncommercial or Internal Use. The repository includes the source, tests, the security model and release notes.

OPEN SOURCE · LOCAL FIRST

## Your projects, your evidence

Set up a private workspace, observe your own folders, and tell us where it needs to improve.

Get started

↑

Report an issue

↗

PassionCode

.ai

From vibe coding to passion coding

Get started

For companies

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
