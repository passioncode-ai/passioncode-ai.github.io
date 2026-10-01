# Screens

**Web surfaces:** yes — public static pages; visible copy, canonical URLs and structured data are available without JavaScript.

Design system: [PassionCode](../../design-system/README.md), existing static HTML components. No new Figma file. Identity update with existing layout language; no cinematic motion. Observable targets: primary CTA visible in first desktop viewport, OS requirements beside each download, no horizontal overflow on mobile, keyboard-visible links and summaries.

| ID | Screen | Scenarios |
|---|---|---|
| SCR-01 | Home | SCN-001, SCN-006, SCN-007, SCN-008, SCN-010 |
| SCR-02 | Switchboard | SCN-002, SCN-003, SCN-004, SCN-011 |
| SCR-03 | Design system | SCN-005, SCN-010 |
| SCR-04 | Observatory | SCN-006 |
| SCR-05 | Fabric | SCN-007, SCN-008 |
| SCR-06 | Fabric Inbox | SCN-009 |

### SCR-01: Home
**Scenarios:** SCN-001, SCN-006, SCN-007, SCN-008, SCN-010. Original operating-system hero with primary Explore the tools → #products and secondary download CTA; work cycle; available Switchboard and Observatory; developing Fabric; build pipeline including Fabric Dashboards (no product page; it links its public release); public source-available repositories; author/About. Header and footer expose the same main sections on mobile.
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
**Scenarios:** SCN-007, SCN-008. Early-preview hero with Download for macOS, illustrative project brief, the actual window on synthetic demo data (home, board, releases), intended operating loop, people/authority principles, Get Fabric with requirements, limits, the MCP status (no entry for other agents yet), the public source and its license, and links back to About or Switchboard.
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
