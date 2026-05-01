import { PageHeader } from "@/components/PageHeader";

const basePlans = [
  { title: "PvE хай-тек база для дуо", desc: "Гараж на 2 машины, место под 2 мотоцикла, крыша под вертолет, склад и мастерская.", points: ["Ровная площадка", "Закрытый гараж", "Второй этаж под склад", "Крыша-площадка", "Декор светом"] },
  { title: "Дешевая стартовая база", desc: "Быстрый безопасный домик на первые часы игры.", points: ["Малый фундамент", "1 вход", "Ящик для лута", "Место под костер", "Скрытая позиция"] },
  { title: "Дорогая база", desc: "Большой комплекс с отдельными зонами хранения, транспорта и обороны.", points: ["Многоуровневая планировка", "Склад модулей", "Гаражный блок", "Забор", "Смотровая зона"] }
];

export default function BasesPage() {
  return (
    <main>
      <PageHeader title="Базы" description="Готовые идеи баз для SCUM: PvE, дуо, хай-тек, дорогая база и стартовые варианты." />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 md:grid-cols-3">
        {basePlans.map((plan) => (
          <article key={plan.title} className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6">
            <h2 className="text-2xl font-black text-white">{plan.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{plan.desc}</p>
            <ul className="mt-5 space-y-2 text-sm text-zinc-300">{plan.points.map((point) => <li key={point}>✓ {point}</li>)}</ul>
          </article>
        ))}
      </section>
    </main>
  );
}
