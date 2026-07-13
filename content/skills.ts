/**
 * Skill Tree — atributos do Hunter (baseados no CV real).
 * Nome/descrição de cada atributo vêm do i18n (skills.attrs.<id>);
 * aqui ficam a sigla, o valor da barra e a stack (nomes próprios).
 * Ref.: CLAUDE.md ("Skill Tree") e docs/PLANO.md §6.
 */

export interface SkillAttr {
  id: string;
  /** Sigla estilo status window. */
  key: "STR" | "AGI" | "INT" | "VIT" | "PER";
  /** Valor da barra (0–100). INT é o mais alto. */
  value: number;
  tech: string[];
  /** Cor de acento (hex → cianoAGI→roxo, seguindo a progressão). */
  color: string;
  /** Atributo destaque (barra termina em ouro). */
  highest?: boolean;
}

export const SKILLS: readonly SkillAttr[] = [
  {
    id: "str",
    key: "STR",
    value: 80,
    color: "#7cc4ff",
    tech: ["Node.js", "Express", "REST", "SQL"],
  },
  {
    id: "agi",
    key: "AGI",
    value: 78,
    color: "#93b0ff",
    tech: ["React", "TypeScript", "Styled Components"],
  },
  {
    id: "int",
    key: "INT",
    value: 92,
    color: "#c99bff",
    highest: true,
    tech: ["Microsoft Graph", "GLPI", "TrueNAS", "TOTVS"],
  },
  {
    id: "vit",
    key: "VIT",
    value: 75,
    color: "#b09cff",
    tech: ["Cypress", "CI/CD", "Git/GitLab", "Postman"],
  },
  { id: "per", key: "PER", value: 70, color: "#bd9bff", tech: ["Relatórios", "KPIs"] },
];

/** "Feitiços" — highlights reais do CV. Textos em skills.spells.<id>. */
export const SPELLS: readonly { id: string; icon: string; color: string }[] = [
  { id: "reduction90", icon: "⚡", color: "#38bdf8" },
  { id: "branchGuardian", icon: "🛡️", color: "#34d399" },
  { id: "artifactPurge", icon: "🗑️", color: "#f59e0b" },
  { id: "monarchVision", icon: "👁", color: "#f5c542" },
];
