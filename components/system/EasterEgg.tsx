"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "@/store/gameStore";

/**
 * Easter egg "Segredo do Monarca" — código Konami
 * (↑ ↑ ↓ ↓ ← → ← → B A). Ao completar, conclui a Side Quest.
 */
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterEgg() {
  const completeQuest = useGameStore((s) => s.completeQuest);
  const progress = useRef(0);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      progress.current =
        key === KONAMI[progress.current] ? progress.current + 1 : key === KONAMI[0] ? 1 : 0;

      if (progress.current === KONAMI.length) {
        progress.current = 0;
        completeQuest("monarchSecret");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [completeQuest]);

  return null;
}
