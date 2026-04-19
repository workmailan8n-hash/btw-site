'use client';

import { motion } from 'motion/react';
import { useLocale } from '@/lib/i18n/context';
import type { ProcessReceipts as ProcessReceiptsData } from '@/lib/notes';

export function ProcessReceipts({
  receipts,
  accent,
}: {
  receipts: ProcessReceiptsData;
  accent: string;
}) {
  const { t } = useLocale();
  const stats: { value: string; label: string }[] = [];
  if (receipts.shippedIn)
    stats.push({ value: receipts.shippedIn, label: t.notes.receipts.shippedIn });
  if (typeof receipts.commits === 'number')
    stats.push({ value: String(receipts.commits), label: t.notes.receipts.commits });
  if (typeof receipts.deploys === 'number')
    stats.push({ value: String(receipts.deploys), label: t.notes.receipts.deploys });
  stats.push({ value: String(receipts.agents.length), label: t.notes.receipts.agents });

  return (
    <section className="px-6 md:px-12 lg:px-20 py-12 border-b border-[color:var(--color-fg-dim)]/30">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)] mb-2">
          {t.notes.receipts.heading}
        </h2>
        <p className="text-sm text-[color:var(--color-fg-meta)] max-w-[60ch] mb-8">
          {t.notes.receipts.sub}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {stats.map((s) => (
            <div key={s.label}>
              <div
                className="font-[var(--font-display)] text-3xl md:text-4xl tracking-[-0.02em] pb-1"
                style={{ color: accent }}
              >
                {s.value}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-fg-meta)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-fg-meta)] mb-4">
            {t.notes.receipts.pipeline}
          </div>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-3 font-mono text-xs">
            {receipts.agents.map((a, i) => (
              <li key={a} className="flex items-center gap-2">
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-full"
                  style={{
                    borderColor: `${accent}55`,
                    background: `${accent}10`,
                    color: 'var(--color-fg-primary)',
                  }}
                >
                  <span
                    aria-hidden
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: accent }}
                  />
                  {a}
                </motion.span>
                {i < receipts.agents.length - 1 && (
                  <span aria-hidden className="text-[color:var(--color-fg-dim)] select-none">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
