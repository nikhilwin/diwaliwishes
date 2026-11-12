import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Sparkles,
  Heart,
  Globe,
  Code2,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080518] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 backdrop-blur-md mb-4 shadow-gold-glow">
            <Flame className="w-4 h-4 text-amber-400 animate-flame-flicker" />
            <span className="text-xs uppercase tracking-widest text-amber-200 font-semibold">
              The FestiveWorld Vision
            </span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mb-6">
            Celebrating the Festival of Lights in 3D
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            FestiveWorld was conceived to bridge distances and modernize festive traditions by transforming flat greetings into living, glowing 3D worlds.
          </p>
        </div>

        {/* The Essence of Diwali */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#180a37]/80 to-[#0e0524]/90 border border-amber-500/25 shadow-xl space-y-6">
          <h2 className="font-heading font-bold text-2xl text-amber-300">
            The Sacred Meaning of Deepavali
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Diwali (or Deepavali, meaning &lsquo;a row of clay lamps&rsquo;) is India&rsquo;s most cherished festival. It marks the victory of light over darkness, knowledge over ignorance, and righteousness over despair. Families decorate courtyards with colorful rangoli powders, drape fragrant marigold flowers, ignite earthen diyas, and exchange heartfelt sweets and blessings.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
              <div className="text-2xl mb-2">🪔</div>
              <h3 className="font-heading font-bold text-sm text-white mb-1">Mitti Ke Diye</h3>
              <p className="text-xs text-slate-400">
                Terracotta oil lamps signifying inner illumination, humility, and warmth.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
              <div className="text-2xl mb-2">🌸</div>
              <h3 className="font-heading font-bold text-sm text-white mb-1">Sacred Rangoli</h3>
              <p className="text-xs text-slate-400">
                Geometric floral folk art that welcomes Goddess Lakshmi and positive cosmic vibrations.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
              <div className="text-2xl mb-2">🏮</div>
              <h3 className="font-heading font-bold text-sm text-white mb-1">Akash Kandil</h3>
              <p className="text-xs text-slate-400">
                Sky lanterns hung high to guide ancestral souls and illuminate festive night skies.
              </p>
            </div>
          </div>
        </div>

        {/* Technology & Performance Architecture */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#12072e]/80 border border-amber-500/20 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-amber-400" />
            <h2 className="font-heading font-bold text-2xl text-white">
              Creative Tech & 3D Engineering
            </h2>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Built as a modern, high-performance web application designed to run seamlessly on desktop browsers and Android smartphones alike:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-1">
              <span className="text-xs font-bold text-amber-400">Three.js & React Three Fiber</span>
              <p className="text-xs text-slate-300">
                Real-time WebGL rendering with procedural sandstone geometry, dynamic shadows, and bloom.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-1">
              <span className="text-xs font-bold text-amber-400">Web Audio API Synthesizer</span>
              <p className="text-xs text-slate-300">
                Zero external MP3 dependencies. Procedurally synthesizes authentic tanpura drones, bansuri flutes, and bronze bells.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-1">
              <span className="text-xs font-bold text-amber-400">Mobile-First Optimization</span>
              <p className="text-xs text-slate-300">
                Dynamic pixel ratio capping and instanced particle batches ensure smooth 60 FPS on Android mobile.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-1">
              <span className="text-xs font-bold text-amber-400">Instant Share Engine</span>
              <p className="text-xs text-slate-300">
                Dual storage combining safe Base64 URL parameter encoding with LocalStorage and QR generation.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-6">
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-4">
            Ready to delight someone special?
          </h3>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-bold text-base shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>Create a 3D Greeting Now</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </Link>
        </div>
      </div>
    </div>
  );
};
