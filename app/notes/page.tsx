import type { Metadata } from 'next';
import { SnakeMenu } from '@/components/layout/SnakeMenu';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { NotesIndexContent } from '@/components/pages/NotesIndexContent';

export const metadata: Metadata = {
  title: 'Case studies',
  description:
    'Detailed write-ups of shipped BTW projects — stack choices, constraints, outcomes, numbers.',
};

export default function NotesIndexPage() {
  return (
    <>
      <SnakeMenu />
      <main id="main" className="pt-32 px-6 md:px-12 lg:px-20 min-h-[80dvh]">
        <NotesIndexContent />
      </main>
      <SiteFooter />
    </>
  );
}
