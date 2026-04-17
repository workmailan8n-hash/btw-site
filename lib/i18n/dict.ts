export type Locale = 'en' | 'uk';

export const dict = {
  en: {
    nav: {
      work: 'work',
      notes: 'notes',
      about: 'about',
      contact: 'contact',
    },
    hero: {
      eyebrow: 'BTW Studio · Open for briefs',
      title: ['We', 'ship', 'apps,', 'by', 'the', 'way.'],
      subheading:
        'A boutique studio shipping AI-native products, web apps and Telegram bots. Ship-grade from day one. Spec on Monday, deploy by Friday.',
      ctaPrimary: 'Start a project →',
      ctaSecondary: 'See our work',
      scroll: 'scroll',
    },
    stats: {
      heading: 'By the numbers',
      items: [
        { label: 'Products shipped', note: 'across 2 years' },
        { label: 'First reply', note: 'usually faster' },
        { label: 'On-time delivery', note: 'since day one' },
        { label: 'Typical timeline', note: 'idea → deploy' },
      ],
    },
    services: {
      heading: 'What we do',
      items: [
        {
          title: 'Product apps',
          body: 'From idea to MVP in weeks. Discovery → design → shipping MVP with real users.',
        },
        {
          title: 'Web apps',
          body: 'Full-stack Next.js dashboards, internal tools, marketing sites. Ship-grade from day one.',
        },
        {
          title: 'AI integrations',
          body: 'RAG, evals, agents, tool-use. We bring working prototypes to the second call.',
        },
        {
          title: 'Telegram bots',
          body: 'Conversational + flow bots. Payments, admin, multi-step funnels. End-to-end.',
        },
      ],
      timeline: 'Timeline',
      starting: 'Starting',
      fineprint:
        '* Timelines and pricing are indicative — final estimate depends on scope, integrations and team size after discovery call.',
    },
    toolbox: {
      heading: 'Toolbox',
      counter: 'tools we ship with',
    },
    work: {
      heading: 'Selected work',
      counterOne: 'shown',
      counterTwo: 'under NDA',
      colYear: 'Year',
      colProject: 'Project',
      colStack: 'Stack',
      colStatus: 'Status',
      hoverHint: '← hover a project',
      statusLive: 'Live',
      statusNda: 'NDA',
      statusArchived: 'Archived',
      tags: {
        'Pixel-art agent visualizer': 'Pixel-art agent visualizer',
        'AI course generator': 'AI course generator',
        'Stealth · internal tool': 'Stealth · internal tool',
        'Stealth · AI infra': 'Stealth · AI infra',
        'Multi-platform publisher': 'Multi-platform publisher',
        'Building in public': 'Building in public',
      } as Record<string, string>,
    },
    process: {
      heading: 'How we work',
      steps: [
        { title: 'Discover', body: 'Research, define scope, stakeholders.' },
        { title: 'Design', body: 'Wireframes, prototypes, motion spec.' },
        { title: 'Build', body: 'Sprint-based development, daily commits.' },
        { title: 'Ship', body: 'Deploy, test, launch.' },
      ],
    },
    contactCTA: {
      heading: ['Have an idea?', "Let's talk."],
      formLink: 'Or use the',
      formLinkText: 'contact form →',
    },
    footer: {
      tagline: 'By The Way Studio · 2024–2026 · crafted by',
    },
    contact: {
      hero: ['Tell us about', 'your project.'],
      intro:
        'We read every message. If it is a fit, you hear back within 24 hours with next steps.',
      sidebarHeading: 'Or reach us directly',
      email: 'EMAIL',
      telegram: 'TELEGRAM',
      reply: 'We reply within 24h. Usually faster.',
      form: {
        name: 'Name',
        email: 'Email',
        projectType: 'Project type',
        budget: 'Budget',
        message: 'Message',
        send: 'Send →',
        sending: 'Sending…',
        replyNote: 'We reply within 24h',
        namePlaceholder: 'Ada Lovelace',
        emailPlaceholder: 'you@domain.com',
        messagePlaceholder:
          'What are you building? What is the timeline? What would a good outcome look like?',
        types: { web: 'Web app', ai: 'AI integration', bot: 'Telegram bot', other: 'Other' },
        budgets: { tbd: 'TBD', '<5k': '< $5k', '5-20k': '$5–20k', '20k+': '$20k+' },
      },
      success: {
        badge: '✓ Sent',
        heading: "Got it. We'll be in touch.",
        body: 'We received your request and will reply to your email within 24 hours.',
        tgButton: 'Open @btw_aitech →',
      },
      error: {
        heading: 'Something went wrong.',
        body: 'Please try again or email us directly at hello@btw.studio.',
      },
    },
    notes: {
      eyebrow: 'Notes · case studies',
      heading: 'Projects, in detail.',
      intro:
        'Every case study below is a deployed artefact. We write up the constraints, the stack decisions, and the numbers that actually shipped. No slide-ware.',
      statsLabels: {
        shipped: 'Case studies',
        live: 'In production',
        nda: 'Under NDA',
        years: 'Years of work',
      },
      readCase: 'Read case →',
      backToNotes: 'Back to case studies',
      byTheNumbers: 'By the numbers',
      stack: 'Stack',
      role: 'Role',
      openProject: 'Open project ↗',
      ctaHeading: 'Have a similar project?',
      ctaBody: 'We reply within 24 hours. Usually faster.',
    },
    about: {
      heading: 'About',
      manifestoHeading: 'We build software that actually ships.',
      manifesto: [
        'BTW is a small studio focused on AI tools, web apps and Telegram bots. We do not do vanity projects. We build in public, ship fast, and document everything.',
        'Our process is transparent by default — the @btw_aitech channel is our public diary. Every decision, every stack choice, every bug — gets written down. Works as a forcing function and doubles as documentation.',
        'We use Claude Code, MCPs, Ollama, and whatever else gets us to a shipped artefact fastest. No ceremony, no decks, no waterfalls — just a short spec and a deploy URL at the end of the week.',
      ],
      timelineHeading: 'Timeline',
      timeline: [
        {
          year: '2024',
          label: 'First projects',
          body: 'Agent Dashboard, CourseAI. Figuring out the shape of the studio.',
        },
        {
          year: '2025',
          label: '@btw_aitech launched',
          body: 'Building in public begins. Cross-platform content pipeline starts.',
        },
        {
          year: '2026',
          label: 'BTW Studio officially opens',
          body: 'This site ships. Contact form live. First external briefs land.',
        },
      ],
      stackHeading: 'Our stack',
      ctaHeading: 'Want to work together?',
      ctaPrimary: 'Start a project →',
      ctaSecondary: 'Telegram → @btw_aitech',
    },
  },
  uk: {
    nav: {
      work: 'роботи',
      notes: 'нотатки',
      about: 'про нас',
      contact: 'контакт',
    },
    hero: {
      eyebrow: 'BTW Studio · відкриті для брифів',
      title: ['Ми', 'робимо', 'апки.', 'Між', 'іншим.'],
      subheading:
        'Бутикова студія, що релізить AI-native продукти, веб-застосунки та Telegram-ботів. Готове до продакшну з першого дня. Спека в понеділок, деплой у п\u2019ятницю.',
      ctaPrimary: 'Розпочати проєкт →',
      ctaSecondary: 'Наші роботи',
      scroll: 'далі',
    },
    stats: {
      heading: 'У цифрах',
      items: [
        { label: 'Продуктів зарелізено', note: 'за 2 роки' },
        { label: 'Перша відповідь', note: 'зазвичай швидше' },
        { label: 'Реліз у строк', note: 'з першого дня' },
        { label: 'Типовий термін', note: 'ідея → деплой' },
      ],
    },
    services: {
      heading: 'Що ми робимо',
      items: [
        {
          title: 'Продуктові апки',
          body: 'Від ідеї до MVP за тижні. Дискавері → дизайн → реліз MVP з реальними користувачами.',
        },
        {
          title: 'Веб-застосунки',
          body: 'Full-stack Next.js дашборди, внутрішні тули, маркетингові сайти. Продакшн-якість з першого дня.',
        },
        {
          title: 'AI-інтеграції',
          body: 'RAG, evals, агенти, tool-use. Робочий прототип ми приносимо на другий дзвінок.',
        },
        {
          title: 'Telegram-боти',
          body: 'Розмовні + flow-боти. Оплати, адмінка, багатокрокові воронки. End-to-end.',
        },
      ],
      timeline: 'Термін',
      starting: 'Від',
      fineprint:
        '* Терміни й ціни орієнтовні — фінальна оцінка залежить від скоупу, інтеграцій та розміру команди після дискавері-дзвінка.',
    },
    toolbox: {
      heading: 'Стек',
      counter: 'інструментів у роботі',
    },
    work: {
      heading: 'Вибрані роботи',
      counterOne: 'показано',
      counterTwo: 'під NDA',
      colYear: 'Рік',
      colProject: 'Проєкт',
      colStack: 'Стек',
      colStatus: 'Статус',
      hoverHint: '← наведіть на проєкт',
      statusLive: 'Live',
      statusNda: 'NDA',
      statusArchived: 'В архіві',
      tags: {
        'Pixel-art agent visualizer': 'Піксель-арт візуалізатор агентів',
        'AI course generator': 'AI-генератор курсів',
        'Stealth · internal tool': 'Stealth · внутрішній тул',
        'Stealth · AI infra': 'Stealth · AI-інфра',
        'Multi-platform publisher': 'Мультиплатформений паблішер',
        'Building in public': 'Building in public',
      } as Record<string, string>,
    },
    process: {
      heading: 'Як ми працюємо',
      steps: [
        { title: 'Дискавері', body: 'Ресьорч, скоуп, зацікавлені сторони.' },
        { title: 'Дизайн', body: 'Вайрфрейми, прототипи, моушн-спека.' },
        { title: 'Розробка', body: 'Спринти, коміти щодня.' },
        { title: 'Реліз', body: 'Деплой, тести, запуск.' },
      ],
    },
    contactCTA: {
      heading: ['Є ідея?', 'Поговорімо.'],
      formLink: 'Або скористайтесь',
      formLinkText: 'контакт-формою →',
    },
    footer: {
      tagline: 'By The Way Studio · 2024–2026 · зроблено',
    },
    contact: {
      hero: ['Розкажіть про', 'ваш проєкт.'],
      intro:
        'Ми читаємо кожне повідомлення. Якщо підходимо — відповідаємо за 24 години з наступними кроками.',
      sidebarHeading: 'Або напряму',
      email: 'EMAIL',
      telegram: 'TELEGRAM',
      reply: 'Відповідаємо за 24 год. Зазвичай швидше.',
      form: {
        name: 'Імʼя',
        email: 'Email',
        projectType: 'Тип проєкту',
        budget: 'Бюджет',
        message: 'Повідомлення',
        send: 'Надіслати →',
        sending: 'Надсилаємо…',
        replyNote: 'Відповідаємо за 24 год',
        namePlaceholder: 'Ада Лавлейс',
        emailPlaceholder: 'you@domain.com',
        messagePlaceholder: 'Що будуєте? Який термін? Як виглядає добрий результат?',
        types: { web: 'Веб-апка', ai: 'AI-інтеграція', bot: 'Telegram-бот', other: 'Інше' },
        budgets: { tbd: 'TBD', '<5k': '< $5k', '5-20k': '$5–20k', '20k+': '$20k+' },
      },
      success: {
        badge: '✓ Надіслано',
        heading: 'Отримали. Будемо на звʼязку.',
        body: 'Ми отримали ваш запит і відповімо на email протягом 24 годин.',
        tgButton: 'Відкрити @btw_aitech →',
      },
      error: {
        heading: 'Щось пішло не так.',
        body: 'Спробуйте ще раз або напишіть напряму на hello@btw.studio.',
      },
    },
    notes: {
      eyebrow: 'Нотатки · кейси',
      heading: 'Проєкти, у деталях.',
      intro:
        'Кожен кейс нижче — це задеплоєний артефакт. Ми описуємо обмеження, рішення стеку та цифри, які реально зарелізились. Без слайдвейру.',
      statsLabels: {
        shipped: 'Кейсів',
        live: 'У продакшні',
        nda: 'Під NDA',
        years: 'Років роботи',
      },
      readCase: 'Читати кейс →',
      backToNotes: 'Назад до кейсів',
      byTheNumbers: 'У цифрах',
      stack: 'Стек',
      role: 'Роль',
      openProject: 'Відкрити проєкт ↗',
      ctaHeading: 'Є подібний проєкт?',
      ctaBody: 'Відповідаємо за 24 години. Зазвичай швидше.',
    },
    about: {
      heading: 'Про нас',
      manifestoHeading: 'Ми робимо софт, який реально релізиться.',
      manifesto: [
        'BTW — маленька студія, сфокусована на AI-тулах, веб-застосунках і Telegram-ботах. Ми не робимо vanity-проєктів. Ми будуємо публічно, релізимось швидко і документуємо все.',
        'Наш процес прозорий за замовчуванням — канал @btw_aitech це наш публічний щоденник. Кожне рішення, кожен вибір стека, кожен баг — записуються. Працює як forcing function і подвійно служить документацією.',
        'Ми використовуємо Claude Code, MCPs, Ollama та будь-що, що доведе до задеплоєного артефакту найшвидше. Без церемоній, без колод, без водоспадів — коротка спека і deploy-URL до кінця тижня.',
      ],
      timelineHeading: 'Таймлайн',
      timeline: [
        {
          year: '2024',
          label: 'Перші проєкти',
          body: 'Agent Dashboard, CourseAI. Зʼясовуємо форму студії.',
        },
        {
          year: '2025',
          label: '@btw_aitech стартує',
          body: 'Починається building in public. Крос-платформений контент-пайплайн.',
        },
        {
          year: '2026',
          label: 'BTW Studio офіційно відкривається',
          body: 'Цей сайт релізиться. Контакт-форма в роботі. Перші зовнішні брифи.',
        },
      ],
      stackHeading: 'Наш стек',
      ctaHeading: 'Попрацюємо разом?',
      ctaPrimary: 'Розпочати проєкт →',
      ctaSecondary: 'Telegram → @btw_aitech',
    },
  },
};

export type Dict = typeof dict.en;
