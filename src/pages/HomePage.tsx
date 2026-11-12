import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Flame,
  ArrowRight,
  Share2,
  Eye,
  Gift,
  Wand2,
  Heart,
  ChevronRight,
  Music,
  CheckCircle2
} from 'lucide-react';
import { DiwaliCanvas } from '../components/3d/DiwaliCanvas';
import { TEMPLATES } from '../data/defaultGreetings';
import { audioService } from '../services/audioService';

export const HomePage: React.FC = () => {
  const [interactiveFireworks, setInteractiveFireworks] = useState<number>(0);
  const featuredTemplate = TEMPLATES[0];

  const handleSparkler = () => {
    setInteractiveFireworks(Date.now());
  };

  return (
    <div className="relative min-h-screen bg-[#080518] text-white overflow-hidden">
      {/* HERO SECTION WITH 3D DIWALI BACKGROUND */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* 3D Scene in Background */}
        <div className="absolute inset-0 z-0 opacity-85 sm:opacity-95 pointer-events-auto">
          <DiwaliCanvas
            settings={featuredTemplate.data.sceneSettings}
            themeId={featuredTemplate.data.themeId}
            cinematicPhase={3}
            isInteractive={true}
            fireworkTrigger={interactiveFireworks}
            className="w-full h-full"
          />
          {/* Subtle gradient vignette to ensure text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080518] via-transparent to-[#080518]/70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080518]/80 via-transparent to-[#080518]/80 pointer-events-none" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto text-center pointer-events-none">
          {/* Festive Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 backdrop-blur-md mb-6 shadow-gold-glow pointer-events-auto"
          >
            <Flame className="w-4 h-4 text-amber-400 animate-flame-flicker" />
            <span className="text-xs uppercase tracking-widest text-amber-200 font-semibold">
              Deepavali 2026 Celebration
            </span>
          </motion.div>

          {/* Main Hero Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-heading font-black text-4xl sm:text-6xl md:text-7xl leading-tight text-white mb-6 tracking-tight drop-shadow-lg"
          >
            Make This Diwali <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 text-glow-gold">
              Unforgettable
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-body text-base sm:text-xl text-amber-100/90 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed drop-shadow"
          >
            Create a magical Diwali experience for someone special. Craft a personalized 3D haveli courtyard with glowing diyas, sacred rangolis, and fireworks to share worldwide.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
          >
            <Link
              to="/create"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-bold text-base shadow-gold-glow hover:shadow-amber-500/60 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>Create Your Greeting</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/templates"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#180b33]/80 hover:bg-[#251050] border border-amber-500/30 text-amber-200 font-semibold text-base backdrop-blur-md hover:border-amber-400 transition-all flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5 text-amber-400" />
              <span>Explore Experiences</span>
            </Link>

            {/* Tap to burst fireworks button */}
            <button
              onClick={handleSparkler}
              className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-amber-300 font-medium flex items-center gap-1.5 transition-all"
              title="Click to launch real-time fireworks into the 3D sky!"
            >
              <span>🎆 Tap for Fireworks</span>
            </button>
          </motion.div>

          {/* Interactive Hint */}
          <p className="text-[11px] text-amber-300/60 mt-8 tracking-wide">
            👆 Drag or swipe the 3D scene above to inspect the illuminated courtyard & diyas!
          </p>
        </div>
      </section>

      {/* WHY FESTIVEWORLD IS MAGICAL */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">
            Beyond Static Images & Plain Text
          </h2>
          <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            An Emotional, Interactive Journey
          </h3>
          <p className="text-slate-400 text-sm mt-3">
            Traditional WhatsApp text wishes get lost in the noise. FestiveWorld delivers a cinematic experience that recipients treasure forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#180a37]/80 to-[#0e0524]/90 border border-amber-500/25 shadow-xl hover:border-amber-400/50 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-6 text-amber-400 group-hover:scale-110 transition-transform">
              <Flame className="w-7 h-7 text-amber-400" />
            </div>
            <h4 className="font-heading font-bold text-xl text-white mb-2">
              Authentic 3D Indian Architecture
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Step inside a sculpted sandstone courtyard featuring hand-carved Torana archways, fluted pillars, vibrant Rangoli, and sacred clay diyas.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#180a37]/80 to-[#0e0524]/90 border border-amber-500/25 shadow-xl hover:border-amber-400/50 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-6 text-amber-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7 text-amber-400" />
            </div>
            <h4 className="font-heading font-bold text-xl text-white mb-2">
              Cinematic Storytelling Sequence
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your recipient is greeted by a camera sweeping through a moonlit sky, lighting diyas one by one before revealing their personalized name in gold.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#180a37]/80 to-[#0e0524]/90 border border-amber-500/25 shadow-xl hover:border-amber-400/50 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-6 text-amber-400 group-hover:scale-110 transition-transform">
              <Share2 className="w-7 h-7 text-amber-400" />
            </div>
            <h4 className="font-heading font-bold text-xl text-white mb-2">
              Instant Shareable Magic Links
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Generate one-click WhatsApp links, native Android share sheets, or scannable QR codes that work across every smartphone and browser.
            </p>
          </div>
        </div>
      </section>

      {/* POPULAR FESTIVE TEMPLATES SHOWCASE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Handcrafted Atmospheres
            </span>
            <h3 className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">
              Curated Festive Templates
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              Choose from 7 signature visual themes designed for family, friends, or romantic moments.
            </p>
          </div>
          <Link
            to="/templates"
            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-semibold text-amber-300 hover:text-amber-200 transition-colors"
          >
            <span>View All 7 Experiences</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEMPLATES.slice(0, 3).map(tpl => (
            <div
              key={tpl.id}
              className="rounded-3xl bg-[#12072a] border border-amber-500/20 overflow-hidden shadow-xl hover:border-amber-400/40 transition-all flex flex-col justify-between p-6 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {tpl.badge}
                  </span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">
                    {tpl.category}
                  </span>
                </div>

                <h4 className="font-heading font-bold text-xl text-white group-hover:text-amber-300 transition-colors">
                  {tpl.name}
                </h4>
                <p className="text-xs text-amber-400/80 font-medium mb-3">
                  {tpl.subtitle}
                </p>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-6">
                  {tpl.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <Link
                  to={`/greeting/${tpl.id}`}
                  className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </Link>

                <Link
                  to={`/create?template=${tpl.id}`}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Use Template</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5 text-center">
        <h2 className="font-heading text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">
          Effortless 2-Minute Process
        </h2>
        <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-12">
          How to Create & Share
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-heading font-black text-2xl text-amber-400 mb-4 shadow-gold-glow">
              1
            </div>
            <h4 className="font-heading font-bold text-lg text-white mb-2">
              Personalize Details
            </h4>
            <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
              Enter your name and the recipient’s name. Pick from soulful festive blessings or write your own heartfelt message.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-heading font-black text-2xl text-amber-400 mb-4 shadow-gold-glow">
              2
            </div>
            <h4 className="font-heading font-bold text-lg text-white mb-2">
              Tune Your 3D World
            </h4>
            <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
              Pick midnight, royal, or golden lighting. Select bansuri flute or temple chimes, and adjust diyas and fireworks with live preview.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-heading font-black text-2xl text-amber-400 mb-4 shadow-gold-glow">
              3
            </div>
            <h4 className="font-heading font-bold text-lg text-white mb-2">
              Send Unique Link
            </h4>
            <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
              Click &lsquo;Share&rsquo; to send directly to WhatsApp, copy your link, or display a QR code for your family and friends.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL BOTTOM CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-[#210c4d] via-[#3b126a] to-[#210c4d] border border-amber-500/40 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-slate-950 mb-4 shadow-gold-glow">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-black text-3xl sm:text-5xl text-white mb-4">
              Spread the Warmth of Diwali
            </h3>
            <p className="text-amber-100 text-sm sm:text-base mb-8">
              Light up someone’s phone and heart with a customized 3D experience they’ll remember for years.
            </p>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-base shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Start Creating Free</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
