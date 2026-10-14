#!/usr/bin/env python3
"""Build the HyperFrames composition for the passioncode.ai home video v3 (re-voiced v2), per locale.

Usage: SITE_ROOT=... FONTS_DIR=... MONO_DIR=... GSAP_JS=... NARRATION_WAV=... MUSIC_WAV=... FABRIC_ICON=... \
       CUES_JSON=... gen3.py LOCALE OUT_DIR

CUES_JSON holds, per locale, the narration-local start of each named cue, measured by timing.py on a
word-timed transcription of the delivered narration (no hand-entered timings).

Inputs: the site's own sample-data mockups and product marks (SITE_ROOT/assets), the site's token layer
(SITE_ROOT/design-system/tokens.css, linked unmodified), the narration and music delivered by our media
pipeline, Inter (OFL) and JetBrains Mono (OFL), GSAP 3.14.2. No network at render time. Every cue derives
from the narration's measured sentence starts (ffmpeg silencedetect -40 dB / 0.22 s), see ../script.md.
The zipped OUT_DIR is what the media pipeline renders (recipe video-render).
"""
import html, json, os, re, shutil, subprocess, sys
from pathlib import Path

SITE = Path(os.environ["SITE_ROOT"])
FONTS, MONO = Path(os.environ["FONTS_DIR"]), Path(os.environ["MONO_DIR"])
GSAP, VO, MUSIC = Path(os.environ["GSAP_JS"]), Path(os.environ["NARRATION_WAV"]), Path(os.environ["MUSIC_WAV"])
FABRIC_ICON = Path(os.environ["FABRIC_ICON"])
V0 = 0.5            # the narration starts here
DROP, HIT, BAR = 12.85, 90.02, 1.07   # music: full groove, final hit, its two-beat pulse (measured, ../README.md)

# Cue starts in the delivered narration (seconds, before the V0 offset), measured by timing.py.
N = json.load(open(os.environ["CUES_JSON"]))

AVAIL = {"en": "AVAILABLE NOW", "ru": "ДОСТУПНО СЕЙЧАС"}
PREV = {"en": "PREVIEW", "ru": "ПРЕДВАРИТЕЛЬНАЯ ВЕРСИЯ"}

TXT = {
    "en": dict(
        chapters=["Problem", "Promise", "Values", "Start", "Toolkit", "Together", "Organizations", "Vision"],
        h1="Your agent works for a week", h2="Then it falls apart",
        symptoms=["Wrong account", "Forgot what it learned", "What did it change?"],
        promise="The agent-agnostic operating system for AI-native teams", accent="agent-agnostic",
        promise_sub="Build a workplace where agents do the work, and you see all of it",
        values=[("On your machines", "Local first"), ("Open source", "GNU AGPL-3.0"),
                ("Any agent", "The subscription you already have"), ("Evidence, not claims", "A record you can open")],
        agents="Claude Code · Codex · Kilo Code · Hermes Agent · Cline",
        start_step="01 · Start", start_title="One command", start_sub="Fabric, the tools around it and the skills",
        targets=["apps: Fabric · Switchboard · Dashboards · Observatory · Inbox", "skills for Claude Code and Codex", "MCP servers connected"],
        start_note="Apps install on macOS. Fabric is a preview and needs Docker and the Supabase CLI.",
        agent_run="Or your coding agent runs it for you",
        bridge_step="In the toolkit", bridge_title="Each tool works with Fabric,", bridge_title2="and on its own",
        fab_step="02 · Fabric", fab_title="The home for your projects and their agents",
        pair_a="Agent: create or adapt", pair_p="Project: open or create",
        plan_step="03 · First agent", plan_title="The plan comes first",
        plan_sub="Your coding agent shows its plan before it changes anything",
        plan_note="A written example, not a recording.",
        tools=[("Switchboard", "Accounts", "Each agent on the account it should, limits in view"),
               ("Fabric Dashboards", "State, spend and control", "Every agent service in one window"),
               ("Project Observatory", "Memory and evidence", "What changed, with the evidence"),
               ("Fabric Inbox", "Mail", "Agents answer only within your rules")],
        tog_step="05 · Together", tog_title="Agents connected to Fabric share one project", center="Fabric project",
        center_items="Board · Memory · Hand-offs",
        nodes=[("Launcher", "Skills"), ("Switchboard", "Accounts"), ("Dashboards", "State and spend"),
               ("Observatory", "Evidence"), ("Inbox", "Mail")],
        handoff="Hand-off",
        org_step="06 · Organizations", org_title="On your organization’s machines",
        org_product="PassionCode for Enterprise", org_chip="IN DEVELOPMENT · ON REQUEST",
        org_cols=["What each agent cost", "What it delivered"],
        org_foot="Your data on your machines or in your own cloud",
        v1="Agents are easy to start and hard to keep", v2="We are building what holds them together",
        end_sub="Open source under the GNU AGPL-3.0", sample="Sample data",
    ),
    "ru": dict(
        chapters=["Проблема", "Обещание", "Ценности", "Старт", "Инструменты", "Вместе", "Организациям", "Видение"],
        h1="Вы настроили агента, и неделю он работает", h2="Потом всё расползается",
        symptoms=["Не тот аккаунт", "Забыл, что узнал вчера", "Что он поменял?"],
        promise="Операционная система для команд с\u00a0любыми ИИ-агентами", accent="любыми",
        promise_sub="Соберите рабочее место, где работу делают агенты, а\u00a0вы видите\u00a0всё",
        values=[("На ваших машинах", "Локально"), ("Открытый код", "GNU AGPL-3.0"),
                ("Любой агент", "Подписка, которая у вас уже есть"),
                ("Подтверждения, а не обещания", "Запись, которую можно открыть")],
        agents="Claude Code · Codex · Kilo Code · Hermes Agent · Cline",
        start_step="01 · Старт", start_title="Одна команда", start_sub="Fabric, инструменты вокруг него и навыки",
        targets=["приложения: Fabric · Switchboard · Dashboards · Observatory · Inbox", "навыки для Claude Code и Codex", "MCP-серверы подключены"],
        start_note="Приложения ставятся на macOS. Fabric — предварительная версия, ему нужны Docker и Supabase CLI.",
        agent_run="Или её запустит ваш агент для программирования",
        bridge_step="В наборе", bridge_title="Каждый инструмент работает с Fabric", bridge_title2="и сам по себе",
        fab_step="02 · Fabric", fab_title="Дом для ваших проектов и их агентов",
        pair_a="Агент: создать или адаптировать", pair_p="Проект: открыть или создать",
        plan_step="03 · Первый агент", plan_title="Сначала план",
        plan_sub="Агент для программирования показывает план, прежде чем что-то менять",
        plan_note="Написанный пример, а не запись сеанса.",
        tools=[("Switchboard", "Аккаунты", "Каждый агент на нужном аккаунте, лимиты на виду"),
               ("Fabric Dashboards", "Состояние, расходы и управление", "Все сервисы агентов в одном окне"),
               ("Project Observatory", "Память и подтверждения", "Что изменилось, с подтверждениями"),
               ("Fabric Inbox", "Почта", "Агенты отвечают только по вашим правилам")],
        tog_step="05 · Вместе", tog_title="Агенты, подключённые к Fabric, делят один проект", center="Проект Fabric",
        center_items="Доска · Память · Передача работы",
        nodes=[("Лаунчер", "Навыки"), ("Switchboard", "Аккаунты"), ("Dashboards", "Состояние и расходы"),
               ("Observatory", "Подтверждения"), ("Inbox", "Почта")],
        handoff="Передача работы",
        org_step="06 · Организациям", org_title="На машинах вашей организации",
        org_product="PassionCode for Enterprise", org_chip="В РАЗРАБОТКЕ · ПО ЗАПРОСУ",
        org_cols=["Сколько стоил каждый агент", "Что он дал"],
        org_foot="Данные остаются на ваших машинах или в вашем облаке",
        v1="Агентов легко запустить и трудно удержать", v2="Мы строим то, что держит их вместе",
        end_sub="Открытый код под GNU AGPL-3.0", sample="Пример данных",
    ),
}

# Simple line glyphs for the value tiles (gold strokes, no fill).
GLYPHS = [
    '<rect x="8" y="12" width="48" height="32" rx="4"/><path d="M2 52h60"/>',
    '<path d="M22 16 8 32l14 16M42 16l14 16-14 16M36 10 28 54"/>',
    '<circle cx="32" cy="12" r="6"/><circle cx="52" cy="32" r="6"/><circle cx="32" cy="52" r="6"/><circle cx="12" cy="32" r="6"/><circle cx="32" cy="32" r="4"/>',
    '<path d="M16 6h24l10 10v42H16z"/><path d="M24 36l7 7 12-14"/>',
]


def img(name: str, loc: str) -> str:
    stem, ext = name.rsplit(".", 1)
    if loc == "ru" and (SITE / "assets" / f"{stem}-ru.{ext}").exists():
        return f"{stem}-ru.{ext}"
    return name


def speech_end(wav: Path) -> float:
    err = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(wav), "-af", "silencedetect=n=-45dB:d=0.2", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(wav)],
                               capture_output=True, text=True).stdout)
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    tail = [s for s in starts if s > dur - 1.5]
    return (tail[-1] if tail else dur), dur


def build(loc: str, out: Path) -> dict:
    x = TXT[loc]
    e = lambda s: html.escape(s, quote=True)
    t = {k: round(v + V0, 2) for k, v in N[loc].items()}
    t["s0"] = V0
    vo_end_local, vo_dur = speech_end(VO)
    vo_end = round(V0 + vo_end_local, 2)
    E = round(vo_end + 0.45, 2)          # end card, on the music's final hit
    T = round(E + 3.0, 2)                # root duration
    X = round(t["s17"] + 1.0, 2)         # crossfade between the two music clips, under the voice
    a0 = DROP - t["s5"]                  # music offset that puts the full groove on the promise
    b = HIT - E                          # music offset that puts the final hit on the end card
    a = round(b - round((b - a0) / BAR) * BAR, 3)
    t.update(vo_end=vo_end, E=E, T=T, X=X)

    out.mkdir(parents=True, exist_ok=True)
    (out / "assets").mkdir(exist_ok=True)
    pics = {k: img(v, loc) for k, v in dict(
        fabric="journey-2-2.jpg", plan="journey-3-4.jpg", sb="switchboard-accounts.jpg", dash="dashboards-overview.jpg",
        obs="observatory-overview.jpg", inbox="inbox-overview.jpg", board="fabric-board.jpg").items()}
    for f in set(pics.values()):
        shutil.copy2(SITE / "assets" / f, out / "assets" / f)
        subprocess.run(["sips", "-Z", "1280", str(out / "assets" / f)], check=True, capture_output=True)
    for f in ["passioncode-mark.svg", "switchboard-mark.svg", "dashboards-mark.svg", "observatory-mark.svg", "inbox-mark.svg"]:
        shutil.copy2(SITE / "assets" / f, out / "assets" / f)
    shutil.copy2(SITE / "design-system" / "tokens.css", out / "tokens.css")
    subprocess.run(["sips", "-Z", "256", str(FABRIC_ICON), "--out", str(out / "assets" / "fabric-icon.png")], check=True, capture_output=True)
    for f in ("Inter-Medium.ttf", "InterDisplay-Bold.ttf", "Inter-OFL.txt"):
        shutil.copy2(FONTS / f, out / "assets" / f)
    shutil.copy2(MONO / "JetBrainsMono-400.woff2", out / "assets" / "JetBrainsMono-400.woff2")
    shutil.copy2(MONO / "JetBrainsMono-OFL.txt", out / "assets" / "JetBrainsMono-OFL.txt")
    shutil.copy2(GSAP, out / "gsap.min.js")
    # The delivered WAVs stay the masters. The render check inlines an asset only up to 2 MB, so the composition
    # carries MP3s; the narration gets +2 dB through a true-peak limiter so the mix lands near -14 LUFS.
    ff = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i"]
    subprocess.run(ff + [str(VO), "-af", "volume=2dB,alimiter=limit=0.84:level=false", "-c:a", "libmp3lame", "-b:a", "128k",
                         "-ac", "1", "-ar", "48000", str(out / "assets/narration.mp3")], check=True)
    subprocess.run(ff + [str(MUSIC), "-c:a", "libmp3lame", "-b:a", "112k", "-ac", "2", "-ar", "48000",
                         str(out / "assets/music.mp3")], check=True)

    d = lambda s0, s1: f'data-start="{s0:.2f}" data-duration="{s1 - s0:.2f}"'
    chip = lambda label, cls="": f'<span class="chip {cls}">{e(label)}</span>'
    words = lambda s, cls="w", accent=None: " ".join(
        f'<span class="{cls}">' + (e(wd).replace(e(accent), f'<span class="gold">{e(accent)}</span>') if accent else e(wd)) + '</span>'
        for wd in s.split(" "))
    lane = lambda pts: json.dumps({"version": 1, "lanes": [{"target": "volume", "points": [{"t": round(p, 3), "v": v} for p, v in pts]}]})

    chapters = [("s0", 0), ("s5", 1), ("s6", 2), ("s8", 3), ("br", 4), ("s16", 5), ("s17", 6), ("s18", 7)]
    ticks = "".join(f'<span class="tick" style="left:{(t[k] / E) * 100:.3f}%"></span>' for k, _ in chapters)
    labels = "".join(f'<span class="chap" id="chap{i}">{i + 1:02d} · {e(x["chapters"][i])}</span>' for _, i in chapters)

    symptoms = "".join(f'<div class="sym" id="sym{i}"><span class="x"></span><span>{e(s)}</span></div>'
                       for i, s in enumerate(x["symptoms"]))
    tiles = "".join(
        f'<div class="tile" id="tile{i}"><span class="hl"></span><span class="num">{i + 1:02d}</span>'
        f'<svg class="glyph" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">{GLYPHS[i]}</svg>'
        f'<div class="tile-k">{e(k)}</div><div class="tile-v">{e(v)}</div>'
        + (f'<div class="tile-list">{e(x["agents"])}</div>' if i == 2 else "") + '</div>'
        for i, (k, v) in enumerate(x["values"]))
    cmd = "npx @passioncode-ai/passioncode@latest setup"
    typed = "".join(f'<span class="ch">{e(c) if c != " " else "&nbsp;"}</span>' for c in cmd)

    marks = ["switchboard-mark.svg", "dashboards-mark.svg", "observatory-mark.svg", "inbox-mark.svg"]
    tool_pics = [pics["sb"], pics["dash"], pics["obs"], pics["inbox"]]
    tool_chip = [AVAIL[loc], AVAIL[loc], AVAIL[loc], PREV[loc]]
    tool_sides = "".join(
        f'<div class="tside" id="tside{i}"><img class="tmark" src="assets/{marks[i]}" alt="">'
        f'<p class="trole">{e(role)}</p><h2 class="tname">{e(name)}</h2><p class="tline">{e(line)}</p>'
        f'{chip(tool_chip[i], "pv" if i == 3 else "")}</div>'
        for i, (name, role, line) in enumerate(x["tools"]))
    tool_panels = "".join(
        f'<div class="panel {"pdash" if i == 1 else "p1610"}" id="tpanel{i}"><img src="assets/{tool_pics[i]}" alt="">'
        + (f'<span class="sample">{e(x["sample"])}</span>' if i == 1 else "") + '</div>'
        for i in range(4))

    bmarks = [("switchboard-mark.svg", "Switchboard", 470, 380), ("dashboards-mark.svg", "Dashboards", 1330, 380),
              ("observatory-mark.svg", "Observatory", 470, 740), ("inbox-mark.svg", "Inbox", 1330, 740)]
    bridge_marks = "".join(f'<div class="bmark" id="bm{i}" style="left:{bx}px; top:{by}px"><img src="assets/{m}" alt=""><span>{e(n)}</span></div>'
                           for i, (m, n, bx, by) in enumerate(bmarks))
    bridge_links = "".join(f'<path class="blink" id="bl{i}" d="M{bx + 60} {by + 52} L{960} {595}" pathLength="1"/>'
                           for i, (m, n, bx, by) in enumerate(bmarks))
    node_marks = ["passioncode-mark.svg", "switchboard-mark.svg", "dashboards-mark.svg", "observatory-mark.svg", "inbox-mark.svg"]
    node_pos = [(130, 290), (130, 500), (130, 710), (1490, 360), (1490, 640)]
    nodes = "".join(
        f'<div class="node" id="node{i}" style="left:{px}px; top:{py}px"><img src="assets/{node_marks[i]}" alt="">'
        f'<div><div class="node-k">{e(k)}</div><div class="node-v">{e(v)}</div></div></div>'
        for i, ((k, v), (px, py)) in enumerate(zip(x["nodes"], node_pos)))
    # Lines from each node's inner edge to the centre card (680..1240 x 300..650).
    links = []
    for i, (px, py) in enumerate(node_pos):
        y0 = py + 50
        if px < 960:
            links.append((px + 300, y0, 680, max(330, min(620, y0))))
        else:
            links.append((px, y0, 1240, max(330, min(620, y0))))
    link_svg = "".join(f'<path class="link" id="link{i}" d="M{a1} {b1} L{a2} {b2}" pathLength="1"/>' for i, (a1, b1, a2, b2) in enumerate(links))

    machines = "".join(
        f'<div class="mach" id="mach{i}" style="left:{96 + (i % 3) * 300}px; top:{360 + (i // 3) * 250}px">'
        f'<div class="screen">' + "".join(f'<span class="dot d{(i + j) % 3}"></span>' for j in range(2 + i % 2)) +
        '</div><div class="base"></div></div>' for i in range(6))
    mlinks = "".join(
        f'<path class="mlink" id="mlink{k}" d="M{x1} {y1} L{x2} {y2}" pathLength="1"/>'
        for k, (x1, y1, x2, y2) in enumerate([(326, 435, 396, 435), (626, 435, 696, 435), (326, 685, 396, 685),
                                              (626, 685, 696, 685), (211, 524, 211, 606), (511, 524, 511, 606),
                                              (811, 524, 811, 606)]))

    doc = f"""<!doctype html>
<html lang="{loc}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1920, height=1080">
<title>passioncode.ai home video v2 ({loc})</title>
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
.w {{ display:inline-block; }}
.gold {{ color:var(--pc-accent); }}
.mag {{ color:var(--pc-brand-magenta); }}
/* rail: the one clock, made visible */
#rail {{ position:absolute; left:96px; right:96px; bottom:52px; height:40px; }}
#rail .line {{ position:absolute; left:0; right:0; bottom:0; height:3px; background:var(--pc-border); border-radius:2px; }}
#rail .fill {{ position:absolute; left:0; right:0; bottom:0; height:3px; background:var(--pc-accent); border-radius:2px; transform-origin:0 50%; }}
#rail .tick {{ position:absolute; bottom:-4px; width:2px; height:11px; background:var(--pc-border-strong); }}
.chap {{ position:absolute; left:0; bottom:16px; font-weight:700; font-size:18px; letter-spacing:.12em; color:var(--pc-accent); white-space:nowrap; opacity:0; }}
#bug {{ position:absolute; left:96px; top:56px; display:flex; align-items:center; gap:14px; opacity:0; }}
#bug img {{ width:44px; height:44px; }}
#bug span {{ font-weight:700; font-size:24px; letter-spacing:-.01em; }}
/* 1 problem */
.hook {{ position:absolute; left:160px; top:220px; width:1600px; }}
.h1 {{ font-weight:700; font-size:{88 if loc == 'en' else 76}px; line-height:1.08; letter-spacing:-.025em; }}
.h2 {{ margin-top:8px; font-weight:700; font-size:{88 if loc == 'en' else 76}px; line-height:1.08; letter-spacing:-.025em; color:var(--pc-brand-magenta); }}
.syms {{ position:absolute; left:160px; top:600px; display:flex; gap:32px; }}
.sym {{ display:flex; align-items:center; gap:20px; width:500px; height:140px; padding:0 34px; border:1px solid var(--pc-border-strong);
        border-radius:var(--pc-radius-feature); background:var(--pc-panel); font-size:{34 if loc == 'en' else 31}px; font-weight:600; }}
.x {{ flex:none; width:40px; height:40px; border-radius:50%; border:3px solid var(--pc-negative); position:relative; }}
.x::before, .x::after {{ content:""; position:absolute; left:16.5px; top:7px; width:3px; height:20px; background:var(--pc-negative); border-radius:2px; transform:rotate(45deg); }}
.x::after {{ transform:rotate(-45deg); }}
/* 2 promise */
.promise {{ position:absolute; left:160px; right:160px; top:210px; display:flex; flex-direction:column; align-items:center; text-align:center; }}
.pmark {{ width:150px; height:150px; margin-bottom:44px; }}
.ptitle {{ font-weight:700; font-size:{92 if loc == 'en' else 84}px; line-height:1.06; letter-spacing:-.028em; max-width:1500px; }}
.pline {{ width:420px; height:4px; margin:40px 0 34px; background:var(--pc-accent); border-radius:2px; transform-origin:50% 50%; }}
.psub {{ font-size:40px; line-height:1.3; color:var(--pc-text-muted); max-width:1300px; }}
/* 3 values */
.tiles {{ position:absolute; left:132px; top:250px; display:flex; gap:32px; }}
.tile {{ position:relative; width:390px; height:520px; padding:40px 36px; border:1px solid var(--pc-border-strong); border-radius:var(--pc-radius-feature);
         background:var(--pc-panel); display:flex; flex-direction:column; }}
.hl {{ position:absolute; inset:-1px; border:2px solid var(--pc-accent); border-radius:var(--pc-radius-feature); opacity:0; }}
.num {{ font-weight:700; font-size:24px; letter-spacing:.1em; color:var(--pc-accent); }}
.glyph {{ width:84px; height:84px; margin:40px 0 44px; color:var(--pc-accent); }}
.tile-k {{ font-weight:700; font-size:{46 if loc == 'en' else 40}px; line-height:1.08; letter-spacing:-.02em; }}
.tile-v {{ font-size:26px; line-height:1.3; color:var(--pc-text-muted); margin-top:20px; }}
.tile-list {{ font-size:19px; line-height:1.45; color:var(--pc-text); margin-top:auto; padding-top:18px; border-top:1px solid var(--pc-border); }}
/* shared side column */
.side {{ position:absolute; left:96px; top:0; bottom:0; width:430px; display:flex; flex-direction:column; justify-content:center; }}
.step {{ font-weight:700; font-size:22px; letter-spacing:.1em; color:var(--pc-accent); margin-bottom:24px; text-transform:uppercase; }}
.title {{ font-weight:700; font-size:{62 if loc == 'en' else 54}px; line-height:1.05; letter-spacing:-.025em; margin-bottom:24px; }}
.sub {{ font-size:28px; line-height:1.35; color:var(--pc-text-muted); margin-bottom:32px; }}
.note {{ font-size:20px; color:var(--pc-text-muted); margin-top:24px; font-style:italic; }}
.chip {{ white-space:nowrap; display:inline-block; align-self:flex-start; font-weight:700; font-size:18px; letter-spacing:.08em; padding:9px 16px; border-radius:var(--pc-radius-pill);
         color:var(--pc-on-accent); background:var(--pc-accent); }}
.chip.pv {{ color:var(--pc-text); background:transparent; border:2px solid var(--pc-brand-magenta); }}
.chip.dir {{ color:var(--pc-text); background:transparent; border:2px dashed var(--pc-text-muted); }}
/* 4 start */
.term {{ position:absolute; left:640px; top:300px; width:1184px; height:430px; border-radius:var(--pc-radius-feature); border:1px solid var(--pc-border-strong);
         background:var(--pc-panel); box-shadow:var(--pc-shadow-overlay); overflow:hidden; }}
.term-bar {{ height:54px; border-bottom:1px solid var(--pc-border); display:flex; align-items:center; gap:10px; padding:0 22px; }}
.term-bar span {{ width:14px; height:14px; border-radius:50%; background:var(--pc-border-strong); }}
.term-body {{ padding:44px 48px; font-family:"JetBrains Mono", monospace; font-size:34px; line-height:1.6; }}
.prompt {{ color:var(--pc-accent); margin-right:18px; }}
.ch {{ display:inline-block; }}
.ok {{ display:block; font-size:24px; line-height:1.55; color:var(--pc-positive); }}
.term-note {{ position:absolute; left:640px; top:752px; width:1184px; font-size:22px; color:var(--pc-text-muted); }}
.agentrun {{ position:absolute; left:640px; top:812px; display:flex; align-items:center; gap:18px; font-weight:700; font-size:34px;
             padding:18px 30px; border-radius:var(--pc-radius-pill); color:var(--pc-on-accent); background:var(--pc-accent); }}
.agentrun i {{ font-style:normal; font-family:"JetBrains Mono", monospace; font-size:30px; }}
/* 5b bridge */
.bstep {{ position:absolute; left:0; right:0; top:150px; text-align:center; font-weight:700; font-size:22px; letter-spacing:.1em; color:var(--pc-accent); text-transform:uppercase; }}
.btitle {{ position:absolute; left:0; right:0; top:196px; text-align:center; font-weight:700; font-size:{58 if loc == 'en' else 52}px; letter-spacing:-.02em; line-height:1.15; }}
.bline {{ display:block; }}
.bhub {{ position:absolute; left:860px; top:520px; width:200px; display:flex; flex-direction:column; align-items:center; }}
.bhub img {{ width:150px; height:150px; border-radius:34px; }}
.bhub span {{ margin-top:14px; font-weight:700; font-size:30px; }}
.bmark {{ position:absolute; width:120px; display:flex; flex-direction:column; align-items:center; }}
.bmark img {{ width:104px; height:104px; }}
.bmark span {{ margin-top:10px; font-weight:600; font-size:22px; white-space:nowrap; }}
.blink {{ stroke:var(--pc-accent); stroke-width:3; fill:none; stroke-dasharray:1; stroke-dashoffset:1; }}
/* panels */
.panel {{ position:absolute; left:560px; width:1264px; border-radius:18px; overflow:hidden; border:1px solid var(--pc-border-strong);
          box-shadow:var(--pc-shadow-overlay); background:var(--pc-panel); }}
.panel img {{ display:block; width:100%; height:100%; object-fit:cover; object-position:left top; }}
.p1610 {{ top:150px; height:790px; }}
.pdash {{ top:212px; height:667px; }}
.sample {{ position:absolute; right:22px; bottom:22px; font-weight:700; font-size:22px; padding:8px 18px; border-radius:var(--pc-radius-pill);
           background:var(--pc-accent); color:var(--pc-on-accent); }}
.box {{ position:absolute; border:3px solid var(--pc-accent); border-radius:16px; }}
.box-label {{ position:absolute; top:-46px; left:0; white-space:nowrap; font-weight:700; font-size:19px; color:var(--pc-on-accent);
              background:var(--pc-accent); padding:7px 14px; border-radius:10px; }}
/* 6 toolkit */
.tside {{ position:absolute; left:96px; top:0; bottom:0; width:430px; display:flex; flex-direction:column; justify-content:center; opacity:0; }}
.tmark {{ width:104px; height:104px; margin-bottom:30px; }}
.trole {{ font-weight:700; font-size:20px; letter-spacing:.1em; color:var(--pc-accent); text-transform:uppercase; margin-bottom:14px; }}
.tname {{ font-weight:700; font-size:{56 if loc == 'en' else 52}px; line-height:1.04; letter-spacing:-.025em; margin-bottom:22px; }}
.tline {{ font-size:28px; line-height:1.35; color:var(--pc-text-muted); margin-bottom:30px; }}
/* 7 together */
.ttitle {{ position:absolute; left:96px; top:176px; font-weight:700; font-size:54px; letter-spacing:-.025em; }}
.tstep {{ position:absolute; left:96px; top:140px; font-weight:700; font-size:20px; letter-spacing:.1em; color:var(--pc-accent); text-transform:uppercase; }}
.center {{ position:absolute; left:590px; top:300px; width:740px; display:flex; flex-direction:column; align-items:center; }}
.ccard {{ width:560px; height:350px; border-radius:18px; overflow:hidden; border:2px solid var(--pc-accent); box-shadow:var(--pc-shadow-overlay); position:relative; }}
.ccard img {{ width:100%; height:100%; object-fit:cover; object-position:left top; display:block; }}
.ccard .sample {{ font-size:16px; padding:6px 12px; right:12px; bottom:12px; }}
.clabel {{ white-space:nowrap; display:flex; align-items:center; gap:16px; margin-top:22px; font-weight:700; font-size:30px; }}
.clabel img {{ width:44px; height:44px; border-radius:10px; }}
.citems {{ margin-top:10px; font-size:24px; color:var(--pc-text-muted); }}
.cchip {{ margin-top:16px; }}
svg.links {{ position:absolute; left:0; top:0; width:1920px; height:1080px; }}
.link, .mlink, .harrow {{ stroke:var(--pc-border-strong); stroke-width:2; fill:none; stroke-dasharray:1; stroke-dashoffset:1; }}
.harrow {{ stroke:var(--pc-accent); stroke-width:3; }}
.node {{ position:absolute; width:300px; height:100px; display:flex; align-items:center; gap:18px; padding:0 18px; border:1px solid var(--pc-border-strong);
         border-radius:var(--pc-radius-panel); background:var(--pc-panel); }}
.node img {{ width:60px; height:60px; flex:none; }}
.node-k {{ font-weight:700; font-size:24px; }}
.node-v {{ font-size:19px; color:var(--pc-text-muted); margin-top:4px; }}
.agent {{ position:absolute; top:850px; display:flex; align-items:center; gap:12px; font-family:"JetBrains Mono", monospace; font-size:20px; color:var(--pc-text); }}
.agent i {{ display:block; width:18px; height:18px; border-radius:50%; background:var(--pc-accent); }}
.hlabel {{ position:absolute; left:860px; top:806px; width:200px; text-align:center; font-weight:700; font-size:20px; color:var(--pc-accent); letter-spacing:.04em; }}
/* 8 organizations */
.mach {{ position:absolute; width:230px; }}
.screen {{ height:150px; border:2px solid var(--pc-border-strong); border-radius:12px; background:var(--pc-panel); display:flex; align-items:center; justify-content:center; gap:16px; }}
.base {{ height:10px; margin:0 -14px; background:var(--pc-border-strong); border-radius:0 0 10px 10px; }}
.dot {{ display:block; width:22px; height:22px; border-radius:50%; }}
.d0 {{ background:var(--pc-accent); }} .d1 {{ background:var(--pc-brand-magenta); }} .d2 {{ background:var(--pc-info); }}
.oright {{ position:absolute; left:1080px; top:330px; width:744px; }}
.orow {{ padding:26px 0; border-bottom:1px solid var(--pc-border); }}
.orow-k {{ font-weight:700; font-size:{48 if loc == 'en' else 44}px; letter-spacing:-.02em; }}
.obar {{ height:6px; width:100%; margin-top:18px; background:var(--pc-accent); border-radius:3px; transform-origin:0 50%; }}
.obar.m {{ background:var(--pc-brand-magenta); }}
.ofoot {{ margin-top:34px; font-size:26px; color:var(--pc-text-muted); }}
.oprod {{ position:absolute; left:96px; top:262px; display:flex; align-items:center; gap:20px; font-size:28px; font-weight:600; }}
/* 9 vision, end */
.vis {{ position:absolute; left:160px; right:160px; top:350px; text-align:center; font-weight:700; font-size:{84 if loc == 'en' else 76}px; line-height:1.1; letter-spacing:-.028em; }}
.vis p + p {{ margin-top:30px; }}
.endc {{ position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; }}
.emark {{ width:180px; height:180px; margin-bottom:40px; }}
.eurl {{ font-weight:700; font-size:104px; letter-spacing:-.03em; }}
.esub {{ margin-top:22px; font-size:30px; color:var(--pc-text-muted); }}
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-width="1920" data-height="1080" data-duration="{T:.2f}">
  <audio id="vo" src="assets/narration.mp3" data-start="{V0:.2f}" data-duration="{vo_dur:.2f}" data-track-index="1" data-volume="1"></audio>
  <audio id="musicA" src="assets/music.mp3" data-start="0" data-duration="{X + 1.0:.2f}" data-trim-start="{a:.3f}" data-track-index="2" data-volume="1"
    data-automation='{lane([(0, 0.6), (t["s5"] - 0.35, 0.6), (t["s5"] + 0.2, 0.17), (X, 0.17), (X + 1.0, 0.0)])}'></audio>
  <audio id="musicB" src="assets/music.mp3" data-start="{X:.2f}" data-duration="{T - X:.2f}" data-trim-start="{X + b:.3f}" data-track-index="3" data-volume="1"
    data-automation='{lane([(0, 0.0), (1.0, 0.17), (E - X - 0.3, 0.17), (E - X, 0.62), (T - X - 1.6, 0.62), (T - X, 0.0)])}'></audio>

  <section id="sc1" class="clip" {d(0, t['s5'])}>
    <div class="hook"><h1 class="h1" id="h1">{words(x['h1'])}</h1>
    <p class="h2" id="h2">{words(x['h2'], 'w2')}</p></div>
    <div class="syms">{symptoms}</div>
  </section>

  <section id="sc2" class="clip" {d(t['s5'], t['s6'])}>
    <div class="promise" id="promise">
      <img class="pmark" id="pmark" src="assets/passioncode-mark.svg" alt="">
      <h2 class="ptitle" id="ptitle">{words(x['promise'], 'pw', x['accent'])}</h2>
      <div class="pline" id="pline"></div>
      <p class="psub" id="psub">{e(x['promise_sub'])}</p>
    </div>
  </section>

  <section id="sc3" class="clip" {d(t['s6'], t['s8'])}>
    <div class="tiles">{tiles}</div>
  </section>

  <section id="sc4" class="clip" {d(t['s8'], t['s10'])}>
    <div class="side" id="st-side"><p class="step">{e(x['start_step'])}</p><h2 class="title">{e(x['start_title'])}</h2>
      <p class="sub">{e(x['start_sub'])}</p>{chip(AVAIL[loc])}</div>
    <div class="term" id="term"><div class="term-bar"><span></span><span></span><span></span></div>
      <div class="term-body"><span class="prompt">$</span>{typed}
        {''.join(f'<span class="ok" id="ok{i}">✓ {e(s)}</span>' for i, s in enumerate(x['targets']))}</div></div>
    <p class="term-note" id="term-note">{e(x['start_note'])}</p>
    <div class="agentrun" id="agentrun"><i>&gt;_</i><span>{e(x['agent_run'])}</span></div>
  </section>

  <section id="sc5" class="clip" {d(t['s10'], t['br'])}>
    <div class="side" id="fab-side"><p class="step">{e(x['fab_step'])}</p><h2 class="title">{e(x['fab_title'])}</h2>{chip(PREV[loc], 'pv')}</div>
    <div class="side" id="plan-side"><p class="step">{e(x['plan_step'])}</p><h2 class="title">{e(x['plan_title'])}</h2>
      <p class="sub">{e(x['plan_sub'])}</p>{chip(AVAIL[loc])}<p class="note">{e(x['plan_note'])}</p></div>
    <div class="panel p1610" id="fab-panel"><img src="assets/{pics['fabric']}" alt="">
      <div class="box" id="boxA" style="left:296px; top:309px; width:418px; height:253px"><span class="box-label">{e(x['pair_a'])}</span></div>
      <div class="box" id="boxP" style="left:712px; top:309px; width:418px; height:253px"><span class="box-label">{e(x['pair_p'])}</span></div>
    </div>
    <div class="panel p1610" id="plan-panel"><img src="assets/{pics['plan']}" alt=""></div>
  </section>

  <section id="sc5b" class="clip" {d(t['br'], t['s12'])}>
    <p class="bstep" id="b-step">{e(x['bridge_step'])}</p>
    <h2 class="btitle" id="b-title"><span class="bline">{e(x['bridge_title'])}</span><span class="bline gold" id="b-own">{e(x['bridge_title2'])}</span></h2>
    <svg class="links" viewBox="0 0 1920 1080">{bridge_links}</svg>
    <div class="bhub" id="b-hub"><img src="assets/fabric-icon.png" alt=""><span>Fabric</span></div>
    {bridge_marks}
  </section>

  <section id="sc6" class="clip" {d(t['s12'], t['s16'])}>
    {tool_sides}
    {tool_panels}
  </section>

  <section id="sc7" class="clip" {d(t['s16'], t['s17'])}>
    <p class="tstep" id="tog-step">{e(x['tog_step'])}</p>
    <h2 class="ttitle" id="tog-title">{e(x['tog_title'])}</h2>
    <svg class="links" viewBox="0 0 1920 1080">{link_svg}<path class="harrow" id="harrow" d="M790 862 L1130 862" pathLength="1"/></svg>
    {nodes}
    <div class="center" id="center"><div class="ccard"><img src="assets/{pics['board']}" alt=""><span class="sample">{e(x['sample'])}</span></div>
      <div class="clabel"><img src="assets/fabric-icon.png" alt=""><span>{e(x['center'])}</span>{chip(PREV[loc], 'pv')}</div>
      <div class="citems">{e(x['center_items'])}</div></div>
    <div class="agent" id="agentA" style="left:500px"><i></i>release-notes-agent</div>
    <div class="agent" id="agentB" style="left:1150px"><i></i>docs-sync-agent</div>
    <p class="hlabel" id="hlabel">{e(x['handoff'])}</p>
  </section>

  <section id="sc8" class="clip" {d(t['s17'], t['s18'])}>
    <p class="tstep" id="org-step">{e(x['org_step'])}</p>
    <h2 class="ttitle" id="org-title">{e(x['org_title'])}</h2>
    <div class="oprod" id="oprod"><span>{e(x['org_product'])}</span>{chip(x['org_chip'], 'dir')}</div>
    <svg class="links" viewBox="0 0 1920 1080">{mlinks}</svg>
    {machines}
    <div class="oright"><div class="orow" id="orow0"><div class="orow-k">{e(x['org_cols'][0])}</div><div class="obar" id="obar0"></div></div>
      <div class="orow" id="orow1"><div class="orow-k">{e(x['org_cols'][1])}</div><div class="obar m" id="obar1"></div></div>
      <p class="ofoot" id="ofoot">{e(x['org_foot'])}</p></div>
  </section>

  <section id="sc9" class="clip" {d(t['s18'], E)}>
    <div class="vis"><p id="v1">{words(x['v1'], 'vw')}</p><p class="gold" id="v2">{words(x['v2'], 'vw2')}</p></div>
  </section>

  <section id="sc10" class="clip" {d(E, T)}>
    <div class="endc"><img class="emark" id="emark" src="assets/passioncode-mark.svg" alt="">
      <p class="eurl" id="eurl">passioncode.ai</p><p class="esub" id="esub">{e(x['end_sub'])}</p></div>
  </section>

  <div id="bug"><img src="assets/passioncode-mark.svg" alt=""><span>passioncode.ai</span></div>
  <div id="rail"><div class="line"></div><div class="fill" id="rail-fill"></div>{ticks}{labels}</div>
</div>
<script>
  const T = {json.dumps(t)};
  const tl = gsap.timeline({{ paused: true }});
  const OUT = "expo.out", MOVE = "power3.inOut";
  const up = (sel, at, dy = 40, dur = 0.6) => tl.fromTo(sel, {{ opacity: 0, y: dy }}, {{ opacity: 1, y: 0, duration: dur, ease: OUT }}, at);
  const pop = (sel, at, dur = 0.55) => tl.fromTo(sel, {{ opacity: 0, scale: 0.95, y: 24 }}, {{ opacity: 1, scale: 1, y: 0, duration: dur, ease: OUT }}, at);
  const fade = (sel, at, dur = 0.3) => tl.to(sel, {{ opacity: 0, duration: dur, ease: "power2.out" }}, at);
  const wordsIn = (sel, at, stagger = 0.05, dy = 46) => tl.fromTo(sel, {{ opacity: 0, y: dy }}, {{ opacity: 1, y: 0, duration: 0.55, ease: OUT, stagger }}, at);

  // rail: one clock for the whole piece, and the chapter it is in
  tl.fromTo("#rail-fill", {{ scaleX: 0 }}, {{ scaleX: 1, duration: T.E, ease: "none" }}, 0);
  const CH = ["s0", "s5", "s6", "s8", "br", "s16", "s17", "s18"];
  CH.forEach((k, i) => {{
    const at = Math.max(0.05, T[k]);
    tl.fromTo(`#chap${{i}}`, {{ opacity: 0, y: 12 }}, {{ opacity: 1, y: 0, duration: 0.45, ease: OUT }}, at);
    const next = i + 1 < CH.length ? T[CH[i + 1]] : T.E;
    tl.to(`#chap${{i}}`, {{ opacity: 0, y: -10, duration: 0.25, ease: "power2.out" }}, next - 0.25);
  }});

  // 1. Problem
  wordsIn("#h1 .w", 0.1);
  wordsIn("#h2 .w2", T.s1, 0.06);
  pop("#sym0", T.s2); pop("#sym1", T.s3); pop("#sym2", T.s4);
  const fall = T.s4 + 1.75;
  [["#sym0", -9, 150], ["#sym1", 6, 190], ["#sym2", -13, 170]].forEach(([s, r, dy], i) =>
    tl.to(s, {{ rotation: r, y: dy, opacity: 0, duration: 0.75, ease: MOVE }}, fall + i * 0.09));
  tl.to("#h2", {{ y: 20, opacity: 0.0, duration: 0.5, ease: MOVE }}, T.s5 - 0.55);
  tl.to("#h1", {{ y: -30, opacity: 0.0, duration: 0.5, ease: MOVE }}, T.s5 - 0.5);

  // 2. Promise: the music's full groove lands here
  tl.fromTo("#pmark", {{ opacity: 0, scale: 0.92 }}, {{ opacity: 1, scale: 1, duration: 0.7, ease: OUT }}, T.s5);
  wordsIn("#ptitle .pw", T.s5 + 0.15, 0.07, 54);
  tl.fromTo("#pline", {{ scaleX: 0 }}, {{ scaleX: 1, duration: 0.8, ease: OUT }}, T.colon5 - 0.2);
  up("#psub", T.colon5, 24, 0.7);
  // redeploy: the mark goes to the corner and stays as the bug
  tl.to("#promise", {{ x: -820, y: -250, scale: 0.28, opacity: 0, duration: 0.6, ease: MOVE }}, T.s6 - 0.55);
  tl.fromTo("#bug", {{ opacity: 0, x: 16 }}, {{ opacity: 1, x: 0, duration: 0.5, ease: OUT }}, T.s6 - 0.15);
  tl.to("#bug", {{ opacity: 0, duration: 0.4, ease: "power2.out" }}, T.s18 - 0.4);

  // 3. Values: one tile per clause, the active one outlined
  const vt = [T.s6 + 0.05, T.s6 + 1.45, T.s6 + 2.45, T.s7];
  vt.forEach((at, i) => {{
    tl.fromTo(`#tile${{i}}`, {{ opacity: 0, y: 70, scale: 0.95 }}, {{ opacity: 1, y: 0, scale: 1, duration: 0.6, ease: OUT }}, at);
    tl.fromTo(`#tile${{i}} .hl`, {{ opacity: 0 }}, {{ opacity: 1, duration: 0.25, ease: "power1.out" }}, at + 0.1);
    if (i > 0) tl.to(`#tile${{i - 1}} .hl`, {{ opacity: 0, duration: 0.25, ease: "power1.out" }}, at + 0.1);
  }});
  tl.to([".tile"], {{ y: -50, opacity: 0, duration: 0.4, ease: MOVE, stagger: 0.05 }}, T.s8 - 0.5);

  // 4. Start: the command types itself, then what it does not need
  up("#st-side", T.s8 + 0.05, 30);
  tl.fromTo("#term", {{ opacity: 0, x: 120, rotationY: -10, transformPerspective: 1400 }}, {{ opacity: 1, x: 0, rotationY: 0, duration: 0.7, ease: OUT }}, T.s8 + 0.1);
  tl.fromTo("#term .ch", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.01, stagger: 0.032, ease: "none" }}, T.s8 + 0.7);
  const okAt = T.s8 + 0.7 + 46 * 0.032 + 0.2;
  [0, 1, 2].forEach(i => up(`#ok${{i}}`, okAt + i * 0.45, 16, 0.4));
  up("#term-note", okAt + 1.5, 12, 0.5);
  pop("#agentrun", T.colon8, 0.6);
  tl.to(["#term", "#st-side", "#term-note", "#agentrun"], {{ x: -120, opacity: 0, duration: 0.45, ease: MOVE }}, T.s10 - 0.5);

  // 5. Fabric, then the coding agent's plan (redeploy, not crossfade)
  up("#fab-side", T.s10 + 0.05, 30);
  tl.fromTo("#fab-panel", {{ opacity: 0, x: 160, rotationY: -12, scale: 0.96, transformPerspective: 1400 }}, {{ opacity: 1, x: 0, rotationY: 0, scale: 1, duration: 0.8, ease: OUT }}, T.s10 + 0.1);
  tl.fromTo("#boxA", {{ opacity: 0, scale: 0.96 }}, {{ opacity: 1, scale: 1, duration: 0.45, ease: OUT }}, T.s10 + 1.5);
  tl.fromTo("#boxP", {{ opacity: 0, scale: 0.96 }}, {{ opacity: 1, scale: 1, duration: 0.45, ease: OUT }}, T.s10 + 2.5);
  tl.to("#fab-panel", {{ x: -260, scale: 0.86, opacity: 0, duration: 0.6, ease: MOVE }}, T.s11 - 0.2);
  tl.to("#fab-side", {{ y: -40, opacity: 0, duration: 0.3, ease: "power2.out" }}, T.s11 - 0.25);
  tl.fromTo("#plan-panel", {{ opacity: 0, x: 220, scale: 1.04 }}, {{ opacity: 1, x: 0, scale: 1, duration: 0.7, ease: OUT }}, T.s11 - 0.05);
  up("#plan-side", T.s11 + 0.05, 30);
  tl.fromTo("#plan-panel img", {{ y: 0 }}, {{ y: -40, duration: T.br - T.s11 - 0.4, ease: "none" }}, T.s11);
  tl.to(["#plan-panel", "#plan-side"], {{ x: -160, opacity: 0, duration: 0.45, ease: MOVE }}, T.br - 0.45);

  // 5b. Bridge: every tool joins Fabric, then stands on its own
  up("#b-step", T.br + 0.05, 14); up("#b-title", T.br + 0.1, 24);
  tl.fromTo("#b-own", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.4, ease: OUT }}, T.br_own);
  pop("#b-hub", T.br + 0.15, 0.6);
  for (let i = 0; i < 4; i++) {{
    pop(`#bm${{i}}`, T.br + 0.35 + i * 0.1, 0.5);
    tl.fromTo(`#bl${{i}}`, {{ strokeDashoffset: 1 }}, {{ strokeDashoffset: 0, duration: 0.45, ease: OUT }}, T.br + 0.5 + i * 0.1);
    tl.to(`#bl${{i}}`, {{ opacity: 0, duration: 0.35, ease: "power2.out" }}, T.br_own);
    tl.to(`#bm${{i}}`, {{ x: i % 2 ? 80 : -80, y: i < 2 ? -30 : 30, duration: 0.6, ease: MOVE }}, T.br_own);
  }}
  tl.to(["#b-step", "#b-title", "#b-hub", ".bmark"], {{ opacity: 0, duration: 0.3, ease: "power2.out" }}, T.s12 - 0.35);

  // 6. Toolkit: one tool per sentence, a deck that deals itself
  const TT = [T.s12, T.s13, T.s14, T.s15, T.s16];
  for (let i = 0; i < 4; i++) {{
    const at = TT[i], next = TT[i + 1];
    tl.fromTo(`#tside${{i}}`, {{ opacity: 0, y: 36 }}, {{ opacity: 1, y: 0, duration: 0.55, ease: OUT }}, at + 0.05);
    tl.fromTo(`#tpanel${{i}}`, {{ opacity: 0, x: 200, rotationY: -10, scale: 0.97, transformPerspective: 1400 }}, {{ opacity: 1, x: 0, rotationY: 0, scale: 1, duration: 0.7, ease: OUT }}, at);
    tl.fromTo(`#tpanel${{i}} img`, {{ scale: 1 }}, {{ scale: 1.04, duration: next - at, ease: "none", transformOrigin: "30% 30%" }}, at);
    tl.to(`#tside${{i}}`, {{ y: -36, opacity: 0, duration: 0.3, ease: "power2.out" }}, next - 0.3);
    tl.to(`#tpanel${{i}}`, {{ x: -240, scale: 0.88, opacity: 0, duration: 0.55, ease: MOVE }}, next - 0.4);
  }}

  // 7. Together: how the tools fit around one project, and a hand-off
  up("#tog-step", T.s16 + 0.05, 16); up("#tog-title", T.s16 + 0.1, 24);
  pop("#center", T.s16 + 0.15, 0.65);
  for (let i = 0; i < 5; i++) {{
    pop(`#node${{i}}`, T.s16 + 0.5 + i * 0.12, 0.5);
    tl.fromTo(`#link${{i}}`, {{ strokeDashoffset: 1 }}, {{ strokeDashoffset: 0, duration: 0.5, ease: OUT }}, T.s16 + 0.75 + i * 0.12);
  }}
  up("#agentA", T.s16 + 1.6, 16, 0.45);
  tl.fromTo("#harrow", {{ strokeDashoffset: 1 }}, {{ strokeDashoffset: 0, duration: 0.7, ease: MOVE }}, T.handoff - 0.1);
  up("#hlabel", T.handoff, 12, 0.45);
  up("#agentB", T.handoff + 0.45, 16, 0.45);
  tl.to(["#tog-step", "#tog-title", "#center", ".node", ".agent", "#hlabel", "#sc7 svg"], {{ opacity: 0, duration: 0.35, ease: "power2.out" }}, T.s17 - 0.4);

  // 8. Organizations
  up("#org-step", T.s17 + 0.05, 16); up("#org-title", T.s17 + 0.1, 24);
  for (let i = 0; i < 6; i++) pop(`#mach${{i}}`, T.s17 + 0.4 + i * 0.09, 0.5);
  for (let k = 0; k < 7; k++) tl.fromTo(`#mlink${{k}}`, {{ strokeDashoffset: 1 }}, {{ strokeDashoffset: 0, duration: 0.45, ease: OUT }}, T.s17 + 2.4 + k * 0.08);
  up("#orow0", T.show, 24); tl.fromTo("#obar0", {{ scaleX: 0 }}, {{ scaleX: 1, duration: 0.8, ease: OUT }}, T.show + 0.15);
  up("#orow1", T.show + 1.1, 24); tl.fromTo("#obar1", {{ scaleX: 0 }}, {{ scaleX: 1, duration: 0.8, ease: OUT }}, T.show + 1.25);
  up("#ofoot", T.show + 2.1, 16);
  up("#oprod", T.s17 + 1.0, 16);
  tl.to(["#org-step", "#org-title", "#oprod", ".mach", ".oright", "#sc8 svg"], {{ opacity: 0, duration: 0.35, ease: "power2.out" }}, T.s18 - 0.4);

  // 9. Vision
  wordsIn("#v1 .vw", T.s18 + 0.05, 0.06);
  wordsIn("#v2 .vw2", T.s19 + 0.05, 0.06);
  tl.to(".vis", {{ y: -40, opacity: 0, duration: 0.4, ease: MOVE }}, T.E - 0.4);

  // 10. End card on the music's final hit
  tl.fromTo("#emark", {{ opacity: 0, scale: 0.9 }}, {{ opacity: 1, scale: 1, duration: 0.8, ease: OUT }}, T.E);
  up("#eurl", T.E + 0.2, 30, 0.7); up("#esub", T.E + 0.45, 16, 0.6);
  window.__timelines["main"] = tl;
</script>
</body>
</html>
"""
    (out / "index.html").write_text(doc, encoding="utf-8")
    return dict(locale=loc, T=T, E=E, vo_end=vo_end, X=X, music_a=a, music_b=round(b, 3), cues=t)


if __name__ == "__main__":
    print(json.dumps(build(sys.argv[1], Path(sys.argv[2])), indent=1))
