# SITE-070: the release guide in 19 languages, the first unit of the content plan

Status: in review on branch `site/guides-assessment` (from `main` `f050b3b1`), 2026-11-19. Fabric task `6c4043eb`
(fabric-workspace board). Deploy is the operator's word: the site has real visitors.

## Order

The operator, 2026-11-19 (verbatim in backlog SITE-070): a guide «на основе этого», the story landing SITE-068, with
content in English, Russian, Spanish, German, Portuguese, French, Polish, Chinese, Korean, Arabic, Japanese, Turkish,
Bulgarian and Hindi, «и подумай еще какие добавить». Added: Italian, Ukrainian, Indonesian, Vietnamese, Dutch (the
founders' content strategy gives the reasons; Thai and Hebrew are candidates after the first four weeks' measurement).

Course check: North Star section 9 (company assessment); the free assessment week is the first step of a company's
path; serves the plan row «pages that sell to founders».

## What changed

| Part | Where |
|---|---|
| The guide (English source) | `scripts/site-content.mjs` `GUIDES` entry `why-releases-slip`, with its own date (`published`) |
| Per-item dates and `inLanguage` per language (N11, N4 of `seo-aeo-audit`) | `scripts/build-content-pages.mjs` `dated`; `scripts/locales.mjs` `localizeJsonLd` (an `Article` in English said `inLanguage: en` on every language's page) |
| Guide-only languages | `i18n/scoped-locales.json`; `scripts/pages.mjs` (`SCOPED_*`, `localesOfPage`); `scripts/locales.mjs` (names, tags, hreflang, switch, `dir`, links); `scripts/build-locale.mjs` (`buildScoped`, sitemap, `llms.txt`); `scripts/build-site.mjs`; `docs/DEPLOYMENT.md#guide-only-languages` |
| The button to Morpheus | `cta.href` `https://t.me/MorpheusPMBot?start=lp_guide-why-releases-slip_en`; the Russian page links `_ru` (`localizeUrl`, `BOT_START`), every other language `_en`, because the bot has lead texts in English and Russian only (passioncode-pm-agent `pm_agent/leads.py` `lang_of`, PM-D114) |
| Analytics | `cta_click` target `morpheus` (`worker/analytics.js` `TARGETS`, `docs/analytics/events.md`); nothing renamed |
| RTL | `styles.css`: the article list's padding is logical, the button arrow turns for `dir="rtl"` |
| Catalogs | 9 site languages: the guide, the hub card and the «More guides» lists; 9 scoped languages: the guide page with its header, footer and byline |
| Content record | `docs/content/why-releases-slip.meta.json`: per claim its source, per language the Copylot job, report id, judge score, cost and `native_review` |

## Decisions

- Guide-only languages live in their own registry, not in `i18n/locales.json`: adding nine languages to the whole site
  means translating every page, the form, the Worker's messages and the gate's checks, which the order did not ask.
- The pilot's figures are published as on the story landing: the company is never named, the sample and what is
  measured are on the page (section «Sources and method»), the operator can withdraw them with one word.
- Bulgarian: Copylot has no `bg-BG`; the adaptation ran under the `ru-RU` rules with a Bulgarian brief and waits first
  for the native check (SITE-071).

## Checks

Recorded in `docs/HANDOFF.md` for this run (the commands and their results).

## Open

- Deploy (`npm run deploy` from `main` after merge, then `scripts/verify-live.py`): the operator's word.
- SITE-071: native check per language, visual pass of the Arabic page.
- Indexing after the deploy: IndexNow, then SpeedyIndex for the 19 URLs (the content strategy, section 10).
