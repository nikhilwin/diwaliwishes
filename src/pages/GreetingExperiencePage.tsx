import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { DiwaliCanvas } from '../components/3d/DiwaliCanvas';
import { CinematicIntro } from '../components/greeting/CinematicIntro';
import { GreetingOverlay } from '../components/greeting/GreetingOverlay';
import { ShareModal } from '../components/editor/ShareModal';
import { StorageService } from '../services/storageService';
import { audioService } from '../services/audioService';
import { GreetingData } from '../types/greeting';
import { TEMPLATES } from '../data/defaultGreetings';

export const GreetingExperiencePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const encodedData = searchParams.get('d');

  // Load greeting data
  const greeting: GreetingData = React.useMemo(() => {
    const greetingId = id || 'diwali-night-3d';
    const found = StorageService.getGreeting(greetingId, encodedData);
    if (found) return found;

    return {
      ...TEMPLATES[0].data,
      id: greetingId,
      createdAt: Date.now(),
    };
  }, [id, encodedData]);

  // Cinematic state
  const [introFinished, setIntroFinished] = useState<boolean>(false);
  const [cinematicPhase, setCinematicPhase] = useState<number>(0);
  const [fireworkTrigger, setFireworkTrigger] = useState<number>(0);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(audioService.getIsMuted());

  // Start background music when user completes intro
  useEffect(() => {
    if (introFinished && greeting.musicTrack !== 'none') {
      audioService.playTrack(greeting.musicTrack);
    }
    return () => {
      audioService.stopTrack();
    };
  }, [introFinished, greeting.musicTrack]);

  const handlePhaseChange = (phase: number) => {
    setCinematicPhase(phase);
    if (phase === 2) {
      // Trigger a celebratory firework burst during approach
      setFireworkTrigger(Date.now());
    }
  };

  const handleReplay = () => {
    setIntroFinished(false);
    setCinematicPhase(0);
  };

  const handleSparkFireworks = () => {
    setFireworkTrigger(Date.now());
  };

  const handleLightMoreDiyas = () => {
    audioService.playDiyaLightSFX();
  };

  const handleToggleMute = () => {
    const next = audioService.toggleMute();
    setIsMuted(next);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#080518]">
      {/* 3D Diwali Scene Canvas */}
      <DiwaliCanvas
        settings={greeting.sceneSettings}
        themeId={greeting.themeId}
        cinematicPhase={cinematicPhase}
        isInteractive={introFinished}
        fireworkTrigger={fireworkTrigger}
        className="w-full h-full"
      />

      {/* Cinematic Intro Sequence (Until complete) */}
      {!introFinished && (
        <CinematicIntro
          recipientName={greeting.recipientName}
          senderName={greeting.senderName}
          onPhaseChange={handlePhaseChange}
          onComplete={() => setIntroFinished(true)}
        />
      )}

      {/* Full Greeting Overlay (After Intro) */}
      {introFinished && (
        <GreetingOverlay
          greeting={greeting}
          onReplay={handleReplay}
          onSparkFireworks={handleSparkFireworks}
          onLightMoreDiyas={handleLightMoreDiyas}
          onOpenShare={() => setIsShareOpen(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* Share Modal */}
      <ShareModal
        greeting={greeting}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
};
