"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ListChecks, RotateCcw } from "lucide-react";
import type { Mission } from "@/data/missions";

const STORAGE_KEY = "scum-mission-tracker";

type TrackerState = Record<string, boolean>;

export function MissionTracker({ missions }: { missions: Mission[] }) {
  const [state, setState] = useState<TrackerState>({});
  const objectiveKeys = useMemo(() => missions.flatMap((mission) => mission.objectives.map((objective, index) => `${mission.slug}:${index}:${objective.trackerLabel}`)), [missions]);
  const done = objectiveKeys.filter((key) => state[key]).length;

  useEffect(() => {
    try {
      setState(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as TrackerState);
    } catch {
      setState({});
    }
  }, []);

  function save(next: TrackerState) {
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function toggle(key: string) {
    save({ ...state, [key]: !state[key] });
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-red-400"><ListChecks size={16} /> Quest tracker</div>
            <h2 className="mt-2 text-2xl font-black text-white">Прогресс целей</h2>
            <p className="mt-2 text-sm text-zinc-400">Выполнено {done} из {objectiveKeys.length}. Прогресс хранится в браузере игрока.</p>
          </div>
          <button type="button" onClick={() => save({})} className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 hover:border-red-500/50 hover:text-white"><RotateCcw size={16} /> Сбросить</button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {missions.map((mission) => (
            <article key={mission.slug} className="rounded-2xl border border-zinc-800 bg-black/40 p-4">
              <h3 className="font-black text-white">{mission.title}</h3>
              <div className="mt-3 space-y-2">
                {mission.objectives.map((objective, index) => {
                  const key = `${mission.slug}:${index}:${objective.trackerLabel}`;
                  return (
                    <label key={key} className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300 hover:border-red-500/40">
                      <input type="checkbox" checked={Boolean(state[key])} onChange={() => toggle(key)} className="h-4 w-4 accent-red-600" />
                      <CheckCircle2 size={16} className={state[key] ? "text-emerald-400" : "text-zinc-600"} />
                      <span>{objective.trackerLabel}</span>
                    </label>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
