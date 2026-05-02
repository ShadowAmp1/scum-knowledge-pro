"use client";

import Link from "next/link";
import { BarChart3, Plus, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { RarityBadge, TierBadge } from "@/components/WeaponBadge";
import { attachments } from "@/data/attachments";
import { weapons, type Weapon } from "@/data/weapons";

const defaults = ["akm", "mk18", "mp5"];
const ratingLabels: Array<[keyof Weapon["rating"], string]> = [["damage", "Урон"], ["control", "Контроль"], ["range", "Дистанция"], ["economy", "Экономность"], ["bunker", "Бункеры"], ["pvp", "PvP"]];

function initialSelection() {
  const existing = new Set(weapons.map((weapon) => weapon.slug));
  const selected = defaults.filter((slug) => existing.has(slug));
  return selected.length >= 2 ? selected : weapons.slice(0, 3).map((weapon) => weapon.slug);
}

function compatibleAttachments(weapon: Weapon) {
  const recommended = new Set(weapon.recommendedAttachmentSlugs ?? []);
  return attachments
    .filter((attachment) => attachment.compatibleWeaponSlugs.includes(weapon.slug) || recommended.has(attachment.slug))
    .sort((a, b) => Number(recommended.has(b.slug)) - Number(recommended.has(a.slug)) || a.name.localeCompare(b.name, "ru"))
    .map((attachment) => ({ ...attachment, recommended: recommended.has(attachment.slug) }));
}

export function WeaponCompareClient() {
  const [query, setQuery] = useState("");
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(initialSelection);
  const selectedWeapons = useMemo(() => selectedSlugs.map((slug) => weapons.find((weapon) => weapon.slug === slug)).filter(Boolean) as Weapon[], [selectedSlugs]);
  const filteredWeapons = useMemo(() => {
    const q = query.trim().toLowerCase();
    return weapons.filter((weapon) => !q || [weapon.name, weapon.category, weapon.type, weapon.ammo, weapon.summary].join(" ").toLowerCase().includes(q)).sort((a, b) => a.name.localeCompare(b.name, "ru")).slice(0, 80);
  }, [query]);
  const add = (slug: string) => setSelectedSlugs((current) => current.includes(slug) ? current : current.length >= 3 ? [current[1], current[2], slug].filter(Boolean) : [...current, slug]);
  const remove = (slug: string) => setSelectedSlugs((current) => current.length <= 2 ? current : current.filter((item) => item !== slug));
  const best = useMemo(() => {
    const result = new Map<keyof Weapon["rating"], string>();
    for (const [key] of ratingLabels) result.set(key, [...selectedWeapons].sort((a, b) => b.rating[key] - a.rating[key])[0]?.slug ?? "");
    return result;
  }, [selectedWeapons]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-2xl shadow-black/30">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div><div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-red-400"><BarChart3 size={16} /> Сравнение оружия</div><p className="mt-2 text-sm text-zinc-500">Выбери 2–3 оружия. Четвертый выбор заменит самый старый.</p></div>
          <Link href="/weapons" className="rounded-xl border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/50 hover:text-white">К списку оружия →</Link>
        </div>
        <label className="relative block"><Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти оружие: AKM, MK18, MP5, M82A1..." className="h-12 w-full rounded-xl border border-zinc-800 bg-black pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/60" /></label>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">{filteredWeapons.map((weapon) => { const active = selectedSlugs.includes(weapon.slug); return <button key={weapon.slug} type="button" onClick={() => active ? remove(weapon.slug) : add(weapon.slug)} className={`shrink-0 rounded-2xl border px-4 py-3 text-left transition ${active ? "border-red-500/50 bg-red-500/15 text-white" : "border-zinc-800 bg-black text-zinc-300 hover:border-red-500/40 hover:text-white"}`}><div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-300">{active ? <X size={14} /> : <Plus size={14} />} {weapon.category} • Tier {weapon.tier}</div><div className="mt-1 font-black">{weapon.name}</div><div className="text-xs text-zinc-500">{weapon.ammo}</div></button>; })}</div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">{selectedWeapons.map((weapon) => <article key={weapon.slug} className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6"><div className="flex flex-wrap items-center gap-2"><TierBadge tier={weapon.tier} /><RarityBadge rarity={weapon.rarity} /><span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-500">{weapon.category}</span></div><h2 className="mt-4 text-3xl font-black text-white">{weapon.name}</h2><p className="mt-1 text-sm font-bold text-red-300">{weapon.shortRole}</p><p className="mt-3 text-sm leading-6 text-zinc-400">{weapon.summary}</p><div className="mt-5 grid grid-cols-2 gap-3 text-sm"><Mini label="Патрон" value={weapon.ammo} /><Mini label="Дистанция" value={weapon.range} /><Mini label="Сложность" value={weapon.difficulty} /><Mini label="Режим" value={weapon.mode} /></div><Link href={`/weapons/${weapon.slug}`} className="mt-5 inline-flex text-sm font-black text-red-400 hover:text-red-300">Открыть полную карточку →</Link></article>)}</div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/80"><div className="border-b border-zinc-800 p-5"><h2 className="text-2xl font-black text-white">Таблица сравнения</h2><p className="mt-2 text-sm text-zinc-500">Рейтинги — ориентир из базы проекта, без выдуманных точных характеристик игры.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><tbody className="divide-y divide-zinc-800"><CompareRow label="Категория" values={selectedWeapons.map((weapon) => weapon.category)} /><CompareRow label="Тип" values={selectedWeapons.map((weapon) => weapon.type)} /><CompareRow label="Патрон" values={selectedWeapons.map((weapon) => weapon.ammo)} /><CompareRow label="Редкость" values={selectedWeapons.map((weapon) => weapon.rarity)} /><CompareRow label="Где искать" values={selectedWeapons.map((weapon) => weapon.whereToFind.slice(0, 4).join(" • "))} />{ratingLabels.map(([key, label]) => <tr key={key}><th className="w-52 bg-black/40 p-4 font-black text-zinc-300">{label}</th>{selectedWeapons.map((weapon) => <td key={weapon.slug} className="p-4"><div className="flex items-center gap-3"><div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800"><div className="h-full rounded-full bg-red-500" style={{ width: `${weapon.rating[key] * 10}%` }} /></div><b className="text-white">{weapon.rating[key]}/10</b>{best.get(key) === weapon.slug ? <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-black text-emerald-300">лучше</span> : null}</div></td>)}</tr>)}<CompareRow label="Лучший билд" values={selectedWeapons.map((weapon) => weapon.bestBuild.join(" • "))} /><CompareRow label="Плюсы" values={selectedWeapons.map((weapon) => weapon.pros.join(" • "))} /><CompareRow label="Минусы" values={selectedWeapons.map((weapon) => weapon.cons.join(" • "))} /></tbody></table></div></div>

      <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6"><h2 className="text-2xl font-black text-white">Обвесы по выбранному оружию</h2><div className="mt-5 grid gap-5 lg:grid-cols-3">{selectedWeapons.map((weapon) => { const list = compatibleAttachments(weapon); return <div key={weapon.slug} className="rounded-2xl border border-zinc-800 bg-black p-5"><div className="text-lg font-black text-white">{weapon.name}</div>{list.length > 0 ? <div className="mt-3 flex flex-wrap gap-2">{list.map((attachment) => <Link key={attachment.slug} href={`/weapons/attachments/${attachment.slug}`} className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-300 transition hover:border-red-500/50 hover:text-white">{attachment.name}{attachment.recommended ? " ★" : ""}</Link>)}</div> : <p className="mt-3 text-sm text-zinc-500">В базе пока нет устанавливаемых обвесов для этого оружия.</p>}</div>; })}</div></section>
    </section>
  );
}

function Mini({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-black/40 p-3 ring-1 ring-zinc-900"><div className="text-xs text-zinc-500">{label}</div><div className="mt-1 font-black text-white">{value}</div></div>; }
function CompareRow({ label, values }: { label: string; values: string[] }) { return <tr><th className="w-52 bg-black/40 p-4 font-black text-zinc-300">{label}</th>{values.map((value, index) => <td key={`${label}-${index}`} className="p-4 leading-6 text-zinc-400">{value}</td>)}</tr>; }
