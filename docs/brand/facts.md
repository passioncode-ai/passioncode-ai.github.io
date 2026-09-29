Contract: brand-contract v1
# Public facts

| Fact | Value | Source | Checked | Review by | Public |
|---|---|---|---|---|---|
| positioning | PassionCode.ai — A toolkit for AI-native teams. | Operator continuation 2026-09-26; [storytelling brief](../tasks/2026-09-26-site-storytelling.md) | 2026-09-26 | 2026-12-26 | yes |
| CEO name and status | Fabric is the CEO AI agent, an early preview for macOS on Apple silicon; its conversation saves messages but does not reply yet | Operator request 2026-09-29 (a DMG downloadable from the site); Fabric ADR-0057 | 2026-09-29 | 2026-10-29 | yes |
| Fabric release | 0.2.0 early preview; macOS arm64 DMG, Developer ID signed, notarized and stapled; requires Docker and the Supabase CLI | [public release with SHA-256](https://github.com/passioncode-ai/passioncode-ai.github.io/releases/tag/fabric-v0.2.0); [selected manifest](../../fabric/release.json) | 2026-09-29 | 2026-10-29 | yes |
| Switchboard release | 0.3.1-beta.1 | [public release](https://github.com/passioncode-ai/fabric-switchboard/releases/tag/v0.3.1-beta.1); [selected manifest](../../switchboard/release.json) | 2026-09-26 | 2026-10-26 | yes |
| license | MIT | [Switchboard LICENSE](https://github.com/passioncode-ai/fabric-switchboard/blob/main/LICENSE) | 2026-09-26 | 2026-12-26 | yes |
| account features | explicit current capture, Claude Swap import, provider/pool separation, usage windows, opt-in rotation, desktop and CLI | [0.3 implementation source](https://github.com/passioncode-ai/fabric-switchboard/tree/0b415ef6f5c7b8046afe55152a730fd620afab7d) | 2026-09-26 | 2026-10-26 | yes |
| macOS support | macOS 14 or later, Apple silicon + Intel universal archive, Developer ID signed, not notarized | [build receipt](https://github.com/passioncode-ai/fabric-switchboard/blob/b6cde090a62a7a96a2a612ada875a9684e1e3b86/docs/evidence/build-0.3.1-macos-universal.json) | 2026-09-26 | 2026-10-26 | yes |
| Windows support | Windows x64 installer/CLI archive; WebView2; unsigned cross-build, native acceptance not run | [build receipt](https://github.com/passioncode-ai/fabric-switchboard/blob/b6cde090a62a7a96a2a612ada875a9684e1e3b86/docs/evidence/build-0.3.1-windows-x64.json) | 2026-09-26 | 2026-10-26 | yes |
| live acceptance | live provider login and inference not verified | [release evidence](https://github.com/passioncode-ai/fabric-switchboard/blob/9e20a49ad7ef917068c266eff4283180209965dc/docs/evidence/release-0.3.md) | 2026-09-26 | 2026-10-26 | yes |
| design system | 1.1; dark/gold and opt-in light tokens, S, O and Inbox product marks; Fabric runtime not yet migrated | [design system](../../design-system/README.md) | 2026-09-26 | 2026-12-26 | yes |

| author | Sergey; Twitter @sshlg93, https://x.com/sshlg93 | [Public GitHub profile](https://github.com/sshlg) links this Twitter; `gh api user` returned login sshlg and twitter_username sshlg93 | 2026-09-26 | 2026-12-26 | yes |
| source availability | Switchboard, Observatory and website public; Fabric source private, its signed macOS build public | GitHub repository visibility query recorded in [brief](../tasks/2026-09-26-site-storytelling.md) | 2026-09-26 | 2026-10-26 | yes |

| Observatory release | 0.4.0 | [CHANGELOG](https://github.com/passioncode-ai/project-observatory-dashboard/blob/main/CHANGELOG.md) | 2026-09-26 | 2026-10-26 | yes |
| Observatory platforms | macOS and Linux, Python 3.11+ with SQLite extension support | [README](https://github.com/passioncode-ai/project-observatory-dashboard#readme) | 2026-09-26 | 2026-12-26 | yes |
| Observatory languages | dashboard interface English by default, Russian by choice; finding texts English | [CHANGELOG 0.4.0](https://github.com/passioncode-ai/project-observatory-dashboard/blob/main/CHANGELOG.md) | 2026-09-26 | 2026-12-26 | yes |
| Observatory license | MIT | [LICENSE](https://github.com/passioncode-ai/project-observatory-dashboard/blob/main/LICENSE) | 2026-09-26 | 2026-12-26 | yes |
| Observatory scanning limit | known-value scanning cannot find unknown secrets or prove absence | [SECURITY](https://github.com/passioncode-ai/project-observatory-dashboard/blob/main/SECURITY.md) | 2026-09-26 | 2026-12-26 | yes |

| Inbox role and status | Fabric Inbox is a desktop mail client in private development; no public release or signed download | [bounded packet](../tasks/2026-09-26-inbox-site.md), source evidence at d577462572d332c1e7c157504b7dffd9cde00bea | 2026-09-26 | 2026-10-26 | yes |
| Inbox providers | Cloudflare and Gmail implemented in development preview; shared account interface in progress; general IMAP and Outlook planned | [bounded packet and source receipt](../tasks/2026-09-26-inbox-site.md) | 2026-09-26 | 2026-10-26 | yes |

| homepage hero | The agent-agnostic operating system for AI-native teams. | Explicit operator correction 2026-09-27; original `d5c168d:index.html` | 2026-09-27 | 2026-12-27 | yes |
