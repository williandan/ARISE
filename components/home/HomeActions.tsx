"use client";

import { useTranslations } from "next-intl";
import { useGameStore } from "@/store/gameStore";

/**
 * CTAs da home. "Despertar" concede XP (Main Quest "awaken");
 * "ir direto aos projetos" respeita quem tem pressa (pula a intro).
 */
export function HomeActions() {
  const t = useTranslations("home");
  const completeQuest = useGameStore((s) => s.completeQuest);
  const skipIntro = useGameStore((s) => s.skipIntro);

  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
      <button
        type="button"
        onClick={() => completeQuest("awaken")}
        className="glow-cyan bg-system-cyan/10 text-system-cyan hover:bg-system-cyan/20 font-display rounded-md px-6 py-3 font-semibold tracking-wide transition-colors"
      >
        {t("enter")}
      </button>
      <button
        type="button"
        onClick={() => skipIntro()}
        className="text-ink-dim hover:text-ink font-display rounded-md px-6 py-3 font-medium tracking-wide transition-colors"
      >
        {t("skipToContent")}
      </button>
    </div>
  );
}
