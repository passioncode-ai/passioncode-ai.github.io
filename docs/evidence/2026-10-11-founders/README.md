# The founders' story — home About and /business/ #founders

Branch `agent/site-founders`, 2026-10-11. Operator decision of 2026-10-11: the home About becomes the founders'
story, told in the first person by Sergey Sheleg, a story and not a CV, with no links to publications or sources.
`visual.json` is the WebKit pass; `live.json` (added after the deploy) is `scripts/verify-live.py`.

## What changed

| Where | Before | After |
|---|---|---|
| Home #about heading | A note / from the founder | How we got here |
| Home #about copy | three sentences: Sergey, a co-founder of Nicegram "which has 60 million users", linked to nicegram.me; started PassionCode as his own workplace | eight short paragraphs (the operator's approved text): the two co-founders and their roles; built for themselves while setting up workplaces for agents; a setup for an AI-native agent team, packaged as software, running their own work today; open source because it helps anyone who works with agents; the chat-and-back problem; for organizations, connected to their systems with custom agents, and "Tell us about your processes →" to /business/#request; the license line kept |
| Home #about links | nicegram.me, x.com/sshlg93 twice | x.com/sshlg93 once ("Follow on X"); no other external link |
| Home #about signature | Sergey · @sshlg93 | Sergey Sheleg · co-founder, PassionCode |
| Home JSON-LD `founder` | one Person, "Sergey" | two Persons: Sergey Sheleg (`sameAs` x.com/sshlg93), Serge Khurs (no `sameAs`) |
| /vision/ JSON-LD `author` | "Sergey" | "Sergey Sheleg", same `@id` as on home |
| Footer, every page | Twitter ↗ | X ↗ |
| /business/ | (none) | #founders "Who we are / We built it for our own teams first", after the hero and ahead of #enterprise and the form, unnumbered so the page keeps its one question; links to /#about |
| `styles.css` | gold underline on `.about-lead a` | on `.about-copy > p a` (the same token), so the inline request link reads as a link |
| `scripts/check-site.mjs` | pinned "60 million users" and the nicegram.me link | pins the new facts, one external link in #about, no "users"/"organic"/"founded Nicegram", the two founders in JSON-LD, X in every footer, and #founders ahead of the form |
| `i18n/ru/_checks.json` | — | Russian home must keep «больше 60 миллионов установок» |
| Inbox | 0.15.0 | 0.15.1 by `npm run releases:sync` (published 2026-10-11T13:21:19Z, during this task; receipt read: DMG notarization accepted and stapled, Gatekeeper accepted, Windows `SIGNED`), facts rows under the lease |

Changes to the approved English text: "defence" is spelled "defense", as everywhere else on the site (American
spelling). Nothing else.

## Copy checks (saved voice v2 `1657e5b3…` version 1, register marketing, rule check, no model)

| Language | Report | Score | Findings |
|---|---|---|---|
| en (home) | `4c059e54-7637-41eb-8aec-27d7219e5c12` | 100, pass | three advisory "rule of three" (each a list of facts: Teslasuit's features, its markets, the fields) |
| en (/business/) | `bf64e17c-e66e-438f-add5-64646d433a39` | 100, pass | none |
| ru | `cc554eb0-8e2f-4a66-a54e-538627b87158` | 100, pass | advisory only: no-break spaces after short words, rule of three, "AGPL" in capitals |
| de | `bf5b4fda-7319-42d6-af19-0e93306142f3` | no score for this locale | none |
| fr | `2349aef4-1b00-4630-a989-4119a294ba18` | no score | five advisory colon spaces, from the plain-space text pasted into the check; the catalog has U+00A0 there |
| es | `9ccb00b1-5212-423c-a583-722cdd641547` | no score | none |
| pt-br | `bc88bc44-4638-4fe0-bd52-e1e163f728c7` | no score | none |
| pl | `3c76e326-7e3d-4e66-aa70-7cee0f723a65` | no score | none |
| ko | `eebed15b-4bcb-4833-babb-e82d9018e0b8` | no score | none |
| ja | `965178b1-b154-4678-ac01-e4d6a56f0fec` | no score | none |
| zh-Hans | `50a57ad4-7385-4b55-9d5d-fbe37cba62c0` | no score | none |

No blocking rule in any language. en and ru written natively; de, fr, es, pt-br, pl, ko, ja translated here;
zh-Hans written by the copy agent's write capability only (two jobs: the full set, then a revision of five strings
that repeated a word, softened "the software adapts" into "must adapt", and lacked a closing 。; $0.0646 charged).
Names stay in Latin script except in Russian (Сергей Шелег, Сергей Хурс); company names stay in Latin everywhere.

## Checks

`npm run locales -- --check`, `python3 scripts/extract-public-copy.py --check`, `npm run check`, `npm test`
(110/110), `npm run build` (208 entries), `npm run releases:check` — all exit 0 on the branch. WebKit
(`visual.json`): home #about and /business/ #founders, en and ru, 390 and 1280 px — 8/8 status 200, no horizontal
overflow, no element outside the viewport, one external link in #about. Private-terms count of the diff's added
lines: 0 (the approved "Nicegram" excluded).
