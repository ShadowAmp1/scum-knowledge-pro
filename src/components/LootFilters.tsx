"use client";

import { useMemo, useState } from "react";
import { Search, Package, MapPin, Star } from "lucide-react";
import { lootItems } from "@/data/loot";

const categories = ["Все", ...Array.from(new Set(lootItems.map((item) => item.category)))];
const rarities = ["Все", "Обычный", "Ценный", "Редкий", "Очень редкий"];
const priorities = ["Все", "Низкий", "Средний", "Высокий", "Максимальный"];

export function LootFilters() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Все");
  const [rarity, setRarity] = useState("Все");
  const [priority, setPriority] = useState("Все");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lootItems.filter((item) => {
      const matchesQuery = !q || [item.name, item.category, item.usage, item.keepOrSell, ...item.locations, ...item.tips]
        .join(" ")
        .toLowerCase()
        .includes(q);
      return matchesQuery && (category === "Все" || item.category === category) && (rarity === "Все" || item.rarity === rarity) && (priority === "Все" || item.priority === priority);
    });
  }, [query, category, rarity, priority]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">Поиск по луту</h2>
            <p className="mt-2 text-sm text-zinc-500">Найди предмет, где он спавнится и стоит ли его хранить.</p>
          </div>
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ремкомплект, NVG, болты, медицина..."
              className="w-full rounded-2xl border border-zinc-800 bg-black py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Select title="Категория" value={category} setValue={setCategory} options={categories} />
          <Select title="Редкость" value={rarity} setValue={setRarity} options={rarities} />
          <Select title="Приоритет" value={priority} setValue={setPriority} options={priorities} />
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <article key={item.slug} className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">{item.category}</span>
              <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{item.rarity}</span>
              <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{item.weight}</span>
            </div>

            <h3 className="mt-5 text-2xl font-black text-white">{item.name}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{item.usage}</p>

            <div className="mt-5 space-y-3 text-sm text-zinc-400">
              <div className="flex items-start gap-2"><Star size={16} className="mt-0.5 text-red-400" /> Приоритет: {item.priority}</div>
              <div className="flex items-start gap-2"><Package size={16} className="mt-0.5 text-red-400" /> {item.keepOrSell}</div>
              <div className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-red-400" /> {item.locations.join(" • ")}</div>
            </div>

            <div className="mt-5 rounded-2xl border border-zinc-800 bg-black p-4">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Советы</div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                {item.tips.map((tip) => <li key={tip}>• {tip}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Select({ title, value, setValue, options }: { title: string; value: string; setValue: (value: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-zinc-500">{title}</span>
      <select value={value} onChange={(event) => setValue(event.target.value)} className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-red-500">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
