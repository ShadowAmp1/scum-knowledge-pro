"use client";

import { AmmoType } from "@/types/ammo";
import { Zap, Shield, Target, TrendingUp, Star } from "lucide-react";

interface AmmoCardProps {
  ammo: AmmoType;
  isSelected: boolean;
  onClick: () => void;
  showRecommendations?: boolean;
}

export default function AmmoCard({ ammo, isSelected, onClick, showRecommendations = true }: AmmoCardProps) {
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

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Обычные';
      case 'uncommon': return 'Необычные';
      case 'rare': return 'Редкие';
      case 'epic': return 'Эпические';
      case 'legendary': return 'Легендарные';
      default: return 'Обычные';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'pistol': return 'bg-blue-500/20 text-blue-300';
      case 'rifle': return 'bg-green-500/20 text-green-300';
      case 'sniper': return 'bg-purple-500/20 text-purple-300';
      case 'shotgun': return 'bg-red-500/20 text-red-300';
      case 'heavy': return 'bg-orange-500/20 text-orange-300';
      case 'special': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'pistol': return 'Пистолетные';
      case 'rifle': return 'Винтовочные';
      case 'sniper': return 'Снайперские';
      case 'shotgun': return 'Дробовиков';
      case 'heavy': return 'Тяжелые';
      case 'special': return 'Специальные';
      default: return 'Общие';
    }
  };

  const getStatBar = (value: number, max: number = 100, color: string = "blue") => {
    const percentage = (value / max) * 100;
    const getColorClass = (col: string) => {
      switch (col) {
        case 'red': return 'bg-red-500';
        case 'green': return 'bg-green-500';
        case 'yellow': return 'bg-yellow-500';
        case 'blue': return 'bg-blue-500';
        case 'purple': return 'bg-purple-500';
        case 'orange': return 'bg-orange-500';
        default: return 'bg-zinc-500';
      }
    };

    return (
      <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${getColorClass(color)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border transition-all hover:scale-[1.02] p-4 relative ${
        isSelected
          ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20'
          : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-500 hover:bg-zinc-800/70'
      } ${getRarityColor(ammo.rarity)}`}
    >
      {/* Rarity Badge */}
      <div className="absolute top-2 right-2">
        <span className={`px-2 py-1 rounded text-xs font-medium ${getRarityTextColor(ammo.rarity)}`}>
          {getRarityLabel(ammo.rarity)}
        </span>
      </div>

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl">{ammo.icon}</span>
        <div className="flex-1">
          <h3 className="font-bold text-white text-sm mb-1">{ammo.name}</h3>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-zinc-700 rounded text-xs text-zinc-300">
              {ammo.caliber}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(ammo.category)}`}>
              {getCategoryLabel(ammo.category)}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <Zap className="h-3 w-3 text-red-400" />
            <span className="text-xs text-zinc-400">Базовый урон</span>
          </div>
          <div className="text-lg font-bold text-red-400">{ammo.baseDamage}</div>
        </div>

        <div>
          <div className="flex items-center gap-1 mb-1">
            <Shield className="h-3 w-3 text-yellow-400" />
            <span className="text-xs text-zinc-400">Пробитие</span>
          </div>
          <div className="text-lg font-bold text-yellow-400">{ammo.penetration}%</div>
        </div>

        <div>
          <div className="flex items-center gap-1 mb-1">
            <Target className="h-3 w-3 text-green-400" />
            <span className="text-xs text-zinc-400">Эффективная дальность</span>
          </div>
          <div className="text-lg font-bold text-green-400">{ammo.effectiveRange}м</div>
        </div>

        <div>
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp className="h-3 w-3 text-blue-400" />
            <span className="text-xs text-zinc-400">Урон по броне</span>
          </div>
          <div className="text-lg font-bold text-blue-400">{ammo.armorDamage}</div>
        </div>
      </div>

      {/* Special Properties */}
      <div className="flex gap-1 flex-wrap mb-3">
        {ammo.armorPiercing && (
          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded font-medium">
            AP
          </span>
        )}
        {ammo.explosive && (
          <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded font-medium">
            Взрывные
          </span>
        )}
        {ammo.incendiary && (
          <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded font-medium">
            Зажигательные
          </span>
        )}
        {ammo.uranium && (
          <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded font-medium">
            Урановые
          </span>
        )}
        {ammo.tracer && (
          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded font-medium">
            Трассеры
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-zinc-400 mb-3 line-clamp-2">{ammo.description}</p>

      {/* Recommendations */}
      {showRecommendations && (
        <div className="pt-3 border-t border-zinc-700/50">
          <p className="text-xs text-zinc-400 mb-2 flex items-center gap-1">
            <Star className="h-3 w-3" />
            Лучше всего для:
          </p>
          <div className="flex gap-1 flex-wrap">
            <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">
              PvP
            </span>
            <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
              PvE
            </span>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
              Роботы
            </span>
            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
              Бункеры
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
