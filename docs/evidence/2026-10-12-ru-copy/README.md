# SITE-036 — Russian copy pass, 2026-10-12

Operator request (2026-10-12): review all Russian copy on the site, the Fabric page first.
Only the Russian catalogs in `i18n/ru/` changed (English is the source and the key); every `/ru/` page,
`ru/business/agent-request.txt`, `worker/i18n.js` and `assets/i18n.js` were regenerated with `npm run locales`.

## What changed

340 of 1385 catalog strings (25%), per catalog:

| Catalog | Changed / total |
|---|---|
| home | 51 / 134 |
| business | 40 / 129 |
| inbox | 37 / 123 |
| switchboard | 36 / 121 |
| fabric | 34 / 105 |
| dashboards | 30 / 90 |
| observatory | 29 / 98 |
| vision | 22 / 71 |
| fabric-agents | 19 / 119 |
| start | 15 / 74 |
| design-system | 7 / 50 |
| switchboard-release | 7 / 34 |
| privacy | 5 / 32 (language only; the legal meaning is unchanged) |
| _common, _scripts, 404, switchboard-agents | 2 each |
| business-thanks, _checks | 0 |

Categories: calques and English syntax; mixed English where Russian exists («AI-native», «синтетические
демо-данные» → «вымышленные данные»/«демо-данные», «написанный пример» → «пример, составленный вручную»);
dangling pronouns («Он не привязан…» → «PassionCode.ai не привязан…»); bureaucratic and nominal style;
dashes used as asides (Russian brand-lint B062: 11 → 2 on Russian pages; the two left are a protected
disclosure on /ru/observatory/ and legal text on /ru/privacy/); in-app names now as the products' own Russian
interfaces write them (Inbox, Dashboards, Switchboard, Fabric dictionaries). Every disclosure in
`i18n/ru/_checks.json` is unchanged and still on its page. No fact, number, URL, anchor or product name changed.

The Russian hero changed from «Операционная система для любых агентов в AI-native командах» to
«Операционная система для команд с любыми ИИ-агентами»: it keeps "any agents" (SITE-021) and says "AI-native
teams" in Russian. WebKit measures the same line count as before: 5 lines at 1440 px, 4 at 1280, 5 at 390 and 320.
The facts row *homepage hero* and narrative §1 carry it. /ru/vision/ (1440 px) and /ru/business/ (390 px) headings
are one line longer than before.

Not changed: `assets/video/home-ru.vtt`, which transcribes the Russian narration of `home-ru.mp4` and must match
the audio.

## Checks (2026-10-12, branch `agent/ru-copy-pass`)

- `npm run check` exit 0 (brand lock, locales gate, tests, site structure, Worker, design tokens, display copy,
  copy projections).
- `python3 scripts/extract-public-copy.py --check` exit 0; `npm run build` exit 0 (224 entries).
- super-ux `brand_lint.py docs/brand`: exit 2 both before and after (182 errors after, 194 on `main`; the rest are
  in other languages, missing locale files B070 and numbers without facts rows B030, unchanged). B063 (title
  punctuation): 0 findings.
- WebKit (Playwright 1.64.0) over the built `dist/`, 14 Russian routes (including `/ru/404.html`) at 1280 and 390 px: all 200 with
  `lang="ru"`, no page errors, no "AI-native"/"Synthetic"/"demo data" left in visible text
  ([webkit.json](webkit.json)). Two 390 px pages overflow by one long h1 word, as they did on `main` (SITE-037).

## Production (2026-10-12)

PR #114 merged as `3100046`, then PR #115 (`38a6623`, `npm run releases:sync`: launcher 0.1.37 → 0.1.39, adapter
0.13.0 → 0.15.0). The first deploy, Worker `23a9be64-7c44-4b49-9ff1-a126c98ca9f4`, failed `verify-live.py` on home
and /start/ in every language only because the live rewriter already served launcher 0.1.39. Deployed again from
`main` as Worker `44c232ef-e2ab-4955-b65e-dfa3fb4b2841`: `scripts/verify-live.py` PASS (224 assets, 150 pages,
hreflang on 130, 7 download routes, 23 not-found addresses, intake dry run; [live.json](live.json)). Live WebKit
over https://passioncode.ai, 14 Russian routes at 1280 and 390 px: 200 (404 for the unknown address, which shows the
Russian not-found page), `lang="ru"` and no page errors on all 28; the two SITE-037 overflows remain
([webkit-live.json](webkit-live.json)).
