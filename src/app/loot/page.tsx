import { PageHeader } from "@/components/PageHeader";
import { lootItems } from "@/data/loot";

export default function LootPage() {
  return (
    <main>
      <PageHeader title="Лут" description="Ценные предметы, категории, где искать и что лучше хранить или продавать." />
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/80">
          <div className="grid grid-cols-5 gap-4 border-b border-zinc-800 bg-black/40 p-4 text-sm font-black text-zinc-300 max-md:hidden">
            <div>Предмет</div><div>Категория</div><div>Редкость</div><div>Где искать</div><div>Совет</div>
          </div>
          {lootItems.map((item) => (
            <div key={item.name} className="grid gap-4 border-b border-zinc-800 p-4 text-sm last:border-b-0 md:grid-cols-5">
              <div className="font-black text-white">{item.name}</div>
              <div className="text-zinc-400">{item.category}</div>
              <div className="text-red-300">{item.rarity}</div>
              <div className="text-zinc-400">{item.locations.join(", ")}</div>
              <div className="text-zinc-300">{item.keepOrSell}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
