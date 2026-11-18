#!/usr/bin/env python3
"""SITE-068 v4: the comic in the site's ten languages (the operator, 2026-11-18: «сделать на топ 10 языках [...] по
мете [...] отдельно»; meta tags stay English for now). Reads story/comic/index.html after scripts/comic-markup.py,
collects every en/ru pair, translates the English with the Russian as context into de, es, fr, ja, ko, pl, pt-BR and
zh-Hans (one model call per language, cached in story/comic/i18n/<lang>.json, a string already translated is never
sent again), writes the spans beside en and ru, the visibility rules, and the language menu.

Run: python3 "$(project-observatory full-path)/tools/use_secret.py" run --vault-only --env prod \
       passioncode-ai.github.io OPENROUTER_API_KEY -- python3 scripts/comic-i18n.py"""
import html, json, os, pathlib, re, time, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGE = ROOT / 'story' / 'comic' / 'index.html'
CAT = ROOT / 'story' / 'comic' / 'i18n'
LANGS = {'de': 'German', 'es': 'Spanish', 'fr': 'French', 'ja': 'Japanese', 'ko': 'Korean', 'pl': 'Polish',
         'pt-BR': 'Brazilian Portuguese', 'zh-Hans': 'Simplified Chinese'}
ALL = ['en', 'ru', *LANGS]
LABEL = {'en': 'English', 'ru': 'Русский', 'de': 'Deutsch', 'es': 'Español', 'fr': 'Français', 'ja': '日本語', 'ko': '한국어',
         'pl': 'Polski', 'pt-BR': 'Português', 'zh-Hans': '简体中文'}
PAIR = re.compile(r'<span lang="en">((?:(?!</span>).)*)</span><span lang="ru">((?:(?!</span>).)*)</span>', re.S)
MODEL = 'moonshotai/kimi-k3.1-pro'
RULES = ('You translate the copy of a web landing for PassionCode.ai. Keep the meaning, the calm confident voice and '
         'the brevity; product and character names stay as they are (Morpheus, Trinity, Neo, Smith, the Architect, '
         'Fabric, Switchboard, Inbox, Dashboards, Observatory, Claude Code, Codex, Telegram, Slack, Discord, P&L, A/B, '
         'SEO, CEO, PM, DevOps); numbers stay. Never use an em dash. Keep inline HTML tags exactly. Answer only JSON: '
         'an object from each given English string to its translation.')

def ask(lang_name, items):
    body = {'model': MODEL, 'max_tokens': 16000, 'reasoning': {'max_tokens': 2000},
            'messages': [{'role': 'system', 'content': RULES},
                         {'role': 'user', 'content': f'Target language: {lang_name}. Each item is [English, Russian for context].\n'
                                                     + json.dumps(items, ensure_ascii=False)}]}
    req = urllib.request.Request('https://openrouter.ai/api/v1/chat/completions', data=json.dumps(body).encode(), headers={
        'Authorization': 'Bearer ' + os.environ['OPENROUTER_API_KEY'], 'Content-Type': 'application/json', 'X-Title': 'SITE-068 i18n'})
    for attempt in range(3):
        try:
            out = json.loads(urllib.request.urlopen(req, timeout=600).read())
            text = out['choices'][0]['message']['content'] or ''
            return json.loads(text[text.index('{'):text.rindex('}') + 1])
        except Exception as e:  # retried twice, then the run stops with the language named
            err = e; time.sleep(5 * (attempt + 1))
    raise SystemExit(f'comic-i18n: {lang_name} failed: {err}')

def typeset(code, text):
    # Copylot typography-intl: French takes a no-break space before a colon and a narrow one before ; ! ? (fr-space-colon,
    # fr-space-high); applied to text only, never inside a tag.
    if code != 'fr':
        return text
    parts = re.split(r'(<[^>]+>)', text)
    for i in range(0, len(parts), 2):
        parts[i] = re.sub(r'[ \u00a0\u202f]*([;!?])', '\u202f\\1', parts[i])
        parts[i] = re.sub(r'(?<=\S)[ \u00a0\u202f]*:(?=\s|$)', '\u00a0:', parts[i])
    return ''.join(parts)

def main():
    page = PAGE.read_text()
    pairs = list(dict.fromkeys(PAIR.findall(page)))
    CAT.mkdir(parents=True, exist_ok=True)
    cats = {}
    for code, name in LANGS.items():
        f = CAT / f'{code}.json'
        cat = json.loads(f.read_text()) if f.exists() else {}
        todo = [[en, ru] for en, ru in pairs if en not in cat]
        for i in range(0, len(todo), 80):  # batches small enough to come back whole
            got = ask(name, todo[i:i + 80])
            cat.update({k: v for k, v in got.items() if isinstance(v, str) and v.strip()})
        missing = [en for en, _ in pairs if en not in cat]
        if missing:
            raise SystemExit(f'comic-i18n: {code} lacks {len(missing)} strings, e.g. {missing[:2]}')
        f.write_text(json.dumps(cat, ensure_ascii=False, indent=1) + '\n')
        cats[code] = cat
        print(f'{code}: {len(cat)} strings', flush=True)
    dash = '—'
    def spans(m):
        en, ru = m.group(1), m.group(2)
        extra = ''.join(f'<span lang="{c}">{typeset(c, cats[c][en].replace(dash, ","))}</span>' for c in LANGS)
        return m.group(0) + extra
    page = PAIR.sub(spans, page)
    # Russian and English are the first two buttons, on the first screen before the story (the operator, 2026-11-18,
    # v5: «сверху видно переключить язык ... до того, как началась история»); the other eight sit in a menu beside them.
    menu = ('<span class="lang-switch" role="group" aria-label="Language">'
            '<button class="lang" type="button" data-set-lang="en" aria-pressed="false">EN</button>'
            '<button class="lang" type="button" data-set-lang="ru" aria-pressed="false">RU</button>'
            '<select class="lang-menu" id="lang-menu" aria-label="Language">'
            '<option value="" disabled>\u2026</option>'
            + ''.join(f'<option value="{c}">{LABEL[c]}</option>' for c in ALL if c not in ('en', 'ru')) + '</select></span>')
    page = re.sub(r'<button class="lang" type="button" data-set-lang="en"[^>]*>EN</button>\s*<button class="lang" type="button" data-set-lang="ru"[^>]*>RU</button>', menu, page)
    rules = ''.join(f'html:not([data-lang="{c}"]) [lang="{c}"]{{display:none!important}}' for c in ALL)
    page = page.replace('</head>', f'<style id="i18n-rules">{rules}.lang-switch{{display:inline-flex;gap:6px;align-items:center}}.lang-switch .lang[aria-pressed=true]{{border-color:var(--pc-accent);background:var(--pc-accent);color:#001a09}}@media (max-width:480px){{.lang-switch{{gap:4px}}.lang-switch .lang{{padding-inline:7px}}.lang-menu{{width:46px;max-width:46px;min-width:0;padding:4px 6px}}}}.lang-menu{{max-width:120px;background:#020604;color:var(--pc-text);border:1px solid var(--pc-border-strong);border-radius:999px;padding:4px 8px;font:600 12px var(--pc-font)}}</style>\n</head>', 1)
    PAGE.write_text(page)
    print('comic-i18n: pairs', len(pairs), 'languages', len(ALL))

if __name__ == '__main__':
    main()
