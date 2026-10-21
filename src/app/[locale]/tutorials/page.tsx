import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Video,
  ArrowLeft,
  BookOpen,
  Sparkles,
  Laptop,
  CreditCard,
  MessageSquareCode,
  PlayCircle,
  Clock,
  Lock
} from "lucide-react";
import { Link } from "@/i18n/routing";

export default async function TutorialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-24 sm:pt-28 pb-20 z-10">
        <TutorialsContent locale={locale} />
      </main>
      <Footer />
    </>
  );
}

function TutorialsContent({ locale }: { locale: string }) {
  const t = useTranslations("tutorialsPage");

  const modules = [
    {
      icon: Laptop,
      badge: locale === "ar" ? "الدرس 01" : locale === "fr" ? "Leçon 01" : "Lesson 01",
      duration: "10:25",
      title:
        locale === "ar"
          ? "الإعداد الأولي للصالون وقائمة الخدمات"
          : locale === "fr"
          ? "Configuration initiale et services"
          : "Initial Salon Setup & Services",
      desc:
        locale === "ar"
          ? "كيفية إضافة فئات الخدمات، تسعير قصات الشعر، وضبط إعدادات الصالون والموظفين لأول مرة بسهولة."
          : locale === "fr"
          ? "Ajout des catégories de soins, tarification des prestations et configuration de votre salon."
          : "Adding service categories, haircut pricing, and configuring your salon settings and barbers.",
    },
    {
      icon: CreditCard,
      badge: locale === "ar" ? "الدرس 02" : locale === "fr" ? "Leçon 02" : "Lesson 02",
      duration: "14:50",
      title:
        locale === "ar"
          ? "شاشة الكاشير وتسجيل المبيعات اليومية"
          : locale === "fr"
          ? "Caisse et encaissements quotidiens"
          : "POS Cashier & Daily Checkout",
      desc:
        locale === "ar"
          ? "طريقة اختيار الحلاق، إضافة الخدمات للزبون، طباعة الوصلات، واحتساب عمولات العمال التلقائية."
          : locale === "fr"
          ? "Sélection du coiffeur, encaissement rapide, impression de tickets et calcul automatique des commissions."
          : "Selecting barbers, fast checkout, receipt printing, and automated staff commission tracking.",
    },
    {
      icon: MessageSquareCode,
      badge: locale === "ar" ? "الدرس 03" : locale === "fr" ? "Leçon 03" : "Lesson 03",
      duration: "12:15",
      title:
        locale === "ar"
          ? "ربط وتفعيل بوت واتساب الذكي التلقائي"
          : locale === "fr"
          ? "Intégration et bot WhatsApp intelligent"
          : "WhatsApp Smart Bot & Auto-Booking",
      desc:
        locale === "ar"
          ? "مسح كود QR، تشغيل الرد الآلي وتأكيد المواعيد للزبائن على مدار 24 ساعة دون أي تدخل بشري."
          : locale === "fr"
          ? "Scan QR code, automatisation des réponses et confirmation des rendez-vous clients 24h/24."
          : "Connecting via QR code, automated client replies, and 24/7 calendar appointment bookings.",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Radial emerald atmospheric glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(37,211,102,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Main Hero Showcase Card */}
      <div className="apple-card apple-specular-edge rounded-3xl p-8 sm:p-12 md:p-14 shadow-2xl border border-black/[0.08] dark:border-white/[0.12] text-center relative overflow-hidden mb-14">
        {/* Floating Liquid Glass Video Squircle */}
        <div className="mx-auto w-20 h-20 mb-6 rounded-3xl apple-glass border border-brand-green/30 flex items-center justify-center text-brand-green shadow-xl">
          <Video className="w-9 h-9" />
        </div>

        {/* Apple Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass border-black/[0.06] dark:border-white/[0.1] text-brand-green text-xs font-semibold tracking-tight shadow-xs mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{t("comingSoon")}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] font-[var(--font-display)] tracking-tight mb-4">
          {t("title")}
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-8">
          {t("desc")}
        </p>

        {/* Action Buttons in Apple HIG Style */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Button
            size="lg"
            className="apple-btn-primary apple-press font-bold h-12 px-8 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              <span>{t("backHome")}</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="apple-card apple-press font-semibold h-12 px-7 rounded-2xl text-sm border-black/[0.08] dark:border-white/[0.1] hover:border-brand-green/50 text-foreground cursor-pointer flex items-center justify-center gap-2"
            asChild
          >
            <Link href="/guide">
              <BookOpen className="h-4 w-4 text-brand-green" />
              <span>
                {locale === "ar"
                  ? "دليل المستخدم PDF"
                  : locale === "fr"
                  ? "Guide d'utilisation PDF"
                  : "User Guide PDF"}
              </span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Curriculum Preview Section */}
      <div className="mt-8 mb-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full apple-glass text-xs font-semibold text-brand-green mb-2 border border-black/[0.06] dark:border-white/[0.08]">
            <PlayCircle className="h-3.5 w-3.5" />
            <span>
              {locale === "ar"
                ? "محتوى السلسلة المرئية"
                : locale === "fr"
                ? "Contenu de la formation"
                : "Course Curriculum"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-display)] text-[var(--text-primary)] tracking-tight">
            {locale === "ar"
              ? "ما ستتعلمه في هذه السلسلة"
              : locale === "fr"
              ? "Ce que vous allez apprendre"
              : "What you will learn"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="apple-card apple-press apple-specular-edge group p-6 sm:p-7 rounded-3xl border border-black/[0.08] dark:border-white/[0.1] hover:border-brand-green/50 transition-all duration-300 shadow-sm hover:shadow-xl relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex p-3 rounded-2xl apple-glass text-brand-green border border-brand-green/30 shadow-xs">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full apple-glass text-[11px] font-semibold text-[var(--text-secondary)] border border-black/[0.06] dark:border-white/[0.08]">
                      <Clock className="h-3 w-3 text-brand-green" />
                      <span>{m.duration}</span>
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-brand-green uppercase tracking-wider block mb-1">
                    {m.badge}
                  </span>

                  <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-brand-green transition-colors font-[var(--font-display)] leading-snug">
                    {m.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-brand-green">
                    <Sparkles className="h-3 w-3" />
                    <span>
                      {locale === "ar"
                        ? "فيديو عالي الجودة HD"
                        : locale === "fr"
                        ? "Vidéo HD 1080p"
                        : "Full HD 1080p"}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    <span>
                      {locale === "ar" ? "قريباً" : locale === "fr" ? "Bientôt" : "Soon"}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
