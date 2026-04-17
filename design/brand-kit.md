# BTW. — Brand Identity Kit v1.0

*By The Way Studio · editorial brutalist-luxury · dark-first*

---

## 1. Wordmark `BTW.` — три варианта

Все три используют **Migra (Velvetyne, SIL OFL)** как базу — free, high-contrast serif, идеальный для editorial-luxe. Различаются конструкцией точки и трекингом. Точка (`.`) — signature-элемент, всегда окрашена в `#9EFF6E`.

### Variant A — "Editorial Classic" (рекомендуемый default)

- **Шрифт:** Migra Extrabold, все три глифа в uppercase.
- **Трекинг:** `-0.02em` (лёгкое сжатие — премиум-уплотнение).
- **Кернинг:** ручная пара `B↔T` на `-30 units`, `T↔W` на `-45 units` (иначе `TW` выглядит рыхло).
- **Точка:** перфектный круг, диаметр = 0.22× высоты кап-линии, baseline-aligned. Цвет `--accent #9EFF6E`.
- **Baseline:** общий, без descenders.

```
┌──────────────────────┐
│  ██▄  ▄██▄  ▄█ █▄    │
│  █ █   █    █ █ █  ● │  ← зелёная точка
│  ██▀   █    ▀▄█▄▀    │
└──────────────────────┘
```

**Почему подходит:** high-contrast штрихи Migra = editorial gravitas (журнальный уровень), а zero-trailing dot = conversational filler из названия ("…by the way."). Точка делает знак **дружелюбно-ироничным**, не холодно-корпоративным — ровно то самосознание, которого требует позиционирование.

### Variant B — "Monoline Tech" (для кода, dev-сообществ, /notes)

- **Шрифт:** Migra Bold → subtract contrast на `-40%` через custom stroke normalization (делается в Figma плагином Glyphs или ручной коррекцией outlines). Альтернатива без правки outlines — **JetBrains Mono ExtraBold**, 105% width.
- **Трекинг:** `+0.04em` (раскрыт, как inscription).
- **Case:** uppercase, но точка — **квадрат** 1:1, не круг (пиксель-метафора).
- **Ширина:** moderate, без узости. Идеален на favicon 32px+.

```
B  T  W  ▮
```

**Почему подходит:** для dev-аудитории (персона 2 из PRD) — техничнее, более "shipping"-ориентированный. Используем в footer, в GitHub README, на /notes index, в OG для технических постов.

### Variant C — "Stretched Statement" (для hero и больших постеров)

- **Шрифт:** Migra Extrabold, растянут **по вертикали на 115%** (не по горизонтали — horizontal stretch убивает serif).
- **Трекинг:** `-0.04em` (ещё плотнее A).
- **Case:** uppercase.
- **Точка:** круг, но **выполнена как зелёное свечение** (`box-shadow: 0 0 24px rgba(158,255,110,0.6)`) — glow-эффект, уместен только на dark hero при `font-size ≥ 96px`.
- **Cap-height:** увеличен на +8% относительно baseline grid.

```
▐█▌  ▐█▌  ▐█ █▌
 █    █    █ █    •
 █    █    ▀█▀    ↑ glow
```

**Почему подходит:** editorial-brutalist референс (design-psi-eight) требует heavy display-момента — Variant C закрывает hero-секцию. Glow-dot перекликается с Spline 3D-сценой (glass-монолит + lime-подсветка) — **brand echo между 2D и 3D**.

**Default pick:** Variant A везде, кроме hero (C) и code-контекстов (B).

---

## 2. Monogram / icon mark

Два варианта для favicon (16/32/180/512), avatars TG/Twitter/GitHub, app-icons.

### Monogram 1 — "Dot-in-Square" (рекомендуемый)

- **Canvas:** 1:1, `#0F0F14` background (elev-1), `12%` inner padding.
- **Composition:** центр — lowercase `btw` в **Migra Bold italic**, cap-height 58% канваса. Trailing dot — `#9EFF6E`, смещён на baseline, увеличен до 1.4× от нормы.
- **Corner radius:** `20%` для iOS-style rounded, `0%` для desktop favicon/Figma.

```
┌────────────────┐
│                │
│    b t w  ●    │  ← lime dot
│                │
└────────────────┘
```

- **16×16 тест:** `btw` читается как 3 отдельных глифа; точка выживает (3px минимум).
- **Color versions:**
  - `bg #0F0F14` + `fg #F5F5F7` + `dot #9EFF6E` (dark default)
  - `bg #9EFF6E` + `fg #07070A` + `dot #07070A` (inverted, для light surfaces)
  - `bg transparent` + `fg currentColor` + `dot #9EFF6E` (для embed в чужом UI)

### Monogram 2 — "Corner Mark"

- **Canvas:** 1:1, разделён диагональю top-left → bottom-right.
- **Top-left triangle:** `#9EFF6E`, содержит uppercase `B` (Migra Extrabold, cut по диагонали).
- **Bottom-right triangle:** `#07070A`, содержит точку `.` (белую, `#F5F5F7`).
- **Метафора:** `B` + `.` = BTW compressed до двух знаков, работает и как абстрактный mark.

```
┌────────┐
│ ▓▓▓▓   │
│ ▓▓▓    │  ← lime half, white B
│ ▓▓  B  │
│ ▓       │
│   ▀▄   │  ← dark half
│    ▀▄ •│  ← white dot
└────────┘
```

- **16×16 тест:** диагональ работает, но `B` рискует — использовать только от 24px+.
- **Use case:** Twitter/X avatar, где нужно больше контраста против scrolling timeline.

**Default pick:** Monogram 1 для favicon/TG/GitHub, Monogram 2 только для X/Twitter (1024×1024 only).

---

## 3. Palette — 9 tokens

Все hex-значения с WCAG контрастом против `--bg-base #07070A`. Секция locked-in из бриф-constraints, плюс 3 новых секундария/функциональных.

| Token | Hex | Role | Contrast vs bg | Notes |
|---|---|---|---|---|
| `--bg-base` | `#07070A` | Primary canvas | — | violet-tinged near-black |
| `--bg-elev-1` | `#0F0F14` | Cards, monograms | 1.15:1 | subtle lift |
| `--bg-elev-2` | `#17171E` | Hover/active, modals | 1.4:1 | — |
| `--fg-primary` | `#F5F5F7` | Body text, headings | **19.8:1** (AAA) | primary readable |
| `--fg-muted` | `#8A8A94` | Secondary text, captions | **5.9:1** (AA body) | use ≥14px |
| `--fg-dim` | `#4A4A52` | Borders, dividers, hints | 2.4:1 | **non-text only** |
| `--accent` | `#9EFF6E` | Primary CTA, dots, links | **14.2:1** (AAA) | locked, signature |
| `--accent-alt` | `#B8A6FF` | Gradient stops, secondary | **9.1:1** (AAA) | soft violet, use sparingly |
| `--accent-warm` | `#FFB86B` | Hover flashes, success micro | **11.4:1** (AAA) | ≤5% surface coverage |
| `--glass` | `rgba(255,255,255,0.04)` | Blur overlays | — | pair with `backdrop-blur(24px)` |

**Gradient tokens (derived):**
- `--gradient-accent`: `linear-gradient(135deg, #9EFF6E 0%, #B8A6FF 100%)` — для hero-акцентов, outline на featured cards.
- `--gradient-glass`: `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))` — для service cards.

**Why lime-primary:** обычная dark-luxe использует cyan/violet (Linear, Vercel, Rauno). Lime `#9EFF6E` — ship/go/live-ассоциация, редкость в сегменте → memorability. Violet-alt добавлен для gradient-перехода (lime solo на 100% UI приедается), warm-accent — для rare moments of warmth (success, hover sparkle).

---

## 4. Typography

### Families (locked)

- **Display serif:** `Migra` — Velvetyne, SIL OFL. Высокий контраст, editorial.
- **Sans primary (UI body):** `Inter Tight` — rsms + Google, OFL. Tight tracking делает его плотнее обычного Inter, ближе к Söhne.
- **Sans secondary (labels, badges):** `General Sans` — Fontshare (ITF Free). Geometric, чуть более character-full, чем Inter Tight.
- **Mono:** `JetBrains Mono` — JetBrains, OFL. Code, timestamps, process numerals.

**Self-host all** через `next/font/local` — zero external requests, stable LCP.

### Weights

| Family | Weights to ship |
|---|---|
| Migra | Extrabold (display only) |
| Inter Tight | 400, 500, 600 |
| General Sans | 500, 600 |
| JetBrains Mono | 400, 500, 700 |

### Size scale (8 steps, modular)

Base = 16px, ratio ≈ 1.333 (perfect fourth), с двумя display-скачками.

| Step | px | rem | Usage |
|---|---|---|---|
| `xs` | 12 | 0.75 | badges, meta, timestamps |
| `sm` | 14 | 0.875 | captions, footnotes |
| `base` | 16 | 1 | body |
| `md` | 20 | 1.25 | lead paragraph, notes intro |
| `lg` | 28 | 1.75 | section subtitle |
| `xl` | 40 | 2.5 | h3 |
| `2xl` | 64 | 4 | h2 |
| `3xl` | 96 | 6 | h1 non-hero |
| `hero` | 144 | 9 | hero h1 only, clamp(64, 12vw, 144) |

### Line-heights & measures

- Display (`lg`+): `1.05–1.1`, tracking `-0.02em`.
- Body (`base`, `md`): `1.6`, tracking `0`.
- Small (`xs`, `sm`): `1.5`, tracking `+0.01em`.
- Mono: `1.5`, tracking `0`.
- **Measure (max line length):** body `66ch`, /notes `72ch`, captions `48ch`.

### Role assignments

- `<h1>` hero — **Migra Extrabold** `hero`, line-height 1.0, tracking -0.03em.
- `<h1>` inner pages — **Migra Extrabold** `3xl`.
- `<h2>` — **Migra Extrabold** `2xl`.
- `<h3>` — **Inter Tight 600** `xl`.
- `<p>` body — **Inter Tight 400** `base`.
- Lead/intro — **Inter Tight 500** `md`, color `--fg-muted`.
- Labels, badges, tabs — **General Sans 600** `xs`, uppercase, tracking +0.08em.
- Code, timestamps, process nums (01–04) — **JetBrains Mono 500** variable.

**Why this pair:** Migra даёт editorial drama; Inter Tight — premium-UI workhorse (tighter чем обычный Inter); General Sans покрывает labels/nav, где Inter Tight выглядит generic; JetBrains Mono — единственный outlier, намеренно техничный для process numerals и /notes code blocks. Четыре семейства — максимум, дальше bundle пухнет.

---

## 5. Motion hints (для motion-designer)

Движение — всегда **expo-out** (`cubic-bezier(0.22, 1, 0.36, 1)`) для reveals, **quart-in-out** (`cubic-bezier(0.65, 0, 0.35, 1)`) для transforms. Три темпа: `200ms` hover, `600ms` component reveal, `1200ms` hero entrance — никаких default-300ms. Magnetic cursor всегда на `0.15` lerp, snake-nav underscore slides с accent-glow. Всё heavy отключается через `prefers-reduced-motion` — hero 3D → статичный PNG, scroll-reveals → instant opacity swap.

---

## 6. Tone of voice

**Three words we ARE:** `confident · self-aware · precise`
**Three words we are NOT:** `corporate · breathless · generic`

### Sample phrases

**EN:**
- Hero H1: `We ship apps, by the way.`
- Services lead: `Four things we do well. No decks, no fluff.`
- Work intro: `Shipped. Live. Running.`
- Contact CTA: `Have an idea? Let's talk — properly.`
- Error state: `Something broke. We noticed. Working on it.`

**UK:**
- Hero H1: `Ми робимо апки. Між іншим.`
- Services lead: `Чотири речі, які робимо добре. Без презентацій, без води.`
- Work intro: `Зроблено. Живе. Працює.`
- Contact CTA: `Є ідея? Поговорімо — по-справжньому.`
- Error state: `Щось зламалось. Ми в курсі. Лагодимо.`

**Rhythm rule:** short sentences. Periods over commas. One idea per line. Never end a CTA with `!`.

---

## 7. Usage do / don't

1. **Do** ставить dot accent `#9EFF6E` только на **одном** элементе на экран-viewport — это signature, не декор.
2. **Do** использовать Migra Extrabold только для display (≥40px). Ниже — serif теряет контраст и выглядит disabled.
3. **Do** комбинировать `--accent` и `--accent-alt` только в градиентах, не как solid-рядом-с-solid (режет глаз).
4. **Don't** применять Variant C wordmark ниже 96px — glow-dot смажется в артефакт.
5. **Don't** ставить body-текст цветом `--fg-dim` — он для borders, контраст 2.4:1 фейлит AA.
6. **Don't** инвертировать палитру для "light mode" — бренд dark-only; если нужен light-surface (email signature, print), используем inverted monogram, но не full-site light theme.

---

## 8. Asset checklist (экспорты)

**Для developer (`c:/AI/btw-site/public/`):**
- `favicon.ico` (16, 32, 48 multi-res)
- `favicon.svg` (Monogram 1, transparent bg)
- `apple-touch-icon.png` 180×180 (Monogram 1, rounded 20%)
- `icon-512.png`, `icon-192.png` (manifest.json)
- `og-default.png` 1200×630 (wordmark Variant C + accent-gradient bg)
- `og-notes-template.png`, `og-work-template.png` (шаблоны для `@vercel/og`)
- `wordmark-a.svg`, `wordmark-b.svg`, `wordmark-c.svg` (все три варианта, outlined paths)
- `monogram-1-dark.svg`, `monogram-1-inverted.svg`, `monogram-2.svg`
- `hero-fallback.png` 1920×1080 (статичный рендер 3D-сцены для reduced-motion)

**Для TG/соцсетей:**
- TG channel avatar — Monogram 1 (512×512 PNG)
- X/Twitter avatar — Monogram 2 (1024×1024 PNG)
- GitHub org avatar — Monogram 1 (512×512 PNG)
- LinkedIn company logo — Wordmark Variant A (1200×300 PNG, dark bg)

**Шрифты (`public/fonts/`):**
- `Migra-Extrabold.woff2`
- `InterTight-{400,500,600}.woff2`
- `GeneralSans-{500,600}.woff2`
- `JetBrainsMono-{400,500,700}.woff2`

**Для ux-designer:**
- Figma file с tokens (colors, type scale, spacing) — `c:/AI/btw-site/design/btw-tokens.fig` (создаст ux-designer на следующем шаге)

---

**Handoff:** этот kit — input для `ux-designer` (Phase 1.2, wireframes) и `image-prompt-engineer` (Phase 1.3, hero fallback + OG templates). Motion-designer (Phase 1.4) берёт motion-hints из §5 и раскрывает в motion-spec. Developer (Phase 2+) использует tokens из §3–4 как CSS variables в `app/globals.css`.
