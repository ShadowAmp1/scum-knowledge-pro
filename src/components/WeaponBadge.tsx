import type { WeaponRarity, WeaponTier } from "@/data/weapons";

export function TierBadge({ tier }: { tier: WeaponTier }) {
  return (
    <span className="rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs font-black text-red-200">
      Tier {tier}
    </span>
  );
}

export function RarityBadge({ rarity }: { rarity: WeaponRarity }) {
  return (
    <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-bold text-zinc-300">
      {rarity}
    </span>
  );
}
