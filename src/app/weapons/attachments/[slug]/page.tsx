import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Puzzle, TriangleAlert } from "lucide-react";
import { InfoCard } from "@/components/InfoCard";
import { attachments, getAttachmentBySlug, getWeaponMatchStatus } from "@/data/attachments";

export function generateStaticParams() {
  return attachments.map((attachment) => ({ slug: attachment.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const attachment = getAttachmentBySlug(params.slug);
  if (!attachment) return { title: "Обвес не найден | SCUM DB PRO" };

  return {
    title: `${attachment.name} | Обвесы | SCUM DB PRO`,
    description: attachment.summary,
  };
}

export default function AttachmentPage({ params }: { params: { slug: string } }) {
  const attachment = getAttachmentBySlug(params.slug);
  if (!attachment) notFound();

  const status = getWeaponMatchStatus(attachment);
  const related = attachments
    .filter((item) => item.slug !== attachment.slug && item.category === attachment.category)
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <Link href="/weapons/attachments" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-400 transition hover:text-white">
        <ArrowLeft size={16} /> Назад к обвесам
      </Link>

      <article className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl shadow-black/30">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">{attachment.category}</span>
          <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{attachment.subcategory}</span>
          <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-500">{attachment.rarity}</span>
        </div>

        <div className="mt-6 flex items-start gap-5">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl border border-red-500/20 bg-red-500/10 text-red-300">
            <Puzzle size={28} />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-red-400">обвес SCUM</p>
            <h1 className="mt-3 text-5xl font-black text-white md:text-6xl">{attachment.name}</h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-400">{attachment.summary}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <Metric label="Категория" value={attachment.category} />
          <Metric label="Тип" value={attachment.subcategory} />
          <Metric label="Совпадений в базе" value={`${status.matchedCount}`} />
        </div>
      </article>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <InfoCard title="Совместимое оружие">
          <div className="space-y-3">
            {attachment.compatibleWeapons.map((weapon) => {
              const matched = status.matchedWeapons.find((item) => item?.name === weapon || weapon.includes(item?.name ?? ""));
              return (
                <div key={weapon} className="rounded-2xl border border-zinc-800 bg-black/40 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-white">{weapon}</span>
                    <span className="text-xs text-zinc-500">{matched ? "есть в базе" : "текстовая совместимость"}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {status.matchedWeapons.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {status.matchedWeapons.map((weapon) =>
                weapon ? (
                  <Link key={weapon.slug} href={`/weapons/${weapon.slug}`} className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-200 transition hover:bg-emerald-500/20">
                    Открыть {weapon.name}
                  </Link>
                ) : null
              )}
            </div>
          )}
        </InfoCard>

        <InfoCard title="Примечание по совместимости">
          <p className="leading-7 text-zinc-300">{attachment.compatibilityNote}</p>
          <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm leading-6 text-amber-100">
            Совместимость в SCUM может зависеть от версии игры, настроек сервера и конкретного оружия. Перед дорогим рейдом лучше проверить установку обвеса в инвентаре.
          </div>
        </InfoCard>

        <InfoCard title="Для чего полезно">
          <ul className="space-y-2">
            {attachment.bestFor.map((item) => (
              <li key={item} className="flex gap-2"><CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-400" /> {item}</li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard title="Где искать">
          <ul className="space-y-2">
            {attachment.whereToFind.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </InfoCard>

        <div className="lg:col-span-2">
          <InfoCard title="Советы по использованию">
            <ul className="space-y-2">
              {attachment.tips.map((item) => (
                <li key={item} className="flex gap-2"><TriangleAlert size={16} className="mt-1 shrink-0 text-red-400" /> {item}</li>
              ))}
            </ul>
          </InfoCard>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-2xl font-black text-white">Похожие обвесы</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/weapons/attachments/${item.slug}`} className="rounded-2xl border border-zinc-800 bg-black p-4 transition hover:border-red-500/50">
                <div className="text-sm font-black text-red-400">{item.category}</div>
                <div className="mt-2 font-black text-white">{item.name}</div>
                <div className="mt-2 text-sm text-zinc-500">{item.role}</div>
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
