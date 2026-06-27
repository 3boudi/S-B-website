"use client";
// Design intent: Full-viewport hero with staggered text animation and macOS-framed dashboard mockup.
// Layout: Two-column on desktop (text left, visual right), single column centered on mobile.
// Background: dark mode has radial green glow, light mode has subtle dot pattern.
// Accessibility: semantic headings, decorative image has alt text, buttons have clear labels.

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { MonitorPlay, ShoppingCart, ShieldCheck, Download } from "lucide-react";
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
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-white dark:bg-[#0A0F0D]" />
      <div
        className="absolute inset-0 dark:block hidden"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(22,163,74,0.15) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 dark:hidden block"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(22,163,74,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Column */}
          <div className="space-y-6">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <span className="inline-flex items-center rounded-full bg-brand-green/10 px-4 py-1.5 text-sm font-medium text-brand-green ring-1 ring-brand-green/20">
                {t("badge")}
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl font-[var(--font-display)] text-[var(--text-primary)]"
            >
              {t("title")}{" "}
              <span className="text-brand-green">{t("titleHighlight")}</span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-lg text-lg text-[var(--text-secondary)] leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-3 w-full"
            >
              <Button size="lg" className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold justify-center" asChild>
                <Link href="/download">
                  <Download className="h-5 w-5" />
                  {t("downloadApp")}
                </Link>
              </Button>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button size="lg" variant="outline" className="w-full sm:w-1/2 justify-center" asChild>
                  <a href="https://salonsoftware.netlify.app/" target="_blank" rel="noopener noreferrer">
                    <MonitorPlay className="h-5 w-5" />
                    {t("tryFree")}
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-1/2 justify-center" onClick={() => openModal()}>
                  <ShoppingCart className="h-5 w-5" />
                  {t("buyNow")}
                </Button>
              </div>
            </motion.div>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-2 text-sm text-[var(--text-muted)]"
            >
              <ShieldCheck className="h-4 w-4 text-brand-green" />
              {t("noCredit")}
            </motion.p>
          </div>

          {/* Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full flex items-center justify-center py-6 sm:py-10 lg:py-0"
          >
            {/* Glow behind the devices */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/20 to-transparent blur-3xl opacity-60 rounded-full" />

            {/* Proportional Devices Wrapper */}
            <div className="relative w-[88%] sm:w-[85%] aspect-[16/10] mx-auto my-6">
              {/* 1. Computer Mockup (Desktop Monitor/Laptop Screen) - Base Layer */}
              <div className="relative w-full h-full bg-slate-900 rounded-2xl border-2 sm:border-4 border-slate-800 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 hover:shadow-[0_30px_70px_-10px_rgba(22,163,74,0.25)] animate-float">
                {/* Screen Glare/Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-10" />
                
                {/* macOS Style Header */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#FF5F57]" />
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#FFBD2E]" />
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#28C840]" />
                  <div className="flex-1 text-center pr-8">
                    <span className="text-[8px] sm:text-[10px] text-slate-400 font-mono tracking-tight">salondztech.app/dashboard</span>
                  </div>
                </div>
                
                {/* Main Dashboard Screenshot */}
                <div className="relative w-full h-[calc(100%-24px)] sm:h-[calc(100%-28px)] bg-[#fafafa] dark:bg-[#0A0F0D]">
                  <Image
                    src="/dashboard.png"
                    alt="salondztech Desktop Dashboard"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>

              {/* 2. Tablet Mockup (iPad/Android Tablet) - Middle Layer, overlapping Left */}
              <div className="absolute -left-[5%] -bottom-[8%] w-[38%] aspect-[3/4] bg-slate-950 rounded-[12px] sm:rounded-[20px] p-1 sm:p-2 border-[3px] sm:border-[5px] border-slate-900 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)] z-20 overflow-hidden transform -rotate-1 hover:rotate-0 transition-all duration-300">
                <div className="relative w-full h-full rounded-[8px] sm:rounded-[12px] bg-gradient-to-b from-white to-slate-50 border border-slate-200 flex flex-col justify-between p-1.5 sm:p-3 overflow-hidden">
                  {/* Glare */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-10" />
                  
                  {/* Top Camera Dot */}
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-slate-900 absolute top-1 sm:top-2 left-1/2 -translate-x-1/2" />
                  
                  {/* Tablet UI Mockup */}
                  <div className="w-full flex justify-between items-center border-b border-slate-200/80 pb-1.5">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <div className="relative w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded bg-brand-green/10 p-0.5">
                        <Image
                          src="/logo2.png"
                          alt="Logo"
                          width={14}
                          height={14}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-[5px] sm:text-[7px] font-bold text-slate-800">salondztech VIP</span>
                    </div>
                    <div className="w-6 h-1 sm:w-8 sm:h-1.5 rounded bg-slate-100" />
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center justify-center gap-1 sm:gap-2 py-1.5 sm:py-3 w-full">
                    <div className="relative w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-100 p-1 sm:p-2 flex items-center justify-center shadow-sm">
                      <Image
                        src="/logo2.png"
                        alt="Logo"
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-center space-y-0.5">
                      <p className="text-[5px] sm:text-[8px] font-bold text-slate-800 tracking-wide">VIP LICENSE</p>
                      <p className="text-[4px] sm:text-[5px] text-brand-green font-semibold font-mono">Premium Edition</p>
                    </div>
                  </div>
                  
                  {/* Tablet Bottom Indicator */}
                  <div className="w-8 h-0.5 rounded-full bg-slate-300 mx-auto" />
                </div>
              </div>

              {/* 3. Android Smartphone Mockup - Top Layer, overlapping Right */}
              <div className="absolute -right-[5%] -bottom-[4%] w-[24%] aspect-[9/19.5] bg-slate-950 rounded-[16px] sm:rounded-[28px] p-1 sm:p-1.5 border-[2px] sm:border-[4px] border-slate-900 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.7)] z-30 overflow-hidden transform rotate-2 hover:rotate-0 transition-all duration-300">
                <div className="relative w-full h-full rounded-[12px] sm:rounded-[22px] bg-[#efeae2] border border-slate-200/80 flex flex-col justify-between overflow-hidden">
                  {/* Phone Screen Glare */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-10" />

                  {/* Android Punch Hole Camera */}
                  <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-black border border-slate-800 z-20" />

                  {/* Top Status Bar Mockup */}
                  <div className="flex justify-between items-center text-[4px] sm:text-[5px] text-slate-600 font-semibold font-mono px-1.5 sm:px-2.5 pt-0.5 sm:pt-1 z-10">
                    <span>09:41</span>
                    <div className="flex items-center gap-0.5">
                      <span>5G</span>
                      <div className="w-2 sm:w-2.5 h-1 sm:h-1.5 border border-slate-500 rounded-xs" />
                    </div>
                  </div>

                  {/* Phone UI Content - WhatsApp Chatbot preview */}
                  <div className="flex-1 flex flex-col justify-start w-full">
                    {/* WhatsApp style header */}
                    <div className="flex items-center gap-1 sm:gap-1.5 bg-[#008069] px-1.5 sm:px-2.5 py-1 sm:py-1.5 shadow-sm text-white">
                      <div className="relative w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white p-0.5 shadow-xs">
                        <Image
                          src="/logo2.png"
                          alt="Logo"
                          width={16}
                          height={16}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[4px] sm:text-[6px] font-bold text-white leading-none">WhatsApp Bot</span>
                        <span className="text-[3px] sm:text-[4px] text-emerald-100 leading-none">online</span>
                      </div>
                    </div>

                    {/* Chat Bubbles */}
                    <div className="space-y-1 sm:space-y-1.5 flex-1 flex flex-col justify-center px-1.5 py-1">
                      {/* Bot Message (Left) */}
                      <div className="bg-white text-slate-800 border border-slate-200/30 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] rounded-md sm:rounded-lg rounded-tl-none p-0.5 sm:p-1 text-[3.5px] sm:text-[5px] leading-normal text-left self-start max-w-[85%]">
                        {t("chatbotBotMessage1")}
                      </div>
                      {/* User Message (Right) */}
                      <div className="bg-[#e2f9e9] text-slate-800 border border-[#bce8b7] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] rounded-md sm:rounded-lg rounded-tr-none p-0.5 sm:p-1 text-[3.5px] sm:text-[5px] leading-normal text-right self-end max-w-[85%]">
                        {t("chatbotUserMessage")}
                      </div>
                      {/* Bot Message (Left) */}
                      <div className="bg-white text-slate-800 border border-slate-200/30 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] rounded-md sm:rounded-lg rounded-tl-none p-0.5 sm:p-1 text-[3.5px] sm:text-[5px] leading-normal text-left self-start max-w-[85%]">
                        {t("chatbotBotMessage2")}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation Pill */}
                  <div className="w-6 sm:w-10 h-0.5 rounded-full bg-slate-400 mx-auto mb-1 z-10" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
