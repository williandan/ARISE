import { getTranslations } from "next-intl/server";
import { MONARCH } from "@/content/profile";

/**
 * Card central da Home — o perfil do MONARCA (Willian): S-rank fixo / MAX, roxo.
 * Status estático (sem barra de XP preenchível), distinto do HUD do visitante.
 * Ref.: CLAUDE.md ("Dois papéis").
 */
export async function MonarchCard() {
  const t = await getTranslations("profile");

  const stats = [
    { label: t("statsGates"), value: MONARCH.stats.gates },
    { label: t("statsSkills"), value: MONARCH.stats.skills },
    { label: t("statsRank"), value: MONARCH.rank },
  ];

  return (
    <div
      className="bg-bg-panel/80 glow-purple w-full max-w-md p-6 backdrop-blur-sm"
      style={{
        clipPath:
          "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
      }}
    >
      <div className="flex items-center gap-4">
        <span className="font-display bg-bg-panel/60 glow-purple text-monarch inline-flex h-16 w-16 items-center justify-center rounded-md text-4xl font-bold">
          {MONARCH.rank}
        </span>
        <div>
          <h2 className="font-display text-ink text-2xl font-bold tracking-wide">
            {MONARCH.handle}
          </h2>
          <p className="text-ink-dim text-sm">{t("role")}</p>
        </div>
      </div>

      <p className="font-display text-monarch text-glow-purple mt-4 text-center text-xs font-semibold tracking-[0.3em]">
        {MONARCH.titleKeys.map((k) => t(`titles.${k}`)).join(" · ")}
      </p>

      <dl className="mt-5 grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-bg-base/60 rounded-md border border-white/5 px-2 py-3 text-center"
          >
            <dt className="text-ink-faint text-[11px] tracking-widest uppercase">{s.label}</dt>
            <dd className="font-display text-monarch mt-1 text-2xl font-bold">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
