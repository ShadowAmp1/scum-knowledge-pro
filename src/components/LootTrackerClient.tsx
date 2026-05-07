"use client";

import { useEffect, useMemo, useState } from "react";
import { PackageCheck, RotateCcw } from "lucide-react";

type LootItem = { slug: string; name: string; category?: string; priority?: string; usage?: string };
type TrackerState = Record<string, boolean>;
const STORAGE_KEY = "scum-loot-tracker";

export function LootTrackerClient({ lootItems }: { lootItems: LootItem[] }) {
  const [state, setState] = useState<TrackerState>({});
  const important = useMemo(() => lootItems.filter((item) => ["Высокий", "Максимальный"].includes(String(item.priority ?? ""))).slice(0, 60), [lootItems]);
  const done = important.filter((item) => state[item.slug]).length;

  useEffect(() => {
    try { setState(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as TrackerState); } catch { setState({}); }
  }, []);

  function save(next: TrackerState) { setState(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }
  function toggle(slug: string) { save({ ...state, [slug]: !state[slug] }); }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-red-400"><PackageCheck size={16} /> Loot tracker</div><h2 className="mt-2 text-2xl font-black text-white">Важный лут</h2><p className="mt-2 text-sm text-zinc-400">Отмечено {done} из {important.length}. Прогресс хранится в браузере.</p></div><button type="button" onClick={() => save({})} className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 hover:border-red-500/50 hover:text-white"><RotateCcw size={16} /> Сбросить</button></div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{important.map((item) => <label key={item.slug} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-800 bg-black/40 p-4 hover:border-red-500/40"><input type="checkbox" checked={Boolean(state[item.slug])} onChange={() => toggle(item.slug)} className="mt-1 h-4 w-4 accent-red-600" /><div><div className="font-black text-white">{item.name}</div><div className="mt-1 text-xs text-zinc-500">{item.category} • {item.priority}</div>{item.usage ? <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{item.usage}</p> : null}</div></label>)}</div>
      </div>
    </section>
  );
}
