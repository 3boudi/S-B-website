import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Sparkles,
  ShieldCheck,
  Package,
  Layers,
  Printer,
  Calendar,
  CreditCard,
  Cpu,
  CheckCircle2,
  PhoneCall,
  Download,
  Percent,
  Clock,
  ArrowRight,
  Database,
  Truck,
  Award,
  BadgePercent,
  Flame,
  Building2,
  Box,
  Palette,
  Laptop,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function SheymssAppDealPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isAr = locale === "ar";

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen pt-24 pb-20 bg-[var(--bg-primary)] dark:bg-[#070C0E] text-[var(--text-primary)] selection:bg-pink-500 selection:text-white"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* Top Feature Ribbon */}
        <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 text-white text-xs font-black py-2.5 px-4 text-center tracking-wider shadow-sm flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>
            {isAr
              ? "النسخة الرسمية لتطبيق ويندوز — متجر SHEYMSS لتجارة وإدارة Press-on Nails ومستحضرات التجميل"
              : "Édition Officielle Windows — Logiciel SHEYMSS Press-on Nails & Beauté Wholesale"}
          </span>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          
          {/* Header Section */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
              <Laptop className="w-4 h-4" />
              <span>{isAr ? "برنامج سطح المكتب لويندوز (100% محلي بدون إنترنت)" : "Logiciel Bureau Windows 100% Hors-Ligne"}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight font-[var(--font-display)] text-slate-900 dark:text-white leading-tight">
              SHEYMSS <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">Management Suite v2.0</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              {isAr
                ? "برنامج سطح مكتب متكامل وسريع، مصمم خصيصاً لتجارة وتوزيع Press-on Nails بالجملة، طباعة بوالص الشحن وتوصيل الطرود لـ 58 ولاية لكافة مكاتب وشركات التوصيل، إدارة مخزون الكبسولات والفرني، وتتبع الأقساط والمدفوعات."
                : "Suite logicielle Windows ultra-rapide conçue sur mesure pour la vente en gros de Press-on Nails, étiquettes thermiques pour toutes les sociétés de livraison 58 Wilayas, stocks matières & vernis UV, et gestion des échéanciers."}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <a
                href="/downloads/sheymss-vip-setup.exe"
                download="sheymss-vip-setup.exe"
                className="px-7 py-3.5 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-black text-sm shadow-md shadow-pink-500/25 flex items-center gap-2.5 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 animate-bounce" />
                <span>{isAr ? "تحميل التطبيق للكمبيوتر (99 MB)" : "Télécharger pour Windows (99 MB)"}</span>
              </a>

              <a
                href="#pricing-deal"
                className="px-6 py-3.5 rounded-2xl border border-pink-500/30 bg-pink-500/5 hover:bg-pink-500/10 text-pink-600 dark:text-pink-400 font-bold text-sm flex items-center gap-2 transition-all"
              >
                <Percent className="w-4 h-4" />
                <span>{isAr ? "باقات الأسعار والتخفيضات" : "Tarifs & Facilités de Paiement"}</span>
              </a>

              <a
                href="#features-list"
                className="px-6 py-3.5 rounded-2xl border border-border bg-[var(--bg-card)] hover:bg-slate-100 dark:hover:bg-slate-800 text-[var(--text-primary)] font-bold text-sm flex items-center gap-2 transition-all"
              >
                <Layers className="w-4 h-4" />
                <span>{isAr ? "استعراض كافة ميزات البرنامج" : "Découvrir les Fonctionnalités"}</span>
              </a>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 1: PRICING & DISCOUNTS BREAKDOWN */}
          {/* ========================================================================= */}
          <div id="pricing-deal" className="mb-20 scroll-mt-24">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider mb-2">
                <BadgePercent className="w-4 h-4" />
                <span>{isAr ? "عروض الأسعار الحصرية وتسهيلات الدفع" : "Conditions Tarifaires & Facilités"}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-[var(--font-display)] text-slate-900 dark:text-white">
                {isAr ? "باقات الأسعار وجدول الأقساط الميسرة" : "Détail des Tarifs & Échéancier de Paiement"}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-2">
                {isAr
                  ? "القيمة السوقية القياسية للبرنامج 35,000 دج مع تخفيضات استثنائية خاصة بالشراكة والترويج"
                  : "Valeur standard du logiciel : 35 000 DA avec remises exclusives partenariat et collaboration"}
              </p>
            </div>

            {/* Discount Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {/* Market Value Card */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-[var(--bg-card)] dark:bg-[#111B21] shadow-sm relative overflow-hidden">
                <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  {isAr ? "القيمة السوقية الأصلية" : "Valeur Standard du Marché"}
                </div>
                <div dir="ltr" className="inline-flex items-baseline gap-1.5 text-slate-900 dark:text-white">
                  <span className="text-3xl font-black font-mono">35,000</span>
                  <span className="text-sm font-bold text-slate-500">{isAr ? "دج" : "DA"}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-2">
                  {isAr ? "السعر القياسي لتطوير النظام المخصص وتكامل وحدات الفوترة" : "Tarif de base pour le développement complet et modules"}
                </p>
              </div>

              {/* Discount 1: Salon DZ Tech Bonus */}
              <div className="p-6 rounded-3xl border border-pink-500/30 bg-pink-500/5 dark:bg-pink-950/20 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-extrabold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
                    {isAr ? "تخفيض الشراكة الخاصة" : "Remise Partenariat"}
                  </div>
                  <span dir="ltr" className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-black font-mono">
                    -10%
                  </span>
                </div>
                <div dir="ltr" className="inline-flex items-baseline gap-1.5 text-pink-600 dark:text-pink-400 font-mono">
                  <span className="text-3xl font-black">-3,500</span>
                  <span className="text-sm font-bold">{isAr ? "دج" : "DA"}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-2">
                  {isAr ? "خصم مباشر ومكافأة خاصة لمتجر SHEYMSS من صالون ديزاد تك" : "Remise directe accordée dans le cadre du partenariat avec Salon DZ Tech"}
                </p>
              </div>

              {/* Discount 2: Marketing Ad Collaboration */}
              <div className="p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    {isAr ? "تخفيض التعاون الإعلاني" : "Remise Collaboration Pub"}
                  </div>
                  <span dir="ltr" className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-black font-mono">
                    -10%
                  </span>
                </div>
                <div dir="ltr" className="inline-flex items-baseline gap-1.5 text-emerald-600 dark:text-emerald-400 font-mono">
                  <span className="text-3xl font-black">-3,500</span>
                  <span className="text-sm font-bold">{isAr ? "دج" : "DA"}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-2">
                  {isAr ? "مقابل نشر منشور + فيديو ريل + ستوري يبرز برنامج صالون ديزاد تك" : "En échange de : 1 Post + 1 Reel Vidéo + 1 Story taguant @salondz.tech"}
                </p>
              </div>
            </div>

            {/* 2 Payment Options Side by Side */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Option A: Full Cash Discount (28,000 DA) */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-500 bg-[var(--bg-card)] dark:bg-[#111B21] p-8 shadow-xl flex flex-col justify-between">
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-black uppercase px-6 py-2 rounded-bl-2xl tracking-wider shadow-sm flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{isAr ? "الخيار الأفضل (تخفيض 20% كامل)" : "Option Comptant (-20% Total)"}</span>
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    <span>{isAr ? "الخيار 1: الدفع المباشر 100% كاش" : "Option 1 : Règlement Comptant Direct"}</span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    {isAr ? "الدفع الفوري بعد التسليم والتجربة" : "Paiement à la Livraison"}
                  </h3>

                  <div className="py-2">
                    <div dir="ltr" className="inline-flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                        28,000
                      </span>
                      <span className="text-xl font-bold text-slate-700 dark:text-slate-200">{isAr ? "دج" : "DA"}</span>
                      <span className="text-xs line-through text-slate-400 font-mono ms-2">35,000 {isAr ? "دج" : "DA"}</span>
                    </div>
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                      {isAr ? "(2.8 ملايين سنتيم — توفير 7,000 دج كاملة)" : "(2,8 Millions de Centimes — 7 000 DA d'économie)"}
                    </p>
                  </div>

                  <ul className="space-y-2.5 text-sm text-[var(--text-secondary)] pt-2 border-t border-border">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{isAr ? "تخفيض إجمالي 20% كامل (شراكة + تعاون إعلاني)" : "Remise cumulée de 20% (Partenariat + Pub)"}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{isAr ? "بدون أي رسوم تقسيط إضافية (0 دج رسوم)" : "Aucun frais de dossier ou d'échéance (0 DA)"}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{isAr ? "تسليم الرخصة الدائمة مدى الحياة فوراً" : "Licence définitive à vie activée immédiatement"}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{isAr ? "الدفع بعد معاينة وتثبيت البرنامج والتأكد من عمله" : "Paiement après installation et vérification"}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-border">
                  <a
                    href="/downloads/sheymss-vip-setup.exe"
                    download="sheymss-vip-setup.exe"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isAr ? "تحميل وتثبيت البرنامج فوراً" : "Télécharger & Installer l'Application"}</span>
                  </a>
                </div>
              </div>

              {/* Option B: 3-Part Installment Plan (31,000 DA) */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-pink-500/50 bg-[var(--bg-card)] dark:bg-[#111B21] p-8 shadow-xl flex flex-col justify-between">
                <div className="absolute top-0 right-0 bg-pink-600 text-white text-xs font-black uppercase px-6 py-2 rounded-bl-2xl tracking-wider shadow-sm flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 fill-current" />
                  <span>{isAr ? "تسهيلات الدفع (على 3 دفعات)" : "Facilités en 3 Mensualités"}</span>
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-bold">
                    <span>{isAr ? "الخيار 2: التقسيط المريح على شهرين (+1,000 دج لكل دفعة)" : "Option 2 : Échelonnement sur 2 Mois (+1 000 DA / part)"}</span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    {isAr ? "الدفع الميسر في 3 أجزاء" : "Paiement en 3 Tranches"}
                  </h3>

                  <div className="py-2">
                    <div dir="ltr" className="inline-flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black font-mono text-pink-600 dark:text-pink-400">
                        31,000
                      </span>
                      <span className="text-xl font-bold text-slate-700 dark:text-slate-200">{isAr ? "دج" : "DA"}</span>
                      <span className="text-xs text-[var(--text-muted)] ms-2">{isAr ? "الإجمالي النهائي" : "Total Final"}</span>
                    </div>
                    <p className="text-xs font-semibold text-pink-600 dark:text-pink-400 mt-1">
                      {isAr ? "(3.1 ملايين سنتيم — مقسمة على 3 مراحل مريحة)" : "(3,1 Millions de Centimes — Répartis sur 2 mois)"}
                    </p>
                  </div>

                  {/* 3 Steps Schedule Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0D151A] border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200 dark:border-slate-800">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {isAr ? "📌 الدفعة 1 (عند التثبيت والاستلام):" : "📌 Part 1 (À l'installation & remise) :"}
                      </span>
                      <span dir="ltr" className="font-black font-mono text-pink-600 dark:text-pink-400 text-sm">
                        11,000 {isAr ? "دج" : "DA"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200 dark:border-slate-800">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {isAr ? "📌 الدفعة 2 (بعد مرور 1 شهر):" : "📌 Part 2 (Après 1 mois) :"}
                      </span>
                      <span dir="ltr" className="font-black font-mono text-slate-900 dark:text-white text-sm">
                        10,000 {isAr ? "دج" : "DA"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {isAr ? "📌 الدفعة 3 (بعد مرور 2 شهرين):" : "📌 Part 3 (Après 2 mois) :"}
                      </span>
                      <span dir="ltr" className="font-black font-mono text-slate-900 dark:text-white text-sm">
                        10,000 {isAr ? "دج" : "DA"}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                      <span>{isAr ? "إجمالي المبلغ النهائي: 31,000 دج شاملة لكافة الرسوم" : "Montant global : 31 000 DA tout inclus"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                      <span>{isAr ? "تجديد الكود الشهري تلقائياً عند سداد كل دفعة" : "Clé mensuelle renouvelée à chaque versement"}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-border">
                  <a
                    href="/downloads/sheymss-vip-setup.exe"
                    download="sheymss-vip-setup.exe"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm shadow-md shadow-pink-500/20 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isAr ? "تحميل وبدء التجربة المجانية" : "Télécharger & Essayer Gratuitement"}</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 2: COMPLETE APP FEATURES & SCREENS BREAKDOWN */}
          {/* ========================================================================= */}
          <div id="features-list" className="mb-20 scroll-mt-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 text-xs font-bold uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4" />
                <span>{isAr ? "دليل الشاشات والوظائف البرمجية الكاملة" : "Architecture Complète des Écrans & Modules"}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-[var(--font-display)] text-slate-900 dark:text-white">
                {isAr ? "كل ما يحتويه البرنامج من وظائف وشاشات" : "Fonctionnalités Exhaustives du Logiciel SHEYMSS"}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-2xl mx-auto">
                {isAr
                  ? "تم بناء كل شاشة بأعلى معايير الدقة والسرعة لتسهيل العمل اليومي لإدارة متجر وتجارة الجملة"
                  : "Chaque écran a été conçu sur mesure pour une utilisation fluide, ergonomique et ultra-rapide"}
              </p>
            </div>

            {/* 10 Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* 1. Dashboard */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-[var(--bg-card)] dark:bg-[#111B21] shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isAr ? "1. لوحة التحكم والإحصائيات الحية (Dashboard)" : "1. Tableau de Bord & KPIs en Temps Réel"}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {isAr
                    ? "إحصائيات فورية للأرباح الصافية، إجمالي المبيعات، مؤشرات الديون غير المحصلة، جرس التنبيهات للأقساط المتأخرة، وتدفق العمليات اليومية في الزمن الحقيقي."
                    : "Métriques instantanées du chiffre d'affaires, bénéfice net, créances clients, cloche d'alerte pour les échéances en retard et historique des activités."}
                </p>
              </div>

              {/* 2. Products Catalog */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-[var(--bg-card)] dark:bg-[#111B21] shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isAr ? "2. كتالوج منتجات الأظافر (Press-on Nails)" : "2. Catalogue Produits Grossiste (Press-on Nails)"}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {isAr
                    ? "إدارة 3 فئات رئيسية (Press-on Nails Main, Press-on Nails Pied, Kits Main et Pied)، مع أسعار الجملة، حساب أوتوماتيكي لسعر التجزئة والكميات، وتخزين الصور بجودة عالية."
                    : "Gestion des 3 catégories officielles avec galeries photos HD, prix de gros dynamiques, calcul automatique des marges et gestion des références SKU."}
                </p>
              </div>

              {/* 3. Raw Materials Stock */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-[var(--bg-card)] dark:bg-[#111B21] shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                  <Box className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isAr ? "3. مخزون المواد الأولية والتغليف (Packaging)" : "3. Stock Matières Premières & Packaging"}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {isAr
                    ? "تتبع دقيق للكبسولات الشفافة، غراء الفرشاة، اللواصق السيليكونية (Pads)، العلب الأكريليكية الشفافة، وعلب الهدايا المخملية مع تنبيهات عند اقتراب نفاد المخزون."
                    : "Suivi des capsules vierges, colle pinceau, pads adhésifs, boîtes acryliques et coffrets velours luxe avec alertes visuelles de seuil critique."}
                </p>
              </div>

              {/* 4. Vernis Matrix */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-[var(--bg-card)] dark:bg-[#111B21] shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                  <Palette className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isAr ? "4. تتبع قارورات طلاء الأظافر الفردية (Vernis UV Tracker)" : "4. Matrice & Traçabilité des Vernis UV/LED"}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {isAr
                    ? "نظام فريد لتتبع قارورات الـ Vernis كل وحدة على حدة برقم فردي (#001 إلى #012) ولون ودرجة صبغة مخصصة لتفادي ضياع الألوان والتحكم الكامل في الاستهلاك."
                    : "Traçabilité unitaire de chaque flacon de vernis UV par numéro (#001 à #012) et nuance de couleur pour une gestion zéro perte des teintes."}
                </p>
              </div>

              {/* 5. 5-Stage Order Pipeline */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-[var(--bg-card)] dark:bg-[#111B21] shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isAr ? "5. خط معالجة الطلبيات في 5 مراحل (Order Pipeline)" : "5. Pipeline de Traitement des Commandes (5 Étapes)"}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {isAr
                    ? "دورة حياة محكمة للطلبية: (مسودة ➔ مؤكدة ➔ جاهزة للتسليم ➔ مرسلة مع الشاحن ➔ مستلمة)، مع سجل تتبع زمني للمراحل وتجميد الأسعار لحماية الأرباح."
                    : "Machine d'état en 5 étapes (Brouillon ➔ Confirmée ➔ Prête ➔ Expédiée ➔ Livrée) avec journal d'audit chronologique et figeage des prix."}
                </p>
              </div>

              {/* 6. Universal Multi-Carrier Thermal Shipping Labels */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-[var(--bg-card)] dark:bg-[#111B21] shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                  <Printer className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isAr ? "6. ملصقات الشحن وتوصيل الطرود لجميع مكاتب التوصيل (10x15 سم لـ 58 ولاية)" : "6. Étiquettes Thermiques Multi-Transporteurs (10x15 cm - 58 Wilayas)"}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {isAr
                    ? "توليد فوري لبوالص وملصقات الشحن وتوصيل الطرود المتوافقة مع كافة مكاتب وشركات التوصيل (ZR Express, Yalidine, Maystro, Kazitour, Procolis): باركود 128 ديناميكي، رمز الاستجابة السريعة QR، توجيه تلقائي لـ 58 ولاية، ونوع التوصيل (منزل/مكتب)."
                    : "Générateur universel conforme aux standards de livraison (ZR Express, Yalidine, Maystro, etc.) : Code 128, QR code dynamique, routage 58 Wilayas et distinction Domicile / Stopdesk."}
                </p>
              </div>

              {/* 7. Installments & Dual Finance */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-[var(--bg-card)] dark:bg-[#111B21] shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isAr ? "7. محرك الأقساط والدفع المزدوج (Échéanciers & Dettes)" : "7. Moteur d'Échéances & Gestion des Crédits"}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {isAr
                    ? "تقسيم المدفوعات على 1 إلى 5 أقساط شهرية، تتبع المدفوعات الجزئية، مطابقة المبالغ مع حسابات بريدي موب، CCP، نقداً، وتنبيهات فورية عند تأخر استحقاق أي قسط."
                    : "Échéanciers paramétrables (1 à 5 mensualités), gestion des acomptes, réconciliation des paiements BaridiMob / CCP / Espèces et alertes d'impayés."}
                </p>
              </div>

              {/* 8. Suppliers & Purchasing History */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-[var(--bg-card)] dark:bg-[#111B21] shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isAr ? "8. دليل الموردين وتتبع أسعار الشراء السابقة (Fournisseurs & Historique)" : "8. Répertoire Fournisseurs & Historique des Prix d'Achat"}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {isAr
                    ? "سجل متكامل لموردي ومستوردي المواد الأولية والأظافر في مختلف الولايات، مع تتبع التغيرات التاريخية لأسعار الشراء وسجل التوريدات لضمان أعلى هوامش ربح."
                    : "Répertoire complet des fournisseurs et importateurs de matières premières, avec historique d'évolution des prix d'achat et suivi des approvisionnements."}
                </p>
              </div>

              {/* 9. Client CRM */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-[var(--bg-card)] dark:bg-[#111B21] shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isAr ? "9. دليل الصالونات والزبائن (Client CRM & Boutiques)" : "9. Répertoire Salons & Historique d'Achats (CRM)"}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {isAr
                    ? "سجل شامل لصالونات التجميل في 58 ولاية، تتبع إجمالي المشتريات، رصيد الديون المفتوح، روابط إنستغرام، ومعلومات الاتصال المباشرة."
                    : "Fiches détaillées des salons et revendeurs par Wilaya, suivi de l'encours financier, liens réseaux sociaux et historique d'achats."}
                </p>
              </div>

              {/* 10. Security & 100% Offline */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-[var(--bg-card)] dark:bg-[#111B21] shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isAr ? "10. أمان فائق وتشغيل محلي بدون إنترنت (100% Offline)" : "10. Sécurité Maximale & 100% Hors-Ligne"}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {isAr
                    ? "قاعدة بيانات محلية مشفرة وسريعة للغاية، تعمل باستقلالية تامة بدون إنترنت، مع حماية أمنية مشددة ضد التلاعب بالتاريخ والوقت وقفل رقمي للأجهزة."
                    : "Base de données locale ultra-rapide, zéro dépendance internet, protection anti-recul d'horloge et liaison cryptographique HWID."}
                </p>
              </div>

              {/* 11. Custom Theme & Logo on Demand */}
              <div className="p-6 rounded-3xl border-2 border-pink-500/30 bg-gradient-to-br from-pink-500/10 via-[var(--bg-card)] to-[var(--bg-card)] dark:from-pink-950/25 dark:via-[#111B21] dark:to-[#111B21] shadow-xs space-y-3 md:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/15 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                  <Palette className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isAr ? "11. تخصيص الثيم والشعار مجاناً عند الشراء" : "11. Thème & Logo Personnalisés à l'Achat"}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {isAr
                    ? "عند شراء نسخة خاصة بك انت يا عزيزي الزبون نغير لك theme لون التطبيق و لوغو لى حسب الطلب لتناسب علامتك التجارية تماماً."
                    : "À l'achat de votre version, nous adaptons le thème (couleurs) et le logo selon votre demande pour correspondre parfaitement à votre identité de marque."}
                </p>
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 3: DOWNLOAD APP & QUICK INSTALL */}
          {/* ========================================================================= */}
          <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl border-2 border-pink-500/30 bg-gradient-to-b from-pink-500/10 via-[var(--bg-card)] to-[var(--bg-card)] dark:from-pink-950/20 dark:via-[#111B21] dark:to-[#111B21] shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-pink-500/15 text-pink-600 dark:text-pink-400 flex items-center justify-center mx-auto shadow-xs">
              <Download className="w-8 h-8 animate-bounce" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-[var(--font-display)] text-slate-900 dark:text-white">
              {isAr ? "جاهز لبدء تنظيم وتطوير مبيعاتك اليوم؟" : "Prêt à booster et organiser votre activité ?"}
            </h2>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
              {isAr
                ? "حمّل النسخة الكاملة لويندوز الآن واستفد من 7 أيام تجربة مجانية لكافة الميزات المتقدمة وطباعة بوالص الشحن بدون أي التزام."
                : "Téléchargez la version complète pour Windows dès maintenant et profitez de 7 jours d'essai gratuit avec toutes les fonctionnalités débloquées."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="/downloads/sheymss-vip-setup.exe"
                download="sheymss-vip-setup.exe"
                className="px-8 py-4 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-black text-sm shadow-lg shadow-pink-500/25 flex items-center gap-2.5 transition-all cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>{isAr ? "تحميل التطبيق للكمبيوتر (99 MB)" : "Télécharger SHEYMSS pour Windows (99 MB)"}</span>
              </a>

              <Link
                href="/nails_app_dowload"
                className="px-8 py-4 rounded-2xl border border-pink-500/30 bg-[var(--bg-card)] hover:bg-pink-500/5 text-pink-600 dark:text-pink-400 font-bold text-sm flex items-center gap-2.5 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAr ? "صفحة التحميل ودليل التثبيت" : "Guide d'Installation & Détails"}</span>
              </Link>
            </div>

            <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-[var(--text-muted)] font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>{isAr ? "تثبيت آمن وسريع • Windows 10 / 11 (64-bit)" : "Installation sécurisée • Windows 10 / 11"}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-pink-500" />
                <span>{isAr ? "الدعم الفني: صالون ديزاد تك" : "Support technique : Salon DZ Tech"}</span>
              </span>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
