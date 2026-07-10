/**
 * Configuração de idiomas do ARISE (PT/EN).
 * Site bilíngue sem prefixo de rota — o idioma é escolhido pelo visitante
 * (Side Quest "Poliglota") e persistido num cookie.
 */
export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

/** Nome do cookie onde o idioma escolhido é persistido. */
export const LOCALE_COOKIE = "ARISE_LOCALE";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
