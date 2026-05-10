"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TacticalAmmo } from '@/types/tactical';
import { Zap, Shield, Target } from 'lucide-react';

interface AmmoColumnProps {
  ammoTypes: TacticalAmmo[];
  selectedAmmo: TacticalAmmo | null;
  onAmmoSelect: (ammo: TacticalAmmo) => void;
  selectedFilter: string;
}

export default function AmmoColumn({ 
  ammoTypes, 
  selectedAmmo, 
  onAmmoSelect, 
  selectedFilter 
}: AmmoColumnProps) {
  const getAmmoIcon = (type: TacticalAmmo['type']) => {
    switch (type) {
      case 'ap': return '🛡️';
      case 'hp': return '💥';
      case 'slug': return '🎯';
      case 'tracer': return '✨';
      case 'fmj': return '🔫';
      default: return '🔫';
    }
  };

  const getAmmoTypeName = (type: TacticalAmmo['type']) => {
    switch (type) {
      case 'ap': return 'Бронебойные';
      case 'hp': return 'Расширяющиеся';
      case 'slug': return 'Тяжелые';
      case 'tracer': return 'Трассеры';
      case 'fmj': return 'Стандартные';
      default: return 'Стандартные';
    }
  };

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 90) return 'text-green-400';
    if (effectiveness >= 75) return 'text-yellow-400';
    if (effectiveness >= 60) return 'text-orange-400';
    return 'text-zinc-400';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">Патроны</h3>
      
      <div className="space-y-3">
        {ammoTypes.map((ammo, index) => {
          const effectiveness = ammo.effectiveness[selectedFilter as keyof typeof ammo.effectiveness];
          const isSelected = selectedAmmo?.id === ammo.id;
          
          return (
            <motion.div
              key={ammo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => onAmmoSelect(ammo)}
              className={`cursor-pointer rounded-xl border transition-all hover:scale-[1.02] p-4 ${
                isSelected
                  ? 'border-red-500/50 shadow-lg'
                  : 'border-white/10 bg-black/40 hover:border-white/20'
              }`}
              style={{
                backgroundColor: isSelected ? `${ammo.color}10` : undefined,
                borderColor: isSelected ? `${ammo.color}50` : undefined,
                boxShadow: isSelected ? `0 0 30px ${ammo.color}40` : undefined
              }}
            >
              <div className="flex items-center gap-4">
                {/* Ammo Icon */}
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: `${ammo.color}20` }}
                >
                  <Image
                    src={ammo.image}
                    alt={ammo.name}
                    width={48}
                    height={48}
                    className="object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Ammo Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-white">{ammo.name}</h4>
                    <span 
                      className="px-2 py-1 rounded-lg text-xs font-medium"
                      style={{ 
                        backgroundColor: `${ammo.color}20`,
                        color: ammo.color 
                      }}
                    >
                      {getAmmoTypeName(ammo.type)}
                    </span>
                  </div>
                  
                  <p className="text-xs text-zinc-400 mb-3">{ammo.description}</p>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-zinc-500">Урон</div>
                      <div className="text-white font-bold">{ammo.damage}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-zinc-500">Пробитие</div>
                      <div className="text-white font-bold">{ammo.penetration}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-zinc-500">Брона</div>
                      <div className="text-white font-bold">{ammo.armorDamage}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-zinc-500">Скорость</div>
                      <div className="text-white font-bold">{ammo.velocity}</div>
                    </div>
                  </div>
                </div>

                {/* Effectiveness */}
                <div className="text-right">
                  <div className="text-xs text-zinc-400 mb-1">Эффективность</div>
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: getEffectivenessColor(effectiveness) }}
                  >
                    {effectiveness}%
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {selectedFilter === 'pvp' && 'PvP'}
                    {selectedFilter === 'pve' && 'PvE'}
                    {selectedFilter === 'robots' && 'Роботы'}
                    {selectedFilter === 'bunker' && 'Бункер'}
                  </div>
                </div>
              </div>

              {/* Effectiveness Bars */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 w-16">
                    <Target className="h-3 w-3 text-red-400" />
                    <span className="text-xs text-zinc-400">PvP</span>
                  </div>
                  <div className="flex-1 bg-black/60 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      className="h-full bg-red-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${ammo.effectiveness.pvp}%` }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    />
                  </div>
                  <span className="text-xs text-zinc-400 w-8 text-right">{ammo.effectiveness.pvp}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 w-16">
                    <Shield className="h-3 w-3 text-green-400" />
                    <span className="text-xs text-zinc-400">PvE</span>
                  </div>
                  <div className="flex-1 bg-black/60 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      className="h-full bg-green-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${ammo.effectiveness.pve}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  </div>
                  <span className="text-xs text-zinc-400 w-8 text-right">{ammo.effectiveness.pve}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 w-16">
                    <Zap className="h-3 w-3 text-purple-400" />
                    <span className="text-xs text-zinc-400">Роботы</span>
                  </div>
                  <div className="flex-1 bg-black/60 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      className="h-full bg-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${ammo.effectiveness.robots}%` }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </div>
                  <span className="text-xs text-zinc-400 w-8 text-right">{ammo.effectiveness.robots}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 w-16">
                    <Target className="h-3 w-3 text-yellow-400" />
                    <span className="text-xs text-zinc-400">Бункер</span>
                  </div>
                  <div className="flex-1 bg-black/60 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      className="h-full bg-yellow-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${ammo.effectiveness.bunker}%` }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    />
                  </div>
                  <span className="text-xs text-zinc-400 w-8 text-right">{ammo.effectiveness.bunker}%</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
