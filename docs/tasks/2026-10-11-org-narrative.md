# Organization narrative on /business/ (2026-10-11)

Operator request, 2026-10-11: package a market narrative (an AI-spend product repositioned to "what does our AI spend
earn", sold to finance as the internal champion) for PassionCode.ai's organization offer; write it into the brand
pack and apply it to /business/ and the home "For organizations" card. Roadmap tracks it serves: RM-03 and RM-04
(knowledge base), as public copy only; no product behaviour changes.

## What changed

| Where | Before | After |
|---|---|---|
| `docs/brand/narrative-org.md` | — | the organization message house: champion (finance, with engineering), the one question, three stages reframed to agents and workflows, eight proof points with labels and receipts, what we will not say, objections, open decisions ON-1…ON-6 |
| /business/ hero line | "…connect them and show what they do…" | "…connect them and show what each one cost and what it delivered…" (h1 unchanged) |
| /business/ #spend (new) | — | **02 / FOR FINANCE AND ENGINEERING** "One view of what agents cost / and what they delivered": Does the work run through agents, or beside them? (AVAILABLE NOW) · Which agents are worth what they cost? (AVAILABLE NOW) · Which setups work best, and how do they reach the rest? (DIRECTION); note "About agents and workflows, never a ranking of people." |
| /business/ #estimate label | 02 / WHAT IT SAVES | 03 / THE ESTIMATE ("savings" is banned in `terminology.md`) |
| /business/ request, FAQ labels | 03 / REQUEST, 04 / QUESTIONS | 04 / REQUEST, 05 / QUESTIONS |
| /business/ FAQ | two questions | plus "Is this a way to watch people?" (also in the FAQPage JSON-LD) |
| /business/ meta description | "…activity and usage analytics…" | "…what each agent cost and what it delivered…" |
| home "For organizations" card | "…show what they do…" | "…show what each one cost and what it delivered…" |
| Form, estimate, Worker | — | unchanged (`scripts/check-site.mjs` form ↔ `assets/lead-options.js` parity passes) |

Docs in the same change: `docs/brand/README.md` and `narrative.md` link the new file; `facts.md` rows *commercial
path* (updated) and *agent spend and usage today* (new), under the agent-sync lease; `docs/ux/scenarios.md` SCN-014;
`llms.txt`; generated copy projections.

## Languages

en and ru written by hand (ru with non-breaking spaces after short words, "подтверждения" for evidence). de, fr, es,
pt-br, pl, ko and ja translated from English in each catalog's register (du, vous, tú, você, ty, -습니다, です・ます),
reusing each catalog's existing words for estimate, pilot, baseline and evidence; the $0 in each language follows
`Intl` as `assets/estimate.js` prints it. zh-Hans through the copy agent's write capability only (locale zh-Hans-CN,
maxChargeUsd 0.40 per call, maxOutputTokens 4000): jobs `job_3acfbc59…` (empty, $0.053), `job_382846e0…` (META…L1,
cut at 602 characters, $0.033), `job_124f371d…` (empty, $0.027), `job_ad484388…` (empty, $0.024), `job_4d57b28a…`
(failed, model returned no text), `job_a1f26fc7…` (Q2…FAQA as plain lines, $0.023); about $0.16 in all. The hero,
home card and meta reuse the existing zh sentences with the agent's phrase 每个智能体花了多少、交付了什么; two edits by
hand: Q1 "绕开" → "只在一旁用到" (closer to "beside"), "工作场所" → the catalog's 每个角色一个工作空间.

## Checks run

| Check | Result |
|---|---|
| copy agent rule check, en-US, register marketing, saved voice c2ca25b8 v1 | report `f4ad517c`: score 100 pass, no ban; three rule-of-three suggestions, the FAQ triad fixed, the other two are the hero's existing structure and a data range |
| same, ru-RU | report `faf1c74b`: score 100 pass; one «который» chain fixed (intro); non-breaking-space findings were from the pasted text, the catalog carries them; ALL CAPS findings are the site's section labels |
| same, zh-Hans-CN | report `df486be7`: no findings (language-independent, typography, address, voice bans) |
| `npm run locales` | 10 languages, 15 pages each, in step |
| `python3 scripts/extract-public-copy.py` | 150 projections |
| `npm run check` | exit 0 |
| `npm test` | 99/99 |
| `npm run build` | 184 public entries |
| super-ux `brand_lint.py docs/brand` | no new finding against `main` except three B021 rows that appear only without a local `dist/` (existing registry rows); B030 for `$0.` cleared by the facts row |
| WebKit (Playwright 1.63, webkit-2359) at 390 and 1280 px: /business/, /ru/business/, /, /ru/ | status 200, no horizontal overflow, no broken image, no page error; three labels per language; three FAQs; [webkit.json](../evidence/2026-10-11-org-narrative/webkit.json) |
| private-terms count scan of the diff | 0; no source newsletter or startup name in the diff |

## Open

The operator's decisions ON-1…ON-6 in [narrative-org.md §8](../brand/narrative-org.md#8-open-decisions-for-the-operator).
Next task: ON-3, a form goal "See what our agents cost and deliver" (`assets/lead-options.js`, the Worker, every
catalog), once the operator agrees.
