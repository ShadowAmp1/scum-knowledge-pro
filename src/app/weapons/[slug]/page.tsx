import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { InfoCard } from "@/components/InfoCard";
import { RarityBadge, TierBadge } from "@/components/WeaponBadge";
import { StatBar } from "@/components/StatBar";
import { getWeaponBySlug, weapons } from "@/data/weapons";
import { attachments } from "@/data/attachments";

export function generateStaticParams() {
  return weapons.map((weapon) => ({ slug: weapon.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const weapon = getWeaponBySlug(params.slug);
  if (!weapon) return { title: "Оружие не найдено | SCUM DB PRO" };

  return {
    title: `${weapon.name} | SCUM DB PRO`,
    description: `${weapon.name}: лучший билд, патроны, модули, где найти, плюсы и минусы.`,
  };
}

export default function WeaponPage({ params }: { params: { slug: string } }) {
  const weapon = getWeaponBySlug(params.slug);
  if (!weapon) notFound();

  const similarWeapons = weapons
    .filter((item) => item.slug !== weapon.slug && (item.category === weapon.category || item.ammo === weapon.ammo))
    .slice(0, 3);

  const compatibleAttachments = attachments
    .filter((attachment) => attachment.compatibleWeaponSlugs.includes(weapon.slug))
    .slice(0, 8);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <Link href="/weapons" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-400 transition hover:text-white">
        <ArrowLeft size={16} /> Назад к оружию
      </Link>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl shadow-black/30">
        <div className="flex flex-wrap items-center gap-2">
          <TierBadge tier={weapon.tier} />
          <RarityBadge rarity={weapon.rarity} />
          <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-500">{weapon.category}</span>
          <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-500">{weapon.mode}</span>
        </div>

        <p className="mt-6 text-sm font-black uppercase tracking-[0.3em] text-red-400">{weapon.type}</p>
        <h1 className="mt-3 text-5xl font-black text-white md:text-6xl">{weapon.name}</h1>
        <p className="mt-3 text-lg font-bold text-red-200">{weapon.shortRole}</p>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">{weapon.summary}</p>

        <div className="mt-8 grid gap-3 md:grid-cols-4">
          <Metric label="Патрон" value={weapon.ammo} />
          <Metric label="Дистанция" value={weapon.range} />
          <Metric label="Сложность" value={weapon.difficulty} />
          <Metric label="Роль" value={weapon.mode} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <InfoCard title="Рейтинг оружия">
          <div className="space-y-5">
            <StatBar label="Урон" value={weapon.rating.damage} />
            <StatBar label="Контроль" value={weapon.rating.control} />
            <StatBar label="Дистанция" value={weapon.rating.range} />
            <StatBar label="Экономность" value={weapon.rating.economy} />
            <StatBar label="Бункеры" value={weapon.rating.bunker} />
            <StatBar label="PvP" value={weapon.rating.pvp} />
          </div>
        </InfoCard>

        <InfoCard title="Лучший билд">
          <ul className="space-y-2">
            {weapon.bestBuild.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </InfoCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <InfoCard title="Модули и снаряжение">
          <ul className="space-y-2">
            {weapon.attachments.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard title="Патроны и экономика">
          <ul className="space-y-2">
            {weapon.ammoTips.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard title="Где найти">
          <ul className="space-y-2">
            {weapon.whereToFind.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard title="Кому подходит">
          <ul className="space-y-2">
            {weapon.recommendedFor.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard title="Плюсы">
          <ul className="space-y-2">
            {weapon.pros.map((item) => (
              <li key={item}>+ {item}</li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard title="Минусы">
          <ul className="space-y-2">
            {weapon.cons.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </InfoCard>

        <div className="lg:col-span-2">
          <InfoCard title="Советы по использованию">
            <ul className="space-y-2">
              {weapon.tips.map((item) => (
                <li key={item}>⚠ {item}</li>
              ))}
            </ul>
          </InfoCard>
        </div>
      </div>

      {compatibleAttachments.length > 0 && (
        <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-white">Подходящие обвесы</h2>
              <p className="mt-2 text-sm text-zinc-500">Обвесы из базы, которые связаны с этим оружием.</p>
            </div>
            <Link href="/weapons/attachments" className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-black text-red-200 transition hover:bg-red-500/20">
              Все обвесы →
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {compatibleAttachments.map((attachment) => (
              <Link key={attachment.slug} href={`/weapons/attachments/${attachment.slug}`} className="rounded-2xl border border-zinc-800 bg-black p-4 transition hover:border-red-500/50">
                <div className="text-xs font-black uppercase tracking-widest text-red-400">{attachment.category}</div>
                <div className="mt-2 font-black text-white">{attachment.name}</div>
                <div className="mt-2 text-xs text-zinc-500">{attachment.subcategory}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {similarWeapons.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-black text-white">Похожее оружие</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {similarWeapons.map((item) => (
              <Link key={item.slug} href={`/weapons/${item.slug}`} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-red-500/50 hover:bg-zinc-900">
                <div className="text-sm font-bold text-red-300">Tier {item.tier} • {item.ammo}</div>
                <div className="mt-2 text-xl font-black text-white">{item.name}</div>
                <p className="mt-2 text-sm text-zinc-500">{item.shortRole}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-black/40 p-4 ring-1 ring-zinc-900">
      <span className="text-sm text-zinc-500">{label}</span>
      <div className="mt-1 font-black text-white">{value}</div>
    </div>
  );
}
