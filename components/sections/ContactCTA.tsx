'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ease } from '@/lib/motion/tokens';
import { useLocale } from '@/lib/i18n/context';

export function ContactCTA() {
  const { t } = useLocale();

  return (
    <section
      id="contact-cta"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden px-6 md:px-12 lg:px-20 py-32 md:py-40"
      style={{
        background: 'linear-gradient(180deg, var(--color-bg-base) 0%, var(--color-bg-elev-1) 100%)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <OrbitingDots radius={180} speed={40} count={6} opacity={0.4} />
        <OrbitingDots radius={280} speed={-60} count={4} opacity={0.25} />
        <OrbitingDots radius={380} speed={80} count={3} opacity={0.15} />
      </div>

      <div className="relative z-10 text-center max-w-[900px] mx-auto">
        <motion.h2
          id="contact-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: ease.expoOut }}
          className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-8xl tracking-[-0.03em] leading-[1.0]"
        >
          {t.contactCTA.heading[0]} <br />
          {t.contactCTA.heading[1]}
        </motion.h2>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <a
            href="mailto:hello@btw.studio"
            className="inline-flex items-center justify-center px-6 py-3 font-[var(--font-sans-alt)] font-semibold bg-[color:var(--color-accent)] text-[color:var(--color-bg-base)] hover:brightness-110 transition-all"
          >
            hello@btw.studio
          </a>
          <a
            href="https://t.me/btw_aitech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 font-[var(--font-sans-alt)] border border-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)]/10 transition-colors"
          >
            Telegram → @btw_aitech
          </a>
        </div>

        <p className="mt-8 text-sm text-[color:var(--color-fg-muted)]">
          {t.contactCTA.formLink}{' '}
          <Link
            href="/contact"
            className="underline underline-offset-4 hover:text-[color:var(--color-accent)] transition-colors"
          >
            {t.contactCTA.formLinkText}
          </Link>
        </p>
      </div>
    </section>
  );
}

function OrbitingDots({
  radius,
  speed,
  count,
  opacity,
}: {
  radius: number;
  speed: number;
  count: number;
  opacity: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
      animate={{ rotate: speed > 0 ? 360 : -360 }}
      transition={{
        duration: Math.abs(speed),
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius + radius;
        const y = Math.sin(angle) * radius + radius;
        return (
          <span
            key={i}
            className="absolute block rounded-full"
            style={{
              width: '6px',
              height: '6px',
              left: `${x - 3}px`,
              top: `${y - 3}px`,
              background: 'var(--color-accent)',
              opacity,
              boxShadow: '0 0 12px rgba(158,255,110,0.6)',
            }}
          />
        );
      })}
    </motion.div>
  );
}
