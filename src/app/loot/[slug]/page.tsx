import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, MapPin, Package, TriangleAlert } from "lucide-react";
import { InfoCard } from "@/components/InfoCard";
import { getLootBySlug, lootItems } from "@/data/loot";

export function generateStaticParams() {
  return lootItems.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getLootBySlug(params.slug);
  if (!item) return { title: "Лут не найден | SCUM DB PRO" };

  return {
    title: `${item.name} | SCUM DB PRO`,
    description: `${item.name}: где искать, зачем нужен, хранить или продавать, советы по использованию.`,
  };
}

export default function LootItemPage({ params }: { params: { slug: string } }) {
  const item = getLootBySlug(params.slug);
  if (!item) notFound();

  const related = lootItems
    .filter((other) => other.slug !== item.slug && (other.category === item.category || other.related.some((tag) => item.related.includes(tag))))
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <Link href="/loot" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-400 transition hover:text-white">
        <ArrowLeft size={16} /> Назад к луту
      </Link>

      <article className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl shadow-black/30">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">{item.category}</span>
          <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{item.rarity}</span>
          <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{item.priority}</span>
          <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{item.weight}</span>
        </div>

        <p className="mt-6 text-sm font-black uppercase tracking-[0.3em] text-red-400">Карточка предмета</p>
        <h1 className="mt-3 text-5xl font-black text-white md:text-6xl">{item.name}</h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-400">{item.usage}</p>

        <div className="mt-8 grid gap-3 md:grid-cols-4">
          <Metric label="Категория" value={item.category} />
          <Metric label="Ценность" value={item.value} />
          <Metric label="Вес" value={item.weight} />
          <Metric label="Приоритет" value={item.priority} />
        </div>
      </article>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <InfoCard title="Где лучше искать">
          <ul className="space-y-2">
            {item.bestLocations.map((place) => (
              <li key={place} className="flex gap-2"><MapPin size={16} className="mt-1 shrink-0 text-red-400" /> {place}</li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard title="Все возможные места">
          <ul className="space-y-2">
            {item.locations.map((place) => (
              <li key={place}>• {place}</li>
            ))}
          </ul>
        </InfoCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <InfoCard title="Хранить или продавать">
          <p className="leading-7 text-zinc-300">{item.keepOrSell}</p>
        </InfoCard>

        <InfoCard title="Связанные темы">
          <div className="flex flex-wrap gap-2">
            {item.related.length ? item.related.map((tag) => (
              <span key={tag} className="rounded-full border border-zinc-800 bg-black/50 px-3 py-1 text-xs text-zinc-300">{tag}</span>
            )) : <span className="text-zinc-400">Нет связанных тегов</span>}
          </div>
        </InfoCard>

        <InfoCard title="Советы">
          <ul className="space-y-2">
            {item.tips.map((tip) => (
              <li key={tip} className="flex gap-2"><CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-400" /> {tip}</li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard title="Частые ошибки">
          <ul className="space-y-2">
            {item.mistakes.map((mistake) => (
              <li key={mistake} className="flex gap-2"><TriangleAlert size={16} className="mt-1 shrink-0 text-red-400" /> {mistake}</li>
            ))}
          </ul>
        </InfoCard>
      </div>

      {related.length > 0 && (
        <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-2xl font-black text-white">Похожий лут</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {related.map((relatedItem) => (
              <Link key={relatedItem.slug} href={`/loot/${relatedItem.slug}`} className="rounded-2xl border border-zinc-800 bg-black p-4 transition hover:border-red-500/50">
                <div className="text-sm font-black text-red-400">{relatedItem.category} • {relatedItem.rarity}</div>
                <div className="mt-2 font-black text-white">{relatedItem.name}</div>
                <div className="mt-2 text-sm text-zinc-500">{relatedItem.bestLocations.slice(0, 2).join(" • ")}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-black/40 p-4 ring-1 ring-zinc-900">
      <span className="text-sm text-zinc-500">{label}</span>
      <div className="mt-1 font-black text-white">{value}</div>
    </div>
  );
}
