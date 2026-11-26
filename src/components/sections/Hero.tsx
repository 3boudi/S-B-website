"use client";
// Design intent: Full-viewport hero with immediate SSR-visible text and interactive 3D isometric salon simulation.
// Layout: Two-column on desktop (text start, enlarged 3D salon end), clean ergonomic stack on mobile.
// Accessibility: semantic headings, 48px+ mobile thumb CTAs, zero invisible first-paint delay.

import { useTranslations } from "next-intl";
import { ShoppingCart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuyModal } from "@/components/ui/BuyModal";
import { Link } from "@/i18n/routing";
import SalonSimulation3D from "@/components/hero/SalonSimulation3D";

export default function Hero() {
  const t = useTranslations("hero");
  const { openModal } = useBuyModal();

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-20 pb-8 sm:pt-24 sm:pb-12 lg:py-0 scroll-mt-20"
    >
      {/* Hairline Grid Background */}
      <div className="absolute inset-0 hairline-grid opacity-35 pointer-events-none" />
      <div
        className="absolute inset-0 dark:block hidden pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 75% 20%, rgba(37,211,102,0.18) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 dark:hidden block pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 75% 20%, rgba(37,211,102,0.1) 0%, transparent 60%)",
        }}
      />

      {/* Decorative Hairline Guide Lines */}
      <div className="absolute top-0 left-1/4 bottom-0 w-[1px] bg-black/[0.04] dark:bg-white/[0.04] pointer-events-none hidden lg:block" />
      <div className="absolute top-0 right-1/4 bottom-0 w-[1px] bg-black/[0.04] dark:bg-white/[0.04] pointer-events-none hidden lg:block" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:py-20 z-10 w-full">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-6 items-center">
          {/* Text Column — immediately visible on SSR & mobile first paint */}
          <div className="space-y-4 sm:space-y-5 text-start">
            <div className="inline-flex items-center max-w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full apple-glass border-black/[0.06] dark:border-white/[0.1] text-[11px] sm:text-xs font-semibold text-foreground tracking-tight shadow-xs">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                </span>
                <span className="leading-snug">{t("badge")}</span>
              </div>
            </div>

            <h1 className="text-[1.85rem] leading-[1.16] font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl font-[var(--font-display)] text-[var(--text-primary)] lg:leading-[1.12]">
              {t("title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-emerald-400 to-teal-300">
                {t("titleHighlight")}
              </span>
            </h1>

            <p className="max-w-xl text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
              {t("subtitle")}
            </p>

            {/* Ergonomic Thumb-Ready CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Button
                size="lg"
                className="apple-btn-primary apple-press font-bold px-6 sm:px-8 h-12 sm:h-12 rounded-2xl text-sm flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0"
                asChild
              >
                <Link
                  href="/download"
                  className="flex items-center justify-center gap-2.5 whitespace-nowrap"
                >
                  <Download className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">{t("downloadApp")}</span>
                </Link>
              </Button>
              <button
                type="button"
                className="apple-card apple-press hover:border-brand-green/50 font-bold px-6 sm:px-7 h-12 sm:h-12 rounded-2xl text-sm flex items-center justify-center gap-2 text-foreground cursor-pointer whitespace-nowrap shrink-0"
                onClick={() => openModal()}
              >
                <ShoppingCart className="h-4 w-4 text-brand-green shrink-0" />
                <span className="whitespace-nowrap">{t("buyNow")}</span>
              </button>
            </div>

            {/* Trust Micro-Metrics */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full apple-glass border-black/[0.05] dark:border-white/[0.07] text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>WhatsApp Bot AI</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full apple-glass border-black/[0.05] dark:border-white/[0.07] text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                <span>Windows 10 / 11 Native</span>
              </span>
            </div>
          </div>

          {/* Visual Column: Live 3D Isometric Salon Shop Simulation */}
          <div className="relative w-full flex items-center justify-center pt-2 sm:py-4 lg:py-0">
            <div className="absolute inset-4 bg-gradient-to-tr from-brand-green/15 via-transparent to-emerald-400/10 blur-3xl opacity-45 rounded-full pointer-events-none" />
            <SalonSimulation3D />
          </div>
        </div>
      </div>
    </section>
  );
}
