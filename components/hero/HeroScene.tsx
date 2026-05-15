'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  Sparkles,
  MeshDistortMaterial,
  PerspectiveCamera,
} from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Iridescent Blob hero — tweaked for max wow:
 * brighter base, stronger iridescence + distortion, faster rotation,
 * more sparkles, second orbiting accent dot.
 */

function Blob() {
  const mesh = useRef<THREE.Mesh>(null!);
  const material = useRef<any>(null!);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((state, dt) => {
    const m = mesh.current;
    if (!m) return;
    m.rotation.y += dt * 0.25;
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, pointer.current.y * 0.4, 0.05);
    m.rotation.z = THREE.MathUtils.lerp(m.rotation.z, pointer.current.x * 0.4, 0.05);
    if (material.current) {
      const d = Math.hypot(pointer.current.x, pointer.current.y);
      material.current.distort = THREE.MathUtils.lerp(
        material.current.distort ?? 0.5,
        0.5 + d * 0.25,
        0.08
      );
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.4, 48]} />
        <MeshDistortMaterial
          ref={material}
          color="#2A2A38"
          roughness={0.1}
          metalness={0.5}
          iridescence={1.0}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 900]}
          clearcoat={1}
          clearcoatRoughness={0.06}
          distort={0.55}
          speed={2.8}
          envMapIntensity={1.6}
        />
      </mesh>
    </Float>
  );
}

function OrbitingDot({
  radiusX,
  radiusY,
  radiusZ,
  speedA,
  speedB,
  phase,
  size = 0.08,
  color = '#9EFF6E',
  intensity = 3,
}: {
  radiusX: number;
  radiusY: number;
  radiusZ: number;
  speedA: number;
  speedB: number;
  phase: number;
  size?: number;
  color?: string;
  intensity?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime + phase;
    mesh.current.position.x = Math.cos(t * speedA) * radiusX;
    mesh.current.position.y = Math.sin(t * speedB) * radiusY;
    mesh.current.position.z = Math.sin(t * speedA * 0.6) * radiusZ;
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[size, 24, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={intensity}
        toneMapped={false}
      />
    </mesh>
  );
}

export function HeroScene() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={visible ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      {/* Camera offset to the left → scene renders right-of-center on canvas */}
      <PerspectiveCamera makeDefault fov={36} position={[-1.6, 0, 5.4]} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <pointLight position={[-3, 2, 2]} intensity={1.8} color="#B8A6FF" />
        <pointLight position={[3, -2, -2]} intensity={1.5} color="#9EFF6E" />
        <pointLight position={[0, 0, 3]} intensity={0.6} color="#FFB86B" />

        <Blob />

        {/* Lime accent dot — fast orbit */}
        <OrbitingDot
          radiusX={2.4}
          radiusY={1.2}
          radiusZ={0.9}
          speedA={0.5}
          speedB={0.7}
          phase={0}
          color="#9EFF6E"
          intensity={3.5}
        />
        {/* Violet accent dot — slower, different rhythm */}
        <OrbitingDot
          radiusX={2.0}
          radiusY={1.5}
          radiusZ={1.1}
          speedA={-0.35}
          speedB={0.55}
          phase={Math.PI}
          size={0.06}
          color="#B8A6FF"
          intensity={2.5}
        />
        {/* Warm accent dot — rare moment of warmth */}
        <OrbitingDot
          radiusX={2.6}
          radiusY={0.8}
          radiusZ={0.6}
          speedA={0.28}
          speedB={-0.42}
          phase={Math.PI / 2}
          size={0.05}
          color="#FFB86B"
          intensity={2.2}
        />

        <Sparkles
          count={150}
          scale={[7, 5, 5]}
          size={3}
          speed={0.35}
          color="#9EFF6E"
          opacity={0.7}
        />
        <Sparkles
          count={100}
          scale={[9, 6, 6]}
          size={1.8}
          speed={0.22}
          color="#B8A6FF"
          opacity={0.5}
        />
        <Sparkles
          count={60}
          scale={[10, 7, 7]}
          size={1.2}
          speed={0.15}
          color="#F5F5F7"
          opacity={0.35}
        />

        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
