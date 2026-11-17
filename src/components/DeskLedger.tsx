import React from 'react';
import { CheckCircle2, Circle, History, Trophy } from 'lucide-react';
import { RANKS, getRankForMoney } from '../data/scenarios';
import { TRANSLATIONS, formatCompactMoney } from '../i18n/translations';
import { HistoryEntry, Language, StoredRecord } from '../types/game';

interface DeskLedgerProps {
  money: number;
  day: number;
  lang: Language;
  history: HistoryEntry[];
  record: StoredRecord;
}

export const DeskLedger: React.FC<DeskLedgerProps> = ({
  money,
  day,
  lang,
  history,
  record,
}) => {
  const t = TRANSLATIONS[lang];
  const currentRank = getRankForMoney(money);

  return (
    <aside
      aria-label={t.ledger.ariaLabel}
      className="hidden lg:flex flex-col gap-5 bg-[#FFFDF8] border border-[#E5D7BE] rounded-3xl p-6 shadow-sm"
    >
      {/* High Score & Current Rank */}
      <div className="space-y-2 pb-4 border-b border-[#EFE3CC]">
        <div className="flex items-center justify-between text-xs font-semibold text-[#8A6234]">
          <span>{currentRank.content[lang].stageName}</span>
          <span className="tabular-nums">{t.dayCount(day)}</span>
        </div>
        <h3 className="font-display text-xl font-extrabold text-[#1F150D]">
          {currentRank.content[lang].title}
        </h3>
        <p className="text-xs text-[#5C4128] leading-relaxed">
          {currentRank.content[lang].subtitle}
        </p>

        <div className="pt-2 flex items-center justify-between text-xs text-[#4B392A]">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            {t.ledger.highScore}
          </span>
          <span className="font-extrabold tabular-nums text-[#1F150D]">
            {record.highScoreMoney.toLocaleString('en-US')} {t.currencyFull}
          </span>
        </div>
      </div>

      {/* Rank Ladder */}
      <div className="space-y-2.5 pb-4 border-b border-[#EFE3CC]">
        <h4 className="text-xs font-bold text-[#6E4F32]">
          {t.ledger.rankLadder}
        </h4>
        <ul className="space-y-2">
          {RANKS.map((rank) => {
            const isUnlocked = money >= rank.minMoney;
            const isCurrent = currentRank.id === rank.id;
            return (
              <li
                key={rank.id}
                className={`flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl transition-colors ${
                  isCurrent
                    ? 'bg-[#F3E8D4] font-bold text-[#1F150D]'
                    : isUnlocked
                    ? 'text-[#145C43]'
                    : 'text-[#8D745B]'
                }`}
              >
                <span className="flex items-center gap-2 min-w-0">
                  {isUnlocked ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#145C43] shrink-0" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-[#C7B393] shrink-0" />
                  )}
                  <span className="truncate">{rank.content[lang].title}</span>
                </span>
                <span className="tabular-nums text-[11px] shrink-0">
                  {rank.content[lang].rangeLabel}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Recent Decisions Log */}
      <div className="space-y-2.5 flex-1 min-h-0">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#6E4F32]">
          <History className="w-3.5 h-3.5" />
          <span>{t.ledger.recentDeals}</span>
        </div>

        {history.length === 0 ? (
          <p className="text-xs text-[#8D745B] leading-relaxed">
            {t.ledger.emptyHistory}
          </p>
        ) : (
          <ul className="space-y-2">
            {history.slice(0, 5).map((entry, idx) => {
              const title = entry.cardTitle[lang];
              const choiceLabel = entry.choiceLabel[lang];

              return (
                <li
                  key={`${entry.day}-${idx}`}
                  className="flex items-center justify-between gap-2 text-xs py-1.5 border-b border-[#F4EBDA] last:border-none"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-[#2A1D12] truncate">
                      {title}
                    </p>
                    <p className="text-[11px] text-[#7A624B] truncate">
                      {t.dayCount(entry.day)} · {choiceLabel}
                    </p>
                  </div>
                  <span
                    className={`tabular-nums font-bold shrink-0 ${
                      entry.moneyDelta > 0
                        ? 'text-emerald-800'
                        : entry.moneyDelta < 0
                        ? 'text-amber-800'
                        : 'text-[#7A624B]'
                    }`}
                  >
                    {entry.moneyDelta > 0
                      ? `+${formatCompactMoney(entry.moneyDelta, lang)}`
                      : entry.moneyDelta < 0
                      ? formatCompactMoney(entry.moneyDelta, lang)
                      : `0 ${t.currencyShort}`}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
};
