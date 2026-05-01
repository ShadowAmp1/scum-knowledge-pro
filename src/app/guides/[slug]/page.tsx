import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Target, TriangleAlert } from "lucide-react";
import { getGuideBySlug, guides } from "@/data/guides";
import { InfoCard } from "@/components/InfoCard";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return { title: "Гайд не найден | SCUM DB PRO" };

  return {
    title: `${guide.title} | SCUM DB PRO`,
    description: guide.summary,
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const related = guides
    .filter((item) => item.slug !== guide.slug && (item.category === guide.category || item.difficulty === guide.difficulty))
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <Link href="/guides" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-400 transition hover:text-white">
        <ArrowLeft size={16} /> Назад к гайдам
      </Link>

      <article className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">{guide.category}</span>
          <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{guide.difficulty}</span>
          <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-500">{guide.minutes} минут</span>
        </div>

        <h1 className="mt-5 text-5xl font-black text-white md:text-6xl">{guide.title}</h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-400">{guide.intro}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <InfoCard title="Цели гайда">
            <ul className="space-y-2">
              {guide.goals.map((goal) => (
                <li key={goal} className="flex gap-2">
                  <Target size={16} className="mt-1 shrink-0 text-red-400" /> {goal}
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title="Чек-лист">
            <ul className="space-y-2">
              {guide.checklist.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-400" /> {item}
                </li>
              ))}
            </ul>
          </InfoCard>
        </div>

        <section className="mt-8 space-y-5">
          {guide.sections.map((section, index) => (
            <div key={section.heading} className="rounded-3xl border border-zinc-800 bg-black/40 p-6">
              <div className="text-sm font-black uppercase tracking-[0.25em] text-red-400">Раздел {index + 1}</div>
              <h2 className="mt-2 text-2xl font-black text-white">{section.heading}</h2>
              <p className="mt-3 leading-7 text-zinc-400">{section.body}</p>
              <ul className="mt-4 space-y-2 text-zinc-300">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <InfoCard title="Частые ошибки">
            <ul className="space-y-2">
              {guide.mistakes.map((mistake) => (
                <li key={mistake} className="flex gap-2">
                  <TriangleAlert size={16} className="mt-1 shrink-0 text-red-400" /> {mistake}
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title="PRO-советы">
            <ul className="space-y-2">
              {guide.tips.map((tip) => (
                <li key={tip}>✓ {tip}</li>
              ))}
            </ul>
          </InfoCard>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-2xl font-black text-white">Похожие гайды</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/guides/${item.slug}`} className="rounded-2xl border border-zinc-800 bg-black p-4 transition hover:border-red-500/50">
                <div className="text-sm font-black text-red-400">{item.category} • {item.difficulty}</div>
                <div className="mt-2 font-black text-white">{item.title}</div>
                <div className="mt-2 text-sm text-zinc-500">{item.summary}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
