import React from 'react';
import { X } from 'lucide-react';
import { RANKS } from '../data/scenarios';
import { TRANSLATIONS } from '../i18n/translations';
import { Language } from '../types/game';

interface RulesModalProps {
  open: boolean;
  lang: Language;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({
  open,
  lang,
  onClose,
}) => {
  if (!open) return null;
  const t = TRANSLATIONS[lang];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rules-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-[#FFFDF8] border border-[#E5D7BE] p-5 sm:p-6 shadow-xl space-y-4 max-h-[88dvh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#EFE3CC] pb-3">
          <h2
            id="rules-modal-title"
            className="font-display text-lg font-extrabold text-[#1F150D]"
          >
            {t.rulesModal.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.header.close}
            className="min-w-[40px] min-h-[40px] rounded-xl flex items-center justify-center text-[#5C4128] hover:bg-[#F3E8D4]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-sm text-[#4B392A] leading-relaxed">
          <p>{t.rulesModal.intro}</p>

          <div className="rounded-2xl bg-[#FAF4E8] p-3.5 space-y-1.5 text-xs">
            <p className="font-bold text-[#1F150D]">
              {t.rulesModal.metersTitle}
            </p>
            {t.rulesModal.metersList.map((item, idx) => (
              <p key={idx}>• {item}</p>
            ))}
          </div>

          <div className="rounded-2xl bg-[#FAF4E8] p-3.5 space-y-2 text-xs">
            <p className="font-bold text-[#1F150D]">
              {t.rulesModal.ranksTitle}
            </p>
            {RANKS.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <span className="font-bold text-[#145C43]">
                    {r.content[lang].title}
                  </span>
                  <span className="text-[11px] text-[#7A624B] mx-1.5">
                    ({t.stageLabel(r.stage)})
                  </span>
                </div>
                <span className="tabular-nums text-[#6E4F32] shrink-0">
                  {r.content[lang].rangeLabel}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-[46px] rounded-2xl bg-[#145C43] hover:bg-[#0F4935] text-white font-bold text-sm transition-colors"
        >
          {t.rulesModal.backBtn}
        </button>
      </div>
    </div>
  );
};
