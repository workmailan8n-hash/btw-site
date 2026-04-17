import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        'bg-base': 'var(--color-bg-base)',
        'bg-elev-1': 'var(--color-bg-elev-1)',
        'bg-elev-2': 'var(--color-bg-elev-2)',
        'fg-primary': 'var(--color-fg-primary)',
        'fg-muted': 'var(--color-fg-muted)',
        'fg-dim': 'var(--color-fg-dim)',
        'fg-meta': 'var(--color-fg-meta)',
        accent: 'var(--color-accent)',
        'accent-alt': 'var(--color-accent-alt)',
        'accent-warm': 'var(--color-accent-warm)',
        error: 'var(--color-error)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
        'sans-alt': ['var(--font-sans-alt)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
};

export default config;
