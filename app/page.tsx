import { getTranslations } from "next-intl/server";
import { HomeActions } from "@/components/home/HomeActions";
import { MonarchCard } from "@/components/home/MonarchCard";
import { RankPath } from "@/components/home/RankPath";
import { SectionTracker } from "@/components/system/SectionTracker";

export default async function Home() {
  const t = await getTranslations("home");
  const tp = await getTranslations("profile");

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 pt-36 pb-24 sm:py-28">
      {/* marca a visita à Home (Side Quest "Explorador") */}
      <SectionTracker section="home" />

      {/* brilho ambiente ciano→roxo (jornada do visitante) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(56,189,248,0.16), transparent 70%), radial-gradient(55% 50% at 50% 100%, rgba(139,92,246,0.16), transparent 70%)",
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

        <p className="text-ink-dim mt-5 max-w-xl leading-relaxed">{t("intro")}</p>

        {/* Card do Monarca (Willian, S-rank fixo) */}
        <div className="mt-10 flex justify-center">
          <MonarchCard />
        </div>

        {/* Rank Path do visitante */}
        <div className="mt-10 flex justify-center">
          <RankPath />
        </div>

        <p className="text-ink-faint mt-4 max-w-md text-xs leading-relaxed">{tp("hint")}</p>

        <HomeActions />
      </div>
    </main>
  );
}
