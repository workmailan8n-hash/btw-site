'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ease, dur, stagger } from '@/lib/motion/tokens';

// TODO: replace with MDX-sourced posts in Phase 3
const notes = [
  {
    date: '2026-04-10',
    slug: 'agent-dashboard-3-weeks',
    title: 'How we built Agent Dashboard in 3 weeks',
    tags: ['react', 'nextjs', 'supabase'],
  },
  {
    date: '2026-03-22',
    slug: 'r3f-nextjs15-setup',
    title: 'react-three-fiber setup guide for Next.js 15',
    tags: ['r3f', 'three.js', 'motion'],
  },
  {
    date: '2026-03-05',
    slug: 'building-in-public-m1',
    title: 'Building in public: month 1 retrospective',
    tags: ['btw', 'building-in-public'],
  },
];

export function NotesPreview() {
  return (
    <section
      id="notes-preview"
      aria-labelledby="notes-heading"
      className="px-6 md:px-12 lg:px-20 py-24 md:py-32"
    >
      <div className="flex items-baseline justify-between">
        <h2
          id="notes-heading"
          className="font-[var(--font-sans-alt)] text-xs uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)]"
        >
          Recent notes
        </h2>
        <Link
          href="/notes"
          className="text-sm text-[color:var(--color-accent)] hover:underline underline-offset-4"
        >
          All notes →
        </Link>
      </div>

      <ul className="mt-8 divide-y divide-[color:var(--color-fg-dim)]/30">
        {notes.map((n, i) => (
          <motion.li
            key={n.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: dur.reveal,
              ease: ease.expoOut,
              delay: i * stagger.card,
            }}
          >
            <Link
              href={`/notes/${n.slug}`}
              className="group grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-4 md:gap-8 py-6 items-baseline transition-colors hover:bg-[color:var(--color-bg-elev-1)]/40 hover:pl-4 border-l-2 border-transparent hover:border-[color:var(--color-accent)]"
            >
              <time className="font-mono text-xs text-[color:var(--color-fg-meta)]">{n.date}</time>
              <span className="text-xl text-[color:var(--color-fg-primary)]">{n.title}</span>
              <span className="font-mono text-xs text-[color:var(--color-fg-meta)]">
                {n.tags.join(' · ')}
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
