"use client";

import { useState } from "react";
import { AmmoType } from "@/types/ammo";
import { ammoTypes } from "@/data/ammo";
import { Search, Filter, Star } from "lucide-react";

interface AmmoSelectorProps {
  selectedAmmo: AmmoType | null;
  onAmmoSelect: (ammo: AmmoType) => void;
  caliber?: string;
  category?: string;
}

export default function AmmoSelector({ selectedAmmo, onAmmoSelect, caliber, category }: AmmoSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(category || "all");
  const [selectedCaliber, setSelectedCaliber] = useState<string>(caliber || "all");
  const [showFavorites, setShowFavorites] = useState(false);

  const categories = [
    { id: "all", name: "Все типы" },
    { id: "pistol", name: "Пистолетные" },
    { id: "rifle", name: "Винтовочные" },
    { id: "sniper", name: "Снайперские" },
    { id: "shotgun", name: "Дробовиков" },
    { id: "heavy", name: "Тяжелые" },
    { id: "special", name: "Специальные" }
  ];

  const calibers = [
    { id: "all", name: "Все калибры" },
    { id: "9mm", name: "9mm" },
    { id: ".45 ACP", name: ".45 ACP" },
    { id: "5.56mm", name: "5.56mm" },
    { id: "7.62x39mm", name: "7.62x39mm" },
    { id: "7.62x54R", name: "7.62x54R" },
    { id: ".50 BMG", name: ".50 BMG" },
    { id: ".338 Lapua", name: ".338 Lapua" },
    { id: ".22 LR", name: ".22 LR" },
    { id: "12g", name: "12g" }
  ];

  const filteredAmmo = ammoTypes.filter(ammo => {
    const matchesSearch = ammo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ammo.caliber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || ammo.category === selectedCategory;
    const matchesCaliber = selectedCaliber === "all" || ammo.caliber === selectedCaliber;
    
    return matchesSearch && matchesCategory && matchesCaliber;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-500 bg-gray-500/10';
      case 'uncommon': return 'border-green-500 bg-green-500/10';
      case 'rare': return 'border-blue-500 bg-blue-500/10';
      case 'epic': return 'border-purple-500 bg-purple-500/10';
      case 'legendary': return 'border-yellow-500 bg-yellow-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'uncommon': return 'text-green-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Поиск патронов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-zinc-500"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <select
            value={selectedCaliber}
            onChange={(e) => setSelectedCaliber(e.target.value)}
            className="px-3 py-1 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-zinc-500"
          >
            {calibers.map(cal => (
              <option key={cal.id} value={cal.id}>{cal.name}</option>
            ))}
          </select>

          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`px-3 py-1 border rounded-lg text-sm transition ${
              showFavorites 
                ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' 
                : 'bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:border-zinc-500'
            }`}
          >
            <Star className="inline h-3 w-3 mr-1" />
            Избранное
          </button>
        </div>
      </div>

      {/* Ammo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
        {filteredAmmo.map(ammo => (
          <div
            key={ammo.id}
            onClick={() => onAmmoSelect(ammo)}
            className={`cursor-pointer p-3 rounded-xl border transition-all hover:scale-105 ${
              selectedAmmo?.id === ammo.id
                ? 'border-red-500 bg-red-500/20 shadow-lg shadow-red-500/20'
                : 'border-zinc-700 bg-zinc-800/30 hover:border-zinc-500'
            } ${getRarityColor(ammo.rarity)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{ammo.icon}</span>
                <div>
                  <h4 className="font-semibold text-white text-sm">{ammo.name}</h4>
                  <p className="text-xs text-zinc-400">{ammo.caliber}</p>
                </div>
              </div>
              <span className={`text-xs font-medium ${getRarityTextColor(ammo.rarity)}`}>
                {ammo.rarity === 'common' && 'Обычные'}
                {ammo.rarity === 'uncommon' && 'Необычные'}
                {ammo.rarity === 'rare' && 'Редкие'}
                {ammo.rarity === 'epic' && 'Эпические'}
                {ammo.rarity === 'legendary' && 'Легендарные'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Урон:</span>
                <span className="text-red-400 font-medium">{ammo.baseDamage}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Пробитие:</span>
                <span className="text-yellow-400 font-medium">{ammo.penetration}%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Дальность:</span>
                <span className="text-green-400 font-medium">{ammo.effectiveRange}м</span>
              </div>
            </div>

            {/* Special Properties */}
            <div className="flex gap-1 mt-2 flex-wrap">
              {ammo.armorPiercing && (
                <span className="px-1 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded">AP</span>
              )}
              {ammo.explosive && (
                <span className="px-1 py-0.5 bg-orange-500/20 text-orange-300 text-xs rounded">EXP</span>
              )}
              {ammo.incendiary && (
                <span className="px-1 py-0.5 bg-red-500/20 text-red-300 text-xs rounded">FIRE</span>
              )}
              {ammo.uranium && (
                <span className="px-1 py-0.5 bg-green-500/20 text-green-300 text-xs rounded">U</span>
              )}
              {ammo.tracer && (
                <span className="px-1 py-0.5 bg-yellow-500/20 text-yellow-300 text-xs rounded">TR</span>
              )}
            </div>

            <p className="text-xs text-zinc-400 mt-2 line-clamp-2">{ammo.description}</p>
          </div>
        ))}
      </div>

      {filteredAmmo.length === 0 && (
        <div className="text-center py-8 text-zinc-500">
          <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Патроны не найдены</p>
        </div>
      )}
    </div>
  );
}
