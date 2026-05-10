"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TacticalWeapon } from '@/types/tactical';
import { Search, Filter, Zap, Target, TrendingUp } from 'lucide-react';

interface WeaponBrowserProps {
  weapons: TacticalWeapon[];
  selectedWeapon: TacticalWeapon | null;
  onWeaponSelect: (weapon: TacticalWeapon) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function WeaponBrowser({
  weapons,
  selectedWeapon,
  onWeaponSelect,
  selectedCategory,
  onCategoryChange,
  selectedFilter,
  onFilterChange
}: WeaponBrowserProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Все', icon: '🎯' },
    { id: 'ar', name: 'AR', icon: '🔫' },
    { id: 'smg', name: 'SMG', icon: '🔫' },
    { id: 'sniper', name: 'Sniper', icon: '🔭' },
    { id: 'shotgun', name: 'Shotgun', icon: '🎯' },
    { id: 'pistol', name: 'Pistols', icon: '🔫' },
    { id: 'lmg', name: 'LMG', icon: '🔫' }
  ];

  const filters = [
    { id: 'pvp', name: 'PvP', color: '#EF4444' },
    { id: 'pve', name: 'PvE', color: '#10B981' },
    { id: 'robots', name: 'Роботы', color: '#8B5CF6' },
    { id: 'bunker', name: 'Бункер', color: '#F59E0B' }
  ];

  const filteredWeapons = weapons.filter(weapon => {
    const matchesCategory = selectedCategory === 'all' || weapon.type === selectedCategory;
    const matchesSearch = weapon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          weapon.caliber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getBestAmmoForFilter = (weapon: TacticalWeapon, filter: string) => {
    if (filter === 'pvp') {
      return weapon.ammoTypes.reduce((best, ammo) => 
        ammo.effectiveness.pvp > best.effectiveness.pvp ? ammo : best
      );
    } else if (filter === 'pve') {
      return weapon.ammoTypes.reduce((best, ammo) => 
        ammo.effectiveness.pve > best.effectiveness.pve ? ammo : best
      );
    } else if (filter === 'robots') {
      return weapon.ammoTypes.reduce((best, ammo) => 
        ammo.effectiveness.robots > best.effectiveness.robots ? ammo : best
      );
    } else if (filter === 'bunker') {
      return weapon.ammoTypes.reduce((best, ammo) => 
        ammo.effectiveness.bunker > best.effectiveness.bunker ? ammo : best
      );
    }
    return weapon.ammoTypes[0];
  };

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 90) return '#10B981';
    if (effectiveness >= 75) return '#F59E0B';
    if (effectiveness >= 60) return '#EF4444';
    return '#6B7280';
  };

  const getProgressBarColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Поиск оружия..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-black/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                  selectedCategory === category.id
                    ? 'bg-red-500/20 border border-red-500/50 text-red-400 shadow-lg shadow-red-500/20'
                    : 'bg-black/40 border border-white/10 text-zinc-400 hover:bg-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-opacity-20 border border-opacity-50 shadow-lg'
                    : 'bg-black/40 border border-white/10 text-zinc-400 hover:bg-white/5 hover:border-white/20 hover:text-white'
                }`}
                style={{
                  backgroundColor: selectedFilter === filter.id ? `${filter.color}20` : undefined,
                  borderColor: selectedFilter === filter.id ? `${filter.color}50` : undefined,
                  boxShadow: selectedFilter === filter.id ? `0 0 20px ${filter.color}40` : undefined,
                  color: selectedFilter === filter.id ? filter.color : undefined
                }}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Weapon List */}
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {filteredWeapons.map((weapon) => {
            const bestAmmo = getBestAmmoForFilter(weapon, selectedFilter);
            const effectiveness = bestAmmo.effectiveness[selectedFilter as keyof typeof bestAmmo.effectiveness];
            
            return (
              <motion.div
                key={weapon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onClick={() => onWeaponSelect(weapon)}
                className={`cursor-pointer rounded-2xl border transition-all hover:scale-[1.02] ${
                  selectedWeapon?.id === weapon.id
                    ? 'border-red-500/50 bg-red-500/10 shadow-lg shadow-red-500/20'
                    : 'border-white/10 bg-black/40 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Weapon Image */}
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center">
                      <span className="text-2xl">🔫</span>
                    </div>

                    {/* Weapon Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-white">{weapon.name}</h3>
                        <span className="px-2 py-1 bg-black/40 border border-white/10 rounded-lg text-xs text-zinc-400">
                          {weapon.caliber}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3 text-yellow-400" />
                          <span className="text-zinc-400">DPS:</span>
                          <span className="text-white font-medium">{weapon.dps}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3 text-green-400" />
                          <span className="text-zinc-400">TTK:</span>
                          <span className="text-white font-medium">{weapon.ttk}s</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-blue-400" />
                          <span className="text-zinc-400">Дист:</span>
                          <span className="text-white font-medium">{weapon.effectiveRange}m</span>
                        </div>
                      </div>
                    </div>

                    {/* Effectiveness Badge */}
                    <div className="text-right">
                      <div className="text-xs text-zinc-400 mb-1">Эффективность</div>
                      <div 
                        className="text-lg font-bold"
                        style={{ color: getEffectivenessColor(effectiveness) }}
                      >
                        {effectiveness}%
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">
                        {bestAmmo.name}
                      </div>
                    </div>
                  </div>

                  {/* Stats Progress Bars */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-400 w-16">Урон</span>
                      <div className="flex-1 bg-black/60 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className={`h-full ${getProgressBarColor(weapon.stats.damage, 100)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(weapon.stats.damage / 100) * 100}%` }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        />
                      </div>
                      <span className="text-xs text-white w-8 text-right">{weapon.stats.damage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-400 w-16">Скоростр</span>
                      <div className="flex-1 bg-black/60 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className={`h-full ${getProgressBarColor(weapon.stats.fireRate, 1000)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(weapon.stats.fireRate / 1000) * 100}%` }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        />
                      </div>
                      <span className="text-xs text-white w-8 text-right">{weapon.stats.fireRate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-400 w-16">Отдача</span>
                      <div className="flex-1 bg-black/60 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className={`h-full ${getProgressBarColor(100 - weapon.stats.recoil, 100)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${((100 - weapon.stats.recoil) / 100) * 100}%` }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        />
                      </div>
                      <span className="text-xs text-white w-8 text-right">{weapon.stats.recoil}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
