import { PageHeader } from "@/components/PageHeader";
import { LootFilters } from "@/components/LootFilters";
import { lootItems } from "@/data/loot";

export default function LootPage() {
  const maxPriority = lootItems.filter((item) => item.priority === "Максимальный").length;
  const rare = lootItems.filter((item) => item.rarity === "Редкий" || item.rarity === "Очень редкий").length;
  const categories = new Set(lootItems.map((item) => item.category)).size;

  return (
    <main>
      <PageHeader title="Лут" description="SCUM DB PRO v3: поиск по предметам, приоритет хранения, места фарма, ценность, категории и быстрые советы." />

      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-white">{lootItems.length}</div>
            <div className="mt-2 text-sm text-zinc-500">предметов в базе v3</div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-red-400">{maxPriority}</div>
            <div className="mt-2 text-sm text-zinc-500">максимальный приоритет</div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-white">{categories}</div>
            <div className="mt-2 text-sm text-zinc-500">категорий лута</div>
          </div>
        </div>
      </section>

      <LootFilters />

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
          <h2 className="text-2xl font-black text-white">Правило сортировки лута</h2>
          <p className="mt-3 max-w-3xl text-zinc-400">
            В бункере не забивай рюкзак дешевыми вещами. Сначала бери ремонт, патроны под свое оружие, медицину, редкую оптику, NVG и инструменты. Тяжелые предметы бери только если они нужны базе или транспорту.
          </p>
        </div>
      </section>
    </main>
  );
}
