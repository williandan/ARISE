"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { rankForLevel, xpForLevel, progressionColor } from "@/lib/leveling";
import { SoundToggle } from "./SoundToggle";
import { LanguageToggle } from "./LanguageToggle";
import { QuestLog } from "./QuestLog";

/**
 * HUD do VISITANTE — âncora de progressão, presente em toda página.
 * Começa E-rank/nível 1 (azul) e migra pra roxo conforme sobe.
 * Ref.: docs/PLANO.md §3.4 e CLAUDE.md ("HUD persistente").
 */
export function Hud() {
  const t = useTranslations("hud");
  const tr = useTranslations("ranks");
  const reduceMotion = useReducedMotion();
  const [questsOpen, setQuestsOpen] = useState(false);

  const hasHydrated = useGameStore((s) => s.hasHydrated);
  const level = useGameStore((s) => s.level);
  const xp = useGameStore((s) => s.xp);

  // Evita mismatch de hidratação: só mostra após reidratar do localStorage.
  if (!hasHydrated) return null;

  const rank = rankForLevel(level);
  const needed = xpForLevel(level);
  const pct = Math.min(100, Math.round((xp / needed) * 100));
  const color = progressionColor(level);

  return (
    <>
      <div className="fixed top-4 left-4 z-50 w-64 max-w-[calc(100vw-2rem)]">
        <div
          className="bg-bg-panel/85 glow-cyan p-3 backdrop-blur-sm"
          style={{
            clipPath:
              "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
          }}
        >
          {/* Cabeçalho: JOGADOR + rank */}
          <div className="flex items-center justify-between">
            <span className="font-display text-ink-dim text-[11px] font-semibold tracking-[0.25em] uppercase">
              {t("player")}
            </span>
            <span
              className="font-display glow-rank rounded px-1.5 text-sm font-bold"
              style={{ color }}
              aria-label={tr(rank.toLowerCase() as Lowercase<typeof rank>)}
            >
              {rank}
            </span>
          </div>

          {/* Nível + XP numérico */}
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-display text-ink text-lg font-bold">
              {t("levelShort")} {level}
            </span>
            <span className="text-ink-faint text-[11px] tabular-nums">
              {t("xpToNext", { current: xp, needed })}
            </span>
          </div>

          {/* Barra de XP (cor migra azul→roxo) */}
          <div className="bg-bg-base/80 mt-1.5 h-2 overflow-hidden rounded-full">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
            />
          </div>

          {/* Ações */}
          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setQuestsOpen(true)}
              className="font-display text-system-cyan hover:text-system-cyan-bright rounded text-[11px] font-semibold tracking-widest uppercase transition-colors"
            >
              {t("questLog")}
            </button>
            <div className="flex items-center gap-3">
              <SoundToggle />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>

      <QuestLog open={questsOpen} onClose={() => setQuestsOpen(false)} />
    </>
  );
}
