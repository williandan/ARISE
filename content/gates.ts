import type { Rank } from "@/lib/leveling";

/**
 * Dados ESTRUTURAIS dos Gates (projetos). Os textos legíveis (nome, tagline,
 * resumo) vivem no i18n em `gates.items.<id>`. Aqui só o que não se traduz:
 * id, slug de rota, rank, stack e status.
 * Ref.: CLAUDE.md ("Os Gates") e docs/PLANO.md §5.
 */

export type GateStatus = "planned" | "wip" | "live";

export interface Gate {
  /** Chave de i18n (gates.items.<id>). */
  id: string;
  /** Slug de rota (/gates/<slug>). */
  slug: string;
  rank: Rank;
  /** Stack — nomes próprios, não traduzidos. */
  tech: string[];
  /** Dificuldade 1–5 (pips de diamante no card). */
  difficulty: number;
  status: GateStatus;
  /** Gate final (marca "BOSS"). */
  boss?: boolean;
  repoUrl?: string;
  demoUrl?: string;
}

export const GATES: readonly Gate[] = [
  {
    id: "awakening",
    slug: "daily-quest-tracker",
    rank: "E",
    tech: ["React", "Vite", "CSS"],
    difficulty: 1,
    status: "planned",
  },
  {
    id: "lesserPortal",
    slug: "api-rest-crud-jwt",
    rank: "D",
    tech: ["Node", "JWT", "SQL"],
    difficulty: 2,
    status: "planned",
  },
  {
    id: "integrationDungeon",
    slug: "dashboard-integracoes",
    rank: "C",
    tech: ["React", "TypeScript", "REST"],
    difficulty: 3,
    status: "planned",
  },
  {
    id: "realtimeBattle",
    slug: "tempo-real-websockets",
    rank: "B",
    tech: ["Socket.io", "Node", "React"],
    difficulty: 4,
    status: "planned",
  },
  {
    id: "automatedForge",
    slug: "automacao-relatorios",
    rank: "A",
    tech: ["Node", "Cypress", "CI/CD"],
    difficulty: 5,
    status: "planned",
  },
  {
    id: "finalBoss",
    slug: "saas-full-stack",
    rank: "S",
    tech: ["Next.js", "PostgreSQL", "E2E"],
    difficulty: 5,
    status: "planned",
    boss: true,
  },
];

export function getGateBySlug(slug: string): Gate | undefined {
  return GATES.find((g) => g.slug === slug);
}
