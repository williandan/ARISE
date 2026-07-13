"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MAIN_QUESTS, SIDE_QUESTS, type QuestDef } from "@/lib/quests";
import { useGameStore } from "@/store/gameStore";
import { useUiStore } from "@/store/uiStore";
import { Panel } from "@/components/ui/Panel";

const TITLE_ID = "quest-log-title";

/** Registro de Missões (Quest Log) — controlado pelo uiStore. */
export function QuestLog() {
  const t = useTranslations("quests");
  const tc = useTranslations("common");
  const reduceMotion = useReducedMotion();
  const open = useUiStore((s) => s.questLogOpen);
  const onClose = useUiStore((s) => s.closeQuestLog);
  const completedQuests = useGameStore((s) => s.completedQuests);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  const fade = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 12, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.98 },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby={TITLE_ID}
        >
          <motion.div className="w-full max-w-md" {...fade} onClick={(e) => e.stopPropagation()}>
            <Panel tone="cyanPurple" cut={18}>
              <div className="p-5">
                <div className="border-cyan/20 mb-4 flex items-center justify-between border-b pb-3">
                  <h2
                    id={TITLE_ID}
                    className="font-display text-cyan text-sm font-semibold tracking-[0.25em] uppercase"
                  >
                    ◆ {t("logTitle")}
                  </h2>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    aria-label={tc("close")}
                    className="text-muted hover:text-ink"
                  >
                    ✕
                  </button>
                </div>
                <div className="max-h-[70vh] space-y-5 overflow-y-auto pr-1">
                  <QuestSection
                    label={t("sectionMain")}
                    quests={MAIN_QUESTS}
                    completed={completedQuests}
                  />
                  <QuestSection
                    label={t("sectionSide")}
                    quests={SIDE_QUESTS}
                    completed={completedQuests}
                  />
                </div>
              </div>
            </Panel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function QuestSection({
  label,
  quests,
  completed,
}: {
  label: string;
  quests: readonly QuestDef[];
  completed: string[];
}) {
  const t = useTranslations("quests");

  return (
    <section>
      <h3 className="font-display text-muted mb-2 text-xs font-semibold tracking-[0.2em] uppercase">
        {label}
      </h3>
      <ul className="space-y-2">
        {quests.map((q) => {
          const done = completed.includes(q.id);
          return (
            <li
              key={q.id}
              className={`rounded-sm border px-3 py-2 transition-colors ${
                done ? "border-cyan/40 bg-cyan/5" : "border-white/5 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`font-display text-sm font-semibold ${done ? "text-cyan" : "text-ink"}`}
                >
                  {t(`items.${q.id}.title`)}
                </span>
                <span className="text-muted-2 font-numeric shrink-0 text-[11px]">
                  {done ? `✓ ${t("completed")}` : t("reward", { xp: q.xp })}
                </span>
              </div>
              <p className="text-muted-2 mt-0.5 text-xs">{t(`items.${q.id}.desc`)}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
