'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/i18n/context';

const stack = [
  {
    title: 'Frontend',
    items: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind', 'Framer Motion', 'r3f'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Prisma', 'Neon', 'Supabase', 'NextAuth', 'Resend'],
  },
  {
    title: 'AI',
    items: ['Claude', 'OpenAI', 'Ollama', 'Gemma', 'LangChain', 'MCP'],
  },
  {
    title: 'Infra',
    items: ['Fly.io', 'Vercel', 'Docker', 'GitHub Actions', 'Cloudflare', 'Plausible'],
  },
];

export function AboutContent() {
  const { t } = useLocale();

  return (
    <div className="max-w-[1100px] mx-auto">
      <h1 className="font-[var(--font-display)] text-5xl md:text-7xl tracking-[-0.03em] pb-3">
        {t.about.heading}
      </h1>

      <section className="mt-16 max-w-[680px]">
        <h2 className="font-[var(--font-display)] text-4xl md:text-5xl leading-[1.1] tracking-[-0.02em] pb-2">
          {t.about.manifestoHeading}
        </h2>
        <div className="mt-8 space-y-6 text-[17px] leading-[1.7] text-[color:var(--color-fg-muted)]">
          {t.about.manifesto.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <h2 className="font-[var(--font-sans-alt)] text-xs uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)]">
          {t.about.timelineHeading}
        </h2>
        <ul className="mt-8 space-y-0 divide-y divide-[color:var(--color-fg-dim)]/30">
          {t.about.timeline.map((tl) => (
            <li key={tl.year} className="grid grid-cols-[100px_1fr] gap-6 py-6 items-baseline">
              <time className="font-mono text-2xl text-[color:var(--color-accent)]">{tl.year}</time>
              <div>
                <h3 className="text-xl text-[color:var(--color-fg-primary)]">{tl.label}</h3>
                <p className="mt-2 text-[color:var(--color-fg-muted)]">{tl.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24">
        <h2 className="font-[var(--font-sans-alt)] text-xs uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)]">
          {t.about.stackHeading}
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stack.map((s) => (
            <div
              key={s.title}
              className="p-6 border border-[color:var(--color-fg-dim)]/40 rounded-sm"
            >
              <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-accent)]">
                {s.title}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-[color:var(--color-fg-muted)]">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 mb-16 text-center">
        <h2 className="font-[var(--font-display)] text-4xl md:text-5xl tracking-[-0.03em] pb-3">
          {t.about.ctaHeading}
        </h2>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 font-[var(--font-sans-alt)] font-semibold bg-[color:var(--color-accent)] text-[color:var(--color-bg-base)] hover:brightness-110 transition-all"
          >
            {t.about.ctaPrimary}
          </Link>
          <a
            href="https://t.me/btw_aitech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 font-[var(--font-sans-alt)] border border-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)]/10 transition-colors"
          >
            {t.about.ctaSecondary}
          </a>
        </div>
      </section>
    </div>
  );
}
