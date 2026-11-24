export type Language = 'ar' | 'fr' | 'en' | 'es';

export type StageNumber = 1 | 2 | 3 | 4;

export type CardCategory = 'trade' | 'craft' | 'community' | 'opportunity';

export interface Stats {
  money: number;
  reputation: number;
  energy: number;
  experience: number;
}

export interface ChoiceImpact {
  money: number;
  reputation: number;
  energy: number;
  experience: number;
}

export interface LocalizedChoiceContent {
  label: string;
  outcome: string;
}

export interface DynamicOutcomeConfig {
  successChance: number; // 1..99
  successImpact: ChoiceImpact;
  successOutcome: Record<Language, string>;
  failImpact: ChoiceImpact;
  failOutcome: Record<Language, string>;
}

export interface CardChoice {
  content: Record<Language, LocalizedChoiceContent>;
  impact: ChoiceImpact;
  dynamicOutcome?: DynamicOutcomeConfig;
}

export interface LocalizedCardContent {
  categoryLabel: string;
  character: string;
  title: string;
  description: string;
}

export interface ScenarioCard {
  id: number | string;
  stage: StageNumber;
  category: CardCategory;
  fingerprint?: string;
  ideaKey?: string;
  isRare?: boolean;
  rareTag?: Record<Language, string>;
  content: Record<Language, LocalizedCardContent>;
  rightChoice: CardChoice;
  leftChoice: CardChoice;
}

export type RankId =
  | 'struggler'
  | 'merchant'
  | 'businessman'
  | 'millionaire'
  | 'billionaire';

export interface LocalizedRankContent {
  stageName: string;
  title: string;
  rangeLabel: string;
  subtitle: string;
}

export interface RankInfo {
  id: RankId;
  stage: StageNumber;
  minMoney: number;
  maxMoney: number | null;
  nextTarget: number | null;
  content: Record<Language, LocalizedRankContent>;
}

export type GameStatus =
  | 'TITLE_MENU'
  | 'PLAYING'
  | 'RESULT_FEEDBACK'
  | 'GAME_OVER'
  | 'VICTORY';

export type GameMode = 'classic' | 'daily';

export type TurnEmoji = 'green' | 'yellow' | 'red';

export type LossReason = 'bankruptcy' | 'reputation' | 'exhaustion' | null;

export interface DecisionFeedback {
  card: ScenarioCard;
  choiceDirection: 'right' | 'left';
  impact: ChoiceImpact;
  outcomeText: Record<Language, string>;
  gambleOutcome?: {
    succeeded: boolean;
    successChance: number;
  };
  rankedUpTo: RankInfo | null;
}

export interface HistoryEntry {
  day: number;
  cardId: number | string;
  cardTitle: Record<Language, string>;
  choiceLabel: Record<Language, string>;
  choiceDirection: 'right' | 'left';
  moneyDelta: number;
  moneyAfter: number;
  turnEmoji: TurnEmoji;
}

export interface StoredRecord {
  highScoreMoney: number;
  bestDay: number;
  gamesPlayed: number;
  wins: number;
}

export interface DailyRecord {
  dateKey: string;
  bestMoney: number;
  bestDay: number;
  rankId: RankId;
  won: boolean;
  emojis: TurnEmoji[];
}

