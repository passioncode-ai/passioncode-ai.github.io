# Website storytelling verification — 2026-09-26

Scope: [brief](../tasks/2026-09-26-site-storytelling.md), website only. Implementation is the
same source commit as this file; deployment/source identities are appended in a later receipt.

## Content and source review

- Retained dark/plum/gold identity, original fruit/S assets and token file byte-for-byte.
- Chosen term: toolkit; headline “Your toolkit for AI-native teams.” Audience restored per user;
  historical operating-system phrase offered as an optional clarification, no response at capture.
- Home reading order: hero/download → work cycle → available Switchboard/developing Fabric →
  build pipeline → open-source repositories → About/Twitter → download. One job per section.
- Fabric has its own informational page. No private-repository link, fake release date, download,
  waitlist or functional demo. Loop is labelled direction; illustrative project brief labelled.
- Author URL https://x.com/sshlg93 verified through the authenticated GitHub profile and its public
  https://github.com/sshlg page on this date. Only first name and user-requested builder role used.
- Humanization: on, own pass. Removed repeated mission sections; retained concrete account,
  project, availability and installation claims. This is a requested rewrite, not an authorship
  assessment. No unsourced adoption statistics, testimonial or delivery promise.

## Executed checks

- `npm run check`: PASS, brand lock (20 canonical / 27 exports / 7 aliases), 4 static pages,
  canonical metadata, single h1, no forced new tabs, internal anchors, shared tokens, release
  destinations, Worker host/query/no-store/404 behavior.
- Initial static check caught duplicate document markup after draft-generation retry; fixed before
  browser review. Recheck passed. No claim of a never-failing first pass.
- `npm run build`: PASS, 18 explicitly allowed entries; /fabric/ included, docs excluded.
- `python3 scripts/extract-public-copy.py --check`: PASS, 4 projections.
- Installed super-ux 0.56.2 `scripts/ux_lint.py`: PASS, consistent UX base.
- Installed super-ux 0.56.2 `scripts/brand_lint.py docs/brand --brief`: 0 errors / 219 advisory
  warnings. Initial proper-noun false error for Twitter resolved by registering Twitter as a
  proper name. Advisory markup/string-registry heuristics remain; not an all-warning-clean claim.
- `git diff --check`: PASS.
- `agent_updates.py check`: exit 0, no pending revision printed; no invented acknowledgement.

## Browser receipt

Source: Codex in-app browser, local Worker http://localhost:4183; English, dark PassionCode
system, normal motion setting; no new animation. Captured/reviewed 2026-09-26 around 19:20 UTC.
Revision: working tree shipped in this evidence file's implementation commit. Production source
and screenshots are recorded separately after deployment.

- 1280 × 800: homepage first CTA bounds y=565–615, visible without scrolling; width=1280 with
  scrollWidth=1280. Visual review covered hero, toolkit, pipeline, About and Fabric hero.
- 390 × 844: `/`, `/switchboard/`, `/fabric/`, `/design-system/` each reports scrollWidth=390;
  primary nav display=flex; 0 completed broken images. Homepage CTA visibly inside first screen.
- Homepage Download Switchboard click → `/switchboard/#download`; both platform cards expose
  version/architecture and signing/acceptance notes. No install success is claimed.
- About link scrolls to actual About copy; Follow on Twitter href equals the verified public URL.
- Keyboard Tab reaches Skip to content with solid 3px focus; Return navigates to `#main`.
- Local workerd crashed once on asset rebuild with SQLite IOERR; restarted with a task-specific
  `--persist-to /tmp/passioncode-story-preview-state`. Subsequent route/browser checks succeeded.
- These are scoped browser/DOM checks and visual judgments, not a WCAG conformance certification,
  full assistive-technology audit, native-device test or Twitter login/availability guarantee.

## Deliberate boundaries

No Switchboard binaries or release manifest changed. Existing beta limits still apply. No hosted
full CI dispatch. No Fabric private workspace publication needed: this iteration changes its public
explanation only. Current implementation/deployment and next review live in [HANDOFF](../HANDOFF.md).

## Post-merge convergence

Merged upstream c277b7b before deploy. Static check/build PASS for 5 pages / 21 public entries;
5 text projections PASS; UX consistent; brand 0 errors / 230 advisory warnings.
Observed 1280×800 homepage hero and Observatory card with its synthetic screenshot; at
390×844 the merged homepage has scrollWidth=390 and no main text/link/image outside the
viewport. Observatory has visible navigation, scrollWidth=390; Explore Observatory reaches
its page and Get started reaches its Python/source-install section. Existing beta warnings
and shared brand lock remain intact. Work-cycle observations do not imply automatic review
or a shipped integration between the three tools.

## Production and cold-checkout receipt

Exact source `72d7adabd049a97ea06d9db4da565aea916d5b21`, deployed 2026-09-26 19:28:12 UTC.
[HTTP receipt](../STORYTELLING_RECEIPT.json): 17 passing checks. Five HTML pages, CSS, sitemap
and both Observatory assets match local build bytes. Unchanged Switchboard archive integrity
remains evidenced by the earlier launch; this run rechecks redirect destinations and headers.

Fresh anonymous clone `/tmp/passioncode-story-fresh.s397dQ`: source 72d7ada; npm ci with
ignore-scripts, 0 vulnerabilities, npm check/build and 5 projections all PASS.

Production browser: all five routes loaded with expected h1 and no horizontal overflow at
1280×720. [Capture](site-storytelling-live.jpg): homepage, populated/static, English, PassionCode
dark, normal motion preference, Codex in-app browser, 2026-09-26 around 19:29 UTC, source
72d7ada; screenshot is 1280×720 JPEG. No full accessibility or native application claim.

Retro: preserved the original identity while replacing repeated mission copy with a reading
sequence. Exact-SHA guard exposed a concurrent Observatory merge before deployment; integrated
it and retained its stable scenario/screen identifiers. Next review is the headline and section
order; native product acceptance stays with the individual product owners. No automatic loop
created; the task-owned preview is stopped at handoff.
