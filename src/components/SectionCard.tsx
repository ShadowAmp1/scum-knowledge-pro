import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function SectionCard({ title, description, href, badge, icon: Icon }: { title: string; description: string; href: string; badge: string; icon: LucideIcon }) {
  return (
    <Link href={href} className="group rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:bg-zinc-900 hover:shadow-danger">
      <div className="mb-5 flex items-center justify-between">
        <div className="rounded-2xl bg-red-600/10 p-3 text-red-400 ring-1 ring-red-500/20"><Icon size={28} /></div>
        <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-500">{badge}</span>
      </div>
      <h3 className="text-xl font-black text-white">{title}</h3>
      <p className="mt-3 min-h-12 text-sm leading-6 text-zinc-400">{description}</p>
      <div className="mt-6 text-sm font-black text-red-400 transition group-hover:text-red-300">Открыть раздел →</div>
    </Link>
  );
}
