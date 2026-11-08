# Screens

**Web surfaces:** yes — public static pages; visible copy, canonical URLs and structured data are available without JavaScript.

Design system: [PassionCode](../../design-system/README.md), existing static HTML components. No new Figma file. Identity update with existing layout language; motion level 5 (foundation → Motion): entrances, one scrubbed rail, the hero map loop — never a dependency. Observable targets: primary CTA visible in first desktop viewport, OS requirements beside each download, no horizontal overflow on mobile, keyboard-visible links and summaries.

| ID | Screen | Scenarios |
|---|---|---|
| SCR-01 | Home | SCN-001, SCN-006, SCN-007, SCN-008, SCN-010, SCN-021 |
| SCR-02 | Switchboard | SCN-002, SCN-003, SCN-004, SCN-011 |
| SCR-03 | Design system | SCN-005, SCN-010 |
| SCR-04 | Observatory | SCN-006 |
| SCR-05 | Fabric | SCN-007, SCN-008 |
| SCR-06 | Fabric Inbox | SCN-009 |
| SCR-07 | Fabric Dashboards | SCN-010, SCN-016 |
| SCR-08 | Get started | SCN-013, SCN-015 |
| SCR-09 | For organizations (Enterprise) | SCN-014, SCN-022 |
| SCR-10 | Request received | SCN-014 |
| SCR-11 | Privacy notice | SCN-017 |
| SCR-12 | Fabric: supported coding agents | SCN-018 |
| SCR-13 | Vision | SCN-020 |
| SCR-14 | Agent templates | SCN-025 |
| SCR-15 | Agent template | SCN-026 |
| SCR-16 | Guides and a guide | SCN-027 |
| SCR-17 | Blog and a post | SCN-028 |

Every screen exists in every language of `i18n/locales.json` (Russian at `/ru/…`), generated from the English one with the same structure (docs/DEPLOYMENT.md#languages). The shared header carries the language switch beside its action: one text link to the same page in the other language with two languages, a `<details>` menu listing every language with three or more (SCN-019).

### SCR-01: Home
**Scenarios:** SCN-001, SCN-006, SCN-007, SCN-008, SCN-010, SCN-012, SCN-013, SCN-016, SCN-021. Reading order (since 2026-10-10, W6 of SITE-028; narrative approved the same day): hero (unchanged headline and line under it; since SITE-045, 2026-10-14, operator D1, one subline: Fabric is the home for your projects and their agents, Switchboard, Dashboards, Observatory and Inbox work with it and on their own, one command sets it all up today; the intro line and the map label say what Fabric does today, D-T5; two doors — For you, free → /start/ and For your organization → /business/; current versions, the workplace map) → the home video (#video, since SITE-039, 2026-10-12: directly under the hero at the content width, its 16:9 box reserved, caption line under it; since SITE-045 a folded "Read the transcript" with the narration written from the page's captions file, and VideoObject data written from the player's own files) → Why (#why: the problem in the reader's words — an agent works for a week, then falls apart — and the three proofs: local and open source, the agents and subscription you already have, a record you can open; link to /vision/) → How it works (#how, SCN-021: six steps in three columns, two at 1000 px, one at 620 px; each with its state label, one picture and a one-line caption; steps 01 and 06 are text cards from existing components; step 02 the sample-data mockup `journey-2-2.jpg` (Fabric's first run, four actions), step 03 `journey-3-3.jpg` (the coding agent's console asking the intake questions, a written example), each with a `-ru.jpg` twin for the Russian pages (SITE-028 W5); steps 04 and 05 the synthetic `dashboards-overview.jpg` and `fabric-board.jpg`; the home video (under the steps from W10, 2026-10-11, until SITE-039 moved it under the hero on 2026-10-12): click to play, poster, captions on by default, Russian cut on /ru/, English cut elsewhere with captions in each page's language (the last five since SITE-035, 2026-10-12)) → Two ways in (#start; the For you card carries the `setup` command with its Copy button since SITE-045) → the tools (#products, since SITE-045: Fabric first and full width as the home, then a label "Work with Fabric, and on their own" and the four tools; no launcher card; one line, status, current version and journey step each; the preview note) → open source (#source) → three FAQs → About (#about, since 2026-10-11 "How we got here": the founders' story in eight short paragraphs in the existing about-section layout, the lead paragraph larger, an inline link to /business/#request, the X button and the signature; since SITE-045 three short notes under it, each with a footer anchor: For investors #investors, For contributors #contributors, Writing about us #press; SCN-008). The removed sections keep their addresses as legacy anchors (#path, #vision, #toolkit, #shift in #why; #companies in #start; #extend in #products; #launcher in #how since SITE-045; #open-source, #foundation, #pipeline in #source); #how is now the How it works section itself. Header navigation since 2026-10-09: Vision · For you · For organizations · The tools · About (every page but Inbox); the header's one action since SITE-045 (2026-10-14) is Set up ↓ → /start/#setup on every page, Inbox included. The footer adds Investors, Contributors and Press (/#investors, /#contributors, /#press). At phone width (620 px and below, since SITE-039, 2026-10-12) the navigation is one row under the brand in every language; a row longer than the screen scrolls sideways, keyboard focus scrolls it, and its right edge fades; the header is 115 px tall at 390 and 320 px (was up to 205 px when it wrapped). Below 340 px the brand shows its mark only, keeping its accessible name. Header controls are at least 44 px tall. Footer: Get started, Vision, For organizations, the products, Privacy, the commercial address and X (named "Twitter" until 2026-10-11). Since SITE-056 (2026-11-08) the footer also links Agent templates (/agents/), Guides (/guides/) and Blog (/blog/), and the home story's #agents section links /agents/.
**Web surface:** public
**Route:** https://passioncode.ai/
**Answers:** What is PassionCode, what is an AI-native organization and how does it run, what works today, and where do I start?
**Indexable:** yes; canonical URL and sitemap.
**Without JS:** complete copy, the diagram's text alternative, every door and product link.
**Entity:** PassionCode.ai, the workplace for AI-native organizations: Fabric and the tools around it.

**SITE-049 reading order (2026-11-06, replaces the order above when it ships; design `docs/tasks/2026-11-06-ai-native-org-design.md` §2):** header kept (D2) with the promise as its subline → video v4 (#video) → 01 problem (#problem) → 02 shift (#shift) → 03 Fabric manages the process (#fabric) → 04 one system (#system) → 05 agents at work (#agents, the diagram) → 06 from a team to an organization (#grow) → 07 four doors (#doors) → the tools (#products) → open source (#source) → questions → About with #investors. Scenarios SCN-001, SCN-021, SCN-023, SCN-024. #why, #how and #start stay as legacy anchors.

### SCR-02: Switchboard
**Scenarios:** SCN-002/003/004/011. Reading order: hero (with the IN THE TOOLKIT line) → Get Switchboard (macOS and Windows cards, a full-width Before you open it card with CLI/OS/Windows requirements, SHA-256 list, release links, beta note) → The problem (limits run out; rotation keeps the session open) → synthetic screenshot (`switchboard-accounts.jpg` since 2026-10-10: Switchboard 0.6.13's browser demo, its SYNTHETIC DEMO banner visible, accounts at `example.test`; it replaces the 0.3.1-era `switchboard-demo.jpg`) → features → For agents (only for a selected release ≥ 0.4.0-beta.1: `switchboard mcp`, project rules, connect commands, the plugin line once the launcher lists it) → first session → FAQ → Part of the PassionCode toolkit → closing.
**Release-bound parts:** only `data-release-*` elements, the `<!-- release:NAME -->` regions (`macos-note`, `checksums`, `license-current`, `agents`) and the JSON-LD `softwareVersion`/`license` change with `switchboard/release.json`; `scripts/switchboard-release.mjs` renders them, `npm run check` asserts the page equals the render and that the MIT-history sentence still names v0.3.1-beta.1.
**Web surface:** public
**Route:** https://passioncode.ai/switchboard/
**Answers:** What does Switchboard do and where can I download it?
**Indexable:** yes; canonical product URL, SoftwareApplication data and sitemap. Redirect endpoints noindex.
**Without JS:** requirements, checksums, beta limits, download/source links, agent connect commands and native details/summary FAQ. Checksums and commands wrap at 390 px.
**Entity:** Fabric Switchboard, open-source (AGPL-3.0) desktop account workbench from PassionCode.ai.

### SCR-04: Project Observatory
**Scenarios:** SCN-006. Purpose, synthetic screenshot (since 2026-10-11 `observatory-overview.jpg`: the 0.21 engine's own overview over its fictional demo estate, dark as the product ships, with a Russian twin and a visible sample-data chip, SITE-028 W5), features, setup steps, limits and FAQ.
**Web surface:** public
**Route:** https://passioncode.ai/observatory/
**Answers:** What does Project Observatory show, what does it read, and how do I start?
**Indexable:** yes; canonical product URL, SoftwareApplication data and sitemap.
**Without JS:** complete copy, setup steps, source and guide links, native details/summary FAQ.
**Entity:** Project Observatory, open-source (AGPL-3.0) local dashboard from PassionCode.ai (English or Russian interface) for macOS, Windows and Linux; since 0.22.0 a desktop app on each (SITE-030, 2026-10-11: JSON-LD `operatingSystem` «macOS; Windows; Linux»).

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
**Scenarios:** SCN-007, SCN-008. Early-preview hero (since 2026-10-10: "the home for your projects and their agents", the one "CEO" on the site as the direction, D-T5; the IN THE TOOLKIT line) with Download Fabric (→ #download; since SITE-046 the caption names macOS, Windows and Linux), the first screen's four actions in the side card (create an agent, adapt one, open a project, create one; text, not a screenshot), the actual window on synthetic demo data (home, board, releases), then the Create and Adapt screens (`journey-3-1.jpg`, `journey-3-2.jpg`) and the coding agent's console after each (`journey-3-3.jpg`, `journey-3-4.jpg`) as sample-data mockups with a visible chip and a note that the console text is a written example (SITE-028 W5), intended operating loop, people/authority principles, Get Fabric with macOS, Windows and Linux cards and per-system requirements and limits (SITE-046, 2026-10-15); since SITE-045 a one-line link to the setup under the IN THE TOOLKIT line, SoftwareApplication data, and "Works with Fabric" (#works-with) in place of the Switchboard closing: the four tools as cards, then two labelled stages — AVAILABLE NOW, one command sets up all of it (→ /start/#setup); DIRECTION, adding a tool from inside Fabric (the "Before you open it" card links /fabric/agents/, SCR-08), limits, the MCP status (no entry for other agents yet), the public source and its license, and links back to About or Switchboard.
**Web surface:** public
**Route:** https://passioncode.ai/fabric/
**Answers:** What is Fabric and what is being built?
**Indexable:** yes; canonical URL, WebPage data and sitemap. The download redirect is noindex.
**Without JS:** all content, navigation, requirements and the download link. No fake functional agent demo or waitlist.
**Entity:** Fabric, the home for your projects and their agents within PassionCode.ai, in early preview.

### SCR-06: Fabric Inbox
**Scenarios:** SCN-009. Development-preview hero with Download for macOS (the line under it names macOS 12+, Windows and Linux), New in 0.15 (since SITE-033 2026-10-11: agent console, setup by the coding agent, mail the server could not take, in the page's feature-grid style; the hero headline and line stay on the page's one question), what it does, Get Fabric Inbox (macOS card, a «Windows and Linux» card since SITE-030 2026-10-11 linking the latest release page, Before you open it, checksum, release notes, limits), For agents (three steps: the sentence for the coding agent, a key by hand, the MCP command), toolkit context and FAQ.
**Web surface:** public
**Route:** https://passioncode.ai/inbox/
**Answers:** What does Inbox do and can I use it today?
**Indexable:** yes; canonical URL, SoftwareApplication data naming the selected release and the AGPL, and sitemap. The download redirect is noindex.
**Without JS:** all content, the download link, checksum, agent steps, sibling product links and native FAQ.
**Entity:** Fabric Inbox, Fabric's mail tool from PassionCode.ai, a desktop mail client in development preview for macOS, Windows and Linux, open source under AGPL-3.0.

Inbox falsifier: a reader could mistake the preview for a finished product or a working generic IMAP/Outlook offering. The development-preview status appears in the first viewport, and the unverified parts are repeated beside the download. Composition follows the existing product page; no new animation or visual direction is introduced.

### SCR-07: Fabric Dashboards
**Scenarios:** SCN-010. Hero → practical service utility → download and requirements → agent setup → FAQ → sibling tools.
**Web surface:** public
**Route:** https://passioncode.ai/dashboards/
**Answers:** What does Fabric Dashboards do, which services appear, and how do I install it?
**Indexable:** yes; canonical URL, sitemap and versioned SoftwareApplication data.
**Without JS:** complete page, download/checksum, MCP command and native FAQ.
**Entity:** Fabric Dashboards, desktop service dashboard from PassionCode.ai for macOS, and since 0.7.1 Windows and Linux, AGPL-3.0; the version is live from the release snapshot. Since SITE-030 (2026-10-11) the meta description, hero and services lines say «on your computer» / «on macOS, Windows and Linux» instead of «on your Mac».

Simplification 2026-10-10: existing components only (section heading, principles list, path cards with a two-column modifier, tool cards, FAQ details, about section); no new motion. The launcher card was removed in SITE-045; the command lives in #how step 01 and the For you card. Falsifiers: a product lacks a next action; a preview appears finished; the founders’ story states a fact that has no row in facts.md, or links to a publication or source; a door card or tool card clips at 390 px.

### SCR-08: Get started
**Scenarios:** SCN-013, SCN-015. Hero with the thesis (agents that keep working and know about each other; since SITE-047, 2026-10-15, "From an empty computer", and the caption says Fabric needs Docker and the Supabase CLI on every system, no longer that it needs macOS) and an on-page table of contents → One command (#setup, since 2026-10-13: the `setup` command for a new or an existing computer, the `doctor` line, and the setup prompt #setup-prompt in the existing agent-prompt card with its Copy button; Fabric named as an early preview; since SITE-047 the paragraph says the apps install on macOS and on Windows and Linux come from their pages first, the note links the Fabric page, and #fabric and #dashboards each add a "For Windows and Linux" link to their product's #download; since SITE-045, 2026-10-14, the command card #setup-command and the prompt side by side, one column below 900 px; #launcher is a legacy anchor here) → "Prefer to do it by hand?" (#by-hand, one folded details: #fabric, the Fabric download and its four actions; #dashboards, the Dashboards download and its MCP line; links to the other tools' downloads; a link to an id inside opens it) → three next steps (#build: create or adapt; #run: see it in Dashboards; #family: the next agent in the same project) → one line to task-pipeline on /vision/#pipeline (#pipeline stays as its anchor) → #contribute (one paragraph with AGENTS.md, CONTRIBUTING.md and CLA.md, the public repository list) → closing to /business/. Simplified 2026-10-10 to about 450 words.
**Web surface:** public
**Route:** https://passioncode.ai/start/
**Answers:** How do I install the workplace and make my first agent? How do I check and repair a setup I already have?
**Indexable:** yes; HowTo structured data.
**Without JS:** complete; commands are selectable text.
**Entity:** PassionCode.ai's launcher and tools, the free and open-source start for engineers and solo founders.

### SCR-09: For organizations (Enterprise)
**Scenarios:** SCN-014, SCN-022. Since 2026-10-10: hero ("Make your organization AI-native", designed for 1 to 1000 people) with the four-step funnel → Who we are (#founders, since 2026-10-11: the two co-founders in three sentences, unnumbered, the about-section layout, a link to /#about) → PassionCode for Enterprise (#enterprise: in development, offered on request; seven things we set up — machines onboarded, agents rolled out, routing between machines, model access through each machine's local agent, activity and usage analytics, administration, custom signed builds; data on your machines or your own cloud; no codename, internals or wording about assessing people) → For finance and engineering (#spend) → estimate formula (#estimate) → 04 / REQUEST (#request, since 2026-10-11): two cards, the agent prompt first (#agent-request: one line, the prompt in the page's language with English JSON and commands, a Copy button added by script, a link to the plain-text copy) and the short form (free text, work email, optional goal, a privacy line; one column below 900 px, the agent card on top) → three FAQs. #organization, #cases, #engagement and #options stay as legacy anchors.
**Web surface:** public
**Route:** https://passioncode.ai/business/
**Answers:** How does my organization move into AI with agents it owns, what could they take over, and how do I start?
**Indexable:** yes; Service and FAQPage structured data.
**Without JS:** the short form posts to /api/leads; the prompt is selectable text with no Copy button; the estimate formula and example are static text.
**Entity:** PassionCode for Enterprise, the organization offer of PassionCode.ai.

### SCR-10: Request received
**Scenarios:** SCN-014. Confirmation for the no-JavaScript path, with the email fallback.
**Web surface:** public, `noindex`
**Route:** https://passioncode.ai/business/thanks/
**Answers:** Was my request received, what is its reference, and what happens next?
**Indexable:** no; `noindex, follow`, kept out of the sitemap.
**Without JS:** complete; it is the no-JavaScript confirmation itself.
**Entity:** the request intake of PassionCode for Enterprise.

### SCR-11: Privacy notice
**Scenarios:** SCN-017. Controller, data, purposes and legal bases, storage locations, retention, rights, browser draft, the apps.
**Web surface:** public
**Route:** https://passioncode.ai/privacy/
**Answers:** What data does PassionCode.ai collect, why, where it is kept, for how long, and what are my rights?
**Indexable:** yes; canonical URL and sitemap.
**Without JS:** the whole notice.
**Entity:** PassionCode.ai as the controller of request and site data.
### SCR-12: Fabric: supported coding agents
**Scenarios:** SCN-018. Intro (as-of date, direct answer) → three levels → Connected table → Runs in Fabric table → Planned table in order, then desktop apps and editors → ACP → why these agents (OpenRouter, dated) → account switching with Download for macOS and Explore Switchboard.
**Route:** https://passioncode.ai/fabric/agents/
**Answers:** Which coding agents does Fabric work with, and what does "works with" mean?
**Indexable:** yes; canonical URL, WebPage data with `dateModified` and a breadcrumb, sitemap.
**Without JS:** the whole answer, every table and every official-site link.
**Entity:** Fabric, the home for your projects and their agents within PassionCode.ai; the agents are named with their own official sites.
Falsifiers: an agent appears at two levels or a planned agent reads as connected; a table clips at 320 px; the page quotes an OpenRouter share as a number; the date is missing. Existing tokens and section patterns only; the one new component is a token-styled table.

### SCR-13: Vision
**Scenarios:** SCN-020. Since 2026-10-10 (about 600 words): hero (From one agent to an AI-native organization; local first, open source, vendor-neutral) with a table of contents → what holds an agent (#harness: one McKinsey figure, the site's only definition of "harness", D-T1; its four parts mapped to the tools: a home, accounts, state and control, memory and evidence) → four principles (#beliefs: projects are the axis, the work improves itself, any agent on your machines, analytics never surveillance; the task-pipeline recommendation #pipeline with its install command, moved here from /start/ in SITE-045) → the path (#path, six labelled stages; stages 1, 2 and 6 link to their step of the home page's How it works) → FAQ → closing with both doors, naming PassionCode for Enterprise. #problem, #today, #trust and #organizations stay as legacy anchors.
**Web surface:** public
**Route:** https://passioncode.ai/vision/
**Answers:** Why do agents need something to hold them together, how does one agent grow into an organization, and what works today?
**Indexable:** yes; canonical URL, Article and FAQPage data, sitemap, hreflang with every language version.
**Without JS:** the whole page; the install command is selectable text.
**Entity:** PassionCode.ai's vision and its North Star for AI-native organizations.
Falsifiers: a stage without an availability label; a figure without its source link; "the work improves itself" read as shipped; the page reading as if PassionCode.ai replaces the coding agents; a three-column path or stage examples clipping at 390 px.

### SCR-14: Agent templates
**Scenarios:** SCN-025. Breadcrumbs → hero (Agents for your processes; one primary action, Create your agent → /business/#request; How it works) with a table of contents → four groups as card grids (`path-grid` three columns, two at 1000 px, one at 620 px; each card ON REQUEST, the name as a link covering the card, one sentence) → How it works (three steps) → four questions → closing with two actions.
**Web surface:** public
**Route:** https://passioncode.ai/agents/
**Answers:** Which agents can PassionCode set up for my organization?
**Indexable:** yes; CollectionPage with an ItemList of the 18 templates, BreadcrumbList, sitemap, hreflang.
**Without JS:** the whole page.
**Entity:** the agent templates of PassionCode for Enterprise.
Falsifiers: a source agent, client or organization name; a price, timeline or test count; a card without its link.

### SCR-15: Agent template
**Scenarios:** SCN-026. Breadcrumbs → hero (group eyebrow, name, lead, Create your agent, All agent templates, ON REQUEST caption) with a table of contents → What it does (three rows, `vision-principles`) → Who it is for and What you get → How it is assembled (three steps) → More templates in this group → closing.
**Web surface:** public
**Route:** https://passioncode.ai/agents/<slug>/ (18 pages)
**Answers:** What does this agent do, for whom, and how do I get it?
**Indexable:** yes; Service and BreadcrumbList data, sitemap, hreflang.
**Without JS:** the whole page.
**Entity:** one agent template, provided by PassionCode.ai.

### SCR-16: Guides and a guide
**Scenarios:** SCN-027. /guides/: hero with a lead and «Where to start» (two lines), then three cards with dates, whom each guide helps and its sections (SITE-058). A guide: breadcrumbs, GUIDE and the date, h1, lead, byline, sections, one action, More guides.
**Web surface:** public
**Route:** https://passioncode.ai/guides/ and /guides/<slug>/
**Answers:** each guide's one question (docs/seo/brief-2026-11-08.md).
**Indexable:** yes; CollectionPage or Article, BreadcrumbList, sitemap, hreflang.
**Without JS:** the whole page.
**Entity:** PassionCode.ai's guides.

### SCR-17: Blog and a post
**Scenarios:** SCN-028. /blog/: hero with a lead, the author's byline and «Where to start» (three lines), then two cards with dates, whom each post helps and its sections (SITE-058). A post: the same article layout as a guide (`legal` measure), BlogPosting data with the author.
**Web surface:** public
**Route:** https://passioncode.ai/blog/ and /blog/<slug>/
**Answers:** each post's one question.
**Indexable:** yes; CollectionPage or BlogPosting, BreadcrumbList, sitemap, hreflang.
**Without JS:** the whole page.
**Entity:** PassionCode.ai's blog, author Sergey Sheleg.
