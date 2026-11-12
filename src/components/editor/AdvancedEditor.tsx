import React from 'react';
import {
  Sliders,
  Flame,
  Sun,
  Eye,
  Camera,
  Type,
  Sparkles,
  Layers,
  Palette
} from 'lucide-react';
import { GreetingData, FireworksFrequency } from '../../types/greeting';

interface AdvancedEditorProps {
  greeting: GreetingData;
  onChange: (updated: Partial<GreetingData>) => void;
}

export const AdvancedEditor: React.FC<AdvancedEditorProps> = ({
  greeting,
  onChange,
}) => {
  const { sceneSettings } = greeting;

  const updateSettings = (partial: Partial<typeof sceneSettings>) => {
    onChange({
      sceneSettings: {
        ...sceneSettings,
        ...partial,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Scene Elements & Festive Decor Toggles */}
      <div className="p-5 rounded-2xl bg-[#14082e]/80 border border-amber-500/20 space-y-4">
        <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>Courtyard Decor & Elements</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Rangoli Toggle */}
          <label className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10 cursor-pointer hover:border-amber-500/30 transition-all">
            <span className="text-xs text-slate-200">Sacred Rangoli</span>
            <input
              type="checkbox"
              checked={sceneSettings.showRangoli}
              onChange={e => updateSettings({ showRangoli: e.target.checked })}
              className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
            />
          </label>

          {/* Sky Lanterns Toggle */}
          <label className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10 cursor-pointer hover:border-amber-500/30 transition-all">
            <span className="text-xs text-slate-200">Akash Lanterns</span>
            <input
              type="checkbox"
              checked={sceneSettings.showLanterns}
              onChange={e => updateSettings({ showLanterns: e.target.checked })}
              className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
            />
          </label>

          {/* Marigold Garlands Toggle */}
          <label className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10 cursor-pointer hover:border-amber-500/30 transition-all">
            <span className="text-xs text-slate-200">Marigold Garlands</span>
            <input
              type="checkbox"
              checked={sceneSettings.showMarigolds}
              onChange={e => updateSettings({ showMarigolds: e.target.checked })}
              className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
            />
          </label>

          {/* Ambient Particles Toggle */}
          <label className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10 cursor-pointer hover:border-amber-500/30 transition-all">
            <span className="text-xs text-slate-200">Golden Motes</span>
            <input
              type="checkbox"
              checked={sceneSettings.ambientParticles}
              onChange={e => updateSettings({ ambientParticles: e.target.checked })}
              className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
            />
          </label>
        </div>

        {/* Diyas Count Slider */}
        <div className="pt-2">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-slate-300">Diyas Placed in Courtyard:</span>
            <span className="text-amber-400 font-bold">{sceneSettings.diyasCount} Lamps</span>
          </div>
          <input
            type="range"
            min={5}
            max={21}
            step={2}
            value={sceneSettings.diyasCount}
            onChange={e => updateSettings({ diyasCount: Number(e.target.value) })}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      {/* 2. Diya Flame & Lighting Mood */}
      <div className="p-5 rounded-2xl bg-[#14082e]/80 border border-amber-500/20 space-y-4">
        <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
          <Sun className="w-4 h-4 text-amber-400" />
          <span>Lighting & Flame Physics</span>
        </div>

        {/* Flame Intensity Slider */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-slate-300">Diya Flame Radiance:</span>
            <span className="text-amber-400 font-bold">
              {Math.round(sceneSettings.flameIntensity * 100)}%
            </span>
          </div>
          <input
            type="range"
            min={0.5}
            max={2.0}
            step={0.1}
            value={sceneSettings.flameIntensity}
            onChange={e => updateSettings({ flameIntensity: Number(e.target.value) })}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Custom Lighting Mood Color */}
        <div>
          <label className="block text-xs text-slate-300 mb-2">
            Festive Lantern Illumination Hue:
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={sceneSettings.lightingColor}
              onChange={e => updateSettings({ lightingColor: e.target.value })}
              className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <div className="flex flex-wrap gap-2">
              {['#FFB703', '#FFA000', '#FF5722', '#F43F5E', '#A855F7', '#38BDF8'].map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => updateSettings({ lightingColor: color })}
                  className="w-7 h-7 rounded-full border border-white/30 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Fireworks & Celebration Dynamics */}
      <div className="p-5 rounded-2xl bg-[#14082e]/80 border border-amber-500/20 space-y-4">
        <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Night Sky Fireworks Frequency</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {(['off', 'low', 'medium', 'high'] as FireworksFrequency[]).map(freq => {
            const isSelected = sceneSettings.fireworksFrequency === freq;
            return (
              <button
                key={freq}
                type="button"
                onClick={() => updateSettings({ fireworksFrequency: freq })}
                className={`py-2 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm'
                    : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {freq}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Cinematic Camera Choreography */}
      <div className="p-5 rounded-2xl bg-[#14082e]/80 border border-amber-500/20 space-y-4">
        <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
          <Camera className="w-4 h-4 text-amber-400" />
          <span>Camera Motion Dynamics</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {[
            { id: 'cinematicSweep', label: 'Grand Sweep', desc: 'Dramatic gliding cinematic arc' },
            { id: 'glide', label: 'Gentle Glide', desc: 'Smooth frontal entrance' },
            { id: 'orbit', label: 'Courtyard Orbit', desc: '360° circular pan around Rangoli' },
            { id: 'subtle', label: 'Calm Sanctuary', desc: 'Minimal gentle parallax sway' },
          ].map(cam => {
            const isSelected = sceneSettings.cameraMovement === cam.id;
            return (
              <button
                key={cam.id}
                type="button"
                onClick={() => updateSettings({ cameraMovement: cam.id as any })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                    : 'bg-black/30 border-white/10 text-slate-300 hover:border-amber-500/30'
                }`}
              >
                <div className="text-xs font-semibold">{cam.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{cam.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Typography & Font Style */}
      <div className="p-5 rounded-2xl bg-[#14082e]/80 border border-amber-500/20 space-y-4">
        <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
          <Type className="w-4 h-4 text-amber-400" />
          <span>Greeting Typography & Lettering</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'heading', name: 'Cinzel Serif', sample: 'Royal & Classic' },
            { id: 'handwriting', name: 'Great Vibes', sample: 'Cursive Elegance' },
            { id: 'body', name: 'Poppins Sans', sample: 'Modern & Clean' },
          ].map(f => {
            const isSelected = sceneSettings.fontFamily === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => updateSettings({ fontFamily: f.id as any })}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold">{f.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{f.sample}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
