// Web Audio synth: chime for new customer messages, cha-ching for new admin orders.
// AudioContext is created lazily and resumed on first user gesture so browsers
// don't block playback under their autoplay policies.

let audioCtx: AudioContext | null = null;
let gestureInstalled = false;

type AudioContextCtor = typeof AudioContext;

function getCtor(): AudioContextCtor | null {
  if (typeof window === "undefined") return null;
  return (window.AudioContext || (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext) ?? null;
}

function getOrCreateCtx(): AudioContext | null {
  if (audioCtx) return audioCtx;
  const Ctor = getCtor();
  if (!Ctor) return null;
  try {
    audioCtx = new Ctor();
  } catch {
    audioCtx = null;
  }
  return audioCtx;
}

export function installAudioGesture() {
  if (gestureInstalled || typeof document === "undefined") return;
  gestureInstalled = true;
  const handler = async () => {
    const ctx = getOrCreateCtx();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
        console.log("[notificationSounds] AudioContext resumed after gesture, state:", ctx.state);
      } catch (e) {
        console.warn("[notificationSounds] AudioContext resume failed:", e);
      }
    }
  };
  const opts: AddEventListenerOptions = { passive: true };
  document.addEventListener("click", handler, opts);
  document.addEventListener("keydown", handler);
  document.addEventListener("touchstart", handler, opts);
}

export async function ensureAudioReady(): Promise<boolean> {
  const ctx = getOrCreateCtx();
  if (!ctx) {
    console.warn("[notificationSounds] No AudioContext available (browser unsupported?)");
    return false;
  }
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch (e) {
      console.warn("[notificationSounds] resume failed:", e);
      return false;
    }
  }
  if (ctx.state !== "running") {
    console.warn("[notificationSounds] AudioContext not running, state:", ctx.state);
    return false;
  }
  return true;
}

export function getAudioContextState(): string {
  return audioCtx ? audioCtx.state : "not-created";
}

export async function playMessageSound() {
  const ok = await ensureAudioReady();
  if (!ok) return;
  const ctx = audioCtx!;
  const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = freq;
    const t = ctx.currentTime + i * 0.15;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.start(t);
    osc.stop(t + 0.4);
  });
}

export async function playNewOrderSound() {
  const ok = await ensureAudioReady();
  if (!ok) return;
  const ctx = audioCtx!;
  const seq = [
    { freq: 1200, start: 0, duration: 0.08, gain: 0.4 },
    { freq: 1600, start: 0.09, duration: 0.08, gain: 0.4 },
    { freq: 800, start: 0.20, duration: 0.3, gain: 0.3 },
    { freq: 1000, start: 0.22, duration: 0.25, gain: 0.2 },
  ];
  seq.forEach(({ freq, start, duration, gain: g }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "triangle";
    osc.frequency.value = freq;
    const t = ctx.currentTime + start;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(g, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.start(t);
    osc.stop(t + duration);
  });
}

// Soft two-tone beep used in-chat (kept for parity with the previous OrderChat sound).
export async function playInChatBeep() {
  const ok = await ensureAudioReady();
  if (!ok) return;
  const ctx = audioCtx!;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.setValueAtTime(600, ctx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
  osc.start();
  osc.stop(ctx.currentTime + 0.3);
}
