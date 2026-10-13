/**
 * Боженко Илья — Портфолио AI-DevOps & AI-Инженера
 * Полная интерактивная логика (SPA-роутер, смена цветовых тем, перетаскиваемые IDE-панели,
 * проекты и подробные кейсы, фильтрация компетенций, карусель специализаций, московское время).
 */
(function () {
  'use strict';

  // Генератор стильных SVG-обложек в эстетике терминала/IDE для проектов и карточек
  function makeTerminalCover(title, subtitle, accentColor, lines) {
    const codeLines = (lines || [])
      .map(
        (line, idx) =>
          `<text x="70" y="${230 + idx * 42}" fill="#9ca3af" font-family="monospace" font-size="22"><tspan fill="#4b5563">${String(idx + 1).padStart(2, '0')}</tspan>  ${line}</text>`
      )
      .join('');

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1250 703" width="1250" height="703">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0b0f17"/>
          <stop offset="100%" stop-color="#151c28"/>
        </linearGradient>
        <radialGradient id="glow" cx="80%" cy="20%" r="60%">
          <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="${accentColor}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1250" height="703" fill="url(#bg)"/>
      <rect width="1250" height="703" fill="url(#glow)"/>
      <rect x="40" y="40" width="1170" height="623" rx="14" fill="#0f141d" stroke="#263042" stroke-width="2"/>
      <line x1="40" y1="100" x2="1210" y2="100" stroke="#263042" stroke-width="2"/>
      <circle cx="76" cy="70" r="8" fill="#ef4444" opacity="0.8"/>
      <circle cx="102" cy="70" r="8" fill="#f59e0b" opacity="0.8"/>
      <circle cx="128" cy="70" r="8" fill="#10b981" opacity="0.8"/>
      <text x="165" y="77" fill="#9ca3af" font-family="monospace" font-size="20">${title} — ${subtitle}</text>
      <text x="70" y="165" fill="${accentColor}" font-family="monospace" font-weight="bold" font-size="34">$ ${title}</text>
      ${codeLines}
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  // ==================== ДАННЫЕ: ПРОЕКТЫ ====================
  const PROJECTS = [
    {
      slug: 'git-incident-pilot',
      title: 'git-incident-pilot',
      year: '2025–2026',
      deckBg: '#101820',
      cover: makeTerminalCover('git-incident-pilot', 'CLI AI-Incident Resolver', '#00dc82', [
        'git-incident-pilot analyze --log /var/log/app/error.log',
        '[LLM API] Разбор стектрейса и локализация причины сбоя...',
        '[Root Cause] Timeout в пуле соединений при пиковой нагрузке',
        '[Git Patch] Сформирован коммит fix(pool): retry & backoff policy',
        '[CI Check] Тесты пройдены успешно, ветка готова к merge'
      ]),
      tags: ['python', 'cli', 'llm-api', 'git', 'devops'],
      client: 'Open Source / Проектная разработка',
      role: 'Инженер по ИИ-автоматизации и DevOps',
      websiteUrl: 'https://github.com/Spizhy',
      summary: 'CLI-инструмент для автоматического разбора логов инцидентов и формирования коммитов с исправлениями через LLM API.',
      description: [
        'Разработал CLI-утилиту <span class="g">git-incident-pilot</span> для автоматического анализа логов сбоев, стектрейсов и ошибок пайплайнов.',
        'Инструмент обращается к <span class="b">LLM API (OpenAI GPT-4o / Claude / Gemini)</span>, сопоставляет лог инцидента с историей изменений в репозитории <span class="y">Git</span> и автоматически формирует патч и осмысленный коммит с исправлением.',
        'Сокращает время первичной диагностики (<span class="r">MTTR</span>) и легко встраивается в <span class="p">GitHub Actions</span> и <span class="a">GitLab CI</span>.'
      ],
      showcase: [
        {
          src: makeTerminalCover('git-incident-pilot', '1. Парсинг логов и контекста Git', '#00dc82', [
            '$ git-incident-pilot inspect --since "2 hours ago"',
            '-> Сбор логов контейнеров Docker и последних diff коммитов',
            '-> Фильтрация шума и выделение критических исключений',
            '-> Формирование структурированного промпта для LLM API'
          ]),
          alt: 'Парсинг логов и контекста Git'
        },
        {
          src: makeTerminalCover('git-incident-pilot', '2. Генерация патча и авто-коммита', '#38bdf8', [
            '$ git-incident-pilot fix --auto-commit --model gpt-4o',
            '-> Валидация предложенного диффа и синтаксиса кода',
            '-> Создание ветки hotfix/incident-auto-patch',
            '-> Commit: "fix: handle async timeout in worker queue"'
          ]),
          alt: 'Генерация патча и авто-коммита'
        }
      ]
    },
    {
      slug: 'omni-brand-copilot',
      title: 'omni-brand-copilot',
      year: '2025–2026',
      deckBg: '#16192b',
      cover: makeTerminalCover('omni-brand-copilot', 'FastAPI Brand Guardrails Service', '#60a5fa', [
        'POST /api/v1/generate-content HTTP/1.1 (FastAPI)',
        '[Brand Rules] Загрузка tone-of-voice и стоп-слов бренда',
        '[LLM Engine] Генерация контента через мультимодельный пайплайн',
        '[Validator] Проверка ограничений, фактов и стилистики: PASSED',
        '200 OK — Контент соответствует регламенту бренда (score: 0.98)'
      ]),
      tags: ['fastapi', 'python', 'openai-api', 'claude-api', 'docker'],
      client: 'Проектная разработка',
      role: 'AI Backend & DevOps Инженер',
      websiteUrl: 'https://github.com/Spizhy',
      summary: 'Сервис на FastAPI для генерации маркетингового контента с проверкой ограничений и стилистики по правилам бренда.',
      description: [
        'Спроектировал высокопроизводительный бэкенд-сервис <span class="b">omni-brand-copilot</span> на базе <span class="g">FastAPI</span> для автоматизированной подготовки маркетинговых материалов.',
        'Реализовал многоступенчатую систему <span class="r">валидации ответов нейросетей</span>: каждый сгенерированный текст проверяется на соблюдение ограничений, редполитики и стилистики конкретного бренда.',
        'Сервис упакован в <span class="p">Docker-контейнер</span>, поддерживает переключение между <span class="y">OpenAI API, Anthropic Claude и Google Gemini</span> и готов к горизонтальному масштабированию.'
      ],
      showcase: [
        {
          src: makeTerminalCover('omni-brand-copilot', 'FastAPI Архитектура и валидация', '#60a5fa', [
            'app = FastAPI(title="Omni Brand Copilot")',
            '@app.post("/v1/copilot/generate")',
            'async def generate(payload: BrandRequest):',
            '    draft = await llm_router.complete(payload)',
            '    return await brand_guardrails.validate_and_refine(draft)'
          ]),
          alt: 'FastAPI Архитектура и валидация'
        }
      ]
    },
    {
      slug: 'market-radar-bot',
      title: 'market-radar-bot',
      year: '2025–2026',
      deckBg: '#1c1624',
      cover: makeTerminalCover('market-radar-bot', 'Telegram & Slack Market Analytics', '#f59e0b', [
        '[Scheduler] Сбор рыночных котировок, новостей и метрик...',
        '[Pandas / NumPy] Агрегация временных рядов и расчёт отклонений',
        '[LLM Digest] Формирование аналитической сводки за 24 часа',
        '[Dispatcher] Отправка отчёта в каналы Telegram и Slack',
        'Status: Доставлено в 12 рабочих пространств (latency 420ms)'
      ]),
      tags: ['python', 'telegram-bot', 'slack-bot', 'pandas', 'numpy', 'llm'],
      client: 'Проектная разработка',
      role: 'AI-Инженер / Разработчик ботов',
      websiteUrl: 'https://github.com/Spizhy',
      summary: 'Бот для платформ Telegram и Slack, собирающий рыночные данные и генерирующий аналитические сводки.',
      description: [
        'Создал кроссплатформенного бота <span class="y">market-radar-bot</span> для мессенджеров <span class="b">Telegram</span> и <span class="p">Slack</span>, автоматизирующего мониторинг рынка.',
        'Для статистической обработки данных и расчёта метрик используются <span class="g">NumPy и Pandas</span>, после чего <span class="r">LLM-модель</span> формирует структурированные аналитические сводки без информационного шума.'
      ],
      showcase: [
        {
          src: makeTerminalCover('market-radar-bot', 'Пайплайн аналитики Telegram & Slack', '#f59e0b', [
            'df = pd.DataFrame(raw_market_Stream)',
            'metrics = compute_volatility_and_trends(df)',
            'summary = await llm.summarize_market_digest(metrics)',
            'await asyncio.gather(tg_bot.send(summary), slack_bot.post(summary))'
          ]),
          alt: 'Пайплайн аналитики Telegram & Slack'
        }
      ]
    },
    {
      slug: 'triage-flow-worker',
      title: 'triage-flow-worker',
      year: '2025–2026',
      deckBg: '#191326',
      cover: makeTerminalCover('triage-flow-worker', 'Async Ticket Queue & RAG Validation', '#c084fc', [
        '[Queue Worker] Получен тикет #4821: "Ошибка авторизации SSO"',
        '[RAG Pipeline] Поиск релевантных регламентов в векторной базе...',
        '[Anti-Hallucination] Сверка ответа с базой знаний (strict mode)',
        '[Routing] Приоритет: HIGH | Назначена группа: Infra-Sec',
        '[Result] Сформирован проверенный черновик ответа по регламенту'
      ]),
      tags: ['python', 'rag', 'async-queue', 'anti-hallucination', 'fastapi'],
      client: 'Проектная разработка',
      role: 'AI-Инженер (RAG & Backend)',
      websiteUrl: 'https://github.com/Spizhy',
      summary: 'Сервис с асинхронной очередью тикетов поддержки и RAG-валидацией регламентов против галлюцинаций.',
      description: [
        'Реализовал фоновый воркер и сервис <span class="p">triage-flow-worker</span> с асинхронной очередью обработки обращений технической поддержки.',
        'Внедрил <span class="g">RAG-пайплайн (Retrieval-Augmented Generation)</span> со строгой проверкой ответов по внутренним регламентам компании для <span class="r">защиты от галлюцинаций нейросетей</span>.'
      ],
      showcase: [
        {
          src: makeTerminalCover('triage-flow-worker', 'RAG-валидация регламентов', '#c084fc', [
            'docs = await vector_store.retrieve(ticket.query, top_k=5)',
            'answer = await rag_chain.generate_grounded(ticket, docs)',
            'is_valid = await hallucination_guard.verify(answer, docs)',
            'if is_valid: await queue.ack_and_dispatch(ticket.id, answer)'
          ]),
          alt: 'RAG-валидация регламентов'
        }
      ]
    },
    {
      slug: 'devops-ci-cd-pipelines',
      title: 'Docker & CI/CD Infrastructure',
      year: '2025–2026',
      deckBg: '#0f1f22',
      cover: makeTerminalCover('devops-ci-cd', 'Docker • Kubernetes • GitHub Actions', '#2dd4bf', [
        'name: CI/CD Verify & Build Containers',
        'on: [push, pull_request]',
        'jobs:',
        '  lint-and-test: ruff check . && pytest --maxfail=1',
        '  docker-build: docker compose build && trivy image scan'
      ]),
      tags: ['docker', 'docker-compose', 'kubernetes', 'github-actions', 'gitlab-ci', 'linux', 'nginx'],
      client: 'Инфраструктура репозиториев',
      role: 'DevOps-инженер',
      websiteUrl: 'https://github.com/Spizhy',
      summary: 'Настройка Docker-контейнеров, оркестрации и пайплайнов GitHub Actions / GitLab CI для автоматической проверки кода и сборки образов.',
      description: [
        'Стандартизировал контейнеризацию AI- и бэкенд-сервисов с помощью многоступенчатых <span class="b">Dockerfile</span> и <span class="g">Docker Compose</span>.',
        'Настроил пайплайны <span class="y">GitHub Actions</span> и <span class="p">GitLab CI</span> для автоматического линтинга, прогона тестов и сборки образов при каждом коммите, а также деплой на облачные серверы (<span class="a">GCP, AWS, VPS</span>) под управлением <span class="r">Linux и Nginx</span>.'
      ],
      showcase: [
        {
          src: makeTerminalCover('devops-ci-cd', 'Multi-stage Docker & CI/CD Pipeline', '#2dd4bf', [
            'FROM python:3.12-slim AS runtime',
            'COPY --from=builder /app/wheels /wheels',
            'RUN pip install --no-cache /wheels/*',
            'CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]'
          ]),
          alt: 'Multi-stage Docker & CI/CD Pipeline'
        }
      ]
    }
  ];

  // ==================== ДАННЫЕ: НАВЫКИ, ОПЫТ И ДОСТИЖЕНИЯ ====================
  const ACHIEVEMENTS = [
    {
      title: 'git-incident-pilot',
      category: 'open-source',
      year: '2025–2026',
      org: 'CLI • LLM API • Git',
      project: 'Автоматический разбор логов инцидентов и формирование коммитов с исправлениями через LLM API',
      image: makeTerminalCover('git-incident-pilot', 'Open Source CLI', '#00dc82', [
        'Анализ логов инцидентов',
        'Генерация Git-коммитов с фиксом',
        'Интеграция с LLM API'
      ]),
      url: 'https://github.com/Spizhy'
    },
    {
      title: 'omni-brand-copilot',
      category: 'open-source',
      year: '2025–2026',
      org: 'FastAPI • AI Guardrails',
      project: 'Генерация маркетингового контента с проверкой ограничений и стилистики по правилам бренда',
      image: makeTerminalCover('omni-brand-copilot', 'FastAPI Service', '#60a5fa', [
        'FastAPI REST & Async',
        'Контроль правил и тона бренда',
        'Защита от нарушений редполитики'
      ]),
      url: 'https://github.com/Spizhy'
    },
    {
      title: 'market-radar-bot',
      category: 'open-source',
      year: '2025–2026',
      org: 'Telegram & Slack • Data',
      project: 'Сбор рыночных данных и генерация аналитических сводок для команд в Telegram и Slack',
      image: makeTerminalCover('market-radar-bot', 'Telegram & Slack', '#f59e0b', [
        'Мониторинг рыночных метрик',
        'Обработка на NumPy и Pandas',
        'Аналитические LLM-дайджесты'
      ]),
      url: 'https://github.com/Spizhy'
    },
    {
      title: 'triage-flow-worker',
      category: 'open-source',
      year: '2025–2026',
      org: 'Async Queue • RAG',
      project: 'Асинхронная очередь тикетов поддержки с RAG-валидацией регламентов против галлюцинаций',
      image: makeTerminalCover('triage-flow-worker', 'RAG Worker', '#c084fc', [
        'Асинхронная очередь тикетов',
        'RAG-валидация по базе знаний',
        'Защита от галлюцинаций LLM'
      ]),
      url: 'https://github.com/Spizhy'
    },
    {
      title: 'OpenAI, Claude & Gemini API',
      category: 'ai-ml',
      year: 'AI / LLM',
      org: 'GPT-4o • Claude • Gemini',
      project: 'Промышленная интеграция современных LLM в бэкенд-сервисы и пайплайны автоматизации',
      image: makeTerminalCover('LLM Integration', 'GPT-4o / Claude / Gemini', '#34d399', [
        'OpenAI API (GPT-4o)',
        'Anthropic Claude API',
        'Google Gemini API'
      ]),
      url: 'https://github.com/Spizhy'
    },
    {
      title: 'RAG и защита от галлюцинаций',
      category: 'ai-ml',
      year: 'AI / RAG',
      org: 'RAG Pipelines • Validation',
      project: 'Построение RAG-пайплайнов и строгая валидация ответов нейросетей по регламентам',
      image: makeTerminalCover('RAG Pipelines', 'Anti-Hallucination', '#a78bfa', [
        'Retrieval-Augmented Generation',
        'Проверка фактов по регламентам',
        'NumPy & Pandas анализ данных'
      ]),
      url: 'https://github.com/Spizhy'
    },
    {
      title: 'Docker, Compose & Kubernetes',
      category: 'devops',
      year: 'DevOps',
      org: 'Контейнеризация и оркестрация',
      project: 'Упаковка микросервисов в изолированные контейнеры, настройка Docker Compose и Kubernetes',
      image: makeTerminalCover('Containers & K8s', 'Docker • Kubernetes', '#38bdf8', [
        'Docker & Docker Compose',
        'Kubernetes кластеры и поды',
        'Оптимизация образов'
      ]),
      url: 'https://github.com/Spizhy'
    },
    {
      title: 'GitHub Actions & GitLab CI',
      category: 'devops',
      year: 'CI / CD',
      org: 'Автоматизация пайплайнов',
      project: 'Автоматическая проверка кода, прогон тестов и сборка Docker-образов в репозиториях Git',
      image: makeTerminalCover('CI/CD Pipelines', 'GitHub Actions • GitLab CI', '#f43f5e', [
        'Автоматическая проверка кода',
        'Сборка и публикация образов',
        'Git-воркфлоу и контроль версий'
      ]),
      url: 'https://github.com/Spizhy'
    },
    {
      title: 'GCP, AWS, VPS, Linux & Nginx',
      category: 'devops',
      year: 'Cloud & Infra',
      org: 'Облачные платформы и серверы',
      project: 'Развёртывание и администрирование сервисов в Google Cloud Platform, AWS и на Linux VPS с Nginx',
      image: makeTerminalCover('Cloud & Linux', 'GCP • AWS • Nginx', '#2dd4bf', [
        'Google Cloud Platform & AWS',
        'Администрирование Linux / VPS',
        'Reverse-proxy и балансировка Nginx'
      ]),
      url: 'https://github.com/Spizhy'
    },
    {
      title: 'ГБПОУ «КАИТ №20»',
      category: 'education',
      year: 'Выпуск 2027',
      org: 'Применение решений с использованием ИИ',
      project: 'Профильное образование в области искусственного интеллекта и разработки программных систем (Москва)',
      image: makeTerminalCover('КАИТ №20', 'Факультет ИИ • 2027', '#fbbf24', [
        'ГБПОУ «КАИТ №20», г. Москва',
        'Применение решений с ИИ',
        'Год окончания: 2027'
      ]),
      url: '#about'
    },
    {
      title: 'Python, FastAPI, C#, C++, React',
      category: 'education',
      year: 'Core Stack',
      org: 'Языки программирования и фреймворки',
      project: 'Разработка бэкенд-сервисов на Python/FastAPI, системных модулей на C#/C++ и интерфейсов на React',
      image: makeTerminalCover('Languages', 'Python • C# • C++ • React', '#818cf8', [
        'Python & FastAPI (Backend / AI)',
        'C# & C++ (System / OOP)',
        'React (Frontend UI)'
      ]),
      url: 'https://github.com/Spizhy'
    }
  ];

  // ==================== ДАННЫЕ: КЛЮЧЕВЫЕ НАПРАВЛЕНИЯ (КАРУСЕЛЬ) ====================
  const SPECIALIZATIONS = [
    {
      id: 'focus-ai-devops-automation',
      name: 'AI-DevOps и автоматизация инцидентов',
      role: 'Docker • Kubernetes • GitHub Actions • GitLab CI',
      badge: '⚙️',
      link: 'https://github.com/Spizhy',
      paragraphs: [
        'Автоматизирую <span class="g">процессы разработки и доставки кода</span> с помощью <span class="b">Docker, Docker Compose, Kubernetes</span> и пайплайнов <span class="p">GitHub Actions / GitLab CI</span>.',
        'Создаю инструменты вроде <span class="r">git-incident-pilot</span>, которые объединяют классический DevOps с возможностями <span class="y">LLM API</span> для мгновенного разбора логов и формирования коммитов с исправлениями.'
      ]
    },
    {
      id: 'focus-llm-rag-backend',
      name: 'Интеграция LLM и защита от галлюцинаций',
      role: 'FastAPI • OpenAI GPT-4o • Claude • Gemini • RAG',
      badge: '🧠',
      link: 'https://github.com/Spizhy',
      paragraphs: [
        'Проектирую асинхронные сервисы на <span class="b">Python и FastAPI</span> (<span class="g">omni-brand-copilot</span>, <span class="p">triage-flow-worker</span>) с интеграцией <span class="y">OpenAI API (GPT-4o), Anthropic Claude и Google Gemini</span>.',
        'Особое внимание уделяю <span class="r">валидации ответов нейросетей против галлюцинаций</span> и проверке сгенерированного контента по регламентам через <span class="a">RAG-пайплайны</span>.'
      ]
    },
    {
      id: 'focus-bots-and-cloud',
      name: 'Боты для Telegram/Slack и облачная инфраструктура',
      role: 'GCP • AWS • VPS • Linux • Nginx • Pandas/NumPy',
      badge: '🚀',
      link: 'https://github.com/Spizhy',
      paragraphs: [
        'Разрабатываю аналитических и операционных ботов для <span class="g">Telegram и Slack</span> (<span class="y">market-radar-bot</span>) с обработкой данных на <span class="b">NumPy и Pandas</span>.',
        'Разворачиваю и поддерживаю инфраструктуру в <span class="p">Google Cloud Platform, AWS и на VPS</span> под управлением <span class="a">Linux и Nginx</span>.'
      ]
    }
  ];

  // ==================== КОНФИГУРАЦИЯ МАРШРУТОВ ====================
  const ROUTE_CONFIG = {
    home: {
      theme: 'darkGreen',
      word: 'ai-devops',
      title: 'Боженко Илья | AI-DevOps & AI-Инженер',
      breadcrumbs: [{ label: 'Home', route: 'home' }]
    },
    about: {
      theme: 'darkBlue',
      word: 'bozhenko',
      title: 'Обо мне | Боженко Илья',
      breadcrumbs: [
        { label: 'Home', route: 'home' },
        { label: 'About', route: 'about' }
      ]
    },
    work: {
      theme: 'darkRed',
      word: 'projects',
      title: 'Проекты | Боженко Илья',
      breadcrumbs: [
        { label: 'Home', route: 'home' },
        { label: 'Work', route: 'work' }
      ]
    },
    achievements: {
      theme: 'darkYellow',
      word: 'skills',
      title: 'Навыки и опыт | Боженко Илья',
      breadcrumbs: [
        { label: 'Home', route: 'home' },
        { label: 'Skills', route: 'achievements' }
      ]
    },
    contact: {
      theme: 'darkAqua',
      word: 'contact',
      title: 'Контакты | Боженко Илья',
      breadcrumbs: [
        { label: 'Home', route: 'home' },
        { label: 'Contact', route: 'contact' }
      ]
    }
  };

  let currentRoute = 'home';
  let activeTheme = 'darkGreen';

  // ==================== РЕНДЕР КАРТОЧЕК ПРОЕКТОВ ====================
  function createHomeHighlightItemHTML(project, idx) {
    const indexStr = String(idx + 1).padStart(2, '0');
    const tagsHTML = project.tags
      .map((tag) => `<div class="text-xs leading-none tag-pill">${tag}</div>`)
      .join('');

    return `
      <a href="#work/${project.slug}" data-route="work/${project.slug}" class="project-link block">
        <article class="group/project project-item relative mt-10 justify-between gap-4 rounded border border-base-300 glossy-25 p-8 text-sm font-medium transition-[gap] md:gap-y-3 xl:mt-0 xl:px-8 xl:py-20 xl:hover:gap-x-0">
          <div class="transition-[width,opacity] [grid-area:index] md:w-5 md:pt-1 xl:group-hover/project:w-0 xl:group-hover/project:opacity-0">${indexStr}</div>
          <h3 class="title-3 [grid-area:title] group-hover/project:text-primary transition-colors">${project.title}</h3>
          <div class="flex gap-0 justify-self-end transition-[gap] [grid-area:year] xl:group-hover/project:gap-2">
            <div>${project.year}</div>
            <svg xmlns="http://www.w3.org/2000/svg" class="iconify iconify--lucide mt-px w-0 text-neutral transition-[width] xl:group-hover/project:w-4" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10v10M7 17L17 7"/></svg>
          </div>
          <div class="flex flex-wrap gap-2 [grid-area:tags]">
            ${tagsHTML}
          </div>
          <div class="group/deck relative aspect-video z-10 -mx-4 -mt-20 mb-4 transition-[scale,opacity] [grid-area:image] group-hover/project:scale-100 group-hover/project:opacity-100 sm:mr-0 sm:mb-0 sm:ml-auto sm:w-9/12 md:w-8/12 lg:mr-16 lg:w-6/12 xl:absolute xl:top-[45%] xl:left-2/3 xl:m-0 xl:h-full xl:w-auto xl:-translate-1/2 xl:scale-75 xl:opacity-0">
            <div class="hidden xl:block opacity-15 card-deck" style="background-color:${project.deckBg};"></div>
            <div class="hidden xl:block opacity-30 xl:group-hover/deck:-rotate-1 card-deck" style="background-color:${project.deckBg};"></div>
            <div class="hidden xl:block opacity-45 xl:group-hover/deck:-rotate-2 card-deck" style="background-color:${project.deckBg};"></div>
            <div class="hidden xl:block opacity-60 xl:group-hover/deck:-rotate-3 card-deck" style="background-color:${project.deckBg};"></div>
            <div class="hidden xl:block opacity-75 xl:group-hover/deck:rotate-[-4deg] card-deck" style="background-color:${project.deckBg};"></div>
            <img width="480" height="270" class="card-deck sm:-rotate-3 xl:rotate-0 xl:group-hover/deck:rotate-[-5deg]" alt="${project.title}" src="${project.cover}">
          </div>
        </article>
      </a>
    `;
  }

  function createProjectCardHTML(project) {
    const tagsHTML = project.tags
      .map(
        (tag) =>
          `<li class="rounded border border-base-300 bg-base-100/80 px-2 py-0.5 text-xs font-medium text-base-content lowercase">${tag}</li>`
      )
      .join('');

    return `
      <article class="project-item group" style="--deck-bg: ${project.deckBg};">
        <a href="#work/${project.slug}" data-route="work/${project.slug}" class="card-deck block w-full">
          <div class="card-main flex h-full flex-col overflow-hidden rounded border border-base-300 transition-colors group-hover:border-primary">
            <div class="glossy-90 flex h-10 min-h-10 items-center gap-4 border-b border-base-300 px-4">
              <div class="font-body text-sm font-medium tracking-normal text-neutral lowercase">${project.slug}</div>
              <div class="ml-auto flex items-center gap-2 text-base-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" style="font-size:0.8em;" width="1em" height="1em" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" rx="2"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/></svg>
              </div>
            </div>
            <div class="relative aspect-16/9 w-full overflow-hidden bg-base-200">
              <img width="1250" height="703" loading="lazy" class="size-full object-cover transition-transform duration-500 group-hover:scale-105" alt="${project.title}" src="${project.cover}">
              <div class="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-base-100/95 via-base-100/30 to-transparent p-4 sm:p-6">
                <div class="flex items-start justify-between gap-2">
                  <span class="rounded border border-base-300 glossy-75 px-2.5 py-1 text-xs font-medium text-neutral">${project.year}</span>
                  <span class="rounded border border-base-300 glossy-75 px-2.5 py-1 text-xs font-medium text-primary">${project.role}</span>
                </div>
                <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div class="max-w-xl">
                    <h3 class="title-3 text-neutral group-hover:text-primary transition-colors">${project.title}</h3>
                    <p class="mt-1 text-xs sm:text-sm text-base-content line-clamp-2">${project.summary}</p>
                  </div>
                  <ul class="flex flex-wrap gap-1.5">
                    ${tagsHTML}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="card-bg card-first"></div>
          <div class="card-bg card-second"></div>
        </a>
      </article>
    `;
  }

  function renderWorkProjects() {
    const homeHighlight = document.getElementById('home-projects-highlight');
    if (homeHighlight) {
      homeHighlight.innerHTML = PROJECTS.slice(0, 4).map(createHomeHighlightItemHTML).join('');
    }
    const container = document.getElementById('work-projects-list');
    if (container) {
      container.innerHTML = PROJECTS.map(createProjectCardHTML).join('');
    }
  }

  // ==================== ОБЩИЙ БЛОК СПЕЦИАЛИЗАЦИИ И CTA ====================
  function createSharedTestimonialsAndCtaHTML(instanceIndex) {
    const slidesHTML = SPECIALIZATIONS.map(
      (item, idx) => `
      <div class="embla__slide min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-10/12 lg:basis-8/12" data-slide-index="${idx}">
        <div class="flex h-full flex-col overflow-hidden rounded border border-base-300">
          <div class="glossy-25 flex h-10 min-h-10 items-center gap-4 border-b border-base-300 px-4">
            <div class="cursor-default font-body text-sm font-medium tracking-normal text-neutral lowercase">${item.id}</div>
            <div class="ml-auto flex items-center gap-2 text-base-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" style="font-size:0.8em;" width="1em" height="1em" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" rx="2"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/></svg>
            </div>
          </div>
          <div class="glossy-25 flex h-full flex-col justify-between gap-8 p-6 sm:p-8">
            <div class="rich-text info-panel-lines font-medium">
              ${item.paragraphs.map((p) => `<p>${p}</p>`).join('')}
            </div>
            <div class="flex items-center justify-between gap-4 border-t border-base-300 pt-4">
              <div class="flex items-center gap-3">
                <div class="flex size-12 items-center justify-center rounded-full border border-base-300 bg-base-200 text-xl">${item.badge}</div>
                <div>
                  <div class="font-display text-base font-medium text-neutral">${item.name}</div>
                  <div class="text-xs text-base-content">${item.role}</div>
                </div>
              </div>
              <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn btn-sm">
                <span>github</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10v10M7 17L17 7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    `
    ).join('');

    return `
      <!-- Специализация -->
      <section class="page-section overflow-hidden">
        <div class="container">
          <div class="mx-auto mb-12 text-center lg:w-8/12">
            <h2 class="title-2">Ключевые направления <span class="text-primary transition-colors">специализации</span></h2>
          </div>
        </div>
        <div class="light-streak relative py-24">
          <div class="container">
            <div class="testimonial-carousel" data-carousel-instance="${instanceIndex}">
              <div class="overflow-hidden">
                <div class="embla__container -ml-4 flex transition-transform duration-500 ease-out" style="transform: translate3d(0%, 0px, 0px);">
                  ${slidesHTML}
                </div>
              </div>
              <div class="mt-8 flex items-center justify-between gap-6">
                <div class="flex gap-2">
                  <button type="button" class="carousel-prev btn btn-sm" aria-label="Предыдущий слайд">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 18l-6-6l6-6"/></svg>
                  </button>
                  <button type="button" class="carousel-next btn btn-sm" aria-label="Следующий слайд">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18l6-6l-6-6"/></svg>
                  </button>
                </div>
                <div class="relative h-0.5 w-40 overflow-hidden rounded bg-base-300 sm:w-64">
                  <div class="carousel-pagination-current absolute top-0 left-0 h-full w-1/3 bg-primary transition-transform duration-300" style="transform: translateX(0%);"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Collaboration CTA Section -->
      <section id="section-contact-me" class="container page-section">
        <div class="mx-auto w-full lg:w-10/12">
          <div class="flex h-full flex-col overflow-hidden rounded border border-base-300">
            <div class="glossy-25 flex h-10 min-h-10 items-center gap-4 border-b border-base-300 px-4">
              <div class="cursor-default font-body text-sm font-medium tracking-normal text-neutral lowercase">collaboration</div>
              <div class="ml-auto flex items-center gap-2 text-base-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" style="font-size:0.8em;" width="1em" height="1em" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" rx="2"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/></svg>
              </div>
            </div>
            <div class="glossy-25 flex flex-col items-center gap-8 px-6 py-12 text-center sm:px-12 md:py-16">
              <div class="relative">
                <div class="flex size-24 items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-brand-green text-base-100 font-display text-2xl font-extrabold">
                  БИ
                </div>
                <span class="absolute right-0 bottom-0 flex size-8 items-center justify-center rounded-full border border-base-300 bg-base-100 text-lg shadow">👋</span>
              </div>
              <div class="flex max-w-2xl flex-col items-center gap-4">
                <h2 class="title-2 text-balance">Готов к решению задач <span class="text-primary transition-colors">AI-DevOps</span> в вашей команде</h2>
                <p class="text-balance">Ищете стажёра ИИ-DevOps / AI-инженера для автоматизации процессов разработки, настройки CI/CD и интеграции LLM-моделей? Свяжитесь со мной!</p>
              </div>
              <div class="flex flex-wrap justify-center gap-3">
                <a href="#contact" data-route="contact" class="btn btn-main" role="button">
                  <span class="overflow-hidden">написать-мне</span>
                  <span class="flex items-center overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" style="font-size:1.125em;" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7"/></svg>
                  </span>
                </a>
                <a href="https://github.com/Spizhy" target="_blank" rel="noopener noreferrer" class="btn">github.com/Spizhy</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderSharedSections() {
    const placeholders = document.querySelectorAll('.shared-testimonials-cta');
    placeholders.forEach((el, index) => {
      el.innerHTML = createSharedTestimonialsAndCtaHTML(index);
    });
    initCarousels();
  }

  function initCarousels() {
    const carousels = document.querySelectorAll('.testimonial-carousel');
    carousels.forEach((carousel) => {
      if (carousel.dataset.initialized === 'true') return;
      carousel.dataset.initialized = 'true';

      let currentIndex = 0;
      const total = SPECIALIZATIONS.length;
      const track = carousel.querySelector('.embla__container');
      const prevBtn = carousel.querySelector('.carousel-prev');
      const nextBtn = carousel.querySelector('.carousel-next');
      const bar = carousel.querySelector('.carousel-pagination-current');

      function updateCarousel() {
        const slides = carousel.querySelectorAll('.embla__slide');
        if (!slides.length) return;
        const slideWidthPct =
          (slides[0].getBoundingClientRect().width / carousel.getBoundingClientRect().width) * 100;
        const offset = -(currentIndex * slideWidthPct);
        track.style.transform = `translate3d(${offset}%, 0px, 0px)`;
        if (bar) {
          bar.style.transform = `translateX(${currentIndex * 100}%)`;
        }
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          currentIndex = (currentIndex - 1 + total) % total;
          updateCarousel();
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          currentIndex = (currentIndex + 1) % total;
          updateCarousel();
        });
      }
    });
  }

  // ==================== СЕТКА НАВЫКОВ И ДОСТИЖЕНИЙ + ФИЛЬТРЫ ====================
  let currentAchievementFilter = null;

  const CATEGORY_ICONS = {
    'open-source': `<svg xmlns="http://www.w3.org/2000/svg" style="font-size:1.1em;" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m18 16l4-4l-4-4M6 8l-4 4l4 4m8.5-12l-5 16"/></svg>`,
    'ai-ml': `<svg xmlns="http://www.w3.org/2000/svg" style="font-size:1.1em;" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m15.477 12.89l1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></g></svg>`,
    devops: `<svg xmlns="http://www.w3.org/2000/svg" style="font-size:1.1em;" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5M10 9H8m8 4H8m8 4H8"/></g></svg>`,
    education: `<svg xmlns="http://www.w3.org/2000/svg" style="font-size:1.1em;" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 14.66V17a1 1 0 0 1-1 1a2 2 0 0 0-2 2v2m7-7.34V17a1 1 0 0 0 1 1a2 2 0 0 1 2 2v2m.916-12H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3M4 22h16"/><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/><path d="M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3"/></g></svg>`
  };

  function renderAchievements() {
    const grid = document.getElementById('achievements-grid');
    const statusBox = document.getElementById('achievement-filter-status');
    const countText = document.getElementById('achievement-count-text');
    if (!grid) return;

    const filtered = currentAchievementFilter
      ? ACHIEVEMENTS.filter((a) => a.category === currentAchievementFilter)
      : ACHIEVEMENTS;

    if (statusBox && countText) {
      if (currentAchievementFilter) {
        statusBox.classList.remove('hidden');
        statusBox.classList.add('flex');
        countText.textContent = `Показано ${filtered.length} из ${ACHIEVEMENTS.length}`;
      } else {
        statusBox.classList.add('hidden');
        statusBox.classList.remove('flex');
      }
    }

    grid.innerHTML = filtered
      .map(
        (item) => `
      <li class="group flex h-full flex-col overflow-hidden rounded border border-base-300 glossy-25 transition-colors hover:border-primary">
        <div class="glossy-90 flex h-10 min-h-10 items-center justify-between gap-2 border-b border-base-300 px-4 text-xs font-medium lowercase">
          <span class="flex items-center gap-1.5 text-primary">
            ${CATEGORY_ICONS[item.category] || ''}
            <span class="text-neutral">${item.category}</span>
          </span>
          <span class="text-base-content">${item.year}</span>
        </div>
        <a href="${item.url}" ${item.url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} class="flex flex-1 flex-col">
          <div class="relative aspect-16/10 w-full overflow-hidden bg-base-200">
            <img width="640" height="400" loading="lazy" src="${item.image}" alt="${item.title}" class="size-full object-cover transition-transform duration-500 group-hover:scale-105">
          </div>
          <div class="flex flex-1 flex-col justify-between gap-2 p-4">
            <div>
              <h3 class="font-display text-base font-medium text-neutral group-hover:text-primary transition-colors">${item.title}</h3>
              <p class="text-xs text-primary/90">${item.org}</p>
            </div>
            ${
              item.project
                ? `<div class="mt-2 border-t border-base-300 pt-2 text-xs text-neutral/80">${item.project}</div>`
                : ''
            }
          </div>
        </a>
      </li>
    `
      )
      .join('');
  }

  function initAchievementFilters() {
    const buttons = document.querySelectorAll('.achievement-filter-btn');
    const resetBtn = document.getElementById('achievement-reset-btn');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        if (currentAchievementFilter === filter) {
          currentAchievementFilter = null;
        } else {
          currentAchievementFilter = filter;
        }
        buttons.forEach((b) => {
          const isSelected = b.getAttribute('data-filter') === currentAchievementFilter;
          b.classList.toggle('border-primary', isSelected);
          b.classList.toggle('text-primary', isSelected);
        });
        renderAchievements();
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        currentAchievementFilter = null;
        buttons.forEach((b) => {
          b.classList.remove('border-primary', 'text-primary');
        });
        renderAchievements();
      });
    }
  }

  // ==================== РЕНДЕР СТРАНИЦЫ ОТДЕЛЬНОГО ПРОЕКТА (CASE STUDY) ====================
  function renderCaseStudy(slug) {
    const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
    const project = PROJECTS[projectIndex] || PROJECTS[0];
    const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];
    const article = document.getElementById('case-study-article');
    if (!article) return;

    const totalShots = String(project.showcase.length).padStart(2, '0');
    const showcaseItemsHTML = project.showcase
      .map(
        (shot, i) => `
      <div class="showcase-item overflow-hidden rounded border border-base-300 glossy-25" data-shot-index="${i + 1}">
        <div class="glossy-90 flex h-10 min-h-10 items-center justify-between border-b border-base-300 px-4">
          <span class="font-body text-xs font-medium text-neutral lowercase">${project.slug}-0${i + 1}.svg</span>
          <div class="flex items-center gap-2 text-base-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" style="font-size:0.8em;" width="1em" height="1em" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" rx="2"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/></svg>
          </div>
        </div>
        <img width="1250" height="703" loading="lazy" src="${shot.src}" alt="${shot.alt}" class="w-full object-cover">
      </div>
    `
      )
      .join('');

    article.innerHTML = `
      <!-- Section: start -->
      <section id="work-sec-start" class="relative container flex height-inner-frame flex-col items-center justify-center gap-6 text-center text-balance">
        <div class="flex items-center gap-2 text-xs font-medium tracking-wider uppercase">
          <a href="#work" data-route="work" class="hover:text-primary transition-colors">Проекты</a>
          <span class="opacity-50">/</span>
          <span class="text-primary">${project.year}</span>
        </div>
        <h1 class="title-1 lg:w-10/12">${project.title}</h1>
        <p class="w-11/12 md:w-10/12 lg:w-6/12 2xl:w-5/12">${project.summary}</p>
        <ul class="flex flex-wrap justify-center gap-2">
          ${project.tags
            .map(
              (tag) =>
                `<li class="rounded border border-base-300 glossy-25 px-3 py-1 text-xs font-medium text-neutral lowercase">${tag}</li>`
            )
            .join('')}
        </ul>
        <div class="scroll-line absolute bottom-6 h-24"></div>
      </section>

      <!-- Section: project -->
      <section id="work-sec-project" class="container page-section">
        <div class="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-12">
          <div class="lg:col-span-5">
            <div class="flex flex-col overflow-hidden rounded border border-base-300">
              <div class="glossy-90 flex h-10 min-h-10 items-center justify-between border-b border-base-300 px-4">
                <h2 class="font-body text-sm font-medium text-neutral lowercase">project-info</h2>
                <div class="flex items-center gap-2 text-base-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" style="font-size:0.8em;" width="1em" height="1em" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" rx="2"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/></svg>
                </div>
              </div>
              <div class="glossy-75 flex flex-col gap-4 p-6 text-sm">
                <div class="flex justify-between border-b border-base-300 pb-3">
                  <span class="text-base-content lowercase">формат</span>
                  <span class="font-medium text-neutral text-right">${project.client}</span>
                </div>
                <div class="flex justify-between border-b border-base-300 pb-3">
                  <span class="text-base-content lowercase">период</span>
                  <span class="font-medium text-neutral">${project.year}</span>
                </div>
                <div class="flex justify-between border-b border-base-300 pb-3">
                  <span class="text-base-content lowercase">роль</span>
                  <span class="font-medium text-neutral text-right">${project.role}</span>
                </div>
                <div class="pt-2">
                  <a href="${project.websiteUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-main btn-sm w-full justify-center">
                    <span>открыть-github</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10v10M7 17L17 7"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-7">
            <div class="flex h-full flex-col overflow-hidden rounded border border-base-300">
              <div class="glossy-90 flex h-10 min-h-10 items-center justify-between border-b border-base-300 px-4">
                <h2 class="font-body text-sm font-medium text-neutral lowercase">architecture-overview</h2>
                <div class="flex items-center gap-2 text-base-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" style="font-size:0.8em;" width="1em" height="1em" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" rx="2"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/></svg>
                </div>
              </div>
              <div class="rich-text info-panel-lines glossy-75 h-full p-6 font-medium">
                ${project.description.map((p) => `<p>${p}</p>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: showcase -->
      <section id="work-sec-showcase" class="container page-section">
        <div class="mx-auto max-w-5xl">
          <div class="mb-8 flex items-center justify-between">
            <h2 class="title-3">Архитектура и <span class="text-primary">реализация</span></h2>
            <div class="rounded border border-base-300 glossy-75 px-3 py-1 font-display text-sm text-neutral">
              <span id="showcase-current-idx" class="text-primary">01</span> / ${totalShots}
            </div>
          </div>
          <div class="flex flex-col gap-12">
            ${showcaseItemsHTML}
          </div>
        </div>
      </section>

      <!-- Section: up-next -->
      <section id="work-sec-up-next" class="container page-section">
        <div class="mx-auto mb-10 text-center">
          <span class="text-xs font-medium tracking-wider uppercase text-primary">Следующий проект</span>
          <h2 class="title-2 mt-2">Продолжить просмотр <span class="text-primary">проектов</span></h2>
        </div>
        <div class="light-streak relative flex justify-center py-20">
          <div class="w-full max-w-4xl">
            ${createProjectCardHTML(nextProject)}
          </div>
        </div>
      </section>

      <!-- Section: contact-me -->
      <div id="work-sec-contact-me">
        ${createSharedTestimonialsAndCtaHTML(99)}
      </div>
    `;

    initCarousels();
  }

  // ==================== РОУТЕР И НАВИГАЦИЯ ====================
  function setTheme(themeName) {
    activeTheme = themeName;
    document.documentElement.setAttribute('data-theme-primary', themeName);
    document.body.setAttribute('data-theme-primary', themeName);
  }

  function updateScrollingWord(word) {
    const spans = document.querySelectorAll('#scrolling-text-track .scrolling-word');
    spans.forEach((span) => {
      span.textContent = word;
    });
  }

  function updateBreadcrumbs(items) {
    const list = document.getElementById('breadcrumbs-list');
    if (!list) return;

    list.innerHTML = items
      .map((item, idx) => {
        const isLast = idx === items.length - 1;
        return `
        <li class="flex items-center">
          ${idx === 0 ? '<span class="px-1 opacity-50">/</span>' : ''}
          ${
            isLast
              ? `<span class="text-neutral">${item.label}</span>`
              : `<a href="#${item.route}" data-route="${item.route}" class="text-primary transition-colors hover:text-neutral">${item.label}</a>`
          }
          <span class="px-1 opacity-50">/</span>
        </li>
      `;
      })
      .join('');
  }

  function navigateTo(rawRoute, pushHash = true) {
    const cleanRoute = (rawRoute || 'home').replace(/^#\/?/, '') || 'home';
    currentRoute = cleanRoute;

    if (pushHash && window.location.hash !== `#${cleanRoute}`) {
      history.pushState(null, '', `#${cleanRoute}`);
    }

    closeDashboard();
    closePopup();
    closeMobileMenu();

    const views = document.querySelectorAll('.spa-view');
    views.forEach((v) => v.classList.remove('active'));

    const widgetLocation = document.getElementById('widget-location');
    const widgetWorkSections = document.getElementById('widget-work-sections');

    if (cleanRoute.startsWith('work/')) {
      const slug = cleanRoute.split('/')[1];
      const project = PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];

      renderCaseStudy(project.slug);
      const detailView = document.getElementById('view-work-detail');
      if (detailView) detailView.classList.add('active');

      setTheme('darkPurple');
      updateScrollingWord(project.slug);
      document.title = `${project.title} | Боженко Илья`;
      updateBreadcrumbs([
        { label: 'Home', route: 'home' },
        { label: 'Work', route: 'work' },
        { label: project.title, route: `work/${project.slug}` }
      ]);

      if (widgetLocation) widgetLocation.classList.replace('lg:flex', 'lg:hidden');
      if (widgetWorkSections) {
        widgetWorkSections.classList.remove('hidden');
        widgetWorkSections.classList.add('lg:flex');
      }
    } else {
      const routeKey = ROUTE_CONFIG[cleanRoute] ? cleanRoute : 'home';
      const cfg = ROUTE_CONFIG[routeKey];
      const targetView = document.getElementById(`view-${routeKey}`);
      if (targetView) targetView.classList.add('active');

      setTheme(cfg.theme);
      updateScrollingWord(cfg.word);
      document.title = cfg.title;
      updateBreadcrumbs(cfg.breadcrumbs);

      if (widgetLocation) {
        widgetLocation.classList.remove('lg:hidden');
        widgetLocation.classList.add('lg:flex');
      }
      if (widgetWorkSections) {
        widgetWorkSections.classList.add('hidden');
        widgetWorkSections.classList.remove('lg:flex');
      }
    }

    const navLinks = document.querySelectorAll('#main-menu-list a[data-route]');
    navLinks.forEach((link) => {
      const linkRoute = link.getAttribute('data-route');
      const isActive =
        linkRoute === cleanRoute || (cleanRoute.startsWith('work/') && linkRoute === 'work');
      link.classList.toggle('router-link-active', isActive);
      link.classList.toggle('router-link-exact-active', linkRoute === cleanRoute);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    const frameContent = document.getElementById('frame-content');
    if (frameContent) {
      frameContent.scrollTo({ top: 0, behavior: 'smooth' });
    }

    triggerHeaderLogoAnimation();
  }

  function triggerHeaderLogoAnimation() {
    const logos = document.querySelectorAll('.logo-monogram');
    logos.forEach((svg) => {
      svg.classList.remove('animate');
      void svg.offsetWidth;
      svg.classList.add('animate');
      setTimeout(() => svg.classList.remove('animate'), 700);
    });
  }

  // ==================== ПЕРЕТАСКИВАЕМЫЕ ПАНЕЛИ (DRAG & DROP) ====================
  let highestZIndex = 10;

  function initDraggablePanels() {
    const panels = document.querySelectorAll('.draggable-panel');
    panels.forEach((panel) => {
      const handle = panel.querySelector('.panel-handle') || panel;
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let currentX = 0;
      let currentY = 0;

      handle.addEventListener('pointerdown', (e) => {
        if (e.target.closest('a, button')) return;
        isDragging = true;
        highestZIndex += 1;
        panel.style.zIndex = String(highestZIndex);
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
        panel.style.transition = 'none';
        handle.classList.replace('cursor-grab', 'cursor-grabbing');
        handle.setPointerCapture(e.pointerId);
      });

      handle.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        panel.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      });

      const endDrag = (e) => {
        if (!isDragging) return;
        isDragging = false;
        panel.style.transition = '';
        handle.classList.replace('cursor-grabbing', 'cursor-grab');
        try {
          handle.releasePointerCapture(e.pointerId);
        } catch (_) {}
      };

      handle.addEventListener('pointerup', endDrag);
      handle.addEventListener('pointercancel', endDrag);
    });
  }

  // ==================== УПРАВЛЕНИЕ ОКНОМ И ДАШБОРДОМ ====================
  const dashboardEl = document.getElementById('widget-dashboard');
  const popupCloseEl = document.getElementById('widget-popup-close');
  const dashboardSwitchBtn = document.getElementById('dashboard-switch');

  function openDashboard() {
    if (!dashboardEl) return;
    closePopup();
    dashboardEl.classList.remove('hidden');
    dashboardEl.classList.add('flex');
  }

  function closeDashboard() {
    if (!dashboardEl) return;
    dashboardEl.classList.add('hidden');
    dashboardEl.classList.remove('flex');
    const routeKey = currentRoute.startsWith('work/') ? null : ROUTE_CONFIG[currentRoute];
    setTheme(routeKey ? routeKey.theme : 'darkPurple');
  }

  function toggleDashboard() {
    if (!dashboardEl) return;
    if (dashboardEl.classList.contains('hidden')) {
      openDashboard();
    } else {
      closeDashboard();
    }
  }

  function closePopup() {
    if (!popupCloseEl) return;
    popupCloseEl.classList.add('hidden');
    popupCloseEl.classList.remove('flex');
  }

  function closeMobileMenu() {
    const mobileMenu = document.getElementById('main-menu');
    if (mobileMenu && window.innerWidth < 768) {
      mobileMenu.classList.add('hidden');
    }
  }

  function initWindowControls() {
    if (dashboardSwitchBtn) {
      dashboardSwitchBtn.addEventListener('click', toggleDashboard);
    }

    const dashCards = document.querySelectorAll('.dash-card[data-dash-theme]');
    dashCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        const previewTheme = card.getAttribute('data-dash-theme');
        if (previewTheme) {
          document.documentElement.setAttribute('data-theme-primary', previewTheme);
          document.body.setAttribute('data-theme-primary', previewTheme);
        }
      });
      card.addEventListener('mouseleave', () => {
        document.documentElement.setAttribute('data-theme-primary', activeTheme);
        document.body.setAttribute('data-theme-primary', activeTheme);
      });
    });

    const btnResize = document.getElementById('btn-resize-window');
    const frameWrapper = document.getElementById('frame-wrapper');
    let isCompactWindow = false;
    if (btnResize && frameWrapper) {
      btnResize.addEventListener('click', () => {
        isCompactWindow = !isCompactWindow;
        if (isCompactWindow) {
          frameWrapper.style.padding = '3.5rem 5vw';
        } else {
          frameWrapper.style.padding = '';
        }
      });
    }

    const btnFullscreen = document.getElementById('btn-fullscreen-window');
    if (btnFullscreen) {
      btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.().catch(() => {});
        } else {
          document.exitFullscreen?.().catch(() => {});
        }
      });
    }

    const btnClose = document.getElementById('btn-close-window');
    const btnDismissPopup = document.getElementById('popup-close-dismiss');
    if (btnClose && popupCloseEl) {
      btnClose.addEventListener('click', () => {
        closeDashboard();
        popupCloseEl.classList.toggle('hidden');
        popupCloseEl.classList.toggle('flex');
      });
    }
    if (btnDismissPopup) {
      btnDismissPopup.addEventListener('click', closePopup);
    }

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainMenu = document.getElementById('main-menu');
    if (mobileMenuBtn && mainMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mainMenu.classList.toggle('hidden');
        mainMenu.classList.toggle('flex');
      });
    }

    const secButtons = document.querySelectorAll('.work-sec-btn[data-scroll-section]');
    secButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const sec = btn.getAttribute('data-scroll-section');
        const target = document.getElementById(`work-sec-${sec}`);
        const frameContent = document.getElementById('frame-content');
        if (target && frameContent) {
          const top = target.offsetTop - 24;
          frameContent.scrollTo({ top, behavior: 'smooth' });
        }
        secButtons.forEach((b) => b.classList.remove('text-primary'));
        btn.classList.add('text-primary');
      });
    });
  }

  // ==================== ЧАСЫ МОСКОВСКОГО ВРЕМЕНИ ====================
  function updateMoscowClock() {
    const el = document.getElementById('local-time-display');
    if (!el) return;
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('ru-RU', {
        timeZone: 'Europe/Moscow',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      const parts = formatter.format(now);
      const hour = parseInt(parts.split(':')[0], 10);
      const icon = hour >= 6 && hour < 20 ? '☀️' : '🌙';
      el.textContent = `Местное время ${parts} ${icon}`;
    } catch (_) {
      el.textContent = 'Местное время 15:30 ☀️';
    }
  }

  // ==================== ФОНОВОЕ СВЕЧЕНИЕ И БЕГУЩАЯ СТРОКА ====================
  function initAmbientAndMarquee() {
    const track = document.getElementById('scrolling-text-track');
    const frameContent = document.getElementById('frame-content');
    const light1 = document.getElementById('bg-light-1');
    const light2 = document.getElementById('bg-light-2');

    let marqueePos = 0;
    let scrollVelocity = 0;
    let lastScrollTop = 0;

    if (frameContent) {
      frameContent.addEventListener(
        'scroll',
        () => {
          const st = frameContent.scrollTop;
          const delta = st - lastScrollTop;
          lastScrollTop = st;
          scrollVelocity = Math.max(-18, Math.min(18, delta * 0.25));

          if (currentRoute.startsWith('work/')) {
            const shots = document.querySelectorAll('.showcase-item');
            const counterEl = document.getElementById('showcase-current-idx');
            shots.forEach((shot) => {
              const rect = shot.getBoundingClientRect();
              if (rect.top < window.innerHeight * 0.6 && rect.bottom > 100 && counterEl) {
                counterEl.textContent = String(shot.dataset.shotIndex).padStart(2, '0');
              }
            });
          }
        },
        { passive: true }
      );
    }

    function animateMarquee() {
      marqueePos -= 0.035 + Math.abs(scrollVelocity) * 0.02;
      scrollVelocity *= 0.92;
      if (marqueePos <= -50) {
        marqueePos += 25;
      }
      if (track) {
        track.style.transform = `translate3d(${marqueePos}%, 0px, 0px)`;
      }
      requestAnimationFrame(animateMarquee);
    }
    requestAnimationFrame(animateMarquee);

    window.addEventListener(
      'pointermove',
      (e) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 18;
        const ny = (e.clientY / window.innerHeight - 0.5) * 18;
        if (light1) {
          light1.style.transform = `translate3d(${nx}%, ${ny}%, 0)`;
        }
        if (light2) {
          light2.style.transform = `translate3d(${-nx * 0.8}%, ${-ny * 0.8}%, 0)`;
        }
      },
      { passive: true }
    );
  }

  // ==================== ФОРМА ОБРАТНОЙ СВЯЗИ ====================
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('contact-feedback');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (feedback) {
        feedback.classList.remove('hidden');
      }
      form.reset();
    });
  }

  // ==================== АНИМАЦИЯ ИНТРО ====================
  function playIntroAnimation() {
    const overlay = document.getElementById('intro-overlay');
    const logoWrap = document.getElementById('intro-logo');
    if (!overlay || !logoWrap) return;

    const svg = logoWrap.querySelector('.logo-monogram');
    requestAnimationFrame(() => {
      logoWrap.classList.remove('opacity-0', 'scale-115');
      logoWrap.classList.add('opacity-100', 'scale-100');
      if (svg) svg.classList.add('animate');
    });

    setTimeout(() => {
      overlay.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 700);
    }, 950);
  }

  // ==================== ГЛОБАЛЬНАЯ ОБРАБОТКА SPA-ССЫЛОК ====================
  function initGlobalRouterLinks() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-route]');
      if (!link) return;
      e.preventDefault();
      const targetRoute = link.getAttribute('data-route');
      if (targetRoute) {
        navigateTo(targetRoute, true);
      }
    });

    window.addEventListener('popstate', () => {
      const hashRoute = window.location.hash.replace(/^#\/?/, '') || 'home';
      navigateTo(hashRoute, false);
    });
  }

  // ==================== ИНИЦИАЛИЗАЦИЯ ====================
  function init() {
    renderWorkProjects();
    renderAchievements();
    initAchievementFilters();
    renderSharedSections();
    initDraggablePanels();
    initWindowControls();
    initContactForm();
    initGlobalRouterLinks();
    initAmbientAndMarquee();
    updateMoscowClock();
    setInterval(updateMoscowClock, 30000);

    document.querySelectorAll('.animate-logo').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        const svg = el.querySelector('.logo-monogram');
        if (svg) {
          svg.classList.remove('animate');
          void svg.offsetWidth;
          svg.classList.add('animate');
        }
      });
    });

    const initialHash = window.location.hash.replace(/^#\/?/, '') || 'home';
    navigateTo(initialHash, false);

    playIntroAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
