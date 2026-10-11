Contract: brand-contract v1

<!-- Generated from business/index.html; edit source and rerun scripts/extract-public-copy.py. -->

PassionCode for Enterprise | AI agent workplace for organizations | PassionCode.ai

PassionCode for Enterprise makes an organization AI-native: machines onboarded, agents rolled out and routed between them, model keys kept on each machine, what each agent cost and what it delivered, administration and custom signed builds. Your data stays on your machines or your own cloud. Designed for 1 to 1000 people.

Skip to content

PassionCode

.ai

Vision

For you

For organizations

The tools

About

English

Русский

Deutsch

Français

Polski

한국어

Español

Português (Brasil)

简体中文

日本語

Get the tools

↓

Enterprise · for organizations

# Make your organization AI-native

An agent that lives on one person’s laptop helps one person. We bring agents onto your organization’s machines, connect them and show what each one cost and what it delivered, on open-source tools, with your data on your machines or in your own cloud

Estimate and request

↓

What we set up

↓

Reply within two business days Designed for 1 to 1000 people · the estimate comes before any contract

01Tell usa few lines, or your agent asks

02Estimatehours and money, with the formula

03Pilotone process, measured

04Rolloutworkplaces per role

WHO WE ARE

## We built it for our own teams first

PassionCode has two co-founders, and we both run teams: Sergey Sheleg, co-founder and CPO of Nicegram, and Serge Khurs, co-founder and CTO of Teslasuit.

We built this setup for ourselves, and it runs our own work today. Now we bring it to your organization: we connect it to your systems and help you bring in agents that run your processes. How we got here →

01 / PASSIONCODE FOR ENTERPRISE

## What we set up

## for your organization

PassionCode for Enterprise is in development: pilots run on the open-source tools today, and the edition is offered on request.

Machines join the organizationEach computer is onboarded once, with its agents, accounts and rules.

Agents rolled outThe agents a role needs reach the machines of the people in it.

Routing between machinesAn agent on one machine hands work to an agent on another.

Model access stays localEach machine’s own local agent calls the models, so keys never leave the machine that holds them.

Activity and usage analyticsWhat ran, on which process, what it used and what it cost.

AdministrationWhat each agent may do and which accounts and data it may reach, set once for the organization.

Custom builds, signed by usYour own build of the tools, signed by PassionCode.ai.

Your data stays on your machines or in your own cloud. Read the vision

02 / FOR FINANCE AND ENGINEERING

## One view of what agents cost

## and what they delivered

Finance and engineering (the CFO and the CTO or CIO) look at agents from two sides: engineering wants more of them, finance wants every dollar spent on them explained. Both are asking one question: what did each agent cost, and what did it deliver? That is the ROI of each agent. When the answer is a record both of them open, adding an agent becomes a decision with numbers behind it.

01

AVAILABLE NOW

### Does the work run through agents, or beside them?

The estimate starts from how each process runs today: by hand, with scripts, with a chat assistant now and then, or with agents already doing parts of it. The pilot then measures one process against your own baseline.

The estimate

02

AVAILABLE NOW

### Which agents are worth what they cost?

On each Mac, Fabric Dashboards shows what every agent spent today, in 7 and in 30 days, by model and against its own budget, from the agent’s own usage report; a cost nobody knows reads “unknown”, never $0. Switchboard shows how much of each Claude Code or Codex account’s usage limit is used and when it resets, so subscriptions are read apart from calls paid per use. Observatory shows what changed in each project, with the evidence.

Fabric Dashboards

03

DIRECTION

### Which setups work best, and how do they reach the rest?

Spend and results joined per project and workflow. Limits finance sets once, kept as a record agents check before they spend; a request above a limit is filed as a record while the work goes on. A setup that works, rolled out as a workplace per role.

Estimate and request

About agents and workflows, never a ranking of people.

03 / THE ESTIMATE

## The estimate is arithmetic

## you can check

Hours your team spends on the processes each month, times the share agents can plausibly take over, times what an hour costs you.

hours a week × 4.33×share agents take×loaded hourly cost

Share agents can take over, by how the work runs today

Today

Share

Mostly manual

25–50%

Scripts and integrations

20–40%

Chat assistants used ad hoc

15–35%

Agents already run parts of it

10–25%

Example: 40 hours a week of mostly manual work at $50 an hour is 173 hours a month; agents taking 25–50% of it is 43–87 hours, or $2,150–4,350 a month.

An estimate, not a promise. The pilot measures the real number against your own baseline before anything is rolled out.

04 / REQUEST

## Tell us what agents

## should do for you

Two short ways. Your coding agent can ask you a few questions and send the request after you say yes, or you write a few lines yourself. We reply within two business days.

### Let your coding agent ask

Copy this prompt into Claude Code, Codex or another coding agent. It asks you a few questions, one at a time, shows you the request and sends it only after you say yes.

Help me send a request to PassionCode.ai, which brings AI agents onto an organization’s machines and shows what each agent cost and what it delivered. Talk to me in my language. Ask me these questions one at a time and wait for each answer; I may skip any of the first four.

How many people work in our organization?

Which AI agents and tools do we use now?

What do we want most: to see what our agents cost and deliver, to automate recurring operations, to build agents for our own processes, to adapt our existing agents or projects, a commercial license, to have PassionCode.ai host and run it, or to onboard and train our team?

When do we want to start?

In a few sentences, what should agents do for us?

Which work email should PassionCode.ai reply to?

Look at this computer’s setup, such as which agents and tools are installed, only if you ask me first and I say yes. Never put code, secrets, keys, file paths, customer data or the names of other companies or people into the request: describe the work in general words.

Then write the request as JSON. Keep the keys exactly as shown, use only the listed values that match my answers, and leave out what I skipped:

{ "id": "a new random UUID v4: make it once, reuse it if you send again", "lang": "the language we talk in: en, ru, de, fr, es, pt-br, pl, ko, ja or zh-hans", "contact": { "email": "the work email", "message": "what agents should do, in my words, up to 4000 characters" }, "goals": ["one of: cost_and_results, automate_operations, custom_agents, convert_agents, commercial_license, managed_hosting, team_onboarding"], "company": { "size": "one of: 1_10, 11_50, 51_200, 201_1000, 1000_plus" }, "processes": { "tools": ["any of: claude_code, codex, cursor, chatgpt, other_agents, none"] }, "budget": { "timeline": "one of: asap, this_quarter, next_quarter, exploring" }, "source": { "channel": "agent-prompt", "agent": "your own name, such as Claude Code or Codex" } }

Get a form token, wait four seconds, add the token to the JSON as “form_token”, save it as request.json and check it. The check stores and sends nothing:

curl -s https://passioncode.ai/api/leads/token sleep 4 curl -s -X POST 'https://passioncode.ai/api/leads?dry_run=1' -H 'Content-Type: application/json' --data @request.json

If the answer lists “issues”, fix them with me. When it says “valid”, show me the final JSON and ask: “Send this to PassionCode.ai?” Send it only after I say yes, once, with the same file:

curl -s -X POST https://passioncode.ai/api/leads -H 'Content-Type: application/json' --data @request.json

Tell me the answer. “received” or “duplicate” means it arrived: give me the “id”; a receipt email follows. Any other answer: show me its “message” and send nothing more. Only if the request got no answer at all, try once more with the same file, never with a new “id”. How PassionCode.ai keeps the request: https://passioncode.ai/privacy/

The same prompt as plain text, for an agent to fetch: passioncode.ai/business/agent-request.txt

### Or write it yourself

Leave this field empty

What should agents do for your organization?

Work email

Main goal

optional

Choose…

See what our agents cost and deliver

Automate recurring operations

Build agents for our own processes

Adapt our existing agents or projects

A commercial license for a closed product or service

Have PassionCode.ai host and run it

Onboard and train our team

We keep what you send only to reply, as the privacy notice describes.

Send request →

Prefer email? Write to commercial@passioncode.ai.

05 / QUESTIONS

## Before you ask

What does it cost?

The tools are free and open source. You pay for the work we do for you — mapping, building, hosting, support — and a commercial license where you need one. The proposal names the price after we understand the processes; there is no fixed package.

When do we need a commercial license?

The tools are under the GNU AGPL-3.0. Internal use, and changes you publish under the same license, need nothing. A closed product that includes them, or a modified hosted service whose source you do not publish, needs a commercial license.

Is this a way to watch people?

No. The analytics are about agents and workflows: what each agent cost and what it delivered. They never rank people.

PassionCode

.ai

From vibe coding to passion coding

Get started

Vision

For organizations

Switchboard

Observatory

Inbox

Dashboards

Fabric

GitHub & source

About

Design system

Privacy

commercial@passioncode.ai

X

↗
