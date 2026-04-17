'use client';

import { motion } from 'motion/react';

type Props = { index: number; color: string };

/**
 * Abstract service icons — one per service card.
 * 0: Product apps — stacked cards
 * 1: Web apps — browser frame with content bars
 * 2: AI integrations — concentric arcs / neural nodes
 * 3: Telegram bots — speech arrow + flow nodes
 */
export function ServiceIcon({ index, color }: Props) {
  const common = {
    width: 72,
    height: 72,
    viewBox: '0 0 72 72',
    fill: 'none' as const,
    xmlns: 'http://www.w3.org/2000/svg',
  };

  if (index === 0) {
    // Product apps — stacked cards/layers
    return (
      <svg {...common} aria-hidden>
        <motion.rect
          x="10"
          y="28"
          width="40"
          height="26"
          rx="2"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 0.35, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
        <motion.rect
          x="16"
          y="20"
          width="40"
          height="26"
          rx="2"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <motion.rect
          x="22"
          y="12"
          width="40"
          height="26"
          rx="2"
          stroke={color}
          strokeWidth="1.4"
          fill={`${color}18`}
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
        <motion.circle
          cx="30"
          cy="25"
          r="2"
          fill={color}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.55 }}
        />
        <motion.line
          x1="36"
          y1="25"
          x2="54"
          y2="25"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity={0.6}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
      </svg>
    );
  }

  if (index === 1) {
    // Web apps — browser frame with content bars
    return (
      <svg {...common} aria-hidden>
        <motion.rect
          x="10"
          y="14"
          width="52"
          height="44"
          rx="2"
          stroke={color}
          strokeWidth="1.4"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <line x1="10" y1="22" x2="62" y2="22" stroke={color} strokeWidth="1.2" opacity={0.5} />
        <circle cx="14" cy="18" r="1.2" fill={color} opacity={0.5} />
        <circle cx="18" cy="18" r="1.2" fill={color} opacity={0.5} />
        <circle cx="22" cy="18" r="1.2" fill={color} opacity={0.5} />
        <motion.rect
          x="15"
          y="28"
          width="24"
          height="3"
          rx="1"
          fill={color}
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.rect
          x="15"
          y="35"
          width="42"
          height="3"
          rx="1"
          fill={color}
          opacity={0.6}
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
        <motion.rect
          x="15"
          y="42"
          width="30"
          height="3"
          rx="1"
          fill={color}
          opacity={0.4}
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <motion.rect
          x="15"
          y="49"
          width="16"
          height="5"
          rx="1"
          fill={color}
          opacity={0.9}
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
        />
      </svg>
    );
  }

  if (index === 2) {
    // AI integrations — neural node graph
    const nodes = [
      { x: 14, y: 22 },
      { x: 14, y: 48 },
      { x: 36, y: 14 },
      { x: 36, y: 36 },
      { x: 36, y: 58 },
      { x: 58, y: 22 },
      { x: 58, y: 48 },
    ];
    const edges: [number, number][] = [
      [0, 2],
      [0, 3],
      [1, 3],
      [1, 4],
      [2, 5],
      [3, 5],
      [3, 6],
      [4, 6],
    ];
    return (
      <svg {...common} aria-hidden>
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={color}
            strokeWidth="1"
            opacity={0.5}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="2.6"
            fill={color}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
          />
        ))}
      </svg>
    );
  }

  // 3: Telegram bots — chat arrow + flow
  return (
    <svg {...common} aria-hidden>
      <motion.path
        d="M 14 20 L 48 20 L 56 28 L 48 36 L 30 36 L 22 44 L 22 36 L 14 36 Z"
        stroke={color}
        strokeWidth="1.4"
        fill={`${color}18`}
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      />
      <motion.path
        d="M 22 48 L 22 54 L 42 54 L 50 62"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity={0.6}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
      <motion.circle
        cx="50"
        cy="62"
        r="3"
        fill={color}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1 }}
      />
      <line x1="22" y1="26" x2="40" y2="26" stroke={color} strokeWidth="1" opacity={0.5} />
      <line x1="22" y1="30" x2="32" y2="30" stroke={color} strokeWidth="1" opacity={0.3} />
    </svg>
  );
}
