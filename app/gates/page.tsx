import { getTranslations } from "next-intl/server";
import { GATES } from "@/content/gates";
import { GateCard } from "@/components/gates/GateCard";
import { PageShell } from "@/components/ui/PageShell";
import { SectionTracker } from "@/components/system/SectionTracker";

export default async function GatesPage() {
  const t = await getTranslations("gates");

  return (
    <>
      <SectionTracker section="gates" />
      <PageShell title={t("title")} subtitle={t("subtitle")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GATES.map((gate) => (
            <GateCard key={gate.id} gate={gate} />
          ))}
        </div>
      </PageShell>
    </>
  );
}
