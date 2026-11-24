import {
  CardCategory,
  ChoiceImpact,
  DynamicOutcomeConfig,
  Language,
  ScenarioCard,
  StageNumber,
} from '../types/game';

interface LocalizedItemText {
  noun: string;
  short: string;
}

interface ProceduralItem {
  id: string;
  category: CardCategory;
  profitScale: number;
  ar: LocalizedItemText;
  fr: LocalizedItemText;
  en: LocalizedItemText;
}

interface LocalizedPlaceText {
  name: string;
  inPlace: string;
}

interface ProceduralPlace {
  id: string;
  ar: LocalizedPlaceText;
  fr: LocalizedPlaceText;
  en: LocalizedPlaceText;
}

interface ProceduralActor {
  id: string;
  ar: { full: string; short: string };
  fr: { full: string; short: string };
  en: { full: string; short: string };
}

interface StageDataPool {
  items: ProceduralItem[];
  places: ProceduralPlace[];
  actors: ProceduralActor[];
}

export interface SmartDeckMemory {
  seenFingerprints: Set<string>;
  seenIdeaKeys: Set<string>;
  proceduralCounter: number;
  lastCategory?: CardCategory;
}

export function createSmartDeckMemory(): SmartDeckMemory {
  return {
    seenFingerprints: new Set<string>(),
    seenIdeaKeys: new Set<string>(),
    proceduralCounter: 100,
  };
}

const STAGE_POOLS: Record<StageNumber, StageDataPool> = {
  1: {
    items: [
      {
        id: 'dates',
        category: 'trade',
        profitScale: 1.0,
        ar: { noun: 'تمور مجهول الفاخرة', short: 'تمور مجهول' },
        fr: { noun: 'dattes Majhoul sélectionnées', short: 'dattes Majhoul' },
        en: { noun: 'premium Majhoul dates', short: 'Majhoul dates' },
      },
      {
        id: 'mint',
        category: 'trade',
        profitScale: 0.9,
        ar: { noun: 'حزم النعناع الفاسي الطازج', short: 'النعناع الطازج' },
        fr: { noun: 'bottes de menthe fraîche de Fès', short: 'menthe fraîche' },
        en: { noun: 'fresh Fez mint bundles', short: 'fresh mint' },
      },
      {
        id: 'bikes',
        category: 'craft',
        profitScale: 1.1,
        ar: { noun: 'إصلاح الدراجات الهوائية', short: 'صيانة الدراجات' },
        fr: { noun: 'réparation de vélos de quartier', short: 'réparation vélos' },
        en: { noun: 'neighborhood bicycle repairs', short: 'bike repairs' },
      },
      {
        id: 'cables',
        category: 'trade',
        profitScale: 1.05,
        ar: { noun: 'كابلات وشواحن الهواتف', short: 'ملحقات الهواتف' },
        fr: { noun: 'câbles et chargeurs mobiles', short: 'accessoires GSM' },
        en: { noun: 'phone cables and chargers', short: 'phone accessories' },
      },
      {
        id: 'delivery',
        category: 'community',
        profitScale: 0.95,
        ar: { noun: 'توصيل الطرود السريع', short: 'خدمة التوصيل' },
        fr: { noun: 'livraison express de colis', short: 'livraison express' },
        en: { noun: 'express local parcel runs', short: 'parcel delivery' },
      },
      {
        id: 'leather',
        category: 'craft',
        profitScale: 1.15,
        ar: { noun: 'تجديد وتلميع البوفات الجلدية', short: 'حرفة الجلد' },
        fr: { noun: 'restauration de poufs en cuir', short: 'cuir artisanal' },
        en: { noun: 'restoring handcrafted leather poufs', short: 'leather craft' },
      },
      {
        id: 'argan',
        category: 'opportunity',
        profitScale: 1.2,
        ar: { noun: 'قوارير زيت الأركان الأصيل', short: 'زيت الأركان' },
        fr: { noun: 'flacons d’huile d’argan pur', short: 'huile d’argan' },
        en: { noun: 'pure argan oil bottles', short: 'argan oil' },
      },
      {
        id: 'juice',
        category: 'community',
        profitScale: 0.9,
        ar: { noun: 'أكواب عصير البرتقال الطازج', short: 'عصير البرتقال' },
        fr: { noun: 'jus d’orange pressé à la main', short: 'jus frais' },
        en: { noun: 'fresh-pressed orange juice', short: 'fresh juice' },
      },
    ],
    places: [
      {
        id: 'derb_omar',
        ar: { name: 'درب عمر', inPlace: 'في سوق درب عمر بالبيضاء' },
        fr: { name: 'Derb Omar', inPlace: 'au marché de Derb Omar à Casablanca' },
        en: { name: 'Derb Omar', inPlace: 'at Derb Omar market in Casablanca' },
      },
      {
        id: 'bab_el_had',
        ar: { name: 'باب الأحد', inPlace: 'قرب سوق باب الأحد بالرباط' },
        fr: { name: 'Bab El Had', inPlace: 'près de Bab El Had à Rabat' },
        en: { name: 'Bab El Had', inPlace: 'near Bab El Had in Rabat' },
      },
      {
        id: 'souk_el_had',
        ar: { name: 'سوق الأحد', inPlace: 'في سوق الأحد بأكادير' },
        fr: { name: 'Souk El Had', inPlace: 'au Souk El Had d’Agadir' },
        en: { name: 'Souk El Had', inPlace: 'at Agadir’s Souk El Had' },
      },
      {
        id: 'jemaa',
        ar: { name: 'جامع الفنا', inPlace: 'بمحاذاة ساحة جامع الفنا بمراكش' },
        fr: { name: 'Jemaa El Fna', inPlace: 'aux abords de Jemaa El Fna à Marrakech' },
        en: { name: 'Jemaa El Fna', inPlace: 'around Jemaa El Fna in Marrakech' },
      },
      {
        id: 'boujloud',
        ar: { name: 'باب بوجلود', inPlace: 'في أزقة باب بوجلود بفاس' },
        fr: { name: 'Bab Boujloud', inPlace: 'dans les ruelles de Bab Boujloud à Fès' },
        en: { name: 'Bab Boujloud', inPlace: 'in the lanes of Bab Boujloud in Fez' },
      },
      {
        id: 'tangier_medina',
        ar: { name: 'سوق طنجة', inPlace: 'في السوق المركزي بطنجة' },
        fr: { name: 'Marché de Tanger', inPlace: 'au Grand Socco de Tanger' },
        en: { name: 'Tangier Market', inPlace: 'at Tangier’s Grand Socco' },
      },
    ],
    actors: [
      {
        id: 'qacem',
        ar: { full: 'المعلّم قاسم · حرفي مخضرم', short: 'المعلّم قاسم' },
        fr: { full: 'Maâlem Kacem · Artisan', short: 'Maâlem Kacem' },
        en: { full: 'Maâlem Kacem · Craftsman', short: 'Maâlem Kacem' },
      },
      {
        id: 'meriem',
        ar: { full: 'مريم · منسقة فعاليات', short: 'مريم' },
        fr: { full: 'Meryem · Organisatrice', short: 'Meryem' },
        en: { full: 'Meryem · Event Coordinator', short: 'Meryem' },
      },
      {
        id: 'arbi',
        ar: { full: 'العم العربي · منتج محلي', short: 'العم العربي' },
        fr: { full: 'Oncle Larbi · Producteur', short: 'Oncle Larbi' },
        en: { full: 'Uncle Larbi · Local Grower', short: 'Uncle Larbi' },
      },
      {
        id: 'nadia',
        ar: { full: 'نادية · صاحبة مقهى شعبي', short: 'نادية' },
        fr: { full: 'Nadia · Gérante de café', short: 'Nadia' },
        en: { full: 'Nadia · Café Owner', short: 'Nadia' },
      },
      {
        id: 'omar',
        ar: { full: 'عمر · موزع سريع', short: 'عمر' },
        fr: { full: 'Omar · Coursier local', short: 'Omar' },
        en: { full: 'Omar · Local Courier', short: 'Omar' },
      },
      {
        id: 'fatima',
        ar: { full: 'خالتي فاطمة · رئيسة تعاونية', short: 'خالتي فاطمة' },
        fr: { full: 'Khalti Fatima · Coopérative', short: 'Khalti Fatima' },
        en: { full: 'Aunt Fatima · Cooperative Lead', short: 'Aunt Fatima' },
      },
    ],
  },
  2: {
    items: [
      {
        id: 'spices',
        category: 'trade',
        profitScale: 1.0,
        ar: { noun: 'تشكيلة التوابل والعطور المغربية', short: 'التوابل والعطور' },
        fr: { noun: 'lots d’épices et senteurs marocaines', short: 'épices et senteurs' },
        en: { noun: 'Moroccan spice and scent blends', short: 'spices & scents' },
      },
      {
        id: 'shopfront',
        category: 'craft',
        profitScale: 1.1,
        ar: { noun: 'تحديث واجهة المحل والرفوف', short: 'واجهة المحل' },
        fr: { noun: 'rénovation de vitrine et rayons', short: 'vitrine boutique' },
        en: { noun: 'retail storefront and shelving upgrade', short: 'shopfront upgrade' },
      },
      {
        id: 'textiles',
        category: 'trade',
        profitScale: 1.15,
        ar: { noun: 'أقمشة وقفاطين موسمية', short: 'الأقمشة والقفاطين' },
        fr: { noun: 'tissus et caftans de saison', short: 'tissus saisonniers' },
        en: { noun: 'seasonal fabrics and caftan lines', short: 'seasonal textiles' },
      },
      {
        id: 'scooters',
        category: 'opportunity',
        profitScale: 1.2,
        ar: { noun: 'خدمة التوصيل بالدراجات النارية', short: 'أسطول التوصيل' },
        fr: { noun: 'service de livraison à scooters', short: 'flotte scooters' },
        en: { noun: 'scooter delivery dispatch service', short: 'delivery fleet' },
      },
      {
        id: 'olive_oil',
        category: 'trade',
        profitScale: 1.0,
        ar: { noun: 'براميل زيت الزيتون البكر الممتاز', short: 'زيت الزيتون' },
        fr: { noun: 'fûts d’huile d’olive extra vierge', short: 'huile d’olive' },
        en: { noun: 'extra-virgin olive oil drums', short: 'olive oil drums' },
      },
      {
        id: 'staff',
        category: 'community',
        profitScale: 0.95,
        ar: { noun: 'توظيف وتكوين مساعدي البيع', short: 'طاقم البيع' },
        fr: { noun: 'recrutement et formation des vendeurs', short: 'équipe de vente' },
        en: { noun: 'hiring and training retail assistants', short: 'sales team' },
      },
      {
        id: 'estore',
        category: 'opportunity',
        profitScale: 1.25,
        ar: { noun: 'منصة البيع الإلكتروني مع الدفع عند الاستلام', short: 'المتجر الإلكتروني' },
        fr: { noun: 'boutique en ligne avec paiement à la livraison', short: 'e-boutique' },
        en: { noun: 'cash-on-delivery e-commerce storefront', short: 'e-commerce store' },
      },
      {
        id: 'ceramics',
        category: 'craft',
        profitScale: 1.05,
        ar: { noun: 'أطقم الخزف الفاسي المذهب', short: 'الخزف الفاسي' },
        fr: { noun: 'collections de poterie de Fès', short: 'poterie de Fès' },
        en: { noun: 'hand-painted Fez ceramic sets', short: 'Fez ceramics' },
      },
    ],
    places: [
      {
        id: 'maarif',
        ar: { name: 'المعاريف', inPlace: 'في حي المعاريف بالدار البيضاء' },
        fr: { name: 'Maârif', inPlace: 'dans le quartier Maârif à Casablanca' },
        en: { name: 'Maârif', inPlace: 'in Casablanca’s Maârif district' },
      },
      {
        id: 'hay_riad',
        ar: { name: 'حي الرياض', inPlace: 'في المركز التجاري بحي الرياض بالرباط' },
        fr: { name: 'Hay Riad', inPlace: 'à Hay Riad à Rabat' },
        en: { name: 'Hay Riad', inPlace: 'in Rabat’s Hay Riad district' },
      },
      {
        id: 'gueliz',
        ar: { name: 'كيليز', inPlace: 'في شارع محمد الخامس بكيليز مراكش' },
        fr: { name: 'Guéliz', inPlace: 'sur l’avenue de Guéliz à Marrakech' },
        en: { name: 'Guéliz', inPlace: 'on Guéliz Avenue in Marrakech' },
      },
      {
        id: 'tangier_zone',
        ar: { name: 'المنطقة التجارية بطنجة', inPlace: 'في المنطقة الحرة بطنجة' },
        fr: { name: 'Zone de Tanger', inPlace: 'dans la zone commerciale de Tanger' },
        en: { name: 'Tangier Hub', inPlace: 'at Tangier’s commercial hub' },
      },
      {
        id: 'meknes',
        ar: { name: 'مكناس', inPlace: 'في سوق الجملة بمكناس' },
        fr: { name: 'Meknès', inPlace: 'au pôle commercial de Meknès' },
        en: { name: 'Meknes', inPlace: 'at the Meknes wholesale hub' },
      },
      {
        id: 'agadir_bay',
        ar: { name: 'أكادير', inPlace: 'في الممر السياحي بأكادير' },
        fr: { name: 'Agadir', inPlace: 'sur la corniche commerçante d’Agadir' },
        en: { name: 'Agadir', inPlace: 'along Agadir’s retail promenade' },
      },
    ],
    actors: [
      {
        id: 'mekki',
        ar: { full: 'الحاج المكي · مستورد سلع', short: 'الحاج المكي' },
        fr: { full: 'Haj Mekki · Importateur', short: 'Haj Mekki' },
        en: { full: 'Haj Mekki · Importer', short: 'Haj Mekki' },
      },
      {
        id: 'salma',
        ar: { full: 'سلمى · مديرة تسويق رقمي', short: 'سلمى' },
        fr: { full: 'Salma · Responsable digitale', short: 'Salma' },
        en: { full: 'Salma · Digital Marketer', short: 'Salma' },
      },
      {
        id: 'karim',
        ar: { full: 'كريم · موزع جهوي', short: 'كريم' },
        fr: { full: 'Karim · Distributeur régional', short: 'Karim' },
        en: { full: 'Karim · Regional Distributor', short: 'Karim' },
      },
      {
        id: 'leila',
        ar: { full: 'ليلى · مصممة علامات تجارية', short: 'ليلى' },
        fr: { full: 'Leila · Designer retail', short: 'Leila' },
        en: { full: 'Leila · Brand Designer', short: 'Leila' },
      },
      {
        id: 'rachid',
        ar: { full: 'رشيد · محاسب ومستشار ضريبي', short: 'رشيد' },
        fr: { full: 'Rachid · Expert-comptable', short: 'Rachid' },
        en: { full: 'Rachid · Tax Accountant', short: 'Rachid' },
      },
      {
        id: 'ghallef',
        ar: { full: 'سي بنسعيد · تاجر جملة', short: 'سي بنسعيد' },
        fr: { full: 'Si Bensaïd · Grossiste', short: 'Si Bensaïd' },
        en: { full: 'Si Bensaïd · Wholesaler', short: 'Si Bensaïd' },
      },
    ],
  },
  3: {
    items: [
      {
        id: 'packaging_line',
        category: 'craft',
        profitScale: 1.05,
        ar: { noun: 'خط تعبئة وتغليف أوتوماتيكي', short: 'خط التعبئة' },
        fr: { noun: 'ligne automatisée de conditionnement', short: 'ligne d’emballage' },
        en: { noun: 'automated packaging and bottling line', short: 'packaging line' },
      },
      {
        id: 'agro_farm',
        category: 'opportunity',
        profitScale: 1.15,
        ar: { noun: 'مزرعة فلاحية عصرية بالسقي الذكي', short: 'الفلاحة العصرية' },
        fr: { noun: 'ferme agricole en irrigation intelligente', short: 'ferme moderne' },
        en: { noun: 'smart-irrigated commercial farm', short: 'modern agro-farm' },
      },
      {
        id: 'urban_realty',
        category: 'opportunity',
        profitScale: 1.2,
        ar: { noun: 'شقق ومحلات تجارية قيد الإنجاز', short: 'العقار التجاري' },
        fr: { noun: 'résidence mixte logements et commerces', short: 'immobilier mixte' },
        en: { noun: 'mixed-use urban retail & housing block', short: 'urban real estate' },
      },
      {
        id: 'cold_hub',
        category: 'trade',
        profitScale: 1.0,
        ar: { noun: 'مستودع التبريد والخدمات اللوجستية', short: 'سلسلة التبريد' },
        fr: { noun: 'entrepôt frigorifique logistique', short: 'chaîne du froid' },
        en: { noun: 'cold-chain storage & logistics hub', short: 'cold-chain hub' },
      },
      {
        id: 'cosmetics_export',
        category: 'trade',
        profitScale: 1.15,
        ar: { noun: 'صادرات مستحضرات التجميل الطبيعية', short: 'تصدير التجميل' },
        fr: { noun: 'export de cosmétiques naturels certifiés', short: 'export cosmétique' },
        en: { noun: 'certified natural cosmetics exports', short: 'cosmetics export' },
      },
      {
        id: 'cafe_chain',
        category: 'community',
        profitScale: 0.95,
        ar: { noun: 'سلسلة مقاهي ومخبزات حديثة', short: 'سلسلة المقاهي' },
        fr: { noun: 'chaîne de cafés et boulangeries modernes', short: 'franchise cafés' },
        en: { noun: 'modern artisan café franchise', short: 'café franchise' },
      },
      {
        id: 'textile_plant',
        category: 'craft',
        profitScale: 1.1,
        ar: { noun: 'وحدة صناعية للنسيج والملابس الجاهزة', short: 'مصنع النسيج' },
        fr: { noun: 'atelier industriel de confection textile', short: 'usine textile' },
        en: { noun: 'industrial garment manufacturing plant', short: 'textile plant' },
      },
      {
        id: 'freight_fleet',
        category: 'trade',
        profitScale: 1.05,
        ar: { noun: 'أسطول شاحنات النقل بين المدن', short: 'نقل البضائع' },
        fr: { noun: 'flotte de camions de fret interurbain', short: 'flotte fret' },
        en: { noun: 'intercity cargo trucking fleet', short: 'freight fleet' },
      },
    ],
    places: [
      {
        id: 'technopark',
        ar: { name: 'تيكنوبارك الدار البيضاء', inPlace: 'في قطب تيكنوبارك بالدار البيضاء' },
        fr: { name: 'Technopark Casablanca', inPlace: 'au Technopark de Casablanca' },
        en: { name: 'Casablanca Technopark', inPlace: 'at Casablanca Technopark' },
      },
      {
        id: 'tanger_med',
        ar: { name: 'ميناء طنجة المتوسط', inPlace: 'في المنطقة اللوجستية لميناء طنجة المتوسط' },
        fr: { name: 'Tanger Med', inPlace: 'au pôle logistique de Tanger Med' },
        en: { name: 'Tanger Med', inPlace: 'at the Tanger Med logistics hub' },
      },
      {
        id: 'ain_sebaa',
        ar: { name: 'عين السبع', inPlace: 'في المنطقة الصناعية بعين السبع' },
        fr: { name: 'Aïn Sebaâ', inPlace: 'dans la zone industrielle d’Aïn Sebaâ' },
        en: { name: 'Ain Sebaa', inPlace: 'in the Ain Sebaa industrial park' },
      },
      {
        id: 'berkane',
        ar: { name: 'أكروبول بركان', inPlace: 'في القطب الفلاحي بأكروبول بركان' },
        fr: { name: 'Agropole Berkane', inPlace: 'à l’Agropole de Berkane' },
        en: { name: 'Berkane Agropole', inPlace: 'at the Berkane Agropole' },
      },
      {
        id: 'kenitra',
        ar: { name: 'القنيطرة الصناعية', inPlace: 'في القطب الصناعي بالقنيطرة' },
        fr: { name: 'Pôle de Kénitra', inPlace: 'dans la zone franche de Kénitra' },
        en: { name: 'Kenitra Park', inPlace: 'in Kenitra’s Atlantic Free Zone' },
      },
      {
        id: 'zenata',
        ar: { name: 'زناتة', inPlace: 'في المحطة اللوجستية بزناتة' },
        fr: { name: 'Zenata', inPlace: 'sur la plateforme logistique de Zenata' },
        en: { name: 'Zenata Hub', inPlace: 'at the Zenata logistics platform' },
      },
    ],
    actors: [
      {
        id: 'tariq',
        ar: { full: 'طارق · مطور عقاري', short: 'طارق' },
        fr: { full: 'Tariq · Promoteur immobilier', short: 'Tariq' },
        en: { full: 'Tariq · Property Developer', short: 'Tariq' },
      },
      {
        id: 'claire',
        ar: { full: 'مدام كلير · مستوردة أوروبية', short: 'مدام كلير' },
        fr: { full: 'Mme Claire · Importatrice UE', short: 'Mme Claire' },
        en: { full: 'Ms. Claire · European Buyer', short: 'Ms. Claire' },
      },
      {
        id: 'youssef',
        ar: { full: 'المهندس يوسف · مدير عمليات صناعية', short: 'المهندس يوسف' },
        fr: { full: 'Ing. Youssef · Directeur industriel', short: 'Youssef' },
        en: { full: 'Eng. Youssef · Plant Director', short: 'Youssef' },
      },
      {
        id: 'houda',
        ar: { full: 'هدى · مديرة التمويل المؤسسي', short: 'هدى' },
        fr: { full: 'Houda · Financement corporate', short: 'Houda' },
        en: { full: 'Houda · Corporate Finance', short: 'Houda' },
      },
      {
        id: 'atlas_retail',
        ar: { full: 'سلسلة متاجر كبرى', short: 'سلسلة المتاجر' },
        fr: { full: 'Grande enseigne nationale', short: 'L’enseigne' },
        en: { full: 'National Retail Group', short: 'the retail chain' },
      },
      {
        id: 'agri_coop',
        ar: { full: 'اتحاد التعاونيات الجهوية', short: 'اتحاد التعاونيات' },
        fr: { full: 'Union des coopératives', short: 'L’union agricole' },
        en: { full: 'Regional Growers Union', short: 'the growers union' },
      },
    ],
  },
  4: {
    items: [
      {
        id: 'solar_plant',
        category: 'opportunity',
        profitScale: 1.2,
        ar: { noun: 'محطة الطاقة الشمسية الصحراوية', short: 'الطاقة الشمسية' },
        fr: { noun: 'centrale solaire saharienne haute capacité', short: 'centrale solaire' },
        en: { noun: 'high-capacity desert solar power plant', short: 'solar power plant' },
      },
      {
        id: 'port_terminal',
        category: 'trade',
        profitScale: 1.1,
        ar: { noun: 'محطة الشحن والتصدير البحري الدولية', short: 'الميناء الدولي' },
        fr: { noun: 'terminal portuaire de fret international', short: 'terminal export' },
        en: { noun: 'international maritime export terminal', short: 'export terminal' },
      },
      {
        id: 'fintech',
        category: 'opportunity',
        profitScale: 1.25,
        ar: { noun: 'منصة المدفوعات العابرة للقارات', short: 'التقنية المالية' },
        fr: { noun: 'plateforme fintech transcontinentale', short: 'fintech globale' },
        en: { noun: 'cross-border fintech payment network', short: 'global fintech' },
      },
      {
        id: 'ev_hub',
        category: 'craft',
        profitScale: 1.15,
        ar: { noun: 'مصنع بطاريات والمركبات الكهربائية', short: 'المركبات الكهربائية' },
        fr: { noun: 'usine de batteries et véhicules électriques', short: 'mobilité électrique' },
        en: { noun: 'electric vehicle & battery assembly complex', short: 'EV manufacturing' },
      },
      {
        id: 'green_h2',
        category: 'opportunity',
        profitScale: 1.3,
        ar: { noun: 'مجمع إنتاج وتصدير الهيدروجين الأخضر', short: 'الهيدروجين الأخضر' },
        fr: { noun: 'complexe d’hydrogène vert pour l’export', short: 'hydrogène vert' },
        en: { noun: 'green hydrogen production & export hub', short: 'green hydrogen' },
      },
      {
        id: 'global_brand',
        category: 'trade',
        profitScale: 1.05,
        ar: { noun: 'شبكة التوزيع والمتاجر في أربع قارات', short: 'التجارة العالمية' },
        fr: { noun: 'réseau commercial sur quatre continents', short: 'réseau mondial' },
        en: { noun: 'four-continent flagship retail network', short: 'global retail' },
      },
      {
        id: 'pharma_labs',
        category: 'craft',
        profitScale: 1.1,
        ar: { noun: 'مختبرات الصناعة الدوائية والتصدير الإفريقي', short: 'الصناعة الدوائية' },
        fr: { noun: 'laboratoires pharmaceutiques pan-africains', short: 'pôle pharma' },
        en: { noun: 'pan-African pharmaceutical research labs', short: 'pharma labs' },
      },
      {
        id: 'charity_endowment',
        category: 'community',
        profitScale: 0.9,
        ar: { noun: 'مؤسسة كبرى للمنح الدراسية والابتكار', short: 'المؤسسة التنموية' },
        fr: { noun: 'fondation pour les bourses et l’innovation', short: 'fondation mécénat' },
        en: { noun: 'global scholarship & innovation endowment', short: 'impact endowment' },
      },
    ],
    places: [
      {
        id: 'ouarzazate',
        ar: { name: 'نور ورزازات', inPlace: 'في مجمع الطاقة الشمسية بورزازات' },
        fr: { name: 'Noor Ouarzazate', inPlace: 'au complexe solaire Noor de Ouarzazate' },
        en: { name: 'Noor Ouarzazate', inPlace: 'at the Noor Solar Complex in Ouarzazate' },
      },
      {
        id: 'cfc',
        ar: { name: 'القطب المالي للدار البيضاء', inPlace: 'في القطب المالي للدار البيضاء (CFC)' },
        fr: { name: 'Casablanca Finance City', inPlace: 'à Casablanca Finance City' },
        en: { name: 'Casablanca Finance City', inPlace: 'at Casablanca Finance City' },
      },
      {
        id: 'rotterdam',
        ar: { name: 'ميناء روتردام', inPlace: 'عبر ميناء روتردام الأوروبي' },
        fr: { name: 'Port de Rotterdam', inPlace: 'via le port de Rotterdam' },
        en: { name: 'Port of Rotterdam', inPlace: 'through the Port of Rotterdam' },
      },
      {
        id: 'dubai',
        ar: { name: 'مركز دبي المالي', inPlace: 'في مركز دبي المالي العالمي' },
        fr: { name: 'Dubaï DIFC', inPlace: 'au centre financier de Dubaï' },
        en: { name: 'Dubai DIFC', inPlace: 'at Dubai International Financial Centre' },
      },
      {
        id: 'london',
        ar: { name: 'بورصة لندن', inPlace: 'في حي المال والأعمال بلندن' },
        fr: { name: 'Londres', inPlace: 'à la City de Londres' },
        en: { name: 'London City', inPlace: 'in London’s financial district' },
      },
      {
        id: 'marseille',
        ar: { name: 'مرسيليا المتوسطية', inPlace: 'في ممر التجارة المتوسطي بمرسيليا' },
        fr: { name: 'Marseille', inPlace: 'au hub méditerranéen de Marseille' },
        en: { name: 'Marseille Hub', inPlace: 'at Marseille’s Mediterranean gateway' },
      },
    ],
    actors: [
      {
        id: 'edward',
        ar: { full: 'السير إدوارد · صندوق سيادي أوروبي', short: 'السير إدوارد' },
        fr: { full: 'Sir Edward · Fonds souverain', short: 'Sir Edward' },
        en: { full: 'Sir Edward · Sovereign Fund', short: 'Sir Edward' },
      },
      {
        id: 'noura',
        ar: { full: 'الشيخة نورة · تحالف طاقة خليجي', short: 'الشيخة نورة' },
        fr: { full: 'Cheikha Noura · Groupe énergie', short: 'Cheikha Noura' },
        en: { full: 'Sheikha Noura · Energy Alliance', short: 'Sheikha Noura' },
      },
      {
        id: 'carlos',
        ar: { full: 'د. كارلوس · شريك تكنولوجي دولي', short: 'د. كارلوس' },
        fr: { full: 'Dr Carlos · Partenaire tech', short: 'Dr Carlos' },
        en: { full: 'Dr. Carlos · Global Tech Partner', short: 'Dr. Carlos' },
      },
      {
        id: 'export_board',
        ar: { full: 'مجلس التصدير المتوسطي', short: 'مجلس التصدير' },
        fr: { full: 'Conseil Export Méditerranée', short: 'le Conseil Export' },
        en: { full: 'Mediterranean Export Council', short: 'the Export Council' },
      },
      {
        id: 'bank_syndicate',
        ar: { full: 'تحالف بنكي دولي', short: 'التحالف البنكي' },
        fr: { full: 'Consortium bancaire mondial', short: 'le Consortium' },
        en: { full: 'Global Banking Syndicate', short: 'the Syndicate' },
      },
      {
        id: 'asian_delegation',
        ar: { full: 'مجموعة استثمار آسيوية', short: 'المجموعة الآسيوية' },
        fr: { full: 'Délégation industrielle d’Asie', short: 'le Groupe Asie' },
        en: { full: 'Asian Industrial Consortium', short: 'the Asian Group' },
      },
    ],
  },
};

function roundStageMoney(stage: StageNumber, raw: number): number {
  const sign = raw < 0 ? -1 : 1;
  const abs = Math.abs(raw);
  if (abs === 0) return 0;

  switch (stage) {
    case 1:
      return sign * Math.max(5, Math.round(abs / 5) * 5);
    case 2:
      return sign * Math.max(100, Math.round(abs / 100) * 100);
    case 3:
      return sign * Math.max(2500, Math.round(abs / 2500) * 2500);
    case 4: {
      if (abs >= 20_000_000) {
        return sign * Math.round(abs / 1_000_000) * 1_000_000;
      }
      if (abs >= 2_000_000) {
        return sign * Math.round(abs / 250_000) * 250_000;
      }
      return sign * Math.max(250_000, Math.round(abs / 50_000) * 50_000);
    }
  }
}

function getStageBaseProfit(
  stage: StageNumber,
  currentMoney: number,
  profitScale: number
): number {
  switch (stage) {
    case 1: {
      const anchor = Math.max(30, Math.min(200, currentMoney * 0.55 + 25));
      return roundStageMoney(1, anchor * profitScale);
    }
    case 2: {
      const anchor = Math.max(1200, Math.min(11000, currentMoney * 0.24 + 900));
      return roundStageMoney(2, anchor * profitScale);
    }
    case 3: {
      const anchor = Math.max(35000, Math.min(210000, currentMoney * 0.22 + 25000));
      return roundStageMoney(3, anchor * profitScale);
    }
    case 4: {
      const anchor = Math.max(
        600_000,
        Math.min(220_000_000, currentMoney * 0.26 + 350_000)
      );
      return roundStageMoney(4, anchor * profitScale);
    }
  }
}

function safeMinorLoss(
  stage: StageNumber,
  currentMoney: number,
  baseProfit: number,
  ratio: number
): number {
  const rawLoss = baseProfit * ratio;
  const maxSafeLoss = Math.max(5, currentMoney * 0.45);
  return -Math.abs(roundStageMoney(stage, Math.min(rawLoss, maxSafeLoss)));
}

type RegularTemplateId =
  | 'rush_supply'
  | 'calculated_gamble'
  | 'sudden_crisis'
  | 'social_quality';

const REGULAR_TEMPLATES: RegularTemplateId[] = [
  'rush_supply',
  'calculated_gamble',
  'sudden_crisis',
  'social_quality',
];

function buildRegularProceduralCard(
  id: number,
  stage: StageNumber,
  templateId: RegularTemplateId,
  item: ProceduralItem,
  place: ProceduralPlace,
  actor: ProceduralActor,
  currentMoney: number
): ScenarioCard {
  const baseProfit = getStageBaseProfit(stage, currentMoney, item.profitScale);
  const fingerprint = `proc:s${stage}:${templateId}:${item.id}:${place.id}:${actor.id}`;
  const ideaKey = `proc:s${stage}:${templateId}:${item.id}`;

  switch (templateId) {
    case 'rush_supply': {
      const safeCommission = roundStageMoney(stage, baseProfit * 0.45);
      return {
        id,
        stage,
        category: item.category,
        fingerprint,
        ideaKey,
        content: {
          ar: {
            categoryLabel: `طلب عاجل · ${item.ar.short}`,
            character: actor.ar.full,
            title: `صفقة ${item.ar.short} ${place.ar.inPlace}`,
            description: `يتواصل معك ${actor.ar.short} لتلبية طلبية مستعجلة من ${item.ar.noun} ${place.ar.inPlace} بهامش ربح مغرٍ اليوم.`,
          },
          fr: {
            categoryLabel: `Commande urgente · ${item.fr.short}`,
            character: actor.fr.full,
            title: `Affaire ${item.fr.short} · ${place.fr.name}`,
            description: `${actor.fr.short} sollicite une livraison urgente de ${item.fr.noun} ${place.fr.inPlace} avec une belle marge immédiate.`,
          },
          en: {
            categoryLabel: `Rush Order · ${item.en.short}`,
            character: actor.en.full,
            title: `${item.en.short} Deal in ${place.en.name}`,
            description: `${actor.en.short} needs an urgent batch of ${item.en.noun} ${place.en.inPlace} with attractive same-day margins.`,
          },
        },
        rightChoice: {
          content: {
            ar: {
              label: 'أباشر التنفيذ بنفسي',
              outcome: `أنجزت صفقة ${item.ar.short} في الوقت المحدد وكسبت ثقة ${actor.ar.short}!`,
            },
            fr: {
              label: 'Prendre tout le contrat',
              outcome: `Livraison de ${item.fr.short} réussie dans les temps et confiance renforcée !`,
            },
            en: {
              label: 'Fulfill Full Order',
              outcome: `You delivered the ${item.en.short} order on time and earned strong loyalty!`,
            },
          },
          impact: {
            money: baseProfit,
            reputation: 8,
            energy: -14,
            experience: 9,
          },
        },
        leftChoice: {
          content: {
            ar: {
              label: 'أكتفي بالوساطة الآمنة',
              outcome: `ربح سريع ومريح من الوساطة دون إرهاق طاقتك ${place.ar.inPlace}.`,
            },
            fr: {
              label: 'Prendre une commission',
              outcome: `Gain modeste mais sans fatigue ni risque opérationnel.`,
            },
            en: {
              label: 'Broker for a Fee',
              outcome: `Steady broker fee with minimal effort or stress.`,
            },
          },
          impact: {
            money: safeCommission,
            reputation: 3,
            energy: -4,
            experience: 5,
          },
        },
      };
    }

    case 'calculated_gamble': {
      const successChance = 70;
      const doubleProfit = roundStageMoney(stage, baseProfit * 2.1);
      const minorLoss = safeMinorLoss(stage, currentMoney, baseProfit, 0.35);
      const safeGain = roundStageMoney(stage, baseProfit * 0.4);

      const dynamicOutcome: DynamicOutcomeConfig = {
        successChance,
        successImpact: {
          money: doubleProfit,
          reputation: 12,
          energy: -14,
          experience: 14,
        },
        successOutcome: {
          ar: `ضربة معلم! تفوقت توقعاتك ${place.ar.inPlace} وتضاعفت أرباح ${item.ar.short}!`,
          fr: `Pari gagnant ! La demande ${place.fr.inPlace} a explosé et doublé vos gains !`,
          en: `Jackpot! Demand surged ${place.en.inPlace} and doubled your ${item.en.short} payoff!`,
        },
        failImpact: {
          money: minorLoss,
          reputation: -4,
          energy: -10,
          experience: 8,
        },
        failOutcome: {
          ar: `تباطأ الإقبال مؤقتاً ${place.ar.inPlace} فتكبّدت خسارة بسيطة، لكنك خرجت بخبرة ثمينة.`,
          fr: `Le marché a ralenti ${place.fr.inPlace} : petite perte maîtrisée, mais belle leçon apprise.`,
          en: `Demand cooled briefly ${place.en.inPlace}; you took a small manageable loss and gained insight.`,
        },
      };

      return {
        id,
        stage,
        category: 'opportunity',
        fingerprint,
        ideaKey,
        content: {
          ar: {
            categoryLabel: `مغامرة استثمارية · ${item.ar.short}`,
            character: actor.ar.full,
            title: `مضاعفة الرهان على ${item.ar.short}`,
            description: `يقترح ${actor.ar.short} توسيع حصة ${item.ar.noun} ${place.ar.inPlace}. النجاح يمنح ربحاً مضاعفاً بنسبة 70% مقابل خسارة بسيطة إذا ركد السوق.`,
          },
          fr: {
            categoryLabel: `Pari stratégique · ${item.fr.short}`,
            character: actor.fr.full,
            title: `Miser gros sur ${item.fr.short}`,
            description: `${actor.fr.short} propose d’amplifier ${item.fr.noun} ${place.fr.inPlace}. 70% de chances de doubler le gain, sinon une petite perte.`,
          },
          en: {
            categoryLabel: `Calculated Risk · ${item.en.short}`,
            character: actor.en.full,
            title: `Double Down on ${item.en.short}`,
            description: `${actor.en.short} proposes scaling ${item.en.noun} ${place.en.inPlace}. 70% chance for double profit against a mild downside.`,
          },
        },
        rightChoice: {
          content: {
            ar: {
              label: 'أخوض المغامرة (70%)',
              outcome: dynamicOutcome.successOutcome.ar,
            },
            fr: {
              label: 'Tenter le pari (70%)',
              outcome: dynamicOutcome.successOutcome.fr,
            },
            en: {
              label: 'Take the Bet (70%)',
              outcome: dynamicOutcome.successOutcome.en,
            },
          },
          impact: dynamicOutcome.successImpact,
          dynamicOutcome,
        },
        leftChoice: {
          content: {
            ar: {
              label: 'أكتفي بهامش آمن',
              outcome: `فضّلت الأمان وحققت ربحاً مضموناً مع حفظ السيولة للطوارئ.`,
            },
            fr: {
              label: 'Rester prudent',
              outcome: `Vous sécurisez un profit modeste tout en protégeant votre trésorerie.`,
            },
            en: {
              label: 'Play It Safe',
              outcome: `You locked in a modest, guaranteed gain and kept cash reserves safe.`,
            },
          },
          impact: {
            money: safeGain,
            reputation: 4,
            energy: -5,
            experience: 5,
          },
        },
      };
    }

    case 'sudden_crisis': {
      const fixCost = safeMinorLoss(stage, currentMoney, baseProfit, 0.3);
      const gambleBonus = roundStageMoney(stage, baseProfit * 0.9);
      const fineLoss = safeMinorLoss(stage, currentMoney, baseProfit, 0.65);

      const dynamicOutcome: DynamicOutcomeConfig = {
        successChance: 60,
        successImpact: {
          money: gambleBonus,
          reputation: 4,
          energy: -10,
          experience: 11,
        },
        successOutcome: {
          ar: `نجحت حيلتك الميدانية! تداركت الموقف ${place.ar.inPlace} ووفّرت السيولة بربح إضافي.`,
          fr: `Système D efficace ! Vous avez résolu l’imprévu ${place.fr.inPlace} sans surcoût.`,
          en: `Quick thinking worked! You fixed the bottleneck ${place.en.inPlace} and saved cash.`,
        },
        failImpact: {
          money: fineLoss,
          reputation: -12,
          energy: -14,
          experience: 7,
        },
        failOutcome: {
          ar: `تعقدت الأزمة ${place.ar.inPlace} فاضطررت لتعويض المتضررين وخسرت جزءاً من الثقة.`,
          fr: `Le contretemps s’est aggravé ${place.fr.inPlace}, entraînant des pénalités et un recul de confiance.`,
          en: `The workaround failed ${place.en.inPlace}, costing penalties and market trust.`,
        },
      };

      return {
        id,
        stage,
        category: 'craft',
        fingerprint,
        ideaKey,
        content: {
          ar: {
            categoryLabel: `طوارئ مفاجئة · ${place.ar.name}`,
            character: actor.ar.full,
            title: `عطل يهدد ${item.ar.short}`,
            description: `ظهر عائق لوجستي مفاجئ ${place.ar.inPlace} يهدد شحنة ${item.ar.noun}. هل تدفع لحل فوري مضمون أم تجرب حلاً بديلاً؟`,
          },
          fr: {
            categoryLabel: `Imprévu · ${place.fr.name}`,
            character: actor.fr.full,
            title: `Blocage sur ${item.fr.short}`,
            description: `Un incident soudain ${place.fr.inPlace} menace ${item.fr.noun}. Payer pour un dépannage sûr ou improviser ?`,
          },
          en: {
            categoryLabel: `Sudden Crisis · ${place.en.name}`,
            character: actor.en.full,
            title: `Disruption Hits ${item.en.short}`,
            description: `A sudden snag ${place.en.inPlace} threatens your ${item.en.noun}. Pay for a reliable fix or gamble on a fast workaround?`,
          },
        },
        rightChoice: {
          content: {
            ar: {
              label: 'أعالج العطل فوراً وبجودة',
              outcome: `أنقذت الموقف باحترافية ${place.ar.inPlace} فأشاد ${actor.ar.short} بأمانتك.`,
            },
            fr: {
              label: 'Régler proprement',
              outcome: `Incident réglé avec sérieux ${place.fr.inPlace}. Votre fiabilité impressionne.`,
            },
            en: {
              label: 'Pay for Reliable Fix',
              outcome: `Crisis handled smoothly ${place.en.inPlace}. Partners praised your reliability.`,
            },
          },
          impact: {
            money: fixCost,
            reputation: 12,
            energy: -10,
            experience: 10,
          },
        },
        leftChoice: {
          content: {
            ar: {
              label: 'أجرب حلاً ميدانياً (60%)',
              outcome: dynamicOutcome.successOutcome.ar,
            },
            fr: {
              label: 'Improviser (60%)',
              outcome: dynamicOutcome.successOutcome.fr,
            },
            en: {
              label: 'Improvise Fix (60%)',
              outcome: dynamicOutcome.successOutcome.en,
            },
          },
          impact: dynamicOutcome.successImpact,
          dynamicOutcome,
        },
      };
    }

    case 'social_quality': {
      const ethicalProfit = roundStageMoney(stage, baseProfit * 0.75);
      const shortcutProfit = roundStageMoney(stage, baseProfit * 1.45);
      const backlashLoss = safeMinorLoss(stage, currentMoney, baseProfit, 0.45);

      const dynamicOutcome: DynamicOutcomeConfig = {
        successChance: 55,
        successImpact: {
          money: shortcutProfit,
          reputation: -4,
          energy: -6,
          experience: 5,
        },
        successOutcome: {
          ar: `مرّ تقليص التكلفة دون ضجة كبيرة، وحققت سيولة أسرع هذه المرة.`,
          fr: `La réduction de coûts est passée inaperçue et dégage plus de cash à court terme.`,
          en: `The cost-cut went largely unnoticed, boosting short-term cash.`,
        },
        failImpact: {
          money: backlashLoss,
          reputation: -14,
          energy: -8,
          experience: 8,
        },
        failOutcome: {
          ar: `انتبه ${actor.ar.short} لتراجع الجودة ${place.ar.inPlace} فأعاد البضاعة مع غرامة!`,
          fr: `${actor.fr.short} a repéré la baisse de qualité ${place.fr.inPlace} et exigé un remboursement !`,
          en: `${actor.en.short} spotted the quality cut ${place.en.inPlace} and demanded refunds!`,
        },
      };

      return {
        id,
        stage,
        category: 'community',
        fingerprint,
        ideaKey,
        content: {
          ar: {
            categoryLabel: `أخلاقيات السوق · ${place.ar.name}`,
            character: actor.ar.full,
            title: `معيار الجودة في ${item.ar.short}`,
            description: `يعرض عليك وسيط ${place.ar.inPlace} خفض تكلفة ${item.ar.noun} لزيادة الربح السريع، لكن ${actor.ar.short} يراهن على الجودة والصدق.`,
          },
          fr: {
            categoryLabel: `Éthique & Qualité · ${place.fr.name}`,
            character: actor.fr.full,
            title: `Qualité sur ${item.fr.short}`,
            description: `On vous propose de rogner sur la qualité de ${item.fr.noun} ${place.fr.inPlace} pour gagner plus vite, mais ${actor.fr.short} exige l’excellence.`,
          },
          en: {
            categoryLabel: `Market Ethics · ${place.en.name}`,
            character: actor.en.full,
            title: `Quality Standard on ${item.en.short}`,
            description: `A supplier ${place.en.inPlace} offers cheaper corners on ${item.en.noun} for fast cash, while ${actor.en.short} values lasting trust.`,
          },
        },
        rightChoice: {
          content: {
            ar: {
              label: 'ألتزم بالجودة والأمانة',
              outcome: `أبهرت السوق بجودة ${item.ar.short} وتضاعفت سمعتك وتوصيات الزبائن!`,
            },
            fr: {
              label: 'Maintenir la qualité',
              outcome: `Votre exigence sur ${item.fr.short} bâtit une réputation en or !`,
            },
            en: {
              label: 'Uphold High Quality',
              outcome: `Your commitment to ${item.en.short} quality won lasting word-of-mouth trust!`,
            },
          },
          impact: {
            money: ethicalProfit,
            reputation: 14,
            energy: -8,
            experience: 11,
          },
        },
        leftChoice: {
          content: {
            ar: {
              label: 'أقلص التكلفة للمخاطرة (55%)',
              outcome: dynamicOutcome.successOutcome.ar,
            },
            fr: {
              label: 'Rogner les coûts (55%)',
              outcome: dynamicOutcome.successOutcome.fr,
            },
            en: {
              label: 'Cut Corners (55%)',
              outcome: dynamicOutcome.successOutcome.en,
            },
          },
          impact: dynamicOutcome.successImpact,
          dynamicOutcome,
        },
      };
    }
  }
}

type RareTemplateId =
  | 'rare_lifetime_chance'
  | 'rare_surprise_audit'
  | 'rare_rival_buyout'
  | 'rare_foreign_investor'
  | 'rare_economic_weather_shock';

const RARE_TEMPLATES: RareTemplateId[] = [
  'rare_lifetime_chance',
  'rare_surprise_audit',
  'rare_rival_buyout',
  'rare_foreign_investor',
  'rare_economic_weather_shock',
];

function buildRareProceduralCard(
  id: number,
  stage: StageNumber,
  rareId: RareTemplateId,
  item: ProceduralItem,
  place: ProceduralPlace,
  actor: ProceduralActor,
  currentMoney: number
): ScenarioCard {
  const baseProfit = getStageBaseProfit(stage, currentMoney, item.profitScale);
  const fingerprint = `rare:s${stage}:${rareId}:${item.id}:${place.id}:${actor.id}`;
  const ideaKey = `rare:s${stage}:${rareId}`;

  switch (rareId) {
    case 'rare_lifetime_chance': {
      const jackpot = roundStageMoney(stage, baseProfit * 2.8);
      const mildCost = safeMinorLoss(stage, currentMoney, baseProfit, 0.35);
      const safeGain = roundStageMoney(stage, baseProfit * 0.8);

      const dynamicOutcome: DynamicOutcomeConfig = {
        successChance: 72,
        successImpact: {
          money: jackpot,
          reputation: 15,
          energy: -16,
          experience: 16,
        },
        successOutcome: {
          ar: `فرصة عمر حقيقية! حسمت صفقة ${item.ar.short} ${place.ar.inPlace} وحققت قفزة ثروة استثنائية!`,
          fr: `Opportunité du siècle ! Votre contrat ${place.fr.inPlace} vous propulse vers de nouveaux sommets !`,
          en: `Once-in-a-lifetime hit! Closing the deal ${place.en.inPlace} delivered an extraordinary surge!`,
        },
        failImpact: {
          money: mildCost,
          reputation: -3,
          energy: -10,
          experience: 10,
        },
        failOutcome: {
          ar: `انسحب أحد الممولين في اللحظة الأخيرة، فخرجت بخسارة بسيطة وتجربة تفاوض قوية.`,
          fr: `Un bailleur s’est retiré au dernier instant : petite perte, mais expérience précieuse.`,
          en: `A backer pulled out last minute—leaving a mild cost and sharp negotiation experience.`,
        },
      };

      return {
        id,
        stage,
        category: 'opportunity',
        fingerprint,
        ideaKey,
        isRare: true,
        rareTag: {
          ar: 'حدث نادر · فرصة عمر',
          fr: 'Événement rare · Chance en or',
          en: 'Rare Event · Lifetime Chance',
        },
        content: {
          ar: {
            categoryLabel: 'حدث نادر · فرصة عمر مفاجئة',
            character: actor.ar.full,
            title: `فرصة عمر مفاجئة في ${item.ar.short}`,
            description: `صفقة استثنائية تفتح أمامك فجأة ${place.ar.inPlace} مع ${actor.ar.short}. اقتناصها الآن قد يقفز بثروتك إلى مستوى جديد!`,
          },
          fr: {
            categoryLabel: 'Événement rare · Opportunité unique',
            character: actor.fr.full,
            title: `Opportunité en or : ${item.fr.short}`,
            description: `Une fenêtre exceptionnelle s’ouvre soudain ${place.fr.inPlace} avec ${actor.fr.short}. Saisir ce coup rare peut propulser votre capital !`,
          },
          en: {
            categoryLabel: 'Rare Event · Opportunity of a Lifetime',
            character: actor.en.full,
            title: `Surprise Lifetime Deal: ${item.en.short}`,
            description: `An unexpected golden opening appears ${place.en.inPlace} with ${actor.en.short}. Seizing it could catapult your wealth!`,
          },
        },
        rightChoice: {
          content: {
            ar: {
              label: 'أقتنص فرصة العمر (72%)',
              outcome: dynamicOutcome.successOutcome.ar,
            },
            fr: {
              label: 'Saisir l’opportunité (72%)',
              outcome: dynamicOutcome.successOutcome.fr,
            },
            en: {
              label: 'Seize Lifetime Deal (72%)',
              outcome: dynamicOutcome.successOutcome.en,
            },
          },
          impact: dynamicOutcome.successImpact,
          dynamicOutcome,
        },
        leftChoice: {
          content: {
            ar: {
              label: 'آخذ حصة مضمونة فقط',
              outcome: `ضمنت نصيباً آمناً من الصفقة دون تعريض سيولتك للمخاطرة.`,
            },
            fr: {
              label: 'Prendre une part sûre',
              outcome: `Vous encaissez une part garantie sans exposer votre capital.`,
            },
            en: {
              label: 'Take Guaranteed Share',
              outcome: `You secured a safe slice of the deal without exposing your capital.`,
            },
          },
          impact: {
            money: safeGain,
            reputation: 6,
            energy: -6,
            experience: 8,
          },
        },
      };
    }

    case 'rare_surprise_audit': {
      const complianceFee = safeMinorLoss(stage, currentMoney, baseProfit, 0.28);
      const evadeFine = safeMinorLoss(stage, currentMoney, baseProfit, 0.72);
      const passGain = roundStageMoney(stage, baseProfit * 0.25);

      const dynamicOutcome: DynamicOutcomeConfig = {
        successChance: 52,
        successImpact: {
          money: passGain,
          reputation: -2,
          energy: -12,
          experience: 9,
        },
        successOutcome: {
          ar: `مرت المراقبة بصعوبة دون غرامة تذكر، لكن التوتر استنزف طاقتك.`,
          fr: `Le contrôle est passé de justesse sans amende, mais la pression a pesé.`,
          en: `The audit cleared narrowly without a fine, though the stress drained your energy.`,
        },
        failImpact: {
          money: evadeFine,
          reputation: -16,
          energy: -12,
          experience: 8,
        },
        failOutcome: {
          ar: `رصد المفتشون ثغرات في أوراق ${item.ar.short}، ففُرضت غرامة مالية وتراجعت السمعة!`,
          fr: `Les inspecteurs ont relevé des irrégularités ${place.fr.inPlace} : lourde amende !`,
          en: `Inspectors flagged compliance gaps ${place.en.inPlace}, issuing a steep fine and trust drop!`,
        },
      };

      return {
        id,
        stage,
        category: 'community',
        fingerprint,
        ideaKey,
        isRare: true,
        rareTag: {
          ar: 'حدث نادر · تفتيش مفاجئ',
          fr: 'Événement rare · Contrôle surprise',
          en: 'Rare Event · Surprise Audit',
        },
        content: {
          ar: {
            categoryLabel: 'حدث نادر · تفتيش ومراقبة',
            character: `لجنة التفتيش · ${place.ar.name}`,
            title: `تفتيش مفاجئ على ${item.ar.short}`,
            description: `وصلت لجنة مراقبة فجأة ${place.ar.inPlace} لمراجعة فواتير ومعايير ${item.ar.noun}. الشفافية تحمي سمعتك وتكلف رسوماً بسيطة.`,
          },
          fr: {
            categoryLabel: 'Événement rare · Inspection',
            character: `Brigade de contrôle · ${place.fr.name}`,
            title: `Contrôle surprise sur ${item.fr.short}`,
            description: `Une inspection inopinée arrive ${place.fr.inPlace} pour vérifier vos factures et normes sur ${item.fr.noun}.`,
          },
          en: {
            categoryLabel: 'Rare Event · Compliance Audit',
            character: `Inspection Team · ${place.en.name}`,
            title: `Surprise Audit on ${item.en.short}`,
            description: `Regulators arrive unannounced ${place.en.inPlace} to inspect permits and records for ${item.en.noun}.`,
          },
        },
        rightChoice: {
          content: {
            ar: {
              label: 'أفتح السجلات وأسوي الرسوم',
              outcome: `اجتزت التفتيش بامتياز ونلت شهادة ثقة تعزز مكانتك في السوق!`,
            },
            fr: {
              label: 'Tout régulariser au clair',
              outcome: `Contrôle validé avec mention ! Votre crédibilité sort renforcée.`,
            },
            en: {
              label: 'Full Transparency & Fees',
              outcome: `You passed the inspection cleanly and earned official trust credentials!`,
            },
          },
          impact: {
            money: complianceFee,
            reputation: 16,
            energy: -8,
            experience: 12,
          },
        },
        leftChoice: {
          content: {
            ar: {
              label: 'أحاول الالتفاف والتبرير (52%)',
              outcome: dynamicOutcome.successOutcome.ar,
            },
            fr: {
              label: 'Tenter de contourner (52%)',
              outcome: dynamicOutcome.successOutcome.fr,
            },
            en: {
              label: 'Bluff & Stall (52%)',
              outcome: dynamicOutcome.successOutcome.en,
            },
          },
          impact: dynamicOutcome.successImpact,
          dynamicOutcome,
        },
      };
    }

    case 'rare_rival_buyout': {
      const surgeProfit = roundStageMoney(stage, baseProfit * 2.3);
      const priceWarLoss = safeMinorLoss(stage, currentMoney, baseProfit, 0.4);
      const buyoutCash = roundStageMoney(stage, baseProfit * 1.15);

      const dynamicOutcome: DynamicOutcomeConfig = {
        successChance: 68,
        successImpact: {
          money: surgeProfit,
          reputation: 14,
          energy: -15,
          experience: 14,
        },
        successOutcome: {
          ar: `رفضت الاستسلام وكسبت معركة السوق! استقطبت زبائن المنافس ${place.ar.inPlace}!`,
          fr: `Vous avez tenu tête et remporté la bataille commerciale ${place.fr.inPlace} !`,
          en: `You stood firm and won the market battle ${place.en.inPlace}, capturing rival clients!`,
        },
        failImpact: {
          money: priceWarLoss,
          reputation: -4,
          energy: -14,
          experience: 10,
        },
        failOutcome: {
          ar: `اندلعت حرب أسعار شرسة خفضت هوامش الربح مؤقتاً، لكن مشروعك بقي ملكك.`,
          fr: `Une guerre des prix a réduit vos marges, mais votre entreprise reste libre.`,
          en: `A fierce price war squeezed margins briefly, yet your business stayed independent.`,
        },
      };

      return {
        id,
        stage,
        category: 'trade',
        fingerprint,
        ideaKey,
        isRare: true,
        rareTag: {
          ar: 'حدث نادر · عرض استحواذ',
          fr: 'Événement rare · Offre de rachat',
          en: 'Rare Event · Buyout Offer',
        },
        content: {
          ar: {
            categoryLabel: 'حدث نادر · منافس شرس',
            character: actor.ar.full,
            title: `منافس يحاول شراء مشروعك في ${item.ar.short}`,
            description: `عرض عليك منافس قوي ${place.ar.inPlace} مبلغاً فورياً للتنازل عن خط ${item.ar.noun}. هل تبيع حصة أم ترفض وتنافسه؟`,
          },
          fr: {
            categoryLabel: 'Événement rare · Rachat rival',
            character: actor.fr.full,
            title: `Un rival veut racheter ${item.fr.short}`,
            description: `Un concurrent ${place.fr.inPlace} propose du cash pour racheter votre activité de ${item.fr.noun}. Vendre une part ou l’affronter ?`,
          },
          en: {
            categoryLabel: 'Rare Event · Rival Buyout',
            character: actor.en.full,
            title: `Rival Offers to Buy Out ${item.en.short}`,
            description: `A rival ${place.en.inPlace} offers quick cash to acquire your ${item.en.noun} venture. Cash out a stake or fight for dominance?`,
          },
        },
        rightChoice: {
          content: {
            ar: {
              label: 'أرفض وأواجه المنافس (68%)',
              outcome: dynamicOutcome.successOutcome.ar,
            },
            fr: {
              label: 'Refuser et riposter (68%)',
              outcome: dynamicOutcome.successOutcome.fr,
            },
            en: {
              label: 'Reject & Outcompete (68%)',
              outcome: dynamicOutcome.successOutcome.en,
            },
          },
          impact: dynamicOutcome.successImpact,
          dynamicOutcome,
        },
        leftChoice: {
          content: {
            ar: {
              label: 'أبيع حصة صغيرة مقابل كاش',
              outcome: `حصلت على سيولة فورية مع احتفاظك بإدارة المشروع.`,
            },
            fr: {
              label: 'Céder une petite part',
              outcome: `Cash immédiat sécurisé tout en gardant la direction.`,
            },
            en: {
              label: 'Sell Minority Stake',
              outcome: `You pocketed instant cash while keeping operational control.`,
            },
          },
          impact: {
            money: buyoutCash,
            reputation: -3,
            energy: 4,
            experience: 8,
          },
        },
      };
    }

    case 'rare_foreign_investor': {
      const megaGain = roundStageMoney(stage, baseProfit * 2.6);
      const legalCost = safeMinorLoss(stage, currentMoney, baseProfit, 0.3);
      const localGain = roundStageMoney(stage, baseProfit * 0.7);

      const dynamicOutcome: DynamicOutcomeConfig = {
        successChance: 75,
        successImpact: {
          money: megaGain,
          reputation: 16,
          energy: -14,
          experience: 16,
        },
        successOutcome: {
          ar: `نجح التحالف الدولي! تدفق التمويل الأجنبي ووصلت ${item.ar.short} لأسواق عالمية!`,
          fr: `Alliance internationale scellée ! Capitaux étrangers et expansion mondiale assurés !`,
          en: `International deal signed! Foreign capital scaled ${item.en.short} into global markets!`,
        },
        failImpact: {
          money: legalCost,
          reputation: 2,
          energy: -10,
          experience: 11,
        },
        failOutcome: {
          ar: `تعثرت بنود التمويل في اللحظة الأخيرة فدفعت أتعاب الاستشارة دون خسارة سمعتك.`,
          fr: `Les clauses n’ont pas abouti : frais de dossier perdus, mais réseau intact.`,
          en: `Term sheets stalled at closing, costing legal fees while keeping your reputation intact.`,
        },
      };

      return {
        id,
        stage,
        category: 'opportunity',
        fingerprint,
        ideaKey,
        isRare: true,
        rareTag: {
          ar: 'حدث نادر · مستثمر أجنبي',
          fr: 'Événement rare · Investisseur étranger',
          en: 'Rare Event · Foreign Investor',
        },
        content: {
          ar: {
            categoryLabel: 'حدث نادر · شراكة دولية',
            character: actor.ar.full,
            title: `شراكة مع مستثمر أجنبي في ${item.ar.short}`,
            description: `مستثمر دولي يزور ${place.ar.name} ويريد تمويل توسعك في ${item.ar.noun}. الصفقة تعد بنقلة نوعية بنسبة نجاح 75%.`,
          },
          fr: {
            categoryLabel: 'Événement rare · Alliance mondiale',
            character: actor.fr.full,
            title: `Partenariat étranger : ${item.fr.short}`,
            description: `Un investisseur international de passage à ${place.fr.name} veut financer ${item.fr.noun} (75% de chances de succès).`,
          },
          en: {
            categoryLabel: 'Rare Event · Global Partnership',
            character: actor.en.full,
            title: `Foreign Investor Eyes ${item.en.short}`,
            description: `An international investor visiting ${place.en.name} wants to co-fund ${item.en.noun}, offering a 75% chance at massive expansion.`,
          },
        },
        rightChoice: {
          content: {
            ar: {
              label: 'أوقّع الشراكة الدولية (75%)',
              outcome: dynamicOutcome.successOutcome.ar,
            },
            fr: {
              label: 'Signer l’alliance (75%)',
              outcome: dynamicOutcome.successOutcome.fr,
            },
            en: {
              label: 'Sign Foreign Deal (75%)',
              outcome: dynamicOutcome.successOutcome.en,
            },
          },
          impact: dynamicOutcome.successImpact,
          dynamicOutcome,
        },
        leftChoice: {
          content: {
            ar: {
              label: 'أحافظ على استقلالية مشروعي',
              outcome: `نمو متوازن بتمويل ذاتي خالص دون تقاسم الأرباح مع أي طرف.`,
            },
            fr: {
              label: 'Rester indépendant',
              outcome: `Croissance autonome maîtrisée sans dilution de vos parts.`,
            },
            en: {
              label: 'Stay 100% Independent',
              outcome: `Steady self-funded growth without giving away equity.`,
            },
          },
          impact: {
            money: localGain,
            reputation: 9,
            energy: -6,
            experience: 9,
          },
        },
      };
    }

    case 'rare_economic_weather_shock': {
      const pivotCost = safeMinorLoss(stage, currentMoney, baseProfit, 0.25);
      const reboundProfit = roundStageMoney(stage, baseProfit * 2.0);
      const stormLoss = safeMinorLoss(stage, currentMoney, baseProfit, 0.55);

      const dynamicOutcome: DynamicOutcomeConfig = {
        successChance: 58,
        successImpact: {
          money: reboundProfit,
          reputation: 10,
          energy: -12,
          experience: 14,
        },
        successOutcome: {
          ar: `اقتنصت ارتداد السوق بذكاء! بينما توقف الجميع، كنت الوحيد الجاهز لتوريد ${item.ar.short}!`,
          fr: `Rebond capturé avec brio ! Seul fournisseur prêt ${place.fr.inPlace}, vos ventes explosent !`,
          en: `Genius contrarian timing! As competitors paused, you owned the rebound ${place.en.inPlace}!`,
        },
        failImpact: {
          money: stormLoss,
          reputation: -6,
          energy: -14,
          experience: 10,
        },
        failOutcome: {
          ar: `طال أمد التقلبات الجوية والاقتصادية فتباطأت حركة ${item.ar.short} وتكبدت خسارة.`,
          fr: `La perturbation s’est prolongée ${place.fr.inPlace}, ralentissant vos livraisons.`,
          en: `The economic and weather disruption dragged on ${place.en.inPlace}, causing a setback.`,
        },
      };

      return {
        id,
        stage,
        category: 'craft',
        fingerprint,
        ideaKey,
        isRare: true,
        rareTag: {
          ar: 'حدث نادر · أزمة مفاجئة',
          fr: 'Événement rare · Crise météo / marché',
          en: 'Rare Event · Market Shock',
        },
        content: {
          ar: {
            categoryLabel: 'حدث نادر · أزمة جوية واقتصادية',
            character: actor.ar.full,
            title: `اضطراب جوي وسوقي يضرب ${place.ar.name}`,
            description: `تقلبات جوية وتذبذب أسعار مفاجئ يعطلان حركة ${item.ar.noun} ${place.ar.inPlace}. هل تحتمي بخطة طوارئ أم تراهن على الارتداد؟`,
          },
          fr: {
            categoryLabel: 'Événement rare · Choc météo & prix',
            character: actor.fr.full,
            title: `Tempête économique à ${place.fr.name}`,
            description: `Intempéries et tension sur les prix secouent ${item.fr.noun} ${place.fr.inPlace}. Sécuriser vos stocks ou parier sur le rebond ?`,
          },
          en: {
            categoryLabel: 'Rare Event · Weather & Economic Shock',
            character: actor.en.full,
            title: `Storm & Price Shock Hits ${place.en.name}`,
            description: `Sudden weather and price swings disrupt ${item.en.noun} ${place.en.inPlace}. Hedge defensively or bet on a rapid rebound?`,
          },
        },
        rightChoice: {
          content: {
            ar: {
              label: 'أراهن على ارتداد السوق (58%)',
              outcome: dynamicOutcome.successOutcome.ar,
            },
            fr: {
              label: 'Miser sur le rebond (58%)',
              outcome: dynamicOutcome.successOutcome.fr,
            },
            en: {
              label: 'Bet on Rebound (58%)',
              outcome: dynamicOutcome.successOutcome.en,
            },
          },
          impact: dynamicOutcome.successImpact,
          dynamicOutcome,
        },
        leftChoice: {
          content: {
            ar: {
              label: 'أفعّل خطة حماية السيولة',
              outcome: `حميت مشروعك من الخسارة الكبرى وكسبت احترام الشركاء لإدارتك الرشيدة.`,
            },
            fr: {
              label: 'Activer le bouclier défensif',
              outcome: `Pertes limitées au minimum et excellente gestion de crise saluée par tous.`,
            },
            en: {
              label: 'Activate Defensive Hedge',
              outcome: `You shielded your business from heavy losses and earned crisis-management respect.`,
            },
          },
          impact: {
            money: pivotCost,
            reputation: 12,
            energy: -6,
            experience: 12,
          },
        },
      };
    }
  }
}

export function getTotalUniqueScenarioCount(curatedCount: number): number {
  const regularCombosPerStage = 8 * 6 * 6 * REGULAR_TEMPLATES.length; // 1,152 per stage
  const rareCombosPerStage = 5 * 6 * 6 * 8; // 1,440 per stage (limited practically to 5 per stage per run via ideaKey)
  return curatedCount + (regularCombosPerStage + rareCombosPerStage) * 4;
}

interface DrawCardParams {
  stage: StageNumber;
  money: number;
  day: number;
  curatedStageCards: ScenarioCard[];
  memory: SmartDeckMemory;
  rng?: () => number;
}

function pickRandom<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

export function drawNextScenarioCard({
  stage,
  money,
  day,
  curatedStageCards,
  memory,
  rng = Math.random,
}: DrawCardParams): ScenarioCard {
  const pool = STAGE_POOLS[stage];

  // 1. Rare Event Trigger (~16% chance starting Day 3, avoiding repeat rare types in the same stage)
  const unseenRareTypes = RARE_TEMPLATES.filter(
    (rareId) => !memory.seenIdeaKeys.has(`rare:s${stage}:${rareId}`)
  );
  if (day >= 3 && unseenRareTypes.length > 0 && rng() < 0.16) {
    for (let attempt = 0; attempt < 25; attempt++) {
      const rareId = pickRandom(unseenRareTypes, rng);
      const item = pickRandom(pool.items, rng);
      const place = pickRandom(pool.places, rng);
      const actor = pickRandom(pool.actors, rng);
      const fp = `rare:s${stage}:${rareId}:${item.id}:${place.id}:${actor.id}`;
      if (!memory.seenFingerprints.has(fp)) {
        memory.proceduralCounter += 1;
        const card = buildRareProceduralCard(
          memory.proceduralCounter,
          stage,
          rareId,
          item,
          place,
          actor,
          money
        );
        memory.seenFingerprints.add(fp);
        if (card.ideaKey) memory.seenIdeaKeys.add(card.ideaKey);
        memory.lastCategory = card.category;
        return card;
      }
    }
  }

  // 2. Unseen Curated Cards (~30% share while unseen curated cards remain for this stage)
  const unseenCurated = curatedStageCards.filter((c) => {
    const fp = `curated:${c.id}`;
    return !memory.seenFingerprints.has(fp);
  });

  if (unseenCurated.length > 0 && (day === 1 || rng() < 0.3)) {
    const variedCurated = unseenCurated.filter(
      (c) => c.category !== memory.lastCategory
    );
    const chosenCurated = pickRandom(
      variedCurated.length > 0 ? variedCurated : unseenCurated,
      rng
    );
    const fp = `curated:${chosenCurated.id}`;
    memory.seenFingerprints.add(fp);
    memory.seenIdeaKeys.add(fp);
    memory.lastCategory = chosenCurated.category;
    return {
      ...chosenCurated,
      fingerprint: fp,
      ideaKey: fp,
    };
  }

  // 3. Procedural Scenario Generation — Tier 1: Strictly unseen fingerprint AND strictly unseen core ideaKey (template + item)
  for (let attempt = 0; attempt < 90; attempt++) {
    const templateId = pickRandom(REGULAR_TEMPLATES, rng);
    const item = pickRandom(pool.items, rng);
    const place = pickRandom(pool.places, rng);
    const actor = pickRandom(pool.actors, rng);

    if (attempt < 45 && item.category === memory.lastCategory) {
      continue;
    }

    const fp = `proc:s${stage}:${templateId}:${item.id}:${place.id}:${actor.id}`;
    const ideaKey = `proc:s${stage}:${templateId}:${item.id}`;

    if (
      !memory.seenFingerprints.has(fp) &&
      !memory.seenIdeaKeys.has(ideaKey)
    ) {
      memory.proceduralCounter += 1;
      const card = buildRegularProceduralCard(
        memory.proceduralCounter,
        stage,
        templateId,
        item,
        place,
        actor,
        money
      );
      memory.seenFingerprints.add(fp);
      memory.seenIdeaKeys.add(ideaKey);
      memory.lastCategory = card.category;
      return card;
    }
  }

  // 4. Tier 2: Core 32 (template + item) ideas for this stage exhausted — relax to unseen (template + item + place) while keeping fingerprint unique
  for (let attempt = 0; attempt < 160; attempt++) {
    const templateId = pickRandom(REGULAR_TEMPLATES, rng);
    const item = pickRandom(pool.items, rng);
    const place = pickRandom(pool.places, rng);
    const actor = pickRandom(pool.actors, rng);

    const fp = `proc:s${stage}:${templateId}:${item.id}:${place.id}:${actor.id}`;
    const subIdeaKey = `proc:s${stage}:${templateId}:${item.id}:${place.id}`;

    if (
      !memory.seenFingerprints.has(fp) &&
      !memory.seenIdeaKeys.has(subIdeaKey)
    ) {
      memory.proceduralCounter += 1;
      const card = buildRegularProceduralCard(
        memory.proceduralCounter,
        stage,
        templateId,
        item,
        place,
        actor,
        money
      );
      memory.seenFingerprints.add(fp);
      memory.seenIdeaKeys.add(subIdeaKey);
      memory.lastCategory = card.category;
      return card;
    }
  }

  // 5. Tier 3: Deterministic scan across all 1,152 stage combinations for any unseen fingerprint
  for (const templateId of REGULAR_TEMPLATES) {
    for (const item of pool.items) {
      for (const place of pool.places) {
        for (const actor of pool.actors) {
          const fp = `proc:s${stage}:${templateId}:${item.id}:${place.id}:${actor.id}`;
          if (!memory.seenFingerprints.has(fp)) {
            memory.proceduralCounter += 1;
            const card = buildRegularProceduralCard(
              memory.proceduralCounter,
              stage,
              templateId,
              item,
              place,
              actor,
              money
            );
            memory.seenFingerprints.add(fp);
            memory.lastCategory = card.category;
            return card;
          }
        }
      }
    }
  }

  // Fallback if an endless marathon player literally cleared all 1,152+ cards in a single stage:
  // clear only this stage's procedural fingerprints and draw fresh
  for (const existingFp of Array.from(memory.seenFingerprints)) {
    if (existingFp.startsWith(`proc:s${stage}:`)) {
      memory.seenFingerprints.delete(existingFp);
    }
  }
  const fallbackTemplate = pickRandom(REGULAR_TEMPLATES, rng);
  const fallbackItem = pickRandom(pool.items, rng);
  const fallbackPlace = pickRandom(pool.places, rng);
  const fallbackActor = pickRandom(pool.actors, rng);
  memory.proceduralCounter += 1;
  const fallbackCard = buildRegularProceduralCard(
    memory.proceduralCounter,
    stage,
    fallbackTemplate,
    fallbackItem,
    fallbackPlace,
    fallbackActor,
    money
  );
  if (fallbackCard.fingerprint) {
    memory.seenFingerprints.add(fallbackCard.fingerprint);
  }
  memory.lastCategory = fallbackCard.category;
  return fallbackCard;
}
