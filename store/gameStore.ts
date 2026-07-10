import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { rankForLevel, xpForLevel, type Rank } from "@/lib/leveling";
import { getQuest } from "@/lib/quests";
import { useNotificationsStore, type SystemNotification } from "./notificationsStore";

/**
 * Estado do jogo do VISITANTE (o Jogador).
 * Persistido em localStorage — o visitante volta de onde parou.
 * Ref.: docs/PLANO.md seções 2.2, 2.6 e CLAUDE.md ("Engine do Sistema").
 */

interface GameState {
  /** Indica que a store já reidratou do localStorage (evita mismatch de SSR). */
  hasHydrated: boolean;

  // --- progressão do visitante ---
  level: number;
  /** XP acumulado DENTRO do nível atual. */
  xp: number;
  completedQuests: string[];

  // --- preferências ---
  muted: boolean;
  /** Visitante optou por pular a intro (tela de boot). */
  introSkipped: boolean;
  /** Já viu a tela de boot pelo menos uma vez. */
  bootSeen: boolean;

  // --- ações ---
  addXp: (amount: number) => void;
  completeQuest: (id: string) => void;
  isQuestComplete: (id: string) => boolean;
  toggleMute: () => void;
  setMuted: (muted: boolean) => void;
  skipIntro: () => void;
  markBootSeen: () => void;
  setHasHydrated: (value: boolean) => void;
  reset: () => void;
}

const INITIAL = {
  level: 1,
  xp: 0,
  completedQuests: [] as string[],
  muted: true, // começa MUDO (nunca autoplay)
  introSkipped: false,
  bootSeen: false,
};

function notify(notification: Omit<SystemNotification, "id">) {
  useNotificationsStore.getState().push(notification);
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      ...INITIAL,

      addXp: (amount) => {
        if (amount <= 0) return;
        const prevLevel = get().level;
        const prevRank = rankForLevel(prevLevel);

        let { level, xp } = get();
        xp += amount;
        let leveledUp = false;

        // Sobe de nível enquanto houver XP suficiente.
        while (xp >= xpForLevel(level)) {
          xp -= xpForLevel(level);
          level += 1;
          leveledUp = true;
        }

        set({ level, xp });

        if (leveledUp) {
          notify({ kind: "levelUp", level });
          const newRank = rankForLevel(level);
          if (newRank !== prevRank) {
            notify({ kind: "rankUp", rank: newRank });
          }
        }
      },

      completeQuest: (id) => {
        const { completedQuests } = get();
        if (completedQuests.includes(id)) return;

        const def = getQuest(id);
        const xp = def?.xp ?? 0;

        set({ completedQuests: [...completedQuests, id] });
        notify({ kind: "quest", questId: id, xp });
        get().addXp(xp);
      },

      isQuestComplete: (id) => get().completedQuests.includes(id),

      toggleMute: () => set((s) => ({ muted: !s.muted })),
      setMuted: (muted) => set({ muted }),
      skipIntro: () => set({ introSkipped: true, bootSeen: true }),
      markBootSeen: () => set({ bootSeen: true }),
      setHasHydrated: (value) => set({ hasHydrated: value }),

      reset: () => set({ ...INITIAL }),
    }),
    {
      name: "arise-game",
      storage: createJSONStorage(() => localStorage),
      // Só persiste progresso e preferências (não flags voláteis).
      partialize: (state) => ({
        level: state.level,
        xp: state.xp,
        completedQuests: state.completedQuests,
        muted: state.muted,
        introSkipped: state.introSkipped,
        bootSeen: state.bootSeen,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

/** Seletor auxiliar: rank atual do visitante. */
export function selectRank(state: GameState): Rank {
  return rankForLevel(state.level);
}
