"use client";

import { useState } from "react";
import { WeaponStats } from "@/types/ammo";
import { weaponStats } from "@/data/ammo";
import { Search, Crosshair, Zap } from "lucide-react";

interface WeaponSelectorProps {
  selectedWeapon: WeaponStats | null;
  onWeaponSelect: (weapon: WeaponStats) => void;
}

export default function WeaponSelector({ selectedWeapon, onWeaponSelect }: WeaponSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("name");

  const filteredWeapons = weaponStats
    .filter(weapon => 
      weapon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      weapon.caliber.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "damage":
          return Math.max(...Object.values(a.damagePerShot)) - Math.max(...Object.values(b.damagePerShot));
        case "fireRate":
          return b.fireRate - a.fireRate;
        case "accuracy":
          return b.accuracy - a.accuracy;
        case "recoil":
          return a.recoil - b.recoil;
        default:
          return 0;
      }
    });

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
    <div className="space-y-4">
      {/* Search and Sort */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Поиск оружия..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-zinc-500"
          >
            <option value="name">По имени</option>
            <option value="damage">По урону</option>
            <option value="fireRate">По скорострельности</option>
            <option value="accuracy">По точности</option>
            <option value="recoil">По отдаче</option>
          </select>
        </div>
      </div>

      {/* Weapon Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {filteredWeapons.map(weapon => (
          <div
            key={weapon.name}
            onClick={() => onWeaponSelect(weapon)}
            className={`cursor-pointer p-4 rounded-xl border transition-all hover:scale-[1.02] ${
              selectedWeapon?.name === weapon.name
                ? 'border-red-500 bg-red-500/10 shadow-lg shadow-red-500/20'
                : 'border-zinc-700 bg-zinc-800/30 hover:border-zinc-500'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-white text-lg">{weapon.name}</h4>
                <p className="text-sm text-zinc-400">{weapon.caliber}</p>
              </div>
              <div className="flex items-center gap-2">
                <Crosshair className="h-4 w-4 text-zinc-500" />
                <span className="text-xs text-zinc-400">{weapon.magazineSize}</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-400">Скорострельность:</span>
                  <span className="text-white font-medium">{weapon.fireRate}</span>
                </div>
                {getStatBar(weapon.fireRate, 1000, 'yellow')}
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-400">Точность:</span>
                  <span className="text-white font-medium">{weapon.accuracy}%</span>
                </div>
                {getStatBar(weapon.accuracy, 100, getAccuracyColor(weapon.accuracy))}
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-400">Отдача:</span>
                  <span className="text-white font-medium">{weapon.recoil}%</span>
                </div>
                {getStatBar(weapon.recoil, 100, getRecoilColor(weapon.recoil))}
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-400">Перезарядка:</span>
                  <span className="text-white font-medium">{weapon.reloadTime}s</span>
                </div>
                {getStatBar(100 - (weapon.reloadTime * 20), 100, 'purple')}
              </div>
            </div>

            {/* Damage Info */}
            <div className="mb-3">
              <p className="text-xs text-zinc-400 mb-2">Урон по патронам:</p>
              <div className="flex gap-2 flex-wrap">
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
            <div className="pt-3 border-t border-zinc-700/50">
              <p className="text-xs text-zinc-400 mb-2">Рекомендуемые патроны:</p>
              <div className="flex gap-1 flex-wrap">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-300 text-xs rounded">
                  PvP: {weapon.bestPvPAmmo}
                </span>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded">
                  PvE: {weapon.bestPvEAmmo}
                </span>
                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded">
                  Роботы: {weapon.bestRobotAmmo}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredWeapons.length === 0 && (
        <div className="text-center py-8 text-zinc-500">
          <Crosshair className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Оружие не найдено</p>
        </div>
      )}
    </div>
  );
}
