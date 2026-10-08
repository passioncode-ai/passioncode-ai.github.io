# Public flows

## FLW-01 — Discover and download
Homepage → primary Explore the tools → six-entry product directory; secondary download → Switchboard detail/download → read OS, format and limits → Before you open it (official CLI, OS, Windows limits) → macOS or Windows link → GitHub archive → compare with the SHA-256 on the page. From 0.4: For agents → connect command or launch from Switchboard. Inbox: Download Inbox → Inbox download → DMG → compare with the SHA-256 on the page → For agents (key, `claude mcp add --transport http …/mcp`). Alternatives: release notes/checksums, installation guide, all releases; unavailable network or asset → retry or use releases/support. The site does not observe OS installation.

## FLW-02 — Inspect and reuse
Homepage/detail → source repository and its license (open source under AGPL-3.0, or a commercial license from contact@passioncode.ai; released versions keep MIT or PolyForm, ADR-0092); footer → design system → canonical CSS/source. Fabric and Fabric Inbox have public source since 2026-09-30; their pages offer the signed builds through `/fabric/download/macos` and `/inbox/download/macos`, the release notes and the source link.

## FLW-03 — Understand and follow
Homepage directory → independent tools → concrete Observatory-to-Dashboards connection / Fabric early preview → individual product page → Fabric requirements and download. Build pipeline explains status without dates or implied integration. Fabric detail → homepage About → verified author Twitter. Alternative: inspect public code/release notes from the Source section (Fabric, Fabric Inbox, Switchboard, Observatory, Fabric Dashboards); no private repository link or sign-up barrier. Mobile navigation exposes the same destinations.

Fabric agents branch of FLW-03: Fabric "Before you open it" → which coding agents Fabric works with → /fabric/agents/ → level tables with official sites → Download for macOS (Fabric #download) or an agent's own site (SCN-018, SCR-12).

Vision branch of FLW-03: header Vision, the home path note or /business/ → /vision/ → sources → harness → principles → the path with labelled stages → today and direction → trust → For you, free (/start/) or For your organization (/business/) (SCN-020, SCR-13).

Dashboards branch of FLW-01: directory → /dashboards/ → requirements and separately installed service note → `/dashboards/download/macos` (the current release, SHA-256 beside it) → release notes. MCP setup is visible on the same page. Every version and checksum a visitor reads is the current release, written at the edge (SCN-016).

## FLW-04 — Customize the workplace
For builders → launcher command and requirements → public setup/update controls; Adapter → quick start → Agent Contract. VR/Okolos → source repositories, explicitly without a published binary. No private workspace or organization register is linked from visitor HTML.

Legacy Observatory links ending in `#start` retain that fragment after the old host redirects; `/observatory/#start` aliases the actual setup section, alongside `#get-started`.

## FLW-05 — Get started (personal use and contribution)
Hero → vision (do what you love; the boundary between today and the direction) → How it works (four steps with current versions) → paths: Install and use it → /start/ (launcher command → Fabric download → create or convert an agent → Fabric Dashboards + MCP → optional Switchboard, Observatory, Inbox) | Make it better → /start/#contribute (repository → AGENTS.md + CONTRIBUTING.md → test command → pull request = CLA) | companies → FLW-06.

## FLW-06 — Request a company workplace
Any entry (header For organizations, hero For your organization, paths card, organization teaser, /vision/, footer, license notes, /start/ closing) → /business/ → the organization path and Enterprise offer → segments → estimate formula → five-step form (goals/company → processes with live estimate → setup → budget → contact + consent) → POST /api/leads → stored in D1 → notification to the commercial mailbox, receipt to the sender, signed copy to the Platform → reference shown (or /business/thanks/ without JavaScript). Refusals return to the step with the reason; the email address is the fallback, never the main path.

## FLW-07 — Switch language
Any page → header language switch → the same page in the other language at `/<code>/<path>` (English at `/`) → continue in that language: every internal link, the form and its confirmation stay under the prefix; downloads, release notes and source links are the same in every language. The address alone decides the language (no redirect by browser language, no cookie), so a shared link opens in the language it was copied in. SCN-019.
