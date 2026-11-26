"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useBuyModal } from "@/components/ui/BuyModal";
import PricingGrid from "./pricing/PricingGrid";
import ComparisonMatrix from "./pricing/ComparisonMatrix";
import CustomProjectTimeline from "./pricing/CustomProjectTimeline";
import type {
  BillingCycle,
  BillingCycleLabels,
  Currency,
  CustomProjectContent,
  CustomTier,
  MatrixCategory,
  StandardOrVipTier,
} from "./pricing/types";

const CYCLES: BillingCycle[] = ["monthly", "yearly", "lifetime"];

export default function Pricing() {
  const t = useTranslations("pricing");
  const { openModal } = useBuyModal();

  // Default to yearly so visitors immediately see the flagship ~39% / ~42% savings
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const [currency, setCurrency] = useState<Currency>("DZD");

  const cycleLabels = t.raw("cycles") as BillingCycleLabels;
  const standard = t.raw("tiers.standard") as StandardOrVipTier;
  const vip = t.raw("tiers.vip") as StandardOrVipTier;
  const custom = t.raw("tiers.custom") as CustomTier;
  const matrixCategories = t.raw("matrix.categories") as MatrixCategory[];
  const customProject = t.raw("customProject") as CustomProjectContent;

  return (
    <Tooltip.Provider delayDuration={150}>
      <section
        id="pricing"
        className="py-14 sm:py-20 md:py-28 relative overflow-x-clip scroll-mt-20"
      >
        {/* Subtle Architectural Background Grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hairline-grid opacity-30 pointer-events-none"
        />

        <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          {/* ================= HEADER + CONTROLS ================= */}
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-black/10 dark:border-white/15 bg-white/80 dark:bg-[#0a0a0a]/90 text-emerald-700 dark:text-[#25d366] text-[11px] font-bold tracking-[0.16em] uppercase mb-4">
              <span className="h-1.5 w-1.5 bg-[#25d366]" />
              <span>{t("eyebrow")}</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl font-[var(--font-display)] text-black dark:text-white">
              {t("title")}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-black/60 dark:text-white/60 leading-relaxed max-w-2xl mx-auto">
              {t("subtitle")}
            </p>

            {/* Controls Row: 3-Mode Billing Duration Selector + Compact DZD/USD Toggle */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              {/* 3-Mode Billing Cycle Segmented Control */}
              <div
                role="tablist"
                aria-label={t("billingSelectorLabel")}
                className="relative inline-flex items-center p-1 border border-black/15 dark:border-white/15 bg-white dark:bg-[#0a0a0a] rounded-full shadow-xs max-w-full"
              >
                {CYCLES.map((cycle) => {
                  const isActive = billingCycle === cycle;
                  return (
                    <button
                      key={cycle}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setBillingCycle(cycle)}
                      className={`relative min-h-[40px] px-3 sm:px-5 py-2 text-[11px] sm:text-xs font-bold rounded-full transition-colors cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                        isActive
                          ? "text-[#050505]"
                          : "text-black/65 dark:text-white/65 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="pricing-billing-pill"
                          className="absolute inset-0 bg-[#25d366] rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                          }}
                        />
                      )}
                      <span className="relative z-10 whitespace-nowrap">
                        {cycleLabels[cycle]}
                      </span>
                      {cycle === "yearly" && (
                        <span
                          className={`relative z-10 hidden xs:inline-flex sm:inline-flex text-[9.5px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded-full leading-none whitespace-nowrap ${
                            isActive
                              ? "bg-[#050505]/15 text-[#050505]"
                              : "bg-[#25d366]/15 text-emerald-700 dark:text-[#25d366]"
                          }`}
                        >
                          {cycleLabels.yearlyShortBadge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Preserved Currency Toggle (DZD Primary / USD) */}
              <div
                role="group"
                aria-label={t("currencySelectorLabel")}
                className="relative inline-flex items-center p-1 border border-black/15 dark:border-white/15 bg-white dark:bg-[#0a0a0a] rounded-full"
              >
                {(["DZD", "USD"] as const).map((curr) => {
                  const active = currency === curr;
                  return (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setCurrency(curr)}
                      className={`relative min-h-[40px] min-w-[52px] px-3.5 py-2 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                        active
                          ? "text-white dark:text-[#050505]"
                          : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="pricing-currency-pill"
                          className="absolute inset-0 bg-black dark:bg-white rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                          }}
                        />
                      )}
                      <span className="relative z-10">
                        {curr === "DZD" ? t("toggleDzdShort") : t("toggleUsdShort")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= 1. ARCHITECTURAL HAIRLINE PRICING GRID ================= */}
          <PricingGrid
            billingCycle={billingCycle}
            onBillingCycleChange={setBillingCycle}
            currency={currency}
            cycleLabels={cycleLabels}
            standard={standard}
            vip={vip}
            custom={custom}
            paymentsTitle={t("paymentsTitle")}
            activationNotice={t("activationNotice")}
            onSelectPlan={openModal}
          />

          {/* ================= 2. STICKY-HEADER COMPARISON MATRIX ================= */}
          <ComparisonMatrix
            eyebrow={t("matrix.eyebrow")}
            title={t("matrix.title")}
            subtitle={t("matrix.subtitle")}
            capabilitiesHeader={t("matrix.capabilitiesHeader")}
            scrollHint={t("matrix.scrollHint")}
            categories={matrixCategories}
            billingCycle={billingCycle}
            currency={currency}
            cycleLabels={cycleLabels}
            standard={standard}
            vip={vip}
            custom={custom}
            onSelectPlan={openModal}
          />

          {/* ================= 3. DEDICATED CUSTOM PROJECT TIMELINE ================= */}
          <CustomProjectTimeline
            content={customProject}
            onStartProject={(planLabel, customMessage) =>
              openModal(planLabel, customMessage)
            }
          />
        </div>
      </section>
    </Tooltip.Provider>
  );
}
