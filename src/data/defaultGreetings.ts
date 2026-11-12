import { FestiveTemplate } from '../types/greeting';

export const TEMPLATES: FestiveTemplate[] = [
  {
    id: 'diwali-night-3d',
    name: 'Diwali Night in 3D',
    subtitle: 'Classic Royal Courtyard under Midnight Stars',
    description: 'An enchanting Indian courtyard with carved arches, floating golden lanterns, and glowing clay diyas placed along the stone steps.',
    category: 'celebration',
    badge: 'Most Popular',
    data: {
      senderName: 'FestiveWorld Team',
      recipientName: 'Dear Friend',
      message: 'May the divine glow of Diwali diyas illuminate your home with everlasting peace, wisdom, wealth, and supreme happiness.',
      themeId: 'midnight-palace',
      greetingStyle: 'cinematic',
      musicTrack: 'fluteSitar',
      sceneSettings: {
        diyasCount: 13,
        showRangoli: true,
        showLanterns: true,
        showMarigolds: true,
        fireworksFrequency: 'medium',
        flameIntensity: 1.2,
        lightingColor: '#FFB703',
        skyTheme: 'midnight',
        ambientParticles: true,
        cameraMovement: 'cinematicSweep',
        fontSize: 'royal',
        fontFamily: 'heading'
      }
    }
  },
  {
    id: 'diya-lighting-experience',
    name: 'Diya Lighting Experience',
    subtitle: 'Intimate Sanctuary of Sacred Light',
    description: 'An auspicious ritual scene focusing on lighting sacred diyas one by one with authentic chiming sounds and expanding auric glow.',
    category: 'traditional',
    badge: 'Spiritual',
    data: {
      senderName: 'Your Well-Wishers',
      recipientName: 'Family & Friends',
      message: 'As each sacred diya is ignited, may it burn away obstacles, sorrows, and doubts, leaving in their place radiance and endless prosperity.',
      themeId: 'golden-temple',
      greetingStyle: 'diyaRitual',
      musicTrack: 'templeChimes',
      sceneSettings: {
        diyasCount: 21,
        showRangoli: true,
        showLanterns: false,
        showMarigolds: true,
        fireworksFrequency: 'low',
        flameIntensity: 1.5,
        lightingColor: '#FFE066',
        skyTheme: 'goldenTemple',
        ambientParticles: true,
        cameraMovement: 'glide',
        fontSize: 'royal',
        fontFamily: 'heading'
      }
    }
  },
  {
    id: 'magical-rangoli',
    name: 'Magical Rangoli',
    subtitle: 'Kaleidoscopic Sacred Geometry & Petals',
    description: 'A mesmerizing, illuminated floral rangoli decorated with marigolds and rose petals that pulses with sacred festive energy.',
    category: 'traditional',
    badge: 'Artistic',
    data: {
      senderName: 'Ananya & Family',
      recipientName: 'Aarav',
      message: 'Just as thousands of colorful powders blend into one magnificent rangoli, may your life be painted with every shade of happiness, triumph, and harmony.',
      themeId: 'royal-courtyard',
      greetingStyle: 'cinematic',
      musicTrack: 'fluteSitar',
      sceneSettings: {
        diyasCount: 17,
        showRangoli: true,
        showLanterns: true,
        showMarigolds: true,
        fireworksFrequency: 'medium',
        flameIntensity: 1.3,
        lightingColor: '#FB8500',
        skyTheme: 'deepPurple',
        ambientParticles: true,
        cameraMovement: 'orbit',
        fontSize: 'large',
        fontFamily: 'handwriting'
      }
    }
  },
  {
    id: 'fireworks-celebration',
    name: 'Fireworks Celebration',
    subtitle: 'Dazzling Sky Spectacle & Crackers',
    description: 'A high-energy rooftop celebration overlooking an illuminated city skyline with continuous firework bursts, sparklers, and joyful beats.',
    category: 'celebration',
    badge: 'High Energy',
    data: {
      senderName: 'Rohan',
      recipientName: 'Kunal & Gang',
      message: 'Spark up the joy, burst open the laughter, and light up the sky! Wishing you an explosive, grand, and super vibrant Diwali!',
      themeId: 'starlit-terrace',
      greetingStyle: 'fireworks',
      musicTrack: 'festiveDhol',
      sceneSettings: {
        diyasCount: 9,
        showRangoli: true,
        showLanterns: true,
        showMarigolds: false,
        fireworksFrequency: 'high',
        flameIntensity: 1.4,
        lightingColor: '#38BDF8',
        skyTheme: 'midnight',
        ambientParticles: true,
        cameraMovement: 'cinematicSweep',
        fontSize: 'large',
        fontFamily: 'heading'
      }
    }
  },
  {
    id: 'personalized-family-greeting',
    name: 'Personalized Family Greeting',
    subtitle: 'Warm Blessings from Our Home to Yours',
    description: 'A deeply emotional, warm home setting adorned with traditional marigold garlands, sweet offerings, and affectionate blessings.',
    category: 'family',
    badge: 'Heartfelt',
    data: {
      senderName: 'The Sharma Family',
      recipientName: 'The Vermas',
      message: 'May this holy festival unite our hearts in joy and fill your household with warmth, laughter, good fortune, and lifelong health.',
      themeId: 'royal-courtyard',
      greetingStyle: 'royalDarbar',
      musicTrack: 'templeChimes',
      sceneSettings: {
        diyasCount: 15,
        showRangoli: true,
        showLanterns: true,
        showMarigolds: true,
        fireworksFrequency: 'low',
        flameIntensity: 1.1,
        lightingColor: '#FFB703',
        skyTheme: 'goldenTemple',
        ambientParticles: true,
        cameraMovement: 'glide',
        fontSize: 'royal',
        fontFamily: 'heading'
      }
    }
  },
  {
    id: 'romantic-diwali-greeting',
    name: 'Romantic Diwali Greeting',
    subtitle: 'Golden Whispers & Floating Reflections',
    description: 'Dreamy floating candlelights, soft rose-gold tones, starry purple shadows, and a poetic tribute to the light of your life.',
    category: 'romantic',
    badge: 'Dreamy',
    data: {
      senderName: 'Dev',
      recipientName: 'Priya',
      message: 'In a world full of glowing lamps, your smile is still my brightest spark. Happy Diwali to the one who makes every day magical.',
      themeId: 'crimson-twilight',
      greetingStyle: 'lanternRelease',
      musicTrack: 'calmAmbient',
      sceneSettings: {
        diyasCount: 11,
        showRangoli: true,
        showLanterns: true,
        showMarigolds: true,
        fireworksFrequency: 'low',
        flameIntensity: 1.0,
        lightingColor: '#FF5964',
        skyTheme: 'crimsonNight',
        ambientParticles: true,
        cameraMovement: 'subtle',
        fontSize: 'large',
        fontFamily: 'handwriting'
      }
    }
  },
  {
    id: 'friends-diwali-greeting',
    name: 'Friends Diwali Greeting',
    subtitle: 'Good Times, Endless Sweets & Bright Vibes',
    description: 'Vibrant, upbeat, and fun! Perfect for best friends, roommates, and colleagues with celebratory sparklers and playful animation.',
    category: 'friends',
    badge: 'Vibrant',
    data: {
      senderName: 'Sneha',
      recipientName: 'Pooja',
      message: 'No diet on Diwali! Wishing you endless plates of kaju katli, zero pollution, maximum fun, and a year full of awesome adventures!',
      themeId: 'midnight-palace',
      greetingStyle: 'fireworks',
      musicTrack: 'festiveDhol',
      sceneSettings: {
        diyasCount: 9,
        showRangoli: true,
        showLanterns: true,
        showMarigolds: false,
        fireworksFrequency: 'high',
        flameIntensity: 1.3,
        lightingColor: '#F59E0B',
        skyTheme: 'midnight',
        ambientParticles: true,
        cameraMovement: 'cinematicSweep',
        fontSize: 'large',
        fontFamily: 'body'
      }
    }
  }
];
