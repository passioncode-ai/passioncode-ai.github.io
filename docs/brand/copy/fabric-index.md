Contract: brand-contract v1

<!-- Generated from fabric/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric | The home for your projects and their agents · early preview for macOS, Windows and Linux | PassionCode.ai

Fabric is the home for your projects and their agents, an early preview for macOS, Windows and Linux. It keeps a project’s board, decisions, work and releases in one place, on your computer.

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

Set up

↓

FABRIC · EARLY PREVIEW

# A home for your projects

# and their agents

Fabric keeps each project’s purpose, board, decisions and releases on your computer, for every agent that works on it. We are building it to act as the CEO of your agents

IN THE TOOLKIT The home every agent of a project shares: its purpose, board, decisions and releases. Steps 2 and 5 of how it works. All the tools

Set up everything with one command →

Download Fabric

↓

Explore the workflow

↓

Early preview 0.3.15 · macOS, Windows and Linux

THE FIRST SCREEN · FOUR ACTIONS

Create an agent

Name it, say what it does, choose its folder and coding agent

Adapt an agent

Bring one built elsewhere, on a new branch

Open a project

A folder, or a folder of them

Create a project

A new home for its purpose, board and releases

The agent work itself runs in your coding agent’s console

THE PROBLEM

## A project lasts longer

## than a conversation

An agent can finish a task while the team still loses the reason behind it. Context gets spread across chats, decisions need repeating and someone has to put the work back together.

We’re building Fabric around the project: the purpose, team, decisions and history that should survive the next session.

THE OPERATING LOOP · DIRECTION

## From intent

## to a checked result

This is the workflow we’re designing toward. It describes Fabric’s direction, not a promise that every step is available today.

01

### Understand the project

Bring its purpose, current state and relevant context into the same place.

02

### Make the work explicit

Turn the goal into work with an owner, expected outcome and clear boundaries.

03

### Coordinate execution

Route work between people, agents and repeatable processes without losing the project’s context.

04

### Review and keep learning

Check the result against evidence. Preserve decisions and learning for the next cycle.

INSIDE FABRIC

## Where you left off

## What needs you

The actual Fabric window, shown with a synthetic demo space: four projects and 28 days of work.

Home · synthetic demo projects, no real accounts or repositories

The board · what waits for your decision

Releases · what went in, why, and what confirms it

Create an agent · a name, one sentence, a folder, a coding agent

Adapt an agent · Fabric reads the folder and nothing else

The console after Create · the questions, one at a time

The console after Adapt · the plan before any change

The Create and Adapt screens are Fabric’s own interface, rendered from its source with sample data. The console text is a written example of what the coding agent does, not a recording.

HOW WE’RE BUILDING IT

## People remain accountable

Coordination is where Fabric is going, and it never replaces you. You decide what the project is for and what each agent is allowed to do.

AUTHORITY

### Permission stays explicit

Goals, responsibilities and limits belong to the project. Confidence from an agent is not permission to act.

CHOICE

### Agents stay replaceable

The project should keep its purpose and history when you change a provider or the agent doing the work.

EVIDENCE

### Results need a receipt

A completed task should come with something a person can check, not only an agent saying it is done.

GET FABRIC

## An early preview

## for Mac, Windows and Linux

Latest preview: 0.3.15. Fabric runs on your computer with a local database; your projects stay on this machine.

⌘

### macOS

Apple silicon and Intel (universal) · macOS 13 or later
DMG installer · Developer ID signed and notarized by Apple

Download for macOS

↓

Open the DMG and drag Fabric to Applications. The same DMG runs on Apple silicon and Intel Macs.

⊞

### Windows

x64 (Intel and AMD) and arm64 · Windows installer
Installs for your user · Authenticode-signed

Download for Windows x64

↓

Windows on Arm (arm64) ↓

Run the setup file. Terminals that Fabric opens use PowerShell.

>_

### Linux

x64 and arm64
.deb package or AppImage

Download the .deb for x64

↓

.deb for arm64 ↓

AppImage for x64 ↓

AppImage for arm64 ↓

Prefer the .deb: it opens fabric:// links and keeps one path for registering fabric-mcp. An AppImage mounts at a new path each time it starts.

☰

### Before you open it

Fabric starts its own local database with the Supabase CLI inside Docker.

On macOS: Docker Desktop or OrbStack, running, and the Supabase CLI: brew install supabase/tap/supabase

On Windows: Docker Desktop with WSL2, running, and the Supabase CLI: scoop install supabase

On Linux: Docker Engine, running, and the Supabase CLI

Claude Code or Codex CLI, signed in, for agents to do work

If Docker or the CLI is missing, Fabric says which one on its first start. See which coding agents Fabric works with and what each one can do there.

Not yet on Windows and Linux: Fabric does not read whether a coding agent is signed in, and says so. Not yet on Windows: connecting a cloud product’s secret through Project Observatory.

Release notes & checksum

↗

View source

↗

This is an early preview. You can keep projects, a board of decisions, tasks, goals, a pulse of the work and releases with their receipts. The conversation with Fabric saves your messages, but Fabric does not reply yet. A newer version does not upgrade an existing database on its own; it tells you the command to run. Agents registered on this Mac can ask Fabric, through its local agent hub, for access to a connected product such as Fabric Inbox; you allow or deny each request and can revoke it in Settings. Since 0.3.2, Fabric sends anonymous usage counts — counts and kinds only, never names, paths or content; turn them off in Settings → Share usage counts, which applies to every PassionCode.ai app on your Mac.

Fabric is open source under the GNU AGPL-3.0, and a commercial license is available from passioncode.ai/business for use the AGPL doesn’t cover. The 0.3.15 preview is built, signed and notarized in CI from that public source.

WORKS WITH FABRIC

## Four tools around the home

## Each also works on its own

Fabric keeps the project. These four tools work with Fabric, and on their own, so you can start with any one of them.

Fabric Switchboard

Choose the account each agent runs on, with usage limits in view.

↗

Fabric Dashboards

Every local agent service in one window, driven by you or by agents.

↗

Project Observatory

What changed in every project, what needs attention, with the evidence.

↗

Fabric Inbox

Gmail and Cloudflare mail in one list, important first; agents answer by policy.

↗

01

AVAILABLE NOW

### One command sets up all of it

On a Mac, the four tools and Fabric (when Docker and the Supabase CLI are there), with their MCP servers and the skills, from verified releases. Run it again later and it checks and repairs.

Set up

02

DIRECTION

### Add a tool from inside Fabric

Choosing and installing the tools without leaving Fabric is where we are building.

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

Investors

Contributors

Press

Design system

Privacy

commercial@passioncode.ai

X

↗
