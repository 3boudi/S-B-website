"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ArrowDown, ArrowUpRight, Info, Sparkles, Zap } from "lucide-react";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import type {
  BillingCycle,
  BillingCycleLabels,
  Currency,
  CustomTier,
  FeatureCategory,
  StandardOrVipTier,
} from "./types";

interface PricingGridProps {
  billingCycle: BillingCycle;
  onBillingCycleChange: (cycle: BillingCycle) => void;
  currency: Currency;
  cycleLabels: BillingCycleLabels;
  standard: StandardOrVipTier;
  vip: StandardOrVipTier;
  custom: CustomTier;
  paymentsTitle: string;
  activationNotice: string;
  onSelectPlan: (planLabel: string, customMessage?: string) => void;
}

const CYCLES: BillingCycle[] = ["monthly", "yearly", "lifetime"];

function FeatureCategoryList({
  categories,
  accent,
}: {
  categories: FeatureCategory[];
  accent: "standard" | "vip" | "custom";
}) {
  const bulletClass =
    accent === "vip"
      ? "bg-[#25d366]"
      : accent === "custom"
      ? "bg-black/75 dark:bg-white/80"
      : "bg-black/35 dark:bg-white/40";

  return (
    <div className="mt-7">
      {categories.map((category, idx) => (
        <div
          key={category.title}
          className={
            idx === 0
              ? "pt-6 border-t border-black/10 dark:border-white/15"
              : "mt-6 pt-5 border-t border-black/10 dark:border-white/15"
          }
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/45 dark:text-white/45 mb-3.5 text-start">
            {category.title}
          </p>
          <ul className="space-y-2.5">
            {category.items.map((item) => (
              <li
                key={item.label}
                className="flex items-start justify-between gap-2 text-start text-[13px] leading-snug text-black/80 dark:text-white/80"
              >
                <span className="flex items-start gap-2.5 min-w-0">
                  <span
                    aria-hidden="true"
                    className={`inline-block h-[5px] w-[5px] shrink-0 mt-[7px] ${bulletClass}`}
                  />
                  <span className="break-words">{item.label}</span>
                </span>
                {item.tooltip && (
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button
                        type="button"
                        aria-label={item.label}
                        className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-black/35 dark:text-white/35 hover:text-black/80 dark:hover:text-white/85 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#25d366] transition-colors cursor-help"
                      >
                        <Info className="h-3.5 w-3.5" />
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={6}
                        className="z-50 max-w-[250px] rounded-sm border border-black/15 dark:border-white/20 bg-[#0a0a0a] px-3 py-2 text-xs leading-relaxed text-white dark:bg-white dark:text-[#050505] shadow-xl animate-in fade-in-0 zoom-in-95"
                      >
                        {item.tooltip}
                        <Tooltip.Arrow className="fill-[#0a0a0a] dark:fill-white" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function InlineCycleSelector({
  billingCycle,
  onChange,
  cycleLabels,
  isVip,
}: {
  billingCycle: BillingCycle;
  onChange: (c: BillingCycle) => void;
  cycleLabels: BillingCycleLabels;
  isVip?: boolean;
}) {
  return (
    <div
      role="tablist"
      className="mt-4 inline-grid grid-cols-3 border border-black/10 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.03] p-0.5 rounded-sm w-full"
    >
      {CYCLES.map((cycle) => {
        const active = billingCycle === cycle;
        return (
          <button
            key={cycle}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(cycle)}
            className={`px-2 py-1 text-[11px] font-semibold tracking-tight transition-colors rounded-[2px] cursor-pointer truncate ${
              active
                ? isVip
                  ? "bg-[#25d366] text-[#050505] font-bold"
                  : "bg-black text-white dark:bg-white dark:text-[#050505] font-bold"
                : "text-black/55 dark:text-white/55 hover:text-black dark:hover:text-white"
            }`}
          >
            {cycleLabels[cycle]}
          </button>
        );
      })}
    </div>
  );
}

export default function PricingGrid({
  billingCycle,
  onBillingCycleChange,
  currency,
  cycleLabels,
  standard,
  vip,
  custom,
  paymentsTitle,
  activationNotice,
  onSelectPlan,
}: PricingGridProps) {
  const stdPrice = standard.pricing[currency][billingCycle];
  const vipPrice = vip.pricing[currency][billingCycle];

  const handleScrollToCustom = () => {
    const el = document.getElementById("custom-project");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full">
      {/* Flush 3-Column Architectural Hairline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black/10 dark:border-white/15 bg-white dark:bg-[#050505] rounded-none divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-black/10 dark:divide-white/15">
        {/* ================= COLUMN 1: STANDARD ================= */}
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35 }}
          className="relative flex flex-col justify-between p-6 sm:p-8 bg-white dark:bg-[#050505]"
        >
          <div>
            {/* Eyebrow & Name */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-black/55 dark:text-white/55">
                {standard.eyebrow}
              </span>
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight font-[var(--font-display)] text-black dark:text-white text-start">
              {standard.name}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-black/60 dark:text-white/60 text-start min-h-[42px]">
              {standard.subtitle}
            </p>

            {/* Synced Inline Cycle Switcher */}
            <InlineCycleSelector
              billingCycle={billingCycle}
              onChange={onBillingCycleChange}
              cycleLabels={cycleLabels}
            />

            {/* Animated Price Block (fixed height to prevent layout shift) */}
            <div className="mt-6 min-h-[96px] flex flex-col justify-between text-start">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`std-${currency}-${billingCycle}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-2 min-h-[22px] mb-1">
                    {stdPrice.originalPrice && (
                      <span className="text-xs line-through tabular-nums text-black/40 dark:text-white/40 font-medium">
                        {stdPrice.originalPrice}
                      </span>
                    )}
                    {stdPrice.savingsBadge && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm border border-[#25d366]/40 bg-[#25d366]/10 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-[#25d366]">
                        {stdPrice.savingsBadge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
                    <span className="text-3xl sm:text-[2.2rem] font-extrabold tracking-tight tabular-nums leading-none text-black dark:text-white font-[var(--font-display)]">
                      {stdPrice.price}
                    </span>
                    <span className="text-xs font-medium text-black/55 dark:text-white/55">
                      {stdPrice.period}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-black/50 dark:text-white/50">
                    {stdPrice.subline}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Outlined Pill CTA */}
            <button
              type="button"
              onClick={() =>
                onSelectPlan(
                  `${standard.name} — ${cycleLabels[billingCycle]} (${stdPrice.price} ${stdPrice.period})`
                )
              }
              className="mt-6 w-full h-11 rounded-full border border-black/20 dark:border-white/25 bg-transparent hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-[#050505] text-black dark:text-white text-sm font-bold transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{standard.cta}</span>
              <ArrowUpRight className="h-4 w-4 rtl:rotate-[-90deg]" />
            </button>

            {/* Micro-Categorized Features */}
            <FeatureCategoryList categories={standard.categories} accent="standard" />
          </div>
        </motion.article>

        {/* ================= COLUMN 2: VIP (RECOMMENDED) ================= */}
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: 0.06 }}
          className="relative flex flex-col justify-between p-6 sm:p-8 bg-[#f4fbf7] dark:bg-[#08100b] overflow-hidden"
        >
          {/* Crisp 2px Top Emerald Hairline Accent */}
          <div
            aria-hidden="true"
            className="absolute top-0 inset-x-0 h-[2px] bg-[#25d366]"
          />
          {/* Subtle top ambient sheen in dark mode */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#25d366]/[0.08] to-transparent"
          />

          <div className="relative z-10">
            {/* Highlighted Uppercase Tier Eyebrow + Recommended Pill */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-emerald-700 dark:text-[#25d366]">
                {vip.eyebrow}
              </span>
              {vip.recommendedBadge && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm border border-[#25d366]/40 bg-[#25d366]/15 text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-[#25d366]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#25d366]" />
                  {vip.recommendedBadge}
                </span>
              )}
            </div>

            <h3 className="text-2xl font-extrabold tracking-tight font-[var(--font-display)] text-emerald-700 dark:text-[#25d366] text-start">
              {vip.name}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-black/65 dark:text-white/65 text-start min-h-[42px]">
              {vip.subtitle}
            </p>

            {/* Synced Inline Cycle Switcher */}
            <InlineCycleSelector
              billingCycle={billingCycle}
              onChange={onBillingCycleChange}
              cycleLabels={cycleLabels}
              isVip
            />

            {/* Animated Price Block */}
            <div className="mt-6 min-h-[96px] flex flex-col justify-between text-start">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`vip-${currency}-${billingCycle}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-2 min-h-[22px] mb-1">
                    {vipPrice.originalPrice && (
                      <span className="text-xs line-through tabular-nums text-black/40 dark:text-white/40 font-medium">
                        {vipPrice.originalPrice}
                      </span>
                    )}
                    {vipPrice.savingsBadge && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-[#25d366] text-[#050505] text-[10px] font-extrabold uppercase tracking-wider">
                        {vipPrice.savingsBadge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
                    <span className="text-3xl sm:text-[2.2rem] font-extrabold tracking-tight tabular-nums leading-none text-black dark:text-white font-[var(--font-display)]">
                      {vipPrice.price}
                    </span>
                    <span className="text-xs font-medium text-black/60 dark:text-white/60">
                      {vipPrice.period}
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-medium text-emerald-800/80 dark:text-[#25d366]/85">
                    {vipPrice.subline}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Solid High-Contrast Primary Pill CTA */}
            <button
              type="button"
              onClick={() =>
                onSelectPlan(
                  `${vip.name} — ${cycleLabels[billingCycle]} (${vipPrice.price} ${vipPrice.period})`
                )
              }
              className="mt-6 w-full h-11 rounded-full bg-[#25d366] hover:bg-[#1fc25c] text-[#050505] text-sm font-extrabold tracking-tight transition-colors duration-200 flex items-center justify-center gap-2 shadow-[0_8px_24px_-8px_rgba(37,211,102,0.55)] cursor-pointer"
            >
              <span>{vip.cta}</span>
              <ArrowUpRight className="h-4 w-4 rtl:rotate-[-90deg]" />
            </button>

            {/* Micro-Categorized Features (emerald square bullets) */}
            <FeatureCategoryList categories={vip.categories} accent="vip" />
          </div>
        </motion.article>

        {/* ================= COLUMN 3: CUSTOM PROJECT ================= */}
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: 0.12 }}
          className="relative flex flex-col justify-between p-6 sm:p-8 bg-zinc-50/85 dark:bg-[#0a0a0a]"
        >
          <div>
            {/* Eyebrow & Bespoke Accent Badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-black/55 dark:text-white/55">
                {custom.eyebrow}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm border border-black/15 dark:border-white/20 bg-black/[0.04] dark:bg-white/[0.06] text-[10px] font-bold uppercase tracking-wider text-black/80 dark:text-white/85">
                <Sparkles className="h-2.5 w-2.5 text-emerald-600 dark:text-[#25d366]" />
                {custom.badge}
              </span>
            </div>

            <h3 className="text-2xl font-extrabold tracking-tight font-[var(--font-display)] text-black dark:text-white text-start">
              {custom.name}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-black/60 dark:text-white/60 text-start min-h-[42px]">
              {custom.subtitle}
            </p>

            {/* Bespoke Scope Pill Bar (matches inline selector vertical rhythm) */}
            <div className="mt-4 flex items-center justify-between gap-2 px-3 py-1.5 border border-dashed border-black/15 dark:border-white/15 rounded-sm text-[11px] font-medium text-black/65 dark:text-white/65">
              <span className="truncate">{custom.scopeStrip}</span>
              <span className="text-emerald-700 dark:text-[#25d366] font-bold shrink-0">
                {custom.ownershipTag}
              </span>
            </div>

            {/* Custom Quote Display */}
            <div className="mt-6 min-h-[96px] flex flex-col justify-between text-start">
              <div>
                <div className="min-h-[22px] mb-1 flex items-center">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-[#25d366]">
                    {custom.deliveryTag}
                  </span>
                </div>
                <div className="text-3xl sm:text-[2.1rem] font-extrabold tracking-tight leading-none text-black dark:text-white font-[var(--font-display)]">
                  {custom.priceLabel}
                </div>
                <p className="mt-2 text-xs text-black/55 dark:text-white/55">
                  {custom.priceSubline}
                </p>
              </div>
            </div>

            {/* Primary CTA + Quick Smooth-Scroll Anchor */}
            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                onClick={() =>
                  onSelectPlan(custom.modalPlanLabel, custom.whatsappMessage)
                }
                className="w-full h-11 rounded-full bg-black hover:bg-black/85 dark:bg-white dark:hover:bg-white/90 text-white dark:text-[#050505] text-sm font-bold transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{custom.ctaPrimary}</span>
                <ArrowUpRight className="h-4 w-4 rtl:rotate-[-90deg]" />
              </button>
              <button
                type="button"
                onClick={handleScrollToCustom}
                className="w-full py-1.5 text-xs font-semibold text-black/65 dark:text-white/65 hover:text-emerald-700 dark:hover:text-[#25d366] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{custom.ctaSecondary}</span>
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Micro-Categorized Features */}
            <FeatureCategoryList categories={custom.categories} accent="custom" />
          </div>
        </motion.article>
      </div>

      {/* Attached Architectural Hairline Payment Methods Strip */}
      <div className="border-x border-b border-black/10 dark:border-white/15 bg-zinc-50/80 dark:bg-[#0a0a0a] px-6 py-4 sm:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-black/50 dark:text-white/50">
            {paymentsTitle}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://play.google.com/store/apps/details?id=ru.bpc.mobilebank.bpc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-black/10 dark:border-white/15 bg-white dark:bg-[#050505] rounded-sm text-xs font-semibold text-black/80 dark:text-white/85 hover:border-[#25d366]/60 transition-colors"
            >
              <Image
                src="/baridimob.png"
                alt="BaridiMob"
                width={20}
                height={16}
                className="h-4 w-auto object-contain"
              />
              <span>BaridiMob</span>
            </a>
            <a
              href="https://en.wikipedia.org/wiki/Alg%C3%A9rie_Poste"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-black/10 dark:border-white/15 bg-white dark:bg-[#050505] rounded-sm text-xs font-semibold text-black/80 dark:text-white/85 hover:border-[#25d366]/60 transition-colors"
            >
              <Image
                src="/ccp.svg"
                alt="CCP"
                width={20}
                height={16}
                className="h-4 w-auto object-contain"
              />
              <span>CCP</span>
            </a>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-black/10 dark:border-white/15 bg-white dark:bg-[#050505] rounded-sm text-xs font-semibold text-black/80 dark:text-white/85">
              <FaCcVisa className="h-4 w-6 text-[#151D8F] dark:text-white" />
              <span>Visa</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-black/10 dark:border-white/15 bg-white dark:bg-[#050505] rounded-sm text-xs font-semibold text-black/80 dark:text-white/85">
              <FaCcMastercard className="h-4 w-6 text-[#EB001B]" />
              <span>Mastercard</span>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-[#25d366]">
          <Zap className="h-3.5 w-3.5 fill-current shrink-0" />
          <span>{activationNotice}</span>
        </div>
      </div>
    </div>
  );
}
