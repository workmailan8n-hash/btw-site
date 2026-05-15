'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/i18n/context';
import { notes } from '@/lib/notes';
import { NoteArt } from '@/components/graphics/NoteArt';

const yearOrder = (y: string) => parseInt(y, 10);

export function NotesIndexContent() {
  const { t } = useLocale();
  const sorted = [...notes].sort((a, b) => yearOrder(b.year) - yearOrder(a.year));

  const counts = {
    shipped: notes.length,
    live: notes.filter((n) => n.status === 'Live').length,
    stacks: new Set(notes.flatMap((n) => n.stack)).size,
    years: new Set(notes.map((n) => n.year)).size,
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="max-w-[720px]">
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)]">
          {t.notes.eyebrow}
        </span>
        <h1 className="mt-4 font-[var(--font-display)] text-5xl md:text-7xl tracking-[-0.03em] leading-[1.05] pb-3">
          {t.notes.heading}
        </h1>
        <p className="mt-6 text-lg text-[color:var(--color-fg-muted)] leading-[1.5]">
          {t.notes.intro}
        </p>
      </div>

      <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-[color:var(--color-fg-dim)]/30 py-8">
        <Stat value={String(counts.shipped)} label={t.notes.statsLabels.shipped} />
        <Stat value={String(counts.live)} label={t.notes.statsLabels.live} />
        <Stat value={String(counts.stacks)} label={t.notes.statsLabels.stacks} />
        <Stat value={String(counts.years)} label={t.notes.statsLabels.years} />
      </dl>

      <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
        {sorted.map((n) => (
          <li key={n.slug}>
            <Link
              href={n.overrideHref ?? `/notes/${n.slug}`}
              className="group relative block rounded-sm border border-[color:var(--color-fg-dim)]/40 overflow-hidden hover:border-[color:var(--color-accent)]/60 transition-colors min-h-[500px]"
              style={{ background: n.gradient }}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }}
              />

              {/* Domain illustration */}
              <div
                aria-hidden
                className="relative h-[140px] w-full border-b border-[color:var(--color-fg-dim)]/20 transition-opacity group-hover:opacity-100 opacity-80"
              >
                <div className="absolute inset-0 p-4">
                  <NoteArt slug={n.slug} color={n.accent} />
                </div>
              </div>

              <div className="relative flex items-start justify-between p-6 md:p-8 pb-0">
                <div className="flex items-center gap-3 font-mono text-xs text-[color:var(--color-fg-meta)]">
                  <span>{n.year}</span>
                  <span aria-hidden>·</span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 border rounded-full"
                    style={{
                      borderColor: n.status === 'Live' ? n.accent + '70' : 'rgba(74,74,82,0.6)',
                      color: n.status === 'Live' ? n.accent : 'var(--color-fg-meta)',
                    }}
                  >
                    {n.status}
                  </span>
                </div>
                <span
                  aria-hidden
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    background: n.accent,
                    boxShadow: `0 0 16px ${n.accent}`,
                  }}
                />
              </div>

              <div className="relative px-6 md:px-8">
                <h2
                  className="font-[var(--font-display)] text-3xl md:text-4xl tracking-[-0.02em] leading-[1.1] pb-1"
                  style={{ color: n.accent }}
                >
                  {n.title}
                </h2>
                <p className="mt-3 text-[color:var(--color-fg-primary)]/85 text-[15px] leading-[1.5] max-w-[46ch]">
                  {n.tagline}
                </p>
              </div>

              <dl className="relative grid grid-cols-3 gap-2 px-6 md:px-8 mt-6">
                {n.metrics.slice(0, 3).map((m) => (
                  <div key={m.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-fg-meta)]">
                      {m.label}
                    </dt>
                    <dd
                      className="mt-1 font-[var(--font-display)] text-xl tracking-[-0.02em]"
                      style={{ color: 'var(--color-fg-primary)' }}
                    >
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="relative mt-6 px-6 md:px-8 pb-6 md:pb-8 flex items-end justify-between">
                <ul className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-[11px] text-[color:var(--color-fg-muted)]">
                  {n.stack.slice(0, 4).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                  {n.stack.length > 4 && (
                    <li className="text-[color:var(--color-fg-dim)]">+{n.stack.length - 4}</li>
                  )}
                </ul>
                <span
                  className="font-mono text-xs transition-transform group-hover:translate-x-1"
                  style={{ color: n.accent }}
                >
                  {t.notes.readCase}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-fg-meta)]">
        {label}
      </dt>
      <dd className="mt-2 font-[var(--font-display)] text-4xl md:text-5xl tracking-[-0.03em]">
        {value}
      </dd>
    </div>
  );
}
