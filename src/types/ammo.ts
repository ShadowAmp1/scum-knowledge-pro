export interface AmmoType {
  id: string;
  name: string;
  caliber: string;
  category: 'pistol' | 'rifle' | 'sniper' | 'shotgun' | 'heavy' | 'special';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  
  // Base stats
  baseDamage: number;
  penetration: number; // 0-100
  armorDamage: number;
  effectiveRange: number;
  velocity: number;
  
  // Damage modifiers
  headshotMultiplier: number;
  limbMultiplier: number;
  torsoMultiplier: number;
  
  // Special properties
  explosive?: boolean;
  incendiary?: boolean;
  tracer?: boolean;
  uranium?: boolean;
  armorPiercing?: boolean;
  
  // Damage falloff
  damageFalloffStart: number;
  damageFalloffEnd: number;
  minDamagePercent: number;
  
  // Visual properties
  color: string;
  icon: string;
  description: string;
}

export interface TargetType {
  id: string;
  name: string;
  category: 'civilian' | 'light_armor' | 'medium_armor' | 'heavy_armor' | 'robot' | 'puppet' | 'vehicle' | 'boss';
  
  // Defense stats
  armorRating: number;
  damageReduction: number;
  penetrationResistance: number;
  
  // Weaknesses
  headshotVulnerability: number;
  explosiveVulnerability: number;
  fireVulnerability: number;
  uraniumVulnerability: number;
  
  // Visual
  icon: string;
  color: string;
  description: string;
}

export interface DamageCalculation {
  weaponName: string;
  ammoType: AmmoType;
  targetType: TargetType;
  distance: number;
  
  // Calculated values
  baseDamage: number;
  distanceDamage: number;
  penetrationDamage: number;
  armorDamage: number;
  finalDamage: number;
  
  // Additional stats
  dps: number;
  ttk: number; // Time to kill in seconds
  penetrationChance: number; // 0-100%
  criticalChance: number; // 0-100%
  
  // Multipliers applied
  distanceMultiplier: number;
  penetrationMultiplier: number;
  armorMultiplier: number;
  criticalMultiplier: number;
  
  // Recommendations
  effectiveness: 'poor' | 'fair' | 'good' | 'excellent' | 'optimal';
  recommendedAgainst: string[];
  notRecommendedAgainst: string[];
}

export interface WeaponStats {
  name: string;
  caliber: string;
  fireRate: number; // rounds per minute
  magazineSize: number;
  reloadTime: number; // seconds
  recoil: number; // 0-100
  accuracy: number; // 0-100
  
  // Damage per shot with different ammo
  damagePerShot: Record<string, number>;
  
  // Recommended ammo
  recommendedAmmo: string[];
  bestPvPAmmo: string;
  bestPvEAmmo: string;
  bestRobotAmmo: string;
}
