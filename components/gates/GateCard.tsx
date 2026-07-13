"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useGameStore } from "@/store/gameStore";
import { isGateUnlocked } from "@/lib/leveling";
import type { Gate } from "@/content/gates";
import { RANK_HEX } from "@/lib/colors";
import { Panel } from "@/components/ui/Panel";
import { Hexagon } from "@/components/ui/Hexagon";

const ENTER_CUT =
  "polygon(9px 0, 100% 0, 100% calc(100% - 9px), calc(100% - 9px) 100%, 0 100%, 0 9px)";

/** Card de um Gate — dungeon com rank; alto rank trancado até subir de nível. */
export function GateCard({ gate, index }: { gate: Gate; index: number }) {
  const t = useTranslations("gates");
  const hasHydrated = useGameStore((s) => s.hasHydrated);
  const level = useGameStore((s) => s.level);

  const unlocked = hasHydrated && isGateUnlocked(level, gate.rank);
  const color = RANK_HEX[gate.rank];
  const href = `/gates/${gate.slug}`;
  const num = String(index + 1).padStart(2, "0");

  const border = `linear-gradient(160deg, ${color}, color-mix(in srgb, ${color} 40%, #05060a))`;

  return (
    <Link
      href={href}
      className="group block h-full transition-transform duration-200 hover:-translate-y-1"
    >
      <Panel
        cut={22}
        border={unlocked ? border : `linear-gradient(160deg, ${color}55, ${color}22)`}
        glow={unlocked ? `0 0 26px -8px ${color}` : "none"}
        className="h-full"
      >
        <div
          className="relative flex h-full flex-col gap-3 p-5"
          style={{ opacity: unlocked ? 1 : 0.82 }}
        >
          {/* hatch nos trancados */}
          {!unlocked && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: `repeating-linear-gradient(45deg, transparent 0 18px, ${color}0d 18px 20px)`,
              }}
            />
          )}

          {/* hexágono do canto */}
          <div className="absolute top-4 right-4">
            <Hexagon
              label={gate.rank}
              sub="RANK"
              color={color}
              size={46}
              locked={!unlocked}
              labelClassName="text-lg"
            />
          </div>

          <span
            className="font-display text-[10px] font-semibold tracking-[0.3em] uppercase"
            style={{ color: `${color}bb` }}
          >
            {t("gate")} {num}
            {gate.boss && <span className="text-rank-s ml-2">· {t("boss")}</span>}
          </span>

          <h2 className="font-display text-ink mr-14 text-xl leading-tight font-bold tracking-wide">
            {t(`items.${gate.id}.name`)}
          </h2>

          <p className="text-muted mr-2 text-[13px] leading-snug">
            {t(`items.${gate.id}.summary`)}
          </p>

          <ul className="flex flex-wrap gap-1.5">
            {gate.tech.map((tech) => (
              <li
                key={tech}
                className="font-display rounded-sm border px-1.5 py-0.5 text-[11px]"
                style={{ color, borderColor: `${color}4d`, background: `${color}14` }}
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* rodapé */}
          <div className="mt-auto flex items-end justify-between gap-2 pt-2">
            {unlocked ? (
              <>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-2 text-[9px] tracking-widest">{t("diff")}</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="inline-block h-2 w-2 rotate-45"
                        style={{
                          background: i < gate.difficulty ? color : "rgba(255,255,255,0.1)",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <span
                  className="font-display text-[11px] font-bold tracking-widest text-[#05060a]"
                  style={{ clipPath: ENTER_CUT, background: border, padding: "7px 14px" }}
                >
                  {t("enter")} ▸
                </span>
              </>
            ) : (
              <div className="flex w-full items-center justify-between gap-2">
                <span className="anim-lockpulse text-lg" style={{ color }} aria-hidden>
                  🔒
                </span>
                <span
                  className="font-display text-right text-[10px] leading-tight font-semibold tracking-wide"
                  style={{ color: `${color}cc` }}
                >
                  {t("reachRank", { rank: gate.rank })}
                  <span className="text-muted-2 group-hover:text-muted block underline">
                    {t("viewAnyway")} ▸
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      </Panel>
    </Link>
  );
}
