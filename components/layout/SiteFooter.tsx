'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/i18n/context';
import { BtwMark } from './BtwMark';

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer
      role="contentinfo"
      className="mt-40 border-t border-[color:var(--color-fg-dim)]/30 px-6 md:px-12 lg:px-20 py-16"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span className="block text-[color:var(--color-fg-primary)]">
            <BtwMark className="h-6 w-auto" title="BTW" />
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

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/notes">{t.nav.notes}</Link>
          <Link href="/writing">{t.nav.writing}</Link>
          <Link href="/labs">{t.nav.labs}</Link>
          <Link href="/open-source">{t.nav.oss}</Link>
          <Link href="/about">{t.nav.about}</Link>
          <Link href="/colophon">colophon</Link>
          <Link href="/contact">{t.nav.contact}</Link>
        </nav>
      </div>
    </footer>
  );
}
