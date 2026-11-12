import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Volume2, VolumeX, Menu, X, Flame } from 'lucide-react';
import { audioService } from '../../services/audioService';

export const Navbar: React.FC = () => {
  const [isMuted, setIsMuted] = useState(audioService.getIsMuted());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const nextMuted = audioService.toggleMute();
    setIsMuted(nextMuted);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Create Greeting', path: '/create' },
    { label: 'Templates', path: '/templates' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0518]/90 backdrop-blur-md border-b border-amber-500/20 py-3 shadow-lg shadow-amber-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-300 p-0.5 shadow-md shadow-amber-500/40 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#13092A] rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5 text-amber-400 animate-flame-flicker" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl sm:text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
                FestiveWorld
              </span>
              <span className="text-[10px] tracking-widest text-amber-400/70 uppercase font-medium -mt-1">
                Personalized 3D Diwali
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#150a32]/60 border border-amber-500/20 px-3 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold shadow-md shadow-amber-500/30'
                      : 'text-amber-100/80 hover:text-amber-300 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleAudio}
              title={isMuted ? 'Unmute Ambient Festive Audio' : 'Mute Audio'}
              className="p-2.5 rounded-full bg-[#1e0f3f]/80 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all shadow-sm"
              aria-label="Toggle Audio"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
              )}
            </button>

            {/* Create CTA Button */}
            <Link
              to="/create"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold text-sm tracking-wide shadow-gold-glow hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-slate-900" />
              <span>Create Greeting</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#180b38] border border-amber-500/30 text-amber-300"
              aria-label="Open Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 mx-4 p-5 rounded-2xl bg-[#13072e]/95 backdrop-blur-xl border border-amber-500/30 shadow-2xl flex flex-col gap-3">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                location.pathname === link.path
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <span>{link.label}</span>
              <Sparkles className="w-4 h-4 text-amber-400 opacity-60" />
            </Link>
          ))}
          <Link
            to="/create"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-center shadow-gold-glow flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>Create Your Greeting</span>
          </Link>
        </div>
      )}
    </header>
  );
};
