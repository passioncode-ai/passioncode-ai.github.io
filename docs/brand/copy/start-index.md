Contract: brand-contract v1

<!-- Generated from start/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Get started | Install your AI agent workplace | PassionCode.ai

Install the PassionCode.ai skills, add Fabric, create your first Fabric agent with Claude Code or Codex, convert an existing project, run it in Fabric Dashboards and add the next agent to the same family. Free and open source.

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

Get the tools

↓

Get started · free and open source

# From an empty Mac to your first agent

Stop building agents that rot and don’t talk to each other. Five steps, about twenty minutes, from the first agent to a family you can see. Each step is useful on its own, so stop wherever the result is enough

Needs Node.js 18+ and Claude Code or Codex Fabric needs macOS on Apple silicon

01

Install the skills

02

Add Fabric

03

Create or convert an agent

04

Run it and see it

05

Add the next agent

+

Contribute

## Steps

01

### Install the skills

The PassionCode.ai launcher installs the Fabric Agent Adapter skills, Observatory Log and the working rules into Claude Code, Codex and other supported agents. No account and no key.

npx @passioncode-ai/passioncode@latest update

Launcher 0.1.31 · it installs the family members at the versions it pins · restart your agent afterwards. Automatic updates are on by default; turn them off if you prefer.

02

### Add Fabric

Fabric is the CEO AI agent: each project gets a home for its purpose, board, decisions and releases. It is an early preview: it needs Docker and the Supabase CLI, and its conversation saves messages but does not reply yet.

Download Fabric

0.3.3

for macOS

↓

Requirements and limits

Apple silicon · signed and notarized · SHA-256 88922ad23da5190cb330bee837b23e687fdac0f039d1fef13e5d80ddee492446 · release notes

03

### Create or convert an agent

In Claude Code or Codex, ask for what you need. The Fabric Agent Adapter skill builds a Fabric-compatible service: a contract, a dashboard, tests and a conformance check.

new Create a Fabric agent that checks our app store reviews every morning and drafts replies

convert Adapt this repository to Fabric

An existing agent, MCP server or command-line tool keeps its code; the adapter adds what Fabric needs around it. Adapter quick start · the contract

04

### Run it and see it

Fabric Dashboards shows every local agent service in one window; your agent can start, stop and open them over MCP.

Download Fabric Dashboards

0.6.7

↓

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

Then add what your work calls for: Fabric Switchboard when agents need several accounts, Project Observatory to see what changed across projects, Fabric Inbox for mail.

05

### Add the next agent and see the family

When the work asks for it, build the next agent the same way and give it the same project in Fabric. Claude Code, Kilo Code and Hermes Agent started from Fabric share that project’s board, memory and hand-offs, so one picks up where the other stopped. Fabric Dashboards shows both, with their state and spend, in one window.

next Create a Fabric agent that turns the drafted review replies into a weekly summary for the board

Every new agent joins a family you can already see, instead of becoming one more script to remember. How the family grows · which agents connect today

A TOOL WE RECOMMEND

## Agents that finish

## what they start

For the changes your agents make, we recommend task-pipeline, a separate open-source skill from the sshlg-skills family. It carries a change through gated stages, from the brief and the plan to the tests, the deploy and the acceptance, and does not move on until each gate passes.

npx sshlg-skills install

task-pipeline on GitHub · it is not part of PassionCode.ai and needs nothing from it

CONTRIBUTE

## Found something to fix?

## Send a pull request

Every product repository is public. Each one names its test command in AGENTS.md and its quick start in the README; your coding agent can read both and do the rest.

### Pick a repository

Fork the product you use, or browse the organization. Issues marked with a label are a good start.

### Run its gate

Read the repository’s AGENTS.md and the organization’s CONTRIBUTING.md, make the change, and run the test command until it passes.

### Open the pull request

Opening it is your agreement to the repository’s CLA.md; there is no box to tick. We review every pull request and reply.

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

A few repositories are internal and visible only to collaborators: the team’s knowledge base and organization map. Want to join the team? Write to Sergey.

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

Design system

Privacy

commercial@passioncode.ai

Twitter

↗
