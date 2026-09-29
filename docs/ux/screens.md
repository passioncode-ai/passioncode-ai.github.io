# Screens

**Web surfaces:** yes — public static pages; visible copy, canonical URLs and structured data are available without JavaScript.

Design system: [PassionCode](../../design-system/README.md), existing static HTML components. No new Figma file. Identity update with existing layout language; no cinematic motion. Observable targets: primary CTA visible in first desktop viewport, OS requirements beside each download, no horizontal overflow on mobile, keyboard-visible links and summaries.

| ID | Screen | Scenarios |
|---|---|---|
| SCR-01 | Home | SCN-001, SCN-006, SCN-007, SCN-008 |
| SCR-02 | Switchboard | SCN-002, SCN-003, SCN-004 |
| SCR-03 | Design system | SCN-005 |
| SCR-04 | Observatory | SCN-006 |
| SCR-05 | Fabric | SCN-007, SCN-008 |
| SCR-06 | Fabric Inbox | SCN-009 |

### SCR-01: Home
**Scenarios:** SCN-001, SCN-006, SCN-007, SCN-008. Original operating-system hero with primary Explore the tools → #products and secondary download CTA; work cycle; available Switchboard and Observatory; developing Fabric; build pipeline; public repositories; author/About. Header and footer expose the same main sections on mobile.
**Web surface:** public
**Route:** https://passioncode.ai/
**Answers:** What is PassionCode and which product can I use today?
**Indexable:** yes; canonical URL and sitemap.
**Without JS:** complete copy, product links and download CTA.
**Entity:** PassionCode.ai organization/toolkit, linked to Switchboard and Fabric.

### SCR-02: Switchboard
**Scenarios:** SCN-002/003/004. OS downloads/limits, synthetic screenshot, features, setup and FAQ.
**Web surface:** public
**Route:** https://passioncode.ai/switchboard/
**Answers:** What does Switchboard do and where can I download it?
**Indexable:** yes; canonical product URL, SoftwareApplication data and sitemap. Redirect endpoints noindex.
**Without JS:** requirements, beta limits, download/source links and native details/summary FAQ.
**Entity:** Fabric Switchboard, MIT desktop account workbench from PassionCode.ai.

### SCR-04: Project Observatory
**Scenarios:** SCN-006. Purpose, synthetic screenshot, features, setup steps, limits and FAQ.
**Web surface:** public
**Route:** https://passioncode.ai/observatory/
**Answers:** What does Project Observatory show, what does it read, and how do I start?
**Indexable:** yes; canonical product URL, SoftwareApplication data and sitemap.
**Without JS:** complete copy, setup steps, source and guide links, native details/summary FAQ.
**Entity:** Project Observatory, MIT local dashboard from PassionCode.ai (English or Russian interface).

### SCR-03: Design system
**Scenarios:** SCN-005. Shared identity, color roles, typography and reusable CSS.
**Web surface:** public
**Route:** https://passioncode.ai/design-system/
**Answers:** Which shared visual rules do PassionCode products use?
**Indexable:** yes; canonical URL and sitemap.
**Without JS:** all visual rules and link to canonical CSS tokens.
**Entity:** PassionCode design system v1.0, adopted by the website, Switchboard and Project Observatory.

Screens describe public website behavior, not acceptance of native Switchboard or Fabric runtime.

### SCR-05: Fabric
**Scenarios:** SCN-007, SCN-008. Early-preview hero with Download for macOS, illustrative project brief, the actual window on synthetic demo data (home, board, releases), intended operating loop, people/authority principles, Get Fabric with requirements and limits, and links back to About or Switchboard.
**Web surface:** public
**Route:** https://passioncode.ai/fabric/
**Answers:** What is Fabric and what is being built?
**Indexable:** yes; canonical URL, WebPage data and sitemap. The download redirect is noindex.
**Without JS:** all content, navigation, requirements and the download link. No fake functional agent demo or waitlist.
**Entity:** Fabric, the CEO AI agent within PassionCode.ai, in early preview.

### SCR-06: Fabric Inbox
**Scenarios:** SCN-009. Desktop mail purpose, provider status, toolkit context and FAQ.
**Web surface:** public
**Route:** https://passioncode.ai/inbox/
**Answers:** What does Inbox do and can I use it today?
**Indexable:** yes; canonical URL, WebPage structured data describing software in development, and sitemap.
**Without JS:** all content, status anchor, sibling product links and native FAQ.
**Entity:** Fabric Inbox, desktop mail client in private development from PassionCode.ai.

Inbox falsifier: a reader could mistake the page for a public release or a working generic IMAP/Outlook offering. The status appears in the first viewport and is repeated beside the provider roadmap. Composition follows the existing product page; no new animation or visual direction is introduced.
