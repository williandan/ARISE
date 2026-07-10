"use client";

import { useTranslations } from "next-intl";
import { useGameStore } from "@/store/gameStore";
import { RANKS, rankForLevel, rankIndex } from "@/lib/leveling";
import { RankBadge } from "@/components/ui/RankBadge";

/**
 * Escalada do VISITANTE (E embaixo → S no topo). Marca o rank atual com "VOCÊ"
 * e tranca os superiores. Distinto do Monarca (que é fixo em S).
 * Ref.: docs/PLANO.md §2.2.
 */
export function RankPath() {
  const t = useTranslations("profile");
  // Antes de reidratar, assume nível 1 (igual ao SSR) — evita hydration mismatch.
  const level = useGameStore((s) => (s.hasHydrated ? s.level : 1));
  const current = rankForLevel(level);
  const currentIdx = rankIndex(current);

  return (
    <section aria-label={t("rankPathTitle")} className="w-full max-w-md">
      <h3 className="font-display text-ink-dim mb-3 text-center text-xs font-semibold tracking-[0.3em] uppercase">
        {t("rankPathTitle")}
      </h3>
      <ol className="flex items-end justify-center gap-2 sm:gap-3">
        {RANKS.map((rank, idx) => {
          const isCurrent = idx === currentIdx;
          const isLocked = idx > currentIdx;
          return (
            <li key={rank} className="flex flex-col items-center gap-1.5">
              <RankBadge
                rank={rank}
                size={isCurrent ? "md" : "sm"}
                locked={isLocked}
                className={isCurrent ? "ring-system-cyan ring-2" : ""}
              />
              {isCurrent && (
                <span className="font-display text-system-cyan text-glow-cyan text-[10px] font-bold tracking-widest">
                  {t("you")}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
