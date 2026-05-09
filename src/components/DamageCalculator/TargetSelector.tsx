"use client";

import { useState } from "react";
import { TargetType } from "@/types/ammo";
import { targetTypes } from "@/data/ammo";
import { Shield, Users, Bot, Car, Skull } from "lucide-react";

interface TargetSelectorProps {
  selectedTarget: TargetType | null;
  onTargetSelect: (target: TargetType) => void;
}

export default function TargetSelector({ selectedTarget, onTargetSelect }: TargetSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "Все цели", icon: Users },
    { id: "civilian", name: "Гражданские", icon: Users },
    { id: "light_armor", name: "Легкая броня", icon: Shield },
    { id: "medium_armor", name: "Средняя броня", icon: Shield },
    { id: "heavy_armor", name: "Тяжелая броня", icon: Shield },
    { id: "robot", name: "Роботы", icon: Bot },
    { id: "puppet", name: "Puppet", icon: Skull },
    { id: "vehicle", name: "Техника", icon: Car },
    { id: "boss", name: "Боссы", icon: Skull }
  ];

  const filteredTargets = targetTypes.filter(target => 
    selectedCategory === "all" || target.category === selectedCategory
  );

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

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 border rounded-lg text-sm transition flex items-center gap-1 ${
                selectedCategory === cat.id
                  ? 'bg-red-500/20 border-red-500 text-red-400'
                  : 'bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:border-zinc-500'
              }`}
            >
              <Icon className="h-3 w-3" />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Target Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredTargets.map(target => (
          <div
            key={target.id}
            onClick={() => onTargetSelect(target)}
            className={`cursor-pointer p-4 rounded-xl border transition-all hover:scale-105 relative overflow-hidden ${
              selectedTarget?.id === target.id
                ? 'border-red-500 shadow-lg shadow-red-500/20'
                : 'border-zinc-700 hover:border-zinc-500'
            }`}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(target.category)} opacity-50`} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{target.icon}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-white">{target.name}</h4>
                  <p className="text-xs text-zinc-400">{target.description}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">Броня:</span>
                    <span className="text-white font-medium">{target.armorRating}</span>
                  </div>
                  {getStatBar(target.armorRating)}
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">Снижение урона:</span>
                    <span className="text-white font-medium">{target.damageReduction}%</span>
                  </div>
                  {getStatBar(target.damageReduction)}
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">Защита от пробития:</span>
                    <span className="text-white font-medium">{target.penetrationResistance}%</span>
                  </div>
                  {getStatBar(target.penetrationResistance)}
                </div>
              </div>

              {/* Vulnerabilities */}
              <div className="mt-3 pt-3 border-t border-zinc-600/50">
                <p className="text-xs text-zinc-400 mb-2">Уязвимости:</p>
                <div className="flex gap-1 flex-wrap">
                  {target.headshotVulnerability > 1.5 && (
                    <span className="px-1.5 py-0.5 bg-red-500/20 text-red-300 text-xs rounded">
                      Голова x{target.headshotVulnerability}
                    </span>
                  )}
                  {target.explosiveVulnerability > 1.2 && (
                    <span className="px-1.5 py-0.5 bg-orange-500/20 text-orange-300 text-xs rounded">
                      Взрыв x{target.explosiveVulnerability}
                    </span>
                  )}
                  {target.fireVulnerability > 1.2 && (
                    <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-300 text-xs rounded">
                      Огонь x{target.fireVulnerability}
                    </span>
                  )}
                  {target.uraniumVulnerability > 1.5 && (
                    <span className="px-1.5 py-0.5 bg-green-500/20 text-green-300 text-xs rounded">
                      Уран x{target.uraniumVulnerability}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTargets.length === 0 && (
        <div className="text-center py-8 text-zinc-500">
          <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Цели не найдены</p>
        </div>
      )}
    </div>
  );
}
