"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useGameStore } from "@/store/gameStore";
import { useNotificationsStore } from "@/store/notificationsStore";
import { rankForLevel } from "@/lib/leveling";
import { sound, type Sfx } from "@/lib/sound";
import { Hud } from "@/components/system/Hud";
import { NotificationCenter } from "@/components/system/NotificationCenter";

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
  }, [notifications]);

  // "Bem-vindo de volta, Jogador de Rank X." — só se já houver progresso salvo.
  useEffect(() => {
    if (!hasHydrated || welcomedRef.current) return;
    welcomedRef.current = true;

    const { level, completedQuests } = useGameStore.getState();
    if (completedQuests.length > 0) {
      const rank = rankForLevel(level);
      useNotificationsStore.getState().push({
        kind: "info",
        message: t("welcomeBack", { rank }),
      });
    }
  }, [hasHydrated, t]);

  return (
    <>
      <Hud />
      <NotificationCenter />
    </>
  );
}
