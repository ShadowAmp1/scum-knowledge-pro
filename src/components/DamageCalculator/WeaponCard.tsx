"use client";

import { WeaponStats } from "@/types/ammo";
import { Crosshair, Zap, Target, Gauge } from "lucide-react";

interface WeaponCardProps {
  weapon: WeaponStats;
  isSelected: boolean;
  onClick: () => void;
}

export default function WeaponCard({ weapon, isSelected, onClick }: WeaponCardProps) {
  const getStatBar = (value: number, max: number = 100, color: string = "blue") => {
    const percentage = (value / max) * 100;
    const getColorClass = (col: string) => {
      switch (col) {
        case 'red': return 'bg-red-500';
        case 'green': return 'bg-green-500';
        case 'yellow': return 'bg-yellow-500';
        case 'blue': return 'bg-blue-500';
        case 'purple': return 'bg-purple-500';
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

  const getRecoilColor = (recoil: number) => {
    if (recoil >= 80) return 'red';
    if (recoil >= 60) return 'yellow';
    if (recoil >= 40) return 'blue';
    return 'green';
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'green';
    if (accuracy >= 75) return 'blue';
    if (accuracy >= 60) return 'yellow';
    return 'red';
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border transition-all hover:scale-[1.02] p-4 ${
        isSelected
          ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20'
          : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-500 hover:bg-zinc-800/70'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-white text-lg mb-1">{weapon.name}</h3>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-zinc-700 rounded text-xs text-zinc-300">
              {weapon.caliber}
            </span>
            <div className="flex items-center gap-1 text-zinc-400">
              <Crosshair className="h-3 w-3" />
              <span className="text-xs">{weapon.magazineSize}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <Zap className="h-3 w-3 text-yellow-400" />
            <span className="text-xs text-zinc-400">Скорострельность</span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-white">{weapon.fireRate}</span>
            <span className="text-xs text-zinc-500">выстр/мин</span>
          </div>
          {getStatBar(weapon.fireRate, 1000, 'yellow')}
        </div>

        <div>
          <div className="flex items-center gap-1 mb-1">
            <Target className="h-3 w-3 text-green-400" />
            <span className="text-xs text-zinc-400">Точность</span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-white">{weapon.accuracy}%</span>
          </div>
          {getStatBar(weapon.accuracy, 100, getAccuracyColor(weapon.accuracy))}
        </div>

        <div>
          <div className="flex items-center gap-1 mb-1">
            <Gauge className="h-3 w-3 text-red-400" />
            <span className="text-xs text-zinc-400">Отдача</span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-white">{weapon.recoil}%</span>
          </div>
          {getStatBar(weapon.recoil, 100, getRecoilColor(weapon.recoil))}
        </div>

        <div>
          <div className="flex items-center gap-1 mb-1">
            <Crosshair className="h-3 w-3 text-blue-400" />
            <span className="text-xs text-zinc-400">Перезарядка</span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-white">{weapon.reloadTime}s</span>
          </div>
          {getStatBar(100 - (weapon.reloadTime * 20), 100, 'blue')}
        </div>
      </div>

      {/* Damage Info */}
      <div className="pt-3 border-t border-zinc-700/50">
        <p className="text-xs text-zinc-400 mb-2">Урон по патронам:</p>
        <div className="flex gap-1 flex-wrap">
          {Object.entries(weapon.damagePerShot).slice(0, 3).map(([ammoId, damage]) => (
            <span 
              key={ammoId}
              className="px-2 py-1 bg-zinc-700/50 rounded text-xs text-zinc-300"
            >
              {damage}
            </span>
          ))}
          {Object.keys(weapon.damagePerShot).length > 3 && (
            <span className="px-2 py-1 bg-zinc-700/50 rounded text-xs text-zinc-300">
              +{Object.keys(weapon.damagePerShot).length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Recommended Ammo */}
      <div className="mt-3 pt-3 border-t border-zinc-700/50">
        <p className="text-xs text-zinc-400 mb-2">Рекомендуемые патроны:</p>
        <div className="flex gap-1 flex-wrap">
          <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs font-medium">
            PvP: {weapon.bestPvPAmmo}
          </span>
          <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs font-medium">
            PvE: {weapon.bestPvEAmmo}
          </span>
          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs font-medium">
            Роботы: {weapon.bestRobotAmmo}
          </span>
        </div>
      </div>
    </div>
  );
}
