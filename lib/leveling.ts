/**
 * Modelo de progressão do VISITANTE (o Jogador).
 * Começa em Nível 1 / Rank E e sobe até Rank S.
 * Ref.: docs/PLANO.md seção 2.2 (níveis e ranks).
 */

export const RANKS = ["E", "D", "C", "B", "A", "S"] as const;
export type Rank = (typeof RANKS)[number];

/** Nível a partir do qual o Rank S é atingido (topo da escalada). */
export const MAX_RANK_LEVEL = 25;

/** Limiares de nível → rank (PLANO 2.2). */
const RANK_THRESHOLDS: { level: number; rank: Rank }[] = [
  { level: 25, rank: "S" },
  { level: 20, rank: "A" },
  { level: 15, rank: "B" },
  { level: 10, rank: "C" },
  { level: 5, rank: "D" },
  { level: 1, rank: "E" },
];

/** Rank correspondente a um nível. */
export function rankForLevel(level: number): Rank {
  for (const { level: threshold, rank } of RANK_THRESHOLDS) {
    if (level >= threshold) return rank;
  }
  return "E";
}

/**
 * XP necessário para AVANÇAR do nível informado para o próximo.
 * Curva suave e crescente (L1: 40, L2: 60, L3: 80, ...).
 */
export function xpForLevel(level: number): number {
  return 40 + (level - 1) * 20;
}

/**
 * Razão de progressão global do visitante (0 em E/nível 1, 1 em S).
 * Usada para migrar a cor do HUD de azul (ciano) → roxo (Monarca).
 */
export function progressionRatio(level: number): number {
  const ratio = (level - 1) / (MAX_RANK_LEVEL - 1);
  return Math.min(1, Math.max(0, ratio));
}

/**
 * Cor do HUD interpolada azul→roxo conforme a progressão.
 * Retorna uma expressão CSS `color-mix` (suportada pelos navegadores-alvo).
 */
export function progressionColor(level: number): string {
  const pct = Math.round(progressionRatio(level) * 100);
  return `color-mix(in srgb, var(--color-monarch) ${pct}%, var(--color-system-cyan))`;
}

/** Índice do rank (E=0 ... S=5) — útil para ordenar/comparar Gates. */
export function rankIndex(rank: Rank): number {
  return RANKS.indexOf(rank);
}

/** Nível mínimo do visitante para cada rank (PLANO 2.2). */
export const RANK_MIN_LEVEL: Record<Rank, number> = {
  E: 1,
  D: 5,
  C: 10,
  B: 15,
  A: 20,
  S: 25,
};

/** Um Gate de rank `gateRank` está desbloqueado para um visitante neste nível? */
export function isGateUnlocked(visitorLevel: number, gateRank: Rank): boolean {
  return visitorLevel >= RANK_MIN_LEVEL[gateRank];
}
