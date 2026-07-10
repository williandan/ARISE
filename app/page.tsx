import { getTranslations } from "next-intl/server";
import { HomeActions } from "@/components/home/HomeActions";

// Escada de ranks E→S — exercita os tokens de cor e o glow do design system.
const RANKS = ["e", "d", "c", "b", "a", "s"] as const;

const RANK_TEXT: Record<(typeof RANKS)[number], string> = {
  e: "text-rank-e",
  d: "text-rank-d",
  c: "text-rank-c",
  b: "text-rank-b",
  a: "text-rank-a",
  s: "text-rank-s",
};

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* brilho ambiente ciano→roxo (jornada do visitante) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(56,189,248,0.18), transparent 70%), radial-gradient(50% 45% at 80% 100%, rgba(139,92,246,0.18), transparent 70%)",
        }}
      />

      <div className="flex w-full max-w-2xl flex-col items-center text-center">
        <p className="text-system-cyan font-display text-sm font-semibold tracking-[0.35em] uppercase">
          {t("kicker")}
        </p>

        <h1 className="text-glow-cyan text-system-cyan font-display mt-4 text-7xl font-bold tracking-[0.2em] sm:text-8xl">
          {t("title")}
        </h1>

        <p className="text-ink font-display mt-2 text-lg font-medium tracking-wide">
          {t("subtitle")}
        </p>

        <p className="text-ink-dim mt-6 max-w-xl leading-relaxed">{t("intro")}</p>

        {/* Escada de ranks */}
        <ul className="mt-10 flex items-center gap-3">
          {RANKS.map((rank) => (
            <li
              key={rank}
              className={`${RANK_TEXT[rank]} glow-rank font-display bg-bg-panel/60 flex h-12 w-12 items-center justify-center rounded-md text-xl font-bold`}
            >
              {rank.toUpperCase()}
            </li>
          ))}
        </ul>

        <HomeActions />
      </div>
    </main>
  );
}
