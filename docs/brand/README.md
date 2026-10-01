Contract: brand-contract v1
# Public site brand pack

Website projection of the PassionCode narrative, updated by the operator on 2026-09-26. Canonical internal positioning is maintained in Fabric; release facts are verified against the public Switchboard release. Visual tokens are owned by [the shared system](../../design-system/README.md).

Sources:
  marketing: docs/brand/copy/*.md

Files: [voice](voice.md), [terms](terminology.md), [facts](facts.md), [channels](channels.md), [strings](strings.md).

`copy/` is generated from actual rendered text/metadata by `scripts/extract-public-copy.py`; HTML classes, dimensions and JSON-LD syntax are excluded from language lint. The original HTML pages remain checked by `npm run check`.

## Display punctuation

Operator direction, 2026-10-01: display headings, hero copy, slogans, short status
labels and figure captions do not end with full stops. A line break already
separates headline fragments; use a comma or rewrite an inline phrase instead of
staccato sentence fragments. Ordinary explanatory paragraphs retain sentence
punctuation. Preserve question marks in questions and dots in product names,
versions, URLs and commands. The seven source pages and generated Switchboard
agent section follow this convention; [editorial receipt](../tasks/2026-10-01-display-copy.md)
records the scope and verification.
