export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  slug: string;
  categoryId: string;
  categoryTitle: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  services: Omit<ServiceItem, "categoryId" | "categoryTitle">[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "web",
    title: "Веб-разработка",
    description: "Лендинги, корпоративные сайты и интернет-магазины под ключ",
    services: [
      {
        id: "landing",
        title: "Лендинги и одностраничные сайты",
        shortDescription:
          "Страница под конкретный оффер с упором на конверсию. Дизайн, вёрстка, мобильный адаптив, форма захвата лида. От 5 рабочих дней.",
        slug: "landing",
      },
      {
        id: "corporate",
        title: "Корпоративные сайты",
        shortDescription:
          "Имиджевые и многостраничные сайты на React/Next.js с CMS для редактирования контента, SEO-оптимизацией и интеграциями.",
        slug: "corporate",
      },
      {
        id: "ecommerce",
        title: "Интернет-магазины",
        shortDescription:
          "E-commerce для B2C и B2B: каталог с фильтрацией, корзина, онлайн-оплата Kaspi/Halyk, личный кабинет, интеграция с 1С.",
        slug: "ecommerce",
      },
    ],
  },
  {
    id: "mobile",
    title: "Мобильные приложения",
    description: "iOS и Android — кросс-платформенно или нативно",
    services: [
      {
        id: "mobile-app",
        title: "Мобильные приложения",
        shortDescription:
          "React Native и Flutter — когда важны сроки и бюджет. Нативная разработка — когда нужна высокая производительность или специфический доступ к железу.",
        slug: "mobile-app",
      },
    ],
  },
  {
    id: "platforms",
    title: "Платформы и системы",
    description: "CRM, LMS и SaaS-продукты под задачи вашего бизнеса",
    services: [
      {
        id: "saas",
        title: "SaaS-платформы",
        shortDescription:
          "Строим SaaS с нуля: мультитенантная архитектура, биллинг и подписки, масштабируемая инфраструктура, API для сторонних интеграций.",
        slug: "saas",
      },
      {
        id: "crm",
        title: "CRM-системы",
        shortDescription:
          "CRM под ваш процесс без упрощений: воронка продаж, управление сделками, интеграция с WhatsApp, Telegram и Instagram.",
        slug: "crm",
      },
      {
        id: "lms",
        title: "LMS-платформы",
        shortDescription:
          "Системы дистанционного обучения для EdTech, онлайн-школ и корпоративных программ. Запускали с аудиторией до десятков тысяч.",
        slug: "lms",
      },
    ],
  },
  {
    id: "automation",
    title: "Автоматизация",
    description: "Убираем ручной труд и соединяем системы",
    services: [
      {
        id: "automation",
        title: "Автоматизация бизнес-процессов",
        shortDescription:
          "Интеграция CRM, 1С, склада и мессенджеров. Роботизация обработки заявок, отчётности и документооборота.",
        slug: "automation",
      },
    ],
  },
  {
    id: "ai",
    title: "AI-решения",
    description: "Агенты, аналитика на базе NLP и Computer Vision",
    services: [
      {
        id: "ai-agents",
        title: "AI-агенты и чат-боты",
        shortDescription:
          "Агент отвечает на вопросы клиентов на базе документов компании — не по скриптам. Подключаем к WhatsApp, Telegram, Instagram и виджету на сайт.",
        slug: "ai-agents",
      },
      {
        id: "ai-analytics",
        title: "AI-аналитика и мониторинг",
        shortDescription:
          "Мониторинг упоминаний, sentiment analysis, классификация входящих обращений, предиктивная аналитика для больших данных.",
        slug: "ai-analytics",
      },
      {
        id: "computer-vision",
        title: "Computer Vision",
        shortDescription:
          "Распознавание изображений и видео в реальном времени: безопасность на объектах, контроль качества на производстве.",
        slug: "computer-vision",
      },
    ],
  },
];

// Flat list of all services with category info attached
export const ALL_SERVICES: ServiceItem[] = SERVICE_CATEGORIES.flatMap((cat) =>
  cat.services.map((s) => ({
    ...s,
    categoryId: cat.id,
    categoryTitle: cat.title,
  }))
);

// 6 curated services for the homepage grid
export const FEATURED_SERVICES: ServiceItem[] = [
  ALL_SERVICES.find((s) => s.id === "landing")!,
  ALL_SERVICES.find((s) => s.id === "corporate")!,
  ALL_SERVICES.find((s) => s.id === "mobile-app")!,
  ALL_SERVICES.find((s) => s.id === "crm")!,
  ALL_SERVICES.find((s) => s.id === "lms")!,
  ALL_SERVICES.find((s) => s.id === "ai-agents")!,
];
