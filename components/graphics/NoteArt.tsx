'use client';

import { motion } from 'motion/react';

/**
 * Abstract domain illustrations for case-study cards.
 * Keyed by slug. Each SVG is tuned to the project's domain:
 * - agent-dashboard       → pixel grid (realtime viz)
 * - courseai              → cascading module bars (course structure)
 * - content-channel       → radiating pulse waves (publishing)
 * - btw-studio-site       → orbiting rings (brand)
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

  if (slug === 'nox') {
    // Moon glyph + 8 satellite dots (one per Mini App tab)
    return (
      <svg {...common}>
        <motion.circle
          cx={100}
          cy={60}
          r={22}
          fill={color}
          opacity={0.85}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx={110}
          cy={52}
          r={20}
          fill="black"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
          const rx = 60;
          const ry = 38;
          const cx = 100 + Math.cos(a) * rx;
          const cy = 60 + Math.sin(a) * ry;
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r={2.6}
              fill={color}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.85 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
            />
          );
        })}
      </svg>
    );
  }

  if (slug === 'keyst') {
    // Key glyph + lock + scattered "code" dots
    return (
      <svg {...common}>
        {/* Vertical accent ticks (key teeth pattern) */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.rect
            key={`tick-${i}`}
            x={40 + i * 8}
            y={66}
            width={4}
            height={i % 2 === 0 ? 18 : 12}
            fill={color}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${42 + i * 8}px 66px` }}
          />
        ))}
        {/* Key bow (ring) */}
        <motion.circle
          cx={92}
          cy={70}
          r={16}
          fill="none"
          stroke={color}
          strokeWidth={3}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        />
        <motion.circle
          cx={92}
          cy={70}
          r={6}
          fill={color}
          opacity={0.4}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
        />
        {/* Lock body to the right */}
        <motion.rect
          x={130}
          y={62}
          width={26}
          height={22}
          rx={2}
          fill={color}
          opacity={0.85}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.85 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        />
        {/* Lock shackle */}
        <motion.path
          d="M 136 62 L 136 56 Q 136 50 143 50 Q 150 50 150 56 L 150 62"
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        {/* Keyhole */}
        <motion.circle
          cx={143}
          cy={71}
          r={2}
          fill="black"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        />
        {/* Scattered crypto-currency dots in corners */}
        {[
          [18, 22],
          [180, 26],
          [22, 110],
          [178, 108],
          [170, 18],
        ].map(([x, y], i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r={1.8}
            fill={color}
            opacity={0.5}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + i * 0.05 }}
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
