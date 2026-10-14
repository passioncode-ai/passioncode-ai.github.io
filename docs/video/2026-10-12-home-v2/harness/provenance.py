#!/usr/bin/env python3
"""Write provenance.json for the home video v2 from the media pipeline's delivery manifests.

Usage: provenance.py DELIVERY_DIR SITE_ROOT OUT_JSON

The manifests themselves stay with the pipeline: they carry local paths and order ids, which this public
repository does not publish (docs/evidence/2026-10-11-video/README.md, same rule as W10). This file keeps
what a reader can check: each delivered asset's recipe, provider, model, cost, gate verdict and SHA-256,
and which site file was derived from which master.
"""
import hashlib, json, subprocess, sys
from pathlib import Path


def sha(p: Path) -> str:
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


def dur(p: Path) -> float:
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)],
                         capture_output=True, text=True).stdout.strip()
    return round(float(out), 3) if out else None


def providers(m: dict) -> list[str]:
    rows = (m.get("cost") or {}).get("estimate", {}).get("breakdown", [])
    return sorted({r["provider"] for r in rows if r.get("usd") or r.get("capability", "").startswith(("audio.", "render."))})


def main() -> None:
    root, site, out = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])
    assets, per_order = [], {}
    for man in sorted(root.glob("*/*.manifest.json")):
        m = json.load(open(man))
        f = man.with_name(man.name[: -len(".manifest.json")])
        if not f.exists():
            continue
        per_order[m.get("job_id")] = (m.get("cost") or {}).get("usd") or 0  # one order may deliver several files
        assets.append({
            "asset": m["asset"], "recipe": m.get("recipe"), "project": m.get("project"),
            "providers": providers(m), "cost_usd": (m.get("cost") or {}).get("usd"),
            "final_gate": (m.get("final_gate") or {}).get("verdict"),
            "rights": (m.get("rights") or {}).get("status"),
            "delivered_at": m.get("delivered_at"), "sha256": sha(f),
            "duration_s": dur(f) if f.suffix in (".mp4", ".wav") else None,
            "chosen_why": [c.get("why") for c in m.get("chosen", []) if c.get("why")],
        })
    derived = []
    for loc, master in (("en", "home-video-v2-en-4.mp4"), ("ru", "home-video-v2-ru-3.mp4")):
        sfx = "" if loc == "en" else "-ru"
        for ext in ("mp4", "webm", "jpg"):
            p = site / "assets" / "video" / f"home{sfx}.{ext}"
            derived.append({"file": f"assets/video/home{sfx}.{ext}", "from": master, "bytes": p.stat().st_size,
                            "sha256": sha(p), "duration_s": dur(p) if ext != "jpg" else None,
                            "made_by": "harness/webenc2.sh" })
    for p in sorted((site / "assets" / "video").glob("home*.vtt")):
        derived.append({"file": f"assets/video/{p.name}", "from": "captions-source.json + transcripts/",
                        "bytes": p.stat().st_size, "sha256": sha(p), "made_by": "harness/vtt.py"})
    json.dump({"assets": assets, "site_files": derived,
               "total_cost_usd": round(sum(per_order.values()), 6),
               "note": "cost_usd is per order; an order that delivered two files lists its cost on both, counted once in the total"},
              open(out, "w"), ensure_ascii=False, indent=1)
    print(out, len(assets), "assets", len(derived), "site files")


if __name__ == "__main__":
    main()
