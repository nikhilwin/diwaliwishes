import { ThemeConfig, MusicTrack } from '../types/greeting';

export const THEMES: ThemeConfig[] = [
  {
    id: 'midnight-palace',
    name: 'Midnight Palace',
    description: 'Deep royal purple and star-studded skies with warm golden illumination',
    primaryColor: '#F59E0B',
    secondaryColor: '#8B5CF6',
    ambientLight: '#180E38',
    skyColors: ['#0A0518', '#1E0C42'],
    fogColor: '#0A0518',
    particleColor: '#FFD700',
  },
  {
    id: 'royal-courtyard',
    name: 'Royal Courtyard',
    description: 'Traditional sandstone archways bathed in amber candle glow',
    primaryColor: '#FFB703',
    secondaryColor: '#FB8500',
    ambientLight: '#261204',
    skyColors: ['#0B0818', '#341505'],
    fogColor: '#120904',
    particleColor: '#FFAA00',
  },
  {
    id: 'golden-temple',
    name: 'Golden Sanctum',
    description: 'Ethereal golden luminescence with heavenly reflections and mist',
    primaryColor: '#FFE066',
    secondaryColor: '#D4AF37',
    ambientLight: '#241E0A',
    skyColors: ['#120F05', '#2C2208'],
    fogColor: '#161205',
    particleColor: '#FFF275',
  },
  {
    id: 'crimson-twilight',
    name: 'Crimson Twilight',
    description: 'Passionate festive vermillion and ruby hues of joy and prosperity',
    primaryColor: '#FF5964',
    secondaryColor: '#F25C54',
    ambientLight: '#2D0A14',
    skyColors: ['#0F0408', '#380718'],
    fogColor: '#1A040B',
    particleColor: '#FF758F',
  },
  {
    id: 'starlit-terrace',
    name: 'Starlit Terrace',
    description: 'Cosmic indigo night with brilliant firework reflections',
    primaryColor: '#38BDF8',
    secondaryColor: '#818CF8',
    ambientLight: '#08142C',
    skyColors: ['#030712', '#0C1B33'],
    fogColor: '#040B18',
    particleColor: '#7DD3FC',
  }
];

export const MUSIC_OPTIONS: { id: MusicTrack; title: string; mood: string; bpm: number }[] = [
  {
    id: 'fluteSitar',
    title: 'Divine Sitar & Bansuri Flute',
    mood: 'Soulful, meditative, traditional Indian classical ragas',
    bpm: 72,
  },
  {
    id: 'templeChimes',
    title: 'Sacred Temple Bells & Chimes',
    mood: 'Peaceful, resonant brass bells, auspicious vibrations',
    bpm: 60,
  },
  {
    id: 'festiveDhol',
    title: 'Celebration Rhythm & Joy',
    mood: 'Joyous, celebratory festive percussion beats',
    bpm: 96,
  },
  {
    id: 'calmAmbient',
    title: 'Starlight Dreamscape',
    mood: 'Gentle warm pads, floating celestial tranquility',
    bpm: 55,
  },
  {
    id: 'none',
    title: 'Quiet Serenity (Mute)',
    mood: 'Ambient silence without background music',
    bpm: 0,
  }
];

export const FESTIVE_WISH_SUGGESTIONS = [
  {
    label: 'Traditional & Divine',
    text: 'May the divine light of Diwali illuminate your life with peace, prosperity, happiness, and supreme good health. Wishing you and your loved ones a sparkling Deepavali!'
  },
  {
    label: 'Heartfelt & Inspiring',
    text: 'May your life shine as brightly as these sacred diyas, dispelling all darkness and guiding your path toward boundless joy, love, and triumph. Happy Diwali!'
  },
  {
    label: 'Family Blessings',
    text: 'Sending our warmest festive prayers and joyous Diwali blessings from our home to yours. May Goddess Lakshmi shower endless abundance upon your family.'
  },
  {
    label: 'Friends & Fun',
    text: 'Let us celebrate the festival of lights with sweets, laughter, sparklers, and unforgettable memories! Wishing you a super vibrant and rockstar Diwali!'
  },
  {
    label: 'Romantic Glow',
    text: 'Just like a diya brings warmth into the night, your presence lights up every moment of my world. Happy Diwali to the brightest light of my life.'
  },
  {
    label: 'Short & Elegant',
    text: 'Wishing you a prosperous, peaceful, and joyous Diwali filled with radiant moments and glowing smiles.'
  }
];
