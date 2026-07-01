import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Pricing from "@/components/sections/Pricing";
import { Button } from "@/components/ui/button";
import { Download, Sparkles, ShieldCheck, AlertCircle } from "lucide-react";
import Image from "next/image";

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 bg-[var(--bg-primary)] dark:bg-[#0A0F0D]">
        <DownloadContent />
      </main>
      <Footer />
    </>
  );
}

// Client container for translations & animation
function DownloadContent() {
  const t = useTranslations("downloadPage");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-[var(--font-display)] text-[var(--text-primary)]">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Recommendation Notice */}
      <div className="max-w-3xl mx-auto mb-16 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-700 dark:text-amber-300 text-sm font-semibold flex items-center justify-center gap-2.5 text-center shadow-2xs">
        <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
        <p>{t("androidNote")}</p>
      </div>

      {/* OS Section: Windows (PC) */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8 p-3 rounded-2xl bg-brand-green/5 dark:bg-brand-green/10 border border-brand-green/20 shadow-2xs max-w-fit pr-6 pl-3 rtl:pl-6 rtl:pr-3">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-slate-950 p-1.5 flex items-center justify-center shadow-xs shrink-0">
            <Image
              src="/icons8-windows-11-480.png"
              alt="Windows 11"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-black font-[var(--font-display)] text-slate-800 dark:text-slate-100 leading-none whitespace-nowrap">
              {t("windowsSectionTitle")}
            </h2>
            <p className="text-[10px] sm:text-xs text-brand-green font-semibold mt-1">Windows 10 / 11</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* VIP Card (Free Trial) */}
          <div className="relative overflow-hidden rounded-2xl border border-brand-green/30 bg-[var(--bg-card)] dark:bg-[#111B21] p-8 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 bg-brand-green text-white dark:text-[#111B21] text-xs font-extrabold uppercase px-4 py-1.5 rounded-bl-xl tracking-wider flex items-center gap-1">
              <Sparkles className="h-3 w-3 fill-current" />
              <span>Recommended</span>
            </div>

            <h3 className="text-2xl font-bold font-[var(--font-display)] text-[var(--text-primary)] flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-brand-green" />
              {t("vipTitle")}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 min-h-[80px]">
              {t("vipDesc")}
            </p>

            <Button size="lg" className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-bold h-12" asChild>
              <a href={t("downloadLinkVip")}>
                <Download className="h-5 w-5" />
                {t("vipCta")}
              </a>
            </Button>
          </div>

          {/* Standard Card */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-[var(--bg-card)] dark:bg-[#111B21] p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-bold font-[var(--font-display)] text-[var(--text-primary)] flex items-center gap-2 mb-4">
              <ShieldCheck className="h-6 w-6 text-[var(--text-muted)]" />
              {t("standardTitle")}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 min-h-[80px]">
              {t("standardDesc")}
            </p>

            <Button size="lg" variant="outline" className="w-full h-12 border-border font-bold text-[var(--text-primary)]" asChild>
              <a href={t("downloadLinkStandard")}>
                <Download className="h-5 w-5" />
                {t("standardCta")}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* OS Section: Android (Tablets & Phones) */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8 p-3 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 shadow-2xs max-w-fit pr-6 pl-3 rtl:pl-6 rtl:pr-3">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-slate-950 p-1 flex items-center justify-center shadow-xs shrink-0">
            <Image
              src="/Google_Play-Icon-Logo.wine.png"
              alt="Android Google Play"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-black font-[var(--font-display)] text-slate-800 dark:text-slate-100 leading-none whitespace-nowrap">
              {t("androidSectionTitle")}
            </h2>
            <p className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">{t("comingSoonBadge")}</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-[var(--bg-card)] dark:bg-[#111B21] p-8 md:p-12 shadow-md hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-center">
            {/* Background glowing effects */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-500/10 p-4 flex items-center justify-center mb-6 border border-emerald-500/25 shadow-xs shrink-0">
              <Image
                src="/Google_Play-Icon-Logo.wine.png"
                alt="Android Google Play"
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>

            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 mb-4 animate-pulse">
              <Sparkles className="h-3.5 w-3.5 fill-current text-emerald-500" />
              <span>{t("comingSoonBadge")}</span>
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold font-[var(--font-display)] text-[var(--text-primary)] mb-4">
              {t("androidComingSoonTitle")}
            </h3>
            
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl mb-6">
              {t("androidComingSoonDesc")}
            </p>

            <div className="text-[11px] sm:text-xs text-[var(--text-muted)] font-medium bg-[var(--bg-primary)] dark:bg-slate-900/50 px-4 py-2 rounded-xl border border-border">
              {t("androidComingSoonNote")}
            </div>
          </div>
        </div>
      </div>

      {/* Separator Heading for Pricing */}
      <div className="relative my-16 text-center">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[var(--bg-primary)] dark:bg-[#0A0F0D] px-6 text-xl font-bold font-[var(--font-display)] text-[var(--text-primary)]">
            {t("pricingTitle")}
          </span>
        </div>
      </div>

      {/* Pricing component */}
      <div className="rounded-2xl overflow-hidden bg-transparent">
        <Pricing />
      </div>
    </div>
  );
}
