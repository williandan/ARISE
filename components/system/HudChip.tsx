"use client";

import { useTranslations } from "next-intl";
import { useGameStore } from "@/store/gameStore";
import { rankForLevel, xpForLevel, progressionColor } from "@/lib/leveling";
import { RANK_HEX } from "@/lib/colors";
import { Panel } from "@/components/ui/Panel";
import { Hexagon } from "@/components/ui/Hexagon";

/** Pílula compacta de status do VISITANTE (hex + LEVEL + barra XP + RANK). */
export function HudChip() {
  const t = useTranslations("hud");
  const hasHydrated = useGameStore((s) => s.hasHydrated);
  const level = useGameStore((s) => (s.hasHydrated ? s.level : 1));
  const xp = useGameStore((s) => (s.hasHydrated ? s.xp : 0));

  // Placeholder estável até reidratar (evita mismatch/flash).
  const rank = rankForLevel(level);
  const needed = xpForLevel(level);
  const pct = Math.min(100, Math.round((xp / needed) * 100));
  const color = hasHydrated ? progressionColor(level) : RANK_HEX.E;

  return (
    <Panel tone="cyan" cut={10} className="shrink-0">
      <div className="flex items-center gap-3 py-1.5 pr-3 pl-2">
        <Hexagon label={rank} color={RANK_HEX[rank]} size={30} labelClassName="text-sm" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-display text-muted-2 text-[9px] font-semibold tracking-[0.2em] uppercase">
              {t("level")}
            </span>
            <span className="font-numeric text-ink text-sm leading-none font-bold">
              {String(level).padStart(2, "0")}
            </span>
          </div>
          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{ width: `${pct}%`, backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
            />
          </div>
        </div>
        <span
          className="font-display rounded-sm border px-1.5 py-0.5 text-[10px] font-bold tracking-widest"
          style={{ color, borderColor: `${color}66` }}
        >
          {t("rank")} {rank}
        </span>
      </div>
    </Panel>
  );
}
