"use client";

import { useState, useEffect } from "react";

export type FavoriteType = "weapon" | "attachment" | "loot" | "mission" | "guide" | "bunker";

type FavoriteItem = {
  type: FavoriteType;
  slug: string;
  addedAt: number;
};

const STORAGE_KEY = "scum-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
    setIsLoaded(true);
  }, []);

  const saveFavorites = (items: FavoriteItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      setFavorites(items);
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  };

  const addFavorite = (type: FavoriteType, slug: string) => {
    const newItem: FavoriteItem = {
      type,
      slug,
      addedAt: Date.now(),
    };
    saveFavorites([...favorites, newItem]);
  };

  const removeFavorite = (type: FavoriteType, slug: string) => {
    saveFavorites(favorites.filter((f) => !(f.type === type && f.slug === slug)));
  };

  const toggleFavorite = (type: FavoriteType, slug: string) => {
    if (isFavorite(type, slug)) {
      removeFavorite(type, slug);
    } else {
      addFavorite(type, slug);
    }
  };

  const isFavorite = (type: FavoriteType, slug: string) => {
    return favorites.some((f) => f.type === type && f.slug === slug);
  };

  const getFavoritesByType = (type: FavoriteType) => {
    return favorites.filter((f) => f.type === type).map((f) => f.slug);
  };

  const clearAll = () => {
    saveFavorites([]);
  };

  return {
    favorites,
    isLoaded,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    getFavoritesByType,
    clearAll,
    count: favorites.length,
  };
}
