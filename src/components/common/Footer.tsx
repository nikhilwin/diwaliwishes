import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Heart, Sparkles, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#070314] border-t border-amber-500/20 text-slate-400 text-sm overflow-hidden pt-12 pb-8">
      {/* Background festive glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5">
                <div className="w-full h-full bg-[#13092A] rounded-full flex items-center justify-center">
                  <Flame className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="font-heading font-bold text-xl text-amber-300">
                FestiveWorld
              </span>
            </div>
            <p className="text-slate-300 text-sm max-w-md leading-relaxed">
              Craft personalized 3D Diwali greeting experiences. Recreate the warmth of glowing diyas, sacred rangolis, and dazzling night fireworks to share across the world with those who matter most.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400/80">
              <Sparkles className="w-4 h-4" />
              <span>Spreading light, harmony, and joy this Deepavali 2026</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white tracking-wider text-sm uppercase">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-amber-300 transition-colors">Create Greeting</Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-amber-300 transition-colors">Template Gallery</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors">About Diwali & Traditions</Link>
              </li>
            </ul>
          </div>

          {/* Festive Greetings Highlights */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white tracking-wider text-sm uppercase">
              Festive Highlights
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>3D Interactive Haveli Courtyard</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Interactive Diya Lighting Ritual</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Real-Time Night Sky Fireworks</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Instant WhatsApp & QR Code Sharing</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FestiveWorld. Crafted with devotion for Diwali celebrations.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>using Three.js, React & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
