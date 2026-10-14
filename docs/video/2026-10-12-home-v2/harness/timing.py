#!/usr/bin/env python3
"""Measure the composition's cue times on a word-timed transcription of the delivered narration.

Usage: timing.py NARRATION_TXT WORDS_JSON LOCALE  → prints {"<locale>": {cue: seconds}} (narration-local)

Each cue is named by the first words of the phrase it starts on (ANCHORS); the script's words are aligned to
the transcript's (difflib over normalised tokens), so a cue lands on its first spoken word. Used by gen3.py
through CUES_JSON; replaces the hand-entered timings of gen2.py.
"""
import difflib, json, re, sys

ANCHORS = {
    "en": dict(s1="Then it falls", s2="The wrong account", s3="It forgets", s4="And nobody", s5="PassionCode.ai is",
               colon5="a workplace where", s6="It runs on", s7="Their work leaves", s8="For you, one command",
               colon8="and your coding agent can run", s10="Fabric, in preview", s11="Your coding agent shows",
               br="Each tool works", br_own="and on its own", s12="Switchboard:", s13="Dashboards:", s14="Observatory:",
               s15="Inbox, in preview", s16="Agents connected", handoff="so one picks up", s17="For an organization",
               show="and show what each", s18="Agents are easy", s19="We are building"),
    "ru": dict(s1="Потом всё", s2="Не тот", s3="Забыл", s4="И никто", s5="PassionCode.ai —", colon5="рабочее место",
               s6="Она работает", s7="После работы", s8="Начало —", colon8="а запустить её", s10="Fabric — дом",
               s11="Агент для программирования показывает", br="Каждый инструмент", br_own="и сам по себе",
               s12="Switchboard:", s13="Dashboards:", s14="Observatory:", s15="Inbox, тоже", s16="У агентов, подключённых",
               handoff="один продолжает", s17="Для организации", show="и показываем", s18="Агентов легко",
               s19="Мы строим"),
}


def norm(w: str) -> str:
    return re.sub(r"[^\w]", "", w.lower().replace("ё", "е"))


def main() -> None:
    text, words_path, loc = sys.argv[1:4]
    script = [w for w in open(text).read().split() if norm(w)]  # a dash alone is not a spoken word
    words = [w for w in json.load(open(words_path))["words"] if w.get("type", "word") == "word"]
    a = [norm(w) for w in script]
    b = [norm(w["text"]) for w in words]
    m = difflib.SequenceMatcher(a=a, b=b, autojunk=False)
    at = {}
    for blk in m.get_matching_blocks():
        for k in range(blk.size):
            at[blk.a + k] = words[blk.b + k]["start"]
    out = {}
    for cue, phrase in ANCHORS[loc].items():
        p = [norm(x) for x in phrase.split() if norm(x)]
        hits = [i for i in range(len(a)) if a[i:i + len(p)] == p]
        if len(hits) != 1:
            sys.exit(f"{loc} {cue}: phrase {phrase!r} found {len(hits)} times")
        i = hits[0]
        j = next((k for k in range(i, i + len(p)) if k in at), None)
        if j is None:
            sys.exit(f"{loc} {cue}: no word of {phrase!r} matched the transcript")
        out[cue] = round(at[j], 2)
    order = list(ANCHORS[loc])
    for x, y in zip(order, order[1:]):
        if out[x] >= out[y] and not (x == "br_own" or y == "br_own"):
            sys.exit(f"{loc}: cue {x} ({out[x]}) is not before {y} ({out[y]})")
    print(json.dumps({loc: out}, ensure_ascii=False))


if __name__ == "__main__":
    main()
