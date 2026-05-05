"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MapPin, Package, Search, Star, X } from "lucide-react";
import {
  lootCategories,
  lootItems as fallbackLootItems,
  lootPriorities,
  lootUsefulnessLevels,
  lootRarities,
  lootWeights,
  type LootItem,
  type LootPriority,
  type LootRarity,
  type LootWeight,
} from "@/data/loot";
import { FavoriteButton } from "@/components/FavoriteButton";

const all = "Все";

type SortMode = "priority" | "name" | "rarity" | "weight";

const priorityWeight: Record<LootPriority, number> = {
  "Максимальный": 4,
  "Высокий": 3,
  "Средний": 2,
  "Низкий": 1,
};

const rarityWeight: Record<LootRarity, number> = {
  "Очень редкий": 4,
  "Редкий": 3,
  "Ценный": 2,
  "Обычный": 1,
};

const weightOrder: Record<LootWeight, number> = {
  "Легкий": 1,
  "Средний": 2,
  "Тяжелый": 3,
};

export function LootFilters({ lootItems = fallbackLootItems }: { lootItems?: LootItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(all);
  const [rarity, setRarity] = useState(all);
  const [priority, setPriority] = useState(all);
  const [usefulness, setUsefulness] = useState(all);
  const [weight, setWeight] = useState(all);
  const [sort, setSort] = useState<SortMode>("priority");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return lootItems
      .filter((item) => {
        const matchesQuery =
          !q ||
          [
            item.name,
            item.category,
            item.usage,
            item.keepOrSell,
            item.serverNote ?? "",
            item.value,
            item.rarity,
            item.priority,
            item.usefulness,
            item.stage,
            item.forWhom,
            ...item.locations,
            ...item.bestLocations,
            ...item.tips,
            ...item.related,
          ]
            .join(" ")
            .toLowerCase()
            .includes(q);

        return (
          matchesQuery &&
          (category === all || item.category === category) &&
          (rarity === all || item.rarity === rarity) &&
          (priority === all || item.priority === priority) &&
          (usefulness === all || item.usefulness === usefulness) &&
          (weight === all || item.weight === weight)
        );
      })
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name, "ru");
        if (sort === "rarity") return rarityWeight[b.rarity] - rarityWeight[a.rarity];
        if (sort === "weight") return weightOrder[a.weight] - weightOrder[b.weight];
        return priorityWeight[b.priority] - priorityWeight[a.priority] || rarityWeight[b.rarity] - rarityWeight[a.rarity];
      });
  }, [lootItems, query, category, rarity, priority, usefulness, weight, sort]);

  function resetFilters() {
    setQuery("");
    setCategory(all);
    setRarity(all);
    setPriority(all);
    setUsefulness(all);
    setWeight(all);
    setSort("priority");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">Поиск по луту</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Найди предмет, где он лучше всего спавнится, что с ним делать и стоит ли его продавать.
            </p>
          </div>
          <button
            onClick={resetFilters}
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-white"
          >
            <X size={16} /> Сбросить
          </button>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1.4fr_repeat(6,1fr)]">
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ремкомплект, NVG, 7.62, карта, топливо..."
              className="h-12 w-full rounded-2xl border border-zinc-800 bg-black py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
            />
          </label>

          <Select title="Категория" value={category} setValue={setCategory} options={[all, ...lootCategories]} />
          <Select title="Редкость" value={rarity} setValue={setRarity} options={[all, ...lootRarities]} />
          <Select title="Приоритет" value={priority} setValue={setPriority} options={[all, ...lootPriorities]} />
          <Select title="Полезность" value={usefulness} setValue={setUsefulness} options={[all, ...lootUsefulnessLevels]} />
          <Select title="Вес" value={weight} setValue={setWeight} options={[all, ...lootWeights]} />
          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Сортировка</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortMode)}
              className="h-12 w-full rounded-2xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition focus:border-red-500"
            >
              <option value="priority">По приоритету</option>
              <option value="rarity">По редкости</option>
              <option value="weight">Легкие выше</option>
              <option value="name">По названию</option>
            </select>
          </label>
        </div>

        <div className="mt-5 text-sm text-zinc-500">
          Найдено: <b className="text-white">{filtered.length}</b> из {lootItems.length}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <Link
            key={item.slug}
            href={`/loot/${item.slug}`}
            className="group relative rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 transition hover:-translate-y-1 hover:border-red-500/50 hover:bg-zinc-900"
          >
            <div className="absolute right-4 top-4">
              <FavoriteButton type="loot" slug={item.slug} />
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">{item.category}</span>
              <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{item.rarity}</span>
              <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{item.weight}</span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-200">{item.usefulness}</span>
            </div>

            <h3 className="mt-5 text-2xl font-black text-white">{item.name}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{item.usage}</p>

            <div className="mt-5 space-y-3 text-sm text-zinc-400">
              <div className="flex items-start gap-2"><Star size={16} className="mt-0.5 text-red-400" /> Приоритет: {item.priority}</div>
              <div className="flex items-start gap-2"><Package size={16} className="mt-0.5 text-red-400" /> {item.keepOrSell}</div>
              <div className="rounded-2xl border border-zinc-800 bg-black/40 p-3 text-xs leading-5 text-zinc-400">
                <b className="text-zinc-200">Этап:</b> {item.stage}
              </div>
              <div className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-red-400" /> Лучше искать: {item.bestLocations.slice(0, 3).join(" • ")}</div>
            </div>

            <div className="mt-5 text-sm font-black text-red-400 transition group-hover:text-red-300">
              Открыть карточку →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Select({ title, value, setValue, options }: { title: string; value: string; setValue: (value: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-zinc-500">{title}</span>
      <select value={value} onChange={(event) => setValue(event.target.value)} className="h-12 w-full rounded-2xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition focus:border-red-500">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
