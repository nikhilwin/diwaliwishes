import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Wand2,
  Eye,
  Filter,
  Flame,
  ArrowRight
} from 'lucide-react';
import { TEMPLATES } from '../data/defaultGreetings';
import { FestiveTemplate } from '../types/greeting';

export const TemplatesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'traditional', label: 'Traditional & Sacred' },
    { id: 'celebration', label: 'Celebration & Joy' },
    { id: 'family', label: 'Family & Home' },
    { id: 'friends', label: 'Friends & Fun' },
    { id: 'romantic', label: 'Romantic' },
  ];

  const filteredTemplates = TEMPLATES.filter(
    t => selectedCategory === 'all' || t.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-[#080518] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 backdrop-blur-md mb-4 shadow-gold-glow">
          <Flame className="w-4 h-4 text-amber-400 animate-flame-flicker" />
          <span className="text-xs uppercase tracking-widest text-amber-200 font-semibold">
            7 Signature Atmospheres
          </span>
        </div>

        <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mb-4">
          Festive Greeting Templates
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Select an environment crafted for your recipient. Customize names, message, lighting, and fireworks in the 3D studio.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                  : 'bg-[#150930] hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((tpl: FestiveTemplate) => (
          <div
            key={tpl.id}
            className="rounded-3xl bg-gradient-to-b from-[#180a37]/80 to-[#0e0524]/90 border border-amber-500/25 overflow-hidden shadow-xl hover:border-amber-400/50 hover:shadow-amber-500/10 transition-all flex flex-col justify-between p-6 group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {tpl.badge || 'Diwali Special'}
                </span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                  {tpl.category}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-heading font-bold text-2xl text-white group-hover:text-amber-300 transition-colors">
                {tpl.name}
              </h3>
              <p className="text-xs text-amber-400 font-semibold mb-3">
                {tpl.subtitle}
              </p>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {tpl.description}
              </p>

              {/* Features Pill List */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[10px] px-2.5 py-1 rounded-md bg-black/40 text-amber-200 border border-white/5">
                  🪔 {tpl.data.sceneSettings.diyasCount} Diyas
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-md bg-black/40 text-amber-200 border border-white/5">
                  🎆 {tpl.data.sceneSettings.fireworksFrequency} Fireworks
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-md bg-black/40 text-amber-200 border border-white/5">
                  🎶 {tpl.data.musicTrack}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <Link
                to={`/greeting/${tpl.id}`}
                className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Full Experience</span>
              </Link>

              <Link
                to={`/create?template=${tpl.id}`}
                className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs shadow-gold-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Customize This</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
