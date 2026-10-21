import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Pricing from "@/components/sections/Pricing";
import { Button } from "@/components/ui/button";
import { Download, Sparkles, ShieldCheck, AlertCircle, Laptop } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

// Placeholder variable for Microsoft Store URL.
const MICROSOFT_STORE_URL = "";

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
      <main className="relative min-h-screen pt-24 sm:pt-28 pb-16 z-10">
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
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      {/* Radial emerald atmospheric glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(37,211,102,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass border-black/[0.06] dark:border-white/[0.1] text-brand-green text-xs font-semibold tracking-tight shadow-xs mb-4">
          <Download className="h-3.5 w-3.5" />
          <span>salondztech Installer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-[var(--font-display)] text-[var(--text-primary)] mb-3">
          {t("title")}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Recommendation Notice in Apple Card Style */}
      <div className="max-w-3xl mx-auto mb-14 p-4 rounded-2xl apple-card border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-3 text-center shadow-xs">
        <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
        <p>{t("androidNote")}</p>
      </div>

      {/* OS Section: Windows (PC) */}
      <div className="mb-20">
        <div className="flex items-center gap-3.5 mb-8 p-3 rounded-2xl apple-glass border border-black/[0.06] dark:border-white/[0.08] shadow-xs max-w-fit px-5">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl apple-card p-1.5 flex items-center justify-center shadow-xs shrink-0">
            <Image
              src="/icons8-windows-11-480.png"
              alt="Windows 11"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-sm xs:text-base sm:text-lg font-bold font-[var(--font-display)] text-foreground leading-none whitespace-nowrap">
              {t("windowsSectionTitle")}
            </h2>
            <p className="text-[10px] sm:text-xs text-brand-green font-semibold mt-1">Windows 10 / 11</p>
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 max-w-4xl mx-auto items-stretch">
          {/* VIP Card (Free Trial) - Apple Highlighted Card */}
          <div className="apple-card apple-specular-edge p-7 sm:p-8 rounded-3xl relative overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-brand-green/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full apple-glass text-[10px] text-brand-green font-bold tracking-wider uppercase border border-brand-green/20">
                  <Laptop className="h-3 w-3" />
                  <span>VIP PRO EDITION</span>
                </span>
                <div className="bg-gradient-to-r from-emerald-600 via-[#25d366] to-emerald-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider flex items-center gap-1 shadow-md shadow-brand-green/25">
                  <Sparkles className="h-3 w-3 fill-current" />
                  <span>Recommended</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-[var(--font-display)] text-foreground flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-brand-green shrink-0" />
                <span>{t("vipTitle")}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
                {t("vipDesc")}
              </p>
            </div>

            <WindowsDownloadSection exeUrl={t("downloadLinkVip")} ctaText={t("vipCta")} variant="default" />
          </div>

          {/* Standard Card - Apple Card */}
          <div className="apple-card apple-specular-edge p-7 sm:p-8 rounded-3xl relative overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 border border-black/[0.08] dark:border-white/[0.1] hover:border-brand-green/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full apple-glass text-[10px] text-[var(--text-muted)] font-bold tracking-wider uppercase border border-black/[0.06] dark:border-white/[0.08]">
                  <ShieldCheck className="h-3 w-3" />
                  <span>CORE STANDARD</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-[var(--font-display)] text-foreground flex items-center gap-2 mb-3">
                <ShieldCheck className="h-5 w-5 text-brand-green shrink-0" />
                <span>{t("standardTitle")}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
                {t("standardDesc")}
              </p>
            </div>

            <WindowsDownloadSection exeUrl={t("downloadLinkStandard")} ctaText={t("standardCta")} variant="outline" />
          </div>
        </div>

        {/* SHEYMSS Press-on Nails Special App Card */}
        <div className="apple-card apple-specular-edge mt-8 max-w-4xl mx-auto overflow-hidden rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative group border border-pink-500/25 hover:border-pink-500/40 transition-all duration-300">
          <div className="flex items-center gap-4 text-center sm:text-start rtl:sm:text-right">
            <div className="w-14 h-14 rounded-2xl apple-glass border border-pink-500/30 p-2.5 flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-7 h-7 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-pink-500/15 text-pink-600 dark:text-pink-400 text-[10px] font-extrabold uppercase tracking-wider">
                  {t("nailsBadge") || "Édition Spéciale Grossiste"}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-600 text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                  v2.1.0 Update
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold font-[var(--font-display)] text-foreground">
                {t("nailsTitle") || "Application SHEYMSS — Gestion Press-on Nails & Beauté"}
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-xl leading-relaxed">
                {t("nailsDesc") || "Logiciel Windows complet pour la gestion des commandes, stock capsules & vernis UV, et étiquettes colis ZR Express 58 Wilayas."}
              </p>
            </div>
          </div>
          <Button asChild className="shrink-0 bg-pink-600 hover:bg-pink-500 text-white apple-press font-bold px-6 h-12 rounded-2xl shadow-lg shadow-pink-500/25">
            <Link href="/nails_app_dowload" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>{t("nailsCta") || "Télécharger SHEYMSS (Windows)"}</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* OS Section: Android (Tablets & Phones) */}
      <div className="mb-20">
        <div className="flex items-center gap-3.5 mb-8 p-3 rounded-2xl apple-glass border border-black/[0.06] dark:border-white/[0.08] shadow-xs max-w-fit px-5">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl apple-card p-1 flex items-center justify-center shadow-xs shrink-0">
            <Image
              src="/Google_Play-Icon-Logo.wine.png"
              alt="Android Google Play"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-sm xs:text-base sm:text-lg font-bold font-[var(--font-display)] text-foreground leading-none whitespace-nowrap">
              {t("androidSectionTitle")}
            </h2>
            <p className="text-[10px] sm:text-xs text-brand-green font-semibold mt-1">{t("comingSoonBadge")}</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl apple-card apple-specular-edge border border-emerald-500/25 p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 text-center flex flex-col items-center justify-center">
            {/* Ambient green lighting */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl apple-glass p-3 flex items-center justify-center mb-6 border border-emerald-500/25 shadow-xs shrink-0">
              <Image
                src="/Google_Play-Icon-Logo.wine.png"
                alt="Android Google Play"
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>

            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider apple-glass text-brand-green border border-brand-green/25 mb-4 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 fill-current text-brand-green" />
              <span>{t("comingSoonBadge")}</span>
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold font-[var(--font-display)] text-foreground mb-3">
              {t("androidComingSoonTitle")}
            </h3>
            
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl mb-6">
              {t("androidComingSoonDesc")}
            </p>

            <div className="text-[11px] sm:text-xs text-[var(--text-muted)] font-medium apple-glass px-4 py-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08]">
              {t("androidComingSoonNote")}
            </div>
          </div>
        </div>
      </div>

      {/* Separator Heading for Pricing */}
      <div className="relative my-16 text-center">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-black/[0.08] dark:border-white/[0.1]" />
        </div>
        <div className="relative flex justify-center">
          <span className="apple-card px-6 py-2 rounded-full text-lg sm:text-xl font-bold font-[var(--font-display)] text-foreground border border-black/[0.08] dark:border-white/[0.1] shadow-xs">
            {t("pricingTitle")}
          </span>
        </div>
      </div>

      {/* Pricing component */}
      <div className="rounded-3xl overflow-hidden bg-transparent">
        <Pricing />
      </div>
    </div>
  );
}

// Custom component to dynamically toggle between a single download button and double (EXE + Store) download options
function WindowsDownloadSection({ 
  exeUrl, 
  ctaText, 
  variant = "default" 
}: { 
  exeUrl: string; 
  ctaText: string; 
  variant?: "default" | "outline";
}) {
  if (!MICROSOFT_STORE_URL) {
    return (
      <Button 
        size="lg" 
        className={
          variant === "default" 
            ? "w-full apple-btn-primary apple-press font-bold h-12 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg text-sm" 
            : "w-full apple-card apple-press font-bold h-12 rounded-2xl border-black/[0.08] dark:border-white/[0.1] hover:border-brand-green/50 text-foreground flex items-center justify-center gap-2 cursor-pointer text-sm"
        } 
        variant={variant === "outline" ? "outline" : "default"} 
        asChild
      >
        <a href={exeUrl}>
          <Download className="h-4 w-4 shrink-0" />
          <span>{ctaText}</span>
        </a>
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-6">
      {/* Option 1: Direct Executable Installer */}
      <div className="flex flex-col gap-2">
        <Button 
          size="lg" 
          className={
            variant === "default" 
              ? "w-full apple-btn-primary apple-press font-bold h-12 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg text-sm" 
              : "w-full apple-card apple-press font-bold h-12 rounded-2xl border-black/[0.08] dark:border-white/[0.1] hover:border-brand-green/50 text-foreground flex items-center justify-center gap-2 cursor-pointer text-sm"
          } 
          variant={variant === "outline" ? "outline" : "default"} 
          asChild
        >
          <a href={exeUrl}>
            <Download className="h-4 w-4 shrink-0" />
            <span>Download Installer (.exe)</span>
          </a>
        </Button>
        <span className="text-[11px] text-[var(--text-secondary)] text-center font-medium leading-normal">
          Recommended if you prefer installing directly from our website.
        </span>
      </div>

      {/* Decorative Separator */}
      <div className="relative flex py-1 items-center justify-center">
        <div className="flex-grow border-t border-black/[0.06] dark:border-white/[0.08]"></div>
        <span className="flex-shrink mx-3 text-[10px] font-bold tracking-wider text-[var(--text-muted)] uppercase">OR</span>
        <div className="flex-grow border-t border-black/[0.06] dark:border-white/[0.08]"></div>
      </div>

      {/* Option 2: Microsoft Store Installation */}
      <div className="flex flex-col gap-2">
        <a
          href={MICROSOFT_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full h-12 px-6 rounded-2xl bg-black hover:bg-slate-900 text-white font-bold border border-slate-800 transition-all shadow-xs hover:shadow-md cursor-pointer apple-press"
        >
          <svg className="w-4.5 h-4.5 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
          </svg>
          <span className="text-sm font-semibold tracking-wide">Get it from Microsoft Store</span>
        </a>
        <span className="text-[11px] text-[var(--text-secondary)] text-center font-medium leading-normal">
          Install securely through Microsoft Store with trusted Windows installation.
        </span>
      </div>
    </div>
  );
}
