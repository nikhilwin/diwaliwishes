# FestiveWorld — Personalized 3D Diwali Greeting Experiences 🪔✨

**FestiveWorld** is an interactive, magical 3D web platform built for Deepavali (Diwali), the Festival of Lights. It empowers users to craft personalized, cinematic 3D greeting experiences complete with traditional Indian haveli courtyard architecture, glowing clay diyas (mitti ke diye), sacred geometric rangolis, floating sky lanterns (Akash Kandil), and dazzling real-time fireworks in a star-studded midnight sky.

---

## ✨ Features & Highlights

- **Traditional 3D Indian Architecture**:
  - Sandstone haveli courtyard with reflective polished tiles and golden inlay borders.
  - Hand-carved sandstone pillars with bracketed capitals and Torana archways.
  - Ornate stone jali (lattice) backdrop and verandah steps.
  - Traditional brass Urli filled with water, floating rose petals, and floating candlelights.
- **Interactive Diya Lighting Ritual**:
  - Authentically sculpted terracotta diyas with mustard oil pool, cotton wick, and procedural flickering flame.
  - Point lights cast dynamic warm golden glows onto surrounding stone surfaces.
  - Interactive: tap any diya to light/extinguish it with sound effects.
- **Sacred Rangoli & Marigolds**:
  - Multi-layered glowing sacred geometry rangoli that gently pulses with festive energy.
  - Hanging marigold (genda phool) flower garlands draped along arches and pillars in realistic catenary curves.
- **Night Sky & Fireworks Spectacle**:
  - Starfield with auspicious golden crescent moon and silhouettes of royal palace domes and minarets.
  - Real-time procedural fireworks particles with gravity, drag, explosive bursts, and sky flashes.
  - Floating Akash Kandil (sky lanterns) swaying in the evening breeze.
- **Dual Greeting Editor**:
  - **Simple Editor**: Quick personalization of recipient name, sender name, heartfelt message (with built-in festive blessings), 3D theme atmosphere, music track, and greeting style.
  - **Advanced Mode**: Fine-grained control over diya counts (5 to 21), flame radiance, mood lighting colors, fireworks frequency, camera choreography, and typography.
  - **Live 3D Split Preview**: Real-time visual feedback as you adjust settings.
  - **Full History**: Unlimited Undo (`Ctrl+Z`), Redo, and Reset design capabilities.
- **Cinematic Storytelling Sequence**:
  - Phase 1: Deep cosmic night sky with golden particles and intro surprise.
  - Phase 2: Gentle camera descent revealing the decorated haveli courtyard.
  - Phase 3: Diyas igniting one by one.
  - Phase 4: Camera glides forward to the central Rangoli.
  - Phase 5: Spectacular fireworks burst overhead.
  - Phase 6: Glowing golden typography reveals the personalized greeting, custom message, and sender signature.
- **Zero-Backend Cross-Device Sharing (Dual Engine)**:
  - Generates instant shareable links (e.g. `/greeting/dw-xyz789?d=...`).
  - Safely encodes complete customized greeting state into URL parameters so **recipients can open it on WhatsApp or any phone without needing an external database**!
  - Also caches greetings locally in `localStorage`.
  - Native Web Share API integration on Android and iOS.
  - Real-time generated scannable QR Code modal.
  - Direct WhatsApp web/app share integration.
- **Web Audio API Procedural Synthesizer**:
  - Zero external MP3 network dependencies.
  - Synthesizes authentic Indian classical ragas (tanpura drone, bansuri flute/sitar pentatonic melodies), resonant temple bells, festive celebration beats, and diya lighting chimes.
  - Full mute/unmute control and browser autoplay handling.
- **7 Curated Festive Templates**:
  1. *Diwali Night in 3D* (Classic royal courtyard)
  2. *Diya Lighting Experience* (Sacred intimate ritual)
  3. *Magical Rangoli* (Kaleidoscopic floral geometry)
  4. *Fireworks Celebration* (High-energy sky spectacle)
  5. *Personalized Family Greeting* (Traditional home blessings)
  6. *Romantic Diwali Greeting* (Dreamy floating candlelights)
  7. *Friends Diwali Greeting* (Vibrant, colorful fun)

---

## 🛠️ Technology Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom festive golden glow utilities
- **3D Graphics**: Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
- **UI Animations**: Framer Motion
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **QR Code**: QRCode.react
- **Audio Engine**: Web Audio API Procedural Audio Synthesizer

---

## 🚀 Getting Started

### 1. Installation
Install the project dependencies:
```bash
npm install
```

### 2. Development Server
Run the local development server:
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build
Compile and bundle optimized static assets:
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

---

## 🌐 Connecting Firebase or Supabase (Optional)

FestiveWorld comes with instant cross-device URL sharing enabled out-of-the-box. If you want to store short links in a central cloud database:

### Supabase Setup
1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Create a table named `greetings`:
   ```sql
   create table greetings (
     id text primary key,
     sender_name text,
     recipient_name text,
     message text,
     theme_id text,
     greeting_style text,
     music_track text,
     scene_settings jsonb,
     created_at bigint
   );
   ```
3. Set your environment variables in `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

---

## 📱 Mobile & Android Optimization

- **Dynamic DPR Capping**: Screen pixel ratio is capped between `1.0` and `1.8` on mobile screens to prevent GPU throttling while maintaining crisp golden typography.
- **Procedural Geometries**: Zero multi-megabyte GLTF models to download; instant loading even over 3G/4G connections.
- **Touch Parallax & Orbit**: Touch drag and swipe gestures allow intuitive 360-degree courtyard exploration.

---

*Wishing you and your loved ones a sparkling, joyous, and prosperous Diwali!* 🪔🎆
