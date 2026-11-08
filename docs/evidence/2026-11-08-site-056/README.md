# SITE-056: agent templates, guides and blog (2026-11-08)

Operator, 2026-11-08 (paraphrased from Russian): an agents marketplace on the site with our agent templates, without
details, one page per template and one general page; guides and a blog; a proper sitemap; an SEO pass; then indexing.
The home video is not touched.

## What shipped (branch `feat/agents-marketplace`)

- `/agents/` and 18 template pages, `/guides/` and 3 guides, `/blog/` and 2 posts: 26 English pages rendered by
  `scripts/build-content-pages.mjs` from `scripts/site-content.mjs`, 260 pages in ten languages.
- Footer links (Agent templates, Guides, Blog) on every page; the home story (#agents) links `/agents/`.
- Analytics: page values, `cta_click` locations and targets, the new event `template_request`
  (`docs/analytics/events.md`).
- `sitemap.xml` (390 addresses, 260 new), `llms.txt` sections, the SEO brief `docs/seo/brief-2026-11-08.md`,
  SCN-025 to SCN-028, FLW-09, SCR-14 to SCR-17, facts rows *agent templates (SITE-056)* and *free assessment*.

## Copy and translations

English written in our own words from the template library's purposes (no source agent, organization, prompt, code,
stack or test count). Translations: nine translation agents of this session, one per language, reusing each language's
existing catalogs, then `npm run locales`. Copylot was used for checks only (`copylot_check`, voice
`041b4138-44be-4b00-b17d-7d9a7b13ab98` v1, register web); `copylot_prepare` was not used, spend USD 0.

| Locale | Copylot reports | Result |
|---|---|---|
| en-US | `5e0759d7-89eb-43aa-aa23-2dc40ae9a69a`, `f25e6469-3a47-4054-8236-29627a8ad620` | score 100 and 91.9, nothing blocking; two rule-of-three advisories fixed |
| ru-RU | `d4c6e8e3-10b4-4da2-a1b0-34a30f89cb9e`, `828f9a59-0ae8-4bff-bed8-e17d98f440c2`, `0ba87f36-83d6-4bfb-968f-333c69bb1e2e`, `253c333d-a428-47dd-aa9e-2ed523c0b158` | score 100, 100, 80.8, 98.9; nothing blocking |
| de-DE | `e94d76df-da42-4151-9957-a675cd92bc21`, `18f3e2ad-d339-4c53-b52d-5d7b64de34e9` | nothing blocking |
| fr-FR | `a8d31e92-3e35-4fb5-bb69-7de2eed973a3`, `48737cee-c8d5-43a9-b088-26e27480d752` | nothing blocking; spacing advisories come from the plain-text paste, the catalogs carry U+00A0 and U+202F |
| pl-PL | `7b91b6d6-64f1-4017-96b0-f60214b29657`, `eb1bcd20-cac3-489d-b8f2-252ed84d2c78` | nothing blocking |
| ko-KR | `933724a8-b443-4e51-9e54-2f886dfd0191`, `5066b835-0ade-4fd3-a73d-f16cf4dca888` | nothing blocking |
| es-ES | `470ebe35-452d-462d-9b87-292c3318857e`, `772b120b-4fc4-4cf1-8e45-d27280f81218` | nothing blocking |
| pt-BR | `2255db59-b557-426b-8ef6-8457c9fd4524`, `241c47d6-38ea-4947-aadb-86f2734cffda` | nothing blocking |
| zh-Hans-CN | `71f8a62a-f6f0-4542-85e0-01be69995801`, `7ebec8f4-294b-4ead-9856-66fc2fbe89ce`, `975e5618-0346-4f8d-a67d-35fb950cf15c` | nothing blocking; 第一 flagged as an ordinal |
| ja-JP | `ee621573-ba72-4b96-91a4-a32cf39e88fc`, `2cc53b20-08e2-4bf9-bd8e-3a99cc58226e` | nothing blocking |

The one advisory every language shares, `web-unsourced-percent` on "40%", is the Gartner sentence; the page links its
source beside it.

## Checks run

- `npm run check`: exit 0 (130 tests; check-site PASS for 410 static pages and the SITE-056 block; display copy 410
  pages; projections 410).
- `npm run locales`: PASS, 10 languages, 41 pages each.
- `python3 scripts/extract-public-copy.py`: PASS, 410 projections.
- `npm run build`: PASS, 485 public entries.
- WebKit (Playwright 1.64.1, WebKit 2370) over a local static server: 162 loads (26 English pages plus six pages in each
  of nine languages, at 1440 and 390 px), 0 with a status other than 200, horizontal overflow, an element wider than the
  screen or a page error ([webkit.json](webkit.json), captures in this folder). The Playwright named in the brief
  (fabric-dashboards, WebKit 2359) has no installed browser on this machine.
- Private names: `scripts/check-site.mjs` fails on any of the brief's private names in the 260 new pages; the diff adds
  none outside that guard.

## SEO audit after the build

`seo-aeo-audit` 0.32.4 `page_audit.py --file dist/<page>` on twelve built pages ([seo-page-audit.json](seo-page-audit.json)):

| Finding | Pages | Action |
|---|---|---|
| title and description length, canonical, hreflang, JSON-LD | all | none: no finding |
| `low-extractable-text` (blog post "What an AI-native organization is", first run) | 1 | fixed: two sections added (what it is not; where agents and data live); no finding after |
| `faq-collapsed` (`/agents/`) | 1 | answers now render open (`details open`); the finding still counts `<details>` elements, the language menu included; kept |
| `read-budget` (FIELD tier) | most | not changed: the share is spent on the site-wide header and its language menu, which the operator keeps (D2); SITE-058 |
| `link-count` 60 (`/agents/`, FIELD tier) | 1 | kept: 18 template links are the page's content |
| `low-extractable-text` on the hubs and the shorter posts | 5 | kept: hubs answer "which guides", judged on task completion; SITE-058 |

## Not done here

Deploy (the operator's) and indexing (the coordinator's, after the deploy).
