"use client";
// Design intent: Full-viewport hero with staggered text animation and macOS-framed dashboard mockup.
// Layout: Two-column on desktop (text left, visual right), single column centered on mobile.
// Background: dark mode has radial green glow, light mode has subtle dot pattern.
// Accessibility: semantic headings, decorative image has alt text, buttons have clear labels.

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { MonitorPlay, ShoppingCart, Download, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuyModal } from "@/components/ui/BuyModal";
import { Link } from "@/i18n/routing";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  const t = useTranslations("hero");
  const { openModal } = useBuyModal();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-12 md:pt-0"
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

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 lg:py-28 z-10 w-full">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Column */}
          <div className="space-y-6">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0 }}
              className="inline-flex items-center gap-2"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass border-black/[0.06] dark:border-white/[0.1] text-xs font-semibold text-foreground tracking-tight shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                </span>
                <span>{t("badge")}</span>
              </div>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl font-[var(--font-display)] text-[var(--text-primary)] leading-[1.12]"
            >
              {t("title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-emerald-400 to-teal-300">
                {t("titleHighlight")}
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-xl text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              <Button
                size="lg"
                className="apple-btn-primary apple-press font-bold px-8 h-12 rounded-2xl text-sm flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0"
                asChild
              >
                <Link href="/download" className="flex items-center justify-center gap-2.5 whitespace-nowrap">
                  <Download className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">{t("downloadApp")}</span>
                </Link>
              </Button>
              <button
                className="apple-card apple-press hover:border-brand-green/50 font-bold px-7 h-12 rounded-2xl text-sm flex items-center justify-center gap-2 text-foreground cursor-pointer whitespace-nowrap shrink-0"
                onClick={() => openModal()}
              >
                <ShoppingCart className="h-4 w-4 text-brand-green shrink-0" />
                <span className="whitespace-nowrap">{t("buyNow")}</span>
              </button>
            </motion.div>

            {/* Trust Micro-Metrics with Apple Pill Badges */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-2.5 pt-2 text-xs text-muted-foreground font-medium"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full apple-glass border-black/[0.05] dark:border-white/[0.07] text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>WhatsApp Bot AI</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full apple-glass border-black/[0.05] dark:border-white/[0.07] text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                <span>Windows 10 / 11 Native</span>
              </span>
            </motion.div>
          </div>

          {/* Visual Column: Native Workstation Chrome */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full flex items-center justify-center py-6 sm:py-10 lg:py-0"
          >
            {/* Ambient emerald illumination */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/20 via-transparent to-brand-green/5 blur-3xl opacity-40 rounded-full pointer-events-none" />

            {/* Proportional Devices Wrapper */}
            <div className="relative w-full max-w-[560px] aspect-[16/11] mx-auto my-4">
              
              {/* 1. Main Dashboard Desktop Display with macOS / Apple Window Chrome */}
              <div className="relative w-full h-full apple-card rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-brand-green/40">
                {/* Window Titlebar */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#FF5F57] opacity-80" />
                    <div className="h-3 w-3 rounded-full bg-[#FFBD2E] opacity-80" />
                    <div className="h-3 w-3 rounded-full bg-[#28C840] opacity-80" />
                  </div>
                  <div className="text-[11px] text-muted-foreground font-medium flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
                    <span>salondztech-desktop</span>
                  </div>
                  <span className="text-[10px] font-semibold text-brand-green px-2 py-0.5 rounded-full bg-brand-green/10 border border-brand-green/20">
                    Pro Live
                  </span>
                </div>

                {/* Dashboard Image Preview */}
                <div className="relative w-full h-[calc(100%-38px)] bg-black/5 dark:bg-black/30">
                  <Image
                    src="/dashboard.png"
                    alt="salondztech Desktop Dashboard"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* 2. Floating Interactive Phone with WhatsApp Live Chat (Liquid Glass) */}
              <div className="absolute -right-[4%] -bottom-[8%] sm:-right-[6%] sm:-bottom-[10%] w-[44%] sm:w-[40%] rounded-2xl p-3 apple-glass-prominent shadow-2xl z-30 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-black/[0.06] dark:border-white/[0.08]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-brand-green animate-ping-slow" />
                    <span className="text-[11px] font-bold text-foreground">
                      AI WhatsApp
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-brand-green px-1.5 py-0.5 rounded-full bg-brand-green/10">
                    Auto 24/7
                  </span>
                </div>

                {/* WhatsApp Chat Bubbles */}
                <div className="space-y-1.5 text-[9px] sm:text-[10px] font-sans">
                  <div className="bg-black/[0.04] dark:bg-white/[0.06] text-foreground p-2 rounded-xl rounded-tl-none border border-black/[0.04] dark:border-white/[0.06] shadow-2xs leading-tight">
                    {t("chatbotBotMessage1")}
                  </div>
                  <div className="bg-brand-green text-white p-2 rounded-xl rounded-tr-none shadow-2xs leading-tight font-medium ms-auto max-w-[90%] text-end">
                    {t("chatbotUserMessage")}
                  </div>
                </div>
              </div>

              {/* 3. Floating 100% Offline Engine Architecture Badge */}
              <div className="absolute -left-[5%] -bottom-[6%] sm:-left-[8%] sm:-bottom-[8%] rounded-2xl p-3 apple-glass-prominent shadow-xl z-20 hidden xs:flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center shrink-0">
                  <Database className="w-4 h-4 text-brand-green" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground leading-tight">
                    100% Offline Engine
                  </div>
                  <div className="text-[10px] text-brand-green font-semibold">
                    No Internet Required
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


