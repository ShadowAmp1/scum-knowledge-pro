"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Shield, Search, Swords, Users, MapPin } from "lucide-react";
import { bunkers } from "@/data/bunkers";
import { cn } from "@/lib/utils";

const riskOptions = ["Все", "Низкий", "Средний", "Высокий", "Экстремальный"];
const typeOptions = ["Все", "Старый бункер", "Заброшенный бункер", "Военная зона", "Тренировочный маршрут"];
const lootOptions = ["Все", "B", "A", "S", "S+"];

export function BunkerFilters() {
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState("Все");
  const [type, setType] = useState("Все");
  const [lootTier, setLootTier] = useState("Все");
  const [onlyBeginner, setOnlyBeginner] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bunkers.filter((bunker) => {
      const matchesQuery = !q || [bunker.name, bunker.sector, bunker.short, bunker.type, ...bunker.loot, ...bunker.recommendedWeapons]
        .join(" ")
        .toLowerCase()
        .includes(q);
      const matchesRisk = risk === "Все" || bunker.risk === risk;
      const matchesType = type === "Все" || bunker.type === type;
      const matchesLoot = lootTier === "Все" || bunker.lootTier === lootTier;
      const matchesBeginner = !onlyBeginner || bunker.beginnerFriendly;
      return matchesQuery && matchesRisk && matchesType && matchesLoot && matchesBeginner;
    });
  }, [query, risk, type, lootTier, onlyBeginner]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">Поиск по бункерам</h2>
            <p className="mt-2 text-sm text-zinc-500">Фильтруй по риску, типу, качеству лута и готовности для новичка.</p>
          </div>
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="A1, ремкомплект, MP5, высокий риск..."
              className="w-full rounded-2xl border border-zinc-800 bg-black py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          <SelectPill title="Риск" value={risk} setValue={setRisk} options={riskOptions} />
          <SelectPill title="Тип" value={type} setValue={setType} options={typeOptions} />
          <SelectPill title="Лут" value={lootTier} setValue={setLootTier} options={lootOptions} />
          <button
            onClick={() => setOnlyBeginner((value) => !value)}
            className={cn(
              "rounded-2xl border px-4 py-3 text-left text-sm font-black transition",
              onlyBeginner ? "border-red-500 bg-red-500/10 text-red-300" : "border-zinc-800 bg-black text-zinc-400 hover:border-zinc-600"
            )}
          >
            Только для новичка: {onlyBeginner ? "Да" : "Нет"}
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((bunker) => (
          <Link key={bunker.slug} href={`/bunkers/${bunker.slug}`} className="group rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 transition hover:-translate-y-1 hover:border-red-500/50 hover:bg-zinc-900">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">Сектор {bunker.sector}</span>
              <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{bunker.type}</span>
              <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">Tier {bunker.lootTier}</span>
            </div>

            <h3 className="mt-5 text-2xl font-black text-white">{bunker.name}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{bunker.short}</p>

            <div className="mt-5 grid gap-3 text-sm text-zinc-400">
              <div className="flex items-center gap-2"><Shield size={16} className="text-red-400" /> Риск: {bunker.risk}</div>
              <div className="flex items-center gap-2"><Swords size={16} className="text-red-400" /> {bunker.recommendedWeapons.slice(0, 3).join(" • ")}</div>
              <div className="flex items-center gap-2"><Users size={16} className="text-red-400" /> Дуо: {bunker.duoFriendly ? "удобно" : "сложно"}</div>
              <div className="flex items-center gap-2"><MapPin size={16} className="text-red-400" /> {bunker.recommendedTime}</div>
            </div>

            <div className="mt-6 text-sm font-black text-red-400 transition group-hover:text-red-300">Открыть маршрут →</div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-center text-zinc-400">Ничего не найдено. Попробуй другой фильтр.</div>
      )}
    </section>
  );
}

function SelectPill({ title, value, setValue, options }: { title: string; value: string; setValue: (value: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-zinc-500">{title}</span>
      <select
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-red-500"
      >
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
