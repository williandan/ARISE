import { Howl, Howler } from "howler";

/**
 * Gerenciador de som do Sistema (Howler.js).
 *
 * Os SFX são sintetizados em WAV (data URI) para o portfólio já ter som
 * sem depender de assets externos — a trilha/efeitos definitivos entram
 * depois (docs/PLANO.md §12). A engine de reprodução é o Howler.
 *
 * Regra: começa MUDO. Só toca após o visitante ativar o som.
 */

export type Sfx = "notify" | "levelUp" | "rankUp";

interface Note {
  freq: number;
  ms: number;
}

const SAMPLE_RATE = 44100;

/** Sintetiza uma sequência de notas com envelope simples (attack/release). */
function synth(notes: Note[], type: "sine" | "triangle" = "sine", volume = 0.25): Float32Array {
  const total = notes.reduce((acc, n) => acc + Math.floor((SAMPLE_RATE * n.ms) / 1000), 0);
  const out = new Float32Array(total);
  let idx = 0;

  for (const note of notes) {
    const len = Math.floor((SAMPLE_RATE * note.ms) / 1000);
    for (let i = 0; i < len; i++) {
      const t = i / SAMPLE_RATE;
      const attack = Math.min(1, i / (0.005 * SAMPLE_RATE));
      const release = Math.min(1, (len - i) / (0.04 * SAMPLE_RATE));
      const env = Math.min(attack, release);
      const phase = 2 * Math.PI * note.freq * t;
      const wave =
        type === "triangle" ? (2 / Math.PI) * Math.asin(Math.sin(phase)) : Math.sin(phase);
      out[idx++] = wave * volume * env;
    }
  }

  return out;
}

/** Codifica amostras float em WAV PCM 16-bit mono e devolve um data URI. */
function encodeWav(samples: Float32Array): string {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const writeString = (offset: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(offset + i, s.charCodeAt(i));
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, SAMPLE_RATE, true);
  view.setUint32(28, SAMPLE_RATE * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }

  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return `data:audio/wav;base64,${btoa(binary)}`;
}

let howls: Record<Sfx, Howl> | null = null;
let initialized = false;

function ensureInit() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  howls = {
    // "ding" suave de notificação/missão
    notify: new Howl({
      src: [
        encodeWav(
          synth([
            { freq: 880, ms: 90 },
            { freq: 1320, ms: 140 },
          ]),
        ),
      ],
      format: ["wav"],
      volume: 0.5,
    }),
    // arpejo ascendente de level-up
    levelUp: new Howl({
      src: [
        encodeWav(
          synth([
            { freq: 523, ms: 90 },
            { freq: 659, ms: 90 },
            { freq: 784, ms: 90 },
            { freq: 1047, ms: 200 },
          ]),
        ),
      ],
      format: ["wav"],
      volume: 0.5,
    }),
    // fanfarra maior de promoção de rank
    rankUp: new Howl({
      src: [
        encodeWav(
          synth(
            [
              { freq: 392, ms: 110 },
              { freq: 523, ms: 110 },
              { freq: 659, ms: 110 },
              { freq: 784, ms: 110 },
              { freq: 1047, ms: 280 },
            ],
            "triangle",
            0.28,
          ),
        ),
      ],
      format: ["wav"],
      volume: 0.55,
    }),
  };
}

export const sound = {
  /** Inicializa os SFX (idempotente, client-only). */
  init() {
    ensureInit();
  },
  /** Sincroniza o mudo global do Howler com a preferência do visitante. */
  setMuted(muted: boolean) {
    if (typeof window === "undefined") return;
    ensureInit();
    Howler.mute(muted);
  },
  /** Toca um efeito (respeita o mudo global do Howler). */
  play(name: Sfx) {
    if (typeof window === "undefined") return;
    ensureInit();
    howls?.[name]?.play();
  },
};
