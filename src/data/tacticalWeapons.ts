import { TacticalWeapon, TacticalAmmo } from '@/types/tactical';

export const tacticalWeapons: TacticalWeapon[] = [
  {
    id: 'm249',
    name: 'M249 SAW',
    type: 'lmg',
    caliber: '5.56x45mm',
    image: '/images/weapons/m249-saw.svg',
    dps: 342,
    ttk: 1.8,
    effectiveRange: 300,
    stats: {
      damage: 34,
      fireRate: 850,
      recoil: 65,
      accuracy: 72,
      reloadTime: 4.5
    },
    ammoTypes: [
      {
        id: '556_fmj',
        name: '5.56 FMJ',
        type: 'fmj',
        color: '#10B981',
        image: '/images/ammo/556-fmj.svg',
        description: 'Стандартные патроны для общего использования',
        effectiveness: { pvp: 65, pve: 70, robots: 45, bunker: 50 },
        damage: 34,
        penetration: 35,
        armorDamage: 12,
        velocity: 940
      },
      {
        id: '556_ap',
        name: '5.56 AP',
        type: 'ap',
        color: '#EF4444',
        image: '/images/ammo/556-ap.svg',
        description: 'Бронебойные патроны для пробития брони',
        effectiveness: { pvp: 85, pve: 75, robots: 70, bunker: 85 },
        damage: 28,
        penetration: 75,
        armorDamage: 22,
        velocity: 880
      },
      {
        id: '556_hp',
        name: '5.56 HP',
        type: 'hp',
        color: '#F59E0B',
        image: '/images/ammo/556-hp.svg',
        description: 'Расширяющиеся патроны для максимального урона',
        effectiveness: { pvp: 90, pve: 85, robots: 35, bunker: 40 },
        damage: 42,
        penetration: 25,
        armorDamage: 8,
        velocity: 820
      }
    ]
  },
  {
    id: 'akm',
    name: 'AKM',
    type: 'ar',
    caliber: '7.62x39mm',
    image: '/images/weapons/akm.svg',
    dps: 298,
    ttk: 2.1,
    effectiveRange: 250,
    stats: {
      damage: 48,
      fireRate: 600,
      recoil: 78,
      accuracy: 68,
      reloadTime: 3.2
    },
    ammoTypes: [
      {
        id: '762_fmj',
        name: '7.62 FMJ',
        type: 'fmj',
        color: '#10B981',
        image: '/images/ammo/762-fmj.svg',
        description: 'Стандартные патроны АКМ',
        effectiveness: { pvp: 75, pve: 80, robots: 60, bunker: 65 },
        damage: 48,
        penetration: 45,
        armorDamage: 18,
        velocity: 715
      },
      {
        id: '762_ap',
        name: '7.62 AP',
        type: 'ap',
        color: '#EF4444',
        image: '/images/ammo/762-ap.svg',
        description: 'Бронебойные патроны для АКМ',
        effectiveness: { pvp: 90, pve: 85, robots: 85, bunker: 95 },
        damage: 38,
        penetration: 85,
        armorDamage: 28,
        velocity: 680
      },
      {
        id: '762_hp',
        name: '7.62 HP',
        type: 'hp',
        color: '#F59E0B',
        image: '/images/ammo/762-hp.svg',
        description: 'Расширяющиеся патроны для АКМ',
        effectiveness: { pvp: 95, pve: 90, robots: 40, bunker: 45 },
        damage: 58,
        penetration: 30,
        armorDamage: 12,
        velocity: 650
      }
    ]
  },
  {
    id: 'm4a1',
    name: 'M4A1',
    type: 'ar',
    caliber: '5.56x45mm',
    image: '/images/weapons/m4a1.svg',
    dps: 312,
    ttk: 1.9,
    effectiveRange: 280,
    stats: {
      damage: 36,
      fireRate: 750,
      recoil: 58,
      accuracy: 82,
      reloadTime: 2.8
    },
    ammoTypes: [
      {
        id: '556_fmj',
        name: '5.56 FMJ',
        type: 'fmj',
        color: '#10B981',
        image: '/images/ammo/556-fmj.svg',
        description: 'Стандартные патроны для общего использования',
        effectiveness: { pvp: 70, pve: 75, robots: 50, bunker: 55 },
        damage: 36,
        penetration: 35,
        armorDamage: 12,
        velocity: 940
      },
      {
        id: '556_ap',
        name: '5.56 AP',
        type: 'ap',
        color: '#EF4444',
        image: '/images/ammo/556-ap.svg',
        description: 'Бронебойные патроны для пробития брони',
        effectiveness: { pvp: 88, pve: 80, robots: 75, bunker: 88 },
        damage: 30,
        penetration: 75,
        armorDamage: 22,
        velocity: 880
      },
      {
        id: '556_hp',
        name: '5.56 HP',
        type: 'hp',
        color: '#F59E0B',
        image: '/images/ammo/556-hp.svg',
        description: 'Расширяющиеся патроны для максимального урона',
        effectiveness: { pvp: 92, pve: 88, robots: 38, bunker: 42 },
        damage: 44,
        penetration: 25,
        armorDamage: 8,
        velocity: 820
      }
    ]
  },
  {
    id: 'awm',
    name: 'AWM',
    type: 'sniper',
    caliber: '.338 Lapua',
    image: '/images/weapons/m82a1.svg',
    dps: 156,
    ttk: 1.3,
    effectiveRange: 800,
    stats: {
      damage: 120,
      fireRate: 40,
      recoil: 85,
      accuracy: 95,
      reloadTime: 3.8
    },
    ammoTypes: [
      {
        id: '338_fmj',
        name: '.338 FMJ',
        type: 'fmj',
        color: '#10B981',
        image: '/images/ammo/762-fmj.svg',
        description: 'Стандартные снайперские патроны',
        effectiveness: { pvp: 85, pve: 90, robots: 70, bunker: 75 },
        damage: 120,
        penetration: 65,
        armorDamage: 45,
        velocity: 860
      },
      {
        id: '338_ap',
        name: '.338 AP',
        type: 'ap',
        color: '#EF4444',
        image: '/images/ammo/762-ap.svg',
        description: 'Бронебойные снайперские патроны',
        effectiveness: { pvp: 95, pve: 92, robots: 90, bunker: 98 },
        damage: 100,
        penetration: 95,
        armorDamage: 65,
        velocity: 820
      },
      {
        id: '338_hp',
        name: '.338 HP',
        type: 'hp',
        color: '#F59E0B',
        image: '/images/ammo/762-hp.svg',
        description: 'Расширяющиеся снайперские патроны',
        effectiveness: { pvp: 98, pve: 95, robots: 45, bunker: 50 },
        damage: 145,
        penetration: 40,
        armorDamage: 25,
        velocity: 780
      }
    ]
  },
  {
    id: 'm870',
    name: 'M870',
    type: 'shotgun',
    caliber: '12 Gauge',
    image: '/images/weapons/m1887.svg',
    dps: 425,
    ttk: 1.4,
    effectiveRange: 50,
    stats: {
      damage: 85,
      fireRate: 45,
      recoil: 92,
      accuracy: 45,
      reloadTime: 2.5
    },
    ammoTypes: [
      {
        id: '12g_slug',
        name: '12g Slug',
        type: 'slug',
        color: '#8B5CF6',
        image: '/images/ammo/12g-slug.svg',
        description: 'Тяжелые пули для дробовика',
        effectiveness: { pvp: 80, pve: 85, robots: 60, bunker: 70 },
        damage: 85,
        penetration: 55,
        armorDamage: 35,
        velocity: 450
      },
      {
        id: '12g_buck',
        name: '12g Buckshot',
        type: 'fmj',
        color: '#10B981',
        image: '/images/ammo/12g-slug.svg',
        description: 'Классическая картечь',
        effectiveness: { pvp: 95, pve: 90, robots: 40, bunker: 45 },
        damage: 120,
        penetration: 20,
        armorDamage: 8,
        velocity: 380
      },
      {
        id: '12g_ap',
        name: '12g AP Slug',
        type: 'ap',
        color: '#EF4444',
        image: '/images/ammo/12g-slug.svg',
        description: 'Бронебойные пули для дробовика',
        effectiveness: { pvp: 85, pve: 80, robots: 80, bunker: 90 },
        damage: 70,
        penetration: 80,
        armorDamage: 45,
        velocity: 420
      }
    ]
  },
  {
    id: 'glock17',
    name: 'Glock 17',
    type: 'pistol',
    caliber: '9x19mm',
    image: '/images/weapons/ump-45.svg',
    dps: 180,
    ttk: 3.3,
    effectiveRange: 75,
    stats: {
      damage: 24,
      fireRate: 600,
      recoil: 35,
      accuracy: 75,
      reloadTime: 2.0
    },
    ammoTypes: [
      {
        id: '9mm_fmj',
        name: '9mm FMJ',
        type: 'fmj',
        color: '#10B981',
        image: '/images/ammo/9mm-fmj.svg',
        description: 'Стандартные 9мм патроны',
        effectiveness: { pvp: 60, pve: 65, robots: 35, bunker: 40 },
        damage: 24,
        penetration: 25,
        armorDamage: 6,
        velocity: 375
      },
      {
        id: '9mm_ap',
        name: '9mm AP',
        type: 'ap',
        color: '#EF4444',
        image: '/images/ammo/9mm-ap.svg',
        description: 'Бронебойные 9мм патроны',
        effectiveness: { pvp: 75, pve: 70, robots: 65, bunker: 75 },
        damage: 18,
        penetration: 55,
        armorDamage: 12,
        velocity: 340
      },
      {
        id: '9mm_hp',
        name: '9mm HP',
        type: 'hp',
        color: '#F59E0B',
        image: '/images/ammo/9mm-hp.svg',
        description: 'Расширяющиеся 9мм патроны',
        effectiveness: { pvp: 80, pve: 75, robots: 25, bunker: 30 },
        damage: 32,
        penetration: 15,
        armorDamage: 4,
        velocity: 320
      }
    ]
  }
];

export const tacticalTargets = [
  {
    id: 'naked_player',
    name: 'Голый игрок',
    category: 'pvp' as const,
    type: 'naked' as const,
    image: '/images/targets/naked-player.svg',
    totalHealth: 100,
    armorRating: 0,
    damageReduction: 0,
    penetrationResistance: 0,
    zones: [
      {
        id: 'head',
        name: 'Голова',
        health: 25,
        armor: 0,
        resistance: 0,
        multiplier: 2.5,
        position: { x: 50, y: 15, width: 15, height: 15 }
      },
      {
        id: 'chest',
        name: 'Грудь',
        health: 40,
        armor: 0,
        resistance: 0,
        multiplier: 1.0,
        position: { x: 50, y: 40, width: 30, height: 25 }
      },
      {
        id: 'arms',
        name: 'Руки',
        health: 15,
        armor: 0,
        resistance: 0,
        multiplier: 0.8,
        position: { x: 25, y: 35, width: 12, height: 20 }
      },
      {
        id: 'legs',
        name: 'Ноги',
        health: 20,
        armor: 0,
        resistance: 0,
        multiplier: 0.7,
        position: { x: 50, y: 70, width: 25, height: 25 }
      }
    ]
  },
  {
    id: 'light_armor',
    name: 'Легкая броня',
    category: 'pvp' as const,
    type: 'light' as const,
    image: '/images/targets/light-armor.svg',
    totalHealth: 100,
    armorRating: 25,
    damageReduction: 15,
    penetrationResistance: 35,
    zones: [
      {
        id: 'head',
        name: 'Голова',
        health: 25,
        armor: 0,
        resistance: 0,
        multiplier: 2.5,
        position: { x: 50, y: 15, width: 15, height: 15 }
      },
      {
        id: 'chest',
        name: 'Грудь',
        health: 40,
        armor: 15,
        resistance: 25,
        multiplier: 1.0,
        position: { x: 50, y: 40, width: 30, height: 25 }
      },
      {
        id: 'arms',
        name: 'Руки',
        health: 15,
        armor: 5,
        resistance: 15,
        multiplier: 0.8,
        position: { x: 25, y: 35, width: 12, height: 20 }
      },
      {
        id: 'legs',
        name: 'Ноги',
        health: 20,
        armor: 8,
        resistance: 20,
        multiplier: 0.7,
        position: { x: 50, y: 70, width: 25, height: 25 }
      }
    ]
  },
  {
    id: 'heavy_armor',
    name: 'Тяжелая броня',
    category: 'pvp' as const,
    type: 'heavy' as const,
    image: '/images/targets/heavy-armor.svg',
    totalHealth: 100,
    armorRating: 60,
    damageReduction: 40,
    penetrationResistance: 70,
    zones: [
      {
        id: 'head',
        name: 'Голова',
        health: 25,
        armor: 10,
        resistance: 20,
        multiplier: 2.5,
        position: { x: 50, y: 15, width: 15, height: 15 }
      },
      {
        id: 'chest',
        name: 'Грудь',
        health: 40,
        armor: 40,
        resistance: 60,
        multiplier: 1.0,
        position: { x: 50, y: 40, width: 30, height: 25 }
      },
      {
        id: 'arms',
        name: 'Руки',
        health: 15,
        armor: 20,
        resistance: 40,
        multiplier: 0.8,
        position: { x: 25, y: 35, width: 12, height: 20 }
      },
      {
        id: 'legs',
        name: 'Ноги',
        health: 20,
        armor: 25,
        resistance: 50,
        multiplier: 0.7,
        position: { x: 50, y: 70, width: 25, height: 25 }
      }
    ]
  },
  {
    id: 'puppet',
    name: 'Puppet',
    category: 'pve' as const,
    type: 'puppet' as const,
    image: '/images/targets/puppet.svg',
    totalHealth: 150,
    armorRating: 30,
    damageReduction: 20,
    penetrationResistance: 40,
    zones: [
      {
        id: 'head',
        name: 'Голова',
        health: 40,
        armor: 5,
        resistance: 10,
        multiplier: 3.0,
        position: { x: 50, y: 15, width: 15, height: 15 }
      },
      {
        id: 'chest',
        name: 'Грудь',
        health: 60,
        armor: 20,
        resistance: 30,
        multiplier: 1.0,
        position: { x: 50, y: 40, width: 30, height: 25 }
      },
      {
        id: 'arms',
        name: 'Руки',
        health: 20,
        armor: 8,
        resistance: 20,
        multiplier: 0.8,
        position: { x: 25, y: 35, width: 12, height: 20 }
      },
      {
        id: 'legs',
        name: 'Ноги',
        health: 30,
        armor: 12,
        resistance: 25,
        multiplier: 0.7,
        position: { x: 50, y: 70, width: 25, height: 25 }
      }
    ]
  },
  {
    id: 'mech',
    name: 'Mech',
    category: 'pve' as const,
    type: 'mech' as const,
    image: '/images/targets/mech.svg',
    totalHealth: 300,
    armorRating: 80,
    damageReduction: 60,
    penetrationResistance: 85,
    zones: [
      {
        id: 'head',
        name: 'Голова',
        health: 80,
        armor: 40,
        resistance: 60,
        multiplier: 2.0,
        position: { x: 50, y: 15, width: 15, height: 15 }
      },
      {
        id: 'chest',
        name: 'Грудь',
        health: 120,
        armor: 80,
        resistance: 90,
        multiplier: 1.0,
        position: { x: 50, y: 40, width: 30, height: 25 }
      },
      {
        id: 'arms',
        name: 'Руки',
        health: 40,
        armor: 30,
        resistance: 50,
        multiplier: 0.8,
        position: { x: 25, y: 35, width: 12, height: 20 }
      },
      {
        id: 'legs',
        name: 'Ноги',
        health: 60,
        armor: 40,
        resistance: 70,
        multiplier: 0.7,
        position: { x: 50, y: 70, width: 25, height: 25 }
      }
    ]
  }
];

export const distancePresets = [
  { value: 0, label: '0m', color: '#10B981' },
  { value: 25, label: '25m', color: '#10B981' },
  { value: 50, label: '50m', color: '#F59E0B' },
  { value: 100, label: '100m', color: '#F59E0B' },
  { value: 200, label: '200m', color: '#EF4444' },
  { value: 300, label: '300m', color: '#EF4444' },
  { value: 500, label: '500m', color: '#8B5CF6' },
  { value: 1000, label: '1000m', color: '#8B5CF6' }
];
