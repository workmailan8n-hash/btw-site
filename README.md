# BTW Studio — brand site

By The Way Studio · editorial dark-luxe brand site. Next.js 15 + React 19 + r3f + Tailwind.

## Local dev

```bash
npm install --legacy-peer-deps
npm run dev   # http://localhost:3000
```

## Env vars

Create `.env.local` (or set in Fly secrets for production):

```
NEXT_PUBLIC_SITE_URL=https://btw-site.fly.dev
RESEND_API_KEY=re_...
RESEND_FROM="BTW <hello@btw.studio>"
RESEND_TO=hello@btw.studio
TG_BOT_TOKEN=...
TG_OWNER_CHAT_ID=397649588
```

Without these, the contact form still accepts submissions (logged to console); no email or TG notification is sent.

## Deploy to Fly.io

**First time:**

```bash
# Install flyctl: https://fly.io/docs/hands-on/install-flyctl/
fly auth login

# Initialize (uses existing fly.toml — say NO to generation prompt)
fly launch --no-deploy --copy-config --name btw-site --region fra

# Set secrets (Fly will keep them out of env snapshots)
fly secrets set RESEND_API_KEY=re_...
fly secrets set RESEND_FROM="BTW <hello@btw.studio>"
fly secrets set RESEND_TO=hello@btw.studio
fly secrets set TG_BOT_TOKEN=...
fly secrets set TG_OWNER_CHAT_ID=397649588
fly secrets set NEXT_PUBLIC_SITE_URL=https://btw-site.fly.dev

# Deploy
fly deploy
```

**Subsequent deploys:**

```bash
fly deploy
```

URL after first deploy: `https://btw-site.fly.dev`.

## Pages

- `/` — home: hero, stats, services, toolbox, work, process, contact CTA
- `/about` — manifesto, timeline, stack, CTA
- `/notes` — case studies index (4 projects)
- `/notes/[slug]` — case study detail
- `/contact` — form (Resend + Telegram notification)

## Languages

EN + UK via client-side `LocaleProvider`. Dictionary in `lib/i18n/dict.ts`. Toggle in header nav.

## Structure

```
app/
  page.tsx              home
  layout.tsx            root + fonts + LocaleProvider
  about/page.tsx
  contact/page.tsx
  notes/page.tsx
  notes/[slug]/page.tsx
  api/contact/route.ts  Resend + TG handler
components/
  layout/               SnakeMenu, SiteFooter
  sections/             Hero, Stats, Services, Toolbox, Work, Process, ContactCTA
  hero/                 HeroScene (r3f), HeroTitle, HeroFallback
  contact/              ContactForm
  pages/                *Content.tsx — i18n-aware page bodies
lib/
  i18n/                 dict, context, useLocale
  motion/               tokens (ease, dur, stagger)
  notes.ts              case-study data
  schema.ts             zod contact form schema
```

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind v3 · Framer Motion · three.js · @react-three/fiber · @react-three/drei · react-hook-form · zod · Resend · Fly.io · Docker.
