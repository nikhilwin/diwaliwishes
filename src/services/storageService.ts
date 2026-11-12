import { GreetingData } from '../types/greeting';
import { TEMPLATES } from '../data/defaultGreetings';

const STORAGE_PREFIX = 'festive_greeting_';

/**
 * Robust Greeting Storage Service.
 * Supports:
 * 1. LocalStorage caching
 * 2. URL payload encoding & decoding (enables instant cross-device sharing without requiring an external DB!)
 * 3. Preconfigured templates fallback
 * 4. Plug-and-play Firebase/Supabase connection points
 */
export class StorageService {
  /**
   * Generate an aesthetic short ID, e.g. "dw-7x9k2"
   */
  static generateId(): string {
    const chars = '23456789abcdefghjkmnpqrstuvwxyz';
    let result = 'dw-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Save a greeting to localStorage
   */
  static saveGreeting(greeting: GreetingData): void {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${greeting.id}`, JSON.stringify(greeting));
      // Also save to recent creations list
      const recents = this.getRecentGreetings();
      const filtered = recents.filter(g => g.id !== greeting.id);
      filtered.unshift(greeting);
      localStorage.setItem('festive_recents', JSON.stringify(filtered.slice(0, 10)));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  /**
   * Encode greeting into a compact base64 URL safe string
   */
  static encodeGreetingForUrl(greeting: GreetingData): string {
    try {
      const json = JSON.stringify(greeting);
      // Safe base64 utf-8 encoding
      const utf8Bytes = new TextEncoder().encode(json);
      let binary = '';
      utf8Bytes.forEach(b => binary += String.fromCharCode(b));
      return encodeURIComponent(btoa(binary));
    } catch (e) {
      console.error('Failed to encode greeting to URL:', e);
      return '';
    }
  }

  /**
   * Decode greeting from URL base64 parameter
   */
  static decodeGreetingFromUrl(encoded: string): GreetingData | null {
    try {
      const decodedStr = decodeURIComponent(encoded);
      const binary = atob(decodedStr);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const json = new TextDecoder().decode(bytes);
      const data = JSON.parse(json) as GreetingData;
      return data;
    } catch (e) {
      console.error('Failed to decode greeting from URL param:', e);
      return null;
    }
  }

  /**
   * Retrieve greeting by ID (checks URL param first, then localStorage, then built-in templates)
   */
  static getGreeting(id: string, urlParamData?: string | null): GreetingData | null {
    // 1. Try decoding from URL query if provided
    if (urlParamData) {
      const fromUrl = this.decodeGreetingFromUrl(urlParamData);
      if (fromUrl) {
        // Cache to localStorage for speed
        this.saveGreeting(fromUrl);
        return fromUrl;
      }
    }

    // 2. Check LocalStorage
    try {
      const local = localStorage.getItem(`${STORAGE_PREFIX}${id}`);
      if (local) {
        return JSON.parse(local) as GreetingData;
      }
    } catch (e) {
      console.warn('LocalStorage read error:', e);
    }

    // 3. Check built-in festive templates
    const templateMatch = TEMPLATES.find(t => t.id === id);
    if (templateMatch) {
      return {
        ...templateMatch.data,
        id: templateMatch.id,
        createdAt: Date.now(),
        templateId: templateMatch.id,
      };
    }

    // 4. Fallback to default template if not found
    return {
      ...TEMPLATES[0].data,
      id,
      createdAt: Date.now(),
    };
  }

  /**
   * Get list of recently created greetings
   */
  static getRecentGreetings(): GreetingData[] {
    try {
      const recents = localStorage.getItem('festive_recents');
      if (recents) {
        return JSON.parse(recents) as GreetingData[];
      }
    } catch (e) {
      console.warn('Error reading recent greetings:', e);
    }
    return [];
  }

  /**
   * Construct full shareable URL
   */
  static getShareableUrl(greeting: GreetingData): string {
    const origin = window.location.origin;
    const encoded = this.encodeGreetingForUrl(greeting);
    return `${origin}/greeting/${greeting.id}?d=${encoded}`;
  }
}
