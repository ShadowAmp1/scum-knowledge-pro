"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TacticalWeapon } from '@/types/tactical';
import { Search, Zap, Target, TrendingUp } from 'lucide-react';

interface WeaponColumnProps {
  weapons: TacticalWeapon[];
  selectedWeapon: TacticalWeapon | null;
  onWeaponSelect: (weapon: TacticalWeapon) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function WeaponColumn({
  weapons,
  selectedWeapon,
  onWeaponSelect,
  selectedCategory,
  onCategoryChange,
  selectedFilter,
  onFilterChange
}: WeaponColumnProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Все' },
    { id: 'ar', name: 'AR' },
    { id: 'smg', name: 'SMG' },
    { id: 'sniper', name: 'Sniper' },
    { id: 'shotgun', name: 'Shotgun' },
    { id: 'pistol', name: 'Pistols' },
    { id: 'lmg', name: 'LMG' }
  ];

  const filters = [
    { id: 'pvp', name: 'PvP' },
    { id: 'pve', name: 'PvE' },
    { id: 'robots', name: 'Роботы' },
    { id: 'bunker', name: 'Бункер' }
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
    if (effectiveness >= 90) return 'text-green-400';
    if (effectiveness >= 75) return 'text-yellow-400';
    if (effectiveness >= 60) return 'text-orange-400';
    return 'text-zinc-400';
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
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
              backgroundColor: selectedFilter === filter.id ? `${filter.id === 'pvp' ? '#EF4444' : filter.id === 'pve' ? '#10B981' : filter.id === 'robots' ? '#8B5CF6' : '#F59E0B'}20` : undefined,
              borderColor: selectedFilter === filter.id ? `${filter.id === 'pvp' ? '#EF4444' : filter.id === 'pve' ? '#10B981' : filter.id === 'robots' ? '#8B5CF6' : '#F59E0B'}50` : undefined,
              boxShadow: selectedFilter === filter.id ? `0 0 20px ${filter.id === 'pvp' ? '#EF4444' : filter.id === 'pve' ? '#10B981' : filter.id === 'robots' ? '#8B5CF6' : '#F59E0B'}40` : undefined,
              color: selectedFilter === filter.id ? (filter.id === 'pvp' ? '#EF4444' : filter.id === 'pve' ? '#10B981' : filter.id === 'robots' ? '#8B5CF6' : '#F59E0B') : undefined
            }}
          >
            {filter.name}
          </button>
        ))}
      </div>

      {/* Weapon Cards */}
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {filteredWeapons.map((weapon, index) => {
          const bestAmmo = getBestAmmoForFilter(weapon, selectedFilter);
          const effectiveness = bestAmmo.effectiveness[selectedFilter as keyof typeof bestAmmo.effectiveness];
          const isSelected = selectedWeapon?.id === weapon.id;
          
          return (
            <motion.div
              key={weapon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => onWeaponSelect(weapon)}
              className={`cursor-pointer rounded-2xl border transition-all hover:scale-[1.02] p-4 ${
                isSelected
                  ? 'border-red-500/50 bg-red-500/10 shadow-lg shadow-red-500/20'
                  : 'border-white/10 bg-black/40 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Weapon Image */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center overflow-hidden">
                  <Image
                    src={weapon.image}
                    alt={weapon.name}
                    width={64}
                    height={64}
                    className="object-contain hover:scale-105 transition-transform duration-300"
                  />
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
                  <div className={`text-2xl font-bold ${getEffectivenessColor(effectiveness)}`}>
                    {effectiveness}%
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {bestAmmo.name}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Large Weapon Preview Card */}
      {selectedWeapon && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-6 mb-6">
            {/* Large Weapon Image */}
            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center overflow-hidden">
              <Image
                src={selectedWeapon.image}
                alt={selectedWeapon.name}
                width={96}
                height={96}
                className="object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Weapon Details */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">{selectedWeapon.name}</h3>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-black/40 border border-white/10 rounded-lg text-sm text-zinc-400">
                  {selectedWeapon.type.toUpperCase()}
                </span>
                <span className="px-3 py-1 bg-black/40 border border-white/10 rounded-lg text-sm text-zinc-400">
                  {selectedWeapon.caliber}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-zinc-400">DPS</div>
                  <div className="text-white font-bold">{selectedWeapon.dps}</div>
                </div>
                <div>
                  <div className="text-zinc-400">TTK</div>
                  <div className="text-white font-bold">{selectedWeapon.ttk}s</div>
                </div>
                <div>
                  <div className="text-zinc-400">Дистанция</div>
                  <div className="text-white font-bold">{selectedWeapon.effectiveRange}m</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-400 w-20">Урон</span>
              <div className="flex-1 bg-black/60 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(selectedWeapon.stats.damage / 100) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
              </div>
              <span className="text-sm text-white w-12 text-right">{selectedWeapon.stats.damage}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-400 w-20">Скоростр</span>
              <div className="flex-1 bg-black/60 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(selectedWeapon.stats.fireRate / 1000) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>
              <span className="text-sm text-white w-12 text-right">{selectedWeapon.stats.fireRate}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-400 w-20">Точность</span>
              <div className="flex-1 bg-black/60 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(selectedWeapon.stats.accuracy / 100) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </div>
              <span className="text-sm text-white w-12 text-right">{selectedWeapon.stats.accuracy}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-400 w-20">Отдача</span>
              <div className="flex-1 bg-black/60 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((100 - selectedWeapon.stats.recoil) / 100) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
              </div>
              <span className="text-sm text-white w-12 text-right">{selectedWeapon.stats.recoil}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-400 w-20">Перезарядка</span>
              <div className="flex-1 bg-black/60 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((10 - selectedWeapon.stats.reloadTime) / 10) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </div>
              <span className="text-sm text-white w-12 text-right">{selectedWeapon.stats.reloadTime}s</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
