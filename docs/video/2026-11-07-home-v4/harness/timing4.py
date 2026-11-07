#!/usr/bin/env python3
"""Measure the composition's cue times on a word-timed transcription of the delivered narration.

Usage: timing.py NARRATION_TXT WORDS_JSON LOCALE  → prints {"<locale>": {cue: seconds}} (narration-local)

Each cue is named by the first words of the phrase it starts on (ANCHORS); the script's words are aligned to
the transcript's (difflib over normalised tokens), so a cue lands on its first spoken word. Used by gen4.py
through CUES_JSON (SITE-050, home video v4).
"""
import difflib, json, re, sys

ANCHORS = {
    "en": dict(assist="Give each of them", meet="Meetings reconcile", chaos="And everyone builds", shift="In an AI-native organization",
               board="Fabric keeps the board", today="Today, in preview", next="Next, it sets", people="People give direction",
               work="Here is what", loop1="A user's question", loop2="Research turns", loop3="One message goes",
               record="Every task, every cost", system="It holds together", grow="Start on one machine",
               device="On request, we set", clone="Next, you clone", close="PassionCode.ai: the workplace", cta="Start free, or"),
    "ru": dict(assist="Дайте каждому", meet="Встречи сводят", chaos="А каждый собирает", shift="В AI-native организации",
               board="Fabric ведёт доску", today="Сегодня, в предварительной", next="Дальше он будет", people="Люди задают",
               work="Вот как это", loop1="Вопрос пользователя", loop2="Исследование превращает", loop3="Одно сообщение",
               record="Каждая задача", system="Всё держится", grow="Начните на одной", device="По запросу мы",
               clone="Дальше вы клонируете", close="PassionCode.ai: рабочее", cta="Начните бесплатно"),
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
        if out[x] >= out[y]:
            sys.exit(f"{loc}: cue {x} ({out[x]}) is not before {y} ({out[y]})")
    print(json.dumps({loc: out}, ensure_ascii=False))


if __name__ == "__main__":
    main()
