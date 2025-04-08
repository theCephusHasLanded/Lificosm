import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es' | 'fr' | 'zh' | 'ja' | 'ru' | 'xh' | 'ar';

interface TranslationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Simple translation dictionary with nested objects for different sections
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    'app.name': 'LKHN UNIVERSAL WEALTH',
    'app.tagline': 'QUANTUM ECOSYSTEM',
    'app.overview': 'A comprehensive ecosystem integrating digital finance, physical spaces, and AI-driven insights to create universal access to prosperity.',
    'app.explore': 'EXPLORE QUANTUM INTEGRATION',
    
    // Navigation
    'nav.overview': 'Overview',
    'nav.wealth': 'Wealth',
    'nav.hub': 'Hub',
    'nav.trendcrypto': 'TrendCrypto',
    'nav.lificosm': 'Lificosm',
    
    // Dashboard
    'dashboard.components': 'ECOSYSTEM COMPONENTS',
    'dashboard.pillars': 'THE THREE PILLARS',
    'dashboard.impact': 'COMMUNITY IMPACT',
    'dashboard.universal': 'UNIVERSAL WEALTH IMPACT',
    'dashboard.impact.desc': 'Creating sustainable prosperity across underserved communities',
    
    // Platforms
    'wealth.name': 'WEALTH BY LKHN',
    'wealth.description': 'Financial inclusion platform with AI assistant and Pay-in-4 credit building',
    'hub.name': 'LKHN HUB',
    'hub.description': 'Physical spaces for community, creation, and financial education',
    'trendcrypto.name': 'LKHN TRENDCRYPTO',
    'trendcrypto.description': 'AI-powered crypto analysis with focus on XRP and emerging coins',
    'lificosm.name': 'LIFICOSM',
    'lificosm.description': 'Community-powered membership platform for neighborhood empowerment',
    
    // Metrics
    'metric.users': 'Users',
    'metric.credit': 'Avg. Credit Increase',
    'metric.capital': 'Total Capital Accessed',
    'metric.locations': 'Active Locations',
    'metric.visitors': 'Monthly Visitors',
    'metric.businesses': 'Local Businesses Supported',
    'metric.premium': 'Premium Users',
    'metric.detection': 'Trend Detection Lead Time',
    'metric.performance': 'Avg. Portfolio Performance',
    'metric.investment': 'Community Investment',
    'metric.score': 'Avg Credit Score Increase',
    'metric.jobs': 'Jobs Created',
    'metric.workshops': 'Financial Literacy Workshops',
    'metric.lificosm.members': 'Active Members',
    'metric.lificosm.businesses': 'Local Businesses',
    'metric.lificosm.savings': 'Savings Generated',
    
    // Language selector
    'language': 'Language',
    'language.en': 'English',
    'language.es': 'Español',
    'language.fr': 'Français',
    'language.zh': '中文',
    'language.ja': '日本語',
    'language.ru': 'Русский',
    'language.xh': 'isiXhosa',
    'language.ar': 'العربية',
  },
  es: {
    // Common
    'app.name': 'RIQUEZA UNIVERSAL LKHN',
    'app.tagline': 'ECOSISTEMA CUÁNTICO',
    'app.overview': 'Un ecosistema integral que integra finanzas digitales, espacios físicos y perspectivas impulsadas por IA para crear acceso universal a la prosperidad.',
    'app.explore': 'EXPLORAR INTEGRACIÓN CUÁNTICA',
    
    // Navigation
    'nav.overview': 'General',
    'nav.wealth': 'Riqueza',
    'nav.hub': 'Centro',
    'nav.trendcrypto': 'TendenciaCripto',
    'nav.lificosm': 'Lificosm',
    
    // Dashboard
    'dashboard.components': 'COMPONENTES DEL ECOSISTEMA',
    'dashboard.pillars': 'LOS TRES PILARES',
    'dashboard.impact': 'IMPACTO COMUNITARIO',
    'dashboard.universal': 'IMPACTO DE LA RIQUEZA UNIVERSAL',
    'dashboard.impact.desc': 'Creando prosperidad sostenible en comunidades desatendidas',
    
    // Platforms
    'wealth.name': 'RIQUEZA POR LKHN',
    'wealth.description': 'Plataforma de inclusión financiera con asistente de IA y creación de crédito en 4 pagos',
    'hub.name': 'CENTRO LKHN',
    'hub.description': 'Espacios físicos para la comunidad, creación y educación financiera',
    'trendcrypto.name': 'LKHN TENDENCIACRIPTO',
    'trendcrypto.description': 'Análisis de criptomonedas impulsado por IA con enfoque en XRP y monedas emergentes',
    
    // Metrics
    'metric.users': 'Usuarios',
    'metric.credit': 'Aumento de Crédito Promedio',
    'metric.capital': 'Capital Total Accedido',
    'metric.locations': 'Ubicaciones Activas',
    'metric.visitors': 'Visitantes Mensuales',
    'metric.businesses': 'Negocios Locales Apoyados',
    'metric.premium': 'Usuarios Premium',
    'metric.detection': 'Tiempo de Anticipación de Tendencias',
    'metric.performance': 'Rendimiento Promedio de Cartera',
    'metric.investment': 'Inversión Comunitaria',
    'metric.score': 'Aumento Promedio de Puntaje Crediticio',
    'metric.jobs': 'Empleos Creados',
    'metric.workshops': 'Talleres de Educación Financiera',
    
    // Language selector
    'language': 'Idioma',
    'language.en': 'English',
    'language.es': 'Español',
    'language.fr': 'Français',
    'language.zh': '中文',
    'language.ja': '日本語',
    'language.ru': 'Русский',
    'language.xh': 'isiXhosa',
    'language.ar': 'العربية',
  },
  fr: {
    // Common
    'app.name': 'RICHESSE UNIVERSELLE LKHN',
    'app.tagline': 'ÉCOSYSTÈME QUANTIQUE',
    'app.overview': 'Un écosystème complet intégrant la finance numérique, les espaces physiques et les perspectives basées sur l\'IA pour créer un accès universel à la prospérité.',
    'app.explore': 'EXPLORER L\'INTÉGRATION QUANTIQUE',
    
    // Navigation
    'nav.overview': 'Aperçu',
    'nav.wealth': 'Richesse',
    'nav.hub': 'Centre',
    'nav.trendcrypto': 'TendanceCrypto',
    'nav.lificosm': 'Lificosm',
    
    // Dashboard
    'dashboard.components': 'COMPOSANTS DE L\'ÉCOSYSTÈME',
    'dashboard.pillars': 'LES TROIS PILIERS',
    'dashboard.impact': 'IMPACT COMMUNAUTAIRE',
    'dashboard.universal': 'IMPACT DE LA RICHESSE UNIVERSELLE',
    'dashboard.impact.desc': 'Créer une prospérité durable dans les communautés mal desservies',
    
    // Platforms
    'wealth.name': 'RICHESSE PAR LKHN',
    'wealth.description': 'Plateforme d\'inclusion financière avec assistant IA et renforcement du crédit en 4 paiements',
    'hub.name': 'CENTRE LKHN',
    'hub.description': 'Espaces physiques pour la communauté, la création et l\'éducation financière',
    'trendcrypto.name': 'LKHN TENDANCECRYPTO',
    'trendcrypto.description': 'Analyse crypto alimentée par IA avec un accent sur XRP et les monnaies émergentes',
    
    // Metrics
    'metric.users': 'Utilisateurs',
    'metric.credit': 'Augmentation Moyenne du Crédit',
    'metric.capital': 'Capital Total Accessible',
    'metric.locations': 'Emplacements Actifs',
    'metric.visitors': 'Visiteurs Mensuels',
    'metric.businesses': 'Entreprises Locales Soutenues',
    'metric.premium': 'Utilisateurs Premium',
    'metric.detection': 'Délai de Détection des Tendances',
    'metric.performance': 'Performance Moyenne du Portefeuille',
    'metric.investment': 'Investissement Communautaire',
    'metric.score': 'Augmentation Moyenne du Score de Crédit',
    'metric.jobs': 'Emplois Créés',
    'metric.workshops': 'Ateliers d\'Éducation Financière',
    
    // Language selector
    'language': 'Langue',
    'language.en': 'English',
    'language.es': 'Español',
    'language.fr': 'Français',
    'language.zh': '中文',
    'language.ja': '日本語',
    'language.ru': 'Русский',
    'language.xh': 'isiXhosa',
    'language.ar': 'العربية',
  },
  zh: {
    // Common
    'app.name': 'LKHN 环球财富',
    'app.tagline': '量子生态系统',
    'app.overview': '一个全面的生态系统，整合数字金融、实体空间和人工智能驱动的洞察，创造普遍的繁荣机会。',
    'app.explore': '探索量子整合',
    
    // Navigation
    'nav.overview': '概览',
    'nav.wealth': '财富',
    'nav.hub': '中心',
    'nav.trendcrypto': '趋势加密',
    'nav.lificosm': 'Lificosm',
    
    // Dashboard
    'dashboard.components': '生态系统组件',
    'dashboard.pillars': '三大支柱',
    'dashboard.impact': '社区影响',
    'dashboard.universal': '环球财富影响',
    'dashboard.impact.desc': '为服务欠缺的社区创造可持续繁荣',
    
    // Platforms
    'wealth.name': 'LKHN 财富',
    'wealth.description': '金融普惠平台，配备人工智能助手和四期付款信用建设',
    'hub.name': 'LKHN 中心',
    'hub.description': '为社区、创造和金融教育提供的实体空间',
    'trendcrypto.name': 'LKHN 趋势加密',
    'trendcrypto.description': '由人工智能驱动的加密分析，专注于XRP和新兴币种',
    
    // Metrics
    'metric.users': '用户',
    'metric.credit': '平均信用增长',
    'metric.capital': '总可获取资金',
    'metric.locations': '活跃地点',
    'metric.visitors': '每月访客',
    'metric.businesses': '支持的本地企业',
    'metric.premium': '高级用户',
    'metric.detection': '趋势检测提前时间',
    'metric.performance': '平均投资组合表现',
    'metric.investment': '社区投资',
    'metric.score': '平均信用评分增长',
    'metric.jobs': '创造就业机会',
    'metric.workshops': '金融知识讲座',
    
    // Language selector
    'language': '语言',
    'language.en': 'English',
    'language.es': 'Español',
    'language.fr': 'Français',
    'language.zh': '中文',
    'language.ja': '日本語',
    'language.ru': 'Русский',
    'language.xh': 'isiXhosa',
    'language.ar': 'العربية',
  },
  ja: {
    // Common
    'app.name': 'LKHN ユニバーサルウェルス',
    'app.tagline': '量子エコシステム',
    'app.overview': 'デジタル金融、物理的空間、AIによる洞察を統合し、すべての人に繁栄へのアクセスを創出する包括的なエコシステム。',
    'app.explore': '量子統合を探索する',
    
    // Navigation
    'nav.overview': '概要',
    'nav.wealth': 'ウェルス',
    'nav.hub': 'ハブ',
    'nav.trendcrypto': 'トレンドクリプト',
    'nav.lificosm': 'ライフィコズム',
    
    // Dashboard
    'dashboard.components': 'エコシステム構成要素',
    'dashboard.pillars': '三本柱',
    'dashboard.impact': 'コミュニティへの影響',
    'dashboard.universal': 'ユニバーサルウェルスの影響',
    'dashboard.impact.desc': '十分なサービスを受けていないコミュニティ全体で持続可能な繁栄を創出',
    
    // Platforms
    'wealth.name': 'LKHNによるウェルス',
    'wealth.description': 'AIアシスタントと4回払いクレジット構築機能を備えた金融包摂プラットフォーム',
    'hub.name': 'LKHNハブ',
    'hub.description': 'コミュニティ、創造、金融教育のための物理的空間',
    'trendcrypto.name': 'LKHN トレンドクリプト',
    'trendcrypto.description': 'XRPと新興コインに焦点を当てたAIパワー暗号分析',
    
    // Metrics
    'metric.users': 'ユーザー',
    'metric.credit': '平均クレジット増加',
    'metric.capital': '総アクセス資本',
    'metric.locations': 'アクティブな拠点',
    'metric.visitors': '月間訪問者',
    'metric.businesses': '支援された地元企業',
    'metric.premium': 'プレミアムユーザー',
    'metric.detection': 'トレンド検出リードタイム',
    'metric.performance': '平均ポートフォリオパフォーマンス',
    'metric.investment': 'コミュニティ投資',
    'metric.score': '平均クレジットスコア増加',
    'metric.jobs': '創出された雇用',
    'metric.workshops': '金融リテラシーワークショップ',
    
    // Language selector
    'language': '言語',
    'language.en': 'English',
    'language.es': 'Español',
    'language.fr': 'Français',
    'language.zh': '中文',
    'language.ja': '日本語',
    'language.ru': 'Русский',
    'language.xh': 'isiXhosa',
    'language.ar': 'العربية',
  },
  ru: {
    // Common
    'app.name': 'LKHN УНИВЕРСАЛЬНОЕ БОГАТСТВО',
    'app.tagline': 'КВАНТОВАЯ ЭКОСИСТЕМА',
    'app.overview': 'Комплексная экосистема, интегрирующая цифровые финансы, физические пространства и аналитику на базе ИИ для создания всеобщего доступа к процветанию.',
    'app.explore': 'ИССЛЕДОВАТЬ КВАНТОВУЮ ИНТЕГРАЦИЮ',
    
    // Navigation
    'nav.overview': 'Обзор',
    'nav.wealth': 'Богатство',
    'nav.hub': 'Хаб',
    'nav.trendcrypto': 'ТрендКрипто',
    'nav.lificosm': 'Лификосм',
    
    // Dashboard
    'dashboard.components': 'КОМПОНЕНТЫ ЭКОСИСТЕМЫ',
    'dashboard.pillars': 'ТРИ СТОЛПА',
    'dashboard.impact': 'ВЛИЯНИЕ НА СООБЩЕСТВО',
    'dashboard.universal': 'ВЛИЯНИЕ УНИВЕРСАЛЬНОГО БОГАТСТВА',
    'dashboard.impact.desc': 'Создание устойчивого процветания в недостаточно обслуживаемых сообществах',
    
    // Platforms
    'wealth.name': 'БОГАТСТВО ОТ LKHN',
    'wealth.description': 'Платформа финансовой инклюзивности с ИИ-ассистентом и построением кредитного рейтинга через оплату в 4 этапа',
    'hub.name': 'LKHN ХАБ',
    'hub.description': 'Физические пространства для сообщества, творчества и финансового образования',
    'trendcrypto.name': 'LKHN ТРЕНДКРИПТО',
    'trendcrypto.description': 'Криптоанализ на базе ИИ с фокусом на XRP и новые монеты',
    
    // Metrics
    'metric.users': 'Пользователи',
    'metric.credit': 'Средний рост кредита',
    'metric.capital': 'Общий доступный капитал',
    'metric.locations': 'Активные локации',
    'metric.visitors': 'Ежемесячные посетители',
    'metric.businesses': 'Поддержанные местные бизнесы',
    'metric.premium': 'Премиум пользователи',
    'metric.detection': 'Время опережения обнаружения тренда',
    'metric.performance': 'Средняя эффективность портфеля',
    'metric.investment': 'Инвестиции в сообщество',
    'metric.score': 'Средний рост кредитного рейтинга',
    'metric.jobs': 'Созданные рабочие места',
    'metric.workshops': 'Мастер-классы по финансовой грамотности',
    
    // Language selector
    'language': 'Язык',
    'language.en': 'English',
    'language.es': 'Español',
    'language.fr': 'Français',
    'language.zh': '中文',
    'language.ja': '日本語',
    'language.ru': 'Русский',
    'language.xh': 'isiXhosa',
    'language.ar': 'العربية',
  },
  xh: {
    // Common
    'app.name': 'LKHN UBUTYEBI JIKELELE',
    'app.tagline': 'INKQUBO YEQUANTUM',
    'app.overview': 'Inkqubo epheleleyo ehlanganisa iimali ezidijithali, iindawo zesiqhelo kunye nezinto ezikhokhelwe yi-AI ukudala ukufikelela jikelele kuphuhliso.',
    'app.explore': 'HLOLA UMASILINGANE WEQUANTUM',
    
    // Navigation
    'nav.overview': 'Inkcazelo',
    'nav.wealth': 'Ubutyebi',
    'nav.hub': 'Iziko',
    'nav.trendcrypto': 'Crypto Ehambayo',
    'nav.lificosm': 'Lificosm',
    
    // Dashboard
    'dashboard.components': 'IZINTO ZENKQUBO',
    'dashboard.pillars': 'IINTSIKA EZINTATHU',
    'dashboard.impact': 'IMPEMBELELO YOLUNTU',
    'dashboard.universal': 'IMPEMBELELO YOBUTYEBI JIKELELE',
    'dashboard.impact.desc': 'Ukudala inkqubela eyondeleyo kubulungisa kulo nto linganjelwe ngokupheleleyo',
    
    // Platforms
    'wealth.name': 'UBUTYEBI NGE-LKHN',
    'wealth.description': 'Iplatifomu yokubandakanywa kwezemali kunye noncedo lwe-AI kunye nokwakha isikolo semali sika-4',
    'hub.name': 'IZIKO LE-LKHN',
    'hub.description': 'Iindawo ezibonakalayo zoluntu, ukuyila kunye nemfundo yezemali',
    'trendcrypto.name': 'LKHN CRYPTO EHAMBAYO',
    'trendcrypto.description': 'Uhlalutyo lwe-crypto olukhokhelwe yi-AI olugxininisa ku-XRP kunye neekhoyini eziphuhlikayo',
    
    // Metrics
    'metric.users': 'Abasebenzisi',
    'metric.credit': 'Ukunyuka kwesibonda esizizulu',
    'metric.capital': 'Inkunzi ifikelela kuyo',
    'metric.locations': 'Iindawo ezisetyenziswayo',
    'metric.visitors': 'Abatyeleli benyanga',
    'metric.businesses': 'Amashishini Endawo Axhasiweyo',
    'metric.premium': 'Abasebenzisi be-Premium',
    'metric.detection': 'Ixesha lokukhokela uhlolo lwetrendi',
    'metric.performance': 'Umsebenzi wesiqingatha esiyavureji',
    'metric.investment': 'Utyalo-mali loLuntu',
    'metric.score': 'Ukunyuka kwesikali sesikali seemali',
    'metric.jobs': 'Imisebenzi Eyakhiweyo',
    'metric.workshops': 'Iiworkshops zemfundo yezeeMali',
    
    // Language selector
    'language': 'Ulwimi',
    'language.en': 'English',
    'language.es': 'Español',
    'language.fr': 'Français',
    'language.zh': '中文',
    'language.ja': '日本語',
    'language.ru': 'Русский',
    'language.xh': 'isiXhosa',
    'language.ar': 'العربية',
  },
  ar: {
    // Common
    'app.name': 'الثروة العالمية LKHN',
    'app.tagline': 'نظام بيئي كمومي',
    'app.overview': 'نظام بيئي شامل يدمج التمويل الرقمي والمساحات المادية والرؤى المدعومة بالذكاء الاصطناعي لإنشاء وصول عالمي للازدهار.',
    'app.explore': 'استكشاف التكامل الكمومي',
    
    // Navigation
    'nav.overview': 'نظرة عامة',
    'nav.wealth': 'الثروة',
    'nav.hub': 'المركز',
    'nav.trendcrypto': 'اتجاه العملات المشفرة',
    'nav.lificosm': 'ليفيكوسم',
    
    // Dashboard
    'dashboard.components': 'مكونات النظام البيئي',
    'dashboard.pillars': 'الركائز الثلاث',
    'dashboard.impact': 'تأثير المجتمع',
    'dashboard.universal': 'تأثير الثروة العالمية',
    'dashboard.impact.desc': 'خلق ازدهار مستدام عبر المجتمعات التي تعاني من نقص الخدمات',
    
    // Platforms
    'wealth.name': 'الثروة من LKHN',
    'wealth.description': 'منصة شمول مالي مع مساعد ذكاء اصطناعي وبناء ائتمان بتقسيط على 4 مراحل',
    'hub.name': 'مركز LKHN',
    'hub.description': 'مساحات مادية للمجتمع والإبداع والتعليم المالي',
    'trendcrypto.name': 'اتجاه العملات المشفرة LKHN',
    'trendcrypto.description': 'تحليل للعملات المشفرة مدعوم بالذكاء الاصطناعي مع التركيز على XRP والعملات الناشئة',
    
    // Metrics
    'metric.users': 'المستخدمون',
    'metric.credit': 'متوسط زيادة الائتمان',
    'metric.capital': 'إجمالي رأس المال الذي تم الوصول إليه',
    'metric.locations': 'المواقع النشطة',
    'metric.visitors': 'الزوار الشهريون',
    'metric.businesses': 'الشركات المحلية المدعومة',
    'metric.premium': 'المستخدمون المميزون',
    'metric.detection': 'وقت اكتشاف الاتجاهات',
    'metric.performance': 'متوسط أداء المحفظة',
    'metric.investment': 'استثمار المجتمع',
    'metric.score': 'متوسط زيادة درجة الائتمان',
    'metric.jobs': 'الوظائف التي تم إنشاؤها',
    'metric.workshops': 'ورش عمل محو الأمية المالية',
    
    // Language selector
    'language': 'اللغة',
    'language.en': 'English',
    'language.es': 'Español',
    'language.fr': 'Français',
    'language.zh': '中文',
    'language.ja': '日本語',
    'language.ru': 'Русский',
    'language.xh': 'isiXhosa',
    'language.ar': 'العربية',
  },
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  
  // Get translation for a key
  const t = (key: string): string => {
    const translation = translations[language][key];
    return translation || key; // Return the key itself as fallback
  };

  // Set language and store in localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lkhn-language', lang);
  };

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem('lkhn-language') as Language;
    if (storedLanguage && Object.keys(translations).includes(storedLanguage)) {
      setLanguageState(storedLanguage);
      
      // Set RTL attribute for Arabic language
      if (storedLanguage === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
      }
    }
  }, []);
  
  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use translations
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
