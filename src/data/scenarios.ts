import { RankInfo, ScenarioCard, StageNumber } from '../types/game';
import { STAGE_1_2_CARDS } from './stage1_2';
import { STAGE_3_4_CARDS } from './stage3_4';

export const INITIAL_STATS = {
  money: 20,
  reputation: 50,
  energy: 80,
  experience: 10,
};

export const VICTORY_MONEY_THRESHOLD = 1_000_000_000;

export const RANKS: RankInfo[] = [
  {
    id: 'struggler',
    stage: 1,
    minMoney: 0,
    maxMoney: 999,
    nextTarget: 1000,
    content: {
      ar: {
        stageName: 'المرحلة 1 · البداية البسيطة',
        title: 'مكافح طموح',
        rangeLabel: '20 – 1,000 درهم',
        subtitle: 'الحرف البسيطة، إصلاح الدراجات، بيع التمور والتوصيل',
      },
      fr: {
        stageName: 'Étape 1 · Débuts modestes',
        title: 'Battant Ambitieux',
        rangeLabel: '20 – 1 000 MAD',
        subtitle: 'Petits métiers, réparation, dattes et livraisons',
      },
      en: {
        stageName: 'Stage 1 · Humble Beginnings',
        title: 'Ambitious Hustler',
        rangeLabel: '20 – 1,000 MAD',
        subtitle: 'Local crafts, bike repair, dates & deliveries',
      },
      es: {
        stageName: 'Etapa 1 · Comienzos humildes',
        title: 'Luchador Ambicioso',
        rangeLabel: '20 – 1.000 MAD',
        subtitle: 'Oficios locales, bicis, dátiles y repartos',
      },
    },
  },
  {
    id: 'merchant',
    stage: 2,
    minMoney: 1000,
    maxMoney: 49999,
    nextTarget: 50000,
    content: {
      ar: {
        stageName: 'المرحلة 2 · التجارة المتوسطة',
        title: 'تاجر ذكي',
        rangeLabel: '1,000 – 50,000 درهم',
        subtitle: 'فتح محل تجاري، استيراد سلع، وتوظيف عمال',
      },
      fr: {
        stageName: 'Étape 2 · Commerce moyen',
        title: 'Commerçant Malin',
        rangeLabel: '1 000 – 50 000 MAD',
        subtitle: 'Boutique, import de marchandises et recrutement',
      },
      en: {
        stageName: 'Stage 2 · Growing Commerce',
        title: 'Smart Trader',
        rangeLabel: '1,000 – 50,000 MAD',
        subtitle: 'Opening a shop, importing goods & hiring staff',
      },
      es: {
        stageName: 'Etapa 2 · Comercio en auge',
        title: 'Comerciante Astuto',
        rangeLabel: '1.000 – 50.000 MAD',
        subtitle: 'Abrir tienda, importar mercancía y contratar',
      },
    },
  },
  {
    id: 'businessman',
    stage: 3,
    minMoney: 50000,
    maxMoney: 999999,
    nextTarget: 1000000,
    content: {
      ar: {
        stageName: 'المرحلة 3 · ريادة الأعمال',
        title: 'رجل أعمال',
        rangeLabel: '50,000 – 1,000,000 درهم',
        subtitle: 'إنشاء مصانع، استثمار عقاري وفلاحي، وشراكات كبرى',
      },
      fr: {
        stageName: 'Étape 3 · Entrepreneuriat',
        title: 'Entrepreneur',
        rangeLabel: '50 000 – 1 000 000 MAD',
        subtitle: 'Usines, immobilier, agriculture moderne et alliances',
      },
      en: {
        stageName: 'Stage 3 · Entrepreneurship',
        title: 'Business Leader',
        rangeLabel: '50,000 – 1,000,000 MAD',
        subtitle: 'Factories, real estate, modern farming & big deals',
      },
      es: {
        stageName: 'Etapa 3 · Emprendimiento',
        title: 'Empresario',
        rangeLabel: '50.000 – 1.000.000 MAD',
        subtitle: 'Fábricas, inmuebles, agro moderno y alianzas',
      },
    },
  },
  {
    id: 'millionaire',
    stage: 4,
    minMoney: 1000000,
    maxMoney: 999999999,
    nextTarget: 1000000000,
    content: {
      ar: {
        stageName: 'المرحلة 4 · الإمبراطورية المالية',
        title: 'مليونير',
        rangeLabel: '1M – 1B درهم',
        subtitle: 'شركات عالمية، طاقة شمسية، تصدير دولي وعمل خيري',
      },
      fr: {
        stageName: 'Étape 4 · Empire financier',
        title: 'Millionnaire',
        rangeLabel: '1M – 1Md MAD',
        subtitle: 'Multinationales, solaire, export mondial & mécénat',
      },
      en: {
        stageName: 'Stage 4 · Financial Empire',
        title: 'Millionaire',
        rangeLabel: '1M – 1B MAD',
        subtitle: 'Global firms, solar plants, exports & philanthropy',
      },
      es: {
        stageName: 'Etapa 4 · Imperio financiero',
        title: 'Millonario',
        rangeLabel: '1M – 1MM MAD',
        subtitle: 'Multinacionales, energía solar y exportación',
      },
    },
  },
  {
    id: 'billionaire',
    stage: 4,
    minMoney: 1000000000,
    maxMoney: null,
    nextTarget: null,
    content: {
      ar: {
        stageName: 'القمة الأسطورية · المليار درهم',
        title: 'البليونير',
        rangeLabel: '1,000,000,000+ درهم',
        subtitle: 'إنجاز تاريخي! أصبحت رمزاً للنجاح المالي العالمي',
      },
      fr: {
        stageName: 'Sommet Légendaire · Le Milliard',
        title: 'Milliardaire',
        rangeLabel: '1 000 000 000+ MAD',
        subtitle: 'Exploit historique ! Vous êtes au sommet de l’empire',
      },
      en: {
        stageName: 'Legendary Summit · 1 Billion',
        title: 'Billionaire',
        rangeLabel: '1,000,000,000+ MAD',
        subtitle: 'Historic achievement! You built a billion-dirham empire',
      },
      es: {
        stageName: 'Cima Legendaria · Mil Millones',
        title: 'Multimillonario',
        rangeLabel: '1.000.000.000+ MAD',
        subtitle: '¡Hazaña histórica! Construiste un imperio global',
      },
    },
  },
];

export function getStageForMoney(money: number): StageNumber {
  if (money >= 1_000_000) return 4;
  if (money >= 50_000) return 3;
  if (money >= 1_000) return 2;
  return 1;
}

export function getRankForMoney(money: number): RankInfo {
  if (money >= 1_000_000_000) return RANKS[4];
  if (money >= 1_000_000) return RANKS[3];
  if (money >= 50_000) return RANKS[2];
  if (money >= 1_000) return RANKS[1];
  return RANKS[0];
}

export const CATEGORY_IMAGES = {
  trade: './src/assets/images/moroccan_trade_souk_1794840092977.jpg',
  craft: './src/assets/images/moroccan_craft_repair_1794840094645.jpg',
  community: './src/assets/images/moroccan_community_tea_1794840093482.jpg',
  opportunity: './src/assets/images/moroccan_oasis_opportunity_1794840093938.jpg',
} as const;

export const SCENARIOS: ScenarioCard[] = [
  ...STAGE_1_2_CARDS,
  ...STAGE_3_4_CARDS,
];

export function getStageCards(stage: StageNumber): ScenarioCard[] {
  return SCENARIOS.filter((c) => c.stage === stage);
}

export {
  createSmartDeckMemory,
  drawNextScenarioCard,
  getTotalUniqueScenarioCount,
} from './proceduralGenerator';
export type { SmartDeckMemory } from './proceduralGenerator';

