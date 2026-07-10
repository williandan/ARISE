import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { GATES, getGateBySlug } from "@/content/gates";
import { RankBadge } from "@/components/ui/RankBadge";
import { AnalyzeDungeon } from "@/components/gates/AnalyzeDungeon";
import { SectionTracker } from "@/components/system/SectionTracker";

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
    title: `${t(`items.${gate.id}.name`)} · Gate ${gate.rank}`,
    description: t(`items.${gate.id}.summary`),
  };
}

export default async function GatePage({ params }: { params: Params }) {
  const { slug } = await params;
  const gate = getGateBySlug(slug);
  if (!gate) notFound();

  const t = await getTranslations("gates");

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 pt-36 pb-24">
      {/* Entrar num Gate = Main Quest "firstGate" */}
      <SectionTracker section="gates" quest="firstGate" />

      <Link
        href="/gates"
        className="text-ink-dim hover:text-system-cyan font-display text-xs font-semibold tracking-widest uppercase"
      >
        ← {t("back")}
      </Link>

      <header className="mt-6 flex items-center gap-5">
        <RankBadge rank={gate.rank} size="lg" />
        <div>
          <h1 className="font-display text-ink text-3xl font-bold tracking-wide sm:text-4xl">
            {t(`items.${gate.id}.name`)}
          </h1>
          <p className="text-system-cyan mt-1">{t(`items.${gate.id}.tagline`)}</p>
        </div>
      </header>

      <div className="mt-4 flex items-center gap-2 text-[11px] tracking-widest uppercase">
        <span className="text-ink-faint">{t("statusLabel")}:</span>
        <span className="text-ink-dim">{t(`status.${gate.status}`)}</span>
      </div>

      <p className="text-ink-dim mt-6 max-w-2xl leading-relaxed">{t(`items.${gate.id}.summary`)}</p>

      <section className="mt-8">
        <h2 className="font-display text-ink-dim text-xs font-semibold tracking-[0.2em] uppercase">
          {t("techLabel")}
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {gate.tech.map((tech) => (
            <li
              key={tech}
              className="bg-bg-panel/60 text-ink rounded border border-white/5 px-2.5 py-1 text-sm"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>

      <AnalyzeDungeon />
    </main>
  );
}
