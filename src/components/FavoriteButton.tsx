"use client";

import { Heart } from "lucide-react";
import { useFavorites, type FavoriteType } from "@/lib/useFavorites";

type FavoriteButtonProps = {
  type: FavoriteType;
  slug: string;
  className?: string;
  showLabel?: boolean;
};

export function FavoriteButton({ type, slug, className = "", showLabel = false }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  if (!isLoaded) {
    return null;
  }

  const active = isFavorite(type, slug);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(type, slug);
      }}
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
        active
          ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
          : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-red-500"
      } ${className}`}
      title={active ? "Убрать из избранного" : "Добавить в избранное"}
    >
      <Heart
        className={`h-5 w-5 transition-all ${active ? "fill-red-500" : ""}`}
      />
      {showLabel && (
        <span className="text-sm font-semibold">
          {active ? "В избранном" : "В избранное"}
        </span>
      )}
    </button>
  );
}
