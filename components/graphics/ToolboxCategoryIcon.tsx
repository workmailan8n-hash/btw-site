'use client';

/**
 * Minimal category glyphs (24×24) for Toolbox tiles.
 * Purely decorative — placed next to the group label.
 */
export function ToolboxCategoryIcon({ group, color }: { group: string; color: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: color,
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  switch (group) {
    case 'Frontend':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="M3 9 H21" />
          <circle cx="6" cy="7" r="0.6" fill={color} />
          <circle cx="8.2" cy="7" r="0.6" fill={color} />
        </svg>
      );
    case 'AI & LLMs':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 4 v3 M12 17 v3 M4 12 h3 M17 12 h3 M6 6 l2 2 M16 16 l2 2 M6 18 l2 -2 M16 8 l2 -2" />
        </svg>
      );
    case 'Backend & Data':
      return (
        <svg {...common}>
          <ellipse cx="12" cy="6" rx="8" ry="2.5" />
          <path d="M4 6 v6 c0 1.4 3.6 2.5 8 2.5 s8 -1.1 8 -2.5 v-6" />
          <path d="M4 12 v6 c0 1.4 3.6 2.5 8 2.5 s8 -1.1 8 -2.5 v-6" />
        </svg>
      );
    case 'Infra & Deploy':
      return (
        <svg {...common}>
          <path d="M4 20 h16" />
          <rect x="6" y="14" width="12" height="6" rx="1" />
          <rect x="9" y="8" width="6" height="6" rx="1" />
          <path d="M12 8 v-4" />
          <circle cx="12" cy="4" r="1" fill={color} />
        </svg>
      );
    case 'Quality':
      return (
        <svg {...common}>
          <path d="M4 12 l4 4 L20 4" />
          <circle cx="12" cy="20" r="1.2" fill={color} opacity="0.6" />
        </svg>
      );
    case 'Workflow':
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
          <path d="M8 6 H16 M6 8 V16 M18 8 V16 M8 18 H16" strokeDasharray="2 2" />
        </svg>
      );
    default:
      return null;
  }
}
