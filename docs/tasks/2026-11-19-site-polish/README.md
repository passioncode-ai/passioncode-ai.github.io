# SITE-073 and SITE-074: a truthful verify-live and the home polish

Status: live since 2026-11-19 17:50 UTC. SITE-073: PR #174, squash `1eab1119`; SITE-074: PR #175, squash `13ab95d3`; Worker version `1f04c970-4995-4d3b-89e0-87f00c0cf4c6`. Backlog rows SITE-073, SITE-074.

## Order

The operator, 2026-11-19: «до конца» for the board rows the SITE-072 home audit left
(`docs/tasks/2026-11-19-home-assessment/README.md` section 1) and the false failures of `scripts/verify-live.py`
recorded there (`verify-live.json`, 105 rows). Course check: North Star section 9 (company assessment): the home is
the first step of a company's path, and a deploy check that cries wolf hides a real regression.

## 1. SITE-073: verify-live compares with what the Worker serves

| Cause of the 105 false rows | Fix |
| --- | --- |
| The Worker serves a newer release snapshot (Fabric 0.3.24 against `releases/current.json` 0.3.16); pages carrying `data-live` values and the download routes differ | The checker reads `GET /api/releases`, fails when it is below the committed floor (`worker/releases.js` `mergeSnapshots`, except a `hold`), and expects each page as the build rewritten with that snapshot through `worker/live.js` `rewriteSource` (`scripts/verify-live-expect.mjs`); routes are checked against the same snapshot, every committed platform included |
| Guide-only languages, held versions and the English-only digest have their own hreflang sets | Expected hreflang comes from `scripts/locales.mjs` `alternates` (scoped languages on their pages, none on a held version or the digest); `<html dir>` is checked for right-to-left pages |
| Cloudflare prepends its managed content-signal block to `robots.txt` | The block is tolerated; the lines after it must equal ours byte for byte; a managed `Disallow: /` for every crawler still fails |

Tests: `scripts/test_verify_live.py` (14), `scripts/verify-live-expect.test.mjs` (4), both in `npm test` and
`npm run check`. Live run against `origin/main` `89edceac` before the merge: PASS, 529 assets, 450 pages in 19
languages, 13 download routes, 0 failures. Docs: `docs/DEPLOYMENT.md` (the verify-live paragraph).

## 2. SITE-074: the audit's polish rows

| Audit row | Change | Where |
| --- | --- | --- |
| H-07 founders' photos | Sergey Sheleg's round portrait opens About (his own public portrait from sshlg.me, cropped to 240 px, 14 KB, `alt=""` because the paragraph beside it names him). Serge Khurs: no photo; it needs his consent and an asset (open, a human gate) | `index.html` #about, `assets/founder-sergey-sheleg.jpg`, `styles.css` `.founder-portrait`, `scripts/build-site.mjs` |
| H-10 agents diagram | Lighter agent boxes (`--surface-bright`), labels 16 px weight 500, side notes 14.5 px in `--ink-soft`, gold flow lines; below 900 px (where the drawing's text would fall under 12 px) the numbered list replaces it | `styles.css` SITE-074 block |
| H-11 phone video | Edge to edge at 620 px and below; no `playsinline`, so an iPhone plays it full screen (desktop browsers still play inline) | `index.html`, `styles.css`, `scripts/check-site.mjs` |
| L-04, L-05 Polish orphans | Registry `bindWords` (a, i, o, u, w, z): the space after a one-letter word becomes a no-break space in every text node of a Polish page, never in attributes or titles. The hero H1's «w» moved into its gold line, because that line starts on its own (`h1 em { display: block }`); the same move for es, fr, pt-br, whose white line ended on «en», «pour les», «para» | `i18n/locales.json`, `scripts/locales.mjs` `bindWords`, `i18n/{pl,es,fr,pt-br}/home.json` |
| L-08..L-10 CJK line starts | zh-hans: registry `bindParticles`; in headings and the display lines `PHRASE_CLASSES` names, the characters of each word (Intl.Segmenter) and a following particle are joined with WORD JOINER (U+2060), so a line breaks between words and never before 的. ja: the BudouX phrase breaks and `keep-all` now cover the hero's reframe line and the assessment card's labels (中央値, 計画 were split) | `scripts/locales.mjs` (`PHRASE_CLASSES`, `bindParticles`), `styles.css`, `scripts/extract-public-copy.py` (the record omits U+2060) |
| (found) zh assessment card | «60% 至 85%» was wider than the 132 px figure column and ran into its label | `.assess-facts > div` columns `minmax(132px, max-content) minmax(0, 1fr)` |

Copylot: the four changed H1 splits, checked as one heading per locale with voice `93cd4851` v1, role heading,
register web: pl `37a08f38-42c4-4017-9f0a-b7d1e2f4e9fd`, es `0002fd90-47db-4bd5-8655-d30e63417425`,
fr `8a0699a0-40b9-4695-88c5-1dd3e5115707`, pt-br `c21f4f8a-046c-40d6-a049-d04a0f293980`: no findings. The words are
unchanged (one word moved across the emphasis), so no new translation was needed.

## 3. Checks

- `npm run check`: exit 0 (locales tests 29, three of them new for SITE-074; check-site; display copy 448
  pages; public copy 448 projections).
- Local build served from `dist/`, Playwright WebKit (Safari's engine) at 1440 and 390 px (and 1000 px for the
  map): en (agents, about, video), pl, es, fr, zh-hans, ja heroes; no horizontal overflow on any.
- Second model (`google/gemini-3.1-pro-preview` through OpenRouter, key `passioncode-ai.github.io/prod/OPENROUTER_API_KEY`
  by `use_secret.py`, USD 0.07): PASS on the portrait, the map, the phone video, pl and fr headings, zh particles, ja
  labels. Its two FAILs, checked by hand: the zh card «collision» is a false reading (an 18 px gap; 一 reads as a dash
  next to 85%, zoomed crop); the es «para» at the end of a wrapped line is ordinary Spanish typesetting, which does
  not bind prepositions, so it is kept.
- Shots were working files, deleted after review (the disk had under 3 GB free).

## 4. Deploy and live evidence

- Deploy: `use_secret.py run --env prod passioncode-ai.github.io CLOUDFLARE_ACCOUNT_ID -- npm run deploy` from `main`
  `13ab95d3` (its `npm run check` and `npm run build` passed): Worker version `1f04c970-4995-4d3b-89e0-87f00c0cf4c6`.
- `python3 scripts/verify-live.py --output docs/tasks/2026-11-19-site-polish/verify-live.json`: PASS, 578 checks, 0
  failures: 530 assets, 450 pages in 19 languages, hreflang on 416, 13 download routes, 23 not-found addresses, the
  intake in dry-run mode; the edge served Fabric 0.3.24, Switchboard 0.7.122, Dashboards 0.8.217, Observatory 0.45.3
  against the committed 0.3.16, 0.7.22, 0.8.30, 0.34.0 ([receipt](verify-live.json)).
- Live readback (curl): the home carries the portrait (`/assets/founder-sergey-sheleg.jpg` 200, 14164 bytes) and no
  `playsinline`.
- Browser readback (Playwright WebKit on https://passioncode.ai): /pl/ at 390 px (gold line «w zespołach AI-native»),
  /zh-hans/ at 1440 px (智能体的 / 操作系统, the card's figure column wide enough), / About at 1440 px with the
  portrait, the video at 390 px edge to edge, /ja/ at 1440 px (中央値 and 計画 whole); no horizontal overflow. Shots
  deleted after review.

## Open

- Serge Khurs's photo in About: needs his consent and an image (a human gate).
- Native review of the moved H1 words joins SITE-071.
