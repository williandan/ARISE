import { getTranslations } from "next-intl/server";
import { MONARCH } from "@/content/profile";
import { PageShell } from "@/components/ui/PageShell";
import { SectionTracker } from "@/components/system/SectionTracker";

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <>
      {/* Chegar no contato = Main Quest "summon" */}
      <SectionTracker section="contact" quest="summon" />
      <PageShell title={t("title")} subtitle={t("subtitle")}>
        <div className="mx-auto max-w-md space-y-4">
          <a
            href={`mailto:${MONARCH.links.email}`}
            className="bg-bg-panel/60 glow-cyan hover:bg-bg-panel/80 flex flex-col gap-2 rounded-lg border border-white/5 px-5 py-4 transition-colors sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="min-w-0">
              <span className="text-ink-faint block text-[11px] tracking-widest uppercase">
                {t("emailLabel")}
              </span>
              <span className="text-ink font-display break-all">{MONARCH.links.email}</span>
            </span>
            <span className="text-system-cyan font-display shrink-0 text-xs font-semibold tracking-widest uppercase">
              {t("cta")} →
            </span>
          </a>

          <a
            href={MONARCH.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-bg-panel/60 hover:bg-bg-panel/80 flex flex-col gap-2 rounded-lg border border-white/5 px-5 py-4 transition-colors sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="min-w-0">
              <span className="text-ink-faint block text-[11px] tracking-widest uppercase">
                {t("githubLabel")}
              </span>
              <span className="text-ink font-display break-all">{MONARCH.links.github}</span>
            </span>
            <span className="text-ink-dim font-display shrink-0 text-lg">↗</span>
          </a>

          <p className="text-ink-faint pt-2 text-center text-xs leading-relaxed">{t("note")}</p>
        </div>
      </PageShell>
    </>
  );
}
