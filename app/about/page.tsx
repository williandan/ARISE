import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/ui/PageShell";
import { SectionTracker } from "@/components/system/SectionTracker";

export default async function AboutPage() {
  const t = await getTranslations("about");
  const ts = await getTranslations("skills");

  return (
    <>
      <SectionTracker section="about" />
      <PageShell title={t("title")} subtitle={t("subtitle")}>
        <div className="mx-auto max-w-2xl">
          <div className="text-ink-dim space-y-4 leading-relaxed">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>

          <section className="mt-10">
            <h2 className="font-display text-system-cyan text-xs font-semibold tracking-[0.3em] uppercase">
              {t("educationTitle")}
            </h2>
            <ul className="text-ink-dim mt-4 space-y-2">
              <li className="border-system-cyan/30 border-l-2 pl-3">{ts("education.ucb")}</li>
              <li className="border-system-cyan/30 border-l-2 pl-3">{ts("education.cubos")}</li>
            </ul>
          </section>
        </div>
      </PageShell>
    </>
  );
}
