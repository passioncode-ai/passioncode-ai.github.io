// Synthetic console transcripts for the sample-data mockups (SITE-028 W5): the coding agent running the
// Fabric Agent Adapter skills. Written by hand from the skills' own steps; not a recording.
(function () {
  const E = '\x1b['
  const dim = s => `${E}2m${s}${E}22m`
  const bold = s => `${E}1m${s}${E}22m`
  const wrap = (s, w) => { const out = []; let line = ''; for (const word of s.split(' ')) { if ((line + ' ' + word).trim().length > w) { out.push(line); line = word } else line = line ? line + ' ' + word : word } out.push(line); return out }
  const user = s => wrap(s, 116).map((l, i) => `${E}38;5;250m${E}48;5;236m ${i ? '  ' : ''}${l} ${E}0m`).join('\r\n')
  const dot = `${E}38;5;114m⏺${E}0m`
  const tool = `${E}38;5;179m⏺${E}0m`
  const accent = s => `${E}38;5;179m${s}${E}0m`
  const green = s => `${E}38;5;114m${s}${E}0m`
  const box = (s, w = 100) => {
    const line = '─'.repeat(w)
    const pad = Math.max(0, w - 2 - [...s].length)
    return [dim('╭' + line + '╮'), dim('│') + ' ' + s + ' '.repeat(pad) + ' ' + dim('│'), dim('╰' + line + '╯')]
  }
  const T = {
    en: {
      create: [
        user('> Build a new Fabric-compatible agent in this folder with the creating-fabric-agents skill. Its name is release-notes-agent; what it will do: Drafts release notes from merged pull requests. Start with the skill\'s intake questions and ask me each one here, one at a time; create no file until every one has an answer. Commit on main as you go, and when it is done tell me how to run it and how to check it.'),
        '',
        `${tool} ${bold('Skill')}(creating-fabric-agents)`,
        dim('  ⎿  Loaded · Fabric Agent Adapter 0.8.3'),
        '',
        `${dot} I'll start with the intake grill: six questions, one at a time. No file is created until every row has an answer.`,
        '',
        `  ${accent('1 of 6 · What capability?')}  One capability named as domain.action, with its input and output.`,
        '  Proposal: release_notes.draft',
        dim('    input   a repository and the pull requests merged since the last tag'),
        dim('    output  a Markdown draft, one line per change, grouped by kind'),
        '',
        user('> Yes. Group them as Added, Changed and Fixed.'),
        '',
        `${dot} Recorded: ${bold('release_notes.draft')}, grouped as Added / Changed / Fixed.`,
        '',
        `  ${accent('2 of 6 · Who calls it?')}  Name the project, schedule or workflow that will actually invoke release_notes.draft.`,
        '  No consumer, no agent: a role that "would be useful" is a catalogue entry, not a build order.',
        '',
        `  ${green('✓')} capability    ${dim('○')} consumer    ${dim('○')} workflow or agent    ${dim('○')} profile    ${dim('○')} effects    ${dim('○')} tenancy`,
        '',
        ...box('> The acme-site project, after every release tag▍'),
        dim('  ? for shortcuts')
      ],
      adapt: [
        user('> Adapt the agent in this folder to the Fabric Agent Contract with the adapting-projects-to-fabric skill. First inspect it without running anything and show me the plan: the profile and every file that would change. … Wait for my yes. Then create a new branch named fabric-adapter from the current branch and work only there: scaffold the provider, implement the seam, run the skill\'s check and show me the conformance report.'),
        '',
        `${tool} ${bold('Skill')}(adapting-projects-to-fabric)`,
        `${tool} ${bold('Bash')}(python3 …/scripts/adapt_project.py inspect . --json)`,
        dim('  ⎿  entry: reports/cli.py (terminal CLI) · MCP: none · A2A: none · git: main, clean'),
        '',
        `${dot} Plan for ${bold('legacy-reports-agent')}. Nothing has been changed yet.`,
        '',
        `  ${accent('Profile')}      local-runner: a terminal agent Fabric drives (reports/cli.py builds the week's report)`,
        `  ${accent('Capability')}   reports.weekly_support    input: a week · output: a CSV and a summary`,
        `  ${accent('Effects')}      publication-adjacent: it e-mails the report to support@example.test, declared now`,
        `  ${accent('Contract')}     0.1.0, pinned at a83bec6`,
        `  ${accent('Branch')}       fabric-adapter, from main; main is not touched`,
        '',
        '  Files that would change',
        `    ${green('+')} fabric-agent.json`,
        `    ${green('+')} fabric-contract.lock.json`,
        `    ${green('+')} fabric/schemas/capability-input.schema.json`,
        `    ${green('+')} fabric/schemas/capability-output.schema.json`,
        `    ${green('+')} fabric/fixtures/admission-input.json`,
        `    ${green('+')} fabric/probes/assertions.md`,
        `    ${green('+')} fabric/FABRIC-CONFORMANCE.md`,
        `    ${accent('~')} README.md   a "Run under Fabric" section`,
        '',
        '  Then the conformance check: what passed, and what is still NOT_RUN before admission.',
        '  Go ahead on branch fabric-adapter?',
        '',
        ...box('> yes▍'),
        dim('  ? for shortcuts')
      ]
    },
    ru: {
      create: [
        user('> Постройте в этой папке нового агента, совместимого с Fabric, скилом creating-fabric-agents. Его имя — release-notes-agent; что он будет делать: Готовит заметки к релизу по слитым pull request. Начните с вопросов скила и задавайте их мне здесь по одному; не создавайте ни одного файла, пока на каждый нет ответа. Коммитьте в main по ходу работы, а в конце скажите, как его запустить и как проверить.'),
        '',
        `${tool} ${bold('Skill')}(creating-fabric-agents)`,
        dim('  ⎿  Загружен · Fabric Agent Adapter 0.8.3'),
        '',
        `${dot} Начну с вопросов навыка: шесть вопросов, по одному. Ни один файл не создаётся, пока на каждый нет ответа.`,
        '',
        `  ${accent('1 из 6 · Какая способность?')}  Одна способность с именем вида domain.action, с её входом и выходом.`,
        '  Предлагаю: release_notes.draft',
        dim('    вход    репозиторий и pull request, слитые после последнего тега'),
        dim('    выход   черновик в Markdown, по строке на изменение, сгруппированный по виду'),
        '',
        user('> Да. Группы: Добавлено, Изменено, Исправлено.'),
        '',
        `${dot} Записал: ${bold('release_notes.draft')}, группы Добавлено / Изменено / Исправлено.`,
        '',
        `  ${accent('2 из 6 · Кто её вызывает?')}  Какой проект, расписание или процесс на деле будет вызывать release_notes.draft?`,
        '  Нет потребителя — нет агента: роль, которая «пригодилась бы», — строка каталога, а не задание.',
        '',
        `  ${green('✓')} способность    ${dim('○')} потребитель    ${dim('○')} процесс или агент    ${dim('○')} профиль    ${dim('○')} эффекты    ${dim('○')} операторы`,
        '',
        ...box('> Проект acme-site, после каждого тега релиза▍'),
        dim('  ? — подсказки')
      ],
      adapt: [
        user('> Адаптируйте агента в этой папке к Fabric Agent Contract скилом adapting-projects-to-fabric. Сначала изучите его, ничего не запуская, и покажите мне план: профиль и каждый файл, который изменится. … Дождитесь моего «да». Затем создайте от текущей ветки новую ветку fabric-adapter и работайте только в ней: создайте каркас провайдера, реализуйте связку, запустите проверку скила и покажите мне отчёт о совместимости.'),
        '',
        `${tool} ${bold('Skill')}(adapting-projects-to-fabric)`,
        `${tool} ${bold('Bash')}(python3 …/scripts/adapt_project.py inspect . --json)`,
        dim('  ⎿  вход: reports/cli.py (терминальная программа) · MCP: нет · A2A: нет · git: main, чисто'),
        '',
        `${dot} План для ${bold('legacy-reports-agent')}. Пока ничего не изменено.`,
        '',
        `  ${accent('Профиль')}       local-runner: терминальный агент, которым управляет Fabric (reports/cli.py собирает отчёт за неделю)`,
        `  ${accent('Способность')}   reports.weekly_support    вход: неделя · выход: CSV и сводка`,
        `  ${accent('Эффекты')}       рядом с публикацией: отправляет отчёт на support@example.test, объявляем сейчас`,
        `  ${accent('Контракт')}      0.1.0, закреплён на a83bec6`,
        `  ${accent('Ветка')}         fabric-adapter от main; main не трогаю`,
        '',
        '  Какие файлы изменятся',
        `    ${green('+')} fabric-agent.json`,
        `    ${green('+')} fabric-contract.lock.json`,
        `    ${green('+')} fabric/schemas/capability-input.schema.json`,
        `    ${green('+')} fabric/schemas/capability-output.schema.json`,
        `    ${green('+')} fabric/fixtures/admission-input.json`,
        `    ${green('+')} fabric/probes/assertions.md`,
        `    ${green('+')} fabric/FABRIC-CONFORMANCE.md`,
        `    ${accent('~')} README.md   раздел «Запуск под Fabric»`,
        '',
        '  Потом проверка совместимости: что прошло и что ещё NOT_RUN до допуска.',
        '  Начинаю в ветке fabric-adapter?',
        '',
        ...box('> да▍'),
        dim('  ? — подсказки')
      ]
    }
  }
  window.__transcript = (locale, kind) => T[locale][kind].join('\r\n') + '\x1b[?25l'
})()
