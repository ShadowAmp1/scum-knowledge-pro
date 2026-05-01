import { PageHeader } from "@/components/PageHeader";

const roadmap = [
  { title: "Этап 1 — готово", items: ["Главная", "Разделы", "Оружие", "Бункеры", "Лут", "Карта", "Гайды", "Render config"] },
  { title: "Этап 2 — база данных", items: ["PostgreSQL", "Prisma", "Миграции", "Seed данные"] },
  { title: "Этап 3 — админка", items: ["Логин админа", "Добавление оружия", "Редактирование гайдов", "Загрузка изображений"] },
  { title: "Этап 4 — PRO функции", items: ["Поиск", "Фильтры", "Избранное", "Комментарии", "Калькулятор базы"] }
];

export default function RoadmapPage() {
  return (
    <main>
      <PageHeader title="PRO Roadmap" description="План развития проекта после статической версии: база данных, админка, авторизация и настоящая интерактивная карта." />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        {roadmap.map((block) => (
          <article key={block.title} className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6">
            <h2 className="text-xl font-black text-white">{block.title}</h2>
            <ul className="mt-5 space-y-2 text-sm text-zinc-400">{block.items.map((x) => <li key={x}>✓ {x}</li>)}</ul>
          </article>
        ))}
      </section>
    </main>
  );
}
