import { create } from "zustand";

/**
 * Fila de notificações "janela azul" (toasts do Sistema).
 * Estado transiente — NÃO é persistido.
 */

export type NotificationKind = "quest" | "levelUp" | "rankUp" | "info";

export interface SystemNotification {
  id: string;
  kind: NotificationKind;
  /** Missão associada (kind === "quest"). */
  questId?: string;
  /** XP concedido (kind === "quest"). */
  xp?: number;
  /** Novo nível (kind === "levelUp"). */
  level?: number;
  /** Novo rank (kind === "rankUp"). */
  rank?: string;
  /** Mensagem já traduzida (kind === "info", ex.: "bem-vindo de volta"). */
  message?: string;
}

interface NotificationsState {
  items: SystemNotification[];
  push: (notification: Omit<SystemNotification, "id">) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

let counter = 0;
function nextId(): string {
  counter += 1;
  return `n${counter}`;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  items: [],
  push: (notification) => {
    const id = nextId();
    set((state) => ({ items: [...state.items, { ...notification, id }] }));
    return id;
  },
  dismiss: (id) => set((state) => ({ items: state.items.filter((n) => n.id !== id) })),
  clear: () => set({ items: [] }),
}));
