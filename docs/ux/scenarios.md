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
| SCN-006 | Understand the work cycle and Fabric | Direction | P-01 | ST-04, FLW-03 | draft | pending |
| SCN-007 | Follow the builder | About | P-01 | ST-05, FLW-03 | draft | pending |

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
  2. Follow Download Switchboard → the product download section opens.
- **Expected result:** Product roles and available downloads are clear.
- **Alt paths:** returning visitors can open the product or download anchor directly; keyboard and narrow screens expose the same actions.
- **UI elements:** Navigation, work cycle, product features, Download Switchboard, Fabric detail link
- **States covered:** success, error; static content has no application loading or empty state.
- **Errors & recovery:** Missing network: browser error; reload.
- **Status:** draft
- **Coverage:** index.html; browser evidence recorded in HANDOFF.
- **Product:** unobserved

### SCN-006: Understand the work cycle and Fabric
- **Persona:** P-01
- **Feature:** Direction
- **Traces:** ST-04, FLW-03
- **Entry point:** /#toolkit or /fabric/
- **Preconditions:** none
- **Steps:**
  1. Read the work cycle → account setup is available through Switchboard; project coordination and review describe Fabric's direction.
  2. Read the build pipeline → available beta and in-development work are distinct, with no promised release date.
  3. Follow Explore Fabric → its own page explains project purpose, agents, authority and evidence with an in-development notice.
- **Expected result:** Reader understands the intended relationship without assuming a shipped integrated platform or downloadable Fabric.
- **Alt paths:** direct product URL; narrow-screen or keyboard navigation; return to available Switchboard.
- **UI elements:** Work cycle, build pipeline, Explore Fabric, Follow the build, Switchboard link
- **States covered:** static populated content; network error.
- **Errors & recovery:** Missing network: browser error and reload. No download button for unavailable Fabric.
- **Status:** draft
- **Coverage:** index.html and fabric/index.html; verification pending this iteration.
- **Product:** unobserved

### SCN-007: Follow the builder
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
  1. Read macOS architecture/version and notarization notes → requirements are visible.
  2. Follow Download for macOS → the pinned current public archive downloads from GitHub.
- **Expected result:** A macOS universal ZIP is offered without claiming successful installation.
- **Alt paths:** returning visitors can open the product or download anchor directly; keyboard and narrow screens expose the same actions.
- **UI elements:** Download for macOS, release notes/checksums, installation guide
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
  1. Read Windows x64/WebView2 and unsigned/native-acceptance notes → requirements are visible.
  2. Follow Download for Windows → the pinned current public archive downloads from GitHub.
- **Expected result:** A Windows ZIP containing installer and CLI is offered.
- **Alt paths:** returning visitors can open the product or download anchor directly; keyboard and narrow screens expose the same actions.
- **UI elements:** Download for Windows, release notes/checksums, installation guide
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
  2. Follow View source → public MIT repository opens.
- **Expected result:** Reader can inspect source without GitHub authentication.
- **Alt paths:** returning visitors can open the product or download anchor directly; keyboard and narrow screens expose the same actions.
- **UI elements:** FAQ summaries, View source, Report an issue
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
