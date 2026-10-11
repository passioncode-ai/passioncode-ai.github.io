Contract: brand-contract v1
# Narrative for organizations: the message house for /business/

Status: **draft for the operator**, written 2026-10-11 at the operator's request ("think how to package this narrative
for us"). It extends the approved site narrative ([narrative.md](narrative.md), §5 row `/business/`) for one reader:
the organization that pays for agents. [voice.md](voice.md) still says how it sounds, [terminology.md](terminology.md)
holds the words and [facts.md](facts.md) every number. A claim below without a receipt beside it is not published.

Where it came from: a market review read on 2026-10-11 described an AI-spend product that stopped selling a
dashboard of spend and started selling an answer to "what does our AI spend earn", per department, with subscriptions
read apart from pay-per-use, coding agents in a view of their own, and three sets of questions a company asks at each
stage of adoption. Its point for us is about the buyer, not the product: a B2B sale needs an **internal champion**,
and "management" is not one. Sources are not named in public files; the private note is in the knowledge base
(fabric-workspace `knowledge/vision.md`).

## 1. The champion: finance, with engineering

| | Finance (CFO, finance lead) | Engineering (CTO, CIO, head of engineering) |
|---|---|---|
| Wants | spend that is explained, predictable and capped | more agents doing more of the work |
| Fears | a bill that grows faster than anyone can say why | being told to stop before the agents prove themselves |
| Needs from us | every dollar next to what it bought, and limits set once | room to add agents without a fight each time |

The two disagree about *how much*, not about *what to look at*. One record that both open lets them agree: add agents
while each one's spend sits next to what it delivered. That makes finance a champion who says yes, which is the
opposite of the usual role finance plays in an AI purchase.

What the page may not do with this: name roles as ranks to please ("the CFO becomes the person in charge of AI"),
or write the CEO (`\bCEO\b` is reserved for /fabric/, D-T5, `scripts/check-site.mjs`). The public page says
"finance" and "engineering"; the roles are named here.

## 2. The one question

> **What did each agent cost, and what did it deliver?**
> Сколько стоил каждый агент и какой результат он дал?

It sits beside the page's own question (narrative §5: "what would it take, and cost, to run this across my
organization?") as the question the organization keeps asking *after* the pilot. Every section of /business/
answers the first; the new section answers this one. "Agent" is the unit: never a person, never a department.

## 3. Three questions, one per stage, reframed to agents and workflows

The source's three question sets are kept as stages. The second and third are reframed: they asked which
*employees* already work the new way and how to close the gap between the *best teams* and the rest. We answer about
agents, workflows and projects only ([voice.md](voice.md): "Analytics are about agents and outcomes, never
surveillance of people"; `scripts/check-site.mjs` refuses scoring wording about people on /business/).

| Stage | The source asked | We ask (en / ru) | What answers it | Label |
|---|---|---|---|---|
| Start | Are processes AI-first, or is AI an add-on? | Does the work run through agents, or beside them? / Работа идёт через агентов или рядом с ними? | The estimate's "How does that work run today?" and its share table (manual 25–50%, scripts 20–40%, ad hoc chat 15–35%, agents already 10–25%); the pilot measures one process against the customer's baseline | **available now** ([facts.md](facts.md) row *savings estimate*; `business/index.html` #estimate) |
| Grow | Who already works the new way, and which tools pay off? | Which agents are worth what they cost? / Какие агенты стоят своих денег? | Spend per agent (Fabric Dashboards); subscription use per account (Switchboard); what changed per project (Observatory) | **available now** (row *agent spend and usage today*) |
| Scale | Which approaches pay off, and how to close the gap between the best teams and the rest? | Which setups work best, and how do they reach the rest? / Что работает лучше всего и как перенести это на остальную работу? | Spend and results joined per project and workflow; limits set once and checked by agents; a working setup rolled out as a workplace per role | **direction** (PassionCode for Enterprise; [facts.md](facts.md) row *commercial path*) |

"Pays off" is not carried over: it is a promise of a return in different words (§6).

## 4. Proof points, each with its label and receipt

| # | Proof | Label | Receipt |
|---|---|---|---|
| 1 | Each agent reports its own spend; on each Mac, Fabric Dashboards' Spend page shows today, 7 and 30 days, per model and against the agent's own budget. A cost nobody knows reads "unknown" (or "≥ $x" when some calls are unpriced), never $0 | available now | fabric-dashboards [ADR-0013](https://github.com/passioncode-ai/fabric-dashboards/blob/main/docs/adr/0013-spend-from-the-agents.md); usage report from the Fabric Agent Contract DEC-0021; [facts.md](facts.md) row *Dashboards role and status* |
| 2 | Every limit an agent applies is listed on Spend, red when it stopped work, amber at 80% | available now | Dashboards `CHANGELOG.md` 0.6.4 (contract DEC-0027); `dashboards/index.html` #new |
| 3 | Subscriptions read apart from pay-per-use: Switchboard shows each Claude Code or Codex account's reported usage window and reset time, and keeps accounts in pools and projects. It reports usage as a share of a window, not as dollars | available now | `switchboard/index.html` "03 / USAGE"; [facts.md](facts.md) row *account features*; ADR-0013 §Context ("Switchboard reports provider quota percentages, not money") |
| 4 | What changed in each project, with the evidence and a next step | available now | `observatory/index.html` "03 / FINDINGS"; [narrative.md](narrative.md) §4 proof 3 |
| 5 | Decisions, tasks and releases on a project board | preview (Fabric) | [facts.md](facts.md) row *Fabric release* |
| 6 | Cost and result joined per agent, project and workflow, for the organization | direction | PassionCode for Enterprise "activity and usage analytics" (`business/index.html` #enterprise); knowledge base roadmap RM-04 (cost by organization, team, agent and pipeline) |
| 7 | Limits set once and checked by agents: an organization total, per-project limits, task presets, a ceiling per call; a request above a limit becomes a record someone answers, and the work goes on | direction | knowledge base `authority.md` (principle 9, operator 2026-10-11); RM-03 (per-agent grants and usage attribution); Switchboard daily USD ceilings per pool are planned (RM-20, SB-72) |
| 8 | The estimate: hours a week × 4.33 × share × loaded hourly cost, measured by the pilot | available now (as arithmetic) | `assets/estimate.js`; [facts.md](facts.md) row *savings estimate* |

Proofs 1–4 are what a customer can install today; their limits stay visible: Dashboards and Observatory run on one
machine each (Dashboards on macOS), and spend appears only for agents that report it.

## 5. The message on /business/

- **Hero line** (the home hero is not touched): "We bring agents onto your organization's machines, connect them and
  show what each one cost and what it delivered" in place of "show what they do". The same change on the home
  page's "For organizations" card.
- **New section 02 / FOR FINANCE AND ENGINEERING** (`#spend`): "One view of what agents cost / and what they
  delivered"; the champion pair in one sentence; the one question; the three stages of §3 with labels; the note
  "About agents and workflows, never a ranking of people."
- **Section 03 / THE ESTIMATE** replaces "02 / WHAT IT SAVES" ("savings" is banned in [terminology.md](terminology.md)).
- **FAQ:** "Is this a way to watch people?" — "No. The analytics are about agents and workflows: what each agent
  cost and what it delivered. They never rank people."
- The form and the estimate are unchanged (`scripts/check-site.mjs` keeps the form equal to `assets/lead-options.js`
  and the Worker).

## 6. What we will not say

| Not this | Why | Instead |
|---|---|---|
| ROI, return on AI spend, "pays off", "earns" | banned: the estimate cannot keep a return promise ([terminology.md](terminology.md)) | what each agent cost and what it delivered; an estimate the pilot measures |
| "Spend as much as you like" | an open cheque reads as a promise and erases who decides | add agents while each one's spend sits next to what it delivered |
| Which employees are slow; the gap between the best teams and the rest; adoption by person | analytics are about agents and outcomes, never surveillance of people | which agents and workflows work best, and how a working setup reaches the rest |
| "The CFO becomes the person in charge of AI" | assigns a role in the customer's company; "CEO" is reserved for /fabric/ | finance and engineering agree on one record |
| Single source of truth; AI-first transformation | jargon; "AI transformation" is banned | one record both open; the work runs through agents |
| Token prices fall while total spend rises (Jevons) as a stated fact | true in the market review, but we hold no dated source of our own | keep for conversation; publish only with a cited source |
| Our own estate's spend ceiling as a public number | the operator's private operating decision, and not yet enforced by a product | "limits set once", labelled direction |

## 7. Objections and answers

| Objection | Answer |
|---|---|
| "We already see the provider's invoice." | The invoice says what the organization paid. The question is per agent: Spend shows what each agent spent, by model, and names agents that do not report instead of counting them as $0. |
| "Coding agents run on subscriptions; there is no per-call bill." | That is why subscriptions are read apart: Switchboard shows how much of each Claude Code or Codex account's window is used and when it resets; calls paid per use show up in dollars. |
| "Is this monitoring our people?" | No. The unit is the agent and the workflow. The page says so, and public copy never describes assessing people. |
| "Can you prove it saves money?" | No promise. The estimate is arithmetic you can check; the pilot measures one process against your own baseline before anything is rolled out. |
| "Limits will slow the work down." | In the direction we build, a request above a limit becomes a record someone answers while the agent goes on with other work; nothing waits on a chat message (labelled direction). |
| "Does our data leave?" | Spend, usage and findings are read on your machines; the edition keeps data on your machines or in your own cloud. |

## 8. Open decisions for the operator

| ID | Decision | Recommendation |
|---|---|---|
| ON-1 | Keep the ban on "ROI" / "return", or allow "return on AI spend" under a criterion | **Keep the ban.** If it is ever allowed, only as a measured figure from a finished pilot, with both sides (cost and the delivered result) taken against the customer's baseline and the receipt beside it; never as a forecast. Not applied |
| ON-2 | Name the champion's roles on the page (CFO, CTO/CIO) or keep "finance" and "engineering" | **Keep "finance" and "engineering"** on the page: it avoids titles that differ by company size, and the CEO check; roles stay in this file and in conversations |
| ON-3 | Add a form goal such as "See what our agents cost and deliver" | **Yes, in a separate change**: it touches `assets/lead-options.js`, the Worker's accepted values and every catalog, and gives the commercial mailbox the champion's signal |
| ON-4 | Publish our own spend levels (organization total, alert at 80%) as a public proof once a product enforces them | **Yes, after** a product enforces them (knowledge base `authority.md`, "each product's part"); until then, "limits set once" stays direction and no number is public |
| ON-5 | Team-level views (aggregates of several people) in public copy | **Not now**: public copy stays at agents, workflows and projects until the knowledge base's thresholds and consent decisions for team views are made |
| ON-6 | The answer to the market review's open question ("what else makes finance the owner of AI?") | Our answer is **authority as a record**: finance sets the levels once (organization, project, task), agents check them before they spend, approvals never block. Publish it as **direction** only, when ON-4 is met |

## 9. Checks

The copy was checked with the saved Tone of Voice (`voiceRef {voiceId c2ca25b8-aad6-4e92-9ada-b3b8a880cc7e,
version 1}`, register marketing) in English and Russian; results and the gates run are in the task receipt
[2026-10-11-org-narrative](../tasks/2026-10-11-org-narrative.md).
