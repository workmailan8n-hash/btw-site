import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SnakeMenu } from '@/components/layout/SnakeMenu';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { NoteDetailContent } from '@/components/pages/NoteDetailContent';
import { getNote, notes } from '@/lib/notes';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return { title: 'Not found' };
  return { title: note.title, description: note.tagline };
}

export default async function NotePage({ params }: Params) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  return (
    <>
      <SnakeMenu />
      <main id="main" className="pt-32 min-h-[80dvh]">
        <NoteDetailContent note={note} />
      </main>
      <SiteFooter />
    </>
  );
}
