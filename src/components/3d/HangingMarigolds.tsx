import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HangingMarigoldsProps {
  startPos: [number, number, number];
  endPos: [number, number, number];
  flowerCount?: number;
  sag?: number; // How much it sags in the center
  swaySpeed?: number;
}

export const HangingMarigolds: React.FC<HangingMarigoldsProps> = ({
  startPos,
  endPos,
  flowerCount = 18,
  sag = 0.5,
  swaySpeed = 1.0,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Gentle swaying in the festive evening breeze
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * swaySpeed;
    groupRef.current.rotation.z = Math.sin(t) * 0.02;
    groupRef.current.rotation.x = Math.cos(t * 0.8) * 0.03;
  });

  // Calculate points along catenary curve
  const flowers = Array.from({ length: flowerCount }).map((_, i) => {
    const fraction = (i + 0.5) / flowerCount;
    // Linear interpolation for X and Z
    const x = startPos[0] + (endPos[0] - startPos[0]) * fraction;
    const z = startPos[2] + (endPos[2] - startPos[2]) * fraction;
    
    // Parabolic sag for Y
    const baseY = startPos[1] + (endPos[1] - startPos[1]) * fraction;
    const sagAmount = Math.sin(fraction * Math.PI) * sag;
    const y = baseY - sagAmount;

    // Alternate between deep orange and golden yellow marigolds
    const isYellow = i % 2 === 0;
    const color = isYellow ? '#FBBF24' : '#EA580C';

    return {
      id: i,
      pos: [x, y, z] as [number, number, number],
      color,
      size: 0.09 + (i % 3) * 0.015,
    };
  });

  return (
    <group ref={groupRef}>
      {/* String connecting the flowers */}
      {flowers.map(f => (
        <group key={`flower-${f.id}`} position={f.pos}>
          {/* Marigold puffy blossom */}
          <mesh castShadow>
            <dodecahedronGeometry args={[f.size, 1]} />
            <meshStandardMaterial
              color={f.color}
              roughness={0.8}
              metalness={0.05}
            />
          </mesh>

          {/* Calyx green stem accent */}
          <mesh position={[0, f.size * 0.8, 0]}>
            <cylinderGeometry args={[0.015, 0.01, 0.04, 6]} />
            <meshStandardMaterial color="#15803D" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Hanging Brass Bell at the lowest center point */}
      {flowers.length > 0 && (
        <group position={flowers[Math.floor(flowers.length / 2)].pos}>
          <mesh position={[0, -0.15, 0]}>
            <coneGeometry args={[0.045, 0.09, 12]} />
            <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.21, 0]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      )}
    </group>
  );
};
