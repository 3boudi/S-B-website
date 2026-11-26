"use client";

import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
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
      className={`inline-flex items-center justify-center px-2 py-0.5 text-[10.5px] sm:text-[11px] font-semibold leading-tight text-center rounded-sm ${
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
  categories,
  billingCycle,
  currency,
  cycleLabels,
  standard,
  vip,
  custom,
  onSelectPlan,
}: ComparisonMatrixProps) {
  const [mobileCompareMode, setMobileCompareMode] = useState<"std-vip" | "custom">("std-vip");
  const [openMobileCats, setOpenMobileCats] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const toggleMobileCat = (idx: number) =>
    setOpenMobileCats((prev) => ({ ...prev, [idx]: !prev[idx] }));
  const stdPrice = standard.pricing[currency][billingCycle];
  const vipPrice = vip.pricing[currency][billingCycle];

  return (
    <div id="comparison-matrix" className="mt-14 sm:mt-20 md:mt-24 scroll-mt-24">
      {/* Matrix Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 text-start">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-[#25d366] mb-2">
            <span className="h-1.5 w-1.5 bg-[#25d366]" />
            <span>{eyebrow}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-[var(--font-display)] text-black dark:text-white">
            {title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-black/60 dark:text-white/60 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Mobile Zero-Overflow Mode Switcher (md:hidden) */}
        <div className="md:hidden grid grid-cols-2 p-1 border border-black/15 dark:border-white/15 bg-white dark:bg-[#0a0a0a] rounded-xl gap-1 w-full">
          <button
            type="button"
            onClick={() => setMobileCompareMode("std-vip")}
            className={`min-h-[42px] px-3 py-2 rounded-lg text-xs font-extrabold transition-colors cursor-pointer ${
              mobileCompareMode === "std-vip"
                ? "bg-[#25d366] text-[#050505]"
                : "text-black/60 dark:text-white/65"
            }`}
          >
            {standard.name} vs {vip.name}
          </button>
          <button
            type="button"
            onClick={() => setMobileCompareMode("custom")}
            className={`min-h-[42px] px-3 py-2 rounded-lg text-xs font-extrabold transition-colors cursor-pointer ${
              mobileCompareMode === "custom"
                ? "bg-black text-white dark:bg-white dark:text-[#050505]"
                : "text-black/60 dark:text-white/65"
            }`}
          >
            {custom.name}
          </button>
        </div>
      </div>

      {/* =================================================================
          MOBILE ZERO-OVERFLOW COMPARISON VIEW (< md)
          ================================================================= */}
      <div className="md:hidden border border-black/10 dark:border-white/15 bg-white dark:bg-[#050505] overflow-hidden">
        {mobileCompareMode === "std-vip" ? (
          <>
            {/* Mobile Sticky Mini Header: Standard vs VIP */}
            <div className="grid grid-cols-[1.25fr_0.85fr_0.9fr] border-b border-black/10 dark:border-white/15 bg-zinc-50/95 dark:bg-[#0a0a0a]/95">
              <div className="px-3 py-3 text-start flex flex-col justify-end">
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-black/45 dark:text-white/45">
                  {cycleLabels[billingCycle]}
                </span>
                <span className="text-xs font-extrabold text-black dark:text-white">
                  {capabilitiesHeader}
                </span>
              </div>
              <div className="px-2 py-3 text-center flex flex-col justify-between items-center gap-1">
                <span className="text-[10.5px] font-bold text-black/75 dark:text-white/80 leading-tight">
                  {standard.name}
                </span>
                <span className="text-xs font-extrabold tabular-nums text-black dark:text-white">
                  {stdPrice.price}
                </span>
              </div>
              <div className="relative px-2 py-3 text-center flex flex-col justify-between items-center gap-1 border-s border-[#25d366]/50 bg-[#f2fbf6] dark:bg-[#08130d]">
                <div aria-hidden="true" className="absolute top-0 inset-x-0 h-[2px] bg-[#25d366]" />
                <span className="text-[10.5px] font-extrabold text-emerald-700 dark:text-[#25d366] leading-tight">
                  {vip.name}
                </span>
                <span className="text-xs font-extrabold tabular-nums text-black dark:text-white">
                  {vipPrice.price}
                </span>
              </div>
            </div>

            {categories.map((category, catIdx) => {
              const isOpen = !!openMobileCats[catIdx];
              return (
                <div key={category.title}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleMobileCat(catIdx)}
                    className={`w-full min-h-[44px] flex items-center justify-between gap-2 px-3 py-2.5 bg-zinc-100/85 dark:bg-[#0b0b0b] border-b border-black/10 dark:border-white/15 text-start cursor-pointer ${
                      catIdx > 0 ? "border-t border-black/10 dark:border-white/15" : ""
                    }`}
                  >
                    <span className="text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-black/75 dark:text-white/80">
                      {category.title}
                    </span>
                    <span className="inline-flex items-center gap-1.5 shrink-0">
                      <span className="inline-flex items-center justify-center rounded-full bg-black/[0.06] dark:bg-white/[0.08] px-2 py-0.5 text-[10px] font-bold tabular-nums text-black/60 dark:text-white/65">
                        {category.rows.length}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-black/55 dark:text-white/55 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  {isOpen &&
                    category.rows.map((row) => (
                      <div
                        key={row.feature}
                        className="grid grid-cols-[1.25fr_0.85fr_0.9fr] border-b border-black/[0.06] dark:border-white/[0.08] last:border-b-0"
                      >
                        <div className="px-3 py-3 text-start">
                          <p className="text-xs font-semibold text-black dark:text-white leading-snug">
                            {row.feature}
                          </p>
                          <p className="mt-0.5 text-[10.5px] text-black/50 dark:text-white/50 leading-snug">
                            {row.subtitle}
                          </p>
                        </div>
                        <div className="flex items-center justify-center px-1.5 py-3">
                          <MatrixCell value={row.standard} />
                        </div>
                        <div className="flex items-center justify-center px-1.5 py-3 border-s border-[#25d366]/40 bg-[#f4fbf7]/60 dark:bg-[#08130d]/65">
                          <MatrixCell value={row.vip} isVip />
                        </div>
                      </div>
                    ))}
                </div>
              );
            })}

            {/* Quick Action Footer on Mobile Compare */}
            <div className="grid grid-cols-2 gap-2 p-3 border-t border-black/10 dark:border-white/15 bg-zinc-50 dark:bg-[#0a0a0a]">
              <button
                type="button"
                onClick={() =>
                  onSelectPlan(
                    `${standard.name} — ${cycleLabels[billingCycle]} (${stdPrice.price} ${stdPrice.period})`
                  )
                }
                className="min-h-[44px] px-3 py-2 rounded-full border border-black/20 dark:border-white/25 text-xs font-bold text-black dark:text-white cursor-pointer"
              >
                {standard.cta}
              </button>
              <button
                type="button"
                onClick={() =>
                  onSelectPlan(
                    `${vip.name} — ${cycleLabels[billingCycle]} (${vipPrice.price} ${vipPrice.period})`
                  )
                }
                className="min-h-[44px] px-3 py-2 rounded-full bg-[#25d366] text-[#050505] text-xs font-extrabold cursor-pointer"
              >
                {vip.cta}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Mobile Custom Capabilities View */}
            {categories.map((category, catIdx) => {
              const isOpen = !!openMobileCats[catIdx];
              return (
                <div key={category.title}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleMobileCat(catIdx)}
                    className={`w-full min-h-[44px] flex items-center justify-between gap-2 px-3.5 py-2.5 bg-zinc-100/85 dark:bg-[#0b0b0b] border-b border-black/10 dark:border-white/15 text-start cursor-pointer ${
                      catIdx > 0 ? "border-t border-black/10 dark:border-white/15" : ""
                    }`}
                  >
                    <span className="text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-black/75 dark:text-white/80">
                      {category.title}
                    </span>
                    <span className="inline-flex items-center gap-1.5 shrink-0">
                      <span className="inline-flex items-center justify-center rounded-full bg-black/[0.06] dark:bg-white/[0.08] px-2 py-0.5 text-[10px] font-bold tabular-nums text-black/60 dark:text-white/65">
                        {category.rows.length}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-black/55 dark:text-white/55 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>
                  {isOpen &&
                    category.rows.map((row) => (
                      <div
                        key={row.feature}
                        className="flex items-center justify-between gap-3 px-3.5 py-3 border-b border-black/[0.06] dark:border-white/[0.08] last:border-b-0"
                      >
                        <div className="text-start min-w-0">
                          <p className="text-xs font-semibold text-black dark:text-white leading-snug">
                            {row.feature}
                          </p>
                          <p className="mt-0.5 text-[10.5px] text-black/50 dark:text-white/50 leading-snug">
                            {row.subtitle}
                          </p>
                        </div>
                        <div className="shrink-0">
                          <MatrixCell value={row.custom} isCustom />
                        </div>
                      </div>
                    ))}
                </div>
              );
            })}
            <div className="p-3 border-t border-black/10 dark:border-white/15 bg-zinc-50 dark:bg-[#0a0a0a]">
              <button
                type="button"
                onClick={() =>
                  onSelectPlan(custom.modalPlanLabel, custom.whatsappMessage)
                }
                className="w-full min-h-[46px] px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-[#050505] text-xs font-bold cursor-pointer"
              >
                {custom.ctaPrimary}
              </button>
            </div>
          </>
        )}
      </div>

      {/* =================================================================
          DESKTOP & TABLET FULL 4-COLUMN STICKY MATRIX (md+)
          ================================================================= */}
      <div className="hidden md:block overflow-visible border border-black/10 dark:border-white/15 bg-white dark:bg-[#050505]">
        <div>
          {/* STICKY HEADER ROW (docks flush below fixed 64px Navbar on desktop) */}
          <div className="sticky top-16 z-30 grid grid-cols-[minmax(220px,1.8fr)_1fr_1fr_1fr] bg-white/95 dark:bg-[#050505]/95 backdrop-blur-md border-b border-black/10 dark:border-white/15">
            {/* Feature Column Header */}
            <div className="flex flex-col justify-end p-4 sm:p-5 bg-white/95 dark:bg-[#050505]/95 text-start">
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
                className="px-3.5 py-1.5 rounded-full border border-black/20 dark:border-white/25 text-[11px] font-bold text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-[#050505] transition-colors cursor-pointer whitespace-nowrap"
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
                className="px-3.5 py-1.5 rounded-full bg-[#25d366] hover:bg-[#1fc25c] text-[#050505] text-[11px] font-extrabold transition-colors cursor-pointer whitespace-nowrap"
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
                className="px-3.5 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-[#050505] hover:opacity-85 text-[11px] font-bold transition-opacity cursor-pointer whitespace-nowrap"
              >
                {custom.ctaPrimary}
              </button>
            </div>
          </div>

          {/* MATRIX CATEGORIES & ROWS */}
          <div>
            {categories.map((category, catIdx) => (
              <div key={category.title}>
                <div
                  className={`grid grid-cols-[minmax(220px,1.8fr)_1fr_1fr_1fr] bg-zinc-50/90 dark:bg-[#0a0a0a] border-b border-black/10 dark:border-white/15 ${
                    catIdx > 0 ? "border-t border-black/10 dark:border-white/15" : ""
                  }`}
                >
                  <div className="px-4 sm:px-5 py-3 bg-zinc-50 dark:bg-[#0a0a0a] text-start">
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

                {category.rows.map((row) => (
                  <div
                    key={row.feature}
                    className="group grid grid-cols-[minmax(220px,1.8fr)_1fr_1fr_1fr] border-b border-black/[0.07] dark:border-white/[0.08] last:border-b-0 hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="px-4 sm:px-5 py-3.5 bg-white dark:bg-[#050505] group-hover:bg-zinc-50/90 dark:group-hover:bg-[#090909] text-start transition-colors">
                      <p className="text-[13px] font-semibold text-black dark:text-white leading-snug">
                        {row.feature}
                      </p>
                      <p className="mt-0.5 text-[11px] text-black/50 dark:text-white/45 leading-relaxed">
                        {row.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-center px-3 py-3.5">
                      <MatrixCell value={row.standard} />
                    </div>

                    <div className="flex items-center justify-center px-3 py-3.5 border-x border-[#25d366]/50 dark:border-[#25d366]/45 bg-[#f4fbf7]/60 dark:bg-[#08130d]/65">
                      <MatrixCell value={row.vip} isVip />
                    </div>

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
