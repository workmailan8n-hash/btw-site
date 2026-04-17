'use client';

import { motion } from 'motion/react';

/**
 * Hero fallback — mobile default + loading state for desktop r3f scene.
 * Glass card + animated dot-grid + floating lime orbit dots.
 */
export function HeroFallback() {
  return (
    <div
      aria-hidden
      className="relative h-full w-full flex items-center justify-center overflow-hidden"
    >
      {/* Animated dot grid background */}
      <DotGrid />

      {/* Lime + violet radial glow */}
      <div
        className="absolute inset-0 opacity-70 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 65% 45%, rgba(158,255,110,0.16) 0%, rgba(184,166,255,0.08) 30%, transparent 65%)',
        }}
      />

      {/* Orbit dots */}
      <OrbitDot radiusX={150} radiusY={90} speed={18} size={6} phase={0} />
      <OrbitDot radiusX={180} radiusY={120} speed={-26} size={4} phase={Math.PI} color="#B8A6FF" />
      <OrbitDot
        radiusX={220}
        radiusY={80}
        speed={32}
        size={3}
        phase={Math.PI / 2}
        color="#FFB86B"
      />

      {/* Center glass card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="relative z-10 w-[260px] h-[320px] sm:w-[280px] sm:h-[360px] rounded-[6px] flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(232,232,240,0.08), rgba(232,232,240,0.02))',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(245,245,247,0.1)',
          boxShadow: '0 0 80px rgba(158,255,110,0.1), inset 0 0 40px rgba(184,166,255,0.06)',
        }}
      >
        <span
          className="font-[var(--font-display)] text-[56px] sm:text-[64px] tracking-[-0.04em] text-[color:var(--color-fg-primary)]"
          style={{ lineHeight: 1 }}
        >
          BTW
          <span
            className="text-[color:var(--color-accent)]"
            style={{
              textShadow: '0 0 16px rgba(158,255,110,0.8)',
            }}
          >
            .
          </span>
        </span>
      </motion.div>
    </div>
  );
}

function DotGrid() {
  return (
    <div
      className="absolute inset-0 opacity-40"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(245,245,247,0.08) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
      }}
    />
  );
}

function OrbitDot({
  radiusX,
  radiusY,
  speed,
  size,
  phase,
  color = '#9EFF6E',
}: {
  radiusX: number;
  radiusY: number;
  speed: number;
  size: number;
  phase: number;
  color?: string;
}) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 pointer-events-none"
      style={{
        width: `${radiusX * 2}px`,
        height: `${radiusY * 2}px`,
        marginLeft: `-${radiusX}px`,
        marginTop: `-${radiusY}px`,
      }}
      animate={{ rotate: speed > 0 ? 360 : -360 }}
      transition={{
        duration: Math.abs(speed),
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <span
        className="absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: '50%',
          right: 0,
          marginTop: `-${size / 2}px`,
          marginRight: `-${size / 2}px`,
          background: color,
          boxShadow: `0 0 ${size * 3}px ${color}`,
          transform: `rotate(${(phase * 180) / Math.PI}deg)`,
        }}
      />
    </motion.div>
  );
}
