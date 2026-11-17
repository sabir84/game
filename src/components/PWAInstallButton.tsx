import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { TRANSLATIONS } from '../i18n/translations';
import { Language } from '../types/game';

interface PWAInstallButtonProps {
  lang: Language;
  compact?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  lang,
  compact = false,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const t = TRANSLATIONS[lang];

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        aria-label={t.header.install}
        title={t.header.install}
        className="min-h-[36px] sm:min-h-[40px] inline-flex items-center gap-1.5 rounded-xl bg-[#145C43] hover:bg-[#0F4935] px-2.5 sm:px-3 py-1.5 text-xs font-bold text-[#FFFDF8] shadow-sm transition-colors whitespace-nowrap shrink-0"
      >
        <Download className="w-3.5 h-3.5" />
        <span className={compact ? 'hidden sm:inline' : ''}>
          {t.header.install}
        </span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          aria-label={t.header.installShort}
          title={t.header.installShort}
          className="min-h-[36px] sm:min-h-[40px] inline-flex items-center gap-1.5 rounded-xl border border-[#D4BC96] bg-[#FFFDF8] hover:bg-[#F5EBD7] px-2.5 py-1.5 text-xs font-bold text-[#3D2C1E] transition-colors whitespace-nowrap shrink-0"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className={compact ? 'hidden sm:inline' : ''}>
            {t.header.installShort}
          </span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-3xl bg-[#FFFDF8] border border-[#E5D7BE] p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-extrabold text-[#1F150D]">
                  {t.header.iosInstallTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label={t.header.close}
                  className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-[#5C4128] hover:bg-[#F3E8D4]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ol className="mt-3 space-y-2 text-sm text-[#4B392A] leading-relaxed list-decimal list-inside">
                <li>{t.header.iosStep1}</li>
                <li>{t.header.iosStep2}</li>
              </ol>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full min-h-[44px] rounded-2xl bg-[#145C43] text-white font-bold text-sm hover:bg-[#0F4935] transition-colors"
              >
                {t.header.iosDone}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
