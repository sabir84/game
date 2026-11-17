import React, { useEffect, useState } from 'react';
import { Gift, Sparkles, Tv } from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';
import { Language } from '../types/game';
import { AdRewardType } from '../utils/admob';

interface RewardedAdModalProps {
  open: boolean;
  lang: Language;
  rewardType: AdRewardType | null;
  onComplete: () => void;
  onCancel: () => void;
}

export const RewardedAdModal: React.FC<RewardedAdModalProps> = ({
  open,
  lang,
  rewardType,
  onComplete,
  onCancel,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(2);

  useEffect(() => {
    if (!open) {
      setSecondsLeft(2);
      return;
    }

    setSecondsLeft(2);
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [open]);

  if (!open || !rewardType) return null;

  const t = TRANSLATIONS[lang];
  const isSecondChance = rewardType === 'SECOND_CHANCE';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rewarded-ad-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-sm rounded-3xl bg-[#1C140D] border border-[#D49B2A]/60 text-[#FFFDF8] p-6 shadow-2xl text-center space-y-5">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
          <Tv className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold text-amber-300">
            {t.ads.modalKicker}
          </p>
          <h3
            id="rewarded-ad-title"
            className="font-display text-xl font-extrabold"
          >
            {isSecondChance
              ? t.ads.modalSecondChanceTitle
              : t.ads.modalDoubleTitle}
          </h3>
          <p className="text-xs text-[#DFCEB2] leading-relaxed">
            {isSecondChance
              ? t.ads.modalSecondChanceDesc
              : t.ads.modalDoubleDesc}
          </p>
        </div>

        {secondsLeft > 0 ? (
          <div className="rounded-2xl bg-white/10 py-3 px-4 text-sm font-bold text-amber-200 tabular-nums">
            {t.ads.preparing(secondsLeft)}
          </div>
        ) : (
          <button
            type="button"
            onClick={onComplete}
            className="w-full min-h-[50px] rounded-2xl bg-gradient-to-l from-[#E09F1F] to-[#F5C042] hover:brightness-105 text-[#241606] font-display font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Gift className="w-4 h-4" />
            <span>{t.ads.claimReward}</span>
            <Sparkles className="w-4 h-4" />
          </button>
        )}

        {secondsLeft > 0 && (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs font-medium text-[#B8A48C] hover:text-white transition-colors py-1"
          >
            {t.ads.cancel}
          </button>
        )}
      </div>
    </div>
  );
};
