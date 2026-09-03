# Approved PassionCode.ai brand snapshot

This directory is the repository-local, approved graphical brand pack. It is copied
from `passioncode-ai/fabric@a360b51778d6a80eb294a9a91dd4809fd4dfbff1` and must not
drift as a side effect of site work.

`LOCK.json` pins the canonical vector, every generated favicon, the raster-pack
manifest and the social-card family. The raster manifest pins every PNG and JPG export.
`npm run check` also proves that the smaller files served by the website are byte-for-byte
aliases of this snapshot.

An intentional brand revision is a separate change: update the Fabric source and exports,
copy the complete pack here, review it visually at every size and background, then update
`LOCK.json` in the same commit. Do not edit generated SVG, PNG or JPG variants directly.
