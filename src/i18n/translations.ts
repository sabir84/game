import {
  CardChoice,
  ChoiceImpact,
  Language,
  LossReason,
  StageNumber,
} from '../types/game';

export interface UIStrings {
  pageTitle: string;
  brandTitle: string;
  brandCompact: string;
  currencyShort: string;
  currencyFull: string;
  dayLabel: string;
  dayCount: (day: number) => string;
  stageLabel: (stage: StageNumber) => string;
  highScoreLabel: string;
  highScoreTitleLabel: string;
  meters: {
    ariaLabel: string;
    money: string;
    reputation: string;
    energy: string;
    experience: string;
    critical: string;
    previewAria: string;
  };
  impactShort: {
    rep: string;
    energy: string;
    xp: string;
  };
  header: {
    mute: string;
    unmute: string;
    rules: string;
    restart: string;
    install: string;
    installShort: string;
    iosInstallTitle: string;
    iosStep1: string;
    iosStep2: string;
    iosDone: string;
    close: string;
  };
  titleScreen: {
    kicker: string;
    headline: string;
    premise: string;
    capitalLabel: string;
    repLabel: string;
    energyLabel: string;
    xpLabel: string;
    ranksTitle: string;
    startBtn: string;
  };
  card: {
    cardPrefix: string;
    swipeHint: string;
    rareDefault: string;
    riskPill: (chance: number) => string;
  };
  feedback: {
    rankUpKicker: string;
    yourChoice: string;
    continueBtn: (nextDay: number) => string;
    doubleProfitApplied: string;
    gambleWon: (chance: number) => string;
    gambleLost: (risk: number) => string;
  };
  stageModal: {
    kicker: (stage: StageNumber) => string;
    headline: string;
    badgeLabel: string;
    continueBtn: string;
  };
  ads: {
    secondChanceBtn: string;
    doubleProfitBtn: string;
    doubleProfitActive: string;
    modalKicker: string;
    modalSecondChanceTitle: string;
    modalDoubleTitle: string;
    modalSecondChanceDesc: string;
    modalDoubleDesc: string;
    preparing: (sec: number) => string;
    claimReward: string;
    cancel: string;
  };
  endScreen: {
    victoryKicker: string;
    victoryTitle: string;
    victoryDesc: string;
    gameOverKicker: (day: number) => string;
    newRecord: string;
    finalBalance: string;
    rankAchieved: string;
    daysAndXp: (day: number, xp: number) => string;
    highScore: string;
    continueEndless: string;
    playAgain: string;
    losses: Record<
      Exclude<LossReason, null>,
      { title: string; message: string }
    >;
  };
  ledger: {
    ariaLabel: string;
    currentRank: string;
    highScore: string;
    rankLadder: string;
    recentDeals: string;
    emptyHistory: string;
  };
  rulesModal: {
    title: string;
    intro: string;
    metersTitle: string;
    metersList: string[];
    ranksTitle: string;
    backBtn: string;
  };
  offlineBanner: string;
}

export const TRANSLATIONS: Record<Language, UIStrings> = {
  ar: {
    pageTitle: 'تحدي الـ 20 درهماً | من 20 درهم إلى البليونير',
    brandTitle: 'تحدي الـ 20 درهماً',
    brandCompact: 'تحدي 20 د.م',
    currencyShort: 'د.م',
    currencyFull: 'درهم',
    dayLabel: 'اليوم',
    dayCount: (day) => `اليوم ${day}`,
    stageLabel: (stage) => `المرحلة ${stage}`,
    highScoreLabel: 'أعلى رقم',
    highScoreTitleLabel: 'أعلى رقم قياسي',
    meters: {
      ariaLabel: 'المؤشرات الحيوية',
      money: 'المال',
      reputation: 'السمعة',
      energy: 'الطاقة',
      experience: 'الخبرة',
      critical: 'حرج',
      previewAria: 'تأثير متوقع',
    },
    impactShort: {
      rep: 'ثقة',
      energy: 'طاقة',
      xp: 'خبرة',
    },
    header: {
      mute: 'كتم الصوت',
      unmute: 'تشغيل الصوت',
      rules: 'طريقة اللعب',
      restart: 'إعادة البدء',
      install: 'تثبيت التطبيق',
      installShort: 'تثبيت',
      iosInstallTitle: 'تثبيت اللعبة على الهاتف',
      iosStep1: 'اضغط على زر المشاركة (Share) في شريط متصفح سفاري.',
      iosStep2: 'اختر إضافة إلى الشاشة الرئيسية (Add to Home Screen).',
      iosDone: 'حسناً، فهمت',
      close: 'إغلاق',
    },
    titleScreen: {
      kicker: 'رحلة صعود ملحمية في عالم المال والأعمال',
      headline: 'تحدي الـ 20 درهماً',
      premise:
        'ابدأ بـ 20 درهماً فقط في المرحلة الأولى، وطوّر مشاريعك عبر 4 مراحل متدرجة من الحرف البسيطة إلى الإمبراطورية المالية لتصل إلى لقب البليونير (1,000,000,000 درهم)!',
      capitalLabel: 'رأس المال',
      repLabel: 'السمعة',
      energyLabel: 'الطاقة',
      xpLabel: 'الخبرة',
      ranksTitle: 'المراحل الأربع نحو المليار',
      startBtn: 'ابدأ رحلة الصعود الآن',
    },
    card: {
      cardPrefix: 'بطاقة #',
      swipeHint: 'اسحب يميناً أو يساراً أو اضغط أحد القرارين بالأسفل',
      rareDefault: 'حدث نادر',
      riskPill: (chance) => `نجاح ${chance}%`,
    },
    feedback: {
      rankUpKicker: 'تهانينا! ترقية جديدة',
      yourChoice: 'قرارك:',
      continueBtn: (nextDay) => `تابع إلى اليوم ${nextDay}`,
      doubleProfitApplied: 'تم تفعيل مضاعفة أرباح اليوم بنجاح!',
      gambleWon: (chance) => `نجحت المغامرة! (احتمال النجاح كان ${chance}%)`,
      gambleLost: (risk) => `تعثّرت المغامرة (نسبة المخاطرة كانت ${risk}%)`,
    },
    stageModal: {
      kicker: (stage) => `إنجاز جديد · المرحلة ${stage}`,
      headline: 'انتقلت إلى مرحلة أعلى!',
      badgeLabel: 'شارة المرحلة الجديدة',
      continueBtn: 'مواصلة رحلة الصعود',
    },
    ads: {
      secondChanceBtn:
        'شاهد إعلاناً للحصول على فرصة ثانية (+50 درهم وطاقة كاملة)',
      doubleProfitBtn: 'مضاعفة أرباح اليوم (شاهد إعلاناً)',
      doubleProfitActive: 'مضاعفة أرباح اليوم 2× مفعّلة!',
      modalKicker: 'معاينة إعلان المكافأة (AdMob Rewarded)',
      modalSecondChanceTitle: 'فرصة ثانية للاستمرار في التحدي',
      modalDoubleTitle: 'مضاعفة أرباح اليوم',
      modalSecondChanceDesc:
        'ستحصل فوراً على +50 درهم وطاقة كاملة 100% بعد انتهاء الإعلان.',
      modalDoubleDesc:
        'ستتم مضاعفة ربحك في هذا اليوم فوراً بعد انتهاء الإعلان.',
      preparing: (sec) => `جاري تجهيز المكافأة... (${sec})`,
      claimReward: 'استلام المكافأة الآن',
      cancel: 'إلغاء والعودة',
    },
    endScreen: {
      victoryKicker: 'الإنجاز الأسطوري · البليونير',
      victoryTitle: 'أسطوري! وصلت إلى المليار درهم',
      victoryDesc:
        'مبارك لك لقب البليونير! بدأت بـ 20 درهماً فقط وبنيت إمبراطورية مالية بقيمة 1,000,000,000 درهم بحكمتك وشجاعتك.',
      gameOverKicker: (day) => `انتهت الجولة في اليوم ${day}`,
      newRecord: 'رقم قياسي جديد في هاتفك!',
      finalBalance: 'الثروة النهائية',
      rankAchieved: 'الرتبة المحققة',
      daysAndXp: (day, xp) => `${day} يوم · ${xp}% خبرة`,
      highScore: 'أعلى رقم قياسي',
      continueEndless: 'مواصلة اللعب لتحطيم الأرقام القياسية',
      playAgain: 'إعادة اللعب',
      losses: {
        bankruptcy: {
          title: 'انتهت الرحلة بالإفلاس!',
          message:
            'نفد رأس مالك بالكامل ولم يعد في جيبك ما تموّل به صفقة جديدة. التاجر الذكي يحفظ سيولته للطوارئ.',
        },
        reputation: {
          title: 'فقدت ثقة الناس والسوق!',
          message:
            'انخفضت سمعتك إلى الصفر فتوقف الشركاء والزبائن عن التعامل معك. الثقة هي أساس كل إمبراطورية.',
        },
        exhaustion: {
          title: 'سقطت من شدة الإرهاق!',
          message:
            'أنهكت صحتك بالعمل المتواصل دون راحة حتى استنفدت طاقتك تماماً. الصحة هي الثروة الأولى.',
        },
      },
    },
    ledger: {
      ariaLabel: 'سجل التاجر والمراحل',
      currentRank: 'المرحلة واللقب الحالي',
      highScore: 'أعلى ثروة قياسية',
      rankLadder: 'سُلّم المراحل والألقاب',
      recentDeals: 'دفتر الصفقات الأخيرة',
      emptyHistory:
        'لم تسجل أي صفقة بعد. اسحب أول بطاقة لتبدأ رحلتك نحو المليار!',
    },
    rulesModal: {
      title: 'طريقة اللعب ومراحل الصعود',
      intro:
        'تبدأ في اليوم 1 برأس مال 20 درهماً فقط. اسحب البطاقات يميناً ويساراً لتتجاوز 4 مراحل كبرى وتتطور صفقاتك من الحرف الصغيرة إلى الشركات العالمية حتى تصل إلى لقب البليونير (1,000,000,000 درهم).',
      metersTitle: 'توازن المؤشرات الأربعة:',
      metersList: [
        'المال (20 د.م): إذا وصل إلى 0 تخسر بسبب الإفلاس.',
        'السمعة والثقة (50%): إذا وصلت إلى 0 تخسر بسبب فقدان الثقة.',
        'الطاقة والصحة (80%): إذا وصلت إلى 0 تخسر بسبب الإرهاق.',
        'الخبرة (10%): تزداد مع كل صفقة وتجربة جديدة.',
      ],
      ranksTitle: 'المراحل والألقاب:',
      backBtn: 'العودة للعبة',
    },
    offlineBanner: 'وضع عدم الاتصال — اللعبة تعمل محلياً',
  },

  fr: {
    pageTitle: 'Défi 20 Dirhams | De 20 MAD à Milliardaire',
    brandTitle: 'Défi 20 MAD',
    brandCompact: 'Défi 20 MAD',
    currencyShort: 'MAD',
    currencyFull: 'MAD',
    dayLabel: 'Jour',
    dayCount: (day) => `Jour ${day}`,
    stageLabel: (stage) => `Étape ${stage}`,
    highScoreLabel: 'Record',
    highScoreTitleLabel: 'Meilleur score',
    meters: {
      ariaLabel: 'Indicateurs vitaux',
      money: 'Argent',
      reputation: 'Confiance',
      energy: 'Énergie',
      experience: 'Exp.',
      critical: 'Bas',
      previewAria: 'Impact prévu',
    },
    impactShort: {
      rep: 'Conf.',
      energy: 'Énergie',
      xp: 'Exp.',
    },
    header: {
      mute: 'Couper le son',
      unmute: 'Activer le son',
      rules: 'Règles du jeu',
      restart: 'Recommencer',
      install: 'Installer',
      installShort: 'Installer',
      iosInstallTitle: 'Installer sur iPhone / iPad',
      iosStep1: 'Touchez le bouton Partager dans la barre de Safari.',
      iosStep2: "Sélectionnez « Sur l'écran d'accueil ».",
      iosDone: 'Compris',
      close: 'Fermer',
    },
    titleScreen: {
      kicker: 'Une ascension épique de 20 MAD à 1 Milliard',
      headline: 'Le Défi des 20 Dirhams',
      premise:
        'Démarrez avec 20 MAD et traversez 4 grandes étapes : des petits métiers jusqu’à l’empire mondial pour décrocher le titre de Milliardaire (1 000 000 000 MAD) !',
      capitalLabel: 'Capital',
      repLabel: 'Confiance',
      energyLabel: 'Énergie',
      xpLabel: 'Expérience',
      ranksTitle: 'Les 4 étapes vers le milliard',
      startBtn: 'Commencer l’ascension',
    },
    card: {
      cardPrefix: 'Carte #',
      swipeHint: 'Glissez la carte ou choisissez un bouton ci-dessous',
      rareDefault: 'Événement rare',
      riskPill: (chance) => `${chance}% succès`,
    },
    feedback: {
      rankUpKicker: 'Félicitations ! Nouveau statut',
      yourChoice: 'Votre choix :',
      continueBtn: (nextDay) => `Passer au Jour ${nextDay}`,
      doubleProfitApplied: 'Bonus gains doublés activé pour aujourd’hui !',
      gambleWon: (chance) => `Pari réussi ! (${chance}% de chances)`,
      gambleLost: (risk) => `Pari manqué (${risk}% de risque)`,
    },
    stageModal: {
      kicker: (stage) => `Cap franchi · Étape ${stage}`,
      headline: 'Nouvelle étape débloquée !',
      badgeLabel: 'Nouveau badge de progression',
      continueBtn: 'Poursuivre l’ascension',
    },
    ads: {
      secondChanceBtn:
        'Voir une pub pour une 2e chance (+50 MAD & Énergie 100%)',
      doubleProfitBtn: 'Doubler les gains du jour (Voir une pub)',
      doubleProfitActive: 'Multiplicateur 2× activé pour aujourd’hui !',
      modalKicker: 'Aperçu Pub Récompensée (AdMob)',
      modalSecondChanceTitle: 'Seconde chance dans le défi',
      modalDoubleTitle: 'Doubler les gains du jour',
      modalSecondChanceDesc:
        'Recevez immédiatement +50 MAD et 100% d’énergie après l’annonce.',
      modalDoubleDesc:
        'Vos gains de cette journée seront doublés dès la fin de l’annonce.',
      preparing: (sec) => `Préparation de la récompense... (${sec})`,
      claimReward: 'Récupérer la récompense',
      cancel: 'Annuler',
    },
    endScreen: {
      victoryKicker: 'Victoire Légendaire · Milliardaire',
      victoryTitle: 'Légendaire ! Cap du Milliard atteint',
      victoryDesc:
        'Vous avez transformé 20 MAD en un empire de 1 000 000 000 MAD grâce à votre vision stratégique et votre équilibre !',
      gameOverKicker: (day) => `Fin de partie au Jour ${day}`,
      newRecord: 'Nouveau record enregistré sur votre téléphone !',
      finalBalance: 'Fortune finale',
      rankAchieved: 'Titre obtenu',
      daysAndXp: (day, xp) => `${day} jours · ${xp}% exp.`,
      highScore: 'Meilleur record',
      continueEndless: 'Continuer pour battre tous les records',
      playAgain: 'Rejouer',
      losses: {
        bankruptcy: {
          title: 'Faillite totale !',
          message:
            'Votre capital est tombé à 0 MAD. Gardez toujours une réserve de sécurité.',
        },
        reputation: {
          title: 'Confiance perdue !',
          message:
            'Votre réputation est tombée à zéro et les partenaires se retirent.',
        },
        exhaustion: {
          title: 'Épuisement complet !',
          message:
            'Vous avez travaillé sans pause jusqu’à vider toute votre énergie.',
        },
      },
    },
    ledger: {
      ariaLabel: 'Registre et étapes',
      currentRank: 'Étape & Titre actuel',
      highScore: 'Record personnel',
      rankLadder: 'Progression des étapes',
      recentDeals: 'Journal des affaires récentes',
      emptyHistory:
        'Aucune affaire conclue. Glissez votre première carte vers le milliard !',
    },
    rulesModal: {
      title: 'Règles et Étapes du Défi',
      intro:
        'Commencez avec 20 MAD et faites évoluer votre empire à travers 4 étapes majeures jusqu’au statut de Milliardaire (1 000 000 000 MAD).',
      metersTitle: 'Gardez les 4 indicateurs en équilibre :',
      metersList: [
        'Argent (20 MAD) : à 0 MAD, c’est la faillite.',
        'Confiance (50%) : à 0%, vous perdez la confiance du marché.',
        'Énergie (80%) : à 0%, vous tombez d’épuisement.',
        'Expérience (10%) : augmente à chaque transaction.',
      ],
      ranksTitle: 'Étapes et Titres :',
      backBtn: 'Retour au jeu',
    },
    offlineBanner: 'Mode hors ligne — Le jeu fonctionne localement',
  },

  en: {
    pageTitle: '20 Dirhams Challenge | From 20 MAD to Billionaire',
    brandTitle: '20 MAD Challenge',
    brandCompact: '20 MAD',
    currencyShort: 'MAD',
    currencyFull: 'MAD',
    dayLabel: 'Day',
    dayCount: (day) => `Day ${day}`,
    stageLabel: (stage) => `Stage ${stage}`,
    highScoreLabel: 'Best',
    highScoreTitleLabel: 'High Score',
    meters: {
      ariaLabel: 'Vital resources',
      money: 'Money',
      reputation: 'Trust',
      energy: 'Energy',
      experience: 'XP',
      critical: 'Low',
      previewAria: 'Expected impact',
    },
    impactShort: {
      rep: 'Trust',
      energy: 'Energy',
      xp: 'XP',
    },
    header: {
      mute: 'Mute sound',
      unmute: 'Enable sound',
      rules: 'How to play',
      restart: 'Restart',
      install: 'Install App',
      installShort: 'Install',
      iosInstallTitle: 'Install on iPhone / iPad',
      iosStep1: 'Tap the Share button in the Safari toolbar.',
      iosStep2: 'Scroll down and tap Add to Home Screen.',
      iosDone: 'Got it',
      close: 'Close',
    },
    titleScreen: {
      kicker: 'An Epic Rise from 20 MAD to Billionaire',
      headline: '20 Dirhams Challenge',
      premise:
        'Start Day 1 with just 20 MAD and rise through 4 realistic stages—from street crafts to a global empire—all the way to Billionaire (1,000,000,000 MAD)!',
      capitalLabel: 'Capital',
      repLabel: 'Trust',
      energyLabel: 'Energy',
      xpLabel: 'Experience',
      ranksTitle: 'The 4 Stages to 1 Billion',
      startBtn: 'Start Your Rise',
    },
    card: {
      cardPrefix: 'Card #',
      swipeHint: 'Swipe card left or right, or tap a choice below',
      rareDefault: 'Rare Event',
      riskPill: (chance) => `${chance}% win`,
    },
    feedback: {
      rankUpKicker: 'Congratulations! New Milestone',
      yourChoice: 'Your choice:',
      continueBtn: (nextDay) => `Continue to Day ${nextDay}`,
      doubleProfitApplied: "Today's 2x profit bonus applied!",
      gambleWon: (chance) => `Risk Paid Off! (${chance}% chance)`,
      gambleLost: (risk) => `Gamble Backfired (${risk}% risk)`,
    },
    stageModal: {
      kicker: (stage) => `Milestone Reached · Stage ${stage}`,
      headline: 'Promoted to Next Stage!',
      badgeLabel: 'New Stage Badge',
      continueBtn: 'Continue Climbing',
    },
    ads: {
      secondChanceBtn: 'Watch Ad for a 2nd Chance (+50 MAD & Full Energy)',
      doubleProfitBtn: "Double Today's Profit (Watch Ad)",
      doubleProfitActive: '2x Daily Profit Bonus Active!',
      modalKicker: 'Rewarded Ad Preview (AdMob)',
      modalSecondChanceTitle: 'Second Chance to Continue',
      modalDoubleTitle: "Double Today's Profit",
      modalSecondChanceDesc:
        'You will immediately receive +50 MAD and 100% Energy once the ad finishes.',
      modalDoubleDesc:
        'Your profit for today will be doubled as soon as the ad finishes.',
      preparing: (sec) => `Preparing reward... (${sec})`,
      claimReward: 'Claim Reward Now',
      cancel: 'Cancel',
    },
    endScreen: {
      victoryKicker: 'Legendary Victory · Billionaire',
      victoryTitle: 'Legendary! 1 Billion MAD Reached',
      victoryDesc:
        'You turned 20 MAD into a 1,000,000,000 MAD financial empire through bold strategy, trust, and endurance!',
      gameOverKicker: (day) => `Run ended on Day ${day}`,
      newRecord: 'New personal record saved on your device!',
      finalBalance: 'Final Wealth',
      rankAchieved: 'Rank Achieved',
      daysAndXp: (day, xp) => `${day} days · ${xp}% XP`,
      highScore: 'High Score',
      continueEndless: 'Keep Playing to Break Records',
      playAgain: 'Play Again',
      losses: {
        bankruptcy: {
          title: 'Out of Cash — Bankruptcy!',
          message:
            'Your capital hit 0 MAD. Always keep a cash buffer to weather unexpected storms.',
        },
        reputation: {
          title: 'Lost Market Trust!',
          message:
            'Your reputation fell to zero and partners walked away. Trust powers every empire.',
        },
        exhaustion: {
          title: 'Complete Burnout!',
          message:
            'You pushed nonstop until your energy ran empty. Health is your greatest asset.',
        },
      },
    },
    ledger: {
      ariaLabel: 'Merchant Ledger & Stages',
      currentRank: 'Current Stage & Rank',
      highScore: 'High Score',
      rankLadder: '4-Stage Ladder',
      recentDeals: 'Recent Deals Log',
      emptyHistory:
        'No deals recorded yet. Swipe your first card to start climbing!',
    },
    rulesModal: {
      title: 'How to Play & 4-Stage Journey',
      intro:
        'Begin Day 1 with 20 MAD. Swipe cards left or right to scale through 4 realistic business stages all the way to Billionaire (1,000,000,000 MAD).',
      metersTitle: 'Balance the 4 core meters:',
      metersList: [
        'Money (20 MAD): hits 0 MAD and you go bankrupt.',
        'Trust (50%): hits 0% and the market turns away.',
        'Energy (80%): hits 0% and exhaustion ends your run.',
        'Experience (10%): grows with every deal.',
      ],
      ranksTitle: 'Stages & Titles:',
      backBtn: 'Back to Game',
    },
    offlineBanner: 'Offline Mode — Playing locally',
  },
};

export function formatCompactMoney(amount: number, lang: Language): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';
  const fmt = (n: number) => (Number.isInteger(n) ? `${n}` : n.toFixed(1).replace(/\.0$/, ''));

  if (abs >= 1_000_000_000) {
    const val = fmt(abs / 1_000_000_000);
    if (lang === 'ar') return `${sign}${val} مليار د.م`;
    if (lang === 'fr') return `${sign}${val}Md MAD`;
    return `${sign}${val}B MAD`;
  }
  if (abs >= 1_000_000) {
    const val = fmt(abs / 1_000_000);
    if (lang === 'ar') return `${sign}${val} مليون د.م`;
    return `${sign}${val}M MAD`;
  }
  if (abs >= 1_000) {
    const val = fmt(abs / 1_000);
    if (lang === 'ar') return `${sign}${val} ألف د.م`;
    return `${sign}${val}K MAD`;
  }
  return `${sign}${abs} ${TRANSLATIONS[lang].currencyShort}`;
}

export function formatImpactLine(impact: ChoiceImpact, lang: Language): string {
  const t = TRANSLATIONS[lang];
  const parts: string[] = [];
  if (impact.money !== 0) {
    const prefix = impact.money > 0 ? '+' : '';
    parts.push(`${prefix}${formatCompactMoney(impact.money, lang)}`);
  }
  if (impact.reputation !== 0) {
    parts.push(
      `${impact.reputation > 0 ? '+' : ''}${impact.reputation}% ${t.impactShort.rep}`
    );
  }
  if (impact.energy !== 0) {
    parts.push(
      `${impact.energy > 0 ? '+' : ''}${impact.energy}% ${t.impactShort.energy}`
    );
  }
  if (impact.experience !== 0 && parts.length < 3) {
    parts.push(
      `${impact.experience > 0 ? '+' : ''}${impact.experience}% ${t.impactShort.xp}`
    );
  }
  return parts.join(' · ');
}

function fmtMoneySigned(amount: number, lang: Language): string {
  if (amount > 0) return `+${formatCompactMoney(amount, lang)}`;
  if (amount < 0) return formatCompactMoney(amount, lang);
  return `0 ${TRANSLATIONS[lang].currencyShort}`;
}

export function formatChoiceImpactLine(
  choice: CardChoice,
  lang: Language
): string {
  if (!choice.dynamicOutcome) {
    return formatImpactLine(choice.impact, lang);
  }
  const { successChance, successImpact, failImpact } = choice.dynamicOutcome;
  const riskChance = 100 - successChance;
  const winMoney = fmtMoneySigned(successImpact.money, lang);
  const loseMoney = fmtMoneySigned(failImpact.money, lang);

  if (lang === 'ar') {
    return `${successChance}%: ${winMoney} · مخاطرة ${riskChance}%: ${loseMoney}`;
  }
  if (lang === 'fr') {
    return `${successChance}%: ${winMoney} · Risque ${riskChance}%: ${loseMoney}`;
  }
  return `${successChance}%: ${winMoney} · ${riskChance}% risk: ${loseMoney}`;
}

