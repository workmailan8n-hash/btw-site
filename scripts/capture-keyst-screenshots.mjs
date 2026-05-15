#!/usr/bin/env node
/**
 * Captures screenshots of the live Keyst demo for the /keyst landing page.
 *
 * Usage:
 *   node scripts/capture-keyst-screenshots.mjs
 *   # or with custom demo url:
 *   KEYST_DEMO_URL=https://keyst-demo.fly.dev node scripts/capture-keyst-screenshots.mjs
 *
 * Requires playwright via npx (no install needed):
 *   npx playwright install chromium   # one-time
 *
 * Outputs to: public/keyst-screenshots/{demo-thumbnail,storefront,admin}.png
 */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'public/keyst-screenshots');
const DEMO_URL = process.env.KEYST_DEMO_URL ?? 'https://keyst-demo.fly.dev';

const SHOTS = [
  {
    name: 'demo-thumbnail.png',
    url: DEMO_URL,
    waitFor: 'networkidle',
    fullPage: false,
    description: 'Storefront hero — used on landing /keyst demo callout',
  },
  {
    name: 'storefront.png',
    url: DEMO_URL,
    waitFor: 'networkidle',
    fullPage: true,
    description: 'Full storefront — fallback / OG / docs',
  },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  for (const shot of SHOTS) {
    const out = resolve(OUT_DIR, shot.name);
    console.log(`→ ${shot.url} (${shot.name})`);
    try {
      await page.goto(shot.url, { waitUntil: shot.waitFor, timeout: 30_000 });
      await page.waitForTimeout(2000); // allow lazy content / fonts to settle
      await page.screenshot({ path: out, fullPage: shot.fullPage });
      console.log(`  ✓ saved ${out}`);
    } catch (err) {
      console.error(`  ✗ failed: ${err.message}`);
    }
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
