/**
 * Motion tokens — source of truth for all animations.
 * See design/motion-spec.md §1.
 */

export const ease = {
  expoOut: [0.22, 1, 0.36, 1] as const,
  smooth: [0.65, 0, 0.35, 1] as const,
  softOut: [0.16, 1, 0.3, 1] as const,
  snap: [0.77, 0, 0.175, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
};

export const dur = {
  instant: 0.12,
  quick: 0.2,
  base: 0.4,
  reveal: 0.6,
  slow: 0.9,
  hero: 1.2,
} as const;

export const stagger = {
  char: 0.025,
  word: 0.06,
  card: 0.08,
  step: 0.14,
} as const;

export const gsapEase = {
  expoOut: 'expo.out',
  smooth: 'power3.inOut',
  softOut: 'power2.out',
} as const;
