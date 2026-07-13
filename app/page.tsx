import { MonarchCard } from "@/components/home/MonarchCard";
import { VisitorHud } from "@/components/home/VisitorHud";
import { RankPath } from "@/components/home/RankPath";
import { ActiveQuest } from "@/components/home/ActiveQuest";
import { SectionTracker } from "@/components/system/SectionTracker";
import { Ambient } from "@/components/ui/Ambient";

export default function Home() {
  return (
    <>
      <Ambient tone="purple" grid />
      {/* A missão "despertar" é concedida na tela de boot; aqui só marca a visita. */}
      <SectionTracker section="home" />

      <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-4 pt-24 pb-24 sm:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.55fr_1fr]">
          <MonarchCard />
          <div className="flex flex-col gap-5">
            <VisitorHud />
            <RankPath />
            <ActiveQuest />
          </div>
        </div>
      </main>
    </>
  );
}
