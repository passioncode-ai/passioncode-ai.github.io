<sub>ssheleg skills — task-pipeline · ux-scenarios · brand-voice · copywriting · sheleg-design</sub>

# Fabric Inbox website — source handoff, 2026-09-26

Objective, requirements, source evidence and dependencies: [bounded task packet](tasks/2026-09-26-inbox-site.md). Shared contract: [design system 1.1.0](../design-system/README.md). Branch: `codex/inbox-product-site`, based on public `c277b7b`.

## Completed

- [Inbox product page](../inbox/index.html), [homepage card](../index.html), five-page navigation, metadata, sitemap and 22-entry publication allowlist. Private source is not used as a public CTA. Cloudflare/Gmail are preview implementations, unified account UI is in progress, general IMAP/Outlook are planned. No public release or signed download is offered.
- [Canonical light/dark tokens](../design-system/tokens.css), opt-in light via document-root `data-theme="light"`, theme-specific link/focus ink, [Inbox tray mark](../assets/inbox-mark.svg), public system reference and provenance. All 42 original dark token values are unchanged. Parent fruit lock passes.
- SCN-007, screen contract, brand terminology/facts/actions and generated public-copy projections. The projection now includes Observatory as well as Inbox.

## Checks actually run

- `npm run check`: PASS (locked assets, five static pages, anchors/status, download Worker semantics, 35 scoped palette contrast pairs; minimum computed ratio 4.91:1).
- `npm run build`: PASS, 22 allowlisted entries.
- `python3 scripts/extract-public-copy.py --check`: PASS.
- Installed super-ux `ux_lint.py`: PASS. Installed `brand_lint.py --brief`: 0 errors, 211 warnings. Its generic HTML registry heuristic still flags metadata/attributes and some prose; this is not a warning-free certification.
- One-time comparison of every default token against base Git content: all 42 values preserved. `git diff --check`: PASS.
- No full hosted CI dispatched. Browser review is owned by the root task and is pending this handoff; no whole-UI WCAG conformance, provider acceptance, merge or deployment is claimed.

## Exact shared bytes

- `design-system/tokens.css` SHA-256: `f8f6dc6d8ed79e6d9f65f420edee9dbc52ad189eff2837ee77df707206282f47`.
- `assets/inbox-mark.svg` SHA-256: `bc45a70e5b992f0495f3f00db6c729fd440ec9be10b75e7c13f292b1c98237c8`.

Consumers must pin the eventual source commit as well as these hashes. Existing Switchboard vendored bytes were not changed in this packet.

## Next task and boundaries

Root task: review `/`, `/inbox/` and `/design-system/` at desktop/mobile sizes, verify keyboard links and status clarity, vendor canonical tokens into Inbox, and update the organization profile with public `/inbox/` and `/observatory/` links. Reconcile product copy if unified-account work reaches a new verified state. Integrate through the website's [deployment contract](DEPLOYMENT.md), checking exact pushed source before any production action. Deployment is not part of this source handoff.

The separate dirty `passioncode-ai.github.io` checkout was never edited. Dependencies, `dist`, caches, provider/user data and credentials remain local-only. This report is the single entry point for resuming this website packet; [the prior launch handoff](HANDOFF.md) remains the history of existing releases.

## Skills actually used

- task-pipeline: bounded isolated implementation and Git delivery.
- ux-scenarios: Inbox discovery and availability path.
- brand-voice: sourced Inbox facts and exact terminology; copywriting: public development-status text.
- sheleg-design: existing composition, Inbox glyph and authored light palette.

Humanization: on — own advisory pass; retained the existing family heading style and made availability explicit. No source, provider, release or status fact was changed by the copy pass.

**Made with [ssheleg skills](https://github.com/ssheleg/sshlg-skills)**
