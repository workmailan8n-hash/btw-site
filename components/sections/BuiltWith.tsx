'use client';

import { motion } from 'motion/react';
import { useLocale } from '@/lib/i18n/context';
import { notes } from '@/lib/notes';

const DISPLAY_LIMIT = 10;

function computeUsage() {
  const counts = new Map<string, number>();
  notes.forEach((n) => {
    n.stack.forEach((s) => {
      counts.set(s, (counts.get(s) ?? 0) + 1);
    });
  });
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, DISPLAY_LIMIT);
}

export function BuiltWith() {
  const { t } = useLocale();
  const items = computeUsage();

  return (
    <section
      aria-labelledby="built-with-heading"
      className="px-6 md:px-12 lg:px-20 py-16 md:py-20 border-b border-[color:var(--color-fg-dim)]/30"
    >
      <div className="max-w-[1400px] mx-auto">
        <h2
          id="built-with-heading"
          className="font-[var(--font-sans-alt)] text-xs uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)] mb-8"
        >
          {t.builtWith.heading}
        </h2>

        <ul className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-6">
          {items.map((it, i) => (
            <motion.li
              key={it.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex items-baseline justify-between gap-3 pb-2 border-b border-[color:var(--color-fg-dim)]/20"
            >
              <span className="font-[var(--font-sans)] text-base md:text-lg text-[color:var(--color-fg-primary)] truncate">
                {it.name}
              </span>
              <span className="font-mono text-[11px] text-[color:var(--color-fg-meta)] shrink-0">
                {it.count} {it.count === 1 ? t.builtWith.unit : t.builtWith.unitPlural}
              </span>
            </motion.li>
          ))}
        </ul>

        <p className="mt-8 font-mono text-[11px] text-[color:var(--color-fg-meta)] max-w-[60ch]">
          {t.builtWith.note}
        </p>
      </div>
    </section>
  );
}
