"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Download, Settings, TrendingUp } from "lucide-react";

const STEP_ICONS = [Download, Settings, TrendingUp];
const STEP_CODES = ["STEP_01 // SETUP_INSTALL", "STEP_02 // CONFIGURE_STAFF", "STEP_03 // RUN_POS_LIVE"];

export default function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative overflow-hidden bg-[var(--bg-secondary)] dark:bg-[var(--bg-secondary)]">
      {/* Hairline background grid */}
      <div className="absolute inset-0 hairline-grid opacity-35 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-green/30 bg-brand-green/5 text-brand-green text-xs font-mono font-bold uppercase tracking-wider">
            <span className="text-brand-green font-bold">+</span>
            <span>ONBOARDING // 3-STEP WORKFLOW</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl font-[var(--font-display)] text-[var(--text-primary)]">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Steps with Hairline Schematic Cards */}
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {[0, 1, 2].map((index) => {
            const Icon = STEP_ICONS[index];
            const stepCode = STEP_CODES[index];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative rounded-2xl hairline-card p-6 sm:p-8 flex flex-col justify-between overflow-hidden group hover:border-brand-green/50"
              >
                {/* Crosshair top markers */}
                <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)] border-b border-black/[0.05] dark:border-white/[0.06] pb-3 mb-6">
                  <span className="font-bold text-brand-green">{stepCode}</span>
                  <span className="font-bold text-brand-green/60">0{index + 1}</span>
                </div>

                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 dark:bg-brand-green/15 border border-brand-green/20 text-brand-green transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="text-4xl font-black font-mono text-black/[0.08] dark:text-white/[0.08] group-hover:text-brand-green/20 transition-colors">
                      {t(`steps.${index}.number`)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-lg sm:text-xl font-bold text-[var(--text-primary)] font-[var(--font-display)] group-hover:text-brand-green transition-colors">
                    {t(`steps.${index}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {t(`steps.${index}.description`)}
                  </p>
                </div>

                {/* Bottom Schematic indicator */}
                <div className="mt-6 pt-3 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
                  <span>EXECUTION TIME</span>
                  <span className="font-bold text-brand-green">
                    {index === 0 ? "< 3 MINUTES" : index === 1 ? "10 MINUTES" : "INSTANT"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

