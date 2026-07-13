"use client";

import { useTranslations } from "next-intl";
import { useGameStore } from "@/store/gameStore";
import { RANKS, rankForLevel, rankIndex, type Rank } from "@/lib/leveling";
import { RANK_HEX } from "@/lib/colors";
import { Panel } from "@/components/ui/Panel";
import { Hexagon } from "@/components/ui/Hexagon";

/**
 * Escalada do VISITANTE (S no topo → E embaixo). Ranks acima do atual ficam
 * trancados; o rank atual recebe "VOCÊ". Ref.: handoff "Rank Path panel".
 */
export function RankPath() {
  const t = useTranslations("profile");
  const tr = useTranslations("ranks");
  const level = useGameStore((s) => (s.hasHydrated ? s.level : 1));
  const currentIdx = rankIndex(rankForLevel(level));

  const rows = [...RANKS].reverse(); // S, A, B, C, D, E

  return (
    <Panel tone="cyanPurple" cut={18} className="flex-1">
      <div className="flex h-full flex-col gap-4 p-6">
        <div>
          <h3 className="font-display text-ink text-xs font-semibold tracking-[0.3em] uppercase">
            {t("rankPathTitle")}
          </h3>
          <p className="text-muted-2 mt-0.5 text-[11px]">{t("rankPathSub")}</p>
        </div>

        <ol className="flex flex-1 flex-col justify-between gap-2">
          {rows.map((rank: Rank) => {
            const idx = rankIndex(rank);
            const isCurrent = idx === currentIdx;
            const isLocked = idx > currentIdx;
            return (
              <li
                key={rank}
                className="flex items-center gap-3 rounded-sm px-2 py-1.5"
                style={
                  isCurrent
                    ? {
                        background: "rgba(56,189,248,0.08)",
                        border: "1px solid rgba(56,189,248,0.4)",
                      }
                    : { opacity: isLocked ? 0.55 : 0.8 }
                }
              >
                <Hexagon
                  label={rank}
                  color={RANK_HEX[rank]}
                  size={30}
                  locked={isLocked}
                  labelClassName="text-sm"
                />
                <div className="flex-1">
                  <span className="font-numeric text-ink text-sm font-bold">{rank}</span>
                  <span className="text-muted ml-2 text-[11px] tracking-wide uppercase">
                    {tr(`meaning.${rank.toLowerCase()}`)}
                  </span>
                </div>
                {isCurrent ? (
                  <span className="font-display text-cyan text-glow-cyan text-[10px] font-bold tracking-widest">
                    {t("you")}
                  </span>
                ) : isLocked ? (
                  <span className="text-muted-2 anim-lockpulse text-xs" aria-hidden>
                    🔒
                  </span>
                ) : (
                  <span className="text-success text-xs" aria-hidden>
                    ✓
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </Panel>
  );
}
