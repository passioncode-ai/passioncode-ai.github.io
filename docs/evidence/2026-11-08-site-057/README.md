# SITE-057: no em dash in the site's public text (2026-11-08)

Backlog row SITE-057 (found in SITE-056) and the operator's rule for every text people read: no em dash (U+2014) and
no substitute for one (two hyphens, a hyphen or an en dash with a space on each side between words), in any language.
Each one is rewritten with a full stop, comma, colon or parentheses, in the source the locale build reads. Code, URLs,
quotations and the home video are untouched.

## What changed (branch `fix/site-057-em-dashes`)

- English sources: `index.html`, `business/index.html`, `fabric/index.html`, `privacy/index.html`,
  `switchboard/index.html` (12 strings), `assets/messages.js` and `worker/messages.js` (form messages and the receipt
  subject), `llms.txt` (three passages) and the line `scripts/build-locale.mjs` writes into `llms.txt`'s languages
  section. Every English key that changed is renamed in all nine catalogs.
- Catalogs `i18n/<locale>/*.json`: every translated string with a dash rewritten natively. German carried spaced en
  dashes as its dash (Gedankenstrich), counted as a substitute and rewritten too. Japanese and Chinese take a
  full-width colon, French a no-break space before the colon. Russian keeps its no-break spaces after short words.
  `i18n/ru/_checks.json` follows the two disclosures it pins (dashboards 0.3.1, Observatory 0.8.2 to 0.9.1).
- The generated pages, `assets/i18n.js`, `worker/i18n.js`, `llms.txt` and `docs/brand/copy/` regenerated with
  `npm run locales` and `python3 scripts/extract-public-copy.py`.
- The gate: `scripts/public-dashes.mjs` (what counts as read, the rules and the allowlist in its header), wired into
  `scripts/check-site.mjs`; `scripts/public-dashes.test.mjs` (6 tests) in `npm run check` and `npm test`.
  `scripts/check-worker.mjs` asserts the new receipt subject and expired-form message.
- Brand pack: `docs/brand/README.md` section *Dashes in public text*; the Russian form of the D-T5 term is now
  «Fabric, дом для ваших проектов и их агентов» in `terminology.md`, `narrative.md` and `facts.md` (row *CEO name and
  status*).

## Counts

Dash findings on the 410 committed pages at `origin/main` `8c517867` (text nodes, alt, title, aria-label, description
and Open Graph meta, JSON-LD strings), measured with `readableParts` + `dashFindings` from `scripts/public-dashes.mjs`
over `git show origin/main:<page>`: 316 in total, 248 em dashes and 68 spaced en dashes. After the change: 0.

| Locale | Findings on pages before | Source strings rewritten |
|---|---|---|
| en | 7 | 12 page and message strings, 3 `llms.txt` passages, 1 generator line |
| ru | 119 | 96 |
| de | 68 (all spaced en dashes) | 30 |
| pl | 58 (41 of them the header label «PassionCode.ai — strona główna») | 22 |
| pt-br | 48 (41 of them the header label «PassionCode.ai — página inicial») | 10 |
| fr | 4 | 5 |
| ko | 4 | 5 |
| zh-hans | 4 | 4 |
| ja | 3 | 4 |
| es | 1 | 2 |

The backlog row counted `<locale>/index.html` only (ru 16, pl 3, pt-br 2, en, fr, ko, es, ja 1 each); the sweep over
every page, the catalogs, the browser and Worker messages and `llms.txt` found the rest, including the German header
label «PassionCode.ai – Startseite» on 41 pages. A page finding counts each place a reader meets it, so one catalog
string can account for several findings (visible text plus its JSON-LD or meta copy).

## Copylot

`copylot_check`, voice `041b4138-44be-4b00-b17d-7d9a7b13ab98` version 1, register `web`, every changed string of each
locale in one report. No model, no spend.

| Locale | Report | `no-em-dash` | Blocking | Notes |
|---|---|---|---|---|
| en-US | `0f1df055-b138-4ece-8b17-1ee988e5dde9` | pass | none | score 100; one advisory `web-unsourced-percent` on the existing estimate formula in `llms.txt` |
| ru-RU | `d9faf19c-de54-4f1b-8350-846c253990b9` | pass | none | score 100, address formal pass; advisories: no-break spaces (the paste carried plain spaces; see SITE-059), AGPL in capitals, existing percentages |
| de-DE | `7e66840f-62b7-42be-9d3f-7dd23fd63501` | pass | none | no findings, address informal pass |
| pl-PL | `942f4184-54fd-435f-bc22-c0861b320f93` | pass | none | no findings |
| pt-BR | `cae3f106-c38d-45eb-bc4c-787e6d0f5992` | pass | none | no findings |
| fr-FR | `8b8e9e63-a043-4c48-90aa-9b6eb2d8b8fa` | pass | none | spacing advisories come from the paste; the catalogs carry U+00A0 before the colons and U+202F before the semicolons |
| es-ES | `ccd1c94f-aa33-4832-a9e6-0c3d0a2d1f48` | pass | none | no findings |
| ko-KR | `619042f8-7af4-4704-a3b8-b67b2c64231b` | pass | none | no findings |
| ja-JP | `d779f15a-7ed1-468b-ab70-7ab587367333` | pass | none | no findings |
| zh-Hans-CN | `9abdf746-274f-49c8-bd50-7b8a7b1902d5` | pass | none | no findings |

Two sentences were reworded after a first read and before their reports, which check the final text: German
(business, «… was er geliefert hat. Alles läuft auf Open-Source-Tools …») and Polish (fabric, «Pracujemy nad tym, by
narzędzia można było wybierać i instalować bez wychodzenia z Fabric.»).

## Checks run

- `npm run check`: exit 0, 136 tests pass, `PASS: no em dash or substitute in public text, 813 files`.
- `npm run locales`: PASS, 10 languages, 41 pages each.
- `python3 scripts/extract-public-copy.py`: PASS, 410 projections.
- `npm run build`: PASS, 485 public entries in `dist/`.
- `grep -rn "$(printf '\342\200\224')" dist --include='*.html' --include='*.txt' --include='*.xml'`: no output. The
  only U+2014 left in `dist/` are code comments in `styles.css` and the `assets/*.js` region headers, which the
  allowlist names.
- Planted regression: `node --test scripts/public-dashes.test.mjs` (em dash as a character and as `&mdash;` and
  numeric entities, the three substitutes, alt, aria-label, meta and JSON-LD; code, scripts, styles, SVG, templates,
  comments, ranges and hyphenated words allowed).
- Not deployed: a merge deploys nothing (`docs/DEPLOYMENT.md`).
