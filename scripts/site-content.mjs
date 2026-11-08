// SITE-056: the agent templates, guides and blog (operator 2026-11-08), in English, as data. Every other language is
// generated from the pages scripts/build-content-pages.mjs renders from this file (npm run locales, i18n/<code>/).
// Public-safe by rule: a template is named and described in our own words, by the job it does and the outcome; never a
// source agent, an organization or client, a prompt, the code, the stack or a test count (docs/seo/brief-2026-11-08.md,
// "Do not build"). A template is assembled for an organization by our engineer agent; details come on request.

export const PUBLISHED = { iso: '2026-11-08', text: 'November 8, 2026' }

export const FAMILIES = [
  { id: 'run', name: 'Run the organization', anchor: 'run', text: 'Agents that keep the company’s work and facts in order, and its machines and messages running.' },
  { id: 'grow', name: 'Sell and grow', anchor: 'grow', text: 'Agents that find buyers and grow the products by the numbers.' },
  { id: 'people', name: 'Talk to people', anchor: 'people', text: 'Agents that answer, assist and listen to customers and the public, and speak in your voice.' },
  { id: 'make', name: 'Make and check', anchor: 'make', text: 'Agents that make media, find things out and check the live product.' }
]

// lead: one or two sentences, used as the page's lead, its meta description and its card on /agents/ (at most 155
// characters, scripts/check-site.mjs). does: what it does, three items. outcomes: what an organization gets, three items.
export const TEMPLATES = [
  {
    slug: 'company-assessment', family: 'run', name: 'Company assessment agent', title: 'Company assessment agent template',
    lead: 'Reads how your company really works from the systems it already uses, and shows where time goes and which work agents should take first.',
    who: 'For founders and leaders who want a true picture of their processes before they change them.',
    does: [
      ['Maps the work', 'Builds a map of the kinds of tasks, how long each takes and how work moves between people and systems.'],
      ['Finds the waits', 'Shows where work stops and for how long, and where the written process differs from the real one.'],
      ['Plans the redesign', 'Proposes which kinds of work an agent takes, where a person stays, and how many hours that frees.']
    ],
    outcomes: ['A process map built from evidence, not from interviews alone', 'A ranked list of processes for agents, each with its estimate', 'Readings about processes, never scores of people']
  },
  {
    slug: 'organization-administrator', family: 'run', name: 'Organization administrator agent', title: 'Organization administrator agent template',
    lead: 'Keeps the team’s rhythm where people already talk: morning lists, stale tasks, blockers and requests routed to the right owner.',
    who: 'For teams that lose time chasing status and asking who owns what.',
    does: [
      ['Keeps the rhythm', 'Sends the morning list, reminds owners of urgent and stale tasks within working hours, and keeps a list of blockers.'],
      ['Routes requests', 'Takes any problem a person brings and hands it to the person or agent who owns it.'],
      ['Keeps the roster', 'Runs each joiner and each leaver as one checklist, and gives a person access to the organization’s agents.']
    ],
    outcomes: ['Fewer meetings about status', 'An owner for every request', 'A team roster that stays current']
  },
  {
    slug: 'data-room', family: 'run', name: 'Data room agent', title: 'Data room agent template',
    lead: 'Keeps the organization’s facts in one place, each with its source and version, and lets people and agents read only what their access opens.',
    who: 'For organizations whose numbers live in many spreadsheets and disagree with each other.',
    does: [
      ['One book of facts', 'Finance, metrics, team, product and any block you add, each fact with where it came from.'],
      ['Access by level', 'People and agents read the blocks their key opens, and nothing about one person leaves.'],
      ['Never invents a number', 'A missing value stays missing: it is never filled with a guess or a zero.']
    ],
    outcomes: ['One answer when someone asks for a number', 'Agents that quote facts with their sources', 'Reports for the board and investors from one place']
  },
  {
    slug: 'host-operations', family: 'run', name: 'Machine operations agent', title: 'Machine operations agent template',
    lead: 'Keeps the always-on machine your agents run on in order: its spaces, access, keys, spend and the apps that must stay up.',
    who: 'For organizations that run their agents on their own computer or server.',
    does: [
      ['Declared state', 'Every space, service and key is described once, and the machine is checked against that description.'],
      ['Safe starts and stops', 'Wakes, stops and restarts the apps and services agents rely on, with a check before each action.'],
      ['A receipt per change', 'Every change leaves a record of what was done and why, so the machine can be rebuilt.']
    ],
    outcomes: ['A machine you can rebuild from its description', 'Spend per space in view', 'Fewer surprises at night']
  },
  {
    slug: 'messenger-gateway', family: 'run', name: 'Messenger gateway agent', title: 'Messenger gateway agent template',
    lead: 'Gives your organization one path to people through a messenger: every agent reads and sends through one door, with its own permissions.',
    who: 'For organizations whose agents talk to people on Telegram and should not each hold their own account.',
    does: [
      ['One home for identities', 'The messenger accounts and bots live in one service, and no other agent holds them.'],
      ['Permissions per agent', 'Each agent gets only what it needs: reading, searching, sending or managing a group.'],
      ['A person approves sends', 'Messages wait for a person’s approval unless the owner has set a standing rule.']
    ],
    outcomes: ['No bot tokens scattered across projects', 'A record of every message sent', 'One switch that stops all sending']
  },
  {
    slug: 'sales-and-leads', family: 'grow', name: 'Sales and leads agent', title: 'Sales and leads agent template',
    lead: 'Turns people who want to buy into qualified leads, each with an owner, a next step and a follow-up, from every channel you have.',
    who: 'For teams that get requests from a site, chats, mail and messengers and lose some of them on the way.',
    does: [
      ['Collects requests', 'A concierge on your site takes a request with no person online and never invents a price.'],
      ['Keeps one pipeline', 'Every request lands in one pipeline with a score, a stage and an owner.'],
      ['Finds missed follow-ups', 'Spots warm leads and waiting buyers in the conversations your team already has.']
    ],
    outcomes: ['No request lost between channels', 'A next step on every lead', 'Prices that stay a person’s decision']
  },
  {
    slug: 'marketing-analyst', family: 'grow', name: 'Marketing analyst agent', title: 'Marketing analyst agent template',
    lead: 'Reads your ad accounts, joins spend with the money your product actually earns, and turns creatives into hypotheses you can test.',
    who: 'For teams that buy traffic and want to know which spend pays back.',
    does: [
      ['Spend against revenue', 'Joins what each campaign cost with what its users paid, from your own records.'],
      ['Creatives as hypotheses', 'Takes each creative apart into claims that a test can confirm or reject.'],
      ['Says when it does not know', 'Where the data does not support a number, it says so instead of guessing.']
    ],
    outcomes: ['A portfolio of hypotheses, tests and briefs', 'Budget changes only within limits you set', 'Reports that show their data']
  },
  {
    slug: 'growth-analytics', family: 'grow', name: 'Growth analytics agent', title: 'Growth analytics agent template',
    lead: 'Runs your product numbers and experiments: events, funnels, remote configuration and A/B tests, each result fixed before anyone reads it.',
    who: 'For product teams that want experiments they can trust and a clear read of what changed.',
    does: [
      ['Events and funnels', 'Counts what people do in your product and shows where they drop off.'],
      ['Experiments by the rules', 'Each test is registered before it starts, watched for safety and read once its sample is complete.'],
      ['A person approves changes', 'Every change the agent proposes waits in an inbox of drafts for a person.']
    ],
    outcomes: ['Experiments with a decision rule written in advance', 'Every product’s funnels in one place', 'Fewer arguments about what a number means']
  },
  {
    slug: 'search-traffic', family: 'grow', name: 'Search traffic agent', title: 'Search traffic (SEO) agent template',
    lead: 'Collects search, ranking and crawl data every day and tells you which pages are losing ground, why, and what to fix first.',
    who: 'For owners of one large site or of many sites who depend on search traffic.',
    does: [
      ['A daily record', 'Keeps search, analytics, ranking and crawl data as a record that only grows.'],
      ['Finds the losses', 'Shows which sites, countries, groups of queries and pages lose traffic, and what changed around them.'],
      ['A measurement behind every line', 'Each recommendation carries the number it came from, so you can check it.']
    ],
    outcomes: ['A list of fixes in order of impact', 'What a release did to traffic', 'Recommendations you can verify']
  },
  {
    slug: 'app-store-publisher', family: 'grow', name: 'App store publisher agent', title: 'App store publisher agent template',
    lead: 'Researches store search, has your listings written and localized, checks them against store rules, and publishes only what a person approved.',
    who: 'For teams that publish apps on the App Store, Google Play or Meta Horizon.',
    does: [
      ['Keywords with demand', 'Places keywords across fields, languages and storefronts by the demand behind them.'],
      ['Listings in every language', 'Has listing copy written, checked and localized, and orders screenshots and store graphics.'],
      ['Publishing in two steps', 'Shows the exact change first and applies only that change, after a person approves it.']
    ],
    outcomes: ['Listings checked before review', 'Reviews answered under your policy', 'Rankings tracked every day']
  },
  {
    slug: 'brand-and-content', family: 'people', name: 'Brand and content agent', title: 'Brand and content agent template',
    lead: 'Runs your brand’s public voice: plans what to say, drafts it, checks every draft for facts and tone, and lets nothing out without approval.',
    who: 'For teams that publish often and want every post to sound like them and say only what is true.',
    does: [
      ['A plan with sources', 'Keeps a content plan whose every number has a source, and measures it every day.'],
      ['Drafts in your voice', 'Writes in your saved tone of voice, in every language you publish in.'],
      ['One approved outbox', 'Every post passes a check for facts, privacy and voice, then waits for approval.']
    ],
    outcomes: ['One voice across every channel', 'No claim in public without its source', 'Translations that keep the meaning']
  },
  {
    slug: 'support-answerer', family: 'people', name: 'Support agent', title: 'Support agent template',
    lead: 'Answers your users from a knowledge base it can check, in their language, and hands anyone it cannot help to a person.',
    who: 'For teams with a support inbox, a community chat or a help bot that is never fully covered.',
    does: [
      ['Checked answers', 'Every draft is checked against your knowledge base and by a second model before it is sent.'],
      ['Nobody left waiting', 'A question it cannot answer becomes a hand-off, a card for your staff and a follow-up.'],
      ['Learns from your people', 'An answer a person gives goes back into the knowledge base.']
    ],
    outcomes: ['Faster first answers in every language', 'Gaps in your knowledge base you can see', 'Quality measured every day']
  },
  {
    slug: 'chat-assistant', family: 'people', name: 'Conversational assistant', title: 'Conversational assistant agent template',
    lead: 'An assistant people talk to in a messenger, an app or on a device, with memory, tools, voice and limits on what it may spend.',
    who: 'For products that offer an assistant as a feature, and for teams that want one in their own chats.',
    does: [
      ['Conversations with memory', 'Keeps the conversation and a long-term memory, and streams its answers.'],
      ['Tools and voice', 'Uses tools, listens and speaks, and moderates what comes in and what goes out.'],
      ['Metered', 'Tracks each user’s limits, credits or subscription, and its own spend.']
    ],
    outcomes: ['An assistant that remembers the context', 'Costs under control for each user', 'Careful handling of sensitive moments']
  },
  {
    slug: 'telegram-product-bot', family: 'people', name: 'Telegram product bot', title: 'Telegram product bot template',
    lead: 'A Telegram bot that is the product itself: people press buttons, pay and receive what they bought, reliably and within Telegram’s limits.',
    who: 'For teams that sell or deliver a service inside Telegram.',
    does: [
      ['Every update once', 'Handles each update exactly once and keeps its state across restarts.'],
      ['Payments confirmed', 'Grants access only when the payment platform confirms the payment, never on a redirect alone.'],
      ['A view for your team', 'Gives your team a place to see and manage what the bot is doing.']
    ],
    outcomes: ['No double charges and no lost orders', 'Every arrival traced to its source', 'A bot in every language you sell in']
  },
  {
    slug: 'customer-listening', family: 'people', name: 'Customer listening agent', title: 'Customer listening agent template',
    lead: 'Gathers what people say about your product in reviews, chats and mentions, and ranks it into problems, questions and risks.',
    who: 'For teams that want one picture of what customers say, without reading every channel.',
    does: [
      ['One picture', 'Brings store reviews, support chats, community and public mentions into one ranked view.'],
      ['Alerts on change', 'Tells the right people when a problem grows or a new risk appears.'],
      ['Privacy first', 'Keeps summaries, labels and counts rather than people’s own words where the rules forbid them.']
    ],
    outcomes: ['A weekly picture of what customers say', 'Problems ranked by how many people meet them', 'Answering agents that learn from it']
  },
  {
    slug: 'media-production', family: 'make', name: 'Media production agent', title: 'Media production agent template',
    lead: 'Makes the videos, images, voice and music your teams and agents ask for, from launch films to polished screen demos.',
    who: 'For teams that need media often and want it made the same way every time.',
    does: [
      ['Media to order', 'Takes requests from people or other agents for video, images, 3D, voice, music and store media.'],
      ['Films from your product', 'Builds explainers, launch films and demos from your own product, site or recordings.'],
      ['One spending guard', 'Every job runs within a budget and passes a check before delivery.']
    ],
    outcomes: ['Media on request without a studio', 'The same quality from job to job', 'Costs known before a job starts']
  },
  {
    slug: 'research', family: 'make', name: 'Research agent', title: 'Research agent template',
    lead: 'Finds things out for your people and agents, cites its sources, and says exactly what it could not confirm.',
    who: 'For teams that make decisions on market, competitor or technical questions.',
    does: [
      ['Quick and deep', 'Answers a quick question, or runs a deep investigation with a plan and verified quotes.'],
      ['A watch on a topic', 'Follows a topic on a schedule and reports only what is new.'],
      ['Paid data approved', 'Asks a person before it spends money on paid data.']
    ],
    outcomes: ['Reports where every claim has a source', 'A clear line between what is known and what is not', 'Research your other agents can order']
  },
  {
    slug: 'web-quality-monitor', family: 'make', name: 'Web quality monitor', title: 'Web quality monitor agent template',
    lead: 'Looks at your live product and says, with evidence, what is broken right now: pages, scenarios, checkout and known vulnerabilities.',
    who: 'For teams that ship often and want to find problems before their users report them.',
    does: [
      ['Scenarios in a browser', 'Runs a scenario written in plain words and proves the result.'],
      ['Pages and checkouts', 'Walks every page looking for errors and checks that every payment form opens.'],
      ['Incidents, not noise', 'Turns error and metric alerts into incidents without duplicates, and starts a repair.']
    ],
    outcomes: ['Bugs found before users find them', 'Reported bugs checked against production', 'Known vulnerabilities matched to what you ship']
  }
]

// How a template becomes an agent: the same three steps on /agents/ and on every template page.
export const ASSEMBLY = [
  ['We start from your processes', 'You tell us what the agent should do. We look at the work it takes over, the systems it needs and who approves what.'],
  ['Our engineer agent assembles it', 'It takes the template that fits, connects your systems with the access you grant, and sets your rules and spending limits.'],
  ['It runs where you choose', 'On your machines or in your own cloud, with your keys. Each agent shows its state and spend, and a person approves what needs a person.']
]

// Guides and posts: the body is English HTML written for the page; one h2 per section. `question` is the page's one
// question (docs/seo/brief-2026-11-08.md).
export const GUIDES = [
  {
    slug: 'start-agent-workplace',
    title: 'Start your agent workplace in 20 minutes | PassionCode.ai',
    name: 'Start your agent workplace in 20 minutes',
    description: 'What happens, step by step, when you set up PassionCode on your computer: what you need, the one command, your first agent and how to check it.',
    lead: 'What happens at each step of setting up the tools on your own computer, from the one command to your first agent and the next one.',
    body: `
 <h2>What you need</h2>
 <p>A computer with Node.js 18 or newer, and Claude Code or Codex. Fabric, the home for your projects and their agents, is an early preview and also needs Docker and the Supabase CLI on every system. Everything is open source and free for personal use.</p>
 <h2>Run one command</h2>
 <p>On macOS, one command installs the tools you choose from their signed releases, connects their MCP servers to your coding agent and adds the skills. On Windows and Linux, download the apps from their pages first, then run the same command for the skills and the MCP servers. It installs nothing whose signature or checksum fails. You can also hand the job to your coding agent: <a href="/start/#setup">the command and a prompt for your coding agent are on the Get started page</a>.</p>
 <h2>Restart your coding agent and check</h2>
 <p>Restart Claude Code or Codex so it picks up the new tools. Run the same command again, or <code>doctor</code> to check without changing anything: it tells you what is set up, what is missing and the steps only you can take, such as signing in.</p>
 <h2>Create or adapt your first agent</h2>
 <p>Ask your coding agent for what you need, in plain words, or start from Fabric’s Create and Adapt actions. The Fabric Agent Adapter skill asks its questions first and shows its plan before it changes anything. You get an agent with a contract, a dashboard and tests.</p>
 <h2>See it run</h2>
 <p>Fabric Dashboards shows every local agent service in one window: what it is doing and what it spends. Your coding agent can start, stop and open them for you.</p>
 <h2>Add the next agent to the same project</h2>
 <p>Build the next agent the same way and give it the same project in Fabric. Agents connected to Fabric share one project’s board, memory and hand-offs, so one picks up where the other stopped.</p>
 <h2>If something does not work</h2>
 <p>Run the command again: on a computer that is already set up, it checks everything, repairs what is wrong and shows what changed. Each product page lists its requirements and limits.</p>`,
    cta: { href: '/start/#setup', label: 'Set it up now', cta: 'start' }
  },
  {
    slug: 'free-assessment',
    title: 'How the free one-week assessment works | PassionCode.ai',
    name: 'How the free one-week assessment works',
    description: 'One agent reads how your company works for a week, then you get a map of your processes and an offer: which work agents take first and what it costs.',
    lead: 'One agent reads how your company works for a week, with read-only access. At the end you get a map of how work really runs and a ready offer for what agents should take over first.',
    body: `
 <p class="availability">ON REQUEST</p>
 <h2>Before the week</h2>
 <p>You answer four questions: your goal, the size of your team, the systems you use and what hurts most. You give read-only access to those systems, one link each. Our engineer agent sets the assessment agent up in a space of its own for your organization, or on your own machine if no data should leave it. This takes about twenty minutes of your time.</p>
 <h2>During the week</h2>
 <p>The agent connects to your trackers, repositories, documents, team chats, mail and support, and reads the last 90 days. Then it follows the work as it happens: what was planned and what happened, where work waits and for how long. If the data leaves gaps, it may ask your team a few short questions in the channel they already use, anonymous by default. Nothing changes in your systems.</p>
 <h2>What you get on day seven</h2>
 <ul>
  <li>A map of your processes: the kinds of tasks, how much time each takes and how work moves between people and systems.</li>
  <li>Plan against fact, the blockers and waits, and where the documented process differs from the real one.</li>
  <li>The offer: the processes agents should take over first, the hours each frees, the agent template that does it, and a pilot on one process to prove it.</li>
 </ul>
 <p>We go through it with you in a 30-minute call, and you keep it as a page.</p>
 <h2>About people, never scores</h2>
 <p>The assessment reads processes, not people. It reports totals for groups, never a score for a person, and what stays with people (direction, control and expertise) is part of the offer.</p>
 <h2>After the week</h2>
 <p>If you go ahead, the pilot starts in the same place. If not, access is revoked, the data is deleted, and you receive a confirmation that it was.</p>`,
    cta: { href: '/business/#request', label: 'Ask for an assessment', cta: 'business' }
  },
  {
    slug: 'templates-to-agents',
    title: 'How agent templates become your agents | PassionCode.ai',
    name: 'How agent templates become your agents',
    description: 'What an agent template is, how our engineer agent assembles it for your organization, where the agent runs and what stays yours.',
    lead: 'We do not build your agents from zero. Each one starts from a template that holds what we learned running agents of that kind, and is assembled for your processes.',
    body: `
 <h2>What a template is</h2>
 <p>A template describes one kind of agent: the job it does, the rules it keeps, what it must never do and when it calls a person, with tested code behind it. It collects what the agents of that kind we run in our own work have learned. <a href="/agents/">See the agent templates</a>.</p>
 <h2>From your request to an agent</h2>
 <p>You tell us what agents should do. Our engineer agent picks the template that fits, connects your systems with the access you grant, sets your rules and spending limits, and checks the agent on your own processes before it starts work.</p>
 <h2>Where it runs</h2>
 <p>On your machines or in your own cloud, with your keys. Each agent shows its state and what it spends, and a person approves what needs a person: a payment, a release to real users, a message to someone outside.</p>
 <h2>What stays yours</h2>
 <p>Your data, your keys and your agents. The template library stays ours: you receive the assembled agents, not the library, and we share the details of a template when we discuss your request.</p>
 <h2>Agents that get better</h2>
 <p>When we improve a template, the improvement can reach your agent with the template’s next release, after the checks your agent already passes.</p>`,
    cta: { href: '/business/#request', label: 'Create your agent', cta: 'business' }
  }
]

export const POSTS = [
  {
    slug: 'why-person-shaped-processes-stall',
    title: 'Why processes built around people stall | PassionCode.ai',
    name: 'Why processes built around people stall when you add AI',
    description: 'Adding AI assistants to a process built around people keeps the person as the bottleneck. What changes when agents run the process and people steer it.',
    lead: 'Most companies add AI by giving each person an assistant. The process stays the same, and so does its bottleneck.',
    body: `
 <h2>The person is still the bottleneck</h2>
 <p>An assistant drafts and analyzes, then hands the result back to a person. Ten assistants hand back ten results. The work waits until that person has time to read them.</p>
 <h2>Meetings reconcile what the assistants made</h2>
 <p>Two people with their own assistants produce more than either can read. They meet to agree on it, and the process stays exactly as it was.</p>
 <h2>Everyone builds their own agents</h2>
 <p>No shared rules, no shared memory, keys pasted wherever someone works, and no record of what an agent did or what it cost. It adds work instead of removing it.</p>
 <p>Most companies now experiment with agents, and few run them across a whole function (<a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai">McKinsey, The State of AI, November 2025</a>). Gartner expects over 40% of agentic AI projects to be canceled by the end of 2027 (<a href="https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027">Gartner, June 2025</a>).</p>
 <h2>What changes</h2>
 <p>The process itself has to move. When work moves between agents instead of between people, an agent takes the task and hands it to the next agent, and they settle it on one board with the record. People keep what only people can do: direction, control and expertise. More work then means more agents, not more people.</p>
 <p><a href="/blog/what-is-an-ai-native-organization/">What an AI-native organization is</a> · <a href="/vision/">Read the vision</a></p>`,
    cta: { href: '/business/#request', label: 'Bring your organization', cta: 'business' }
  },
  {
    slug: 'what-is-an-ai-native-organization',
    title: 'What an AI-native organization is | PassionCode.ai',
    name: 'What an AI-native organization is',
    description: 'An AI-native organization is a company where agents run the processes and people steer them. What people keep, what one system means, how to start.',
    lead: 'An AI-native organization is a company where agents run the processes and people steer them.',
    body: `
 <h2>Work moves between agents</h2>
 <p>Today a person takes a task, holds it and hands it on, and meetings reconcile what everyone produced. In an AI-native company an agent takes the task and hands it to the next agent; agents settle it on one board, with the record.</p>
 <h2>What people keep</h2>
 <ul>
  <li><strong>Direction</strong>: what to build and why, the goals, the priorities and the taste.</li>
  <li><strong>Control</strong>: approving what needs a person, such as a payment, a release to real users or a message to someone outside.</li>
  <li><strong>Expertise</strong>: knowing the market and the craft, and teaching the agents to do the work the way it should be done.</li>
 </ul>
 <h2>One system, not many assistants</h2>
 <p>The chaos of agents that everyone builds their own way ends when every agent shares one contract, one vault for keys and one record of what it did and what it spent. A person cannot follow hundreds of agent tasks; one agent can. Fabric keeps the board where agents ask each other for work, and keeping the board, routing the work and waking the owner are in preview today.</p>
 <h2>What it is not</h2>
 <p>It is not one assistant per person, and it is not a company without people. Agents take the work; people decide what it is for and approve what needs them. It is not surveillance either: the analytics are about agents and the outcomes of processes, and they never rank people.</p>
 <h2>Where the agents and the data live</h2>
 <p>On the organization’s own machines or in its own cloud, with its own keys. Each agent shows what it does and what it spends, so finance and engineering read one record of what agents cost and what they delivered.</p>
 <h2>How to start</h2>
 <p>Start on one machine: one command sets up the tools for free. For a company, it starts with a look at how the work runs today, and the first agents are assembled from <a href="/agents/">our agent templates</a>. <a href="/guides/free-assessment/">How the free one-week assessment works</a>.</p>`,
    cta: { href: '/business/#request', label: 'Bring your organization', cta: 'business' }
  }
]
