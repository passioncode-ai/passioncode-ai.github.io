Contract: brand-contract v1
# Terminology

## Product terms: always
| Our term | Never write | Applies to |
|---|---|---|
| pool | merged identity | account grouping |
| managed request | session migration | request-boundary switching |
| project rule | project binding, pinned project | the optional folder → account rule in Switchboard 0.4 |
| agent tools / `switchboard mcp` | Switchboard API, agent integration | the local MCP server agents use to read usage and switch accounts |
| open source under AGPL-3.0 | source-available, PolyForm (as the current license), MIT (as the current license) | Switchboard, Project Observatory and Fabric Dashboards, whose source is public (ADR-0092); never Fabric or Fabric Inbox |
| commercial license | paid license, enterprise license, license on request | the license PassionCode.ai offers for use the AGPL does not cover; from contact@passioncode.ai, no price or term |

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

## Banned
| Word or phrase | Why | Use instead |
|---|---|---|
| seamless | unsupported | describe the operation |
| fully autonomous | erases authority | describe explicit scope |
| source-available | superseded by ADR-0092: every repository is open source under AGPL-3.0 or commercial | open source under AGPL-3.0 |
| AI-native work (in the tagline) | the canonical tagline names teams | AI-native teams |

## Glossary
| Term | Meaning |
|---|---|
| PassionCode.ai | The organization; its toolkit is for AI-native teams. PassionCode is the short name (ADR-0090). |
| Switchboard | Short form of Fabric Switchboard, the open-source account manager. |
| Fabric | The CEO AI agent, in early preview; the kernel retains a technical meaning in internal docs. |

| toolkit | The collection of tools; use consistently instead of alternating with toolset. |
| work cycle | The jobs the toolkit is designed around; available account setup is distinct from Fabric’s planned project workflow. |
| build pipeline | Public product availability and current development direction, with no promised dates. |

| Inbox | Short form of Fabric Inbox, the desktop mail client in development. |
| Observatory | Short form of Project Observatory, the local project dashboard. |
| Dashboards | Short form of Fabric Dashboards, the macOS app that shows local agent services in one window. |
| open source | Public source under the GNU AGPL-3.0: use, study, change and share it; a modified version you share or run as a service for others publishes its source. A closed product or an unpublished hosted service needs the commercial license. Released versions keep their earlier license (MIT or PolyForm). |
