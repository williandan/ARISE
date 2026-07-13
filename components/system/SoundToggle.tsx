"use client";

import { useTranslations } from "next-intl";
import { useGameStore } from "@/store/gameStore";

/** Botão quadrado de mudo/desmudo (Side Quest "Caçador silencioso"). Começa mudo. */
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
      className="border-cyan/25 text-muted hover:text-cyan flex h-8 w-8 items-center justify-center rounded-sm border bg-white/3 transition-colors"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 9v6h4l5 4V5L8 9H4z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {muted ? (
          <line
            x1="16"
            y1="8"
            x2="22"
            y2="16"
            stroke="#ff6b6b"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M16 9a4 4 0 0 1 0 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        )}
      </svg>
    </button>
  );
}
