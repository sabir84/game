import React, { useRef, useState } from 'react';
import {
  Check,
  Compass,
  HandCoins,
  Sparkles,
  Store,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import { CATEGORY_IMAGES } from '../data/scenarios';
import { TRANSLATIONS, formatChoiceImpactLine } from '../i18n/translations';
import {
  CardCategory,
  ChoiceImpact,
  Language,
  ScenarioCard,
} from '../types/game';
import { soundEngine } from '../utils/sound';

interface SwipeCardProps {
  card: ScenarioCard;
  day: number;
  lang: Language;
  isDisabled: boolean;
  onChoose: (direction: 'right' | 'left') => void;
  onPreviewChange: (impact: ChoiceImpact | null) => void;
}

const SWIPE_THRESHOLD = 85;

function CategoryFallbackIcon({ category }: { category: CardCategory }) {
  switch (category) {
    case 'trade':
      return <Store className="w-9 h-9 text-amber-800/70" />;
    case 'craft':
      return <Wrench className="w-9 h-9 text-emerald-900/70" />;
    case 'community':
      return <Users className="w-9 h-9 text-amber-900/70" />;
    case 'opportunity':
      return <Compass className="w-9 h-9 text-emerald-900/70" />;
  }
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  card,
  day,
  lang,
  isDisabled,
  onChoose,
  onPreviewChange,
}) => {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [exitDir, setExitDir] = useState<'right' | 'left' | null>(null);
  const [imgError, setImgError] = useState(false);

  const startXRef = useRef<number>(0);
  const pointerIdRef = useRef<number | null>(null);
  const crossedThresholdRef = useRef<'right' | 'left' | null>(null);

  const t = TRANSLATIONS[lang];
  const cardText = card.content[lang];
  const rightText = card.rightChoice.content[lang];
  const leftText = card.leftChoice.content[lang];
  const isRTL = lang === 'ar';

  const triggerChoice = (dir: 'right' | 'left') => {
    if (isDisabled || exitDir) return;
    setExitDir(dir);
    onPreviewChange(null);
    window.setTimeout(() => {
      onChoose(dir);
    }, 180);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDisabled || exitDir) return;
    pointerIdRef.current = e.pointerId;
    startXRef.current = e.clientX;
    crossedThresholdRef.current = null;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerIdRef.current !== e.pointerId) return;
    const dx = e.clientX - startXRef.current;
    setDragX(dx);

    if (dx > 36) {
      onPreviewChange(card.rightChoice.impact);
      if (dx >= SWIPE_THRESHOLD && crossedThresholdRef.current !== 'right') {
        crossedThresholdRef.current = 'right';
        soundEngine.playSwipeThreshold();
      }
    } else if (dx < -36) {
      onPreviewChange(card.leftChoice.impact);
      if (dx <= -SWIPE_THRESHOLD && crossedThresholdRef.current !== 'left') {
        crossedThresholdRef.current = 'left';
        soundEngine.playSwipeThreshold();
      }
    } else {
      crossedThresholdRef.current = null;
      onPreviewChange(null);
    }
  };

  const finishDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerIdRef.current !== e.pointerId) return;
    setIsDragging(false);
    pointerIdRef.current = null;

    if (dragX >= SWIPE_THRESHOLD) {
      triggerChoice('right');
    } else if (dragX <= -SWIPE_THRESHOLD) {
      triggerChoice('left');
    } else {
      setDragX(0);
      onPreviewChange(null);
    }
  };

  const rightOpacity = Math.min(1, Math.max(0, (dragX - 24) / 70));
  const leftOpacity = Math.min(1, Math.max(0, (-dragX - 24) / 70));

  let transformStyle = `translate3d(${dragX}px, ${Math.abs(dragX) * -0.04}px, 0) rotate(${dragX * 0.05}deg)`;
  let opacityStyle = 1;

  if (exitDir === 'right') {
    transformStyle = 'translate3d(420px, -24px, 0) rotate(14deg)';
    opacityStyle = 0;
  } else if (exitDir === 'left') {
    transformStyle = 'translate3d(-420px, -24px, 0) rotate(-14deg)';
    opacityStyle = 0;
  }

  const rightImpactText = formatChoiceImpactLine(card.rightChoice, lang);
  const leftImpactText = formatChoiceImpactLine(card.leftChoice, lang);

  return (
    <div className="w-full flex-1 min-h-0 flex flex-col justify-between gap-2.5 sm:gap-3.5 select-none">
      {/* Card Stack Container */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col pb-1.5">
        {/* Subtle next card deck layer underneath */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 bottom-0 top-2 rounded-3xl bg-[#F3E8D4] border border-[#E0CEAE]"
        />

        {/* Active Draggable Card */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          style={{
            transform: transformStyle,
            opacity: opacityStyle,
            touchAction: 'pan-y',
          }}
          className={`relative z-10 flex-1 min-h-0 flex flex-col animate-card-enter bg-[#FFFDF8] rounded-3xl shadow-[0_10px_28px_-12px_rgba(62,40,20,0.18)] overflow-hidden cursor-grab active:cursor-grabbing ${
            card.isRare
              ? 'border-2 border-amber-500 ring-2 ring-amber-300/40'
              : 'border border-[#DFCEB2]'
          } ${
            isDragging
              ? 'transition-none'
              : 'transition-[transform,opacity] duration-200 ease-out'
          }`}
        >
          {/* Swipe Choice Stamp Overlays (physically anchored right & left) */}
          {rightOpacity > 0.05 && (
            <div
              style={{ opacity: rightOpacity }}
              className="pointer-events-none absolute top-3 right-3 z-20 rounded-xl border-2 border-emerald-700 bg-emerald-50/95 px-2.5 py-1 text-xs font-extrabold text-emerald-900 shadow-sm rotate-3"
            >
              {rightText.label}
            </div>
          )}
          {leftOpacity > 0.05 && (
            <div
              style={{ opacity: leftOpacity }}
              className="pointer-events-none absolute top-3 left-3 z-20 rounded-xl border-2 border-amber-700 bg-amber-50/95 px-2.5 py-1 text-xs font-extrabold text-amber-950 shadow-sm -rotate-3"
            >
              {leftText.label}
            </div>
          )}

          {/* Compact Card Artwork Banner */}
          <div className="relative h-[21dvh] min-h-[100px] max-h-[144px] sm:max-h-[176px] w-full shrink-0 bg-[#EFE3CC] overflow-hidden">
            {!imgError ? (
              <img
                src={CATEGORY_IMAGES[card.category]}
                alt={cardText.title}
                referrerPolicy="no-referrer"
                draggable={false}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F3E4C8] via-[#E8D2AA] to-[#D9BC8C] gap-1.5">
                <CategoryFallbackIcon category={card.category} />
                <span className="text-xs font-bold text-[#5C4128]">
                  {cardText.categoryLabel}
                </span>
              </div>
            )}
            {card.isRare && (
              <div className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1 rounded-xl bg-amber-400/95 text-[#231504] border border-amber-200 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-extrabold shadow-sm">
                <Sparkles className="w-3 h-3 shrink-0" />
                <span>{card.rareTag?.[lang] ?? t.card.rareDefault}</span>
              </div>
            )}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#241911]/65 to-transparent"
            />
            <div className="absolute bottom-2 right-3 left-3 flex items-center justify-between gap-2 text-[11px] sm:text-xs font-semibold text-[#FFF8EB]">
              <span className="truncate">{cardText.character}</span>
              <span className="tabular-nums shrink-0 opacity-95">
                {t.dayCount(day)}
              </span>
            </div>
          </div>

          {/* Compact Card Body */}
          <div className="p-3 sm:p-4 flex-1 min-h-0 flex flex-col justify-between gap-1.5 overflow-y-auto">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#8A6234]">
                <span>{t.stageLabel(card.stage)}</span>
                <span aria-hidden="true">·</span>
                <span>{cardText.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {t.card.cardPrefix}
                  {card.id}
                </span>
              </div>

              <h2 className="font-display text-base sm:text-xl font-extrabold text-[#1F150D] leading-snug">
                {cardText.title}
              </h2>

              <p className="text-xs sm:text-[15px] leading-relaxed text-[#4B392A]">
                {cardText.description}
              </p>
            </div>

            <div className="pt-0.5 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-[#8D745B] shrink-0 text-center">
              <HandCoins className="w-3 h-3 shrink-0" />
              <span>{t.card.swipeHint}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Decision Buttons aligned physically left/right with swipe direction in all languages */}
      <div
        dir="ltr"
        className="relative z-30 shrink-0 grid grid-cols-2 gap-2.5 sm:gap-3 pt-0.5"
      >
        <div
          dir={isRTL ? 'rtl' : 'ltr'}
          className="flex flex-col items-stretch gap-1 min-w-0"
        >
          <button
            type="button"
            disabled={isDisabled || !!exitDir}
            onClick={() => triggerChoice('left')}
            onMouseEnter={() => onPreviewChange(card.leftChoice.impact)}
            onMouseLeave={() => onPreviewChange(null)}
            onFocus={() => onPreviewChange(card.leftChoice.impact)}
            onBlur={() => onPreviewChange(null)}
            className="min-h-[48px] sm:min-h-[52px] px-2.5 py-2 rounded-2xl bg-[#F5A623] hover:bg-[#E09212] active:scale-[0.98] text-[#221404] border-b-[3px] border-[#B46E09] font-display font-extrabold text-xs sm:text-sm leading-tight shadow-md flex items-center justify-center gap-1.5 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B46E09] disabled:opacity-50"
          >
            <X className="w-4 h-4 shrink-0" />
            <span className="line-clamp-2">{leftText.label}</span>
          </button>
          <p className="text-center text-[10px] sm:text-[11px] font-bold text-[#8A4F08] tabular-nums leading-tight px-0.5 break-words">
            {leftImpactText}
          </p>
        </div>

        <div
          dir={isRTL ? 'rtl' : 'ltr'}
          className="flex flex-col items-stretch gap-1 min-w-0"
        >
          <button
            type="button"
            disabled={isDisabled || !!exitDir}
            onClick={() => triggerChoice('right')}
            onMouseEnter={() => onPreviewChange(card.rightChoice.impact)}
            onMouseLeave={() => onPreviewChange(null)}
            onFocus={() => onPreviewChange(card.rightChoice.impact)}
            onBlur={() => onPreviewChange(null)}
            className="min-h-[48px] sm:min-h-[52px] px-2.5 py-2 rounded-2xl bg-[#0E7A53] hover:bg-[#0A6242] active:scale-[0.98] text-white border-b-[3px] border-[#074830] font-display font-extrabold text-xs sm:text-sm leading-tight shadow-md flex items-center justify-center gap-1.5 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E7A53] disabled:opacity-50"
          >
            <Check className="w-4 h-4 shrink-0" />
            <span className="line-clamp-2">{rightText.label}</span>
          </button>
          <p className="text-center text-[10px] sm:text-[11px] font-bold text-[#0F5C3E] tabular-nums leading-tight px-0.5 break-words">
            {rightImpactText}
          </p>
        </div>
      </div>
    </div>
  );
};
