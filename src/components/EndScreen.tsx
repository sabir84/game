import React from 'react';
import {
  AlertTriangle,
  Crown,
  Flame,
  RotateCcw,
  Sparkles,
  Trophy,
  Tv,
} from 'lucide-react';
import { getRankForMoney } from '../data/scenarios';
import { TRANSLATIONS } from '../i18n/translations';
import { Language, LossReason, Stats, StoredRecord } from '../types/game';

interface EndScreenProps {
  mode: 'VICTORY' | 'GAME_OVER';
  lossReason: LossReason;
  stats: Stats;
  day: number;
  lang: Language;
  record: StoredRecord;
  isNewRecord: boolean;
  onRestart: () => void;
  onWatchSecondChance?: () => void;
  onContinueEndless?: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({
  mode,
  lossReason,
  stats,
  day,
  lang,
  record,
  isNewRecord,
  onRestart,
  onWatchSecondChance,
  onContinueEndless,
}) => {
  const t = TRANSLATIONS[lang];
  const rank = getRankForMoney(stats.money);
  const isVictory = mode === 'VICTORY';
  const lossCopy = lossReason
    ? t.endScreen.losses[lossReason]
    : t.endScreen.losses.bankruptcy;

  return (
    <div
      className={`w-full max-w-md mx-auto bg-[#FFFDF8] rounded-3xl p-5 sm:p-6 text-center space-y-4 sm:space-y-5 animate-card-enter ${
        isVictory
          ? 'border-2 border-[#D49B2A] shadow-[0_18px_40px_-14px_rgba(185,123,12,0.35)]'
          : 'border border-[#DFCEB2] shadow-[0_14px_34px_-14px_rgba(62,40,20,0.2)]'
      }`}
    >
      <div
        className={`mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center ${
          isVictory
            ? 'bg-gradient-to-br from-[#D99617] via-[#F2B735] to-[#B97B0C] text-[#241606] border-2 border-[#FFE28A] shadow-md'
            : 'bg-amber-100 text-amber-900 border border-amber-300'
        }`}
      >
        {isVictory ? (
          <Crown className="w-8 h-8" />
        ) : (
          <AlertTriangle className="w-8 h-8" />
        )}
      </div>

      <div className="space-y-2">
        <p
          className={`text-xs font-bold ${
            isVictory ? 'text-[#B46E09]' : 'text-[#8A6234]'
          }`}
        >
          {isVictory
            ? t.endScreen.victoryKicker
            : t.endScreen.gameOverKicker(day)}
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1F150D] text-balance">
          {isVictory ? t.endScreen.victoryTitle : lossCopy.title}
        </h2>
        <p className="text-sm text-[#4B392A] leading-relaxed">
          {isVictory ? t.endScreen.victoryDesc : lossCopy.message}
        </p>
      </div>

      {isNewRecord && (
        <div className="rounded-2xl bg-amber-50 border border-amber-300 px-4 py-2.5 flex items-center justify-center gap-2 text-xs font-extrabold text-amber-950">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>{t.endScreen.newRecord}</span>
        </div>
      )}

      {/* Final Summary Metrics */}
      <div
        className={`grid grid-cols-2 gap-2.5 ${
          lang === 'ar' ? 'text-right' : 'text-left'
        }`}
      >
        <div className="rounded-2xl bg-[#FAF4E8] border border-[#E7D8BE] p-3 min-w-0">
          <span className="text-[11px] font-semibold text-[#7A624B]">
            {t.endScreen.finalBalance}
          </span>
          <p className="font-display text-sm sm:text-base font-extrabold text-[#1F150D] tabular-nums break-words">
            {stats.money.toLocaleString('en-US')} {t.currencyFull}
          </p>
        </div>

        <div className="rounded-2xl bg-[#FAF4E8] border border-[#E7D8BE] p-3 min-w-0">
          <span className="text-[11px] font-semibold text-[#7A624B]">
            {t.endScreen.rankAchieved}
          </span>
          <p className="font-display text-sm sm:text-base font-extrabold text-[#145C43] truncate">
            {rank.content[lang].title}
          </p>
        </div>

        <div className="rounded-2xl bg-[#FAF4E8] border border-[#E7D8BE] p-3 min-w-0">
          <span className="text-[11px] font-semibold text-[#7A624B]">
            {t.meters.experience}
          </span>
          <p className="text-sm font-bold text-[#1F150D] tabular-nums">
            {t.endScreen.daysAndXp(day, stats.experience)}
          </p>
        </div>

        <div className="rounded-2xl bg-[#FAF4E8] border border-[#E7D8BE] p-3 min-w-0">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7A624B]">
            <Trophy className="w-3 h-3 text-amber-700" />
            {t.endScreen.highScore}
          </span>
          <p className="text-xs sm:text-sm font-extrabold text-[#1F150D] tabular-nums break-words">
            {record.highScoreMoney.toLocaleString('en-US')} {t.currencyFull}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2.5 pt-1">
        {!isVictory && onWatchSecondChance && (
          <button
            type="button"
            onClick={onWatchSecondChance}
            className="w-full min-h-[54px] px-4 py-2.5 rounded-2xl bg-gradient-to-l from-[#D99617] via-[#F2B735] to-[#E29F1D] hover:brightness-105 active:scale-[0.99] text-[#241606] border border-[#B97B0C] font-display font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B97B0C]"
          >
            <Tv className="w-4 h-4 shrink-0" />
            <span>{t.ads.secondChanceBtn}</span>
          </button>
        )}

        {isVictory && onContinueEndless && (
          <button
            type="button"
            onClick={onContinueEndless}
            className="w-full min-h-[48px] rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Flame className="w-4 h-4" />
            <span>{t.endScreen.continueEndless}</span>
          </button>
        )}

        <button
          type="button"
          onClick={onRestart}
          className="w-full min-h-[52px] rounded-2xl bg-[#145C43] hover:bg-[#0F4935] active:scale-[0.99] text-[#FFFDF8] font-display font-extrabold text-base flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.endScreen.playAgain}</span>
        </button>
      </div>
    </div>
  );
};
