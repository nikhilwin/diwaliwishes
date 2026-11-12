import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AmbientParticlesProps {
  count?: number;
  color?: string;
}

export const AmbientParticles: React.FC<AmbientParticlesProps> = ({
  count = 90,
  color = '#FFD700',
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, randomFactors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const factors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spread across courtyard
      pos[i * 3 + 0] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = Math.random() * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;

      factors[i * 3 + 0] = Math.random() * 2 * Math.PI; // Phase X
      factors[i * 3 + 1] = 0.2 + Math.random() * 0.4; // Rise speed
      factors[i * 3 + 2] = Math.random() * 2 * Math.PI; // Phase Z
    }

    return { positions: pos, randomFactors: factors };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const phaseX = randomFactors[idx + 0];
      const riseSpeed = randomFactors[idx + 1];
      const phaseZ = randomFactors[idx + 2];

      // Gentle floating upward
      array[idx + 1] += riseSpeed * 0.012;
      // Swaying drift
      array[idx + 0] += Math.sin(time * 0.8 + phaseX) * 0.005;
      array[idx + 2] += Math.cos(time * 0.6 + phaseZ) * 0.005;

      // Wrap around vertically
      if (array[idx + 1] > 7) {
        array[idx + 1] = 0.1;
        array[idx + 0] = (Math.random() - 0.5) * 12;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        color={color}
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
