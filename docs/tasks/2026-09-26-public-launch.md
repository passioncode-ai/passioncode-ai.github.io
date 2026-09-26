# Switchboard public launch and PassionCode design system

Objective: update passioncode.ai as the toolkit for AI-native work; present Switchboard as the first downloadable open-source beta; describe Fabric as the CEO AI agent in development; align Switchboard with the shared dark/gold identity and S icon.

Authorization: operator requests of 2026-09-26 authorize public repository/release publication, website deployment, source changes and Git delivery. Existing model retained. No new model, tool installation or intake permission needed. Current English public language and approved passion-fruit assets retained. No new Figma destination.

## Source ledger and resolved differences

- Existing site at `0a5f699`: static HTML/CSS, Cloudflare Worker, locked fruit assets, no client JS requirement.
- Switchboard build evidence at `0b415ef6f5c7b8046afe55152a730fd620afab7d`: 0.3 account capture/import, quota and opt-in rotation; release was draft and repository private at intake.
- Fabric ADR-0057 already names the CEO agent Fabric. Operator now broadens public PassionCode positioning to a toolkit; original kernel terminology still applies technically. Internal docs are propagated separately in Fabric.
- New direction preserves the existing visual identity; no alternate brand exploration needed. Design falsifier: visitors cannot distinguish downloadable Switchboard from in-development Fabric, or cannot find their OS download. App falsifier: selected account/current identity or a warning becomes ambiguous after restyling.

## Requirements and checks

| ID | Deliverable | Verification |
|---|---|---|
| REQ-01 | Toolkit homepage and Fabric development status | static checks, browser |
| REQ-02 | Switchboard detail page and OS downloads | browser + anonymous download/hash verification |
| REQ-03 | Public MIT repository and beta release | GitHub metadata + unauthenticated access |
| REQ-04 | Shared DS, S icon and dark/gold app | source hash check + app demo + rebuilt packages |
| REQ-05 | Public/profile/internal references consistent | narrative gates and cross-repository handoff |
| REQ-06 | Durable, committed, pushed delivery | remote SHA checks and fresh checkout |

## Work graph / resume

1. Shared design tokens and scope (this commit).
2. Switchboard implementation packet consumes canonical tokens and S asset; owns Switchboard only, updates scenarios/evidence, version 0.3.1. Root owns packaging/publication.
3. Root builds site pages, downloader contract, public brand/scenarios and profile, then reviews convergence with app.
4. Root publishes checked app archives and repository, deploys checked site, propagates internal Fabric descriptions/map and workspace.
5. Record exact source/release/deployment identities and open acceptance limits in HANDOFF.

Not requested: live provider login, replacing real CLI authorization to test, changing core account/routing logic, publishing private Fabric/contract/adapter repositories. Local caches, credentials, package trees and OS metadata remain untracked.
