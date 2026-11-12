import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, Volume2 } from 'lucide-react';

interface CinematicIntroProps {
  recipientName: string;
  senderName: string;
  onComplete: () => void;
  onPhaseChange: (phase: number) => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  recipientName,
  senderName,
  onComplete,
  onPhaseChange,
}) => {
  const [step, setStep] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Phases of intro:
  // step 0: "Click to reveal your Diwali surprise"
  // step 1: "Preparing something special for [Recipient]..."
  // step 2: "Lighting the sacred lamps of prosperity..."
  // step 3: "Awakening the courtyard of lights..."
  // step 4: Complete -> Show Greeting Overlay

  const startExperience = () => {
    setHasStarted(true);
    setStep(1);
    onPhaseChange(0); // Phase 0 camera
  };

  useEffect(() => {
    if (!hasStarted) return;

    if (step === 1) {
      const timer = setTimeout(() => {
        setStep(2);
        onPhaseChange(1); // Phase 1: camera starts descending
      }, 2600);
      return () => clearTimeout(timer);
    }

    if (step === 2) {
      const timer = setTimeout(() => {
        setStep(3);
        onPhaseChange(2); // Phase 2: camera glides forward
      }, 2800);
      return () => clearTimeout(timer);
    }

    if (step === 3) {
      const timer = setTimeout(() => {
        onPhaseChange(3); // Phase 3: full view
        onComplete();
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [hasStarted, step, onComplete, onPhaseChange]);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
      <AnimatePresence mode="wait">
        {/* Step 0: Initial Start Interaction Gate (Ensures audio context and full user immersion) */}
        {!hasStarted && (
          <motion.div
            key="start-gate"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="pointer-events-auto text-center px-6 py-10 rounded-3xl bg-[#0e0622]/90 backdrop-blur-2xl border border-amber-500/30 shadow-2xl max-w-md mx-4"
          >
            <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-amber-500/30 blur-xl animate-pulse" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-300 p-1 flex items-center justify-center shadow-gold-glow">
                <Flame className="w-8 h-8 text-slate-950 animate-flame-flicker" />
              </div>
            </div>

            <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
              A Personal Diwali Surprise
            </p>

            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              For <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">{recipientName}</span>
            </h2>

            <p className="text-sm text-slate-300 mb-6">
              {senderName} has created an enchanting 3D festive experience for you. Turn up your volume for full sound immersion.
            </p>

            <button
              onClick={startExperience}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-bold text-base shadow-gold-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>Begin Experience</span>
              <Volume2 className="w-4 h-4 text-slate-900 opacity-70" />
            </button>
          </motion.div>
        )}

        {/* Step 1: "Preparing something special..." */}
        {hasStarted && step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8 }}
            className="text-center px-6 py-4 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/20 shadow-xl"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span className="text-xs tracking-widest uppercase text-amber-300/80 font-medium">
                FestiveWorld
              </span>
            </div>
            <p className="font-heading text-xl sm:text-2xl text-white font-medium">
              Preparing something special for <span className="text-amber-400 font-bold">{recipientName}</span>...
            </p>
          </motion.div>
        )}

        {/* Step 2: "Lighting the sacred lamps of prosperity..." */}
        {hasStarted && step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8 }}
            className="text-center px-6 py-4 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/20 shadow-xl"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
              <span className="text-xs tracking-widest uppercase text-amber-300/80 font-medium">
                Sacred Light
              </span>
            </div>
            <p className="font-heading text-xl sm:text-2xl text-white font-medium">
              Lighting the auspicious lamps of prosperity...
            </p>
          </motion.div>
        )}

        {/* Step 3: "Awakening the courtyard of lights..." */}
        {hasStarted && step === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="text-center px-6 py-4 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/20 shadow-xl"
          >
            <p className="font-heading text-xl sm:text-2xl text-amber-300 font-bold">
              The celebration begins ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
