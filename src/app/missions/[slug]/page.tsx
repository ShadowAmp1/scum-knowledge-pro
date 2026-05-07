export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, MapPin, Route, ShieldAlert } from "lucide-react";
import { InfoCard } from "@/components/InfoCard";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getContentData } from "@/lib/content";
import { missions as fallbackMissions } from "@/data/missions";

export function generateStaticParams() {
  return fallbackMissions.map((mission) => ({ slug: mission.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const data = (await getContentData()) as any;
  const missions = data.missions ?? fallbackMissions;
  const mission = missions.find((item: any) => item.slug === params.slug);
  if (!mission) return { title: "Квест не найден | SCUM DB PRO" };
  return { title: `${mission.title} | Missions PRO`, description: `${mission.title}: ${mission.short}. Tier ${mission.tier}, ${mission.trader}, категория ${mission.category}, риск ${mission.risk}.` };
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-2xl border border-zinc-800 bg-black/50 p-4"><div className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">{label}</div><div className="mt-2 text-lg font-black text-white">{value}</div></div>;
}

export default async function MissionDetailPage({ params }: { params: { slug: string } }) {
  const data = (await getContentData()) as any;
  const missions = data.missions ?? fallbackMissions;
  const mission = missions.find((item: any) => item.slug === params.slug);
  if (!mission) notFound();
  const related = missions.filter((other: any) => other.slug !== mission.slug && (other.trader === mission.trader || other.category === mission.category || other.tier === mission.tier)).slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <Link href="/missions" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-400 transition hover:text-white"><ArrowLeft size={16} />Назад к Missions PRO</Link>
      <article className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl shadow-black/30">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2"><span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-300">Tier {mission.tier}</span><span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{mission.trader}</span><span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{mission.source}</span><span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{mission.category}</span><span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">Риск: {mission.risk}</span></div>
            <h1 className="mt-5 text-4xl font-black text-white md:text-6xl">{mission.title}</h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-400">{mission.description}</p>
          </div>
          <FavoriteButton type="mission" slug={mission.slug} showLabel className="shrink-0" />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4"><Metric label="Категория" value={mission.category} /><Metric label="Сложность" value={mission.difficulty} /><Metric label="Риск" value={mission.risk} /><Metric label="Прогресс" value={`${mission.progression.progressionValue}%`} /></div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <InfoCard title="Требования"><ul className="space-y-3">{mission.requirements.length ? mission.requirements.map((item: any) => <li key={`${item.name}-${item.amount}`} className="rounded-2xl border border-zinc-800 bg-black/50 p-4"><div className="flex items-start gap-2 text-zinc-300"><b className="text-red-400">{item.name}</b>{item.amount ? <span>× {item.amount}</span> : null}</div>{item.minDurability ? <p className="mt-2 text-sm text-zinc-500">Состояние: {item.minDurability}</p> : null}{item.minUses ? <p className="mt-2 text-sm text-zinc-500">Uses/заряд: {item.minUses}</p> : null}{item.note ? <p className="mt-2 text-sm text-zinc-500">{item.note}</p> : null}</li>) : <p>Особых требований нет.</p>}</ul></InfoCard>
          <InfoCard title="Objectives"><ol className="space-y-3">{mission.objectives.map((objective: any, index: number) => <li key={objective.trackerLabel} className="rounded-2xl border border-zinc-800 bg-black/50 p-4"><div className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-red-500/10 text-sm font-black text-red-300">{index + 1}</span><div><h3 className="font-black text-white">{objective.title}</h3><p className="mt-1 text-sm leading-6 text-zinc-400">{objective.description}</p>{objective.target ? <span className="mt-3 inline-flex rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400">Цель: {objective.target}</span> : null}{objective.amount ? <span className="ml-2 mt-3 inline-flex rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400">× {objective.amount}</span> : null}{objective.locationHint ? <span className="ml-2 mt-3 inline-flex rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400">{objective.locationHint}</span> : null}</div></div></li>)}</ol></InfoCard>
          <InfoCard title="Лучшие места и маршрут"><div className="space-y-5"><div><h3 className="flex items-center gap-2 font-black text-white"><MapPin size={18} className="text-red-400" />Где выполнять</h3><div className="mt-3 flex flex-wrap gap-2">{mission.bestLocations.map((location: string) => <span key={location} className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-300">{location}</span>)}</div></div><div><h3 className="flex items-center gap-2 font-black text-white"><Route size={18} className="text-red-400" />План маршрута</h3><ol className="mt-3 space-y-2 text-sm leading-6 text-zinc-400">{mission.routePlan.map((step: string, index: number) => <li key={step}>#{index + 1} {step}</li>)}</ol></div></div></InfoCard>
          <InfoCard title="Снаряжение"><ul className="space-y-2">{mission.recommendedGear.map((item: string) => <li key={item} className="flex gap-2"><ShieldAlert size={16} className="mt-1 shrink-0 text-red-400" />{item}</li>)}</ul></InfoCard>
          <InfoCard title="Советы"><ul className="space-y-2">{mission.playerTips.map((tip: string) => <li key={tip} className="flex gap-2"><CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-400" />{tip}</li>)}</ul></InfoCard>
          <InfoCard title="Частые ошибки"><ul className="space-y-2">{mission.mistakes.map((mistake: string) => <li key={mistake} className="flex gap-2"><ShieldAlert size={16} className="mt-1 shrink-0 text-red-400" />{mistake}</li>)}</ul></InfoCard>
        </div>
      </article>
      {related.length ? <section className="mt-8"><h2 className="text-2xl font-black text-white">Похожие миссии</h2><div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{related.map((item: any) => <Link key={item.slug} href={`/missions/${item.slug}`} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 hover:border-red-500/50"><div className="text-xs font-bold text-red-300">Tier {item.tier} • {item.trader}</div><div className="mt-2 font-black text-white">{item.title}</div></Link>)}</div></section> : null}
    </main>
  );
}
