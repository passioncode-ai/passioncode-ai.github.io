Contract: brand-contract v1

<!-- Generated from fabric/agents/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Coding agents Fabric works with | Fabric | PassionCode.ai

As of 8 October 2026, Fabric 0.3.2 connects Claude Code, Kilo Code and Hermes Agent, Codex and Cline run in Fabric without its tools, and five more agents are next on the plan.

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

Español

Português (Brasil)

Download

↓

FABRIC · SUPPORTED CODING AGENTS

# Coding agents

# Fabric works with

Which agents Fabric can start in your project, which of them get Fabric’s own tools, and which come next

As of 8 October 2026 · the released app is Fabric 0.3.2

In the released app, Fabric connects Claude Code, Kilo Code and Hermes Agent: it starts the agent in a project’s terminal and gives it Fabric’s tools for that session. Codex and Cline run in Fabric but do not have Fabric’s tools yet. Five more agents come next on the plan, then the rest listed below. Fabric Switchboard switches subscription accounts for Claude Code and Codex, and API-key accounts for the other agents through Switchboard.

01 / WHAT “WORKS WITH” MEANS

## Three levels

## Each agent sits at one

Working with Fabric can mean different things, so this page names the level for every agent.

CONNECTED

### Started with Fabric’s tools

Fabric starts the agent in a project’s terminal. For that session only, the agent gets Fabric’s own tools: claims, hand-offs, memory and the board. A one-session credential carries that access, and nothing is written into the agent’s own settings.

RUNS IN FABRIC

### Started in the project folder

Fabric starts the agent in the project’s folder, so it works on that project’s files. It does not have Fabric’s tools yet.

PLANNED

### On the plan, in order

We intend to connect the agent. The plan below gives an order, not dates.

02 / CONNECTED

## Connected

## Fabric’s tools for the session

Claude Code, Kilo Code and Hermes Agent, all three in the released app.

Connected agents, as of 8 October 2026

Agent

Official site

Where it stands

Claude Code

claude.com

Released, in Fabric 0.3

Kilo Code

kilo.ai

Released, in Fabric 0.3.2

Hermes Agent

hermes-agent.nousresearch.com

Released, in Fabric 0.3.2

Kilo Code takes its session settings from its KILO_CONFIG_CONTENT variable, and a project’s own kilo.json cannot override them. We verified this on Kilo 7.4.17 on 5 October 2026. Hermes Agent connects over the open Agent Client Protocol: Fabric opens its session and hands it Fabric’s tools through a local bridge, verified on Hermes 0.21.4 the same day. Hermes needs a model chosen in its own setup before it can answer.

03 / RUNS IN FABRIC

## Runs in Fabric

## Not connected yet

Fabric starts the agent in the project folder. It works there without Fabric’s tools.

Agents that run in Fabric, as of 8 October 2026

Agent

Official site

Where it stands

Codex

github.com/openai/codex

Runs in the project folder, no Fabric tools yet

Cline

cline.bot

Released, in Fabric 0.3.2; asks before each tool, no Fabric tools yet

04 / PLANNED

## Planned

## In this order

Five come next as a group, and the last nine we take case by case. None of them has Fabric’s tools yet.

Planned coding agents, in order, as of 8 October 2026

Agent

Official site

Order

omp (oh-my-pi)

omp.sh

Next, as a group

pi

pi.dev

Next, as a group

OpenClaw

openclaw.ai

Next, as a group

OpenHands

openhands.dev

Next, as a group

Cursor CLI

cursor.com/cli

Next, as a group

Command Code

commandcode.ai

Case by case

DeepSeek Harness

deepseek.com/harness

Case by case

LangChain Deep Agents (dcode)

docs.langchain.com

Case by case

Letta

letta.com

Case by case

Strix

strix.ai

Case by case

goose

goose-docs.ai

Case by case

Qwen Code

github.com/QwenLM/qwen-code

Case by case

Gemini CLI

geminicli.com

Case by case

OpenCode

opencode.ai

Case by case

### Desktop apps and editors

Zed, ZCode, Proto, CodeGPT, Freebuff and HackerAI are desktop apps and editors that another program cannot start. They can be clients of Fabric’s local hub instead. Each needs its own documented entry, and those entries are planned, not written yet.

Planned desktop apps and editors, as of 8 October 2026

App

Official site

Route

Zed

zed.dev

Client of the local hub, entry planned

ZCode

zcode.z.ai

Client of the local hub, entry planned

Proto

proto.erp.ai

Client of the local hub, entry planned

CodeGPT

codegpt.co

Client of the local hub, entry planned

Freebuff

freebuff.com

Client of the local hub, entry planned

HackerAI

hackerai.co

Client of the local hub, entry planned

05 / HOW THE PLANNED AGENTS CONNECT

## One open protocol

## For the planned agents

The planned agents connect through the Agent Client Protocol (ACP). Its session setup carries the session’s MCP servers, and Fabric drives any agent that speaks it.

06 / WHY THESE AGENTS

## Chosen from

## what people use

We picked them from OpenRouter’s public app ranking, read on 5 October 2026. Of its daily top 30, 15 are coding agents or agent harnesses. Hermes Agent, connected since Fabric 0.3.2, has the largest share.

07 / ACCOUNTS

## Account switching

## Claude Code and Codex today

Fabric Switchboard switches subscription accounts for Claude Code and Codex. Since 0.6.1 it also works with the other agents: each gets Switchboard's tools, and an agent that accepts a custom endpoint can send its requests through Switchboard, which switches its API-key accounts. Which agents, and how each connects.

Download for macOS

↓

Explore Switchboard

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
