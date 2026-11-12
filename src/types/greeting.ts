export type GreetingStyle = 
  | 'cinematic' 
  | 'diyaRitual' 
  | 'fireworks' 
  | 'lanternRelease' 
  | 'royalDarbar';

export type MusicTrack = 
  | 'fluteSitar' 
  | 'templeChimes' 
  | 'festiveDhol' 
  | 'calmAmbient' 
  | 'none';

export type FireworksFrequency = 'low' | 'medium' | 'high' | 'off';

export interface SceneSettings {
  diyasCount: number; // e.g. 5, 9, 13, 21
  showRangoli: boolean;
  showLanterns: boolean;
  showMarigolds: boolean;
  fireworksFrequency: FireworksFrequency;
  flameIntensity: number; // 0.5 to 2.0
  lightingColor: string; // hex color for mood lighting
  skyTheme: 'midnight' | 'deepPurple' | 'goldenTemple' | 'crimsonNight';
  ambientParticles: boolean;
  cameraMovement: 'glide' | 'cinematicSweep' | 'orbit' | 'subtle';
  fontSize: 'medium' | 'large' | 'royal';
  fontFamily: 'heading' | 'handwriting' | 'body';
}

export interface GreetingData {
  id: string;
  senderName: string;
  recipientName: string;
  message: string;
  themeId: string;
  greetingStyle: GreetingStyle;
  musicTrack: MusicTrack;
  sceneSettings: SceneSettings;
  createdAt: number;
  templateId?: string;
  likesCount?: number;
}

export interface FestiveTemplate {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: 'traditional' | 'romantic' | 'family' | 'friends' | 'celebration';
  previewImage?: string;
  badge?: string;
  data: Omit<GreetingData, 'id' | 'createdAt'>;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  ambientLight: string;
  skyColors: [string, string];
  fogColor: string;
  particleColor: string;
}
