import React, { useState } from 'react';
import {
  Award,
  Calendar,
  Check,
  Coins,
  Crown,
  HeartPulse,
  Play,
  Share2,
  ShieldCheck,
  Trophy,
} from 'lucide-react';
import { RANKS, getRankForMoney } from '../data/scenarios';
import { TRANSLATIONS, formatCompactMoney } from '../i18n/translations';
import { DailyRecord, Language, StoredRecord } from '../types/game';
import {
  buildAchievementShareText,
  executeShare,
  formatEmojiTrail,
  generateAchievementCardFile,
  getShareGameUrl,
} from '../utils/share';
import { PWAInstallButton } from './PWAInstallButton';

interface TitleScreenProps {
  record: StoredRecord;
  dailyRecord: DailyRecord | null;
  todayDateKey: string;
  lang: Language;
  onStart: () => void;
  onStartDaily: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  record,
  dailyRecord,
  todayDateKey,
  lang,
  onStart,
  onStartDaily,
}) => {
  const [imgError, setImgError] = useState(false);
  const [dailyShareState, setDailyShareState] = useState<
    'idle' | 'shared' | 'copied'
  >('idle');
  const t = TRANSLATIONS[lang];

  const hasPlayedDailyToday =
    dailyRecord !== null && dailyRecord.dateKey === todayDateKey;

  const handleShareSavedDaily = async () => {
    if (!hasPlayedDailyToday || !dailyRecord) return;
    const rank = getRankForMoney(dailyRecord.bestMoney);
    const { title, text } = buildAchievementShareText({
      lang,
      money: dailyRecord.bestMoney,
      day: dailyRecord.bestDay,
      rank,
      isVictory: dailyRecord.won,
      isDaily: true,
      dateKey: todayDateKey,
      emojis: dailyRecord.emojis,
    });
    const imageFile = await generateAchievementCardFile({
      lang,
      money: dailyRecord.bestMoney,
      day: dailyRecord.bestDay,
      rank,
      isVictory: dailyRecord.won,
      isDaily: true,
      dateKey: todayDateKey,
      emojis: dailyRecord.emojis,
    });
    const outcome = await executeShare({
      title,
      text,
      url: getShareGameUrl(),
      imageFile,
    });
    if (outcome === 'shared') setDailyShareState('shared');
    else if (outcome === 'copied') setDailyShareState('copied');
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center gap-4 sm:gap-5 py-2 sm:py-6">
      {/* Emblem */}
      <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-[#D49B2A] shadow-md bg-[#0F5C3E] animate-float-subtle shrink-0">
        {!imgError ? (
          <img
            src="./src/assets/images/app_icon_emblem_1794840094572.jpg"
            alt={t.titleScreen.headline}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-amber-300 font-display font-extrabold text-3xl">
            20
          </div>
        )}
      </div>

      {/* Title & Story Hook */}
      <div className="space-y-1.5 sm:space-y-2 max-w-md">
        <p className="text-xs font-bold text-[#8A6234]">
          {t.titleScreen.kicker}
        </p>
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1F150D] leading-tight text-balance">
          {t.titleScreen.headline}
        </h1>
        <p className="text-xs sm:text-base text-[#4B392A] leading-relaxed">
          {t.titleScreen.premise}
        </p>
      </div>

      {/* Starting Meters Summary */}
      <div className="w-full grid grid-cols-4 gap-2 bg-[#FFFDF8] border border-[#E5D7BE] rounded-2xl p-2.5 sm:p-3 text-xs">
        <div className="flex flex-col items-center gap-1">
          <Coins className="w-4 h-4 text-amber-700" />
          <span className="font-bold text-[#1F150D] tabular-nums">
            20 {t.currencyShort}
          </span>
          <span className="text-[11px] text-[#7A624B]">
            {t.titleScreen.capitalLabel}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-emerald-800" />
          <span className="font-bold text-[#1F150D] tabular-nums">50%</span>
          <span className="text-[11px] text-[#7A624B]">
            {t.titleScreen.repLabel}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <HeartPulse className="w-4 h-4 text-amber-800" />
          <span className="font-bold text-[#1F150D] tabular-nums">80%</span>
          <span className="text-[11px] text-[#7A624B]">
            {t.titleScreen.energyLabel}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Award className="w-4 h-4 text-teal-800" />
          <span className="font-bold text-[#1F150D] tabular-nums">10%</span>
          <span className="text-[11px] text-[#7A624B]">
            {t.titleScreen.xpLabel}
          </span>
        </div>
      </div>

      {/* Daily Seeded Challenge Card */}
      <div
        className={`w-full rounded-2xl bg-gradient-to-br from-[#F4EBD7] to-[#FFFDF8] border-2 border-[#D49B2A] p-3.5 sm:p-4 space-y-2.5 shadow-xs ${
          lang === 'ar' ? 'text-right' : 'text-left'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#145C43] text-amber-300 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-sm sm:text-base font-extrabold text-[#1F150D] truncate">
                {t.daily.title}
              </h2>
              <p className="text-[11px] font-bold text-[#8A6234] tabular-nums">
                {todayDateKey}
              </p>
            </div>
          </div>

          {hasPlayedDailyToday && dailyRecord && (
            <div className="text-end shrink-0">
              <span className="block text-[10px] font-bold text-[#7A624B]">
                {t.daily.bestToday}
              </span>
              <span className="font-display text-xs sm:text-sm font-extrabold text-[#145C43] tabular-nums">
                {formatCompactMoney(dailyRecord.bestMoney, lang)}
              </span>
            </div>
          )}
        </div>

        <p className="text-xs text-[#4B392A] leading-relaxed">
          {t.daily.subtitle}
        </p>

        {hasPlayedDailyToday && dailyRecord && dailyRecord.emojis.length > 0 && (
          <div className="rounded-xl bg-[#FFFDF8] border border-[#E5D7BE] px-3 py-2 text-center">
            <p dir="ltr" className="text-sm tracking-wider whitespace-pre-line">
              {formatEmojiTrail(
                dailyRecord.emojis,
                dailyRecord.won,
                !dailyRecord.won
              )}
            </p>
          </div>
        )}

        {dailyShareState !== 'idle' && (
          <p className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
            <Check className="w-3.5 h-3.5 shrink-0" />
            <span>
              {dailyShareState === 'shared'
                ? t.share.sharedToast
                : t.share.copiedToast}
            </span>
          </p>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onStartDaily}
            className="flex-1 min-h-[44px] px-3 rounded-xl bg-[#D99617] hover:bg-[#C38411] active:scale-[0.99] text-[#241606] font-display font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-all"
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>
              {hasPlayedDailyToday ? t.daily.replayBtn : t.daily.playBtn}
            </span>
          </button>

          {hasPlayedDailyToday && (
            <button
              type="button"
              onClick={handleShareSavedDaily}
              className="min-h-[44px] px-3 rounded-xl bg-[#FFFDF8] hover:bg-[#EFE4CE] border border-[#D49B2A] text-[#5C4128] font-display font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0"
            >
              <Share2 className="w-4 h-4 text-[#B46E09]" />
              <span>{t.share.shareDailyResult}</span>
            </button>
          )}
        </div>
      </div>

      {/* 4-Stage Milestones + Billionaire Summit */}
      <div
        className={`w-full bg-[#FFFDF8] border border-[#E5D7BE] rounded-2xl p-3.5 sm:p-4 space-y-2.5 ${
          lang === 'ar' ? 'text-right' : 'text-left'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-bold text-[#6E4F32] gap-2">
          <span>{t.titleScreen.ranksTitle}</span>
          {record.highScoreMoney > 20 && (
            <span className="inline-flex items-center gap-1 text-amber-800 tabular-nums shrink-0">
              <Trophy className="w-3.5 h-3.5" />
              {t.highScoreLabel}: {formatCompactMoney(record.highScoreMoney, lang)}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {RANKS.slice(0, 4).map((rank) => (
            <div
              key={rank.id}
              className="rounded-xl bg-[#FAF4E8] px-3 py-2 flex flex-col gap-0.5"
            >
              <span className="text-[11px] font-bold text-[#8A6234] truncate">
                {t.stageLabel(rank.stage)}
              </span>
              <span className="text-xs font-extrabold text-[#1F150D] truncate">
                {rank.content[lang].title}
              </span>
              <span className="text-[11px] font-medium text-[#7A624B] tabular-nums">
                {rank.content[lang].rangeLabel}
              </span>
            </div>
          ))}
        </div>

        {/* Legendary Billionaire Summit */}
        {RANKS[4] && (
          <div className="rounded-xl bg-gradient-to-l from-amber-100/90 to-[#FAF4E8] border border-amber-300 px-3 py-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Crown className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="text-xs font-extrabold text-[#1F150D] truncate">
                {RANKS[4].content[lang].title}
              </span>
            </div>
            <span className="text-[11px] font-extrabold text-amber-900 tabular-nums shrink-0">
              {RANKS[4].content[lang].rangeLabel}
            </span>
          </div>
        )}
      </div>

      {/* Primary Action */}
      <div className="w-full flex flex-col sm:flex-row items-center gap-2.5">
        <button
          type="button"
          onClick={onStart}
          className="w-full min-h-[52px] rounded-2xl bg-[#145C43] hover:bg-[#0F4935] active:scale-[0.99] text-[#FFFDF8] font-display font-extrabold text-base flex items-center justify-center gap-2 shadow-md transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145C43]"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>{t.titleScreen.startBtn}</span>
        </button>
        <PWAInstallButton lang={lang} />
      </div>
    </div>
  );
};
