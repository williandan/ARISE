"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useNotificationsStore, type SystemNotification } from "@/store/notificationsStore";
import { Panel, type PanelTone } from "@/components/ui/Panel";

const AUTO_DISMISS_MS = 4200;

/** Renderiza a fila de toasts do Sistema (janelas azuis chanfradas). */
export function NotificationCenter() {
  const items = useNotificationsStore((s) => s.items);
  const reduceMotion = useReducedMotion();

  const variants = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: 40, scale: 0.96 },
        animate: { opacity: 1, x: 0, scale: 1 },
        exit: { opacity: 0, x: 40, scale: 0.96 },
      };

  return (
    <div className="pointer-events-none fixed top-20 right-4 z-[70] flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2.5">
      <AnimatePresence initial={false}>
        {items.map((n) => (
          <motion.div
            key={n.id}
            layout={!reduceMotion}
            {...variants}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
            className="pointer-events-auto"
          >
            <Toast notification={n} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Estilo por tipo de notificação.
const KIND: Record<
  SystemNotification["kind"],
  { tone: PanelTone; accent: string; kindKey: string }
> = {
  quest: { tone: "cyan", accent: "text-cyan", kindKey: "questComplete" },
  levelUp: { tone: "cyan", accent: "text-cyan", kindKey: "levelUp" },
  rankUp: { tone: "gold", accent: "text-gold", kindKey: "rankUp" },
  info: { tone: "cyan", accent: "text-cyan", kindKey: "notification" },
};

function Toast({ notification }: { notification: SystemNotification }) {
  const t = useTranslations("system");
  const tq = useTranslations("quests");
  const dismiss = useNotificationsStore((s) => s.dismiss);

  useEffect(() => {
    const timer = setTimeout(() => dismiss(notification.id), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [notification.id, dismiss]);

  const style = KIND[notification.kind];

  const heading = t(style.kindKey);
  let body: string | null = null;
  let reward: string | null = null;

  switch (notification.kind) {
    case "quest":
      body = tq(`items.${notification.questId}.title`);
      reward = notification.xp ? t("xpGained", { xp: notification.xp }) : null;
      break;
    case "levelUp":
      body = t("newLevel", { level: notification.level ?? 1 });
      break;
    case "rankUp":
      body = t("newRank", { rank: notification.rank ?? "E" });
      break;
    case "info":
      body = notification.message ?? null;
      break;
  }

  return (
    <Panel tone={style.tone} cut={12}>
      <div className="p-4">
        {/* Cabeçalho: ◆ SISTEMA + tipo */}
        <div className="mb-2 flex items-center justify-between border-b border-white/8 pb-2">
          <span
            className={`font-display text-[10px] font-semibold tracking-[0.3em] ${style.accent}`}
          >
            <span className="anim-pulse mr-1.5 inline-block h-1.5 w-1.5 rotate-45 bg-current align-middle" />
            {t("windowTitle")}
          </span>
          <span className={`font-display text-[10px] font-bold tracking-[0.2em] ${style.accent}`}>
            {heading}
          </span>
        </div>

        {/* Corpo + recompensa */}
        <div className="flex items-center justify-between gap-3">
          {body && <p className="font-display text-ink text-sm font-semibold">{body}</p>}
          {reward && (
            <span className="font-numeric text-gold text-glow-gold shrink-0 text-sm font-bold">
              {reward}
            </span>
          )}
        </div>
      </div>
    </Panel>
  );
}
