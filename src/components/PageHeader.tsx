export function PageHeader({ eyebrow = "SCUM DB PRO", title, description }: { eyebrow?: string; title: string; description: string }) {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950/40">
      <div className="absolute inset-0 noise opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 py-14">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-red-400">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">{description}</p>
      </div>
    </section>
  );
}
