import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/ui/PageShell";
import { Panel } from "@/components/ui/Panel";
import { SectionTracker } from "@/components/system/SectionTracker";
import { Ambient } from "@/components/ui/Ambient";

export default async function AboutPage() {
  const t = await getTranslations("about");
  const ts = await getTranslations("skills");

  return (
    <>
      <Ambient tone="cyan" />
      <SectionTracker section="about" />
      <PageShell title={t("title")} subtitle={t("subtitle")}>
        <div className="mx-auto max-w-2xl">
          <Panel tone="cyan" cut={20}>
            <div className="text-body space-y-4 p-7 leading-relaxed sm:p-8">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
            </div>
          </Panel>

          <section className="mt-8">
            <h2 className="font-display text-cyan mb-4 text-xs font-semibold tracking-[0.3em] uppercase">
              ◇ {t("educationTitle")}
            </h2>
            <ul className="text-muted space-y-2">
              <li className="border-cyan/40 border-l-2 pl-3">{ts("education.ucb")}</li>
              <li className="border-cyan/40 border-l-2 pl-3">{ts("education.cubos")}</li>
            </ul>
          </section>
        </div>
      </PageShell>
    </>
  );
}
