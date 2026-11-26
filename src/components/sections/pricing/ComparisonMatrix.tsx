"use client";

import { Check, X } from "lucide-react";
import type {
  BillingCycle,
  BillingCycleLabels,
  Currency,
  CustomTier,
  MatrixCategory,
  MatrixCellValue,
  StandardOrVipTier,
} from "./types";

interface ComparisonMatrixProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  capabilitiesHeader: string;
  scrollHint: string;
  categories: MatrixCategory[];
  billingCycle: BillingCycle;
  currency: Currency;
  cycleLabels: BillingCycleLabels;
  standard: StandardOrVipTier;
  vip: StandardOrVipTier;
  custom: CustomTier;
  onSelectPlan: (planLabel: string, customMessage?: string) => void;
}

function MatrixCell({
  value,
  isVip,
  isCustom,
}: {
  value: MatrixCellValue;
  isVip?: boolean;
  isCustom?: boolean;
}) {
  if (value === true) {
    return (
      <span
        aria-label="Included"
        className={`inline-flex h-5 w-5 items-center justify-center rounded-sm ${
          isVip
            ? "bg-[#25d366]/15 text-emerald-700 dark:text-[#25d366]"
            : "text-emerald-600 dark:text-[#25d366]"
        }`}
      >
        <Check className="h-4 w-4 stroke-[2.5]" />
      </span>
    );
  }

  if (value === false) {
    return (
      <span
        aria-label="Not included"
        className="inline-flex h-5 w-5 items-center justify-center text-black/25 dark:text-white/20"
      >
        <X className="h-4 w-4 stroke-[2]" />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-0.5 text-[11px] font-semibold leading-tight text-center rounded-sm ${
        isVip
          ? "border border-[#25d366]/35 bg-[#25d366]/10 text-emerald-800 dark:text-[#25d366]"
          : isCustom
          ? "border border-black/15 dark:border-white/20 bg-black/[0.04] dark:bg-white/[0.06] text-black/85 dark:text-white/90"
          : "text-black/75 dark:text-white/75"
      }`}
    >
      {value}
    </span>
  );
}

export default function ComparisonMatrix({
  eyebrow,
  title,
  subtitle,
  capabilitiesHeader,
  scrollHint,
  categories,
  billingCycle,
  currency,
  cycleLabels,
  standard,
  vip,
  custom,
  onSelectPlan,
}: ComparisonMatrixProps) {
  const stdPrice = standard.pricing[currency][billingCycle];
  const vipPrice = vip.pricing[currency][billingCycle];

  return (
    <div className="mt-20 md:mt-24">
      {/* Matrix Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-start">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-[#25d366] mb-2">
            <span className="h-1.5 w-1.5 bg-[#25d366]" />
            <span>{eyebrow}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-[var(--font-display)] text-black dark:text-white">
            {title}
          </h3>
          <p className="mt-2 text-sm text-black/60 dark:text-white/60 leading-relaxed">
            {subtitle}
          </p>
        </div>
        <span className="md:hidden text-[11px] font-semibold uppercase tracking-wider text-black/45 dark:text-white/45">
          {scrollHint}
        </span>
      </div>

      {/* Responsive Matrix Container: horizontal scroll on mobile, visible on md+ for viewport sticky header */}
      <div className="overflow-x-auto md:overflow-visible border border-black/10 dark:border-white/15 bg-white dark:bg-[#050505]">
        <div className="min-w-[680px] md:min-w-0">
          {/* STICKY HEADER ROW (docks flush below fixed 64px Navbar on desktop) */}
          <div className="sticky top-0 md:top-16 z-30 grid grid-cols-[minmax(220px,1.8fr)_1fr_1fr_1fr] bg-white/95 dark:bg-[#050505]/95 backdrop-blur-md border-b border-black/10 dark:border-white/15">
            {/* Feature Column Header */}
            <div className="sticky start-0 z-20 flex flex-col justify-end p-4 sm:p-5 bg-white/95 dark:bg-[#050505]/95 border-e border-black/10 dark:border-white/15 md:border-e-0 text-start">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/45 dark:text-white/45">
                {cycleLabels[billingCycle]}
              </span>
              <span className="mt-1 text-sm font-bold text-black dark:text-white font-[var(--font-display)]">
                {capabilitiesHeader}
              </span>
            </div>

            {/* Standard Sticky Col */}
            <div className="flex flex-col items-center justify-between gap-2 p-4 sm:p-5 text-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-black/75 dark:text-white/80">
                  {standard.name}
                </p>
                <p className="mt-1 text-sm font-extrabold tabular-nums text-black dark:text-white">
                  {stdPrice.price}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onSelectPlan(
                    `${standard.name} — ${cycleLabels[billingCycle]} (${stdPrice.price} ${stdPrice.period})`
                  )
                }
                className="px-3.5 py-1 rounded-full border border-black/20 dark:border-white/25 text-[11px] font-bold text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-[#050505] transition-colors cursor-pointer whitespace-nowrap"
              >
                {standard.cta}
              </button>
            </div>

            {/* VIP Sticky Col — Continuous Highlight Vertical Frame */}
            <div className="relative flex flex-col items-center justify-between gap-2 p-4 sm:p-5 text-center border-x border-[#25d366]/50 dark:border-[#25d366]/45 bg-[#f2fbf6]/95 dark:bg-[#08130d]/95">
              <div
                aria-hidden="true"
                className="absolute top-0 inset-x-0 h-[2px] bg-[#25d366]"
              />
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-[#25d366]">
                  {vip.name}
                </p>
                <p className="mt-1 text-sm font-extrabold tabular-nums text-black dark:text-white">
                  {vipPrice.price}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onSelectPlan(
                    `${vip.name} — ${cycleLabels[billingCycle]} (${vipPrice.price} ${vipPrice.period})`
                  )
                }
                className="px-3.5 py-1 rounded-full bg-[#25d366] hover:bg-[#1fc25c] text-[#050505] text-[11px] font-extrabold transition-colors cursor-pointer whitespace-nowrap"
              >
                {vip.cta}
              </button>
            </div>

            {/* Custom Sticky Col */}
            <div className="flex flex-col items-center justify-between gap-2 p-4 sm:p-5 text-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-black/75 dark:text-white/80">
                  {custom.name}
                </p>
                <p className="mt-1 text-sm font-extrabold text-black dark:text-white">
                  {custom.priceLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onSelectPlan(custom.modalPlanLabel, custom.whatsappMessage)
                }
                className="px-3.5 py-1 rounded-full bg-black text-white dark:bg-white dark:text-[#050505] hover:opacity-85 text-[11px] font-bold transition-opacity cursor-pointer whitespace-nowrap"
              >
                {custom.ctaPrimary}
              </button>
            </div>
          </div>

          {/* MATRIX CATEGORIES & ROWS */}
          <div>
            {categories.map((category, catIdx) => (
              <div key={category.title}>
                {/* Category Header Row (VIP vertical borders continue seamlessly) */}
                <div
                  className={`grid grid-cols-[minmax(220px,1.8fr)_1fr_1fr_1fr] bg-zinc-50/90 dark:bg-[#0a0a0a] border-b border-black/10 dark:border-white/15 ${
                    catIdx > 0 ? "border-t border-black/10 dark:border-white/15" : ""
                  }`}
                >
                  <div className="sticky start-0 z-10 px-4 sm:px-5 py-3 bg-zinc-50 dark:bg-[#0a0a0a] border-e border-black/10 dark:border-white/15 md:border-e-0 text-start">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-black/55 dark:text-white/55">
                      {category.title}
                    </span>
                  </div>
                  <div aria-hidden="true" />
                  <div
                    aria-hidden="true"
                    className="border-x border-[#25d366]/50 dark:border-[#25d366]/45 bg-[#eef9f3]/75 dark:bg-[#08130d]/85"
                  />
                  <div aria-hidden="true" />
                </div>

                {/* Feature Rows */}
                {category.rows.map((row) => (
                  <div
                    key={row.feature}
                    className="group grid grid-cols-[minmax(220px,1.8fr)_1fr_1fr_1fr] border-b border-black/[0.07] dark:border-white/[0.08] last:border-b-0 hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Feature Name + Subtitle */}
                    <div className="sticky start-0 z-10 px-4 sm:px-5 py-3.5 bg-white dark:bg-[#050505] group-hover:bg-zinc-50/90 dark:group-hover:bg-[#090909] border-e border-black/10 dark:border-white/15 md:border-e-0 text-start transition-colors">
                      <p className="text-[13px] font-semibold text-black dark:text-white leading-snug">
                        {row.feature}
                      </p>
                      <p className="mt-0.5 text-[11px] text-black/50 dark:text-white/45 leading-relaxed">
                        {row.subtitle}
                      </p>
                    </div>

                    {/* Standard Value */}
                    <div className="flex items-center justify-center px-3 py-3.5">
                      <MatrixCell value={row.standard} />
                    </div>

                    {/* VIP Value (Continuous Vertical Highlight Column) */}
                    <div className="flex items-center justify-center px-3 py-3.5 border-x border-[#25d366]/50 dark:border-[#25d366]/45 bg-[#f4fbf7]/60 dark:bg-[#08130d]/65">
                      <MatrixCell value={row.vip} isVip />
                    </div>

                    {/* Custom Value */}
                    <div className="flex items-center justify-center px-3 py-3.5">
                      <MatrixCell value={row.custom} isCustom />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
