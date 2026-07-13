import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { MONARCH } from "@/content/profile";
import { Panel } from "@/components/ui/Panel";
import { Hexagon } from "@/components/ui/Hexagon";
import { MONARCH as PURPLE } from "@/lib/colors";

const BTN_CUT =
  "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)";

/**
 * Card do MONARCA (Willian) — S-rank fixo / MAX, roxo. Status estático.
 * Ref.: handoff "Home — Left Monarch Profile card".
 */
export async function MonarchCard() {
  const t = await getTranslations("profile");
  const s = MONARCH.stats;

  return (
    <Panel
      tone="purple"
      cut={28}
      className="h-full"
      glow="0 0 46px -6px rgba(168,85,247,0.45), 0 0 130px -20px rgba(168,85,247,0.35)"
    >
      <div className="flex h-full flex-col gap-6 p-8 sm:p-10">
        {/* Eyebrow */}
        <div className="flex items-center justify-between">
          <span className="font-display text-monarch text-xs font-semibold tracking-[0.3em]">
            <span
              className="anim-pulse mr-2 inline-block h-2 w-2 rotate-45"
              style={{ background: PURPLE }}
            />
            {t("eyebrow")}
          </span>
          <span className="font-numeric text-muted-purple text-xs">{t("id")}</span>
        </div>

        {/* Identidade */}
        <div className="flex items-center gap-6">
          <Hexagon
            label="S"
            sub="RANK"
            color={PURPLE}
            size={110}
            labelClassName="text-5xl text-glow-purple"
          />
          <div className="min-w-0">
            <span
              className="font-display text-gold mb-2 inline-block rounded-sm border px-2 py-0.5 text-[11px] font-semibold tracking-[0.2em]"
              style={{ borderColor: "#d9b64f66", background: "rgba(217,182,79,0.08)" }}
            >
              {t("sRank")}
            </span>
            <h1 className="font-display text-ink-purple text-5xl leading-[0.95] font-bold tracking-wide sm:text-6xl">
              WILLIAN
              <br />
              DANIEL
            </h1>
            <p className="font-display text-monarch-light mt-2 text-sm font-medium tracking-[0.3em] uppercase sm:text-base">
              {t("roleTitle")}
            </p>
          </div>
        </div>

        {/* Tagline */}
        <div
          className="text-body-purple border-l-2 py-2 pl-4 text-sm"
          style={{
            borderColor: PURPLE,
            background: "linear-gradient(90deg, rgba(168,85,247,0.08), transparent)",
          }}
        >
          {t("tagline")}
          <span className="anim-blink text-monarch ml-1 inline-block">▮</span>
        </div>

        {/* Placa MAX */}
        <div
          className="flex items-center justify-between rounded-sm border px-4 py-3"
          style={{
            borderColor: "#d9b64f88",
            background:
              "linear-gradient(90deg, rgba(217,182,79,0.16), rgba(168,85,247,0.10) 55%, transparent)",
          }}
        >
          <span className="font-display text-ink-purple text-sm font-semibold tracking-[0.25em]">
            ◆ {t("plaque")}
          </span>
          <span className="font-numeric text-gold text-glow-gold text-xl font-bold">
            {t("max")}
          </span>
        </div>
        <p className="text-muted-purple -mt-3 text-[11px]">{t("plaqueCaption")}</p>

        {/* Stats do dono */}
        <div className="mt-auto grid grid-cols-2 gap-3">
          <div className="rounded-sm border border-white/5 bg-white/3 px-4 py-3">
            <div className="text-muted-purple text-[10px] tracking-widest uppercase">
              {t("gatesCleared")}
            </div>
            <div className="font-numeric text-ink-purple mt-1 text-2xl font-bold">
              {s.gatesCleared} <span className="text-muted-purple text-base">/ {s.gatesTotal}</span>
            </div>
          </div>
          <div className="rounded-sm border border-white/5 bg-white/3 px-4 py-3">
            <div className="text-muted-purple text-[10px] tracking-widest uppercase">
              {t("skillsLabel")}
            </div>
            <div className="font-numeric text-ink-purple mt-1 text-2xl font-bold">
              {s.skillsMastered}{" "}
              <span className="text-muted-purple text-base">/ {s.skillsTotal}</span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/gates"
            className="font-display text-center text-sm font-bold tracking-[0.15em] text-[#06050a] transition-transform hover:scale-[1.02]"
            style={{
              clipPath: BTN_CUT,
              background: "linear-gradient(120deg, #c99bff, #7c3aed)",
              padding: "12px 22px",
              boxShadow: "0 0 22px -4px rgba(168,85,247,0.6)",
            }}
          >
            {t("explore")} ▸
          </Link>
          <Link
            href="/about"
            className="font-display text-body-purple hover:text-ink-purple text-center text-sm font-semibold tracking-[0.15em] transition-colors"
            style={{
              clipPath: BTN_CUT,
              border: "1px solid rgba(168,85,247,0.35)",
              padding: "12px 22px",
            }}
          >
            {t("resume")}
          </Link>
        </div>
      </div>
    </Panel>
  );
}
