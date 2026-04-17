'use client';

import { motion } from 'motion/react';

/**
 * Abstract domain illustrations for case-study cards.
 * Keyed by slug. Each SVG is tuned to the project's domain:
 * - agent-dashboard       → pixel grid (realtime viz)
 * - courseai              → cascading module bars (course structure)
 * - content-channel       → radiating pulse waves (publishing)
 * - btw-studio-site       → orbiting rings (brand)
 * - fintech-ops-platform  → candlestick ticks (fintech)
 * - rag-analytics-engine  → neural cloud (RAG)
 */
export function NoteArt({ slug, color }: { slug: string; color: string }) {
  const common = {
    viewBox: '0 0 200 120',
    width: '100%',
    height: '100%',
    fill: 'none' as const,
    preserveAspectRatio: 'xMidYMid meet',
    'aria-hidden': true as const,
  };

  if (slug === 'agent-dashboard') {
    // Pixel grid — 8×5 cells, some filled, scroll-reveal
    const cells: { x: number; y: number; fill: boolean }[] = [];
    const filled = [
      [0, 1],
      [1, 1],
      [2, 0],
      [2, 1],
      [3, 2],
      [4, 1],
      [5, 0],
      [5, 3],
      [6, 2],
      [7, 1],
      [0, 3],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 3],
      [5, 4],
      [6, 3],
      [7, 2],
    ];
    const filledSet = new Set(filled.map(([x, y]) => `${x},${y}`));
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 5; y++) {
        cells.push({ x, y, fill: filledSet.has(`${x},${y}`) });
      }
    }
    return (
      <svg {...common}>
        {cells.map((c, i) => (
          <motion.rect
            key={i}
            x={40 + c.x * 16}
            y={20 + c.y * 16}
            width={12}
            height={12}
            fill={c.fill ? color : 'none'}
            stroke={color}
            strokeWidth={0.8}
            opacity={c.fill ? 1 : 0.25}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: c.fill ? 1 : 0.25 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: (c.x + c.y) * 0.02 }}
          />
        ))}
      </svg>
    );
  }

  if (slug === 'courseai') {
    return (
      <svg {...common}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.rect
            key={i}
            x={40 + i * 8}
            y={30 + i * 6}
            width={100 - i * 12}
            height={6}
            rx={1}
            fill={color}
            opacity={1 - i * 0.12}
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </svg>
    );
  }

  if (slug === 'content-channel') {
    // Radiating rings from a central dot
    return (
      <svg {...common}>
        {[40, 28, 18, 10].map((r, i) => (
          <motion.circle
            key={i}
            cx={100}
            cy={60}
            r={r}
            stroke={color}
            strokeWidth={0.8}
            opacity={0.2 + i * 0.15}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.2 + i * 0.15 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.08 }}
          />
        ))}
        <circle cx={100} cy={60} r={3} fill={color} />
      </svg>
    );
  }

  if (slug === 'btw-studio-site') {
    // Orbiting dots with BTW. centered
    return (
      <svg {...common}>
        <motion.ellipse
          cx={100}
          cy={60}
          rx={72}
          ry={22}
          stroke={color}
          strokeWidth={0.8}
          opacity={0.4}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        />
        <motion.ellipse
          cx={100}
          cy={60}
          rx={44}
          ry={38}
          stroke={color}
          strokeWidth={0.8}
          opacity={0.3}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        />
        <motion.circle
          cx={172}
          cy={60}
          r={3}
          fill={color}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        />
        <motion.circle
          cx={100}
          cy={22}
          r={2.5}
          fill={color}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        />
        <text
          x={100}
          y={64}
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="22"
          fontWeight="700"
          fill={color}
          opacity={0.9}
        >
          BTW<tspan fill={color}>.</tspan>
        </text>
      </svg>
    );
  }

  if (slug === 'fintech-ops-platform') {
    // Candlestick ticks
    const bars = [
      { x: 40, h: 18, y: 50 },
      { x: 52, h: 32, y: 40 },
      { x: 64, h: 24, y: 46 },
      { x: 76, h: 44, y: 34 },
      { x: 88, h: 36, y: 40 },
      { x: 100, h: 60, y: 26 },
      { x: 112, h: 48, y: 32 },
      { x: 124, h: 70, y: 22 },
      { x: 136, h: 58, y: 28 },
      { x: 148, h: 80, y: 18 },
      { x: 160, h: 64, y: 26 },
    ];
    return (
      <svg {...common}>
        <line x1={32} y1={98} x2={172} y2={98} stroke={color} strokeWidth={0.6} opacity={0.4} />
        {bars.map((b, i) => (
          <motion.rect
            key={i}
            x={b.x}
            y={b.y}
            width={6}
            height={b.h}
            rx={1}
            fill={color}
            opacity={0.85 - i * 0.04}
            initial={{ scaleY: 0, originY: 1 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${b.x + 3}px 98px` }}
          />
        ))}
        <motion.path
          d="M 40 58 L 52 46 L 64 52 L 76 40 L 88 46 L 100 32 L 112 38 L 124 28 L 136 34 L 148 22 L 160 30"
          stroke={color}
          strokeWidth={1.2}
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />
      </svg>
    );
  }

  if (slug === 'rag-analytics-engine') {
    // Dense neural cloud
    const nodes: { x: number; y: number; r: number }[] = [];
    const rnd = (seed: number) => {
      const x = Math.sin(seed * 9999) * 10000;
      return x - Math.floor(x);
    };
    for (let i = 0; i < 28; i++) {
      nodes.push({
        x: 30 + rnd(i * 2 + 1) * 140,
        y: 15 + rnd(i * 2 + 2) * 90,
        r: 1.2 + rnd(i + 100) * 1.8,
      });
    }
    return (
      <svg {...common}>
        {nodes.map((n1, i) =>
          nodes.slice(i + 1).map((n2, j) => {
            const d = Math.hypot(n1.x - n2.x, n1.y - n2.y);
            if (d > 32) return null;
            return (
              <motion.line
                key={`${i}-${j}`}
                x1={n1.x}
                y1={n1.y}
                x2={n2.x}
                y2={n2.y}
                stroke={color}
                strokeWidth={0.4}
                opacity={Math.max(0, 0.4 - d / 100)}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.01 }}
              />
            );
          })
        )}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={color}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
          />
        ))}
      </svg>
    );
  }

  // Fallback — subtle dot grid
  return (
    <svg {...common}>
      {Array.from({ length: 60 }).map((_, i) => {
        const x = (i % 12) * 16 + 20;
        const y = Math.floor(i / 12) * 20 + 20;
        return <circle key={i} cx={x} cy={y} r={1.2} fill={color} opacity={0.5} />;
      })}
    </svg>
  );
}
