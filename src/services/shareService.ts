import { GreetingData } from '../types/greeting';
import { StorageService } from './storageService';

export class ShareService {
  /**
   * Share via Native Web Share API (Mobile / Android / iOS)
   */
  static async shareNative(greeting: GreetingData): Promise<boolean> {
    const url = StorageService.getShareableUrl(greeting);
    const title = `Happy Diwali from ${greeting.senderName}! 🪔✨`;
    const text = `✨ ${greeting.recipientName}, someone sent you a magical 3D Diwali greeting experience! Tap to open:`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return true;
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.warn('Native share failed, falling back to copy:', err);
        }
      }
    }
    return false;
  }

  /**
   * Share via WhatsApp Web / App
   */
  static shareWhatsApp(greeting: GreetingData): void {
    const url = StorageService.getShareableUrl(greeting);
    const message = `✨ *Happy Diwali, ${greeting.recipientName}!* 🪔✨\n\n*${greeting.senderName}* has created a magical 3D festive experience especially for you!\n\nOpen your personalized 3D greeting here:\n👉 ${url}\n\n_May your year be as bright and joyous as the sacred lamps!_ 🎆`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  /**
   * Share via Twitter / X
   */
  static shareTwitter(greeting: GreetingData): void {
    const url = StorageService.getShareableUrl(greeting);
    const text = `🪔 Sparkling 3D Diwali Greetings for ${greeting.recipientName}! Experience the lights & fireworks here:`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=Diwali,Deepavali,HappyDiwali,FestiveWorld`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  }

  /**
   * Copy link to clipboard
   */
  static async copyLink(greeting: GreetingData): Promise<boolean> {
    const url = StorageService.getShareableUrl(greeting);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        return true;
      }
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      return false;
    }
  }
}
