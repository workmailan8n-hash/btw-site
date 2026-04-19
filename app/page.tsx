import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { BuiltWith } from '@/components/sections/BuiltWith';
import { Services } from '@/components/sections/Services';
import { Toolbox } from '@/components/sections/Toolbox';
import { Work } from '@/components/sections/Work';
import { Process } from '@/components/sections/Process';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SnakeMenu } from '@/components/layout/SnakeMenu';

export default function HomePage() {
  return (
    <>
      <SnakeMenu />
      <main id="main">
        <Hero />
        <Stats />
        <BuiltWith />
        <Services />
        <Toolbox />
        <Work />
        <Process />
        <ContactCTA />
      </main>
      <SiteFooter />
    </>
  );
}
