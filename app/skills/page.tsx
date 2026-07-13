import { getTranslations } from "next-intl/server";
import { SKILLS, SPELLS } from "@/content/skills";
import { SectionTracker } from "@/components/system/SectionTracker";
import { Ambient } from "@/components/ui/Ambient";
import { Panel } from "@/components/ui/Panel";
import { Hexagon } from "@/components/ui/Hexagon";
import { Bar } from "@/components/ui/Bar";

export default async function SkillsPage() {
  const t = await getTranslations("skills");

  return (
    <>
      <Ambient tone="purple" />
      <SectionTracker section="skills" quest="skills" />

      <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-4 pt-24 pb-24 sm:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-ink text-4xl font-bold tracking-[0.16em] uppercase sm:text-5xl">
                {t("title")}
              </h1>
              <span className="font-display text-monarch border-monarch/30 bg-monarch/5 rounded-sm border px-2 py-0.5 text-[11px] font-semibold tracking-widest">
                {t("attributesChip", { n: String(SKILLS.length).padStart(2, "0") })}
              </span>
            </div>
            <p className="text-muted mt-2 text-sm">{t("subtitle")}</p>
          </div>
          <span className="font-display text-monarch text-[11px] font-semibold tracking-widest uppercase">
            ◆ {t("monarchMastery")}
          </span>
        </div>

        {/* Atributos */}
        <ul className="flex flex-1 flex-col gap-4">
          {SKILLS.map((attr) => {
            const barFill = attr.highest
              ? `linear-gradient(90deg, ${attr.color}, #f5c542)`
              : `linear-gradient(90deg, color-mix(in srgb, ${attr.color} 70%, #2f7fd6), ${attr.color})`;
            const border = `linear-gradient(160deg, ${attr.color}, color-mix(in srgb, ${attr.color} 45%, #05060a))`;
            return (
              <li key={attr.id}>
                <Panel cut={18} border={border} glow={`0 0 22px -8px ${attr.color}`}>
                  <div className="flex items-center gap-5 px-5 py-4 sm:px-7">
                    <Hexagon
                      label={attr.key}
                      color={attr.color}
                      size={attr.highest ? 68 : 62}
                      labelClassName="text-base"
                    />
                    <div className="w-40 shrink-0">
                      <div className="flex items-center gap-2">
                        <h2 className="font-display text-ink text-lg font-bold tracking-wide">
                          {t(`attrs.${attr.id}.name`)}
                        </h2>
                        {attr.highest && (
                          <span className="font-display text-gold border-gold/40 bg-gold/5 rounded-sm border px-1.5 text-[9px] font-bold tracking-widest">
                            {t("highest")}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-2 mt-1 hidden text-[11px] sm:block">
                        {attr.tech.join(" · ")}
                      </p>
                    </div>

                    {/* Barra segmentada com varredura de brilho */}
                    <Bar
                      value={attr.value}
                      fill={barFill}
                      height={attr.highest ? 18 : 16}
                      segmented
                      glow={`0 0 12px -2px ${attr.color}`}
                      className="flex-1"
                    />

                    <div className="w-16 shrink-0 text-right">
                      <span
                        className="font-numeric text-2xl font-black sm:text-3xl"
                        style={{ color: attr.color }}
                      >
                        {attr.value}
                      </span>
                      <span className="text-muted-2 font-numeric text-xs">/100</span>
                    </div>
                  </div>
                </Panel>
              </li>
            );
          })}
        </ul>

        {/* Habilidades desbloqueadas */}
        <section className="mt-10">
          <h2 className="font-display text-gold mb-4 text-xs font-semibold tracking-[0.3em] uppercase">
            ◇ {t("spellsTitle")}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SPELLS.map((spell) => (
              <li key={spell.id}>
                <Panel
                  cut={14}
                  border={`linear-gradient(160deg, ${spell.color}, color-mix(in srgb, ${spell.color} 40%, #05060a))`}
                  glow="none"
                >
                  <div className="flex items-start gap-3 p-4">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm text-lg"
                      style={{
                        background: `${spell.color}1a`,
                        border: `1px solid ${spell.color}55`,
                      }}
                      aria-hidden
                    >
                      {spell.icon}
                    </span>
                    <div>
                      <h3 className="font-display text-ink text-sm font-bold">
                        {t(`spells.${spell.id}.name`)}
                      </h3>
                      <p className="text-muted-2 mt-0.5 text-[11px]">
                        {t(`spells.${spell.id}.desc`)}
                      </p>
                    </div>
                  </div>
                </Panel>
              </li>
            ))}
          </ul>
        </section>

        {/* Formação */}
        <section className="mt-8">
          <h2 className="font-display text-muted mb-3 text-xs font-semibold tracking-[0.3em] uppercase">
            {t("educationTitle")}
          </h2>
          <ul className="text-muted space-y-2 text-sm">
            <li className="border-monarch/40 border-l-2 pl-3">{t("education.ucb")}</li>
            <li className="border-monarch/40 border-l-2 pl-3">{t("education.cubos")}</li>
          </ul>
        </section>
      </main>
    </>
  );
}
