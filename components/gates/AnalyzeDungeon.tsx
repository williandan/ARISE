"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useGameStore } from "@/store/gameStore";

/**
 * Botão "Analisar Dungeon" — revela os detalhes técnicos e conclui a
 * Main Quest "analyzeDungeon" (ler os detalhes de um projeto).
 */
export function AnalyzeDungeon() {
  const t = useTranslations("gates");
  const completeQuest = useGameStore((s) => s.completeQuest);
  const hasHydrated = useGameStore((s) => s.hasHydrated);
  const analyzed = useGameStore((s) => s.completedQuests.includes("analyzeDungeon"));
  const [open, setOpen] = useState(false);

  // Só reflete o estado persistido após reidratar (evita hydration mismatch no rótulo).
  const done = hasHydrated && analyzed;

  function analyze() {
    setOpen(true);
    completeQuest("analyzeDungeon");
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={analyze}
        aria-expanded={open}
        className="glow-cyan bg-system-cyan/10 text-system-cyan hover:bg-system-cyan/20 font-display rounded-md px-5 py-2.5 text-sm font-semibold tracking-widest uppercase transition-colors"
      >
        {done ? t("analyzeDone") : t("analyzeCta")}
      </button>

      {open && (
        <p className="text-ink-dim mt-4 max-w-xl text-sm leading-relaxed">{t("analyzeHint")}</p>
      )}
    </div>
  );
}
