import type { Metadata } from 'next';
import { SnakeMenu } from '@/components/layout/SnakeMenu';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ContactPageContent } from '@/components/pages/ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Tell us about your project. We reply within 24 hours.',
};

export default function ContactPage() {
  return (
    <>
      <SnakeMenu />
      <main id="main" className="pt-32 px-6 md:px-12 lg:px-20 min-h-[80dvh]">
        <ContactPageContent />
      </main>
      <SiteFooter />
    </>
  );
}
