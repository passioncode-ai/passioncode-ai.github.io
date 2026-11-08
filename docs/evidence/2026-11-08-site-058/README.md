# SITE-058: the read budget of the kept header, and the thin guide and blog hubs (2026-11-08)

Backlog row: [SITE-058](../../backlog.md). Found in SITE-056's audit
([seo-page-audit.json](../2026-11-08-site-056/seo-page-audit.json)). The operator's decision D2 stands: the site header
is unchanged.

## What changed

1. **The hubs say what they are for.** `/guides/` and `/blog/` (and their nine translations) now open with a lead
   (what the section is for and whom it helps), a «Where to start» list (two lines on `/guides/`, three on `/blog/`)
   and, on `/blog/`, the author's byline. Every card keeps its date, title and lead, and adds one line on whom the item
   helps and the item's own sections («In this guide», «In this article»), taken from its `<h2>` headings as plain text,
   so the cards add words to quote, not link markers. Source: `scripts/build-content-pages.mjs:171` (`topics`, `hub`),
   `summary` per guide and post in `scripts/site-content.mjs`, styles at `styles.css:1259` (existing tokens only).
   Facts used: the guides' and posts' own pages and leads, facts rows *free assessment* and *founders*
   ([facts.md](../../brand/facts.md)); no new claim.
2. **Header and machines.** Nothing changed, and nothing needs to: every page already opens with a skip link to the
   content (`vision/index.html:39`, `<a class="skip-link" href="#main">`), and `<main id="main">` follows the header
   directly; the content pages take that header byte for byte (`scripts/build-content-pages.mjs:16`). Measured with the
   auditor's own read model (its parser, counted per region, `page_audit.py` 0.26.5 code):

   | Page | Header (text + link markers) | Language menu inside it | Main | Footer | Whole page |
   |---|---|---|---|---|---|
   | `/guides/` | 8 + 380 | 206 | 1,798 + 219 | 35 + 519 | 2,959 |
   | `/blog/` | 8 + 362 | 188 | 1,304 + 185 | 35 + 519 | 2,413 |
   | `/agents/` | 8 + 380 | 206 | 4,864 + 1,356 | 35 + 519 | 7,162 |
   | `/ru/guides/` | 8 + 411 | 203 | 2,094 + 254 | 32 + 607 | 3,406 |
   | `/ru/blog/` | 8 + 393 | 185 | 1,430 + 214 | 32 + 607 | 2,684 |

   The header costs about 390 of the 5,700 characters (7 %), the language list about 200 (3.6 %). The row's "about half"
   was true only on the hubs, which were shorter than the window, so the header and the 23 footer links outweighed their
   content. Moving the language list out of the header's source order would change the header's markup (D2) for 3.6 %
   of the window, so it stays; the fix is content, item 1.
3. **Other findings.** `faq-collapsed` on `/agents/`: the auditor counts every `<details>`, and the only closed one is
   the header's language menu (the four answers render `open` since SITE-056); kept, header D2. `link-count` 60 on
   `/agents/`: the 18 template links are the page's content; kept. `low-extractable-text` on `/blog/` (230 words, two
   posts): kept, the hub is judged on task completion, and a third post adds more than any padding would.

## SEO audit, before and after

`seo-aeo-audit` `page_audit.py` (`--file dist/<page> --base-url https://passioncode.ai/<page>`) on the built pages, at
`origin/main` `e7a2ed25` (before) and on this branch (after): [page-audit-before.json](page-audit-before.json),
[page-audit-after.json](page-audit-after.json).

| Page | Words before → after | Content share of the read before → after | Findings before | Findings after |
|---|---|---|---|---|
| `/agents/` | 860 → 860 | 71.3 % → 71.3 % | faq-collapsed, link-count | faq-collapsed, link-count |
| `/guides/` | 138 → 342 | 39.8 % → 62.2 % | low-extractable-text, read-budget | none |
| `/blog/` | 73 → 230 | 28.5 % → 55.8 % | low-extractable-text, read-budget | low-extractable-text |
| `/guides/start-agent-workplace/` | 386 → 386 | 60.3 % → 60.3 % | none | none |
| `/blog/what-is-an-ai-native-organization/` | 363 → 363 | 57.2 % → 57.2 % | none | none |
| `/ru/agents/` | 812 → 812 | 71.1 % → 71.1 % | faq-collapsed, link-count | faq-collapsed, link-count |
| `/ru/guides/` | 131 → 326 | 39.3 % → 62.7 % | low-extractable-text, read-budget | none |
| `/ru/blog/` | 70 → 220 | 27.3 % → 54.8 % | low-extractable-text, read-budget | low-extractable-text, read-budget (54.8 % against a 55 % line) |
| `/ru/guides/start-agent-workplace/` | 362 → 362 | 60.7 % → 60.7 % | none | none |
| `/ru/blog/what-is-an-ai-native-organization/` | 323 → 323 | 55.5 % → 55.5 % | none | none |

The Russian blog hub stays 0.2 points under the FIELD-tier line: Russian addresses are longer (`/ru/...`), so its 23
footer markers weigh more. Kept for the same reason as `low-extractable-text`: two posts.

## Copy checks (Copylot, voice `041b4138` version 1, register web)

Every new string, in every language; nothing blocking.

| Locale | Report | Result |
|---|---|---|
| en-US | `360e27e7-bd11-45e5-aca3-e9fa3911ac24` | two rule-of-three suggestions, both rewritten |
| en-US (final) | `a34eb4c6-04d3-4b4e-b218-2963b450551f` | no finding, score 90.6 |
| ru-RU | `f1e4d7a2-ed18-4b15-a0db-ee7243b9ea7c` | no-break space advisories only (the checked text was typed without them; the catalog carries them after short words and before же) |
| de-DE | `9b95fce9-9518-429c-ab32-1256f573d2ef` | no finding |
| fr-FR | `b18d6e78-d6ed-44ed-9e19-4b2b846ec945` | no-break space before the colon and inside «», advisory (the catalog carries U+00A0 there) |
| pl-PL | `0b1fb042-f503-4928-96b3-2e8334b7a4ef` | no finding |
| ko-KR | `a86499e8-180e-467e-9054-4faa82cf24fe` | no finding |
| es-ES | `30079325-5bbe-49c7-8792-267ac12d8af9` → `81e5af26-5b6a-4b90-83e8-a02569b4866f` | «líderes» read as a superlative; now «directivos»; no finding |
| pt-BR | `ecca8104-c313-444b-b60a-0277c249ecf1` → `c5e2217b-a8fa-4572-b40d-46c1381a36c4` | «líderes» read as a superlative; now «gestores»; no finding |
| zh-Hans-CN | `454a1d70-aeaa-47b4-9d26-634f7efb4935` → `b0b2e6be-e0f2-4100-8c8e-95bf7fbd0f7e` | «第一步» flagged by the ad-law practice list; rewritten; no finding |
| ja-JP | `f88e8494-6944-4020-95ff-84292211578c` | no finding |

The third blog line («Ready to try it in your company») came after the first round and was checked on its own: en
`b53394d0-940e-444e-87eb-82541c3725ae` (advisory `web-conditional-claim` on "free": the phrase is the guide's own name,
its condition, one week, is in it), ru `a325b787-33b4-4996-bf7b-95354d252965` (no-break spaces, as above), de
`95a802c4-a3ca-4696-8765-e748b1564978`, fr `30c12272-53cd-4260-8542-04a3d90dcbc0` (colon space, as above), pl
`bb9c9c2d-785d-4e61-b485-d31126bad91a`, ko `a22f5bd3-66d2-4ad1-92c2-ab88d96f619f`, es
`08234e3e-eb89-4564-88a9-5406ef92722c`, pt-BR `47dd9cb3-f62d-4291-9724-51909e957923`, zh-Hans-CN
`44b19f9e-5992-4a7b-8cb3-8962064ffcb3`, ja-JP `589b290e-71af-4443-a663-a942b9ad0e50`. The section headings on the
cards reuse each guide's and post's existing translation, copied into the hub catalogs.

## Rendering

WebKit (Playwright from a local install), the built `dist/` served on loopback, at 1440 and 390 px: `/guides/`,
`/blog/`, `/ru/guides/`, `/ja/blog/` ([webkit.json](webkit.json)): every page 200, no script error, no horizontal
overflow, the first link is the skip link. The one console error on `/blog/` at 1440 is the analytics beacon's POST
answered 501 by the static file server (no Worker locally). Captures looked at:
[guides 1440](guides_-1440.jpg), [guides 390](guides_-390.jpg), [blog 1440](blog_-1440.jpg),
[blog 390](blog_-390.jpg), [ru guides 390](ru_guides_-390.jpg), [ja blog 390](ja_blog_-390.jpg).

## Checks

Recorded in the handoff entry of this change ([HANDOFF.md](../../HANDOFF.md)).
