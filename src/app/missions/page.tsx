export const dynamic = "force-dynamic";

export const metadata = {
  title: "Квесты / Missions PRO SCUM | SCUM DB PRO",
  description: "База квестов SCUM: торговцы, notice boards, телефон, DEENA, tier progression, фильтры, карточки и личный quest tracker.",
};

import { MissionFilters } from "@/components/MissionFilters";
import { MissionTracker } from "@/components/MissionTracker";
import { PageHeader } from "@/components/PageHeader";
import { getContentData } from "@/lib/content";
import { missionCategories, missionCategoryInfo, missionTierProgression } from "@/data/missions";

function Stat({ value, label }: { value: string | number; label: string }) {
  return <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6"><div className="text-4xl font-black text-red-500">{value}</div><div className="mt-1 text-sm font-bold text-zinc-400">{label}</div></div>;
}

export default async function MissionsPage() {
  const data = (await getContentData()) as any;
  const missions = data.missions ?? [];
  const tier1 = missions.filter((mission: any) => mission.tier === 1).length;
  const tier2 = missions.filter((mission: any) => mission.tier === 2).length;
  const tier3 = missions.filter((mission: any) => mission.tier === 3).length;
  const traders = new Set(missions.map((mission: any) => mission.trader)).size;

  return (
    <main>
      <PageHeader eyebrow="Missions PRO" title="Квесты / Missions PRO" description="База квестов SCUM с категориями, торговцами, источниками, Tier progression, требованиями, наградами, маршрутами и личным quest tracker." />
      {data.__meta?.message ? <div className="mx-auto max-w-7xl px-4"><div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">{data.__meta.message}</div></div> : null}
      <section className="mx-auto max-w-7xl px-4 py-10"><div className="grid gap-4 md:grid-cols-4"><Stat value={missions.length} label="миссий в базе" /><Stat value={traders} label="источников/торговцев" /><Stat value={missionCategories.length} label="категорий" /><Stat value={`${tier1}/${tier2}/${tier3}`} label="Tier 1 / 2 / 3" /></div></section>
      <MissionTracker missions={missions} />
      <section className="mx-auto max-w-7xl px-4 py-8"><div className="grid gap-5 lg:grid-cols-3">{missionTierProgression.map((tier) => <article key={tier.tier} className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6"><div className="text-sm font-black uppercase tracking-[0.25em] text-red-400">Tier {tier.tier}</div><h2 className="mt-3 text-2xl font-black text-white">{tier.title}</h2><p className="mt-3 text-sm leading-6 text-zinc-400">{tier.description}</p><div className="mt-5 rounded-2xl border border-zinc-800 bg-black/50 p-4 text-sm text-zinc-400"><b className="text-zinc-200">Рекомендуемый уровень:</b> {tier.recommendedPower}</div><div className="mt-4 flex flex-wrap gap-2">{tier.focus.map((item) => <span key={item} className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{item}</span>)}</div></article>)}</div></section>
      <section className="mx-auto max-w-7xl px-4 py-8"><div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6"><h2 className="text-2xl font-black text-white">Категории квестов</h2><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{missionCategoryInfo.map((item) => <article key={item.category} className="rounded-2xl border border-zinc-800 bg-black/50 p-4"><h3 className="font-black text-white">{item.category}</h3><p className="mt-2 text-sm leading-6 text-zinc-400">{item.description}</p><p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-red-300">{item.bestFor}</p></article>)}</div></div></section>
      <MissionFilters missions={missions} />
    </main>
  );
}
