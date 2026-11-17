import React from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Coins,
  Crown,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Tv,
} from 'lucide-react';
import { TRANSLATIONS, formatCompactMoney } from '../i18n/translations';
import { DecisionFeedback, Language } from '../types/game';

interface ResultFeedbackCardProps {
  feedback: DecisionFeedback;
  nextDay: number;
  lang: Language;
  showDoubleProfitOption: boolean;
  doubleProfitApplied: boolean;
  onWatchDoubleProfit: () => void;
  onContinue: () => void;
}

export const ResultFeedbackCard: React.FC<ResultFeedbackCardProps> = ({
  feedback,
  nextDay,
  lang,
  showDoubleProfitOption,
  doubleProfitApplied,
  onWatchDoubleProfit,
  onContinue,
}) => {
  const t = TRANSLATIONS[lang];
  const { impact, rankedUpTo, card, choiceDirection, outcomeText, gambleOutcome } =
    feedback;
  const chosenLabel = (
    choiceDirection === 'right' ? card.rightChoice : card.leftChoice
  ).content[lang].label;
  const resolvedOutcome = outcomeText[lang];

  const deltaItems = [
    {
      key: 'money',
      label: t.meters.money,
      val: impact.money,
      display:
        impact.money > 0
          ? `+${formatCompactMoney(impact.money, lang)}`
          : impact.money < 0
          ? formatCompactMoney(impact.money, lang)
          : `0 ${t.currencyShort}`,
      icon: <Coins className="w-4 h-4" />,
    },
    {
      key: 'reputation',
      label: t.meters.reputation,
      val: impact.reputation,
      display:
        impact.reputation > 0
          ? `+${impact.reputation} %`
          : impact.reputation < 0
          ? `${impact.reputation} %`
          : '0 %',
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      key: 'energy',
      label: t.meters.energy,
      val: impact.energy,
      display:
        impact.energy > 0
          ? `+${impact.energy} %`
          : impact.energy < 0
          ? `${impact.energy} %`
          : '0 %',
      icon: <HeartPulse className="w-4 h-4" />,
    },
    {
      key: 'experience',
      label: t.meters.experience,
      val: impact.experience,
      display:
        impact.experience > 0
          ? `+${impact.experience} %`
          : impact.experience < 0
          ? `${impact.experience} %`
          : '0 %',
      icon: <Award className="w-4 h-4" />,
    },
  ];

  const isRTL = lang === 'ar';

  return (
    <div className="w-full bg-[#FFFDF8] border border-[#DFCEB2] rounded-3xl p-5 sm:p-6 shadow-[0_14px_34px_-14px_rgba(62,40,20,0.18)] space-y-4 animate-card-enter">
      {rankedUpTo && (
        <div className="rounded-2xl bg-gradient-to-l from-[#145C43] to-[#1D7A59] text-[#FFFDF8] p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center shrink-0">
            <Crown className="w-5 h-5 text-amber-300" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-amber-200">
              {rankedUpTo.content[lang].stageName}
            </p>
            <p className="font-display text-lg font-extrabold leading-tight">
              {rankedUpTo.content[lang].title}
            </p>
          </div>
        </div>
      )}

      {gambleOutcome && (
        <div
          className={`rounded-2xl px-3.5 py-2 border flex items-center gap-2 text-xs font-extrabold ${
            gambleOutcome.succeeded
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}
        >
          {gambleOutcome.succeeded ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          )}
          <span>
            {gambleOutcome.succeeded
              ? t.feedback.gambleWon(gambleOutcome.successChance)
              : t.feedback.gambleLost(100 - gambleOutcome.successChance)}
          </span>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-xs font-bold text-[#8A6234]">
          {t.feedback.yourChoice} {chosenLabel}
        </p>
        <p className="font-display text-lg sm:text-xl font-bold text-[#1F150D] leading-relaxed">
          {resolvedOutcome}
        </p>
      </div>

      {/* Stat Impact Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        {deltaItems.map((item) => {
          const isPositive = item.val > 0;
          const isNegative = item.val < 0;

          return (
            <div
              key={item.key}
              className={`rounded-2xl p-3 border flex flex-col gap-1 ${
                isPositive
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : isNegative
                  ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                  : 'bg-[#F8F1E3] border-[#E7D8BE] text-[#6E563F]'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <span className="text-sm sm:text-base font-extrabold tabular-nums">
                {item.display}
              </span>
            </div>
          );
        })}
      </div>

      {/* Optional 5-Day Rewarded Ad Bonus */}
      {showDoubleProfitOption && !doubleProfitApplied && (
        <button
          type="button"
          onClick={onWatchDoubleProfit}
          className="w-full min-h-[48px] px-4 py-2 rounded-2xl bg-gradient-to-l from-[#E09F1F] to-[#F5C042] hover:brightness-105 active:scale-[0.99] text-[#241606] border border-[#B97B0C] font-display font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <Tv className="w-4 h-4 shrink-0" />
          <span>{t.ads.doubleProfitBtn}</span>
        </button>
      )}

      {doubleProfitApplied && (
        <div className="rounded-2xl bg-amber-50 border border-amber-300 px-3.5 py-2 flex items-center justify-center gap-1.5 text-xs font-bold text-amber-950">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>{t.feedback.doubleProfitApplied}</span>
        </div>
      )}

      <button
        type="button"
        onClick={onContinue}
        className="w-full min-h-[52px] rounded-2xl bg-[#145C43] hover:bg-[#0F4935] active:scale-[0.99] text-[#FFFDF8] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145C43]"
      >
        <span>{t.feedback.continueBtn(nextDay)}</span>
        {isRTL ? (
          <ArrowLeft className="w-4 h-4" />
        ) : (
          <ArrowRight className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};
