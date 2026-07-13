/**
 * Seções navegáveis do site. Visitar todas conclui a Side Quest "Explorador".
 */
export const SECTIONS = ["home", "gates", "skills", "about", "contact"] as const;

export type Section = (typeof SECTIONS)[number];
