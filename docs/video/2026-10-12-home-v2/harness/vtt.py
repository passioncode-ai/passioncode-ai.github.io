#!/usr/bin/env python3
"""Write the home video v2 captions (WebVTT) in every language, timed on word-timed transcriptions.

Usage: vtt.py CAPTIONS_JSON EN_WORDS_JSON RU_WORDS_JSON OUT_DIR

CAPTIONS_JSON is ../captions-source.json (one entry per cue, the same number in every language).
EN_WORDS_JSON / RU_WORDS_JSON are the media pipeline's transcriptions (audio.transcribe, word timings)
of the delivered en and ru cuts. Each cue of the script is aligned to the transcript words
(difflib over normalised tokens), so a cue starts on its first spoken word and ends on its last.

A cue too long for two caption lines is split into parts at word boundaries; English parts take their
own word timings, and every other language except Russian is split into the SAME number of parts on
the English part timings, so its cue timings equal home.vtt's (scripts/check-site.mjs checks that).
Russian is split and timed on its own transcription.
"""
import difflib, json, math, re, sys
from pathlib import Path

LINE = 46          # characters per line, Latin and Cyrillic (two lines per cue)
LINE_CJK = 24      # characters per line, Chinese, Japanese and Korean
CJK = {"zh-hans", "ja", "ko"}
FILES = {"en": "home.vtt", "ru": "home-ru.vtt"}


def norm(w: str) -> str:
    return re.sub(r"[^\w]", "", w.lower().replace("ё", "е"))


def load_words(path: str) -> list[dict]:
    d = json.load(open(path))
    words = d.get("words") if isinstance(d, dict) else d
    out = []
    for w in words:
        if w.get("type", "word") != "word":
            continue
        t = str(w.get("text", "")).strip()
        if t:
            out.append({"t": t, "n": norm(t), "s": float(w["start"]), "e": float(w["end"])})
    return out


def align(cues: list[str], words: list[dict]) -> list[list[tuple[float, float]]]:
    """Per cue, the (start, end) of each of its script words, from the transcript."""
    script = [(ci, w) for ci, c in enumerate(cues) for w in c.split()]
    a = [norm(w) for _, w in script]
    b = [w["n"] for w in words]
    m = difflib.SequenceMatcher(a=a, b=b, autojunk=False)
    at = [None] * len(a)
    for blk in m.get_matching_blocks():
        for k in range(blk.size):
            at[blk.a + k] = (words[blk.b + k]["s"], words[blk.b + k]["e"])
    # interpolate the few script words the transcript spelled differently
    known = [i for i, v in enumerate(at) if v]
    if not known:
        sys.exit("no word of the script matched the transcript")
    for i, v in enumerate(at):
        if v is None:
            prev = max([k for k in known if k < i], default=None)
            nxt = min([k for k in known if k > i], default=None)
            s = at[prev][1] if prev is not None else at[nxt][0]
            e = at[nxt][0] if nxt is not None else at[prev][1]
            at[i] = (s, max(s, e))
    per = [[] for _ in cues]
    for (ci, _), v in zip(script, at):
        per[ci].append(v)
    return per


PUNCT = ",;:、，。：；"


def _cuts(text: str, cjk: bool) -> list[int]:
    """Positions where a line or a cue may break: after a space (Latin, Cyrillic) or between characters
    outside a Latin word (CJK)."""
    if not cjk:
        return [i for i, ch in enumerate(text) if ch == " "]
    out = []
    for i in range(1, len(text)):
        a, b = text[i - 1], text[i]
        if a.isascii() and a.isalnum() and b.isascii() and b.isalnum():
            continue
        out.append(i)
    return out


def _best_cut(text: str, target: float, cjk: bool, lo: int, hi: int) -> int:
    """The break nearest `target`, preferring one right after punctuation (within a third of the span)."""
    cuts = [c for c in _cuts(text, cjk) if lo < c < hi]
    if not cuts:
        return int(target)
    span = max(1, hi - lo)
    def cost(c):
        prev = text[c - 1] if not cjk else text[c - 1]
        before = text[:c].rstrip()
        bonus = 0.34 * span if before and before[-1] in PUNCT else 0
        return abs(c - target) - bonus
    return min(cuts, key=cost)


def _piece(text: str, a: int, b: int) -> str:
    return text[a:b].strip()


def wrap(text: str, width: int, cjk: bool) -> list[str]:
    """One line, or two balanced lines: a break that keeps both lines within `width`, after punctuation
    where one fits, else the most even one. A text too long for two lines keeps a greedy third."""
    if len(text) <= width:
        return [text]
    cuts = _cuts(text, cjk)
    if not cuts:
        return [text]
    def halves(c):
        return _piece(text, 0, c), _piece(text, c, len(text))
    fits = [c for c in cuts if max(len(h) for h in halves(c)) <= width]
    if fits:
        punct = [c for c in fits if halves(c)[0][-1:] in PUNCT and min(len(h) for h in halves(c)) >= width * 0.35]
        pool = punct or fits
        c = min(pool, key=lambda c: abs(len(halves(c)[0]) - len(halves(c)[1])))
        return list(halves(c))
    c = min(cuts, key=lambda c: max(len(h) for h in halves(c)))
    first, rest = halves(c)
    return [first, *wrap(rest, width, cjk)]


def parts_needed(text: str, loc: str) -> int:
    width = LINE_CJK if loc in CJK else LINE
    return max(1, math.ceil(len(text) / (2 * width)))


def split_text(text: str, n: int, loc: str) -> list[str]:
    """n non-empty parts of roughly equal length, cut where a reader would pause."""
    if n == 1:
        return [text]
    cjk = loc in CJK
    pts, a = [0], 0
    for k in range(1, n):
        target = a + (len(text) - a) / (n - k + 1)
        c = _best_cut(text, target, cjk, a, len(text))
        pts.append(c); a = c
    pts.append(len(text))
    parts = [_piece(text, pts[i], pts[i + 1]) for i in range(n)]
    assert all(parts), (loc, text, n)
    return parts


def stamp(t: float) -> str:
    t = max(0.0, t)
    return f"{int(t // 3600):02d}:{int(t % 3600 // 60):02d}:{t % 60:06.3f}"


def write(path: Path, cues: list[tuple[float, float, str]], loc: str) -> None:
    width = LINE_CJK if loc in CJK else LINE
    out = ["WEBVTT", ""]
    for i, (s, e, text) in enumerate(cues, 1):
        out += [str(i), f"{stamp(s)} --> {stamp(e)}", *wrap(text, width, loc in CJK), ""]
    path.write_text("\n".join(out), encoding="utf-8")


def main() -> None:
    src, en_words, ru_words, out = sys.argv[1:5]
    out = Path(out)
    c = {k: v for k, v in json.load(open(src)).items() if not k.startswith("_")}
    n = len(c["en"])
    assert all(len(v) == n for v in c.values()), "every language needs the same number of cues"
    timed = {}
    for loc, wf in (("en", en_words), ("ru", ru_words)):
        per = align(c[loc], load_words(wf))
        timed[loc] = per
    # how many parts each cue needs: the most any language other than ru needs
    parts = [max(parts_needed(c[loc][i], loc) for loc in c if loc != "ru") for i in range(n)]
    report = {}
    for loc in c:
        cues = []
        base = "ru" if loc == "ru" else "en"
        for i in range(n):
            k = parts_needed(c["ru"][i], "ru") if loc == "ru" else parts[i]
            ws = timed[base][i]
            texts = split_text(c[loc][i], k, loc)
            if base == loc:  # en or ru: split on its own words, time each part on them
                words = c[loc][i].split()
                idx, acc = 0, []
                for t in texts:
                    m = len(t.split())
                    acc.append((ws[idx][0], ws[min(idx + m, len(ws)) - 1][1]))
                    idx += m
                spans = acc
            else:  # the English part spans
                en_texts = split_text(c["en"][i], k, "en")
                idx, spans = 0, []
                for t in en_texts:
                    m = len(t.split())
                    spans.append((ws[idx][0], ws[min(idx + m, len(ws)) - 1][1]))
                    idx += m
            for (s, e), t in zip(spans, texts):
                cues.append((round(s, 3), round(max(e + 0.25, s + 1.0), 3), t))
        # no overlap: a cue ends before the next starts
        fixed = []
        for j, (s, e, t) in enumerate(cues):
            nxt = cues[j + 1][0] if j + 1 < len(cues) else None
            if nxt is not None and e > nxt - 0.04:
                e = round(nxt - 0.04, 3)
            fixed.append((s, e, t))
        name = FILES.get(loc, f"home-{loc}.vtt")
        write(out / name, fixed, loc)
        report[loc] = {"file": name, "cues": len([x for x in fixed if x[2]]), "last_end": fixed[-1][1]}
    print(json.dumps(report, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
