'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ease, stagger } from '@/lib/motion/tokens';
import { useLocale } from '@/lib/i18n/context';

type Project = {
  name: string;
  tagKey: string; // key into t.work.tags
  year: string;
  href?: string;
  stealth?: boolean;
  status: 'Live' | 'NDA' | 'Archived';
  stack: string[];
  accent: string;
  gradient: string;
};

const projects: Project[] = [
  {
    name: 'Agent Dashboard',
    tagKey: 'Pixel-art agent visualizer',
    year: '2026',
    href: 'https://agent-dashboard-ancient-mountain-4835.fly.dev',
    status: 'Live',
    stack: ['Node.js', 'WebSocket', 'Canvas 2D', 'Fly.io'],
    accent: '#9EFF6E',
    gradient:
      'radial-gradient(ellipse at 20% 30%, rgba(158,255,110,0.35), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(184,166,255,0.2), transparent 60%)',
  },
  {
    name: 'CourseAI',
    tagKey: 'AI course generator',
    year: '2026',
    href: 'https://courseai-jade.vercel.app',
    status: 'Live',
    stack: ['Next.js', 'Prisma', 'Gemini', 'Stripe'],
    accent: '#B8A6FF',
    gradient:
      'radial-gradient(ellipse at 60% 30%, rgba(184,166,255,0.4), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(255,184,107,0.2), transparent 60%)',
  },
  {
    name: 'Content Channel',
    tagKey: 'Multi-platform publisher',
    year: '2025',
    status: 'Live',
    stack: ['Node.js', 'Grammy', 'Claude', 'Cron'],
    accent: '#9EFF6E',
    gradient:
      'radial-gradient(ellipse at 30% 60%, rgba(158,255,110,0.32), transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(255,184,107,0.2), transparent 60%)',
  },
  {
    name: '@btw_aitech',
    tagKey: 'Building in public',
    year: '2026',
    href: 'https://t.me/btw_aitech',
    status: 'Live',
    stack: ['Telegram', 'n8n', 'Obsidian', 'Notion'],
    accent: '#FFB86B',
    gradient:
      'radial-gradient(ellipse at 50% 50%, rgba(255,184,107,0.32), transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(184,166,255,0.2), transparent 60%)',
  },
];

export function Work() {
  const { t } = useLocale();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const active = activeIdx !== null ? projects[activeIdx] : null;

  const statusLabel = (status: Project['status']) =>
    status === 'Live'
      ? t.work.statusLive
      : status === 'NDA'
        ? t.work.statusNda
        : t.work.statusArchived;

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="px-6 md:px-12 lg:px-20 py-24 md:py-32"
    >
      <div className="flex items-baseline justify-between mb-12">
        <h2
          id="work-heading"
          className="font-[var(--font-display)] text-4xl md:text-6xl tracking-[-0.02em] pb-2"
        >
          {t.work.heading} <span className="text-[color:var(--color-fg-dim)]">/ 2024–2026</span>
        </h2>
        <span className="hidden md:block font-mono text-xs text-[color:var(--color-fg-meta)]">
          {projects.length} {t.work.counterOne}
        </span>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
        <ul
          onMouseLeave={() => setActiveIdx(null)}
          className="divide-y divide-[color:var(--color-fg-dim)]/30"
        >
          <li className="hidden md:grid grid-cols-[60px_1.5fr_2fr_auto] gap-6 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-fg-dim)]">
            <span>{t.work.colYear}</span>
            <span>{t.work.colProject}</span>
            <span>{t.work.colStack}</span>
            <span>{t.work.colStatus}</span>
          </li>

          {projects.map((p, i) => {
            const Row = p.href ? motion.a : motion.div;
            const extra = p.href
              ? {
                  href: p.href,
                  target: '_blank' as const,
                  rel: 'noopener noreferrer',
                  'aria-label': `${p.name} — open (new tab)`,
                }
              : { 'aria-label': `${p.name} (under NDA)` };

            const tag = t.work.tags[p.tagKey] ?? p.tagKey;

            return (
              <li key={p.name}>
                <Row
                  {...extra}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.6,
                    ease: ease.expoOut,
                    delay: i * stagger.card,
                  }}
                  onMouseEnter={() => setActiveIdx(i)}
                  onFocus={() => setActiveIdx(i)}
                  className={`group grid grid-cols-[60px_1.5fr_2fr_auto] gap-6 py-6 md:py-8 items-baseline border-l-2 border-transparent transition-all duration-300 hover:pl-4 ${
                    p.href ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  style={{
                    borderLeftColor: activeIdx === i ? p.accent : 'transparent',
                  }}
                >
                  <span className="font-mono text-xs text-[color:var(--color-fg-meta)]">
                    {p.year}
                  </span>

                  <div>
                    <h3
                      className="font-[var(--font-display)] text-2xl md:text-4xl tracking-[-0.02em] leading-[1.1] pb-1 transition-colors"
                      style={{
                        color: activeIdx === i ? p.accent : 'var(--color-fg-primary)',
                      }}
                    >
                      {p.name}
                      {p.href && (
                        <span
                          aria-hidden
                          className="inline-block ml-3 text-[color:var(--color-fg-muted)] transition-transform group-hover:translate-x-2 group-hover:-translate-y-1"
                        >
                          ↗
                        </span>
                      )}
                    </h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-[color:var(--color-fg-meta)]">
                      {tag}
                    </p>
                  </div>

                  <ul className="hidden md:flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-[color:var(--color-fg-muted)]">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>

                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.12em] px-3 py-1 border rounded-full whitespace-nowrap"
                    style={{
                      borderColor: p.status === 'Live' ? p.accent + '60' : 'rgba(74,74,82,0.6)',
                      color: p.status === 'Live' ? p.accent : 'var(--color-fg-meta)',
                    }}
                  >
                    {statusLabel(p.status)}
                  </span>
                </Row>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block w-[360px] sticky top-28 self-start">
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[color:var(--color-fg-dim)]/40">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: ease.expoOut }}
                  className="absolute inset-0 flex flex-col justify-end p-6"
                  style={{ background: active.gradient }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                    }}
                  />
                  <span
                    aria-hidden
                    className="absolute top-6 right-6 w-3 h-3 rounded-full"
                    style={{
                      background: active.accent,
                      boxShadow: `0 0 20px ${active.accent}`,
                    }}
                  />
                  <div className="relative">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-fg-meta)]">
                      {active.year} · {statusLabel(active.status)}
                    </span>
                    <h3
                      className="mt-2 font-[var(--font-display)] text-3xl tracking-[-0.02em] leading-[1.1] pb-1"
                      style={{ color: active.accent }}
                    >
                      {active.name}
                    </h3>
                    <p className="mt-2 text-sm text-[color:var(--color-fg-primary)]/80">
                      {t.work.tags[active.tagKey] ?? active.tagKey}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center bg-[color:var(--color-bg-elev-1)]"
                >
                  <span className="font-mono text-xs text-[color:var(--color-fg-dim)] uppercase tracking-[0.12em]">
                    {t.work.hoverHint}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
