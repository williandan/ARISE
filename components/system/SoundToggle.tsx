"use client";

import { useTranslations } from "next-intl";
import { useGameStore } from "@/store/gameStore";

/** Botão de mudo/desmudo (Side Quest "Caçador silencioso"). Começa mudo. */
export function SoundToggle() {
  const t = useTranslations("hud");
  const muted = useGameStore((s) => s.muted);
  const toggleMute = useGameStore((s) => s.toggleMute);
  const completeQuest = useGameStore((s) => s.completeQuest);

  function onClick() {
    toggleMute();
    completeQuest("silentHunter");
  }

  const label = muted ? t("soundOn") : t("soundOff");

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="text-ink-dim hover:text-system-cyan text-sm transition-colors"
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
