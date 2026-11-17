class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted = false;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.muted = localStorage.getItem('dirham20_muted') === '1';
      } catch {
        this.muted = false;
      }
    }
  }

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  isMuted(): boolean {
    return this.muted;
  }

  toggleMute(): boolean {
    this.muted = !this.muted;
    try {
      localStorage.setItem('dirham20_muted', this.muted ? '1' : '0');
    } catch {
      // Ignore storage errors
    }
    return this.muted;
  }

  private tone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.08,
    delay = 0
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.014);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.025);
  }

  private playNoiseWhoosh(duration = 0.11, volume = 0.05) {
    const ctx = this.getContext();
    if (!ctx) return;

    const sampleCount = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < sampleCount; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / sampleCount);
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(950, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(
      2200,
      ctx.currentTime + duration
    );
    filter.Q.value = 1.4;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  }

  playCardTap() {
    this.tone(440, 0.06, 'triangle', 0.05);
  }

  playSwipeThreshold() {
    this.tone(580, 0.045, 'sine', 0.035);
  }

  playCardSwipe() {
    this.playNoiseWhoosh(0.12, 0.055);
    this.tone(360, 0.06, 'triangle', 0.04, 0.01);
  }

  playDecision(moneyDelta: number) {
    this.playCardSwipe();
    if (moneyDelta > 0) {
      // Crisp golden Dirham double coin clink
      this.tone(1174.66, 0.11, 'triangle', 0.08, 0.03);
      this.tone(1567.98, 0.19, 'sine', 0.095, 0.09);
      this.tone(2093.0, 0.14, 'sine', 0.045, 0.13);
    } else if (moneyDelta < 0) {
      // Soft leather purse payout thud
      this.tone(260, 0.09, 'triangle', 0.075, 0.02);
      this.tone(195, 0.14, 'sine', 0.065, 0.07);
    } else {
      // Gentle neutral decision chime
      this.tone(523.25, 0.11, 'sine', 0.055, 0.02);
      this.tone(659.25, 0.13, 'sine', 0.045, 0.08);
    }
  }

  playRewardSuccess() {
    const notes = [659.25, 783.99, 987.77, 1318.51];
    notes.forEach((n, idx) => {
      this.tone(n, 0.2, 'triangle', 0.09, idx * 0.065);
    });
  }

  playRankUp() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      this.tone(n, 0.22, 'triangle', 0.09, idx * 0.08);
    });
  }

  playVictory() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    notes.forEach((n, idx) => {
      this.tone(n, 0.28, 'triangle', 0.1, idx * 0.09);
    });
  }

  playGameOver() {
    this.tone(329.63, 0.18, 'triangle', 0.085, 0);
    this.tone(261.63, 0.24, 'triangle', 0.085, 0.14);
    this.tone(196.0, 0.36, 'sine', 0.095, 0.28);
  }
}

export const soundEngine = new SoundEngine();
