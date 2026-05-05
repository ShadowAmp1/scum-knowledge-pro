export const metadata = {
  title: "Лут SCUM | SCUM DB PRO",
  description: "Предметы лута SCUM: где искать, что хранить, что продавать, приоритеты и советы по серверам.",
};

import { PageHeader } from "@/components/PageHeader";
import { LootFilters } from "@/components/LootFilters";
import { getContentData } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function LootPage() {
  const data = await getContentData();
  const lootItems = data.loot;
  const maxPriority = lootItems.filter((item) => item.priority === "Максимальный").length;
  const rare = lootItems.filter((item) => item.rarity === "Редкий" || item.rarity === "Очень редкий").length;
  const categories = new Set(lootItems.map((item) => item.category)).size;

  return (
    <main>
      <PageHeader title="Лут" description="Полноценная база лута SCUM: карточки предметов, поиск, категории, приоритет хранения, лучшие места фарма и советы что продавать или оставлять." />

      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-white">{lootItems.length}</div>
            <div className="mt-2 text-sm text-zinc-500">предметов в базе</div>
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

      <LootFilters lootItems={lootItems} />

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
          <h2 className="text-2xl font-black text-white">Правило сортировки лута</h2>
          <p className="mt-3 max-w-3xl text-zinc-400">
            Не забивай рюкзак дешевыми тяжелыми вещами. Сначала бери ремкомплекты, патроны под свое оружие, медицину, редкую электронику, NVG, ключ-карты, инструменты и легкие ценные предметы. Тяжелые предметы бери только если они нужны базе, транспорту или конкретному крафту.
          </p>
        </div>
      </section>
    </main>
  );
}
