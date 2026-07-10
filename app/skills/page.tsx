import { getTranslations } from "next-intl/server";
import { SKILLS, SPELLS } from "@/content/skills";
import { PageShell } from "@/components/ui/PageShell";
import { SectionTracker } from "@/components/system/SectionTracker";

export default async function SkillsPage() {
  const t = await getTranslations("skills");

  return (
    <>
      {/* Visitar a Skill Tree = Main Quest "skills" */}
      <SectionTracker section="skills" quest="skills" />
      <PageShell title={t("title")} subtitle={t("subtitle")}>
        {/* Atributos */}
        <ul className="grid gap-4 sm:grid-cols-2">
          {SKILLS.map((attr) => (
            <li key={attr.id} className="bg-bg-panel/60 rounded-lg border border-white/5 p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-ink text-base font-bold tracking-wide">
                  {t(`attrs.${attr.id}.name`)}
                </h2>
                <span className="font-display text-system-cyan text-sm font-bold tabular-nums">
                  {attr.value}
                </span>
              </div>

              <div className="bg-bg-base/80 mt-2 h-2 overflow-hidden rounded-full">
                <div
                  className="bg-system-cyan h-full rounded-full"
                  style={{
                    width: `${attr.value}%`,
                    boxShadow: "0 0 10px var(--color-system-cyan)",
                  }}
                />
              </div>

              <p className="text-ink-faint mt-3 text-sm">{t(`attrs.${attr.id}.desc`)}</p>

              <ul className="mt-3 flex flex-wrap gap-1.5">
                {attr.tech.map((tech) => (
                  <li
                    key={tech}
                    className="bg-bg-base/70 text-ink-dim rounded border border-white/5 px-1.5 py-0.5 text-[11px]"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Feitiços */}
        <section className="mt-12">
          <h2 className="font-display text-system-cyan text-xs font-semibold tracking-[0.3em] uppercase">
            {t("spellsTitle")}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {SPELLS.map((spell) => (
              <li
                key={spell.id}
                className="bg-bg-panel/40 flex items-start gap-3 rounded-lg border border-white/5 p-4"
              >
                <span className="text-xl" aria-hidden>
                  {spell.icon}
                </span>
                <div>
                  <h3 className="font-display text-ink text-sm font-bold">
                    {t(`spells.${spell.id}.name`)}
                  </h3>
                  <p className="text-ink-faint mt-0.5 text-sm">{t(`spells.${spell.id}.desc`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Formação */}
        <section className="mt-12">
          <h2 className="font-display text-system-cyan text-xs font-semibold tracking-[0.3em] uppercase">
            {t("educationTitle")}
          </h2>
          <ul className="text-ink-dim mt-4 space-y-2">
            <li className="border-system-cyan/30 border-l-2 pl-3">{t("education.ucb")}</li>
            <li className="border-system-cyan/30 border-l-2 pl-3">{t("education.cubos")}</li>
          </ul>
        </section>
      </PageShell>
    </>
  );
}
