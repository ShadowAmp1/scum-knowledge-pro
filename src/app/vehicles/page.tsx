import { PageHeader } from "@/components/PageHeader";
import { vehicles } from "@/data/vehicles";

export default function VehiclesPage() {
  return (
    <main>
      <PageHeader title="Транспорт" description="Машины, мотоциклы, вертолеты, ремонт, хранение и советы по эксплуатации." />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 md:grid-cols-3">
        {vehicles.map((vehicle) => (
          <article key={vehicle.name} className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6">
            <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">{vehicle.type}</span>
            <h2 className="mt-5 text-2xl font-black text-white">{vehicle.name}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{vehicle.usage}</p>
            <h3 className="mt-5 font-black text-white">Ремонт</h3>
            <ul className="mt-2 space-y-1 text-sm text-zinc-400">{vehicle.repair.map((x) => <li key={x}>• {x}</li>)}</ul>
            <h3 className="mt-5 font-black text-white">Советы</h3>
            <ul className="mt-2 space-y-1 text-sm text-zinc-400">{vehicle.tips.map((x) => <li key={x}>✓ {x}</li>)}</ul>
          </article>
        ))}
      </section>
    </main>
  );
}
