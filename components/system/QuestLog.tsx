"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MAIN_QUESTS, SIDE_QUESTS, type QuestDef } from "@/lib/quests";
import { useGameStore } from "@/store/gameStore";
import { SystemWindow } from "./SystemWindow";

const TITLE_ID = "quest-log-title";

/** Registro de Missões (Quest Log) — abre a partir do HUD. */
export function QuestLog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations("quests");
  const tc = useTranslations("common");
  const reduceMotion = useReducedMotion();
  const completedQuests = useGameStore((s) => s.completedQuests);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Acessibilidade: fecha com Escape, move o foco pra dentro ao abrir e
  // devolve o foco ao elemento anterior ao fechar.
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby={TITLE_ID}
        >
          <motion.div className="w-full max-w-md" {...fade} onClick={(e) => e.stopPropagation()}>
            <SystemWindow
              title={
                <div className="flex items-center justify-between gap-4">
                  <span id={TITLE_ID}>{t("logTitle")}</span>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    aria-label={tc("close")}
                    className="text-ink-dim hover:text-ink"
                  >
                    ✕
                  </button>
                </div>
              }
            >
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
            </SystemWindow>
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
      <h3 className="font-display text-ink-dim mb-2 text-xs font-semibold tracking-[0.2em] uppercase">
        {label}
      </h3>
      <ul className="space-y-2">
        {quests.map((q) => {
          const done = completed.includes(q.id);
          return (
            <li
              key={q.id}
              className={`rounded-md border px-3 py-2 transition-colors ${
                done ? "border-system-cyan/40 bg-system-cyan/5" : "border-white/5 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`font-display text-sm font-semibold ${
                    done ? "text-system-cyan" : "text-ink"
                  }`}
                >
                  {t(`items.${q.id}.title`)}
                </span>
                <span className="text-ink-faint shrink-0 text-[11px] tabular-nums">
                  {done ? `✓ ${t("completed")}` : t("reward", { xp: q.xp })}
                </span>
              </div>
              <p className="text-ink-faint mt-0.5 text-xs">{t(`items.${q.id}.desc`)}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
