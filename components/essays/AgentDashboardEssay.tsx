'use client';

import Link from 'next/link';

export function AgentDashboardEssay() {
  return (
    <article className="px-6 md:px-12 lg:px-20 py-8 md:py-16">
      <div className="max-w-[720px] mx-auto">
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 font-mono text-xs text-[color:var(--color-fg-meta)] hover:text-[color:var(--color-accent)]"
        >
          ← Writing
        </Link>

        <header className="mt-10 mb-14">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-fg-meta)]">
            <span style={{ color: '#9EFF6E' }}>Engineering</span>
            <span aria-hidden>·</span>
            <span>2026-04-20</span>
            <span aria-hidden>·</span>
            <span>12 min read</span>
          </div>

          <h1 className="mt-6 font-[var(--font-display)] text-4xl md:text-6xl tracking-[-0.03em] leading-[1.05] pb-3">
            Shipping 20 live agent cards at 60fps on a 512MB VM
          </h1>
          <p className="mt-6 text-xl text-[color:var(--color-fg-muted)] leading-[1.4] max-w-[58ch]">
            How we built Agent Dashboard — the pixel-art observatory for Claude Code agents. Canvas
            2D over React, raw <code className="text-[color:var(--color-accent)]">ws</code> over
            Socket.io, and why we migrated off Railway mid-flight.
          </p>
        </header>

        <div className="prose-body">
          <P>
            Agent Dashboard is the control-tower for the twenty-plus Claude Code agents that run
            across our local and remote environments. It is a pixel-art office where every agent is
            a character at a desk; when an agent opens a file, you see it move. When an agent is
            thinking, a little thought bubble appears. When it commits, you see the signal ripple
            across the room.
          </P>
          <P>
            It sounds whimsical. It is. It is also the single most used tool in our studio. The
            question other developers ask us most is{' '}
            <em>&quot;why not just a log tail in a terminal?&quot;</em>. The answer is in this post,
            along with every trade-off that got us to the current version.
          </P>

          <H2>The problem we were actually solving</H2>

          <P>
            We build software with a 6-agent waterfall pipeline (<code>product-manager</code> →{' '}
            <code>business-analyst</code> → <code>architect</code> → <code>developer</code> →{' '}
            <code>reviewer</code> → <code>test-engineer</code>). Each agent runs in parallel across
            different feature branches. At any moment there might be twenty conversations in flight,
            each with its own file reads, edits, tool calls, and token burn.
          </P>

          <P>
            Log tails work when you have one agent. They do not work when you have twenty, because
            the thing you need to know is never &quot;what did agent&nbsp;#1 do at 09:14:22&quot;.
            It is &quot;which three agents are stuck&quot;, or &quot;has the reviewer touched the
            PR&quot;, or &quot;why is the build failing <em>right now</em>&quot;.
          </P>

          <P>
            Off-the-shelf observability (Datadog, Grafana) treats every agent as a log stream. That
            does not match how humans think about multi-agent systems. We think spatially — there is
            a team, people have roles, work moves between them. So we built a spatial view.
          </P>

          <H2>Constraints that shaped everything</H2>

          <P>Before a single line of code, we wrote the hard limits:</P>

          <Ul>
            <li>
              <strong>Target VM:</strong> Fly.io shared-cpu-1x, 512 MB memory. No GPU, no WebGL
              acceleration we can count on.
            </li>
            <li>
              <strong>Docker image budget:</strong> ≤ 100 MB. Cold starts on Fly.io are measured in
              seconds, not minutes.
            </li>
            <li>
              <strong>Cold start:</strong> ≤ 1 second from HTTP request to agent data on screen.
            </li>
            <li>
              <strong>Paint loop:</strong> 60fps during active use. Laggy realtime is worse than no
              realtime.
            </li>
            <li>
              <strong>No per-agent server process.</strong> One VM, N websocket clients, single node
              event loop.
            </li>
          </Ul>

          <P>
            These are not arbitrary. They were the budget we had and the budget we had to stay
            inside. Every subsequent decision below is downstream of one of them.
          </P>

          <H2>Stack decision #1 — Canvas 2D, not React, not WebGL</H2>

          <P>
            The obvious starting point is React. We use it everywhere else. We tried it for about
            two hours.
          </P>

          <P>
            At 20 agents × 6 UI elements each (sprite, name, thought bubble, file indicator, tool
            call, status dot) you have ~120 components re-rendering every frame. React reconciles
            all of them against the virtual DOM every tick. Even with memoization, you bleed frames.
            We measured 28–34 fps on our target VM with a trivial scene.
          </P>

          <P>
            WebGL was the opposite problem. Plenty of headroom, but an iridescent blob for twenty
            desks is overkill, and the bundle cost of Three.js (~700 KB gz) blows the Docker image
            budget when you include fonts.
          </P>

          <P>
            Canvas 2D is the sweet spot. One <code>requestAnimationFrame</code> loop. Manual diff of
            what changed. Direct draw calls. The whole rendering core is about 400 lines, and it
            holds 60fps on 20 agents with room to spare — we can scale to 40 before the frame budget
            starts to hurt.
          </P>

          <P>
            <strong>Trade-off we accepted:</strong> we hand-wrote collision, hit-testing, text
            layout, z-ordering, and sprite animation. Those come free in React + DOM. We estimated
            two extra weeks of engineering in exchange for a steady 60fps. We took the deal.
          </P>

          <H2>Stack decision #2 — raw ws, not Socket.io</H2>

          <P>
            Socket.io is the default. It is also 80 KB gz on the client, and brings with it a
            fallback polling loop that ignores your careful work to avoid it.
          </P>

          <P>
            We run raw <code>ws</code> on the server and native <code>WebSocket</code> on the
            browser. No reconnection logic out of the box, no rooms, no namespaces — we wrote 120
            lines of our own. The result: ~4 KB on the client, deterministic behaviour, zero
            transport surprises.
          </P>

          <P>
            The loop is stupid-simple. Each agent writes to its log directory. Chokidar watches
            those directories. When a file changes, the server broadcasts a diff over WS. Every
            connected browser receives the diff, merges it into its in-memory state, and the canvas
            redraws only the affected agent tile.
          </P>

          <H2>Stack decision #3 — 23 modules under 200 LOC each</H2>

          <P>
            We do not do &quot;one big app.js&quot;. The client is 23 JS modules: constants, math,
            audio, palettes, particles, bubbles, background, effects, agentState, creatures,
            renderer, state, websocket, ui, tasks, admin, clickAnims, settings, adminPos — and a few
            more that accumulated over the project.
          </P>

          <P>
            Each file has one job. None of them exceed 200 LOC. Vite bundles them into a single
            client chunk that is still under 80 KB gz, and we can reason about any single file in
            one sitting.
          </P>

          <Pull>
            The 200-LOC ceiling is not dogma. It is the point where a module stops fitting on one
            screen, and once you lose that you lose the ability to refactor without fear.
          </Pull>

          <H2>Three failures on the path to 60fps</H2>

          <H3>Failure 1 — painting everything every frame</H3>
          <P>
            Version 1 cleared the whole canvas and repainted all 20 agents every frame. It looked
            smooth until the browser tab was backgrounded; when the user came back, frames were
            dropping into the teens. Chrome throttles requestAnimationFrame aggressively when the
            tab is not visible, so our &quot;60fps&quot; was an illusion.
          </P>
          <P>
            <strong>Fix:</strong> dirty-rect tracking. Only repaint tiles that changed. The main
            loop now paints two to four tiles per frame on average instead of twenty.
          </P>

          <H3>Failure 2 — GC pauses from per-frame object allocation</H3>
          <P>
            We allocated a fresh <code>{'{x, y, w, h}'}</code> object inside every draw call for
            every tile. At 60fps × 20 agents × 6 elements you are generating 7200 objects/second. V8
            eventually pays you back with a 40–80ms GC pause, and that pause lands at exactly the
            wrong moment — when the user is clicking something.
          </P>
          <P>
            <strong>Fix:</strong> object pooling. We preallocate scratch buffers for the hot paths
            and reuse them. The GC pauses went from &quot;noticeable every few seconds&quot; to
            &quot;not measurable&quot;.
          </P>

          <H3>Failure 3 — chokidar on every file in the vault</H3>
          <P>
            Our naive first version watched the entire vault directory recursively. When you have
            thousands of files, chokidar holds thousands of file handles, which blows past the 512
            MB memory ceiling within an hour. The VM OOM-killed itself.
          </P>
          <P>
            <strong>Fix:</strong> scope the watcher to just{' '}
            <code>&lt;vault&gt;/projects/*/logs/</code>. That cut the watched surface from 10k files
            to ~40. Memory usage flatlines at 180 MB.
          </P>

          <H2>The Railway → Fly.io migration mid-flight</H2>

          <P>
            Three weeks into development our Railway trial expired. We had a live URL, a working
            app, and a deadline the next morning to show it to an internal audience. We had two
            choices: pay Railway, or migrate.
          </P>

          <P>
            We migrated. The Dockerfile already existed (multi-stage, alpine, 60 MB). We wrote a{' '}
            <code>fly.toml</code> targeting fra, one <code>flyctl launch</code>, and it was live in
            under an hour. The only real work was rewriting a preview-environment webhook that had
            been Railway-specific (deleted, then re-implemented as a GitHub Actions flow).
          </P>

          <P>
            <strong>Why it was boring:</strong> the app was already stateless. Chokidar watches
            local files; those files come from <code>sync-to-cloud.js</code>, a separate process
            that POSTs to the server every two seconds with the vault diff. Migration was &quot;set
            up a new VM, point sync at its URL, done&quot;. There was nothing to export, no database
            to migrate, no DNS to re-verify.
          </P>

          <P>
            This is the benefit of the 512 MB / stateless constraint we set at the start. It bought
            us the ability to migrate vendors in a morning.
          </P>

          <H2>Process receipts — how the pipeline actually looked</H2>

          <P>The dashboard was built with the same waterfall pipeline it is now observing:</P>

          <Receipts />

          <P>
            Every one of those commits has a linked agent trace in our internal tools. We publish
            them unredacted on the detail page of this case study — you can see exactly which agent
            proposed what, and which pull requests got sent back for revision.
          </P>

          <H2>What we would do differently</H2>

          <Ul>
            <li>
              <strong>We would start with TypeScript.</strong> We started in plain JS for speed.
              Three weeks in, the first-class type definitions for agent state started to matter
              more than the warm-up. Migration cost us a day we did not need to spend.
            </li>
            <li>
              <strong>We would write Playwright e2e earlier.</strong> We added them late, after a
              redeploy broke a critical path. The tests paid for themselves within two weeks.
              Earlier, and we would have caught more regressions in the preview-env flow.
            </li>
            <li>
              <strong>We would not build our own sprint-preview webhook.</strong> Getting it to work
              with Railway took two days. Getting it to work with Fly took three more. The feature
              ended up getting replaced by a simple GitHub Actions flow that opens a PR and comments
              the preview URL. Simpler and more debuggable.
            </li>
          </Ul>

          <H2>The outcome</H2>

          <Ul>
            <li>
              Live since 2026-03-23 at{' '}
              <ExtA href="https://dash.btwstudio.dev">dash.btwstudio.dev</ExtA>.
            </li>
            <li>Canvas 2D at 60fps on 20+ live agents.</li>
            <li>60 MB Docker image, 180 MB resident memory, fra region, shared-cpu-1x.</li>
            <li>
              Spec to production in <strong>3 weeks</strong>. Zero downtime migration from Railway
              mid-flight.
            </li>
            <li>Used daily in the studio since — we ship every product with it open.</li>
          </Ul>

          <P>
            The full case study with the studio context and stack tags is at{' '}
            <Link
              href="/labs"
              className="text-[color:var(--color-accent)] underline underline-offset-2"
            >
              /labs
            </Link>
            . The code is private; the agent pack that ships it is public at{' '}
            <ExtA href="https://github.com/workmailan8n-hash/btw-agents-pack">
              github.com/workmailan8n-hash/btw-agents-pack
            </ExtA>
            .
          </P>

          <P className="mt-16 pt-8 border-t border-[color:var(--color-fg-dim)]/30 text-sm text-[color:var(--color-fg-meta)]">
            <strong>BTW Studio</strong> builds AI-native products for small businesses and startups.
            If you have a tool or internal ops dashboard you wish existed — that is the kind of
            brief we take on. See{' '}
            <Link
              href="/contact"
              className="text-[color:var(--color-accent)] underline underline-offset-2"
            >
              /contact
            </Link>
            .
          </P>
        </div>
      </div>
    </article>
  );
}

// ── Primitives ────────────────────────────────────────────────────────────

function P({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`mt-5 text-[17px] leading-[1.75] text-[color:var(--color-fg-muted)] ${className}`}
    >
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-16 mb-2 font-[var(--font-display)] text-3xl md:text-4xl tracking-[-0.02em] leading-[1.1] text-[color:var(--color-fg-primary)]">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-10 mb-2 font-[var(--font-display)] text-2xl tracking-[-0.01em] leading-[1.2] text-[color:var(--color-fg-primary)]">
      {children}
    </h3>
  );
}

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-4 space-y-2 text-[17px] leading-[1.65] text-[color:var(--color-fg-muted)] list-disc pl-6">
      {children}
    </ul>
  );
}

function Pull({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l-2 border-[color:var(--color-accent)] pl-6 py-1 font-[var(--font-display)] text-2xl leading-[1.3] tracking-[-0.01em] text-[color:var(--color-fg-primary)]">
      {children}
    </blockquote>
  );
}

function ExtA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[color:var(--color-accent)] underline underline-offset-2 hover:brightness-110"
    >
      {children}
    </a>
  );
}

function Receipts() {
  const data = [
    { label: 'Agents in pipeline', value: '5' },
    { label: 'Commits', value: '340' },
    { label: 'Deploys', value: '3' },
    { label: 'Spec → prod', value: '3 weeks' },
    { label: 'Frame budget', value: '16.6 ms' },
    { label: 'Actual paint', value: '4.2 ms avg' },
    { label: 'Docker image', value: '60 MB' },
    { label: 'Resident memory', value: '180 MB' },
  ];
  return (
    <dl className="mt-8 mb-4 grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-[color:var(--color-fg-dim)]/30 py-6">
      {data.map((r) => (
        <div key={r.label}>
          <dd className="font-[var(--font-display)] text-2xl tracking-[-0.02em] text-[color:var(--color-accent)] pb-1">
            {r.value}
          </dd>
          <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-fg-meta)]">
            {r.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
