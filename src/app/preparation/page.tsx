import { PageHeader } from "@/components/PageHeader";
import { RaidKits } from "@/components/RaidKits";
import { raidKits } from "@/data/preparation";

export default function PreparationPage() {
  return (
    <main>
      <PageHeader title="Подготовка к рейду" description="Готовые чек-листы для бункеров, военных зон и дуо-фарма: оружие, броня, медицина, инструменты, еда и правила выхода." />

      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-white">{raidKits.length}</div>
            <div className="mt-2 text-sm text-zinc-500">готовых набора</div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-red-400">7</div>
            <div className="mt-2 text-sm text-zinc-500">категорий проверки</div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-sm font-black uppercase tracking-[0.25em] text-red-400">Главное правило</div>
            <div className="mt-3 text-sm text-zinc-300">Не заходи в бункер без медицины, плана отхода и свободного веса.</div>
          </div>
        </div>
      </section>

      <RaidKits />

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            { title: "Перед выходом", items: ["Почини оружие", "Проверь магазины", "Возьми бинты", "Освободи рюкзак", "Отметь путь отхода"] },
            { title: "Внутри", items: ["Не беги без нужды", "Проверяй углы", "Лутай быстро", "Не открывай все двери подряд", "После шума держи оборону"] },
            { title: "После рейда", items: ["Сортируй лут у базы", "Ремонтируй оружие", "Отложи медицину", "Патроны разложи по калибрам", "Запиши удачный маршрут"] }
          ].map((block) => (
            <article key={block.title} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <h2 className="text-2xl font-black text-white">{block.title}</h2>
              <ul className="mt-5 space-y-3 text-sm text-zinc-400">
                {block.items.map((item) => <li key={item}>✓ {item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
