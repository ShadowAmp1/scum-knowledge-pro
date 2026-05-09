import { AmmoType, TargetType, WeaponStats, DamageCalculation } from '@/types/ammo';
import { getAmmoById, getTargetById, getWeaponByName } from '@/data/ammo';

export class DamageCalculator {
  static calculateDamage(
    weaponName: string,
    ammoId: string,
    targetId: string,
    distance: number,
    isHeadshot: boolean = false,
    isCritical: boolean = false
  ): DamageCalculation {
    const weapon = getWeaponByName(weaponName);
    const ammo = getAmmoById(ammoId);
    const target = getTargetById(targetId);

    if (!weapon || !ammo || !target) {
      throw new Error('Invalid weapon, ammo, or target');
    }

    // Base damage from weapon with ammo
    const baseDamage = weapon.damagePerShot[ammoId] || ammo.baseDamage;

    // Distance damage falloff
    const distanceMultiplier = this.calculateDistanceMultiplier(ammo, distance);
    const distanceDamage = baseDamage * distanceMultiplier;

    // Penetration calculation
    const penetrationChance = this.calculatePenetrationChance(ammo, target);
    const penetrationMultiplier = penetrationChance > 50 ? 1.0 : 0.5;
    const penetrationDamage = distanceDamage * penetrationMultiplier;

    // Armor reduction
    const armorMultiplier = this.calculateArmorMultiplier(ammo, target, penetrationChance);
    const armorDamage = penetrationDamage * armorMultiplier;

    // Hit location multiplier
    const hitLocationMultiplier = this.calculateHitLocationMultiplier(
      target, 
      isHeadshot, 
      isCritical
    );

    // Final damage
    const finalDamage = armorDamage * hitLocationMultiplier;

    // DPS calculation
    const dps = (finalDamage * weapon.fireRate) / 60;

    // TTK calculation (assuming 100 HP target)
    const ttk = 100 / dps;

    // Critical chance based on weapon accuracy and distance
    const criticalChance = this.calculateCriticalChance(weapon, distance, isHeadshot);

    // Effectiveness rating
    const effectiveness = this.calculateEffectiveness(finalDamage, penetrationChance, ttk);

    // Recommendations
    const { recommendedAgainst, notRecommendedAgainst } = this.generateRecommendations(
      ammo,
      target,
      effectiveness
    );

    return {
      weaponName,
      ammoType: ammo,
      targetType: target,
      distance,
      baseDamage,
      distanceDamage,
      penetrationDamage,
      armorDamage,
      finalDamage,
      dps,
      ttk,
      penetrationChance,
      criticalChance,
      distanceMultiplier,
      penetrationMultiplier,
      armorMultiplier,
      criticalMultiplier: hitLocationMultiplier,
      effectiveness,
      recommendedAgainst,
      notRecommendedAgainst
    };
  }

  private static calculateDistanceMultiplier(ammo: AmmoType, distance: number): number {
    if (distance <= ammo.damageFalloffStart) {
      return 1.0;
    }

    if (distance >= ammo.damageFalloffEnd) {
      return ammo.minDamagePercent;
    }

    // Linear falloff between start and end
    const falloffRange = ammo.damageFalloffEnd - ammo.damageFalloffStart;
    const distanceIntoFalloff = distance - ammo.damageFalloffStart;
    const falloffProgress = distanceIntoFalloff / falloffRange;
    
    return 1.0 - (falloffProgress * (1.0 - ammo.minDamagePercent));
  }

  private static calculatePenetrationChance(ammo: AmmoType, target: TargetType): number {
    let basePenetration = ammo.penetration;
    
    // Ammo type bonuses
    if (ammo.armorPiercing) basePenetration += 20;
    if (ammo.uranium) basePenetration += 30;
    if (ammo.explosive) basePenetration += 10;

    // Target resistance
    const effectivePenetration = basePenetration - target.penetrationResistance;
    
    // Clamp between 0-100
    return Math.max(0, Math.min(100, effectivePenetration));
  }

  private static calculateArmorMultiplier(
    ammo: AmmoType, 
    target: TargetType, 
    penetrationChance: number
  ): number {
    let armorReduction = target.damageReduction;

    // Special ammo effects
    if (ammo.uranium) armorReduction *= 0.3; // Uranium ignores most armor
    if (ammo.explosive) armorReduction *= 0.7; // Explosive partially ignores armor
    if (ammo.armorPiercing) armorReduction *= 0.5; // AP ignores half armor

    // Vulnerability bonuses
    if (ammo.incendiary && target.fireVulnerability > 1.0) {
      armorReduction *= 0.8;
    }

    // Apply armor reduction based on penetration
    if (penetrationChance > 75) {
      armorReduction *= 0.2; // High penetration ignores most armor
    } else if (penetrationChance > 50) {
      armorReduction *= 0.5; // Medium penetration ignores some armor
    }

    return Math.max(0.1, 1.0 - (armorReduction / 100));
  }

  private static calculateHitLocationMultiplier(
    target: TargetType, 
    isHeadshot: boolean, 
    isCritical: boolean
  ): number {
    let multiplier = 1.0;

    if (isHeadshot) {
      multiplier *= target.headshotVulnerability;
    }

    if (isCritical) {
      multiplier *= 1.5;
    }

    return multiplier;
  }

  private static calculateCriticalChance(
    weapon: WeaponStats, 
    distance: number, 
    isHeadshot: boolean
  ): number {
    let baseChance = 5; // 5% base critical chance

    // Accuracy bonus
    baseChance += (weapon.accuracy - 50) / 10;

    // Distance penalty
    if (distance > 200) baseChance -= 10;
    else if (distance > 100) baseChance -= 5;

    // Headshot bonus
    if (isHeadshot) baseChance += 10;

    // High accuracy weapons get bonus
    if (weapon.accuracy >= 90) baseChance += 5;

    return Math.max(1, Math.min(25, baseChance));
  }

  private static calculateEffectiveness(
    damage: number, 
    penetrationChance: number, 
    ttk: number
  ): 'poor' | 'fair' | 'good' | 'excellent' | 'optimal' {
    const score = (damage * 0.4) + (penetrationChance * 0.4) + ((10 - ttk) * 0.2);

    if (score >= 80) return 'optimal';
    if (score >= 60) return 'excellent';
    if (score >= 40) return 'good';
    if (score >= 20) return 'fair';
    return 'poor';
  }

  private static generateRecommendations(
    ammo: AmmoType, 
    target: TargetType, 
    effectiveness: string
  ): { recommendedAgainst: string[]; notRecommendedAgainst: string[] } {
    const recommendedAgainst: string[] = [];
    const notRecommendedAgainst: string[] = [];

    // Based on ammo properties
    if (ammo.penetration >= 70) {
      recommendedAgainst.push('Тяжелая броня', 'Робот', 'Vehicle');
    }
    
    if (ammo.explosive) {
      recommendedAgainst.push('Vehicle', 'Boss', 'Групповые цели');
      notRecommendedAgainst.push('Обычная одежда', 'Puppet');
    }

    if (ammo.uranium) {
      recommendedAgainst.push('Robot', 'Boss', 'Тяжелая броня');
      notRecommendedAgainst.push('Обычная одежда');
    }

    if (ammo.incendiary) {
      recommendedAgainst.push('Puppet', 'Boss');
    }

    if (ammo.caliber === '12g') {
      recommendedAgainst.push('Обычная одежда', 'Легкая броня');
      notRecommendedAgainst.push('Тяжелая броня', 'Robot');
    }

    if (effectiveness === 'optimal' || effectiveness === 'excellent') {
      recommendedAgainst.push(target.name);
    } else if (effectiveness === 'poor') {
      notRecommendedAgainst.push(target.name);
    }

    return { recommendedAgainst, notRecommendedAgainst };
  }

  // Comparison utility
  static compareAmmo(
    weaponName: string,
    targetId: string,
    distance: number
  ): Array<{ ammoId: string; calculation: DamageCalculation }> {
    const weapon = getWeaponByName(weaponName);
    if (!weapon) return [];

    const results = Object.keys(weapon.damagePerShot).map(ammoId => ({
      ammoId,
      calculation: this.calculateDamage(weaponName, ammoId, targetId, distance)
    }));

    return results.sort((a, b) => b.calculation.finalDamage - a.calculation.finalDamage);
  }

  // Best ammo recommendation
  static getBestAmmoForTarget(
    weaponName: string,
    targetId: string,
    distance: number,
    priority: 'damage' | 'dps' | 'ttk' | 'penetration' = 'damage'
  ): { ammoId: string; calculation: DamageCalculation } | null {
    const comparisons = this.compareAmmo(weaponName, targetId, distance);
    if (comparisons.length === 0) return null;

    let best = comparisons[0];

    comparisons.forEach(comp => {
      const calc = comp.calculation;
      
      switch (priority) {
        case 'damage':
          if (calc.finalDamage > best.calculation.finalDamage) best = comp;
          break;
        case 'dps':
          if (calc.dps > best.calculation.dps) best = comp;
          break;
        case 'ttk':
          if (calc.ttk < best.calculation.ttk) best = comp;
          break;
        case 'penetration':
          if (calc.penetrationChance > best.calculation.penetrationChance) best = comp;
          break;
      }
    });

    return best;
  }
}
