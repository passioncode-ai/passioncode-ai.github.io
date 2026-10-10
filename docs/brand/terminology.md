Contract: brand-contract v1
# Terminology

## Product terms: always
| Our term | Never write | Applies to |
|---|---|---|
| pool | merged identity | account grouping |
| managed request | session migration | request-boundary switching |
| project rule | project binding, pinned project | the optional folder → account rule in Switchboard 0.4 |
| agent tools / `switchboard mcp` | Switchboard API, agent integration | the local MCP server agents use to read usage and switch accounts |
| open source under AGPL-3.0 | source-available, PolyForm (as the current license), MIT (as the current license) | every product with a page — Fabric, Fabric Inbox, Switchboard, Project Observatory, Fabric Dashboards — whose source is public (ADR-0092; Fabric and Fabric Inbox since 2026-09-30) |
| commercial license | paid license, enterprise license, license on request | the license PassionCode.ai offers for use the AGPL does not cover; requested through passioncode.ai/business/ (commercial@passioncode.ai as the contact), no price or term |
| agent workplace (for companies) | AI transformation, digital workforce | what /business/ sets up: the tools, the agents and their dashboards for a team's processes |
| estimate | guaranteed savings, ROI | the /business/ arithmetic: hours a week × 4.33 × share × hourly cost, stated as an estimate |

## Entity and tier names: exact spelling
| Name | Wrong forms seen |
|---|---|
| PassionCode.ai | Passion Code AI |
| Fabric Switchboard | Fabric Switcher |
| Fabric Inbox | Fabric Mail |
| Fabric Dashboards | Fabric Dashbords, FabricDashboards |
| Observatory | observatory (in running text), Observatory Dashboard |
| Claude Code | Cloud Code |
| Codex | CodeX |
| Windows | WINDOWS |
| macOS | MacOS |
| Twitter | twitter |
| Sergey | sergey |

## Decided terms (operator, 2026-10-10)

The six terms [narrative.md](narrative.md#6-words-we-own-words-we-ban) left open (D-T1…D-T6), as the operator decided
them on 2026-10-10. W7 applies them to every page in English and Russian; W8 and W9 carry them into the other
languages through the saved Tone of Voice ([voice.md](voice.md)).

| ID | English | Русский | Rule |
|---|---|---|---|
| D-T1 | say it in the reader's words: "what keeps an agent working" (its home, its accounts, its memory, a record of what it did) | «то, что держит агента в работе» | "harness" / «обвязка (harness)» is named and defined once, on /vision/ only |
| D-T2 | evidence | подтверждения | one Russian word everywhere, for an agent's record and for a release's proof alike (the operator chose it over «следы работы»); never «доказательства», «основание», «следы» |
| D-T3 | state | состояние | what is running, what needs you, what it costs; never "health" / «здоровье» |
| D-T4 | the tools (products); your agents (agents); label IN THE TOOLKIT | инструменты; ваши агенты; В НАБОРЕ | "family" / «семья» is not used |
| D-T5 | Fabric, the home for your projects and their agents | Fabric — дом для ваших проектов и их агентов | lead with what it does today; "CEO" once on /fabric/ as direction ([facts.md](facts.md) row *CEO name and status*) |
| D-T6 | skills | навыки | first use on a page «навыки (skills)», then «навыки»; never «скилы», «скиллы» |

## Banned
| Word or phrase | Why | Use instead |
|---|---|---|
| seamless | unsupported | describe the operation |
| fully autonomous | erases authority | describe explicit scope |
| guaranteed savings | a promise the estimate cannot keep | an estimate, measured in the pilot |
| source-available | superseded by ADR-0092: every repository is open source under AGPL-3.0 or commercial | open source under AGPL-3.0 |
| AI-native work (in the tagline) | the canonical tagline names teams | AI-native teams |
| harness / обвязка (outside /vision/) | asks the reader to know our word first (D-T1) | what keeps an agent working |
| health / здоровье (of agents or services) | D-T3 | state / состояние |
| family / семья (for tools or agents) | one word for two things (D-T4) | the tools / инструменты; your agents / ваши агенты |
| the CEO AI agent / ИИ-агент в роли CEO (outside /fabric/) | the conversation does not reply yet (D-T5) | Fabric, the home for your projects and their agents |
| доказательства, основание, следы работы (for evidence) | four Russian words for one thing (D-T2) | подтверждения |
| скилы, скиллы | a calque (D-T6) | навыки, first use «навыки (skills)» |
| rot / гниют | blunt in translation ([narrative §6](narrative.md#6-words-we-own-words-we-ban)) | fall apart / разваливаются |

## Glossary
| Term | Meaning |
|---|---|
| PassionCode.ai | The organization; its toolkit is for AI-native teams. PassionCode is the short name (ADR-0090). |
| Switchboard | Short form of Fabric Switchboard, the open-source account manager. |
| Fabric | The home for your projects and their agents, in early preview (D-T5, 2026-10-10). "CEO" appears once, on /fabric/, as the direction ("we are building it to act as the CEO of your agents"); no other page calls Fabric "the CEO AI agent". The kernel retains a technical meaning in internal docs. |

| toolkit | The collection of tools; use consistently instead of alternating with toolset. |
| work cycle | The jobs the toolkit is designed around; available account setup is distinct from Fabric’s planned project workflow. |
| build pipeline | Public product availability and current development direction, with no promised dates. |

| Inbox | Short form of Fabric Inbox, Fabric's mail tool: a desktop mail client in development preview for macOS. |
| Observatory | Short form of Project Observatory, the local project dashboard. |
| Dashboards | Short form of Fabric Dashboards, the macOS app that shows local agent services in one window. |
| open source | Public source under the GNU AGPL-3.0: use, study, change and share it; a modified version you share or run as a service for others publishes its source. A closed product or an unpublished hosted service needs the commercial license. Released versions keep their earlier license (MIT or PolyForm). |

| agent workplace | A composable setup of independent tools, agent skills and public protocols; not a claim that Fabric’s complete coordination loop has shipped. |
| PassionCode.ai launcher | CLI that installs the listed skills and plugins, not a desktop application bundle. |
| Fabric Agent Adapter | Kits, skills and conformance probe for making a service or agent compatible with Fabric. |
| harness | Everything around a model that makes an agent dependable over time: where it works, its tools and accounts, its memory, its checks and the record of what it did. Named and defined **once, on /vision/ only** (D-T1, 2026-10-10), where the labs' use of the word is linked (`/vision/#harness`). Every other page says it in the reader's words: "what keeps an agent working: its home, its accounts, its memory and a record of what it did". Russian on /vision/: «обвязка» with «(harness)» once; nowhere else. |
| your agents / the tools | Since 2026-10-10 (D-T4) one word per thing: a person's agents are "your agents" («ваши агенты»); the products are "the tools" («инструменты»); the product pages' label is "IN THE TOOLKIT" («В НАБОРЕ»). "Family" («семья») is no longer used for either. Not "swarm", not "digital workforce". |
| PassionCode for Enterprise | The organization edition, named at offer level only: analytics on agents and processes, control and policy, help employees automate, your cloud or ours. In development, offered on request. No internal codename, architecture or employee-scoring wording in public copy. |
| For organizations | The navigation and section name for /business/ since 2026-10-09 (was "For companies"); the hero door reads "For your organization". |
| available now / direction | The label every stage of the path carries (`AVAILABLE NOW`, `AVAILABLE NOW, IN PART`, `DIRECTION`; Russian «ДОСТУПНО СЕЙЧАС», «ЧАСТИЧНО ДОСТУПНО СЕЙЧАС», «НАПРАВЛЕНИЕ»). A stage without one is not published. |
