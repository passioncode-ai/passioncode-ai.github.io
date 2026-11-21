# SITE-091: URL catalogue

Generated from [catalog.json](catalog.json) by `node docs/tasks/2026-11-21-site-architecture/render-catalog.mjs`;
edit the JSON, never this file. The rules and the reasons are in the [spec](README.md).

Rows: 92 (15 live, 12 change, 47 new, 16 reserved, 2 external). Videos: 50 (8 film, 1 howto, 25 overview, 16 clip; part 2: 19, part 3: 31).

## Pages

| URL | Type | State | Breadcrumb parent | The one question | The one action | Video | Languages | Part | Row |
|---|---|---|---|---|---|---|---|---|---|
| `/` | home | change | n/a | What is PassionCode, and what does Fabric free me from? | Try Fabric free | V-01 | site | 2 | SITE-081 |
| `/vision/` | concept | change | `/` | How does one agent grow into an agentic organization? | Try Fabric free | V-02 | site | 2 | SITE-081 |
| `/humanless/` | concept | new | `/` | What is a Humanless business? | Assess your company | V-03 | site | 2 | SITE-093 |
| `/for-you/` | audience | new | `/` | What does Fabric give me as a developer, a founder or anyone who builds products? | Try Fabric free | V-04 | site | 2 | SITE-093 |
| `/for-you/<role>/` | audience | reserved | `/for-you/` | What does Fabric give a person in this role? First roles: developers, founders | Try Fabric free | none | site | later | n/a |
| `/start/` | start | change | `/for-you/` | How do I start with Fabric for free on my computer? | Copy the command | V-05 | site | 2 | SITE-081 |
| `/business/` | audience | change | `/` | What does PassionCode do for an organization? | Assess your company | V-06 | site | 2 | SITE-085 |
| `/business/thanks/` | utility | live | `/business/` | n/a (the form's confirmation without JavaScript; noindex) | n/a | none | site | n/a | n/a |
| `/business/humanless-business/` | usecase | new | `/business/` | How do I take people out of the routine of my existing business and keep my team? | Assess your company | V-07 | site | 3 | SITE-087 |
| `/business/founder-team/` | usecase | new | `/business/` | How do I start a business with a team of AI agents instead of hiring? | Try Fabric free | V-08 | site | 3 | SITE-087 |
| `/business/sale-ready/` | usecase | new | `/business/` | How do I prepare my business for sale so that it runs without me? | Assess your company | V-09 | site | 3 | SITE-087 |
| `/business/<case>/` | usecase | reserved | `/business/` | A later use case for organizations, one reader and one situation per page | Assess your company | none | site | later | n/a |
| `/assessment/` | landing | new | `/business/` | How do I get my company assessed for work that agents can take over? | Start the assessment | V-10 | site | 2 | SITE-086 |
| `https://assessment.passioncode.ai/` | landing | external | `/assessment/` | The self-guided assessment (the story landing, the White Rabbit's mode) | n/a | none | none | n/a | SITE-068 |
| `/fabric/` | product | change | `/` | What is Fabric? | Try Fabric free | V-11 | site | 2 | SITE-082 |
| `/fabric/download/<platform>` | utility | live | `/fabric/` | n/a (download redirect served by the Worker) | n/a | none | none | n/a | n/a |
| `/fabric/ceo/` | feature | new | `/fabric/` | What is the Fabric CEO agent and what does it do? | Try Fabric free | V-12 | site | 2 | SITE-082 |
| `/fabric/sessions/` | feature | new | `/fabric/` | How do I run many agent sessions and terminals across my machines? | Try Fabric free | V-13 | site | 3 | SITE-084 |
| `/fabric/memory/` | feature | new | `/fabric/` | How do AI agents keep memory of a project between sessions? | Try Fabric free | V-14 | site | 3 | SITE-084 |
| `/fabric/board/` | feature | new | `/fabric/` | How do agents hand tasks to each other without losing them? | Try Fabric free | V-15 | site | 3 | SITE-084 |
| `/fabric/gates/` | feature | new | `/fabric/` | How do I stay in control of what my agents do, and why can I trust them? | Try Fabric free | V-16 | site | 3 | SITE-094 |
| `/fabric/self-improvement/` | feature | new | `/fabric/` | How does a system of agents learn from every run? | Try Fabric free | V-17 | site | 3 | SITE-094 |
| `/fabric/create/` | feature | new | `/fabric/` | How do I create an AI agent from a template? | Try Fabric free | V-18 | site | 3 | SITE-084 |
| `/fabric/reports/` | feature | new | `/fabric/` | How do I see what my agents did, as a report I can share? | Try Fabric free | V-19 | site | 3 | SITE-084 |
| `/fabric/mobile/` | feature | new | `/fabric/` | Can I steer my agents from a phone? | Try Fabric free | V-20 | site | 3 | SITE-084 |
| `/fabric/agents/` | feature | change | `/fabric/` | Which coding agents does Fabric work with? | Try Fabric free | V-21 | site | 3 | SITE-084 |
| `/fabric/ceo/voice/` | subfeature | new | `/fabric/ceo/` | Can I tell my agents what to do by voice? | Try Fabric free | V-12a | site | 3 | SITE-094 |
| `/fabric/ceo/dispatch/` | subfeature | new | `/fabric/ceo/` | How does the CEO agent hand out tasks, and how do I know each one was done? | Try Fabric free | V-12b | site | 3 | SITE-094 |
| `/fabric/sessions/terminals/` | subfeature | new | `/fabric/sessions/` | How do I watch and steer an agent's terminal? | Try Fabric free | V-13a | site | 3 | SITE-094 |
| `/fabric/sessions/machines/` | subfeature | new | `/fabric/sessions/` | How do I run agents on several computers as one workplace? | Try Fabric free | V-13b | site | 3 | SITE-094 |
| `/fabric/memory/context-packs/` | subfeature | new | `/fabric/memory/` | What does an agent know about my project when a session starts? | Try Fabric free | V-14a | site | 3 | SITE-094 |
| `/fabric/memory/search/` | subfeature | new | `/fabric/memory/` | How do agents find what was decided before, with its source? | Try Fabric free | V-14b | site | 3 | SITE-094 |
| `/fabric/board/requests/` | subfeature | new | `/fabric/board/` | How does one project's agent ask another project's agent for work? | Try Fabric free | V-15a | site | 3 | SITE-094 |
| `/fabric/board/claims/` | subfeature | new | `/fabric/board/` | How do two agents avoid doing the same task? | Try Fabric free | V-15b | site | 3 | SITE-094 |
| `/fabric/gates/approvals/` | subfeature | new | `/fabric/gates/` | Which agent actions need a person's approval? | Try Fabric free | V-16a | site | 3 | SITE-094 |
| `/fabric/gates/access/` | subfeature | new | `/fabric/gates/` | How does an agent get access to a tool or a key, and who allows it? | Try Fabric free | V-16b | site | 3 | SITE-094 |
| `/fabric/gates/spend-limits/` | subfeature | new | `/fabric/gates/` | How do I cap what my agents spend? | Try Fabric free | V-16c | site | 3 | SITE-094 |
| `/fabric/create/adapt/` | subfeature | new | `/fabric/create/` | How do I connect an agent I already built to Fabric? | Try Fabric free | V-18a | site | 3 | SITE-094 |
| `/fabric/<feature>/` | feature | reserved | `/fabric/` | A later surface of Fabric (README section 9, rule E2) | Try Fabric free | none | site | later | n/a |
| `/fabric/<feature>/<subfeature>/` | subfeature | reserved | `/fabric/<feature>/` | A later part of a Fabric surface (rule E3) | Try Fabric free | none | site | later | n/a |
| `/switchboard/` | module | change | `/fabric/` | How do I manage several Claude Code and Codex accounts? | Set up with one command | V-30 | site | 2 | SITE-083 |
| `/switchboard/agents/` | subfeature | live | `/switchboard/` | Which agents can read and switch accounts through Switchboard? | Set up with one command | none | site | n/a | n/a |
| `/switchboard/rotation/` | subfeature | new | `/switchboard/` | How do my sessions move to the next account before a usage limit stops them? | Set up with one command | V-30a | site | 3 | SITE-094 |
| `/switchboard/groups/` | subfeature | new | `/switchboard/` | How do I keep the accounts of different projects and organizations apart? | Set up with one command | V-30b | site | 3 | SITE-094 |
| `/switchboard/download/<platform>` | utility | live | `/switchboard/` | n/a (download redirect served by the Worker) | n/a | none | none | n/a | n/a |
| `/inbox/` | module | change | `/fabric/` | What is Fabric Inbox? | Set up with one command | V-31 | site | 2 | SITE-083 |
| `/inbox/reply-agents/` | subfeature | new | `/inbox/` | How does an agent answer mail on a project's address, and who checks it? | Set up with one command | V-31a | site | 3 | SITE-094 |
| `/dashboards/` | module | change | `/fabric/` | What is Fabric Dashboards? | Set up with one command | V-32 | site | 2 | SITE-083 |
| `/observatory/` | module | change | `/fabric/` | What is Project Observatory? | Set up with one command | V-33 | site | 2 | SITE-083 |
| `/observatory/secrets/` | subfeature | new | `/observatory/` | How do agents use my keys without ever seeing them? | Set up with one command | V-33a | site | 3 | SITE-094 |
| `/adapter/` | module | new | `/fabric/` | How do I make my own agent work with Fabric? | Read the contract | V-34 | site | 2 | SITE-083 |
| `/launcher/` | module | new | `/fabric/` | What does the PassionCode launcher install? | Copy the command | V-35 | site | 2 | SITE-083 |
| `/relay/` | module | new | `/fabric/` | How do my machines exchange agent messages privately? | Read the source | V-36 | site | 2 | SITE-083 |
| `/okolos/` | module | new | `/fabric/` | How do I keep an AI agent's browsing safe? | Read the source | V-37 | site | 2 | SITE-083 |
| `/<module>/` | module | reserved | `/fabric/` | A later module of the ecosystem: a part with its own install and its own releases (rule E1) | Set up with one command | none | site | later | n/a |
| `/<module>/<feature>/` | subfeature | reserved | `/<module>/` | A later feature of a module (rule E3) | Set up with one command | none | site | later | n/a |
| `/security/` | capability | new | `/fabric/` | Is it safe to let AI agents work on my machine and my company's systems? | Try Fabric free | V-40 | site | 3 | SITE-084 |
| `/cloud/` | capability | new | `/fabric/` | Can my agents keep working in the cloud when my computer is off, and what does the cloud give me? | See pricing | V-41 | site | 2 | SITE-084 |
| `/open-source/` | capability | new | `/fabric/` | Is Fabric free and open source, and what does the licence allow? | Try Fabric free | V-42 | site | 3 | SITE-084 |
| `/pro/` | plan | new | `/pricing/` | What does the paid personal plan open beyond the free version? | See pricing | V-43 | site | 2 | SITE-089 |
| `/pricing/` | plan | new | `/` | What does PassionCode cost? | Try Fabric free | none | site | 3 | SITE-089 |
| `/enterprise/` | plan | reserved | `/pricing/` | What does PassionCode for Enterprise carry? Until built, 302 to /business/ | Assess your company | none | site | later | n/a |
| `/guides/` | hub | live | `/` | Which questions about running work with agents do the guides answer? | n/a | none | site | n/a | n/a |
| `/guides/start-agent-workplace/` | guide | live | `/guides/` | What happens at each step of setting up the agent workplace? | Try Fabric free | none | site | n/a | n/a |
| `/guides/free-assessment/` | guide | live | `/guides/` | How does the free assessment week work? | Assess your company | none | site | n/a | n/a |
| `/guides/templates-to-agents/` | guide | live | `/guides/` | How does a template become a working agent? | Assess your company | none | site | n/a | n/a |
| `/guides/why-tasks-stall-between-people/` | guide | change | `/guides/` | Why do tasks stall between people (where does our process hurt)? | Assess your company | none | site+scoped | 3 | SITE-088 |
| `/guides/why-releases-slip/` | guide | change | `/guides/` | Why do releases slip? | Assess your company | none | site+scoped | 3 | SITE-088 |
| `/guides/where-team-time-goes/` | guide | new | `/guides/` | Where does my team's time go? | Assess your company | none | site+scoped | 3 | SITE-088 |
| `/guides/scale-without-hiring/` | guide | new | `/guides/` | How do we scale without hiring for every new process? | Assess your company | none | site+scoped | 3 | SITE-088 |
| `/guides/catch-process-failures/` | guide | new | `/guides/` | How do we catch a process failure before the customer does? | Assess your company | none | site+scoped | 3 | SITE-088 |
| `/guides/<slug>/` | guide | reserved | `/guides/` | A later evergreen answer to one question (rule E5); the content plan of README section 10 lists the first clusters | by cluster | none | site+scoped | later | n/a |
| `/blog/` | hub | live | `/` | What is new at PassionCode, and what do we think about it? | n/a | none | site | n/a | n/a |
| `/blog/<slug>/` | post | live | `/blog/` | A dated post: an opinion, a digest or a release story (live posts stay where they are) | by post | none | site | n/a | n/a |
| `/cases/` | hub | new | `/business/` | How do real organizations run on agents? | Assess your company | none | site | 3 | SITE-095 |
| `/cases/how-an-organization-runs/` | case | new | `/cases/` | How does an organization run with agents, day by day? | Assess your company | V-50 | site | 3 | SITE-077 |
| `/cases/<slug>/` | case | reserved | `/cases/` | A later customer story: the baseline, what agents did, the figures, with the customer's written consent | Assess your company | none | site | later | n/a |
| `/agents/` | hub | live | `/business/` | Which agent templates can an organization get? | Assess your company | none | site | n/a | n/a |
| `/agents/<slug>/` | agent | live | `/agents/` | What does this agent template do for an organization? (eighteen live pages) | Assess your company | none | site | n/a | n/a |
| `/videos/` | hub | new | `/` | Where can I watch what Fabric and its modules do? | Try Fabric free | none | site | 3 | SITE-092 |
| `/videos/<slug>/` | watch | new | `/videos/` | One video as the page's main content, with its transcript (one watch page per video of README section 7) | by video | the page itself | site | 3 | SITE-092 |
| `/privacy/` | legal | live | `/` | What does PassionCode collect, and what stays on my machine? | n/a | none | site | n/a | n/a |
| `/terms/` | legal | reserved | `/` | The terms of the paid plans; published with the account | n/a | none | site | later | SITE-089 |
| `/design-system/` | utility | live | `/` | What are the shared design tokens of PassionCode's web surfaces? | n/a | none | site | n/a | n/a |
| `/404.html` | utility | live | `/` | n/a (noindex) | n/a | none | site | n/a | n/a |
| `/compare/<a>-vs-<b>/` | guide | reserved | `/guides/` | How does Fabric differ from a named alternative? Built only with a checked source per claim | Try Fabric free | none | en | later | n/a |
| `/glossary/<term>/` | concept | reserved | `/` | What does a term of the agent workplace mean? | by term | none | site | later | n/a |
| `/changelog/` | hub | reserved | `/fabric/` | What changed in each release? Today the releases live on GitHub and /api/releases | n/a | none | en | later | n/a |
| `/docs/` | hub | reserved | `/` | Where is the documentation? Today it lives in each repository | n/a | none | en | later | n/a |
| `/about/` | concept | reserved | `/` | Who builds PassionCode? Today the entity home is /#about | n/a | none | site | later | n/a |
| `/press/` | utility | reserved | `/` | Press materials; today /#press | n/a | none | en | later | n/a |
| `/account` | utility | external | `/pricing/` | The account lives on the platform (api.passioncode.ai/account); the site only links to it | n/a | none | none | n/a | SITE-089 |

## Machine URLs

| URL | Note |
|---|---|
| `/sitemap.xml` | the sitemap index once the site passes one file's comfort size; today one file (README section 8) |
| `/robots.txt` | unchanged: every agent allowed for retrieval and training |
| `/llms.txt` | sections follow the catalogue's types |
| `/api/*` | the Worker: leads, analytics, releases |
| `/media/video/<id>/*` | new: video files, posters and captions served by the Worker from object storage (decision A9) |

## Aliases (redirects the Worker serves)

| From | To | Status | Why |
|---|---|---|---|
| `/en/*` | `/*` | 301 | English has no prefix (decision A1); a guessed /en/ URL must land |
| `/for-organizations/` | `/business/` | 301 | the label's natural URL; /business/ stays canonical (decision A2) |
| `/organizations/` | `/business/` | 301 | the same |
| `/personal/` | `/for-you/` | 301 | a guessed name |
| `/features/` | `/fabric/#features` | 301 | no second hub of features (brief, Do not build) |
| `/ecosystem/` | `/fabric/#ecosystem` | 301 | Fabric is the ecosystem's hub (decision A4) |
| `/modules/` | `/fabric/#ecosystem` | 301 | the same |
| `/products/` | `/fabric/#ecosystem` | 301 | the same |
| `/toolkit/` | `/fabric/#ecosystem` | 301 | the earlier public word |
| `/assess/` | `/assessment/` | 301 | a guessed name |
| `/white-rabbit/` | `/assessment/` | 301 | the button's words, typed |
| `/plans/` | `/pricing/` | 301 | a guessed name |
| `/download/` | `/start/#setup` | 301 | one door to setup |
| `/enterprise/` | `/business/` | 302 | temporary until the page is built |

## Reserved root names

No page, module or content slug may take one of these as its first path segment: `en`, `ru`, `de`, `fr`, `pl`, `ko`, `es`, `pt-br`, `zh-hans`, `ja`, `it`, `uk`, `id`, `vi`, `nl`, `ar`, `tr`, `bg`, `hi`, `api`, `assets`, `media`, `brand`, `releases`, `account`, `admin`, `app`, `login`, `signin`, `signup`, `static`, `status`, `support`, `www`.

## Videos

| ID | Title (working) | Class | Page | Part |
|---|---|---|---|---|
| V-01 | PassionCode: free your time for the work you love | film | `/` | 2 |
| V-02 | The vision: from one agent to an agentic organization | film | `/vision/` | 2 |
| V-03 | What a Humanless business is | film | `/humanless/` | 2 |
| V-04 | For you: the vision, Fabric and the system around it | film | `/for-you/` | 2 |
| V-05 | Set up Fabric with one command | howto | `/start/` | 2 |
| V-06 | For organizations: set up a business on agents, from the first process to Humanless | film | `/business/` | 2 |
| V-07 | Case: your current business, Humanless, with the team kept | overview | `/business/humanless-business/` | 3 |
| V-08 | Case: a new business with a team of agents | overview | `/business/founder-team/` | 3 |
| V-09 | Case: a business prepared for sale | overview | `/business/sale-ready/` | 3 |
| V-10 | Follow the White Rabbit: how the assessment goes | film | `/assessment/` | 2 |
| V-11 | Fabric in two minutes | film | `/fabric/` | 2 |
| V-12 | The CEO agent | overview | `/fabric/ceo/` | 2 |
| V-12a | Tell the CEO agent by voice | clip | `/fabric/ceo/voice/` | 3 |
| V-12b | Dispatch with a receipt for every task | clip | `/fabric/ceo/dispatch/` | 3 |
| V-13 | Sessions, agents and terminals | overview | `/fabric/sessions/` | 3 |
| V-13a | An agent's terminal, watched and steered | clip | `/fabric/sessions/terminals/` | 3 |
| V-13b | Several machines, one workplace | clip | `/fabric/sessions/machines/` | 3 |
| V-14 | Memory | overview | `/fabric/memory/` | 3 |
| V-14a | The context pack a session starts with | clip | `/fabric/memory/context-packs/` | 3 |
| V-14b | Search with sources | clip | `/fabric/memory/search/` | 3 |
| V-15 | The board | overview | `/fabric/board/` | 3 |
| V-15a | A request from one project to another | clip | `/fabric/board/requests/` | 3 |
| V-15b | Claims: one task, one agent | clip | `/fabric/board/claims/` | 3 |
| V-16 | Gates: why you can trust your agents | overview | `/fabric/gates/` | 3 |
| V-16a | Approvals | clip | `/fabric/gates/approvals/` | 3 |
| V-16b | Access by request | clip | `/fabric/gates/access/` | 3 |
| V-16c | Spend limits | clip | `/fabric/gates/spend-limits/` | 3 |
| V-17 | A system that learns from every run | overview | `/fabric/self-improvement/` | 3 |
| V-18 | Create an agent from a template | overview | `/fabric/create/` | 3 |
| V-18a | Adapt an agent you already built | clip | `/fabric/create/adapt/` | 3 |
| V-19 | Reports | overview | `/fabric/reports/` | 3 |
| V-20 | Fabric on a phone | overview | `/fabric/mobile/` | 3 |
| V-21 | Works with the agents you already pay for | overview | `/fabric/agents/` | 3 |
| V-30 | Fabric Switchboard | overview | `/switchboard/` | 2 |
| V-30a | Rotation before the limit | clip | `/switchboard/rotation/` | 3 |
| V-30b | Groups of accounts | clip | `/switchboard/groups/` | 3 |
| V-31 | Fabric Inbox | overview | `/inbox/` | 2 |
| V-31a | Reply agents | clip | `/inbox/reply-agents/` | 3 |
| V-32 | Fabric Dashboards | overview | `/dashboards/` | 2 |
| V-33 | Project Observatory | overview | `/observatory/` | 2 |
| V-33a | Keys by name, never by value | clip | `/observatory/secrets/` | 3 |
| V-34 | Fabric Agent Contract and Adapter | overview | `/adapter/` | 2 |
| V-35 | The launcher | overview | `/launcher/` | 2 |
| V-36 | Fabric Relay | overview | `/relay/` | 2 |
| V-37 | Okolos | overview | `/okolos/` | 2 |
| V-40 | Safe by design | overview | `/security/` | 3 |
| V-41 | What the cloud gives you | overview | `/cloud/` | 2 |
| V-42 | Free and open source | overview | `/open-source/` | 3 |
| V-43 | What the paid personal plan opens | overview | `/pro/` | 2 |
| V-50 | How an organization runs with agents | film | `/cases/how-an-organization-runs/` | 3 |
