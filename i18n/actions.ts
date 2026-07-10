"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { isLocale, LOCALE_COOKIE, type Locale } from "./config";

/**
 * Persiste o idioma escolhido pelo visitante no cookie e revalida a árvore.
 * Usado pelo toggle de idioma (Side Quest "Poliglota").
 */
export async function setLocale(locale: Locale) {
  if (!isLocale(locale)) return;

  const store = await cookies();
  store.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 ano
    sameSite: "lax",
  });

  revalidatePath("/", "layout");
}
