import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { GATES, getGateBySlug } from "@/content/gates";
import { Hexagon } from "@/components/ui/Hexagon";
import { AnalyzeDungeon } from "@/components/gates/AnalyzeDungeon";
import { SectionTracker } from "@/components/system/SectionTracker";
import { Ambient } from "@/components/ui/Ambient";
import { RANK_HEX } from "@/lib/colors";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return GATES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const gate = getGateBySlug(slug);
  if (!gate) return {};
  const t = await getTranslations("gates");
  return {
    title: `${t(`items.${gate.id}.name`)} · ${t("gateRank", { rank: gate.rank })}`,
    description: t(`items.${gate.id}.summary`),
  };
}

export default async function GatePage({ params }: { params: Params }) {
  const { slug } = await params;
  const gate = getGateBySlug(slug);
  if (!gate) notFound();

  const t = await getTranslations("gates");
  const color = RANK_HEX[gate.rank];

  return (
    <>
      <Ambient tone="cyan" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pt-28 pb-24">
        {/* Entrar num Gate = Main Quest "firstGate"; o Gate rank S = "boss" */}
        <SectionTracker section="gates" quest="firstGate" />
        {gate.boss && <SectionTracker section="gates" quest="boss" />}

        <Link
          href="/gates"
          className="text-muted hover:text-cyan font-display text-xs font-semibold tracking-widest uppercase"
        >
          ← {t("back")}
        </Link>

        <header className="mt-6 flex items-center gap-5">
          <Hexagon label={gate.rank} sub="RANK" color={color} size={72} labelClassName="text-2xl" />
          <div>
            <span
              className="font-display text-[10px] font-semibold tracking-[0.3em] uppercase"
              style={{ color: `${color}bb` }}
            >
              {t("gate")} {String(GATES.indexOf(gate) + 1).padStart(2, "0")}
            </span>
            <h1 className="font-display text-ink text-3xl font-bold tracking-wide sm:text-4xl">
              {t(`items.${gate.id}.name`)}
            </h1>
            <p className="mt-1" style={{ color }}>
              {t(`items.${gate.id}.tagline`)}
            </p>
          </div>
        </header>

        <div className="mt-4 flex items-center gap-2 text-[11px] tracking-widest uppercase">
          <span className="text-muted-2">{t("statusLabel")}:</span>
          <span className="text-muted">{t(`status.${gate.status}`)}</span>
        </div>

        <p className="text-body mt-6 max-w-2xl leading-relaxed">{t(`items.${gate.id}.summary`)}</p>

        <section className="mt-8">
          <h2 className="font-display text-muted text-xs font-semibold tracking-[0.2em] uppercase">
            {t("techLabel")}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {gate.tech.map((tech) => (
              <li
                key={tech}
                className="font-display rounded-sm border px-2.5 py-1 text-sm"
                style={{ color, borderColor: `${color}4d`, background: `${color}14` }}
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        <AnalyzeDungeon />
      </main>
    </>
  );
}
