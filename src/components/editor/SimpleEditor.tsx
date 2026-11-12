import React from 'react';
import {
  Sparkles,
  Music,
  Palette,
  Heart,
  User,
  Quote,
  Flame,
  ChevronRight
} from 'lucide-react';
import { GreetingData, GreetingStyle, MusicTrack } from '../../types/greeting';
import { THEMES, MUSIC_OPTIONS, FESTIVE_WISH_SUGGESTIONS } from '../../data/themes';

interface SimpleEditorProps {
  greeting: GreetingData;
  onChange: (updated: Partial<GreetingData>) => void;
}

export const SimpleEditor: React.FC<SimpleEditorProps> = ({
  greeting,
  onChange,
}) => {
  const greetingStyles: { id: GreetingStyle; title: string; desc: string; icon: string }[] = [
    { id: 'cinematic', title: 'Cinematic Reveal', desc: 'Majestic camera sweep through the haveli courtyard', icon: '🎬' },
    { id: 'diyaRitual', title: 'Diya Lighting Ritual', desc: 'Step-by-step sacred lamp lighting sequence', icon: '🪔' },
    { id: 'fireworks', title: 'Fireworks Spectacle', desc: 'High-energy sky bursts and sparkling festive fireworks', icon: '🎆' },
    { id: 'lanternRelease', title: 'Lantern Release', desc: 'Floating golden sky lanterns under the midnight moon', icon: '🏮' },
    { id: 'royalDarbar', title: 'Royal Darbar', desc: 'Grand haveli verandah with opulent marigold decor', icon: '👑' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Recipient & Sender Names */}
      <div className="p-5 rounded-2xl bg-[#14082e]/80 border border-amber-500/20 space-y-4">
        <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
          <User className="w-4 h-4 text-amber-400" />
          <span>Names for Personalization</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Who is this greeting for? (Recipient)
            </label>
            <input
              type="text"
              value={greeting.recipientName}
              onChange={e => onChange({ recipientName: e.target.value })}
              placeholder="e.g. Rahul, Priya, Mom & Dad"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-amber-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Your Name (Sender)
            </label>
            <input
              type="text"
              value={greeting.senderName}
              onChange={e => onChange({ senderName: e.target.value })}
              placeholder="e.g. Amit, The Sharma Family"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-amber-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
          </div>
        </div>
      </div>

      {/* 2. Heartfelt Message & Quick Suggestions */}
      <div className="p-5 rounded-2xl bg-[#14082e]/80 border border-amber-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
            <Quote className="w-4 h-4 text-amber-400" />
            <span>Personal Festive Message</span>
          </div>
          <span className="text-[11px] text-slate-400">
            {greeting.message.length} chars
          </span>
        </div>

        <textarea
          rows={3}
          value={greeting.message}
          onChange={e => onChange({ message: e.target.value })}
          placeholder="Write your heartfelt festive blessings here..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-amber-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 resize-none leading-relaxed"
        />

        {/* Preset Wishes Chips */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-amber-400/80 font-medium mb-2">
            Or pick an auspicious festive blessing:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {FESTIVE_WISH_SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChange({ message: s.text })}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/40 text-[11px] text-slate-300 hover:text-amber-200 transition-all text-left"
              >
                ✨ {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Background 3D Theme Selection */}
      <div className="p-5 rounded-2xl bg-[#14082e]/80 border border-amber-500/20 space-y-4">
        <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
          <Palette className="w-4 h-4 text-amber-400" />
          <span>3D Courtyard Atmosphere & Lighting</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {THEMES.map(theme => {
            const isSelected = greeting.themeId === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() =>
                  onChange({
                    themeId: theme.id,
                    sceneSettings: {
                      ...greeting.sceneSettings,
                      lightingColor: theme.primaryColor,
                    },
                  })
                }
                className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-black/30 border-white/10 hover:border-amber-500/30'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-lg mt-0.5 shrink-0 border border-white/20 shadow-sm"
                  style={{ backgroundColor: theme.primaryColor }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">
                      {theme.name}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] text-amber-400 font-bold uppercase">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {theme.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Greeting Style */}
      <div className="p-5 rounded-2xl bg-[#14082e]/80 border border-amber-500/20 space-y-4">
        <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Greeting Experience Style</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {greetingStyles.map(st => {
            const isSelected = greeting.greetingStyle === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => onChange({ greetingStyle: st.id })}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-black/30 border-white/10 hover:border-amber-500/30'
                }`}
              >
                <span className="text-xl">{st.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-white">
                    {st.title}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {st.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Music Track Selection */}
      <div className="p-5 rounded-2xl bg-[#14082e]/80 border border-amber-500/20 space-y-4">
        <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
          <Music className="w-4 h-4 text-amber-400" />
          <span>Festive Ambient Music</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {MUSIC_OPTIONS.map(m => {
            const isSelected = greeting.musicTrack === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onChange({ musicTrack: m.id })}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                    : 'bg-black/30 border-white/10 text-slate-300 hover:border-amber-500/30'
                }`}
              >
                <div className="text-xs font-semibold">{m.title}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {m.mood}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
