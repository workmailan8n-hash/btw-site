import type { Metadata } from 'next';
import { Inter_Tight, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { LocaleProvider } from '@/lib/i18n/context';

const interTight = Inter_Tight({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter-tight',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-display-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btw-site.fly.dev'),
  title: {
    default: 'BTW. — We ship apps, by the way.',
    template: '%s — BTW.',
  },
  description:
    'By The Way Studio. Boutique app studio building AI tools, web apps and Telegram bots.',
  openGraph: {
    type: 'website',
    title: 'BTW. — We ship apps, by the way.',
    description:
      'By The Way Studio. Boutique app studio building AI tools, web apps and Telegram bots.',
    siteName: 'BTW Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BTW.',
    description: 'We ship apps, by the way.',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interTight.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
