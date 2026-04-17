'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import { ease } from '@/lib/motion/tokens';
import { useLocale } from '@/lib/i18n/context';

const values = [
  { value: 12, suffix: '+', numeric: true },
  { value: 24, suffix: 'h', numeric: true },
  { value: 100, suffix: '%', numeric: true },
  { value: '2-6', suffix: 'wk', numeric: false },
];

export function Stats() {
  const { t } = useLocale();
  const items = t.stats.items.map((it, i) => ({ ...it, ...values[i] }));

  return (
    <section
      aria-labelledby="stats-heading"
      className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28 border-y border-[color:var(--color-fg-dim)]/30"
    >
      <h2
        id="stats-heading"
        className="font-[var(--font-sans-alt)] text-xs uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)] mb-12"
      >
        {t.stats.heading}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {items.map((s, i) => (
          <StatItem key={s.label} stat={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function StatItem({
  stat,
  index,
}: {
  stat: {
    value: number | string;
    suffix: string;
    numeric: boolean;
    label: string;
    note: string;
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView || !stat.numeric) return;
    const controls = animate(count, stat.value as number, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      delay: index * 0.08,
    });
    return controls.stop;
  }, [inView, stat.value, stat.numeric, index, count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: ease.expoOut, delay: index * 0.08 }}
      className="relative"
    >
      <div className="flex items-baseline gap-1">
        <span className="font-[var(--font-display)] text-5xl md:text-7xl tracking-[-0.03em] text-[color:var(--color-fg-primary)]">
          {stat.numeric ? <motion.span>{rounded}</motion.span> : stat.value}
        </span>
        <span className="font-[var(--font-display)] text-3xl md:text-5xl text-[color:var(--color-accent)]">
          {stat.suffix}
        </span>
      </div>

      {/* Sparkline-like accent underline */}
      <motion.div
        aria-hidden
        className="mt-3 h-[2px] relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08 + 0.3 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(74,74,82,0.4) 0%, rgba(74,74,82,0.4) 100%)',
          }}
        />
        <motion.div
          className="absolute top-0 left-0 h-full"
          style={{
            background:
              'linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-alt) 100%)',
            boxShadow: '0 0 8px rgba(158,255,110,0.5)',
          }}
          initial={{ width: '0%' }}
          animate={inView ? { width: '60%' } : {}}
          transition={{ duration: 1.2, ease: ease.expoOut, delay: index * 0.08 + 0.4 }}
        />
      </motion.div>

      <h3 className="mt-4 font-[var(--font-sans)] text-base md:text-lg text-[color:var(--color-fg-primary)]">
        {stat.label}
      </h3>
      <p className="mt-1 font-mono text-xs text-[color:var(--color-fg-meta)]">{stat.note}</p>
    </motion.div>
  );
}
