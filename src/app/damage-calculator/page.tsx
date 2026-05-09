"use client";

import { useState } from "react";
import { WeaponStats, AmmoType, TargetType } from "@/types/ammo";
import { weaponStats } from "@/data/ammo";
import { DamageCalculator } from "@/utils/damageCalculator";
import { Calculator, RotateCcw, Zap, Target, BarChart3 } from "lucide-react";

// Components
import WeaponCard from "@/components/DamageCalculator/WeaponCard";
import AmmoCard from "@/components/DamageCalculator/AmmoCard";
import TargetCard from "@/components/DamageCalculator/TargetCard";
import DistanceSelectorPanel from "@/components/DamageCalculator/DistanceSelectorPanel";
import DamageResultPanel from "@/components/DamageCalculator/DamageResultPanel";
import RecommendationPanel from "@/components/DamageCalculator/RecommendationPanel";

export default function DamageCalculatorPage() {
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponStats | null>(null);
  const [selectedAmmo, setSelectedAmmo] = useState<AmmoType | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<TargetType | null>(null);
  const [distance, setDistance] = useState(100);
  const [isHeadshot, setIsHeadshot] = useState(false);
  const [isCritical, setIsCritical] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("name");

  // Calculate damage when all parameters are selected
  const calculation = selectedWeapon && selectedAmmo && selectedTarget
    ? DamageCalculator.calculateDamage(
        selectedWeapon.name,
        selectedAmmo.id,
        selectedTarget.id,
        distance,
        isHeadshot,
        isCritical
      )
    : null;

  // Filter and sort weapons
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

  // Auto-select ammo when weapon is selected
  const handleWeaponSelect = (weapon: WeaponStats) => {
    setSelectedWeapon(weapon);
    setSelectedAmmo(null); // Reset ammo to force re-selection
  };

  const handleAmmoSelect = (ammo: AmmoType) => {
    setSelectedAmmo(ammo);
  };

  const handleTargetSelect = (target: TargetType) => {
    setSelectedTarget(target);
  };

  const handleReset = () => {
    setSelectedWeapon(null);
    setSelectedAmmo(null);
    setSelectedTarget(null);
    setDistance(100);
    setIsHeadshot(false);
    setIsCritical(false);
    setSearchTerm("");
    setSortBy("name");
  };

  const handleBestAmmo = () => {
    if (!selectedWeapon || !selectedTarget) return;
    
    const bestAmmo = DamageCalculator.getBestAmmoForTarget(
      selectedWeapon.name,
      selectedTarget.id,
      distance,
      'damage'
    );
    
    if (bestAmmo) {
      setSelectedAmmo(bestAmmo.calculation.ammoType);
    }
  };

  const handlePreset = (type: 'pvp' | 'pve' | 'robots' | 'bunker') => {
    switch (type) {
      case 'pvp':
        setSelectedTarget({
          id: 'medium_armor',
          name: 'Средняя броня',
          category: 'medium_armor' as const,
          armorRating: 45,
          damageReduction: 30,
          penetrationResistance: 50,
          headshotVulnerability: 1.5,
          explosiveVulnerability: 1.2,
          fireVulnerability: 1.0,
          uraniumVulnerability: 1.5,
          icon: '🎖️',
          color: '#F0E68C',
          description: 'Medium armor for standard combat situations'
        });
        setDistance(100);
        break;
      case 'pve':
        setSelectedTarget({
          id: 'puppet',
          name: 'Puppet',
          category: 'puppet' as const,
          armorRating: 30,
          damageReduction: 20,
          penetrationResistance: 35,
          headshotVulnerability: 2.5,
          explosiveVulnerability: 1.4,
          fireVulnerability: 1.3,
          uraniumVulnerability: 1.3,
          icon: '🎭',
          color: '#DDA0DD',
          description: 'Puppet enemies with weak headshot points'
        });
        setDistance(50);
        break;
      case 'robots':
        setSelectedTarget({
          id: 'robot',
          name: 'Робот',
          category: 'robot' as const,
          armorRating: 60,
          damageReduction: 40,
          penetrationResistance: 80,
          headshotVulnerability: 1.0,
          explosiveVulnerability: 1.8,
          fireVulnerability: 0.5,
          uraniumVulnerability: 2.5,
          icon: '🤖',
          color: '#C0C0C0',
          description: 'Mechanical robots with high armor resistance'
        });
        setDistance(200);
        break;
      case 'bunker':
        setSelectedTarget({
          id: 'heavy_armor',
          name: 'Тяжелая броня',
          category: 'heavy_armor' as const,
          armorRating: 70,
          damageReduction: 50,
          penetrationResistance: 75,
          headshotVulnerability: 1.2,
          explosiveVulnerability: 1.0,
          fireVulnerability: 0.8,
          uraniumVulnerability: 2.0,
          icon: '🏰',
          color: '#B8860B',
          description: 'Heavy armor providing maximum protection'
        });
        setDistance(25);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-900/20 via-zinc-900 to-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-12">
          <div className="text-center">
            <h1 className="mb-4 text-5xl font-black text-white">
              <Calculator className="mr-4 inline-block h-12 w-12 text-red-500" />
              Калькулятор Урона SCUM
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Профессиональный инструмент для расчета урона с учетом всех типов патронов, целей и дистанций
            </p>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-zinc-900/50 border-b border-zinc-800 sticky top-0 z-40 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search */}
            <div className="flex-1 min-w-64">
              <input
                type="text"
                placeholder="Поиск оружия..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
            >
              <option value="name">По имени</option>
              <option value="damage">По урону</option>
              <option value="fireRate">По скорострельности</option>
              <option value="accuracy">По точности</option>
              <option value="recoil">По отдаче</option>
            </select>

            {/* Presets */}
            <div className="flex gap-2">
              <button
                onClick={() => handlePreset('pvp')}
                className="px-3 py-2 bg-red-500/20 border border-red-500 text-red-400 rounded-lg hover:bg-red-500/30 transition text-sm"
              >
                PvP
              </button>
              <button
                onClick={() => handlePreset('pve')}
                className="px-3 py-2 bg-green-500/20 border border-green-500 text-green-400 rounded-lg hover:bg-green-500/30 transition text-sm"
              >
                PvE
              </button>
              <button
                onClick={() => handlePreset('robots')}
                className="px-3 py-2 bg-purple-500/20 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/30 transition text-sm"
              >
                Роботы
              </button>
              <button
                onClick={() => handlePreset('bunker')}
                className="px-3 py-2 bg-blue-500/20 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/30 transition text-sm"
              >
                Бункер
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleBestAmmo}
                disabled={!selectedWeapon || !selectedTarget}
                className="px-3 py-2 bg-amber-500/20 border border-amber-500 text-amber-400 rounded-lg hover:bg-amber-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                Лучший патрон
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-2 bg-zinc-800/50 border border-zinc-700 text-zinc-400 rounded-lg hover:bg-zinc-800/70 transition text-sm flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Сброс
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Weapon Selection */}
          <div className="space-y-6">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h2 className="mb-4 text-xl font-bold text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-red-500" />
                Оружие
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredWeapons.map(weapon => (
                  <WeaponCard
                    key={weapon.name}
                    weapon={weapon}
                    isSelected={selectedWeapon?.name === weapon.name}
                    onClick={() => handleWeaponSelect(weapon)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Ammo and Distance */}
          <div className="space-y-6">
            {/* Ammo Selection */}
            {selectedWeapon && (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <h2 className="mb-4 text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Патроны ({selectedWeapon.caliber})
                </h2>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {(() => {
                    const weaponAmmoIds = Object.keys(selectedWeapon.damagePerShot);
                    const availableAmmo = weaponAmmoIds.map(ammoId => 
                      selectedWeapon.damagePerShot[ammoId] ? {
                        id: ammoId,
                        name: ammoId.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                        caliber: selectedWeapon.caliber,
                        category: 'rifle' as const,
                        rarity: 'common' as const,
                        baseDamage: selectedWeapon.damagePerShot[ammoId],
                        penetration: 30,
                        armorDamage: 10,
                        effectiveRange: 300,
                        velocity: 800,
                        headshotMultiplier: 2.0,
                        limbMultiplier: 0.8,
                        torsoMultiplier: 1.0,
                        damageFalloffStart: 100,
                        damageFalloffEnd: 500,
                        minDamagePercent: 0.4,
                        color: '#90EE90',
                        icon: '🟢',
                        description: `${selectedWeapon.caliber} ammunition`
                      } : null
                    ).filter(Boolean);
                    
                    return availableAmmo.map((ammo, index) => (
                      <AmmoCard
                        key={index}
                        ammo={ammo}
                        isSelected={selectedAmmo?.id === ammo.id}
                        onClick={() => handleAmmoSelect(ammo)}
                      />
                    ));
                  })()}
                </div>
              </div>
            )}

            {/* Distance Selection */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <DistanceSelectorPanel
                distance={distance}
                onDistanceChange={setDistance}
                weaponEffectiveRange={selectedWeapon ? 300 : undefined}
                ammoEffectiveRange={selectedAmmo?.effectiveRange}
              />
            </div>

            {/* Hit Options */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="mb-4 text-lg font-bold text-white">Параметры выстрела</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isHeadshot}
                    onChange={(e) => setIsHeadshot(e.target.checked)}
                    className="w-4 h-4 text-red-500 bg-zinc-800 border-zinc-600 rounded focus:ring-red-500"
                  />
                  <span className="text-white">Выстрел в голову</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCritical}
                    onChange={(e) => setIsCritical(e.target.checked)}
                    className="w-4 h-4 text-red-500 bg-zinc-800 border-zinc-600 rounded focus:ring-red-500"
                  />
                  <span className="text-white">Критический урон</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Target Selection */}
          <div className="space-y-6">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h2 className="mb-4 text-xl font-bold text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Цель
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {[
                  {
                    id: 'civilian',
                    name: 'Обычная одежда',
                    category: 'civilian' as const,
                    armorRating: 0,
                    damageReduction: 0,
                    penetrationResistance: 0,
                    headshotVulnerability: 2.0,
                    explosiveVulnerability: 1.5,
                    fireVulnerability: 1.2,
                    uraniumVulnerability: 1.0,
                    icon: '👤',
                    color: '#87CEEB',
                    description: 'Unarmored civilian targets with basic clothing'
                  },
                  {
                    id: 'light_armor',
                    name: 'Легкая броня',
                    category: 'light_armor' as const,
                    armorRating: 20,
                    damageReduction: 15,
                    penetrationResistance: 25,
                    headshotVulnerability: 1.8,
                    explosiveVulnerability: 1.3,
                    fireVulnerability: 1.1,
                    uraniumVulnerability: 1.2,
                    icon: '🛡️',
                    color: '#98FB98',
                    description: 'Light armor providing basic protection'
                  },
                  {
                    id: 'medium_armor',
                    name: 'Средняя броня',
                    category: 'medium_armor' as const,
                    armorRating: 45,
                    damageReduction: 30,
                    penetrationResistance: 50,
                    headshotVulnerability: 1.5,
                    explosiveVulnerability: 1.2,
                    fireVulnerability: 1.0,
                    uraniumVulnerability: 1.5,
                    icon: '🎖️',
                    color: '#F0E68C',
                    description: 'Medium armor for standard combat situations'
                  },
                  {
                    id: 'heavy_armor',
                    name: 'Тяжелая броня',
                    category: 'heavy_armor' as const,
                    armorRating: 70,
                    damageReduction: 50,
                    penetrationResistance: 75,
                    headshotVulnerability: 1.2,
                    explosiveVulnerability: 1.0,
                    fireVulnerability: 0.8,
                    uraniumVulnerability: 2.0,
                    icon: '🏰',
                    color: '#B8860B',
                    description: 'Heavy armor providing maximum protection'
                  },
                  {
                    id: 'robot',
                    name: 'Робот',
                    category: 'robot' as const,
                    armorRating: 60,
                    damageReduction: 40,
                    penetrationResistance: 80,
                    headshotVulnerability: 1.0,
                    explosiveVulnerability: 1.8,
                    fireVulnerability: 0.5,
                    uraniumVulnerability: 2.5,
                    icon: '🤖',
                    color: '#C0C0C0',
                    description: 'Mechanical robots with high armor resistance'
                  },
                  {
                    id: 'puppet',
                    name: 'Puppet',
                    category: 'puppet' as const,
                    armorRating: 30,
                    damageReduction: 20,
                    penetrationResistance: 35,
                    headshotVulnerability: 2.5,
                    explosiveVulnerability: 1.4,
                    fireVulnerability: 1.3,
                    uraniumVulnerability: 1.3,
                    icon: '🎭',
                    color: '#DDA0DD',
                    description: 'Puppet enemies with weak headshot points'
                  },
                  {
                    id: 'armored_puppet',
                    name: 'Armored Puppet',
                    category: 'puppet' as const,
                    armorRating: 55,
                    damageReduction: 35,
                    penetrationResistance: 60,
                    headshotVulnerability: 2.0,
                    explosiveVulnerability: 1.2,
                    fireVulnerability: 1.0,
                    uraniumVulnerability: 1.8,
                    icon: '🎭',
                    color: '#9370DB',
                    description: 'Armored puppet variants with increased protection'
                  },
                  {
                    id: 'vehicle',
                    name: 'Vehicle',
                    category: 'vehicle' as const,
                    armorRating: 85,
                    damageReduction: 60,
                    penetrationResistance: 90,
                    headshotVulnerability: 0.5,
                    explosiveVulnerability: 2.5,
                    fireVulnerability: 1.5,
                    uraniumVulnerability: 3.0,
                    icon: '🚗',
                    color: '#696969',
                    description: 'Vehicles requiring high penetration or explosive ammo'
                  },
                  {
                    id: 'boss',
                    name: 'Boss',
                    category: 'boss' as const,
                    armorRating: 80,
                    damageReduction: 55,
                    penetrationResistance: 85,
                    headshotVulnerability: 1.8,
                    explosiveVulnerability: 1.6,
                    fireVulnerability: 1.4,
                    uraniumVulnerability: 2.8,
                    icon: '👹',
                    color: '#8B0000',
                    description: 'Boss enemies with high health and armor'
                  }
                ].map(target => (
                  <TargetCard
                    key={target.id}
                    target={target}
                    isSelected={selectedTarget?.id === target.id}
                    onClick={() => handleTargetSelect(target)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <DamageResultPanel
              calculation={calculation}
              isHeadshot={isHeadshot}
              isCritical={isCritical}
            />
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="mt-8">
          <RecommendationPanel
            calculation={calculation}
            weaponName={selectedWeapon?.name}
            distance={distance}
          />
        </div>
      </div>
    </div>
  );
}
