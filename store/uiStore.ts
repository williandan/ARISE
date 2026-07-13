import { create } from "zustand";

/** Estado de UI efêmero (não persistido) — ex.: Quest Log aberto. */
interface UiState {
  questLogOpen: boolean;
  openQuestLog: () => void;
  closeQuestLog: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  questLogOpen: false,
  openQuestLog: () => set({ questLogOpen: true }),
  closeQuestLog: () => set({ questLogOpen: false }),
}));
