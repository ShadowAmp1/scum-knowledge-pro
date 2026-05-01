"use client";

import Link from "next/link";
import { useMemo, useState, type ElementType } from "react";
import {
  AlertTriangle,
  Car,
  Crosshair,
  Filter,
  Home,
  Landmark,
  MapPin,
  Package,
  Search,
  Shield,
  Store,
  Target,
  X,
} from "lucide-react";
import { MapMarker, MapMarkerCategory, mapCategoryLabels, mapMarkers } from "@/data/mapMarkers";

const categoryIcons: Record<MapMarkerCategory, ElementType> = {
  bunker: Shield,
  trader: Store,
  loot: Package,
  vehicle: Car,
  base: Home,
  danger: AlertTriangle,
  town: Landmark,
  military: Crosshair,
};

const categoryStyles: Record<MapMarkerCategory, { dot: string; chip: string; ring: string }> = {
  bunker: { dot: "bg-red-600", chip: "border-red-500/30 bg-red-500/10 text-red-200", ring: "shadow-[0_0_32px_rgba(220,38,38,0.55)]" },
  trader: { dot: "bg-emerald-500", chip: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200", ring: "shadow-[0_0_32px_rgba(16,185,129,0.45)]" },
  loot: { dot: "bg-amber-400", chip: "border-amber-500/30 bg-amber-500/10 text-amber-200", ring: "shadow-[0_0_32px_rgba(245,158,11,0.45)]" },
  vehicle: { dot: "bg-cyan-400", chip: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200", ring: "shadow-[0_0_32px_rgba(34,211,238,0.45)]" },
  base: { dot: "bg-violet-500", chip: "border-violet-500/30 bg-violet-500/10 text-violet-200", ring: "shadow-[0_0_32px_rgba(139,92,246,0.45)]" },
  danger: { dot: "bg-orange-600", chip: "border-orange-500/30 bg-orange-500/10 text-orange-200", ring: "shadow-[0_0_32px_rgba(234,88,12,0.55)]" },
  town: { dot: "bg-zinc-300", chip: "border-zinc-500/30 bg-zinc-500/10 text-zinc-200", ring: "shadow-[0_0_32px_rgba(212,212,216,0.35)]" },
  military: { dot: "bg-rose-500", chip: "border-rose-500/30 bg-rose-500/10 text-rose-200", ring: "shadow-[0_0_32px_rgba(244,63,94,0.5)]" },
};

const riskStyles: Record<MapMarker["risk"], string> = {
  "Низкий": "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  "Средний": "border-amber-500/30 bg-amber-500/10 text-amber-200",
  "Высокий": "border-orange-500/30 bg-orange-500/10 text-orange-200",
  "Экстрим": "border-red-500/30 bg-red-500/10 text-red-200",
};

const categories = Object.keys(mapCategoryLabels) as MapMarkerCategory[];

export function InteractiveMap() {
  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<MapMarkerCategory[]>(categories);
  const [selectedId, setSelectedId] = useState(mapMarkers[0]?.id ?? "");
  const [risk, setRisk] = useState<"all" | MapMarker["risk"]>("all");

  const selectedMarker = mapMarkers.find((marker) => marker.id === selectedId) ?? mapMarkers[0]!;

  const filteredMarkers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return mapMarkers.filter((marker) => {
      const matchesCategory = activeCategories.includes(marker.category);
      const matchesRisk = risk === "all" || marker.risk === risk;
      const matchesQuery =
        !normalizedQuery ||
        [marker.name, marker.sector, marker.short, marker.description, marker.bestFor.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesRisk && matchesQuery;
    });
  }, [activeCategories, query, risk]);

  function toggleCategory(category: MapMarkerCategory) {
    setActiveCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  }

  function resetFilters() {
    setQuery("");
    setRisk("all");
    setActiveCategories(categories);
    setSelectedId(mapMarkers[0]?.id ?? "");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_0.35fr]">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-red-300">
            <Filter size={16} /> Фильтры карты
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_0.35fr]">
            <label className="relative block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Поиск: бункер, лут, транспорт, сектор, база..."
                className="w-full rounded-2xl border border-zinc-800 bg-black px-11 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/60"
              />
            </label>

            <select
              value={risk}
              onChange={(event) => setRisk(event.target.value as "all" | MapMarker["risk"])}
              className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/60"
            >
              <option value="all">Любой риск</option>
              <option value="Низкий">Низкий риск</option>
              <option value="Средний">Средний риск</option>
              <option value="Высокий">Высокий риск</option>
              <option value="Экстрим">Экстрим</option>
            </select>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = categoryIcons[category];
              const active = activeCategories.includes(category);
              const style = categoryStyles[category];

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition ${active ? style.chip : "border-zinc-800 bg-black text-zinc-500 hover:text-zinc-300"}`}
                >
                  <Icon size={14} /> {mapCategoryLabels[category]}
                </button>
              );
            })}

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black px-4 py-2 text-xs font-bold text-zinc-400 transition hover:border-zinc-600 hover:text-white"
            >
              <X size={14} /> Сбросить
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5">
          <div className="text-sm text-zinc-500">Найдено точек</div>
          <div className="mt-1 text-4xl font-black text-white">{filteredMarkers.length}</div>
          <p className="mt-2 text-sm text-zinc-400">Метки можно включать и выключать. Координаты редактируются в src/data/mapMarkers.ts.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.45fr_0.55fr]">
        <div className="relative min-h-[680px] overflow-hidden rounded-3xl border border-zinc-800 bg-[#080808] shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.16),transparent_30rem)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.12),transparent_18rem)]" />
          <div className="absolute inset-0 map-grid opacity-90" />
          <div className="absolute inset-0 map-terrain opacity-60" />

          <div className="absolute left-0 top-0 grid h-full w-full grid-cols-4 grid-rows-4 text-xs font-black text-zinc-700/80">
            {Array.from({ length: 16 }).map((_, index) => (
              <div key={index} className="border border-zinc-800/70 p-3">
                {String.fromCharCode(65 + (index % 4))}{Math.floor(index / 4) + 1}
              </div>
            ))}
          </div>

          <div className="absolute left-5 top-5 z-10 rounded-2xl border border-zinc-800 bg-black/80 px-4 py-3 backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-black text-white"><Target size={16} className="text-red-400" /> SCUM Tactical Map</div>
            <div className="mt-1 text-xs text-zinc-500">v4 interactive overlay</div>
          </div>

          {filteredMarkers.map((marker) => {
            const Icon = categoryIcons[marker.category];
            const style = categoryStyles[marker.category];
            const isSelected = marker.id === selectedMarker.id;

            return (
              <button
                key={marker.id}
                type="button"
                onClick={() => setSelectedId(marker.id)}
                className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 text-left"
                style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                title={marker.description}
              >
                <span className={`grid h-9 w-9 place-items-center rounded-full border-2 border-white/80 ${style.dot} ${style.ring} transition group-hover:scale-110 ${isSelected ? "scale-125" : ""}`}>
                  <Icon size={17} className="text-black" />
                </span>
                <span className={`mt-2 block whitespace-nowrap rounded-xl border px-3 py-1.5 text-xs font-black backdrop-blur transition ${isSelected ? "border-red-400 bg-black text-white" : "border-zinc-700 bg-black/80 text-zinc-200 group-hover:border-zinc-500"}`}>
                  {marker.name}
                </span>
              </button>
            );
          })}
        </div>

        <aside className="space-y-4">
          {selectedMarker && (
            <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-5 shadow-danger">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-red-300">Выбранная точка</div>
                  <h2 className="mt-2 text-2xl font-black text-white">{selectedMarker.name}</h2>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-bold ${categoryStyles[selectedMarker.category].chip}`}>
                  {mapCategoryLabels[selectedMarker.category]}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-300">{selectedMarker.description}</p>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-2xl border border-zinc-800 bg-black/50 p-3">
                  <div className="text-xs text-zinc-500">Сектор</div>
                  <div className="mt-1 font-black text-white">{selectedMarker.sector}</div>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-black/50 p-3">
                  <div className="text-xs text-zinc-500">Лут</div>
                  <div className="mt-1 font-black text-white">{selectedMarker.lootTier}</div>
                </div>
                <div className={`rounded-2xl border p-3 ${riskStyles[selectedMarker.risk]}`}>
                  <div className="text-xs opacity-80">Риск</div>
                  <div className="mt-1 font-black">{selectedMarker.risk}</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-black text-white">Подходит для</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedMarker.bestFor.map((item) => (
                    <span key={item} className="rounded-full border border-zinc-800 bg-black/50 px-3 py-1 text-xs text-zinc-300">{item}</span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-black text-white">Что взять</div>
                <ul className="mt-2 space-y-2 text-sm text-zinc-300">
                  {selectedMarker.recommendedKit.map((item) => (
                    <li key={item} className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-red-400" /> {item}</li>
                  ))}
                </ul>
              </div>

              {selectedMarker.linkedHref && (
                <Link href={selectedMarker.linkedHref} className="mt-5 block rounded-2xl bg-red-600 px-4 py-3 text-center text-sm font-black text-white transition hover:bg-red-500">
                  Открыть связанный раздел →
                </Link>
              )}
            </div>
          )}

          <div className="max-h-[560px] space-y-3 overflow-auto pr-2">
            {filteredMarkers.map((marker) => (
              <button
                key={marker.id}
                type="button"
                onClick={() => setSelectedId(marker.id)}
                className={`w-full rounded-2xl border p-4 text-left transition hover:border-red-500/40 ${marker.id === selectedMarker.id ? "border-red-500/50 bg-red-500/10" : "border-zinc-800 bg-zinc-950/80"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-black text-white">{marker.name}</div>
                  <span className="text-xs text-zinc-500">{marker.sector}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-400">{marker.short}</p>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
