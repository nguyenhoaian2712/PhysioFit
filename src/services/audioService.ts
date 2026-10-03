// Web Audio API Relaxing Ambient Soundscape Engine (Offline, pure synthesis)
class AudioService {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private nodes: (OscillatorNode | AudioNode)[] = [];
  private intervals: number[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
  }

  public start(volume = 0.25) {
    if (this.isPlaying) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Create soothing pentatonic chord layers (Ambient Healthcare / Spa soundscape)
      const baseFreqs = [174, 217.5, 261.63, 329.63, 392.00, 523.25]; // 174Hz healing / Solfeggio frequency + C major pentatonic
      
      baseFreqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Low volume per layer for gentle texture
        gain.gain.setValueAtTime(0.04 / (idx + 1), this.ctx.currentTime);

        // Slow LFO for organic breathing pulsation
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.1 + idx * 0.05, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.02, this.ctx.currentTime);
        lfo.connect(gain.gain);
        lfo.start();
        this.nodes.push(lfo);

        if (panner) {
          panner.pan.setValueAtTime((idx % 3 - 1) * 0.5, this.ctx.currentTime);
          osc.connect(gain);
          gain.connect(panner);
          panner.connect(this.masterGain);
        } else {
          osc.connect(gain);
          gain.connect(this.masterGain);
        }

        osc.start();
        this.nodes.push(osc);
      });

      this.isPlaying = true;
    } catch (e) {
      console.warn('Audio synthesis initialized on user gesture', e);
    }
  }

  public stop() {
    if (!this.isPlaying) return;
    try {
      this.nodes.forEach(node => {
        if ('stop' in node && typeof (node as OscillatorNode).stop === 'function') {
          (node as OscillatorNode).stop();
        }
        node.disconnect();
      });
      this.intervals.forEach(id => clearInterval(id));
      this.intervals = [];
      this.nodes = [];
      this.isPlaying = false;
    } catch (e) {
      console.error(e);
    }
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime, 0.1);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioService = new AudioService();
