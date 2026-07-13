"use client";

import { useTranslations } from "next-intl";
import { useGameStore } from "@/store/gameStore";
import { useUiStore } from "@/store/uiStore";
import { rankForLevel, xpForLevel, progressionColor } from "@/lib/leveling";
import { RANK_HEX } from "@/lib/colors";
import { Panel } from "@/components/ui/Panel";
import { Hexagon } from "@/components/ui/Hexagon";
import { Bar } from "@/components/ui/Bar";

/** HUD do visitante (coluna direita da Home). */
export function VisitorHud() {
  const t = useTranslations("profile");
  const th = useTranslations("hud");
  const openQuestLog = useUiStore((s) => s.openQuestLog);

  const hasHydrated = useGameStore((s) => s.hasHydrated);
  const level = useGameStore((s) => (s.hasHydrated ? s.level : 1));
  const xp = useGameStore((s) => (s.hasHydrated ? s.xp : 0));

  const rank = rankForLevel(level);
  const needed = xpForLevel(level);
  const pct = Math.min(100, Math.round((xp / needed) * 100));
  const color = hasHydrated ? progressionColor(level) : RANK_HEX.E;

  return (
    <Panel tone="cyan" cut={18}>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <span className="font-display text-cyan text-[11px] font-semibold tracking-[0.25em]">
            <span
              className="anim-pulse mr-2 inline-block h-2 w-2 rounded-full"
              style={{ background: color }}
            />
            {t("playerVisitor")}
          </span>
          <span
            className="font-display rounded-sm border px-2 py-0.5 text-[10px] font-bold tracking-widest"
            style={{ color, borderColor: `${color}66` }}
          >
            {th("rank")} {rank}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Hexagon label={rank} color={color} size={48} labelClassName="text-xl" />
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-muted-2 text-[10px] font-semibold tracking-[0.2em] uppercase">
                {th("level")}
              </span>
              <span className="font-numeric text-ink text-2xl leading-none font-bold">
                {String(level).padStart(2, "0")}
              </span>
            </div>
            <Bar value={pct} fill={color} height={8} glow={`0 0 10px ${color}`} className="mt-2" />
            <div className="text-muted-2 font-numeric mt-1 text-[11px]">
              {th("xpToNext", { current: xp, needed })}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={openQuestLog}
          className="font-display text-cyan hover:bg-cyan/10 self-start rounded-sm border px-4 py-2 text-[11px] font-semibold tracking-widest uppercase transition-colors"
          style={{ borderColor: "rgba(56,189,248,0.35)" }}
        >
          ▸ {th("questLog")}
        </button>
      </div>
    </Panel>
  );
}
