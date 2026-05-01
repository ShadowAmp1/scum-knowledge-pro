export function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6">
      <h2 className="text-xl font-black text-white">{title}</h2>
      <div className="mt-4 text-zinc-400">{children}</div>
    </div>
  );
}
