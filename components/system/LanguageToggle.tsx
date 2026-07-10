"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { setLocale } from "@/i18n/actions";
import { locales, type Locale } from "@/i18n/config";
import { useGameStore } from "@/store/gameStore";

/** Toggle PT ⇄ EN (Side Quest "Poliglota"). */
export function LanguageToggle() {
  const locale = useLocale();
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
    <div className="flex items-center gap-1" role="group" aria-label="Idioma">
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => choose(l)}
            aria-pressed={active}
            className={`font-display rounded px-1.5 py-0.5 text-[11px] font-semibold tracking-widest uppercase transition-colors ${
              active ? "text-system-cyan text-glow-cyan" : "text-ink-faint hover:text-ink-dim"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
