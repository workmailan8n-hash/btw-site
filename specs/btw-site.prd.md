# BTW Studio Site — PRD v1.0

**Проект:** btw-site
**Дата:** 2026-04-17
**Автор:** product-manager (waterfall Gate 1)
**Статус:** DRAFT — ожидает Gate 1 approval

---

## 1. Проблема

BTW (By The Way) — студия разработки продуктов. Проекты уже существуют и задеплоены (Agent Dashboard, CourseAI, @btw_aitech), но у студии нет единой точки входа. Telegram-канал @btw_aitech работает как building-in-public лента, однако не выполняет функцию landing page: не объясняет что студия делает, не собирает заявки, не создаёт ощущение бренда.

**Следствие:** потенциальный клиент или партнёр, который узнал о BTW через соцсети, Telegram или реферал, не имеет куда перейти — нет авторитетного URL, нет портфолио, нет контактной формы. Студия теряет конверсию на самом верхнем этапе воронки.

**Решение:** сайт-визитка с dark-luxe эстетикой уровня editorial-brutalist референсов, который закрывает три функции: позиционирование, демо портфолио, сбор заявок.

---

## 2. Цели и метрики успеха

| Метрика | Базовое значение | Цель через 3 месяца | Инструмент |
|---|---|---|---|
| Уникальные посетители/мес | 0 | ≥ 500 | Plausible |
| Конверсия в /contact (клик или отправка формы) | — | ≥ 8% от посещений | Plausible goals |
| Среднее время на странице | — | ≥ 90 сек (homepage) | Plausible |
| Lighthouse Performance | — | ≥ 85 (Mobile) | Lighthouse CI |
| Lighthouse SEO | — | 100 | Lighthouse CI |
| Lighthouse Accessibility | — | ≥ 95 | axe + Lighthouse |
| Органические ключи в топ-50 | 0 | ≥ 10 по branded + niche ("AI app studio Ukraine") | Google Search Console |
| Заявок через /contact форму | 0 | ≥ 3 квалифицированных за 3 мес | Resend inbox |
| LCP | — | ≤ 2.0s (4G) | Web Vitals |
| First Load JS bundle | — | ≤ 350 KB | @next/bundle-analyzer |

---

## 3. Целевая аудитория

### Персона 1 — Потенциальный клиент
**Кто:** основатель стартапа или продакт в компании, ищет команду для разработки веб-приложения или AI-инструмента. Бюджет $5k–$50k. Нашёл BTW через Telegram, LinkedIn, реферал или органику.
**Цель:** за 2–3 минуты понять, что студия делает, убедиться в качестве, найти способ связаться.
**Болевая точка:** сложно отличить реальную команду от фриланс-сборки без портфолио и без внятного сайта.
**Критичные разделы:** Hero (первое впечатление), Selected Work (доказательства), Contact (CTA).

### Персона 2 — Разработчик / вдохновлённый коллега
**Кто:** фронтенд или fullstack разработчик, следит за @btw_aitech или нашёл через /notes статью. Интересуется технологиями (r3f, Spline, Next.js 15, GSAP) и building-in-public процессом.
**Цель:** изучить технические решения, прочитать /notes, возможно — наладить контакт или следить за студией.
**Болевая точка:** нет центрального источника — посты в TG разбросаны, нет структурированного блога.
**Критичные разделы:** /notes (MDX блог), /about (process + stack), Footer (TG канал).

### Персона 3 — Читатель TG-канала, пришедший из bio
**Кто:** подписчик @btw_aitech, кликнул на ссылку в шапке канала. Уже лоялен к контенту, хочет узнать больше о студии или найти конкретный проект.
**Цель:** быстро перейти к нужному разделу — посмотреть проекты или написать напрямую.
**Болевая точка:** bio-link ведёт "в никуда" (сейчас нет сайта).
**Критичные разделы:** Hero → nav → Work или Contact, переключатель EN/UK (канал на украинском).

---

## 4. Функциональные требования

### REQ-1: Главная страница (одностраничник, 7 секций)

**REQ-1.1 Hero** — 100vh. Wordmark `BTW.` в навигации. H1 `We ship apps, by the way.` с letter-by-letter reveal (GSAP SplitText). Spline 3D-сцена (glass-монолит, реакция на курсор) через dynamic import, SSR: false, Suspense fallback — PNG. На `< 768px` или `prefers-reduced-motion` — только статичный fallback.

**REQ-1.2 Services** — 4 карточки: Product apps / Web apps / AI integrations / Telegram bots. Glass-blur, hover → 3D-tilt + neon-lime border glow. 2–3 строки + теги стека.

**REQ-1.3 Selected Work** — 3–5 карточек (MVP: Agent Dashboard, CourseAI, @btw_aitech + 1–2 резерва). Preview + название + тег + внешняя ссылка (new tab). Hover: mask-reveal. Нет страниц кейсов.

**REQ-1.4 Process** — 4 шага: Discover → Design → Build → Ship. Большие монохромные цифры 01–04. Scroll-triggered stagger (GSAP ScrollTrigger).

**REQ-1.5 Notes Preview** — 3 последних поста из /notes (автоматически, by date). Карточка: дата, заголовок, excerpt. Ссылка "All notes →".

**REQ-1.6 Contact CTA** — H2 `Have an idea? Let's talk.` Две кнопки: `hello@btw.studio` (primary, neon) и `Telegram → @btw_aitech` (secondary). Ссылка на /contact.

**REQ-1.7 Footer** — Wordmark, соц-ссылки, год, копирайт, дубль language toggle.

### REQ-2: Страница /notes (MDX блог)

- **REQ-2.1** Index: список постов, desc by date, фильтр по тегам.
- **REQ-2.2** Post: MDX + custom components (`<Callout/>`, `<Video/>`, `<Code/>` с Shiki).
- **REQ-2.3** Frontmatter: `title`, `date`, `tags`, `lang` (en|uk), `description`, `cover`.
- **REQ-2.4** RSS feed: `/notes/rss.xml`.
- **REQ-2.5** SEO: JSON-LD Article schema.
- **REQ-2.6** К запуску: минимум 2 поста (EN + UK).

### REQ-3: Страница /about

- **REQ-3.1** Manifesto (3 абзаца), timeline 2024–2026, stack overview.
- **REQ-3.2** Contact-блок в конце.

### REQ-4: Страница /contact

- **REQ-4.1** Поля: name, email, project type (Web / AI / Bot / Other), budget (<$5k / $5–20k / $20k+ / TBD), message.
- **REQ-4.2** Zod-валидация на client и server.
- **REQ-4.3** Submit → `/api/contact` → Resend → `hello@btw.studio`.
- **REQ-4.4** При успехе — TG-нотификация через `@news_seller_bot` (chat_id: 397649588).
- **REQ-4.5** Success state с neon-подтверждением и CTA в Telegram.

### REQ-5: i18n (EN + UK)

- **REQ-5.1** `en` (default, без префикса), `uk` (`/uk/...`).
- **REQ-5.2** `next-intl`, `messages/{en,uk}.json`.
- **REQ-5.3** Language toggle в header и footer.
- **REQ-5.4** MDX-контент: `*.en.mdx` / `*.uk.mdx`.

### REQ-6: SEO и метаданные

- **REQ-6.1** `next-seo`: unique title/description/canonical per страница.
- **REQ-6.2** OG-images: dynamic через `@vercel/og`, route `/og/[title]`.
- **REQ-6.3** Auto `sitemap.xml` + `robots.txt`.
- **REQ-6.4** Twitter/OG card для всех страниц.

### REQ-7: Аналитика

- **REQ-7.1** Vercel Analytics.
- **REQ-7.2** Plausible (privacy-first, no cookies).

### REQ-8: Навигация и UX-элементы

- **REQ-8.1** Snake-nav (top): work / notes / about / contact / EN↔UK.
- **REQ-8.2** Magnetic cursor на desktop: follow + expand на hover.
- **REQ-8.3** Lenis smooth scroll синхрон с Framer Motion и GSAP ScrollTrigger.

---

## 5. Нефункциональные требования

**Производительность**
- First Load JS ≤ 350 KB (включая three.js / Spline)
- LCP ≤ 2.0s на 4G (≤ 3.0s на slow-3G)
- Lighthouse Perf ≥ 85 Mobile, ≥ 90 Desktop
- Шрифты self-hosted через `next/font/local`

**Доступность (WCAG AA)**
- Lighthouse A11y ≥ 95
- Keyboard-only навигация
- Focus states на neon-акценте
- NVDA: все landmarks читаются
- `prefers-reduced-motion`: heavy-анимации off, hero → PNG

**SEO**
- Lighthouse SEO = 100
- JSON-LD: WebSite + Organization + Article
- Canonical URLs для всех locale

**Приватность**
- Нет cookies, нет cookie-banner
- Plausible (EU-hosted)
- Только Plausible + Spline runtime во внешних скриптах

**Совместимость**
- Chrome 120+, Firefox 120+, Safari 17+, Edge 120+
- iPhone SE (375px) и выше
- WebGL 2.0 требуется для Spline; fallback для старых

**Надёжность**
- Vercel auto-preview deploys
- Uptime SLA: 99.9% (Vercel Hobby/Pro)
- При ошибке Resend — error state + CTA в Telegram

---

## 6. Вне скоупа (MVP)

| Исключено | Причина |
|---|---|
| Страницы кейсов `/work/[slug]` | Карточки → внешние линки. Case pages — Phase 2 |
| CMS (Sanity / Contentful) | MDX в репо. Избыточно |
| RU-локаль | Только EN + UK |
| Dark/light toggle | Dark-only |
| Cookie-banner / GDPR modal | Plausible не требует согласия |
| Аутентификация | Нет ЛК |
| E-commerce / оплата | — |
| Отдельный `/work` index | Work — секция на homepage |

---

## 7. Риски и митигации

**RISK-1: Bundle size / 3D performance.** Three.js + Spline runtime +200–250 KB gzip. Риск не уложиться в ≤ 350 KB.
Митигация: dynamic import + `ssr: false` + lazy load по IntersectionObserver; fallback на WebM-loop если превышен.

**RISK-2: Spline vendor lock-in.** Проприетарный tool.
Митигация: `.splinecode` в репо + готовый PNG fallback + Phase 2 миграция на чистый r3f.

**RISK-3: Bilingual content drift.** EN обновили — UK забыли.
Митигация: `/bilingual-audit` skill; в MDX обязательный `lang` frontmatter + pair-файлы.

**RISK-4: Недоступность домена.** `btw.studio` может быть занят.
Митигация: проверить через `/domain-check` до регистрации; запасные — `bytheway.dev`, `btw.build`; dev URL `btw-site.vercel.app` доступен немедленно.

**RISK-5: Resend deliverability.** Письма → spam при новом домене.
Митигация: SPF + DKIM через Resend DNS при регистрации; тест первой формы вручную + проверка spam.

---

## 8. Критерии запуска v1

**Код и сборка**
- [ ] `npm run build` — без ошибок TS
- [ ] `npm run lint` — 0 warnings
- [ ] `npx tsc --noEmit` — clean

**Контент**
- [ ] 7 секций homepage — финальный копирайт (EN + UK)
- [ ] /about — финальный текст
- [ ] /contact — форма работает
- [ ] ≥ 2 поста в /notes
- [ ] ≥ 3 work-карточки с реальными ссылками

**Качество**
- [ ] Lighthouse Mobile: Perf ≥ 85, A11y ≥ 95, BP ≥ 95, SEO = 100
- [ ] First Load JS ≤ 350 KB (bundle-analyzer)
- [ ] LCP ≤ 2.0s (DevTools 4G throttle)
- [ ] Keyboard-only: все CTA доступны
- [ ] `prefers-reduced-motion`: 3D → PNG работает
- [ ] Safari 17+: без WebGL-ошибок
- [ ] Mobile 375px: layout не ломается

**Интеграции**
- [ ] Тестовая заявка → inbox `hello@btw.studio`
- [ ] TG-нотификация в chat_id 397649588 приходит
- [ ] OG-preview OK через opengraph.xyz
- [ ] `sitemap.xml` и `robots.txt` доступны
- [ ] RSS feed `/notes/rss.xml` валиден

**Deploy**
- [ ] Vercel project + домен подключён
- [ ] Env vars в Vercel: `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`
- [ ] Preview deploys работают
- [ ] Lighthouse CI настроен (блок на Perf < 80)

**Golden path (manual)**
- [ ] Homepage → hero 3D → скролл по секциям
- [ ] Work click → внешняя ссылка в новой вкладке
- [ ] /notes → пост читается, код подсвечен
- [ ] /contact → форма отправляется → success
- [ ] EN ↔ UK: работает везде, URL меняется

---

## 9. Вопросы для Gate 1 (нужны решения пользователя)

**Q1 — Домен.** Приоритет: `btw.studio` → `bytheway.dev` → `btw.build`. Проверить доступность и зафиксировать.

**Q2 — Sans шрифт.** `Söhne` (платный ~$200, точный luxe-look) vs `Inter Tight` + `General Sans` (бесплатно, 95% качества). Готовы на лицензию?

**Q3 — Work-карточки.** Подтвердить Agent Dashboard + CourseAI + @btw_aitech. Добавляем ещё?

**Q4 — Email.** Регистрируем `hello@btw.studio` (зависит от Q1). OK?

**Q5 — Spline-сцена.** Делаем сами (4–8ч в Spline editor) или делегируем `3d-scene-designer` → developer реализует по spec?

**Q6 — Soft-launch дата.** Целевая дата публикации в @btw_aitech.
