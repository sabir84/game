export type Language = 'ar' | 'fr' | 'en';

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

export interface CardChoice {
  content: Record<Language, LocalizedChoiceContent>;
  impact: ChoiceImpact;
}

export interface LocalizedCardContent {
  categoryLabel: string;
  character: string;
  title: string;
  description: string;
}

export interface ScenarioCard {
  id: number;
  stage: StageNumber;
  category: CardCategory;
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

export type LossReason = 'bankruptcy' | 'reputation' | 'exhaustion' | null;

export interface DecisionFeedback {
  cardId: number;
  choiceDirection: 'right' | 'left';
  impact: ChoiceImpact;
  rankedUpTo: RankInfo | null;
}

export interface HistoryEntry {
  day: number;
  cardId: number;
  choiceDirection: 'right' | 'left';
  moneyDelta: number;
  moneyAfter: number;
}

export interface StoredRecord {
  highScoreMoney: number;
  bestDay: number;
  gamesPlayed: number;
  wins: number;
}
