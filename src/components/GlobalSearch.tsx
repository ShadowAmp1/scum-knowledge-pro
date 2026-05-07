"use client";

import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { searchItems, searchKinds, type SearchKind } from "@/lib/searchIndex";

type KindFilter = SearchKind | "Все";
const normalize = (value: string) => value.trim().toLowerCase();

function scoreItem(query: string, item: (typeof searchItems)[number]) {
  if (!query) return item.priority;
  const title = item.title.toLowerCase();
  let score = item.priority;
  if (title === query) score += 100;
  if (title.includes(query)) score += 60;
  if (item.badges.join(" ").toLowerCase().includes(query)) score += 35;
  if (item.description.toLowerCase().includes(query)) score += 25;
  if (item.keywords.includes(query)) score += 15;
  for (const token of query.split(/\s+/).filter(Boolean)) {
    if (title.includes(token)) score += 12;
    if (item.keywords.includes(token)) score += 5;
  }
  return score;
}

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<KindFilter>("Все");
  const normalizedQuery = normalize(query);

  const results = useMemo(() => searchItems
    .filter((item) => {
      const matchesKind = kind === "Все" || item.kind === kind;
      const matchesQuery = !normalizedQuery || item.title.toLowerCase().includes(normalizedQuery) || item.description.toLowerCase().includes(normalizedQuery) || item.badges.join(" ").toLowerCase().includes(normalizedQuery) || item.keywords.includes(normalizedQuery) || normalizedQuery.split(/\s+/).every((token) => item.keywords.includes(token));
      return matchesKind && matchesQuery;
    })
    .map((item) => ({ item, score: scoreItem(normalizedQuery, item) }))
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, "ru"))
    .map(({ item }) => item)
    .slice(0, 80), [kind, normalizedQuery]);

  const popularQueries = ["AKM", "обвесы", "оружейный ремкомплект", "бункер A1", "деньги", "транспорт", "патроны", "база"];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-2xl shadow-black/30">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-red-400"><SlidersHorizontal size={16} /> Глобальный поиск</div>
            <p className="mt-2 text-sm text-zinc-500">Ищет по оружию, обвесам, луту, бункерам, карте, гайдам, транспорту и разделам. Найдено: <b className="text-white">{results.length}</b></p>
          </div>
          <button type="button" onClick={() => { setQuery(""); setKind("Все"); }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-white"><X size={16} /> Сбросить</button>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1.7fr_0.8fr]">
          <label className="relative block"><Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ищи: AKM, глушитель, ремкомплект, бункер B0, деньги, транспорт..." className="h-12 w-full rounded-xl border border-zinc-800 bg-black pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/60" /></label>
          <select value={kind} onChange={(event) => setKind(event.target.value as KindFilter)} className="h-12 rounded-xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition focus:border-red-500/60">{searchKinds.map((item) => <option key={item} value={item}>{item}</option>)}</select>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">{popularQueries.map((item) => <button key={item} type="button" onClick={() => setQuery(item)} className="rounded-full border border-zinc-800 bg-black px-3 py-1 text-xs font-bold text-zinc-400 transition hover:border-red-500/50 hover:text-white">{item}</button>)}</div>
      </div>
      {results.length === 0 ? <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center"><h2 className="text-2xl font-black text-white">Ничего не найдено</h2><p className="mt-2 text-zinc-500">Попробуй другое название, калибр, сектор или категорию.</p></div> : <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{results.map((result) => <Link key={result.id} href={result.href} className="group flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 transition hover:-translate-y-1 hover:border-red-500/50 hover:bg-zinc-900"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-black text-red-200">{result.kind}</span>{result.badges.slice(0, 3).map((badge) => <span key={badge} className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-500">{badge}</span>)}</div><h2 className="mt-4 text-xl font-black text-white">{result.title}</h2><p className="mt-2 flex-1 text-sm leading-6 text-zinc-400">{result.description}</p><div className="mt-4 text-sm font-black text-red-400 transition group-hover:text-red-300">Открыть →</div></Link>)}</div>}
    </section>
  );
}
