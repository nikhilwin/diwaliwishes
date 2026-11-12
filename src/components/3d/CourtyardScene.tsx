import React from 'react';
import { Rangoli } from './Rangoli';
import { Diya } from './Diya';
import { HangingMarigolds } from './HangingMarigolds';
import { SkyLanterns } from './SkyLanterns';
import { NightSky } from './NightSky';
import { Fireworks } from './Fireworks';
import { AmbientParticles } from './AmbientParticles';
import { SceneSettings, ThemeConfig } from '../../types/greeting';

interface CourtyardSceneProps {
  settings: SceneSettings;
  theme: ThemeConfig;
  onDiyaClick?: (index: number) => void;
  fireworkTrigger?: number;
}

export const CourtyardScene: React.FC<CourtyardSceneProps> = ({
  settings,
  theme,
  onDiyaClick,
  fireworkTrigger,
}) => {
  // Generate Diya layout positions based on settings.diyasCount
  const diyas = React.useMemo(() => {
    const list: { pos: [number, number, number]; scale: number }[] = [];
    const count = settings.diyasCount;

    // 1. Center Diya on top of Rangoli
    list.push({ pos: [0, 0.05, 0], scale: 1.4 });

    // 2. Ring around the Rangoli (radius 1.7m)
    const ringCount = Math.min(count - 1, 8);
    for (let i = 0; i < ringCount; i++) {
      const angle = (i * Math.PI * 2) / ringCount;
      list.push({
        pos: [Math.cos(angle) * 1.65, 0.03, Math.sin(angle) * 1.65],
        scale: 1.0,
      });
    }

    // 3. Additional diyas along the courtyard stone steps / pillars
    const remaining = count - list.length;
    const stepPositions: [number, number, number][] = [
      [-2.4, 0.15, -1.0], [2.4, 0.15, -1.0],
      [-2.8, 0.35, -2.0], [2.8, 0.35, -2.0],
      [-1.8, 0.15, 1.8], [1.8, 0.15, 1.8],
      [-3.2, 0.35, 0.0], [3.2, 0.35, 0.0],
      [-0.8, 0.15, 2.4], [0.8, 0.15, 2.4],
      [-2.0, 0.35, -2.6], [2.0, 0.35, -2.6],
      [0.0, 0.35, -3.2],
    ];

    for (let i = 0; i < remaining; i++) {
      if (stepPositions[i]) {
        list.push({ pos: stepPositions[i], scale: 1.05 });
      }
    }

    return list;
  }, [settings.diyasCount]);

  return (
    <group>
      {/* Night Sky with celestial stars & moon */}
      <NightSky skyColors={theme.skyColors} />

      {/* Floating Sky Lanterns (Akash Kandil) */}
      {settings.showLanterns && <SkyLanterns />}

      {/* Background Fireworks Display */}
      {settings.fireworksFrequency !== 'off' && (
        <Fireworks
          frequency={settings.fireworksFrequency}
          onTrigger={fireworkTrigger}
        />
      )}

      {/* Ambient Rising Golden Particles */}
      {settings.ambientParticles && (
        <AmbientParticles
          count={75}
          color={theme.particleColor}
        />
      )}

      {/* --- COURTYARD ARCHITECTURE --- */}

      {/* Polished Sandstone Courtyard Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#1A1128" // Deep royal sandstone with warm purple undertone
          roughness={0.45}
          metalness={0.25}
        />
      </mesh>

      {/* Floor Decorative Outer Gold Inlay Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[3.2, 3.28, 48]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Rear Verandah Stone Plinth (Raised Step) */}
      <mesh position={[0, 0.25, -3.0]} receiveShadow castShadow>
        <boxGeometry args={[14, 0.5, 3.5]} />
        <meshStandardMaterial
          color="#24153A"
          roughness={0.6}
          metalness={0.15}
        />
      </mesh>

      {/* Flanking Side Steps */}
      <mesh position={[-4.5, 0.2, 0]} receiveShadow castShadow>
        <boxGeometry args={[3.0, 0.4, 10]} />
        <meshStandardMaterial color="#24153A" roughness={0.6} metalness={0.15} />
      </mesh>
      <mesh position={[4.5, 0.2, 0]} receiveShadow castShadow>
        <boxGeometry args={[3.0, 0.4, 10]} />
        <meshStandardMaterial color="#24153A" roughness={0.6} metalness={0.15} />
      </mesh>

      {/* Traditional Carved Pillars (Left & Right) */}
      {[
        [-2.8, -1.2],
        [2.8, -1.2],
        [-3.6, -3.2],
        [3.6, -3.2],
      ].map(([x, z], idx) => (
        <group key={`pillar-${idx}`} position={[x, 0, z]}>
          {/* Pillar Base Plinth */}
          <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.5, 0.7]} />
            <meshStandardMaterial color="#4A2574" roughness={0.5} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.3, 0.36, 0.15, 16]} />
            <meshStandardMaterial color="#FFD700" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Pillar Fluted Column Shaft */}
          <mesh position={[0, 2.3, 0]} castShadow>
            <cylinderGeometry args={[0.26, 0.28, 3.4, 16]} />
            <meshStandardMaterial color="#2E164D" roughness={0.5} metalness={0.2} />
          </mesh>

          {/* Pillar Capital (Carved Bracket Crown) */}
          <mesh position={[0, 4.05, 0]}>
            <boxGeometry args={[0.8, 0.25, 0.8]} />
            <meshStandardMaterial color="#4A2574" roughness={0.5} metalness={0.2} />
          </mesh>
          <mesh position={[0, 4.25, 0]}>
            <boxGeometry args={[0.95, 0.15, 0.95]} />
            <meshStandardMaterial color="#FFD700" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Carved Indian Arch Beam (Torana connecting front pillars) */}
      <group position={[0, 4.2, -1.2]}>
        {/* Horizontal Beam */}
        <mesh castShadow>
          <boxGeometry args={[6.4, 0.35, 0.5]} />
          <meshStandardMaterial color="#361759" roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Decorative Scalloped Arch Crest */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[1.5, 1.8, 0.25, 16, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#4A2574" roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Golden Arch Finial Crest */}
        <mesh position={[0, 0.9, 0]}>
          <coneGeometry args={[0.15, 0.45, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Decorative Jali (Lattice) Screen Behind Courtyard */}
      <mesh position={[0, 2.0, -4.7]} receiveShadow>
        <planeGeometry args={[10, 3.5]} />
        <meshStandardMaterial
          color="#1F0E38"
          roughness={0.7}
          metalness={0.1}
          wireframe={false}
        />
      </mesh>

      {/* Hanging Marigold Garlands (Genda Phool Mala) */}
      {settings.showMarigolds && (
        <group>
          {/* Main front archway swag garland */}
          <HangingMarigolds
            startPos={[-2.8, 4.0, -1.2]}
            endPos={[2.8, 4.0, -1.2]}
            flowerCount={24}
            sag={0.75}
            swaySpeed={1.0}
          />
          {/* Left side pillar drape */}
          <HangingMarigolds
            startPos={[-2.8, 3.8, -1.2]}
            endPos={[-3.6, 3.8, -3.2]}
            flowerCount={16}
            sag={0.45}
            swaySpeed={1.2}
          />
          {/* Right side pillar drape */}
          <HangingMarigolds
            startPos={[2.8, 3.8, -1.2]}
            endPos={[3.6, 3.8, -3.2]}
            flowerCount={16}
            sag={0.45}
            swaySpeed={1.2}
          />
        </group>
      )}

      {/* Brass Urli (Traditional water bowl with floating candles & petals) */}
      <group position={[0, 0.22, 2.6]}>
        {/* Urli Bowl */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.55, 0.35, 0.22, 24]} />
          <meshStandardMaterial color="#D97706" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Urli Golden Lip */}
        <mesh position={[0, 0.11, 0]}>
          <torusGeometry args={[0.55, 0.03, 12, 28]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Water Surface */}
        <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.52, 24]} />
          <meshStandardMaterial
            color="#0284C7"
            roughness={0.1}
            metalness={0.4}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Floating Rose & Marigold Petals */}
        {[
          { pos: [-0.18, 0.09, 0.12], col: '#E11D48' },
          { pos: [0.22, 0.09, -0.15], col: '#F59E0B' },
          { pos: [-0.15, 0.09, -0.2], col: '#F43F5E' },
          { pos: [0.12, 0.09, 0.22], col: '#E11D48' },
        ].map((petal, pIdx) => (
          <mesh key={`urli-petal-${pIdx}`} position={petal.pos as [number, number, number]}>
            <circleGeometry args={[0.06, 10]} />
            <meshStandardMaterial color={petal.col} roughness={0.6} />
          </mesh>
        ))}
        {/* Center Floating Candle Diya */}
        <Diya
          position={[0, 0.08, 0]}
          scale={0.7}
          intensity={settings.flameIntensity}
          color={settings.lightingColor}
          interactive={false}
        />
      </group>

      {/* Center Sacred Rangoli */}
      {settings.showRangoli && (
        <Rangoli position={[0, 0.015, 0]} scale={1.1} />
      )}

      {/* The Glow of the Diyas */}
      {diyas.map((d, index) => (
        <Diya
          key={`diya-${index}`}
          position={d.pos}
          scale={d.scale}
          isLit={true}
          intensity={settings.flameIntensity}
          color={settings.lightingColor}
          onLightToggle={() => onDiyaClick && onDiyaClick(index)}
        />
      ))}

      {/* Warm Ambient Scene Lighting */}
      <ambientLight color={theme.ambientLight} intensity={0.8} />
      
      {/* Warm Courtyard Lantern Spotlight from above */}
      <spotLight
        position={[0, 8, 2]}
        angle={0.6}
        penumbra={0.8}
        intensity={1.2}
        color={settings.lightingColor}
        castShadow
      />
    </group>
  );
};
