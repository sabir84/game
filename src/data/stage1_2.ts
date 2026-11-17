import { ScenarioCard } from '../types/game';

export const STAGE_1_2_CARDS: ScenarioCard[] = [
  // ==================== STAGE 1: 20 -> 1,000 MAD ====================
  {
    id: 1,
    stage: 1,
    category: 'craft',
    content: {
      ar: {
        categoryLabel: 'حرف وإصلاح',
        character: 'المعلّم قاسم · بائع متلاشيات',
        title: 'إصلاح دراجة هوائية قديمة',
        description:
          'يعرض عليك المعلّم قاسم دراجة مستعملة بـ 15 درهماً تحتاج فقط لتبديل السلسلة وتنظيف الصدأ لإعادة بيعها فوراً.',
      },
      fr: {
        categoryLabel: 'Artisanat & Réparation',
        character: 'Maâlem Kacem · Brocanteur',
        title: 'Réparer un vieux vélo',
        description:
          'Maâlem Kacem vend un vélo d’occasion à 15 MAD. Un peu de graisse et une chaîne neuve suffisent pour le revendre.',
      },
      en: {
        categoryLabel: 'Craft & Repair',
        character: 'Maâlem Kacem · Scrap Dealer',
        title: 'Fix Up a Used Bicycle',
        description:
          'Maâlem Kacem sells a used bike for 15 MAD. A quick chain swap and rust cleanup will let you resell it today.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أشتريها وأصلحها',
          outcome: 'أصلحت الدراجة بمهارة وبعتها لعامل توصيل بربح سريع!',
        },
        fr: {
          label: 'Acheter et réparer',
          outcome: 'Vélo remis à neuf et vendu à un livreur avec un joli gain !',
        },
        en: {
          label: 'Buy & Repair',
          outcome: 'You restored it cleanly and sold it to a courier for a fast profit!',
        },
      },
      impact: { money: 45, reputation: 6, energy: -12, experience: 8 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أرفض وأحتفظ بمالي',
          outcome: 'وفّرت جهدك وسيولتك، لكن فرصة الربح ذهبت لغيرك.',
        },
        fr: {
          label: 'Garder mon argent',
          outcome: 'Énergie préservée, mais l’affaire file chez un autre.',
        },
        en: {
          label: 'Keep My Cash',
          outcome: 'You saved your energy, though someone else took the deal.',
        },
      },
      impact: { money: 0, reputation: 0, energy: 6, experience: 2 },
    },
  },
  {
    id: 2,
    stage: 1,
    category: 'trade',
    content: {
      ar: {
        categoryLabel: 'التجارة المحلية',
        character: 'العم العربي · فلاح من الضواحي',
        title: 'صندوق نعناع فاسي طازج',
        description:
          'قبل الظهر، يعرض عليك العم العربي صندوق نعناع عطر بسعر الجملة لتبيعه بالربط في الحي.',
      },
      fr: {
        categoryLabel: 'Commerce local',
        character: 'Oncle Larbi · Maraîcher',
        title: 'Caisse de menthe fraîche',
        description:
          'Avant midi, Oncle Larbi cède une caisse entière de menthe parfumée au prix de gros pour la vendre en bouquets.',
      },
      en: {
        categoryLabel: 'Local Trade',
        character: 'Uncle Larbi · Farmer',
        title: 'Fresh Mint Wholesale Crate',
        description:
          'Before noon, Uncle Larbi offers a full crate of fragrant mint at wholesale price to sell by the bunch.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أشتري وأبيع بالربط',
          outcome: 'تهافت الجيران على الرائحة الزكية ونفدت الكمية في ساعة!',
        },
        fr: {
          label: 'Vendre en bouquets',
          outcome: 'Tout le quartier s’arrache votre menthe en une heure !',
        },
        en: {
          label: 'Sell by the Bunch',
          outcome: 'Neighbors loved the aroma and bought out the crate in an hour!',
        },
      },
      impact: { money: 65, reputation: 8, energy: -12, experience: 8 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'وساطة للمقهى بعمولة',
          outcome: 'كسبت عمولة خفيفة وسريعة بأقل مجهود.',
        },
        fr: {
          label: 'Orienter vers un café',
          outcome: 'Petite commission rapide sans effort.',
        },
        en: {
          label: 'Broker to a Café',
          outcome: 'You earned a quick, effortless commission.',
        },
      },
      impact: { money: 25, reputation: 4, energy: -3, experience: 4 },
    },
  },
  {
    id: 3,
    stage: 1,
    category: 'craft',
    content: {
      ar: {
        categoryLabel: 'حرف وخدمات',
        character: 'رشيد · صاحب عربة الشاي',
        title: 'مناوبة في عربة الشاي',
        description:
          'أصيب رشيد بزكام وطلب منك بيع الشاي المنعنع مكانه أمام المحطة مقابل حصة جيدة من الأرباح.',
      },
      fr: {
        categoryLabel: 'Métiers & Services',
        character: 'Rachid · Chariot de thé',
        title: 'Tenir le chariot de thé',
        description:
          'Rachid est souffrant et vous confie son chariot de thé à la menthe devant la gare contre une belle part des recettes.',
      },
      en: {
        categoryLabel: 'Crafts & Service',
        character: 'Rachid · Tea Cart Owner',
        title: 'Run the Mint Tea Cart',
        description:
          'Rachid is under the weather and asks you to serve mint tea outside the station for a solid cut of profits.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أقبل العمل طوال المساء',
          outcome: 'لباقتك ونظافة الكؤوس جذبت المسافرين وحققت ربحاً ممتازاً!',
        },
        fr: {
          label: 'Assurer le service',
          outcome: 'Votre accueil chaleureux attire les voyageurs et gonfle la caisse !',
        },
        en: {
          label: 'Work the Evening Shift',
          outcome: 'Friendly service drew crowds of travelers and brisk sales!',
        },
      },
      impact: { money: 95, reputation: 10, energy: -16, experience: 10 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أعتذر وأرتاح',
          outcome: 'استعدت طاقتك للغد لكن رشيد اضطر لإغلاق عربته.',
        },
        fr: {
          label: 'Me reposer ce soir',
          outcome: 'Vous récupérez votre énergie, mais le stand reste fermé.',
        },
        en: {
          label: 'Take the Night Off',
          outcome: 'You rested up well, though Rachid had to shut early.',
        },
      },
      impact: { money: 0, reputation: -4, energy: 14, experience: 0 },
    },
  },
  {
    id: 4,
    stage: 1,
    category: 'community',
    content: {
      ar: {
        categoryLabel: 'الجيران والمروءة',
        character: 'الحاج عمر · جارك بالحي',
        title: 'مساعدة جار في دواء عاجل',
        description:
          'يطرق الحاج عمر بابك بخجل ويحتاج 15 درهماً ليكمل ثمن دواء زوجته حتى نهاية الأسبوع.',
      },
      fr: {
        categoryLabel: 'Voisins & Entraide',
        character: 'Haj Omar · Voisin',
        title: 'Aide urgente pour un médicament',
        description:
          'Haj Omar vous demande timidement 15 MAD pour compléter l’ordonnance de son épouse.',
      },
      en: {
        categoryLabel: 'Community Trust',
        character: 'Haj Omar · Neighbor',
        title: 'Urgent Medicine Loan',
        description:
          'Haj Omar shyly asks to borrow 15 MAD to cover his wife’s urgent prescription.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أساعده فوراً بابتسامة',
          outcome: 'دعا لك بالبركة وذاع صيت أمانتك وشهامتك بين التجار!',
        },
        fr: {
          label: 'Aider avec le sourire',
          outcome: 'Tout le quartier loue votre générosité et votre droiture !',
        },
        en: {
          label: 'Help Gladly',
          outcome: 'Word of your kindness spread quickly across the neighborhood!',
        },
      },
      impact: { money: -15, reputation: 18, energy: -2, experience: 6 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أعتذر لضيق الحال',
          outcome: 'تفهّم الجار وضعك، واحتفظت بالسيولة القليلة.',
        },
        fr: {
          label: 'Décliner poliment',
          outcome: 'Il comprend et vous préservez votre petite trésorerie.',
        },
        en: {
          label: 'Politely Decline',
          outcome: 'He understood your situation and you kept your cash.',
        },
      },
      impact: { money: 0, reputation: -6, energy: 2, experience: 1 },
    },
  },
  {
    id: 5,
    stage: 1,
    category: 'trade',
    content: {
      ar: {
        categoryLabel: 'التجارة المحلية',
        character: 'بائع من تافيلالت · السوق الأسبوعي',
        title: 'تغليف وبيع تمور المجهول',
        description:
          'وصلت شحنة تمور واحات فاخرة بسعر مخفض؛ يمكنك تغليفها في علب نظيفة لبيعها بضعف الثمن.',
      },
      fr: {
        categoryLabel: 'Commerce local',
        character: 'Vendeur du Tafilalet · Souk',
        title: 'Dattes Medjool en coffrets',
        description:
          'Une cargaison de dattes de l’oasis arrive à bon prix : en jolis coffrets, elles se vendent le double.',
      },
      en: {
        categoryLabel: 'Local Trade',
        character: 'Tafilalet Seller · Weekly Souk',
        title: 'Pack & Sell Medjool Dates',
        description:
          'Fresh oasis Medjool dates are going cheap—pack them into neat boxes to double their retail value.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أغلفها وأسوّقها بالحي',
          outcome: 'التغليف النظيف جذب الأسر ونفدت كل العلب بربح رائع!',
        },
        fr: {
          label: 'Emballer et vendre',
          outcome: 'Présentation impeccable : toutes les boîtes partent vite !',
        },
        en: {
          label: 'Pack & Retail Them',
          outcome: 'Clean packaging delighted families and sold out fast!',
        },
      },
      impact: { money: 140, reputation: 10, energy: -14, experience: 10 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أشتري علبة واحدة فقط',
          outcome: 'ربح محدود وآمن دون مجهود كبير.',
        },
        fr: {
          label: 'Prendre un petit lot',
          outcome: 'Gain modeste et sans risque.',
        },
        en: {
          label: 'Take One Small Box',
          outcome: 'Safe, modest profit with almost no fatigue.',
        },
      },
      impact: { money: 40, reputation: 4, energy: -4, experience: 4 },
    },
  },
  {
    id: 6,
    stage: 1,
    category: 'craft',
    content: {
      ar: {
        categoryLabel: 'التوصيل السريع',
        character: 'نادية · متجر محلي',
        title: 'توصيل طرود بالدراجة',
        description:
          'تحتاج نادية لموصل أمين لتوزيع 8 طلبات داخل الأحياء القريبة قبل المساء.',
      },
      fr: {
        categoryLabel: 'Livraison rapide',
        character: 'Nadia · Boutique locale',
        title: 'Tournée de colis à vélo',
        description:
          'Nadia cherche un livreur fiable pour distribuer 8 commandes dans les quartiers voisins avant le soir.',
      },
      en: {
        categoryLabel: 'Fast Delivery',
        character: 'Nadia · Local Shop',
        title: 'Local Bike Courier Run',
        description:
          'Nadia needs a dependable courier to deliver 8 local packages across nearby blocks before evening.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أقبل كل الطلبات الـ 8',
          outcome: 'أوصلت كل الطرود في الموعد ونلت إكراميات ومكافأة!',
        },
        fr: {
          label: 'Livrer les 8 colis',
          outcome: 'Toutes livrées à temps avec de beaux pourboires !',
        },
        en: {
          label: 'Deliver All 8',
          outcome: 'Every parcel arrived early and you earned generous tips!',
        },
      },
      impact: { money: 185, reputation: 12, energy: -20, experience: 10 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أختار 4 طلبات قريبة',
          outcome: 'دخل جيد مع الحفاظ على نشاطك البدني.',
        },
        fr: {
          label: 'Prendre 4 colis proches',
          outcome: 'Bon revenu tout en ménageant votre énergie.',
        },
        en: {
          label: 'Take 4 Nearby',
          outcome: 'Decent pay while saving your legs.',
        },
      },
      impact: { money: 85, reputation: 5, energy: -8, experience: 5 },
    },
  },
  {
    id: 7,
    stage: 1,
    category: 'trade',
    content: {
      ar: {
        categoryLabel: 'المنتجات المحلية',
        character: 'خالتك فاطمة · منتوج بلدي',
        title: 'بيع العسل وزيت الزيتون الحر',
        description:
          'أرسلت لك العائلة قوارير زيت زيتون وعسل طبيعي لعرضها على المعارف في المدينة.',
      },
      fr: {
        categoryLabel: 'Produits du terroir',
        character: 'Tante Fatima · Terroir',
        title: 'Miel pur et huile d’olive',
        description:
          'Votre famille vous envoie des bouteilles d’huile d’olive et du miel pur à proposer en ville.',
      },
      en: {
        categoryLabel: 'Local Goods',
        character: 'Aunt Fatima · Farm Goods',
        title: 'Pure Honey & Olive Oil',
        description:
          'Family from the countryside sent jars of pure honey and fresh olive oil for you to sell in town.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أعرضها للتذوق والبيع المباشر',
          outcome: 'الجودة الممتازة أبهرت الزبائن وطلبت العائلات المزيد!',
        },
        fr: {
          label: 'Vendre en direct',
          outcome: 'La qualité fait sensation et les commandes s’enchaînent !',
        },
        en: {
          label: 'Sell Direct with Samples',
          outcome: 'Authentic flavor won buyers over and sparked repeat orders!',
        },
      },
      impact: { money: 220, reputation: 14, energy: -12, experience: 10 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أبيعها دفعة واحدة للبقال',
          outcome: 'ربح أسرع وأقل جهداً، بهامش أقل.',
        },
        fr: {
          label: 'Céder à l’épicier',
          outcome: 'Vente instantanée mais marge plus modeste.',
        },
        en: {
          label: 'Sell Bulk to Grocer',
          outcome: 'Quick lump-sum sale with zero hassle.',
        },
      },
      impact: { money: 110, reputation: 5, energy: -4, experience: 5 },
    },
  },
  {
    id: 8,
    stage: 1,
    category: 'community',
    content: {
      ar: {
        categoryLabel: 'راحة وتوازن',
        character: 'صديقك يونس · مقهى الواحة',
        title: 'استراحة غداء وشاي بالنعناع',
        description:
          'تعمل بجهد متواصل منذ أيام؛ يدعوك يونس لوجبة دافئة واستراحة قصيرة لاستعادة عافيتك.',
      },
      fr: {
        categoryLabel: 'Équilibre & Santé',
        character: 'Ami Younes · Café Oasis',
        title: 'Déjeuner calme et thé chaud',
        description:
          'Les journées sont intenses. Younes vous propose une pause déjeuner pour recharger vos batteries.',
      },
      en: {
        categoryLabel: 'Rest & Balance',
        character: 'Friend Younes · Oasis Café',
        title: 'Warm Lunch & Mint Tea Break',
        description:
          'You have been hustling nonstop. Younes invites you to pause, eat well, and recharge.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أرتاح اليوم وأستعيد قوتي',
          outcome: 'عادت لك الحيوية الكاملة وصفاء الذهن للصفقات القادمة!',
        },
        fr: {
          label: 'Prendre cette pause',
          outcome: 'Énergie au top et esprit clair pour la suite !',
        },
        en: {
          label: 'Rest & Recharge',
          outcome: 'You feel refreshed and sharp for bigger deals ahead!',
        },
      },
      impact: { money: -30, reputation: 6, energy: 32, experience: 2 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أواصل العمل دون توقف',
          outcome: 'ربحت بعض المال لكن الإرهاق يضغط على صحتك.',
        },
        fr: {
          label: 'Continuer à travailler',
          outcome: 'Un peu plus de gains, mais la fatigue pèse lourd.',
        },
        en: {
          label: 'Push Through Work',
          outcome: 'Extra cash earned, though exhaustion is catching up.',
        },
      },
      impact: { money: 70, reputation: -4, energy: -18, experience: 6 },
    },
  },
  {
    id: 9,
    stage: 1,
    category: 'trade',
    content: {
      ar: {
        categoryLabel: 'مطبخ وحرف',
        character: 'أختك خديجة · فطور الصباح',
        title: 'مسمن وحرشة ساخنة للموظفين',
        description:
          'أمام محطة القطار، الموظفون يبحثون كل صباح عن فطور بلدي نظيف وساخن مع القهوة.',
      },
      fr: {
        categoryLabel: 'Cuisine & Commerce',
        character: 'Sœur Khadija · Maison',
        title: 'Msemen chauds pour les actifs',
        description:
          'Devant la gare, les travailleurs cherchent chaque matin des msemen maison et du café chaud.',
      },
      en: {
        categoryLabel: 'Home Craft',
        character: 'Sister Khadija · Kitchen',
        title: 'Hot Morning Msemen Stand',
        description:
          'Morning commuters by the station crave warm homemade msemen, harcha, and hot coffee.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'نجهز 50 حصة ونبيعها',
          outcome: 'إقبال هائل قبل التاسعة صباحاً وقفزة رائعة في رصيدك!',
        },
        fr: {
          label: 'Préparer 50 portions',
          outcome: 'Tout est vendu avant 9h avec un joli bond de trésorerie !',
        },
        en: {
          label: 'Prep 50 Portions',
          outcome: 'Sold out before 9 AM, giving your capital a huge boost!',
        },
      },
      impact: { money: 250, reputation: 14, energy: -18, experience: 10 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أبيع القهوة الجاهزة فقط',
          outcome: 'ربح مستقر ومريح دون تعب المطبخ.',
        },
        fr: {
          label: 'Vendre du café seul',
          outcome: 'Revenu calme et sans surmenage.',
        },
        en: {
          label: 'Coffee Cups Only',
          outcome: 'Steady pocket profit with minimal prep effort.',
        },
      },
      impact: { money: 95, reputation: 6, energy: -6, experience: 5 },
    },
  },
  {
    id: 10,
    stage: 1,
    category: 'opportunity',
    content: {
      ar: {
        categoryLabel: 'فرصة قفزة',
        character: 'تاجر مستلزمات · السوق المركزي',
        title: 'تصفية حقائب سفر وإكسسوارات',
        description:
          'تتاح لك فرصة شراء دفعة مصفاة من الحقائب بسعر رخيص جداً قبل عطلة نهاية الأسبوع.',
      },
      fr: {
        categoryLabel: 'Belle opportunité',
        character: 'Grossiste · Marché central',
        title: 'Lot de sacs en déstockage',
        description:
          'Un grossiste solde un lot de sacs de voyage juste avant le week-end à prix cassé.',
      },
      en: {
        categoryLabel: 'Breakout Deal',
        character: 'Wholesaler · Central Market',
        title: 'Clearance Travel Bags Lot',
        description:
          'A wholesaler is clearing sturdy travel bags at steep discounts right before the weekend rush.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أستثمر كل ما جمعته فيها',
          outcome: 'صفقة ذهبية! بعتها جميعاً ودخلت عتبة التجارة المتوسطة!',
        },
        fr: {
          label: 'Miser sur le lot entier',
          outcome: 'Coup de maître ! Vous passez au niveau supérieur !',
        },
        en: {
          label: 'Go All In on the Lot',
          outcome: 'Golden flip! You sold every bag and unlocked serious capital!',
        },
      },
      impact: { money: 320, reputation: 12, energy: -16, experience: 12 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أبيع بالطلب المسبق فقط',
          outcome: 'عمولة مضمونة وآمنة دون مخاطرة في المخزون.',
        },
        fr: {
          label: 'Sur précommande',
          outcome: 'Gain sûr sans immobiliser votre argent.',
        },
        en: {
          label: 'Pre-Orders Only',
          outcome: 'Safe commission without tying up your cash.',
        },
      },
      impact: { money: 140, reputation: 8, energy: -6, experience: 7 },
    },
  },

  // ==================== STAGE 2: 1,000 -> 50,000 MAD ====================
  {
    id: 11,
    stage: 2,
    category: 'trade',
    content: {
      ar: {
        categoryLabel: 'التجارة المتوسطة',
        character: 'سمسار المحلات · الشارع التجاري',
        title: 'افتتاح أول محل تجاري صغير',
        description:
          'تتوفر فرصة كراء محل بموقع نشيط؛ سيكلفك التجهيز الأولي، لكنه يضعك في مصاف التجار الرسميين.',
      },
      fr: {
        categoryLabel: 'Commerce intermédiaire',
        character: 'Agent · Avenue commerçante',
        title: 'Ouvrir votre première boutique',
        description:
          'Un local bien placé se libère. L’aménagement coûte cher au départ, mais vos ventes vont décoller.',
      },
      en: {
        categoryLabel: 'Mid-Scale Trade',
        character: 'Broker · Commercial Street',
        title: 'Open Your First Retail Shop',
        description:
          'A prime corner shop is up for rent. Fitting it out costs upfront cash, yet multiplies daily foot traffic.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أستأجر المحل وأجهزه بأناقة',
          outcome: 'افتتاح ناجح! تدفّق الزبائن وتضاعفت مبيعاتك اليومية!',
        },
        fr: {
          label: 'Ouvrir et aménager',
          outcome: 'Lancement réussi ! Les clients affluent dès le premier jour !',
        },
        en: {
          label: 'Lease & Fit Out Shop',
          outcome: 'Grand opening hit! Foot traffic doubled your daily turnover!',
        },
      },
      impact: { money: 4500, reputation: 14, energy: -18, experience: 12 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أشارك في ركن مؤقت فقط',
          outcome: 'وفّرت التكاليف وحققت دخلاً معتدلاً من الركن التجاري.',
        },
        fr: {
          label: 'Louer un petit stand',
          outcome: 'Frais réduits et profit régulier sans engagement lourd.',
        },
        en: {
          label: 'Rent a Pop-Up Corner',
          outcome: 'Lower overhead and steady earnings without a long lease.',
        },
      },
      impact: { money: 1600, reputation: 6, energy: -8, experience: 6 },
    },
  },
  {
    id: 12,
    stage: 2,
    category: 'opportunity',
    content: {
      ar: {
        categoryLabel: 'الاستيراد والجملة',
        character: 'مورّد دولي · ميناء الدار البيضاء',
        title: 'استيراد إكسسوارات الهواتف بالجملة',
        description:
          'يعرض عليك مستورد حاوية صغيرة من الشواحن والسماعات عالية الجودة بهامش ربح مغرٍ للمتاجر.',
      },
      fr: {
        categoryLabel: 'Import & Gros',
        character: 'Fournisseur · Port de Casablanca',
        title: 'Importer des accessoires tech',
        description:
          'Un importateur propose un lot d’accessoires smartphone de qualité à forte marge de revente.',
      },
      en: {
        categoryLabel: 'Wholesale Import',
        character: 'Supplier · Casablanca Port',
        title: 'Import Phone Accessories Batch',
        description:
          'An importer offers a container lot of certified chargers and earbuds with strong retail margins.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أشتري الدفعة وأوزعها للمحلات',
          outcome: 'وزعتها على 15 متجراً في المدينة بأرباح قوية جداً!',
        },
        fr: {
          label: 'Importer et distribuer',
          outcome: 'Distribué à 15 boutiques : votre capital grimpe en flèche !',
        },
        en: {
          label: 'Import & Distribute',
          outcome: 'Supplied 15 local shops and booked massive wholesale profits!',
        },
      },
      impact: { money: 7200, reputation: 12, energy: -16, experience: 12 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أكتفي بعينات لمتجري',
          outcome: 'تجربة آمنة وربح محدود دون ضغط التوزيع.',
        },
        fr: {
          label: 'Tester un petit stock',
          outcome: 'Vente tranquille en boutique sans risque logistique.',
        },
        en: {
          label: 'Stock Only My Shop',
          outcome: 'Safe in-store sales without distribution headaches.',
        },
      },
      impact: { money: 2400, reputation: 5, energy: -6, experience: 6 },
    },
  },
  {
    id: 13,
    stage: 2,
    category: 'community',
    content: {
      ar: {
        categoryLabel: 'فريق العمل',
        character: 'الموارد البشرية · التوسع',
        title: 'توظيف مساعدين اثنين لإدارة الطلبات',
        description:
          'تراكمت الطلبات عليك وصار العمل الفردي يستهلك صحتك. حان وقت بناء فريق شاب وأمين.',
      },
      fr: {
        categoryLabel: 'Équipe & Gestion',
        character: 'Recrutement · Expansion',
        title: 'Embaucher deux assistants',
        description:
          'Les commandes débordent et vous vous épuisez seul. Il est temps de recruter deux vendeurs fiables.',
      },
      en: {
        categoryLabel: 'Team Growth',
        character: 'Operations · Scaling Up',
        title: 'Hire Two Store Assistants',
        description:
          'Orders are piling up and solo work is draining you. Hiring two sharp helpers could scale operations.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أوظفهما وأدربهما جيداً',
          outcome: 'تضاعفت سرعة الخدمة وارتفعت طاقتك وأرباح المحل معاً!',
        },
        fr: {
          label: 'Recruter et former',
          outcome: 'Service deux fois plus rapide, plus d’énergie et plus de ventes !',
        },
        en: {
          label: 'Hire & Train Both',
          outcome: 'Service speed doubled while freeing up your time and energy!',
        },
      },
      impact: { money: 5500, reputation: 14, energy: 15, experience: 10 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أؤجل التوظيف لتوفير الأجور',
          outcome: 'وفّرت الرواتب لكن العمل الشاق أرهقك وأخّر بعض الزبائن.',
        },
        fr: {
          label: 'Tout gérer seul',
          outcome: 'Salaires économisés mais gros retard et fatigue intense.',
        },
        en: {
          label: 'Handle It Solo',
          outcome: 'Saved payroll, but delays and fatigue cost you goodwill.',
        },
      },
      impact: { money: 1800, reputation: -8, energy: -22, experience: 5 },
    },
  },
  {
    id: 14,
    stage: 2,
    category: 'opportunity',
    content: {
      ar: {
        categoryLabel: 'منافسة التجار',
        character: 'منافس قوي · الشارع المقابل',
        title: 'حملة تخفيضات شرسة من المنافس',
        description:
          'أطلق تاجر منافس حملة إعلانية بتخفيضات قوية لجذب زبائنك الدائمين.',
      },
      fr: {
        categoryLabel: 'Concurrence',
        character: 'Concurrent · Rue d’en face',
        title: 'Offensive prix d’un rival',
        description:
          'Un concurrent lance une campagne agressive de rabais pour attirer votre clientèle fidèle.',
      },
      en: {
        categoryLabel: 'Market Rivalry',
        character: 'Strong Rival · Across the Street',
        title: 'Competitor Launches Price War',
        description:
          'A rival merchant across the street launches deep discounts and ads targeting your loyal buyers.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أطلق باقة وفاء وضمان جودة',
          outcome: 'فضّل الزبائن ضمانك وخدمتك الراقية وتفوقت على المنافس!',
        },
        fr: {
          label: 'Lancer fidélité & garantie',
          outcome: 'Les clients préfèrent votre sérieux et restent fidèles !',
        },
        en: {
          label: 'Launch Loyalty & Warranty',
          outcome: 'Customers chose trusted quality over cheap gimmicks!',
        },
      },
      impact: { money: 6400, reputation: 16, energy: -12, experience: 12 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أحرق الأسعار بأقل منه',
          outcome: 'حافظت على الحصة لكنك خسرت جزءاً من أرباحك.',
        },
        fr: {
          label: 'Casser les prix aussi',
          outcome: 'Ventes maintenues mais marge lourdement érodée.',
        },
        en: {
          label: 'Undercut His Prices',
          outcome: 'Kept sales volume at the cost of a steep margin loss.',
        },
      },
      impact: { money: -1800, reputation: -4, energy: -14, experience: 8 },
    },
  },
  {
    id: 15,
    stage: 2,
    category: 'trade',
    content: {
      ar: {
        categoryLabel: 'عقود التوريد',
        character: 'شبكة مقاهٍ وفنادق محلية',
        title: 'عقد توريد القهوة والمستلزمات',
        description:
          'تطلب سلسلة من 6 مقاهٍ وفنادق مورداً منتظماً للبن والتمور الفاخرة بعقد سنوي.',
      },
      fr: {
        categoryLabel: 'Contrats B2B',
        character: 'Réseau de cafés & hôtels',
        title: 'Contrat de fourniture annuel',
        description:
          'Six hôtels et cafés cherchent un fournisseur régulier de café et dattes de prestige.',
      },
      en: {
        categoryLabel: 'B2B Contracts',
        character: 'Local Café & Hotel Group',
        title: 'Annual Supply Contract',
        description:
          'A chain of 6 cafés and boutique hotels seeks a reliable monthly supplier for coffee and dates.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أوقّع العقد وألتزم بالجودة',
          outcome: 'دخل شهري ثابت ومضمون رفع رأس مالك بقفزة رائعة!',
        },
        fr: {
          label: 'Signer le contrat',
          outcome: 'Revenus réguliers sécurisés et hausse spectaculaire du capital !',
        },
        en: {
          label: 'Sign & Deliver Quality',
          outcome: 'Locked in recurring B2B revenue and surged ahead!',
        },
      },
      impact: { money: 9500, reputation: 15, energy: -16, experience: 12 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أكتفي بتوريد مقهيين فقط',
          outcome: 'عقد مريح وآمن يناسب قدرتك الحالية.',
        },
        fr: {
          label: 'Fournir 2 cafés seulement',
          outcome: 'Contrat plus léger et facile à honorer.',
        },
        en: {
          label: 'Supply Just 2 Cafés',
          outcome: 'Comfortable workload with modest steady profit.',
        },
      },
      impact: { money: 3200, reputation: 7, energy: -6, experience: 6 },
    },
  },
  {
    id: 16,
    stage: 2,
    category: 'craft',
    content: {
      ar: {
        categoryLabel: 'اللوجستيك والتوصيل',
        character: 'أسطول التوزيع · المدينة',
        title: 'شراء 3 دراجات نارية للتوصيل',
        description:
          'مع تزايد الطلبات عبر الإنترنت، سيمكنك امتلاك دراجات توصيل خاصة من تغطية كل أحياء المدينة.',
      },
      fr: {
        categoryLabel: 'Logistique',
        character: 'Flotte de livraison',
        title: 'Acheter 3 scooters de livraison',
        description:
          'Avec l’essor des commandes en ligne, 3 scooters vous permettraient de livrer toute la ville.',
      },
      en: {
        categoryLabel: 'Logistics Fleet',
        character: 'City Delivery Network',
        title: 'Buy 3 Delivery Scooters',
        description:
          'Online orders are booming—owning a 3-scooter delivery team lets you serve the entire city.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أشتري الدراجات وأطلق الخدمة',
          outcome: 'توسعت الطلبات لكل المدينة وصار متجرك الأشهر في التوصيل!',
        },
        fr: {
          label: 'Lancer la flotte',
          outcome: 'Livraison express partout : votre enseigne devient la référence !',
        },
        en: {
          label: 'Launch Express Fleet',
          outcome: 'Same-day city delivery made your brand the fastest in town!',
        },
      },
      impact: { money: 8200, reputation: 12, energy: -14, experience: 12 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أتعاقد مع شركة توصيل خارجية',
          outcome: 'ربح أقل لكن دون صيانة أو مصاريف أسطول.',
        },
        fr: {
          label: 'Sous-traiter la livraison',
          outcome: 'Moins de tracas techniques mais marge partagée.',
        },
        en: {
          label: 'Outsource Couriers',
          outcome: 'Avoided vehicle upkeep while sharing some margin.',
        },
      },
      impact: { money: 2900, reputation: 5, energy: -4, experience: 5 },
    },
  },
  {
    id: 17,
    stage: 2,
    category: 'trade',
    content: {
      ar: {
        categoryLabel: 'التجارة الموسمية',
        character: 'مصنع الألبسة · طنجة',
        title: 'صفقة الألبسة واللوازم الموسمية',
        description:
          'يعرض مصنع وطني تشكيلة ممتازة قبل العيد بسعر تفضيلي للموزعين الجادين.',
      },
      fr: {
        categoryLabel: 'Commerce saisonnier',
        character: 'Atelier textile · Tanger',
        title: 'Collection prêt-à-porter de fête',
        description:
          'Une usine nationale propose une superbe collection avant l’Aïd à tarif préférentiel.',
      },
      en: {
        categoryLabel: 'Seasonal Trade',
        character: 'Textile Factory · Tangier',
        title: 'Festive Apparel Wholesale Run',
        description:
          'A domestic factory offers crisp seasonal apparel right before the holidays at distributor pricing.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أحجز الكمية وأوزعها قبل الموسم',
          outcome: 'طلب هائل من العائلات والمتاجر وأرباح قياسية!',
        },
        fr: {
          label: 'Réserver tout le lot',
          outcome: 'Succès fou auprès des familles : bénéfice record !',
        },
        en: {
          label: 'Book & Distribute Early',
          outcome: 'Families flocked to the collection and profits soared!',
        },
      },
      impact: { money: 11500, reputation: 14, energy: -18, experience: 12 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أطلب كمية محدودة لمتجري',
          outcome: 'مبيعات ممتازة ومضمونة دون مخاطرة فائض المخزون.',
        },
        fr: {
          label: 'Stock limité en boutique',
          outcome: 'Ventes propres sans invendus.',
        },
        en: {
          label: 'Order Limited Stock',
          outcome: 'Clean sell-through with zero leftover inventory.',
        },
      },
      impact: { money: 4100, reputation: 6, energy: -6, experience: 6 },
    },
  },
  {
    id: 18,
    stage: 2,
    category: 'opportunity',
    content: {
      ar: {
        categoryLabel: 'إدارة الأزمات',
        character: 'عاصفة مطرية · مستودع البضاعة',
        title: 'تسرب مياه في المستودع الصغير',
        description:
          'تسببت أمطار غزيرة في تسرب ماء قرب صناديق البضاعة؛ التدخل السريع ينقذ المخزون.',
      },
      fr: {
        categoryLabel: 'Gestion de crise',
        character: 'Intempéries · Entrepôt',
        title: 'Infiltration d’eau au dépôt',
        description:
          'De fortes pluies menacent vos cartons au dépôt. Agir vite peut sauver le stock.',
      },
      en: {
        categoryLabel: 'Crisis Control',
        character: 'Storm Alert · Storage Depot',
        title: 'Warehouse Roof Leak',
        description:
          'Heavy rain is leaking near your stocked crates. Fast action can save most of the goods.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أستأجر مخزناً جافاً وأنقلها فوراً',
          outcome: 'أنقذت 95% من البضاعة وكسبت احترام المورّدين لحرصك!',
        },
        fr: {
          label: 'Transférer vers un dépôt sec',
          outcome: '95% du stock sauvé et votre réactivité est saluée !',
        },
        en: {
          label: 'Relocate to Dry Storage',
          outcome: 'Saved 95% of your stock and impressed suppliers with your speed!',
        },
      },
      impact: { money: -2800, reputation: 10, energy: -14, experience: 10 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أنتظر توقف المطر لتقليل الكلفة',
          outcome: 'تلف جزء كبير من البضاعة وتأخرت طلبات الزبائن.',
        },
        fr: {
          label: 'Attendre la fin de la pluie',
          outcome: 'Une grande partie du stock est abîmée et les clients s’impatientent.',
        },
        en: {
          label: 'Wait Out the Storm',
          outcome: 'Water ruined key stock and delayed customer orders.',
        },
      },
      impact: { money: -5500, reputation: -12, energy: -6, experience: 6 },
    },
  },
  {
    id: 19,
    stage: 2,
    category: 'community',
    content: {
      ar: {
        categoryLabel: 'السمعة المجتمعية',
        character: 'الجمعية المحلية · التكافل',
        title: 'رعاية دوري رياضي لشباب الحي',
        description:
          'يطلب منظمو دوري الأحياء رعاية الأقمصة والجوائز مقابل وضع اسم متجرك على القمصان.',
      },
      fr: {
        categoryLabel: 'Image & Quartier',
        character: 'Association locale · Sport',
        title: 'Sponsoriser le tournoi des jeunes',
        description:
          'Les organisateurs proposent d’afficher votre enseigne sur les maillots contre le financement des équipements.',
      },
      en: {
        categoryLabel: 'Brand Trust',
        character: 'Youth Association · Local Cup',
        title: 'Sponsor Neighborhood Cup',
        description:
          'Local organizers offer to feature your shop brand on jerseys if you sponsor kits and trophies.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أرعى الدوري وأحضر النهائي',
          outcome: 'ضجّ الحي بالثناء عليك وتضاعف الزبائن من الأسر والشباب!',
        },
        fr: {
          label: 'Sponsoriser le tournoi',
          outcome: 'Votre marque devient adorée dans toute la ville !',
        },
        en: {
          label: 'Sponsor & Attend Finals',
          outcome: 'The whole community cheered your brand and packed your shop!',
        },
      },
      impact: { money: 4800, reputation: 22, energy: -8, experience: 8 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أعتذر عن الرعاية',
          outcome: 'وفّرت مبلغ الرعاية لكنك فوتّ إشهاراً شعبياً قوياً.',
        },
        fr: {
          label: 'Décliner le sponsoring',
          outcome: 'Budget préservé mais belle vitrine manquée.',
        },
        en: {
          label: 'Skip Sponsorship',
          outcome: 'Saved cash today, though missed strong community goodwill.',
        },
      },
      impact: { money: 0, reputation: -6, energy: 4, experience: 2 },
    },
  },
  {
    id: 20,
    stage: 2,
    category: 'opportunity',
    content: {
      ar: {
        categoryLabel: 'توسيع النشاط',
        character: 'بنك وشريك تجاري · فرصة كبرى',
        title: 'الاندماج مع مركز توزيع جهوي',
        description:
          'يقترح عليك موزع جهوي تحويل نشاطك إلى نقطة توزيع معتمدة للجهة كلها.',
      },
      fr: {
        categoryLabel: 'Croissance régionale',
        character: 'Partenaire · Distribution',
        title: 'Devenir centre de distribution',
        description:
          'Un distributeur régional propose de faire de votre entreprise le hub officiel de la région.',
      },
      en: {
        categoryLabel: 'Regional Expansion',
        character: 'Partner · Distribution Hub',
        title: 'Become Regional Distribution Hub',
        description:
          'A regional wholesaler wants to upgrade your store into an official distribution center for the province.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أوقّع اتفاقية التوزيع الجهوي',
          outcome: 'صفقة فارقة! تجاوزت حاجز التجارة المتوسطة نحو ريادة الأعمال!',
        },
        fr: {
          label: 'Signer l’accord régional',
          outcome: 'Cap décisif franchi : bienvenue dans l’entrepreneuriat !',
        },
        en: {
          label: 'Sign Regional Deal',
          outcome: 'Game-changing deal! You have graduated to full-scale entrepreneurship!',
        },
      },
      impact: { money: 16500, reputation: 16, energy: -18, experience: 15 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أفتح فرعاً ثانياً مستقلاً',
          outcome: 'نمو متوازن يضيف لك دخلاً قوياً بخطى واثقة.',
        },
        fr: {
          label: 'Ouvrir une 2e boutique',
          outcome: 'Expansion maîtrisée avec de solides revenus.',
        },
        en: {
          label: 'Open Second Branch',
          outcome: 'Controlled expansion adding solid recurring income.',
        },
      },
      impact: { money: 7500, reputation: 10, energy: -10, experience: 9 },
    },
  },

  // ==================== STAGE 3: 50,000 -> 1,000,000 MAD ====================
];
