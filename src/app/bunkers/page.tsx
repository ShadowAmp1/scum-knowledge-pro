import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { bunkers } from "@/data/bunkers";

export default function BunkersPage() {
  return (
    <main>
      <PageHeader title="Бункеры" description="Подготовка, риск, враги, маршруты зачистки и ценный лут в бункерах SCUM." />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 md:grid-cols-2 lg:grid-cols-3">
        {bunkers.map((bunker) => (
          <Link key={bunker.slug} href={`/bunkers/${bunker.slug}`} className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 transition hover:-translate-y-1 hover:border-red-500/50 hover:bg-zinc-900">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">Сектор {bunker.sector}</span>
              <span className="text-xs font-bold text-zinc-500">Риск: {bunker.risk}</span>
            </div>
            <h2 className="mt-5 text-2xl font-black text-white">{bunker.name}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{bunker.short}</p>
            <div className="mt-5 text-sm font-black text-red-400">Открыть маршрут →</div>
          </Link>
        ))}
      </section>
    </main>
  );
}
