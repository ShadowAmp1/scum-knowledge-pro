import Link from "next/link";
import { notFound } from "next/navigation";
import { InfoCard } from "@/components/InfoCard";
import { bunkers } from "@/data/bunkers";

export function generateStaticParams() {
  return bunkers.map((bunker) => ({ slug: bunker.slug }));
}

export default function BunkerPage({ params }: { params: { slug: string } }) {
  const bunker = bunkers.find((item) => item.slug === params.slug);
  if (!bunker) notFound();

  const related = bunkers.filter((item) => item.slug !== bunker.slug && (item.risk === bunker.risk || item.lootTier === bunker.lootTier)).slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <Link href="/bunkers" className="text-sm font-black text-red-400 hover:text-red-300">← Назад к бункерам</Link>

      <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">Сектор {bunker.sector}</span>
          <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{bunker.type}</span>
          <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">Лут {bunker.lootTier}</span>
          <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{bunker.recommendedTime}</span>
        </div>

        <h1 className="mt-5 text-5xl font-black text-white">{bunker.name}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">{bunker.short}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-black/50 p-4 text-sm text-zinc-400">Риск<br /><b className="text-xl text-red-400">{bunker.risk}</b></div>
          <div className="rounded-2xl bg-black/50 p-4 text-sm text-zinc-400">Новичку<br /><b className="text-xl text-white">{bunker.beginnerFriendly ? "Можно" : "Сложно"}</b></div>
          <div className="rounded-2xl bg-black/50 p-4 text-sm text-zinc-400">Дуо<br /><b className="text-xl text-white">{bunker.duoFriendly ? "Отлично" : "Осторожно"}</b></div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <InfoCard title="Что взять с собой"><ul className="space-y-2">{bunker.preparation.map((x) => <li key={x}>✓ {x}</li>)}</ul></InfoCard>
        <InfoCard title="Рекомендуемое оружие"><ul className="space-y-2">{bunker.recommendedWeapons.map((x) => <li key={x}>• {x}</li>)}</ul></InfoCard>
        <InfoCard title="Что можно найти"><ul className="space-y-2">{bunker.loot.map((x) => <li key={x}>• {x}</li>)}</ul></InfoCard>
        <InfoCard title="Враги и угрозы"><ul className="space-y-2">{bunker.enemies.map((x) => <li key={x}>⚠ {x}</li>)}</ul></InfoCard>
        <InfoCard title="Маршрут зачистки"><ol className="space-y-2">{bunker.route.map((x, i) => <li key={x}><b className="text-red-400">{i + 1}.</b> {x}</li>)}</ol></InfoCard>
        <InfoCard title="Опасные зоны"><ul className="space-y-2">{bunker.dangerZones.map((x) => <li key={x}>⚠ {x}</li>)}</ul></InfoCard>
        <InfoCard title="Ошибки"><ul className="space-y-2">{bunker.mistakes.map((x) => <li key={x}>✕ {x}</li>)}</ul></InfoCard>
        <InfoCard title="Советы соло"><ul className="space-y-2">{bunker.soloTips.map((x) => <li key={x}>• {x}</li>)}</ul></InfoCard>
        <InfoCard title="Советы для дуо"><ul className="space-y-2">{bunker.duoTips.map((x) => <li key={x}>• {x}</li>)}</ul></InfoCard>
      </div>

      {related.length > 0 && (
        <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-2xl font-black text-white">Похожие маршруты</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/bunkers/${item.slug}`} className="rounded-2xl border border-zinc-800 bg-black p-4 transition hover:border-red-500/50">
                <div className="text-sm font-black text-red-400">{item.sector} • {item.risk}</div>
                <div className="mt-2 font-black text-white">{item.name}</div>
                <div className="mt-2 text-sm text-zinc-500">Лут {item.lootTier}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
