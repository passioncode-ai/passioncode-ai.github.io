# Homepage storytelling and product detail — 2026-09-26

## Brief and authority

Operator continuation: preserve the visual identity, return the headline to AI-native teams,
explain the toolkit before listing solutions, prioritize downloads, show the development
pipeline and open source, add the author's Twitter, and give each product a page.
Same model and existing static HTML/CSS components; no Figma, installs or background loop.
Existing request authorizes site publication after local/browser checks and Git delivery.
Scope is the public website only; no application release, Fabric runtime change, private
repository publication or parent submodule change.

## Source ledger / resolved contradictions

- Homepage `a29392c`: repeated Fabric direction across products, shift and project sections.
- Historical `d5c168d:index.html`: headline “The agent-agnostic operating system for AI-native teams.”
- Current brief says toolkit and AI-native teams. Exact headline and author's Twitter asked
  asynchronously; other work proceeds independently. No guessed social identity is published.
- `docs/brand/facts.md`, `switchboard/release.json`, product page: existing beta/platform limits.
- GitHub `gh repo list passioncode-ai --limit 20 --json name,visibility,url` on 2026-09-26:
  Switchboard and website public; Fabric private. “Everything is already open source” would
  contradict source visibility. Show available source links and explicit Fabric status.
- Fabric `docs/ux/vision.md`: Project retains context/authority/evidence, agents replaceable.
  Alignment: progressive adoption and accountable people; no implemented orchestration claim.
- Current design tokens and fruit assets stay locked. No visual-direction exploration needed:
  this is a content/reading-order update under the operator's expressly retained style.
- Existing launch HANDOFF/DEPLOYMENT govern exact-SHA deploy and anonymous routing checks.

## Requirements / proof

| ID | Requirement | Check |
|---|---|---|
| REQ-01 | Teams headline and clear toolkit explanation | copy review + rendered hero |
| REQ-02 | Download remains primary, beta limits reachable | desktop/mobile CTA path + worker checks |
| REQ-03 | Work cycle distinct from shipping pipeline | ordered static sections + status review |
| REQ-04 | Switchboard and Fabric have individual pages | internal links + sitemap + browser |
| REQ-05 | Public source links and truthful development states | GitHub visibility receipt + copy review |
| REQ-06 | About and author's confirmed Twitter | confirmed URL + rendered link |
| REQ-07 | Preserved style, working narrow-screen navigation | brand lock + 390/1280px browser checks |
| REQ-08 | Committed/pushed exact source and production receipt | remote ref + fresh checkout + live browser |

## Plan / dependencies / resume

1. Update UX foundation, flows, scenarios and brand facts from this brief.
2. Compose homepage: hero → work cycle → available tool → Fabric → build pipeline → source → author.
   Add /fabric/ with direction, operating loop and honest availability. Keep /switchboard/ downloads
   intact; unify navigation and related-product paths. This consumes step 1 contracts.
3. Check static build, worker, UX and brand; render desktop/mobile and keyboard paths; fix findings.
4. Commit/push, verify exact main SHA under existing site policy, deploy, verify live pages/downloads.
5. Persist receipts/HANDOFF and next work. Temporary preview process is owned by this task.

Falsifiers: downloads become secondary; Fabric appears installable; work-cycle diagram implies a
shipped integration; headline/CTA overflows; navigation disappears on phones; anonymous source
links lead to private repos. Visual rubric: unchanged tokens/marks, one hero emphasis, restrained
section hierarchy, scan-readable statuses, useful links in every product block.

Intake complete from user request and source harvest except two pending copy facts. Implementation
proceeds on the independently specified content. Humanization on, own pass; no fabricated statistics.

## Copy facts resolved during harvest

The public GitHub profile https://github.com/sshlg links @sshlg93. `gh api user` returned
`{"login":"sshlg","name":"Sergey S","twitter_username":"sshlg93","blog":"https://sshlg.me"}`.
Use https://x.com/sshlg93 and first name Sergey; no guessed biography or endorsements.
Pending optional headline preference: default to “Your toolkit for AI-native teams.” as announced;
retains toolkit wording and restores the audience the operator explicitly requested.

## Gate record / resume

UX and brand update → HTML/CSS → local/static/browser review complete. See [verification](../evidence/site-storytelling-2026-09-26.md). Holds: 1 task-owned preview server; no leases, background automation or subagents. Next: exact-SHA publication, live browser check, final receipt and stop preview.
