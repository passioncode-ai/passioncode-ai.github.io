#!/usr/bin/env python3
"""Build the HyperFrames composition for the passioncode.ai home video v4 (SITE-050), per locale.

Usage: SITE_ROOT=... FONTS_DIR=... MONO_DIR=... GSAP_JS=... NARRATION_WAV=... MUSIC_WAV=... FABRIC_ICON=... \
       CUES_JSON=... gen4.py LOCALE OUT_DIR

The story is the home page's (SITE-049): person-shaped processes, the chaos of everyone's own agents, the shift
to agents running the process on Fabric's board with people steering, the agentic company at work, one system,
and the path from one machine to an organization. Every status shown is the site's own word (AVAILABLE NOW,
PREVIEW, DIRECTION, ON REQUEST), so the video claims no more than the page does.

CUES_JSON holds, per locale, the narration-local start of each named cue, measured by timing4.py on a
word-timed transcription of the delivered narration (no hand-entered timings). The music bed is the v2 bed
(../2026-10-12-home-v2/README.md): its full groove lands on the chaos beat and its final hit on the end card.
Inputs are the site's own sample-data mockups and marks, its token layer (linked unmodified), the narration
and music delivered by Asset Foundry, Inter and JetBrains Mono (OFL), GSAP. No network at render time.
"""
import html, json, os, re, shutil, subprocess, sys
from pathlib import Path

SITE = Path(os.environ["SITE_ROOT"])
FONTS, MONO = Path(os.environ["FONTS_DIR"]), Path(os.environ["MONO_DIR"])
GSAP, VO, MUSIC = Path(os.environ["GSAP_JS"]), Path(os.environ["NARRATION_WAV"]), Path(os.environ["MUSIC_WAV"])
FABRIC_ICON = Path(os.environ["FABRIC_ICON"])
V0 = 0.6                                # the narration starts here
DROP, HIT, BAR = 12.85, 90.02, 1.07     # the v2 bed: full groove, final hit, its two-beat pulse
N = json.load(open(os.environ["CUES_JSON"]))

ST = {
    "en": dict(now="AVAILABLE NOW", part="AVAILABLE NOW, IN PART", prev="PREVIEW", dirn="DIRECTION",
               req="ON REQUEST", free="AVAILABLE NOW · FREE"),
    "ru": dict(now="ДОСТУПНО СЕЙЧАС", part="ЧАСТИЧНО ДОСТУПНО СЕЙЧАС", prev="ПРЕДВАРИТЕЛЬНАЯ ВЕРСИЯ",
               dirn="НАПРАВЛЕНИЕ", req="ПО ЗАПРОСУ", free="ДОСТУПНО СЕЙЧАС · БЕСПЛАТНО"),
}

TXT = {
    "en": dict(
        chapters=["Today", "The shift", "Fabric", "People", "At work", "One system", "Grow"],
        old_step="Today", old_title="Work moves between people", people=["Sales", "Support", "Product", "Ops"],
        waiting="waiting", ai="AI", meeting="Meeting", meeting_sub="reconcile what the assistants made",
        chaos_title="Everyone builds their own agents",
        chaos_q=["What did this agent do?", "What did it cost?", "Whose key is this?"],
        shift1="Agents run the process.", shift2="People steer it.", accent2="steer",
        board_step="Fabric", board_title="Fabric keeps the board", sample="Sample data",
        duties=[("Routes the work", "prev"), ("Wakes the agent that owns a task", "prev"),
                ("Sets priorities", "dirn"), ("Orders the releases", "dirn")],
        roles_step="People", roles_title="People steer",
        roles=[("Direction", "What to build and why"), ("Control", "Approve what needs a person"),
               ("Expertise", "Teach agents the craft")],
        work_step="At work", work_title="What an agentic company looks like",
        top="People: direction, control, expertise", board="Fabric: the board",
        agents=["Research", "Analytics", "Support", "Product", "Marketing"],
        room="Data room: facts, metrics, releases",
        loop1=["question", "signal", "fix", "release"], loop2="market → hypothesis", loop3="one message, every language",
        record="task · cost · result, on the record",
        sys_step="One system", sys_title="It holds together",
        sys=[("One contract", "Every agent built one way", "part"), ("One vault", "Keys by name, never seen", "now"),
             ("One record", "Every task and cost", "part"), ("A dashboard", "For every agent", "part")],
        grow_step="Grow", grow_title="From one machine to an organization",
        g1="One machine", g2="Your organization’s own device", g2s="Spaces · levels · a base set of agents",
        g3="PassionCode runs the administration", g4="Clone it: the next team, the next company",
        close="The workplace for AI-native organizations", accent="AI-native",
        cta1="Start free", cta2="Bring your organization",
    ),
    "ru": dict(
        chapters=["Сегодня", "Сдвиг", "Fabric", "Люди", "В работе", "Одна система", "Рост"],
        old_step="Сегодня", old_title="Работа переходит между людьми", people=["Продажи", "Поддержка", "Продукт", "Операции"],
        waiting="ждёт", ai="ИИ", meeting="Встреча", meeting_sub="сводит то, что сделали ассистенты",
        chaos_title="Каждый собирает своих агентов",
        chaos_q=["Что сделал этот агент?", "Сколько это стоило?", "Чей это ключ?"],
        shift1="Процесс ведут агенты.", shift2="Люди им управляют.", accent2="управляют",
        board_step="Fabric", board_title="Fabric ведёт доску", sample="Пример данных",
        duties=[("Направляет работу", "prev"), ("Будит агента, которому принадлежит задача", "prev"),
                ("Расставляет приоритеты", "dirn"), ("Выстраивает очередь релизов", "dirn")],
        roles_step="Люди", roles_title="Люди управляют",
        roles=[("Направление", "Что строить и зачем"), ("Контроль", "Одобряют то, что требует человека"),
               ("Экспертиза", "Учат агентов ремеслу")],
        work_step="В работе", work_title="Как выглядит агентная компания",
        top="Люди: направление, контроль, экспертиза", board="Fabric: доска",
        agents=["Исследование", "Аналитика", "Поддержка", "Продукт", "Маркетинг"],
        room="Датарум: факты, метрики, релизы",
        loop1=["вопрос", "сигнал", "исправление", "релиз"], loop2="рынок → гипотеза", loop3="одно сообщение, все языки",
        record="задача · расход · результат, в записи",
        sys_step="Одна система", sys_title="Всё держится вместе",
        sys=[("Один контракт", "Каждый агент собран одинаково", "part"), ("Одно хранилище", "Ключи по имени, без значений", "now"),
             ("Одна запись", "Каждая задача и расход", "part"), ("Панель", "У каждого агента", "part")],
        grow_step="Рост", grow_title="От одной машины к организации",
        g1="Одна машина", g2="Собственное устройство организации", g2s="Пространства · уровни · базовый набор агентов",
        g3="PassionCode ведёт администрирование", g4="Клонируйте: следующая команда, следующая компания",
        close="Рабочее место для AI-native организаций", accent="AI-native",
        cta1="Начать бесплатно", cta2="Привести организацию",
    ),
}
LANGS = "EN · RU · DE · FR · PL · KO · ES · PT · ZH · JA"


def speech_end(wav: Path):
    err = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(wav), "-af", "silencedetect=n=-45dB:d=0.2", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(wav)],
                               capture_output=True, text=True).stdout)
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    tail = [s for s in starts if s > dur - 1.5]
    return (tail[-1] if tail else dur), dur


def build(loc: str, out: Path) -> dict:
    x, s = TXT[loc], ST[loc]
    e = lambda v: html.escape(v, quote=True)
    t = {k: round(v + V0, 2) for k, v in N[loc].items()}
    t["s0"] = V0
    vo_end_local, vo_dur = speech_end(VO)
    vo_end = round(V0 + vo_end_local, 2)
    E = t["close"]                       # the end card and the music's final hit, on «PassionCode.ai:»
    T = round(vo_end + 2.6, 2)           # root duration
    X = round(t["grow"] + 1.0, 2)        # crossfade between the two clips of the same bed, under the voice
    a0 = DROP - t["chaos"]               # music offset that puts the full groove on the chaos beat
    b = HIT - E                          # music offset that puts the final hit on the end card
    a = round(b - round((b - a0) / BAR) * BAR, 3)
    t.update(vo_end=vo_end, E=E, T=T, X=X)

    out.mkdir(parents=True, exist_ok=True)
    (out / "assets").mkdir(exist_ok=True)
    board_img = "fabric-board.jpg"
    shutil.copy2(SITE / "assets" / board_img, out / "assets" / board_img)
    subprocess.run(["sips", "-Z", "1400", str(out / "assets" / board_img)], check=True, capture_output=True)
    for f in ["passioncode-mark.svg", "dashboards-mark.svg"]:
        shutil.copy2(SITE / "assets" / f, out / "assets" / f)
    shutil.copy2(SITE / "design-system" / "tokens.css", out / "tokens.css")
    subprocess.run(["sips", "-Z", "256", str(FABRIC_ICON), "--out", str(out / "assets" / "fabric-icon.png")], check=True, capture_output=True)
    for f in ("Inter-Medium.ttf", "InterDisplay-Bold.ttf", "Inter-OFL.txt"):
        shutil.copy2(FONTS / f, out / "assets" / f)
    shutil.copy2(MONO / "JetBrainsMono-400.woff2", out / "assets" / "JetBrainsMono-400.woff2")
    shutil.copy2(GSAP, out / "gsap.min.js")
    ff = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i"]
    subprocess.run(ff + [str(VO), "-af", "volume=2dB,alimiter=limit=0.84:level=false", "-c:a", "libmp3lame", "-b:a", "128k",
                         "-ac", "1", "-ar", "48000", str(out / "assets/narration.mp3")], check=True)
    subprocess.run(ff + [str(MUSIC), "-c:a", "libmp3lame", "-b:a", "112k", "-ac", "2", "-ar", "48000",
                         str(out / "assets/music.mp3")], check=True)

    d = lambda s0, s1: f'data-start="{s0:.2f}" data-duration="{s1 - s0:.2f}"'
    chip = lambda kind: f'<span class="chip {kind}">{e(s[kind])}</span>'
    words = lambda txt, cls="w", accent=None: " ".join(
        f'<span class="{cls}">' + (e(wd).replace(e(accent), f'<span class="gold">{e(accent)}</span>') if accent else e(wd)) + '</span>'
        for wd in txt.split(" "))
    lane = lambda pts: json.dumps({"version": 1, "lanes": [{"target": "volume", "points": [{"t": round(p, 3), "v": v} for p, v in pts]}]})

    chap_keys = ["s0", "shift", "board", "people", "work", "system", "grow"]
    ticks = "".join(f'<span class="tick" style="left:{(t[k] / E) * 100:.3f}%"></span>' for k in chap_keys)
    labels = "".join(f'<span class="chap" id="chap{i}">{i + 1:02d} · {e(x["chapters"][i])}</span>' for i in range(len(chap_keys)))

    # 1 today: four people in a row, a task passing between them, assistants piling output on each
    px = [300, 720, 1140, 1560]
    persons = "".join(
        f'<div class="person" id="p{i}" style="left:{cx - 70}px"><div class="head"></div><div class="body"></div>'
        f'<div class="pname">{e(n)}</div><div class="pile" id="pile{i}">' + "".join(f'<i id="doc{i}_{k}"></i>' for k in range(4)) +
        '</div>' + "".join(f'<span class="ai" id="ai{i}_{k}" style="left:{(-58 if k == 0 else 140)}px; top:{(-6 if k == 0 else 26)}px">{e(x["ai"])}</span>' for k in range(2)) +
        f'<span class="wait" id="wait{i}">{e(x["waiting"])}</span></div>' for i, (cx, n) in enumerate(zip(px, x["people"])))
    hand = "".join(f'<path class="hand" id="hand{i}" d="M{px[i] + 80} 470 C {px[i] + 180} 410, {px[i + 1] - 180} 410, {px[i + 1] - 80} 470" pathLength="1"/>'
                   for i in range(3))
    meet_lines = "".join(f'<path class="mline" id="ml{i}" d="M{cx} 620 L 960 800" pathLength="1"/>' for i, cx in enumerate(px))

    # 2 chaos: tangled agent lines, scattered keys, unanswered questions
    import random
    rnd = random.Random(7)
    tangles = "".join(
        f'<path class="tangle" id="tg{k}" d="M{rnd.randint(140, 1780)} {rnd.randint(300, 700)} C {rnd.randint(100, 1820)} {rnd.randint(200, 900)}, '
        f'{rnd.randint(100, 1820)} {rnd.randint(200, 900)}, {rnd.randint(140, 1780)} {rnd.randint(300, 760)}" pathLength="1"/>' for k in range(16))
    bots = "".join(f'<span class="bot" id="bot{k}" style="left:{rnd.randint(160, 1720)}px; top:{rnd.randint(300, 720)}px"></span>' for k in range(14))
    keys = "".join(f'<span class="key" id="key{k}" style="left:{rnd.randint(200, 1680)}px; top:{rnd.randint(320, 700)}px">⚿</span>' for k in range(7))
    qs = "".join(f'<div class="q" id="q{i}"><span class="x"></span>{e(q)}</div>' for i, q in enumerate(x["chaos_q"]))

    # 4 the board
    duties = "".join(f'<div class="duty" id="duty{i}"><span class="dname">{e(n)}</span>{chip(k)}</div>' for i, (n, k) in enumerate(x["duties"]))
    # 5 people
    roles = "".join(f'<div class="role" id="role{i}"><span class="rnum">{i + 1:02d}</span><div class="rk">{e(k)}</div><div class="rv">{e(v)}</div></div>'
                    for i, (k, v) in enumerate(x["roles"]))
    # 6 at work: the diagram of the home page, then three loops over it
    ax = [260, 610, 960, 1310, 1660]
    agents = "".join(f'<div class="agentbox" id="ag{i}" style="left:{cx - 150}px">{e(n)}</div>' for i, (cx, n) in enumerate(zip(ax, x["agents"])))
    alinks = "".join(f'<path class="alink" id="al{i}" d="M960 472 L {cx} 590" pathLength="1"/><path class="alink" id="ar{i}" d="M{cx} 676 L 960 790" pathLength="1"/>'
                     for i, cx in enumerate(ax))
    loop1 = "".join(f'<span class="lstep" id="l1_{i}">{e(w)}</span>' + ('<span class="larrow">→</span>' if i < 3 else '') for i, w in enumerate(x["loop1"]))
    # 7 one system
    sysc = "".join(f'<div class="sys" id="sys{i}"><span class="rnum">{i + 1:02d}</span><div class="rk">{e(k)}</div><div class="rv">{e(v)}</div>{chip(kind)}</div>'
                   for i, (k, v, kind) in enumerate(x["sys"]))
    # 8 grow: one machine, the organization's device with spaces, then clones
    spaces = "".join(f'<span class="space s{k}"></span>' for k in range(3))
    clones = "".join(f'<div class="clone" id="cl{k}" style="left:{1100 + (k % 3) * 250}px; top:{330 + (k // 3) * 210}px"><div class="cscreen">'
                     + "".join(f'<span class="space s{j}"></span>' for j in range(3)) + '</div><div class="cbase"></div></div>' for k in range(6))

    big = 92 if loc == "en" else 80
    mid = 60 if loc == "en" else 54
    doc = f"""<!doctype html>
<html lang="{loc}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1920, height=1080">
<title>passioncode.ai home video v4 ({loc})</title>
<link rel="stylesheet" href="./tokens.css">
<script src="./gsap.min.js"></script>
<style>
@font-face {{ font-family: "Inter"; src: url("assets/Inter-Medium.ttf") format("truetype"); font-weight: 400 600; }}
@font-face {{ font-family: "Inter"; src: url("assets/InterDisplay-Bold.ttf") format("truetype"); font-weight: 700 800; }}
@font-face {{ font-family: "JetBrains Mono"; src: url("assets/JetBrainsMono-400.woff2") format("woff2"); font-weight: 400; }}
* {{ margin:0; padding:0; box-sizing:border-box; }}
html, body {{ width:1920px; height:1080px; overflow:hidden; background:var(--pc-bg); color:var(--pc-text);
             font-family:"Inter", sans-serif; font-weight:400; -webkit-font-smoothing:antialiased; }}
#root {{ position:relative; width:100%; height:100%; overflow:hidden; background:var(--pc-bg); }}
.clip {{ position:absolute; inset:0; }}
.w, .w2 {{ display:inline-block; }}
.gold {{ color:var(--pc-accent); }}
#rail {{ position:absolute; left:96px; right:96px; bottom:52px; height:40px; }}
#rail .line {{ position:absolute; left:0; right:0; bottom:0; height:3px; background:var(--pc-border); border-radius:2px; }}
#rail .fill {{ position:absolute; left:0; right:0; bottom:0; height:3px; background:var(--pc-accent); border-radius:2px; transform-origin:0 50%; }}
#rail .tick {{ position:absolute; bottom:-4px; width:2px; height:11px; background:var(--pc-border-strong); }}
.chap {{ position:absolute; left:0; bottom:16px; font-weight:700; font-size:18px; letter-spacing:.12em; color:var(--pc-accent); white-space:nowrap; opacity:0; text-transform:uppercase; }}
#bug {{ position:absolute; left:96px; top:56px; display:flex; align-items:center; gap:14px; opacity:0; }}
#bug img {{ width:44px; height:44px; }}
#bug span {{ font-weight:700; font-size:24px; }}
.step {{ position:absolute; left:96px; top:150px; font-weight:700; font-size:22px; letter-spacing:.12em; color:var(--pc-accent); text-transform:uppercase; }}
.title {{ position:absolute; left:96px; top:188px; font-weight:700; font-size:{mid}px; line-height:1.06; letter-spacing:-.025em; max-width:1700px; }}
.chip {{ white-space:nowrap; display:inline-block; font-weight:700; font-size:17px; letter-spacing:.08em; padding:8px 14px; border-radius:var(--pc-radius-pill); }}
.chip.now, .chip.free {{ color:var(--pc-on-accent); background:var(--pc-accent); }}
.chip.part {{ color:var(--pc-accent); border:2px solid var(--pc-accent); }}
.chip.prev {{ color:var(--pc-text); border:2px solid var(--pc-brand-magenta); }}
.chip.dirn, .chip.req {{ color:var(--pc-text); border:2px dashed var(--pc-text-muted); }}
svg.layer {{ position:absolute; left:0; top:0; width:1920px; height:1080px; }}
/* 1 today */
.person {{ position:absolute; top:430px; width:140px; display:flex; flex-direction:column; align-items:center; }}
.head {{ width:62px; height:62px; border-radius:50%; background:var(--pc-panel-raised); border:2px solid var(--pc-border-strong); }}
.body {{ width:110px; height:70px; margin-top:8px; border-radius:55px 55px 14px 14px; background:var(--pc-panel-raised); border:2px solid var(--pc-border-strong); }}
.pname {{ margin-top:14px; font-weight:600; font-size:24px; white-space:nowrap; }}
.pile {{ position:absolute; left:110px; top:-70px; width:60px; height:80px; }}
.pile i {{ position:absolute; left:0; width:52px; height:14px; border-radius:3px; background:var(--pc-brand-magenta); opacity:0; }}
.pile i:nth-child(1) {{ top:66px; }} .pile i:nth-child(2) {{ top:48px; }} .pile i:nth-child(3) {{ top:30px; }} .pile i:nth-child(4) {{ top:12px; }}
.ai {{ position:absolute; font-weight:700; font-size:16px; letter-spacing:.06em; padding:6px 10px; border-radius:var(--pc-radius-pill); color:var(--pc-text); border:2px solid var(--pc-info); opacity:0; }}
.wait {{ position:absolute; top:226px; font-family:"JetBrains Mono", monospace; font-size:20px; color:var(--pc-negative); opacity:0; }}
.hand {{ stroke:var(--pc-accent); stroke-width:3; fill:none; stroke-dasharray:1; stroke-dashoffset:1; }}
#token {{ position:absolute; left:0; top:0; width:28px; height:28px; border-radius:7px; background:var(--pc-accent); opacity:0; }}
.mline {{ stroke:var(--pc-border-strong); stroke-width:2; fill:none; stroke-dasharray:1; stroke-dashoffset:1; }}
.meet {{ position:absolute; left:760px; top:800px; width:400px; height:96px; border:2px solid var(--pc-negative); border-radius:var(--pc-radius-panel);
         background:var(--pc-panel); display:flex; flex-direction:column; align-items:center; justify-content:center; opacity:0; }}
.meet b {{ font-weight:700; font-size:28px; }}
.meet span {{ font-size:19px; color:var(--pc-text-muted); margin-top:4px; }}
/* 2 chaos */
.tangle {{ stroke:var(--pc-brand-magenta); stroke-width:2.5; fill:none; opacity:.75; stroke-dasharray:1; stroke-dashoffset:1; }}
.bot {{ position:absolute; width:26px; height:26px; border-radius:50%; background:var(--pc-info); opacity:0; }}
.key {{ position:absolute; font-size:40px; color:var(--pc-accent); opacity:0; }}
.qs {{ position:absolute; left:96px; top:800px; display:flex; gap:28px; }}
.q {{ display:flex; align-items:center; gap:16px; padding:22px 28px; border:1px solid var(--pc-border-strong); border-radius:var(--pc-radius-feature);
      background:var(--pc-panel); font-size:{30 if loc == 'en' else 27}px; font-weight:600; opacity:0; }}
.x {{ flex:none; width:34px; height:34px; border-radius:50%; border:3px solid var(--pc-negative); position:relative; }}
.x::before, .x::after {{ content:""; position:absolute; left:13.5px; top:5px; width:3px; height:18px; background:var(--pc-negative); border-radius:2px; transform:rotate(45deg); }}
.x::after {{ transform:rotate(-45deg); }}
/* 3 shift */
.shift {{ position:absolute; left:160px; right:160px; top:330px; text-align:center; font-weight:700; font-size:{big + 18}px; line-height:1.12; letter-spacing:-.03em; }}
.shift p + p {{ margin-top:18px; }}
.shift .gline {{ width:460px; height:4px; margin:46px auto 0; background:var(--pc-accent); border-radius:2px; transform-origin:50% 50%; }}
/* 4 board */
.bpanel {{ position:absolute; left:860px; top:170px; width:964px; height:720px; border-radius:18px; overflow:hidden; border:1px solid var(--pc-border-strong);
           box-shadow:var(--pc-shadow-overlay); background:var(--pc-panel); }}
.bpanel img {{ display:block; width:100%; height:100%; object-fit:cover; object-position:left top; }}
.sample {{ position:absolute; right:20px; bottom:20px; font-weight:700; font-size:20px; padding:7px 16px; border-radius:var(--pc-radius-pill); background:var(--pc-accent); color:var(--pc-on-accent); }}
.bmark {{ position:absolute; left:96px; top:300px; display:flex; align-items:center; gap:20px; font-weight:700; font-size:34px; }}
.bmark img {{ width:72px; height:72px; border-radius:16px; }}
.duties {{ position:absolute; left:96px; top:410px; width:700px; display:flex; flex-direction:column; gap:18px; }}
.duty {{ display:flex; align-items:center; justify-content:space-between; gap:20px; padding:22px 26px; border:1px solid var(--pc-border-strong);
         border-radius:var(--pc-radius-panel); background:var(--pc-panel); opacity:0; }}
.dname {{ font-weight:600; font-size:{27 if loc == 'en' else 24}px; }}
/* 5 people, 7 system */
.roles, .syss {{ position:absolute; left:96px; right:96px; top:330px; display:flex; gap:32px; }}
.role, .sys {{ flex:1; height:440px; padding:40px 36px; border:1px solid var(--pc-border-strong); border-radius:var(--pc-radius-feature);
         background:var(--pc-panel); display:flex; flex-direction:column; opacity:0; }}
.rnum {{ font-weight:700; font-size:24px; letter-spacing:.1em; color:var(--pc-accent); }}
.rk {{ margin-top:90px; font-weight:700; font-size:{54 if loc == 'en' else 46}px; letter-spacing:-.02em; line-height:1.05; }}
.rv {{ margin-top:22px; font-size:28px; line-height:1.3; color:var(--pc-text-muted); }}
.sys .rk {{ margin-top:70px; font-size:{44 if loc == 'en' else 38}px; }}
.sys .chip {{ margin-top:auto; align-self:flex-start; }}
/* 6 at work */
.top, .bd, .room {{ position:absolute; left:960px; transform:translateX(-50%); white-space:nowrap; padding:20px 34px; border-radius:var(--pc-radius-panel);
                    font-weight:700; font-size:{26 if loc == 'en' else 23}px; background:var(--pc-panel); opacity:0; }}
.top {{ top:286px; border:2px solid var(--pc-accent); }}
.bd {{ top:406px; border:2px solid var(--pc-accent); color:var(--pc-accent); }}
.room {{ top:790px; border:2px dashed var(--pc-accent); }}
.agentbox {{ position:absolute; top:590px; width:300px; height:86px; display:flex; align-items:center; justify-content:center; border:1px solid var(--pc-border-strong);
             border-radius:var(--pc-radius-panel); background:var(--pc-panel); font-weight:600; font-size:{25 if loc == 'en' else 22}px; opacity:0; }}
.agentbox.lit {{ border-color:var(--pc-accent); }}
.alink {{ stroke:var(--pc-border-strong); stroke-width:2; fill:none; stroke-dasharray:1; stroke-dashoffset:1; }}
.vlink {{ stroke:var(--pc-accent); stroke-width:3; fill:none; stroke-dasharray:1; stroke-dashoffset:1; }}
.loop {{ position:absolute; left:0; right:0; top:916px; display:flex; justify-content:center; align-items:center; gap:18px; font-size:28px; opacity:0; }}
.lstep {{ font-weight:700; padding:8px 18px; border-radius:var(--pc-radius-pill); border:2px solid var(--pc-accent); }}
.larrow {{ color:var(--pc-accent); font-weight:700; }}
.lsingle {{ font-weight:700; padding:8px 22px; border-radius:var(--pc-radius-pill); border:2px solid var(--pc-accent); }}
.langs {{ font-family:"JetBrains Mono", monospace; font-size:22px; color:var(--pc-text-muted); }}
.rec {{ position:absolute; left:960px; top:916px; transform:translateX(-50%); white-space:nowrap; font-family:"JetBrains Mono", monospace; font-size:26px; color:var(--pc-positive); opacity:0; }}
/* 8 grow */
.mach {{ position:absolute; width:300px; }}
.mscreen {{ height:190px; border:2px solid var(--pc-border-strong); border-radius:14px; background:var(--pc-panel); display:flex; align-items:center; justify-content:center; gap:16px; }}
.mbase {{ height:12px; margin:0 -16px; background:var(--pc-border-strong); border-radius:0 0 12px 12px; }}
.space {{ display:block; width:62px; height:110px; border-radius:10px; border:2px solid var(--pc-accent); }}
.space.s1 {{ border-color:var(--pc-brand-magenta); }} .space.s2 {{ border-color:var(--pc-info); }}
.mlabel {{ margin-top:18px; font-weight:700; font-size:{26 if loc == 'en' else 23}px; line-height:1.2; }}
.msub {{ margin-top:6px; font-size:20px; color:var(--pc-text-muted); line-height:1.3; }}
.mach .chip {{ margin-top:12px; }}
.clone {{ position:absolute; width:200px; opacity:0; }}
.cscreen {{ height:120px; border:2px solid var(--pc-border-strong); border-radius:12px; background:var(--pc-panel); display:flex; align-items:center; justify-content:center; gap:10px; }}
.cscreen .space {{ width:36px; height:66px; border-radius:7px; }}
.cbase {{ height:9px; margin:0 -10px; background:var(--pc-border-strong); border-radius:0 0 9px 9px; }}
.glabel {{ position:absolute; left:1100px; top:780px; width:720px; font-weight:700; font-size:{28 if loc == 'en' else 25}px; opacity:0; }}
.glabel .chip {{ margin-left:14px; vertical-align:middle; }}
.admin {{ position:absolute; left:500px; top:820px; display:flex; align-items:center; gap:16px; font-weight:600; font-size:{24 if loc == 'en' else 22}px; opacity:0; }}
/* 9 close */
.endc {{ position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; }}
.emark {{ width:160px; height:160px; margin-bottom:36px; }}
.etitle {{ font-weight:700; font-size:{big - 10}px; letter-spacing:-.028em; text-align:center; max-width:1560px; line-height:1.08; }}
.ectas {{ margin-top:48px; display:flex; gap:26px; }}
.ecta {{ font-weight:700; font-size:32px; padding:20px 36px; border-radius:var(--pc-radius-pill); }}
.ecta.a {{ background:var(--pc-accent); color:var(--pc-on-accent); }}
.ecta.b {{ border:2px solid var(--pc-accent); color:var(--pc-text); }}
.eurl {{ margin-top:44px; font-weight:700; font-size:44px; letter-spacing:-.02em; color:var(--pc-text-muted); }}
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-width="1920" data-height="1080" data-duration="{T:.2f}">
  <audio id="vo" src="assets/narration.mp3" data-start="{V0:.2f}" data-duration="{vo_dur:.2f}" data-track-index="1" data-volume="1"></audio>
  <audio id="musicA" src="assets/music.mp3" data-start="0" data-duration="{X + 1.0:.2f}" data-trim-start="{a:.3f}" data-track-index="2" data-volume="1"
    data-automation='{lane([(0, 0.5), (V0 + 0.3, 0.16), (X, 0.16), (X + 1.0, 0.0)])}'></audio>
  <audio id="musicB" src="assets/music.mp3" data-start="{X:.2f}" data-duration="{T - X:.2f}" data-trim-start="{X + b:.3f}" data-track-index="3" data-volume="1"
    data-automation='{lane([(0, 0.0), (1.0, 0.16), (E - X - 0.3, 0.16), (E - X, 0.3), (T - X - 1.6, 0.3), (T - X, 0.0)])}'></audio>

  <section id="sc1" class="clip" {d(0, t['chaos'])}>
    <p class="step" id="old-step">{e(x['old_step'])}</p><h2 class="title" id="old-title">{words(x['old_title'])}</h2>
    <svg class="layer">{hand}{meet_lines}</svg>
    {persons}<div id="token"></div>
    <div class="meet" id="meet"><b>{e(x['meeting'])}</b><span>{e(x['meeting_sub'])}</span></div>
  </section>

  <section id="sc2" class="clip" {d(t['chaos'], t['shift'])}>
    <h2 class="title" id="chaos-title">{words(x['chaos_title'])}</h2>
    <svg class="layer">{tangles}</svg>{bots}{keys}
    <div class="qs">{qs}</div>
  </section>

  <section id="sc3" class="clip" {d(t['shift'], t['board'])}>
    <div class="shift" id="shift"><p id="sh1">{words(x['shift1'])}</p><p id="sh2">{words(x['shift2'], 'w2', x['accent2'])}</p><div class="gline" id="gline"></div></div>
  </section>

  <section id="sc4" class="clip" {d(t['board'], t['people'])}>
    <p class="step" id="b-step">{e(x['board_step'])}</p><h2 class="title" id="b-title">{e(x['board_title'])}</h2>
    <div class="bmark" id="bmark"><img src="assets/fabric-icon.png" alt=""><span>Fabric</span></div>
    <div class="duties">{duties}</div>
    <div class="bpanel" id="bpanel"><img src="assets/{board_img}" alt=""><span class="sample">{e(x['sample'])}</span></div>
  </section>

  <section id="sc5" class="clip" {d(t['people'], t['work'])}>
    <p class="step" id="r-step">{e(x['roles_step'])}</p><h2 class="title" id="r-title">{e(x['roles_title'])}</h2>
    <div class="roles">{roles}</div>
  </section>

  <section id="sc6" class="clip" {d(t['work'], t['system'])}>
    <p class="step" id="w-step">{e(x['work_step'])}</p><h2 class="title" id="w-title">{e(x['work_title'])}</h2>
    <svg class="layer"><path class="vlink" id="v0" d="M960 352 L 960 406" pathLength="1"/>{alinks}
      <path class="vlink" id="lp1" d="M960 676 C 1060 740, 1260 740, 1310 676" pathLength="1"/></svg>
    <div class="top" id="top">{e(x['top'])}</div><div class="bd" id="bd">{e(x['board'])}</div>
    {agents}<div class="room" id="room">{e(x['room'])}</div>
    <div class="loop" id="loop1">{loop1}</div>
    <div class="loop" id="loop2"><span class="lsingle">{e(x['loop2'])}</span></div>
    <div class="loop" id="loop3"><span class="lsingle">{e(x['loop3'])}</span><span class="langs">{LANGS}</span></div>
    <div class="rec" id="rec">✓ {e(x['record'])}</div>
  </section>

  <section id="sc7" class="clip" {d(t['system'], t['grow'])}>
    <p class="step" id="y-step">{e(x['sys_step'])}</p><h2 class="title" id="y-title">{e(x['sys_title'])}</h2>
    <div class="syss">{sysc}</div>
  </section>

  <section id="sc8" class="clip" {d(t['grow'], t['close'])}>
    <p class="step" id="g-step">{e(x['grow_step'])}</p><h2 class="title" id="g-title">{e(x['grow_title'])}</h2>
    <div class="mach" id="m1" style="left:96px; top:360px"><div class="mscreen"><span class="space"></span></div><div class="mbase"></div>
      <div class="mlabel">{e(x['g1'])}</div>{chip('free')}</div>
    <div class="mach" id="m2" style="left:500px; top:360px"><div class="mscreen">{spaces}</div><div class="mbase"></div>
      <div class="mlabel">{e(x['g2'])}</div><div class="msub">{e(x['g2s'])}</div>{chip('req')}</div>
    <div class="admin" id="admin"><img src="assets/passioncode-mark.svg" alt="" style="width:40px;height:40px">{e(x['g3'])}</div>
    <svg class="layer"><path class="vlink" id="gl1" d="M400 455 L 496 455" pathLength="1"/><path class="vlink" id="gl2" d="M806 455 L 1096 400" pathLength="1"/></svg>
    {clones}<div class="glabel" id="glabel">{e(x['g4'])}{chip('dirn')}</div>
  </section>

  <section id="sc9" class="clip" {d(t['close'], T)}>
    <div class="endc"><img class="emark" id="emark" src="assets/passioncode-mark.svg" alt="">
      <h2 class="etitle" id="etitle">{words(x['close'], 'ew', x['accent'])}</h2>
      <div class="ectas"><span class="ecta a" id="cta1">{e(x['cta1'])} →</span><span class="ecta b" id="cta2">{e(x['cta2'])} ↗</span></div>
      <p class="eurl" id="eurl">passioncode.ai</p></div>
  </section>

  <div id="bug"><img src="assets/passioncode-mark.svg" alt=""><span>passioncode.ai</span></div>
  <div id="rail"><div class="line"></div><div class="fill" id="rail-fill"></div>{ticks}{labels}</div>
</div>
<script>
  const T = {json.dumps(t)};
  const PX = {json.dumps(px)};
  const tl = gsap.timeline({{ paused: true }});
  const OUT = "expo.out", MOVE = "power3.inOut";
  const up = (sel, at, dy = 40, dur = 0.6) => tl.fromTo(sel, {{ opacity: 0, y: dy }}, {{ opacity: 1, y: 0, duration: dur, ease: OUT }}, at);
  const pop = (sel, at, dur = 0.55) => tl.fromTo(sel, {{ opacity: 0, scale: 0.94, y: 24 }}, {{ opacity: 1, scale: 1, y: 0, duration: dur, ease: OUT }}, at);
  const out = (sel, at, dur = 0.35) => tl.to(sel, {{ opacity: 0, duration: dur, ease: "power2.out" }}, at);
  const draw = (sel, at, dur = 0.6, stagger = 0) => tl.fromTo(sel, {{ strokeDashoffset: 1 }}, {{ strokeDashoffset: 0, duration: dur, ease: OUT, stagger }}, at);
  const wordsIn = (sel, at, stagger = 0.05, dy = 46) => tl.fromTo(sel, {{ opacity: 0, y: dy }}, {{ opacity: 1, y: 0, duration: 0.55, ease: OUT, stagger }}, at);

  tl.fromTo("#rail-fill", {{ scaleX: 0 }}, {{ scaleX: 1, duration: T.E, ease: "none" }}, 0);
  const CH = {json.dumps(chap_keys)};
  CH.forEach((k, i) => {{
    tl.fromTo(`#chap${{i}}`, {{ opacity: 0, y: 12 }}, {{ opacity: 1, y: 0, duration: 0.45, ease: OUT }}, Math.max(0.05, T[k]));
    const next = i + 1 < CH.length ? T[CH[i + 1]] : T.E;
    tl.to(`#chap${{i}}`, {{ opacity: 0, y: -10, duration: 0.25, ease: "power2.out" }}, next - 0.25);
  }});
  tl.fromTo("#bug", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.5 }}, T.shift);
  out("#bug", T.E - 0.4, 0.4);

  // 1. Today: the task passes from person to person and waits at each
  up("#old-step", 0.1, 16); wordsIn("#old-title .w", 0.2, 0.05);
  for (let i = 0; i < 4; i++) pop(`#p${{i}}`, 0.5 + i * 0.12);
  const leg = (T.assist - 1.4) / 3;
  tl.set("#token", {{ x: PX[0] - 14, y: 380, opacity: 1 }}, 1.2);
  for (let i = 0; i < 3; i++) {{
    const at = 1.4 + i * leg;
    draw(`#hand${{i}}`, at, 0.5);
    tl.fromTo(`#wait${{i}}`, {{ opacity: 0 }}, {{ opacity: 1, duration: 0.2 }}, at - 0.05);
    tl.to(`#wait${{i}}`, {{ opacity: 0, duration: 0.2 }}, at + leg * 0.6);
    tl.to("#token", {{ x: PX[i + 1] - 14, duration: leg * 0.35, ease: MOVE }}, at + leg * 0.55);
  }}
  // assistants arrive and pile their output on each person
  for (let i = 0; i < 4; i++) {{
    for (let k = 0; k < 2; k++) pop(`#ai${{i}}_${{k}}`, T.assist + 0.2 + i * 0.15 + k * 0.1, 0.4);
    for (let k = 0; k < 4; k++) tl.fromTo(`#doc${{i}}_${{k}}`, {{ opacity: 0, y: -24 }}, {{ opacity: 1, y: 0, duration: 0.3, ease: OUT }}, T.assist + 0.9 + k * 0.32 + i * 0.07);
    tl.fromTo(`#wait${{i}}`, {{ opacity: 0 }}, {{ opacity: 1, duration: 0.25 }}, T.assist + 2.0 + i * 0.1);
  }}
  draw(".mline", T.meet + 0.1, 0.6, 0.08);
  pop("#meet", T.meet + 0.4);
  out(["#sc1 .person", "#token", "#meet", "#sc1 svg", "#old-step", "#old-title"], T.chaos - 0.35);

  // 2. Chaos: everyone's own agents, tangled, keys everywhere, no record
  wordsIn("#chaos-title .w", T.chaos + 0.05, 0.05);
  tl.fromTo(".bot", {{ opacity: 0, scale: 0.4 }}, {{ opacity: 1, scale: 1, duration: 0.35, ease: OUT, stagger: 0.07 }}, T.chaos + 0.4);
  draw(".tangle", T.chaos + 0.8, 0.9, 0.08);
  tl.fromTo(".key", {{ opacity: 0, rotation: -30 }}, {{ opacity: 1, rotation: 0, duration: 0.4, ease: OUT, stagger: 0.12 }}, T.chaos + 1.6);
  for (let i = 0; i < 3; i++) pop(`#q${{i}}`, T.chaos + 2.6 + i * 0.6);
  tl.to(["#sc2 svg", ".bot", ".key"], {{ opacity: 0, scale: 0.6, duration: 0.45, ease: MOVE }}, T.shift - 0.5);
  out(["#chaos-title", ".q"], T.shift - 0.35);

  // 3. The shift
  wordsIn("#sh1 .w", T.shift + 0.05, 0.07, 60);
  wordsIn("#sh2 .w2", T.shift + 1.5, 0.07, 60);
  tl.fromTo("#gline", {{ scaleX: 0 }}, {{ scaleX: 1, duration: 0.8, ease: OUT }}, T.shift + 2.3);
  tl.to("#shift", {{ y: -60, opacity: 0, duration: 0.45, ease: MOVE }}, T.board - 0.5);

  // 4. Fabric keeps the board: today in preview, next as direction
  up("#b-step", T.board + 0.05, 16); up("#b-title", T.board + 0.1, 24); pop("#bmark", T.board + 0.35);
  tl.fromTo("#bpanel", {{ opacity: 0, x: 160, rotationY: -12, transformPerspective: 1400 }}, {{ opacity: 1, x: 0, rotationY: 0, duration: 0.8, ease: OUT }}, T.board + 0.3);
  up("#duty0", T.today + 0.4, 20); up("#duty1", T.today + 1.6, 20);
  up("#duty2", T.next + 0.2, 20); up("#duty3", T.next + 1.2, 20);
  out(["#b-step", "#b-title", "#bmark", ".duty", "#bpanel"], T.people - 0.35);

  // 5. People steer
  up("#r-step", T.people + 0.05, 16); up("#r-title", T.people + 0.1, 24);
  for (let i = 0; i < 3; i++) pop(`#role${{i}}`, T.people + 0.4 + i * 0.9);
  out(["#r-step", "#r-title", ".role"], T.work - 0.35);

  // 6. At work: the agentic company, then its three loops and the record
  up("#w-step", T.work + 0.05, 16); up("#w-title", T.work + 0.1, 24);
  pop("#top", T.work + 0.5); draw("#v0", T.work + 0.8, 0.4); pop("#bd", T.work + 0.9);
  for (let i = 0; i < 5; i++) {{ draw(`#al${{i}}`, T.work + 1.2 + i * 0.08, 0.45); pop(`#ag${{i}}`, T.work + 1.3 + i * 0.08, 0.45); }}
  for (let i = 0; i < 5; i++) draw(`#ar${{i}}`, T.work + 1.9 + i * 0.06, 0.45);
  pop("#room", T.work + 2.2);
  // a user's question: support, analytics, product
  tl.set(["#ag2", "#ag1", "#ag3"], {{ className: "agentbox lit" }}, T.loop1 + 0.1);
  draw("#lp1", T.loop1 + 0.3, 0.8);
  tl.fromTo("#loop1", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.3 }}, T.loop1 + 0.1);
  for (let i = 0; i < 4; i++) tl.fromTo(`#l1_${{i}}`, {{ opacity: 0, y: 14 }}, {{ opacity: 1, y: 0, duration: 0.35, ease: OUT }}, T.loop1 + 0.3 + i * 0.5);
  out("#loop1", T.loop2 - 0.25, 0.25);
  tl.set(["#ag2", "#ag1", "#ag3"], {{ className: "agentbox" }}, T.loop2);
  tl.set("#ag0", {{ className: "agentbox lit" }}, T.loop2);
  tl.fromTo("#loop2", {{ opacity: 0, y: 14 }}, {{ opacity: 1, y: 0, duration: 0.4, ease: OUT }}, T.loop2 + 0.1);
  out("#loop2", T.loop3 - 0.25, 0.25);
  tl.set("#ag0", {{ className: "agentbox" }}, T.loop3);
  tl.set("#ag4", {{ className: "agentbox lit" }}, T.loop3);
  tl.fromTo("#loop3", {{ opacity: 0, y: 14 }}, {{ opacity: 1, y: 0, duration: 0.4, ease: OUT }}, T.loop3 + 0.1);
  out("#loop3", T.record - 0.25, 0.25);
  tl.set("#ag4", {{ className: "agentbox" }}, T.record);
  tl.to("#room", {{ borderStyle: "solid", boxShadow: "0 0 0 6px rgba(240,180,41,.18)", duration: 0.4 }}, T.record + 0.1);
  tl.fromTo("#rec", {{ opacity: 0, y: 14 }}, {{ opacity: 1, y: 0, duration: 0.45, ease: OUT }}, T.record + 0.2);
  out(["#w-step", "#w-title", "#top", "#bd", ".agentbox", "#room", "#rec", "#sc6 svg"], T.system - 0.35);

  // 7. One system
  up("#y-step", T.system + 0.05, 16); up("#y-title", T.system + 0.1, 24);
  for (let i = 0; i < 4; i++) pop(`#sys${{i}}`, T.system + 0.5 + i * 0.55);
  out(["#y-step", "#y-title", ".sys"], T.grow - 0.35);

  // 8. Grow: one machine, the organization's device, its administration, then clones
  up("#g-step", T.grow + 0.05, 16); up("#g-title", T.grow + 0.1, 24);
  pop("#m1", T.grow + 0.5);
  draw("#gl1", T.device + 0.1, 0.5); pop("#m2", T.device + 0.3);
  tl.fromTo("#admin", {{ opacity: 0, x: -20 }}, {{ opacity: 1, x: 0, duration: 0.5, ease: OUT }}, T.device + 2.6);
  draw("#gl2", T.clone + 0.1, 0.5);
  for (let k = 0; k < 6; k++) pop(`#cl${{k}}`, T.clone + 0.4 + k * 0.14, 0.45);
  tl.fromTo("#glabel", {{ opacity: 0, y: 14 }}, {{ opacity: 1, y: 0, duration: 0.45, ease: OUT }}, T.clone + 1.2);
  out(["#g-step", "#g-title", ".mach", "#admin", ".clone", "#glabel", "#sc8 svg"], T.close - 0.35);

  // 9. The end card on the music's final hit
  tl.fromTo("#emark", {{ opacity: 0, scale: 0.9 }}, {{ opacity: 1, scale: 1, duration: 0.8, ease: OUT }}, T.close);
  wordsIn("#etitle .ew", T.close + 0.2, 0.05, 30);
  pop("#cta1", T.cta + 0.05); pop("#cta2", T.cta + 0.6);
  up("#eurl", T.cta + 1.2, 16);
  window.__timelines["main"] = tl;
</script>
</body>
</html>
"""
    (out / "index.html").write_text(doc, encoding="utf-8")
    return dict(locale=loc, T=T, E=E, vo_end=vo_end, X=X, music_a=a, music_b=round(b, 3), cues=t)


if __name__ == "__main__":
    print(json.dumps(build(sys.argv[1], Path(sys.argv[2])), indent=1))
