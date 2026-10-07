// #region lead-options — docs: docs/ux/scenarios.md#scn-014-request-an-ai-workplace-for-a-company
// The answers the /business/ form offers, shared by the page's script and the Worker that
// validates a submission (worker/leads.js). The form's HTML carries the same values so it
// works without JavaScript; scripts/check-site.mjs asserts the two agree.
export const LEAD_OPTIONS = {
  goals: {
    automate_operations: 'Automate recurring operations',
    custom_agents: 'Build agents for our own processes',
    convert_agents: 'Convert our existing agents or projects',
    commercial_license: 'A commercial license for a closed product or service',
    managed_hosting: 'Have PassionCode.ai host and run it',
    team_onboarding: 'Onboard and train our team'
  },
  industry: {
    mobile_publishing: 'Mobile apps and games publishing',
    saas: 'SaaS',
    marketing_agency: 'Marketing or advertising agency',
    ecommerce: 'E-commerce and retail',
    fintech: 'Fintech and payments',
    media_content: 'Media and content',
    dev_studio: 'Software studio or outsourcing',
    other: 'Something else'
  },
  size: {
    '1_10': '1–10 people',
    '11_50': '11–50',
    '51_200': '51–200',
    '201_1000': '201–1,000',
    '1000_plus': 'More than 1,000'
  },
  areas: {
    release_publishing: 'Releases and store publishing',
    marketing_creatives: 'Marketing creatives and ads',
    support_inbox: 'Support and shared inboxes',
    analytics_reporting: 'Analytics and reporting',
    engineering_qa: 'Engineering, code review and QA',
    sales_crm: 'Sales and CRM',
    content_seo: 'Content and SEO',
    back_office: 'Finance and back office',
    other: 'Other'
  },
  currentState: {
    manual: 'Mostly manual',
    scripts: 'Scripts and integrations',
    ai_tools: 'Chat assistants used ad hoc',
    agents: 'Agents already run parts of it'
  },
  tools: {
    claude_code: 'Claude Code',
    codex: 'Codex',
    cursor: 'Cursor',
    chatgpt: 'ChatGPT or Claude chat',
    other_agents: 'Other agents',
    none: 'None yet'
  },
  currency: { USD: 'USD', EUR: 'EUR', GBP: 'GBP', PLN: 'PLN' },
  mode: {
    self_serve: 'We set it up ourselves',
    guided: 'Guided onboarding with your team',
    done_for_you: 'You build and run it for us'
  },
  hosting: {
    own_machines: 'Our own computers',
    own_cloud: 'Our cloud account',
    passioncode_cloud: 'Hosted by PassionCode.ai',
    undecided: 'Not decided'
  },
  constraints: {
    on_prem: 'Data must stay on our premises',
    eu_residency: 'EU data residency',
    nda: 'NDA before details',
    sso: 'Single sign-on',
    audit_log: 'Audit trail of agent actions'
  },
  monthly: {
    lt_1k: 'Under $1,000 a month',
    '1k_5k': '$1,000–5,000',
    '5k_20k': '$5,000–20,000',
    '20k_50k': '$20,000–50,000',
    '50k_plus': 'More than $50,000',
    unsure: 'Not sure yet'
  },
  setup: {
    lt_5k: 'Under $5,000',
    '5k_20k': '$5,000–20,000',
    '20k_50k': '$20,000–50,000',
    '50k_plus': 'More than $50,000',
    unsure: 'Not sure yet'
  },
  timeline: {
    asap: 'As soon as possible',
    this_quarter: 'This quarter',
    next_quarter: 'Next quarter',
    exploring: 'Exploring for now'
  }
}

// The same answers as the Russian form (/ru/business/) shows them. The values — what the Worker
// stores and the Platform receives — are the English keys above in every language; only the
// visible labels differ. scripts/check-site.mjs asserts each form shows exactly these labels.
export const LEAD_LABELS = {
  en: LEAD_OPTIONS,
  ru: {
    goals: {
      automate_operations: 'Автоматизировать повторяющиеся операции',
      custom_agents: 'Создать агентов под наши процессы',
      convert_agents: 'Адаптировать наших существующих агентов или проекты',
      commercial_license: 'Коммерческая лицензия для закрытого продукта или сервиса',
      managed_hosting: 'Чтобы PassionCode.ai разместил и вёл всё у себя',
      team_onboarding: 'Внедрить и обучить нашу команду'
    },
    industry: {
      mobile_publishing: 'Издание мобильных приложений и игр',
      saas: 'SaaS',
      marketing_agency: 'Маркетинговое или рекламное агентство',
      ecommerce: 'E-commerce и розница',
      fintech: 'Финтех и платежи',
      media_content: 'Медиа и контент',
      dev_studio: 'Студия разработки или аутсорс',
      other: 'Другое'
    },
    size: {
      '1_10': '1–10 человек',
      '11_50': '11–50',
      '51_200': '51–200',
      '201_1000': '201–1 000',
      '1000_plus': 'Больше 1 000'
    },
    areas: {
      release_publishing: 'Релизы и публикация в сторах',
      marketing_creatives: 'Маркетинговые креативы и реклама',
      support_inbox: 'Поддержка и общие почтовые ящики',
      analytics_reporting: 'Аналитика и отчётность',
      engineering_qa: 'Разработка, код-ревью и QA',
      sales_crm: 'Продажи и CRM',
      content_seo: 'Контент и SEO',
      back_office: 'Финансы и бэк-офис',
      other: 'Другое'
    },
    currentState: {
      manual: 'В основном вручную',
      scripts: 'Скрипты и интеграции',
      ai_tools: 'Чат-ассистенты от случая к случаю',
      agents: 'Агенты уже ведут часть работы'
    },
    tools: {
      claude_code: 'Claude Code',
      codex: 'Codex',
      cursor: 'Cursor',
      chatgpt: 'Чат ChatGPT или Claude',
      other_agents: 'Другие агенты',
      none: 'Пока никакие'
    },
    currency: { USD: 'USD', EUR: 'EUR', GBP: 'GBP', PLN: 'PLN' },
    mode: {
      self_serve: 'Настроим сами',
      guided: 'Внедрение вместе с вашей командой',
      done_for_you: 'Вы строите и ведёте всё за нас'
    },
    hosting: {
      own_machines: 'На наших компьютерах',
      own_cloud: 'В нашем облачном аккаунте',
      passioncode_cloud: 'На хостинге PassionCode.ai',
      undecided: 'Пока не решили'
    },
    constraints: {
      on_prem: 'Данные должны оставаться у нас',
      eu_residency: 'Хранение данных в ЕС',
      nda: 'NDA до обсуждения деталей',
      sso: 'Единый вход (SSO)',
      audit_log: 'Журнал действий агентов для аудита'
    },
    monthly: {
      lt_1k: 'До $1 000 в месяц',
      '1k_5k': '$1 000–5 000',
      '5k_20k': '$5 000–20 000',
      '20k_50k': '$20 000–50 000',
      '50k_plus': 'Больше $50 000',
      unsure: 'Пока не знаем'
    },
    setup: {
      lt_5k: 'До $5 000',
      '5k_20k': '$5 000–20 000',
      '20k_50k': '$20 000–50 000',
      '50k_plus': 'Больше $50 000',
      unsure: 'Пока не знаем'
    },
    timeline: {
      asap: 'Как можно скорее',
      this_quarter: 'В этом квартале',
      next_quarter: 'В следующем квартале',
      exploring: 'Пока присматриваемся'
    }
  }
}

// Bumped when the privacy notice changes; a submission records the version it agreed to.
export const PRIVACY_VERSION = '2026-10-05'
// #endregion lead-options
