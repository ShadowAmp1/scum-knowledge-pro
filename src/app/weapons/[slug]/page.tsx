import { notFound } from "next/navigation";
import { InfoCard } from "@/components/InfoCard";
import { weapons } from "@/data/weapons";

export function generateStaticParams() {
  return weapons.map((weapon) => ({ slug: weapon.slug }));
}

export default function WeaponPage({ params }: { params: { slug: string } }) {
  const weapon = weapons.find((item) => item.slug === params.slug);
  if (!weapon) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-red-400">{weapon.type}</p>
        <h1 className="mt-3 text-5xl font-black text-white">{weapon.name}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">{weapon.summary}</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-black/40 p-4"><span className="text-zinc-500">Патрон</span><div className="font-black text-white">{weapon.ammo}</div></div>
          <div className="rounded-2xl bg-black/40 p-4"><span className="text-zinc-500">Редкость</span><div className="font-black text-white">{weapon.rarity}</div></div>
          <div className="rounded-2xl bg-black/40 p-4"><span className="text-zinc-500">Режим</span><div className="font-black text-white">{weapon.danger}</div></div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <InfoCard title="Лучший билд"><ul className="space-y-2">{weapon.bestBuild.map((x) => <li key={x}>✓ {x}</li>)}</ul></InfoCard>
        <InfoCard title="Где найти"><ul className="space-y-2">{weapon.whereToFind.map((x) => <li key={x}>• {x}</li>)}</ul></InfoCard>
        <InfoCard title="Плюсы"><ul className="space-y-2">{weapon.pros.map((x) => <li key={x}>+ {x}</li>)}</ul></InfoCard>
        <InfoCard title="Минусы"><ul className="space-y-2">{weapon.cons.map((x) => <li key={x}>- {x}</li>)}</ul></InfoCard>
        <div className="lg:col-span-2"><InfoCard title="Советы"><ul className="space-y-2">{weapon.tips.map((x) => <li key={x}>⚠ {x}</li>)}</ul></InfoCard></div>
      </div>
    </main>
  );
}
