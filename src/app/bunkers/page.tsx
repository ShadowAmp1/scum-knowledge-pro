import { PageHeader } from "@/components/PageHeader";
import { BunkerFilters } from "@/components/BunkerFilters";
import { RaidKits } from "@/components/RaidKits";
import { bunkers } from "@/data/bunkers";

export default function BunkersPage() {
  const highRisk = bunkers.filter((bunker) => bunker.risk === "Высокий" || bunker.risk === "Экстремальный").length;
  const beginner = bunkers.filter((bunker) => bunker.beginnerFriendly).length;

  return (
    <main>
      <PageHeader title="Бункеры" description="SCUM DB PRO v3: поиск, фильтры, маршруты зачистки, подготовка, угрозы, ошибки и список ценного лута." />

      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-white">{bunkers.length}</div>
            <div className="mt-2 text-sm text-zinc-500">маршрутов в базе v3</div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-red-400">{highRisk}</div>
            <div className="mt-2 text-sm text-zinc-500">опасных маршрута</div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-white">{beginner}</div>
            <div className="mt-2 text-sm text-zinc-500">подходят новичку</div>
          </div>
        </div>
      </section>

      <BunkerFilters />
      <RaidKits />
    </main>
  );
}
