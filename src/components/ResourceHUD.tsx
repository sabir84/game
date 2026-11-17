import React from 'react';
import { Award, Coins, HeartPulse, ShieldCheck } from 'lucide-react';
import { getRankForMoney } from '../data/scenarios';
import { TRANSLATIONS, formatCompactMoney } from '../i18n/translations';
import { ChoiceImpact, Language, Stats } from '../types/game';

interface ResourceHUDProps {
  stats: Stats;
  lang: Language;
  previewImpact: ChoiceImpact | null;
  lastImpact: ChoiceImpact | null;
}

interface MeterConfig {
  key: keyof Stats;
  label: string;
  valueText: string;
  percent: number;
  icon: React.ReactNode;
  barColor: string;
  iconColor: string;
  danger: boolean;
  deltaPreview: number;
}

export const ResourceHUD: React.FC<ResourceHUDProps> = ({
  stats,
  lang,
  previewImpact,
}) => {
  const t = TRANSLATIONS[lang];
  const rank = getRankForMoney(stats.money);
  const moneyPercent = rank.nextTarget
    ? Math.min(
        100,
        Math.max(
          4,
          ((stats.money - rank.minMoney) / (rank.nextTarget - rank.minMoney)) *
            100
        )
      )
    : 100;

  const meters: MeterConfig[] = [
    {
      key: 'money',
      label: t.meters.money,
      valueText: formatCompactMoney(stats.money, lang),
      percent: moneyPercent,
      icon: <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
      barColor: stats.money <= 15 ? 'bg-red-600' : 'bg-amber-600',
      iconColor: stats.money <= 15 ? 'text-red-700' : 'text-amber-700',
      danger: stats.money <= 15,
      deltaPreview: previewImpact?.money ?? 0,
    },
    {
      key: 'reputation',
      label: t.meters.reputation,
      valueText: `${stats.reputation}%`,
      percent: stats.reputation,
      icon: <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
      barColor: stats.reputation <= 20 ? 'bg-red-600' : 'bg-emerald-700',
      iconColor: stats.reputation <= 20 ? 'text-red-700' : 'text-emerald-800',
      danger: stats.reputation <= 20,
      deltaPreview: previewImpact?.reputation ?? 0,
    },
    {
      key: 'energy',
      label: t.meters.energy,
      valueText: `${stats.energy}%`,
      percent: stats.energy,
      icon: <HeartPulse className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
      barColor: stats.energy <= 20 ? 'bg-red-600' : 'bg-amber-700',
      iconColor: stats.energy <= 20 ? 'text-red-700' : 'text-amber-800',
      danger: stats.energy <= 20,
      deltaPreview: previewImpact?.energy ?? 0,
    },
    {
      key: 'experience',
      label: t.meters.experience,
      valueText: `${stats.experience}%`,
      percent: stats.experience,
      icon: <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
      barColor: 'bg-teal-800',
      iconColor: 'text-teal-800',
      danger: false,
      deltaPreview: previewImpact?.experience ?? 0,
    },
  ];

  return (
    <section
      aria-label={t.meters.ariaLabel}
      className="shrink-0 grid grid-cols-4 gap-1.5 sm:gap-3 bg-[#FFFDF8] border border-[#E5D7BE] rounded-2xl p-2 sm:p-3 shadow-sm"
    >
      {meters.map((m) => {
        const hasPreview = m.deltaPreview !== 0;
        const isLargePreview = Math.abs(m.deltaPreview) >= 20;

        return (
          <div
            key={m.key}
            className="flex flex-col justify-between gap-1 min-w-0"
          >
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1 min-w-0">
                <span className={`${m.iconColor} shrink-0`}>{m.icon}</span>
                <span className="text-[11px] sm:text-xs font-bold text-[#3D2C1E] truncate">
                  {m.label}
                </span>
              </div>
              {hasPreview && (
                <span
                  aria-label={t.meters.previewAria}
                  className={`shrink-0 rounded-full transition-transform duration-150 ${
                    m.deltaPreview > 0 ? 'bg-emerald-600' : 'bg-amber-700'
                  } ${isLargePreview ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5'}`}
                />
              )}
            </div>

            <div className="flex items-baseline justify-between gap-1">
              <span
                className={`text-xs sm:text-base font-extrabold tabular-nums tracking-tight ${
                  m.danger ? 'text-red-700' : 'text-[#1F150D]'
                }`}
              >
                {m.valueText}
              </span>
              {m.danger && (
                <span className="text-[10px] font-bold text-red-700 hidden sm:inline">
                  {t.meters.critical}
                </span>
              )}
            </div>

            <div className="h-1.5 w-full bg-[#EFE5D2] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ease-out ${m.barColor}`}
                style={{ width: `${Math.max(4, Math.min(100, m.percent))}%` }}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
};
