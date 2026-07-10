"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useNotificationsStore, type SystemNotification } from "@/store/notificationsStore";
import { SystemWindow } from "./SystemWindow";

const AUTO_DISMISS_MS = 4200;

/** Renderiza a fila de toasts do Sistema (janelas azuis). */
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
    <div className="pointer-events-none fixed top-4 right-4 z-[70] flex w-72 max-w-[calc(100vw-2rem)] flex-col gap-2">
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

function Toast({ notification }: { notification: SystemNotification }) {
  const t = useTranslations("system");
  const tq = useTranslations("quests");
  const dismiss = useNotificationsStore((s) => s.dismiss);

  useEffect(() => {
    const timer = setTimeout(() => dismiss(notification.id), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [notification.id, dismiss]);

  const tone = notification.kind === "rankUp" ? "purple" : "cyan";

  let title = t("windowTitle");
  let body: string | null = null;
  let reward: string | null = null;

  switch (notification.kind) {
    case "quest":
      title = t("questComplete");
      body = tq(`items.${notification.questId}.title`);
      reward = notification.xp ? t("xpGained", { xp: notification.xp }) : null;
      break;
    case "levelUp":
      title = t("levelUp");
      body = t("newLevel", { level: notification.level ?? 1 });
      break;
    case "rankUp":
      title = t("rankUp");
      body = t("newRank", { rank: notification.rank ?? "E" });
      break;
    case "info":
      body = notification.message ?? null;
      break;
  }

  return (
    <SystemWindow tone={tone} title={title}>
      <div className="flex items-center justify-between gap-3">
        {body && <p className="font-display text-ink text-sm font-medium">{body}</p>}
        {reward && (
          <span className="font-display text-system-cyan text-glow-cyan shrink-0 text-sm font-bold tabular-nums">
            {reward}
          </span>
        )}
      </div>
    </SystemWindow>
  );
}
