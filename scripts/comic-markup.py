#!/usr/bin/env python3
"""SITE-068 v4, the comic (the operator, 2026-11-18: «весь стори-тейлинг показать в виде комикса [...] последовательно.
Один произошел, второй стрелочкой туда [...] чат сбоку [...] убирай»; brief: fabric-workspace
docs/scenarios/2026-11-18-humanless-matrix-story/brief.md). Writes story/comic/index.html from the header of
story/index.html (kept as the operator liked it) and the panels below. Usage: python3 scripts/comic-markup.py"""
import json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / 'story' / 'index.html', ROOT / 'story' / 'comic' / 'index.html'
NBSP_SHORT = re.compile(r'(^|(?<=[\s(«]))([А-Яа-яЁё]{1,2})\s')

def t(en, ru):
    ru = NBSP_SHORT.sub(lambda m: m.group(1) + m.group(2) + ' ', ru)  # Copylot ru-nbsp-short-word
    return f'<span lang="en">{en}</span><span lang="ru">{ru}</span>'

def av(name, cls=''):
    return f'<svg class="av av-{name} {cls}" viewBox="0 0 120 120" aria-hidden="true"><use href="#cast-{name}"/></svg>'

# W12: Morpheus's recorded lines (Asset Foundry speech-line, voice «Morpheus PassionCode»), en and ru; comic.js plays the
# line of the reader's language when its panel enters, once the sound is on.
VO = {"I know why the launch slips. Want to see?": 'a0', 'Your choice.': 'choice', 'Shall we go on?': 'again',
      'What must the business achieve this quarter?': 'goals',
      'Access by level, keys in one vault. Keep the team and grow together, or hand the routine to agents.': 'access',
      'Four phases, the cost, and how it scales with no person in the routine.': 'plan',
      "Let's look inside. It builds itself from blocks.": 'matrix',
      'Revenue grows where agents work; costs fall where people waited.': 'pnl',
      'Here is your business now. Every agent, task and cost on one screen.': 'dash', 'Which pill do you take?': 'final'}
def vo(en):
    return f' data-vo="{VO[en]}"' if en in VO else ''

def say(who, en, ru, side='l', name=None):
    face = av(who) if who in ('morpheus', 'trinity', 'neo', 'smith', 'architect') else f'<i class="face">{who[0].upper()}</i>'
    label = f'<b class="who">{name}</b>' if name else ''
    return f'<div class="say say-{side} who-{who}"{vo(en) if who == "morpheus" else ""}>{face}<div class="balloon">{label}<p>{t(en, ru)}</p></div></div>'

# ---- act 0: the company chat in the centre, Morpheus joins, rises, offers the pills -------------------------------
CHAT = [
    ('anna', 'Anna · Marketing', 'Анна · маркетинг', 'Who is writing the landing copy?', 'Кто пишет текст лендинга?'),
    ('ivan', 'Ivan · Dev', 'Иван · разработка', 'Still waiting for the copy to start the page.', 'Всё ещё жду текст, чтобы начать страницу.'),
    ('olga', 'Olga · Growth', 'Ольга · рост', 'So the launch slips again?', 'Значит, запуск опять переносим?'),
    ('ceo', 'CEO', 'CEO', "Let's discuss it at the 16:00 sync.", 'Обсудим на созвоне в 16:00.'),
]
def act0():
    rows = []
    for i, (who, ne, nr, en, ru) in enumerate(CHAT):
        rows.append(f'<li class="m" data-at="{0.06 + i * 0.07:.2f}"><i class="face f-{who}">{who[0].upper()}</i><div><b>{t(ne, nr)}</b><p>{t(en, ru)}</p></div></li>')
    rows.append(f'<li class="m sys" data-at="0.36"><p>{t("Morpheus joined the chat", "Морфеус присоединился к чату")}</p></li>')
    rows.append(f'<li class="m agent" data-at="0.42" data-vo="a0">{av("morpheus")}<div><b>{t("Morpheus · PM agent", "Морфеус · PM-агент")}</b><p>{t("I know why the launch slips. Want to see?", "Я знаю, почему запуск переносится. Показать?")}</p></div></li>')
    return f'''<section class="act0" id="act0" aria-label="{'The choice'}">
 <div class="act0-stage">
  <div class="cchat" aria-label="Team chat">
   <div class="cchat-head"><span class="ico-team" aria-hidden="true"></span><b>{t('#your-company', '#ваша-компания')}</b><small>{t('5 people', '5 человек')}</small></div>
   <ol class="cchat-msgs">{''.join(rows)}</ol>
  </div>
  <div class="rise">
   {av('morpheus', 'hero-av')}
   <p class="rise-line" data-vo="choice">{t('Your choice.', 'Выбор за вами.')}</p>
   <div class="pills" role="group" aria-label="Choose">
    <button type="button" class="pill red" data-pill="red"><span class="capsule" aria-hidden="true"></span>{t('Wake up: how your company runs on agents', 'Проснуться: как компания работает на агентах')}</button>
    <button type="button" class="pill blue" data-pill="blue"><span class="capsule" aria-hidden="true"></span>{t('Stay as is: how it runs now', 'Остаться как есть: как всё устроено сейчас')}</button>
   </div>
   <p class="wait-hint">{t('Pick a pill to go on', 'Нажмите на таблетку, чтобы продолжить')}</p>
  </div>
 </div>
</section>'''

# ---- the comic: panels, each one event, an arrow to the next ------------------------------------------------------
# What each arrow carries to the next panel: the through-object of the winning scenario (round 2), so the comic reads
# as one chain of causes, not a set of slides.
HANDOFF = [
    ('goals go to the team', 'цели уходят команде'), ('the team opens its tools', 'команда открывает свои инструменты'),
    ('the data becomes hours', 'данные превращаются в часы'), ('the hours become a plan', 'часы превращаются в план'),
    ('the plan becomes an image', 'план превращается в образ'), ('the image opens the Matrix', 'образ открывает матрицу'),
    ('the blocks need agents', 'блокам нужны агенты'), ('agents fill the departments', 'агенты заполняют отделы'),
    ('marketing starts its loop', 'маркетинг начинает свой круг'), ('the data room feeds sales and quality', 'дата-рум кормит продажи и качество'),
    ('a signal becomes a test', 'сигнал становится тестом'), ('results go to the books', 'результаты уходят в отчётность'),
    ('the books return to the chat', 'отчётность возвращается в чат'),
]

def panel(n, title_en, title_ru, body, cls=''):
    return f'''<article class="panel {cls}" id="p{n}">
 <header class="ptitle"><span class="pn">{n:02d}</span><h2>{t(title_en, title_ru)}</h2></header>
 <div class="pbody">{body}</div>
</article>
<div class="handoff"><svg class="arrow" viewBox="0 0 120 120" aria-hidden="true"><path d="M60 4 C 20 40, 100 70, 60 112 M48 98 L60 112 L72 98"/></svg>{('<span class="carry">' + t(*HANDOFF[n - 1]) + '</span>') if n - 1 < len(HANDOFF) else ''}</div>'''

def chips(items, cls='chip'):
    return ''.join(f'<span class="{cls}" style="--k:{i}">{t(*x)}</span>' for i, x in enumerate(items))

PANELS = [
    ('Morpheus takes the goals', 'Морфеус принимает цели',
     say('morpheus', 'What must the business achieve this quarter?', 'Чего бизнес должен добиться в этом квартале?', 'l', 'Morpheus')
     + say('ceo', 'Grow revenue, ship every week, answer users within a minute.', 'Расти в выручке, выпускать каждую неделю, отвечать за минуту.', 'r', 'CEO')
     + '<div class="goals3">' + chips([('Revenue ↑', 'Выручка ↑'), ('Release weekly', 'Релиз каждую неделю'), ('Reply < 1 min', 'Ответ < 1 мин')], 'goal') + '</div>'),
    ('The team joins by level', 'Команда подключается по уровням',
     say('morpheus', 'Access by level, keys in one vault. Keep the team and grow together, or hand the routine to agents.', 'Доступ по уровням, ключи в одном хранилище. Оставьте команду и растите вместе или отдайте рутину агентам.', 'l', 'Morpheus')
     + '<div class="team">' + ''.join(f'<span class="mem" style="--k:{i}"><i class="face">{c}</i><em>{lvl}</em></span>' for i, (c, lvl) in enumerate([('C', 'owner'), ('A', 'admin'), ('I', 'member'), ('O', 'member')])) + '<span class="vault">' + t('one vault', 'одно хранилище') + '</span></div>'),
    ('Trinity connects the data', 'Тринити подключает данные',
     say('trinity', 'Connect what you use. Each connector makes the assessment more precise.', 'Подключите то, чем пользуетесь. Каждый коннектор делает оценку точнее.', 'l', 'Trinity')
     + '<div class="conns">' + chips([('Repository', 'Репозиторий'), ('Analytics', 'Аналитика'), ('Support', 'Поддержка'), ('Ads', 'Реклама'), ('Finance', 'Финансы')], 'conn') + '</div><div class="prec"><b>93%</b><small>' + t('precision', 'точность') + '</small></div>'),
    ('Trinity counts the hours', 'Тринити считает часы',
     '<div class="stats"><p><b>1 240</b>' + t('person-hours a month agents take', 'человеко-часов в месяц возьмут агенты') + '</p><p><b>68%</b>' + t('of routine work', 'рутинной работы') + '</p></div>'
     + '<svg class="forecast" viewBox="0 0 300 80"><path d="M0 70 C60 66 110 52 160 38 S250 10 300 4"/></svg>'
     + say('trinity', 'With finance connected: a revenue forecast too.', 'С финансами ещё и прогноз выручки.', 'r', 'Trinity')),
    ('The plan and its cost', 'План и его стоимость',
     say('morpheus', 'Four phases, the cost, and how it scales with no person in the routine.', 'Четыре этапа, стоимость и как всё масштабируется без людей в рутине.', 'l', 'Morpheus')
     + '<ol class="phases">' + chips([('Goals and assessment · 1 wk', 'Цели и оценка · 1 нед'), ('Image and first agents · 1 wk', 'Образ и первые агенты · 1 нед'), ('Departments live · 2 wk', 'Отделы в работе · 2 нед'), ('Scaling', 'Масштаб')], 'ph') + '</ol>'
     + '<p class="cost"><b>$24k</b> <small>' + t('illustrative', 'для примера') + '</small></p>'
     + say('ceo', 'Accepted. Start.', 'Принято. Запускайте.', 'r', 'CEO') + '<b class="stamp">' + t('Accepted', 'Принято') + '</b>'),
    ('Neo builds the isolated image', 'Нео собирает изолированный образ',
     say('neo', 'Your machine or ours. An isolated, signed image for your organization.', 'Ваша машина или наша. Изолированный подписанный образ для вашей организации.', 'l', 'Neo')
     + '<ol class="layers">' + chips([('signature', 'подпись'), ('agent runtime', 'среда агентов'), ('network policy', 'сетевые правила'), ('key vault', 'хранилище ключей'), ('base system', 'базовая система')], 'ly') + '</ol>'),
    ('Now, how the Matrix works', 'Теперь: как работает матрица',
     say('morpheus', "Let's look inside. It builds itself from blocks.", 'Давайте заглянем внутрь. Она собирается из блоков.', 'l', 'Morpheus')
     + '<div class="cubes">' + ''.join(f'<span class="cube" style="--k:{i}"><b>{n}</b></span>' for i, n in enumerate(['Fabric', 'Switchboard', 'Inbox', 'Dashboards', 'Observatory', 'Agents base'])) + '</div>'
     + '<p class="agnostic">' + t('Agent-agnostic: on Claude Code, Codex and what comes next', 'Agent-agnostic: на Claude Code, Codex и следующих') + '</p>', 'wide'),
    ('The Architect builds agents', 'Архитектор собирает агентов',
     '<div class="build"><span class="node">' + t('template', 'шаблон') + '</span><span class="link"></span><span class="node">' + t('agent', 'агент') + '</span><span class="link"></span><span class="node">' + t('department', 'отдел') + '</span></div>'
     + say('architect', 'Every agent comes from a tested template, and the base learns from every project.', 'Каждый агент собирается из проверенного шаблона, а база учится на каждом проекте.', 'r', 'Architect')),
    ('Departments come alive', 'Отделы оживают',
     '<div class="depts">' + ''.join(f'<div class="dept" style="--k:{i}"><b>{t(*d)}</b><span class="clones">{''.join(av("smith").replace('class="av', f'style="--k:{j}" class="av', 1) for j in range(4))}</span></div>' for i, d in enumerate([('SEO', 'SEO'), ('Support quality', 'Качество поддержки'), ('Social', 'Соцсети'), ('Development', 'Разработка'), ('Community', 'Комьюнити'), ('Sales', 'Продажи'), ('Business dev', 'Развитие бизнеса'), ('Strategy', 'Стратегия'), ('Research', 'Исследования'), ('Marketing', 'Маркетинг'), ('Analytics', 'Аналитика'), ('Finance', 'Финансы')]))
     + '</div>' + say('smith', 'Where work needs hands, we clone.', 'Где работе нужны руки, мы клонируемся.', 'r', 'Smith'), 'wide'),
    ('The marketing loop', 'Цикл маркетинга',
     '<div class="loop"><span class="core">' + t('data room', 'дата-рум') + '</span>' + ''.join(f'<span class="ln" style="--k:{i}">{t(*s)}</span>' for i, s in enumerate([('market and competitors', 'рынок и конкуренты'), ('ideas and pick', 'идеи и выбор'), ('storyboard and creative', 'раскадровка и креатив'), ('ad account launch', 'запуск в рекламном кабинете'), ('traffic and analytics', 'трафик и аналитика'), ('back to the data room', 'назад в дата-рум')])) + '<i class="token"></i></div>'
     + say('smith', 'One loop: signal, creative, launch, result, data room, next loop.', 'Один круг: сигнал, креатив, запуск, результат, дата-рум, следующий круг.', 'r', 'Smith · Marketing'), 'wide'),
    ('Sales and quality run themselves', 'Продажи и качество идут сами',
     '<div class="twin"><div><h3>' + t('Sales', 'Продажи') + '</h3><p>' + t('Leads from the data room, answers, deals.', 'Лиды из дата-рума, ответы, сделки.') + '</p></div><div><h3>' + t('Quality', 'Качество') + '</h3><p>' + t('Test bench, a coding agent catches a signal and ships the fix.', 'Тестовый стенд, агент-разработчик ловит сигнал и выкатывает исправление.') + '</p></div></div>'),
    ('An A/B test on the site', 'A/B-тест на сайте',
     '<div class="ab"><div class="site"><span class="btn a">A</span><span class="btn b">B</span></div><div class="bars"><i class="ba"></i><i class="bb"></i></div></div>'
     + say('smith', 'Hypothesis picked, test live, data to the data room.', 'Гипотеза выбрана, тест запущен, данные в дата-рум.', 'l', 'Smith · Growth')
     + '<p class="win">' + t('B wins: revenue +15% in 30 days', 'B выиграл: выручка +15% за 30 дней') + ' <small>' + t('illustrative', 'для примера') + '</small></p>'),
    ('Your P&L', 'Ваш P&L',
     '<svg class="pnl" viewBox="0 0 320 140"><path class="rev" d="M0 120 C80 112 140 80 200 56 S280 18 320 10"/><path class="cost" d="M0 30 C80 36 150 70 210 96 S290 118 320 122"/></svg>'
     + '<p class="legend"><span class="l-rev">' + t('revenue', 'выручка') + '</span><span class="l-cost">' + t('costs', 'затраты') + '</span></p>'
     + say('morpheus', 'Revenue grows where agents work; costs fall where people waited.', 'Выручка растёт там, где работают агенты; затраты падают там, где люди ждали.', 'l', 'Morpheus')),
    ('Back in the chat: your business, live', 'Снова в чате: ваш бизнес вживую',
     say('neo', 'The Matrix folds back. I am out.', 'Матрица схлопывается. Я выхожу.', 'r', 'Neo')
     + '<div class="cdash"><p class="dh">' + t('#your-company · Morpheus', '#ваша-компания · Морфеус') + '</p><ul class="svc">'
     + ''.join(f'<li style="--k:{i}"><span class="ok"></span>{t(*x)}</li>' for i, x in enumerate([('services: all up', 'сервисы: все работают'), ('revenue: growing', 'выручка: растёт'), ('users: arriving', 'пользователи: приходят'), ('content: spreading', 'контент: разлетается')]))
     + '</ul></div>'
     + say('morpheus', 'Here is your business now. Every agent, task and cost on one screen.', 'Вот ваш бизнес сейчас. Все агенты, задачи и расходы на одном экране.', 'l', 'Morpheus')),
]

def final():
    return f'''<section class="final-choice" id="final">
 {av('morpheus', 'hero-av')}
 <h2 data-vo="final">{t('Which pill do you take?', 'Какую таблетку выберете вы?')}</h2>
 <div class="pills">
  <a class="pill red" href="#onboard"><span class="capsule" aria-hidden="true"></span>{t('Wake up', 'Проснуться')}</a>
  <a class="pill blue" href="#top"><span class="capsule" aria-hidden="true"></span>{t('Forget it all', 'Забыть всё')}</a>
 </div>
</section>
<section class="onboard" id="onboard">
 <h2>{t('One step: add Morpheus to your team chat', 'Один шаг: добавьте Морфеуса в чат команды')}</h2>
 <p>{t('He says hello, takes your goals and starts the assessment.', 'Он поздоровается, примет цели и начнёт оценку.')}</p>
 <div class="go">
  <a class="cta big-cta tg" href="https://passioncode.ai/business/?via=telegram#lead-form">{t('Add to Telegram', 'Добавить в Telegram')}</a>
 </div>
 <p class="other">{t('Your team is elsewhere?', 'Команда в другом месте?')} <a href="https://passioncode.ai/business/?via=slack#lead-form">Slack</a> · <a href="https://passioncode.ai/business/?via=discord#lead-form">Discord</a> · <a href="https://passioncode.ai/business/#lead-form">{t('a short form', 'короткая форма')}</a></p>
 <p class="note">{t('Demo: the buttons open the request form while the onboarding bot is being built.', 'Демо: пока бот онбординга в работе, кнопки ведут на форму заявки.')}</p>
</section>'''

CTA_AFTER = {4: ('Want this assessment for your company?', 'Хотите такую оценку для своей компании?'),
             10: ('Your marketing could run this loop next week.', 'Ваш маркетинг может пойти по этому кругу уже на следующей неделе.')}

def cta_strip(en, ru):
    return (f'<aside class="cta-strip"><p>{t(en, ru)}</p><a class="cta" href="https://passioncode.ai/business/?via=telegram#lead-form">'
            + t('Add Morpheus to Telegram', 'Добавить Морфеуса в Telegram') + '</a></aside>')

# The film's caption times come from its cut (story/film/cut.py writes timeline.json); planned times until it exists.

# ==== v6 (the operator, 2026-11-19): no header at first; the white rabbit, Morpheus, the pills. Blue: the film
# «Пробуждение» in a loop. Red: the film «Предыстория», then the big chat (Morpheus and Trinity speak), then the comic of
# sync, escalation and assessment, the company running on agents, and the onboarding into Morpheus's chat. Every line
# comes from story/v6-script.json. Panels are laid out big and still: no entrance animation (v6.css). ================
S6 = json.loads((ROOT / 'story' / 'v6-script.json').read_text())
TG = 'https://t.me/MorpheusPMBot?start=lp_assessment_en'
X_URL, LI_URL = 'https://x.com/sshlg93', 'https://www.linkedin.com/in/sergey-sheleg-02579692'
NAMES = {'ivan': ('Ivan · Dev', 'Иван · разработка'), 'anna': ('Anna · Marketing', 'Анна · маркетинг'),
         'olga': ('Olga · Growth', 'Ольга · рост'), 'ceo': ('CEO', 'CEO'),
         'morpheus': ('Morpheus · PM agent', 'Морфеус · PM-агент'), 'trinity': ('Trinity · assessment', 'Тринити · ассессмент')}

def tt(o):
    return t(o['en'], o['ru'])

def intro():
    r = S6['intro']
    return f'''<section class="act0 intro" id="act0" aria-labelledby="intro-line">
 <div class="act0-stage">
  <p class="intro-line" id="intro-line">{tt(r['rabbit'])}</p>
  <div class="rise">
   {av('morpheus', 'hero-av')}
   <p class="rise-line" data-vo="choice">{t('Your choice.', 'Выбор за вами.')}</p>
   <div class="pills" role="group" aria-labelledby="intro-line">
    <button type="button" class="pill red" data-pill="red"><span class="capsule" aria-hidden="true"></span>{tt(r['red'])}</button>
    <button type="button" class="pill blue" data-pill="blue"><span class="capsule" aria-hidden="true"></span>{tt(r['blue'])}</button>
   </div>
  </div>
 </div>
</section>'''

def bigchat():
    rows, voiced = [], [m for m in S6['chat']]
    n = len(voiced)
    for i, m in enumerate(voiced):
        at = f'{0.04 + i * (0.86 / n):.3f}'
        if m['who'] == 'sys':
            rows.append(f'<li class="m sys" data-at="{at}"><p>{tt(m)}</p></li>')
            continue
        agent = m['who'] in ('morpheus', 'trinity')
        face = av(m['who']) if agent else f'<i class="face f-{m["who"]}">{m["who"][0].upper()}</i>'
        vo = f' data-vo="{m["vo"]}"' if m.get('vo') else ''
        rows.append(f'<li class="m{" agent who-" + m["who"] if agent else ""}" data-at="{at}"{vo}>{face}<div><b>{t(*NAMES[m["who"]])}</b><p>{tt(m)}</p></div></li>')
    return f'''<section class="bigchat-act" id="chat" aria-label="{'Team chat'}">
 <div class="bigchat-pin">
  <div class="bigchat">
   <div class="cchat-head"><span class="ico-team" aria-hidden="true"></span><b>{t('#your-company', '#ваша-компания')}</b><small>{t('6 members', '6 участников')}</small></div>
   <ol class="bc-msgs">{''.join(rows)}</ol>
  </div>
 </div>
</section>'''

def narrator(v):
    who = v['who']
    return (f'<div class="say say-l who-{who}" data-vo="{v["key"]}">{av(who)}<div class="balloon"><b class="who">{who.title()}</b>'
            f'<p>{tt(v)}</p></div></div>')

HANDOFF6 = [('an unanswered question becomes a task', 'вопрос без ответа становится задачей'),
            ('nobody takes it: it climbs', 'никто не взял: задача идёт вверх'),
            ('the signals go to the assessment', 'сигналы уходят в ассессмент'),
            ('where exactly it stands', 'где именно стоит'),
            ('the work gets an owner', 'у работы появляется хозяин'),
            ('the copy is ready, the release goes', 'текст готов, релиз идёт'),
            ('so runs the whole company', 'так работает вся компания'),
            ('the blocks need agents', 'блокам нужны агенты'), ('results go to the books', 'результаты уходят в отчётность'),
            ('the books return to the chat', 'отчётность возвращается в чат')]

def panel6(n, title, body, cls='', carry=None):
    arrow = ('<span class="carry">' + t(*carry) + '</span>') if carry else ''
    return f'''<article class="panel {cls}" id="p{n}">
 <header class="ptitle"><span class="pn">{n:02d}</span><h2>{title}</h2></header>
 <div class="pbody">{body}</div>
</article>
<div class="handoff"><svg class="arrow" viewBox="0 0 120 120" aria-hidden="true"><path d="M60 4 C 20 40, 100 70, 60 112 M48 98 L60 112 L72 98"/></svg>{arrow}</div>'''

def body6(p):
    k = p['id']
    if k == 'sync':
        inst = '<ul class="checkin">' + ''.join(f'<li><span class="dm">{t("What are you on today?", "Над чем ты сегодня?")}</span><b>{tt(x)}</b></li>' for x in p['items']) + '</ul>'
    elif k == 'owner':
        inst = (f'<div class="tcard"><p class="tc-t">{tt(p["card"])}</p><div class="tc-b">'
                + ''.join(f'<span class="tb{" no" if i == 2 else ""}">{tt(b)}</span>' for i, b in enumerate(p['buttons'])) + '</div></div>')
    elif k == 'ladder':
        inst = '<ol class="ladder">' + ''.join(f'<li><span class="rung">{i + 1}</span>{tt(x)}</li>' for i, x in enumerate(p['steps'])) + '</ol>'
    elif k == 'waits':
        inst = ('<div class="waits">' + ''.join(f'<p class="wbar"><span class="wl">{tt(b)}</span><i style="--v:{b["v"]}"></i><b>{b["v"]} %</b></p>' for b in p['bars'])
                + '</div><ul class="facts">' + ''.join(f'<li>{tt(f)}</li>' for f in p['facts']) + f'</ul><p class="note">{tt(p["note"])}</p>')
    elif k == 'pingpong':
        inst = '<p class="pp">' + '<span class="pp-arr" aria-hidden="true">→</span>'.join(f'<span class="pp-n">{tt(x)}</span>' for x in p['path']) + '</p>'
    elif k == 'fix':
        inst = '<div class="modes">' + ''.join(f'<span class="mode{" on" if m.get("on") else ""}">{tt(m)}</span>' for m in p['modes']) + '</div>'
    else:
        inst = '<ol class="chain">' + ''.join(f'<li>{tt(c)}</li>' for c in p['chain']) + '</ol>'
    return narrator(p['vo']) + inst

KEEP = (6, 8, 12, 13)  # the Matrix blocks, the departments, the P&L, the live dashboard: the company that runs this way

def panels6():
    out, n = [], 0
    for i, p in enumerate(S6['panels']):
        n += 1
        out.append(panel6(n, tt(p['title']), body6(p), 'wide' if p['id'] in ('waits', 'ship') else '', HANDOFF6[i]))
    for j, k in enumerate(KEEP):
        n += 1
        title_en, title_ru, body, *cls = PANELS[k]
        out.append(panel6(n, t(title_en, title_ru), body, cls[0] if cls else '', HANDOFF6[len(S6['panels']) + j] if len(S6['panels']) + j < len(HANDOFF6) else None))
    return '\n'.join(out)

def final6():
    f = S6['final']
    return f'''<section class="final-choice onboard" id="final">
 <div id="onboard">
 {av('morpheus', 'hero-av')}
 <p class="rise-line final-line" data-vo="{f['vo']['key']}">{tt(f['vo'])}</p>
 <div class="go">
  <a class="cta big-cta tg" data-tg href="{TG}" target="_blank" rel="noopener">{tt(f['write'])}</a>
 </div>
 <p class="follow-h">{tt(f['follow'])}</p>
 <div class="follow">
  <a class="fl x" href="{X_URL}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.3L5.6 21H2.5l7.1-8.1L2 3h6.2l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z"/></svg>{tt(f['x'])}</a>
  <a class="fl li" href="{LI_URL}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z"/></svg>{tt(f['linkedin'])}</a>
 </div>
 </div>
</section>'''

_BT = ROOT / 'story' / 'film' / 'backstory-timeline.json'
def backstory_film():
    caps = json.loads(_BT.read_text())['captions'] if _BT.exists() else {}
    lines = {b['vo']: b for b in S6['backstory']}
    subs = ''.join(f'<li data-from="{a}" data-to="{b}">{tt(lines[k])}</li>' for k, (a, b) in caps.items() if k in lines)
    return f'''<section class="film-full" id="backstory" hidden aria-labelledby="backstory-name" data-kind="backstory">
 <h2 class="sr-only" id="backstory-name">{t('Film «Backstory»', 'Фильм «Предыстория»')}</h2>
 <div class="film-rot">
 <video poster="/story/film/backstory-poster.jpg" playsinline preload="none" data-src-en="/story/film/backstory-en.mp4" data-src-ru="/story/film/backstory-ru.mp4"></video>
 <ol class="film-subs" aria-live="polite">{subs}</ol>
 <button class="film-close" type="button" data-film="skip">{t('Skip', 'Пропустить')}</button>
 </div>
</section>'''

_TL = ROOT / 'story' / 'film' / 'timeline.json'
CAP = json.loads(_TL.read_text())['captions'] if _TL.exists() else {'manager': [14.5, 17.5], 'error': [47.9, 51.4], 'morpheus': [75.0, 79.4]}

def main():
    src = SRC.read_text()
    head = src[:src.index('<canvas class="rain"')]
    # the header's voice button becomes the one sound switch (W12, treatment §5); the old variants are not shown any more
    head = re.sub(r'<button class="voice-btn".*?</button>', '<button class="voice-btn" type="button" id="sound" aria-pressed="false">'
                  '<span class="eq" aria-hidden="true"><i></i><i></i><i></i></span>' + t('Sound', 'Звук') + '</button>', head, flags=re.S)
    head = re.sub(r'\s*<a class="alt-link[^"]*"[^>]*>.*?</a>', '', head, flags=re.S)
    head = head.replace('<link rel="stylesheet" href="/story/v3.css">', '<link rel="stylesheet" href="/story/v3.css">\n<link rel="stylesheet" href="/story/comic/comic.css">\n<link rel="stylesheet" href="/story/comic/v6.css">')
    hero = src[src.index('<section class="hero"'):src.index('</section>', src.index('<section class="hero"')) + len('</section>')]
    hero = re.sub(r'\s*<a class="pill-btn[^>]*>.*?</a>', '', hero, flags=re.S)   # the pills move to act 0
    hero = re.sub(r'\s*<p class="offer-q">.*?</p>', '', hero, flags=re.S)
    hero = hero.replace('href="#story"', 'href="#act0"')
    parts = []
    for i, p in enumerate(PANELS):
        parts.append(panel(i + 1, *p))
        if i + 1 in CTA_AFTER:
            parts.append(cta_strip(*CTA_AFTER[i + 1]))
    panels = '\n'.join(parts)
    body = f'''<canvas class="rain" id="rain" aria-hidden="true"></canvas>
<div id="top"></div>
{intro()}
<section class="film-full" id="film" hidden aria-labelledby="film-name" data-kind="awakening">
 <h2 class="sr-only" id="film-name">{t('Film «Awakening»', 'Фильм «Пробуждение»')}</h2>
 <div class="film-rot">
 <video poster="/story/film/poster.jpg" playsinline preload="none" data-src-en="/story/film/film-en.mp4" data-src-ru="/story/film/film-ru.mp4"></video>
 <ol class="film-subs" aria-live="polite">
  <li data-from="{CAP['manager'][0]}" data-to="{CAP['manager'][1]}">{t("We won't make it.", 'Мы не успеваем.')}</li>
  <li class="on-screen" data-from="{CAP['error'][0]}" data-to="{CAP['error'][1]}">{t('404 · waiting for approval', '404 · ждёт согласования')}</li>
  <li data-from="{CAP['morpheus'][0]}" data-to="{CAP['morpheus'][1]}">{t('This is your business too. Without the routine.', 'Это тоже ваш бизнес. Только без рутины.')}</li>
 </ol>
 <button class="film-close" type="button" data-film="close">{t('Close', 'Закрыть')}</button>
 <div class="film-end" hidden>
  <img class="future" src="/story/film/future-office.jpg" alt="" loading="lazy">
  <div class="film-end-in">
   <p class="film-cap">{t('Across the hall: another office. Another business. Nobody in the routine.', 'Напротив: другой офис. Другой бизнес. В рутине никого.')}</p>
   {av('morpheus', 'hero-av')}
   <p class="rise-line" data-vo="again">{t('Shall we go on?', 'Ну что, продолжим?')}</p>
   <span class="sr-only" id="film-choose">{t('Choose', 'Выбор')}</span>
   <div class="pills" role="group" aria-labelledby="film-choose">
    <button type="button" class="pill red" data-film="red"><span class="capsule" aria-hidden="true"></span>{t('Dig in: follow the white rabbit', 'Разобраться: за белым кроликом')}</button>
    <button type="button" class="pill blue" data-film="blue"><span class="capsule" aria-hidden="true"></span>{t('Wake up at the desk again', 'Проснуться снова за столом')}</button>
   </div>
  </div>
 </div>
 </div>
</section>
{backstory_film()}
<div class="story-after" id="after" hidden>
{bigchat()}
<main class="comic" id="comic">
{panels6()}
</main>
{final6()}
</div>
<a class="sticky-cta" id="sticky-cta" href="#final" hidden>{tt(S6['final']['write'])}</a>
<footer class="foot"><a href="https://passioncode.ai/">passioncode.ai</a> · {t('demo, not linked from the site', 'демо, не связано с сайтом')}</footer>
<script type="module" src="/story/comic/comic.js"></script>
</body>
</html>
'''
    # Copylot ru-nbsp-short-word over every Russian span, the header's included (it comes from story/index.html)
    page = head.replace('class="matrix v3"', 'class="matrix v3 comic-page"') + body
    page = re.sub(r'<span lang="ru">((?:(?!</span>).)*)</span>', lambda m: '<span lang="ru">' + NBSP_SHORT.sub(lambda n: n.group(1) + n.group(2) + '\u00a0', m.group(1)) + '</span>', page, flags=re.S)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(page)
    print('comic-markup: v6 panels', len(S6['panels']) + len(KEEP))

if __name__ == '__main__':
    main()
