'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { HeroTitle } from '@/components/hero/HeroTitle';
import { HeroFallback } from '@/components/hero/HeroFallback';
import { ease, dur } from '@/lib/motion/tokens';
import { useLocale } from '@/lib/i18n/context';

const HeroScene = dynamic(() => import('@/components/hero/HeroScene').then((m) => m.HeroScene), {
  ssr: false,
  loading: () => <HeroFallback />,
});

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [breakpoint]);
  return isMobile;
}

export function Hero() {
  const { t } = useLocale();
  const isMobile = useIsMobile();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative grid min-h-[100dvh] grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-0 px-6 md:px-12 lg:px-20 pt-28 md:pt-0 overflow-hidden"
    >
      <div className="relative z-10 max-w-[640px] order-2 md:order-1">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.reveal, ease: ease.expoOut, delay: 0.1 }}
          className="flex items-center gap-3 mb-6 md:mb-8 font-mono text-[11px] md:text-xs uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)]"
        >
          <span
            className="inline-block w-2 h-2 rounded-full bg-[color:var(--color-accent)]"
            style={{ boxShadow: '0 0 12px rgba(158,255,110,0.6)' }}
            aria-hidden
          />
          <span>{t.hero.eyebrow}</span>
        </motion.div>

        <HeroTitle />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.slow, ease: ease.expoOut, delay: 0.9 }}
          className="mt-6 md:mt-8 text-base md:text-xl text-[color:var(--color-fg-muted)] max-w-[40ch] leading-[1.5]"
        >
          {t.hero.subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur.slow, ease: ease.expoOut, delay: 1.1 }}
          className="mt-8 md:mt-10 flex flex-wrap items-center gap-3 md:gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 md:px-6 py-3 font-[var(--font-sans-alt)] font-semibold bg-[color:var(--color-accent)] text-[color:var(--color-bg-base)] hover:brightness-110 transition-all text-sm md:text-base"
          >
            {t.hero.ctaPrimary}
          </Link>
          <a
            href="#work"
            className="inline-flex items-center justify-center px-5 md:px-6 py-3 font-[var(--font-sans-alt)] border border-[color:var(--color-fg-dim)] text-[color:var(--color-fg-primary)] hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] transition-colors text-sm md:text-base"
          >
            {t.hero.ctaSecondary}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-10 md:mt-16 flex items-center gap-2 font-mono text-xs text-[color:var(--color-fg-meta)]"
        >
          <span aria-hidden>·</span>
          <span>{t.hero.scroll}</span>
          <span aria-hidden>↓</span>
        </motion.div>
      </div>

      <div className="relative h-[42vh] md:h-[85vh] w-full order-1 md:order-2">
        {isMobile ? (
          <HeroFallback />
        ) : (
          <Suspense fallback={<HeroFallback />}>
            <HeroScene />
          </Suspense>
        )}
      </div>
    </section>
  );
}
