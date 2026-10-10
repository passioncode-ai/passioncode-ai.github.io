# Screens

**Web surfaces:** yes — public static pages; visible copy, canonical URLs and structured data are available without JavaScript.

Design system: [PassionCode](../../design-system/README.md), existing static HTML components. No new Figma file. Identity update with existing layout language; motion level 5 (foundation → Motion): entrances, one scrubbed rail, the hero map loop — never a dependency. Observable targets: primary CTA visible in first desktop viewport, OS requirements beside each download, no horizontal overflow on mobile, keyboard-visible links and summaries.

| ID | Screen | Scenarios |
|---|---|---|
| SCR-01 | Home | SCN-001, SCN-006, SCN-007, SCN-008, SCN-010 |
| SCR-02 | Switchboard | SCN-002, SCN-003, SCN-004, SCN-011 |
| SCR-03 | Design system | SCN-005, SCN-010 |
| SCR-04 | Observatory | SCN-006 |
| SCR-05 | Fabric | SCN-007, SCN-008 |
| SCR-06 | Fabric Inbox | SCN-009 |
| SCR-07 | Fabric Dashboards | SCN-010, SCN-016 |
| SCR-08 | Get started | SCN-013, SCN-015 |
| SCR-09 | For organizations (Enterprise) | SCN-014 |
| SCR-10 | Request received | SCN-014 |
| SCR-11 | Privacy notice | SCN-017 |
| SCR-12 | Fabric: supported coding agents | SCN-018 |
| SCR-13 | Vision | SCN-020 |

Every screen exists in every language of `i18n/locales.json` (Russian at `/ru/…`), generated from the English one with the same structure (docs/DEPLOYMENT.md#languages). The shared header carries the language switch beside its action: one text link to the same page in the other language with two languages, a `<details>` menu listing every language with three or more (SCN-019).

### SCR-01: Home
**Scenarios:** SCN-001, SCN-006, SCN-007, SCN-008, SCN-010, SCN-012, SCN-013, SCN-016. Reading order (2026-10-10, simplified: one question per section, about 700 words after the hero): hero (unchanged: canonical headline, narrative, two doors — For you, free → /start/ and For your organization → /business/; current versions, the workplace map) → Why (#why: without a harness agents rot; a local, open-source workspace on top of Claude Code, Codex and what comes next, on the subscription you already have; link to /vision/) → Two ways in (#start: For you and For organizations cards) → the tools (#products, one line, status and current version each; the preview note) → open source (#source, the license line and license-history region) → three FAQs → About (#about, the founder note). The removed sections keep their addresses as legacy anchors (#path, #vision, #toolkit, #shift, #how in #why; #companies in #start; #extend, #launcher in #products; #open-source, #foundation, #pipeline in #source). Header navigation since 2026-10-09: Vision · For you · For organizations · The tools · About (every page but Inbox). Footer: Get started, Vision, For organizations, the products, Privacy and the commercial address.
**Web surface:** public
**Route:** https://passioncode.ai/
**Answers:** What is PassionCode and which product can I use today?
**Indexable:** yes; canonical URL and sitemap.
**Without JS:** complete copy, product links and download CTA.
**Entity:** PassionCode.ai organization/toolkit, linked to Switchboard and Fabric.

### SCR-02: Switchboard
**Scenarios:** SCN-002/003/004/011. Reading order: hero → Get Switchboard (macOS and Windows cards, a full-width Before you open it card with CLI/OS/Windows requirements, SHA-256 list, release links, beta note) → The problem (limits run out; rotation keeps the session open) → synthetic screenshot → features → For agents (only for a selected release ≥ 0.4.0-beta.1: `switchboard mcp`, project rules, connect commands, the plugin line once the launcher lists it) → first session → FAQ → Part of the PassionCode toolkit → closing.
**Release-bound parts:** only `data-release-*` elements, the `<!-- release:NAME -->` regions (`macos-note`, `checksums`, `license-current`, `agents`) and the JSON-LD `softwareVersion`/`license` change with `switchboard/release.json`; `scripts/switchboard-release.mjs` renders them, `npm run check` asserts the page equals the render and that the MIT-history sentence still names v0.3.1-beta.1.
**Web surface:** public
**Route:** https://passioncode.ai/switchboard/
**Answers:** What does Switchboard do and where can I download it?
**Indexable:** yes; canonical product URL, SoftwareApplication data and sitemap. Redirect endpoints noindex.
**Without JS:** requirements, checksums, beta limits, download/source links, agent connect commands and native details/summary FAQ. Checksums and commands wrap at 390 px.
**Entity:** Fabric Switchboard, open-source (AGPL-3.0) desktop account workbench from PassionCode.ai.

### SCR-04: Project Observatory
**Scenarios:** SCN-006. Purpose, synthetic screenshot, features, setup steps, limits and FAQ.
**Web surface:** public
**Route:** https://passioncode.ai/observatory/
**Answers:** What does Project Observatory show, what does it read, and how do I start?
**Indexable:** yes; canonical product URL, SoftwareApplication data and sitemap.
**Without JS:** complete copy, setup steps, source and guide links, native details/summary FAQ.
**Entity:** Project Observatory, open-source (AGPL-3.0) local dashboard from PassionCode.ai (English or Russian interface).

### SCR-03: Design system
**Scenarios:** SCN-005, SCN-010. Shared identity and product marks (including Fabric Dashboards), color roles, typography and reusable CSS.
**Web surface:** public
**Route:** https://passioncode.ai/design-system/
**Answers:** Which shared visual rules do PassionCode products use?
**Indexable:** yes; canonical URL and sitemap.
**Without JS:** all visual rules and link to canonical CSS tokens.
**Entity:** PassionCode design system v1.0, adopted by the website, Switchboard and Project Observatory.

Screens describe public website behavior, not acceptance of native Switchboard or Fabric runtime.

### SCR-05: Fabric
**Scenarios:** SCN-007, SCN-008. Early-preview hero with Download for macOS, illustrative project brief, the actual window on synthetic demo data (home, board, releases), intended operating loop, people/authority principles, Get Fabric with requirements (the "Before you open it" card links /fabric/agents/, SCR-08), limits, the MCP status (no entry for other agents yet), the public source and its license, and links back to About or Switchboard.
**Web surface:** public
**Route:** https://passioncode.ai/fabric/
**Answers:** What is Fabric and what is being built?
**Indexable:** yes; canonical URL, WebPage data and sitemap. The download redirect is noindex.
**Without JS:** all content, navigation, requirements and the download link. No fake functional agent demo or waitlist.
**Entity:** Fabric, the CEO AI agent within PassionCode.ai, in early preview.

### SCR-06: Fabric Inbox
**Scenarios:** SCN-009. Development-preview hero with Download for macOS, what it does, Get Fabric Inbox (requirements, checksum, release notes, limits), For agents (key and MCP command), toolkit context and FAQ.
**Web surface:** public
**Route:** https://passioncode.ai/inbox/
**Answers:** What does Inbox do and can I use it today?
**Indexable:** yes; canonical URL, SoftwareApplication data naming the selected release and the AGPL, and sitemap. The download redirect is noindex.
**Without JS:** all content, the download link, checksum, agent steps, sibling product links and native FAQ.
**Entity:** Fabric Inbox, Fabric's mail tool from PassionCode.ai, a desktop mail client in development preview, open source under AGPL-3.0.

Inbox falsifier: a reader could mistake the preview for a finished product or a working generic IMAP/Outlook offering. The development-preview status appears in the first viewport, and the unverified parts are repeated beside the download. Composition follows the existing product page; no new animation or visual direction is introduced.

### SCR-07: Fabric Dashboards
**Scenarios:** SCN-010. Hero → practical service utility → download and requirements → agent setup → FAQ → sibling tools.
**Web surface:** public
**Route:** https://passioncode.ai/dashboards/
**Answers:** What does Fabric Dashboards do, which services appear, and how do I install it?
**Indexable:** yes; canonical URL, sitemap and versioned SoftwareApplication data.
**Without JS:** complete page, download/checksum, MCP command and native FAQ.
**Entity:** Fabric Dashboards, macOS service dashboard from PassionCode.ai, AGPL-3.0, release 0.3.1.

Simplification 2026-10-10: existing components only (section heading, principles list, path cards with a two-column modifier, tool cards, FAQ details, about section); no new motion. The launcher card leads to /start/#launcher. Falsifiers: a product lacks a next action; a preview appears finished; the founder note adds biography beyond facts.md; a door card or tool card clips at 390 px.

### SCR-08: Get started
**Scenarios:** SCN-013, SCN-015. Hero with the thesis (stop building agents that rot and don’t talk to each other) and an on-page table of contents → five steps (#launcher, #fabric, #build, #run, #family) with copyable commands and current versions → the task-pipeline recommendation (#pipeline, separate open-source project) → #contribute (one paragraph with AGENTS.md, CONTRIBUTING.md and CLA.md, the public repository list) → closing to /business/. Simplified 2026-10-10 to about 450 words.
**Web surface:** public
**Route:** https://passioncode.ai/start/
**Answers:** How do I install the workplace and make my first agent?
**Indexable:** yes; HowTo structured data.
**Without JS:** complete; commands are selectable text.

### SCR-09: For organizations (Enterprise)
**Scenarios:** SCN-014. Since 2026-10-10: hero ("Make your organization AI-native", designed for 1 to 1000 people) with the four-step funnel → PassionCode for Enterprise (#enterprise: in development, offered on request; seven things we set up — machines onboarded, agents rolled out, routing between machines, model access through each machine's local agent, activity and usage analytics, administration, custom signed builds; data on your machines or your own cloud; no codename, internals or wording about assessing people) → estimate formula (#estimate) → the request form (#request, unchanged) → three FAQs. #organization, #cases, #engagement and #options stay as legacy anchors.
**Web surface:** public
**Route:** https://passioncode.ai/business/
**Answers:** How does my organization move into AI with agents it owns, what could they take over, and how do I start?
**Indexable:** yes; Service and FAQPage structured data.
**Without JS:** the form is one page posting to /api/leads; the estimate formula and example are static text.

### SCR-10: Request received
**Scenarios:** SCN-014. Confirmation for the no-JavaScript path, with the email fallback.
**Web surface:** public, `noindex`
**Route:** https://passioncode.ai/business/thanks/

### SCR-11: Privacy notice
**Scenarios:** SCN-017. Controller, data, purposes and legal bases, storage locations, retention, rights, browser draft, the apps.
**Web surface:** public
**Route:** https://passioncode.ai/privacy/
### SCR-12: Fabric: supported coding agents
**Scenarios:** SCN-018. Intro (as-of date, direct answer) → three levels → Connected table → Runs in Fabric table → Planned table in order, then desktop apps and editors → ACP → why these agents (OpenRouter, dated) → account switching with Download for macOS and Explore Switchboard.
**Route:** https://passioncode.ai/fabric/agents/
**Answers:** Which coding agents does Fabric work with, and what does "works with" mean?
**Indexable:** yes; canonical URL, WebPage data with `dateModified` and a breadcrumb, sitemap.
**Without JS:** the whole answer, every table and every official-site link.
**Entity:** Fabric, the CEO AI agent within PassionCode.ai; the agents are named with their own official sites.
Falsifiers: an agent appears at two levels or a planned agent reads as connected; a table clips at 320 px; the page quotes an OpenRouter share as a number; the date is missing. Existing tokens and section patterns only; the one new component is a token-styled table.

### SCR-13: Vision
**Scenarios:** SCN-020. Since 2026-10-10 (about 600 words): hero (From one agent to an AI-native organization; local first, open source, vendor-neutral) with a table of contents → the missing harness (#harness: one McKinsey figure, the definition, its four parts mapped to the tools) → four principles (#beliefs: projects are the axis, the work improves itself, any agent on your machines, analytics never surveillance; the task-pipeline note #pipeline) → the path (#path, six labelled stages) → FAQ → closing with both doors, naming PassionCode for Enterprise. #problem, #today, #trust and #organizations stay as legacy anchors.
**Web surface:** public
**Route:** https://passioncode.ai/vision/
**Answers:** Why do agents need a harness, how does one agent grow into an organization, and what works today?
**Indexable:** yes; canonical URL, Article and FAQPage data, sitemap, hreflang with every language version.
**Without JS:** the whole page; the install command is selectable text.
Falsifiers: a stage without an availability label; a figure without its source link; "the work improves itself" read as shipped; the page reading as if PassionCode.ai replaces the coding agents; a three-column path or stage examples clipping at 390 px.
