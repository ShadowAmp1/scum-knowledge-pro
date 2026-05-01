import { raidKits } from "@/data/preparation";

export function RaidKits() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-white">Наборы подготовки</h2>
        <p className="mt-3 max-w-2xl text-zinc-400">Готовые чек-листы перед рейдом: оружие, броня, медицина, инструменты и что не забыть перед выходом.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {raidKits.map((kit) => (
          <article key={kit.slug} className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6">
            <div className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300 inline-flex">{kit.difficulty}</div>
            <h3 className="mt-5 text-2xl font-black text-white">{kit.title}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{kit.purpose}</p>
            <div className="mt-6 grid gap-4">
              <KitBlock title="Оружие" items={kit.weapons} />
              <KitBlock title="Броня" items={kit.armor} />
              <KitBlock title="Медицина" items={kit.meds} />
              <KitBlock title="Инструменты" items={kit.tools} />
              <KitBlock title="Еда/вода" items={kit.food} />
              <KitBlock title="Рюкзак" items={kit.backpack} />
              <KitBlock title="Важно" items={kit.notes} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function KitBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black p-4">
      <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-zinc-400">
        {items.map((item) => <li key={item}>• {item}</li>)}
      </ul>
    </div>
  );
}
