"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TacticalTarget, TargetZone } from '@/types/tactical';
import { Shield, Swords, Heart, Zap } from 'lucide-react';

interface TargetColumnProps {
  targets: TacticalTarget[];
  selectedTarget: TacticalTarget | null;
  onTargetSelect: (target: TacticalTarget) => void;
  hoveredZone: TargetZone | null;
  onZoneHover: (zone: TargetZone | null) => void;
  damagePerZone: Record<string, number>;
}

export default function TargetColumn({ 
  targets, 
  selectedTarget, 
  onTargetSelect, 
  hoveredZone, 
  onZoneHover,
  damagePerZone 
}: TargetColumnProps) {
  const [selectedPreset, setSelectedPreset] = useState<'pvp' | 'pve' | 'bunker'>('pvp');

  const presets = [
    { id: 'pvp', name: 'PvP' },
    { id: 'pve', name: 'PvE' },
    { id: 'bunker', name: 'Бункер' }
  ];

  const filteredTargets = targets.filter(target => target.category === selectedPreset);

  const renderTargetDiagram = () => {
    if (!selectedTarget) return null;

    return (
      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h4 className="font-bold text-white mb-4">Схема цели</h4>
        
        <div className="relative w-full h-80 bg-black/40 rounded-xl border border-white/5 overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(0,255,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }} />
          </div>

          {/* Target Silhouette */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full relative z-10"
            style={{ filter: 'drop-shadow(0 0 20px rgba(0, 255, 0, 0.3))' }}
          >
            {/* Body outline */}
            <path
              d="M 50 20 C 55 20, 60 25, 60 30 L 60 40 C 60 45, 55 50, 50 50 C 45 50, 40 45, 40 40 L 40 30 C 40 25, 45 20, 50 20 Z M 35 50 L 65 50 L 65 70 L 55 70 L 55 85 L 45 85 L 45 70 L 35 70 Z"
              fill="rgba(0, 255, 0, 0.1)"
              stroke="rgba(0, 255, 0, 0.5)"
              strokeWidth="1"
            />

            {/* Target Zones */}
            {selectedTarget.zones.map((zone) => (
              <g key={zone.id}>
                {/* Zone highlight */}
                <rect
                  x={zone.position.x - zone.position.width / 2}
                  y={zone.position.y - zone.position.height / 2}
                  width={zone.position.width}
                  height={zone.position.height}
                  fill={hoveredZone?.id === zone.id ? 'rgba(0, 255, 0, 0.3)' : 'rgba(0, 255, 0, 0.1)'}
                  stroke={hoveredZone?.id === zone.id ? '#00FF00' : 'rgba(0, 255, 0, 0.5)'}
                  strokeWidth={hoveredZone?.id === zone.id ? 2 : 1}
                  rx={2}
                  className="cursor-pointer"
                  onMouseEnter={() => onZoneHover(zone)}
                  onMouseLeave={() => onZoneHover(null)}
                  style={{ transition: 'all 0.3s ease' }}
                />

                {/* Zone label */}
                <text
                  x={zone.position.x}
                  y={zone.position.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#00FF00"
                  fontSize="6"
                  fontWeight="bold"
                >
                  {zone.name}
                </text>

                {/* Damage indicator */}
                {damagePerZone[zone.id] > 0 && (
                  <text
                    x={zone.position.x}
                    y={zone.position.y + 8}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#00FF00"
                    fontSize="5"
                    fontWeight="bold"
                  >
                    {damagePerZone[zone.id]}
                  </text>
                )}
              </g>
            ))}

            {/* Center crosshair */}
            <line x1="50" y1="45" x2="50" y2="55" stroke="rgba(0, 255, 0, 0.5)" strokeWidth="1" />
            <line x1="45" y1="50" x2="55" y2="50" stroke="rgba(0, 255, 0, 0.5)" strokeWidth="1" />
          </svg>

          {/* Zone Tooltip */}
          {hoveredZone && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-4 right-4 bg-black/80 backdrop-blur-xl border border-green-500/50 rounded-xl p-3 min-w-40"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-green-400">{hoveredZone.name}</span>
                  <span className="text-xs text-zinc-400">x{hoveredZone.multiplier}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-red-400" />
                    <span className="text-zinc-400">HP:</span>
                    <span className="text-white">{hoveredZone.health}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-blue-400" />
                    <span className="text-zinc-400">Броня:</span>
                    <span className="text-white">{hoveredZone.armor}</span>
                  </div>
                </div>
                {damagePerZone[hoveredZone.id] > 0 && (
                  <div className="pt-2 border-t border-white/10">
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-green-400" />
                      <span className="text-zinc-400">Урон:</span>
                      <span className="text-green-400 font-bold">{damagePerZone[hoveredZone.id]}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Zone Stats */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          {selectedTarget.zones.map((zone) => (
            <div key={zone.id} className="text-center">
              <div className="text-xs text-zinc-400 mb-1">{zone.name}</div>
              <div className="text-lg font-bold text-green-400">
                {damagePerZone[zone.id] || 0}
              </div>
              <div className="text-xs text-zinc-500">
                {Math.ceil((zone.health || 25) / (damagePerZone[zone.id] || 1))} выстр.
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Preset Tabs */}
      <div className="flex gap-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setSelectedPreset(preset.id as any)}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              selectedPreset === preset.id
                ? 'bg-red-500/20 border border-red-500/50 text-red-400 shadow-lg shadow-red-500/20'
                : 'bg-black/40 border border-white/10 text-zinc-400 hover:bg-white/5 hover:border-white/20 hover:text-white'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Target Cards */}
      <div className="space-y-2">
        {filteredTargets.map((target) => (
          <motion.div
            key={target.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => onTargetSelect(target)}
            className={`cursor-pointer rounded-xl border p-3 transition-all hover:scale-[1.02] ${
              selectedTarget?.id === target.id
                ? 'border-red-500/50 bg-red-500/10 shadow-lg shadow-red-500/20'
                : 'border-white/10 bg-black/40 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Target Image */}
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center overflow-hidden">
                <Image
                  src={target.image}
                  alt={target.name}
                  width={64}
                  height={64}
                  className="object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="flex-1">
                <h4 className="font-bold text-white">{target.name}</h4>
                <div className="flex items-center gap-4 mt-1 text-xs text-zinc-400">
                  <span>HP: {target.totalHealth}</span>
                  <span>Броня: {target.armorRating}%</span>
                  <span>Снижение: {target.damageReduction}%</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-zinc-400">Защита</div>
                <div className="text-lg font-bold text-blue-400">
                  {target.penetrationResistance}%
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Target Diagram */}
      {renderTargetDiagram()}

      {/* Target Stats */}
      {selectedTarget && (
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h4 className="font-bold text-white mb-4">Характеристики цели</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Общее здоровье</span>
                <span className="text-white font-bold">{selectedTarget.totalHealth}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Рейтинг брони</span>
                <span className="text-blue-400 font-bold">{selectedTarget.armorRating}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Снижение урона</span>
                <span className="text-orange-400 font-bold">{selectedTarget.damageReduction}%</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Защита от пробития</span>
                <span className="text-purple-400 font-bold">{selectedTarget.penetrationResistance}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Категория</span>
                <span className="text-white font-bold capitalize">{selectedTarget.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Тип</span>
                <span className="text-white font-bold capitalize">{selectedTarget.type}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
