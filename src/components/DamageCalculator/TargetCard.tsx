"use client";

import { TargetType } from "@/types/ammo";
import { Shield, Target, AlertTriangle, Zap } from "lucide-react";

interface TargetCardProps {
  target: TargetType;
  isSelected: boolean;
  onClick: () => void;
}

export default function TargetCard({ target, isSelected, onClick }: TargetCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'civilian': return 'from-blue-500/20 to-blue-600/20 border-blue-500';
      case 'light_armor': return 'from-green-500/20 to-green-600/20 border-green-500';
      case 'medium_armor': return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500';
      case 'heavy_armor': return 'from-orange-500/20 to-orange-600/20 border-orange-500';
      case 'robot': return 'from-gray-500/20 to-gray-600/20 border-gray-500';
      case 'puppet': return 'from-purple-500/20 to-purple-600/20 border-purple-500';
      case 'vehicle': return 'from-red-500/20 to-red-600/20 border-red-500';
      case 'boss': return 'from-red-600/20 to-red-700/20 border-red-600';
      default: return 'from-zinc-500/20 to-zinc-600/20 border-zinc-500';
    }
  };

  const getStatBar = (value: number, max: number = 100) => {
    const percentage = (value / max) * 100;
    const getColor = (val: number) => {
      if (val >= 70) return 'bg-red-500';
      if (val >= 50) return 'bg-yellow-500';
      if (val >= 30) return 'bg-green-500';
      return 'bg-blue-500';
    };

    return (
      <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${getColor(value)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  const getWeaknessColor = (value: number) => {
    if (value >= 2.0) return 'text-red-400';
    if (value >= 1.5) return 'text-orange-400';
    if (value >= 1.2) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getRecommendedAmmo = (target: TargetType) => {
    if (target.armorRating >= 70) return "Урановые/AP";
    if (target.armorRating >= 45) return "AP/Тяжелые";
    if (target.category === 'robot') return "Урановые/Взрывные";
    if (target.category === 'vehicle') return "Тяжелые/Взрывные";
    if (target.category === 'puppet') return "Высокий урон";
    return "Стандартные";
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border transition-all hover:scale-[1.02] p-4 relative overflow-hidden ${
        isSelected
          ? 'border-amber-500 shadow-lg shadow-amber-500/20'
          : 'border-zinc-700 hover:border-zinc-500'
      }`}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(target.category)} opacity-50`} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{target.icon}</span>
          <div className="flex-1">
            <h3 className="font-bold text-white text-lg mb-1">{target.name}</h3>
            <p className="text-sm text-zinc-400">{target.description}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Броня
              </span>
              <span className="text-sm font-medium text-white">{target.armorRating}</span>
            </div>
            {getStatBar(target.armorRating)}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-zinc-400">Снижение урона</span>
              <span className="text-sm font-medium text-white">{target.damageReduction}%</span>
            </div>
            {getStatBar(target.damageReduction)}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-zinc-400">Защита от пробития</span>
              <span className="text-sm font-medium text-white">{target.penetrationResistance}%</span>
            </div>
            {getStatBar(target.penetrationResistance)}
          </div>
        </div>

        {/* Weaknesses */}
        <div className="mb-4">
          <p className="text-xs text-zinc-400 mb-2 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Уязвимости
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {target.headshotVulnerability > 1.0 && (
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Голова</span>
                <span className={`font-medium ${getWeaknessColor(target.headshotVulnerability)}`}>
                  x{target.headshotVulnerability}
                </span>
              </div>
            )}
            {target.explosiveVulnerability > 1.0 && (
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Взрыв</span>
                <span className={`font-medium ${getWeaknessColor(target.explosiveVulnerability)}`}>
                  x{target.explosiveVulnerability}
                </span>
              </div>
            )}
            {target.fireVulnerability > 1.0 && (
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Огонь</span>
                <span className={`font-medium ${getWeaknessColor(target.fireVulnerability)}`}>
                  x{target.fireVulnerability}
                </span>
              </div>
            )}
            {target.uraniumVulnerability > 1.0 && (
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Уран</span>
                <span className={`font-medium ${getWeaknessColor(target.uraniumVulnerability)}`}>
                  x{target.uraniumVulnerability}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="pt-3 border-t border-zinc-600/50">
          <p className="text-xs text-zinc-400 mb-2 flex items-center gap-1">
            <Zap className="h-3 w-3" />
            Рекомендуемые патроны
          </p>
          <div className="flex gap-1 flex-wrap">
            <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded text-xs font-medium">
              {getRecommendedAmmo(target)}
            </span>
            {target.armorRating >= 70 && (
              <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">
                Требуется высокое пробитие
              </span>
            )}
            {target.category === 'robot' && (
              <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                Урановые эффективны
              </span>
            )}
            {target.category === 'vehicle' && (
              <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs">
                Взрывные патроны
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
