"use client";

import Link from "next/link";
import { CheckCircle2, ClipboardList, Play, Trash2 } from "lucide-react";
import { missions as fallbackMissions, type Mission } from "@/data/missions";
import { useMissionTracker, type MissionTrackerStatus } from "@/lib/useMissionTracker";

const labels: Record<MissionTrackerStatus, string> = { planned: "План", active: "В работе", done: "Готово" };
const classes: Record<MissionTrackerStatus, string> = {
  planned: "border-zinc-700 bg-zinc-900 text-zinc-300",
  active: "border-amber-500/40 bg-amber-500/10 text-amber-200",
  done: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
};

export function MissionTracker({ missions = fallbackMissions }: { missions?: Mission[] }) {
  const { entries, isLoaded, stats, setStatus, removeMission, clearTracker } = useMissionTracker();
  if (!isLoaded) return null;

  const tracked = entries
    .map((entry) => ({ entry, mission: missions.find((mission) => mission.slug === entry.slug) }))
    .filter((item): item is { entry: typeof entries[number]; mission: Mission } => Boolean(item.mission));

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/10 via-zinc-950 to-black p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-3 text-red-300"><ClipboardList size={22} /><span className="text-sm font-black uppercase tracking-[0.25em]">Quest tracker</span></div>
            <h2 className="mt-3 text-3xl font-black text-white">Личный трекер квестов</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">Хранится локально в браузере: добавляй миссии в план, отмечай активные, закрытые и objectives.</p>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center sm:min-w-[420px]">
            <Stat label="Всего" value={stats.total} /><Stat label="План" value={stats.planned} /><Stat label="В работе" value={stats.active} /><Stat label="Готово" value={stats.done} />
          </div>
        </div>

        {tracked.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-black/50 p-5 text-sm text-zinc-400">Пока трекер пуст. Нажми “В план” или “В работу” на карточке квеста.</div>
        ) : (
          <div className="mt-6 space-y-3">
            {tracked.map(({ entry, mission }) => {
              const completed = entry.completedObjectives.length;
              const total = mission.objectives.length;
              const percent = total > 0 ? Math.round((completed / total) * 100) : entry.status === "done" ? 100 : 0;
              return (
                <article key={entry.slug} className="rounded-2xl border border-zinc-800 bg-black/50 p-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap gap-2"><span className={`rounded-full border px-3 py-1 text-xs font-black ${classes[entry.status]}`}>{labels[entry.status]}</span><span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">Tier {mission.tier}</span><span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{mission.trader}</span></div>
                      <Link href={`/missions/${mission.slug}`} className="mt-2 block text-lg font-black text-white transition hover:text-red-300">{mission.title}</Link>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-900"><div className="h-full rounded-full bg-red-500" style={{ width: `${percent}%` }} /></div>
                      <p className="mt-2 text-xs text-zinc-500">Objectives: {completed}/{total} • {percent}%</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setStatus(mission.slug, "planned")} className="rounded-xl border border-zinc-800 px-3 py-2 text-xs font-bold text-zinc-300">В план</button>
                      <button onClick={() => setStatus(mission.slug, "active")} className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-200"><Play size={14} />В работу</button>
                      <button onClick={() => setStatus(mission.slug, "done")} className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-200"><CheckCircle2 size={14} />Готово</button>
                      <button onClick={() => removeMission(mission.slug)} className="rounded-xl border border-zinc-800 px-3 py-2 text-xs font-bold text-zinc-500 hover:text-red-300"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </article>
              );
            })}
            <button onClick={clearTracker} className="mt-2 inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-400 hover:text-red-300"><Trash2 size={16} />Очистить трекер</button>
          </div>
        )}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl border border-zinc-800 bg-black/60 p-3"><div className="text-2xl font-black text-white">{value}</div><div className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-500">{label}</div></div>;
}
