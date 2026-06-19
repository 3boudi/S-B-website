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
              className="flex flex-col sm:flex-row gap-3 w-full"
            >
              <Button size="lg" className="w-full sm:w-auto bg-brand-green hover:bg-brand-green/90 text-white font-semibold" asChild>
                <a href={t("downloadLink")}>
                  <Download className="h-5 w-5" />
                  {t("downloadApp")}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <a href="https://salonsoftware.netlify.app/" target="_blank" rel="noopener noreferrer">
                  <MonitorPlay className="h-5 w-5" />
                  {t("tryFree")}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => openModal()}>
                <ShoppingCart className="h-5 w-5" />
                {t("buyNow")}
              </Button>
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
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div
              className="animate-float rounded-2xl"
              style={{
                boxShadow: "0 0 80px 20px rgba(22,163,74,0.15)",
              }}
            >
              {/* macOS Browser Frame */}
              <div className="rounded-2xl border border-border bg-[var(--bg-card)] dark:bg-[#151E19] overflow-hidden">
                {/* Title Bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-[var(--bg-secondary)] dark:bg-[#1a2420]">
                  <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                  <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                  <div className="h-3 w-3 rounded-full bg-[#28C840]" />
                  <div className="flex-1 text-center">
                    <span className="text-xs text-[var(--text-muted)]">salondztech Dashboard</span>
                  </div>
                </div>
                {/* Screenshot */}
                <div className="overflow-hidden">
                  <Image
                    src="/dashboard.png"
                    alt="salondztech salon management dashboard preview"
                    width={800}
                    height={500}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
