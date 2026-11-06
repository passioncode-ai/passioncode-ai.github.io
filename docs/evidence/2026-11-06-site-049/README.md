# SITE-049: the site on the North Star, the workplace for AI-native organizations (2026-11-06)

Brief: [docs/tasks/2026-11-06-ai-native-org.md](../../tasks/2026-11-06-ai-native-org.md); design:
[docs/tasks/2026-11-06-ai-native-org-design.md](../../tasks/2026-11-06-ai-native-org-design.md). Source of the
story: fabric-workspace `knowledge/north-star.md` at `6b7cd777`.

## What changed

- **Home** (`index.html`, ten languages through `i18n/<loc>/home.json`): the header stays (D2); under it the story in
  seven sections: `#problem` (processes built for people, with the McKinsey and Gartner sources), `#shift` (today
  against AI-native; people as direction, control and expertise), `#fabric-process` (Fabric keeps the board, routes,
  wakes the owner, sets priorities, answers to management), `#system` (one contract, one vault, one record, a
  dashboard for every agent, each with its status), `#agents` (the agentic company as a diagram, a list on phones,
  and three loops), `#grow` (one machine, the organization's own device, clone it, run it with us), `#doors` (four
  ways in: founders and executives, investors, engineers, solo founders). Two FAQ entries (does this replace my
  team; where the agents and data live), also in FAQPage JSON-LD. Legacy anchors kept.
- **/business/**: the Enterprise list gains access by level, a base set of agents from day one and administration by
  PassionCode on request. **/vision/**: what we measure (the North Star metric). **/privacy/**: the cookie-free site
  analytics, its fields, the visitor-of-the-day number and the legal basis. `llms.txt` and the facts rows follow.
- **Analytics** (agreed with the analytics agent and growth on board thread `90a63b21`): `POST /api/e` in the Worker
  (`worker/analytics.js`), a visitor-of-the-day id from a daily salt in D1 (`migrations/0004_analytics_salt.sql`,
  deleted by the cron the next day), nothing on the device, DNT and GPC honoured; the page half in
  `assets/analytics.js` and `assets/business.js`; the catalogue with `file:line` in
  [docs/analytics/events.md](../../analytics/events.md).
- **UX chain**: personas P-03 and P-04, SCN-001 rewritten, SCN-023, SCN-024, FLW-08, the SCR-01 reading order.
- **Copy and languages**: English deck checked by Copylot (`30a539a1`, 100); every language checked by Copylot and
  the fixes applied; the record of which strings Copylot adapted and which were translated by hand is in the brief,
  "Translation and copy check record". French spacing normalised site-wide.

## Checks

- `npm run check`: exit 0 (site, Worker, analytics 12 tests, locales, copy projections, disclosures per language).
- `npm run build`: 225 entries.
- `python3 ~/.claude/plugins/cache/super-ux/super-ux/0.66.1/scripts/ux_lint.py docs/ux`: 0 errors.
- WebKit (Playwright webkit) on the local Worker (`npx wrangler dev --port 4199 --local-protocol https`), the home
  page in 10 languages at 390, 768 and 1440 px: no horizontal overflow, nothing in `main` past the edge, the seven
  story sections in order, four doors, one H1, the diagram as SVG on wide screens and as a list on phones, no page
  error: PASS 30 of 30 ([webkit.json](webkit.json), [webkit-check.mjs](webkit-check.mjs)).
- Analytics on the local Worker, `/ru/`: `page_view` and `command_copy` sent with `page: home`, `lang: ru`; DNT
  answers 204 and sends nothing (run ledger, stage 5).
- SEO basics in 10 languages from `dist/`: one H1, canonical, 20 hreflang links, valid JSON-LD, the five FAQ
  questions visible on the page.
- [contact-sheet.jpg](contact-sheet.jpg): every section at 1440 (en, ja) and 390 (en, ru), header made static for
  the capture.

## Not in this change

- The new home video (D3): Asset Foundry is disconnected in this session; the current video stays until the new one
  passes (risk R1). Row SITE-050.
- The install command breaks mid-word in the narrow door card at 390 px and in the Japanese cards: row SITE-051.
- Source release versions lag the releases (the Worker serves the live ones): row SITE-052.
- The Japanese H1 breaks inside オペレーティングシステム at 1440 px (the header is kept, D2): row SITE-053.
