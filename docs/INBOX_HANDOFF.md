<sub>ssheleg skills — task-pipeline · ux-scenarios · brand-voice · copywriting · sheleg-design</sub>

# Fabric Inbox website — source handoff, 2026-09-26

Objective, requirements, source evidence and dependencies: [bounded task packet](tasks/2026-09-26-inbox-site.md). Shared contract: [design system 1.1.0](../design-system/README.md). Branch: `codex/inbox-product-site`, based on public `c277b7b`.

## Completed

- [Inbox product page](../inbox/index.html), [homepage card](../index.html), five-page navigation, metadata, sitemap and 22-entry publication allowlist. Private source is not used as a public CTA. Cloudflare/Gmail are preview implementations, unified account UI is in progress, general IMAP/Outlook are planned. No public release or signed download is offered.
- [Canonical light/dark tokens](../design-system/tokens.css), opt-in light via document-root `data-theme="light"`, theme-specific link/focus ink, [Inbox tray mark](../assets/inbox-mark.svg), public system reference and provenance. All 42 original dark token values are unchanged. Parent fruit lock passes.
- SCN-009, screen contract, brand terminology/facts/actions and generated public-copy projections. The projection now includes Observatory as well as Inbox.

## Checks actually run

- `npm run check`: PASS (locked assets, five static pages, anchors/status, download Worker semantics, 35 scoped palette contrast pairs; minimum computed ratio 5.29:1).
- `npm run build`: PASS, 22 allowlisted entries.
- `python3 scripts/extract-public-copy.py --check`: PASS.
- Installed super-ux `ux_lint.py`: PASS. Installed `brand_lint.py --brief`: 0 errors, 211 warnings. All 211 are B022: its generic HTML registry heuristic still flags metadata/attributes and some prose; this is not a warning-free certification.
- One-time comparison of every default token against base Git content: all 42 values preserved. `git diff --check`: PASS.
- No full hosted CI dispatched. Root desktop browser review passed for Inbox and the combined homepage; no whole-UI WCAG conformance or live-provider acceptance is claimed. Deployment completion is recorded below.

## Exact shared bytes

- `design-system/tokens.css` SHA-256: `86866df1bec49b85e9def4132021401894483bb819dc2d3a3a70511d2e4b2a61`.
- `assets/inbox-mark.svg` SHA-256: `bc45a70e5b992f0495f3f00db6c729fd440ec9be10b75e7c13f292b1c98237c8`.

Consumers must pin the eventual source commit as well as these hashes. Existing Switchboard vendored bytes were not changed in this packet.

## Next task and boundaries

Root task: review `/`, `/inbox/` and `/design-system/` at desktop/mobile sizes, verify keyboard links and status clarity, vendor canonical tokens into Inbox, and update the organization profile with public `/inbox/` and `/observatory/` links. Reconcile product copy if unified-account work reaches a new verified state. Integrate through the website's [deployment contract](DEPLOYMENT.md), checking exact pushed source before any production action. Root subsequently authorized deployment; see the completion receipt below.

The separate dirty `passioncode-ai.github.io` checkout was never edited. Dependencies, `dist`, caches, provider/user data and credentials remain local-only. This report is the single entry point for resuming this website packet; [the prior launch handoff](HANDOFF.md) remains the history of existing releases.

## Skills actually used

- task-pipeline: bounded isolated implementation and Git delivery.
- ux-scenarios: Inbox discovery and availability path.
- brand-voice: sourced Inbox facts and exact terminology; copywriting: public development-status text.
- sheleg-design: existing composition, Inbox glyph and authored light palette.

Humanization: on — own advisory pass; retained the existing family heading style and made availability explicit. No source, provider, release or status fact was changed by the copy pass.

**Made with [ssheleg skills](https://github.com/ssheleg/sshlg-skills)**

## Remote delivery receipt

[Draft PR #5](https://github.com/passioncode-ai/passioncode-ai.github.io/pull/5). Source commit [b9c8a753dbd5588fbe9b38104d55712959ab1126](https://github.com/passioncode-ai/passioncode-ai.github.io/commit/b9c8a753dbd5588fbe9b38104d55712959ab1126) was pushed and `git ls-remote` matched the branch SHA. A fresh HTTPS clone of `codex/inbox-product-site` resolved to that commit; `npm run check` and `npm run build` both passed there with the same five pages and 22 public entries. This receipt is a documentation-only follow-up; source/theme bytes are unchanged. Browser review and production delivery remain with the root task.

## White-theme correction after root visual review

The operator explicitly requested white. The light canvas is now `#ffffff`, the panel `#f7f5f8`, and the raised panel `#ffffff`; the earlier warm canvas is superseded. All dark values and the Inbox glyph are unchanged. `npm run check`, `npm run build` and `git diff --check` pass after this correction; the 35-pair minimum is now 5.29:1. Root-task review owns acceptance of the updated render; consumers must repin the corrected token bytes above.

## Production delivery — complete

[Fabric Inbox](https://passioncode.ai/inbox/) is live. PR #5 was merged after preserving concurrent website storytelling and the new Fabric product page. The merge reconciled scenario IDs: Inbox is SCN-009, screen SCR-06. Root reviewed the integrated homepage and Inbox at localhost:5176 with screenshot/accessibility-tree evidence before publication.

Exact checked/deployed `main`: [630f4f7f5c94fc36f15d9047ff487d1142c3479f](https://github.com/passioncode-ai/passioncode-ai.github.io/commit/630f4f7f5c94fc36f15d9047ff487d1142c3479f). Local and remote SHA matched before deployment. `npm ci` (audit 0), check, build and Wrangler dry-run passed. The final build contains six pages and 23 public files; earlier five-page/22-file entries describe the pre-integration snapshot.

Cloudflare Worker `passioncode-ai`, version `b214c3e5-bf68-4a60-a3e0-6dfc23801807`, deployment `cf59a5a8-68a7-4095-9e8f-d452f5f30e01`, 100% at 2026-09-26T19:33:11.666856Z. Wrangler had no login. The existing authenticated Cloudflare API connector supplied an asset-upload session; nine changed assets were uploaded using its temporary JWT, then the checked bundle and completion JWT deployed through the documented Worker PUT. Existing bindings/compatibility/usage settings retained. No DNS, mail routing or access grants changed. Temporary tokens stayed out of Git and messages and were deleted locally after use.

[Computed receipt](INBOX_DEPLOYMENT.json) and [reproducible verification](evidence/verify-inbox.py): all 23 public files matched the exact checked `dist` bytes; both OS redirects returned the pinned release with no-store/noindex; both ZIPs downloaded anonymously and matched GitHub's SHA-256 digests; www preserves path/query; unknown OS and private Git/docs paths return 404. The first immediate probe briefly saw the prior design-system response during propagation; a direct diff and complete second run matched all files. No full hosted CI was dispatched or claimed passing.

The canonical token hash remains `86866df1bec49b85e9def4132021401894483bb819dc2d3a3a70511d2e4b2a61`. Root owns app vendoring and organization-profile propagation. Website publishing is complete; the next website task is to revise preview status only after the product owner records a verified new release/capability state.

Additional skill actually used: [Cloudflare](https://developers.cloudflare.com/workers/static-assets/direct-upload/) for existing-account deployment and direct asset upload verification. This receipt changes documentation only, not deployed bytes.
