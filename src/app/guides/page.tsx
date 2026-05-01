import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { guides } from "@/data/guides";

export default function GuidesPage() {
  return (
    <main>
      <PageHeader title="Гайды" description="Пошаговые инструкции по старту, прокачке, базам и выживанию в SCUM." />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 md:grid-cols-3">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 transition hover:-translate-y-1 hover:border-red-500/50 hover:bg-zinc-900">
            <div className="flex items-center justify-between"><span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">{guide.category}</span><span className="text-xs text-zinc-500">{guide.minutes} мин</span></div>
            <h2 className="mt-5 text-2xl font-black text-white">{guide.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{guide.summary}</p>
            <div className="mt-5 text-sm font-black text-red-400">Читать →</div>
          </Link>
        ))}
      </section>
    </main>
  );
}
