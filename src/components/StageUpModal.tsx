import React, { useState } from 'react';
import {
  Award,
  Building2,
  Check,
  Crown,
  Globe,
  Share2,
  Sparkles,
  Store,
} from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';
import { GameMode, Language, RankInfo, StageNumber } from '../types/game';
import {
  buildAchievementShareText,
  executeShare,
  generateAchievementCardFile,
  getShareGameUrl,
} from '../utils/share';

interface StageUpModalProps {
  rank: RankInfo | null;
  money: number;
  day: number;
  gameMode: GameMode;
  dateKey: string;
  lang: Language;
  onClose: () => void;
}

function StageBadgeIcon({ stage }: { stage: StageNumber }) {
  switch (stage) {
    case 2:
      return <Store className="w-10 h-10 text-amber-200" />;
    case 3:
      return <Building2 className="w-10 h-10 text-amber-200" />;
    case 4:
      return <Globe className="w-10 h-10 text-amber-200" />;
    default:
      return <Crown className="w-10 h-10 text-amber-200" />;
  }
}

export const StageUpModal: React.FC<StageUpModalProps> = ({
  rank,
  money,
  day,
  gameMode,
  dateKey,
  lang,
  onClose,
}) => {
  const [shareStatus, setShareStatus] = useState<'idle' | 'sharing' | 'shared' | 'copied'>('idle');

  if (!rank) return null;

  const t = TRANSLATIONS[lang];
  const content = rank.content[lang];

  const handleShareStageUp = async () => {
    if (shareStatus === 'sharing') return;
    setShareStatus('sharing');

    const { title, text } = buildAchievementShareText({
      lang,
      money,
      day,
      rank,
      isDaily: gameMode === 'daily',
      dateKey,
    });
    const imageFile = await generateAchievementCardFile({
      lang,
      money,
      day,
      rank,
      isDaily: gameMode === 'daily',
      dateKey,
    });

    const outcome = await executeShare({
      title,
      text,
      url: getShareGameUrl(),
      imageFile,
    });

    if (outcome === 'shared') {
      setShareStatus('shared');
    } else if (outcome === 'copied') {
      setShareStatus('copied');
    } else {
      setShareStatus('idle');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="stage-up-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl bg-[#FFFDF8] border-2 border-[#D49B2A] p-6 shadow-2xl text-center space-y-4 animate-card-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="inline-flex items-center gap-1.5 rounded-xl bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-extrabold text-amber-950">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>{t.stageModal.kicker(rank.stage)}</span>
        </div>

        {/* Celebratory Stage Badge */}
        <div className="mx-auto w-24 h-24 rounded-3xl bg-gradient-to-br from-[#0E7A53] via-[#145C43] to-[#0A432F] border-2 border-[#F2B735] shadow-lg flex flex-col items-center justify-center gap-1">
          <StageBadgeIcon stage={rank.stage} />
          <span className="text-[10px] font-extrabold tracking-wide text-amber-200">
            {t.stageLabel(rank.stage)}
          </span>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-bold text-[#8A6234]">
            {t.stageModal.headline}
          </p>
          <h2
            id="stage-up-title"
            className="font-display text-2xl font-extrabold text-[#1F150D]"
          >
            {content.title}
          </h2>
          <p className="text-xs font-bold text-[#145C43]">
            {content.stageName}
          </p>
        </div>

        <div className="rounded-2xl bg-[#FAF4E8] border border-[#E5D7BE] p-3.5 space-y-1.5">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#8A6234]">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>
              {t.stageModal.badgeLabel} · {content.rangeLabel}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#4B392A] leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {(shareStatus === 'shared' || shareStatus === 'copied') && (
          <p className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-900 flex items-center justify-center gap-1.5">
            <Check className="w-3.5 h-3.5 shrink-0" />
            <span>
              {shareStatus === 'shared' ? t.share.sharedToast : t.share.copiedToast}
            </span>
          </p>
        )}

        <div className="space-y-2">
          <button
            type="button"
            onClick={handleShareStageUp}
            disabled={shareStatus === 'sharing'}
            className="w-full min-h-[46px] rounded-2xl bg-[#FAF4E8] hover:bg-[#F3E8D4] border border-[#D49B2A] text-[#5C4128] font-display font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
          >
            <Share2 className="w-4 h-4 text-[#B46E09] shrink-0" />
            <span>{t.share.challengeFriends}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[50px] rounded-2xl bg-gradient-to-l from-[#0E7A53] to-[#145C43] hover:brightness-110 active:scale-[0.99] text-white font-display font-extrabold text-sm sm:text-base shadow-md transition-all"
          >
            {t.stageModal.continueBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
