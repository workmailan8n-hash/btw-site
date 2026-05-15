export type Metric = { value: string; label: string };

export type ProcessReceipts = {
  agents: string[];
  commits?: number;
  deploys?: number;
  shippedIn?: string;
  specRef?: string;
};

export type MediaItem =
  | { kind: 'video'; src: string; poster?: string; caption?: string; aspect?: 'phone' | 'wide' }
  | { kind: 'image'; src: string; caption?: string; aspect?: 'phone' | 'wide' };

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  status: 'Live' | 'NDA' | 'Archived' | 'Maintenance';
  role: string;
  timeline: string;
  href?: string;
  overrideHref?: string;
  nda?: boolean;
  /** Hide from /notes index and homepage preview. Detail page still works for direct links. */
  hidden?: boolean;
  accent: string;
  gradient: string;
  stack: string[];
  metrics: Metric[];
  sections: { heading: string; body: string }[];
  tags: string[];
  receipts?: ProcessReceipts;
  media?: MediaItem[];
};

export const notes: CaseStudy[] = [
  {
    slug: 'courseai',
    title: 'CourseAI',
    tagline:
      'AI-generated structured courses from YouTube, PDF or raw text — shipped to paying subscribers in 4 weeks.',
    year: '2026',
    status: 'Live',
    role: 'Full-cycle SaaS · spec to paid subscribers',
    timeline: '4 weeks · Mar–Apr 2026',
    href: 'https://courseai-jade.vercel.app',
    accent: '#B8A6FF',
    gradient:
      'radial-gradient(ellipse at 60% 30%, rgba(184,166,255,0.4), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(255,184,107,0.2), transparent 60%)',
    stack: [
      'Next.js 15',
      'React 18',
      'TypeScript',
      'Prisma',
      'Neon Postgres',
      'NextAuth',
      'Stripe',
      'Google Gemini',
      'Tailwind',
      'Vercel',
    ],
    metrics: [
      { value: '4 weeks', label: 'Spec to paid subscribers' },
      { value: 'Stripe', label: 'Subscription billing live' },
      { value: '3', label: 'Input formats (YT / PDF / text)' },
      { value: 'ADR-0001', label: 'Auth pivot documented' },
    ],
    tags: ['ai', 'saas', 'subscription'],
    receipts: {
      agents: [
        'product-manager',
        'business-analyst',
        'architect',
        'prisma-expert',
        'developer',
        'reviewer',
        'test-engineer',
      ],
      commits: 180,
      deploys: 12,
      shippedIn: '4 weeks',
    },
    sections: [
      {
        heading: 'Context',
        body: 'Creators had raw knowledge in YouTube transcripts, PDFs or long-form docs but no scaffolding for learners. We built a platform that ingests any of those inputs and emits a structured course: modules, lessons, quizzes, reading-time estimates. Shipped to paying subscribers in one month.',
      },
      {
        heading: 'Approach',
        body: 'Next.js 15 App Router with server actions for ingestion, Gemini for generation, Neon for state. NextAuth for email-only auth after we hit a dead end with Google OAuth (documented as ADR-0001). Stripe for subscription billing. Tailwind for UI.',
      },
      {
        heading: 'Stack decisions',
        body: 'Gemini over OpenAI for cost at the target quality bar — course generation is a long-context task where Gemini Pro wins on price-per-token. Neon over Supabase for pure Postgres + branching on PRs. Vercel for deploy to pair with Next 15 edge features.',
      },
      {
        heading: 'Outcome',
        body: 'Live at the link above. Four weeks from empty repo to first paying subscriber. Stripe subscription billing, email-only auth, course generation from any of three input formats. What we ship for clients with similar SaaS briefs.',
      },
    ],
    media: [
      {
        kind: 'video',
        src: '/notes/courseai/tour.mp4',
        aspect: 'wide',
        caption: 'Landing tour — hero → features → pricing',
      },
      {
        kind: 'image',
        src: '/notes/courseai/cover.png',
        aspect: 'wide',
        caption: 'Hero — Raw content in. Structured knowledge out.',
      },
      {
        kind: 'image',
        src: '/notes/courseai/signin.png',
        aspect: 'wide',
        caption: 'Sign-in — sample generated course preview',
      },
    ],
  },
  {
    slug: 'content-channel',
    title: 'Content Channel',
    tagline:
      'Automated content pipeline — one Obsidian note goes live across Telegram, LinkedIn and Instagram on schedule. Zero copy-paste.',
    year: '2025',
    status: 'Live',
    // Subsumed by Nox (2026-04-28, see vault/projects/Nox.md). Hidden from index/homepage.
    // Detail page at /notes/content-channel remains accessible for legacy links.
    hidden: true,
    role: 'Content ops automation · we eat our own dogfood',
    timeline: '2 weeks · Nov 2025',
    href: 'https://t.me/btw_aitech',
    accent: '#FFB86B',
    gradient:
      'radial-gradient(ellipse at 30% 60%, rgba(255,184,107,0.35), transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(158,255,110,0.2), transparent 60%)',
    stack: ['Node.js', 'Grammy (Telegram)', 'Claude', 'n8n', 'Cron', 'Express', 'Obsidian sync'],
    metrics: [
      { value: '3', label: 'Platforms auto-published' },
      { value: 'daily', label: 'Publishing cadence held' },
      { value: '2 weeks', label: 'Idea → live pipeline' },
      { value: 'live', label: 'Running in production since Nov 2025' },
    ],
    tags: ['automation', 'content', 'service'],
    receipts: {
      agents: ['architect', 'telegram-bot-expert', 'prompt-engineer', 'developer'],
      commits: 80,
      deploys: 4,
      shippedIn: '2 weeks',
    },
    sections: [
      {
        heading: 'Context',
        body: 'Cross-platform content duplication is the #1 reason content pipelines die. We needed one writing surface (Obsidian) and automated downstream publishing to Telegram, LinkedIn and Instagram. We built it for ourselves first — now we ship the same pipeline to studios, solo creators and small teams who want content ops without the copy-paste tax.',
      },
      {
        heading: 'Approach',
        body: 'Obsidian stays the authoring layer — that is where work actually happens. A Node service watches the vault, extracts publish-ready markdown, uses Claude to adapt tone per platform (short Telegram post, structured LinkedIn with hook, Instagram caption with hashtags), and schedules delivery through Grammy + platform APIs. n8n orchestrates retries and batches.',
      },
      {
        heading: 'Outcome',
        body: 'Our public channel @btw_aitech runs on this pipeline daily since November 2025. Two weeks from idea to live, held daily cadence since. The service offering: same setup adapted to your vault and your platforms in two weeks. You write once, we handle the rest.',
      },
    ],
  },
  {
    slug: 'nox',
    title: 'Nox',
    tagline:
      'Single-user Telegram assistant on Claude Sonnet 4.6 — tasks, email triage, content pipeline, weekly sprints. Owner-only by design.',
    year: '2026',
    status: 'Live',
    role: 'Personal AI ops · single-user by design',
    timeline: '4 weeks · Apr–May 2026',
    href: 'https://nox-landing-lemon.vercel.app',
    accent: '#6EA8FF',
    gradient:
      'radial-gradient(ellipse at 25% 30%, rgba(110,168,255,0.4), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(184,166,255,0.22), transparent 60%)',
    stack: [
      'TypeScript',
      'grammY',
      'SQLite (WAL)',
      'Claude Sonnet 4.6',
      'Ollama Gemma',
      'Express 4',
      'React 19',
      'Tailwind 4',
      'Gmail API',
      'Groq Whisper',
    ],
    metrics: [
      { value: '8', label: 'Mini App tabs in one bot' },
      { value: '24', label: 'XML tools Sonnet can call' },
      { value: '<60s', label: 'OTP forward fast-lane' },
      { value: '412', label: 'Vitest tests green' },
    ],
    tags: ['ai', 'telegram', 'personal-software'],
    receipts: {
      agents: [
        'product-manager',
        'business-analyst',
        'telegram-bot-expert',
        'prompt-engineer',
        'security-engineer',
        'developer',
        'reviewer',
      ],
      commits: 240,
      deploys: 18,
      shippedIn: '4 weeks',
    },
    media: [
      {
        kind: 'video',
        src: '/notes/nox/tour.mp4',
        aspect: 'phone',
        caption: 'Mini App tour — 8 tabs',
      },
      { kind: 'image', src: '/notes/nox/today.png', aspect: 'phone', caption: 'Today' },
      { kind: 'image', src: '/notes/nox/tasks.png', aspect: 'phone', caption: 'Tasks' },
      {
        kind: 'image',
        src: '/notes/nox/content.png',
        aspect: 'phone',
        caption: 'Content composer',
      },
      { kind: 'image', src: '/notes/nox/email.png', aspect: 'phone', caption: 'Email triage' },
      { kind: 'image', src: '/notes/nox/chat.png', aspect: 'phone', caption: 'Chat with Sonnet' },
      { kind: 'image', src: '/notes/nox/news.png', aspect: 'phone', caption: 'News feed' },
    ],
    sections: [
      {
        heading: 'Context',
        body: 'A personal Telegram assistant that knows one person — me. Not a SaaS, not a beta. Single-user allowlist by Telegram ID. The reason: no third-party tool can know about a single owner what an owner-only assistant can — every project, task, draft, email, chat is in one place, on one machine, with no multi-tenant cost of privacy or compliance.',
      },
      {
        heading: 'Approach',
        body: 'Claude Sonnet 4.6 via Max 20x subscription as primary LLM, Ollama Gemma 4 E4B as offline fallback when the rate window is exhausted. grammY for the Telegram bot, Express + React 19 + Tailwind 4 for an 8-tab Mini App. Three hard invariants enforced in code and CI: INV-1 OTP never stored in plain text; INV-2 a single legitimate caller of gmail.send (approvals.dispatch); INV-3 /panic blocks all external actions until /resume. Demo pipeline itself is part of the codebase — Playwright drives a sanitized snapshot DB, ffmpeg cuts the GIFs.',
      },
      {
        heading: 'Outcome',
        body: 'In production since April 2026. Eight tabs (today, tasks, backlog, email, content, projects, chat, news) plus free-text Sonnet chat with 24 XML tools. The same pipeline that publishes daily to @btw_aitech also drafts replies to Gmail, forwards 2FA codes in under a minute, scans nine repos for orphan commits, and generates a weekly sprint every Monday. 412 tests, three architectural invariants, one user.',
      },
    ],
  },
  {
    slug: 'keyst',
    title: 'Keyst',
    tagline:
      'Self-hosted white-label storefront for digital key resellers. Own your stack — no platform risk, no marketplace fees, no Stripe ToS issues.',
    year: '2026',
    status: 'Live',
    role: 'Product · full-cycle from spec to sales surface',
    timeline: '4 weeks · May 2026',
    href: 'https://keyst-demo.fly.dev',
    overrideHref: '/keyst',
    accent: '#E8274B',
    gradient:
      'radial-gradient(ellipse at 70% 30%, rgba(232,39,75,0.35), transparent 55%), radial-gradient(ellipse at 20% 75%, rgba(17,24,39,0.8), transparent 60%)',
    stack: [
      'Next.js 14',
      'TypeScript',
      'Prisma',
      'Postgres',
      'Redis',
      'BullMQ',
      'Docker',
      'Fly.io',
    ],
    metrics: [
      { value: '5', label: 'Payment adapters (crypto-native)' },
      { value: 'AES-256', label: 'Key encryption at rest' },
      { value: '<45min', label: 'VPS to live store via wizard' },
      { value: '$499', label: 'Setup price' },
    ],
    tags: ['product', 'ecommerce', 'self-hosted'],
    sections: [
      {
        heading: 'Context',
        body: 'Sellix — the dominant self-hosted key storefront — was seized by US authorities in 2024. Sellpass rebranded to Antistock. A window opened for a clean, ownable alternative. Keyst is that alternative: single-tenant, self-hosted, crypto-native, with no platform risk.',
      },
      {
        heading: 'Approach',
        body: 'Next.js 14 App Router, Prisma + Postgres for persistence, Redis + BullMQ for async key delivery. Five payment adapters built to an interface: NOWPayments, CryptoCloud, FreeKassa, Fondy, and a custom stub. AES-256-GCM for key and payment-config encryption. Docker + Fly.io for the demo; VPS + Docker for customer installs.',
      },
      {
        heading: 'Outcome',
        body: 'Live demo at keyst-demo.fly.dev. Setup Wizard takes a blank VPS to a live, branded store in under 45 minutes. Product page at btw-studio.fly.dev/keyst. First customer target: June 2026.',
      },
    ],
  },
  {
    slug: 'agent-dashboard',
    title: 'Agent Dashboard',
    tagline:
      'Pixel-art office where Claude Code agents work in real time — a live spatial visualization of an asynchronous LLM workforce.',
    year: '2026',
    status: 'Live',
    role: 'Realtime ops viz · Canvas 2D + WebSocket',
    timeline: '6 weeks · Mar–May 2026',
    href: 'https://agent-dashboard-ancient-mountain-4835.fly.dev',
    accent: '#9EFF6E',
    gradient:
      'radial-gradient(ellipse at 30% 25%, rgba(158,255,110,0.35), transparent 60%), radial-gradient(ellipse at 80% 75%, rgba(110,168,255,0.2), transparent 60%)',
    stack: [
      'Node.js',
      'WebSocket (ws)',
      'Vite 5',
      'HTML5 Canvas 2D',
      'Chokidar (file watcher)',
      'Playwright (E2E)',
      'Fly.io',
    ],
    metrics: [
      { value: '~20', label: 'Live agents in the office' },
      { value: '4', label: 'Walled rooms with HVAC + decor' },
      { value: '23', label: 'Vanilla JS modules in src/' },
      { value: 'Canvas', label: 'No React — 60fps pixel art' },
    ],
    tags: ['visualization', 'realtime', 'experiment'],
    receipts: {
      agents: [
        'product-manager',
        'ux-designer',
        '3d-scene-designer',
        'motion-designer',
        'developer',
        'qa-engineer',
      ],
      commits: 160,
      deploys: 22,
      shippedIn: '6 weeks',
    },
    media: [
      {
        kind: 'video',
        src: '/notes/agent-dashboard/tour.mp4',
        aspect: 'wide',
        caption: 'Live agents pan',
      },
      {
        kind: 'image',
        src: '/notes/agent-dashboard/cover.png',
        aspect: 'wide',
        caption: 'Office floor — 20 agents',
      },
      {
        kind: 'image',
        src: '/notes/agent-dashboard/details.png',
        aspect: 'wide',
        caption: 'Sidebar + activity ticker',
      },
    ],
    sections: [
      {
        heading: 'Context',
        body: 'Running 20 Claude Code agents in parallel is invisible — terminal tabs, JSONL log files, status spinners. We wanted a spatial metaphor: a pixel-art office where each agent is a sprite with a name, an emotion, a workstation, and an activity. Walked rooms cluster agents by domain (frontend, backend, design, ops). Stats sidebar surfaces uptime, online count, working/idle ratio.',
      },
      {
        heading: 'Approach',
        body: 'Vanilla Node WebSocket server reads `~/.claude/projects/**/*.jsonl` via Chokidar, parses tool-use and assistant events, maps each Claude session to an in-office agent. Vite-built frontend renders 60fps Canvas 2D — no React. Twenty-three modules in src/: sprite atlas, room layouts, HVAC particles, click handling with nested-clickable priority, websocket reconnect with backoff. Playwright E2E for spawn / move / interact flows.',
      },
      {
        heading: 'Outcome',
        body: 'Live on Fly.io, deployed 22 times during build. Now the canonical way to know "what is my parallel agent pool doing right now" — better than reading 20 terminal panes. The wall editor, sprint preview, and bottom-zone redesign all shipped iteratively from spec to prod. Currently powering @btw_aitech sprint reports via TG bot integration.',
      },
    ],
  },
];

export function getNote(slug: string) {
  return notes.find((n) => n.slug === slug);
}
