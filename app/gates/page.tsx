import { getTranslations } from "next-intl/server";
import { GATES } from "@/content/gates";
import { GateCard } from "@/components/gates/GateCard";
import { SectionTracker } from "@/components/system/SectionTracker";
import { Ambient } from "@/components/ui/Ambient";
import { Panel } from "@/components/ui/Panel";

export default async function GatesPage() {
  const t = await getTranslations("gates");

  return (
    <>
      <Ambient tone="cyan" />
      <SectionTracker section="gates" />

      <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-4 pt-24 pb-24 sm:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-ink text-4xl font-bold tracking-[0.18em] uppercase sm:text-5xl">
                {t("title")}
              </h1>
              <span className="font-display text-cyan border-cyan/30 bg-cyan/5 rounded-sm border px-2 py-0.5 text-[11px] font-semibold tracking-widest">
                {t("detected", { n: String(GATES.length).padStart(2, "0") })}
              </span>
            </div>
            <p className="text-muted mt-2 text-sm">{t("subtitle")}</p>
          </div>
          <div className="text-muted-2 flex items-center gap-4 text-[11px] tracking-widest uppercase">
            <span className="text-cyan">◇ {t("unlocked")}</span>
            <span>🔒 {t("lockedLabel")}</span>
          </div>
        </div>

        {/* Grade */}
        <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GATES.map((gate, i) => (
            <GateCard key={gate.id} gate={gate} index={i} />
          ))}
        </div>

        {/* Rodapé */}
        <div className="mt-8">
          <Panel tone="cyanPurple" cut={14}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3">
              <span className="font-display text-ink text-sm font-semibold tracking-[0.2em]">
                ◆ {t("gatesCleared")}{" "}
                <span className="font-numeric text-cyan">0 / {GATES.length}</span>
              </span>
              <span className="text-muted-2 flex-1 text-right text-[11px]">{t("footerHint")}</span>
            </div>
          </Panel>
        </div>
      </main>
    </>
  );
}
