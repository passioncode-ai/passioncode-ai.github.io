Contract: brand-contract v1

<!-- Generated from dashboards/index.html; edit source and rerun scripts/extract-public-copy.py. -->

Fabric Dashboards | Your local agent services, together

One Mac window for your local agent services. See what needs attention, open dashboards, and let your agents use the same tools over MCP.

Skip to content

PassionCode

.ai

The tools

Your workflow

For builders

About

Download

↓

FABRIC DASHBOARDS · macOS

# Your agent services

# One place to look

See what is running, what needs attention and what happened last, with each service’s own dashboard in one Mac app

Download for macOS ↓

View source ↗

Release 0.5.3 · macOS 13+ · Apple silicon + Intel

YOUR LOCAL SERVICES / TOGETHER

01 / KEEP THE WORK IN VIEW

## A window into

## the tools doing the work

Fabric Dashboards discovers compatible services on your Mac. Each service keeps its own job; you get a shared place to inspect and control them.

### See what needs you

The overview opens on one line of numbers: how many services are ready, what is not answering, what needs you and what your agents spent today. Each problem takes one row. A slow probe is not treated as an outage.

### Open the actual dashboard

Each service’s own interface opens inside the app, signed in. Go back, reload, or copy the page address or an app link to hand to a teammate or an agent. If a sign-in expires, the app signs in again on the same page.

### See what your agents spent

Agents that report their own usage appear on one Spend page: today, 7 days and 30 days, with a breakdown by model. A cost an agent could not price reads as unknown, never as $0.

### One entry per agent

A service that runs more than one copy, such as a main instance and a read-only one, appears once. Switch between its copies on its page.

### Online services too

Register a service that runs on a server, not on your Mac. It appears in its own Online group and opens signed in over HTTPS.

### Handle the next step

Start, stop or restart a local service through macOS launchd, inspect its logs, and use the actions its contract exposes. Quitting Dashboards leaves your services running.

02 / GET FABRIC DASHBOARDS

## One download

## Your services stay yours

### macOS

Release 0.5.3. Universal DMG for Apple silicon and Intel, macOS 13 or later. Developer ID signed, notarized and stapled.

Download Fabric Dashboards ↓

Open the DMG, drag Fabric Dashboards to Applications, then open it. The app asks once whether to open at login; you can change that in Settings. Later versions arrive through the app’s own updates.

### Before you open it

Services are installed separately. An empty list is expected until a compatible service is installed; Dashboards does not turn every local process into an agent service.

Try Project Observatory, or make your own service with the Fabric Agent Adapter. The app itself needs no account or API key.

DMG SHA-256

SHA256_PENDING

Release notes and checksums ↗

Installation guide ↗

03 / FOR YOUR AGENTS

## The same services

## From your agent

Register the app’s MCP server with your client. An agent can list services, get dashboard links and use the operations exposed by the app’s rules.

claude mcp add --scope user fabric-dashboards -- "/Applications/Fabric Dashboards.app/Contents/Resources/bin/fabric-dashboards-mcp"

After installing the app in Applications, ask your agent to call list_services. An empty result means no service is installed yet. Other MCP clients can run the same executable as a stdio server. See the MCP setup guide.

04 / GOOD TO KNOW

## Fits into your setup

Do I need Fabric?

No. Fabric Dashboards works on its own. It is one of Fabric’s tools, and it can show compatible services before you use Fabric’s early preview.

Which services appear?

Services that publish a local descriptor for fabric-service/0.1. Project Observatory supports it. The Fabric Agent Contract defines the protocol and the Adapter helps you implement it.

Is it open source?

Fabric Dashboards is open source under the GNU AGPL-3.0. A commercial license is available: contact@passioncode.ai. Release 0.1.0 keeps MIT; 0.2.0 and 0.3.0 keep PolyForm Noncommercial or Internal Use. Release 0.3.1 is the first under the AGPL.

PART OF YOUR AGENT WORKPLACE

## Start with the services

## you already use

Inspect projects with Observatory. Configure accounts with Switchboard. Add only the tools your work needs.

Explore the tools ↗

PassionCode

.ai

From vibe coding to passion coding

Switchboard

Observatory

Inbox

Dashboards

Fabric

GitHub & source

About

Design system

Twitter

↗
