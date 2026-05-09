"use client";

import { DamageCalculation } from "@/types/ammo";
import { CheckCircle, AlertTriangle, Target, Zap, Shield } from "lucide-react";

interface RecommendationPanelProps {
  calculation: DamageCalculation | null;
  weaponName?: string;
  distance: number;
}

export default function RecommendationPanel({ calculation, weaponName, distance }: RecommendationPanelProps) {
  if (!calculation) {
    return null;
  }

  const getRecommendations = () => {
    const recommendations = [];
    const warnings = [];

    // Effectiveness based
    if (calculation.effectiveness === 'optimal') {
      recommendations.push("Идеальный выбор! Это оружие и патроны максимально эффективны против цели.");
    }
    
    if (calculation.penetrationChance > 80) {
      recommendations.push("Высокий шанс пробития брони - отлично против бронированных целей.");
    }
    
    if (calculation.dps > 100) {
      recommendations.push("Высокий DPS - быстро уничтожает цели.");
    }
    
    if (calculation.finalDamage > 50) {
      recommendations.push("Большой урон за выстрел - эффективно для снайперской дуели.");
    }
    
    if (distance <= 50 && calculation.finalDamage > 80) {
      recommendations.push("Отлично для ближнего боя в помещениях.");
    }

    // Warnings
    if (calculation.ttk > 5) {
      warnings.push("TTK довольно высокий - рассмотрите более мощные патроны.");
    }
    
    if (calculation.penetrationChance < 30) {
      warnings.push("Низкое пробитие - используйте AP или урановые патроны против брони.");
    }
    
    if (distance > 300 && !calculation.ammoType.armorPiercing && !calculation.ammoType.uranium) {
      warnings.push("На больших дистанциях используйте бронебойные или урановые патроны.");
    }
    
    if (calculation.criticalChance < 5) {
      warnings.push("Низкий шанс крита - не полагайтесь на удачу.");
    }

    return { recommendations, warnings };
  };

  const getBestAmmoForTarget = () => {
    const target = calculation.targetType;
    
    if (target.armorRating >= 70) {
      return {
        type: "Урановые/AP",
        reason: "Требуется высокое пробитие для тяжелой брони",
        ammo: ["Урановые", "Бронебойные"]
      };
    }
    
    if (target.category === 'robot') {
      return {
        type: "Урановые/Взрывные",
        reason: "Роботы уязвимы к урану и взрывам",
        ammo: ["Урановые", "Взрывные"]
      };
    }
    
    if (target.category === 'vehicle') {
      return {
        type: "Тяжелые/Взрывные",
        reason: "Техника требует мощных патронов",
        ammo: [".50 BMG", "Взрывные"]
      };
    }
    
    if (target.category === 'puppet') {
      return {
        type: "Высокий урон",
        reason: "Puppet имеют уязвимость к урону в голову",
        ammo: ["Hollow Point", "Высокоуронные"]
      };
    }
    
    return {
      type: "Стандартные",
      reason: "Обычные патроны эффективны против этой цели",
      ammo: ["Стандартные", "Бронебойные"]
    };
  };

  const getTacticalTips = () => {
    const tips = [];
    
    if (distance > 300) {
      tips.push({
        icon: Target,
        text: "На больших дистанциях старайтесь целиться в голову",
        priority: "high"
      });
    }
    
    if (calculation.penetrationChance < 50) {
      tips.push({
        icon: Shield,
        text: "Смените патроны на бронебойные для повышения эффективности",
        priority: "high"
      });
    }
    
    if (calculation.finalDamage < 30) {
      tips.push({
        icon: Zap,
        text: "Урон слишком низкий - сократите дистанцию или используйте более мощное оружие",
        priority: "high"
      });
    }
    
    if (distance <= 25) {
      tips.push({
        icon: Zap,
        text: "В ближнем бою используйте оружие с высокой скорострельностью",
        priority: "medium"
      });
    }
    
    if (calculation.ammoType.category === 'shotgun' && distance > 50) {
      tips.push({
        icon: AlertTriangle,
        text: "Дробовики неэффективны на этой дистанции",
        priority: "high"
      });
    }
    
    return tips;
  };

  const { recommendations, warnings } = getRecommendations();
  const bestAmmo = getBestAmmoForTarget();
  const tacticalTips = getTacticalTips();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <h3 className="font-semibold text-green-400">✅ Рекомендации</h3>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5"></div>
                <span className="text-sm text-zinc-300">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Ammo */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-blue-400" />
          <h3 className="font-semibold text-blue-400">🎯 Лучшие патроны</h3>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-white mb-1">{bestAmmo.type}</p>
            <p className="text-xs text-zinc-400 mb-2">{bestAmmo.reason}</p>
            <div className="flex gap-1 flex-wrap">
              {bestAmmo.ammo.map((ammo, index) => (
                <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                  {ammo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <h3 className="font-semibold text-yellow-400">⚡ Тактические советы</h3>
          </div>
          <div className="space-y-3">
            {warnings.map((warning, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1.5"></div>
                <span className="text-sm text-zinc-300">{warning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tactical Tips */}
      {tacticalTips.length > 0 && (
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-purple-400" />
            <h3 className="font-semibold text-purple-400">🎮 Тактика</h3>
          </div>
          <div className="space-y-3">
            {tacticalTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="flex items-start gap-2">
                  <Icon className="h-4 w-4 text-purple-400 mt-0.5" />
                  <span className="text-sm text-zinc-300">{tip.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
