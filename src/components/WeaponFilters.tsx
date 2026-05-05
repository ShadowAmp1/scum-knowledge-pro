"use client";

import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  weapons as fallbackWeapons,
  weaponCategories,
  weaponModes,
  weaponRarities,
  weaponTiers,
  type Weapon,
  type WeaponCategory,
  type WeaponMode,
  type WeaponRarity,
  type WeaponTier,
} from "@/data/weapons";
import { RarityBadge, TierBadge } from "@/components/WeaponBadge";
import { FavoriteButton } from "@/components/FavoriteButton";

type SortMode = "tier" | "name" | "damage" | "bunker" | "pvp" | "economy";

const allCategory = "Все типы";
const allRarity = "Любая редкость";
const allMode = "Любой режим";
const allTier = "Любой tier";

const tierWeight: Record<WeaponTier, number> = { S: 4, A: 3, B: 2, C: 1 };

export function WeaponFilters({ weapons = fallbackWeapons }: { weapons?: Weapon[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<WeaponCategory | typeof allCategory>(allCategory);
  const [rarity, setRarity] = useState<WeaponRarity | typeof allRarity>(allRarity);
  const [mode, setMode] = useState<WeaponMode | typeof allMode>(allMode);
  const [tier, setTier] = useState<WeaponTier | typeof allTier>(allTier);
  const [sort, setSort] = useState<SortMode>("tier");

  const filteredWeapons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return weapons
      .filter((weapon) => {
        const matchesQuery =
          !normalizedQuery ||
          [weapon.name, weapon.type, weapon.ammo, weapon.summary, weapon.shortRole, weapon.category]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);

        const matchesCategory = category === allCategory || weapon.category === category;
        const matchesRarity = rarity === allRarity || weapon.rarity === rarity;
        const matchesMode = mode === allMode || weapon.mode === mode;
        const matchesTier = tier === allTier || weapon.tier === tier;

        return matchesQuery && matchesCategory && matchesRarity && matchesMode && matchesTier;
      })
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name, "ru");
        if (sort === "damage") return b.rating.damage - a.rating.damage;
        if (sort === "bunker") return b.rating.bunker - a.rating.bunker;
        if (sort === "pvp") return b.rating.pvp - a.rating.pvp;
        if (sort === "economy") return b.rating.economy - a.rating.economy;
        return tierWeight[b.tier] - tierWeight[a.tier] || b.rating.pvp - a.rating.pvp;
      });
  }, [weapons, query, category, rarity, mode, tier, sort]);

  const resetFilters = () => {
    setQuery("");
    setCategory(allCategory);
    setRarity(allRarity);
    setMode(allMode);
    setTier(allTier);
    setSort("tier");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-2xl shadow-black/30">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-red-400">
              <SlidersHorizontal size={16} /> Поиск и фильтры
            </div>
            <p className="mt-2 text-sm text-zinc-500">
              Найдено: <b className="text-white">{filteredWeapons.length}</b> из {weapons.length}
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-white"
            type="button"
          >
            <X size={16} /> Сбросить
          </button>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Поиск: AKM, Barrett, 9x19, бункер..."
              className="h-12 w-full rounded-xl border border-zinc-800 bg-black pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/60"
            />
          </label>

          <Select value={category} onChange={(value) => setCategory(value as WeaponCategory | typeof allCategory)} options={[allCategory, ...weaponCategories]} />
          <Select value={rarity} onChange={(value) => setRarity(value as WeaponRarity | typeof allRarity)} options={[allRarity, ...weaponRarities]} />
          <Select value={mode} onChange={(value) => setMode(value as WeaponMode | typeof allMode)} options={[allMode, ...weaponModes]} />

          <select
            value={tier}
            onChange={(event) => setTier(event.target.value as WeaponTier | typeof allTier)}
            className="h-12 rounded-xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition focus:border-red-500/60"
          >
            <option value={allTier}>{allTier}</option>
            {weaponTiers.map((item) => (
              <option key={item} value={item}>
                Tier {item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortMode)}
            className="h-12 rounded-xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition focus:border-red-500/60"
          >
            <option value="tier">Сортировка: Tier</option>
            <option value="name">По названию</option>
            <option value="damage">По урону</option>
            <option value="bunker">Для бункеров</option>
            <option value="pvp">Для PvP</option>
            <option value="economy">Экономность</option>
          </select>
        </div>
      </div>

      {filteredWeapons.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center">
          <h2 className="text-2xl font-black text-white">Ничего не найдено</h2>
          <p className="mt-2 text-zinc-500">Попробуй убрать часть фильтров или изменить поисковый запрос.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredWeapons.map((weapon) => (
            <Link
              key={weapon.slug}
              href={`/weapons/${weapon.slug}`}
              className="group relative flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 transition hover:-translate-y-1 hover:border-red-500/50 hover:bg-zinc-900"
            >
              <div className="absolute right-4 top-4">
                <FavoriteButton type="weapon" slug={weapon.slug} />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <TierBadge tier={weapon.tier} />
                <RarityBadge rarity={weapon.rarity} />
                <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-500">{weapon.category}</span>
              </div>

              <h2 className="mt-5 text-2xl font-black text-white">{weapon.name}</h2>
              <p className="mt-1 text-sm font-bold text-red-300">{weapon.shortRole}</p>
              <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">{weapon.summary}</p>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-black/40 p-3">
                  <div className="text-zinc-500">Патрон</div>
                  <div className="font-black text-white">{weapon.ammo}</div>
                </div>
                <div className="rounded-2xl bg-black/40 p-3">
                  <div className="text-zinc-500">Режим</div>
                  <div className="font-black text-white">{weapon.mode}</div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                <MiniStat label="Урон" value={weapon.rating.damage} />
                <MiniStat label="Бункер" value={weapon.rating.bunker} />
                <MiniStat label="PvP" value={weapon.rating.pvp} />
              </div>

              <div className="mt-5 text-sm font-black text-red-400 transition group-hover:text-red-300">Открыть карточку →</div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-12 rounded-xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition focus:border-red-500/60"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-black/40 p-2">
      <div className="font-black text-white">{value}/10</div>
      <div className="text-zinc-500">{label}</div>
    </div>
  );
}
