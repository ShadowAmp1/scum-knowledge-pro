"use client";

import { CheckCircle2, ClipboardList, Play } from "lucide-react";
import type { Mission } from "@/data/missions";
import { useMissionTracker } from "@/lib/useMissionTracker";

export function MissionObjectiveTracker({ mission }: { mission: Mission }) {
  const { isLoaded, getEntry, setStatus, toggleObjective } = useMissionTracker();
  if (!isLoaded) return null;
  const entry = getEntry(mission.slug);
  const completed = entry?.completedObjectives ?? [];
  const percent = mission.objectives.length ? Math.round((completed.length / mission.objectives.length) * 100) : 0;

  return (
    <section className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div><div className="flex items-center gap-2 text-red-300"><ClipboardList size={18} /><span className="text-xs font-black uppercase tracking-[0.25em]">Quest tracker</span></div><h2 className="mt-2 text-2xl font-black text-white">Чек-лист выполнения</h2><p className="mt-2 text-sm text-zinc-400">Отмечай objectives по мере прохождения.</p></div>
        <div className="flex flex-wrap gap-2"><button onClick={() => setStatus(mission.slug, "planned")} className="rounded-xl border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300">В план</button><button onClick={() => setStatus(mission.slug, "active")} className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-bold text-amber-200"><Play size={16} />В работу</button><button onClick={() => setStatus(mission.slug, "done")} className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-200"><CheckCircle2 size={16} />Готово</button></div>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-900"><div className="h-full rounded-full bg-red-500" style={{ width: `${percent}%` }} /></div>
      <p className="mt-2 text-xs text-zinc-500">Выполнено: {completed.length}/{mission.objectives.length} • {percent}%</p>
      <div className="mt-5 space-y-3">
        {mission.objectives.map((objective) => {
          const checked = completed.includes(objective.trackerLabel);
          return <label key={objective.trackerLabel} className="flex cursor-pointer gap-3 rounded-2xl border border-zinc-800 bg-black/50 p-4 hover:border-red-500/40"><input type="checkbox" checked={checked} onChange={() => toggleObjective(mission.slug, objective.trackerLabel)} className="mt-1 h-5 w-5 rounded border-zinc-700 bg-black accent-red-500" /><span><span className={`block font-black ${checked ? "text-emerald-300 line-through" : "text-white"}`}>{objective.trackerLabel}</span><span className="mt-1 block text-sm leading-6 text-zinc-400">{objective.description}</span></span></label>;
        })}
      </div>
    </section>
  );
}
