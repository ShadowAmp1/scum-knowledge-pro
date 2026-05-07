export const metadata = {
  title: "SCUM DB PRO — оружие, лут, бункеры и карта",
  description: "Русская база знаний SCUM: оружие, обвесы, лут, бункеры, интерактивная карта, гайды и подготовка к рейдам.",
};

import { Hero } from "@/components/Hero";
import { SectionCard } from "@/components/SectionCard";
import { sections } from "@/data/sections";
import { weapons } from "@/data/weapons";
import { bunkers } from "@/data/bunkers";
import { lootItems } from "@/data/loot";

export default function HomePage() {
  const stats = [
    { label: "Единиц оружия", value: weapons.length },
    { label: "Бункеров", value: bunkers.length },
    { label: "Предметов лута", value: lootItems.length },
    { label: "Разделов", value: sections.length }
  ];
  return (
    <main>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6">
              <div className="text-4xl font-black text-red-500">{stat.value}</div>
              <div className="mt-1 text-sm font-bold text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-white md:text-4xl">Разделы базы знаний</h2>
          <p className="mt-3 max-w-2xl text-zinc-400">Выбери раздел: оружие, бункеры, лут, карту, базы, транспорт или гайды.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => <SectionCard key={section.href} {...section} />)}
        </div>
      </section>
    </main>
  );
}
