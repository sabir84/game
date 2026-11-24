import { ScenarioCard } from '../types/game';

export const STAGE_3_4_CARDS: ScenarioCard[] = [
  // ==================== STAGE 3: 50,000 -> 1,000,000 MAD ====================
  {
    id: 21,
    stage: 3,
    category: 'craft',
    content: {
      ar: {
        categoryLabel: 'ريادة الأعمال · الصناعة',
        character: 'المنطقة الصناعية · مشروع مصنع',
        title: 'إنشاء مصنع لتعبئة وتغليف المنتجات',
        description:
          'بدل الشراء من المصانع، يمكنك الآن تجهيز خط إنتاج وتعبئة خاص بعلامتك التجارية.',
      },
      fr: {
        categoryLabel: 'Entrepreneuriat · Industrie',
        character: 'Zone industrielle · Usine',
        title: 'Créer votre usine de conditionnement',
        description:
          'Plutôt que d’acheter aux tiers, équipez votre propre ligne de production sous votre marque.',
      },
      en: {
        categoryLabel: 'Entrepreneurship · Industry',
        character: 'Industrial Park · Factory',
        title: 'Build a Packaging & Processing Plant',
        description:
          'Instead of buying from factories, launch your own automated packaging line under your brand.',
      },
      es: {
        categoryLabel: 'Emprendimiento · Industria',
        character: 'Polígono Industrial · Fábrica',
        title: 'Montar planta de envasado propia',
        description:
          'En lugar de comprar a terceros, instala tu propia línea automatizada de producción con tu marca.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أشيّد خط الإنتاج الحديث',
          outcome: 'تضاعف هامش الربح وانخفضت التكلفة وزادت الطلبات من كل المدن!',
        },
        fr: {
          label: 'Lancer la ligne moderne',
          outcome: 'Coûts divisés par deux et commandes de tout le pays !',
        },
        en: {
          label: 'Build Modern Line',
          outcome: 'Unit costs plummeted and nationwide orders surged!',
        },
        es: {
          label: 'Construir línea moderna',
          outcome: '¡Bajaron los costes a la mitad y llegaron pedidos de todo el país!',
        },
      },
      impact: { money: 110000, reputation: 14, energy: -18, experience: 14 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أستأجر حصة في مصنع قائم',
          outcome: 'دخل جيد مع تجنب تكاليف البناء الأولية.',
        },
        fr: {
          label: 'Sous-louer une ligne',
          outcome: 'Bon rendement sans immobiliser trop de capital.',
        },
        en: {
          label: 'Lease Existing Line',
          outcome: 'Solid returns without heavy construction overhead.',
        },
        es: {
          label: 'Alquilar línea existente',
          outcome: 'Buena rentabilidad sin fuertes gastos de obra.',
        },
      },
      impact: { money: 45000, reputation: 6, energy: -8, experience: 7 },
    },
  },
  {
    id: 22,
    stage: 3,
    category: 'opportunity',
    content: {
      ar: {
        categoryLabel: 'الاستثمار العقاري',
        character: 'مكتب التوثيق · مشروع سكني',
        title: 'تطوير عمارة سكنية وتجارية',
        description:
          'أرض استراتيجية في حي صاعد معروضة لبناء شقق ومحلات تجارية جاهزة للبيع.',
      },
      fr: {
        categoryLabel: 'Immobilier',
        character: 'Notaire · Projet résidentiel',
        title: 'Construire un immeuble mixte',
        description:
          'Un terrain stratégique dans un quartier en plein essor est disponible pour un projet immobilier.',
      },
      en: {
        categoryLabel: 'Real Estate',
        character: 'Notary · Urban Project',
        title: 'Develop Mixed-Use Building',
        description:
          'Prime land in a booming district is available for apartments and ground-floor retail units.',
      },
      es: {
        categoryLabel: 'Inmobiliaria',
        character: 'Notaría · Proyecto urbano',
        title: 'Promover edificio mixto',
        description:
          'Hay un solar estratégico en un barrio en auge para construir viviendas y locales comerciales.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أقود المشروع مع مهندسين أكفاء',
          outcome: 'بيعت الوحدات على المخطط وحققت أرباحاً عقارية ضخمة!',
        },
        fr: {
          label: 'Lancer le projet immobilier',
          outcome: 'Appartements vendus sur plan : énorme plus-value !',
        },
        en: {
          label: 'Develop & Presell Units',
          outcome: 'Units sold out off-plan, delivering massive real-estate gains!',
        },
        es: {
          label: 'Promover y vender sobre plano',
          outcome: '¡Todo vendido sobre plano con enormes plusvalías inmobiliarias!',
        },
      },
      impact: { money: 185000, reputation: 15, energy: -20, experience: 15 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أدخل بنسبة شريك مموّل فقط',
          outcome: 'ربح مريح ومضمون دون متاعب متابعة الورش.',
        },
        fr: {
          label: 'Investir en partenaire passif',
          outcome: 'Gain confortable sans gérer le chantier.',
        },
        en: {
          label: 'Join as Silent Partner',
          outcome: 'Comfortable returns without managing construction daily.',
        },
        es: {
          label: 'Entrar como socio inversor',
          outcome: 'Beneficio cómodo sin gestionar la obra día a día.',
        },
      },
      impact: { money: 75000, reputation: 8, energy: -6, experience: 8 },
    },
  },
  {
    id: 23,
    stage: 3,
    category: 'trade',
    content: {
      ar: {
        categoryLabel: 'الفلاحة العصرية',
        character: 'المهندس الزراعي · سهل سوس',
        title: 'ضيعة فلاحية بالسقي بالتنقيط',
        description:
          'فرصة للاستثمار في ضيعة للأفوكادو والحوامض بنظام السقي الذكي والطاقة الشمسية للتصدير.',
      },
      fr: {
        categoryLabel: 'Agriculture moderne',
        character: 'Ingénieur agronome · Souss',
        title: 'Ferme moderne irriguée au solaire',
        description:
          'Investissez dans un domaine d’agrumes et d’avocats équipé en goutte-à-goutte solaire pour l’export.',
      },
      en: {
        categoryLabel: 'Agri-Tech',
        character: 'Agronomist · Souss Valley',
        title: 'Solar Drip-Irrigated Farm Estate',
        description:
          'Invest in a modern citrus and avocado estate using smart drip irrigation and solar pumps for export.',
      },
      es: {
        categoryLabel: 'Agricultura moderna',
        character: 'Ingeniero agrónomo · Valle del Sus',
        title: 'Finca moderna con riego solar',
        description:
          'Invierte en una finca de cítricos y aguacates con riego por goteo inteligente y energía solar para exportar.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أموّل الضيعة بأحدث التقنيات',
          outcome: 'إنتاجية قياسية وتصدير مباشر للأسواق الأوروبية!',
        },
        fr: {
          label: 'Financer la ferme high-tech',
          outcome: 'Récolte record et contrats d’exportation immédiats !',
        },
        en: {
          label: 'Fund Modern Estate',
          outcome: 'Record harvest yields unlocked direct European export buyers!',
        },
        es: {
          label: 'Financiar finca high-tech',
          outcome: '¡Cosecha récord y contratos de exportación directa a Europa!',
        },
      },
      impact: { money: 160000, reputation: 16, energy: -16, experience: 14 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أشتري المحصول للتسويق المحلي',
          outcome: 'أرباح جيدة في السوق الداخلي ومخاطرة محدودة.',
        },
        fr: {
          label: 'Acheter la récolte locale',
          outcome: 'Bons profits nationaux sans risque agricole.',
        },
        en: {
          label: 'Buy Local Harvest Only',
          outcome: 'Solid domestic margins with zero farm capex.',
        },
        es: {
          label: 'Comprar cosecha local',
          outcome: 'Buenos márgenes en el mercado nacional sin riesgo agrícola.',
        },
      },
      impact: { money: 65000, reputation: 8, energy: -6, experience: 7 },
    },
  },
  {
    id: 24,
    stage: 3,
    category: 'opportunity',
    content: {
      ar: {
        categoryLabel: 'شراكات كبرى',
        character: 'مجموعة متاجر كبرى · شراكة وطنية',
        title: 'إدراج علامتك في المتاجر الكبرى',
        description:
          'تفاوضك سلسلة أسواق ممتازة كبرى لتوفير منتجاتك على رفوف 40 فرعاً عبر المملكة.',
      },
      fr: {
        categoryLabel: 'Grands partenariats',
        character: 'Grande distribution · National',
        title: 'Entrer en grande surface',
        description:
          'Une enseigne nationale veut référencer vos produits dans 40 hypermarchés à travers le pays.',
      },
      en: {
        categoryLabel: 'Major Partnerships',
        character: 'National Supermarket Chain',
        title: 'Nationwide Retail Chain Deal',
        description:
          'A major supermarket group wants your product line stocked across 40 flagship stores nationwide.',
      },
      es: {
        categoryLabel: 'Grandes alianzas',
        character: 'Cadena nacional de supermercados',
        title: 'Entrar en grandes superficies',
        description:
          'Una gran cadena nacional quiere incluir tus productos en las estanterías de 40 hipermercados.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أوسّع طاقتي وأوقّع الشراكة',
          outcome: 'تحوّلت علامتك إلى اسم وطني معروف وتدفقّت السيولة!',
        },
        fr: {
          label: 'Signer le référencement',
          outcome: 'Votre marque devient nationale et les revenus explosent !',
        },
        en: {
          label: 'Scale & Sign Chain Deal',
          outcome: 'Your brand became a household name with massive cash flow!',
        },
        es: {
          label: 'Ampliar y firmar alianza',
          outcome: '¡Tu marca se volvió referente nacional y se dispararon los ingresos!',
        },
      },
      impact: { money: 210000, reputation: 18, energy: -18, experience: 15 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أبدأ بـ 10 متاجر تجريبية',
          outcome: 'نمو آمن ومدروس يحمي جودة التوريد.',
        },
        fr: {
          label: 'Tester dans 10 magasins',
          outcome: 'Déploiement maîtrisé sans pression de rupture.',
        },
        en: {
          label: 'Pilot in 10 Stores',
          outcome: 'Steady, stress-free rollout protecting supply quality.',
        },
        es: {
          label: 'Probar en 10 tiendas',
          outcome: 'Despliegue seguro que protege la calidad del suministro.',
        },
      },
      impact: { money: 85000, reputation: 10, energy: -8, experience: 8 },
    },
  },
  {
    id: 25,
    stage: 3,
    category: 'craft',
    content: {
      ar: {
        categoryLabel: 'اللوجستيك والتبريد',
        character: 'منصة التصدير · أكادير',
        title: 'بناء مستودع تبريد لوجستي',
        description:
          'نقص مستودعات التبريد يؤخر تصدير الخضر والفواكه؛ إنشاؤك لمحطة تبريد سيخدم عشرات المصدرين.',
      },
      fr: {
        categoryLabel: 'Logistique & Froid',
        character: 'Plateforme export · Agadir',
        title: 'Entrepôt frigorifique logistique',
        description:
          'Les exportateurs manquent de stockage froid. Construire un hub frigorifique générera de forts loyers.',
      },
      en: {
        categoryLabel: 'Cold Logistics',
        character: 'Export Hub · Agadir',
        title: 'Cold-Chain Storage Hub',
        description:
          'Exporters face cold-storage bottlenecks—building a refrigerated hub brings high recurring fees.',
      },
      es: {
        categoryLabel: 'Logística en frío',
        character: 'Plataforma exportación · Agadir',
        title: 'Almacén frigorífico logístico',
        description:
          'Falta almacenamiento en frío para exportar frutas y verduras; construir un polo frigorífico asegura altos alquileres.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أستثمر في محطة التبريد',
          outcome: 'امتلأ المستودع بالعقود قبل الافتتاح الرسمي!',
        },
        fr: {
          label: 'Construire le hub froid',
          outcome: 'Capacité réservée à 100% avant même l’ouverture !',
        },
        en: {
          label: 'Build Cold-Chain Hub',
          outcome: 'Booked to 100% capacity before opening day!',
        },
        es: {
          label: 'Construir polo de frío',
          outcome: '¡Capacidad reservada al 100% antes de la inauguración!',
        },
      },
      impact: { money: 145000, reputation: 14, energy: -15, experience: 12 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أشتري شاحنتين مبردتين فقط',
          outcome: 'أرباح نقل محترمة دون كلفة بناء المستودع.',
        },
        fr: {
          label: 'Acheter 2 camions frigo',
          outcome: 'Revenus de transport solides et flexibles.',
        },
        en: {
          label: 'Buy 2 Reefer Trucks',
          outcome: 'Flexible transport income without heavy facility capex.',
        },
        es: {
          label: 'Comprar 2 camiones frigo',
          outcome: 'Ingresos flexibles de transporte sin gran obra.',
        },
      },
      impact: { money: 62000, reputation: 7, energy: -8, experience: 7 },
    },
  },
  {
    id: 26,
    stage: 3,
    category: 'community',
    content: {
      ar: {
        categoryLabel: 'السياحة الراقية',
        character: 'المدينة العتيقة · مراكش',
        title: 'تحويل رياض تاريخي إلى فندق فخم',
        description:
          'فرصة لترميم رياض تراثي أصيل وتحويله إلى وجهة سياحية راقية للزوار الدوليين.',
      },
      fr: {
        categoryLabel: 'Hôtellerie de charme',
        character: 'Médina · Marrakech',
        title: 'Rénover un Riad de luxe',
        description:
          'Transformez un riad historique en maison d’hôtes prestigieuse pour la clientèle internationale.',
      },
      en: {
        categoryLabel: 'Luxury Hospitality',
        character: 'Old Medina · Marrakech',
        title: 'Restore a Boutique Luxury Riad',
        description:
          'Transform an authentic historic riad into a flagship luxury boutique stay for global travelers.',
      },
      es: {
        categoryLabel: 'Turismo de lujo',
        character: 'Medina · Marrakech',
        title: 'Restaurar un Riad histórico de lujo',
        description:
          'Transforma un riad tradicional en un hotel boutique de prestigio para viajeros internacionales.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أرممه بالزليج والصناعة التقليدية',
          outcome: 'حجوزات كاملة طوال السنة وإشادة عالمية بالجمال المغربي!',
        },
        fr: {
          label: 'Restaurer avec des maâlems',
          outcome: 'Complet toute l’année et plébiscité par les voyageurs !',
        },
        en: {
          label: 'Restore with Master Artisans',
          outcome: 'Booked year-round and featured in global travel magazines!',
        },
        es: {
          label: 'Restaurar con maestros artesanos',
          outcome: '¡Lleno todo el año y elogiado en revistas internacionales!',
        },
      },
      impact: { money: 175000, reputation: 20, energy: -16, experience: 14 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أبيعه بعد الترميم الأولي مباشرة',
          outcome: 'ربح عقاري سريع مع توفير جهد الإدارة الفندقية.',
        },
        fr: {
          label: 'Revendre après gros œuvre',
          outcome: 'Plus-value rapide sans gérer l’exploitation hôtelière.',
        },
        en: {
          label: 'Flip After Renovation',
          outcome: 'Quick property flip profit without ongoing hotel management.',
        },
        es: {
          label: 'Vender tras la reforma',
          outcome: 'Plusvalía rápida sin gestionar la operación hotelera.',
        },
      },
      impact: { money: 88000, reputation: 8, energy: -8, experience: 8 },
    },
  },
  {
    id: 27,
    stage: 3,
    category: 'trade',
    content: {
      ar: {
        categoryLabel: 'مستحضرات التجميل الطبيعية',
        character: 'تعاونية نسائية · تجميل طبيعي',
        title: 'خط عالمي لزيت الأركان والورد',
        description:
          'تطوير علامة عناية طبيعية تعتمد على زيت الأركان البكر وماء الورد لتصديرها للخارج.',
      },
      fr: {
        categoryLabel: 'Cosmétique naturelle',
        character: 'Coopérative · Argan & Rose',
        title: 'Gamme Argan bio pour l’export',
        description:
          'Créez une marque de soins naturels à l’huile d’argan et eau de rose destinée aux marchés étrangers.',
      },
      en: {
        categoryLabel: 'Natural Cosmetics',
        character: 'Women’s Cooperative · Argan',
        title: 'Organic Argan & Rose Skincare',
        description:
          'Partner with cooperatives to launch a certified organic argan skincare line for overseas boutiques.',
      },
      es: {
        categoryLabel: 'Cosmética natural',
        character: 'Cooperativa femenina · Argán',
        title: 'Línea bio de argán y rosa para exportar',
        description:
          'Asóciate con cooperativas para lanzar cosmética orgánica certificada destinada a tiendas extranjeras.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أدعم التعاونيات وأحصل على شهادة الجودة',
          outcome: 'إقبال مذهل في أوروبا والخليج وأثر اجتماعي مشرف!',
        },
        fr: {
          label: 'Certifier bio et exporter',
          outcome: 'Succès fulgurant à l’international et impact social fort !',
        },
        en: {
          label: 'Certify Organic & Export',
          outcome: 'Soared across luxury boutiques abroad while uplifting co-ops!',
        },
        es: {
          label: 'Certificar bio y exportar',
          outcome: '¡Éxito internacional con gran impacto social en las cooperativas!',
        },
      },
      impact: { money: 195000, reputation: 22, energy: -16, experience: 14 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أوزعها في الصيدليات المحلية فقط',
          outcome: 'نمو هادئ ومربح داخل السوق المحلي.',
        },
        fr: {
          label: 'Distribuer au Maroc d’abord',
          outcome: 'Ventes saines et progressives au niveau local.',
        },
        en: {
          label: 'Sell Locally First',
          outcome: 'Healthy domestic sales with zero export paperwork.',
        },
        es: {
          label: 'Vender primero en el país',
          outcome: 'Ventas locales sanas sin trámites de exportación.',
        },
      },
      impact: { money: 72000, reputation: 10, energy: -6, experience: 7 },
    },
  },
  {
    id: 28,
    stage: 3,
    category: 'community',
    content: {
      ar: {
        categoryLabel: 'إدارة المؤسسة',
        character: 'ممثلو عمال المصنع · حوار',
        title: 'مطلب تحسين الأجور والتغطية الصحية',
        description:
          'يطالب عمال مصنعك بزيادة في الأجور وتأمين صحي شامل مقابل مضاعفة الإنتاجية.',
      },
      fr: {
        categoryLabel: 'Gouvernance',
        character: 'Délégués du personnel',
        title: 'Hausse de salaires et mutuelle',
        description:
          'Vos équipes demandent une revalorisation salariale et une couverture santé complète.',
      },
      en: {
        categoryLabel: 'Leadership',
        character: 'Factory Staff Council',
        title: 'Pay Raise & Full Health Benefits',
        description:
          'Factory workers request better wages and full medical coverage in return for higher output targets.',
      },
      es: {
        categoryLabel: 'Liderazgo empresarial',
        character: 'Comité de fábrica',
        title: 'Subida salarial y seguro médico',
        description:
          'Los trabajadores de la fábrica piden mejores salarios y cobertura médica completa a cambio de mayor productividad.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أوافق وأربطها بمكافأة الإنتاج',
          outcome: 'ارتفع ولاء العمال وقفزت الجودة والإنتاجية لمستوى قياسي!',
        },
        fr: {
          label: 'Accepter avec primes de résultat',
          outcome: 'Équipes soudées et productivité record dans toutes les usines !',
        },
        en: {
          label: 'Approve with Output Bonus',
          outcome: 'Morale surged and factory efficiency hit all-time highs!',
        },
        es: {
          label: 'Aprobar con primas de logro',
          outcome: '¡Equipos motivados y productividad récord en todas las plantas!',
        },
      },
      impact: { money: 90000, reputation: 24, energy: 12, experience: 12 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أرفض لتخفيض المصاريف',
          outcome: 'تباطأ الإنتاج بسبب الإضرابات وتضررت سمعتك كرب عمل.',
        },
        fr: {
          label: 'Refuser pour comprimer les coûts',
          outcome: 'Grèves et ralentissement coûtent cher à l’entreprise.',
        },
        en: {
          label: 'Reject to Cut Costs',
          outcome: 'Slowdowns and strikes hurt output and damaged your image.',
        },
        es: {
          label: 'Rechazar para ahorrar gastos',
          outcome: 'Las huelgas frenaron la producción y dañaron tu reputación.',
        },
      },
      impact: { money: -55000, reputation: -20, energy: -14, experience: 6 },
    },
  },
  {
    id: 29,
    stage: 3,
    category: 'opportunity',
    content: {
      ar: {
        categoryLabel: 'الاستثمار التقني',
        character: 'شركة ناشئة مغربية · الدار البيضاء',
        title: 'تمويل منصة تجارة إلكترونية وذكاء مالي',
        description:
          'مطورون شباب يعرضون عليك حصة 35% في منصة تربط التجار بالمصانع آلياً.',
      },
      fr: {
        categoryLabel: 'Tech & Innovation',
        character: 'Startup marocaine · Casablanca',
        title: 'Financer une plateforme B2B',
        description:
          'De jeunes ingénieurs proposent 35% du capital d’une startup connectant usines et commerçants.',
      },
      en: {
        categoryLabel: 'Tech Venture',
        character: 'Casablanca Startup Founders',
        title: 'Back a B2B Commerce Platform',
        description:
          'Young engineers offer a 35% equity stake in a platform automating supply chains across Morocco.',
      },
      es: {
        categoryLabel: 'Inversión tecnológica',
        character: 'Startup marroquí · Casablanca',
        title: 'Financiar plataforma B2B inteligente',
        description:
          'Jóvenes ingenieros ofrecen un 35% de participación en una plataforma que conecta fábricas y comercios.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أستثمر فيها وأدعمها بخبرتي',
          outcome: 'نجحت المنصة وباتت تدير آلاف المعاملات يومياً بأرباح خيالية!',
        },
        fr: {
          label: 'Investir et conseiller',
          outcome: 'La plateforme décolle et génère des revenus massifs !',
        },
        en: {
          label: 'Invest & Mentor Team',
          outcome: 'The platform scaled rapidly, multiplying your equity value!',
        },
        es: {
          label: 'Invertir y mentorizar',
          outcome: '¡La plataforma despegó y multiplicó el valor de tu participación!',
        },
      },
      impact: { money: 220000, reputation: 16, energy: -12, experience: 16 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أكتفي بالاستفادة منها كعميل',
          outcome: 'حسّنت كفاءة شركاتك بأرباح مستقرة دون مخاطرة تقنية.',
        },
        fr: {
          label: 'Rester simple utilisateur',
          outcome: 'Gains opérationnels sûrs sans risque startup.',
        },
        en: {
          label: 'Just Use as a Client',
          outcome: 'Improved your logistics without taking startup risk.',
        },
        es: {
          label: 'Usarla solo como cliente',
          outcome: 'Mejoraste tu logística sin asumir riesgo de startup.',
        },
      },
      impact: { money: 70000, reputation: 6, energy: -4, experience: 7 },
    },
  },
  {
    id: 30,
    stage: 3,
    category: 'opportunity',
    content: {
      ar: {
        categoryLabel: 'العبور نحو المليون',
        character: 'بنك الاستثمار · صفقة اندماج',
        title: 'الاستحواذ على شركة منافسة كبرى',
        description:
          'فرصة نادرة لشراء شركة منافسة متعثرة إدارياً ودمج مصانعها في مجموعتك الصاعدة.',
      },
      fr: {
        categoryLabel: 'Cap vers le Million',
        character: 'Banque d’affaires · Fusion',
        title: 'Racheter un grand concurrent',
        description:
          'Opportunité rare d’acquérir un concurrent en difficulté et d’intégrer ses usines à votre groupe.',
      },
      en: {
        categoryLabel: 'Road to 1 Million',
        character: 'Investment Bank · M&A',
        title: 'Acquire a Major Competitor',
        description:
          'Rare chance to acquire a struggling rival and merge its factories into your growing business group.',
      },
      es: {
        categoryLabel: 'Camino al Millón',
        character: 'Banca de inversión · Fusión',
        title: 'Adquirir a un gran competidor',
        description:
          'Oportunidad única de comprar un rival en apuros e integrar sus fábricas en tu grupo empresarial.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أحسم صفقة الاستحواذ بنجاح',
          outcome: 'مبروك! أعدت هيكلة الشركة وتجاوزت ثروتك المليون درهم!',
        },
        fr: {
          label: 'Finaliser l’acquisition',
          outcome: 'Succès total ! Vous entrez dans le club des Millionnaires !',
        },
        en: {
          label: 'Close the Acquisition',
          outcome: 'Turnaround triumph! Your empire just crossed 1,000,000 MAD!',
        },
        es: {
          label: 'Cerrar la adquisición',
          outcome: '¡Éxito rotundo! Tu grupo acaba de superar 1.000.000 MAD.',
        },
      },
      impact: { money: 280000, reputation: 18, energy: -18, experience: 18 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أكتفي بالتوسع العضوي للشركة',
          outcome: 'نمو ثابت وقوي يقربك بخطوات واثقة من المليون.',
        },
        fr: {
          label: 'Croissance interne continue',
          outcome: 'Progression solide vers le cap du million.',
        },
        en: {
          label: 'Grow Organically Instead',
          outcome: 'Disciplined growth keeping debt low and margins strong.',
        },
        es: {
          label: 'Seguir creciendo orgánicamente',
          outcome: 'Expansión disciplinada rumbo firme hacia el millón.',
        },
      },
      impact: { money: 130000, reputation: 10, energy: -8, experience: 10 },
    },
  },

  // ==================== STAGE 4: 1,000,000 -> 1,000,000,000 MAD ====================
  {
    id: 31,
    stage: 4,
    category: 'opportunity',
    content: {
      ar: {
        categoryLabel: 'الإمبراطورية المالية · عالمية',
        character: 'مجموعة قابضة دولية · لندن والدار البيضاء',
        title: 'تأسيس شركة قابضة متعددة الجنسيات',
        description:
          'حان الوقت لتوحيد مصانعك واستثماراتك تحت هولدينغ دولي يفتح مكاتب في أوروبا وإفريقيا والخليج.',
      },
      fr: {
        categoryLabel: 'Empire financier · Global',
        character: 'Holding international · Londres & Casa',
        title: 'Fonder une multinationale',
        description:
          'Rassemblez vos filiales sous une holding mondiale avec des bureaux en Europe, Afrique et Golfe.',
      },
      en: {
        categoryLabel: 'Financial Empire · Global',
        character: 'Global Holding · London & Casa',
        title: 'Found a Multinational Holding',
        description:
          'Unify your companies under a global holding opening regional headquarters across Africa, Europe, and the Gulf.',
      },
      es: {
        categoryLabel: 'Imperio Financiero · Global',
        character: 'Holding internacional · Londres y Casa',
        title: 'Fundar una multinacional',
        description:
          'Unifica tus filiales bajo un holding global con sedes en África, Europa y el Golfo.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أؤسس المجموعة العالمية فوراً',
          outcome: 'انطلقت الفروع الدولية ووقّعت عقوداً بملايين الدراهم!',
        },
        fr: {
          label: 'Lancer la multinationale',
          outcome: 'Les contrats pleuvent à l’échelle mondiale !',
        },
        en: {
          label: 'Launch Global Holding',
          outcome: 'International offices surged with multi-million contracts!',
        },
        es: {
          label: 'Lanzar el holding global',
          outcome: '¡Las sedes internacionales despegaron con contratos millonarios!',
        },
      },
      impact: { money: 45000000, reputation: 16, energy: -16, experience: 15 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أبدأ بمكتب إقليمي في إفريقيا فقط',
          outcome: 'توسع مدروس وبداية قوية في الأسواق الإفريقية.',
        },
        fr: {
          label: 'Bureau africain d’abord',
          outcome: 'Ancrage solide sur les marchés africains en pleine croissance.',
        },
        en: {
          label: 'Start with Africa Hub',
          outcome: 'Focused regional foothold across fast-growing African markets.',
        },
        es: {
          label: 'Empezar con sede en África',
          outcome: 'Fuerte presencia en mercados africanos de rápido crecimiento.',
        },
      },
      impact: { money: 18000000, reputation: 10, energy: -8, experience: 8 },
    },
  },
  {
    id: 32,
    stage: 4,
    category: 'craft',
    content: {
      ar: {
        categoryLabel: 'الطاقة النظيفة',
        character: 'مشروع الصحراء الكبرى · طاقة متجددة',
        title: 'محطة عملاقة للطاقة الشمسية بالصحراء',
        description:
          'اتحاد طاقي يقترح عليك قيادة تمويل محطة شمسية ضخمة لتوليد الكهرباء النظيفة وتصديرها.',
      },
      fr: {
        categoryLabel: 'Énergie propre',
        character: 'Consortium solaire · Sahara',
        title: 'Méga-centrale solaire au désert',
        description:
          'Un consortium vous invite à financer une gigantesque centrale solaire pour alimenter l’industrie et exporter.',
      },
      en: {
        categoryLabel: 'Clean Energy',
        character: 'Sahara Solar Consortium',
        title: 'Mega Desert Solar Power Plant',
        description:
          'An energy consortium invites you to lead a massive Sahara solar plant powering green industry and exports.',
      },
      es: {
        categoryLabel: 'Energía limpia',
        character: 'Consorcio Solar · Sahara',
        title: 'Megacentral solar en el desierto',
        description:
          'Un consorcio energético te invita a liderar una gran central solar en el Sahara para generar y exportar electricidad limpia.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أقود مشروع الطاقة الشمسية',
          outcome: 'إنجاز تاريخي! حصدت عوائد ضخمة وإشادة دولية كرائد في الطاقة النظيفة!',
        },
        fr: {
          label: 'Diriger le projet solaire',
          outcome: 'Succès historique ! Profits géants et prestige écologique mondial !',
        },
        en: {
          label: 'Lead the Solar Mega-Plant',
          outcome: 'Historic triumph! Massive returns and global green-energy prestige!',
        },
        es: {
          label: 'Liderar el proyecto solar',
          outcome: '¡Hito histórico! Enormes beneficios y prestigio mundial en energía verde.',
        },
      },
      impact: { money: 115000000, reputation: 22, energy: -18, experience: 16 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أشارك بحصة مالية متوسطة',
          outcome: 'عوائد ممتازة ومخاطرة محدودة في قطاع المستقبل.',
        },
        fr: {
          label: 'Participation minoritaire',
          outcome: 'Revenus réguliers sans porter la gestion technique.',
        },
        en: {
          label: 'Take Minority Stake',
          outcome: 'Strong passive clean-energy yields with low risk.',
        },
        es: {
          label: 'Participar con cuota menor',
          outcome: 'Rendimientos sólidos en energía limpia con bajo riesgo.',
        },
      },
      impact: { money: 48000000, reputation: 12, energy: -6, experience: 8 },
    },
  },
  {
    id: 33,
    stage: 4,
    category: 'trade',
    content: {
      ar: {
        categoryLabel: 'التصدير الدولي',
        character: 'الميناء المتوسطي · أسطول الشحن',
        title: 'امتلاك أسطول سفن للتصدير الدولي',
        description:
          'شراء سفن شحن خاصة يضع صادراتك في موانئ أمريكا وآسيا وأوروبا دون وسطاء.',
      },
      fr: {
        categoryLabel: 'Export international',
        character: 'Port Tanger Med · Flotte',
        title: 'Acquérir une flotte maritime',
        description:
          'Posséder vos navires de fret relie vos usines aux ports d’Europe, d’Amérique et d’Asie sans intermédiaires.',
      },
      en: {
        categoryLabel: 'Global Export',
        character: 'Tanger-Med Port · Maritime',
        title: 'Acquire International Cargo Fleet',
        description:
          'Owning container ships lets you export directly from Tanger-Med to Europe, the Americas, and Asia.',
      },
      es: {
        categoryLabel: 'Exportación global',
        character: 'Puerto Tánger-Med · Flota',
        title: 'Adquirir flota marítima internacional',
        description:
          'Tener buques propios conecta tus fábricas desde Tánger-Med con Europa, América y Asia sin intermediarios.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أقتني السفن وأفتح خطوطاً بحرية',
          outcome: 'سيطرت على سلاسل التوريد وتدفقت مئات الملايين!',
        },
        fr: {
          label: 'Lancer la flotte maritime',
          outcome: 'Maîtrise totale des routes commerciales et profits records !',
        },
        en: {
          label: 'Launch Global Shipping Line',
          outcome: 'Controlled entire trade corridors and unlocked massive cash flows!',
        },
        es: {
          label: 'Lanzar naviera global',
          outcome: '¡Dominaste rutas comerciales clave y desbloqueaste cientos de millones!',
        },
      },
      impact: { money: 140000000, reputation: 16, energy: -16, experience: 15 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أستأجر خطوط شحن طويلة الأمد',
          outcome: 'مرونة عالية وأرباح تصدير قوية.',
        },
        fr: {
          label: 'Affréter des lignes dédiées',
          outcome: 'Export efficace sans coûts de maintenance navale.',
        },
        en: {
          label: 'Charter Dedicated Routes',
          outcome: 'Strong export growth without ship maintenance liabilities.',
        },
        es: {
          label: 'Fletar rutas dedicadas',
          outcome: 'Exportación ágil sin costes de mantenimiento naval.',
        },
      },
      impact: { money: 55000000, reputation: 8, energy: -6, experience: 8 },
    },
  },
  {
    id: 34,
    stage: 4,
    category: 'opportunity',
    content: {
      ar: {
        categoryLabel: 'الأسواق المالية',
        character: 'بورصة الدار البيضاء والأسواق العالمية',
        title: 'إدراج المجموعة في البورصة (IPO)',
        description:
          'يقترح المستشارون طرح 20% من أسهم مجموعتك للاكتتاب العام لجمع سيولة عملاقة.',
      },
      fr: {
        categoryLabel: 'Marchés financiers',
        character: 'Bourse de Casablanca & Global',
        title: 'Introduction en Bourse (IPO)',
        description:
          'Vos conseillers proposent d’introduire 20% du groupe en Bourse pour lever un capital colossal.',
      },
      en: {
        categoryLabel: 'Capital Markets',
        character: 'Casablanca & Global Exchange',
        title: 'Take the Empire Public (IPO)',
        description:
          'Advisors propose listing 20% of your holding on the stock exchange to raise monumental expansion capital.',
      },
      es: {
        categoryLabel: 'Mercados financieros',
        character: 'Bolsa de Casablanca y Global',
        title: 'Sacar el grupo a Bolsa (OPV)',
        description:
          'Tus asesores proponen sacar un 20% del holding a bolsa para captar un capital colosal de expansión.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أقرع جرس الإدراج في البورصة',
          outcome: 'تغطية الاكتتاب 10 مرات! قفزت قيمة ثروتك بشكل أسطوري!',
        },
        fr: {
          label: 'Sonner la cloche de la Bourse',
          outcome: 'Introduction sursouscrite 10 fois : valorisation historique !',
        },
        en: {
          label: 'Ring the IPO Bell',
          outcome: '10x oversubscribed! Your valuation skyrocketed overnight!',
        },
        es: {
          label: 'Tocar la campana bursátil',
          outcome: '¡Demanda 10 veces superior: tu valoración alcanzó cifras históricas!',
        },
      },
      impact: { money: 190000000, reputation: 18, energy: -14, experience: 16 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أبقي الشركة عائلية ومغلقة',
          outcome: 'حافظت على كامل القرار لك مع نمو داخلي مستقر.',
        },
        fr: {
          label: 'Rester société privée',
          outcome: 'Contrôle à 100% préservé avec une croissance régulière.',
        },
        en: {
          label: 'Stay Privately Held',
          outcome: 'Kept 100% control while growing steadily on retained earnings.',
        },
        es: {
          label: 'Seguir como empresa privada',
          outcome: 'Mantuviste el 100% del control con crecimiento interno sólido.',
        },
      },
      impact: { money: 65000000, reputation: 10, energy: 4, experience: 8 },
    },
  },
  {
    id: 35,
    stage: 4,
    category: 'community',
    content: {
      ar: {
        categoryLabel: 'العمل الخيري والأثر',
        character: 'مؤسستك الخيرية · التعليم والصحة',
        title: 'بناء مستشفى وجامعة تقنية مجانية',
        description:
          'النجاح الحقيقي يُقاس بالأثر؛ يمكنك تمويل مستشفى حديث ومعهد منح للطلبة المتفوقين.',
      },
      fr: {
        categoryLabel: 'Philanthropie',
        character: 'Votre Fondation · Éducation & Santé',
        title: 'Hôpital et université gratuits',
        description:
          'Financez un hôpital moderne et une université technologique offrant des bourses aux jeunes talents.',
      },
      en: {
        categoryLabel: 'Philanthropy',
        character: 'Your Foundation · Health & Youth',
        title: 'Build Free Hospital & Tech University',
        description:
          'Use your fortune to endow a cutting-edge public hospital and scholarship university for bright youth.',
      },
      es: {
        categoryLabel: 'Filantropía e Impacto',
        character: 'Tu Fundación · Salud y Educación',
        title: 'Construir hospital y universidad gratis',
        description:
          'Financia un hospital moderno y una universidad tecnológica con becas para jóvenes con talento.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أمضي قدماً في المشروع الخيري',
          outcome: 'محبة الملايين وثقة المستثمرين العالميين تضاعفت أضعافاً!',
        },
        fr: {
          label: 'Financer l’œuvre caritative',
          outcome: 'Admiration unanime et confiance mondiale décuplée !',
        },
        en: {
          label: 'Fund the Endowment',
          outcome: 'Millions cheered your legacy, attracting elite global goodwill!',
        },
        es: {
          label: 'Financiar la obra benéfica',
          outcome: '¡Admiración unánime y confianza global multiplicada!',
        },
      },
      impact: { money: -35000000, reputation: 28, energy: 18, experience: 15 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أقتصر على صندوق منح سنوية',
          outcome: 'مساهمة طيبة بتكلفة أخف تحفظ السيولة.',
        },
        fr: {
          label: 'Créer un fonds de bourses',
          outcome: 'Beau geste philanthropique tout en gardant vos réserves.',
        },
        en: {
          label: 'Launch Scholarship Fund',
          outcome: 'Meaningful social impact while preserving capital.',
        },
        es: {
          label: 'Crear fondo de becas',
          outcome: 'Gran aporte social manteniendo tus reservas.',
        },
      },
      impact: { money: -8000000, reputation: 12, energy: 6, experience: 7 },
    },
  },
  {
    id: 36,
    stage: 4,
    category: 'craft',
    content: {
      ar: {
        categoryLabel: 'الأمن المائي والطاقة',
        character: 'ائتلاف البنية التحتية · المحيط الأطلسي',
        title: 'محطة تحلية مياه تعمل بالطاقة النظيفة',
        description:
          'مناقصة دولية لإنشاء محطة عملاقة لتحلية مياه البحر تروي المدن والضيعات الفلاحية.',
      },
      fr: {
        categoryLabel: 'Infrastructures vertes',
        character: 'Consortium · Côte Atlantique',
        title: 'Station de dessalement écologique',
        description:
          'Un appel d’offres stratégique pour une usine de dessalement alimentée aux énergies renouvelables.',
      },
      en: {
        categoryLabel: 'Green Infrastructure',
        character: 'Atlantic Infrastructure Group',
        title: 'Solar Desalination Mega-Facility',
        description:
          'Win a strategic contract to build a clean-energy desalination plant supplying cities and farmlands.',
      },
      es: {
        categoryLabel: 'Infraestructura verde',
        character: 'Consorcio · Costa Atlántica',
        title: 'Megaplanta desalinizadora solar',
        description:
          'Licitación estratégica para construir una planta desalinizadora con energía limpia para ciudades y campos.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أفوز بالمناقصة وأنفذ المحطة',
          outcome: 'مشروع استراتيجي درّ مئات الملايين وخلّد اسمك في التنمية!',
        },
        fr: {
          label: 'Remporter l’appel d’offres',
          outcome: 'Projet stratégique rentable qui marque l’histoire !',
        },
        en: {
          label: 'Win & Build Facility',
          outcome: 'Strategic infrastructure yielded massive multi-year returns!',
        },
        es: {
          label: 'Ganar y construir planta',
          outcome: '¡Proyecto estratégico muy rentable que marca la historia!',
        },
      },
      impact: { money: 165000000, reputation: 20, energy: -16, experience: 16 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أزوّد المشروع بالتوربينات فقط',
          outcome: 'أرباح هندسية مضمونة دون التزام طويل.',
        },
        fr: {
          label: 'Fournir les turbines seules',
          outcome: 'Belle marge industrielle sans gestion de chantier.',
        },
        en: {
          label: 'Supply Turbines Only',
          outcome: 'Healthy equipment contract with low operational burden.',
        },
        es: {
          label: 'Suministrar solo turbinas',
          outcome: 'Buen margen industrial sin gestión de obra.',
        },
      },
      impact: { money: 68000000, reputation: 10, energy: -6, experience: 8 },
    },
  },
  {
    id: 37,
    stage: 4,
    category: 'trade',
    content: {
      ar: {
        categoryLabel: 'الصناعة الفاخرة',
        character: 'باريس ودبي وطوكيو · علامة عالمية',
        title: 'افتتاح متاجر فاخرة للصناعة المغربية',
        description:
          'إطلاق سلسلة متاجر فخمة في عواصم العالم لتسويق الزرابي والزليج والجلود المغربية الراقية.',
      },
      fr: {
        categoryLabel: 'Luxe & Artisanat',
        character: 'Paris, Dubaï, Tokyo · Prestige',
        title: 'Boutiques de luxe marocaines',
        description:
          'Ouvrez des enseignes prestigieuses dans les capitales mondiales pour valoriser l’artisanat marocain.',
      },
      en: {
        categoryLabel: 'Global Luxury',
        character: 'Paris, Dubai, Tokyo · Flagships',
        title: 'Global Moroccan Luxury Flagships',
        description:
          'Open flagship luxury boutiques in world capitals showcasing Moroccan carpets, leather, and fine crafts.',
      },
      es: {
        categoryLabel: 'Lujo y Artesanía',
        character: 'París, Dubái, Tokio · Prestigio',
        title: 'Boutiques globales de lujo marroquí',
        description:
          'Abre tiendas insignia en capitales mundiales exhibiendo alfombras, zellige y alta artesanía marroquí.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أفتتح الفروع في العواصم الثلاث',
          outcome: 'انبهار عالمي بالفن المغربي وعوائد بمئات الملايين!',
        },
        fr: {
          label: 'Ouvrir dans les 3 capitales',
          outcome: 'Triomphe mondial du savoir-faire marocain !',
        },
        en: {
          label: 'Open All 3 Flagships',
          outcome: 'Global fashion press raved and luxury revenue exploded!',
        },
        es: {
          label: 'Abrir en las 3 capitales',
          outcome: '¡Triunfo mundial de la maestría marroquí e ingresos millonarios!',
        },
      },
      impact: { money: 155000000, reputation: 22, energy: -14, experience: 14 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أركز على المتجر الإلكتروني الفاخر',
          outcome: 'تصدير رقمي ناجح بتكاليف تشغيل منخفضة.',
        },
        fr: {
          label: 'Boutique en ligne prestige',
          outcome: 'Ventes mondiales rentables à moindres frais fixes.',
        },
        en: {
          label: 'Global Luxury E-Commerce',
          outcome: 'Strong worldwide sales with lean overhead.',
        },
        es: {
          label: 'Boutique online de lujo',
          outcome: 'Ventas globales rentables con mínimos costes fijos.',
        },
      },
      impact: { money: 72000000, reputation: 12, energy: -5, experience: 8 },
    },
  },
  {
    id: 38,
    stage: 4,
    category: 'opportunity',
    content: {
      ar: {
        categoryLabel: 'تقلبات الأسواق',
        character: 'أزمة مالية عالمية · تحوّط',
        title: 'تراجع مفاجئ في البورصات العالمية',
        description:
          'اضطراب اقتصادي يهز الأسواق؛ قرارك الآن سيحدد إن كنت ستخسر أم تقتنص الفرص من القاع.',
      },
      fr: {
        categoryLabel: 'Crise mondiale',
        character: 'Marchés · Tempête boursière',
        title: 'Krach boursier soudain',
        description:
          'Une secousse financière frappe les marchés mondiaux. Votre sang-froid fera la différence.',
      },
      en: {
        categoryLabel: 'Market Volatility',
        character: 'Global Markets · Flash Crash',
        title: 'Sudden Global Market Dip',
        description:
          'A sharp economic shock rattles global exchanges. Your move determines whether you sink or buy the bottom.',
      },
      es: {
        categoryLabel: 'Volatilidad global',
        character: 'Mercados · Caída bursátil',
        title: 'Desplome repentino en las bolsas',
        description:
          'Una sacudida financiera golpea los mercados mundiales. Tu temple decidirá si pierdes o compras barato.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أشتري أصولاً متينة وقت الهبوط',
          outcome: 'تعافت الأسواق وتضاعفت استثماراتك بذكاء المستثمر الأسطوري!',
        },
        fr: {
          label: 'Acheter des actifs solides',
          outcome: 'Le rebond multiplie la valeur de votre portefeuille !',
        },
        en: {
          label: 'Buy Quality Assets at Dip',
          outcome: 'Markets rebounded and your contrarian bet paid massively!',
        },
        es: {
          label: 'Comprar activos sólidos en caída',
          outcome: '¡El rebote multiplicó el valor de toda tu cartera!',
        },
      },
      impact: { money: 175000000, reputation: 14, energy: -14, experience: 18 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أبيع بالذعر وأسحب السيولة',
          outcome: 'خسرت جزءاً من قيمة الأسهم بسبب التسرع في البيع.',
        },
        fr: {
          label: 'Vendre dans la panique',
          outcome: 'Perte sèche causée par une sortie précipitée.',
        },
        en: {
          label: 'Panic-Sell Holdings',
          outcome: 'Selling at the bottom locked in heavy unnecessary losses.',
        },
        es: {
          label: 'Vender por pánico',
          outcome: 'Vender en mínimos consolidó fuertes pérdidas innecesarias.',
        },
      },
      impact: { money: -85000000, reputation: -12, energy: -10, experience: 10 },
    },
  },
  {
    id: 39,
    stage: 4,
    category: 'craft',
    content: {
      ar: {
        categoryLabel: 'التكنولوجيا والاتصالات',
        character: 'تحالف قاري · ألياف بصرية ومراكز بيانات',
        title: 'شبكة مراكز بيانات خضراء بإفريقيا',
        description:
          'إنشاء مراكز بيانات تعتمد على الطاقة المتجددة لخدمة الشركات العالمية والبنوك.',
      },
      fr: {
        categoryLabel: 'Tech continentale',
        character: 'Alliance · Data Centers verts',
        title: 'Centres de données solaires',
        description:
          'Déployez un réseau de data centers alimentés au solaire pour les banques et géants numériques.',
      },
      en: {
        categoryLabel: 'Digital Infrastructure',
        character: 'Continental Tech Alliance',
        title: 'Green Cloud Data Centers',
        description:
          'Build solar-powered cloud data centers serving multinational banks and tech giants across the region.',
      },
      es: {
        categoryLabel: 'Infraestructura digital',
        character: 'Alianza Tech · Centros de datos',
        title: 'Centros de datos solares en África',
        description:
          'Construye centros de datos en la nube con energía renovable para bancos y gigantes tecnológicos.',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أطلق شبكة مراكز البيانات الخضراء',
          outcome: 'عقود سحابية ضخمة جعلتك على مشارف المليار!',
        },
        fr: {
          label: 'Déployer les data centers',
          outcome: 'Contrats cloud massifs : vous touchez presque au milliard !',
        },
        en: {
          label: 'Build Green Cloud Network',
          outcome: 'Enterprise cloud contracts pushed you to the brink of 1 Billion!',
        },
        es: {
          label: 'Desplegar red cloud verde',
          outcome: '¡Contratos cloud masivos que te acercan al mil millones!',
        },
      },
      impact: { money: 220000000, reputation: 18, energy: -16, experience: 16 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أستثمر في مركز بيانات واحد',
          outcome: 'عوائد سحابية ممتازة ومخاطرة محدودة.',
        },
        fr: {
          label: 'Un seul centre pilote',
          outcome: 'Revenu technologique sûr et bien maîtrisé.',
        },
        en: {
          label: 'Build One Flagship Center',
          outcome: 'Steady high-tech cash flow with lighter capital commitment.',
        },
        es: {
          label: 'Construir un centro piloto',
          outcome: 'Ingreso tecnológico seguro y bien controlado.',
        },
      },
      impact: { money: 95000000, reputation: 10, energy: -6, experience: 8 },
    },
  },
  {
    id: 40,
    stage: 4,
    category: 'opportunity',
    content: {
      ar: {
        categoryLabel: 'قمة الإمبراطورية',
        character: 'منتدى الاستثمار العالمي · الصفقة الحاسمة',
        title: 'تحالف الطاقة الخضراء والتصدير القاري',
        description:
          'الفرصة التاريخية الكبرى: ربط مشاريعك الصناعية والطاقية في أكبر اتفاقية تصدير عابرة للقارات!',
      },
      fr: {
        categoryLabel: 'Sommet de l’Empire',
        character: 'Forum mondial · Accord historique',
        title: 'Alliance intercontinentale énergie & export',
        description:
          'L’accord historique qui propulse vos usines et centrales solaires au rang de géant planétaire !',
      },
      en: {
        categoryLabel: 'Summit of the Empire',
        character: 'World Investment Summit',
        title: 'Transcontinental Green Trade Pact',
        description:
          'The crowning deal: unite your factories, shipping fleet, and solar grids in a historic intercontinental pact!',
      },
      es: {
        categoryLabel: 'Cima del Imperio',
        character: 'Foro Mundial · Acuerdo histórico',
        title: 'Pacto intercontinental verde y comercial',
        description:
          '¡El acuerdo culminante: une tus fábricas, naviera y redes solares en la mayor alianza intercontinental!',
      },
    },
    rightChoice: {
      content: {
        ar: {
          label: 'أوقّع التحالف الأسطوري',
          outcome: 'إنجاز تاريخي! قفزت ثروتك بمئات الملايين نحو المليار درهم!',
        },
        fr: {
          label: 'Signer l’alliance historique',
          outcome: 'Triomphe planétaire ! Votre empire atteint les sommets !',
        },
        en: {
          label: 'Sign Historic Pact',
          outcome: 'Monumental victory! Hundreds of millions surged into your empire!',
        },
        es: {
          label: 'Firmar la alianza histórica',
          outcome: '¡Triunfo planetario! Cientos de millones impulsan tu imperio hacia la cima.',
        },
      },
      impact: { money: 310000000, reputation: 24, energy: -18, experience: 20 },
    },
    leftChoice: {
      content: {
        ar: {
          label: 'أوقّع شراكة ثنائية متوازنة',
          outcome: 'أرباح ضخمة تحافظ على راحتك واستقرار مجموعتك.',
        },
        fr: {
          label: 'Accord bilatéral équilibré',
          outcome: 'Gains colossaux dans le calme et la stabilité.',
        },
        en: {
          label: 'Sign Bilateral Pact',
          outcome: 'Huge, stable gains while protecting work-life balance.',
        },
        es: {
          label: 'Firmar pacto bilateral',
          outcome: 'Enormes beneficios manteniendo calma y estabilidad.',
        },
      },
      impact: { money: 145000000, reputation: 14, energy: -6, experience: 10 },
    },
  },
];
