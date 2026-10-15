Contract: brand-contract v1

<!-- Generated from start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Get started | Install your AI agent workplace | PassionCode.ai

Set up PassionCode.ai with one command, or one prompt for Claude Code or Codex: the tools, their MCP servers and the skills. The same command checks and repairs a setup you already have. Free and open source.

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

Get started · free and open source

# From an empty Mac to your first agent

Build agents that keep working and know what the others did. One command sets up the tools, and the same command checks them later

Needs Node.js 18+ and Claude Code or Codex Fabric needs macOS on Apple silicon or Intel

→

One command

01

Create or adapt an agent

02

Run it and see it

03

Add the next agent

+

Contribute

ONE COMMAND

## Set up everything,

## or check what you have

One command installs the tools you choose from their signed releases, connects their MCP servers to Claude Code, Codex, Gemini CLI and Kimi Code, and adds the skills. On a computer that is already set up, the same command checks everything, repairs what is wrong and shows what changed.

### Run it yourself

npx @passioncode-ai/passioncode@latest setup

Needs Node.js 18+ · installs the apps on macOS; on Linux and Windows it sets up the skills and MCP servers · it installs nothing whose signature, checksum or notarization fails · restart your coding agent afterwards · to check without changing anything:

npx @passioncode-ai/passioncode@latest doctor

### Or let your coding agent do it

Copy this prompt into Claude Code, Codex or another coding agent. It runs the command, finishes what it can and gives you a short list of what only you can do: sign in, allow access, type a key into the tool’s own prompt.

Set up PassionCode.ai on this computer, or check and repair it if it is already set up. Run npx --yes @passioncode-ai/passioncode@latest setup --yes --json (it needs Node 18 or newer) and read its JSON: it installs the missing apps from their signed releases, the skills and every MCP server, repairs whatever is wrong, and checks everything again. Do not download or install anything by hand, and never stop or kill a running app. Then run each product onboarding step it lists that an agent may run, never ask me for a key or password in the chat (the tools open their own hidden prompts), and finish with npx --yes @passioncode-ai/passioncode@latest doctor. Tell me briefly what you set up or fixed, what still fails, and the numbered steps only I can do, such as signing in, and remind me to restart you so the new skills and MCP servers load.

Fabric is an early preview: the command installs it when Docker and the Supabase CLI are on your computer, and otherwise tells you what to add.

Prefer to do it by hand?

01

### Add Fabric

Fabric is the home for your projects and their agents: each project keeps its purpose, board, decisions and releases there. Its first screen offers four actions: create an agent, adapt one you already have, open a project or create one. It is an early preview: it needs Docker and the Supabase CLI, and its conversation saves messages but does not reply yet.

Download Fabric

0.3.5

for macOS

↓

Requirements and limits

Apple silicon and Intel · signed and notarized · SHA-256 1e54fe557f2752817bb00303a93d595c812609b355f6850420026663cf39b98b · release notes

02

### Add Fabric Dashboards

Fabric Dashboards shows every local agent service in one window. Download it, then connect it to your coding agent over MCP.

Download Fabric Dashboards

0.7.10

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

Switchboard, Project Observatory and Fabric Inbox each have their own download: Switchboard · Observatory · Inbox

## Next steps

01

### Create or adapt an agent

In Claude Code or Codex, ask for what you need, or start from Fabric’s Create and Adapt actions; the work runs in your coding agent’s console either way. The Fabric Agent Adapter skill asks its questions first and shows its plan before it changes anything; adapting works on a new fabric-adapter branch. You get a contract, a dashboard, tests and a conformance report.

new Create a Fabric agent that checks our app store reviews every morning and drafts replies

adapt Adapt this repository to Fabric

02

### Run it and see it

Fabric Dashboards shows every local agent service in one window; your agent can start, stop and open them over MCP. The one command installs it on macOS and connects it to your coding agent.

03

### Add the next agent to the same project

Build the next agent the same way and give it the same project in Fabric. Agents connected to Fabric share one project’s board, memory and hand-offs, so one picks up where the other stopped. Which agents connect today

For the changes your agents make, we recommend task-pipeline, a separate open-source skill: what it does and how to install it

CONTRIBUTE

## Found something to fix?

## Send a pull request

Every product repository is public and names its test command in AGENTS.md. Follow the organization’s CONTRIBUTING.md and open a pull request; opening it is your agreement to the repository’s CLA.md.

fabric

fabric-switchboard

fabric-dashboards

fabric-inbox

project-observatory-dashboard

fabric-agent-adapter

fabric-agent-contract

passioncode

okolos

fabric-vr

passioncode-ai.github.io

FOR ORGANIZATIONS

## Want it running

## for your whole team?

We map your processes, estimate what agents can take over, and set it up with you or for you.

Estimate and request

→

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
