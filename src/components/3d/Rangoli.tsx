import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RangoliProps {
  position?: [number, number, number];
  scale?: number;
}

export const Rangoli: React.FC<RangoliProps> = ({
  position = [0, 0.015, 0],
  scale = 1,
}) => {
  const outerRingRef = useRef<THREE.Group>(null);
  const innerStarRef = useRef<THREE.Group>(null);

  // Subtle breathing rotation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.04;
    }
    if (innerStarRef.current) {
      innerStarRef.current.rotation.z = -t * 0.06;
    }
  });

  // Generate 8 lotus petals
  const petals = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * Math.PI * 2) / 8;
    const x = Math.cos(angle) * 1.05 * scale;
    const y = Math.sin(angle) * 1.05 * scale;
    return { angle, x, y, id: i };
  });

  // Generate 16 outer flower buds / dots
  const outerDots = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i * Math.PI * 2) / 16;
    const x = Math.cos(angle) * 1.8 * scale;
    const y = Math.sin(angle) * 1.8 * scale;
    return { angle, x, y, id: i };
  });

  return (
    <group position={position} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Base Disc / Glow */}
      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[2.0 * scale, 36]} />
        <meshBasicMaterial
          color="#3B0764" // Deep festive plum velvet
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Outermost Golden Ring */}
      <mesh position={[0, 0, 0.002]}>
        <ringGeometry args={[1.92 * scale, 1.98 * scale, 48]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>

      {/* Saffron Red Decorative Border */}
      <mesh position={[0, 0, 0.003]}>
        <ringGeometry args={[1.65 * scale, 1.90 * scale, 48]} />
        <meshBasicMaterial color="#DC2626" />
      </mesh>

      {/* Outer dots & small petal flourishes */}
      {outerDots.map(dot => (
        <mesh key={`dot-${dot.id}`} position={[dot.x, dot.y, 0.005]}>
          <circleGeometry args={[0.07 * scale, 16]} />
          <meshBasicMaterial color="#FBBF24" />
        </mesh>
      ))}

      {/* Outer rotating lotus petal ring */}
      <group ref={outerRingRef} position={[0, 0, 0.004]}>
        {petals.map(petal => (
          <mesh
            key={`petal-${petal.id}`}
            position={[petal.x, petal.y, 0]}
            rotation={[0, 0, petal.angle + Math.PI / 2]}
          >
            {/* Lotus petal shape using scaled cone / ring */}
            <circleGeometry args={[0.32 * scale, 20]} />
            <meshBasicMaterial color="#EA580C" />
          </mesh>
        ))}
      </group>

      {/* Vibrant Cyan / Emerald Center Ring */}
      <mesh position={[0, 0, 0.006]}>
        <ringGeometry args={[0.72 * scale, 0.78 * scale, 32]} />
        <meshBasicMaterial color="#06B6D4" />
      </mesh>

      {/* Inner Rotating Sacred Star */}
      <group ref={innerStarRef} position={[0, 0, 0.007]}>
        {/* Star Polygon Layer 1 */}
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[0.35 * scale, 0.65 * scale, 8]} />
          <meshBasicMaterial color="#F59E0B" />
        </mesh>
        {/* Star Polygon Layer 2 (Rotated 45 deg) */}
        <mesh position={[0, 0, 0.001]} rotation={[0, 0, Math.PI / 8]}>
          <ringGeometry args={[0.35 * scale, 0.65 * scale, 8]} />
          <meshBasicMaterial color="#E11D48" />
        </mesh>
      </group>

      {/* Central Golden Core Pedestal */}
      <mesh position={[0, 0, 0.009]}>
        <circleGeometry args={[0.35 * scale, 32]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>

      <mesh position={[0, 0, 0.01]}>
        <circleGeometry args={[0.18 * scale, 24]} />
        <meshBasicMaterial color="#DC2626" />
      </mesh>
    </group>
  );
};
