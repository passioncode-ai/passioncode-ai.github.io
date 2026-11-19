# SITE-072: the home leads into the free assessment

Status: live since 2026-11-19 12:37 UTC (PR #170, squash `0a5d3b00`; Worker version `3add768c-2955-46f3-9014-8e868b6014ec`). Backlog SITE-072.

## Order

The operator, 2026-11-19 (verbatim): «делай все до конца и лендинг главный причеши нормально чтобы был и к ассессменты
подходил и аналитику всю добавить и лидов в наш го ту маркет агента собирать». This unit is the home and its analytics;
the leads into the go-to-market deal desk are another agent's unit.

Course check: North Star section 9 (company assessment), the first step of a company's path; the content strategy's one
metric is a request through Morpheus from content (go-to-market-strategy `strategy/content-marketing.md` section 1).

## 1. Audit of the live home before the change

Shots of https://passioncode.ai/ in all ten languages at 1440 px and 390 px, taken with CDP (the headless Chrome at
127.0.0.1:9222), reviewed by a second vision model (OpenRouter `google/gemini-3.1-pro-preview`, two runs, USD 0.07 and
USD 0.15, key `passioncode-ai.github.io/prod/OPENROUTER_API_KEY` through `use_secret.py`), then checked by hand. The
shots were working files and are not kept (the disk was below 1 GB during the work).

| ID | Severity | Where | Finding | Verdict and what changed |
| --- | --- | --- | --- | --- |
| H-01 | blocker | hero, every language | The page never mentions the assessment: a founder whose release slips finds no entry | Fixed: the hero's first button «Get the free assessment», a proof card beside it, section 01 / THE ASSESSMENT, the founders' door, a FAQ entry, the header item |
| H-02 | blocker | hero CTAs | «For your organization» and «For you, free» do not say what happens next | Fixed for the first one (the assessment, which ends in Morpheus); «For you, free» stays (the personal path, SITE-045 D1) |
| H-03 | blocker (reported) | 03 / Fabric | A large empty box under the heading | Not a defect of the page: `fabric-board.jpg` is `loading="lazy"` and was not loaded in a beyond-viewport capture; it answers 200 (158 KB) and shows on scroll |
| H-04 | blocker | numbering | Sections ran 01 to 07, then restarted at 04 / THE TOOLS, 05, 06 | Fixed: 01 to 11 in order; `scripts/check-site.mjs` now asserts the whole count |
| H-05 | major | hero visual | The glowing orbit of tool icons reads as a generic AI-product picture | Fixed: replaced by the assessment card, a flat panel whose figures carry it |
| H-06 | major | 07 / doors | Four audiences dilute the founders' path | Partly: the founders' door now starts the assessment; the other three doors stay (investors, engineers and solo founders are real readers, SCN-024) |
| H-07 | major | about | A long wall of text, no faces | Board row, not this unit: photos need the founders' consent and assets |
| H-08 | major | tools, open source | Developer sections far from a founder's question | Kept: they serve engineers and solo founders and are now after the founders' path; the site describes the final product |
| H-09 | minor | 04 / one system | «AVAILABLE NOW, IN PART» sounds unfinished | Kept on purpose: labelling every claim is a brand rule (voice v3, "never sell direction as a release") |
| H-10 | minor | agents diagram | Dark boxes, small text on desktop | Board row |
| H-11 | minor | video on a phone | Small player | Board row |
| L-01..L-07 | major | phone header, ru de fr es pt-br | The navigation row is cut at the right edge | Kept: the row scrolls sideways and fades by design (SCR-01, SITE-039); the new first item «Free assessment» is the one always visible |
| L-04, L-05 | minor | pl hero | «w» left at the end of a line in the H1 | Board row (Polish orphan prepositions, a typography pass over the catalog) |
| L-08..L-10 | minor | zh-hans, ja hero | A particle starting a line | Board row (`word-break: keep-all` or phrase marks for zh-hans, as ja has `phraseBreaks`) |

## 2. What changed

| Part | Where |
| --- | --- |
| Hero: first button to the assessment; the assessment card (figures, source line, Morpheus, the guide) in place of the workplace map | `index.html`, `styles.css` (SITE-072 block) |
| Section 01 / THE ASSESSMENT after the video: three findings, the week in three steps, two buttons, the note, the guide and the form | `index.html` `#assessment` |
| Sections renumbered 01 to 11 | `index.html`, every catalog's labels |
| The founders' door starts the assessment and keeps «Or bring your organization» to /business/ | `index.html` `#doors` |
| FAQ «What is the free assessment?» with its FAQPage entry | `index.html` |
| The header's first item «Free assessment» on every page in 19 languages | the hand-written pages, `vision/index.html` (source of the generated pages' header), `scripts/check-site.mjs` `PRIMARY_NAV` |
| The assessment link opens in the page's language; Morpheus's tail is the page's language where the bot has lead texts | `scripts/locales.mjs` (`ASSESSMENT`, `BOT_LANGS`), `scripts/locales.test.mjs` |
| Analytics: `cta_click` targets `assessment`, `guide`; locations `assessment`, `digest`; a test that every `data-cta` and `data-cta-location` of an English page is a value the Worker accepts | `worker/analytics.js`, `scripts/check-analytics.mjs`, `docs/analytics/events.md` |
| Brand and UX record | `docs/brand/facts.md` (row *home and the free assessment*), `docs/ux/scenarios.md` (SCN-029, SCN-001, SCN-024), `docs/ux/flows.md` (FLW-08), `docs/ux/screens.md` (SCR-01), `docs/backlog.md` (SITE-072) |

## 3. Decisions

- D1. The H1, the line under it and the subline stay (SITE-045 D1 and SITE-049 D2, asserted by `check-site.mjs`); the
  second model proposed replacing the H1 with the release question. The assessment takes the first button, the card
  and the first section instead, so the brand line and the founders' entry share the first screen.
- D2. The header keeps its one door «Set up» (SITE-045) and gains «Free assessment» as the navigation's first item on
  every page: one consistent entry in every language without crowding the phone header.
- D3. No new event: a click into the assessment, the bot, the guide or the form means what `cta_click` means; new
  values only (events rule: a new meaning gets a new event, the same meaning a new value).
- D4. The bot's start tail follows the page's language where the bot has texts (es, de, pt, fr, ja, ko besides ru and
  en), read from passioncode-pm-agent `pm_agent/lead_texts.py` on main; the guide's pages take it too.
- D5. Translations: Copylot `copylot_prepare` per language (voice `93cd4851` v1, writer `anthropic/claude-sonnet-5.5`).
  Where the judge scored the JSON form below 70 (its typography patches broke the JSON quotes), the agent accepted the
  variant and applied the judge's own meaning fixes; every language then passed `copylot_check` with nothing blocking.
- D6. The figures are the pilot's as the guide states them; the site describes the final product, so the assessment
  is offered as a product step (ON REQUEST), not a beta note. Compliance metadata: the figures come from one pilot
  company, never named; the claim is a lead time median, not a saving.

## 4. Translations and Copylot record

`translations/<locale>.json` hold the 37 strings per language as delivered by Copylot (with the fixes named in
`translations/jobs.json`); `translations/keys.json` is the English source order; `translations/scoped.json` the header
item in the nine guide-only languages.

| Locale | Job | Score | Check reports (37 strings, nothing blocking) |
| --- | --- | --- | --- |
| en | (source) | | `8fb0c1ff…` to `8d40ca46…` (32 strings, score 100 each) |
| ru | `job_c84da013d44b2568f5fa2a73` | 57, fixed | `b4e58239…` to `aba81d3b…` |
| de | `job_9de71e438bafc304ca937fff` | 91 | `1f61c211…` to `ea361961…` |
| fr | `job_68abf13ae98b31ebde0cb863` | 92 | `9f4423d7…` to `de7a515e…` |
| pl | `job_702b9fc93e3a8c59ed62c6b9` | 60, fixed | `07f66c10…` to `3b30aa08…` |
| ko | `job_fdff7cab7af6ad4494861167` | 82 | `69b1bfe8…` to `694d47f6…` |
| es | `job_d8a0049095d0d5b463961004` | 62, fixed | `cc3d0045…` to `b8ba4620…` |
| pt-br | `job_1c5c724ab327059fd2692103` | 61, fixed | `9ce4b4c2…` to `f1d9d2eb…` |
| zh-hans | `job_180ba0adbd29bb74b914e630` | repaired, accepted | `abcef92e…` to `0be9fbaa…` |
| ja | `job_be664f5833db389739635e95` | 63, fixed | `100e847d…` to `7dfe867f…` |

Copylot spend for this unit: about USD 2.1 (nine page jobs at USD 0.10 to 0.26 each, nine header-item jobs at about
USD 0.02 to 0.04 each). Native review: none yet (SITE-071 covers the guide; this unit adds its strings to that pass).

## 5. Checks

- `npm run check`: exit 0 (138 node tests, check-site over 420 pages plus 9 guide-only, display copy 429 pages, public
  copy 429 projections, no em dash in 832 files).
- `npm run build`: 509 entries; a local static serve of `dist/` shot at 1440 and 390 px in en, ru, de, fr: no
  horizontal overflow on any; a second-model review of the result (`google/gemini-3.1-pro-preview`, USD 0.06) found
  no blocker; its door-card spacing note was fixed (`.path-card .button + .text-link`), the rest are recorded above.
- Deploy, live readback and the analytics readback: section 6.

## 6. Deploy and live evidence

- Merge: PR https://github.com/passioncode-ai/passioncode-ai.github.io/pull/170, squash `0a5d3b00` on `main`.
- Deploy: `use_secret.py run --env prod passioncode-ai.github.io CLOUDFLARE_ACCOUNT_ID -- npm run deploy` from `main`
  `0a5d3b00`: `npm run check` and `npm run build` inside it passed; 422 files uploaded; Worker version
  `3add768c-2955-46f3-9014-8e868b6014ec` (`wrangler deployments list`, 2026-11-19T12:37:21Z).
- Live links, read with curl: `/` → `assessment.passioncode.ai/?lang=en` and `lp_home_en`; `/ru/` → `?lang=ru`,
  `lp_home_ru`; `/de/` → `?lang=de`, `lp_home_de`; `/ja/` → `?lang=ja`, `lp_home_ja`; `/es/guides/why-releases-slip/`
  → `lp_guide-why-releases-slip_es`; `/business/` carries the header item.
- Live home equals the build except the live version values the Worker writes (diff of `dist/index.html` and the
  served page with versions masked: no difference).
- Browser readback (CDP headless Chrome, reduced motion) of the live home in en and ru at 1440 and 390 px: the header
  item, the hero button and card, #assessment; no horizontal overflow.
- `scripts/verify-live.py --output verify-live.json`: FAIL with 105 rows, none caused by this change, recorded as
  SITE-073: download routes answer the Worker's newer live snapshot (Fabric 0.3.24 against `fabric/release.json`
  0.3.16, the same for Observatory), pages with live version values hash differently for the same reason, the guide's
  nine guide-only languages and the digest carry hreflang sets the script does not know (SITE-070, SITE-068A), and
  Cloudflare prepends its managed content signals to `robots.txt`.
- Analytics in growth (`growth.analytics.events.list`, app `passioncode-site`, production, 12:37 to 13:30 UTC, as of
  12:43:12Z): `cta_click` 3 with `location` hero, header, assessment, `target` assessment and morpheus, `lang` en, ru,
  de; `page_view` 7 on home. These are the agent's own checks (three clicks through CDP on `/`, `/ru/`, `/de/`, links
  not followed), not visitors.

## Open

- Board rows from the audit: H-07 (founders' photos), H-10 (agents diagram legibility), H-11 (phone video), L-04/L-05
  (Polish orphans), L-08..L-10 (CJK line breaks).
- Native review of the new strings joins SITE-071.
