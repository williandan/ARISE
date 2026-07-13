"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useGameStore } from "@/store/gameStore";
import { useNotificationsStore } from "@/store/notificationsStore";
import { rankForLevel } from "@/lib/leveling";
import { sound, type Sfx } from "@/lib/sound";
import { NotificationCenter } from "@/components/system/NotificationCenter";
import { QuestLog } from "@/components/system/QuestLog";
import { BootScreen } from "@/components/boot/BootScreen";
import { EasterEgg } from "@/components/system/EasterEgg";

const KIND_SFX: Record<string, Sfx> = {
  quest: "notify",
  info: "notify",
  levelUp: "levelUp",
  rankUp: "rankUp",
};

/**
 * Camada global do Sistema: HUD + notificações + som.
 * Montado uma vez no layout, sobre todas as páginas.
 */
export function SystemProvider() {
  const t = useTranslations("system");

  const hasHydrated = useGameStore((s) => s.hasHydrated);
  const muted = useGameStore((s) => s.muted);
  const notifications = useNotificationsStore((s) => s.items);

  const seenIds = useRef<Set<string>>(new Set());
  const welcomedRef = useRef(false);

  // Sincroniza o mudo global do Howler com a preferência do visitante.
  useEffect(() => {
    sound.setMuted(muted);
  }, [muted]);

  // Toca o SFX correspondente a cada notificação nova.
  useEffect(() => {
    for (const n of notifications) {
      if (seenIds.current.has(n.id)) continue;
      seenIds.current.add(n.id);
      const sfx = KIND_SFX[n.kind];
      if (sfx) sound.play(sfx);
    }
    // Poda ids de notificações já dispensadas (ids são únicos e não reutilizados),
    // mantendo o Set limitado ao que está na tela.
    const alive = new Set(notifications.map((n) => n.id));
    for (const id of seenIds.current) {
      if (!alive.has(id)) seenIds.current.delete(id);
    }
  }, [notifications]);

  // "Bem-vindo de volta, Jogador de Rank X." — só para visitante recorrente
  // (já passou pela tela de boot numa sessão anterior).
  useEffect(() => {
    if (!hasHydrated || welcomedRef.current) return;
    welcomedRef.current = true;

    const { level, bootSeen } = useGameStore.getState();
    if (bootSeen) {
      const rank = rankForLevel(level);
      useNotificationsStore.getState().push({
        kind: "info",
        message: t("welcomeBack", { rank }),
      });
    }
  }, [hasHydrated, t]);

  return (
    <>
      <BootScreen />
      <NotificationCenter />
      <QuestLog />
      <EasterEgg />
    </>
  );
}
