#!/usr/bin/env python3
"""SITE-068, brief §5.1 and §5.2 (fabric-workspace docs/scenarios/2026-11-18-humanless-matrix-story/brief.md):
three creators of different model families each write a packaging scenario of the brief as an interactive comic
landing; a panel of judges scores every scenario on attention, product reveal, expected conversion and feasibility.

Run: python3 "$(project-observatory full-path)/tools/use_secret.py" run --vault-only --env prod \
       passioncode-ai.github.io OPENROUTER_API_KEY -- python3 scripts/story-scenarios.py BRIEF.md OUT_DIR
Writes OUT_DIR/<id>.md per scenario and OUT_DIR/verdicts.json; prints the cost each call reported."""
import json, os, pathlib, sys, time, urllib.request

URL = 'https://openrouter.ai/api/v1/chat/completions'
CREATORS = [  # wiki synthesis/llm-models.md: planning on Kimi, data and video on Gemini, Anthropic for the third view
    ('A-kimi', 'moonshotai/kimi-k3.1-pro', 'кинематографичный комикс: крупные планы, паузы, драматургия как в графическом романе'),
    ('B-gemini', 'google/gemini-3.1-pro-preview', 'игровая интерактивность: читатель действует, выбирает, нажимает, история отвечает на его действия'),
    ('C-opus', 'anthropic/claude-opus-5.5', 'ясная схема и доказательства: каждая сцена показывает механику и цифру, комикс служит объяснению'),
]
JUDGES = ['moonshotai/kimi-k3.1-pro', 'google/gemini-4-argon', 'anthropic/claude-opus-5.5']
CRITERIA = ['attention', 'product_reveal', 'conversion', 'feasibility']

def ask(model, system, user, max_tokens=16000):
    body = {'model': model, 'max_tokens': max_tokens, 'messages': [{'role': 'system', 'content': system}, {'role': 'user', 'content': user}],
            'usage': {'include': True}, 'reasoning': {'max_tokens': 3000}}  # a thinking model keeps room for the answer
    req = urllib.request.Request(URL, data=json.dumps(body).encode(), headers={
        'Authorization': 'Bearer ' + os.environ['OPENROUTER_API_KEY'], 'Content-Type': 'application/json',
        'HTTP-Referer': 'https://passioncode.ai', 'X-Title': 'SITE-068 story scenarios'})
    for attempt in range(3):
        try:
            out = json.loads(urllib.request.urlopen(req, timeout=600).read())
            text = out['choices'][0]['message'].get('content')
            if not text or not text.strip():
                raise ValueError(f"empty answer (finish_reason {out['choices'][0].get('finish_reason')})")
            return text, (out.get('usage') or {}).get('cost')
        except Exception as e:  # a transient provider failure is retried twice, then reported
            err = e; time.sleep(5 * (attempt + 1))
    raise SystemExit(f'story-scenarios: {model} failed: {err}')

SYSTEM_CREATOR = (
    'Ты креативный директор и сценарист интерактивных лендингов. Пиши по-русски, без длинных тире (используй точку, '
    'запятую, двоеточие или скобки). Не цитируй фильм «Матрица», не описывай внешность актёров.')
PROMPT_CREATOR = '''Ниже ТЗ оператора. Напиши ОДИН полный сценарий упаковки этого ТЗ в интерактивный лендинг-комикс на
весь экран, который читатель проходит скроллом. Твой угол: {angle}.

Обязательно:
1. Название сценария и идея в двух предложениях.
2. Покадровый сценарий по всем актам ТЗ (0-10): для каждого кадра таблица или список: что на экране, кто говорит и
   какую реплику (реплики в баллонах у персонажей, бокового чата нет), микроанимации, что делает скролл (scrub, пин,
   переход), звук, где включается настоящее видео.
3. Переходы между актами и чем они держат внимание.
4. Онбординг в конце: как именно читатель за один шаг добавляет Морфеуса в чат (Telegram, Slack, Discord), QR, запасной путь.
5. Мобильная версия и reduced motion.
6. Почему этот сценарий даст лучшую конверсию и где его риски.
7. Список ассетов (кадры комикса, видео, моушен, звуки, голоса) с количеством.

ТЗ:
{brief}'''
SYSTEM_JUDGE = 'Ты строгий продюсер интерактивных лендингов и аналитик конверсии. Отвечай только JSON.'
PROMPT_JUDGE = '''Оцени сценарий лендинга по ТЗ. Верни JSON: {{"attention":1-10,"product_reveal":1-10,"conversion":1-10,
"feasibility":1-10,"strengths":["..."],"weaknesses":["..."],"must_fix":["..."]}}. Строго, без лести.

ТЗ (кратко): полноэкранный комикс в стиле Матрицы, Морфеус и две таблетки, история компании, матрица из кубиков,
цикл маркетинга через дата-рум, отделы, A/B-тест, P&L, финал с выбором и онбордингом Морфеуса в чат одной кнопкой.

Сценарий:
{scenario}'''

def main():
    brief = pathlib.Path(sys.argv[1]).read_text()
    out = pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
    costs, scen = [], {}
    for sid, model, angle in CREATORS:
        text, cost = ask(model, SYSTEM_CREATOR, PROMPT_CREATOR.format(angle=angle, brief=brief))
        scen[sid] = text; costs.append((sid, model, cost))
        (out / f'{sid}.md').write_text(f'<!-- creator: {model}; angle: {angle} -->\n\n{text}\n')
        print(f'{sid} {model} cost={cost} chars={len(text)}', flush=True)
    verdicts = {}
    for sid, text in scen.items():
        verdicts[sid] = {}
        for judge in JUDGES:
            raw, cost = ask(judge, SYSTEM_JUDGE, PROMPT_JUDGE.format(scenario=text), max_tokens=6000)
            costs.append((sid, judge, cost))
            try:
                v = json.loads(raw[raw.index('{'):raw.rindex('}') + 1])
            except ValueError:
                v = {'unparsed': raw[:2000]}
            v['own'] = judge == dict((c[0], c[1]) for c in CREATORS)[sid]
            verdicts[sid][judge] = v
            print(f'judge {judge} -> {sid}: ' + ' '.join(f'{k}={v.get(k)}' for k in CRITERIA), flush=True)
    # The score leaves out a judge scoring its own family's scenario (a pick is validated by another model).
    summary = {}
    for sid, by in verdicts.items():
        fair = [v for v in by.values() if not v.get('own') and all(isinstance(v.get(k), (int, float)) for k in CRITERIA)]
        summary[sid] = round(sum(sum(v[k] for k in CRITERIA) for v in fair) / max(1, len(fair)), 2)
    json.dump({'verdicts': verdicts, 'summary': summary, 'costs': costs}, open(out / 'verdicts.json', 'w'), ensure_ascii=False, indent=2)
    print('summary', summary, 'total_cost', round(sum(c[2] or 0 for c in costs), 4))

if __name__ == '__main__':
    main()
