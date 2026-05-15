import type { Metadata } from 'next';
import { SnakeMenu } from '@/components/layout/SnakeMenu';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { KeystPageContent } from '@/components/pages/KeystPageContent';

export const metadata: Metadata = {
  title: 'Keyst — Self-Hosted White-Label Storefront for Digital Key Resellers',
  description:
    'Own-your-stack white-label storefront for digital key resellers. No middlemen, no platform risk. Crypto-native payments. $499 setup.',
  openGraph: {
    title: 'Keyst — Own your storefront, own your stack',
    description:
      'Self-hosted white-label storefront for digital key resellers. Sellix is gone. Don't rent your store — own it.',
  },
};

export default function KeystPage() {
  return (
    <>
      <SnakeMenu />
      <main id="main">
        <KeystPageContent />
      </main>
      <SiteFooter />
    </>
  );
}
