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
| SCN-011 | Connect an agent to Switchboard | Agents | P-01 | ST-02, FLW-01 | draft | pending |

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
  1. Read the teams headline and work cycle → the umbrella, Switchboard beta and Fabric development state are distinguished.
  2. Follow the primary Explore the tools → the available-tools section on the homepage opens.
  3. Follow the secondary Download Switchboard → the product download section opens.
- **Expected result:** Product roles and available downloads are clear.
- **Alt paths:** returning visitors can open the product or download anchor directly; keyboard and narrow screens expose the same actions.
- **UI elements:** Navigation, work cycle, product features, Explore the tools, Download Switchboard, Fabric detail link
- **States covered:** success, error; static content has no application loading or empty state.
- **Errors & recovery:** Missing network: browser error; reload.
- **Status:** draft
- **Coverage:** index.html; browser evidence recorded in HANDOFF.
- **Product:** unobserved

### SCN-007: Understand the work cycle and Fabric
- **Persona:** P-01
- **Feature:** Direction
- **Traces:** ST-04, FLW-03
- **Entry point:** /#toolkit or /fabric/
- **Preconditions:** none
- **Steps:**
  1. Read the work cycle → account setup is available through Switchboard; project coordination and review describe Fabric's direction.
  2. Read the build pipeline → available beta and in-development work are distinct, with no promised release date.
  3. Follow Explore Fabric → its own page explains project purpose, agents, authority and evidence, shows the actual window on synthetic demo data, and labels the build an early preview.
  4. Read Get Fabric → the requirements (Apple silicon, Docker, Supabase CLI) and the preview's limits sit beside the macOS download → the download redirects to the public release asset.
- **Expected result:** Reader understands what the preview does today and what it needs before downloading, without assuming a shipped integrated platform, an Intel build or a Fabric that replies.
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
  1. Follow About in navigation or footer → a short builder introduction is visible.
  2. Follow Follow on Twitter → the public profile linked by the operator’s authenticated GitHub account opens.
- **Expected result:** A visitor can follow the author without signing up on PassionCode.
- **Alt paths:** footer social link; Fabric Follow the build reaches the same About section.
- **UI elements:** About, Follow on Twitter, public profile handle
- **States covered:** static populated content; external network/login wall.
- **Errors & recovery:** Twitter may require login; return to website or inspect public GitHub releases instead.
- **Status:** draft
- **Coverage:** index.html and shared footer; Twitter identity verified from https://github.com/sshlg; browser verification pending.
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
  2. Follow View source → the public repository opens; the FAQ says Switchboard is open source under the GNU AGPL-3.0, names the commercial-license contact, that releases up to and including v0.3.1-beta.1 remain MIT, and the license of the current download (0.4.0-beta.1 was released under PolyForm; the next release is the first under the AGPL).
  3. Read Part of the PassionCode toolkit → Observatory, Fabric Dashboards and Fabric links explain what the other tools do.
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
- **Preconditions:** a macOS or Linux visitor with Python 3.11+
- **Steps:**
  1. Read the Observatory card on the homepage → it is listed as available now and open source, beside Switchboard, and distinct from Fabric in early preview.
  2. Follow Explore Observatory → the product page states purpose, release, platforms, language choice and the limits of known-value scanning.
  3. Follow Get started → install the 0.10.0 wheel checked against `SHA256SUMS`, create a workspace, observe, then connect an agent with `claude mcp add observatory …` and call `observatory_status`; that the release is the first under the AGPL, and that earlier releases keep their license, is stated beside the steps.
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
- **Preconditions:** a Mac with macOS 12 or later, a Cloudflare account and an API token for the download; none for reading
- **Steps:**
  1. Follow Explore Inbox → Fabric's mail tool, which also works on its own; the development-preview version, macOS 12 or later and AGPL-3.0 are in the first viewport.
  2. Follow See what it does → important-first triage, the domains of your Cloudflare account and agents within a reply policy.
  3. Follow Download for macOS → `/inbox/download/macos` redirects to the release DMG; compare it with the SHA-256 on the page; Before you open it names the Cloudflare account, token and Gmail OAuth client.
  4. Read For agents → make a key in Settings → Agent access, connect with the printed `claude mcp add --transport http …/mcp` command, call `list_accounts`.
- **Expected result:** The visitor knows what works in the preview (Cloudflare and Gmail), what is not yet verified (a real model call, Gmail on a real account), what is planned (IMAP, Outlook), where the signed build and its checksum are, and how an agent connects.
- **Alt paths:** Direct /inbox/#download or legacy /inbox/#status entry; source link to the public repository; primary navigation and keyboard expose the same paths.
- **UI elements:** Inbox navigation, product card, Download Inbox, Download for macOS, checksum, release notes, agent steps, toolkit and Fabric links, FAQ.
- **States covered:** success, error; static content has no loading or application empty state.
- **Errors & recovery:** Missing network or GitHub unavailable: browser error; retry or use All releases. A different checksum: download again.
- **Status:** draft
- **Coverage:** inbox/index.html; inbox/release.json; worker/index.js; index.html#inbox; scripts/check-site.mjs; scripts/check-worker.mjs.
- **Product:** unobserved

### SCN-010: Find Fabric Dashboards and its release
- **Persona:** P-01
- **Feature:** Dashboards
- **Traces:** ST-01, ST-03, FLW-01
- **Entry point:** / (build pipeline or source section)
- **Preconditions:** a Mac with macOS 13 or later for the download; none for reading
- **Steps:**
  1. Read the build pipeline → Fabric Dashboards is available now, for local agent services that speak `fabric-service/0.1` such as Project Observatory's server, signed and notarized for macOS 13 or later.
  2. Follow Download Fabric Dashboards → the public GitHub release v0.3.1 opens with the DMG; agents drive the app over MCP.
  3. Or follow the Fabric Dashboards source card → the public repository, open source under AGPL-3.0, opens.
- **Expected result:** The visitor knows what Dashboards watches, where the signed build is and that the source is public under AGPL-3.0 (v0.1.0 was released under MIT, v0.2.0 and v0.3.0 under PolyForm; v0.3.1 is its first AGPL-3.0 release), without a dedicated product page.
- **Alt paths:** design-system page shows the Dashboards mark beside the other product marks.
- **UI elements:** build-pipeline row, Download Fabric Dashboards, source card, design-system mark.
- **States covered:** success, error; static content has no loading or application empty state.
- **Errors & recovery:** GitHub unavailable: retry later; the release page needs no account.
- **Status:** draft
- **Coverage:** index.html#pipeline; index.html#source; design-system/index.html; scripts/check-site.mjs.
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
