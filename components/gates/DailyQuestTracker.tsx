"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Panel } from "@/components/ui/Panel";
import { Bar } from "@/components/ui/Bar";
import { Hexagon } from "@/components/ui/Hexagon";
import { CYAN } from "@/lib/colors";

/**
 * Gate E — "O Despertar": Daily Quest Tracker.
 * Demo interativa embutida: tarefas diárias dão XP e sobem de nível (React +
 * estado local + localStorage). Estado próprio, separado do progresso do site.
 */

const STORAGE_KEY = "arise-dqt";
const XP_PER_QUEST = 20;
const XP_PER_LEVEL = 100;

interface Quest {
  id: string;
  title: string;
  done: boolean;
  streak: number;
}

export function DailyQuestTracker() {
  const t = useTranslations("dqt");
  const [quests, setQuests] = useState<Quest[]>([]);
  const [totalXp, setTotalXp] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [input, setInput] = useState("");

  // Carrega do localStorage (ou semeia exemplos na primeira vez).
  // Ler storage precisa ser num effect (não no initializer) para não gerar
  // hydration mismatch com o SSR — daí o setState aqui ser intencional.
  /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw) as { quests?: Quest[]; totalXp?: number };
        setQuests(s.quests ?? []);
        setTotalXp(s.totalXp ?? 0);
      } else {
        setQuests(
          [t("seed1"), t("seed2"), t("seed3")].map((title) => ({
            id: crypto.randomUUID(),
            title,
            done: false,
            streak: 0,
          })),
        );
      }
    } catch {
      /* ignore storage/parse errors */
    }
    setLoaded(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

  // Persiste.
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ quests, totalXp }));
  }, [quests, totalXp, loaded]);

  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
  const xpInLevel = totalXp % XP_PER_LEVEL;
  const completed = quests.filter((q) => q.done).length;

  function toggle(id: string) {
    const q = quests.find((x) => x.id === id);
    if (!q) return;
    const done = !q.done;
    setQuests((prev) => prev.map((x) => (x.id === id ? { ...x, done } : x)));
    setTotalXp((x) => Math.max(0, x + (done ? XP_PER_QUEST : -XP_PER_QUEST)));
  }

  function addQuest(e: FormEvent) {
    e.preventDefault();
    const title = input.trim();
    if (!title) return;
    setQuests((prev) => [...prev, { id: crypto.randomUUID(), title, done: false, streak: 0 }]);
    setInput("");
  }

  function removeQuest(id: string) {
    setQuests((prev) => prev.filter((x) => x.id !== id));
  }

  function newDay() {
    setQuests((prev) =>
      prev.map((q) => ({ ...q, streak: q.done ? q.streak + 1 : 0, done: false })),
    );
  }

  function reset() {
    setQuests([]);
    setTotalXp(0);
  }

  return (
    <Panel tone="cyan" cut={20}>
      <div className="flex flex-col gap-5 p-6 sm:p-7">
        {/* Cabeçalho: nível + XP */}
        <div className="flex items-center gap-4">
          <Hexagon label={String(level)} color={CYAN} size={52} labelClassName="text-xl" />
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-ink text-sm font-bold tracking-wide">
                {t("level")} {level}
              </span>
              <span className="text-muted-2 text-[11px]">
                {t("completedToday", { done: completed, total: quests.length })}
              </span>
            </div>
            <Bar
              value={xpInLevel}
              fill={CYAN}
              height={8}
              glow={`0 0 10px ${CYAN}`}
              className="mt-2"
            />
            <p className="text-muted-2 mt-1 text-[10px]">{t("xpEach", { xp: XP_PER_QUEST })}</p>
          </div>
        </div>

        {/* Adicionar missão */}
        <form onSubmit={addQuest} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("addPlaceholder")}
            aria-label={t("addPlaceholder")}
            className="bg-bg-base/70 text-ink placeholder:text-muted-2 focus:border-cyan/60 min-w-0 flex-1 rounded-sm border border-white/10 px-3 py-2 text-sm outline-none"
          />
          <button
            type="submit"
            className="bg-cyan/15 text-cyan hover:bg-cyan/25 font-display rounded-sm px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors"
          >
            {t("add")}
          </button>
        </form>

        {/* Lista */}
        {quests.length === 0 ? (
          <p className="text-muted-2 py-6 text-center text-sm">{t("empty")}</p>
        ) : (
          <ul className="space-y-2">
            {quests.map((q) => (
              <li
                key={q.id}
                className={`flex items-center gap-3 rounded-sm border px-3 py-2 transition-colors ${
                  q.done ? "border-cyan/40 bg-cyan/5" : "border-white/8 bg-white/[0.02]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(q.id)}
                  aria-label={t("toggle")}
                  aria-pressed={q.done}
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border text-xs transition-all ${
                    q.done
                      ? "border-cyan bg-cyan/20 text-cyan glow-cyan"
                      : "hover:border-cyan/60 border-white/20 text-transparent"
                  }`}
                >
                  ✓
                </button>
                <span
                  className={`flex-1 text-sm ${q.done ? "text-muted line-through" : "text-ink"}`}
                >
                  {q.title}
                </span>
                {q.streak > 0 && (
                  <span
                    className="font-numeric text-[11px] font-bold text-orange-400"
                    title={`streak ${q.streak}`}
                  >
                    🔥 {t("streak", { n: q.streak })}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeQuest(q.id)}
                  aria-label={t("remove")}
                  className="text-muted-2 hover:text-alert shrink-0 text-sm transition-colors"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Ações */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={newDay}
            className="font-display text-cyan hover:bg-cyan/10 border-cyan/30 rounded-sm border px-3 py-1.5 text-[11px] font-semibold tracking-widest uppercase transition-colors"
          >
            ☀ {t("newDay")}
          </button>
          <button
            type="button"
            onClick={reset}
            className="font-display text-muted-2 hover:text-alert text-[11px] font-semibold tracking-widest uppercase transition-colors"
          >
            {t("reset")}
          </button>
        </div>
      </div>
    </Panel>
  );
}
