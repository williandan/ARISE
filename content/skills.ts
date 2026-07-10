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
  /** Valor da barra (0–100). Ilustrativo; INT é o mais alto. */
  value: number;
  tech: string[];
}

export const SKILLS: readonly SkillAttr[] = [
  { id: "str", key: "STR", value: 78, tech: ["Node.js", "Express", "REST", "SQL"] },
  { id: "agi", key: "AGI", value: 82, tech: ["React", "TypeScript", "Styled Components"] },
  {
    id: "int",
    key: "INT",
    value: 95,
    tech: ["Microsoft Graph", "TrueNAS", "GLPI", "TOTVS", "Skymail"],
  },
  {
    id: "vit",
    key: "VIT",
    value: 80,
    tech: ["Cypress", "CI/CD", "Git/GitLab", "Postman"],
  },
  { id: "per", key: "PER", value: 74, tech: ["Relatórios", "KPIs"] },
];

/** "Feitiços" — highlights reais do CV. Textos em skills.spells.<id>. */
export const SPELLS: readonly { id: string; icon: string }[] = [
  { id: "reduction90", icon: "⚡" },
  { id: "branchGuardian", icon: "🛡️" },
  { id: "artifactPurge", icon: "🗑️" },
  { id: "monarchVision", icon: "📊" },
];
