"use client";

import { useTranslations } from "next-intl";
import { useGameStore } from "@/store/gameStore";
import { MAIN_QUESTS } from "@/lib/quests";
import { Panel } from "@/components/ui/Panel";

/** Card "Missão Ativa" — próxima Main Quest incompleta + progresso. */
export function ActiveQuest() {
  const t = useTranslations("profile");
  const tq = useTranslations("quests");
  // Seleciona a referência estável direto (INITIAL [] antes de reidratar) —
  // retornar um `[]` novo aqui causaria loop no getServerSnapshot do zustand.
  const completed = useGameStore((s) => s.completedQuests);

  const total = MAIN_QUESTS.length;
  const doneCount = MAIN_QUESTS.filter((q) => completed.includes(q.id)).length;
  const active = MAIN_QUESTS.find((q) => !completed.includes(q.id));
  const pct = Math.round((doneCount / total) * 100);

  return (
    <Panel tone="gold" cut={16}>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <span className="font-display text-gold text-[11px] font-semibold tracking-[0.25em]">
            ◆ {t("activeQuest")}
          </span>
          {active && (
            <span className="font-numeric text-gold shrink-0 text-xs font-bold">
              {tq("reward", { xp: active.xp })}
            </span>
          )}
        </div>

        <h3 className="font-display text-ink text-lg font-bold tracking-wide">
          {active ? tq(`items.${active.id}.title`) : t("allDone")}
        </h3>

        <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full transition-[width] duration-500"
            style={{ width: `${pct}%`, background: "linear-gradient(90deg, #c99bff, #d9b64f)" }}
          />
        </div>

        <p className="text-muted-2 text-[11px]">{t("questProgress", { done: doneCount, total })}</p>
      </div>
    </Panel>
  );
}
