# UX Scenarios

<!-- Managed with super-ux (ux-contract v4). -->

## Index

| ID | Title | Feature | Persona | Traces | Status | Last audit |
|---|---|---|---|---|---|---|
| SCN-001 | Discover the toolkit | Discovery | P-01 | ST-01, FLW-01 | draft | pending |
| SCN-002 | Download for macOS | Downloads | P-01 | ST-02, FLW-01 | draft | pending |
| SCN-003 | Download for Windows | Downloads | P-01 | ST-02, FLW-01 | draft | pending |
| SCN-004 | Inspect source and product boundaries | Trust | P-01 | ST-03, FLW-02 | draft | pending |
| SCN-005 | Read the shared design language | Design system | P-01 | ST-03, FLW-02 | draft | pending |
| SCN-006 | Discover and start Project Observatory | Observatory | P-01 | ST-01, ST-03, FLW-01 | draft | pending |
| SCN-007 | Understand the work cycle and Fabric | Direction | P-01 | ST-04, FLW-03 | draft | pending |
| SCN-008 | Follow the builder | About | P-01 | ST-05, FLW-03 | draft | pending |

| SCN-009 | Understand and download Fabric Inbox | Inbox | P-01 | ST-01, ST-03, FLW-01 | draft | pending |
| SCN-010 | Find Fabric Dashboards and its release | Dashboards | P-01 | ST-01, ST-03, FLW-01 | draft | pending |
| SCN-012 | Customize an agent workplace | Extension | P-01 | ST-06, FLW-04 | draft | pending |
| SCN-011 | Connect an agent to Switchboard | Agents | P-01 | ST-02, FLW-01 | draft | pending |
| SCN-013 | Get started from the vision to a first agent | Onboarding | P-01 | ST-01, ST-06, FLW-05 | draft | pending |
| SCN-014 | Request an AI workplace for an organization | Commercial | P-02 | ST-07, FLW-06 | draft | pending |
| SCN-015 | Contribute a pull request | Contribution | P-01 | ST-08, FLW-05 | draft | pending |
| SCN-016 | See and download the current release | Downloads | P-01 | ST-02, FLW-01 | draft | pending |
| SCN-017 | Read how request data is handled | Trust | P-02 | ST-07, FLW-06 | draft | pending |
| SCN-018 | Check which coding agents Fabric works with | Fabric agents | P-01 | ST-04, FLW-03 | draft | pending |
| SCN-019 | Read the site in another language | Languages | P-01, P-02 | ST-01, ST-07, FLW-07 | draft | pending |
| SCN-020 | Read the vision and choose a door | Vision | P-01, P-02 | ST-01, ST-04, ST-07, FLW-03 | draft | pending |
| SCN-021 | See how it works, from entry to working agents | Journey | P-01, P-02 | ST-01, ST-04, ST-06, FLW-05 | draft | pending |
| SCN-022 | Let a coding agent ask and send the request | Commercial | P-02 | ST-07, FLW-06 | draft | pending |

## Personas

See [foundation](foundation.md).

## Scenarios

### SCN-001: Discover the toolkit
- **Persona:** P-01
- **Feature:** Discovery
- **Traces:** ST-01, FLW-01
- **Entry point:** /
- **Preconditions:** none
- **Steps:**
  1. Read the teams headline → the agent workplace and independent tools are explained in text above the fold; directly under the hero the home video (#video, SCN-021) explains what it is, who it is for and how it works in about ninety seconds when asked; How it works (#how, SCN-021) shows the six steps from entry to an organization with their state; the product directory names six useful entry points, their availability and the journey step each one serves.
  2. Follow the primary For you, free → /start/ (SCN-013); the secondary For your organization → /business/ (SCN-014).
  3. Follow Get the tools in the header → the available-tools section (#products) on the homepage opens; each tool's page carries its own download (SCN-002).
- **Expected result:** Product roles and available downloads are clear.
- **Alt paths:** returning visitors can open the product or download anchor directly; keyboard and narrow screens expose the same actions.
- **UI elements:** Navigation (one row at phone width, scrolling sideways when longer than the screen, SITE-039), the home video, work cycle, product directory, For you, free, For your organization, Get the tools
- **States covered:** success, error; static content has no application loading or empty state.
- **Errors & recovery:** Missing network: browser error; reload.
- **Status:** draft
- **Coverage:** index.html; browser evidence recorded in HANDOFF.
- **Product:** unobserved

### SCN-007: Understand the work cycle and Fabric
- **Persona:** P-01
- **Feature:** Direction
- **Traces:** ST-04, FLW-03
- **Entry point:** / (the tools, #products; the old /#toolkit address lands in #why) or /fabric/
- **Preconditions:** none
- **Steps:**
  1. Read the work cycle → account setup uses Switchboard, compatible local services appear in Dashboards, and the wider Fabric coordination loop remains in development.
  2. Read the build pipeline → releases, previews and in-development work are distinct, with no promised release date.
  3. Follow Explore Fabric → its own page leads with what Fabric does today: the home for your projects and their agents, its first screen's four actions (create an agent, adapt one built elsewhere, open a project, create one), the actual window on synthetic demo data, the Create and Adapt screens and the coding agent's console after each (sample-data mockups; the console text a written example), and the early-preview label. "CEO" appears once, as the direction (D-T5, 2026-10-10).
  4. Read Get Fabric → the requirements (Apple silicon, Docker, Supabase CLI) and the preview's limits sit beside the macOS download → the download redirects to the public release asset.
- **Expected result:** Reader understands what the preview does today and what it needs before downloading (one universal DMG for Apple silicon and Intel since 0.3.4), without assuming a shipped integrated platform, a coordinating "CEO" that already works or a Fabric that replies.
- **Alt paths:** direct product URL; narrow-screen or keyboard navigation; return to available Switchboard.
- **UI elements:** Work cycle, build pipeline, Explore Fabric, Follow the build, Download for macOS, release notes and checksum, Switchboard link
- **States covered:** static populated content; network error.
- **Errors & recovery:** Missing network: browser error and reload. The download route answers only for macOS; any other platform path falls through to the 404. Missing Docker or Supabase CLI is named by Fabric on its first start, not by the site.
- **Status:** draft
- **Coverage:** index.html and fabric/index.html; verification pending this iteration.
- **Product:** unobserved

### SCN-008: Follow the builder
- **Persona:** P-01
- **Feature:** About
- **Traces:** ST-05, FLW-03
- **Entry point:** /#about
- **Preconditions:** none
- **Steps:**
  1. Follow About in navigation or footer → "How we got here" (since 2026-10-11, operator decision; facts.md rows *founders*, *Nicegram installs*, *Ultimate Guitar scale*): the founders' story in the first person by Sergey Sheleg, a story and not a CV, with no links to publications or sources. Who the two co-founders are (Sergey Sheleg: co-founder and CPO of Nicegram, more than 57 million installs, and co-founder of eSIM Plus, earlier Android and growth product at Ultimate Guitar; Serge Khurs: co-founder and CTO of Teslasuit, adviser to large digital companies in AI and backend systems) → they built it for themselves while setting up their own workplaces for agents → it became a setup for an AI-native agent team, packaged as software, that runs their own work today → open source because it helps anyone who works with agents → the problem they keep seeing (part of a task goes to a chat, the result back to a person, the process stays the same) → for organizations: connected to their systems, custom agents that run their processes, with "Tell us about your processes" → /business/#request; the license line; the signature "Sergey Sheleg · co-founder, PassionCode".
  2. Follow Follow on X → the public profile linked by the operator’s authenticated GitHub account opens.
- **Expected result:** A visitor knows who builds PassionCode and why, and can either follow Sergey without signing up or, for an organization, go to the request.
- **Alt paths:** footer X link; Fabric Follow the build reaches the same About section; /business/ #founders (the short version) links back here; "Tell us about your processes" opens /business/#request (SCN-014).
- **UI elements:** About, "How we got here", the story, Tell us about your processes, Follow on X, signature
- **States covered:** static populated content; external network/login wall.
- **Errors & recovery:** X may require login; return to website or inspect public GitHub releases instead.
- **Status:** draft
- **Coverage:** index.html #about and shared footer; `scripts/check-site.mjs` pins the story's facts, the single external link and the two founders in JSON-LD; X identity verified from https://github.com/sshlg; WebKit check at 390 and 1280 px, en and ru, 2026-10-11 (docs/evidence/2026-10-11-founders/).
- **Product:** unobserved

### SCN-002: Download for macOS
- **Persona:** P-01
- **Feature:** Downloads
- **Traces:** ST-02, FLW-01
- **Entry point:** /switchboard/#download
- **Preconditions:** macOS visitor
- **Steps:**
  1. Read macOS architecture/version and the notarization note → the note states what the selected release's receipt proves (signed only, or notarized by Apple).
  2. Read Before you open it → the official CLI must be installed separately; macOS 14+; the app or `switchboard serve` keeps managed sessions.
  3. Follow Download for macOS → the pinned current public archive downloads from GitHub.
  4. Compare the archive with the SHA-256 shown under the downloads (when the release publishes SHA256SUMS).
- **Expected result:** A macOS universal ZIP is offered without claiming successful installation.
- **Alt paths:** returning visitors can open the product or download anchor directly; keyboard and narrow screens expose the same actions.
- **UI elements:** Download for macOS, Before you open it card, SHA-256 list, release notes/checksums, installation guide
- **States covered:** success, error; static content has no application loading or empty state.
- **Errors & recovery:** Failed download: retry or use All releases; platform policy warnings are explained in the notes.
- **Status:** draft
- **Coverage:** switchboard/index.html; worker/index.js; browser evidence recorded in HANDOFF.
- **Product:** unobserved

### SCN-003: Download for Windows
- **Persona:** P-01
- **Feature:** Downloads
- **Traces:** ST-02, FLW-01
- **Entry point:** /switchboard/#download
- **Preconditions:** Windows visitor
- **Steps:**
  1. Read Windows x64/WebView2 and unsigned/native-acceptance notes, repeated in Before you open it → requirements are visible.
  2. Follow Download for Windows → the pinned current public archive downloads from GitHub.
  3. Compare the archive with the SHA-256 shown under the downloads (`Get-FileHash`).
- **Expected result:** A Windows ZIP containing installer and CLI is offered.
- **Alt paths:** returning visitors can open the product or download anchor directly; keyboard and narrow screens expose the same actions.
- **UI elements:** Download for Windows, Before you open it card, SHA-256 list, release notes/checksums, installation guide
- **States covered:** success, error; static content has no application loading or empty state.
- **Errors & recovery:** Failed download: retry or use All releases. No Windows execution claim is made.
- **Status:** draft
- **Coverage:** switchboard/index.html; worker/index.js; browser evidence recorded in HANDOFF.
- **Product:** unobserved

### SCN-004: Inspect source and product boundaries
- **Persona:** P-01
- **Feature:** Trust
- **Traces:** ST-03, FLW-02
- **Entry point:** /switchboard/
- **Preconditions:** none
- **Steps:**
  1. Expand FAQ → managed/isolated and Fabric differences are explained.
  2. Follow View source → the public repository opens; the FAQ says Switchboard is open source under the GNU AGPL-3.0, names the commercial-license contact, that releases up to and including v0.3.1-beta.1 remain MIT, and the license of the current download (0.4.0-beta.1 was released under PolyForm; the selected 0.4.1-beta.1 release is the first under the AGPL).
  3. Read Part of the PassionCode toolkit → Observatory, Fabric Dashboards and Fabric links explain what the other tools do; the hero's IN THE TOOLKIT line (since 2026-10-10, was IN THE FAMILY) names Switchboard's one role and links All the tools.
- **Expected result:** Reader can inspect source without GitHub authentication.
- **Alt paths:** returning visitors can open the product or download anchor directly; keyboard and narrow screens expose the same actions.
- **UI elements:** FAQ summaries, View source, Report an issue, toolkit links (Explore Observatory, Fabric Dashboards release, Meet Fabric, All the tools)
- **States covered:** success, error; static content has no application loading or empty state.
- **Errors & recovery:** GitHub unavailable: retry later; source access does not require site account.
- **Status:** draft
- **Coverage:** switchboard/index.html; browser evidence recorded in HANDOFF.
- **Product:** unobserved

### SCN-005: Read the shared design language
- **Persona:** P-01
- **Feature:** Design system
- **Traces:** ST-03, FLW-02
- **Entry point:** /design-system/
- **Preconditions:** none
- **Steps:**
  1. Read marks, palette, typography and controls → shared roles and migration scope are visible.
  2. Follow Get the CSS tokens → reusable token source opens.
- **Expected result:** Canonical CSS can be read without JavaScript.
- **Alt paths:** returning visitors can open the product or download anchor directly; keyboard and narrow screens expose the same actions.
- **UI elements:** Footer Design system link, Get the CSS tokens, source link
- **States covered:** success, error; static content has no application loading or empty state.
- **Errors & recovery:** Missing network: retry; content remains plain static HTML.
- **Status:** draft
- **Coverage:** design-system/index.html; design-system/tokens.css; browser evidence recorded in HANDOFF.
- **Product:** unobserved

### SCN-006: Discover and start Project Observatory
- **Persona:** P-01
- **Feature:** Observatory
- **Traces:** ST-01, ST-03, FLW-01
- **Entry point:** / (product card) or /observatory/
- **Preconditions:** a macOS or Linux visitor with Python 3.11+, or a Windows visitor with Python 3.13+
- **Steps:**
  1. Read the Observatory card on the homepage → it is listed as available now and open source, beside Switchboard, and distinct from Fabric in early preview.
  2. Follow Explore Observatory → the product page states purpose, release, platforms, language choice and the limits of known-value scanning.
  3. Follow Get started → install the 0.16.0 wheel checked against `SHA256SUMS` and its `[full]` extra under the release's `requirements-full.lock`, create a workspace, observe, then connect an agent with `claude mcp add observatory …` and call `observatory_overview` (on Windows the step names Python 3.13+ and the guide's PowerShell steps); the notes under the steps offer the Mac app (Apple silicon and Intel) and, since 0.22.0, the Windows and Linux app (signed Windows installer, AppImage and .deb), each needing the engine installed first, and say which copies update themselves; that the release is under the AGPL like every release since 0.10.0, the first under the AGPL, and that earlier releases keep their license, is stated beside the steps.
- **Expected result:** The visitor knows what Observatory reads (only configured folders and sources), that it runs locally, and how to install it, without any claim of finding every secret.
- **Alt paths:** the source link goes straight to GitHub; the screenshot is labelled as a synthetic demo estate.
- **UI elements:** Observatory card, Explore Observatory, Get started, Installation guide, View source, FAQ
- **States covered:** success, error; static content has no application loading or empty state.
- **Errors & recovery:** Missing network: browser error; reload. Installation problems are covered by the repository's onboarding guide.
- **Status:** draft
- **Coverage:** index.html#observatory; observatory/index.html; scripts/check-site.mjs.
- **Product:** unobserved

### SCN-009: Understand and download Fabric Inbox
- **Persona:** P-01
- **Feature:** Inbox
- **Traces:** ST-01, ST-03, FLW-01
- **Entry point:** / (product card, build pipeline or source section) or /inbox/
- **Preconditions:** a Mac with macOS 12 or later, or Windows or Linux (x64 or arm64), a Cloudflare account and an API token for the download; none for reading
- **Steps:**
  1. Follow Explore Inbox → Fabric's mail tool, which also works on its own; the development-preview version, the three systems (macOS 12+, Windows, Linux) and AGPL-3.0 are in the first viewport.
  2. Read New in 0.15, the first section after the hero (since SITE-033, 2026-10-11) → the agent console (Claude Code or Codex beside the mail, a key per session revoked when it ends; works from 0.15.1, not in the Mac App Store version), setup by the coding agent (no address or secret to copy; the welcome offers Use the server your agent set up) and mail the server could not take, listed in the domain's settings; How an agent connects jumps to For agents. Then See what it does → important-first triage, the domains of your Cloudflare account and agents within a reply policy.
  3. Follow Download for macOS → `/inbox/download/macos` redirects to the release DMG; compare it with the SHA-256 on the page; a note under the card says a Mac copy older than 0.15.2 cannot update itself and takes 0.15.2 once by hand (since SITE-033); Before you open it names the Cloudflare account, token and Gmail OAuth client, and Use the server your agent set up for a server the coding agent made. On Windows or Linux, the «Windows and Linux» card (since SITE-030, 2026-10-11) says what the release ships — a Windows installer for x64 and arm64 with no administrator rights, Authenticode-signed since 0.14.1, and a Linux AppImage and .deb — which copies update themselves (not a .deb copy) and that Linux needs a Secret Service, then Windows and Linux downloads opens the latest release page.
  4. Read For agents → give the coding agent the sentence Settings → Agent access shows first (it creates the server and connects once the visitor chooses Allow; the setup guide for agents is linked), or make a key by hand on the same screen and connect it with the printed `claude mcp add --transport http …/mcp` command, call `list_accounts`.
- **Expected result:** The visitor knows what works in the preview (Cloudflare and Gmail), what is not yet verified (a real model call, Gmail on a real account), what is planned (IMAP, Outlook), where the signed build and its checksum are, how an agent connects (by itself after Allow, or with a key made by hand), and what 0.15 added (the agent console, agent-run setup, mail the server could not take) with its limits.
- **Alt paths:** Direct /inbox/#download or legacy /inbox/#status entry; source link to the public repository; primary navigation and keyboard expose the same paths.
- **UI elements:** Inbox navigation, product card, Download Inbox, Download for macOS, New in 0.15 (How an agent connects), checksum, release notes, agent steps (three), setup guide for agents, toolkit and Fabric links, FAQ.
- **States covered:** success, error; static content has no loading or application empty state.
- **Errors & recovery:** Missing network or GitHub unavailable: browser error; retry or use All releases. A different checksum: download again.
- **Status:** draft
- **Coverage:** inbox/index.html; inbox/release.json; worker/index.js; index.html#inbox; scripts/check-site.mjs; scripts/check-worker.mjs.
- **Product:** unobserved

### SCN-010: Find Fabric Dashboards and its release
- **Persona:** P-01
- **Feature:** Dashboards
- **Traces:** ST-01, ST-02, ST-03, FLW-01
- **Entry point:** /#products or /dashboards/
- **Preconditions:** none; macOS 13+ to install the app
- **Steps:**
  1. Choose Fabric Dashboards in the directory → its own page explains local services and independent use.
  2. Read download requirements → 0.3.1 universal DMG, signed/notarized, macOS 13+, separately installed compatible services and empty-list behavior are named.
  3. Follow Download Fabric Dashboards → the current release's DMG (macOS); inspect checksum and release notes. On Windows or Linux (since 0.7.1): the "Windows and Linux" card → the release page with the signed Windows installers and the Linux AppImage and .deb; the card says that since 0.7.4 the Windows app and the AppImage update themselves and a copy installed from the .deb takes the next .deb (it said updates there were installed by hand until SITE-033, 2026-10-11).
  4. Read For your agents → MCP registration command and list_services proving call; follow Observatory or Adapter to add a service.
- **Expected result:** Reader can obtain the app without assuming it installs services or requires Fabric.
- **Alt paths:** direct release link, keyboard, mobile; source and installation guide.
- **UI elements:** directory card, download, requirements, checksum, MCP setup, FAQ
- **States covered:** static populated page; network error; documented empty installed-service list.
- **Errors & recovery:** Failed GitHub download: retry from linked release page. Unsupported OS: inspect source, no binary claim.
- **Status:** draft
- **Coverage:** dashboards/index.html; scripts/check-site.mjs; browser receipt in the workplace task.
- **Product:** unobserved

### SCN-011: Connect an agent to Switchboard
- **Persona:** P-01
- **Feature:** Agents
- **Traces:** ST-02, FLW-01
- **Entry point:** /switchboard/#agents
- **Preconditions:** the selected release is 0.4.0-beta.1 or later (before that the section is not rendered); the `switchboard` CLI reachable in the agent's shell
- **Steps:**
  1. Read The problem → limits running out mid-task is the job; rotation within a pool keeps the session open.
  2. Read For agents → an agent can read remaining usage and switch its next request through `switchboard mcp`; no tool handles credentials; a global Claude Code login change needs `global`.
  3. Read the optional project rules → none by default, visible, pausable, expiring, never stop rotation.
  4. Copy a connect command (`claude mcp add …` or `codex mcp add …`), or launch the session from Switchboard; once the launcher lists Switchboard, the PassionCode plugin line appears as a third route.
- **Expected result:** The visitor knows what an agent may do, what it may not, and one exact way to connect it.
- **Alt paths:** returning visitors open /switchboard/#agents directly; keyboard and narrow screens expose the same text; commands wrap instead of overflowing.
- **UI elements:** The problem statement, For agents feature grid, connect steps
- **States covered:** success; hidden state (release < 0.4.0-beta.1: no section, no claim); static content has no loading state.
- **Errors & recovery:** the tools do not appear in the agent: follow the operations guide (CLI on PATH, relaunch a session started without it).
- **Status:** draft
- **Coverage:** switchboard/index.html (release regions); scripts/switchboard-release.mjs; scripts/switchboard-release.test.mjs.
- **Product:** unobserved

### SCN-012: Customize an agent workplace
- **Persona:** P-01
- **Feature:** Extension
- **Traces:** ST-06, FLW-04
- **Entry point:** /#extend
- **Preconditions:** none; Node.js 18+ to run the launcher
- **Steps:**
  1. Follow For builders → launcher command, requirements and update controls are visible.
  2. Read the Adapter card → choose the public quick start and contract to build a compatible service.
  3. Read VR and Okolos → utility, source links and absence of a published release are explicit.
- **Expected result:** Visitor can adapt their setup without assuming the launcher installs desktop apps or all tools are one finished platform.
- **Alt paths:** direct public repository links; keyboard; narrow viewport.
- **UI elements:** launcher command, setup guide, Adapter guide, contract, source-build entries
- **States covered:** static populated content; external network failure.
- **Errors & recovery:** Public repository unavailable: retry; no account is required to read the site.
- **Status:** draft
- **Coverage:** index.html; scripts/check-site.mjs; browser receipt in the workplace task.
- **Product:** unobserved

### SCN-018: Check which coding agents Fabric works with
- **Persona:** P-01
- **Feature:** Fabric agents
- **Traces:** ST-04, FLW-03
- **Entry point:** /fabric/agents/, the link in Fabric's "Before you open it" card, or a search or answer engine quoting the page
- **Preconditions:** none
- **Steps:**
  1. Read the first viewport → the as-of date (5 October 2026) and a direct answer: Claude Code connected in the released app, Kilo Code and Hermes Agent connected in development, Codex runs in Fabric, Cline first among the planned agents, Switchboard covers Claude Code and Codex accounts.
  2. Read What "works with" means → three levels: connected (Fabric's tools for one session through a one-session credential, nothing written into the agent's settings), runs in Fabric, planned.
  3. Find their agent in exactly one level table, with its official site linked.
  4. Read how the planned agents connect (ACP), why these agents (OpenRouter's ranking, linked and dated) and the account-switching boundary → Download for macOS goes to Fabric's download section; Explore Switchboard goes to Switchboard.
- **Expected result:** The visitor knows whether their agent gets Fabric's tools today, runs without them, or is planned, without reading a plan as a release.
- **Alt paths:** a desktop app or editor user reads the local-hub route and learns its entry is planned, not documented; narrow screens and keyboard expose the same tables, and long site names wrap.
- **UI elements:** as-of caption, answer paragraph, level cards, four tables (connected, runs in Fabric, planned, desktop apps and editors), ACP and OpenRouter links, Download for macOS, Explore Switchboard
- **States covered:** static populated content; external network failure on an official site.
- **Errors & recovery:** an official site is unavailable: the agent's name and level remain on the page; retry later. A stale page is prevented by the dated caption and the facts row's review date (SITE-018).
- **Status:** draft
- **Coverage:** fabric/agents/index.html; fabric/index.html (link); scripts/check-site.mjs (each agent at one level, date, sources, no percentages).
- **Product:** unobserved

## Display-copy refinement, 2026-10-01

SCN-001, SCN-005, SCN-006, SCN-007, SCN-009 and SCN-010 retain their paths and
actions. Their hero/section headings and compact captions use no terminal full
stops; hero introductions state the existing utility in one sentence. Review at
1280, 390 and 320 px with the existing browser gate; this is presentation evidence,
not a new product capability. See [the scoped task](../tasks/2026-10-01-display-copy.md).

The 2026-10-01 regression gate now checks source display roles in
`scripts/check_display_copy.py`; projection tests retain heading semantics for
brand-lint. The typography specimen follows the same policy. This supplements,
rather than replaces, the browser review recorded above.

### SCN-013: Get started from the vision to a first agent
- **Persona:** P-01
- **Feature:** Onboarding
- **Traces:** ST-01, ST-06, FLW-05
- **Entry point:** / (hero → For you, free) or /start/
- **Preconditions:** Node.js 18+ and Claude Code or Codex; Fabric needs macOS on Apple silicon, Docker and the Supabase CLI
- **Steps:**
  1. Read the hero, then Why (#why) → the problem in the visitor's own words (an agent works for a week, then runs on the wrong account, forgets, nobody knows what it changed, the next one starts from zero) and the three proofs (local and open source; the agents and subscription you already have; a record you can open); then How it works (#how, SCN-021).
  2. Read Two ways in (#start) → For you (free, about twenty minutes) or For organizations; the tools (#products) each show their status and current version, previews marked as unfinished.
  3. Follow For you, free or Get started → /start/ → One command (#setup, since 2026-10-13): copy `npx @passioncode-ai/passioncode@latest setup` (a new computer: installs the chosen tools from verified releases, their MCP servers for Claude Code, Codex, Gemini CLI and Kimi Code, and the skills; an existing one: checks, repairs, shows what changed; `doctor` checks only), or copy the setup prompt (#setup-prompt) into the coding agent, which runs it and lists what only the visitor can do. Fabric is named as an early preview needing Docker and the Supabase CLI. Or the manual path: copy the launcher command (it installs the skills, not Fabric); download Fabric separately (preview; current version and SHA-256 beside the button; its first screen's four actions named); ask the coding agent to create or adapt an agent; install Fabric Dashboards and connect it over MCP.
  4. Step 5 → build the next agent the same way and give it the same Fabric project; see both in Dashboards. The task-pipeline recommendation follows, marked as a separate open-source project.
  5. Russian (/ru/start/) says «навыки (skills)» at first use, then «навыки» (D-T6).
- **Expected result:** The visitor has the tools, MCP servers and skills set up by one command (or the skills by the manual path), knows the same command checks and repairs later, knows the exact prompt that creates or adapts an agent and how the second agent joins the same project, without believing `update` installs Fabric, that setup skips verification, that Fabric already replies or that a chain of agents has shipped.
- **Alt paths:** stop after any step; jump with the on-page table of contents; copy buttons or manual selection without JavaScript.
- **UI elements:** hero actions, why list, two door cards, tool cards, /start/ steps, copy buttons, download buttons
- **States covered:** success; no-JS (complete page, no copy buttons); reduced motion (static map).
- **Errors & recovery:** the command fails → the launcher README (linked); setup lists every remaining problem with its fix and exits 1; download unavailable → release notes link.
- **Status:** draft
- **Coverage:** index.html (#why, #how, #start, #products; #path, #vision and #toolkit kept as legacy anchors), start/index.html (#setup, #setup-prompt, #family, #pipeline); scripts/check-site.mjs ("the one command comes before the manual steps").
- **Product:** unobserved

### SCN-014: Request an AI workplace for an organization
- **Persona:** P-02
- **Feature:** Commercial
- **Traces:** ST-07, FLW-06
- **Entry point:** /business/ (from the header "For organizations", the homepage hero "For your organization", the home door card, the /vision/ closing, footer, /start/ closing, license notes)
- **Preconditions:** none
- **Steps:**
  1. Read the hero → make the organization AI-native, agents connected with what each one cost and what it delivered shown, data on its own machines or cloud; the four-step funnel (tell us, estimate, pilot, rollout); designed for 1 to 1000 people.
  2. Read Who we are (#founders, since 2026-10-11) → the two co-founders run teams, built the setup for themselves, it runs their work today, and they bring it to the organization; "How we got here" → /#about (SCN-008). Unnumbered, so the page still answers its one question.
  3. Read PassionCode for Enterprise (#enterprise) → in development and offered on request; what we set up: machines onboarded, agents rolled out, routing between machines, model access through each machine's local agent (keys stay on it), activity and usage analytics, administration, custom builds signed by PassionCode.ai.
  4. Read For finance and engineering (#spend, since 2026-10-11, [narrative-org.md](../brand/narrative-org.md)) → finance and engineering named once by role (the CFO and the CTO or CIO, ON-2); the one question (what did each agent cost, and what did it deliver?: the ROI of each agent, ON-1) in three labelled stages: does the work run through agents (AVAILABLE NOW: the estimate), which agents are worth what they cost (AVAILABLE NOW: Fabric Dashboards Spend, Switchboard usage limits, Observatory), which setups work best and how they reach the rest (DIRECTION, including limits finance sets once as a record agents check, ON-6); each stage links on (#estimate, /dashboards/, #request); the note says it is about agents and workflows, never a ranking of people (ON-5).
  5. Read the estimate (03 / THE ESTIMATE) → the formula, the share table and a worked example.
  6. Reach 04 / REQUEST → two ways side by side, the agent first (SCN-022); the short form: one free-text field ("What should agents do for your organization?"), the work email, and an optional main goal (seven answers, the first "See what our agents cost and deliver"); a line under it says the answers are kept only to reply, linking /privacy/.
  7. Send → the request is stored before anything else, the commercial mailbox is notified, the sender gets a receipt; the page shows the reference.
- **Expected result:** A validated request (schema `lead/2`, channel `form`) reaches PassionCode.ai, and the visitor knows when to expect a reply. Everything else (size, tools, budget, timing) is asked in the reply, not in the form.
- **Design rationale (2026-10-11, operator ON-3: "bring every form down to the minimum"):** the reply needs only an address to answer and what to answer about, so email and the free text are the two required fields. The goal is optional and one choice: it routes the request (the cost-and-results goal is the finance signal) without adding a decision the visitor must make. The consent checkbox is gone: answering a request is a step the visitor asks for (GDPR Art. 6(1)(b), /privacy/), so a notice line replaces it; the product-news checkbox is gone with it. The former five-step form (company, industry, size, processes, hours and cost with a live estimate, setup, hosting, budgets, name, role, phone, Telegram) is retired; the Worker still accepts it as `lead/1` from pages already open in a browser.
- **Alt paths:** without JavaScript the form posts to /api/leads and lands on /business/thanks/; a reload keeps the unsent text in the browser; email commercial@passioncode.ai instead; let a coding agent ask (SCN-022).
- **UI elements:** hero funnel, Enterprise list, the finance-and-engineering stages (three labelled cards with links), formula card, the two request paths (agent prompt with Copy, short form with three fields), status line, three FAQs (cost, commercial license, "Is this a way to watch people?")
- **States covered:** empty, partial (draft kept in the browser), invalid (the field named), too fast or expired form (refused with a reason), rate-limited, sending, success (reference shown), duplicate resend (same reference), network failure (text kept), service not configured (503 naming the email).
- **Errors & recovery:** every refusal names the field or the reason; the email address is offered whenever the form cannot take the request.
- **Status:** draft
- **Coverage:** business/index.html, assets/business.js, assets/lead-options.js, worker/leads.js (`buildShortLead`); scripts/check-worker.mjs (short form, legacy `lead/1`, refusals, delivery, retries), scripts/check-site.mjs (form ↔ options parity, three fields only).
- **Product:** unobserved

### SCN-015: Contribute a pull request
- **Persona:** P-01
- **Feature:** Contribution
- **Traces:** ST-08, FLW-05
- **Entry point:** /start/#contribute (from the homepage paths)
- **Preconditions:** a GitHub account
- **Steps:**
  1. Pick a public repository from the list.
  2. Read its AGENTS.md and the organization CONTRIBUTING.md; run the test command.
  3. Open the pull request → opening it is the CLA agreement.
- **Expected result:** The contributor knows the gate and the route, and that internal repositories exist only for collaborators.
- **Alt paths:** follow the builder on X to join the team.
- **UI elements:** contribute steps, repository list
- **States covered:** success; static.
- **Errors & recovery:** none on the site.
- **Status:** draft
- **Coverage:** start/index.html#contribute.
- **Product:** unobserved

### SCN-016: See and download the current release
- **Persona:** P-01
- **Feature:** Downloads
- **Traces:** ST-02, FLW-01
- **Entry point:** any page naming a version; /<product>/download/<platform>; /api/releases
- **Preconditions:** none
- **Steps:**
  1. Read a version → the edge has written the newest eligible release into the page (text, checksum, JSON-LD).
  2. Download → 302 to that release's asset on GitHub.
- **Expected result:** The version shown, its checksum and the file downloaded are the same release, the newest one that carries every required asset with a SHA-256 digest.
- **Alt paths:** /api/releases for agents; release notes link.
- **UI elements:** `data-live` values, download buttons
- **States covered:** current; GitHub unreachable (last good snapshot, never below the build's); a release withdrawn on GitHub (the site follows it back down).
- **Errors & recovery:** none for the visitor.
- **Status:** draft
- **Coverage:** worker/releases.js, worker/live.js, worker/index.js; scripts/releases.test.mjs, scripts/check-worker.mjs; `npm run releases:check`.
- **Product:** unobserved

### SCN-017: Read how request data is handled
- **Persona:** P-02
- **Feature:** Trust
- **Traces:** ST-07, FLW-06
- **Entry point:** /privacy/ (from the consent line, the form FAQ and the footer)
- **Preconditions:** none
- **Steps:**
  1. Read what is collected (the form: the text, the work email, an optional goal; through a coding agent also the organization size, the tools, the timing and the agent's name), why (Art. 6(1)(b): answering the request the person asked for, so no consent box), where it is stored, for how long and how to have it erased.
- **Expected result:** The lead knows what happens to the request before sending it; nothing is collected outside the request.
- **Alt paths:** none.
- **UI elements:** legal page
- **States covered:** static.
- **Errors & recovery:** none.
- **Status:** draft
- **Coverage:** privacy/index.html; scripts/check-site.mjs.
- **Product:** unobserved

### SCN-019: Read the site in another language
- **Persona:** P-01, P-02
- **Feature:** Languages
- **Traces:** ST-01, ST-07, FLW-07
- **Entry point:** any page; a search result or link to /ru/…; the header's language switch
- **Preconditions:** none (no cookie, no browser-language redirect: the address decides the language)
- **Steps:**
  1. Open a page → the header shows the switch to the other language (Русский on an English page, English on a Russian one; a menu of every language once there are three or more).
  2. Choose a language → the same page in that language, at the same path under its prefix (/start/ ↔ /ru/start/), same sections, same versions and downloads.
  3. On /ru/business/ fill and send the form → the Worker records the request's language, answers refusals and validation in Russian, sends the receipt email in Russian with links to /ru/ pages; the commercial mailbox is told to reply in Russian.
- **Expected result:** Every page reads in the chosen language with the same facts and limitations as English; links stay in that language; a search engine sees each version with reciprocal hreflang, x-default English, and every version in the sitemap.
- **Alt paths:** an unknown address under /ru/ shows the Russian not-found page (404); the not-found page's switch leads to the other language's home page.
- **UI elements:** language switch (`.lang-switch` link or `.lang-menu` disclosure), translated pages, the form's script messages
- **States covered:** two languages (link), three or more (menu, no JavaScript needed); a refused or offline form submission in Russian.
- **Errors & recovery:** a refused request shows its reason in the form's language and keeps the answers in the browser.
- **Status:** draft
- **Coverage:** scripts/locales.mjs, scripts/build-locale.mjs, worker/index.js, worker/leads.js; scripts/locales.test.mjs, scripts/check-worker.mjs, scripts/check-site.mjs; docs/DEPLOYMENT.md#languages.
- **Product:** unobserved

### SCN-020: Read the vision and choose a door
- **Persona:** P-01, P-02
- **Feature:** Vision
- **Traces:** ST-01, ST-04, ST-07, FLW-03
- **Entry point:** the header "Vision", the footer, the home page's Why note, /business/ "Read the vision", a search result for /vision/
- **Preconditions:** none
- **Steps:**
  1. Read What holds an agent (#harness) → why agents fall apart (one linked McKinsey figure), the one place on the site that names and defines "harness" (Anthropic and OpenAI use the word, linked; D-T1), and which tool is which of its four parts (a home; accounts; state and control; memory and evidence).
  2. Read the four principles → projects are the axis; the work improves itself (Observatory keeps the evidence today, retrospectives are the direction); vendor-neutral, local first, open source; analytics, never surveillance. The task-pipeline note links to /start/#pipeline.
  3. Read the path → six stages, each labelled available now, available now in part, or direction; stages 1, 2 and 6 link to the matching step of How it works on the home page (/#how).
  4. Choose a door → For you, free (/start/) or For your organization (/business/).
- **Expected result:** The visitor can say what PassionCode.ai is for (what keeps agents working, on top of the coding agents they already use), which parts work today, and where to go next, without reading any stage as a shipped promise.
- **Alt paths:** the on-page table of contents; the recommended task-pipeline skill (external, marked as not part of PassionCode.ai); /ru/vision/.
- **UI elements:** hero, page TOC, harness cycle, principles list, task-pipeline note, path cycle, FAQ, closing doors (with PassionCode for Enterprise named)
- **States covered:** success; no-JS (complete page); reduced motion; 390 px (one column).
- **Errors & recovery:** an external source moved → the dated citation still names the publisher and date.
- **Status:** draft
- **Coverage:** vision/index.html, i18n/ru/vision.json; scripts/check-site.mjs (/vision/ block).
- **Product:** unobserved

### SCN-021: See how it works, from entry to working agents
- **Persona:** P-01, P-02
- **Feature:** Journey
- **Traces:** ST-01, ST-04, ST-06, FLW-05
- **Entry point:** /#video (the home video, directly under the hero since SITE-039, 2026-10-12) and /#how (after Why on the home page); /vision/ path stages 1, 2 and 6; the legacy /#how address
- **Preconditions:** none
- **Steps:**
  1. Scroll past Why → How it works (#how): six numbered steps from [narrative §3](../brand/narrative.md#3-the-journey-six-steps), each with its state label (AVAILABLE NOW, PREVIEW, AVAILABLE NOW, IN PART or DIRECTION), one picture and a one-line caption.
  2. Read step 01 Enter → the launcher command as a text card; the caption says the command installs the skills into Claude Code or Codex and that Fabric is a separate preview download (no promise that one command opens Fabric).
  3. Read steps 02 Onboard and 03 First agent → sample-data mockups rendered from Fabric's own interface (SITE-028 W5, 2026-10-11; [capture record](../evidence/2026-10-11-mockups/README.md)): step 02 shows the first run's third step with the four actions in two pairs; step 03 shows the coding agent's console asking the skill's intake questions, marked in its alt text as a written example, not a recording. Each picture carries a visible «Sample data» / «Пример данных» chip; the Russian pages show the Russian interface (`-ru.jpg`), the other languages the English one. The prompt cards stay under each picture.
  4. Read steps 04 Grow and 05 Work together and watch → the synthetic Fabric Dashboards overview and the synthetic Fabric board, each captioned as demo data; step 05 says which parts are preview (Fabric's board) and which are available (Observatory).
  5. Read step 06 Organization → marked DIRECTION; its link leads to /business/ (SCN-014).
  6. The home video (SITE-028 W10, 2026-10-11; v2 since 2026-10-14, SITE-043, [record](../video/2026-10-12-home-v2/README.md)), directly under the hero since SITE-039 (operator 2026-10-12: near the top; it ended How it works before), so a visitor meets it before scrolling to the steps; its caption line says "PassionCode.ai in a minute and a half: what it is, who it is for and how it works" → a poster frame of the promise; pressing play runs, in about ninety seconds, the problem, the promise, the values, the one command, Fabric, the coding agent's plan, the four tools, agents sharing one project, the organization offer and the vision, with an AI narrator over a music bed and captions on by default. The video shows the same sample-data mockups, labels each beat AVAILABLE NOW, PREVIEW or DIRECTION, marks the console as a written example and never shows Fabric replying. Russian pages play the Russian cut (Russian narration, Russian interface); the other eight languages play the English cut, each with captions in its own language, labelled in that language (German, Spanish and French since W10; Polish, Korean, Portuguese, Chinese and Japanese since 2026-10-12, SITE-035).
- **Expected result:** The visitor can name the order of the work and what each step uses, and can tell available from preview from direction at every step, without seeing a placeholder, an empty video player or a Fabric that replies; the video claims nothing the home page does not say (the steps, the three proofs, the organization card and the /vision/ line), and starts only when asked.
- **Alt paths:** the video never autoplays, so reduced motion needs no other branch: the poster is still and nothing moves until the visitor presses play; it loads nothing but its poster before play (`preload="none"`), and its 16:9 box is reserved so the page does not shift; captions can be turned off in the player; a browser without WebM plays the MP4; without JavaScript the native player still works; without JavaScript every step, picture and label is present; at 390 px the steps stack in one column and images keep their aspect ratio; reduced motion shows them without the reveal.
- **UI elements:** section heading, six step cards (number, state label, title, image or text card, caption), the launcher command card, the four-action card, the two prompt cards, four figures with alt text (two of them sample-data mockups with a visible chip), the For your organization link, the video (native controls, poster, captions track, a caption line saying it shows sample data and a written example)
- **States covered:** static populated; images lazy-loaded (dimensions reserved, no layout shift); image failed to load (alt text describes the screen); video: poster before play, playing with captions, paused, ended (the poster's box stays), failed to load (the caption line still says what it shows; the steps carry the same content).
- **Errors & recovery:** an image fails → its alt text and caption still say what it shows and that it is synthetic; nothing on the step depends on the image.
- **Status:** draft
- **Coverage:** index.html#video and #how; styles.css (journey block, `.home-video`); scripts/check-site.mjs (six labelled steps, the video directly under the hero and not in #how, its controls, no autoplay or loop, preload none, poster, captions in every language and its 8 MB budget, only listed images; the mockups' size, 2x pixels, -ru twin, budget and sample-data alt); scripts/locales.mjs `localizedAsset` (pictures, the video's poster, cut and captions); scripts/locales.test.mjs (each language's cut and captions, `srclang`).
- **Product:** unobserved

### SCN-022: Let a coding agent ask and send the request
- **Persona:** P-02
- **Feature:** Commercial
- **Traces:** ST-07, FLW-06
- **Entry point:** /business/#request ("Or let your coding agent ask", shown ahead of the short form); /business/agent-request.txt (plain text, linked from llms.txt) for an agent that fetches it itself; each language's own copy at /<code>/business/agent-request.txt.
- **Preconditions:** the visitor runs a coding agent that can make HTTPS requests (Claude Code, Codex or another).
- **Steps:**
  1. Read the one-line explanation and the prompt in the page's language → the JSON keys, the values and the commands stay English.
  2. Press Copy → the whole prompt is on the clipboard and the button says Copied (without JavaScript or clipboard access the text stays selectable; the button says "Select and copy").
  3. Paste it into the agent → it asks one question at a time: organization size, the agents and tools in use, the main goal (the form's seven, including cost and results), timing, what agents should do, the work email; it looks at the local setup only after asking and hearing yes, and keeps code, secrets, keys, paths, customer data and the names of third parties out of the request.
  4. The agent takes a form token (GET /api/leads/token), checks the request with `?dry_run=1` (nothing stored or sent) and fixes what the answer's `issues` name, together with the person.
  5. The agent shows the final JSON and asks "Send this to PassionCode.ai?" → sends only after an explicit yes, once, with the same `id` and token.
  6. The agent reports the answer: 201 `received` or 200 `duplicate` with the reference; a receipt email follows in the conversation's language (`lang`).
- **Expected result:** A validated request (schema `lead/2`, channel `agent-prompt`, the agent's name as it gave it) reaches the commercial mailbox exactly like a form request, with no more trust: same rate limit, token, trap, size cap and receipt caps.
- **Alt paths:** the person declines → nothing is sent; the network fails before an answer → one retry with the same `id`, never a second request with a new one; the agent cannot reach the network → the person uses the short form (SCN-014).
- **UI elements:** the agent block (heading, one line, the prompt box, Copy button, the plain-text link), the agent's own conversation.
- **States covered:** copy works, copy refused (select manually), no JavaScript (selectable), dry run valid, dry run invalid (issues listed), too fast (wait and repeat once), rate-limited, duplicate, conflict (same id, other answers: start a new request), oversize (413), service not configured (503 naming the email).
- **Errors & recovery:** every refusal carries an English `error` code and a `message` in the request's language; the prompt tells the agent to show the message and never to resend silently.
- **Status:** draft
- **Coverage:** business/index.html (#agent-request), business/agent-request.txt and its language copies (written by `npm run locales`), assets/site.js (prompt copy), worker/index.js (`/api/leads/token`, `?dry_run=1`), worker/leads.js; scripts/check-worker.mjs (valid agent request, missing email, oversized body, duplicate key, rate limit, dry run, token), scripts/locales.test.mjs (the plain text equals the page's prompt).
- **Product:** unobserved
