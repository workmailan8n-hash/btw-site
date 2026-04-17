# BTW Hero 3D Scene — Design Spec (r3f)

**Автор:** 3d-scene-designer
**Дата:** 2026-04-17
**Целевой компонент:** `components/hero/HeroScene.tsx`
**Тех-ограничение:** `@react-three/fiber` + `@react-three/drei` + `three@0.160+`. **NO Spline.**
**Бюджет:** сцена ≤ 180 KB gzip (поверх three ~150 KB), 5-50k треугольников, ≤ 50% GPU, LCP ≤ 2.0s.

---

## Scene intent (общая рамка)

Hero — это «витрина предмета» в галерее, не перегруженная VFX-инсталляция. Один центральный объект, ambient тени, **медленное** вращение, реактивность на курсор в пределах 4-8°. Editorial-brutalist требует сдержанности: один материал-герой + один свет-герой, всё остальное служит им. Палитра `#07070A` фон, акценты `#9EFF6E` (rim/emissive) и `#B8A6FF` (fill), стекло или iridescent.

---

## Variant A — Glass Monolith с BTW Wordmark

### 1. Scene intent
Прямоугольный монолит-«слиток» из тяжёлого стекла с вытравленным 3D-экструзионным wordmark `BTW.` внутри (displacement). Точка-акцент горит emissive-lime. Премиальный «artifact-in-vitrine» vibe, ассоциируется с «продуктом на витрине» — прямо отражает «we ship apps».

### 2. Composition
- **Camera:** PerspectiveCamera, FOV 32° (long-lens feel), position `[0, 0.4, 4.8]`, lookAt `[0, 0, 0]`. Узкий FOV даёт «editorial product-shot» сжатие.
- **Subject:** монолит 1.6 × 2.2 × 0.35 (w×h×d). Внутри через CSG (или pre-baked GLB) — embossed `BTW.`, глубина вырезания 0.08.
- **Secondary:** 1 floor plane (receives ground shadow via ContactShadows), subtle fog слегка стирающий задник.
- **Aspect:** desktop 16:9 / mobile 4:5 (переверстать camera `position.z = 6.2` для mobile).

### 3. Lighting rig
- **Key:** directionalLight, intensity 1.8, color `#FFFFFF`, position `[4, 5, 3]`, castShadow (map 1024).
- **Fill:** pointLight, intensity 0.35, color `#B8A6FF`, position `[-3, 1, 2]` — мягкий violet на теневой стороне.
- **Rim/emissive:** точка-акцент в wordmark — emissiveIntensity 2.2, color `#9EFF6E`. Плюс rectAreaLight сзади (`#9EFF6E`, intensity 0.6, 2×1) для green edge-kick.
- **Ambient:** `<Environment preset="studio" />` drei (или custom HDRI 512×256, ~40 KB) для реалистичного glass refraction.

### 4. Materials (per-object)
**Monolith (MeshPhysicalMaterial):**
- color `#E8E8F0`
- roughness 0.08
- metalness 0.0
- transmission 0.95
- ior 1.52
- thickness 1.2
- attenuationColor `#B8A6FF`
- attenuationDistance 2.0
- clearcoat 1.0
- clearcoatRoughness 0.04

**Wordmark inlay (MeshStandardMaterial):**
- color `#0A0A0E`
- roughness 0.35
- metalness 0.1
- emissive `#9EFF6E` только на точке-акценте (mask через vertex colors или отдельный mesh)
- emissiveIntensity 2.2

**Floor (ShadowMaterial):** opacity 0.35.

### 5. Animation
- **Camera:** orbital micro-drift ±0.05 rad per 12s (useFrame sinusoidal).
- **Subject:** idle rotation.y = 0.04 rad/s, pointer parallax ±0.12 rad (lerp 0.06).
- **Accent dot:** emissiveIntensity pulse 1.8 → 2.6 per 3.5s (sine).

### 6. Interactivity
- Pointer → subject.rotation lerp (disable на touch).
- Scroll: `useScroll` from drei — camera.z from 4.8 → 5.4 на первых 100vh (плавный dolly-out при скролле на services).
- `document.hidden` → `frameloop="never"` (переключение через state).

### 7. Performance
- **Polycount:** monolith 3k (beveled box, subdiv 2) + wordmark 8k (extruded TextGeometry с low segments) + floor 2 = **~11k tris**.
- **Draw calls:** 4-5.
- **FPS target:** 60 desktop, 30 mobile (fallback за 30).
- **Transmission cost:** MeshPhysicalMaterial + transmission ≈ 3-4ms/frame → OK.

---

## Variant B — Particle Field forming BTW Letter-forms

### 1. Scene intent
Instanced mesh из 4-8k мелких тетраэдров, которые через useFrame сходятся к surface-sampled позициям 3D-текста `BTW.` и медленно дышат. При pointer-interaction поле «расходится» wave-эффектом от курсора. Vibe — digital-artisan, «building in public», точки = проекты, собирающиеся в слово.

### 2. Composition
- **Camera:** FOV 40°, position `[0, 0, 6]`, lookAt `[0, 0, 0]`.
- **Subject:** облако 6k instanced meshes (tetrahedron r=0.02), target-positions sampled from `TextGeometry('BTW.')` поверхности через MeshSurfaceSampler.
- **Secondary:** тонкая grid-plane сзади (opacity 0.05) для хинта глубины.

### 3. Lighting rig
- **Key:** directionalLight 1.2, `#F5F5F7`, `[3, 4, 5]`.
- **Fill:** ambientLight 0.25.
- **Rim:** pointLight `#9EFF6E`, intensity 1.4, position `[0, 0, -2]` — зелёный backlight подсвечивает силуэт.
- Env: none (performance).

### 4. Materials
**Particles (InstancedMesh + MeshStandardMaterial):**
- color `#F5F5F7`
- roughness 0.5
- metalness 0.2
- emissive `#9EFF6E` × per-instance (через instanceColor, 15% частиц)
- emissiveIntensity 0.8

**Background plane:** MeshBasicMaterial, color `#0F0F14`, wireframe true, opacity 0.06.

### 5. Animation
- **Formation:** GSAP timeline on mount — частицы от random → target (1.6s, expo-out).
- **Idle:** каждая частица добавляет per-instance sine-noise ±0.04 (useFrame, `Math.sin(time + i * 0.1)`).
- **Pointer:** ripple от pointer-raycast на невидимой plane → push частиц в радиусе 1.2, decay 0.3s.

### 6. Interactivity
- Pointer wave (как выше).
- Scroll: fade-out opacity 1 → 0 на 80vh (прощание со сценой).
- Reduced-motion: статичная сформированная надпись, без dispersion.

### 7. Performance
- **Polycount:** 6000 × 4 tri tetra = **24k tris**.
- **Draw calls:** 1 (InstancedMesh) + 2 (bg, hidden picker) = **3**.
- **FPS:** 60 desktop, ~40 mobile (instanced дёшев). Risk: per-frame position updates на CPU — держим ≤ 6k instances.
- **Bundle:** +MeshSurfaceSampler ~4 KB, TextGeometry font loader ~60 KB (Inter Tight JSON).

---

## Variant C — Organic Iridescent Blob (shader-driven)

### 1. Scene intent
Процедурная капля (IcosahedronGeometry + vertex displacement через simplex noise в onBeforeCompile) с iridescent-clearcoat материалом. Форма «дышит» и плавно вращается. Vibe — lush, tactile, couture. Сильнее всего бьёт в «premium boutique app studio», слабее в «ship / build».

### 2. Composition
- **Camera:** FOV 35°, position `[0, 0, 5]`, lookAt `[0, 0, 0]`.
- **Subject:** Blob radius 1.2, icosahedron detail 6 (2562 tris, sufficient для smooth noise).
- **Secondary:** крупная gradient-plane backdrop (violet→black radial).

### 3. Lighting rig
- **Key:** directionalLight 1.0 white `[2, 3, 4]`.
- **Fill:** pointLight `#B8A6FF` 0.8 `[-3, 0, 2]`.
- **Rim:** pointLight `#9EFF6E` 1.0 `[0, -2, -3]`.
- **Env:** drei `<Environment preset="city" />` (встроенный, ~60 KB) — критично для iridescence read.

### 4. Materials
**Blob (MeshPhysicalMaterial):**
- color `#1A1A22`
- roughness 0.15
- metalness 0.3
- iridescence 1.0
- iridescenceIOR 1.3
- iridescenceThicknessRange `[100, 800]`
- clearcoat 1.0
- clearcoatRoughness 0.1
- Custom onBeforeCompile: vertex displacement `position += normal * simplex3(position * 0.8 + time * 0.2) * 0.15`.

**Backdrop:** ShaderMaterial radial gradient `#07070A` → `#1A0F2A`.

### 5. Animation
- Blob rotation.y = 0.08 rad/s.
- Shader uniform `uTime` tick.
- Pointer → shift displacement seed ±0.3 (lerp 0.04).

### 6. Interactivity
- Pointer parallax + noise-offset.
- Scroll: scale 1 → 0.85 (отступает при скролле).
- Click: «pulse» — displacement amp 0.15 → 0.28 → 0.15 на 600ms.

### 7. Performance
- **Polycount:** ~2.5k tris.
- **Draw calls:** 3.
- **Shader cost:** vertex displacement + iridescence ≈ 4-5ms/frame → приемлемо, но требует env-map (размер sampling bandwidth).
- **Risk:** iridescence + clearcoat на mobile GPU Adreno 6xx падает до 25-30 FPS.

---

## Recommendation — **Variant A (Glass Monolith)**

**Почему A:**

1. **Brand alignment.** `BTW.` как embossed 3D-текст внутри стеклянной пластины = физическое воплощение wordmark. Витрина = ship-able product. Referent design-psi-eight.vercel.app использует именно этот жанр: один контрольный объект, editorial lens. Blob (C) слишком organic и «креативно-агентство», Particles (B) слишком tech-demo и спорит с вниманием на H1.

2. **Bundle weight.** Variant A не нуждается в TextGeometry font JSON (60 KB) или Environment presets (60 KB) — можно обойтись `<Environment preset="studio" />` уже встроенного в drei (заложен) или самодельной HDRI 512×256 (40 KB). **Итог: сцена + assets ~85 KB gzip** поверх three.js. Вариант B тащит font JSON, C — env-map обязательно. A — самый бюджетный.

3. **Implementation time.** 1 день на prototype, 1 день на polish. GLB модель монолита с embossed `BTW.` экспортируется из Blender за 30 минут (просто Boolean). B требует surface-sampling pipeline + GSAP timeline + raycast wave — 2-3 дня. C требует custom shader onBeforeCompile + noise импорт — 2 дня, плюс риски на mobile.

4. **Mobile fallback quality.** Статичный PNG монолита под studio-light получается очень фотогеничным (Blender render 2560×1440, ~120 KB AVIF). PNG частиц (B) или блоба (C) смотрится невыразительно без движения. A выигрывает как в 3D-, так и в fallback-режиме.

5. **Reactivity signal.** Пользователь двигает курсор → стекло ловит highlight другим углом → ощущение «живого материала» с минимумом кода (просто rotation lerp + transmission). B требует wave recompute, C — shader uniform update — более тонкая настройка.

---

## r3f code sketch — Variant A

```tsx
// components/hero/HeroScene.tsx
'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, useGLTF, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

function Monolith() {
  const { nodes } = useGLTF('/models/btw-monolith.glb') // bakes: monolith + wordmark + dot
  const group = useRef<THREE.Group>(null!)
  const dot = useRef<THREE.MeshStandardMaterial>(null!)
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const h = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', h)
    return () => window.removeEventListener('pointermove', h)
  }, [])

  useFrame((state, dt) => {
    const g = group.current
    g.rotation.y += dt * 0.04
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, g.rotation.y + pointer.current.x * 0.12, 0.06)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.current.y * -0.08, 0.06)
    dot.current.emissiveIntensity = 1.8 + Math.sin(state.clock.elapsedTime * 1.8) * 0.4
  })

  return (
    <group ref={group}>
      <mesh geometry={(nodes.monolith as THREE.Mesh).geometry} castShadow>
        <meshPhysicalMaterial
          color="#E8E8F0" roughness={0.08} metalness={0} transmission={0.95}
          ior={1.52} thickness={1.2} attenuationColor="#B8A6FF" attenuationDistance={2}
          clearcoat={1} clearcoatRoughness={0.04}
        />
      </mesh>
      <mesh geometry={(nodes.wordmark as THREE.Mesh).geometry}>
        <meshStandardMaterial color="#0A0A0E" roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh geometry={(nodes.accent_dot as THREE.Mesh).geometry}>
        <meshStandardMaterial ref={dot} color="#9EFF6E" emissive="#9EFF6E" emissiveIntensity={2.2} />
      </mesh>
    </group>
  )
}

export default function HeroScene() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const onVis = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <Canvas shadows dpr={[1, 1.75]} frameloop={visible ? 'always' : 'never'} gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera makeDefault fov={32} position={[0, 0.4, 4.8]} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[4, 5, 3]} intensity={1.8} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-3, 1, 2]} intensity={0.35} color="#B8A6FF" />
        <rectAreaLight position={[0, 0, -2]} width={2} height={1} intensity={0.6} color="#9EFF6E" />
        <Monolith />
        <ContactShadows position={[0, -1.4, 0]} opacity={0.35} blur={2.4} scale={6} />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  )
}
useGLTF.preload('/models/btw-monolith.glb')
```

**Использование:**
```tsx
const HeroScene = dynamic(() => import('@/components/hero/HeroScene'), { ssr: false, loading: () => <HeroFallback /> })
```

---

## Fallback chain

1. **`prefers-reduced-motion: reduce`** → `<HeroFallback>` (Next/Image, AVIF 120 KB, priority).
2. **viewport < 768px** → `<HeroFallback>` (тот же AVIF, обрезанный crop 4:5).
3. **no-WebGL** → feature-detect `!document.createElement('canvas').getContext('webgl2')` → fallback.
4. **FPS < 20 в течение 2s** → switch `frameloop="never"` + заморозка последнего кадра (канвас остаётся, но useFrame остановлен). Метрика через `useFrame((s) => fpsMonitor(s.clock))`.
5. **IntersectionObserver** — Canvas монтируется только когда hero в viewport (но при первом рендере он всегда в viewport, так что это защита от мобильного скролла назад).

---

## Tool justification — почему r3f, не Spline

| Критерий | r3f | Spline |
|---|---|---|
| **Vendor lock-in** | нет, open source | `.splinecode` runtime + платный tier для editing |
| **Bundle granularity** | tree-shake three.js features; можно обрезать до 90 KB core | Spline runtime ~180 KB gzip, не tree-shakeable |
| **React state reactivity** | `useFrame`, refs, useState — нативно | через postMessage events, лаг и абстракция |
| **Diff в git** | `.glb` (binary, но заменяемый) + TS код (diffable) | `.splinecode` binary, непрозрачен в review |
| **Theming** | CSS vars → uniforms через props | редактирование в Spline editor → повторный экспорт |
| **A11y / RM** | доступ к `prefers-reduced-motion` в коде напрямую | Spline имеет опцию, но гранулярность ниже |
| **Custom shaders** | `onBeforeCompile`, GLSL — полный доступ | ограниченный набор node-shader |
| **Mobile fallback** | тот же компонент решает через feature-detect | требует параллельно держать static export |

**Что r3f даёт, чего Spline не даст:** (1) per-component lazy-load через `React.lazy` на уровне отдельных частей сцены; (2) динамическая подмена материалов от CSS-tokens (dark/theme toggle future-proof); (3) SSR-safe compound (Canvas сам `'use client'`, но логика сцены типизирована на сервере); (4) прямая интеграция с GSAP ScrollTrigger / Lenis без bridge; (5) возможность переиспользовать `<Monolith/>` в work-карточках как mini-preview без повторной загрузки runtime.

**Bundle итог для рекомендованного Variant A:**
- three.js core: ~150 KB gzip
- @react-three/fiber: ~20 KB
- @react-three/drei (только imports: Environment, ContactShadows, useGLTF, PerspectiveCamera — tree-shaken): ~35 KB
- monolith.glb: ~80 KB (optimized through gltfpack)
- **Total incremental: ~285 KB** → помещается в 350 KB budget, оставляя ~65 KB для GSAP-chunk hero-анимации.

---

## Assets checklist (для developer)

- `/public/models/btw-monolith.glb` — Blender source → gltf-pipeline → gltfpack meshopt. 3 meshes (monolith, wordmark, accent_dot), no textures, ~80 KB.
- `/public/fallback/hero.avif` — рендер из Blender Cycles (cycles samples 128, denoise), 2560×1440, AVIF q=55, ~120 KB. Срез для mobile 1080×1350 отдельно ~70 KB.
- `/public/models/btw-monolith-draco.glb` — резерв с DRACO-компрессией, если budget трещит.
- Нет textures, нет HDRI — используем drei `<Environment preset="studio" />` (встроенный).

---

## Поля для ручной настройки (dev iteration)

Оставить как leva-controls (dev-only) или CSS-vars:
- `transmission` (0.85–0.98) — подтянуть читаемость wordmark.
- `accent_dot.emissiveIntensity` (1.6–2.8) — яркость точки под целевой brand feel.
- `directionalLight.intensity` (1.4–2.2) — контраст highlight на стекле.
- camera `position.z` (4.4–5.2) — масштаб монолита в кадре.

---

**Готово.** Developer может брать r3f-sketch и `.glb` спеку как непосредственную реализацию. Phase 2 implementation по timeline: ~1.5 дня на 3D + ~0.5 дня на fallback chain и тесты.
