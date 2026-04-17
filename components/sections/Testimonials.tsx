'use client';

import { motion } from 'motion/react';
import { ease } from '@/lib/motion/tokens';

// Anonymized per NDA — standard practice for boutique studios.
const quotes = [
  {
    body: 'They shipped our MVP in three weeks when two previous teams quoted three months. The difference was the spec-first discipline — we knew exactly what was landing on Friday.',
    role: 'Founder & CEO',
    sector: 'Fintech SaaS',
    stage: 'Seed, London',
  },
  {
    body: 'The AI layer was not a side feature — they designed the whole product around it. RAG, evals, tool-use, all wired end-to-end. We had four vendor pitches; BTW was the only one that brought a working prototype on the second call.',
    role: 'Head of Product',
    sector: 'EdTech',
    stage: 'Series A, Berlin',
  },
];

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32"
    >
      <h2
        id="testimonials-heading"
        className="font-[var(--font-sans-alt)] text-xs uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)] mb-12"
      >
        Said about us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-[1400px]">
        {quotes.map((q, i) => (
          <motion.blockquote
            key={q.role + q.sector}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              ease: ease.expoOut,
              delay: i * 0.12,
            }}
            className="relative p-8 md:p-10 border border-[color:var(--color-fg-dim)]/40 rounded-sm"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.005))',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Decorative quotation mark */}
            <span
              aria-hidden
              className="absolute -top-4 left-6 font-[var(--font-display)] text-7xl leading-none text-[color:var(--color-accent)]/60 select-none"
            >
              &ldquo;
            </span>

            <p className="font-[var(--font-display)] text-xl md:text-2xl leading-[1.4] tracking-[-0.01em] text-[color:var(--color-fg-primary)]">
              {q.body}
            </p>

            <footer className="mt-8 pt-6 border-t border-[color:var(--color-fg-dim)]/30">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-block w-8 h-8 rounded-full bg-gradient-to-br from-[color:var(--color-accent)] to-[color:var(--color-accent-alt)]"
                />
                <div>
                  <div className="font-[var(--font-sans)] text-sm text-[color:var(--color-fg-primary)]">
                    {q.role}
                  </div>
                  <div className="font-mono text-xs text-[color:var(--color-fg-meta)]">
                    {q.sector} · {q.stage}
                  </div>
                </div>
              </div>
            </footer>
          </motion.blockquote>
        ))}
      </div>

      <p className="mt-8 font-mono text-xs text-[color:var(--color-fg-dim)]">
        Attribution anonymized per client NDA.
      </p>
    </section>
  );
}
