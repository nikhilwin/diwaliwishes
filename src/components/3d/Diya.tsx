import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { audioService } from '../../services/audioService';

interface DiyaProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  isLit?: boolean;
  intensity?: number;
  color?: string;
  onLightToggle?: (lit: boolean) => void;
  interactive?: boolean;
}

export const Diya: React.FC<DiyaProps> = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  isLit = true,
  intensity = 1.2,
  color = '#FFA000',
  onLightToggle,
  interactive = true,
}) => {
  const [lit, setLit] = useState(isLit);
  const flameRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const sparkRef = useRef<THREE.Points>(null);

  // Synchronize external isLit prop changes
  React.useEffect(() => {
    setLit(isLit);
  }, [isLit]);

  // Flame flicker animation in useFrame
  useFrame(({ clock }) => {
    if (!lit || !flameRef.current) return;
    const t = clock.getElapsedTime() * 7 + position[0] * 3;
    const wobbleX = Math.sin(t) * 0.08 + Math.cos(t * 1.7) * 0.04;
    const wobbleZ = Math.cos(t * 1.3) * 0.08 + Math.sin(t * 2.1) * 0.04;
    const flickerScale = 1 + Math.sin(t * 2.3) * 0.12 + Math.cos(t * 4.1) * 0.06;

    flameRef.current.scale.set(
      scale * flickerScale * (1 + wobbleX * 0.5),
      scale * flickerScale * 1.1,
      scale * flickerScale * (1 + wobbleZ * 0.5)
    );
    flameRef.current.rotation.x = wobbleX * 0.6;
    flameRef.current.rotation.z = wobbleZ * 0.6;

    if (lightRef.current) {
      lightRef.current.intensity = (2.2 + Math.sin(t * 3.5) * 0.6) * intensity;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    if (!interactive) return;
    e.stopPropagation();
    const newLit = !lit;
    setLit(newLit);
    if (newLit) {
      audioService.playDiyaLightSFX();
    }
    if (onLightToggle) {
      onLightToggle(newLit);
    }
  };

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={() => {
        if (interactive) document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        if (interactive) document.body.style.cursor = 'auto';
      }}
    >
      {/* Diya Clay Base (Mitti Ka Diya) */}
      {/* Outer bowl */}
      <mesh position={[0, 0.08 * scale, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.28 * scale, 0.14 * scale, 0.14 * scale, 24]} />
        <meshStandardMaterial
          color="#92400E" // Terracotta burnt orange-brown
          roughness={0.75}
          metalness={0.15}
        />
      </mesh>

      {/* Golden rim ornamentation */}
      <mesh position={[0, 0.15 * scale, 0]}>
        <torusGeometry args={[0.28 * scale, 0.025 * scale, 12, 28]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* Diya Spout (Beak where cotton wick rests) */}
      <mesh position={[0.26 * scale, 0.14 * scale, 0]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.07 * scale, 0.16 * scale, 12]} />
        <meshStandardMaterial color="#78350F" roughness={0.7} />
      </mesh>

      {/* Oil Pool (Mustard / Ghee liquid in diya) */}
      <mesh position={[0, 0.12 * scale, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.23 * scale, 24]} />
        <meshStandardMaterial
          color="#F59E0B"
          metalness={0.3}
          roughness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Cotton Wick (Batti) */}
      <mesh position={[0.20 * scale, 0.17 * scale, 0]} rotation={[0, 0, -0.45]}>
        <cylinderGeometry args={[0.02 * scale, 0.025 * scale, 0.12 * scale, 8]} />
        <meshStandardMaterial color={lit ? '#1C1917' : '#E7E5E4'} roughness={0.9} />
      </mesh>

      {/* Flickering Flame & Halo (if lit) */}
      {lit && (
        <group ref={flameRef} position={[0.25 * scale, 0.25 * scale, 0]}>
          {/* Outer Orange Flame */}
          <mesh position={[0, 0.08 * scale, 0]}>
            <coneGeometry args={[0.085 * scale, 0.28 * scale, 16]} />
            <meshBasicMaterial
              color="#FF5722"
              transparent
              opacity={0.85}
            />
          </mesh>

          {/* Inner Golden Body */}
          <mesh position={[0, 0.06 * scale, 0]}>
            <coneGeometry args={[0.055 * scale, 0.20 * scale, 16]} />
            <meshBasicMaterial
              color="#FFC107"
              transparent
              opacity={0.95}
            />
          </mesh>

          {/* Core White-Hot Spark */}
          <mesh position={[0, 0.03 * scale, 0]}>
            <sphereGeometry args={[0.03 * scale, 12, 12]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>

          {/* Golden Radiant Point Light */}
          <pointLight
            ref={lightRef}
            color={color}
            intensity={2.4 * intensity}
            distance={4.5 * scale}
            decay={2}
          />
        </group>
      )}
    </group>
  );
};
