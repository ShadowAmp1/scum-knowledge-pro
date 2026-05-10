"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TacticalWeapon, TacticalTarget, TacticalAmmo, DamageCalculation, TargetZone } from '@/types/tactical';
import { tacticalWeapons, tacticalTargets } from '@/data/tacticalWeapons';

// Components
import WeaponColumn from '@/components/ExactDamageCalculator/WeaponColumn';
import AmmoColumn from '@/components/ExactDamageCalculator/AmmoColumn';
import TargetColumn from '@/components/ExactDamageCalculator/TargetColumn';
import DistanceSelector from '@/components/ExactDamageCalculator/DistanceSelector';
import StickySummary from '@/components/ExactDamageCalculator/StickySummary';

import { Calculator } from 'lucide-react';

export default function ExactDamageCalculator() {
  const [selectedWeapon, setSelectedWeapon] = useState<TacticalWeapon | null>(null);
  const [selectedAmmo, setSelectedAmmo] = useState<TacticalAmmo | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<TacticalTarget | null>(null);
  const [distance, setDistance] = useState(100);
  const [customDistance, setCustomDistance] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('pvp');
  const [hoveredZone, setHoveredZone] = useState<TargetZone | null>(null);
  const [calculation, setCalculation] = useState<DamageCalculation | null>(null);

  // Calculate damage when parameters change
  useEffect(() => {
    if (selectedWeapon && selectedAmmo && selectedTarget) {
      const calc = calculateDamage();
      setCalculation(calc);
    } else {
      setCalculation(null);
    }
  }, [selectedWeapon, selectedAmmo, selectedTarget, distance]);

  const calculateDamage = (): DamageCalculation | null => {
    if (!selectedWeapon || !selectedAmmo || !selectedTarget) return null;

    // Distance damage falloff
    const distanceMultiplier = calculateDistanceMultiplier(distance, selectedWeapon.effectiveRange);
    const baseDamage = selectedAmmo.damage;
    const distanceDamage = Math.round(baseDamage * distanceMultiplier);

    // Armor calculation
    const armorPenetration = selectedAmmo.penetration;
    const armorRating = selectedTarget.armorRating;
    const penetrationChance = Math.min(100, Math.max(0, (armorPenetration - armorRating) + 50));
    
    const armorMultiplier = penetrationChance > 50 ? 1 : 0.5;
    const armorDamage = Math.round(distanceDamage * armorMultiplier * (1 - selectedTarget.damageReduction / 100));
    
    // Final damage
    const finalDamage = Math.round(armorDamage);

    // TTK calculation
    const shotsToKill = Math.ceil(selectedTarget.totalHealth / finalDamage);
    const ttk = (shotsToKill / (selectedWeapon.stats.fireRate / 60)) + (shotsToKill - 1) * (60 / selectedWeapon.stats.fireRate);

    // Zone-specific calculations
    const headshotDamage = Math.round(finalDamage * 2.5);
    const chestDamage = finalDamage;
    const legDamage = Math.round(finalDamage * 0.7);

    const headshotShots = Math.ceil(selectedTarget.zones.find(z => z.id === 'head')?.health || 25 / headshotDamage);
    const chestShots = Math.ceil(selectedTarget.zones.find(z => z.id === 'chest')?.health || 40 / chestDamage);
    const legShots = Math.ceil(selectedTarget.zones.find(z => z.id === 'legs')?.health || 20 / legDamage);

    // Effectiveness rating
    let effectiveness: DamageCalculation['effectiveness'] = 'poor';
    if (finalDamage >= 50 && penetrationChance >= 80 && ttk <= 2) effectiveness = 'optimal';
    else if (finalDamage >= 35 && penetrationChance >= 60 && ttk <= 3) effectiveness = 'excellent';
    else if (finalDamage >= 25 && penetrationChance >= 40 && ttk <= 4) effectiveness = 'good';
    else if (finalDamage >= 15 && penetrationChance >= 20) effectiveness = 'fair';

    return {
      weapon: selectedWeapon,
      ammo: selectedAmmo,
      target: selectedTarget,
      distance,
      baseDamage,
      distanceDamage,
      armorDamage,
      finalDamage,
      penetrationChance,
      ttk,
      shotsToKill,
      headshotShots,
      chestShots,
      legShots,
      effectiveness
    };
  };

  const calculateDistanceMultiplier = (dist: number, effectiveRange: number): number => {
    if (dist <= 25) return 1.0;
    if (dist <= 50) return 0.95;
    if (dist <= 100) return 0.85;
    if (dist <= 200) return 0.65;
    if (dist <= 300) return 0.45;
    if (dist <= 500) return 0.25;
    return 0.15;
  };

  const handleReset = () => {
    setSelectedWeapon(null);
    setSelectedAmmo(null);
    setSelectedTarget(null);
    setDistance(100);
    setCustomDistance('');
    setSelectedCategory('all');
    setSelectedFilter('pvp');
    setHoveredZone(null);
  };

  const handleBestAmmo = () => {
    if (!selectedWeapon || !selectedTarget) return;
    
    const bestAmmo = selectedWeapon.ammoTypes.reduce((best, ammo) => {
      const currentEffectiveness = ammo.effectiveness[selectedFilter as keyof typeof ammo.effectiveness];
      const bestEffectiveness = best.effectiveness[selectedFilter as keyof typeof best.effectiveness];
      return currentEffectiveness > bestEffectiveness ? ammo : best;
    });
    
    setSelectedAmmo(bestAmmo);
  };

  const getDamagePerZone = (): Record<string, number> => {
    if (!calculation) return {};
    
    const zoneDamage: Record<string, number> = {};
    
    selectedTarget.zones.forEach(zone => {
      const baseDamage = calculation.finalDamage;
      const multiplier = zone.multiplier;
      const armor = zone.armor;
      const resistance = zone.resistance;
      
      let damage = baseDamage * multiplier;
      damage = damage * (1 - armor / 100);
      damage = damage * (1 - resistance / 100);
      
      zoneDamage[zone.id] = Math.round(damage);
    });
    
    return zoneDamage;
  };

  const damagePerZone = getDamagePerZone();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-zinc-900/50 pointer-events-none" />
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)
          `
        }} />
      </div>
      
      {/* Noise Overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
      }} />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-black/40 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <Calculator className="h-8 w-8 text-red-500" />
              <h1 className="text-3xl font-black text-white">Damage Calculator</h1>
            </div>
          </div>
        </div>

        {/* Main Grid - 3 Columns */}
        <div className="max-w-7xl mx-auto px-4 py-8 pb-32">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Weapon */}
            <div className="col-span-12 lg:col-span-4">
              <WeaponColumn
                weapons={tacticalWeapons}
                selectedWeapon={selectedWeapon}
                onWeaponSelect={setSelectedWeapon}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
              />
            </div>

            {/* Middle Column - Ammo & Distance */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {selectedWeapon && (
                <AmmoColumn
                  ammoTypes={selectedWeapon.ammoTypes}
                  selectedAmmo={selectedAmmo}
                  onAmmoSelect={setSelectedAmmo}
                  selectedFilter={selectedFilter}
                />
              )}
              
              <DistanceSelector
                distance={distance}
                onDistanceChange={setDistance}
                customDistance={customDistance}
                onCustomDistanceChange={setCustomDistance}
              />
            </div>

            {/* Right Column - Target */}
            <div className="col-span-12 lg:col-span-4">
              <TargetColumn
                targets={tacticalTargets}
                selectedTarget={selectedTarget}
                onTargetSelect={setSelectedTarget}
                hoveredZone={hoveredZone}
                onZoneHover={setHoveredZone}
                damagePerZone={damagePerZone}
              />
            </div>
          </div>
        </div>

        {/* Sticky Summary Panel */}
        <StickySummary
          calculation={calculation}
          onReset={handleReset}
          onBestAmmo={handleBestAmmo}
        />
      </div>
    </div>
  );
}
