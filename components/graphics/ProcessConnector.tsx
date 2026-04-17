'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

/**
 * Horizontal (desktop) / vertical (mobile) beam that travels through the 4 process steps.
 * Hidden under `sm`; shown as a dashed connector line on md+ between numbered cards.
 */
export function ProcessConnector() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 20%'],
  });
  const progressClamped = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pct = useTransform(progressClamped, (v) => `${Math.min(v * 100, 100)}%`);

  return (
    <div
      ref={ref}
      aria-hidden
      className="hidden lg:block absolute left-6 right-6 lg:left-20 lg:right-20 top-[220px] h-[2px] pointer-events-none"
    >
      {/* Track */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(74,74,82,0.5) 8%, rgba(74,74,82,0.5) 92%, transparent 100%)',
        }}
      />
      {/* Progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-full"
        style={{
          width: pct,
          background:
            'linear-gradient(90deg, transparent 0%, var(--color-accent) 20%, var(--color-accent) 100%)',
          boxShadow: '0 0 12px rgba(158,255,110,0.6)',
        }}
      />
      {/* Moving dot */}
      <motion.div
        className="absolute -top-1 w-3 h-3 rounded-full"
        style={{
          left: pct,
          background: 'var(--color-accent)',
          boxShadow: '0 0 24px rgba(158,255,110,0.8), 0 0 6px rgba(158,255,110,1)',
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  );
}
