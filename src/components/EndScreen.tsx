import React, { useState } from 'react';
import {
  AlertTriangle,
  Calendar,
  Check,
  Crown,
  Flame,
  RotateCcw,
  Share2,
  Sparkles,
  Trophy,
  Tv,
} from 'lucide-react';
import { getRankForMoney } from '../data/scenarios';
import { TRANSLATIONS } from '../i18n/translations';
import {
  GameMode,
  Language,
  LossReason,
  Stats,
  StoredRecord,
  TurnEmoji,
} from '../types/game';
import {
  ShareOutcome,
  buildAchievementShareText,
  executeShare,
  formatEmojiTrail,
  generateAchievementCardFile,
  getShareGameUrl,
} from '../utils/share';

interface EndScreenProps {
  mode: 'VICTORY' | 'GAME_OVER';
  gameMode: GameMode;
  dateKey: string;
  emojis: TurnEmoji[];
  lossReason: LossReason;
  stats: Stats;
  day: number;
  lang: Language;
  record: StoredRecord;
  isNewRecord: boolean;
  onRestart: () => void;
  onWatchSecondChance?: () => void;
  onShareSecondChance?: () => Promise<ShareOutcome>;
  onContinueEndless?: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({
  mode,
  gameMode,
  dateKey,
  emojis,
  lossReason,
  stats,
  day,
  lang,
  record,
  isNewRecord,
  onRestart,
  onWatchSecondChance,
  onShareSecondChance,
  onContinueEndless,
}) => {
  const [shareFeedback, setShareFeedback] = useState<
    'idle' | 'sharing' | 'shared' | 'copied' | 'cancelled'
  >('idle');

  const t = TRANSLATIONS[lang];
  const rank = getRankForMoney(stats.money);
  const isVictory = mode === 'VICTORY';
  const isDaily = gameMode === 'daily';
  const lossCopy = lossReason
    ? t.endScreen.losses[lossReason]
    : t.endScreen.losses.bankruptcy;

  const emojiTrailText = formatEmojiTrail(emojis, isVictory, !isVictory);

  const handleChallengeFriends = async () => {
    if (shareFeedback === 'sharing') return;
    setShareFeedback('sharing');

    const { title, text } = buildAchievementShareText({
      lang,
      money: stats.money,
      day,
      rank,
      isVictory,
      isDaily,
      dateKey,
      emojis,
    });
    const imageFile = await generateAchievementCardFile({
      lang,
      money: stats.money,
      day,
      rank,
      isVictory,
      isDaily,
      dateKey,
      emojis,
    });

    const outcome = await executeShare({
      title,
      text,
      url: getShareGameUrl(),
      imageFile,
    });

    if (outcome === 'shared') {
      setShareFeedback('shared');
    } else if (outcome === 'copied') {
      setShareFeedback('copied');
    } else {
      setShareFeedback('idle');
    }
  };

  const handleInstantShareRevive = async () => {
    if (!onShareSecondChance || shareFeedback === 'sharing') return;
    setShareFeedback('sharing');
    const outcome = await onShareSecondChance();
    if (outcome === 'cancelled' || outcome === 'failed') {
      setShareFeedback('cancelled');
    } else {
      setShareFeedback('idle');
    }
  };

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
        {isDaily && (
          <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-extrabold text-[#145C43]">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>
              {t.daily.badge} · {dateKey}
            </span>
          </div>
        )}

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

      {/* Daily Challenge Spoiler-Free Emoji Summary */}
      {isDaily && (
        <div className="rounded-2xl bg-[#FAF4E8] border border-[#E5D7BE] px-4 py-3 space-y-1.5">
          <p className="text-[11px] font-bold text-[#6E4F32]">
            {t.daily.emojiTitle}
          </p>
          <p
            dir="ltr"
            className="text-base sm:text-lg tracking-wider leading-relaxed whitespace-pre-line select-all"
          >
            {emojiTrailText}
          </p>
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

      {shareFeedback !== 'idle' && shareFeedback !== 'sharing' && (
        <div
          className={`rounded-2xl px-3.5 py-2 border text-xs font-bold flex items-center justify-center gap-1.5 ${
            shareFeedback === 'cancelled'
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-emerald-50 border-emerald-300 text-emerald-950'
          }`}
        >
          {shareFeedback === 'cancelled' ? (
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <Check className="w-3.5 h-3.5 shrink-0" />
          )}
          <span>
            {shareFeedback === 'shared'
              ? t.share.sharedToast
              : shareFeedback === 'copied'
              ? t.share.copiedToast
              : t.share.shareCancelled}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2.5 pt-1">
        {!isVictory && onShareSecondChance && (
          <button
            type="button"
            onClick={handleInstantShareRevive}
            disabled={shareFeedback === 'sharing'}
            className="w-full min-h-[52px] px-4 py-2.5 rounded-2xl bg-gradient-to-l from-[#0E7A53] to-[#178E63] hover:brightness-105 active:scale-[0.99] text-white border border-[#0A593C] font-display font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-60"
          >
            <Share2 className="w-4 h-4 shrink-0" />
            <span>{t.share.shareSecondChanceBtn}</span>
          </button>
        )}

        {!isVictory && onWatchSecondChance && (
          <button
            type="button"
            onClick={onWatchSecondChance}
            className="w-full min-h-[50px] px-4 py-2 rounded-2xl bg-gradient-to-l from-[#D99617] via-[#F2B735] to-[#E29F1D] hover:brightness-105 active:scale-[0.99] text-[#241606] border border-[#B97B0C] font-display font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B97B0C]"
          >
            <Tv className="w-4 h-4 shrink-0" />
            <span>{t.ads.secondChanceBtn}</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleChallengeFriends}
          disabled={shareFeedback === 'sharing'}
          className="w-full min-h-[48px] px-4 py-2 rounded-2xl bg-[#FAF4E8] hover:bg-[#F3E8D4] border-2 border-[#D49B2A] text-[#5C4128] font-display font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
        >
          <Share2 className="w-4 h-4 text-[#B46E09] shrink-0" />
          <span>
            {isDaily ? t.share.shareDailyResult : t.share.challengeFriends}
          </span>
        </button>

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
