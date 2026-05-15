'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ease, dur } from '@/lib/motion/tokens';
import { useLocale } from '@/lib/i18n/context';
import { BtwMark } from './BtwMark';

export function SnakeMenu() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/notes', label: t.nav.notes },
    { href: '/writing', label: t.nav.writing },
    { href: '/keyst', label: 'keyst' },
    { href: '/labs', label: t.nav.labs },
    { href: '/open-source', label: t.nav.oss },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  // Lock body scroll when drawer open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 lg:px-20 py-4 md:py-6 isolate"
        style={{
          background: 'color-mix(in srgb, var(--color-bg-base) 75%, transparent)',
          backdropFilter: 'blur(16px) saturate(140%)',
          WebkitBackdropFilter: 'blur(16px) saturate(140%)',
          borderBottom: '1px solid color-mix(in srgb, var(--color-fg-dim) 30%, transparent)',
        }}
      >
        <nav aria-label="Main navigation" className="flex items-center justify-between">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur.reveal, ease: ease.expoOut, delay: 0.12 }}
            className="text-[color:var(--color-fg-primary)]"
          >
            <Link href="/" aria-label="BTW home" className="block">
              <BtwMark className="h-7 md:h-8 w-auto" title="BTW home" />
            </Link>
          </motion.span>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8 font-[var(--font-sans-alt)] text-xs uppercase tracking-[0.12em] text-[color:var(--color-fg-muted)]">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition-colors hover:text-[color:var(--color-fg-primary)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <LangButton active={locale === 'en'} onClick={() => setLocale('en')} label="English">
                EN
              </LangButton>
              <span aria-hidden className="text-[color:var(--color-fg-dim)]">
                ·
              </span>
              <LangButton
                active={locale === 'uk'}
                onClick={() => setLocale('uk')}
                label="Перейти на українську"
              >
                UK
              </LangButton>
            </li>
          </ul>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-[color:var(--color-fg-primary)]"
          >
            <span className="sr-only">Menu</span>
            <span
              aria-hidden
              className="block w-6 h-[1.5px] bg-[color:var(--color-fg-primary)] relative before:content-[''] before:absolute before:left-0 before:right-0 before:h-[1.5px] before:bg-[color:var(--color-fg-primary)] before:-top-[6px] after:content-[''] after:absolute after:left-0 after:right-0 after:h-[1.5px] after:bg-[color:var(--color-fg-primary)] after:top-[6px]"
            />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.aside
              className="absolute top-0 right-0 h-full w-[85vw] max-w-[360px] bg-[color:var(--color-bg-base)] border-l border-[color:var(--color-fg-dim)]/40 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: dur.base, ease: ease.expoOut }}
            >
              <div className="flex items-center justify-between px-6 py-6 border-b border-[color:var(--color-fg-dim)]/40">
                <span className="text-[color:var(--color-fg-primary)]">
                  <BtwMark className="h-6 w-auto" title="BTW" />
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="relative w-10 h-10 flex items-center justify-center text-[color:var(--color-fg-primary)]"
                >
                  <span aria-hidden className="absolute text-2xl leading-none">
                    ×
                  </span>
                </button>
              </div>

              <ul className="flex-1 flex flex-col p-6 gap-1">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: dur.reveal,
                      ease: ease.expoOut,
                      delay: 0.1 + i * 0.05,
                    }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 font-[var(--font-display)] text-3xl tracking-[-0.02em] border-b border-[color:var(--color-fg-dim)]/30 hover:text-[color:var(--color-accent)] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="p-6 border-t border-[color:var(--color-fg-dim)]/40 space-y-6">
                <div className="flex items-center gap-4 font-[var(--font-sans-alt)] text-sm uppercase tracking-[0.12em]">
                  <LangButton
                    active={locale === 'en'}
                    onClick={() => setLocale('en')}
                    label="English"
                  >
                    EN
                  </LangButton>
                  <span aria-hidden className="text-[color:var(--color-fg-dim)]">
                    ·
                  </span>
                  <LangButton
                    active={locale === 'uk'}
                    onClick={() => setLocale('uk')}
                    label="Перейти на українську"
                  >
                    UK
                  </LangButton>
                </div>

                <div className="flex flex-col gap-2 font-mono text-xs text-[color:var(--color-fg-meta)]">
                  <a
                    href="mailto:hello@btw.studio"
                    className="hover:text-[color:var(--color-accent)] transition-colors"
                  >
                    hello@btw.studio →
                  </a>
                  <a
                    href="https://t.me/btw_aitech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[color:var(--color-accent)] transition-colors"
                  >
                    @btw_aitech →
                  </a>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LangButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`transition-colors ${
        active
          ? 'text-[color:var(--color-accent)] font-semibold'
          : 'text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg-primary)]'
      }`}
    >
      {children}
    </button>
  );
}
