"use client";

import { useFavorites } from "@/lib/useFavorites";
import { weapons } from "@/data/weapons";
import { attachments } from "@/data/attachments";
import { lootItems } from "@/data/loot";
import { guides } from "@/data/guides";
import { bunkers } from "@/data/bunkers";
import Link from "next/link";
import { Heart, Trash2, Package, Wrench, Target, BookOpen, Home } from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function FavoritesPage() {
  const { favorites, isLoaded, clearAll, count } = useFavorites();

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <div className="text-zinc-400">Загрузка...</div>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center">
          <Heart className="mx-auto h-16 w-16 text-zinc-700" />
          <h1 className="mt-6 text-3xl font-black text-white">Избранное пусто</h1>
          <p className="mt-3 text-zinc-400">
            Добавляйте оружие, лут, гайды и бункеры в избранное, чтобы быстро находить их здесь
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-bold text-white transition-colors hover:bg-red-700"
          >
            <Home className="h-5 w-5" />
            На главную
          </Link>
        </div>
      </div>
    );
  }

  const weaponFavorites = favorites
    .filter((f) => f.type === "weapon")
    .map((f) => weapons.find((w) => w.slug === f.slug))
    .filter(Boolean);

  const attachmentFavorites = favorites
    .filter((f) => f.type === "attachment")
    .map((f) => attachments.find((a) => a.slug === f.slug))
    .filter(Boolean);

  const lootFavorites = favorites
    .filter((f) => f.type === "loot")
    .map((f) => lootItems.find((l) => l.slug === f.slug))
    .filter(Boolean);

  const guideFavorites = favorites
    .filter((f) => f.type === "guide")
    .map((f) => guides.find((g) => g.slug === f.slug))
    .filter(Boolean);

  const bunkerFavorites = favorites
    .filter((f) => f.type === "bunker")
    .map((f) => bunkers.find((b) => b.slug === f.slug))
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white md:text-4xl">Избранное</h1>
          <p className="mt-2 text-zinc-400">
            {count} {count === 1 ? "элемент" : count < 5 ? "элемента" : "элементов"}
          </p>
        </div>
        {count > 0 && (
          <button
            onClick={() => {
              if (confirm("Удалить все из избранного?")) {
                clearAll();
              }
            }}
            className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
            Очистить всё
          </button>
        )}
      </div>

      {weaponFavorites.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-black text-white">
            <Target className="h-6 w-6 text-red-500" />
            Оружие ({weaponFavorites.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {weaponFavorites.map((weapon) => (
              <Link
                key={weapon.slug}
                href={`/weapons/${weapon.slug}`}
                className="group relative rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 transition-all hover:border-red-500/50 hover:bg-zinc-900"
              >
                <div className="absolute right-4 top-4">
                  <FavoriteButton type="weapon" slug={weapon.slug} />
                </div>
                <div className="mb-3">
                  <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-500">
                    {weapon.category}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{weapon.name}</h3>
                <p className="mt-2 text-sm text-zinc-400">{weapon.shortRole}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="rounded-lg bg-zinc-800 px-2 py-1 text-xs font-bold text-zinc-300">
                    Tier {weapon.tier}
                  </span>
                  <span className="text-xs text-zinc-500">{weapon.rarity}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {attachmentFavorites.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-black text-white">
            <Wrench className="h-6 w-6 text-red-500" />
            Обвесы ({attachmentFavorites.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {attachmentFavorites.map((attachment) => (
              <Link
                key={attachment.slug}
                href={`/weapons/attachments/${attachment.slug}`}
                className="group relative rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 transition-all hover:border-red-500/50 hover:bg-zinc-900"
              >
                <div className="absolute right-4 top-4">
                  <FavoriteButton type="attachment" slug={attachment.slug} />
                </div>
                <div className="mb-3">
                  <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-500">
                    {attachment.category}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{attachment.name}</h3>
                <p className="mt-2 text-sm text-zinc-400">{attachment.role}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {lootFavorites.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-black text-white">
            <Package className="h-6 w-6 text-red-500" />
            Лут ({lootFavorites.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lootFavorites.map((loot) => (
              <Link
                key={loot.slug}
                href={`/loot/${loot.slug}`}
                className="group relative rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 transition-all hover:border-red-500/50 hover:bg-zinc-900"
              >
                <div className="absolute right-4 top-4">
                  <FavoriteButton type="loot" slug={loot.slug} />
                </div>
                <div className="mb-3">
                  <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-500">
                    {loot.category}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{loot.name}</h3>
                <p className="mt-2 text-sm text-zinc-400">{loot.usage}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {guideFavorites.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-black text-white">
            <BookOpen className="h-6 w-6 text-red-500" />
            Гайды ({guideFavorites.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {guideFavorites.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group relative rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 transition-all hover:border-red-500/50 hover:bg-zinc-900"
              >
                <div className="absolute right-4 top-4">
                  <FavoriteButton type="guide" slug={guide.slug} />
                </div>
                <div className="mb-3">
                  <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-500">
                    {guide.category}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{guide.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{guide.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {bunkerFavorites.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-black text-white">
            <Home className="h-6 w-6 text-red-500" />
            Бункеры ({bunkerFavorites.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bunkerFavorites.map((bunker) => (
              <Link
                key={bunker.slug}
                href={`/bunkers/${bunker.slug}`}
                className="group relative rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 transition-all hover:border-red-500/50 hover:bg-zinc-900"
              >
                <div className="absolute right-4 top-4">
                  <FavoriteButton type="bunker" slug={bunker.slug} />
                </div>
                <div className="mb-3">
                  <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-500">
                    {bunker.type}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{bunker.name}</h3>
                <p className="mt-2 text-sm text-zinc-400">{bunker.location}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
