#!/usr/bin/env python3
"""Build the HyperFrames composition for the passioncode.ai home video (SITE-028 W10), per locale.

Usage: SITE_ASSETS=... FONTS_DIR=... GSAP_JS=... NARRATION_DIR=... gen.py LOCALE OUT_DIR
Inputs: the site's own sample-data mockups (assets/), the narration WAV delivered by our media
pipeline (NARRATION_DIR/narration-<locale>/...-v1.wav), Inter (OFL: Inter-Medium.ttf,
InterDisplay-Bold.ttf, Inter-OFL.txt in FONTS_DIR) and GSAP 3.14.2 (GSAP_JS). No network at render
time. Scene cuts sit on the narration's measured sentence starts (ffmpeg silencedetect, -40 dB / 0.25 s
and -34 dB / 0.12 s for clause breaks). The zipped OUT_DIR is what the media pipeline renders.
"""
import html, json, shutil, sys
from pathlib import Path

import os
SITE = Path(os.environ.get("SITE_ASSETS", Path(__file__).resolve().parents[4] / "assets"))
FONTS = Path(os.environ["FONTS_DIR"])
GSAP = Path(os.environ["GSAP_JS"])
VO = Path(os.environ["NARRATION_DIR"])

# Sentence starts in the delivered narration, seconds.
T = {
    "en": dict(c1=2.4, c2=5.5, c3=7.9, s3=8.95, s4=13.12, s5=17.74, s6=24.22, s7=28.54, s8=31.18,
               obs=34.08, s9=36.62, s10=38.84, vo=42.24, end=44.6),
    "ru": dict(c1=3.6, c2=5.4, c3=6.9, s3=9.69, s4=14.23, s5=19.54, s6=26.22, s7=31.11, s8=33.89,
               obs=36.76, s9=39.91, s10=42.45, vo=46.48, end=48.8),
}

TXT = {
    "en": dict(
        lead="Your agent works for a week.",
        fail=["On the wrong account", "Forgets what it learned", "Nobody can say what it changed"],
        needs="To keep working, an agent needs",
        tiles=[("A home", "Fabric"), ("Its accounts", "Switchboard"),
               ("Its memory", "a Fabric project"), ("A record of what it did", "Observatory and the board")],
        s3_step="02 · Onboard", s3_title="Fabric", s3_sub="The home for your projects and their agents",
        pair_a="Agent: create or adapt", pair_p="Project: open or create",
        s4_step="03 · First agent", s4_title="The plan comes first",
        s4_sub="Your coding agent asks its questions and shows its plan before it changes anything.",
        s4_note="A written example, not a recording.",
        s5_step="04 · Grow", s5_title="One window",
        s5_sub="Each agent on the account it should, with its dashboard and spend.",
        s6_step="05 · Work together and watch", s6_title="What changed",
        s6_sub="Observatory shows what changed, with the evidence.",
        today="Available today", direction="Coordination between agents",
        sample="Sample data",
        available="AVAILABLE NOW", preview="PREVIEW", dir_label="DIRECTION",
    ),
    "ru": dict(
        lead="Вы настроили агента, и неделю он работает.",
        fail=["Не на том аккаунте", "Забывает, чему научился", "Никто не скажет, что он поменял"],
        needs="Чтобы работать дальше, агенту нужны",
        tiles=[("Дом", "Fabric"), ("Аккаунты", "Switchboard"),
               ("Память", "проект Fabric"), ("Запись того, что он сделал", "Observatory и доска задач")],
        s3_step="02 · Первый запуск", s3_title="Fabric", s3_sub="Дом для ваших проектов и их агентов",
        pair_a="Агент: создать или адаптировать", pair_p="Проект: открыть или создать",
        s4_step="03 · Первый агент", s4_title="Сначала план",
        s4_sub="Агент для программирования задаёт вопросы и показывает план, прежде чем что-то менять.",
        s4_note="Написанный пример, а не запись сеанса.",
        s5_step="04 · Больше агентов", s5_title="Одно окно",
        s5_sub="Каждый агент на нужном аккаунте, его панель и расходы рядом.",
        s6_step="05 · Вместе и на виду", s6_title="Что изменилось",
        s6_sub="Observatory показывает, что изменилось, с подтверждениями.",
        today="Доступно уже сейчас", direction="Координация между агентами",
        sample="Пример данных",
        available="ДОСТУПНО СЕЙЧАС", preview="ПРЕДВАРИТЕЛЬНАЯ ВЕРСИЯ", dir_label="НАПРАВЛЕНИЕ",
    ),
}


def img(name: str, loc: str) -> str:
    """The Russian twin when it exists, as the site's localizedAsset does."""
    stem, ext = name.rsplit(".", 1)
    if loc == "ru" and (SITE / f"{stem}-ru.{ext}").exists():
        return f"{stem}-ru.{ext}"
    return name


def build(loc: str, out: Path) -> None:
    t, x = T[loc], TXT[loc]
    e = lambda s: html.escape(s, quote=True)
    out.mkdir(parents=True, exist_ok=True)
    (out / "assets").mkdir(exist_ok=True)
    pics = {k: img(v, loc) for k, v in dict(
        fabric="journey-2-2.jpg", plan="journey-3-4.jpg", dash="dashboards-overview.jpg",
        obs="observatory-overview.jpg", inbox="inbox-overview.jpg", sb="switchboard-accounts.jpg").items()}
    for f in set(pics.values()) | {"passioncode-mark.svg"}:
        shutil.copy2(SITE / f, out / "assets" / f)
        if f.endswith(".jpg"):
            # The panel is 1280 CSS px at 1x: a 1280-px copy decodes faster and looks the same.
            import subprocess
            subprocess.run(["sips", "-Z", "1280", str(out / "assets" / f)], check=True, capture_output=True)
    shutil.copy2(FONTS / "Inter-Medium.ttf", out / "assets/Inter-Medium.ttf")
    shutil.copy2(FONTS / "InterDisplay-Bold.ttf", out / "assets/InterDisplay-Bold.ttf")
    shutil.copy2(FONTS / "Inter-OFL.txt", out / "assets/Inter-OFL.txt")
    shutil.copy2(GSAP, out / "gsap.min.js")
    # The delivered WAV stays the master; the composition carries a 192 kbps MP3 of it, because the
    # render check inlines assets only up to 2 MB and a 4 MB WAV kept the page from becoming ready.
    import subprocess
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i",
                    str(VO / f"narration-{loc}/passioncode-site-home-video-narration-{loc}-v1.wav"),
                    "-c:a", "libmp3lame", "-b:a", "192k", "-ac", "1", "-ar", "48000", str(out / "assets/narration.mp3")], check=True)

    end = t["end"]
    d = lambda a, b: f'data-start="{a:.2f}" data-duration="{b - a:.2f}"'
    chip = lambda label, cls="": f'<span class="chip {cls}">{e(label)}</span>'

    tiles = "".join(
        f'<div class="tile" id="tile{i}"><div class="tile-k">{e(k)}</div><div class="tile-v">{e(v)}</div></div>'
        for i, (k, v) in enumerate(x["tiles"]))
    fails = "".join(f'<li class="fail" id="fail{i}">{e(s)}</li>' for i, s in enumerate(x["fail"]))
    tools = [("Switchboard", pics["sb"], x["available"], ""), ("Fabric Dashboards", pics["dash"], x["available"], ""),
             ("Project Observatory", pics["obs"], x["available"], ""), ("Fabric", pics["fabric"], x["preview"], "pv"),
             ("Fabric Inbox", pics["inbox"], x["preview"], "pv")]
    cards = "".join(
        f'<div class="tool" id="tool{i}"><div class="thumb"><img src="assets/{p}" alt=""></div>'
        f'<div class="tool-name">{e(n)}</div>{chip(lab, c)}</div>' for i, (n, p, lab, c) in enumerate(tools))

    def side(prefix, step, title, sub, label, cls="", note=""):
        n = f'<p class="note" id="{prefix}-note">{e(note)}</p>' if note else ""
        return (f'<div class="side"><p class="step" id="{prefix}-step">{e(step)}</p>'
                f'<h2 class="title" id="{prefix}-title">{e(title)}</h2>'
                f'<p class="sub" id="{prefix}-sub">{e(sub)}</p><div id="{prefix}-chip">{chip(label, cls)}</div>{n}</div>')

    doc = f"""<!doctype html>
<html lang="{loc}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1920, height=1080">
<title>passioncode.ai home video ({loc})</title>
<script src="./gsap.min.js"></script>
<style>
@font-face {{ font-family: "Inter"; src: url("assets/Inter-Medium.ttf") format("truetype"); font-weight: 400 600; }}
@font-face {{ font-family: "Inter"; src: url("assets/InterDisplay-Bold.ttf") format("truetype"); font-weight: 700 800; }}
:root {{ --bg:#0a070d; --panel:#110c15; --raised:#1b1420; --ink:#fff9f0; --muted:#b6aabc; --gold:#ffd21a;
        --magenta:#f20673; --plum:#41054b; --line:rgba(255,255,255,.12); --line-strong:rgba(255,255,255,.2); }}
* {{ margin:0; padding:0; box-sizing:border-box; }}
html, body {{ width:1920px; height:1080px; overflow:hidden; background:var(--bg); color:var(--ink);
             font-family:"Inter", sans-serif; font-weight:400; -webkit-font-smoothing:antialiased; }}
#root {{ position:relative; width:100%; height:100%; overflow:hidden;
         background:var(--bg); }}
.clip {{ position:absolute; inset:0; }}
.center {{ display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }}
.lead {{ font-weight:700; font-size:76px; letter-spacing:-.02em; line-height:1.08; max-width:1500px; }}
.fails {{ list-style:none; margin-top:56px; display:flex; flex-direction:column; gap:20px; align-items:center; }}
.fail {{ display:block; font-size:44px; color:var(--muted); padding:10px 28px; border:1px solid var(--line-strong);
         border-radius:999px; background:var(--panel); }}
.needs {{ font-weight:700; font-size:60px; letter-spacing:-.015em; margin-bottom:64px; }}
.tiles {{ display:flex; gap:28px; }}
.tile {{ width:400px; min-height:220px; padding:36px 32px; border:1px solid var(--line-strong); border-radius:24px;
         background:var(--panel); text-align:left; display:flex; flex-direction:column; justify-content:space-between; }}
.tile-k {{ font-weight:700; font-size:40px; line-height:1.15; }}
.tile-v {{ font-size:24px; color:var(--gold); margin-top:24px; }}
.side {{ position:absolute; left:96px; top:0; bottom:0; width:404px; display:flex; flex-direction:column; justify-content:center; }}
.step {{ font-size:22px; color:var(--gold); letter-spacing:.04em; margin-bottom:22px; }}
.title {{ font-weight:700; font-size:64px; line-height:1.05; letter-spacing:-.02em; margin-bottom:24px; }}
.sub {{ font-size:28px; line-height:1.35; color:var(--muted); margin-bottom:32px; }}
.note {{ font-size:20px; color:var(--muted); margin-top:24px; font-style:italic; }}
.chip {{ display:inline-block; font-weight:700; font-size:18px; letter-spacing:.08em; padding:9px 16px; border-radius:999px;
         color:#1a1300; background:var(--gold); }}
.chip.pv {{ color:var(--ink); background:transparent; border:1.5px solid var(--magenta); }}
.chip.dir {{ color:var(--ink); background:transparent; border:1.5px dashed var(--muted); }}
.panel {{ position:absolute; left:560px; width:1280px; border-radius:18px; overflow:hidden; border:1px solid var(--line-strong);
          box-shadow:0 40px 120px rgba(0,0,0,.55), 0 0 0 1px rgba(242,6,115,.08); background:var(--panel); }}
.panel img {{ display:block; width:100%; height:100%; object-fit:cover; }}
.p1610 {{ top:140px; height:800px; }}
.pdash {{ top:202px; height:675px; }}
.sample {{ position:absolute; right:22px; bottom:22px; font-weight:700; font-size:22px; padding:8px 18px; border-radius:999px;
           background:#ffe680; color:#1a1300; border:2px solid #e7b400; }}
.box {{ position:absolute; border:3px solid var(--gold); border-radius:16px; box-shadow:0 0 0 9999px rgba(10,7,13,.0); }}
.box-label {{ position:absolute; top:-44px; left:0; white-space:nowrap; font-weight:700; font-size:18px; color:#1a1300;
              background:var(--gold); padding:7px 14px; border-radius:10px; }}
.today {{ position:absolute; top:150px; left:0; right:0; text-align:center; font-weight:700; font-size:60px; letter-spacing:-.015em; }}
.tools {{ position:absolute; top:300px; left:92px; display:flex; gap:24px; }}
.tool {{ width:328px; }}
.thumb {{ width:328px; height:205px; border-radius:12px; overflow:hidden; border:1px solid var(--line-strong); background:var(--panel); margin-bottom:18px; }}
.thumb img {{ width:100%; height:100%; object-fit:cover; object-position:left top; display:block; }}
.tool-name {{ font-weight:700; font-size:28px; margin-bottom:14px; }}
.dir-row {{ position:absolute; top:780px; left:0; right:0; display:flex; gap:28px; align-items:center; justify-content:center; }}
.dir-text {{ font-weight:700; font-size:52px; letter-spacing:-.015em; }}
.mark {{ width:132px; height:132px; margin-bottom:36px; }}
.url {{ font-weight:700; font-size:72px; letter-spacing:-.02em; }}
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-width="1920" data-height="1080" data-duration="{end:.2f}">
  <audio id="vo" src="assets/narration.mp3" data-start="0" data-duration="{t['vo']:.2f}" data-volume="1"></audio>

  <section id="sc1" class="clip center" {d(0, t['s3'])}>
    <h1 class="lead" id="lead">{e(x['lead'])}</h1>
    <ul class="fails">{fails}</ul>
  </section>

  <section id="sc2" class="clip center" {d(t['s3'], t['s4'])}>
    <p class="needs" id="needs">{e(x['needs'])}</p>
    <div class="tiles">{tiles}</div>
  </section>

  <section id="sc3" class="clip" {d(t['s4'], t['s6'])}>
    {side('s3', x['s3_step'], x['s3_title'], x['s3_sub'], x['preview'], 'pv')}
    <div class="panel p1610" id="s3-panel"><img id="s3-img" src="assets/{pics['fabric']}" alt="">
      <div class="box" id="boxA" style="left:299px; top:312px; width:422px; height:256px"><span class="box-label">{e(x['pair_a'])}</span></div>
      <div class="box" id="boxP" style="left:719px; top:312px; width:422px; height:256px"><span class="box-label">{e(x['pair_p'])}</span></div>
    </div>
  </section>

  <section id="sc4" class="clip" {d(t['s6'], t['s7'])}>
    {side('s4', x['s4_step'], x['s4_title'], x['s4_sub'], x['available'], '', x['s4_note'])}
    <div class="panel p1610" id="s4-panel"><img id="s4-img" src="assets/{pics['plan']}" alt=""></div>
  </section>

  <section id="sc5" class="clip" {d(t['s7'], t['obs'])}>
    {side('s5', x['s5_step'], x['s5_title'], x['s5_sub'], x['available'])}
    <div class="panel pdash" id="s5-panel"><img id="s5-img" src="assets/{pics['dash']}" alt=""><span class="sample">{e(x['sample'])}</span></div>
  </section>

  <section id="sc6" class="clip" {d(t['obs'], t['s9'])}>
    {side('s6', x['s6_step'], x['s6_title'], x['s6_sub'], x['available'])}
    <div class="panel p1610" id="s6-panel"><img id="s6-img" src="assets/{pics['obs']}" alt=""></div>
  </section>

  <section id="sc7" class="clip" {d(t['s9'], t['vo'] + 0.3)}>
    <p class="today" id="today">{e(x['today'])}</p>
    <div class="tools" id="tools">{cards}</div>
    <div class="dir-row" id="dir-row"><span class="dir-text">{e(x['direction'])}</span>{chip(x['dir_label'], 'dir')}</div>
  </section>

  <section id="sc8" class="clip center" {d(t['vo'] + 0.3, end)}>
    <img class="mark" id="mark" src="assets/passioncode-mark.svg" alt="">
    <p class="url" id="url">passioncode.ai</p>
  </section>
</div>
<script>
  const T = {json.dumps(t)};
  const tl = gsap.timeline({{ paused: true }});
  const IN = {{ opacity: 1, y: 0, duration: 0.56, ease: "power3.out" }};
  const up = (sel, at, dy = 24) => tl.fromTo(sel, {{ opacity: 0, y: dy }}, {{ ...IN }}, at);
  const out = (sel, at) => tl.to(sel, {{ opacity: 0, duration: 0.3, ease: "power1.out" }}, at);
  // 1. The problem, clause by clause.
  up("#lead", 0.15);
  up("#fail0", T.c1); up("#fail1", T.c2); up("#fail2", T.c3);
  out(["#lead", ".fails"], T.s3 - 0.32);
  // 2. What keeps an agent working.
  up("#needs", T.s3 + 0.05);
  ["#tile0", "#tile1", "#tile2", "#tile3"].forEach((s, i) => up(s, T.s3 + 0.35 + i * 0.6, 32));
  out(["#needs", "#tile0", "#tile1", "#tile2", "#tile3"], T.s4 - 0.32);
  // 3-6. One mockup per beat: hold, then redeploy.
  const beat = (p, start, stop, still) => {{
    up(`#${{p}}-step`, start + 0.05, 16); up(`#${{p}}-title`, start + 0.15); up(`#${{p}}-sub`, start + 0.3);
    up(`#${{p}}-chip`, start + 0.45, 12);
    if (document.getElementById(`${{p}}-note`)) up(`#${{p}}-note`, start + 0.7, 12);
    tl.fromTo(`#${{p}}-panel`, {{ opacity: 0, x: 64 }}, {{ opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }}, start + 0.1);
    if (!still) tl.fromTo(`#${{p}}-img`, {{ scale: 1 }}, {{ scale: 1.035, duration: stop - start - 0.4, ease: "none", transformOrigin: "50% 40%" }}, start + 0.1);
    tl.to([`#${{p}}-panel`, `#${{p}}-step`, `#${{p}}-title`, `#${{p}}-sub`, `#${{p}}-chip`], {{ opacity: 0, duration: 0.28, ease: "power1.out" }}, stop - 0.3);
  }};
  beat("s3", T.s4, T.s6, true);
  tl.fromTo("#boxA", {{ opacity: 0, scale: 0.97 }}, {{ opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }}, T.s5 + 0.9);
  tl.fromTo("#boxP", {{ opacity: 0, scale: 0.97 }}, {{ opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }}, T.s5 + 3.3);
  beat("s4", T.s6, T.s7);
  beat("s5", T.s7, T.obs);
  beat("s6", T.obs, T.s9);
  // 7. The tools today, then the direction.
  up("#today", T.s9 + 0.05);
  [0, 1, 2, 3, 4].forEach(i => up(`#tool${{i}}`, T.s9 + 0.2 + i * 0.12, 28));
  tl.to("#tools", {{ opacity: 0.45, duration: 0.4, ease: "power1.out" }}, T.s10);
  up("#dir-row", T.s10 + 0.1);
  out(["#today", "#tools", "#dir-row"], T.vo);
  // 8. End card.
  up("#mark", T.vo + 0.4, 16); up("#url", T.vo + 0.6, 16);
  window.__timelines["main"] = tl;
</script>
</body>
</html>
"""
    (out / "index.html").write_text(doc, encoding="utf-8")


if __name__ == "__main__":
    build(sys.argv[1], Path(sys.argv[2]))
