import { notFound } from "next/navigation";
import { guides } from "@/data/guides";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = guides.find((item) => item.slug === params.slug);
  if (!guide) notFound();
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <article className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-red-400">{guide.category} · {guide.difficulty}</p>
        <h1 className="mt-3 text-5xl font-black text-white">{guide.title}</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-400">{guide.summary}</p>
        <ol className="mt-8 space-y-4">
          {guide.steps.map((step, index) => (
            <li key={step} className="rounded-2xl border border-zinc-800 bg-black/40 p-5 text-zinc-300">
              <span className="mr-3 font-black text-red-400">{index + 1}.</span>{step}
            </li>
          ))}
        </ol>
      </article>
    </main>
  );
}
