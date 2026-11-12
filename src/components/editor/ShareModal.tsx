import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  X,
  Copy,
  Check,
  Share2,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';
import { GreetingData } from '../../types/greeting';
import { StorageService } from '../../services/storageService';
import { ShareService } from '../../services/shareService';

interface ShareModalProps {
  greeting: GreetingData;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  greeting,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'qr' | 'backend'>('link');

  if (!isOpen) return null;

  const shareUrl = StorageService.getShareableUrl(greeting);

  const handleCopy = async () => {
    const success = await ShareService.copyLink(greeting);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsApp = () => {
    ShareService.shareWhatsApp(greeting);
  };

  const handleTwitter = () => {
    ShareService.shareTwitter(greeting);
  };

  const handleNativeShare = async () => {
    await ShareService.shareNative(greeting);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#14082e] border border-amber-500/30 shadow-2xl p-6 sm:p-8 text-white overflow-hidden">
        {/* Decorative Golden Top Halo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-amber-500/20 blur-2xl rounded-full" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 mb-3 shadow-gold-glow">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
            Share Your 3D Diwali Greeting
          </h3>
          <p className="text-xs text-amber-200/70 mt-1">
            Personalized with love for <span className="font-semibold text-amber-300">{greeting.recipientName}</span>
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex rounded-xl bg-black/40 p-1 mb-6 border border-amber-500/20">
          <button
            onClick={() => setActiveTab('link')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'link'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Direct Link & Social
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'qr'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            QR Code
          </button>
          <button
            onClick={() => setActiveTab('backend')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'backend'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Sync / Cloud Setup
          </button>
        </div>

        {/* Tab 1: Share Link & Social */}
        {activeTab === 'link' && (
          <div className="space-y-5">
            {/* Link Copy Box */}
            <div className="relative">
              <label className="text-xs font-medium text-amber-300/80 mb-1.5 block">
                Unique Greeting URL
              </label>
              <div className="flex items-center gap-2 rounded-xl bg-black/50 border border-amber-500/30 p-2 pr-3">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="bg-transparent flex-1 text-xs text-slate-200 outline-none px-2 font-mono truncate"
                />
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-400 active:scale-95 transition-all shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="grid grid-cols-2 gap-3">
              {/* WhatsApp Share */}
              <button
                onClick={handleWhatsApp}
                className="py-3 px-4 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366]/30 text-[#25D366] font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span className="text-base">💬</span>
                <span>Send on WhatsApp</span>
              </button>

              {/* Native Web Share */}
              <button
                onClick={handleNativeShare}
                className="py-3 px-4 rounded-xl bg-amber-500/20 border border-amber-500/40 hover:bg-amber-500/30 text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>Share via Phone...</span>
              </button>
            </div>

            {/* Twitter & Direct Preview */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleTwitter}
                className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
              >
                <span>Share on Twitter / X</span>
              </button>
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors underline"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Tab 2: QR Code */}
        {activeTab === 'qr' && (
          <div className="flex flex-col items-center justify-center py-2 space-y-4 text-center">
            <div className="p-4 bg-white rounded-2xl shadow-xl shadow-amber-500/10">
              <QRCodeSVG
                value={shareUrl}
                size={180}
                level="M"
                fgColor="#13092A"
                bgColor="#FFFFFF"
              />
            </div>
            <p className="text-xs text-slate-300 max-w-xs">
              Scan with any Android or iPhone camera to instantly launch the 3D Diwali greeting on mobile.
            </p>
            <button
              onClick={handleCopy}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'URL Copied!' : 'Copy Link Instead'}</span>
            </button>
          </div>
        )}

        {/* Tab 3: Cloud & Backend Explanation */}
        {activeTab === 'backend' && (
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed bg-black/30 p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <Info className="w-4 h-4" />
              <span>How Sharing Works (Dual Engine)</span>
            </div>
            <p>
              <strong className="text-white">Instant Cross-Device Sharing:</strong> Your greeting data is automatically encoded directly into the shareable URL parameters. This means <span className="text-amber-300 font-semibold">anyone you send the link to can open it right away</span> on WhatsApp or mobile without requiring an active database account!
            </p>
            <p>
              <strong className="text-white">Local Storage:</strong> Greetings you create on this browser are also cached in your device’s local database for quick editing and offline replay.
            </p>
            <p>
              <strong className="text-white">Optional Firebase / Supabase:</strong> To store millions of short links in a central cloud table, create a `.env` with your Supabase or Firebase project credentials. FestiveWorld is designed to automatically plug into your cloud database if keys are provided!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
