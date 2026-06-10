'use client';

import { useLocale } from '@/lib/i18n/context';
import { ProjectTile } from '@/components/tiles/ProjectTile';

export function LabsContent() {
  const { t } = useLocale();

  return (
    <div className="px-6 md:px-12 lg:px-20 py-12 md:py-20">
      <div className="max-w-[900px]">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-fg-meta)]">
          {t.labs.eyebrow}
        </span>
        <h1 className="mt-4 font-[var(--font-display)] text-5xl md:text-7xl tracking-[-0.03em] leading-[1.05] pb-3">
          {t.labs.heading}
        </h1>
        <p className="mt-6 text-lg text-[color:var(--color-fg-muted)] max-w-[62ch] leading-[1.5]">
          {t.labs.intro}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1200px]">
        <ProjectTile
          title="Agent Dashboard"
          tagline="Real-time observatory for 20+ Claude Code agents. Pixel-art canvas at 60fps. Example of the ops dashboards we build for teams with a lot of agents or background workers."
          href="https://dash.btwstudio.dev"
          year="2026"
          status="Live"
          accent="#9EFF6E"
          gradient="radial-gradient(ellipse at 20% 30%, rgba(158,255,110,0.35), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(184,166,255,0.2), transparent 60%)"
          stack={['Node.js', 'WebSocket', 'Canvas 2D', 'Chokidar', 'Fly.io']}
          metrics={[
            { value: '20+', label: 'Agents observed' },
            { value: '60fps', label: 'Canvas render' },
            { value: '60 MB', label: 'Docker image' },
            { value: '3 wk', label: 'Spec → prod' },
          ]}
        />

        <ProjectTile
          title="Claude Agents Marketplace"
          tagline="Public catalog of the 37 subagents + 17 skills that power this studio. Browse, copy, install. Open-source seed repo companion."
          href="https://agents.btwstudio.dev"
          year="2026"
          status="Live"
          accent="#B8A6FF"
          gradient="radial-gradient(ellipse at 30% 30%, rgba(184,166,255,0.38), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(158,255,110,0.18), transparent 60%)"
          stack={['Next.js 15', 'gray-matter', 'Fuse.js', 'shiki', 'Fly.io']}
          metrics={[
            { value: '37', label: 'Agents' },
            { value: '17', label: 'Skills' },
            { value: '62', label: 'Static pages' },
            { value: '98/91', label: 'Lighthouse perf/a11y' },
          ]}
        />
      </div>

      <div className="mt-20 max-w-[720px] border-t border-[color:var(--color-fg-dim)]/30 pt-8">
        <p className="text-sm text-[color:var(--color-fg-muted)] leading-[1.6]">
          {t.labs.footnote}{' '}
          <a
            href="/notes"
            className="text-[color:var(--color-accent)] hover:underline underline-offset-2"
          >
            /notes
          </a>
          .
        </p>
      </div>
    </div>
  );
}
