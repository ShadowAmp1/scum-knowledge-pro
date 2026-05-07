"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { missionCategories, missionTraders, type Mission, type MissionCategory, type MissionTrader } from "@/data/missions";

const allCategories = "Все категории";
const allTraders = "Все источники";
const allTiers = "Все tier";

type CategoryFilter = MissionCategory | typeof allCategories;
type TraderFilter = MissionTrader | typeof allTraders;
type TierFilter = "1" | "2" | "3" | typeof allTiers;

export function MissionFilters({ missions }: { missions: Mission[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(allCategories);
  const [trader, setTrader] = useState<TraderFilter>(allTraders);
  const [tier, setTier] = useState<TierFilter>(allTiers);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return missions.filter((mission) => {
      const matchesQuery = !normalized || [
        mission.title,
        mission.short,
        mission.description,
        mission.trader,
        mission.source,
        mission.category,
        mission.tags.join(" "),
        mission.bestLocations.join(" "),
      ].join(" ").toLowerCase().includes(normalized);
      const matchesCategory = category === allCategories || mission.category === category;
      const matchesTrader = trader === allTraders || mission.trader === trader;
      const matchesTier = tier === allTiers || String(mission.tier) === tier;
      return matchesQuery && matchesCategory && matchesTrader && matchesTier;
    });
  }, [category, missions, query, tier, trader]);

  function reset() {
    setQuery("");
    setCategory(allCategories);
    setTrader(allTraders);
    setTier(allTiers);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-2xl shadow-black/30">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-red-400"><SlidersHorizontal size={16} /> Фильтры квестов</div>
            <p className="mt-2 text-sm text-zinc-500">Найдено: <b className="text-white">{filtered.length}</b> из {missions.length}</p>
          </div>
          <button onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-white" type="button">
            <X size={16} /> Сбросить
          </button>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск: DEENA, Armorer, доставка, зачистка..." className="h-12 w-full rounded-xl border border-zinc-800 bg-black pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/60" />
          </label>
          <select value={category} onChange={(event) => setCategory(event.target.value as CategoryFilter)} className="h-12 rounded-xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition focus:border-red-500/60">
            {[allCategories, ...missionCategories].map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={trader} onChange={(event) => setTrader(event.target.value as TraderFilter)} className="h-12 rounded-xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition focus:border-red-500/60">
            {[allTraders, ...missionTraders].map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={tier} onChange={(event) => setTier(event.target.value as TierFilter)} className="h-12 rounded-xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition focus:border-red-500/60">
            {[allTiers, "1", "2", "3"].map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((mission) => (
          <Link key={mission.slug} href={`/missions/${mission.slug}`} className="group rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 transition hover:-translate-y-1 hover:border-red-500/50 hover:bg-zinc-900">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">Tier {mission.tier}</span>
              <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{mission.trader}</span>
              <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-500">{mission.risk}</span>
            </div>
            <h2 className="mt-5 text-2xl font-black text-white">{mission.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{mission.short}</p>
            <div className="mt-5 text-sm font-black text-red-400 transition group-hover:text-red-300">Открыть миссию →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
