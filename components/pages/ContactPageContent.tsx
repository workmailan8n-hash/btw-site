'use client';

import { useLocale } from '@/lib/i18n/context';
import { ContactForm } from '@/components/contact/ContactForm';

export function ContactPageContent() {
  const { t } = useLocale();

  return (
    <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16">
      <section>
        <h1 className="font-[var(--font-display)] text-5xl md:text-7xl leading-[1.05] tracking-[-0.03em] pb-3">
          {t.contact.hero[0]} <br />
          {t.contact.hero[1]}
        </h1>
        <p className="mt-6 text-lg text-[color:var(--color-fg-muted)] max-w-[50ch]">
          {t.contact.intro}
        </p>

        <div className="mt-12">
          <ContactForm />
        </div>
      </section>

      <aside className="lg:sticky lg:top-32 self-start">
        <div className="p-8 border border-[color:var(--color-fg-dim)]/40 rounded-sm">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-accent)]">
            {t.contact.sidebarHeading}
          </h2>
          <ul className="mt-6 space-y-4">
            <li>
              <a href="mailto:hello@btw.studio" className="block group">
                <span className="font-mono text-xs text-[color:var(--color-fg-meta)]">
                  {t.contact.email}
                </span>
                <span className="block mt-1 text-lg text-[color:var(--color-fg-primary)] group-hover:text-[color:var(--color-accent)] transition-colors">
                  hello@btw.studio →
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://t.me/btw_aitech"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <span className="font-mono text-xs text-[color:var(--color-fg-meta)]">
                  {t.contact.telegram}
                </span>
                <span className="block mt-1 text-lg text-[color:var(--color-fg-primary)] group-hover:text-[color:var(--color-accent)] transition-colors">
                  @btw_aitech →
                </span>
              </a>
            </li>
          </ul>

          <div className="mt-8 pt-8 border-t border-[color:var(--color-fg-dim)]/30">
            <p className="text-sm text-[color:var(--color-fg-muted)]">{t.contact.reply}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
