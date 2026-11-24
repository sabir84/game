import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Calendar,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  Tv,
  Volume2,
  VolumeX,
  WifiOff,
} from 'lucide-react';
import { ConfettiBurst } from './components/ConfettiBurst';
import { DeskLedger } from './components/DeskLedger';
import { EndScreen } from './components/EndScreen';
import { PWAInstallButton } from './components/PWAInstallButton';
import { ResourceHUD } from './components/ResourceHUD';
import { ResultFeedbackCard } from './components/ResultFeedbackCard';
import { RewardedAdModal } from './components/RewardedAdModal';
import { RulesModal } from './components/RulesModal';
import { StageUpModal } from './components/StageUpModal';
import { SwipeCard } from './components/SwipeCard';
import { TitleScreen } from './components/TitleScreen';
import {
  INITIAL_STATS,
  SmartDeckMemory,
  VICTORY_MONEY_THRESHOLD,
  createSmartDeckMemory,
  drawNextScenarioCard,
  getRankForMoney,
  getStageCards,
  getStageForMoney,
} from './data/scenarios';
import { TRANSLATIONS, formatCompactMoney } from './i18n/translations';
import {
  ChoiceImpact,
  DailyRecord,
  DecisionFeedback,
  GameMode,
  GameStatus,
  HistoryEntry,
  Language,
  LossReason,
  RankInfo,
  ScenarioCard,
  StageNumber,
  Stats,
  StoredRecord,
  TurnEmoji,
} from './types/game';
import { AdRewardType, showRewardedAd } from './utils/admob';
import { createSeededRng, getTodayDateKey } from './utils/seededRandom';
import {
  ShareOutcome,
  buildInviteShareText,
  executeShare,
  getShareGameUrl,
} from './utils/share';
import { soundEngine } from './utils/sound';

const STORAGE_KEY = 'dirham20_record_v1';
const DAILY_STORAGE_KEY = 'dirham20_daily_v1';
const LANG_STORAGE_KEY = 'dirham20_lang_v1';

const LANG_OPTIONS: { code: Language; short: string; label: string }[] = [
  { code: 'ar', short: 'AR', label: 'العربية (AR)' },
  { code: 'fr', short: 'FR', label: 'Français (FR)' },
  { code: 'en', short: 'EN', label: 'English (EN)' },
];

function loadLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'ar' || saved === 'fr' || saved === 'en') {
      return saved;
    }
  } catch {
    // Ignore storage errors
  }
  return 'ar';
}

function loadRecord(): StoredRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StoredRecord>;
      return {
        highScoreMoney: Math.max(
          INITIAL_STATS.money,
          Number(parsed.highScoreMoney) || INITIAL_STATS.money
        ),
        bestDay: Math.max(1, Number(parsed.bestDay) || 1),
        gamesPlayed: Number(parsed.gamesPlayed) || 0,
        wins: Number(parsed.wins) || 0,
      };
    }
  } catch {
    // Ignore storage errors
  }
  return {
    highScoreMoney: INITIAL_STATS.money,
    bestDay: 1,
    gamesPlayed: 0,
    wins: 0,
  };
}

function saveRecord(record: StoredRecord) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Ignore storage errors
  }
}

function loadDailyRecord(todayKey: string): DailyRecord | null {
  try {
    const raw = localStorage.getItem(DAILY_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<DailyRecord>;
    if (parsed.dateKey !== todayKey) return null;
    return {
      dateKey: todayKey,
      bestMoney: Math.max(INITIAL_STATS.money, Number(parsed.bestMoney) || 0),
      bestDay: Math.max(1, Number(parsed.bestDay) || 1),
      rankId: parsed.rankId || 'struggler',
      won: Boolean(parsed.won),
      emojis: Array.isArray(parsed.emojis) ? parsed.emojis : [],
    };
  } catch {
    return null;
  }
}

function saveDailyRecord(daily: DailyRecord) {
  try {
    localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(daily));
  } catch {
    // Ignore storage errors
  }
}

function getStageFallbackBonus(stage: StageNumber): number {
  switch (stage) {
    case 1:
      return 50;
    case 2:
      return 2500;
    case 3:
      return 65000;
    case 4:
      return 45000000;
  }
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function drawCardForMode(
  targetMoney: number,
  nextDayNum: number,
  mode: GameMode,
  dateKey: string,
  memory: SmartDeckMemory
): ScenarioCard {
  const stage = getStageForMoney(targetMoney);
  const rng =
    mode === 'daily'
      ? createSeededRng(`daily:${dateKey}:d${nextDayNum}:s${stage}`)
      : Math.random;

  return drawNextScenarioCard({
    stage,
    money: targetMoney,
    day: nextDayNum,
    curatedStageCards: getStageCards(stage),
    memory,
    rng,
  });
}

export default function App() {
  const [lang, setLang] = useState<Language>(() => loadLanguage());
  const [status, setStatus] = useState<GameStatus>('TITLE_MENU');
  const [gameMode, setGameMode] = useState<GameMode>('classic');
  const [todayDateKey, setTodayDateKey] = useState<string>(() =>
    getTodayDateKey()
  );
  const [dailyRecord, setDailyRecord] = useState<DailyRecord | null>(() =>
    loadDailyRecord(getTodayDateKey())
  );
  const [dailyEmojis, setDailyEmojis] = useState<TurnEmoji[]>([]);

  const [stats, setStats] = useState<Stats>(INITIAL_STATS);
  const [day, setDay] = useState<number>(1);

  const deckMemoryRef = useRef<SmartDeckMemory>(createSmartDeckMemory());
  const [currentCard, setCurrentCard] = useState<ScenarioCard>(() =>
    drawCardForMode(
      INITIAL_STATS.money,
      1,
      'classic',
      getTodayDateKey(),
      deckMemoryRef.current
    )
  );

  const [previewImpact, setPreviewImpact] = useState<ChoiceImpact | null>(null);
  const [lastImpact, setLastImpact] = useState<ChoiceImpact | null>(null);
  const [feedback, setFeedback] = useState<DecisionFeedback | null>(null);
  const [lossReason, setLossReason] = useState<LossReason>(null);
  const [stageModalRank, setStageModalRank] = useState<RankInfo | null>(null);

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [record, setRecord] = useState<StoredRecord>(() => loadRecord());
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);
  const [endlessMode, setEndlessMode] = useState<boolean>(false);

  // Rewarded Ad states
  const [doubleProfitDay, setDoubleProfitDay] = useState<number | null>(null);
  const [adModalOpen, setAdModalOpen] = useState<boolean>(false);
  const [pendingAdType, setPendingAdType] = useState<AdRewardType | null>(null);
  const adResolverRef = useRef<((completed: boolean) => void) | null>(null);

  const [celebrating, setCelebrating] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(() => soundEngine.isMuted());
  const [showRules, setShowRules] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  const t = TRANSLATIONS[lang];

  // Sync HTML dir, lang, and title whenever language switches
  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.title = TRANSLATIONS[lang].pageTitle;
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
  }, [lang]);

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  const currentRank = useMemo(() => getRankForMoney(stats.money), [stats.money]);
  const isFifthDayBonus = day % 5 === 0;
  const isDoubleProfitActiveToday = doubleProfitDay === day;

  const triggerCelebration = useCallback(() => {
    setCelebrating(true);
    window.setTimeout(() => setCelebrating(false), 2100);
  }, []);

  const runSimulatedAdModal = useCallback((type: AdRewardType) => {
    return new Promise<boolean>((resolve) => {
      adResolverRef.current = resolve;
      setPendingAdType(type);
      setAdModalOpen(true);
    });
  }, []);

  const handleSimulatedAdComplete = () => {
    setAdModalOpen(false);
    setPendingAdType(null);
    adResolverRef.current?.(true);
    adResolverRef.current = null;
  };

  const handleSimulatedAdCancel = () => {
    setAdModalOpen(false);
    setPendingAdType(null);
    adResolverRef.current?.(false);
    adResolverRef.current = null;
  };

  const dealNextCardForMoney = useCallback(
    (
      targetMoney: number,
      nextDayNum: number,
      modeOverride?: GameMode,
      dateKeyOverride?: string
    ) => {
      const effectiveMode = modeOverride ?? gameMode;
      const effectiveDate = dateKeyOverride ?? todayDateKey;
      const nextCard = drawCardForMode(
        targetMoney,
        nextDayNum,
        effectiveMode,
        effectiveDate,
        deckMemoryRef.current
      );
      setCurrentCard(nextCard);
    },
    [gameMode, todayDateKey]
  );

  const persistDailyProgress = useCallback(
    (
      finalMoney: number,
      finalDay: number,
      won: boolean,
      emojis: TurnEmoji[],
      dateKey: string
    ) => {
      const rank = getRankForMoney(finalMoney);
      setDailyRecord((prev) => {
        const shouldReplaceBest =
          !prev ||
          prev.dateKey !== dateKey ||
          (won && !prev.won) ||
          finalMoney >= prev.bestMoney;
        const nextDaily: DailyRecord = shouldReplaceBest
          ? {
              dateKey,
              bestMoney: finalMoney,
              bestDay: finalDay,
              rankId: rank.id,
              won: won || Boolean(prev?.dateKey === dateKey && prev.won),
              emojis,
            }
          : prev;
        saveDailyRecord(nextDaily);
        return nextDaily;
      });
    },
    []
  );

  const startNewGame = useCallback((mode: GameMode = 'classic') => {
    soundEngine.playCardTap();
    const freshDateKey = getTodayDateKey();
    setTodayDateKey(freshDateKey);
    if (dailyRecord && dailyRecord.dateKey !== freshDateKey) {
      setDailyRecord(null);
    }

    const freshMemory = createSmartDeckMemory();
    deckMemoryRef.current = freshMemory;
    setGameMode(mode);
    setDailyEmojis([]);
    setCurrentCard(
      drawCardForMode(
        INITIAL_STATS.money,
        1,
        mode,
        freshDateKey,
        freshMemory
      )
    );

    setStats(INITIAL_STATS);
    setDay(1);
    setPreviewImpact(null);
    setLastImpact(null);
    setFeedback(null);
    setLossReason(null);
    setStageModalRank(null);
    setHistory([]);
    setIsNewRecord(false);
    setEndlessMode(false);
    setDoubleProfitDay(null);
    setCelebrating(false);
    setStatus('PLAYING');

    setRecord((prev) => {
      const updated = { ...prev, gamesPlayed: prev.gamesPlayed + 1 };
      saveRecord(updated);
      return updated;
    });
  }, [dailyRecord]);

  const handleChoose = useCallback(
    (direction: 'right' | 'left') => {
      if (status !== 'PLAYING' || !currentCard) return;

      const chosen =
        direction === 'right' ? currentCard.rightChoice : currentCard.leftChoice;
      const prevRank = getRankForMoney(stats.money);
      const currentStage = getStageForMoney(stats.money);

      let baseImpact = chosen.impact;
      let outcomeText: Record<Language, string> = {
        ar: chosen.content.ar.outcome,
        fr: chosen.content.fr.outcome,
        en: chosen.content.en.outcome,
      };
      let gambleOutcome: DecisionFeedback['gambleOutcome'] | undefined;

      if (chosen.dynamicOutcome) {
        const rollRng =
          gameMode === 'daily'
            ? createSeededRng(`daily:${todayDateKey}:roll:d${day}:${direction}`)
            : Math.random;
        const roll = rollRng() * 100;
        const succeeded = roll < chosen.dynamicOutcome.successChance;
        baseImpact = succeeded
          ? chosen.dynamicOutcome.successImpact
          : chosen.dynamicOutcome.failImpact;
        outcomeText = succeeded
          ? chosen.dynamicOutcome.successOutcome
          : chosen.dynamicOutcome.failOutcome;
        gambleOutcome = {
          succeeded,
          successChance: chosen.dynamicOutcome.successChance,
        };
      }

      let effectiveMoneyDelta = baseImpact.money;
      if (isDoubleProfitActiveToday) {
        effectiveMoneyDelta =
          baseImpact.money > 0
            ? baseImpact.money * 2
            : baseImpact.money + getStageFallbackBonus(currentStage);
      }

      const appliedImpact: ChoiceImpact = {
        ...baseImpact,
        money: effectiveMoneyDelta,
      };

      const turnEmoji: TurnEmoji = gambleOutcome
        ? gambleOutcome.succeeded
          ? 'green'
          : 'red'
        : appliedImpact.money > 0
        ? 'green'
        : appliedImpact.money === 0 ||
          (appliedImpact.money < 0 && appliedImpact.reputation > 0)
        ? 'yellow'
        : 'red';

      const nextEmojis = [...dailyEmojis, turnEmoji];
      setDailyEmojis(nextEmojis);

      const nextStats: Stats = {
        money: Math.max(0, stats.money + appliedImpact.money),
        reputation: clamp(stats.reputation + appliedImpact.reputation, 0, 100),
        energy: clamp(stats.energy + appliedImpact.energy, 0, 100),
        experience: clamp(stats.experience + appliedImpact.experience, 0, 100),
      };

      const nextRank = getRankForMoney(nextStats.money);
      const rankedUpTo =
        nextRank.minMoney > prevRank.minMoney ? nextRank : null;
      const stagePromoted = nextRank.stage > prevRank.stage;

      setStats(nextStats);
      setLastImpact(appliedImpact);
      setPreviewImpact(null);

      setHistory((prev) => [
        {
          day,
          cardId: currentCard.id,
          cardTitle: {
            ar: currentCard.content.ar.title,
            fr: currentCard.content.fr.title,
            en: currentCard.content.en.title,
          },
          choiceLabel: {
            ar: chosen.content.ar.label,
            fr: chosen.content.fr.label,
            en: chosen.content.en.label,
          },
          choiceDirection: direction,
          moneyDelta: appliedImpact.money,
          moneyAfter: nextStats.money,
          turnEmoji,
        },
        ...prev,
      ]);

      setRecord((prev) => {
        const beatMoney = nextStats.money > prev.highScoreMoney;
        const beatDay = day > prev.bestDay;
        if (beatMoney) {
          setIsNewRecord(true);
        }
        if (beatMoney || beatDay) {
          const updated: StoredRecord = {
            ...prev,
            highScoreMoney: Math.max(prev.highScoreMoney, nextStats.money),
            bestDay: Math.max(prev.bestDay, day),
          };
          saveRecord(updated);
          return updated;
        }
        return prev;
      });

      if (nextStats.money <= 0) {
        soundEngine.playGameOver();
        if (gameMode === 'daily') {
          persistDailyProgress(nextStats.money, day, false, nextEmojis, todayDateKey);
        }
        setLossReason('bankruptcy');
        setStatus('GAME_OVER');
        return;
      }
      if (nextStats.reputation <= 0) {
        soundEngine.playGameOver();
        if (gameMode === 'daily') {
          persistDailyProgress(nextStats.money, day, false, nextEmojis, todayDateKey);
        }
        setLossReason('reputation');
        setStatus('GAME_OVER');
        return;
      }
      if (nextStats.energy <= 0) {
        soundEngine.playGameOver();
        if (gameMode === 'daily') {
          persistDailyProgress(nextStats.money, day, false, nextEmojis, todayDateKey);
        }
        setLossReason('exhaustion');
        setStatus('GAME_OVER');
        return;
      }

      if (nextStats.money >= VICTORY_MONEY_THRESHOLD && !endlessMode) {
        soundEngine.playVictory();
        triggerCelebration();
        if (gameMode === 'daily') {
          persistDailyProgress(nextStats.money, day, true, nextEmojis, todayDateKey);
        }
        setRecord((prev) => {
          const updated = { ...prev, wins: prev.wins + 1 };
          saveRecord(updated);
          return updated;
        });
        setStatus('VICTORY');
        return;
      }

      if (stagePromoted) {
        soundEngine.playRankUp();
        triggerCelebration();
        setStageModalRank(nextRank);
      } else if (rankedUpTo) {
        soundEngine.playRankUp();
        triggerCelebration();
      } else {
        soundEngine.playDecision(appliedImpact.money);
      }

      setFeedback({
        card: currentCard,
        choiceDirection: direction,
        impact: appliedImpact,
        outcomeText,
        gambleOutcome,
        rankedUpTo,
      });
      setStatus('RESULT_FEEDBACK');
    },
    [
      currentCard,
      dailyEmojis,
      day,
      endlessMode,
      gameMode,
      isDoubleProfitActiveToday,
      persistDailyProgress,
      stats,
      status,
      todayDateKey,
      triggerCelebration,
    ]
  );

  const applySecondChanceRevive = useCallback(
    (bonusMoney: number, minReputation: number) => {
      soundEngine.playRewardSuccess();
      triggerCelebration();

      const revivedMoney = stats.money + bonusMoney;
      setStats((prev) => {
        const revived: Stats = {
          ...prev,
          money: prev.money + bonusMoney,
          energy: 100,
          reputation: Math.max(prev.reputation, minReputation),
        };
        setRecord((rec) => {
          if (revived.money > rec.highScoreMoney) {
            const updated = { ...rec, highScoreMoney: revived.money };
            saveRecord(updated);
            return updated;
          }
          return rec;
        });
        return revived;
      });

      setLossReason(null);
      setFeedback(null);
      dealNextCardForMoney(revivedMoney, day + 1);
      setDay((d) => d + 1);
      setStatus('PLAYING');
    },
    [day, dealNextCardForMoney, stats.money, triggerCelebration]
  );

  const handleWatchSecondChanceAd = useCallback(async () => {
    const result = await showRewardedAd('SECOND_CHANCE', () =>
      runSimulatedAdModal('SECOND_CHANCE')
    );
    if (!result.rewarded) return;
    applySecondChanceRevive(50, 35);
  }, [applySecondChanceRevive, runSimulatedAdModal]);

  const handleShareSecondChance = useCallback(async (): Promise<ShareOutcome> => {
    const { title, text } = buildInviteShareText(lang);
    const outcome = await executeShare({
      title,
      text,
      url: getShareGameUrl(),
    });
    if (outcome === 'shared' || outcome === 'copied') {
      applySecondChanceRevive(100, 40);
    }
    return outcome;
  }, [applySecondChanceRevive, lang]);

  const handleWatchDoubleProfitAd = useCallback(async () => {
    if (isDoubleProfitActiveToday) return;

    const result = await showRewardedAd('DOUBLE_DAILY_PROFIT', () =>
      runSimulatedAdModal('DOUBLE_DAILY_PROFIT')
    );
    if (!result.rewarded) return;

    soundEngine.playRewardSuccess();
    setDoubleProfitDay(day);

    if (status === 'RESULT_FEEDBACK' && feedback) {
      const currentStage = getStageForMoney(stats.money);
      const bonusMoney =
        feedback.impact.money > 0
          ? feedback.impact.money
          : getStageFallbackBonus(currentStage);
      const prevRank = getRankForMoney(stats.money);
      const updatedMoney = stats.money + bonusMoney;
      const nextRank = getRankForMoney(updatedMoney);
      const rankedUpTo =
        nextRank.minMoney > prevRank.minMoney ? nextRank : null;

      setStats((prev) => ({ ...prev, money: prev.money + bonusMoney }));
      setFeedback((prev) =>
        prev
          ? {
              ...prev,
              impact: {
                ...prev.impact,
                money: prev.impact.money + bonusMoney,
              },
              rankedUpTo: rankedUpTo ?? prev.rankedUpTo,
            }
          : prev
      );
      setHistory((prev) => {
        if (prev.length === 0) return prev;
        const [latest, ...rest] = prev;
        return [
          {
            ...latest,
            moneyDelta: latest.moneyDelta + bonusMoney,
            moneyAfter: updatedMoney,
          },
          ...rest,
        ];
      });
      setRecord((rec) => {
        if (updatedMoney > rec.highScoreMoney) {
          setIsNewRecord(true);
          const updated = { ...rec, highScoreMoney: updatedMoney };
          saveRecord(updated);
          return updated;
        }
        return rec;
      });

      if (updatedMoney >= VICTORY_MONEY_THRESHOLD && !endlessMode) {
        soundEngine.playVictory();
        triggerCelebration();
        setRecord((rec) => {
          const updated = { ...rec, wins: rec.wins + 1 };
          saveRecord(updated);
          return updated;
        });
        setStatus('VICTORY');
      } else if (nextRank.stage > prevRank.stage) {
        soundEngine.playRankUp();
        triggerCelebration();
        setStageModalRank(nextRank);
      }
    }
  }, [
    day,
    endlessMode,
    feedback,
    isDoubleProfitActiveToday,
    runSimulatedAdModal,
    stats.money,
    status,
    triggerCelebration,
  ]);

  const handleContinueNextDay = useCallback(() => {
    if (status !== 'RESULT_FEEDBACK') return;
    soundEngine.playCardTap();
    dealNextCardForMoney(stats.money, day + 1);
    setDay((d) => d + 1);
    setFeedback(null);
    setStatus('PLAYING');
  }, [day, dealNextCardForMoney, stats.money, status]);

  const handleContinueEndless = useCallback(() => {
    setEndlessMode(true);
    soundEngine.playCardTap();
    dealNextCardForMoney(stats.money, day + 1);
    setDay((d) => d + 1);
    setFeedback(null);
    setStatus('PLAYING');
  }, [day, dealNextCardForMoney, stats.money]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (adModalOpen) return;
      if (stageModalRank) {
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setStageModalRank(null);
        }
        return;
      }
      if (showRules) {
        if (e.key === 'Escape') setShowRules(false);
        return;
      }
      if (status === 'PLAYING') {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleChoose('right');
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handleChoose('left');
        }
      } else if (status === 'RESULT_FEEDBACK') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleContinueNextDay();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    adModalOpen,
    handleChoose,
    handleContinueNextDay,
    showRules,
    stageModalRank,
    status,
  ]);

  const handleToggleMute = () => {
    const next = soundEngine.toggleMute();
    setMuted(next);
  };

  return (
    <div className="h-[100dvh] lg:min-h-[100dvh] lg:h-auto flex flex-col overflow-hidden lg:overflow-visible bg-[#FBF6EC] text-[#241911]">
      <ConfettiBurst active={celebrating} />

      {/* Subtle Moroccan Oasis Zellige Header Accent Line */}
      <div
        aria-hidden="true"
        className="h-1 shrink-0 w-full bg-gradient-to-l from-[#145C43] via-[#C68B2C] to-[#145C43]"
      />

      {/* Compact Top Bar with Language Switcher */}
      <header className="shrink-0 sticky top-0 z-30 bg-[#FBF6EC]/92 backdrop-blur-md border-b border-[#E5D7BE] pt-safe">
        <div className="max-w-5xl mx-auto px-2.5 sm:px-4 h-12 sm:h-14 flex items-center justify-between gap-2">
          {/* Title + Compact Tri-lingual Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setStatus('TITLE_MENU')}
              className="font-display text-xs sm:text-lg font-extrabold text-[#145C43] whitespace-nowrap truncate max-w-[116px] sm:max-w-none hover:opacity-85 transition-opacity"
            >
              <span className="sm:hidden">{t.brandCompact}</span>
              <span className="hidden sm:inline">{t.brandTitle}</span>
            </button>

            <div
              role="group"
              aria-label="Language"
              dir="ltr"
              className="inline-flex items-center rounded-xl bg-[#EFE4CE] p-0.5 border border-[#DFCEB2] shrink-0"
            >
              {LANG_OPTIONS.map((opt) => {
                const isActive = lang === opt.code;
                return (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => setLang(opt.code)}
                    aria-label={opt.label}
                    aria-pressed={isActive}
                    title={opt.label}
                    className={`min-h-[28px] px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-extrabold tracking-wide transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#145C43] text-white shadow-xs'
                        : 'text-[#5C4128] hover:text-[#1F150D]'
                    }`}
                  >
                    {opt.short}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Utility Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {status !== 'TITLE_MENU' && <PWAInstallButton lang={lang} compact />}

            <button
              type="button"
              onClick={handleToggleMute}
              aria-label={muted ? t.header.unmute : t.header.mute}
              title={muted ? t.header.unmute : t.header.mute}
              className="min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] rounded-xl flex items-center justify-center text-[#5C4128] hover:bg-[#EFE4CE] transition-colors"
            >
              {muted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowRules(true)}
              aria-label={t.header.rules}
              title={t.header.rules}
              className="min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] rounded-xl flex items-center justify-center text-[#5C4128] hover:bg-[#EFE4CE] transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {status !== 'TITLE_MENU' && (
              <button
                type="button"
                onClick={() => startNewGame(gameMode)}
                aria-label={t.header.restart}
                title={t.header.restart}
                className="min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] rounded-xl flex items-center justify-center text-[#5C4128] hover:bg-[#EFE4CE] transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Responsive Arena */}
      <main className="flex-1 min-h-0 w-full max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-5 pb-safe flex flex-col">
        {status === 'TITLE_MENU' ? (
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">
            <div className="my-auto w-full">
              <TitleScreen
                record={record}
                dailyRecord={dailyRecord}
                todayDateKey={todayDateKey}
                lang={lang}
                onStart={() => startNewGame('classic')}
                onStartDaily={() => startNewGame('daily')}
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-stretch lg:items-start">
            {/* Primary Gameplay Column */}
            <div className="lg:col-span-7 h-full lg:h-auto min-h-0 flex flex-col gap-2 sm:gap-3.5 max-w-md w-full mx-auto lg:max-w-none">
              {/* Quiet Single-Line Status Metadata */}
              <div className="shrink-0 flex items-center justify-between text-[11px] sm:text-xs font-bold text-[#6E4F32] px-1 gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  {gameMode === 'daily' && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 border border-amber-300 px-1.5 py-0.5 text-[10px] font-extrabold text-amber-950 shrink-0">
                      <Calendar className="w-3 h-3" />
                      <span>{t.daily.badge}</span>
                    </span>
                  )}
                  <span className="tabular-nums text-[#1F150D] shrink-0">
                    {t.dayCount(day)}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#8A6234] shrink-0">
                    {t.stageLabel(currentRank.stage)}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#145C43] truncate">
                    {currentRank.content[lang].title}
                  </span>
                </div>
                <div className="flex items-center gap-1 tabular-nums shrink-0 text-amber-900">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>
                    {t.highScoreLabel}:{' '}
                    {formatCompactMoney(record.highScoreMoney, lang)}
                  </span>
                </div>
              </div>

              {/* Four Resource Meters */}
              <ResourceHUD
                stats={stats}
                lang={lang}
                previewImpact={previewImpact}
                lastImpact={lastImpact}
              />

              {/* Optional Every-5-Days Rewarded Ad Button during active play */}
              {status === 'PLAYING' && isFifthDayBonus && (
                <div className="shrink-0">
                  {!isDoubleProfitActiveToday ? (
                    <button
                      type="button"
                      onClick={handleWatchDoubleProfitAd}
                      className="w-full min-h-[40px] px-3 py-1.5 rounded-xl bg-gradient-to-l from-[#E09F1F] to-[#F5C042] hover:brightness-105 active:scale-[0.99] text-[#241606] border border-[#B97B0C] font-display font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <Tv className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.ads.doubleProfitBtn}</span>
                    </button>
                  ) : (
                    <div className="w-full rounded-xl bg-amber-50 border border-amber-300 px-3 py-1.5 flex items-center justify-center gap-1.5 text-xs font-extrabold text-amber-950">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span>{t.ads.doubleProfitActive}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Central Active Card / Feedback / End Screen */}
              <div className="flex-1 min-h-0 flex flex-col">
                {status === 'PLAYING' && currentCard && (
                  <SwipeCard
                    key={`${day}-${currentCard.id}`}
                    card={currentCard}
                    day={day}
                    lang={lang}
                    isDisabled={adModalOpen || !!stageModalRank}
                    onChoose={handleChoose}
                    onPreviewChange={setPreviewImpact}
                  />
                )}

                {status === 'RESULT_FEEDBACK' && feedback && (
                  <div className="flex-1 min-h-0 overflow-y-auto flex flex-col py-1">
                    <div className="my-auto w-full">
                      <ResultFeedbackCard
                        feedback={feedback}
                        nextDay={day + 1}
                        lang={lang}
                        showDoubleProfitOption={isFifthDayBonus}
                        doubleProfitApplied={isDoubleProfitActiveToday}
                        onWatchDoubleProfit={handleWatchDoubleProfitAd}
                        onContinue={handleContinueNextDay}
                      />
                    </div>
                  </div>
                )}

                {(status === 'GAME_OVER' || status === 'VICTORY') && (
                  <div className="flex-1 min-h-0 overflow-y-auto flex flex-col py-1">
                    <div className="my-auto w-full">
                      <EndScreen
                        mode={status}
                        gameMode={gameMode}
                        dateKey={todayDateKey}
                        emojis={dailyEmojis}
                        lossReason={lossReason}
                        stats={stats}
                        day={day}
                        lang={lang}
                        record={record}
                        isNewRecord={isNewRecord}
                        onRestart={() => startNewGame(gameMode)}
                        onWatchSecondChance={
                          status === 'GAME_OVER'
                            ? handleWatchSecondChanceAd
                            : undefined
                        }
                        onShareSecondChance={
                          status === 'GAME_OVER'
                            ? handleShareSecondChance
                            : undefined
                        }
                        onContinueEndless={
                          status === 'VICTORY' ? handleContinueEndless : undefined
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Ledger Sidebar */}
            <div className="lg:col-span-5">
              <DeskLedger
                money={stats.money}
                day={day}
                lang={lang}
                history={history}
                record={record}
              />
            </div>
          </div>
        )}
      </main>

      {/* Non-intrusive Offline Indicator */}
      {!isOnline && (
        <div className="fixed bottom-3 right-3 z-40 rounded-xl bg-amber-800 text-amber-50 px-3 py-1.5 text-xs font-bold shadow-md flex items-center gap-1.5">
          <WifiOff className="w-3.5 h-3.5" />
          <span>{t.offlineBanner}</span>
        </div>
      )}

      <RulesModal
        open={showRules}
        lang={lang}
        onClose={() => setShowRules(false)}
      />

      <StageUpModal
        rank={stageModalRank}
        money={stats.money}
        day={day}
        gameMode={gameMode}
        dateKey={todayDateKey}
        lang={lang}
        onClose={() => setStageModalRank(null)}
      />

      <RewardedAdModal
        open={adModalOpen}
        lang={lang}
        rewardType={pendingAdType}
        onComplete={handleSimulatedAdComplete}
        onCancel={handleSimulatedAdCancel}
      />
    </div>
  );
}
