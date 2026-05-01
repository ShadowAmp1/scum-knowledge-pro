"use client";

import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  guideCategories,
  guideDifficulties,
  guides,
  type GuideCategory,
  type GuideDifficulty,
} from "@/data/guides";

const allCategories = "Все категории";
const allDifficulty = "Любая сложность";

export function GuideFilters() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<GuideCategory | typeof allCategories>(allCategories);
  const [difficulty, setDifficulty] = useState<GuideDifficulty | typeof allDifficulty>(allDifficulty);

  const filteredGuides = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return guides.filter((guide) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          guide.title,
          guide.category,
          guide.summary,
          guide.intro,
          guide.goals.join(" "),
          guide.checklist.join(" "),
          guide.sections.map((section) => `${section.heading} ${section.body} ${section.bullets.join(" ")}`).join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesCategory = category === allCategories || guide.category === category;
      const matchesDifficulty = difficulty === allDifficulty || guide.difficulty === difficulty;

      return matchesQuery && matchesCategory && matchesDifficulty;
    });
  }, [query, category, difficulty]);

  function resetFilters() {
    setQuery("");
    setCategory(allCategories);
    setDifficulty(allDifficulty);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-2xl shadow-black/30">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-red-400">
              <SlidersHorizontal size={16} /> Категории гайдов
            </div>
            <p className="mt-2 text-sm text-zinc-500">
              Найдено: <b className="text-white">{filteredGuides.length}</b> из {guides.length}
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

        <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Поиск: старт, бункер, медицина, база, торговцы..."
              className="h-12 w-full rounded-xl border border-zinc-800 bg-black pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/60"
            />
          </label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as GuideCategory | typeof allCategories)}
            className="h-12 rounded-xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition focus:border-red-500/60"
          >
            {[allCategories, ...guideCategories].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value as GuideDifficulty | typeof allDifficulty)}
            className="h-12 rounded-xl border border-zinc-800 bg-black px-4 text-sm text-white outline-none transition focus:border-red-500/60"
          >
            {[allDifficulty, ...guideDifficulties].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 transition hover:-translate-y-1 hover:border-red-500/50 hover:bg-zinc-900"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">{guide.category}</span>
              <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-400">{guide.difficulty}</span>
              <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-500">{guide.minutes} мин</span>
            </div>

            <h2 className="mt-5 text-2xl font-black text-white">{guide.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{guide.summary}</p>

            <div className="mt-5">
              <div className="text-xs font-black uppercase tracking-widest text-zinc-500">Цели</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {guide.goals.slice(0, 3).map((goal) => (
                  <span key={goal} className="rounded-full border border-zinc-800 bg-black/40 px-3 py-1 text-xs text-zinc-400">
                    {goal}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 text-sm font-black text-red-400 transition group-hover:text-red-300">Читать гайд →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
