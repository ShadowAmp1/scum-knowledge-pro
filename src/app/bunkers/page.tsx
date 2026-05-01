export const metadata = {
  title: "Бункеры SCUM | SCUM DB PRO",
  description: "Обычные и заброшенные бункеры SCUM: риск, подготовка, карты уровней и советы для соло/дуо.",
};

import { PageHeader } from "@/components/PageHeader";
import { BunkerFilters } from "@/components/BunkerFilters";
import { RaidKits } from "@/components/RaidKits";
import { bunkers } from "@/data/bunkers";

export default function BunkersPage() {
  const regular = bunkers.filter((bunker) => bunker.type === "Обычный бункер").length;
  const abandoned = bunkers.filter((bunker) => bunker.type === "Заброшенный бункер").length;
  const withMaps = bunkers.filter((bunker) => bunker.mapImages?.length).length;

  return (
    <main>
      <PageHeader
        title="Бункеры"
        description="Обновлённая вкладка бункеров: обычные и заброшенные бункеры, карты уровней для заброшенных объектов и схемы обычных бункеров."
      />

      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-white">{bunkers.length}</div>
            <div className="mt-2 text-sm text-zinc-500">бункеров в базе</div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-white">{regular}</div>
            <div className="mt-2 text-sm text-zinc-500">обычных бункеров</div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-red-400">{abandoned}</div>
            <div className="mt-2 text-sm text-zinc-500">заброшенных бункеров</div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-emerald-400">{withMaps}</div>
            <div className="mt-2 text-sm text-zinc-500">с картами уровней</div>
          </div>
        </div>
      </section>

      <BunkerFilters />
      <RaidKits />
    </main>
  );
}
