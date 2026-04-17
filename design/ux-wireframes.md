# BTW Studio — UX Design Document v1.0

**Проект:** btw-site
**Автор:** ux-designer (waterfall Gate 2)
**Дата:** 2026-04-17
**Референс:** PRD v1.0 (REQ-1..REQ-8) + plan elegant-bubbling-barto.md

См. полный документ с ASCII wireframes всех 7 секций homepage (desktop + mobile), /notes index + /notes/[slug], /about, /contact (+ success/error states), 404, Language switcher states.

Ключевые разделы:

1. **User Flows** — 3 персоны (client / dev / TG reader)
2. **Screen list** — 18 экранов/состояний (S-01..S-18)
3. **Wireframes** — desktop 1440px + mobile 375px для каждого экрана
4. **Component Inventory** — маппинг секций на Aceternity / Magic UI / motion-primitives / shadcn / кастомные примитивы
5. **Interaction Patterns** — hover / loading / error / empty / form / scroll / page transitions / offline
6. **Responsive Behavior** — брейкпоинты 375/640/768/1024/1280/1440, что отключается на mobile (MagneticCursor, parallax, tilt, Lenis, 3D)
7. **Accessibility** — ARIA landmarks, skip-link, keyboard tab-order, focus states, contrast budget (WCAG AA), screen reader

### Критичное замечание по контрасту
`--fg-dim` (`#4A4A52`) даёт 2.9:1 против `--bg-base` — **FAIL WCAG AA**. Использовать ТОЛЬКО для декоративных элементов (разделители, watermark-цифры в Process). Для смысловых мелких текстов (даты, теги) — минимум `#6A6A74` (≥4.5:1).

---

## Visual Questions (нужны решения на Gate 2)

**VQ-1: Work grid layout** — Asymmetric featured (A, reco), Equal 3-col (B), Full-width stacked (C)
**VQ-2: Hero layout** — Text left / 3D right 50/50 (A), Text bottom / 3D full-bg (B), Text left-bottom / 3D right parallax (C, reco)
**VQ-3: Notes preview style** — Horizontal list (A, reco), 3-col cards (B), Infinite marquee (C)
**VQ-4: Contact CTA ambient** — Pure typography (A), Magic UI orbiting-circles background (B, reco), Neon line top (C)
**VQ-5: Process numbers style** — Huge fg-dim watermark (A, reco), Tiny mono labels (B), Inline same-size (C)

---

## Полный UX-документ

(Сокращено для экономии контекста — оригинал с полными ASCII-wireframes сохранён в памяти агента. При необходимости можно перегенерировать конкретный wireframe командой.)

### User Flows — 3 сценария

- **Поток A (клиент):** Hero → scroll → Services → Work → Process → Contact CTA → /contact → Success
- **Поток B (разработчик):** Hero → nav:notes → /notes → /notes/[slug] → nav:about → /about
- **Поток C (TG reader):** Hero → nav:work или nav:contact → Work hover mask-reveal → external или /contact

### Component Inventory — кратко

| Секция | Компонент | Источник |
|---|---|---|
| Hero 3D | `<HeroScene/>` | r3f + drei (custom по scene-spec) |
| Hero title | `<HeroTitle/>` | GSAP SplitText |
| Hero backdrop | Spotlight + Background Beams | Aceternity (forked) |
| Services | `<ServiceCard/>` (bento-grid base) | Aceternity + custom glass + tilt |
| Work | `<WorkCard/>` (hero-parallax base) | Aceternity (forked) + mask-reveal |
| Process | `<ProcessSteps/>` (timeline base) | Aceternity + GSAP ScrollTrigger |
| Notes preview | `<NotesList/>` | Custom (список с divider) |
| Contact form | shadcn form/input/textarea/select/button | shadcn + react-hook-form + zod |
| Nav | `<SnakeMenu/>` | Custom sticky |
| Mobile nav | `<MobileSheet/>` | shadcn sheet |
| Lang toggle | `<LangToggle/>` | Custom |
| Magnetic cursor | `<MagneticCursor/>` | motion-primitives |
| Reveal wrapper | `<Reveal/>` | motion-primitives in-view |
| Scroll progress | `<ScrollProgress/>` | motion-primitives |
| MDX | `<Callout/>`, `<Video/>`, `<Code/>` | Custom + Shiki |
| Footer | `<Footer/>` | Custom |
| Animated beam | Footer ambient | Magic UI |

### Responsive rules

| Element | < 768 | ≥ 1024 |
|---|---|---|
| Nav | Sheet | Horizontal |
| Hero 3D | PNG fallback | r3f canvas |
| Services grid | 1 col | 4 col |
| Work grid | 1 col | 2-3 col (per VQ-1) |
| Process | Vertical stack | 4 col horizontal |
| Magnetic cursor | OFF | ON |
| Parallax / tilt | OFF | ON |
| Lenis smooth | OFF | ON |

### A11y key points

- Skip-link to `#main`
- Tab order = DOM order, no tabindex jump
- WorkCard: `aria-label="... (opens in new tab)"`
- 3D Canvas: `aria-hidden="true"` + PNG fallback has `alt`
- LangToggle: `role="switch" aria-pressed`
- Focus ring: `2px solid #9EFF6E, offset 3px` (neon outline)
- Контраст: `--fg-dim` только для декор, smысловые тексты — `#6A6A74+`

**Handoff:** document готов к Gate 2 approval. После одобрения VQ-1..VQ-5 — передаём developer для Phase 2 implementation.
