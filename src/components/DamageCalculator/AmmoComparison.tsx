"use client";

import { useState } from "react";
import { DamageCalculation } from "@/types/ammo";
import { DamageCalculator } from "@/utils/damageCalculator";
import { TrendingUp, Zap, Shield, Target } from "lucide-react";
import { SimpleBarChart, SimpleLineChart } from "./SimpleChart";

interface AmmoComparisonProps {
  weaponName: string;
  targetId: string;
  distance: number;
  isHeadshot: boolean;
  isCritical: boolean;
}

export default function AmmoComparison({ weaponName, targetId, distance, isHeadshot, isCritical }: AmmoComparisonProps) {
  const [sortBy, setSortBy] = useState<string>("damage");

  const comparisons = DamageCalculator.compareAmmo(weaponName, targetId, distance).map(comp => ({
    ...comp,
    calculation: DamageCalculator.calculateDamage(
      weaponName,
      comp.ammoId,
      targetId,
      distance,
      isHeadshot,
      isCritical
    )
  }));

  const sortedComparisons = [...comparisons].sort((a, b) => {
    switch (sortBy) {
      case "damage":
        return b.calculation.finalDamage - a.calculation.finalDamage;
      case "dps":
        return b.calculation.dps - a.calculation.dps;
      case "ttk":
        return a.calculation.ttk - b.calculation.ttk;
      case "penetration":
        return b.calculation.penetrationChance - a.calculation.penetrationChance;
      default:
        return 0;
    }
  });

  const chartData = sortedComparisons.map(comp => ({
    name: comp.calculation.ammoType.name,
    damage: Math.round(comp.calculation.finalDamage),
    dps: Math.round(comp.calculation.dps),
    penetration: Math.round(comp.calculation.penetrationChance),
    ttk: Math.round(comp.calculation.ttk * 10) / 10
  }));

  const getBarColor = (effectiveness: string) => {
    switch (effectiveness) {
      case 'optimal': return '#10b981';
      case 'excellent': return '#3b82f6';
      case 'good': return '#eab308';
      case 'fair': return '#f97316';
      case 'poor': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getEffectivenessBadge = (effectiveness: string) => {
    const colors = {
      optimal: 'bg-green-500/20 border-green-500 text-green-400',
      excellent: 'bg-blue-500/20 border-blue-500 text-blue-400',
      good: 'bg-yellow-500/20 border-yellow-500 text-yellow-400',
      fair: 'bg-orange-500/20 border-orange-500 text-orange-400',
      poor: 'bg-red-500/20 border-red-500 text-red-400'
    };

    const labels = {
      optimal: 'Оптимально',
      excellent: 'Отлично',
      good: 'Хорошо',
      fair: 'Удовл.',
      poor: 'Плохо'
    };

    return (
      <span className={`px-2 py-1 rounded border text-xs font-medium ${colors[effectiveness as keyof typeof colors]}`}>
        {labels[effectiveness as keyof typeof labels]}
      </span>
    );
  };

  const bestAmmo = DamageCalculator.getBestAmmoForTarget(weaponName, targetId, distance, sortBy as any);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Сравнение патронов</h3>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-zinc-500"
          >
            <option value="damage">По урону</option>
            <option value="dps">По DPS</option>
            <option value="ttk">По TTK</option>
            <option value="penetration">По пробитию</option>
          </select>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Damage Chart */}
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-red-400" />
            Урон и DPS
          </h4>
          <div className="space-y-4">
            <SimpleBarChart 
              data={sortedComparisons.map(comp => ({
                name: comp.calculation.ammoType.name.substring(0, 8),
                value: Math.round(comp.calculation.finalDamage),
                color: "#ef4444"
              }))} 
              height={120}
            />
            <SimpleBarChart 
              data={sortedComparisons.map(comp => ({
                name: comp.calculation.ammoType.name.substring(0, 8),
                value: Math.round(comp.calculation.dps),
                color: "#f97316"
              }))} 
              height={120}
            />
          </div>
        </div>

        {/* Penetration Chart */}
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-400" />
            Пробитие и TTK
          </h4>
          <div className="space-y-4">
            <SimpleLineChart 
              data={sortedComparisons.map(comp => ({
                name: comp.calculation.ammoType.name.substring(0, 8),
                value: Math.round(comp.calculation.penetrationChance),
                color: "#3b82f6"
              }))} 
              height={120}
            />
            <SimpleLineChart 
              data={sortedComparisons.map(comp => ({
                name: comp.calculation.ammoType.name.substring(0, 8),
                value: Math.round(comp.calculation.ttk * 10) / 10,
                color: "#10b981"
              }))} 
              height={120}
            />
          </div>
        </div>
      </div>

      {/* Best Ammo Recommendation */}
      {bestAmmo && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <h4 className="font-semibold text-green-400">Лучший выбор по {sortBy === 'damage' ? 'урону' : sortBy === 'dps' ? 'DPS' : sortBy === 'ttk' ? 'TTK' : 'пробитию'}</h4>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{bestAmmo.calculation.ammoType.icon}</span>
              <div>
                <p className="font-bold text-white">{bestAmmo.calculation.ammoType.name}</p>
                <p className="text-sm text-zinc-400">{bestAmmo.calculation.ammoType.caliber}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-400">
                {Math.round(bestAmmo.calculation.finalDamage)}
              </p>
              <p className="text-xs text-zinc-400">урон</p>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Table */}
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-900/50 border-b border-zinc-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Патрон
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Урон
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  DPS
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Пробитие
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  TTK
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Эффектив.
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              {sortedComparisons.map((comp, index) => (
                <tr 
                  key={comp.ammoId}
                  className={`hover:bg-zinc-700/30 transition ${
                    bestAmmo?.ammoId === comp.ammoId ? 'bg-green-500/10' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{comp.calculation.ammoType.icon}</span>
                      <div>
                        <p className="font-medium text-white text-sm">{comp.calculation.ammoType.name}</p>
                        <p className="text-xs text-zinc-400">{comp.calculation.ammoType.caliber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="h-4 w-4 text-red-400" />
                      <span className="font-bold text-red-400">
                        {Math.round(comp.calculation.finalDamage)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <TrendingUp className="h-4 w-4 text-orange-400" />
                      <span className="font-bold text-orange-400">
                        {Math.round(comp.calculation.dps)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Shield className="h-4 w-4 text-blue-400" />
                      <span className="font-bold text-blue-400">
                        {Math.round(comp.calculation.penetrationChance)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-bold text-green-400">
                      {Math.round(comp.calculation.ttk * 10) / 10}s
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {getEffectivenessBadge(comp.calculation.effectiveness)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
