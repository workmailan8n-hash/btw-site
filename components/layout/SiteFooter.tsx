'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/i18n/context';

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer
      role="contentinfo"
      className="mt-40 border-t border-[color:var(--color-fg-dim)]/30 px-6 md:px-12 lg:px-20 py-16"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span className="font-[var(--font-display)] text-xl tracking-[-0.02em]">
            BTW<span className="text-[color:var(--color-accent)]">.</span>
          </span>
          <p className="mt-3 text-sm text-[color:var(--color-fg-meta)] max-w-[48ch]">
            {t.footer.tagline}{' '}
            <a
              href="https://t.me/btw_aitech"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[color:var(--color-accent)] transition-colors"
            >
              @btw_aitech
            </a>
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex gap-6 text-sm">
          <Link href="/#work">{t.nav.work}</Link>
          <Link href="/notes">{t.nav.notes}</Link>
          <Link href="/about">{t.nav.about}</Link>
          <Link href="/contact">{t.nav.contact}</Link>
        </nav>
      </div>
    </footer>
  );
}
