export type OfferLocale = "ar" | "fr" | "en";

export interface ServiceItem {
  feature: string;
  price: string;
}

export interface OrderStatusItem {
  code: string;
  label: string;
  tone: string;
}

export type ModuleIconKey =
  | "palette"
  | "shoppingBag"
  | "layoutDashboard"
  | "truck"
  | "messageSquare"
  | "shieldCheck"
  | "rocket";

export type PhaseIconKey = "palette" | "code2" | "rocket";

export interface ServiceModule {
  id: string;
  number: string;
  code: string;
  title: string;
  total: string;
  description: string;
  highlightNote?: string;
  icon: ModuleIconKey;
  items: ServiceItem[];
  extraTitle?: string;
  extraPoints?: string[];
  statuses?: OrderStatusItem[];
}

export interface ExecutionPhase {
  step: string;
  code: string;
  title: string;
  duration: string;
  subtitle?: string;
  icon: PhaseIconKey;
  tasks: string[];
  milestone?: {
    previewTitle: string;
    previewNote: string;
    approvalNote: string;
  };
}

export interface OfferContent {
  metaTitle: string;
  metaDescription: string;
  privateBadge: string;
  printBtn: string;
  heroPill: string;
  heroTitleBrand: string;
  heroTitleSuffix: string;
  heroSubtitle: string;
  kpiOriginalLabel: string;
  kpiOriginalSub: string;
  kpiCurrentLabel: string;
  kpiCurrentSub: string;
  kpiPromoBadge: string;
  kpiPromoSub: string;
  jumpSummary: string;
  jumpTimeline: string;
  tableFeatureCol: string;
  tablePriceCol: string;
  tableTotalLabel: string;
  modules: ServiceModule[];
  financialBadge: string;
  financialTitle: string;
  sectionsTableTitle: string;
  sectionsColLabel: string;
  sectionsPriceLabel: string;
  sectionsTotalLabel: string;
  summaryRows: Array<{ section: string; price: string }>;
  commercialTitle: string;
  commercialItemCol: string;
  commercialAmountCol: string;
  commercialBreakdown: Array<{
    label: string;
    amount: string;
    style: "default" | "discount" | "current" | "final";
  }>;
  currentPriceLabel: string;
  currentPriceValue: string;
  promoPriceLabel: string;
  promoPriceValue: string;
  promoPriceWords: string;
  paymentBadge: string;
  paymentTitle: string;
  paymentColLabel: string;
  paymentAmountCol: string;
  paymentTotalLabel: string;
  option1Tag: string;
  option1Title: string;
  option1Initial: string;
  option1Remaining: string;
  option1Cta: string;
  option1ModalLabel: string;
  option2Tag: string;
  option2Title: string;
  option2Initial: string;
  option2Remaining: string;
  option2Cta: string;
  option2ModalLabel: string;
  timelineBadge: string;
  timelineTitle: string;
  timelineSubtitle: string;
  timelineDurationLabel: string;
  phases: ExecutionPhase[];
  timelineTotalLabel: string;
  timelineTotalValue: string;
  timelineNote: string;
  promoTermsTitle: string;
  promoTerms: string[];
  generalNotesTitle: string;
  generalNotes: string[];
  confirmBtnPrefix: string;
  printFooterBtn: string;
}

export const OFFER_CONTENT: Record<OfferLocale, OfferContent> = {
  ar: {
    metaTitle: "E-COM SHYMSS — عرض السعر الرسمي | Salon DZ Tech",
    metaDescription:
      "عرض السعر الرسمي الخاص بمشروع المتجر الإلكتروني ولوحة التحكم E-COM SHYMSS من تطوير Salon DZ Tech.",
    privateBadge: "عرض سعر خاص ومُخصّص",
    printBtn: "طباعة / PDF",
    heroPill: "E-COM SHYMSS — PROJECT QUOTATION",
    heroTitleBrand: "E-COM SHYMSS",
    heroTitleSuffix: "— عرض السعر الرسمي",
    heroSubtitle:
      "متجر إلكتروني احترافي لإدارة المنتجات والطلبات والمبيعات، بتصميم عصري وتجربة استخدام سلسة، مع نظام إدارة متكامل يتيح للمالكة التحكم في نشاطها التجاري من أي مكان.",
    kpiOriginalLabel: "الإجمالي الأصلي حسب تفاصيل الخدمات",
    kpiOriginalSub: "تخفيض تجاري أساسي:",
    kpiCurrentLabel: "السعر الحالي للمشروع",
    kpiCurrentSub: "دون عقد إشهاري",
    kpiPromoBadge: "العرض الخاص (−22,000 DA إضافية)",
    kpiPromoSub: "عند قبول عقد البرنامج الإشهاري",
    jumpSummary: "الملخص المالي والشروط",
    jumpTimeline: "مدة التنفيذ (30 – 35 يوماً)",
    tableFeatureCol: "الميزة",
    tablePriceCol: "السعر",
    tableTotalLabel: "المجموع",
    modules: [
      {
        id: "sec-1",
        number: "01",
        code: "MOD_01 // UI_UX_FRONTEND",
        title: "1. التصميم والواجهة الأمامية",
        total: "45,000 DA",
        description:
          "تصميم واجهة عصرية بهوية بصرية خاصة بالعلامة التجارية، تجمع بين الأناقة وسهولة الاستخدام، مع تجربة تصفح مميزة وحركات انتقال سلسة.",
        icon: "palette",
        items: [
          { feature: "تصميم UI/UX احترافي وهوية بصرية مخصصة للمتجر", price: "15,000 DA" },
          { feature: "واجهة رئيسية متقدمة وجذابة لعرض العلامة التجارية والمنتجات", price: "15,000 DA" },
          { feature: "Animations & Smooth Transitions لتجربة تفاعلية سلسة", price: "8,000 DA" },
          { feature: "Responsive Design متكامل للهواتف والأجهزة اللوحية والكمبيوتر", price: "7,000 DA" },
        ],
      },
      {
        id: "sec-2",
        number: "02",
        code: "MOD_02 // STOREFRONT_CART",
        title: "2. المتجر الإلكتروني",
        total: "30,000 DA",
        description:
          "متجر إلكتروني متكامل يمنح الزبائن تجربة تسوق سهلة، مع إمكانية استكشاف المنتجات والاطلاع على تفاصيلها وإتمام الطلب في خطوات بسيطة.",
        icon: "shoppingBag",
        items: [
          { feature: "عرض المنتجات بصور احترافية ومعلومات واضحة", price: "10,000 DA" },
          { feature: "صفحات خاصة لكل منتج مع تفاصيله ومعلوماته", price: "6,000 DA" },
          { feature: "عرض الأسعار والتخفيضات والعروض الترويجية Promotions", price: "5,000 DA" },
          { feature: "نموذج طلب متكامل يشمل الاسم ورقم الهاتف والولاية والعنوان", price: "6,000 DA" },
          { feature: "اختيار طريقة الاستلام: التوصيل إلى المنزل أو مكتب التوصيل", price: "3,000 DA" },
        ],
      },
      {
        id: "sec-3",
        number: "03",
        code: "MOD_03 // ADMIN_DASHBOARD",
        title: "3. لوحة تحكم المالك",
        total: "32,000 DA",
        description:
          "لوحة إدارة احترافية تمنح المالكة تحكماً كاملاً في المتجر ونشاطه التجاري، مع إمكانية الوصول إليها من أي جهاز متصل بالإنترنت، سواء كان هاتفاً أو حاسوباً أو جهازاً لوحياً.",
        highlightNote:
          "لا حاجة إلى تثبيت تطبيق أو برنامج؛ يمكن فتح لوحة التحكم مباشرة عبر المتصفح ومن أي مكان، مع تسجيل دخول آمن.",
        icon: "layoutDashboard",
        items: [
          { feature: "نظام تسجيل دخول آمن وإدارة صلاحيات الوصول Admin Authentication", price: "6,000 DA" },
          { feature: "Dashboard تعرض الإحصائيات ومؤشرات أداء المتجر", price: "6,000 DA" },
          { feature: "إضافة المنتجات وتعديلها وحذفها وإدارة بياناتها", price: "8,000 DA" },
          { feature: "رفع صور المنتجات وتنظيمها وإدارتها", price: "4,000 DA" },
          { feature: "التحكم في الأسعار والتخفيضات والعروض الترويجية", price: "4,000 DA" },
          { feature: "إدارة أسعار التوصيل حسب خيارات التوصيل", price: "4,000 DA" },
        ],
        extraTitle: "مميزات الوصول إلى لوحة التحكم:",
        extraPoints: [
          "إمكانية فتح لوحة التحكم من الهاتف أو الكمبيوتر أو التابلت.",
          "واجهة متجاوبة تتكيف مع حجم الشاشة والجهاز المستخدم.",
          "إدارة المتجر عن بُعد دون الحاجة إلى التواجد في مكان معين.",
          "الوصول إلى المنتجات والطلبات والإحصائيات من واجهة موحدة.",
          "تسجيل دخول آمن لحماية بيانات المتجر.",
        ],
      },
      {
        id: "sec-4",
        number: "04",
        code: "MOD_04 // ORDERS_DELIVERY",
        title: "4. إدارة الطلبات والتوصيل",
        total: "30,000 DA",
        description:
          "نظام متكامل لتنظيم الطلبات ومتابعتها منذ لحظة استلامها حتى إتمام عملية التوصيل، مما يسهل متابعة العمليات اليومية وتقليل الأخطاء في إدارة الطلبات.",
        icon: "truck",
        items: [
          { feature: "استقبال الطلبات تلقائياً وحفظها في قاعدة البيانات", price: "8,000 DA" },
          { feature: "عرض تفاصيل الطلبات مع إمكانية البحث والفرز", price: "5,000 DA" },
          { feature: "تأكيد الطلبات وإدارتها ومتابعة تفاصيلها", price: "5,000 DA" },
          { feature: "نظام متكامل لتحديث ومتابعة حالات الطلبات", price: "8,000 DA" },
          { feature: "إمكانية تأكيد الطلبات عبر الاتصال الهاتفي", price: "2,000 DA" },
          { feature: "حفظ سجل الطلبات محلياً عبر LocalStorage", price: "2,000 DA" },
        ],
        extraTitle: "حالات الطلبات المشمولة:",
        statuses: [
          { code: "New", label: "طلب جديد.", tone: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25" },
          { code: "Confirmed", label: "تم تأكيد الطلب.", tone: "bg-brand-green/10 text-brand-green border-brand-green/25" },
          { code: "Shipping", label: "الطلب قيد الإرسال.", tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25" },
          { code: "Delivered", label: "تم التوصيل.", tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25" },
          { code: "Paid", label: "تم الدفع.", tone: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/25" },
          { code: "Cancelled", label: "طلب ملغى.", tone: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25" },
          { code: "Returned", label: "طلب مرتجع من مكتب التوصيل.", tone: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/25" },
        ],
      },
      {
        id: "sec-5",
        number: "05",
        code: "MOD_05 // WHATSAPP_CLOUD_API",
        title: "5. WhatsApp Integration",
        total: "22,000 DA",
        description:
          "ربط المتجر بنظام WhatsApp Business Cloud API لتسهيل التواصل مع الزبائن وأتمتة رسائل تأكيد الطلبات، مع نظام مراقبة يحمي من إرسال الرسائل التي قد تترتب عليها تكاليف إضافية.",
        icon: "messageSquare",
        items: [
          { feature: "إعداد وربط Meta WhatsApp Cloud API", price: "6,000 DA" },
          { feature: "تطوير وربط الوظائف السحابية الخلفية (Cloud Edge Functions)", price: "6,000 DA" },
          { feature: "نظام آلي لتأكيد الطلبات عبر WhatsApp", price: "4,000 DA" },
          { feature: "التحقق من نافذة 24 ساعة وأهلية إرسال الرسائل", price: "3,000 DA" },
          { feature: "مراقبة حصة 1,000 رسالة مجانية ومنع الرسائل المدفوعة", price: "3,000 DA" },
        ],
        extraTitle: "مميزات نظام WhatsApp:",
        extraPoints: [
          "إرسال رسائل تأكيد الطلبات بشكل آلي وفق شروط Meta.",
          "الاستفادة من حصة تصل إلى 1,000 رسالة مجانية وفق أهلية الحساب وشروط Meta.",
          "مراقبة عدد الرسائل المرسلة بشكل تلقائي.",
          "التحقق من نافذة 24 ساعة وأهلية إرسال كل رسالة.",
          "إيقاف الإرسال تلقائياً عند بلوغ الحصة المجانية أو عند عدم توفر أهلية الإرسال المجاني.",
          "منع إرسال أي رسالة قد تترتب عليها رسوم، وعدم تجاوز الحصة المجانية المحددة.",
        ],
      },
      {
        id: "sec-6",
        number: "06",
        code: "MOD_06 // BACKEND_SECURITY",
        title: "6. Backend, Security & Performance",
        total: "15,000 DA",
        description:
          "بنية خلفية منظمة لإدارة بيانات المتجر وربط الواجهة بقاعدة البيانات، مع تطبيق إجراءات الحماية والتحقق الأساسية لضمان سلامة العمليات.",
        icon: "shieldCheck",
        items: [
          { feature: "تصميم قاعدة بيانات PostgreSQL منظمة", price: "4,000 DA" },
          { feature: "إعداد البنية الخلفية وواجهات برمجة التطبيقات (Backend & APIs)", price: "2,000 DA" },
          { feature: "تطبيق RLS لحماية البيانات وإدارة الصلاحيات", price: "4,000 DA" },
          { feature: "Validation والتحقق من البيانات وحماية العمليات الحساسة", price: "2,000 DA" },
          { feature: "تحسين الأداء واستهلاك Bandwidth", price: "3,000 DA" },
        ],
      },
      {
        id: "sec-7",
        number: "07",
        code: "MOD_07 // DEPLOY_DELIVERY",
        title: "7. النشر والاختبار والتسليم",
        total: "10,000 DA",
        description:
          "تجهيز المتجر للإطلاق الفعلي، مع اختبار الوظائف الأساسية والتأكد من جاهزية النظام للاستخدام، وتسليم المالكة لوحة التحكم مع شرح طريقة إدارتها.",
        icon: "rocket",
        items: [
          { feature: "إعداد Netlify ونشر الموقع", price: "3,000 DA" },
          { feature: "ربط Domain Name", price: "1,000 DA" },
          { feature: "Testing & Bug Fixing واختبار النظام وإصلاح الأخطاء", price: "4,000 DA" },
          { feature: "تدريب المالكة على استخدام لوحة التحكم وإدارة المتجر", price: "2,000 DA" },
        ],
      },
    ],
    financialBadge: "التفاصيل المالية النهائية",
    financialTitle: "الملخص المالي",
    sectionsTableTitle: "تفصيل الأقسام السبعة",
    sectionsColLabel: "القسم",
    sectionsPriceLabel: "السعر",
    sectionsTotalLabel: "الإجمالي الأصلي حسب تفاصيل الخدمات",
    summaryRows: [
      { section: "التصميم والواجهة الأمامية", price: "45,000 DA" },
      { section: "المتجر الإلكتروني", price: "30,000 DA" },
      { section: "لوحة تحكم المالك", price: "32,000 DA" },
      { section: "إدارة الطلبات والتوصيل", price: "30,000 DA" },
      { section: "WhatsApp Integration", price: "22,000 DA" },
      { section: "Backend, Security & Performance", price: "15,000 DA" },
      { section: "النشر والاختبار والتسليم", price: "10,000 DA" },
    ],
    commercialTitle: "السعر التجاري والتخفيضات",
    commercialItemCol: "البيان",
    commercialAmountCol: "المبلغ",
    commercialBreakdown: [
      { label: "السعر الأصلي للمشروع", amount: "184,000 DA", style: "default" },
      { label: "التخفيض التجاري الأساسي", amount: "−38,000 DA", style: "discount" },
      { label: "السعر الحالي للمشروع", amount: "146,000 DA", style: "current" },
      {
        label: "تخفيض إضافي مشروط بعقد إشهاري مع Salon DZ Tech",
        amount: "−22,000 DA",
        style: "discount",
      },
      {
        label: "السعر النهائي عند قبول العقد الإشهاري",
        amount: "124,000 DA",
        style: "final",
      },
    ],
    currentPriceLabel: "السعر الحالي للمشروع:",
    currentPriceValue: "146,000 دج",
    promoPriceLabel: "السعر الخاص عند قبول عقد البرنامج الإشهاري:",
    promoPriceValue: "124,000 دج",
    promoPriceWords: "مائة وأربعة وعشرون ألف دينار جزائري.",
    paymentBadge: "جدول الدفعات",
    paymentTitle: "شروط الدفع",
    paymentColLabel: "الدفعة",
    paymentAmountCol: "المبلغ",
    paymentTotalLabel: "الإجمالي",
    option1Tag: "الخيار الأول",
    option1Title: "الخيار الأول: دون عقد إشهاري",
    option1Initial: "الدفعة الأولية عند الاتفاق وبدء العمل",
    option1Remaining: "المبلغ المتبقي",
    option1Cta: "اعتماد الخيار الأول (146,000 DA)",
    option1ModalLabel: "E-COM SHYMSS — الخيار الأول: دون عقد إشهاري (146,000 DA)",
    option2Tag: "الخيار الثاني (الأفضل قيمة)",
    option2Title: "الخيار الثاني: مع عقد إشهاري",
    option2Initial: "الدفعة الأولية عند الاتفاق وبدء العمل",
    option2Remaining: "المبلغ المتبقي",
    option2Cta: "اعتماد الخيار الثاني (124,000 DA)",
    option2ModalLabel: "E-COM SHYMSS — الخيار الثاني: مع عقد إشهاري (124,000 DA)",
    timelineBadge: "الجدول الزمني ومراحل التنفيذ",
    timelineTitle: "مدة الإنجاز ومراحل العمل — 30 إلى 35 يوماً",
    timelineSubtitle:
      "مدة إجمالية تتراوح بين 30 و35 يوماً، مقسّمة إلى مراحل واضحة ومحددة لضمان جودة التنفيذ ومتابعة كل مرحلة بدقة.",
    timelineDurationLabel: "المدة الزمنية:",
    phases: [
      {
        step: "01",
        code: "PHASE_01 // UI_UX_PREVIEW",
        title: "1. مرحلة التصميم",
        duration: "7 أيام",
        icon: "palette",
        tasks: [
          "تصميم الواجهة الرئيسية والمتجر الإلكتروني.",
          "تصميم صفحات المنتجات وتفاصيلها.",
          "تصميم لوحة تحكم المالك.",
          "إضافة الحركات والانتقالات البصرية (Animations).",
          "ضبط التصميم ليتناسب مع الهاتف والكمبيوتر والتابلت.",
        ],
        milestone: {
          previewTitle: "معاينة التصميم (Frontend Preview)",
          previewNote:
            "في نهاية اليوم السابع: نرسل للزبونة نسخة تجريبية من الموقع (Frontend Preview)، تحتوي على التصميم والواجهات كاملة، لكن دون ربطها ببيانات حقيقية أو تشغيل الوظائف الخلفية.",
          approvalNote:
            "تقوم الزبونة بمراجعة التصميم وتأكيد موافقتها قبل الانتقال إلى المرحلة التالية.",
        },
      },
      {
        step: "02",
        code: "PHASE_02 // CORE_DEVELOPMENT",
        title: "2. مرحلة البرمجة والتطوير",
        duration: "18 إلى 21 يوماً",
        subtitle: "بعد الموافقة على التصميم:",
        icon: "code2",
        tasks: [
          "برمجة وربط قاعدة البيانات.",
          "تطوير نظام المنتجات والطلبات.",
          "إنشاء لوحة تحكم المالك.",
          "ربط WhatsApp API.",
          "تطوير الحماية والوظائف الخلفية.",
        ],
      },
      {
        step: "03",
        code: "PHASE_03 // QA_LAUNCH_TRAINING",
        title: "3. الاختبار والتسليم",
        duration: "5 إلى 7 أيام",
        icon: "rocket",
        tasks: [
          "اختبار جميع الوظائف.",
          "إصلاح الأخطاء.",
          "اختبار الموقع على مختلف الأجهزة.",
          "نشر الموقع وتسليم بيانات الدخول.",
          "تدريب الزبونة على استخدام لوحة التحكم.",
        ],
      },
    ],
    timelineTotalLabel: "المدة الإجمالية المقدّرة:",
    timelineTotalValue: "30 إلى 35 يوماً",
    timelineNote:
      "ملاحظة: يبدأ احتساب مدة التطوير بعد موافقة الزبونة على التصميم، وأي تأخر في إرسال الملاحظات أو الموافقة قد يؤثر على موعد التسليم.",
    promoTermsTitle: "شروط التخفيض الإشهاري — Salon DZ Tech",
    promoTerms: [
      "السعر المعتمد للمشروع دون التخفيض الإشهاري الإضافي هو 146,000 دج.",
      "تستفيد الزبونة من تخفيض إضافي بقيمة 22,000 دج، ليصبح السعر النهائي 124,000 دج، مقابل الموافقة على توقيع عقد برنامج إشهاري مستقل مع Salon DZ Tech.",
      "التخفيض الإضافي البالغ 22,000 دج مشروط بالالتزام بعقد البرنامج الإشهاري وبنوده المتفق عليها.",
      "في حالة عدم موافقة الزبونة على عقد البرنامج الإشهاري، يبقى السعر المستحق هو 146,000 دج.",
      "إذا استفادت الزبونة من السعر المخفض 124,000 دج ثم رفضت العقد الإشهاري أو لم تلتزم به، يصبح مبلغ التخفيض المشروط، وقدره 22,000 دج، مستحقاً لـ Salon DZ Tech، ويجب تسويته وفق الشروط المتفق عليها في العقد.",
      "يتم تحديد تفاصيل البرنامج الإشهاري ومدته وعدد المنشورات أو الحملات والتزامات الطرفين في عقد مستقل.",
      "لا تعتبر خدمات الإشهار جزءاً من خدمات تطوير المتجر الإلكتروني، بل تخضع لاتفاق منفصل.",
    ],
    generalNotesTitle: "ملاحظات تعاقدية عامة",
    generalNotes: [
      "السعر يشمل تطوير النظام والميزات المذكورة في عرض السعر.",
      "السعر لا يشمل الاشتراكات أو الخدمات المدفوعة المستقبلية الخاصة بالأطراف الخارجية.",
      "شراء وتجديد Domain Name على حساب الزبونة.",
      "يمكن تضمين إدخال أول 20 منتجاً ضمن عملية التسليم.",
      "ضمان إصلاح أخطاء التطوير لمدة 60 يوماً ابتداءً من تاريخ التسليم.",
      "الضمان يشمل أخطاء التطوير ولا يشمل إضافة ميزات جديدة أو تغييرات خارج المواصفات المتفق عليها.",
      "أي ميزات أو تعديلات جديدة خارج نطاق هذا العرض يتم تقييمها وتسعيرها بشكل منفصل.",
      "تخضع خدمات Meta WhatsApp Cloud API وسياسات الرسائل والأهلية المجانية لشروط Meta السارية.",
    ],
    confirmBtnPrefix: "تأكيد وبدء التنفيذ",
    printFooterBtn: "طباعة / حفظ كـ PDF",
  },

  fr: {
    metaTitle: "E-COM SHYMSS — Devis & Contrat Officiel | Salon DZ Tech",
    metaDescription:
      "Devis commercial officiel et cahier des charges du projet E-COM SHYMSS développé par Salon DZ Tech.",
    privateBadge: "Devis Privé & Personnalisé",
    printBtn: "Imprimer / PDF",
    heroPill: "E-COM SHYMSS — DEVIS DU PROJET",
    heroTitleBrand: "E-COM SHYMSS",
    heroTitleSuffix: "— Devis Officiel",
    heroSubtitle:
      "Boutique e-commerce professionnelle pour la gestion des produits, des commandes et des ventes, dotée d'un design moderne et d'une expérience fluide, avec un système de gestion complet permettant à la propriétaire de piloter son activité depuis n'importe où.",
    kpiOriginalLabel: "Total brut selon détail des prestations",
    kpiOriginalSub: "Remise commerciale de base :",
    kpiCurrentLabel: "Tarif actuel du projet",
    kpiCurrentSub: "Sans contrat publicitaire",
    kpiPromoBadge: "Offre Spéciale (−22 000 DA en plus)",
    kpiPromoSub: "Sous réserve d'accord sur le contrat pub",
    jumpSummary: "Résumé Financier & Conditions",
    jumpTimeline: "Délai de réalisation (30 – 35 jours)",
    tableFeatureCol: "Prestation / Fonctionnalité",
    tablePriceCol: "Tarif",
    tableTotalLabel: "Sous-total",
    modules: [
      {
        id: "sec-1",
        number: "01",
        code: "MOD_01 // UI_UX_FRONTEND",
        title: "1. Design & Interface Front-End",
        total: "45,000 DA",
        description:
          "Conception d'une interface moderne reflétant l'identité visuelle de la marque, alliant élégance et ergonomie, avec une navigation fluide et des transitions soignées.",
        icon: "palette",
        items: [
          { feature: "Design UI/UX professionnel et identité visuelle dédiée à la boutique", price: "15,000 DA" },
          { feature: "Page d'accueil avancée et attractive mettant en valeur la marque et les produits", price: "15,000 DA" },
          { feature: "Animations & Smooth Transitions pour une expérience interactive fluide", price: "8,000 DA" },
          { feature: "Responsive Design complet pour mobiles, tablettes et ordinateurs", price: "7,000 DA" },
        ],
      },
      {
        id: "sec-2",
        number: "02",
        code: "MOD_02 // STOREFRONT_CART",
        title: "2. Boutique E-Commerce",
        total: "30,000 DA",
        description:
          "Boutique en ligne complète offrant aux clientes une expérience d'achat simple, avec exploration des articles, consultation des détails et finalisation de commande en quelques étapes.",
        icon: "shoppingBag",
        items: [
          { feature: "Présentation des produits avec photos professionnelles et informations claires", price: "10,000 DA" },
          { feature: "Fiches dédiées pour chaque produit avec ses détails et caractéristiques", price: "6,000 DA" },
          { feature: "Affichage des prix, remises et offres promotionnelles (Promotions)", price: "5,000 DA" },
          { feature: "Formulaire de commande complet : nom, téléphone, wilaya et adresse", price: "6,000 DA" },
          { feature: "Choix du mode de réception : livraison à domicile ou bureau de livraison", price: "3,000 DA" },
        ],
      },
      {
        id: "sec-3",
        number: "03",
        code: "MOD_03 // ADMIN_DASHBOARD",
        title: "3. Tableau de Bord Propriétaire",
        total: "32,000 DA",
        description:
          "Panneau d'administration professionnel donnant à la propriétaire le contrôle total sur la boutique et son activité, accessible depuis tout appareil connecté à Internet (smartphone, ordinateur ou tablette).",
        highlightNote:
          "Aucune application ou logiciel à installer : le tableau de bord s'ouvre directement via navigateur de n'importe où, avec connexion sécurisée.",
        icon: "layoutDashboard",
        items: [
          { feature: "Système de connexion sécurisée et gestion des droits d'accès (Admin Authentication)", price: "6,000 DA" },
          { feature: "Dashboard affichant les statistiques et indicateurs de performance", price: "6,000 DA" },
          { feature: "Ajout, modification, suppression et gestion des fiches produits", price: "8,000 DA" },
          { feature: "Import, organisation et gestion des images produits", price: "4,000 DA" },
          { feature: "Contrôle des prix, remises et offres promotionnelles", price: "4,000 DA" },
          { feature: "Gestion des tarifs de livraison selon les options choisies", price: "4,000 DA" },
        ],
        extraTitle: "Avantages d'accès au tableau de bord :",
        extraPoints: [
          "Ouverture du tableau de bord depuis téléphone, ordinateur ou tablette.",
          "Interface adaptative s'ajustant à la taille de l'écran utilisé.",
          "Gestion de la boutique à distance sans contrainte de lieu.",
          "Accès unifié aux produits, commandes et statistiques depuis une seule interface.",
          "Connexion sécurisée pour protéger l'ensemble des données de la boutique.",
        ],
      },
      {
        id: "sec-4",
        number: "04",
        code: "MOD_04 // ORDERS_DELIVERY",
        title: "4. Gestion des Commandes & Livraison",
        total: "30,000 DA",
        description:
          "Système complet pour organiser et suivre les commandes depuis leur réception jusqu'à la livraison finale, simplifiant le travail quotidien et réduisant les erreurs de traitement.",
        icon: "truck",
        items: [
          { feature: "Réception automatique des commandes et enregistrement en base de données", price: "8,000 DA" },
          { feature: "Affichage détaillé des commandes avec recherche et tri", price: "5,000 DA" },
          { feature: "Confirmation, gestion et suivi détaillé des commandes", price: "5,000 DA" },
          { feature: "Système complet de mise à jour et de suivi des statuts de commande", price: "8,000 DA" },
          { feature: "Possibilité de confirmer les commandes par appel téléphonique", price: "2,000 DA" },
          { feature: "Sauvegarde locale de l'historique des commandes via LocalStorage", price: "2,000 DA" },
        ],
        extraTitle: "Statuts de commande pris en charge :",
        statuses: [
          { code: "New", label: "Nouvelle commande.", tone: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25" },
          { code: "Confirmed", label: "Commande confirmée.", tone: "bg-brand-green/10 text-brand-green border-brand-green/25" },
          { code: "Shipping", label: "Commande en cours d'expédition.", tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25" },
          { code: "Delivered", label: "Livrée.", tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25" },
          { code: "Paid", label: "Payée.", tone: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/25" },
          { code: "Cancelled", label: "Commande annulée.", tone: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25" },
          { code: "Returned", label: "Retournée par le bureau de livraison.", tone: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/25" },
        ],
      },
      {
        id: "sec-5",
        number: "05",
        code: "MOD_05 // WHATSAPP_CLOUD_API",
        title: "5. Intégration WhatsApp",
        total: "22,000 DA",
        description:
          "Connexion de la boutique à WhatsApp Business Cloud API pour fluidifier la communication client et automatiser les messages de confirmation, avec contrôle de quota évitant tout coût supplémentaire.",
        icon: "messageSquare",
        items: [
          { feature: "Configuration et connexion de Meta WhatsApp Cloud API", price: "6,000 DA" },
          { feature: "Développement et connexion des fonctions serveur Cloud (Edge Functions)", price: "6,000 DA" },
          { feature: "Système automatisé de confirmation de commandes via WhatsApp", price: "4,000 DA" },
          { feature: "Vérification de la fenêtre de 24 heures et de l'éligibilité d'envoi", price: "3,000 DA" },
          { feature: "Suivi du quota de 1 000 messages gratuits et blocage des messages payants", price: "3,000 DA" },
        ],
        extraTitle: "Atouts du système WhatsApp :",
        extraPoints: [
          "Envoi automatisé des confirmations de commande conformément aux règles Meta.",
          "Bénéfice d'un quota allant jusqu'à 1 000 messages gratuits selon l'éligibilité du compte et les conditions Meta.",
          "Comptage et suivi automatique du volume de messages envoyés.",
          "Contrôle de la fenêtre de 24 heures et de l'éligibilité avant chaque envoi.",
          "Arrêt automatique dès que le quota gratuit est atteint ou en l'absence d'éligibilité gratuite.",
          "Blocage strict de tout envoi susceptible d'engendrer des frais au-delà du quota gratuit.",
        ],
      },
      {
        id: "sec-6",
        number: "06",
        code: "MOD_06 // BACKEND_SECURITY",
        title: "6. Backend, Sécurité & Performance",
        total: "15,000 DA",
        description:
          "Architecture back-end structurée pour gérer les données de la boutique et relier le front-end à la base de données, avec mesures de sécurité et de validation garantissant l'intégrité des opérations.",
        icon: "shieldCheck",
        items: [
          { feature: "Conception d'une base de données PostgreSQL structurée", price: "4,000 DA" },
          { feature: "Configuration du Backend et des interfaces API", price: "2,000 DA" },
          { feature: "Application des règles RLS pour la protection des données et des accès", price: "4,000 DA" },
          { feature: "Validation des données et sécurisation des opérations sensibles", price: "2,000 DA" },
          { feature: "Optimisation des performances et de la consommation de bande passante", price: "3,000 DA" },
        ],
      },
      {
        id: "sec-7",
        number: "07",
        code: "MOD_07 // DEPLOY_DELIVERY",
        title: "7. Déploiement, Tests & Livraison",
        total: "10,000 DA",
        description:
          "Préparation de la boutique pour la mise en production, tests des fonctionnalités essentielles, validation de bon fonctionnement et prise en main complète avec la propriétaire.",
        icon: "rocket",
        items: [
          { feature: "Configuration de Netlify et déploiement du site", price: "3,000 DA" },
          { feature: "Connexion du nom de domaine (Domain Name)", price: "1,000 DA" },
          { feature: "Testing & Bug Fixing : tests système et correction des anomalies", price: "4,000 DA" },
          { feature: "Formation de la propriétaire à l'utilisation du tableau de bord et à la gestion", price: "2,000 DA" },
        ],
      },
    ],
    financialBadge: "Synthèse Financière Finale",
    financialTitle: "Résumé Financier",
    sectionsTableTitle: "Détail des 7 Modules",
    sectionsColLabel: "Module",
    sectionsPriceLabel: "Tarif",
    sectionsTotalLabel: "Total brut selon le détail des prestations",
    summaryRows: [
      { section: "Design & Interface Front-End", price: "45,000 DA" },
      { section: "Boutique E-Commerce", price: "30,000 DA" },
      { section: "Tableau de Bord Propriétaire", price: "32,000 DA" },
      { section: "Gestion des Commandes & Livraison", price: "30,000 DA" },
      { section: "Intégration WhatsApp", price: "22,000 DA" },
      { section: "Backend, Sécurité & Performance", price: "15,000 DA" },
      { section: "Déploiement, Tests & Livraison", price: "10,000 DA" },
    ],
    commercialTitle: "Tarif Commercial & Remises",
    commercialItemCol: "Désignation",
    commercialAmountCol: "Montant",
    commercialBreakdown: [
      { label: "Tarif initial du projet", amount: "184,000 DA", style: "default" },
      { label: "Remise commerciale de base", amount: "−38,000 DA", style: "discount" },
      { label: "Tarif actuel du projet", amount: "146,000 DA", style: "current" },
      {
        label: "Remise additionnelle conditionnée à un contrat publicitaire avec Salon DZ Tech",
        amount: "−22,000 DA",
        style: "discount",
      },
      {
        label: "Tarif final avec acceptation du contrat publicitaire",
        amount: "124,000 DA",
        style: "final",
      },
    ],
    currentPriceLabel: "Tarif actuel du projet :",
    currentPriceValue: "146 000 DA",
    promoPriceLabel: "Tarif spécial avec contrat publicitaire :",
    promoPriceValue: "124 000 DA",
    promoPriceWords: "Cent vingt-quatre mille dinars algériens.",
    paymentBadge: "Échéancier de Paiement",
    paymentTitle: "Modalités de Paiement",
    paymentColLabel: "Tranche",
    paymentAmountCol: "Montant",
    paymentTotalLabel: "Total",
    option1Tag: "Option 1",
    option1Title: "Option 1 : Sans contrat publicitaire",
    option1Initial: "Acompte initial à la signature et au démarrage",
    option1Remaining: "Solde restant",
    option1Cta: "Choisir l'Option 1 (146,000 DA)",
    option1ModalLabel: "E-COM SHYMSS — Option 1 : Sans contrat publicitaire (146,000 DA)",
    option2Tag: "Option 2 (Meilleure Valeur)",
    option2Title: "Option 2 : Avec contrat publicitaire",
    option2Initial: "Acompte initial à la signature et au démarrage",
    option2Remaining: "Solde restant",
    option2Cta: "Choisir l'Option 2 (124,000 DA)",
    option2ModalLabel: "E-COM SHYMSS — Option 2 : Avec contrat publicitaire (124,000 DA)",
    timelineBadge: "Planning & Phases d'Exécution",
    timelineTitle: "Délai de Réalisation & Phases — 30 à 35 jours",
    timelineSubtitle:
      "Durée totale estimée entre 30 et 35 jours, structurée en 3 phases claires pour garantir la qualité et un suivi précis à chaque étape.",
    timelineDurationLabel: "Durée :",
    phases: [
      {
        step: "01",
        code: "PHASE_01 // UI_UX_PREVIEW",
        title: "1. Phase Design",
        duration: "7 jours",
        icon: "palette",
        tasks: [
          "Design de l'interface d'accueil et de la boutique en ligne.",
          "Design des pages produits et fiches détaillées.",
          "Design du tableau de bord propriétaire.",
          "Intégration des animations et transitions visuelles.",
          "Adaptation responsive pour mobile, ordinateur et tablette.",
        ],
        milestone: {
          previewTitle: "Aperçu Design (Frontend Preview)",
          previewNote:
            "À la fin du 7ᵉ jour : envoi à la cliente d'une version d'aperçu du site (Frontend Preview) incluant l'ensemble du design et des écrans, sans connexion aux données réelles ni activation des fonctions back-end.",
          approvalNote:
            "La cliente examine le design et confirme son accord avant le passage à la phase suivante.",
        },
      },
      {
        step: "02",
        code: "PHASE_02 // CORE_DEVELOPMENT",
        title: "2. Phase Développement",
        duration: "18 à 21 jours",
        subtitle: "Après validation du design :",
        icon: "code2",
        tasks: [
          "Développement et connexion de la base de données.",
          "Développement du système produits et commandes.",
          "Création du tableau de bord propriétaire.",
          "Intégration de WhatsApp API.",
          "Développement de la sécurité et de la logique serveur.",
        ],
      },
      {
        step: "03",
        code: "PHASE_03 // QA_LAUNCH_TRAINING",
        title: "3. Tests & Livraison",
        duration: "5 à 7 jours",
        icon: "rocket",
        tasks: [
          "Tests de toutes les fonctionnalités.",
          "Correction des anomalies.",
          "Tests multi-appareils (mobile, tablette, PC).",
          "Mise en ligne et remise des accès.",
          "Formation de la cliente à l'utilisation du tableau de bord.",
        ],
      },
    ],
    timelineTotalLabel: "Durée totale estimée :",
    timelineTotalValue: "30 à 35 jours",
    timelineNote:
      "Note : Le décompte de la phase de développement débute après validation du design par la cliente ; tout retard dans l'envoi des retours ou de l'accord peut impacter la date de livraison.",
    promoTermsTitle: "Conditions de la Remise Publicitaire — Salon DZ Tech",
    promoTerms: [
      "Le prix de référence du projet sans la remise publicitaire additionnelle est de 146 000 DA.",
      "La cliente bénéficie d'une remise supplémentaire de 22 000 DA, ramenant le prix final à 124 000 DA, en contrepartie de la signature d'un contrat publicitaire indépendant avec Salon DZ Tech.",
      "Cette remise additionnelle de 22 000 DA est strictement conditionnée au respect des clauses convenues dans le contrat publicitaire.",
      "En cas de non-acceptation du contrat publicitaire par la cliente, le montant dû demeure 146 000 DA.",
      "Si la cliente bénéficie du tarif réduit de 124 000 DA puis refuse ou ne respecte pas le contrat publicitaire, le montant de la remise conditionnelle de 22 000 DA devient exigible au profit de Salon DZ Tech selon les termes du contrat.",
      "Les détails du programme publicitaire, sa durée, le nombre de publications ou campagnes et les engagements des deux parties sont fixés dans un contrat distinct.",
      "Les prestations publicitaires ne font pas partie du développement de la boutique e-commerce et relèvent d'un accord séparé.",
    ],
    generalNotesTitle: "Clauses Contractuelles Générales",
    generalNotes: [
      "Le tarif inclut le développement du système et des fonctionnalités listées dans ce devis.",
      "Le tarif n'inclut pas d'éventuels abonnements ou services payants futurs auprès de tiers.",
      "L'achat et le renouvellement du nom de domaine (Domain Name) sont à la charge de la cliente.",
      "L'insertion des 20 premiers produits peut être incluse lors de la livraison.",
      "Garantie de correction des bugs de développement pendant 60 jours à compter de la livraison.",
      "La garantie couvre uniquement les défauts de développement et exclut l'ajout de nouvelles fonctionnalités ou modifications hors périmètre.",
      "Toute nouvelle fonctionnalité ou modification hors du présent devis fera l'objet d'une évaluation et d'un chiffrage séparés.",
      "Les services Meta WhatsApp Cloud API, les politiques de messagerie et l'éligibilité au quota gratuit restent soumis aux conditions Meta en vigueur.",
    ],
    confirmBtnPrefix: "Valider & Lancer",
    printFooterBtn: "Imprimer / Enregistrer en PDF",
  },

  en: {
    metaTitle: "E-COM SHYMSS — Official Project Quotation | Salon DZ Tech",
    metaDescription:
      "Official commercial quotation and technical scope for the E-COM SHYMSS e-commerce store and dashboard by Salon DZ Tech.",
    privateBadge: "Private Client Quotation",
    printBtn: "Print / PDF",
    heroPill: "E-COM SHYMSS — PROJECT QUOTATION",
    heroTitleBrand: "E-COM SHYMSS",
    heroTitleSuffix: "— Official Quotation",
    heroSubtitle:
      "A professional e-commerce platform for managing products, orders, and sales, built with a modern design, seamless user experience, and an integrated admin dashboard allowing the owner to manage her business from anywhere.",
    kpiOriginalLabel: "Original Total by Service Breakdown",
    kpiOriginalSub: "Base Commercial Discount:",
    kpiCurrentLabel: "Current Project Price",
    kpiCurrentSub: "Without promotional agreement",
    kpiPromoBadge: "Special Offer (−22,000 DA extra)",
    kpiPromoSub: "With promotional agreement acceptance",
    jumpSummary: "Financial Summary & Terms",
    jumpTimeline: "Timeline (30 – 35 Days)",
    tableFeatureCol: "Feature",
    tablePriceCol: "Price",
    tableTotalLabel: "Subtotal",
    modules: [
      {
        id: "sec-1",
        number: "01",
        code: "MOD_01 // UI_UX_FRONTEND",
        title: "1. Design & Front-End Interface",
        total: "45,000 DA",
        description:
          "Modern storefront interface tailored to the brand's visual identity, combining elegance and ease of use with smooth navigation and visual transitions.",
        icon: "palette",
        items: [
          { feature: "Professional UI/UX design & custom brand visual identity", price: "15,000 DA" },
          { feature: "Advanced, engaging homepage showcasing the brand and products", price: "15,000 DA" },
          { feature: "Animations & Smooth Transitions for a fluid interactive experience", price: "8,000 DA" },
          { feature: "Full Responsive Design across mobile phones, tablets, and desktops", price: "7,000 DA" },
        ],
      },
      {
        id: "sec-2",
        number: "02",
        code: "MOD_02 // STOREFRONT_CART",
        title: "2. E-Commerce Storefront",
        total: "30,000 DA",
        description:
          "A complete online store giving shoppers a smooth browsing experience, allowing them to explore products, view details, and complete orders in simple steps.",
        icon: "shoppingBag",
        items: [
          { feature: "Product display with high-quality images and clear details", price: "10,000 DA" },
          { feature: "Dedicated pages for each product with full specifications", price: "6,000 DA" },
          { feature: "Pricing, discounts, and promotional offers display (Promotions)", price: "5,000 DA" },
          { feature: "Complete checkout form (full name, phone number, wilaya, address)", price: "6,000 DA" },
          { feature: "Delivery option selection: Home Delivery or Delivery Office (Stopdesk)", price: "3,000 DA" },
        ],
      },
      {
        id: "sec-3",
        number: "03",
        code: "MOD_03 // ADMIN_DASHBOARD",
        title: "3. Owner Admin Dashboard",
        total: "32,000 DA",
        description:
          "Professional management panel giving the owner complete control over the store and its operations, accessible from any internet-connected phone, PC, or tablet.",
        highlightNote:
          "No app or desktop software installation required — open the dashboard directly in any browser from anywhere with secure authentication.",
        icon: "layoutDashboard",
        items: [
          { feature: "Secure login system and access permissions (Admin Authentication)", price: "6,000 DA" },
          { feature: "Dashboard displaying store analytics and performance KPIs", price: "6,000 DA" },
          { feature: "Add, edit, delete, and manage product records", price: "8,000 DA" },
          { feature: "Upload, organize, and manage product images", price: "4,000 DA" },
          { feature: "Control pricing, discounts, and promotional offers", price: "4,000 DA" },
          { feature: "Manage delivery fees by delivery method and option", price: "4,000 DA" },
        ],
        extraTitle: "Dashboard Access Highlights:",
        extraPoints: [
          "Accessible from smartphone, computer, or tablet.",
          "Responsive layout adapting seamlessly to any screen size.",
          "Manage the store remotely from anywhere.",
          "Unified access to products, orders, and analytics from one screen.",
          "Secure login protecting store operations and data.",
        ],
      },
      {
        id: "sec-4",
        number: "04",
        code: "MOD_04 // ORDERS_DELIVERY",
        title: "4. Order & Delivery Management",
        total: "30,000 DA",
        description:
          "End-to-end order organization and tracking from order reception to final delivery, streamlining daily workflows and minimizing order-handling errors.",
        icon: "truck",
        items: [
          { feature: "Automatic order intake and database storage", price: "8,000 DA" },
          { feature: "Detailed order views with search and sorting capabilities", price: "5,000 DA" },
          { feature: "Order confirmation, management, and detail tracking", price: "5,000 DA" },
          { feature: "Complete order status update and lifecycle tracking system", price: "8,000 DA" },
          { feature: "Phone call order confirmation capability", price: "2,000 DA" },
          { feature: "Local order history caching via LocalStorage", price: "2,000 DA" },
        ],
        extraTitle: "Included Order Statuses:",
        statuses: [
          { code: "New", label: "New order.", tone: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25" },
          { code: "Confirmed", label: "Order confirmed.", tone: "bg-brand-green/10 text-brand-green border-brand-green/25" },
          { code: "Shipping", label: "Order out for delivery.", tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25" },
          { code: "Delivered", label: "Delivered.", tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25" },
          { code: "Paid", label: "Paid.", tone: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/25" },
          { code: "Cancelled", label: "Cancelled order.", tone: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25" },
          { code: "Returned", label: "Returned from delivery office.", tone: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/25" },
        ],
      },
      {
        id: "sec-5",
        number: "05",
        code: "MOD_05 // WHATSAPP_CLOUD_API",
        title: "5. WhatsApp Integration",
        total: "22,000 DA",
        description:
          "Integration with WhatsApp Business Cloud API to streamline customer communication and automate order confirmations, featuring safeguards that prevent unintended paid messages.",
        icon: "messageSquare",
        items: [
          { feature: "Meta WhatsApp Cloud API setup and integration", price: "6,000 DA" },
          { feature: "Cloud Edge Functions backend development and integration", price: "6,000 DA" },
          { feature: "Automated WhatsApp order confirmation workflow", price: "4,000 DA" },
          { feature: "24-hour messaging window and eligibility verification", price: "3,000 DA" },
          { feature: "1,000 free messages quota monitoring and paid-message prevention", price: "3,000 DA" },
        ],
        extraTitle: "WhatsApp System Highlights:",
        extraPoints: [
          "Automated order confirmation messages compliant with Meta terms.",
          "Up to 1,000 free messages quota subject to account eligibility and Meta rules.",
          "Automatic tracking of sent message counts.",
          "24-hour window and free-tier eligibility check before every message.",
          "Automatic pause upon reaching the free quota or when free eligibility is unavailable.",
          "Strict prevention of any chargeable message or exceeding the free quota.",
        ],
      },
      {
        id: "sec-6",
        number: "06",
        code: "MOD_06 // BACKEND_SECURITY",
        title: "6. Backend, Security & Performance",
        total: "15,000 DA",
        description:
          "Organized backend architecture connecting the storefront to the database, applying core security and validation measures to ensure reliable operations.",
        icon: "shieldCheck",
        items: [
          { feature: "Structured PostgreSQL database schema design", price: "4,000 DA" },
          { feature: "Backend infrastructure and API interfaces setup", price: "2,000 DA" },
          { feature: "Row-Level Security (RLS) for data protection and access control", price: "4,000 DA" },
          { feature: "Input validation and protection of sensitive operations", price: "2,000 DA" },
          { feature: "Performance and bandwidth usage optimization", price: "3,000 DA" },
        ],
      },
      {
        id: "sec-7",
        number: "07",
        code: "MOD_07 // DEPLOY_DELIVERY",
        title: "7. Deployment, Testing & Delivery",
        total: "10,000 DA",
        description:
          "Preparing the store for live launch, testing core workflows to verify production readiness, and handing over the admin panel with owner training.",
        icon: "rocket",
        items: [
          { feature: "Netlify hosting configuration and site deployment", price: "3,000 DA" },
          { feature: "Custom Domain Name connection", price: "1,000 DA" },
          { feature: "Testing & Bug Fixing across system workflows", price: "4,000 DA" },
          { feature: "Owner training on managing the store and admin dashboard", price: "2,000 DA" },
        ],
      },
    ],
    financialBadge: "Final Financial Breakdown",
    financialTitle: "Financial Summary",
    sectionsTableTitle: "Breakdown of the 7 Sections",
    sectionsColLabel: "Section",
    sectionsPriceLabel: "Price",
    sectionsTotalLabel: "Original Total by Service Breakdown",
    summaryRows: [
      { section: "Design & Front-End Interface", price: "45,000 DA" },
      { section: "E-Commerce Storefront", price: "30,000 DA" },
      { section: "Owner Admin Dashboard", price: "32,000 DA" },
      { section: "Order & Delivery Management", price: "30,000 DA" },
      { section: "WhatsApp Integration", price: "22,000 DA" },
      { section: "Backend, Security & Performance", price: "15,000 DA" },
      { section: "Deployment, Testing & Delivery", price: "10,000 DA" },
    ],
    commercialTitle: "Commercial Pricing & Discounts",
    commercialItemCol: "Description",
    commercialAmountCol: "Amount",
    commercialBreakdown: [
      { label: "Original project price", amount: "184,000 DA", style: "default" },
      { label: "Base commercial discount", amount: "−38,000 DA", style: "discount" },
      { label: "Current project price", amount: "146,000 DA", style: "current" },
      {
        label: "Additional discount conditioned on a promotional contract with Salon DZ Tech",
        amount: "−22,000 DA",
        style: "discount",
      },
      {
        label: "Final price upon promotional contract acceptance",
        amount: "124,000 DA",
        style: "final",
      },
    ],
    currentPriceLabel: "Current Project Price:",
    currentPriceValue: "146,000 DA",
    promoPriceLabel: "Special Price with Promotional Agreement:",
    promoPriceValue: "124,000 DA",
    promoPriceWords: "One hundred twenty-four thousand Algerian Dinars.",
    paymentBadge: "Payment Schedule",
    paymentTitle: "Payment Terms",
    paymentColLabel: "Installment",
    paymentAmountCol: "Amount",
    paymentTotalLabel: "Total",
    option1Tag: "Option 1",
    option1Title: "Option 1: Without Promotional Contract",
    option1Initial: "Initial deposit upon agreement & project kickoff",
    option1Remaining: "Remaining balance",
    option1Cta: "Select Option 1 (146,000 DA)",
    option1ModalLabel: "E-COM SHYMSS — Option 1: Without Promotional Contract (146,000 DA)",
    option2Tag: "Option 2 (Best Value)",
    option2Title: "Option 2: With Promotional Contract",
    option2Initial: "Initial deposit upon agreement & project kickoff",
    option2Remaining: "Remaining balance",
    option2Cta: "Select Option 2 (124,000 DA)",
    option2ModalLabel: "E-COM SHYMSS — Option 2: With Promotional Contract (124,000 DA)",
    timelineBadge: "Execution Schedule & Phases",
    timelineTitle: "Project Timeline & Phases — 30 to 35 Days",
    timelineSubtitle:
      "An estimated total duration of 30 to 35 days, structured into 3 clear phases to ensure quality execution and precise milestone tracking.",
    timelineDurationLabel: "Duration:",
    phases: [
      {
        step: "01",
        code: "PHASE_01 // UI_UX_PREVIEW",
        title: "1. Design Phase",
        duration: "7 days",
        icon: "palette",
        tasks: [
          "Homepage and e-commerce storefront UI design.",
          "Product pages and detailed view design.",
          "Owner admin dashboard design.",
          "Visual animations and smooth transitions.",
          "Responsive optimization for mobile, desktop, and tablet.",
        ],
        milestone: {
          previewTitle: "Design Preview (Frontend Preview)",
          previewNote:
            "At the end of Day 7: We deliver a live Frontend Preview of the website containing the full visual design and screens, without live database binding or backend functionality enabled.",
          approvalNote:
            "The client reviews the design and confirms approval before proceeding to the next phase.",
        },
      },
      {
        step: "02",
        code: "PHASE_02 // CORE_DEVELOPMENT",
        title: "2. Programming & Development Phase",
        duration: "18 to 21 days",
        subtitle: "Following design approval:",
        icon: "code2",
        tasks: [
          "Database implementation and integration.",
          "Products and orders system development.",
          "Owner admin dashboard implementation.",
          "WhatsApp API integration.",
          "Security and backend logic development.",
        ],
      },
      {
        step: "03",
        code: "PHASE_03 // QA_LAUNCH_TRAINING",
        title: "3. Testing & Delivery Phase",
        duration: "5 to 7 days",
        icon: "rocket",
        tasks: [
          "End-to-end testing of all features.",
          "Bug fixing and refinements.",
          "Cross-device testing across screens.",
          "Live deployment and credentials handover.",
          "Client training on managing the admin dashboard.",
        ],
      },
    ],
    timelineTotalLabel: "Estimated Total Duration:",
    timelineTotalValue: "30 to 35 days",
    timelineNote:
      "Note: The development timeline begins after the client approves the design; any delay in feedback or approval may affect the final delivery date.",
    promoTermsTitle: "Promotional Discount Terms — Salon DZ Tech",
    promoTerms: [
      "The standard approved project price without the extra promotional discount is 146,000 DA.",
      "The client receives an additional 22,000 DA discount, reducing the final price to 124,000 DA, in exchange for signing a separate promotional program agreement with Salon DZ Tech.",
      "The additional 22,000 DA discount is strictly conditioned on adherence to the promotional agreement and its terms.",
      "If the client declines the promotional program agreement, the payable project price remains 146,000 DA.",
      "If the client benefits from the discounted 124,000 DA price and subsequently refuses or breaches the promotional agreement, the conditional discount of 22,000 DA becomes payable to Salon DZ Tech under the agreed contract terms.",
      "The details, duration, number of posts or campaigns, and mutual obligations of the promotional program are specified in an independent contract.",
      "Promotional services are not part of e-commerce development services and are governed by a separate agreement.",
    ],
    generalNotesTitle: "General Contractual Notes",
    generalNotes: [
      "The quoted price covers development of the system and features specified in this quotation.",
      "The price does not cover future third-party paid subscriptions or external service fees.",
      "Domain Name purchase and renewal are the client's responsibility.",
      "Entry of the first 20 products can be included as part of delivery.",
      "60-day bug-fix warranty for development defects starting from the delivery date.",
      "The warranty covers development bugs only and excludes adding new features or out-of-scope changes.",
      "Any new features or modifications outside this quotation scope are evaluated and priced separately.",
      "Meta WhatsApp Cloud API services, messaging policies, and free-tier eligibility are subject to Meta's active terms.",
    ],
    confirmBtnPrefix: "Confirm & Start",
    printFooterBtn: "Print / Save as PDF",
  },
};
