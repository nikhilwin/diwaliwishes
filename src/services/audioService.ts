import { MusicTrack } from '../types/greeting';

class FestiveAudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentTrack: MusicTrack = 'fluteSitar';
  private masterGain: GainNode | null = null;
  private ambientInterval: number | null = null;
  private droneOscillators: OscillatorNode[] = [];
  private isPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.4, this.ctx.currentTime, 0.05);
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public playTrack(track: MusicTrack) {
    this.initContext();
    this.stopTrack();
    this.currentTrack = track;
    if (track === 'none' || this.isMuted) return;

    this.isPlaying = true;

    if (track === 'fluteSitar') {
      this.startSitarTanpura();
    } else if (track === 'templeChimes') {
      this.startTempleBells();
    } else if (track === 'festiveDhol') {
      this.startFestiveCelebration();
    } else if (track === 'calmAmbient') {
      this.startDreamscape();
    }
  }

  public stopTrack() {
    this.isPlaying = false;
    if (this.ambientInterval) {
      window.clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    this.droneOscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    this.droneOscillators = [];
  }

  // --- Indian Classical Raga / Tanpura Drone & Melodic Pluck ---
  private startSitarTanpura() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Tanpura Drone (Sa, Pa, High Sa - D3: 146.8Hz, A3: 220Hz, D4: 293.6Hz)
    const baseFreqs = [146.83, 220.0, 293.66];
    baseFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = idx === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.04 / (idx + 1), now);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      this.droneOscillators.push(osc);
    });

    // Melodic notes in Raag Yaman / Bhupali (D, E, F#, A, B, D)
    const pentatonic = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 739.99];
    let step = 0;

    this.ambientInterval = window.setInterval(() => {
      if (!this.isPlaying || this.isMuted || !this.ctx || !this.masterGain) return;
      
      const freq = pentatonic[step % pentatonic.length];
      step += Math.floor(Math.random() * 3) + 1;

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      
      // Sitar-like plucked harmonic
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 1.2);

      const t = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0.08, t);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 1.3);
    }, 1100);
  }

  // --- Sacred Temple Bells with resonant bronze harmonics ---
  private startTempleBells() {
    if (!this.ctx || !this.masterGain) return;

    const bellFrequencies = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6

    const playBell = () => {
      if (!this.isPlaying || this.isMuted || !this.ctx || !this.masterGain) return;
      const baseFreq = bellFrequencies[Math.floor(Math.random() * bellFrequencies.length)];
      const t = this.ctx.currentTime;

      // Bronze bell fundamental + shimmer partials
      [1, 2.76, 5.4, 8.1].forEach((harmonic, i) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * harmonic, t);

        const vol = 0.06 / (i + 1);
        gain.gain.setValueAtTime(vol, t);
        gain.gain.exponentialRampToValueAtTime(0.00001, t + 2.5 + (1 / (i + 1)));

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 3.0);
      });
    };

    playBell();
    this.ambientInterval = window.setInterval(playBell, 2200);
  }

  // --- Festive Celebration Beats & Spark ---
  private startFestiveCelebration() {
    if (!this.ctx || !this.masterGain) return;

    let beat = 0;
    this.ambientInterval = window.setInterval(() => {
      if (!this.isPlaying || this.isMuted || !this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime;

      // Bass drum / Dhol low thump
      if (beat % 2 === 0) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, t);
        osc.frequency.exponentialRampToValueAtTime(45, t + 0.25);

        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.3);
      }

      // Shaker / brass ghunghroo chime
      const noiseBuffer = this.createNoiseBuffer();
      if (noiseBuffer) {
        const noise = this.ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(4000, t);
        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.03, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.masterGain);
        noise.start(t);
        noise.stop(t + 0.12);
      }

      beat++;
    }, 450);
  }

  // --- Starlight Dreamscape Pads ---
  private startDreamscape() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const chords = [220.0, 261.63, 329.63, 392.0]; // Am7 soothing pad

    chords.forEach(f => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(0.03, now);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      this.droneOscillators.push(osc);
    });
  }

  // --- Sound Effects ---

  /** Sound effect when a Diya is lit */
  public playDiyaLightSFX() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    // Chime sweep upwards
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, t); // C5
    osc.frequency.exponentialRampToValueAtTime(1046.5, t + 0.25); // C6

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.45);
  }

  /** Sound effect for a Firework launch & explosion */
  public playFireworkSFX() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    // Low boom + noise crackle
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.6);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.65);

    // Crackle noise
    const noise = this.createNoiseBuffer();
    if (noise) {
      const src = this.ctx.createBufferSource();
      src.buffer = noise;
      const f = this.ctx.createBiquadFilter();
      f.type = 'highpass';
      f.frequency.setValueAtTime(1500, t);
      const ng = this.ctx.createGain();
      ng.gain.setValueAtTime(0.05, t + 0.1);
      ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      src.connect(f);
      f.connect(ng);
      ng.connect(this.masterGain);
      src.start(t + 0.1);
      src.stop(t + 0.55);
    }
  }

  private createNoiseBuffer(): AudioBuffer | null {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 0.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }
}

export const audioService = new FestiveAudioService();
