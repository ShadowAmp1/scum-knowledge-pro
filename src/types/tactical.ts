export interface TacticalWeapon {
  id: string;
  name: string;
  type: 'ar' | 'smg' | 'sniper' | 'shotgun' | 'pistol' | 'lmg';
  caliber: string;
  image: string;
  dps: number;
  ttk: number;
  effectiveRange: number;
  stats: {
    damage: number;
    fireRate: number;
    recoil: number;
    accuracy: number;
    reloadTime: number;
  };
  ammoTypes: TacticalAmmo[];
}

export interface TacticalAmmo {
  id: string;
  name: string;
  type: 'ap' | 'hp' | 'slug' | 'tracer' | 'fmj';
  color: string;
  description: string;
  effectiveness: {
    pvp: number;
    pve: number;
    robots: number;
    bunker: number;
  };
  damage: number;
  penetration: number;
  armorDamage: number;
  velocity: number;
}

export interface TacticalTarget {
  id: string;
  name: string;
  category: 'pvp' | 'pve' | 'bunker';
  type: 'naked' | 'light' | 'heavy' | 'full' | 'puppet' | 'mech';
  zones: TargetZone[];
  totalHealth: number;
  armorRating: number;
  damageReduction: number;
  penetrationResistance: number;
}

export interface TargetZone {
  id: string;
  name: string;
  health: number;
  armor: number;
  resistance: number;
  multiplier: number;
  position: { x: number; y: number; width: number; height: number };
}

export interface DamageCalculation {
  weapon: TacticalWeapon;
  ammo: TacticalAmmo;
  target: TacticalTarget;
  distance: number;
  baseDamage: number;
  distanceDamage: number;
  armorDamage: number;
  finalDamage: number;
  penetrationChance: number;
  ttk: number;
  shotsToKill: number;
  headshotShots: number;
  chestShots: number;
  legShots: number;
  effectiveness: 'optimal' | 'excellent' | 'good' | 'fair' | 'poor';
}

export interface DistancePreset {
  value: number;
  label: string;
  color: string;
}

export interface FilterCategory {
  id: string;
  name: string;
  weapons: TacticalWeapon[];
}
