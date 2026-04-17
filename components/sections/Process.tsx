'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ease, stagger } from '@/lib/motion/tokens';
import { useLocale } from '@/lib/i18n/context';

const numbers = ['01', '02', '03', '04'];

export function Process() {
  const { t } = useLocale();
  const steps = t.process.steps.map((s, i) => ({ ...s, n: numbers[i] }));
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'end 30%'],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const progressLeft = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32"
    >
      <h2
        id="process-heading"
        className="font-[var(--font-sans-alt)] text-xs uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)]"
      >
        {t.process.heading}
      </h2>

      {/* Horizontal connector beam — desktop only */}
      <div
        aria-hidden
        className="hidden lg:block relative mt-14 mb-6 mx-2 h-[2px] pointer-events-none"
      >
        <div className="absolute inset-0 bg-[color:var(--color-fg-dim)]/40" />
        <motion.div
          className="absolute top-0 left-0 h-full"
          style={{
            width: progressWidth,
            background:
              'linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-alt) 100%)',
            boxShadow: '0 0 10px rgba(158,255,110,0.55)',
          }}
        />
        <motion.div
          className="absolute -top-1.5 w-3.5 h-3.5 rounded-full"
          style={{
            left: progressLeft,
            background: 'var(--color-accent)',
            boxShadow: '0 0 18px rgba(158,255,110,0.85), 0 0 4px rgba(158,255,110,1)',
            transform: 'translateX(-50%)',
          }}
        />
        {/* Step anchor ticks */}
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[color:var(--color-bg-base)] border border-[color:var(--color-fg-dim)]/70"
            style={{ left: `${(i / 3) * 100}%`, transform: 'translate(-50%, -50%)' }}
          />
        ))}
      </div>

      <div className="mt-6 lg:mt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-16">
        {steps.map((s, i) => (
          <ProcessStep key={s.n} step={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
}: {
  step: { n: string; title: string; body: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  const numberY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        ease: ease.expoOut,
        delay: index * stagger.step,
      }}
      className="relative"
    >
      <motion.span
        aria-hidden
        style={{ y: numberY, opacity: numberOpacity }}
        className="block font-[var(--font-display)] text-[120px] md:text-[160px] leading-none tracking-[-0.04em] text-[color:var(--color-fg-dim)] pb-2"
      >
        {step.n}
      </motion.span>
      <h3 className="mt-2 font-[var(--font-sans)] text-2xl text-[color:var(--color-fg-primary)]">
        {step.title}
      </h3>
      <p className="mt-3 text-[color:var(--color-fg-muted)] max-w-[28ch]">{step.body}</p>
    </motion.div>
  );
}
