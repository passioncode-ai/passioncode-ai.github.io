#!/usr/bin/env python3
"""SITE-068 v2: writes the story section of story/index.html from the storyboard
(docs/tasks/2026-11-17-story-landing-v2.md). Run once per storyboard change; the page stays plain HTML.
Usage: python3 scripts/story-v2-markup.py  (rewrites story/index.html in place between the story markers)."""
import re, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGE = ROOT / 'story' / 'index.html'

NBSP_SHORT = re.compile(r'(^|(?<=[\s(«]))([А-Яа-яЁё]{1,2})\s')

def t(en, ru):
    # Russian typography (Copylot ru-nbsp-short-word): a non-breaking space after one- and two-letter words
    ru = NBSP_SHORT.sub(lambda m: m.group(1) + m.group(2) + '\u00a0', ru)
    return f'<span lang="en">{en}</span><span lang="ru">{ru}</span>'

def av(name, cls=''):
    return f'<svg class="av av-{name} {cls}" viewBox="0 0 120 120" aria-hidden="true"><use href="#cast-{name}"/></svg>'

CAPS = [
    ('Your pain', 'Ваша боль', 'The launch slips again. Every result passes through a person, and people wait for each other.', 'Запуск опять переносится. Каждый результат проходит через человека, а люди ждут друг друга.'),
    ('Morpheus joins the chat', 'Морфеус приходит в чат', 'It starts with one agent: Morpheus, the PM. He takes the goals and runs the onboarding.', 'Всё начинается с одного агента: Морфеуса, PM. Он принимает цели и проводит онбординг.'),
    ('Goals and the team', 'Цели и команда', 'Everyone gets access by level. Keep the team and grow with it, or hand the routine to agents.', 'Каждый получает доступ по уровню. Команду можно оставить и расти вместе, а можно отдать рутину агентам.'),
    ("Trinity's assessment", 'Оценка Тринити', 'Trinity maps how the work flows: what agents can take and how many person-hours it saves. With finance connected, a forecast too. The more connectors, the more precise.', 'Тринити разбирает, как устроена работа: что возьмут агенты и сколько человеко-часов это сэкономит. С финансами ещё и прогноз. Чем больше коннекторов, тем точнее.'),
    ('The plan and its cost', 'План и стоимость', 'Morpheus brings a detailed plan with its cost, and how the business scales with no person in the routine.', 'Морфеус приносит подробный план с его стоимостью и тем, как бизнес масштабируется без людей в рутине.'),
    ('Neo builds the image', 'Нео собирает образ', 'Neo, the DevOps agent, prepares a machine (ours or yours) and builds an isolated, protected image for your organization.', 'Нео, DevOps-агент, готовит машину (нашу или вашу) и собирает изолированный защищённый образ под вашу организацию.'),
    ('The Matrix fills', 'Матрица заполняется', 'Agents arrive in every department and clone themselves where the work needs hands.', 'Агенты появляются в каждом отделе и клонируются там, где работе нужны руки.'),
    ('The work flows', 'Работа идёт', 'Processes that waited on people now run on agents: they hand tasks to each other, watch the product and optimize it.', 'Процессы, которые ждали людей, теперь ведут агенты: передают задачи друг другу, следят за продуктом и улучшают его.'),
    ('The collapse', 'Схлопывание', 'The whole structure folds back into one point. Neo leaves the Matrix.', 'Вся структура схлопывается в одну точку. Нео выходит из матрицы.'),
    ('Morpheus reports', 'Отчёт Морфеуса', 'Back in the chat: one live dashboard. Services up, revenue growing, users arriving, content spreading.', 'Снова в чате: один живой дашборд. Сервисы работают, выручка растёт, пользователи приходят, контент разлетается.'),
    ('Your turn', 'Ваш ход', 'Tell us what your business does. Morpheus starts with your chat.', 'Расскажите, чем занимается ваш бизнес. Морфеус начнёт с вашего чата.'),
]

# (chapter, kind, who, name_en, name_ru, en, ru); kind: person | agent | sys
P = lambda ch, who, ne, nr, en, ru: (ch, 'person', who, ne, nr, en, ru)
A = lambda ch, who, ne, nr, en, ru: (ch, 'agent', who, ne, nr, en, ru)
S = lambda ch, en, ru: (ch, 'sys', None, None, None, en, ru)
MSGS = [
    P(0, 'anna', 'Anna · Marketing', 'Анна · маркетинг', 'Who is writing the landing copy?', 'Кто пишет текст лендинга?'),
    P(0, 'ivan', 'Ivan · Dev', 'Иван · разработка', 'Still waiting for the copy to start the page.', 'Всё ещё жду текст, чтобы начать страницу.'),
    P(0, 'olga', 'Olga · Growth', 'Ольга · рост', 'So the launch slips again?', 'Значит, запуск опять переносим?'),
    P(0, 'ceo', 'CEO', 'CEO', "Let's discuss it at the 16:00 sync.", 'Обсудим на созвоне в 16:00.'),
    S(1, 'Morpheus joined the chat', 'Морфеус присоединился к чату'),
    A(1, 'morpheus', 'Morpheus · PM agent', 'Морфеус · PM-агент', 'Hi, I am Morpheus, your PM agent. Tell me what the business must achieve.', 'Привет, я Морфеус, ваш PM-агент. Расскажите, чего должен добиться бизнес.'),
    P(1, 'ceo', 'CEO', 'CEO', 'Grow revenue, ship every week, answer users within a minute.', 'Расти в выручке, выпускать каждую неделю, отвечать пользователям за минуту.'),
    A(2, 'morpheus', 'Morpheus', 'Морфеус', 'Three goals recorded. Inviting the team: access by level, keys in one vault.', 'Три цели записал. Приглашаю команду: доступ по уровням, ключи в одном хранилище.'),
    S(2, 'Anna, Ivan and Olga are onboarded', 'Анна, Иван и Ольга подключены'),
    A(2, 'morpheus', 'Morpheus', 'Морфеус', 'Keep the team and grow with it, or let agents take the routine. Your call.', 'Можно оставить команду и расти вместе с ней, а можно отдать рутину агентам. Решать вам.'),
    S(3, 'Trinity joined the chat', 'Тринити присоединилась к чату'),
    A(3, 'trinity', 'Trinity · assessment', 'Тринити · оценка', 'Connect what you use. Each connector makes the assessment more precise.', 'Подключите то, чем пользуетесь. Каждый коннектор делает оценку точнее.'),
    P(3, 'ceo', 'CEO', 'CEO', 'Repository, analytics, support, ads. And finance.', 'Репозиторий, аналитика, поддержка, реклама. И финансы.'),
    A(4, 'morpheus', 'Morpheus', 'Морфеус', 'The plan: four phases, the integration cost, and how it scales with no person in the routine.', 'План: четыре этапа, стоимость интеграции и как всё масштабируется без людей в рутине.'),
    P(4, 'ceo', 'CEO', 'CEO', 'Accepted. Start.', 'Принято. Запускайте.'),
    S(5, 'Neo joined the chat', 'Нео присоединился к чату'),
    A(5, 'neo', 'Neo · DevOps', 'Нео · DevOps', 'Your machine or ours. I am building an isolated, signed image for your organization.', 'Ваша машина или наша. Собираю изолированный подписанный образ под вашу организацию.'),
    A(6, 'morpheus', 'Morpheus', 'Морфеус', 'The image is ready. The agents are coming.', 'Образ готов. Агенты на подходе.'),
    A(7, 'smith', 'Smith · Support', 'Смит · поддержка', 'Ticket closed in 40 seconds.', 'Тикет закрыт за 40 секунд.'),
    A(7, 'smith', 'Smith · Development', 'Смит · разработка', 'Release shipped, checks green.', 'Релиз выкачен, проверки зелёные.'),
    A(7, 'smith', 'Smith · Social', 'Смит · соцсети', 'Post is live in 10 languages.', 'Пост опубликован на 10 языках.'),
    S(9, 'Neo left the Matrix · all systems live', 'Нео вышел из матрицы · все системы работают'),
    A(9, 'morpheus', 'Morpheus', 'Морфеус', 'Here is your business now: <span class="dash-chip">live dashboard ↗</span>', 'Вот ваш бизнес сейчас: <span class="dash-chip">живой дашборд ↗</span>'),
    A(10, 'morpheus', 'Morpheus', 'Морфеус', 'Your business next?', 'Ваш бизнес следующий?'),
]
INITIAL = {'anna': 'A', 'ivan': 'I', 'olga': 'O', 'ceo': 'C'}

def msg(i, m, k):
    ch, kind, who, ne, nr, en, ru = m
    if kind == 'sys':
        return f'    <li class="msg sys" data-ch="{ch}" data-k="{k}"><p>{t(en, ru)}</p></li>'
    face = av(who) if kind == 'agent' else f'<i>{INITIAL[who]}</i>'
    name = ne if ne == nr else t(ne, nr)
    return (f'    <li class="msg {kind} who-{who}" data-ch="{ch}" data-k="{k}">{face}'
            f'<div><b>{name}</b><p>{t(en, ru)}</p></div></li>')

def caption(i, c):
    return f'    <div class="cap" data-c="{i}"><h2>{t(c[0], c[1])}</h2><p>{t(c[2], c[3])}</p></div>'

DEPTS = [('SEO', 'SEO'), ('Support quality', 'Качество поддержки'), ('Social media', 'Соцсети'), ('Development', 'Разработка'),
         ('Community', 'Комьюнити'), ('Sales', 'Продажи'), ('Business development', 'Развитие бизнеса'), ('Strategy', 'Стратегия'),
         ('Research', 'Исследования'), ('Marketing', 'Маркетинг'), ('Analytics', 'Аналитика'), ('Finance', 'Финансы')]
CONNECTORS = [('Repository', 'Репозиторий'), ('Analytics', 'Аналитика'), ('Support', 'Поддержка'), ('Ads', 'Реклама'), ('Finance', 'Финансы')]
PHASES = [('Goals and assessment', 'Цели и оценка', '1 wk', '1 нед'), ('Image and first agents', 'Образ и первые агенты', '1 wk', '1 нед'),
          ('Departments go live', 'Отделы в работе', '2 wk', '2 нед'), ('Humanless scaling', 'Масштаб без людей в рутине', 'ongoing', 'дальше')]
LAYERS = [('base system', 'базовая система'), ('key vault', 'хранилище ключей'), ('network policy', 'сетевые правила'), ('agent runtime', 'среда агентов'), ('signature', 'подпись')]

def scenes():
    out = []
    out.append('''   <!-- 0: your pain -->
   <div class="scene" data-s="0">
    <b class="fx fx0" aria-hidden="true">''' + t('PING PING PING', 'ДЗЫНЬ ДЗЫНЬ') + '''</b>
    <div class="biz">
     <div class="biz-card"><span class="ico shop"></span><b>''' + t('Your shop', 'Ваш магазин') + '''</b><small>app · site · store</small>
      <svg viewBox="0 0 220 70" class="flat"><polyline points="0,50 30,48 60,52 90,47 120,50 150,49 180,51 220,49"/></svg>
      <div class="kpis"><span>''' + t('reply', 'ответ') + ''' <b>~6 h</b></span><span>''' + t('release', 'релиз') + ''' <b>~3 wk</b></span></div>
     </div>
     <div class="people">
      <div class="person p1"><i>A</i><em class="wait">…</em></div>
      <div class="person p2"><i>I</i><em class="wait">…</em></div>
      <div class="person p3"><i>O</i><em class="wait">…</em></div>
      <div class="person p4"><i>C</i><em class="badge" id="notif">0</em></div>
     </div>
     <div class="clock old"><span class="hand"></span><small>''' + t('waiting for a reply', 'ждём ответа') + '''</small></div>
    </div>
   </div>''')
    out.append('''
   <!-- 1: Morpheus joins -->
   <div class="scene" data-s="1">
    <b class="fx fx1" aria-hidden="true">GLITCH</b>
    <div class="portrait p-morpheus">
     <div class="beam"></div>
     ''' + av('morpheus', 'big') + '''
     <div class="bubble">''' + t('“Give me the goals. Agents will do the rest.”', '«Дайте мне цели. Остальное сделают агенты.»') + '''</div>
     <p class="tag">''' + t('Morpheus · PM agent', 'Морфеус · PM-агент') + '''</p>
    </div>
   </div>''')
    goals = ''.join(f'<div class="goal g{i+1}"><small>0{i+1}</small><b>{t(*g)}</b></div>' for i, g in enumerate(
        [('Grow revenue', 'Рост выручки'), ('Ship every week', 'Релиз каждую неделю'), ('Reply within a minute', 'Ответ за минуту')]))
    out.append('''
   <!-- 2: goals and the team -->
   <div class="scene" data-s="2">
    <div class="orbit">
     <div class="core">''' + av('morpheus') + '''</div>
     <div class="sat s1"><i>C</i><span class="lvl">owner</span></div>
     <div class="sat s2"><i>A</i><span class="lvl">admin</span></div>
     <div class="sat s3"><i>I</i><span class="lvl">member</span></div>
     <div class="sat s4"><i>O</i><span class="lvl">member</span></div>
     <div class="vault"><span class="ico key"></span><b>''' + t('one vault', 'одно хранилище') + '''</b></div>
    </div>
    <div class="goals">''' + goals + '''</div>
   </div>''')
    conns = ''.join(f'<li class="conn c{i}"><span class="plug"></span>{t(*c)}</li>' for i, c in enumerate(CONNECTORS))
    out.append('''
   <!-- 3: Trinity's assessment -->
   <div class="scene" data-s="3">
    <div class="assess2">
     <div class="who">''' + av('trinity', 'mid') + '''<p class="tag">''' + t('Trinity · assessment', 'Тринити · оценка') + '''</p></div>
     <ul class="conns">''' + conns + '''</ul>
     <div class="gauge"><svg viewBox="0 0 120 70"><path class="g-bg" d="M10 62 A50 50 0 0 1 110 62"/><path class="g-fg" id="gauge" d="M10 62 A50 50 0 0 1 110 62" pathLength="100"/></svg><b id="precision">0%</b><small>''' + t('precision', 'точность') + '''</small></div>
     <div class="result">
      <p><b id="r-hours">0</b> <span>''' + t('person-hours a month agents take', 'человеко-часов в месяц возьмут агенты') + '''</span></p>
      <p><b id="r-share">0%</b> <span>''' + t('of routine work', 'рутинной работы') + '''</span></p>
      <div class="forecast"><svg viewBox="0 0 200 60"><path d="M0 50 C40 48 70 40 100 30 S160 12 200 6"/><path class="band" d="M0 50 C40 44 70 32 100 20 S160 2 200 0 L200 14 C160 22 130 36 100 40 S40 54 0 52 Z"/></svg><small>''' + t('revenue forecast, from finance data', 'прогноз выручки по финансовым данным') + '''</small></div>
     </div>
    </div>
   </div>''')
    phases = ''.join(f'<li class="ph ph{i}"><b>{t(p[0], p[1])}</b><small>{t(p[2], p[3])}</small></li>' for i, p in enumerate(PHASES))
    out.append('''
   <!-- 4: the plan and its cost -->
   <div class="scene" data-s="4">
    <div class="plan">
     <h3>''' + av('morpheus', 'tiny') + t('Integration plan', 'План интеграции') + '''</h3>
     <ol class="phases">''' + phases + '''</ol>
     <div class="cost"><small>''' + t('integration cost', 'стоимость интеграции') + '''</small><b id="cost">$0</b><small class="ill">''' + t('illustrative', 'для примера') + '''</small></div>
     <div class="scale"><span>''' + t('scales without people in the routine', 'масштаб без людей в рутине') + '''</span></div>
     <b class="accepted">''' + t('ACCEPTED', 'ПРИНЯТО') + '''</b>
    </div>
   </div>''')
    layers = ''.join(f'<li class="ly ly{i}">{t(*l)}<span class="lock"></span></li>' for i, l in enumerate(LAYERS))
    out.append('''
   <!-- 5: Neo builds the isolated image -->
   <div class="scene" data-s="5">
    <div class="neo">
     <div class="who">''' + av('neo', 'mid') + '''<p class="tag">''' + t('Neo · DevOps', 'Нео · DevOps') + '''</p></div>
     <ol class="image">''' + layers + '''</ol>
     <p class="sealed">''' + t('isolated · signed · yours', 'изолирован · подписан · ваш') + '''</p>
     <div class="door"><span></span></div>
    </div>
   </div>''')
    cells = ''.join(f'<div class="dept-cell d{i}"><b>{t(*d)}</b><div class="clones"></div><span class="st"></span></div>' for i, d in enumerate(DEPTS))
    out.append('''
   <!-- 6-8: the Matrix fills, the work flows, the collapse -->
   <div class="scene" data-s="6">
    <div class="matrix-grid" id="mgrid">''' + cells + '''
     <svg class="links" viewBox="0 0 400 300" preserveAspectRatio="none"><path id="mlink" d="M50 50 L150 50 L250 125 L350 125 L250 200 L150 275 L50 200 Z"/></svg>
    </div>
    <div class="agents-count"><b id="agents-n">0</b><small>''' + t('agents at work', 'агентов в работе') + '''</small></div>
    <div class="neo-exit">''' + av('neo', 'mid') + '''</div>
    <b class="fx fx6" aria-hidden="true">''' + t('CLONE', 'КЛОН') + '''</b>
   </div>''')
    tabs = [('services', 'Services', 'Сервисы'), ('revenue', 'Revenue', 'Выручка'), ('users', 'Users', 'Пользователи'), ('content', 'Content', 'Контент')]
    tabbtn = ''.join(f'<button type="button" role="tab" data-tab="{k}" aria-selected="{str(i == 0).lower()}">{t(e, r)}</button>' for i, (k, e, r) in enumerate(tabs))
    svc = ''.join(f'<li><span class="ok"></span>{t(*n)}</li>' for n in [('Site and app', 'Сайт и приложение'), ('Support', 'Поддержка'), ('Releases', 'Релизы'), ('Ads', 'Реклама'), ('Social', 'Соцсети'), ('Analytics', 'Аналитика')])
    out.append('''
   <!-- 9: Morpheus reports: the live dashboard (interactive) -->
   <div class="scene" data-s="9">
    <div class="dash" id="dash">
     <h3>''' + av('morpheus', 'tiny') + t('Your business, live', 'Ваш бизнес вживую') + '''</h3>
     <div class="tabs" role="tablist">''' + tabbtn + '''</div>
     <div class="panel" data-panel="services"><ul class="svc">''' + svc + '''</ul></div>
     <div class="panel" data-panel="revenue" hidden><svg viewBox="0 0 300 120"><path class="area" d="M0 110 C60 100 100 80 150 60 S240 20 300 10 L300 120 L0 120 Z"/><path class="line" d="M0 110 C60 100 100 80 150 60 S240 20 300 10"/></svg><p><b>+38%</b> ''' + t('month to month', 'месяц к месяцу') + '''</p></div>
     <div class="panel" data-panel="users" hidden><svg viewBox="0 0 300 120"><g class="bars"><rect x="10" y="80" width="30" height="40"/><rect x="60" y="70" width="30" height="50"/><rect x="110" y="56" width="30" height="64"/><rect x="160" y="44" width="30" height="76"/><rect x="210" y="30" width="30" height="90"/><rect x="260" y="14" width="30" height="106"/></g></svg><p><b>+2.4k</b> ''' + t('new users a week', 'новых пользователей в неделю') + '''</p></div>
     <div class="panel" data-panel="content" hidden><ul class="spread"><li>X</li><li>LinkedIn</li><li>YouTube</li><li>Telegram</li><li>Blog</li><li>TikTok</li></ul><p><b>48</b> ''' + t('posts out this week', 'публикаций за неделю') + '''</p></div>
     <p class="ill">''' + t('illustrative figures', 'цифры для примера') + '''</p>
    </div>
   </div>''')
    out.append('''
   <!-- 10: apply; the picture is the particle M (field.js), its line sits in the M's bay (.final) -->
   <div class="scene" data-s="10"></div>''')
    return '\n'.join(out)

def story():
    caps = '\n'.join(caption(i, c) for i, c in enumerate(CAPS))
    k = {}
    lines = []
    for i, m in enumerate(MSGS):
        k[m[0]] = k.get(m[0], -1) + 1
        lines.append(msg(i, m, k[m[0]]))
    return '''<section id="story" aria-label="''' + 'Story' + '''">
 <div class="stage" id="stage" data-beat="chat">
  <canvas class="pixels" id="pixels" aria-hidden="true"></canvas>
  <p class="vo-sub" id="vo-sub" aria-live="polite"></p>

  <div class="caption" aria-live="off">
   <p class="ch-num"><span id="ch-num">00</span> / 10</p>
   <div class="captions">
''' + caps + '''
   </div>
  </div>

  <div class="chat" aria-label="Team chat">
   <div class="chat-head"><span class="dot"></span><b>''' + t('#company', '#компания') + '''</b><small id="members">4</small></div>
   <ol class="msgs" id="msgs">
''' + '\n'.join(lines) + '''
   </ol>
   <div class="typing" aria-hidden="true"><span></span><span></span><span></span></div>
  </div>

  <div class="scenes">
''' + scenes() + '''
  </div>

  <div class="final" id="final" aria-hidden="true">
   <p class="big">''' + t('Agentize your business', 'Агентизируйте свой бизнес') + '''</p>
   <a class="cta big-cta" href="#apply" tabindex="-1">''' + t('Start with Morpheus', 'Начать с Морфеуса') + ''' →</a>
  </div>

  <div class="hud" aria-hidden="true">
   <div><small>''' + t('reply time', 'время ответа') + '''</small><b id="h-reply">6 h</b></div>
   <div><small>''' + t('release cycle', 'цикл релиза') + '''</small><b id="h-release">21 d</b></div>
   <div><small>''' + t('parallel streams', 'параллельных потоков') + '''</small><b id="h-streams">4</b></div>
   <div><small>''' + t('cost per task', 'стоимость задачи') + '''</small><b id="h-cost">$100</b></div>
   <p class="illus">''' + t('illustrative figures', 'цифры для примера') + '''</p>
  </div>
 </div>
</section>'''

page = PAGE.read_text()
start = page.index('<section id="story"')
end = page.index('<section class="after"')
page = page[:start] + story() + '\n\n' + page[end:]
PAGE.write_text(page)
print('story-v2-markup: chapters', len(CAPS), 'messages', len(MSGS), 'departments', len(DEPTS))
