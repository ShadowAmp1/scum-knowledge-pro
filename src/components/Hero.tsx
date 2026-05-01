import Link from "next/link";
import { ArrowRight, MapPinned, ShieldCheck, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-black">
      <div className="absolute inset-0 noise opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(220,38,38,0.32),transparent_32rem)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:py-28">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-200">
            <Zap size={16} /> PRO база знаний по SCUM
          </div>
          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
            Выживай умнее. <span className="text-red-500">Фарми быстрее.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Оружие, бункеры, лут, базы, транспорт, карта и гайды в одном готовом сайте, который можно залить на GitHub и запустить на Render.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/weapons" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3 font-black text-white shadow-danger transition hover:bg-red-500">
              Смотреть оружие <ArrowRight size={18} />
            </Link>
            <Link href="/map" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-700 px-6 py-3 font-black text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900">
              Открыть карту <MapPinned size={18} />
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-3 border-b border-zinc-800 pb-5">
            <ShieldCheck className="text-red-400" />
            <div>
              <div className="font-black text-white">Статус проекта</div>
              <div className="text-sm text-zinc-500">Готовая статическая PRO-версия</div>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {["Next.js + TypeScript", "Tailwind дизайн", "Данные в src/data", "Render Blueprint", "SEO и адаптивность"].map((item) => (
              <div key={item} className="rounded-2xl border border-zinc-800 bg-black/40 px-4 py-3 text-zinc-300">✓ {item}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
