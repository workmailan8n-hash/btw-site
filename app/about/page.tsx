import type { Metadata } from 'next';
import { SnakeMenu } from '@/components/layout/SnakeMenu';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { AboutContent } from '@/components/pages/AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description: 'BTW Studio — who we are, how we work, what we ship.',
};

export default function AboutPage() {
  return (
    <>
      <SnakeMenu />
      <main id="main" className="pt-32 px-6 md:px-12 lg:px-20 min-h-[80dvh]">
        <AboutContent />
      </main>
      <SiteFooter />
    </>
  );
}
