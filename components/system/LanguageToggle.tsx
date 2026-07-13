"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { setLocale } from "@/i18n/actions";
import { locales, type Locale } from "@/i18n/config";
import { useGameStore } from "@/store/gameStore";

/** Toggle segmentado PT ⇄ EN (Side Quest "Poliglota"). */
export function LanguageToggle() {
  const locale = useLocale();
  const tc = useTranslations("common");
  const [isPending, startTransition] = useTransition();
  const completeQuest = useGameStore((s) => s.completeQuest);

  function choose(next: Locale) {
    if (next === locale || isPending) return;
    completeQuest("polyglot");
    startTransition(async () => {
      await setLocale(next);
    });
  }

  return (
    <div
      className="border-cyan/25 flex items-center overflow-hidden rounded-sm border bg-white/3"
      role="group"
      aria-label={tc("language")}
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => choose(l)}
            aria-pressed={active}
            className={`font-display px-2 py-1 text-[11px] font-semibold tracking-widest uppercase transition-colors ${
              active ? "bg-cyan text-bg-base" : "text-muted hover:text-ink"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
