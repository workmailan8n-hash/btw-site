'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ease, dur, stagger } from '@/lib/motion/tokens';
import { useLocale } from '@/lib/i18n/context';
import { ContactForm } from '@/components/contact/ContactForm';

const DEMO_URL = 'https://codes-shop-demo.fly.dev';

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: dur.slow, ease: ease.expoOut, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)]">
      {children}
    </span>
  );
}

export function KeystPageContent() {
  const { t } = useLocale();
  const k = t.keyst;

  return (
    <div className="min-h-screen">
      <KeystHero k={k} />
      <ProblemSection k={k} />
      <WhatSection k={k} />
      <PricingSection k={k} />
      <HowItWorks k={k} />
      <DemoSection k={k} />
      <FaqSection k={k} />
      <ContactSection k={k} />
    </div>
  );
}

function KeystHero({ k }: { k: ReturnType<typeof useLocale>['t']['keyst'] }) {
  return (
    <section
      id="keyst-hero"
      aria-labelledby="keyst-hero-heading"
      className="relative min-h-[90dvh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 pb-24 overflow-hidden"
    >
      {/* Background grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-fg-dim)/8% 1px, transparent 1px), linear-gradient(90deg, var(--color-fg-dim)/8% 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Radial veil over grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 60% 40%, rgba(232,39,75,0.12) 0%, transparent 65%), radial-gradient(ellipse at 0% 100%, var(--color-bg-base) 30%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.reveal, ease: ease.expoOut, delay: 0.1 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: '#E8274B',
              boxShadow: '0 0 12px rgba(232,39,75,0.6)',
            }}
            aria-hidden
          />
          <SectionLabel>{k.eyebrow}</SectionLabel>
        </motion.div>

        <motion.h1
          id="keyst-hero-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.hero, ease: ease.expoOut, delay: 0.25 }}
          className="font-[var(--font-display)] text-4xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.05] pb-2"
        >
          {k.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.slow, ease: ease.expoOut, delay: 0.55 }}
          className="mt-6 text-lg md:text-xl text-[color:var(--color-fg-muted)] max-w-[52ch] leading-[1.5]"
        >
          {k.heroSub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur.slow, ease: ease.expoOut, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 font-[var(--font-sans-alt)] font-semibold text-sm md:text-base"
            style={{
              background: '#E8274B',
              color: '#fff',
            }}
          >
            {k.heroCta}
          </a>
          <a
            href="#keyst-contact"
            className="inline-flex items-center justify-center px-6 py-3 font-[var(--font-sans-alt)] text-sm md:text-base border border-[color:var(--color-fg-dim)] text-[color:var(--color-fg-primary)] hover:border-[#E8274B] hover:text-[#E8274B] transition-colors"
          >
            {k.heroCtaSecondary}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProblemSection({ k }: { k: ReturnType<typeof useLocale>['t']['keyst'] }) {
  return (
    <section
      id="keyst-problem"
      aria-labelledby="keyst-problem-heading"
      className="px-6 md:px-12 lg:px-20 py-24 md:py-32 border-t border-[color:var(--color-fg-dim)]/30"
    >
      <FadeUp>
        <SectionLabel>{k.problemHeading}</SectionLabel>
      </FadeUp>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {k.problemCards.map((card, i) => (
          <FadeUp key={card.title} delay={i * stagger.card}>
            <div
              className="h-full p-8 border border-[color:var(--color-fg-dim)]/40 bg-[color:var(--color-bg-elev-1)]"
              style={{ borderTop: '2px solid #E8274B' }}
            >
              <h3 className="font-[var(--font-sans-alt)] font-semibold text-lg text-[color:var(--color-fg-primary)] leading-[1.3]">
                {card.title}
              </h3>
              <p className="mt-4 text-[color:var(--color-fg-muted)] text-[15px] leading-[1.6]">
                {card.body}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function WhatSection({ k }: { k: ReturnType<typeof useLocale>['t']['keyst'] }) {
  return (
    <section
      id="keyst-what"
      aria-labelledby="keyst-what-heading"
      className="px-6 md:px-12 lg:px-20 py-24 md:py-32 border-t border-[color:var(--color-fg-dim)]/30"
      style={{ background: 'var(--color-bg-elev-1)' }}
    >
      <div className="max-w-[900px] mx-auto">
        <FadeUp>
          <SectionLabel>{k.whatHeading}</SectionLabel>
        </FadeUp>

        <ul className="mt-10 space-y-0 divide-y divide-[color:var(--color-fg-dim)]/30">
          {k.whatItems.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <li className="flex items-start gap-5 py-5">
                <span
                  aria-hidden
                  className="mt-1 shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-[10px]"
                  style={{ background: 'rgba(232,39,75,0.15)', color: '#E8274B' }}
                >
                  ✓
                </span>
                <span className="text-[color:var(--color-fg-primary)] text-[15px] leading-[1.6]">
                  {item}
                </span>
              </li>
            </FadeUp>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PricingSection({ k }: { k: ReturnType<typeof useLocale>['t']['keyst'] }) {
  return (
    <section
      id="keyst-pricing"
      aria-labelledby="keyst-pricing-heading"
      className="px-6 md:px-12 lg:px-20 py-24 md:py-32 border-t border-[color:var(--color-fg-dim)]/30"
    >
      <FadeUp>
        <SectionLabel>{k.pricingHeading}</SectionLabel>
        <p className="mt-2 font-mono text-xs text-[color:var(--color-fg-meta)]">{k.pricingNote}</p>
      </FadeUp>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[860px]">
        {k.plans.map((plan, i) => (
          <FadeUp key={plan.name} delay={i * stagger.card}>
            <div
              className="relative h-full flex flex-col p-8 border"
              style={{
                borderColor: plan.highlight ? '#E8274B' : 'rgba(74,74,82,0.4)',
                background: plan.highlight ? 'rgba(232,39,75,0.04)' : 'var(--color-bg-elev-1)',
              }}
            >
              {plan.highlight && (
                <span
                  className="absolute top-0 right-6 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.12em] px-3 py-1"
                  style={{ background: '#E8274B', color: '#fff' }}
                >
                  {k.planRecommended}
                </span>
              )}

              <div>
                <h3 className="font-[var(--font-sans-alt)] font-semibold text-[color:var(--color-fg-primary)]">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span
                    className="font-[var(--font-display)] text-5xl tracking-[-0.03em]"
                    style={{ color: plan.highlight ? '#E8274B' : 'var(--color-fg-primary)' }}
                  >
                    {plan.price}
                  </span>
                  <span className="font-mono text-xs text-[color:var(--color-fg-meta)]">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="mt-8 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px]">
                    <span
                      aria-hidden
                      className="mt-0.5 shrink-0 font-mono text-xs"
                      style={{ color: plan.highlight ? '#E8274B' : 'var(--color-fg-muted)' }}
                    >
                      —
                    </span>
                    <span className="text-[color:var(--color-fg-primary)]">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#keyst-contact"
                className="mt-8 inline-flex items-center justify-center px-6 py-3 font-[var(--font-sans-alt)] font-semibold text-sm transition-all"
                style={
                  plan.highlight
                    ? { background: '#E8274B', color: '#fff' }
                    : {
                        border: '1px solid rgba(74,74,82,0.6)',
                        color: 'var(--color-fg-primary)',
                      }
                }
              >
                {plan.cta}
              </a>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function HowItWorks({ k }: { k: ReturnType<typeof useLocale>['t']['keyst'] }) {
  return (
    <section
      id="keyst-how"
      aria-labelledby="keyst-how-heading"
      className="px-6 md:px-12 lg:px-20 py-24 md:py-32 border-t border-[color:var(--color-fg-dim)]/30"
      style={{ background: 'var(--color-bg-elev-1)' }}
    >
      <FadeUp>
        <SectionLabel>{k.howHeading}</SectionLabel>
      </FadeUp>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
        {k.howSteps.map((step, i) => (
          <FadeUp key={step.n} delay={i * stagger.step}>
            <div>
              <span
                aria-hidden
                className="block font-[var(--font-display)] text-[100px] leading-none tracking-[-0.04em]"
                style={{ color: 'rgba(232,39,75,0.15)' }}
              >
                {step.n}
              </span>
              <h3 className="mt-2 font-[var(--font-sans)] text-xl text-[color:var(--color-fg-primary)]">
                {step.title}
              </h3>
              <p className="mt-3 text-[color:var(--color-fg-muted)] text-[15px] leading-[1.6] max-w-[28ch]">
                {step.body}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function DemoSection({ k }: { k: ReturnType<typeof useLocale>['t']['keyst'] }) {
  return (
    <section
      id="keyst-demo"
      aria-labelledby="keyst-demo-heading"
      className="px-6 md:px-12 lg:px-20 py-24 md:py-32 border-t border-[color:var(--color-fg-dim)]/30"
    >
      <div className="max-w-[900px] mx-auto">
        <FadeUp>
          <SectionLabel>{k.demoHeading}</SectionLabel>
          <p className="mt-4 text-lg text-[color:var(--color-fg-muted)] max-w-[56ch] leading-[1.5]">
            {k.demoBody}
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-10 border border-[color:var(--color-fg-dim)]/40 bg-[color:var(--color-bg-elev-1)] overflow-hidden">
            {/* Placeholder thumbnail — user needs to add /keyst-screenshots/demo-thumbnail.png */}
            <div
              className="relative w-full aspect-video flex items-center justify-center"
              style={{ background: 'rgba(232,39,75,0.06)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/keyst-screenshots/demo-thumbnail.png"
                alt="Keyst demo store screenshot"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="relative z-10 text-center p-8">
                <span
                  aria-hidden
                  className="block text-5xl mb-4"
                  style={{ color: 'rgba(232,39,75,0.4)' }}
                >
                  ▶
                </span>
                <p className="font-mono text-xs text-[color:var(--color-fg-meta)] uppercase tracking-[0.12em]">
                  demo-thumbnail.png
                </p>
                <p className="mt-1 font-mono text-[10px] text-[color:var(--color-fg-dim)]">
                  asset pending — see done report
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-[color:var(--color-fg-dim)]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="font-mono text-[11px] text-[color:var(--color-fg-meta)] max-w-[60ch]">
                {k.demoNote}
              </p>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 font-[var(--font-sans-alt)] font-semibold text-sm"
                style={{ background: '#E8274B', color: '#fff' }}
              >
                {k.demoCta}
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function FaqSection({ k }: { k: ReturnType<typeof useLocale>['t']['keyst'] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id="keyst-faq"
      aria-labelledby="keyst-faq-heading"
      className="px-6 md:px-12 lg:px-20 py-24 md:py-32 border-t border-[color:var(--color-fg-dim)]/30"
      style={{ background: 'var(--color-bg-elev-1)' }}
    >
      <FadeUp>
        <SectionLabel>{k.faqHeading}</SectionLabel>
      </FadeUp>

      <div className="mt-10 max-w-[720px] divide-y divide-[color:var(--color-fg-dim)]/30">
        {k.faqItems.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <FadeUp key={i} delay={i * 0.04}>
              <div>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4 group"
                >
                  <span className="font-[var(--font-sans)] text-[color:var(--color-fg-primary)] text-[15px] leading-[1.4]">
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 w-5 h-5 flex items-center justify-center font-mono text-sm transition-transform"
                    style={{
                      color: isOpen ? '#E8274B' : 'var(--color-fg-muted)',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: dur.base, ease: ease.expoOut }}
                  >
                    <p className="pb-5 text-[color:var(--color-fg-muted)] text-[15px] leading-[1.65]">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </div>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}

function ContactSection({ k }: { k: ReturnType<typeof useLocale>['t']['keyst'] }) {
  return (
    <section
      id="keyst-contact"
      aria-labelledby="keyst-contact-heading"
      className="px-6 md:px-12 lg:px-20 py-24 md:py-32 border-t border-[color:var(--color-fg-dim)]/30"
    >
      <div className="max-w-[860px] mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 items-start">
        <div>
          <FadeUp>
            <SectionLabel>{k.contactHeading}</SectionLabel>
            <h2
              id="keyst-contact-heading"
              className="mt-4 font-[var(--font-display)] text-4xl md:text-5xl tracking-[-0.03em] leading-[1.1] pb-2"
            >
              {k.contactHeading}
            </h2>
            <p className="mt-4 text-[color:var(--color-fg-muted)] leading-[1.5]">{k.contactSub}</p>
          </FadeUp>

          <div className="mt-10">
            <KeystContactForm />
          </div>
        </div>

        <aside className="lg:sticky lg:top-32 self-start">
          <FadeUp delay={0.1}>
            <div className="p-8 border border-[color:var(--color-fg-dim)]/40">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-fg-muted)]">
                Direct
              </p>
              <a
                href="mailto:hello@btw.studio"
                className="block mt-4 text-lg text-[color:var(--color-fg-primary)] hover:text-[#E8274B] transition-colors"
              >
                hello@btw.studio →
              </a>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 text-lg text-[color:var(--color-fg-primary)] hover:text-[#E8274B] transition-colors"
              >
                Live demo ↗
              </a>
              <div className="mt-8 pt-6 border-t border-[color:var(--color-fg-dim)]/30">
                <p className="font-mono text-xs text-[color:var(--color-fg-meta)] leading-[1.6]">
                  {k.socialProof}
                </p>
              </div>
            </div>
          </FadeUp>
        </aside>
      </div>
    </section>
  );
}

function KeystContactForm() {
  const { t } = useLocale();
  const f = t.contact.form;
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg(null);
    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      projectType: 'keyst',
      budget: 'tbd',
      message: fd.get('message') as string,
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error ?? `HTTP ${res.status}`);
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur.slow, ease: ease.expoOut }}
        className="p-8 border"
        style={{ borderColor: '#E8274B' }}
      >
        <span
          className="font-mono text-[11px] uppercase tracking-[0.12em]"
          style={{ color: '#E8274B' }}
        >
          ✓ Sent
        </span>
        <h3 className="mt-4 font-[var(--font-display)] text-3xl tracking-[-0.02em] pb-1">
          Got it. We&apos;ll be in touch.
        </h3>
        <p className="mt-3 text-[color:var(--color-fg-muted)]">
          We received your Keyst inquiry and will reply within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <FormField label={f.name}>
        <input
          name="name"
          type="text"
          required
          minLength={2}
          placeholder={f.namePlaceholder}
          className="keyst-input"
          autoComplete="name"
        />
      </FormField>

      <FormField label={f.email}>
        <input
          name="email"
          type="email"
          required
          placeholder={f.emailPlaceholder}
          className="keyst-input"
          autoComplete="email"
        />
      </FormField>

      <FormField label={f.message}>
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder="Tell us about your store — current setup, expected volume, any questions about Keyst."
          className="keyst-input"
        />
      </FormField>

      {status === 'error' && (
        <p className="text-sm" style={{ color: 'var(--color-error)' }}>
          {errorMsg ?? t.contact.error.body}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center px-8 py-3 font-[var(--font-sans-alt)] font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
        style={{ background: '#E8274B', color: '#fff' }}
      >
        {status === 'submitting' ? f.sending : f.send}
      </button>

      <style jsx>{`
        .keyst-input {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          background: var(--color-bg-elev-1);
          border: 1px solid rgba(74, 74, 82, 0.5);
          color: var(--color-fg-primary);
          font-family: var(--font-sans);
          font-size: 15px;
          border-radius: 2px;
          transition:
            border-color 0.2s,
            background 0.2s;
        }
        .keyst-input:focus {
          outline: none;
          border-color: #e8274b;
          background: var(--color-bg-elev-2);
        }
        .keyst-input::placeholder {
          color: var(--color-fg-dim);
        }
      `}</style>
    </form>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-fg-muted)]">
        {label}
      </span>
      {children}
    </label>
  );
}
