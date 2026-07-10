/**
 * Catálogo de missões (Quests) do Sistema.
 * Os textos ficam no i18n (messages/*.json → quests.items.<id>).
 * Ref.: docs/PLANO.md seção 2.4.
 */

export type QuestKind = "main" | "side";

export interface QuestDef {
  /** Id estável, sem pontos (usado como chave de i18n e no store). */
  id: string;
  kind: QuestKind;
  /** Recompensa de XP ao concluir. */
  xp: number;
}

export const QUESTS: readonly QuestDef[] = [
  // Missões principais — guiam o percurso
  { id: "awaken", kind: "main", xp: 40 },
  { id: "firstGate", kind: "main", xp: 120 },
  { id: "analyzeDungeon", kind: "main", xp: 150 },
  { id: "skills", kind: "main", xp: 120 },
  { id: "boss", kind: "main", xp: 300 },
  { id: "summon", kind: "main", xp: 100 },
  // Missões secundárias — engajamento
  { id: "polyglot", kind: "side", xp: 30 },
  { id: "silentHunter", kind: "side", xp: 30 },
  { id: "explorer", kind: "side", xp: 60 },
  { id: "monarchSecret", kind: "side", xp: 100 },
] as const;

export const MAIN_QUESTS = QUESTS.filter((q) => q.kind === "main");
export const SIDE_QUESTS = QUESTS.filter((q) => q.kind === "side");

export function getQuest(id: string): QuestDef | undefined {
  return QUESTS.find((q) => q.id === id);
}
