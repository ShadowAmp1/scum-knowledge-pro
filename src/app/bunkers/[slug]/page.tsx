import { notFound } from "next/navigation";
import { InfoCard } from "@/components/InfoCard";
import { bunkers } from "@/data/bunkers";

export function generateStaticParams() {
  return bunkers.map((bunker) => ({ slug: bunker.slug }));
}

export default function BunkerPage({ params }: { params: { slug: string } }) {
  const bunker = bunkers.find((item) => item.slug === params.slug);
  if (!bunker) notFound();
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-red-400">Сектор {bunker.sector}</p>
        <h1 className="mt-3 text-5xl font-black text-white">{bunker.name}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">{bunker.short}</p>
        <div className="mt-6 rounded-2xl bg-black/40 p-4 text-white">Уровень риска: <b className="text-red-400">{bunker.risk}</b></div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <InfoCard title="Что взять с собой"><ul className="space-y-2">{bunker.preparation.map((x) => <li key={x}>✓ {x}</li>)}</ul></InfoCard>
        <InfoCard title="Что можно найти"><ul className="space-y-2">{bunker.loot.map((x) => <li key={x}>• {x}</li>)}</ul></InfoCard>
        <InfoCard title="Враги и угрозы"><ul className="space-y-2">{bunker.enemies.map((x) => <li key={x}>⚠ {x}</li>)}</ul></InfoCard>
        <InfoCard title="Маршрут"><ol className="space-y-2">{bunker.route.map((x, i) => <li key={x}><b className="text-red-400">{i + 1}.</b> {x}</li>)}</ol></InfoCard>
      </div>
    </main>
  );
}
