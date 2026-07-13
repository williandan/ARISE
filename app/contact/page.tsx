import { getTranslations } from "next-intl/server";
import { MONARCH } from "@/content/profile";
import { PageShell } from "@/components/ui/PageShell";
import { Panel } from "@/components/ui/Panel";
import { SectionTracker } from "@/components/system/SectionTracker";
import { Ambient } from "@/components/ui/Ambient";

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <>
      <Ambient tone="cyan" />
      <SectionTracker section="contact" quest="summon" />
      <PageShell title={t("title")} subtitle={t("subtitle")}>
        <div className="mx-auto max-w-md space-y-4">
          <a href={`mailto:${MONARCH.links.email}`} className="block">
            <Panel tone="cyan" cut={14}>
              <div className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="min-w-0">
                  <span className="text-muted-2 block text-[11px] tracking-widest uppercase">
                    {t("emailLabel")}
                  </span>
                  <span className="text-ink font-display break-all">{MONARCH.links.email}</span>
                </span>
                <span className="font-display text-cyan shrink-0 text-xs font-semibold tracking-widest uppercase">
                  {t("cta")} ▸
                </span>
              </div>
            </Panel>
          </a>

          <a
            href={MONARCH.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Panel tone="neutral" cut={14}>
              <div className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="min-w-0">
                  <span className="text-muted-2 block text-[11px] tracking-widest uppercase">
                    {t("githubLabel")}
                  </span>
                  <span className="text-ink font-display break-all">{MONARCH.links.github}</span>
                </span>
                <span className="text-muted font-display shrink-0 text-lg">↗</span>
              </div>
            </Panel>
          </a>

          <p className="text-muted-2 pt-2 text-center text-xs leading-relaxed">{t("note")}</p>
        </div>
      </PageShell>
    </>
  );
}
