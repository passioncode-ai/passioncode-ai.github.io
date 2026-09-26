# Screens

**Web surfaces:** yes — public static pages; visible copy, canonical URLs and structured data are available without JavaScript.

Design system: [PassionCode](../../design-system/README.md), existing static HTML components. No new Figma file. Identity update with existing layout language; no cinematic motion. Observable targets: primary CTA visible in first desktop viewport, OS requirements beside each download, no horizontal overflow on mobile, keyboard-visible links and summaries.

| ID | Screen | Scenarios |
|---|---|---|
| SCR-01 | Home | SCN-001 |
| SCR-02 | Switchboard | SCN-002, SCN-003, SCN-004 |
| SCR-03 | Design system | SCN-005 |
| SCR-04 | Fabric | SCN-006, SCN-007 |

### SCR-01: Home
**Scenarios:** SCN-001, SCN-006, SCN-007. Teams hero with download CTA; work cycle; available Switchboard; developing Fabric; build pipeline; public repositories; author/About. Header and footer expose the same main sections on mobile.
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

### SCR-03: Design system
**Scenarios:** SCN-005. Shared identity, color roles, typography and reusable CSS.
**Web surface:** public
**Route:** https://passioncode.ai/design-system/
**Answers:** Which shared visual rules do PassionCode products use?
**Indexable:** yes; canonical URL and sitemap.
**Without JS:** all visual rules and link to canonical CSS tokens.
**Entity:** PassionCode design system v1.0, adopted by website and Switchboard.

Screens describe public website behavior, not acceptance of native Switchboard or Fabric runtime.

### SCR-04: Fabric
**Scenarios:** SCN-006, SCN-007. In-development hero, illustrative project brief, intended operating loop, people/authority principles, current focus and links back to About or downloadable Switchboard.
**Web surface:** public
**Route:** https://passioncode.ai/fabric/
**Answers:** What is Fabric and what is being built?
**Indexable:** yes; canonical URL, WebPage data and sitemap. No downloadable SoftwareApplication claim.
**Without JS:** all content and navigation. No fake functional agent demo, waitlist or download.
**Entity:** Fabric, the CEO AI agent in development within PassionCode.ai.
