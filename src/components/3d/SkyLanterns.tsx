import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LanternItem {
  id: number;
  basePos: [number, number, number];
  color: string;
  size: number;
  speed: number;
  offset: number;
}

const LANTERNS: LanternItem[] = [
  { id: 1, basePos: [-3.5, 3.8, -2], color: '#EF4444', size: 0.38, speed: 1.1, offset: 0 },
  { id: 2, basePos: [3.5, 4.2, -2.5], color: '#F59E0B', size: 0.42, speed: 0.9, offset: 1.5 },
  { id: 3, basePos: [-2.0, 5.2, -5.0], color: '#8B5CF6', size: 0.32, speed: 0.8, offset: 2.8 },
  { id: 4, basePos: [2.2, 5.6, -4.5], color: '#EC4899', size: 0.35, speed: 1.0, offset: 3.9 },
  { id: 5, basePos: [0.0, 6.5, -6.5], color: '#FBBF24', size: 0.45, speed: 0.7, offset: 5.1 },
  { id: 6, basePos: [-4.8, 6.0, -7.0], color: '#10B981', size: 0.30, speed: 0.85, offset: 1.2 },
  { id: 7, basePos: [4.6, 6.2, -6.0], color: '#F97316', size: 0.34, speed: 0.95, offset: 4.4 },
];

export const SkyLanterns: React.FC = () => {
  const groupsRef = useRef<(THREE.Group | null)[]>([]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    LANTERNS.forEach((lantern, index) => {
      const g = groupsRef.current[index];
      if (!g) return;

      const t = time * lantern.speed + lantern.offset;
      // Gentle floating hover & sway
      g.position.y = lantern.basePos[1] + Math.sin(t) * 0.22;
      g.position.x = lantern.basePos[0] + Math.cos(t * 0.7) * 0.12;
      g.rotation.z = Math.sin(t * 0.6) * 0.08;
      g.rotation.y = t * 0.15;
    });
  });

  return (
    <group>
      {LANTERNS.map((l, index) => (
        <group
          key={`lantern-${l.id}`}
          ref={el => { groupsRef.current[index] = el; }}
          position={l.basePos}
        >
          {/* Main Diamond / Star Lantern Body (Akash Kandil) */}
          <mesh castShadow>
            <octahedronGeometry args={[l.size, 0]} />
            <meshStandardMaterial
              color={l.color}
              emissive={l.color}
              emissiveIntensity={0.65}
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>

          {/* Golden Framework Edges */}
          <mesh>
            <octahedronGeometry args={[l.size * 1.02, 0]} />
            <meshBasicMaterial
              color="#FFD700"
              wireframe
            />
          </mesh>

          {/* Inner Golden Bulb Glow */}
          <pointLight
            color={l.color}
            intensity={1.5}
            distance={4.0}
            decay={2}
          />

          {/* Hanging Festive Frills / Streamers */}
          {[-0.08, -0.03, 0.03, 0.08].map((xOffset, frillIdx) => (
            <mesh
              key={`frill-${frillIdx}`}
              position={[xOffset * l.size, -l.size * 1.3, 0]}
            >
              <cylinderGeometry args={[0.012, 0.018, l.size * 0.8, 6]} />
              <meshStandardMaterial
                color="#FFD700"
                metalness={0.6}
                roughness={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};
