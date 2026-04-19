'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/i18n/context';
import type { CaseStudy } from '@/lib/notes';
import { ProcessReceipts } from '@/components/notes/ProcessReceipts';

export function NoteDetailContent({ note }: { note: CaseStudy }) {
  const { t } = useLocale();

  return (
    <>
      <header
        className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24 overflow-hidden border-b border-[color:var(--color-fg-dim)]/30"
        style={{ background: note.gradient }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        <div className="relative max-w-[1100px] mx-auto">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 font-mono text-xs text-[color:var(--color-fg-meta)] hover:text-[color:var(--color-accent)] transition-colors"
          >
            <span aria-hidden>←</span> {t.notes.backToNotes}
          </Link>

          <div className="mt-8 flex items-center gap-3 font-mono text-xs text-[color:var(--color-fg-meta)]">
            <span>{note.year}</span>
            <span aria-hidden>·</span>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 border rounded-full"
              style={{
                borderColor: note.status === 'Live' ? note.accent + '70' : 'rgba(74,74,82,0.6)',
                color: note.status === 'Live' ? note.accent : 'var(--color-fg-meta)',
              }}
            >
              {note.status}
            </span>
            <span aria-hidden>·</span>
            <span>{note.timeline}</span>
          </div>

          <h1
            className="mt-6 font-[var(--font-display)] text-5xl md:text-7xl tracking-[-0.03em] leading-[1.05] pb-3"
            style={{ color: note.accent }}
          >
            {note.title}
          </h1>
          <p className="mt-4 max-w-[60ch] text-lg text-[color:var(--color-fg-primary)]/85 leading-[1.4]">
            {note.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-fg-meta)]">
                {t.notes.role}
              </div>
              <div className="mt-1 text-[color:var(--color-fg-primary)]">{note.role}</div>
            </div>
            {note.href && !note.nda && (
              <a
                href={note.href}
                target={note.href.startsWith('/') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2 font-mono text-xs uppercase tracking-[0.12em] border rounded-full hover:bg-[color:var(--color-bg-elev-1)] transition-colors"
                style={{ borderColor: note.accent, color: note.accent }}
              >
                {t.notes.openProject}
              </a>
            )}
          </div>
        </div>
      </header>

      <section className="px-6 md:px-12 lg:px-20 py-12 border-b border-[color:var(--color-fg-dim)]/30">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)] mb-6">
            {t.notes.byTheNumbers}
          </h2>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {note.metrics.map((m) => (
              <div key={m.label}>
                <dd
                  className="font-[var(--font-display)] text-4xl md:text-5xl tracking-[-0.03em] pb-1"
                  style={{ color: note.accent }}
                >
                  {m.value}
                </dd>
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-fg-meta)]">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 py-12 border-b border-[color:var(--color-fg-dim)]/30">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)] mb-6">
            {t.notes.stack}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {note.stack.map((s) => (
              <li
                key={s}
                className="font-mono text-xs px-3 py-1.5 border border-[color:var(--color-fg-dim)]/50 text-[color:var(--color-fg-primary)] rounded-sm"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {note.receipts && <ProcessReceipts receipts={note.receipts} accent={note.accent} />}

      <article className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="max-w-[720px] mx-auto">
          {note.sections.map((s, i) => (
            <section key={s.heading} className={i > 0 ? 'mt-14' : ''}>
              <h2 className="font-[var(--font-display)] text-2xl md:text-3xl tracking-[-0.02em] pb-2">
                {s.heading}
              </h2>
              <p className="mt-4 text-[17px] leading-[1.7] text-[color:var(--color-fg-muted)]">
                {s.body}
              </p>
            </section>
          ))}

          <div className="mt-20 pt-12 border-t border-[color:var(--color-fg-dim)]/30">
            <h3 className="font-[var(--font-display)] text-3xl md:text-4xl tracking-[-0.02em] pb-2">
              {t.notes.ctaHeading}
            </h3>
            <p className="mt-3 text-[color:var(--color-fg-muted)]">{t.notes.ctaBody}</p>
            <div className="mt-6 flex flex-col md:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 font-[var(--font-sans-alt)] font-semibold bg-[color:var(--color-accent)] text-[color:var(--color-bg-base)] hover:brightness-110 transition-all"
              >
                {t.hero.ctaPrimary}
              </Link>
              <a
                href="https://t.me/btw_aitech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 font-[var(--font-sans-alt)] border border-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)]/10 transition-colors"
              >
                Telegram → @btw_aitech
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
