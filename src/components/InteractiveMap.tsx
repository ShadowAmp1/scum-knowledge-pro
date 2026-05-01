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
  Skull,
  Store,
  Target,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  MapMarker,
  MapMarkerCategory,
  mapCategoryLabels,
  mapMarkers,
} from "@/data/mapMarkers";

const categoryIcons: Record<MapMarkerCategory, ElementType> = {
  bunker: Shield,
  abandonedBunker: Skull,
  trader: Store,
  loot: Package,
  vehicle: Car,
  base: Home,
  danger: AlertTriangle,
  town: Landmark,
  military: Crosshair,
};

const categoryStyles: Record<MapMarkerCategory, { dot: string; chip: string; ring: string }> = {
  bunker: {
    dot: "bg-red-600",
    chip: "border-red-500/30 bg-red-500/10 text-red-200",
    ring: "shadow-[0_0_32px_rgba(220,38,38,0.6)]",
  },
  abandonedBunker: {
    dot: "bg-purple-600",
    chip: "border-purple-500/30 bg-purple-500/10 text-purple-200",
    ring: "shadow-[0_0_32px_rgba(147,51,234,0.65)]",
  },
  trader: {
    dot: "bg-emerald-500",
    chip: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
    ring: "shadow-[0_0_32px_rgba(16,185,129,0.5)]",
  },
  loot: {
    dot: "bg-amber-400",
    chip: "border-amber-500/30 bg-amber-500/10 text-amber-200",
    ring: "shadow-[0_0_32px_rgba(245,158,11,0.5)]",
  },
  vehicle: {
    dot: "bg-cyan-400",
    chip: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
    ring: "shadow-[0_0_32px_rgba(34,211,238,0.5)]",
  },
  base: {
    dot: "bg-violet-500",
    chip: "border-violet-500/30 bg-violet-500/10 text-violet-200",
    ring: "shadow-[0_0_32px_rgba(139,92,246,0.5)]",
  },
  danger: {
    dot: "bg-orange-600",
    chip: "border-orange-500/30 bg-orange-500/10 text-orange-200",
    ring: "shadow-[0_0_32px_rgba(234,88,12,0.6)]",
  },
  town: {
    dot: "bg-zinc-200",
    chip: "border-zinc-500/30 bg-zinc-500/10 text-zinc-200",
    ring: "shadow-[0_0_32px_rgba(212,212,216,0.45)]",
  },
  military: {
    dot: "bg-rose-500",
    chip: "border-rose-500/30 bg-rose-500/10 text-rose-200",
    ring: "shadow-[0_0_32px_rgba(244,63,94,0.55)]",
  },
};

const riskStyles: Record<MapMarker["risk"], string> = {
  "Низкий": "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  "Средний": "border-amber-500/30 bg-amber-500/10 text-amber-200",
  "Высокий": "border-orange-500/30 bg-orange-500/10 text-orange-200",
  "Экстрим": "border-red-500/30 bg-red-500/10 text-red-200",
};

const categories = Object.keys(mapCategoryLabels) as MapMarkerCategory[];

type ZoomLevel = "fit" | "wide" | "full";

const zoomClasses: Record<ZoomLevel, string> = {
  fit: "max-w-[980px]",
  wide: "max-w-[1180px]",
  full: "max-w-none",
};

export function InteractiveMap() {
  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<MapMarkerCategory[]>(["bunker", "abandonedBunker", "trader"]);
  const [selectedId, setSelectedId] = useState(mapMarkers[0]?.id ?? "");
  const [risk, setRisk] = useState<"all" | MapMarker["risk"]>("all");
  const [zoom, setZoom] = useState<ZoomLevel>("wide");

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
    setActiveCategories(["bunker", "abandonedBunker", "trader"]);
    setSelectedId(mapMarkers[0]?.id ?? "");
    setZoom("wide");
  }

  function zoomIn() {
    setZoom((current) => (current === "fit" ? "wide" : "full"));
  }

  function zoomOut() {
    setZoom((current) => (current === "full" ? "wide" : "fit"));
  }

  return (
    <section className="mx-auto max-w-[1500px] px-4 py-12">
      <div className="mb-6 grid gap-4 xl:grid-cols-[1fr_0.32fr]">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-red-300">
            <Filter size={16} /> Фильтры карты SCUM — бункеры, торговцы и POI
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
            <label className="relative block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Поиск: C2, остров, аэродром, город, транспорт, база..."
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
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition ${
                    active
                      ? style.chip
                      : "border-zinc-800 bg-black text-zinc-500 hover:text-zinc-300"
                  }`}
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
          <p className="mt-2 text-sm text-zinc-400">
            Сетка отключена. По умолчанию показаны обычные бункеры, заброшенные бункеры и торговцы; остальные POI можно включить фильтрами.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_390px]">
        <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
            <div>
              <div className="flex items-center gap-2 text-sm font-black text-white">
                <Target size={16} className="text-red-400" /> SCUM current tactical map
              </div>
              <div className="mt-1 text-xs text-zinc-500">Сектора D4 → Z0, метки поверх реальной карты</div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={zoomOut}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-black px-3 py-2 text-xs font-bold text-zinc-300 transition hover:border-zinc-600 hover:text-white"
              >
                <ZoomOut size={14} /> -
              </button>
              <button
                type="button"
                onClick={zoomIn}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-black px-3 py-2 text-xs font-bold text-zinc-300 transition hover:border-zinc-600 hover:text-white"
              >
                <ZoomIn size={14} /> +
              </button>
            </div>
          </div>

          <div className="custom-scrollbar overflow-auto rounded-2xl border border-zinc-800 bg-black">
            <div className={`relative mx-auto aspect-square w-full min-w-[760px] ${zoomClasses[zoom]}`}>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.22)), url('/images/scum-current-map.png')",
                }}
              />

              {filteredMarkers.map((marker) => {
                const Icon = categoryIcons[marker.category];
                const style = categoryStyles[marker.category];
                const isSelected = marker.id === selectedMarker.id;

                return (
                  <button
                    key={marker.id}
                    type="button"
                    onClick={() => setSelectedId(marker.id)}
                    className="group absolute z-20 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-left"
                    style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                    title={marker.description}
                  >
                    <span
                      className={`grid h-7 w-7 place-items-center rounded-full border-2 border-white ${style.dot} ${style.ring} transition ${isSelected ? "ring-4 ring-white/30" : ""}`}
                    >
                      <Icon size={14} className="text-black" />
                    </span>
                    <span
                      className={`pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 whitespace-nowrap rounded-xl border px-3 py-1.5 text-xs font-black backdrop-blur transition ${
                        isSelected
                          ? "block border-red-400 bg-black text-white"
                          : "hidden border-zinc-700 bg-black/80 text-zinc-200 group-hover:block group-hover:border-zinc-500"
                      }`}
                    >
                      {marker.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
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
                    <span key={item} className="rounded-full border border-zinc-800 bg-black/50 px-3 py-1 text-xs text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-black text-white">Что взять</div>
                <ul className="mt-2 space-y-2 text-sm text-zinc-300">
                  {selectedMarker.recommendedKit.map((item) => (
                    <li key={item} className="flex gap-2">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-red-400" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {selectedMarker.linkedHref && (
                <Link
                  href={selectedMarker.linkedHref}
                  className="mt-5 block rounded-2xl bg-red-600 px-4 py-3 text-center text-sm font-black text-white transition hover:bg-red-500"
                >
                  Открыть связанный раздел →
                </Link>
              )}
            </div>
          )}

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="text-sm font-black text-white">Быстрый список</div>
            <div className="mt-3 max-h-[420px] space-y-2 overflow-auto pr-1 custom-scrollbar">
              {filteredMarkers.map((marker) => (
                <button
                  key={marker.id}
                  type="button"
                  onClick={() => setSelectedId(marker.id)}
                  className={`w-full rounded-2xl border p-3 text-left transition ${
                    marker.id === selectedMarker.id
                      ? "border-red-500/50 bg-red-500/10"
                      : "border-zinc-800 bg-black/40 hover:border-zinc-600"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-black text-white">{marker.name}</div>
                    <div className="text-xs text-zinc-500">{marker.sector}</div>
                  </div>
                  <div className="mt-1 text-xs text-zinc-400">{marker.short}</div>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
