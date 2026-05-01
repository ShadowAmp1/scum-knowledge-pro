"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Puzzle, Search, SlidersHorizontal, X } from "lucide-react";
import {
  attachmentCategories,
  attachments,
  getWeaponMatchStatus,
  type AttachmentCategory,
} from "@/data/attachments";

const allCategory = "Все категории";
const allMatch = "Любая совместимость";

type MatchFilter = typeof allMatch | "Есть оружие в базе" | "Только текстовая совместимость";

export function AttachmentFilters() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<AttachmentCategory | typeof allCategory>(allCategory);
  const [match, setMatch] = useState<MatchFilter>(allMatch);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return attachments.filter((attachment) => {
      const status = getWeaponMatchStatus(attachment);
      const matchesQuery =
        !normalized ||
        [
          attachment.name,
          attachment.category,
          attachment.subcategory,
          attachment.role,
          attachment.summary,
          attachment.compatibleWeapons.join(" "),
          attachment.bestFor.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);

      const matchesCategory = category === allCategory || attachment.category === category;
      const matchesWeapon =
        match === allMatch ||
        (match === "Есть оружие в базе" && status.hasMatches) ||
        (match === "Только текстовая совместимость" && !status.hasMatches);

      return matchesQuery && matchesCategory && matchesWeapon;
    });
  }, [query, category, match]);

  function reset() {
    setQuery("");
    setCategory(allCategory);
    setMatch(allMatch);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-2xl shadow-black/30">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-red-400">
              <SlidersHorizontal size={16} /> Поиск обвесов
            </div>
            <p className="mt-2 text-sm text-zinc-500">
              Найдено: <b className="text-white">{filtered.length}</b> из {attachments.length}
            </p>
          </div>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-white"
            type="button"
          >
            <X size={16} /> Сбросить
          </button>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Поиск: MP5, СВД, глушитель, планка, прицел..."
              className="h-12 w-full rounded-xl border border-zinc-800 bg-black pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/60"
            />
          </label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as AttachmentCategory | typeof allCategory)}
            className="h-12 rounded-xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition focus:border-red-500/60"
          >
            {[allCategory, ...attachmentCategories].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={match}
            onChange={(event) => setMatch(event.target.value as MatchFilter)}
            className="h-12 rounded-xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition focus:border-red-500/60"
          >
            {[allMatch, "Есть оружие в базе", "Только текстовая совместимость"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((attachment) => {
          const status = getWeaponMatchStatus(attachment);

          return (
            <Link
              key={attachment.slug}
              href={`/weapons/attachments/${attachment.slug}`}
              className="group rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 transition hover:-translate-y-1 hover:border-red-500/50 hover:bg-zinc-900"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">{attachment.category}</span>
                <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{attachment.subcategory}</span>
                <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-500">{attachment.rarity}</span>
              </div>

              <div className="mt-5 flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-300">
                  <Puzzle size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">{attachment.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{attachment.role}</p>
                </div>
              </div>

              <div className="mt-5">
                <div className="text-xs font-black uppercase tracking-widest text-zinc-500">Совместимость</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {attachment.compatibleWeapons.slice(0, 4).map((weapon) => (
                    <span key={weapon} className="rounded-full border border-zinc-800 bg-black/40 px-3 py-1 text-xs text-zinc-400">
                      {weapon}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 text-xs text-zinc-500">
                В базе оружия найдено: <b className={status.hasMatches ? "text-emerald-300" : "text-zinc-400"}>{status.matchedCount}</b>
              </div>

              <div className="mt-5 text-sm font-black text-red-400 transition group-hover:text-red-300">Открыть карточку →</div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
