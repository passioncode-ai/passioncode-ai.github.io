Contract: brand-contract v1
# Public site brand pack

Website projection of the PassionCode narrative, updated by the operator on 2026-09-26. Canonical internal positioning is maintained in Fabric; release facts are verified against the public Switchboard release. Visual tokens are owned by [the shared system](../../design-system/README.md).

Sources:
  marketing: docs/brand/copy/*.md

Files: [voice](voice.md), [terms](terminology.md), [facts](facts.md), [channels](channels.md), [strings](strings.md).

`copy/` is generated from actual rendered text/metadata by `scripts/extract-public-copy.py`; HTML classes, dimensions and JSON-LD syntax are excluded from language lint. The original HTML pages remain checked by `npm run check`.
