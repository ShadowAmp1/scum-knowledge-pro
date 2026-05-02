export const metadata = {
  title: "Оружие SCUM | SCUM DB PRO",
  description: "Оружие SCUM, лучшие билды, патроны, обвесы, фильтры, роли и советы для PvE/PvP.",
};

import Link from "next/link";
import { BarChart3, Puzzle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { WeaponFilters } from "@/components/WeaponFilters";
import { weapons } from "@/data/weapons";
import { attachments } from "@/data/attachments";

export default function WeaponsPage() {
  const sTierCount = weapons.filter((weapon) => weapon.tier === "S").length;
  const bunkerTop = [...weapons].sort((a, b) => b.rating.bunker - a.rating.bunker).slice(0, 3);

  return (
    <main>
      <PageHeader
        title="Оружие"
        description="SCUM DB PRO: база оружия, обвесов, магазинов, прицелов, глушителей, поиск, фильтры, описания, патроны, билды и советы для PvE/PvP."
      />

      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-white">{weapons.length}</div>
            <div className="mt-2 text-sm text-zinc-500">видов оружия в базе</div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-red-400">{sTierCount}</div>
            <div className="mt-2 text-sm text-zinc-500">S-tier вариантов</div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-sm font-black uppercase tracking-[0.25em] text-red-400">Топ для бункера</div>
            <div className="mt-3 text-sm text-zinc-300">{bunkerTop.map((weapon) => weapon.name).join(" • ")}</div>
          </div>
          <Link href="/weapons/attachments" className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 transition hover:border-red-400/60 hover:bg-red-500/15">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-red-300"><Puzzle size={16} /> Обвесы</div>
            <div className="mt-3 text-4xl font-black text-white">{attachments.length}</div>
            <div className="mt-2 text-sm text-zinc-400">магазины, прицелы, планки, фонарики и глушители</div>
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/weapons" className="rounded-full border border-red-500/40 bg-red-500/10 px-5 py-2 text-sm font-black text-red-200">Оружие</Link>
          <Link href="/weapons/attachments" className="rounded-full border border-zinc-800 bg-black px-5 py-2 text-sm font-black text-zinc-300 transition hover:border-red-500/50 hover:text-white">Обвесы</Link>
          <Link href="/weapons/compare" className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black px-5 py-2 text-sm font-black text-zinc-300 transition hover:border-red-500/50 hover:text-white"><BarChart3 size={16} /> Сравнение оружия</Link>
        </div>
      </section>

      <WeaponFilters />
    </main>
  );
}
