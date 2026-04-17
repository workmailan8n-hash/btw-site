'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { MouseEvent } from 'react';
import { ease, dur, stagger } from '@/lib/motion/tokens';
import { useLocale } from '@/lib/i18n/context';
import { ServiceIcon } from '@/components/graphics/ServiceIcon';

const serviceMeta = [
  {
    stack: ['React', 'Next.js', 'Prisma', 'Supabase'],
    timeline: '4–8 weeks',
    from: 'from $12k',
    accent: '#9EFF6E',
  },
  {
    stack: ['Next.js 15', 'Prisma', 'NextAuth', 'Stripe'],
    timeline: '2–6 weeks',
    from: 'from $6k',
    accent: '#B8A6FF',
  },
  {
    stack: ['Claude', 'OpenAI', 'Ollama', 'LangChain'],
    timeline: '3–10 weeks',
    from: 'from $10k',
    accent: '#FFB86B',
  },
  {
    stack: ['Grammy', 'TG API', 'Webhook', 'Cron'],
    timeline: '1–4 weeks',
    from: 'from $3k',
    accent: '#9EFF6E',
  },
];

export function Services() {
  const { t } = useLocale();

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32"
    >
      <h2
        id="services-heading"
        className="font-[var(--font-sans-alt)] text-xs uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)]"
      >
        {t.services.heading}
      </h2>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {t.services.items.map((s, i) => (
          <ServiceCard
            key={s.title}
            title={s.title}
            body={s.body}
            {...serviceMeta[i]}
            timelineLabel={t.services.timeline}
            startingLabel={t.services.starting}
            index={i}
          />
        ))}
      </div>

      <p className="mt-8 font-mono text-xs text-[color:var(--color-fg-dim)]">
        {t.services.fineprint}
      </p>
    </section>
  );
}

function ServiceCard({
  title,
  body,
  stack,
  timeline,
  from,
  accent,
  timelineLabel,
  startingLabel,
  index,
}: {
  title: string;
  body: string;
  stack: string[];
  timeline: string;
  from: string;
  accent: string;
  timelineLabel: string;
  startingLabel: string;
  index: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 20,
  });
  const gx = useTransform(x, [-0.5, 0.5], [0, 100]);
  const gy = useTransform(y, [-0.5, 0.5], [0, 100]);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: dur.reveal,
        ease: ease.expoOut,
        delay: index * stagger.card,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transformStyle: 'preserve-3d',
        transformPerspective: 1200,
        rotateX: rotX,
        rotateY: rotY,
      }}
      className="group relative overflow-hidden rounded-sm p-6 min-h-[320px] flex flex-col justify-between border border-[color:var(--color-fg-dim)]/40 hover:border-[color:var(--color-accent)]/70 transition-colors"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
          backdropFilter: 'blur(24px)',
        }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [gx, gy] as any,
            ([vx, vy]: number[]) =>
              `radial-gradient(400px circle at ${vx}% ${vy}%, ${accent}22, transparent 50%)`
          ),
        }}
      />

      <div>
        <div className="flex items-start justify-between">
          <div className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
            <ServiceIcon index={index} color={accent} />
          </div>
          <span
            aria-hidden
            className="w-2 h-2 rounded-full mt-3 transition-all duration-300 group-hover:scale-150"
            style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
          />
        </div>
        <h3 className="mt-6 font-[var(--font-display)] text-[1.9rem] leading-[1.1] pb-1 tracking-[-0.02em]">
          {title}
        </h3>
        <p className="mt-3 text-[color:var(--color-fg-muted)] text-[15px] leading-[1.5]">{body}</p>
      </div>

      <div className="mt-6 pt-4 border-t border-[color:var(--color-fg-dim)]/30">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-fg-dim)]">
              {timelineLabel}
              <span className="text-[color:var(--color-accent)] ml-0.5">*</span>
            </div>
            <div className="mt-1 text-sm text-[color:var(--color-fg-primary)]">{timeline}</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-fg-dim)]">
              {startingLabel}
              <span className="text-[color:var(--color-accent)] ml-0.5">*</span>
            </div>
            <div className="mt-1 text-sm" style={{ color: accent }}>
              {from}
            </div>
          </div>
        </div>
        <ul className="flex flex-wrap gap-2 font-mono text-[11px] text-[color:var(--color-fg-meta)]">
          {stack.map((tg) => (
            <li key={tg}>{tg}</li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
