"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, ClipboardList, Filter, MapPin, Play, Search, ShieldAlert, Star, X } from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { missionCategories, missionDifficulties, missionRisks, missionSources, missionTraders, missions as fallbackMissions, type Mission, type MissionDifficulty, type MissionRisk, type MissionTier } from "@/data/missions";
import { useMissionTracker } from "@/lib/useMissionTracker";

const all = "Все";
type SortMode = "tier" | "progression" | "risk" | "difficulty" | "name";
const difficultyWeight: Record<MissionDifficulty, number> = { "Легко": 1, "Средне": 2, "Сложно": 3, "Очень сложно": 4 };
const riskWeight: Record<MissionRisk, number> = { "Низкий": 1, "Средний": 2, "Высокий": 3, "Экстремальный": 4 };

export function MissionFilters({ missions = fallbackMissions }: { missions?: Mission[] }) {
  const [query, setQuery] = useState("");
  const [trader, setTrader] = useState(all);
  const [source, setSource] = useState(all);
  const [category, setCategory] = useState(all);
  const [tier, setTier] = useState(all);
  const [difficulty, setDifficulty] = useState(all);
  const [risk, setRisk] = useState(all);
  const [sort, setSort] = useState<SortMode>("tier");
  const { getEntry, setStatus } = useMissionTracker();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const tierNumber = tier === all ? null : Number(tier.replace("Tier ", "")) as MissionTier;
    return missions.filter((mission) => {
      const haystack = [mission.title, mission.short, mission.description, mission.trader, mission.source, mission.category, mission.difficulty, mission.risk, mission.dataStatus, ...mission.tags, ...mission.bestLocations, ...mission.recommendedGear, ...mission.routePlan, ...mission.relatedLoot, ...mission.relatedSections, ...mission.playerTips, ...mission.mistakes, ...mission.requirements.map((item) => `${item.name} ${item.note ?? ""} ${item.minDurability ?? ""} ${item.minUses ?? ""}`), ...mission.objectives.map((objective) => `${objective.title} ${objective.description} ${objective.target ?? ""} ${objective.locationHint ?? ""}`)].join(" ").toLowerCase();
      return (!q || haystack.includes(q)) && (trader === all || mission.trader === trader) && (source === all || mission.source === source) && (category === all || mission.category === category) && (tierNumber === null || mission.tier === tierNumber) && (difficulty === all || mission.difficulty === difficulty) && (risk === all || mission.risk === risk);
    }).sort((a, b) => sortMissions(a, b, sort));
  }, [missions, query, trader, source, category, tier, difficulty, risk, sort]);

  function resetFilters() { setQuery(""); setTrader(all); setSource(all); setCategory(all); setTier(all); setDifficulty(all); setRisk(all); setSort("tier"); }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div><div className="flex items-center gap-2 text-red-300"><Filter size={18} /><span className="text-xs font-black uppercase tracking-[0.25em]">Missions database</span></div><h2 className="mt-2 text-2xl font-black text-white">Фильтры квестов</h2><p className="mt-2 text-sm leading-6 text-zinc-500">Поиск по торговцу, источнику, tier, категории, сложности, риску, предметам и маршрутам.</p></div>
          <button onClick={resetFilters} type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-white"><X size={16} />Сбросить</button>
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-[1.5fr_repeat(7,1fr)]">
          <label className="relative block"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="пистолет, батарейка, medic, доска, бункер..." className="h-12 w-full rounded-2xl border border-zinc-800 bg-black py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500" /></label>
          <Select title="Торговец" value={trader} setValue={setTrader} options={[all, ...missionTraders]} />
          <Select title="Источник" value={source} setValue={setSource} options={[all, ...missionSources]} />
          <Select title="Категория" value={category} setValue={setCategory} options={[all, ...missionCategories]} />
          <Select title="Tier" value={tier} setValue={setTier} options={[all, "Tier 1", "Tier 2", "Tier 3"]} />
          <Select title="Сложность" value={difficulty} setValue={setDifficulty} options={[all, ...missionDifficulties]} />
          <Select title="Риск" value={risk} setValue={setRisk} options={[all, ...missionRisks]} />
          <label className="block"><span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Сортировка</span><select value={sort} onChange={(event) => setSort(event.target.value as SortMode)} className="h-12 w-full rounded-2xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition focus:border-red-500"><option value="tier">Tier ↑</option><option value="progression">Прогрессия ↓</option><option value="risk">Риск ↓</option><option value="difficulty">Сложность ↓</option><option value="name">Название</option></select></label>
        </div>
        <div className="mt-5 text-sm text-zinc-500">Найдено: <b className="text-white">{filtered.length}</b> из {missions.length}</div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((mission) => {
          const entry = getEntry(mission.slug);
          const completed = entry?.completedObjectives.length ?? 0;
          const total = mission.objectives.length;
          const percent = total > 0 ? Math.round((completed / total) * 100) : entry?.status === "done" ? 100 : 0;
          return (
            <article key={mission.slug} className="group relative rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 transition hover:-translate-y-1 hover:border-red-500/50 hover:bg-zinc-900">
              <div className="absolute right-4 top-4"><FavoriteButton type="mission" slug={mission.slug} /></div>
              <div className="flex flex-wrap gap-2 pr-12"><span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">Tier {mission.tier}</span><span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{mission.trader}</span><span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{mission.source}</span><span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-200">{mission.dataStatus}</span></div>
              <h3 className="mt-5 text-2xl font-black text-white">{mission.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{mission.short}</p>
              <div className="mt-5 grid gap-3 text-sm text-zinc-400"><div className="flex items-start gap-2"><Star size={16} className="mt-0.5 text-red-400" />{mission.category} • {mission.difficulty}</div><div className="flex items-start gap-2"><ShieldAlert size={16} className="mt-0.5 text-red-400" />Риск: {mission.risk}</div><div className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-red-400" />{mission.bestLocations.slice(0, 3).join(" • ")}</div></div>
              <div className="mt-5 rounded-2xl border border-zinc-800 bg-black/40 p-4"><div className="flex items-center justify-between gap-3 text-xs text-zinc-500"><span className="font-bold uppercase tracking-[0.18em]">Tracker</span><span>{completed}/{total} objectives • {percent}%</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-900"><div className="h-full rounded-full bg-red-500" style={{ width: `${percent}%` }} /></div><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => setStatus(mission.slug, "planned")} className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-3 py-2 text-xs font-bold text-zinc-300"><ClipboardList size={14} />В план</button><button type="button" onClick={() => setStatus(mission.slug, "active")} className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-200"><Play size={14} />В работу</button><button type="button" onClick={() => setStatus(mission.slug, "done")} className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-200"><CheckCircle2 size={14} />Готово</button></div></div>
              <Link href={`/missions/${mission.slug}`} className="mt-5 inline-block text-sm font-black text-red-400 transition group-hover:text-red-300">Открыть карточку →</Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function sortMissions(a: Mission, b: Mission, sort: SortMode) { if (sort === "name") return a.title.localeCompare(b.title, "ru"); if (sort === "risk") return riskWeight[b.risk] - riskWeight[a.risk] || b.tier - a.tier; if (sort === "difficulty") return difficultyWeight[b.difficulty] - difficultyWeight[a.difficulty] || b.tier - a.tier; if (sort === "progression") return b.progression.progressionValue - a.progression.progressionValue; return a.tier - b.tier || a.trader.localeCompare(b.trader, "ru") || a.title.localeCompare(b.title, "ru"); }
function Select({ title, value, setValue, options }: { title: string; value: string; setValue: (value: string) => void; options: string[] }) { return <label className="block"><span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-zinc-500">{title}</span><select value={value} onChange={(event) => setValue(event.target.value)} className="h-12 w-full rounded-2xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition focus:border-red-500">{options.map((option) => <option key={option}>{option}</option>)}</select></label>; }
