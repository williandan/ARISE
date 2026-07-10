"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import type { Section } from "@/lib/sections";

/**
 * Registra a visita a uma seção (Side Quest "Explorador") e, opcionalmente,
 * conclui a Main Quest associada à navegação. Renderizado sem UI em cada página.
 */
export function SectionTracker({ section, quest }: { section: Section; quest?: string }) {
  const visitSection = useGameStore((s) => s.visitSection);
  const completeQuest = useGameStore((s) => s.completeQuest);

  useEffect(() => {
    visitSection(section);
    if (quest) completeQuest(quest);
  }, [section, quest, visitSection, completeQuest]);

  return null;
}
