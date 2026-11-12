import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Undo2,
  Redo2,
  RotateCcw,
  Eye,
  Share2,
  Save,
  Sliders,
  Check,
  Flame,
  Volume2,
  Smartphone,
  Laptop
} from 'lucide-react';
import { SimpleEditor } from '../components/editor/SimpleEditor';
import { AdvancedEditor } from '../components/editor/AdvancedEditor';
import { ShareModal } from '../components/editor/ShareModal';
import { DiwaliCanvas } from '../components/3d/DiwaliCanvas';
import { GreetingData } from '../types/greeting';
import { TEMPLATES } from '../data/defaultGreetings';
import { StorageService } from '../services/storageService';
import { audioService } from '../services/audioService';

export const EditorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const templateParam = searchParams.get('template');

  // Initial State: Find template or default to first
  const initialData: GreetingData = React.useMemo(() => {
    const tpl = TEMPLATES.find(t => t.id === templateParam) || TEMPLATES[0];
    return {
      ...tpl.data,
      id: StorageService.generateId(),
      createdAt: Date.now(),
      templateId: tpl.id,
    };
  }, [templateParam]);

  // Editor Mode: Simple vs Advanced
  const [editorMode, setEditorMode] = useState<'simple' | 'advanced'>('simple');
  
  // Mobile View: Form vs Preview
  const [mobileTab, setMobileTab] = useState<'controls' | 'preview'>('controls');

  // Greeting State
  const [greeting, setGreeting] = useState<GreetingData>(initialData);

  // Undo / Redo History Stack
  const [history, setHistory] = useState<GreetingData[]>([initialData]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Share Modal & Toast Notifications
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [fireworkTrigger, setFireworkTrigger] = useState<number>(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Push new state onto history stack
  const updateGreeting = (partial: Partial<GreetingData>) => {
    const next = { ...greeting, ...partial };
    setGreeting(next);

    // If music track changed, preview it
    if (partial.musicTrack) {
      audioService.playTrack(partial.musicTrack);
    }

    // Add to history stack
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(next);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setGreeting(prev);
      showToast('Undone previous change');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setGreeting(next);
      showToast('Redone change');
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset this greeting design back to the default template?')) {
      const resetGreeting = {
        ...initialData,
        id: greeting.id,
        createdAt: Date.now(),
      };
      setGreeting(resetGreeting);
      setHistory([resetGreeting]);
      setHistoryIndex(0);
      showToast('Design reset to default');
    }
  };

  const handleSave = () => {
    StorageService.saveGreeting(greeting);
    showToast('Saved to your device!');
  };

  const handleOpenShare = () => {
    StorageService.saveGreeting(greeting);
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080518] text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Top Header & Global Actions Bar */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#12072e]/80 border border-amber-500/20 backdrop-blur-md">
          {/* Title & Mode Switcher */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg text-white">
                Greeting Creator & 3D Studio
              </h1>
              <p className="text-xs text-amber-300/70">
                Personalize & tune your 3D Diwali scene in real time
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl bg-black/40 p-1 border border-white/10">
              <button
                onClick={() => setEditorMode('simple')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  editorMode === 'simple'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Simple Editor
              </button>
              <button
                onClick={() => setEditorMode('advanced')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  editorMode === 'advanced'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Advanced Mode</span>
              </button>
            </div>

            {/* Undo & Redo Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleUndo}
                disabled={historyIndex === 0}
                className="p-2 rounded-lg bg-black/40 border border-white/10 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleRedo}
                disabled={historyIndex === history.length - 1}
                className="p-2 rounded-lg bg-black/40 border border-white/10 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                title="Redo"
              >
                <Redo2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="p-2 rounded-lg bg-black/40 border border-white/10 text-slate-300 hover:text-white"
                title="Reset Design"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile View Toggle Switch (Small screens only) */}
        <div className="lg:hidden flex rounded-xl bg-black/50 p-1 border border-amber-500/20 mb-4">
          <button
            onClick={() => setMobileTab('controls')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 ${
              mobileTab === 'controls'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-300'
            }`}
          >
            <span>Customization Controls</span>
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 ${
              mobileTab === 'preview'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-300'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live 3D Preview</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Controls, Right 3D Live Canvas */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Controls Form */}
        <div
          className={`lg:col-span-5 space-y-6 ${
            mobileTab === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          {editorMode === 'simple' ? (
            <SimpleEditor greeting={greeting} onChange={updateGreeting} />
          ) : (
            <AdvancedEditor greeting={greeting} onChange={updateGreeting} />
          )}

          {/* Action Row */}
          <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-[#14082e]/95 backdrop-blur-xl border border-amber-500/30 shadow-2xl flex items-center gap-3">
            <button
              onClick={handleSave}
              className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Save Progress</span>
            </button>

            <button
              onClick={handleOpenShare}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-bold text-xs shadow-gold-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 text-slate-950" />
              <span>Create Share Link</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Live 3D Canvas Preview */}
        <div
          className={`lg:col-span-7 sticky top-24 ${
            mobileTab === 'controls' ? 'hidden lg:block' : 'block'
          }`}
        >
          <div className="rounded-3xl bg-[#0c051d] border border-amber-500/30 overflow-hidden shadow-2xl relative h-[520px] sm:h-[620px] flex flex-col">
            {/* Top Preview Status Bar */}
            <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-amber-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold">Live 3D Preview</span>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={() => setFireworkTrigger(Date.now())}
                  className="px-3 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <span>🎆 Fireworks</span>
                </button>
              </div>
            </div>

            {/* 3D Canvas */}
            <div className="flex-1 w-full h-full">
              <DiwaliCanvas
                settings={greeting.sceneSettings}
                themeId={greeting.themeId}
                cinematicPhase={3}
                isInteractive={true}
                fireworkTrigger={fireworkTrigger}
                className="w-full h-full"
              />
            </div>

            {/* Bottom Live Greeting Card Preview Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
              <div className="p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-amber-500/30 text-center">
                <div className="text-[10px] uppercase tracking-widest text-amber-400/90 font-semibold mb-1">
                  Recipient View Preview
                </div>
                <h3 className="font-heading font-bold text-xl text-amber-200">
                  Happy Diwali, {greeting.recipientName || '[Recipient]'}!
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1 italic">
                  &ldquo;{greeting.message}&rdquo;
                </p>
                <div className="text-[11px] text-amber-400/80 font-medium mt-1">
                  From: {greeting.senderName || '[Your Name]'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        greeting={greeting}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-yellow-500 text-slate-950 font-bold text-sm shadow-2xl animate-bounce">
          <Check className="w-4 h-4 text-slate-950" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
