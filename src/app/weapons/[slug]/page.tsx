export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { InfoCard } from "@/components/InfoCard";
import { RarityBadge, TierBadge } from "@/components/WeaponBadge";
import { StatBar } from "@/components/StatBar";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getWeaponBySlug, weapons } from "@/data/weapons";
import { attachmentCategories } from "@/data/attachments";
import { getContent } from "@/lib/content";

export function generateStaticParams() {
  return weapons.map((weapon) => ({ slug: weapon.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const weapon = getWeaponBySlug(params.slug);
  if (!weapon) return { title: "Оружие не найдено | SCUM DB PRO" };

  const title = `${weapon.name} | SCUM DB PRO`;
  const description = `${weapon.name} (${weapon.category}): ${weapon.shortRole}. Tier ${weapon.tier}, патрон ${weapon.ammo}. Лучший билд, обвесы, где найти, плюсы и минусы.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://scumdbpro.duckdns.org/weapons/${weapon.slug}`,
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: `${weapon.name} - SCUM DB PRO`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.svg"]
    }
  };
}

export default async function WeaponPage({ params }: { params: { slug: string } }) {
  const { weapons, attachments } = await getContent();
  const weapon = weapons.find((item) => item.slug === params.slug);
  if (!weapon) notFound();

  const similarWeapons = weapons
    .filter((item) => item.slug !== weapon.slug && (item.category === weapon.category || item.ammo === weapon.ammo))
    .slice(0, 3);

  const recommendedAttachmentSlugs = new Set(weapon.recommendedAttachmentSlugs ?? []);
  const compatibleAttachments = attachments
    .filter((attachment) => attachment.compatibleWeaponSlugs.includes(weapon.slug) || recommendedAttachmentSlugs.has(attachment.slug))
    .sort((a, b) => {
      const recommendedDiff = Number(recommendedAttachmentSlugs.has(b.slug)) - Number(recommendedAttachmentSlugs.has(a.slug));
      if (recommendedDiff !== 0) return recommendedDiff;

      return attachmentCategories.indexOf(a.category) - attachmentCategories.indexOf(b.category) || a.name.localeCompare(b.name, "ru");
    });
  const groupedCompatibleAttachments = attachmentCategories
    .map((category) => ({
      category,
      items: compatibleAttachments.filter((attachment) => attachment.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <Link href="/weapons" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-400 transition hover:text-white">
        <ArrowLeft size={16} /> Назад к оружию
      </Link>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl shadow-black/30">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <TierBadge tier={weapon.tier} />
            <RarityBadge rarity={weapon.rarity} />
            <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-500">{weapon.category}</span>
            <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-500">{weapon.mode}</span>
          </div>
          <FavoriteButton type="weapon" slug={weapon.slug} showLabel />
        </div>

        <p className="mt-6 text-sm font-black uppercase tracking-[0.3em] text-red-400">{weapon.type}</p>
        <h1 className="mt-3 text-5xl font-black text-white md:text-6xl">{weapon.name}</h1>
        <p className="mt-3 text-lg font-bold text-red-200">{weapon.shortRole}</p>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">{weapon.summary}</p>
        {weapon.serverNote ? (
          <div className="mt-5 max-w-3xl rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm leading-6 text-amber-100">
            {weapon.serverNote}
          </div>
        ) : null}

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

      <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-white">Подходящие обвесы</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Показаны все обвесы из базы, у которых в совместимости указан {weapon.name}. Найдено: <b className="text-white">{compatibleAttachments.length}</b>.
            </p>
          </div>
          <Link href="/weapons/attachments" className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-black text-red-200 transition hover:bg-red-500/20">
            Все обвесы →
          </Link>
        </div>

        {groupedCompatibleAttachments.length > 0 ? (
          <div className="mt-6 space-y-6">
            {groupedCompatibleAttachments.map((group) => (
              <div key={group.category}>
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-sm font-black uppercase tracking-[0.25em] text-red-400">{group.category}</h3>
                  <span className="rounded-full border border-zinc-800 px-2 py-0.5 text-xs font-bold text-zinc-500">{group.items.length}</span>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {group.items.map((attachment) => {
                    const isRecommended = recommendedAttachmentSlugs.has(attachment.slug);

                    return (
                      <Link key={attachment.slug} href={`/weapons/attachments/${attachment.slug}`} className="rounded-2xl border border-zinc-800 bg-black p-4 transition hover:border-red-500/50">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-black uppercase tracking-widest text-red-400">{attachment.subcategory}</span>
                          {isRecommended ? (
                            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-emerald-300">
                              Рекомендовано
                            </span>
                          ) : null}
                        </div>
                        <div className="mt-2 font-black text-white">{attachment.name}</div>
                        <p className="mt-2 line-clamp-3 text-xs leading-5 text-zinc-500">{attachment.role}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-zinc-800 bg-black p-5 text-sm leading-6 text-zinc-400">
            Для этого оружия в базе пока нет устанавливаемых обвесов. Это нормально для ближнего боя, гранат, взрывчатки и части самодельного оружия. Если сервер добавляет модовые обвесы, их лучше вынести отдельной карточкой.
          </div>
        )}
      </section>

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
