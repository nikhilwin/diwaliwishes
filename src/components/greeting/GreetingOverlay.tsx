import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Flame,
  RotateCcw,
  Share2,
  Volume2,
  VolumeX,
  PlusCircle,
  PartyPopper
} from 'lucide-react';
import { GreetingData } from '../../types/greeting';
import { audioService } from '../../services/audioService';

interface GreetingOverlayProps {
  greeting: GreetingData;
  onReplay: () => void;
  onSparkFireworks: () => void;
  onLightMoreDiyas: () => void;
  onOpenShare: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const GreetingOverlay: React.FC<GreetingOverlayProps> = ({
  greeting,
  onReplay,
  onSparkFireworks,
  onLightMoreDiyas,
  onOpenShare,
  isMuted,
  onToggleMute,
}) => {
  // Trigger golden confetti burst when greeting reveals
  useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF4500', '#F59E0B', '#E11D48'],
      });
    } catch {
      // ignore
    }
  }, []);

  const fontClass =
    greeting.sceneSettings.fontFamily === 'handwriting'
      ? 'font-handwriting text-3xl sm:text-5xl'
      : greeting.sceneSettings.fontFamily === 'heading'
      ? 'font-heading text-2xl sm:text-4xl'
      : 'font-body text-xl sm:text-3xl';

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-8 z-30">
      {/* Top Floating Info Bar */}
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto pointer-events-auto">
        <div className="flex items-center gap-2 bg-[#0c051d]/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/25 shadow-lg">
          <Flame className="w-4 h-4 text-amber-400 animate-flame-flicker" />
          <span className="text-xs font-semibold tracking-wider text-amber-200">
            FestiveWorld 3D
          </span>
        </div>

        {/* Audio Mute/Unmute Toggle */}
        <button
          onClick={onToggleMute}
          className="p-2.5 rounded-full bg-[#0c051d]/75 backdrop-blur-md border border-amber-500/25 text-amber-300 hover:bg-amber-500/20 transition-all shadow-lg pointer-events-auto"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
        </button>
      </div>

      {/* Center Greeting Card */}
      <div className="w-full max-w-xl mx-auto my-auto text-center pointer-events-auto px-2">
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#170a35]/85 to-[#0b041a]/95 backdrop-blur-xl border border-amber-500/35 shadow-gold-glow relative overflow-hidden"
        >
          {/* Subtle Top Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-8 bg-amber-500/25 blur-xl rounded-full pointer-events-none" />

          {/* Subtitle / Blessing Header */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-400" />
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-amber-300/90 font-semibold">
              Festival of Lights
            </span>
            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-400" />
          </div>

          {/* Recipient Name Heading */}
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-300 to-amber-500 mb-3 drop-shadow-md text-glow-gold tracking-tight">
            Happy Diwali, {greeting.recipientName}!
          </h1>

          {/* Heartfelt Message */}
          <p className={`${fontClass} text-amber-50/95 leading-relaxed my-4 sm:my-5 font-normal tracking-wide drop-shadow-sm`}>
            &ldquo;{greeting.message}&rdquo;
          </p>

          {/* Sender Signature */}
          <div className="pt-3 border-t border-amber-500/20 flex flex-col items-center justify-center">
            <span className="text-xs text-amber-300/70 uppercase tracking-wider">
              With Love & Best Wishes From
            </span>
            <span className="font-heading font-bold text-base sm:text-lg text-amber-200 mt-0.5">
              {greeting.senderName}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Interactive Toolbar (Mobile-Friendly & Desktop) */}
      <div className="w-full max-w-2xl mx-auto pointer-events-auto">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 rounded-2xl bg-[#0d051f]/85 backdrop-blur-md border border-amber-500/25 shadow-xl">
          {/* Spark Fireworks */}
          <button
            onClick={onSparkFireworks}
            className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/35 border border-amber-500/30 text-amber-200 font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Spark Fireworks</span>
          </button>

          {/* Light Diyas */}
          <button
            onClick={onLightMoreDiyas}
            className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/35 border border-amber-500/30 text-amber-200 font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Light a Diya</span>
          </button>

          {/* Replay Sequence */}
          <button
            onClick={onReplay}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Replay</span>
          </button>

          {/* Share Modal Trigger */}
          <button
            onClick={onOpenShare}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-950" />
            <span>Share Greeting</span>
          </button>

          {/* Create Your Own Wish */}
          <a
            href="/create"
            className="px-3.5 py-2 rounded-xl bg-[#2b1055] hover:bg-[#391572] border border-amber-400/30 text-amber-300 font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Create Mine</span>
          </a>
        </div>
      </div>
    </div>
  );
};
