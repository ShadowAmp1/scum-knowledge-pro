import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Coins, Gift, MapPin, Package, Route, ShieldAlert, Star, TriangleAlert } from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { InfoCard } from "@/components/InfoCard";
import { MissionObjectiveTracker } from "@/components/MissionObjectiveTracker";
import { missions as fallbackMissions } from "@/data/missions";
import { getContentData } from "@/lib/content";

export const dynamic = "force-dynamic";
export function generateStaticParams() { return fallbackMissions.map((mission) => ({ slug: mission.slug })); }
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { missions } = await getContentData();
  const mission = missions.find((item) => item.slug === params.slug);
  if (!mission) return { title: "Квест не найден | SCUM DB PRO" };
  return { title: `${mission.title} | Missions PRO`, description: `${mission.title}: ${mission.short}. Tier ${mission.tier}, ${mission.trader}, категория ${mission.category}, риск ${mission.risk}.` };
}

export default async function MissionDetailPage({ params }: { params: { slug: string } }) {
  const { missions } = await getContentData();
  const mission = missions.find((item) => item.slug === params.slug);
  if (!mission) notFound();
  const related = missions.filter((other) => other.slug !== mission.slug && (other.trader === mission.trader || other.category === mission.category || other.tier === mission.tier)).slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <Link href="/missions" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-400 transition hover:text-white"><ArrowLeft size={16} />Назад к Missions PRO</Link>
      <article className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl shadow-black/30">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between"><div><div className="flex flex-wrap gap-2"><span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">Tier {mission.tier}</span><span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{mission.trader}</span><span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{mission.source}</span><span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-200">{mission.dataStatus}</span></div><h1 className="mt-5 text-4xl font-black text-white md:text-6xl">{mission.title}</h1><p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-400">{mission.description}</p></div><FavoriteButton type="mission" slug={mission.slug} showLabel className="shrink-0" /></div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4"><Metric label="Категория" value={mission.category} /><Metric label="Сложность" value={mission.difficulty} /><Metric label="Риск" value={mission.risk} /><Metric label="Прогрессия" value={`${mission.progression.progressionValue}%`} /></div>
      </article>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"><MissionObjectiveTracker mission={mission} /><InfoCard title="Награда и прогрессия"><div className="space-y-4 text-sm leading-6 text-zinc-300"><div className="flex gap-2"><Coins size={16} className="mt-1 shrink-0 text-red-400" />Деньги: {mission.reward.cash}</div><div className="flex gap-2"><Star size={16} className="mt-1 shrink-0 text-red-400" />Fame: {mission.reward.fame}</div><div className="flex gap-2"><Gift size={16} className="mt-1 shrink-0 text-red-400" />Репутация: {mission.reward.reputation}</div><div className="rounded-2xl border border-zinc-800 bg-black/50 p-4 text-zinc-400"><b className="text-zinc-200">Открывает дальше:</b> {mission.progression.unlocksNext}</div><p className="text-zinc-400">{mission.reward.notes}</p></div></InfoCard></div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <InfoCard title="Требования">{mission.requirements.length ? <ul className="space-y-3">{mission.requirements.map((item) => <li key={`${item.name}-${item.amount}`} className="rounded-2xl border border-zinc-800 bg-black/50 p-4"><div className="flex items-start gap-2 text-zinc-200"><Package size={16} className="mt-1 shrink-0 text-red-400" /><b>{item.name}</b> × {item.amount}</div>{item.minDurability ? <p className="mt-2 text-sm text-zinc-500">Состояние: {item.minDurability}</p> : null}{item.minUses ? <p className="mt-2 text-sm text-zinc-500">Uses/заряд: {item.minUses}</p> : null}{item.note ? <p className="mt-2 text-sm text-zinc-500">{item.note}</p> : null}</li>)}</ul> : <p>Особых требований нет.</p>}</InfoCard>
        <InfoCard title="Objectives"><ol className="space-y-3">{mission.objectives.map((objective, index) => <li key={objective.trackerLabel} className="rounded-2xl border border-zinc-800 bg-black/50 p-4"><div className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-red-500/10 text-sm font-black text-red-300">{index + 1}</span><div><h3 className="font-black text-white">{objective.title}</h3><p className="mt-1 text-sm leading-6 text-zinc-400">{objective.description}</p><div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-500">{objective.target ? <span className="rounded-full border border-zinc-800 px-3 py-1">Цель: {objective.target}</span> : null}{objective.amount ? <span className="rounded-full border border-zinc-800 px-3 py-1">× {objective.amount}</span> : null}{objective.locationHint ? <span className="rounded-full border border-zinc-800 px-3 py-1">{objective.locationHint}</span> : null}</div></div></div></li>)}</ol></InfoCard>
        <InfoCard title="Лучшие места и маршрут"><div className="space-y-5"><div><h3 className="flex items-center gap-2 font-black text-white"><MapPin size={18} className="text-red-400" />Где выполнять</h3><div className="mt-3 flex flex-wrap gap-2">{mission.bestLocations.map((location) => <span key={location} className="rounded-full border border-zinc-800 bg-black/50 px-3 py-1 text-xs text-zinc-300">{location}</span>)}</div></div><div><h3 className="flex items-center gap-2 font-black text-white"><Route size={18} className="text-red-400" />План маршрута</h3><ol className="mt-3 space-y-2 text-sm leading-6 text-zinc-400">{mission.routePlan.map((step, index) => <li key={step}>#{index + 1} {step}</li>)}</ol></div></div></InfoCard>
        <InfoCard title="Снаряжение"><ul className="space-y-2">{mission.recommendedGear.map((item) => <li key={item} className="flex gap-2"><ShieldAlert size={16} className="mt-1 shrink-0 text-red-400" />{item}</li>)}</ul></InfoCard>
        <InfoCard title="Советы"><ul className="space-y-2">{mission.playerTips.map((tip) => <li key={tip} className="flex gap-2"><CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-400" />{tip}</li>)}</ul></InfoCard>
        <InfoCard title="Частые ошибки"><ul className="space-y-2">{mission.mistakes.map((mistake) => <li key={mistake} className="flex gap-2"><TriangleAlert size={16} className="mt-1 shrink-0 text-red-400" />{mistake}</li>)}</ul></InfoCard>
      </div>

      {related.length > 0 ? <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-6"><h2 className="text-2xl font-black text-white">Похожие миссии</h2><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{related.map((item) => <Link key={item.slug} href={`/missions/${item.slug}`} className="rounded-2xl border border-zinc-800 bg-black p-4 transition hover:border-red-500/50"><div className="text-sm font-black text-red-400">Tier {item.tier} • {item.trader}</div><div className="mt-2 font-black text-white">{item.title}</div><div className="mt-2 text-sm text-zinc-500">{item.category} • {item.risk}</div></Link>)}</div></section> : null}
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-black/40 p-4 ring-1 ring-zinc-900"><span className="text-sm text-zinc-500">{label}</span><div className="mt-1 font-black text-white">{value}</div></div>; }
