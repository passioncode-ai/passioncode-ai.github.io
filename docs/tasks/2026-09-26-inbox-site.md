# Fabric Inbox website and shared themes — bounded task packet

## Objective and authority

The operator asked to add Inbox to the PassionCode/Fabric product family, publish appropriate product links, and share canonical light/dark branding. The root task assigned this isolated website packet. Source changes, commit and push are authorized; merge/deployment wait for root review. The existing dirty `codex/site-storytelling` checkout is excluded.

## Scope and contracts

- REQ-01: Add /inbox/, homepage card and navigation. Keep Switchboard and Observatory available; Inbox is in development. Checked by `scripts/check-site.mjs`.
- REQ-02: Distinguish implemented Cloudflare/Gmail preview, shared account UI in progress and planned general IMAP/Outlook. No public release, signed download or public-source CTA. SCN-007 owns the visitor path.
- REQ-03: Publish canonical tokens v1.1.0 with opt-in light palette, unchanged dark values, focus/link roles and matching Inbox tray glyph. `scripts/check-design-tokens.mjs` owns scoped contrast checks. Parent fruit lock stays untouched.
- REQ-04: Ship static metadata, sitemap, build allowlist, brand facts and this handoff in Git. Root reviews browser rendering and integrates exact source.

## Sources and dependencies

Base website: [c277b7b](https://github.com/passioncode-ai/passioncode-ai.github.io/tree/c277b7b), including Observatory. Read [deployment contract](../DEPLOYMENT.md), [brand pack](../brand/voice.md), [scenarios](../ux/scenarios.md), [shared system](../../design-system/README.md).

Inbox implementation evidence supplied and checked against the root task: private `passioncode-ai/fabric-inbox` commit `d577462572d332c1e7c157504b7dffd9cde00bea`, `docs/desktop-mail/README.md`, `implementation.md`, `setup.md`. Private source is an internal evidence location, not a public CTA. Unified account UI work is separately owned by `codex/unified-workbench`; this page conservatively calls it in progress until integration/release is verified.

## Plan and review boundary

1. Extend the existing scenario and brand facts, using ux-scenarios and brand-voice.
2. Apply existing product composition and authored light roles through sheleg-design; write status copy through copywriting.
3. Run focused brand/static/Worker/token checks and build; root reviews desktop/mobile and product acceptance.
4. Commit/push this branch and give root a single entry point. Root owns cross-repository token vendoring and organization profile updates.

No new provider behavior, signed binary, source publication, deployment or full hosted-suite dispatch is included. Dependencies, caches and all provider/user data remain local-only.
