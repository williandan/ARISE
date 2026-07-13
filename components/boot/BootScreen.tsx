"use client";

import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { rankForLevel } from "@/lib/leveling";
import { Panel } from "@/components/ui/Panel";
import { LanguageToggle } from "@/components/system/LanguageToggle";

const BTN_CUT =
  "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)";

/**
 * Tela de entrada ("boot do Sistema"): o momento em que o visitante desperta
 * como Jogador. Aparece na primeira visita; some após aceitar/pular.
 * Pulável, respeita prefers-reduced-motion. Ref.: handoff "Boot / Entrance".
 */
export function BootScreen() {
  const t = useTranslations("boot");
  const ts = useTranslations("system");
  const th = useTranslations("hud");
  const reduceMotion = useReducedMotion();

  const hasHydrated = useGameStore((s) => s.hasHydrated);
  const bootSeen = useGameStore((s) => s.bootSeen);
  const level = useGameStore((s) => s.level);
  const completeQuest = useGameStore((s) => s.completeQuest);
  const markBootSeen = useGameStore((s) => s.markBootSeen);
  const skipIntro = useGameStore((s) => s.skipIntro);

  const show = hasHydrated && !bootSeen;
  const rank = rankForLevel(level);

  function accept() {
    completeQuest("awaken");
    markBootSeen();
  }
  function decline() {
    markBootSeen();
  }
  function skip() {
    completeQuest("awaken");
    skipIntro();
  }

  const appear = (delay: number) =>
    reduceMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: "easeOut" as const },
        };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 px-6"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 42%, #0a1220 0%, #05070d 55%, #030409 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.4 } }}
          role="dialog"
          aria-modal="true"
        >
          {/* Idioma (canto) */}
          <div className="absolute top-6 right-6">
            <LanguageToggle />
          </div>

          {/* Linha "digitada" */}
          <motion.p {...appear(0.1)} className="text-muted-2 font-mono text-sm tracking-wide">
            <span className="text-cyan">&gt;</span> {t("detecting")}
            <span className="anim-blink text-cyan">_</span>
          </motion.p>

          {/* Badge de rank */}
          <motion.span
            {...appear(0.5)}
            className="font-display border-cyan/30 bg-cyan/5 rounded-sm border px-3 py-1 text-[11px] font-semibold tracking-[0.35em]"
            style={{ color: "#5f8bb5" }}
          >
            ◆ [ {th("rank")} {rank} ]
          </motion.span>

          {/* Janela do Sistema */}
          <motion.div {...appear(0.3)} className="w-full max-w-[660px]">
            <Panel
              tone="cyan"
              cut={26}
              glow="0 0 40px -6px rgba(56,189,248,0.45), 0 0 120px -30px rgba(56,189,248,0.5)"
            >
              <div className="p-8 sm:p-10">
                <div className="border-cyan/20 mb-6 flex items-center justify-between border-b pb-3">
                  <span className="font-display text-cyan text-xs font-semibold tracking-[0.35em]">
                    <span className="anim-pulse mr-2 inline-block h-2 w-2 rotate-45 bg-current align-middle" />
                    {ts("windowTitle")}
                  </span>
                  <span className="font-display text-muted-2 text-[11px] tracking-[0.2em]">
                    {ts("notification")}
                  </span>
                </div>

                <p className="font-display text-ink/90 text-xl leading-snug font-medium sm:text-2xl">
                  {t.rich("qualification", {
                    player: (chunks) => <span className="text-cyan-light font-bold">{chunks}</span>,
                  })}
                </p>
                <p className="font-display text-ink text-glow-cyan mt-3 text-4xl font-bold sm:text-5xl">
                  {t("question")}
                </p>

                <div className="mt-8 flex gap-4">
                  <button
                    type="button"
                    onClick={accept}
                    className="font-display flex-1 text-sm font-bold tracking-[0.25em] text-[#05060a] uppercase transition-transform hover:scale-[1.02]"
                    style={{
                      clipPath: BTN_CUT,
                      background: "linear-gradient(120deg, #9dd3ff, #2f7fd6)",
                      padding: "14px",
                      boxShadow: "0 0 24px -4px rgba(56,189,248,0.6)",
                    }}
                  >
                    {t("accept")}
                  </button>
                  <button
                    type="button"
                    onClick={decline}
                    className="font-display text-muted hover:text-ink flex-1 text-sm font-semibold tracking-[0.25em] uppercase transition-colors"
                    style={{
                      clipPath: BTN_CUT,
                      border: "1px solid rgba(96,150,220,0.35)",
                      padding: "14px",
                    }}
                  >
                    {t("decline")}
                  </button>
                </div>
              </div>
            </Panel>
          </motion.div>

          {/* Pular intro */}
          <motion.button
            {...appear(0.7)}
            type="button"
            onClick={skip}
            className="font-display text-muted-2 hover:text-cyan-light text-xs font-semibold tracking-[0.3em] uppercase transition-colors"
          >
            {t("skip")} ▸
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
