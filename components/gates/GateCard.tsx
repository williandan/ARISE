"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useGameStore } from "@/store/gameStore";
import { isGateUnlocked, RANK_MIN_LEVEL } from "@/lib/leveling";
import type { Gate } from "@/content/gates";
import { RankBadge } from "@/components/ui/RankBadge";

/**
 * Card de um Gate na grade. Gates de rank alto aparecem trancados com cadeado
 * até o visitante ter nível — mas sempre há "ver mesmo assim" (não trava recrutador).
 * Ref.: docs/PLANO.md §2.5.
 */
export function GateCard({ gate }: { gate: Gate }) {
  const t = useTranslations("gates");
  const hasHydrated = useGameStore((s) => s.hasHydrated);
  const level = useGameStore((s) => s.level);

  // Antes de reidratar, assume o pior caso (nível 1) — evita "piscar" desbloqueado.
  const unlocked = hasHydrated && isGateUnlocked(level, gate.rank);
  const href = `/gates/${gate.slug}`;

  return (
    <Link
      href={href}
      className="group bg-bg-panel/60 focus-visible:ring-system-cyan/60 relative flex flex-col gap-3 rounded-lg border border-white/5 p-5 transition-colors hover:border-white/15 focus-visible:ring-2 focus-visible:outline-none"
    >
      <div className="flex items-start justify-between gap-3">
        <RankBadge rank={gate.rank} locked={!unlocked} />
        <span className="text-ink-faint text-[11px] tracking-widest uppercase">
          {t(`status.${gate.status}`)}
        </span>
      </div>

      <div>
        <h2 className="font-display text-ink text-lg font-bold tracking-wide">
          {t(`items.${gate.id}.name`)}
        </h2>
        <p className="text-system-cyan text-sm">{t(`items.${gate.id}.tagline`)}</p>
      </div>

      <ul className="flex flex-wrap gap-1.5">
        {gate.tech.map((tech) => (
          <li
            key={tech}
            className="bg-bg-base/70 text-ink-dim rounded border border-white/5 px-1.5 py-0.5 text-[11px]"
          >
            {tech}
          </li>
        ))}
      </ul>

      <span className="font-display mt-1 text-xs font-semibold tracking-widest uppercase">
        {unlocked ? (
          <span className="text-system-cyan group-hover:text-glow-cyan">{t("open")} →</span>
        ) : (
          <span className="text-ink-faint">
            🔒 {t("unlockAt", { rank: gate.rank, level: RANK_MIN_LEVEL[gate.rank] })}
            <span className="text-ink-dim group-hover:text-ink ml-2">· {t("viewAnyway")}</span>
          </span>
        )}
      </span>
    </Link>
  );
}
