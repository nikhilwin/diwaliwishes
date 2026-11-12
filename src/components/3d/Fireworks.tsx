import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FireworksFrequency } from '../../types/greeting';
import { audioService } from '../../services/audioService';

interface FireworksProps {
  frequency?: FireworksFrequency;
  onTrigger?: number; // timestamp trigger from outside
}

interface FireworkBurst {
  active: boolean;
  startTime: number;
  origin: [number, number, number];
  color: THREE.Color;
  velocities: Float32Array;
  positions: Float32Array;
  lifetimes: Float32Array;
  maxLife: number;
}

const PARTICLES_PER_BURST = 80;
const MAX_BURSTS = 6;

const PALETTES = [
  '#FFD700', // Gold glitter
  '#FF3366', // Ruby crimson
  '#00F5D4', // Turquoise cyan
  '#7B2CBF', // Royal purple
  '#FF9F1C', // Amber fire
  '#38EF7D', // Emerald sparkle
];

export const Fireworks: React.FC<FireworksProps> = ({
  frequency = 'medium',
  onTrigger = 0,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const flashLightRef = useRef<THREE.PointLight>(null);
  const lastSpawnTime = useRef(0);
  const triggerCountRef = useRef(onTrigger);

  // Initialize pool of bursts
  const bursts = useMemo<FireworkBurst[]>(() => {
    return Array.from({ length: MAX_BURSTS }).map(() => ({
      active: false,
      startTime: 0,
      origin: [0, 0, 0],
      color: new THREE.Color(),
      velocities: new Float32Array(PARTICLES_PER_BURST * 3),
      positions: new Float32Array(PARTICLES_PER_BURST * 3),
      lifetimes: new Float32Array(PARTICLES_PER_BURST),
      maxLife: 2.2,
    }));
  }, []);

  // Global position and color arrays for Three.js geometry
  const totalParticles = MAX_BURSTS * PARTICLES_PER_BURST;
  const positions = useMemo(() => new Float32Array(totalParticles * 3), [totalParticles]);
  const colors = useMemo(() => new Float32Array(totalParticles * 3), [totalParticles]);

  const spawnBurst = (x?: number, y?: number, z?: number) => {
    const burst = bursts.find(b => !b.active);
    if (!burst) return;

    burst.active = true;
    burst.startTime = performance.now() / 1000;
    burst.origin = [
      x ?? (Math.random() - 0.5) * 14,
      y ?? 5.5 + Math.random() * 4.5,
      z ?? -6 - Math.random() * 6,
    ];
    burst.color = new THREE.Color(PALETTES[Math.floor(Math.random() * PALETTES.length)]);
    burst.maxLife = 1.8 + Math.random() * 0.6;

    // Distribute particle velocities in a sphere with varying speed
    for (let i = 0; i < PARTICLES_PER_BURST; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const speed = 2.0 + Math.random() * 3.5;

      const vx = Math.sin(phi) * Math.cos(theta) * speed;
      const vy = Math.sin(phi) * Math.sin(theta) * speed;
      const vz = Math.cos(phi) * speed;

      burst.velocities[i * 3 + 0] = vx;
      burst.velocities[i * 3 + 1] = vy;
      burst.velocities[i * 3 + 2] = vz;

      burst.positions[i * 3 + 0] = burst.origin[0];
      burst.positions[i * 3 + 1] = burst.origin[1];
      burst.positions[i * 3 + 2] = burst.origin[2];

      burst.lifetimes[i] = 0;
    }

    // Trigger sound & flash
    audioService.playFireworkSFX();
    if (flashLightRef.current) {
      flashLightRef.current.position.set(...burst.origin);
      flashLightRef.current.intensity = 5.0;
      flashLightRef.current.color = burst.color;
    }
  };

  // External trigger effect
  useEffect(() => {
    if (onTrigger > 0 && onTrigger !== triggerCountRef.current) {
      triggerCountRef.current = onTrigger;
      spawnBurst(0, 7.5, -7);
    }
  }, [onTrigger]);

  useFrame(({ clock }) => {
    if (frequency === 'off') return;
    const now = clock.getElapsedTime();

    // Fade flash light quickly
    if (flashLightRef.current && flashLightRef.current.intensity > 0.05) {
      flashLightRef.current.intensity *= 0.88;
    }

    // Interval spawning based on frequency
    let spawnInterval = 3.5;
    if (frequency === 'high') spawnInterval = 1.4;
    else if (frequency === 'low') spawnInterval = 6.0;

    if (now - lastSpawnTime.current > spawnInterval) {
      lastSpawnTime.current = now;
      spawnBurst();
    }

    // Update particles for all active bursts
    bursts.forEach((burst, bIdx) => {
      const baseIdx = bIdx * PARTICLES_PER_BURST * 3;
      if (!burst.active) {
        // Hide inactive particles far away
        for (let i = 0; i < PARTICLES_PER_BURST * 3; i++) {
          positions[baseIdx + i] = 9999;
        }
        return;
      }

      const elapsed = (performance.now() / 1000) - burst.startTime;
      if (elapsed > burst.maxLife) {
        burst.active = false;
        return;
      }

      const progress = elapsed / burst.maxLife;
      const alpha = Math.max(0, 1 - progress);

      for (let i = 0; i < PARTICLES_PER_BURST; i++) {
        const pIdx = baseIdx + i * 3;

        // Apply drag and gravity
        const drag = 0.96;
        burst.velocities[i * 3 + 1] -= 0.04; // gravity
        burst.velocities[i * 3 + 0] *= drag;
        burst.velocities[i * 3 + 1] *= drag;
        burst.velocities[i * 3 + 2] *= drag;

        burst.positions[i * 3 + 0] += burst.velocities[i * 3 + 0] * 0.035;
        burst.positions[i * 3 + 1] += burst.velocities[i * 3 + 1] * 0.035;
        burst.positions[i * 3 + 2] += burst.velocities[i * 3 + 2] * 0.035;

        positions[pIdx + 0] = burst.positions[i * 3 + 0];
        positions[pIdx + 1] = burst.positions[i * 3 + 1];
        positions[pIdx + 2] = burst.positions[i * 3 + 2];

        // Color sparkle
        const flicker = 0.8 + Math.random() * 0.4;
        colors[pIdx + 0] = burst.color.r * alpha * flicker;
        colors[pIdx + 1] = burst.color.g * alpha * flicker;
        colors[pIdx + 2] = burst.color.b * alpha * flicker;
      }
    });

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group>
      <pointLight
        ref={flashLightRef}
        intensity={0}
        distance={25}
        decay={2}
      />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          vertexColors
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};
