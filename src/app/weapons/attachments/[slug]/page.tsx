import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Puzzle } from "lucide-react";
import { InfoCard } from "@/components/InfoCard";
import { attachments, getAttachmentBySlug, getWeaponMatchStatus } from "@/data/attachments";

export function generateStaticParams() {
  return attachments.map((attachment) => ({ slug: attachment.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const attachment = getAttachmentBySlug(params.slug);
  if (!attachment) return { title: "Обвес не найден | SCUM DB PRO" };

  return {
    title: `${attachment.name} | Обвесы SCUM`,
    description: `${attachment.name}: назначение, где найти и совместимое оружие в SCUM DB PRO.`,
  };
}

export default function AttachmentPage({ params }: { params: { slug: string } }) {
  const attachment = getAttachmentBySlug(params.slug);
  if (!attachment) notFound();

  const status = getWeaponMatchStatus(attachment);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <Link href="/weapons/attachments" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-400 transition hover:text-white">
        <ArrowLeft size={16} /> Назад к обвесам
      </Link>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl shadow-black/30">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">{attachment.category}</span>
          <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{attachment.subcategory}</span>
          <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-500">{attachment.rarity}</span>
        </div>

        <div className="mt-6 flex items-start gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-300">
            <Puzzle size={26} />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-red-400">Обвес</p>
            <h1 className="mt-2 text-4xl font-black text-white md:text-6xl">{attachment.name}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">{attachment.summary}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm leading-6 text-amber-100">
          {attachment.compatibilityNote}
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <InfoCard title="Лучше всего подходит для">
          <ul className="space-y-2">
            {attachment.bestFor.map((item) => (
              <li key={item}>✓ {item}</li>
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
      </section>

      <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-white">Совместимое оружие</h2>
            <p className="mt-2 text-sm text-zinc-500">
              В базе найдено: <b className="text-white">{status.matchedCount}</b> из {attachment.compatibleWeapons.length} связей.
            </p>
          </div>
          <Link href="/weapons" className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-black text-red-200 transition hover:bg-red-500/20">
            Всё оружие →
          </Link>
        </div>

        {status.matchedWeapons.length > 0 ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {status.matchedWeapons.map((weapon) => (
              <Link key={weapon.slug} href={`/weapons/${weapon.slug}`} className="rounded-2xl border border-zinc-800 bg-black p-4 transition hover:border-red-500/50">
                <div className="text-xs font-black uppercase tracking-widest text-red-400">{weapon.category}</div>
                <div className="mt-2 font-black text-white">{weapon.name}</div>
                <div className="mt-2 text-xs text-zinc-500">{weapon.ammo}</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-zinc-800 bg-black p-5 text-sm leading-6 text-zinc-400">
            Для этого обвеса пока нет привязанного оружия в базе. Проверь данные совместимости перед добавлением в билд.
          </div>
        )}
      </section>

      <section className="mt-6">
        <InfoCard title="Советы">
          <ul className="space-y-2">
            {attachment.tips.map((item) => (
              <li key={item}>⚠ {item}</li>
            ))}
          </ul>
        </InfoCard>
      </section>
    </main>
  );
}
