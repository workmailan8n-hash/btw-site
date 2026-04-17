# BTW Studio — Motion Specification v1

Исходники: `c:/AI/btw-site/specs/btw-site.prd.md`, `C:\Users\frost\.claude\plans\elegant-bubbling-barto.md`. Стек: Next.js 15, Tailwind v4, Framer Motion 11, GSAP 3.12 (ScrollTrigger + SplitText), Lenis, @react-three/fiber. Эстетика — dark luxe, референс [design-psi-eight](https://design-psi-eight.vercel.app/).

---

## 1. Глобальные motion-токены

Все значения единые, добавляются в `lib/motion/tokens.ts`. Любой компонент ссылается только на токены — локальных `ease-in-out` не заводим.

```ts
// lib/motion/tokens.ts
export const ease = {
  expoOut:   [0.22, 1, 0.36, 1],     // reveal, entrance
  smooth:    [0.65, 0, 0.35, 1],     // transforms, parallax
  softOut:   [0.16, 1, 0.3, 1],      // text/char stagger
  snap:      [0.77, 0, 0.175, 1],    // CTA press, magnetic release
  bounce:    [0.34, 1.56, 0.64, 1],  // checkmark, success pop (редко)
} as const;

export const dur = {
  instant: 0.12,   // hover feedback, focus ring
  quick:   0.2,    // hover, underline
  base:    0.4,    // default UI transitions
  reveal:  0.6,    // scroll-reveal
  slow:    0.9,    // section-level reveals
  hero:    1.2,    // hero first paint + Spline intro
} as const;

export const stagger = {
  char:  0.025,    // SplitText per-char
  word:  0.06,     // word reveal
  card:  0.08,     // cards grid
  step:  0.14,     // process numbers
} as const;

export const gsapEase = {
  expoOut: 'expo.out',
  smooth:  'power3.inOut',
  softOut: 'power2.out',
} as const;
```

GSAP и Framer используют один и тот же смысл: `ease.expoOut` (FM) ≡ `gsapEase.expoOut`. Duration — только из `dur.*`. Никаких магических `300ms`.

---

## 2. Hero — wordmark, H1, 3D-сцена, scroll hint

### 2.1 Wordmark `BTW.` (navbar/top-left)
- **Path:** `components/menu/SnakeMenu.tsx > .wordmark`
- **Intent:** мгновенно заякорить бренд в фокус-зоне, задать тон.
- **Trigger:** first paint (после `fonts.ready` + hero hydration).
- **Properties:** `opacity 0→1`, `y 8→0`, `letter-spacing -0.02em→-0.02em` (только opacity/y анимируем).
- **Easing:** `ease.expoOut` · **Duration:** `dur.reveal` · **Delay:** 120 ms.
- **Library:** Framer Motion.

```tsx
<motion.span
  className="wordmark"
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: dur.reveal, ease: ease.expoOut, delay: 0.12 }}
>
  BTW<span className="text-accent">.</span>
</motion.span>
```

### 2.2 H1 `We ship apps, by the way.` — SplitText per-char
- **Path:** `components/hero/HeroTitle.tsx`
- **Intent:** editorial luxe — буквы выплывают снизу с микро-задержкой.
- **Trigger:** `document.fonts.ready` → GSAP timeline.
- **Properties:** per-char `yPercent 110→0`, `opacity 0→1`, `rotateX -20deg→0`.
- **Easing:** `expo.out` · **Duration:** 0.9 s · **Stagger:** `stagger.char` (25 ms).
- **Library:** GSAP + SplitText.

```tsx
useGSAP(() => {
  const split = new SplitText(ref.current, { type: 'chars,words' });
  gsap.set(split.chars, { yPercent: 110, rotateX: -20, opacity: 0 });
  gsap.to(split.chars, {
    yPercent: 0, rotateX: 0, opacity: 1,
    duration: 0.9, ease: gsapEase.expoOut,
    stagger: stagger.char, delay: 0.25,
  });
  return () => split.revert();
}, { scope: ref });
```
**Performance:** добавить `will-change: transform` на `.char` только внутри timeline, снять в `onComplete`. Каждый `<span>` — inline-block, иначе `yPercent` не работает.

### 2.3 3D glass-монолит — вход + pointer-reactive camera
- **Path:** `components/hero/HeroScene.tsx` (r3f, dynamic `ssr:false`).
- **Intent:** медленный «рассвет» — сцена fade-in, потом камера мягко следует за курсором.
- **Trigger:** Canvas `onCreated` → fade-in; `pointermove` на window → camera target.
- **Properties entrance:** `opacity 0→1` (на CSS-обёртке Canvas), `camera.position.z 8→4.2`, `scene.rotation.y -0.4→0`.
- **Easing:** `smooth` · **Duration:** `dur.hero` (1.2 s) · **Delay:** 200 ms.
- **Pointer:** lerp `camera.rotation.x/y` к `(mouseY * 0.08, mouseX * 0.12)` с `damping 0.08` (≈150 ms follow-lag).
- **Library:** r3f (`useFrame` + damp3) + Framer Motion на wrapper.

```tsx
useFrame((state, dt) => {
  const { pointer } = state;
  damp3(camera.position, [pointer.x * 0.6, pointer.y * 0.4, 4.2], 0.25, dt);
  damp3(mesh.rotation, [pointer.y * 0.08, pointer.x * 0.12, 0], 0.2, dt);
});
```
**Mobile (< 768px):** Canvas не монтируется, рендерится статичный PNG `/public/hero-fallback.webp` + лёгкий CSS `@keyframes pulse-glow 8s` на радиальном градиенте. Это экономит ~220 KB gzip three.js + Spline runtime.

### 2.4 Scroll hint `scroll ↓`
- **Path:** `components/hero/ScrollHint.tsx`
- **Intent:** сказать «тут есть ещё» без крика.
- **Properties:** `opacity 0.4 ↔ 1` + `y 0 ↔ 6` (loop).
- **Easing:** `sine.inOut` (GSAP) или `repeatType: 'mirror'` (FM).
- **Duration:** 1.6 s, бесконечный.
- **Exit:** при `scrollY > 60` — `opacity → 0`, `pointer-events: none`.

### 2.5 Hero exit (при скролле вниз)
- **Trigger:** `ScrollTrigger` на `#hero`, `start: 'top top'`, `end: 'bottom top'`, `scrub: 0.8`.
- **Properties:** H1 `opacity 1→0`, `y 0→-40`; Canvas wrapper `scale 1→0.92`, `opacity 1→0.6`.
- **Easing:** линейное (scrub), наложено на expo curve через `.to({ease: 'none'})`.

---

## 3. Services — 4 карточки (bento)

### 3.1 In-view stagger reveal
- **Path:** `components/services/ServiceCard.tsx`
- **Trigger:** `whileInView`, `viewport: { once: true, amount: 0.35 }`.
- **Properties:** `opacity 0→1`, `y 24→0`, `filter: blur(8px)→blur(0)`.
- **Easing:** `ease.expoOut` · **Duration:** `dur.reveal` · **Stagger:** `stagger.card` (80 ms).
- **Library:** Framer Motion.

```tsx
<motion.article
  initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
  viewport={{ once: true, amount: 0.35 }}
  transition={{ duration: dur.reveal, ease: ease.expoOut, delay: i * stagger.card }}
/>
```
**Performance:** `filter: blur` — GPU-дорогой, но один раз на вход; снимаем сразу после анимации (`onAnimationComplete` → `style.filter=''`). На mobile blur выключаем: `prefers-reduced-motion` + `(max-width: 768px)` — только opacity+y.

### 3.2 Hover 3D-tilt
- **Properties:** `rotateX ±6deg`, `rotateY ±10deg` в зависимости от позиции курсора внутри карты; `translateZ 0→12px`.
- **Easing:** `ease.smooth` · **Duration:** `dur.quick` (`200ms`).
- **Perspective:** `1200px` на родителе.
- **Library:** Framer Motion + `useMotionValue` + `useTransform`.

```tsx
const x = useMotionValue(0), y = useMotionValue(0);
const rX = useTransform(y, [-0.5, 0.5], [6, -6]);
const rY = useTransform(x, [-0.5, 0.5], [-10, 10]);
const onMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  x.set((e.clientX - r.left) / r.width - 0.5);
  y.set((e.clientY - r.top) / r.height - 0.5);
};
<motion.div style={{ rotateX: rX, rotateY: rY, transformPerspective: 1200 }} onMouseMove={onMove} />
```

### 3.3 Border neon-glow
- **Properties:** conic-gradient border — `--glow-angle: 0deg → 360deg` (CSS variable), `opacity 0→1` на hover.
- **Easing:** `ease.smooth` · **Duration:** 1.4 s вращение (infinite), `dur.quick` fade.
- **Implementation:** `@property --glow-angle` (CSS Houdini) + `conic-gradient(from var(--glow-angle), transparent, var(--accent), transparent)` маской поверх.
- **Mobile:** отключено — слишком затратно на repaint.

### 3.4 Mobile simplifications
- Tilt → off; hover-glow → off; оставляем только in-view fade+y.
- Вместо hover — один `active:scale-[0.98]` tap-feedback (`transition dur.instant`).

---

## 4. Selected Work — 3D-preview карточки

### 4.1 Reveal (общий паттерн)
- **Path:** `components/work/WorkCard.tsx`
- **Properties:** `opacity 0→1`, `y 32→0`, `clipPath: inset(0 0 100% 0)→inset(0 0 0 0)`.
- **Easing:** `ease.expoOut` · **Duration:** 0.8 s · **Stagger:** `stagger.card`.
- **Library:** Framer Motion + CSS clip-path.

### 4.2 Hover mask-reveal (постер → live preview)
- **Intent:** статичный poster уступает место loop-video/3D.
- **Properties:** overlay `clipPath: inset(100% 0 0 0)→inset(0 0 0 0)` (снизу вверх); под overlay видео `<video autoPlay muted loop playsInline>` включается через `onMouseEnter` (`video.play()`) и паузится на `onMouseLeave`.
- **Easing:** `ease.smooth` · **Duration:** 0.55 s.
- **Library:** Framer Motion `animate` на CSS var `--clip`.

```tsx
<motion.div
  className="absolute inset-0"
  style={{ clipPath: 'inset(100% 0 0 0)' }}
  whileHover={{ clipPath: 'inset(0% 0 0 0)' }}
  transition={{ duration: 0.55, ease: ease.smooth }}
>
  <video ref={vid} src={card.loop} muted loop playsInline />
</motion.div>
```

### 4.3 Image-to-3D swap hint
- После 400 ms hover — poster постепенно `opacity 1→0` (`dur.base`), под ним раскрывается `<Canvas>` с лёгким r3f-шейдером (lazy, `IntersectionObserver` подгружает chunk при приближении к viewport).
- **Fallback:** если WebGL context создать не удалось (Safari low-power) или hover < 400 ms — остаёмся на video loop.
- **Perf:** максимум 1 Canvas активен одновременно (state `activeCardId`); остальные paused.

### 4.4 External-link click feedback
- **Trigger:** `onClick` на `<a target="_blank">`.
- **Properties:** `scale 1→0.97→1`, neon underline `scaleX 0→1→0` за 350 ms.
- **Easing:** `ease.snap` · **Duration:** 0.25 s.
- Сразу после — открывается новая вкладка (`window.open` не блокируется, анимация идёт параллельно).
- **A11y:** визуально-скрытый `aria-label="opens in new tab"`.

---

## 5. Process — 4 numbered steps

### 5.1 Гигантские цифры 01–04 entrance
- **Path:** `components/process/ProcessSteps.tsx`
- **Intent:** editorial — цифры выкатываются снизу как вывеска.
- **Properties:** `yPercent 100→0`, `opacity 0→1`, `letter-spacing -0.04em→-0.02em`.
- **Easing:** `expo.out` · **Duration:** 1 s · **Stagger:** `stagger.step` (140 ms).
- **Library:** GSAP + ScrollTrigger.

### 5.2 Scroll-pinned stagger
- **Trigger:** `ScrollTrigger` на `#process`, `start: 'top 70%'`, `end: 'bottom 20%'`, `scrub: false` (non-scrub, одноразовый reveal), `toggleActions: 'play none none none'`.
- Для пина списка при медленном скролле — отдельный trigger `pin: true`, `end: '+=80%'`, `scrub: 0.6`.

```tsx
gsap.from('.step-number', {
  yPercent: 100, opacity: 0,
  duration: 1, ease: 'expo.out', stagger: 0.14,
  scrollTrigger: { trigger: '#process', start: 'top 70%', toggleActions: 'play none none reverse' },
});
```

### 5.3 Progress indicator (вертикальная линия)
- **Path:** `components/process/ProgressRail.tsx`
- **Properties:** линия `scaleY 0→1` (origin top), neon-lime.
- **Trigger:** тот же `ScrollTrigger`, но `scrub: true` (tie к scroll position).
- **Easing:** `ease: 'none'` (scrub линейный, визуально сглажено Lenis).
- **Perf:** `transform-origin: top`, `will-change: transform` активно только пока trigger `isActive`.

---

## 6. Notes preview — 3 карточки

### 6.1 Card stagger reveal
- **Properties:** `opacity 0→1`, `y 20→0`.
- **Easing:** `ease.expoOut` · **Duration:** `dur.reveal` · **Stagger:** `stagger.card`.
- **Library:** Framer Motion `whileInView`.

### 6.2 Hover glow + underline
- **Properties:** `box-shadow: 0 0 0 rgba(158,255,110,0) → 0 8px 32px rgba(158,255,110,0.15)`; title underline `scaleX 0→1` (origin-left).
- **Easing:** `ease.smooth` · **Duration:** `dur.quick`.
- **Perf caveat:** `box-shadow` — repaint-heavy. Mitigation: использовать отдельный `::after` layer с `filter: blur(20px)` и `opacity 0→1` вместо shadow → GPU composited.

### 6.3 Date micro-shift
- На hover: date-text `x 0→-2`, accent-dot `scale 1→1.4`. `dur.quick`, `ease.smooth`. Мелочь, но даёт «живость».

---

## 7. Contact CTA

### 7.1 H2 mega-text reveal
- **Path:** `components/contact/ContactCTA.tsx`
- **Properties:** SplitText per-word, `yPercent 100→0`, `opacity 0→1`, `skewY 4deg→0`.
- **Easing:** `expo.out` · **Duration:** 1 s · **Stagger:** `stagger.word`.
- **Trigger:** ScrollTrigger `start: 'top 75%'`, one-shot.

### 7.2 Magnetic-cursor button hover
- **Path:** `components/primitives/MagneticButton.tsx`
- **Intent:** кнопка «притягивает» курсор в радиусе 80 px.
- **Properties:** button `x`, `y` follow `(pointer - buttonCenter) * 0.35` при расстоянии < 80 px; внутренний label `x/y * 0.55` (больший коэффициент — parallax внутри).
- **Easing:** FM spring `{ stiffness: 200, damping: 18, mass: 0.4 }`.
- **Library:** Framer Motion `useMotionValue` + `useSpring`.
- **Release:** на `mouseleave` — `x,y → 0` через ту же пружину.

```tsx
const x = useSpring(0, { stiffness: 200, damping: 18, mass: 0.4 });
const y = useSpring(0, { stiffness: 200, damping: 18, mass: 0.4 });
const onMove = (e) => {
  const r = ref.current.getBoundingClientRect();
  const dx = e.clientX - (r.left + r.width / 2);
  const dy = e.clientY - (r.top + r.height / 2);
  if (Math.hypot(dx, dy) < 80) { x.set(dx * 0.35); y.set(dy * 0.35); }
};
```
**Touch:** `@media (hover: none)` — полностью off.

### 7.3 Primary CTA fill animation
- **Properties:** background — `linear-gradient(90deg, var(--accent) 50%, transparent 50%)`, `background-position: 100% 0 → 0% 0`.
- **Easing:** `ease.expoOut` · **Duration:** `dur.base` (0.4 s).
- На hover: fill слева-направо, text `color: var(--accent) → var(--bg-base)`. На mouse-leave — reverse.

---

## 8. Footer

- **Intent:** максимально сдержанно — финал.
- **Properties:** весь блок `opacity 0→1`, `y 12→0`. Без stagger.
- **Easing:** `ease.expoOut` · **Duration:** `dur.reveal`.
- **Trigger:** `whileInView amount: 0.2`, `once: true`.
- Social-иконки hover: `scale 1→1.08`, `color: var(--fg-muted) → var(--accent)`, `dur.quick`.

---

## 9. Navigation — snake-menu

### 9.1 Show/hide on scroll direction
- **Path:** `components/menu/SnakeMenu.tsx`
- **Logic:** отслеживаем `scrollY` через Lenis `on('scroll')`. Накапливаем `lastY`; если `currY - lastY > 6` и `currY > 100` → hide; если `lastY - currY > 6` → show; top < 100 — всегда show.
- **Properties:** `y 0→-100%`, `opacity 1→0`.
- **Easing:** `ease.expoOut` · **Duration:** `dur.base`.

```tsx
lenis.on('scroll', ({ scroll, direction }) => {
  if (scroll < 100) setHidden(false);
  else if (direction === 1 && scroll - lastY > 6) setHidden(true);
  else if (direction === -1 && lastY - scroll > 6) setHidden(false);
  lastY = scroll;
});
```

### 9.2 Underline-follow on link hover
- **Intent:** один underline «перемещается» к hovered-ссылке (как у Rauno).
- **Properties:** absolute-positioned `<span className="rail" />` под `<nav>`, `x` и `width` считаются от bbox hovered `<a>`; пружина.
- **Easing:** FM spring `{ stiffness: 260, damping: 30 }`.
- На `mouseleave` nav — `width → 0` (`dur.quick`, `ease.smooth`).

### 9.3 EN↔UK toggle
- **Properties:** pill-container `width` анимируется от ширины активного label; thumb `x` ползёт к активному; неактивный label `opacity 0.5`, активный `1`.
- **Easing:** `ease.expoOut` · **Duration:** `dur.base`.
- **A11y:** `<button role="switch" aria-checked>` + `aria-label="Switch language"`.

---

## 10. Magnetic cursor (desktop only)

- **Path:** `components/cursor/MagneticCursor.tsx`
- **Variants:**
  - `default` — кружок 12 px, `border: 1px solid var(--fg-muted)`, `mix-blend-mode: difference`.
  - `hover` — scale 3.2, `background: var(--accent)`, без border, `mix-blend-mode: difference` даёт «вырезающий» эффект.
  - `text` — width 2 px, height 24 px, `border-radius: 1px` (текстовый карет над input/textarea).
- **Follow lag:** FM `useSpring({ stiffness: 150, damping: 20, mass: 0.3 })` → ~120 ms follow.
- **Touch disable:** hook `useIsCoarsePointer()` (`matchMedia('(hover: none)')`) — component возвращает `null`.
- **Перф:** `position: fixed`, `pointer-events: none`, `will-change: transform`, единственный элемент в `<body>`. Никаких box-shadow внутри курсора.

```tsx
const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 20, mass: 0.3 });
const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 20, mass: 0.3 });
useEffect(() => {
  const onMove = (e) => { x.set(e.clientX); y.set(e.clientY); };
  window.addEventListener('pointermove', onMove);
  return () => window.removeEventListener('pointermove', onMove);
}, []);
```

---

## 11. Page transitions

- **Library:** Framer Motion + `AnimatePresence mode="wait"` в `[locale]/template.tsx` (или custom layout).
- **Properties:** exit `opacity 1→0`, `y 0→-16`; enter `opacity 0→1`, `y 16→0`.
- **Easing:** `ease.expoOut` · **Duration:** `dur.base`.
- **Prefetch:** `<Link prefetch>` Next.js + дополнительно `onMouseEnter` → `router.prefetch(href)` (для анкоров вне `<Link>`).
- **Scroll reset:** при navigation через router — `lenis.scrollTo(0, { immediate: true })` в `useEffect` на pathname change.

```tsx
<AnimatePresence mode="wait">
  <motion.main
    key={pathname}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: dur.base, ease: ease.expoOut }}
  >
    {children}
  </motion.main>
</AnimatePresence>
```

---

## 12. Loading states — contact form submit

- **Sequence:** idle → submitting → success (или error).
- **Idle → submitting:** button label `opacity 1→0` + spinner `opacity 0→1`, `scale 0.8→1`, rotation `360deg infinite` (1 s linear). Button disabled, `pointer-events: none`.
- **Submitting → success:** spinner `opacity 1→0`, checkmark SVG с `stroke-dasharray/dashoffset` анимацией: `strokeDashoffset: 48→0` за 0.4 s `ease.expoOut`, затем scale `0.8→1.1→1` (`ease.bounce`, 0.3 s). Accent background flash: `opacity 0→0.4→0` (600 ms).
- **Error:** button `x: [0, -6, 6, -4, 4, 0]` keyframes за 0.4 s (`ease.smooth`), border `→ #ff5f5f` на 1.5 s → fade back.
- **Library:** Framer Motion variants.

```tsx
<motion.svg viewBox="0 0 24 24" initial="hidden" animate={status === 'success' ? 'visible' : 'hidden'}>
  <motion.path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2" fill="none"
    variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
    transition={{ duration: 0.4, ease: ease.expoOut }} />
</motion.svg>
```

---

## 13. Accessibility gates — prefers-reduced-motion

Единый хук `useReducedMotion()` (Framer Motion предоставляет) + media-query на CSS-уровне.

**Что сохраняется (instant, без анимации):**
- Opacity-only fade (0→1, `dur.instant`). Никаких `y`, `scale`, `filter`, `clipPath`.
- Hero: H1 показывается целиком, 3D → PNG fallback, pointer-reactive camera off.
- Process: цифры появляются без `yPercent`, только `opacity`.
- Scroll-hint: статичная стрелка (loop off).
- Cursor: magnetic отключён (обычный курсор).

**Глобальный CSS-fallback:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Mobile simplifications (`< 768px`):**
- 3D Canvas → PNG/WebP fallback.
- Tilt/parallax off.
- Magnetic cursor disabled (`hover: none`).
- Lenis — оставляем, но `lerp: 0.1` → `lerp: 0.15` (быстрее).
- Blur-filter в reveal — off, только opacity+y.

**Slow-device fallback:**
- Детект: `navigator.hardwareConcurrency < 4 || navigator.deviceMemory < 4`.
- Действия: `disableCanvas = true`, stagger → 0, `dur.slow → dur.base`, hover 3D-tilt off.

---

## 14. Performance flags

| Риск | Где | Mitigation |
|---|---|---|
| `filter: blur()` в reveal карточек | services/work reveal | blur только до `onAnimationComplete`, снимать. На mobile полностью off. |
| `box-shadow` на hover (notes) | NotesCard hover | заменить на `::after` + `filter: blur` layer, GPU composited. |
| Layout thrash на SplitText | HeroTitle, ContactCTA | Split один раз после `fonts.ready`; не ре-split при resize — вместо этого pause timeline и re-measure через `ResizeObserver` с debounce 200 ms. |
| Canvas (r3f) на каждой work-карточке | work grid | Держать **1** активный Canvas (state `activeCardId`); остальные paused / destroyed. |
| Lenis + ScrollTrigger рассинхрон | весь сайт | `ScrollTrigger.scrollerProxy(document.body, {...})` + `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add((t) => lenis.raf(t * 1000))`. Setup один раз в root. |
| `will-change` на всём | весь сайт | применять только во время активной фазы анимации: `onAnimationStart` set, `onAnimationComplete` unset. Никаких statically-applied `will-change: transform` на `.card`. |
| Conic-gradient border animation (services) | ServiceCard hover | `@property --glow-angle` (Houdini) для GPU interp; fallback — skip на Firefox (`@supports not (background: paint(worklet))`). |
| three.js bundle | hero | dynamic `ssr:false`, mount через `IntersectionObserver`. Budget: three core ≤ 130 KB gzip. |
| Repaint на sticky-menu show/hide | SnakeMenu | transform-only (`translateY`), никаких `top/height`; `contain: paint` на `<nav>`. |
| Video autoplay на hover (work) | WorkCard | `preload="none"`, `video.play()` только по `mouseenter` с throttle 100 ms. Pause + `currentTime = 0` на leave. |
| SSR hydration mismatch для Magnetic cursor | root layout | Компонент mount только после `useEffect` (client-only), пока — `null`. |

---

## Итог

- Все motion завязано на 5 easings + 6 durations + 4 stagger-пресета.
- Framer Motion — UI/hover/reveals/transitions. GSAP — ScrollTrigger, SplitText, pinning.
- Lenis синхронизирован с GSAP через scrollerProxy и общий RAF-тикер.
- Reduced-motion сохраняет только opacity-fade; mobile — без 3D, без tilt, без magnetic cursor.
- Все «дорогие» свойства (blur, box-shadow, will-change) — временные, снимаются после анимации.
