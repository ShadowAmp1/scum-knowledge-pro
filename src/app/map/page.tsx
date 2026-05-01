import { PageHeader } from "@/components/PageHeader";
import { mapMarkers } from "@/data/mapMarkers";

export default function MapPage() {
  return (
    <main>
      <PageHeader title="Карта" description="Демонстрационная PRO-карта с метками. Координаты можно менять в src/data/mapMarkers.ts." />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="relative min-h-[560px] overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
          <div className="absolute inset-0 noise opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.14),transparent_28rem)]" />
          <div className="absolute left-0 top-0 grid h-full w-full grid-cols-4 grid-rows-4 text-xs font-black text-zinc-700">
            {Array.from({ length: 16 }).map((_, i) => <div key={i} className="border border-zinc-800/70 p-3">{String.fromCharCode(65 + (i % 4))}{Math.floor(i / 4) + 1}</div>)}
          </div>
          {mapMarkers.map((marker) => (
            <div key={marker.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${marker.x}%`, top: `${marker.y}%` }} title={marker.note}>
              <div className="h-4 w-4 rounded-full border-2 border-white bg-red-600 shadow-danger" />
              <div className="mt-2 whitespace-nowrap rounded-xl border border-zinc-700 bg-black/80 px-3 py-1 text-xs font-black text-white">{marker.name}</div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {mapMarkers.map((marker) => (
            <div key={marker.name} className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5">
              <div className="flex items-center justify-between"><h2 className="font-black text-white">{marker.name}</h2><span className="text-xs text-red-300">{marker.type}</span></div>
              <p className="mt-2 text-sm text-zinc-400">Сектор {marker.sector} — {marker.note}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
