/**
 * Gate D — "O Portal Menor": armazenamento em memória (DEMO).
 * Efêmero — reseta ao reiniciar o servidor. Uma produção usaria um banco real.
 * Guardado no globalThis para sobreviver a hot-reloads do dev.
 */

export interface PortalUser {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
}

export interface PortalItem {
  id: string;
  userId: string;
  title: string;
  note: string;
  createdAt: number;
}

interface PortalStore {
  users: Map<string, PortalUser>; // chave: email (minúsculo)
  items: PortalItem[];
}

const globalRef = globalThis as unknown as { __arisePortalStore?: PortalStore };

export const store: PortalStore =
  globalRef.__arisePortalStore ?? (globalRef.__arisePortalStore = { users: new Map(), items: [] });
