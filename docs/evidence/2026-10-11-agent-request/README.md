# Evidence — the short request and the agent prompt on /business/, 2026-10-11

Operator decisions ON-1…ON-6 (2026-10-11, recorded in [narrative-org.md §8](../../brand/narrative-org.md#8-operator-decisions-2026-10-11)).
Scenarios: [SCN-014](../../ux/scenarios.md#scn-014-request-an-ai-workplace-for-an-organization) (short form),
[SCN-022](../../ux/scenarios.md#scn-022-let-a-coding-agent-ask-and-send-the-request) (agent prompt).
Intake contract: [DEPLOYMENT.md, Requests from a coding agent](../../DEPLOYMENT.md#requests-from-a-coding-agent).

## Forms on the site

One form exists (`business/index.html`, the same in ten languages; `business/thanks/` is its no-JavaScript landing).
Before: five steps, 30 named fields (goals, company, website, industry, size, people, processes, hours, cost,
currency, setup, hosting, requirements, two budgets, timing, name, role, email, phone, Telegram, message, two
consent boxes). After: `contact.message` (required), `contact.email` (required), `goals` (optional, one of
seven), plus the token and the trap. The rationale is in SCN-014.

## Local Worker (never production)

`wrangler dev --local --local-protocol https --port 8911` with a local D1 (`wrangler d1 migrations apply
passioncode-site --local`) and throwaway `.dev.vars` secrets (git-ignored). No `PLATFORM_INTAKE_SECRET`, so
nothing was forwarded; the local `send_email` binding is simulated.

Agent-style curl, the prompt's own commands against `https://localhost:8911`:
`GET /api/leads/token` → 200 with a token; after 4 s `POST /api/leads?dry_run=1` → 200 `valid`, `lead/2`;
`POST /api/leads` → 201 `received`; the same file again → 200 `duplicate`; the same request without
`contact.email` (dry run, `lang: ru`) → 400 `invalid`, issue `contact.email: обязательное поле`. The local D1 row:
`lead/2`, channel `agent-prompt`, notify `done`, confirm `done`, forward `skipped`.

## WebKit (Safari's engine)

[`webkit-business.cjs`](webkit-business.cjs) with playwright-core 1.63.0 (WebKit build 2359), result
[`webkit.json`](webkit.json): `/business/` in en and ru at 390 and 1280 px — no horizontal overflow, no broken
image, no console error, the agent card ahead of the form (above it at 390, left of it at 1280), exactly the three
fields, Copy → Copied (Копировать → Скопировано) with the clipboard text equal to the language's
`agent-request.txt` (2,952 characters en, 3,163 ru), the form sent and its reference shown; without JavaScript at
390 px: no Copy button, the prompt visible and selectable, the form lands on `/business/thanks/`. Screenshots:
`business-<lang>-<width>-request.jpg` and `-sent.jpg`.

Playwright's screenshot injects an inline style for caret hiding that the site's CSP refuses; probed the same day
(no console error without a screenshot, one with), so the harness counts it apart as `screenshotCsp`.

The first run found a defect, fixed with a test before the second: without JavaScript an untouched optional
`<select name="goals">` posts `goals=`, which was refused as an unknown answer (`worker/leads.js` `list` now
ignores empty values; `scripts/check-worker.mjs` "the short form…").

## Copy checks (copy agent, rule check, no model, no charge)

Voice `c2ca25b8…` v1, register marketing, over every new or changed string per language. No blocking rule in any
language; en and ru score 100. Every language reports one `voice-literal-ban` hit: "ROI", which the saved voice v1
still bans while the operator allowed it on 2026-10-11 (ON-1); a voice v2 without that ban is open (docs/backlog.md).
ru: non-breaking spaces after short words and before «же» applied as the checker's safe patches; fr: no-break and
narrow no-break spaces before `: ; ? !` and inside « » applied; the French prompt says "tu" to the agent on
purpose (the visitor speaks to their agent). zh: an advisory on 唯一 ("the only personal data"), not a claim of
being the best, kept.

Reports: en `defad1c6`, ru `a8512cce`, de `4d61c2e6`, fr `ac4d5bf5`, es `ae8d5bc1`, pt-BR `c8b9708a`, pl `d178fe35`,
ko `2828322a`, ja `8708eb42`, zh-Hans `7af0fa77`.

## Translations

en and ru written natively; de, fr, es, pt-br, pl, ko, ja translated from English here; zh-Hans only through the copy
agent's write capability (locale zh-Hans-CN, register marketing, the saved voice, at most $0.50 a call): three jobs,
two of them in parallel, charged $0.049116, $0.047728 and $0.026828 (about $0.12 in all). Mechanical edits after it,
no wording changed: straight quotes to “ ”, the site's legal citation form "GDPR Art. 6(1)(b)" kept, and the
unchanged first sentence of the privacy lead kept from its earlier approved translation.

## Privacy

Count-only scan of the whole change against the private terms list (183 terms, "Nicegram" approved): 0. Names of
personal agents in the change: 0.
