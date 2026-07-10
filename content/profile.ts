import { GATES } from "./gates";
import { SKILLS } from "./skills";

/**
 * Perfil do MONARCA (Willian, dono do site) — S-rank fixo / MAX.
 * Identidade estática, distinta do visitante (que sobe no HUD).
 * Ref.: CLAUDE.md ("Dois papéis").
 */
export const MONARCH = {
  handle: "Willian Daniel",
  rank: "S" as const,
  /** Chaves de i18n dos títulos (profile.titles.<key>). */
  titleKeys: ["monarch", "sovereign", "max"] as const,
  links: {
    email: "willian_daniel_333@hotmail.com",
    github: "https://github.com/williandan",
  },
  stats: {
    /** Total de Gates catalogados. */
    gates: GATES.length,
    /** Atributos da Skill Tree. */
    skills: SKILLS.length,
  },
} as const;
