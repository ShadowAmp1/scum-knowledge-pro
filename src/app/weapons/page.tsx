import { PageHeader } from "@/components/PageHeader";
import { WeaponFilters } from "@/components/WeaponFilters";
import { weapons } from "@/data/weapons";

export default function WeaponsPage() {
  const sTierCount = weapons.filter((weapon) => weapon.tier === "S").length;
  const bunkerTop = [...weapons].sort((a, b) => b.rating.bunker - a.rating.bunker).slice(0, 3);

  return (
    <main>
      <PageHeader
        title="Оружие"
        description="SCUM DB PRO: полная база оружия из твоего списка, поиск, фильтры, tier-лист, описания, патроны, билды и советы для PvE/PvP."
      />

      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-white">{weapons.length}</div>
            <div className="mt-2 text-sm text-zinc-500">оружий в базе</div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-4xl font-black text-red-400">{sTierCount}</div>
            <div className="mt-2 text-sm text-zinc-500">S-tier вариантов</div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-sm font-black uppercase tracking-[0.25em] text-red-400">Топ для бункера</div>
            <div className="mt-3 text-sm text-zinc-300">{bunkerTop.map((weapon) => weapon.name).join(" • ")}</div>
          </div>
        </div>
      </section>

      <WeaponFilters />
    </main>
  );
}
