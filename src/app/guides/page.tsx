import { PageHeader } from "@/components/PageHeader";
import { GuideFilters } from "@/components/GuideFilters";
import { guides } from "@/data/guides";

export default function GuidesPage() {
  const categoriesCount = new Set(guides.map((guide) => guide.category)).size;
  const hardCount = guides.filter((guide) => guide.difficulty === "Сложно").length;

  return (
    <main>
      <PageHeader
        title="Гайды"
        description="Большая база гайдов SCUM по категориям: старт, метаболизм, медицина, крафт, лут, бункеры, оружие, бой, торговцы, базы и транспорт."
      />

      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-white">{guides.length}</div>
            <div className="mt-2 text-sm text-zinc-500">подробных гайдов</div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-red-400">{categoriesCount}</div>
            <div className="mt-2 text-sm text-zinc-500">категорий</div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-emerald-400">{hardCount}</div>
            <div className="mt-2 text-sm text-zinc-500">сложных гайдов для рейдов</div>
          </div>
        </div>
      </section>

      <GuideFilters />
    </main>
  );
}
