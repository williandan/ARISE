import type { Rank } from "./leveling";

/**
 * Valores hex do design system para uso em estilos inline (JS).
 * Espelham os tokens do Tailwind em app/globals.css.
 */

export const RANK_HEX: Record<Rank, string> = {
  E: "#c5ccd8",
  D: "#34d399",
  C: "#38bdf8",
  B: "#8b5cf6",
  A: "#f59e0b",
  S: "#f5c542",
};

export const CYAN = "#38bdf8";
export const CYAN_LIGHT = "#7cc4ff";
export const CYAN_DEEP = "#2f7fd6";

export const MONARCH = "#a855f7";
export const MONARCH_LIGHT = "#c99bff";
export const MONARCH_DEEP = "#7c3aed";

export const GOLD = "#f5c542";
export const GOLD_DEEP = "#d9b64f";

/** Gradiente de fundo por tema (ciano = Sistema, roxo = Monarca). */
export const BG_CYAN =
  "radial-gradient(120% 90% at 50% -12%, #0c1526 0%, #070c16 45%, #05060a 100%)";
export const BG_PURPLE =
  "radial-gradient(130% 90% at 50% -10%, #160f28 0%, #0b0916 46%, #06050a 100%)";
