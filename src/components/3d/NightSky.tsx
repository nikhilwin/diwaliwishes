import React, { useMemo } from 'react';
import * as THREE from 'three';

interface NightSkyProps {
  skyColors?: [string, string];
  moonType?: 'crescent' | 'full';
}

export const NightSky: React.FC<NightSkyProps> = ({
  skyColors = ['#080414', '#1A0B36'],
  moonType = 'crescent',
}) => {
  // Distant twinkling stars
  const starPositions = useMemo(() => {
    const count = 350;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Hemisphere in the distant background
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * (Math.PI / 2.2);
      const r = 24 + Math.random() * 4;

      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) + 2;
      pos[i * 3 + 2] = -r * Math.sin(phi) * Math.sin(theta) - 5;
    }
    return pos;
  }, []);

  return (
    <group>
      {/* Sky Background Sphere with gradient shader/material */}
      <mesh position={[0, 0, -12]}>
        <sphereGeometry args={[30, 32, 32]} />
        <meshBasicMaterial
          color={skyColors[0]}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Twinkling Star Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#FFF8E7"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Auspicious Golden Moon */}
      <group position={[5.5, 9.5, -16]}>
        {/* Moon Disk */}
        <mesh>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshBasicMaterial color="#FFFBEB" />
        </mesh>
        
        {/* Soft Moon Aura */}
        <mesh>
          <sphereGeometry args={[1.8, 24, 24]} />
          <meshBasicMaterial
            color="#FEF08A"
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Crescent shadow mask if crescent */}
        {moonType === 'crescent' && (
          <mesh position={[-0.45, 0.2, 0.4]}>
            <sphereGeometry args={[1.15, 32, 32]} />
            <meshBasicMaterial color={skyColors[0]} />
          </mesh>
        )}

        {/* Moon Ambient Point Light */}
        <pointLight
          color="#FEF3C7"
          intensity={0.6}
          distance={35}
          decay={2}
        />
      </group>

      {/* Distant Royal Palace Silhouette & Festive Fairy Light Dots */}
      <group position={[0, 1.2, -14]}>
        {/* Center Grand Dome */}
        <mesh position={[0, 2.0, 0]}>
          <sphereGeometry args={[1.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshBasicMaterial color="#0B051D" />
        </mesh>
        {/* Spire on Dome */}
        <mesh position={[0, 3.8, 0]}>
          <coneGeometry args={[0.08, 0.8, 8]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>

        {/* Left Minaret & Pavilion */}
        <mesh position={[-4.5, 1.5, 0]}>
          <cylinderGeometry args={[0.35, 0.45, 3.0, 12]} />
          <meshBasicMaterial color="#0A041A" />
        </mesh>
        <mesh position={[-4.5, 3.2, 0]}>
          <sphereGeometry args={[0.5, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshBasicMaterial color="#0A041A" />
        </mesh>

        {/* Right Minaret & Pavilion */}
        <mesh position={[4.5, 1.5, 0]}>
          <cylinderGeometry args={[0.35, 0.45, 3.0, 12]} />
          <meshBasicMaterial color="#0A041A" />
        </mesh>
        <mesh position={[4.5, 3.2, 0]}>
          <sphereGeometry args={[0.5, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshBasicMaterial color="#0A041A" />
        </mesh>

        {/* Tiny fairy lights decorating the palace parapets */}
        {[-4.5, -3.2, -2.0, -0.8, 0, 0.8, 2.0, 3.2, 4.5].map((x, i) => (
          <mesh key={`fairylight-${i}`} position={[x, 3.1 + Math.sin(i) * 0.2, 0.1]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color={i % 2 === 0 ? '#FBBF24' : '#F43F5E'} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
