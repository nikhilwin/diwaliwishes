import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CourtyardScene } from './CourtyardScene';
import { SceneSettings, ThemeConfig } from '../../types/greeting';
import { THEMES } from '../../data/themes';

interface DiwaliCanvasProps {
  settings: SceneSettings;
  themeId?: string;
  cinematicPhase?: number; // 0 = start, 1 = desc, 2 = zoom in, 3 = steady
  isInteractive?: boolean;
  fireworkTrigger?: number;
  className?: string;
}

// Camera Animator for Cinematic Reveals
const CinematicCameraController: React.FC<{
  phase: number;
  mode: SceneSettings['cameraMovement'];
  isInteractive: boolean;
}> = ({ phase, mode, isInteractive }) => {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 5.5, 9.0));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 0));

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Define target camera positions depending on cinematic sequence phase
    let targetPos = new THREE.Vector3(0, 2.2, 5.8);
    let targetLook = new THREE.Vector3(0, 0.8, 0);

    if (phase === 0) {
      // Phase 0: High looking at the moon and upper archway
      targetPos.set(0, 5.5, 8.5);
      targetLook.set(0, 3.0, -2);
    } else if (phase === 1) {
      // Phase 1: Descending and revealing the glowing courtyard
      targetPos.set(0, 3.2, 6.8);
      targetLook.set(0, 1.2, -0.5);
    } else if (phase === 2) {
      // Phase 2: Gliding forward closer to the central Rangoli and Diyas
      targetPos.set(0, 1.8, 4.4);
      targetLook.set(0, 0.4, 0);
    } else {
      // Phase 3+: Full celebration view with gentle breathing/sway
      if (mode === 'orbit' && !isInteractive) {
        targetPos.set(Math.sin(t * 0.15) * 5.2, 2.0 + Math.cos(t * 0.2) * 0.3, Math.cos(t * 0.15) * 5.2);
        targetLook.set(0, 0.5, 0);
      } else if (mode === 'cinematicSweep' && !isInteractive) {
        targetPos.set(Math.sin(t * 0.2) * 2.5, 2.0, 5.0 + Math.cos(t * 0.2) * 0.8);
        targetLook.set(0, 0.6, 0);
      } else {
        // Subtle breathing
        targetPos.set(Math.sin(t * 0.3) * 0.4, 2.1 + Math.sin(t * 0.4) * 0.15, 5.2);
        targetLook.set(0, 0.6, 0);
      }
    }

    if (!isInteractive || phase < 3) {
      // Smooth lerp to target
      currentPos.current.lerp(targetPos, 0.04);
      currentLookAt.current.lerp(targetLook, 0.04);
      camera.position.copy(currentPos.current);
      camera.lookAt(currentLookAt.current);
    }
  });

  return null;
};

// Loading fallback spinner in 3D
const SceneLoader = () => (
  <mesh position={[0, 1.5, 0]}>
    <sphereGeometry args={[0.3, 16, 16]} />
    <meshBasicMaterial color="#FFD700" wireframe />
  </mesh>
);

export const DiwaliCanvas: React.FC<DiwaliCanvasProps> = ({
  settings,
  themeId = 'midnight-palace',
  cinematicPhase = 3,
  isInteractive = true,
  fireworkTrigger = 0,
  className = 'w-full h-full',
}) => {
  const theme: ThemeConfig = THEMES.find(t => t.id === themeId) || THEMES[0];

  return (
    <div className={`relative overflow-hidden select-none ${className}`}>
      <Canvas
        camera={{ position: [0, 2.5, 5.8], fov: 48, near: 0.1, far: 60 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        shadows
      >
        <Suspense fallback={<SceneLoader />}>
          <CinematicCameraController
            phase={cinematicPhase}
            mode={settings.cameraMovement}
            isInteractive={isInteractive}
          />

          <CourtyardScene
            settings={settings}
            theme={theme}
            fireworkTrigger={fireworkTrigger}
          />

          {isInteractive && cinematicPhase >= 3 && (
            <OrbitControls
              enablePan={false}
              minDistance={3.0}
              maxDistance={8.5}
              maxPolarAngle={Math.PI / 2.05} // don't go below floor
              minPolarAngle={Math.PI / 4}
              rotateSpeed={0.6}
              dampingFactor={0.05}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};
