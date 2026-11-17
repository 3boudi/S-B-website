"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  Palette,
  ShoppingBag,
  LayoutDashboard,
  Truck,
  MessageSquare,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Printer,
  Sparkles,
  Tag,
  Wallet,
  FileText,
  Megaphone,
  Lock,
  ArrowDown,
  ShoppingCart,
  BadgePercent,
  Clock,
  Calendar,
  Eye,
  Code2,
  AlertCircle,
  Globe,
} from "lucide-react";
import { useBuyModal } from "@/components/ui/BuyModal";
import { useRouter, usePathname } from "@/i18n/routing";
import {
  OFFER_CONTENT,
  type OfferLocale,
  type ModuleIconKey,
  type PhaseIconKey,
} from "@/data/ecomShymssOffer";

const MODULE_ICONS: Record<ModuleIconKey, React.ComponentType<{ className?: string }>> = {
  palette: Palette,
  shoppingBag: ShoppingBag,
  layoutDashboard: LayoutDashboard,
  truck: Truck,
  messageSquare: MessageSquare,
  shieldCheck: ShieldCheck,
  rocket: Rocket,
};

const PHASE_ICONS: Record<PhaseIconKey, React.ComponentType<{ className?: string }>> = {
  palette: Palette,
  code2: Code2,
  rocket: Rocket,
};

const LOCALE_BUTTONS: Array<{ code: OfferLocale; label: string }> = [
  { code: "ar", label: "العربية" },
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
];

export default function EcomShymssOfferView() {
  const rawLocale = useLocale();
  const locale: OfferLocale =
    rawLocale === "fr" || rawLocale === "en" ? rawLocale : "ar";
  const isRTL = locale === "ar";
  const content = OFFER_CONTENT[locale];

  const router = useRouter();
  const pathname = usePathname();
  const { openModal } = useBuyModal();
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "promo">("promo");

  const handlePrint = () => {
    window.print();
  };

  const handleConfirmPlan = (planType: "standard" | "promo") => {
    const label =
      planType === "promo" ? content.option2ModalLabel : content.option1ModalLabel;
    openModal(label);
  };

  const handleSwitchLocale = (targetLocale: OfferLocale) => {
    if (targetLocale !== locale) {
      router.replace(pathname, { locale: targetLocale });
    }
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="relative overflow-hidden">
      {/* Hairline subtle grid + atmospheric glows matching the main site */}
      <div className="absolute inset-0 hairline-grid opacity-30 pointer-events-none print:hidden" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[460px] pointer-events-none -z-10 print:hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(37,211,102,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10 md:px-6 relative z-10 space-y-14">
        {/* ================================================================ */}
        {/* HERO QUOTATION HEADER                                            */}
        {/* ================================================================ */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="apple-card apple-specular-edge rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar: Logos, 3-Language Selector & Print */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl apple-glass border border-black/[0.06] dark:border-white/[0.1] shadow-xs">
                <Image
                  src="/logo.png"
                  alt="Salon DZ Tech"
                  width={34}
                  height={34}
                  className="rounded-lg object-contain"
                />
                <span className="text-xs sm:text-sm font-extrabold tracking-tight text-foreground">
                  Salon DZ Tech
                </span>
              </div>

              <span className="text-xs font-mono font-bold text-brand-green">×</span>

              <div className="px-4 py-2 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex items-center justify-center">
                <Image
                  src="/client.png"
                  alt="SHEYMSS"
                  width={100}
                  height={28}
                  className="h-6 w-auto object-contain"
                />
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap justify-center">
              {/* 3-Language Switcher Pill */}
              <div
                className="print:hidden inline-flex items-center gap-1 p-1 rounded-full apple-glass border border-black/[0.08] dark:border-white/[0.1] shadow-xs"
                role="group"
                aria-label="Language Switcher"
              >
                <Globe className="w-3.5 h-3.5 text-brand-green mx-1.5 shrink-0" />
                {LOCALE_BUTTONS.map((btn) => {
                  const active = locale === btn.code;
                  return (
                    <button
                      key={btn.code}
                      type="button"
                      onClick={() => handleSwitchLocale(btn.code)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? "bg-brand-green text-white shadow-xs"
                          : "text-[var(--text-secondary)] hover:text-foreground"
                      }`}
                    >
                      {btn.label}
                    </button>
                  );
                })}
              </div>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full apple-glass border border-brand-green/25 text-brand-green text-xs font-bold shadow-xs">
                <Lock className="w-3.5 h-3.5" />
                <span>{content.privateBadge}</span>
              </span>

              <button
                type="button"
                onClick={handlePrint}
                className="print:hidden inline-flex items-center gap-2 px-4 py-1.5 rounded-full apple-glass apple-press border border-black/[0.08] dark:border-white/[0.1] text-xs font-bold text-foreground hover:border-brand-green/50 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-brand-green" />
                <span>{content.printBtn}</span>
              </button>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 text-xs font-mono font-bold tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span dir="ltr">{content.heroPill}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-[var(--font-display)] text-[var(--text-primary)] leading-tight">
              <span dir="ltr" className="inline-block text-brand-green">
                {content.heroTitleBrand}
              </span>{" "}
              {content.heroTitleSuffix}
            </h1>

            <p className="text-sm sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto font-medium">
              {content.heroSubtitle}
            </p>
          </div>

          {/* Top Financial Snapshot Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mt-9">
            <div className="hairline-card rounded-2xl p-5 text-center space-y-1.5">
              <div className="text-xs font-bold text-[var(--text-muted)]">
                {content.kpiOriginalLabel}
              </div>
              <div
                dir="ltr"
                className="text-2xl sm:text-3xl font-black font-mono text-[var(--text-muted)] line-through opacity-80"
              >
                184,000 DA
              </div>
              <div className="text-[11px] font-semibold text-rose-500">
                {content.kpiOriginalSub} <span dir="ltr">−38,000 DA</span>
              </div>
            </div>

            <div className="hairline-card rounded-2xl p-5 text-center space-y-1.5 border-brand-green/35">
              <div className="text-xs font-bold text-brand-green">
                {content.kpiCurrentLabel}
              </div>
              <div
                dir="ltr"
                className="text-3xl sm:text-4xl font-black font-mono text-foreground"
              >
                146,000 DA
              </div>
              <div className="text-[11px] font-semibold text-[var(--text-secondary)]">
                {content.kpiCurrentSub}
              </div>
            </div>

            <div className="relative rounded-2xl p-5 text-center space-y-2.5 bg-gradient-to-br from-brand-green/15 via-emerald-500/10 to-transparent border-2 border-brand-green/60 shadow-lg shadow-brand-green/10">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-green text-white text-[10px] font-extrabold mb-0.5">
                <Tag className="w-3 h-3" />
                <span>{content.kpiPromoBadge}</span>
              </span>
              <div
                dir="ltr"
                className="text-3xl sm:text-4xl font-black font-mono text-brand-green"
              >
                124,000 DA
              </div>
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-600/10 dark:bg-red-500/15 border-2 border-red-600/50 dark:border-red-500/60 text-red-600 dark:text-red-400 text-base sm:text-lg font-black leading-snug shadow-xs">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{content.kpiPromoSub}</span>
              </div>
            </div>
          </div>

          {/* Quick Jump Pills */}
          <div className="mt-8 pt-6 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-wrap items-center justify-center gap-2 print:hidden">
            {content.modules.map((mod) => (
              <a
                key={mod.id}
                href={`#${mod.id}`}
                className="px-3 py-1.5 rounded-full apple-glass text-xs font-semibold text-[var(--text-secondary)] hover:text-brand-green hover:border-brand-green/40 transition-colors"
              >
                {mod.title}
              </a>
            ))}
            <a
              href="#financial-summary"
              className="px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/30 text-xs font-bold text-brand-green hover:bg-brand-green/20 transition-colors inline-flex items-center gap-1"
            >
              <span>{content.jumpSummary}</span>
              <ArrowDown className="w-3 h-3" />
            </a>
            <a
              href="#execution-timeline"
              className="px-3 py-1.5 rounded-full apple-glass border border-brand-green/25 text-xs font-bold text-brand-green hover:bg-brand-green/10 transition-colors inline-flex items-center gap-1"
            >
              <Clock className="w-3 h-3" />
              <span>{content.jumpTimeline}</span>
            </a>
          </div>
        </motion.section>

        {/* ================================================================ */}
        {/* 7 SERVICE BREAKDOWN SECTIONS                                     */}
        {/* ================================================================ */}
        <section className="space-y-8">
          {content.modules.map((mod, idx) => {
            const Icon = MODULE_ICONS[mod.icon];

            return (
              <motion.article
                key={mod.id}
                id={mod.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.2) }}
                className="scroll-mt-24 apple-card apple-specular-edge rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden"
              >
                {/* Module Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-black/[0.06] dark:border-white/[0.08]">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-green/10 dark:bg-brand-green/15 border border-brand-green/25 text-brand-green flex items-center justify-center shrink-0 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div
                        dir="ltr"
                        className="font-mono text-[10px] font-bold text-brand-green tracking-wider uppercase mb-1 text-start rtl:text-right"
                      >
                        [ {mod.code} ]
                      </div>
                      <h2 className="text-xl sm:text-2xl font-extrabold font-[var(--font-display)] text-[var(--text-primary)]">
                        {mod.title}
                      </h2>
                    </div>
                  </div>

                  <div
                    dir="ltr"
                    className="inline-flex items-center gap-2 self-start sm:self-center px-4 py-2 rounded-2xl bg-brand-green/10 border border-brand-green/30 text-brand-green font-mono font-black text-lg sm:text-xl shrink-0"
                  >
                    {mod.total}
                  </div>
                </div>

                {/* Module Description */}
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-5">
                  {mod.description}
                </p>

                {/* Optional Highlight Note */}
                {mod.highlightNote && (
                  <div className="mb-6 p-4 rounded-2xl bg-brand-green/10 border border-brand-green/25 text-xs sm:text-sm font-bold text-foreground flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                    <span>{mod.highlightNote}</span>
                  </div>
                )}

                {/* Feature & Price Table */}
                <div className="overflow-x-auto rounded-2xl border border-black/[0.07] dark:border-white/[0.08]">
                  <table className="w-full text-start border-collapse">
                    <thead>
                      <tr className="bg-black/[0.03] dark:bg-white/[0.04] border-b border-black/[0.07] dark:border-white/[0.08]">
                        <th className="py-3.5 px-4 sm:px-5 text-xs sm:text-sm font-extrabold text-[var(--text-primary)] text-start">
                          {content.tableFeatureCol}
                        </th>
                        <th className="py-3.5 px-4 sm:px-5 text-xs sm:text-sm font-extrabold text-[var(--text-primary)] text-end w-36 sm:w-44">
                          {content.tablePriceCol}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.05] dark:divide-white/[0.06]">
                      {mod.items.map((item, i) => (
                        <tr
                          key={i}
                          className="hover:bg-brand-green/[0.03] transition-colors"
                        >
                          <td className="py-3.5 px-4 sm:px-5 text-xs sm:text-sm text-[var(--text-secondary)] font-medium leading-relaxed text-start">
                            {item.feature}
                          </td>
                          <td
                            dir="ltr"
                            className="py-3.5 px-4 sm:px-5 text-xs sm:text-sm font-mono font-bold text-[var(--text-primary)] text-end whitespace-nowrap"
                          >
                            {item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-brand-green/[0.08] border-t-2 border-brand-green/30">
                        <td className="py-3.5 px-4 sm:px-5 text-sm font-black text-[var(--text-primary)] text-start">
                          {content.tableTotalLabel}
                        </td>
                        <td
                          dir="ltr"
                          className="py-3.5 px-4 sm:px-5 text-sm sm:text-base font-mono font-black text-brand-green text-end whitespace-nowrap"
                        >
                          {mod.total}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Extra Feature Bullets (Sections 3 & 5) */}
                {mod.extraPoints && mod.extraTitle && (
                  <div className="mt-6 p-5 rounded-2xl apple-glass border border-black/[0.06] dark:border-white/[0.08]">
                    <h3 className="text-sm font-extrabold text-[var(--text-primary)] mb-3">
                      {mod.extraTitle}
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {mod.extraPoints.map((pt, pIdx) => (
                        <li
                          key={pIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Order Status Pills (Section 4) */}
                {mod.statuses && mod.extraTitle && (
                  <div className="mt-6 p-5 rounded-2xl apple-glass border border-black/[0.06] dark:border-white/[0.08]">
                    <h3 className="text-sm font-extrabold text-[var(--text-primary)] mb-3">
                      {mod.extraTitle}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {mod.statuses.map((st) => (
                        <div
                          key={st.code}
                          className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold ${st.tone}`}
                        >
                          <span>{st.label}</span>
                          <span dir="ltr" className="font-mono font-black">
                            {st.code}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </section>

        {/* ================================================================ */}
        {/* FINANCIAL SUMMARY & DISCOUNTS                                    */}
        {/* ================================================================ */}
        <section id="financial-summary" className="scroll-mt-24 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass border border-brand-green/25 text-brand-green text-xs font-bold">
              <BadgePercent className="w-4 h-4" />
              <span>{content.financialBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-[var(--font-display)] text-[var(--text-primary)]">
              {content.financialTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Table 1: Breakdown by Section */}
            <div className="apple-card apple-specular-edge rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-extrabold font-[var(--font-display)] text-[var(--text-primary)] mb-4">
                  {content.sectionsTableTitle}
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-black/[0.07] dark:border-white/[0.08]">
                  <table className="w-full text-start border-collapse">
                    <thead>
                      <tr className="bg-black/[0.03] dark:bg-white/[0.04] border-b border-black/[0.07] dark:border-white/[0.08]">
                        <th className="py-3 px-4 text-xs sm:text-sm font-extrabold text-[var(--text-primary)] text-start">
                          {content.sectionsColLabel}
                        </th>
                        <th className="py-3 px-4 text-xs sm:text-sm font-extrabold text-[var(--text-primary)] text-end">
                          {content.sectionsPriceLabel}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.05] dark:divide-white/[0.06]">
                      {content.summaryRows.map((row, idx) => (
                        <tr key={idx}>
                          <td className="py-3 px-4 text-xs sm:text-sm text-[var(--text-secondary)] font-medium text-start">
                            {row.section}
                          </td>
                          <td
                            dir="ltr"
                            className="py-3 px-4 text-xs sm:text-sm font-mono font-bold text-[var(--text-primary)] text-end whitespace-nowrap"
                          >
                            {row.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-black/[0.04] dark:bg-white/[0.05] border-t-2 border-black/[0.1] dark:border-white/[0.12]">
                        <td className="py-3.5 px-4 text-xs sm:text-sm font-black text-[var(--text-primary)] text-start">
                          {content.sectionsTotalLabel}
                        </td>
                        <td
                          dir="ltr"
                          className="py-3.5 px-4 text-sm sm:text-base font-mono font-black text-[var(--text-primary)] text-end whitespace-nowrap"
                        >
                          184,000 DA
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Table 2: Commercial Pricing & Discounts */}
            <div className="apple-card apple-specular-edge rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-brand-green/50 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-lg font-extrabold font-[var(--font-display)] text-[var(--text-primary)] mb-4">
                  {content.commercialTitle}
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-black/[0.07] dark:border-white/[0.08]">
                  <table className="w-full text-start border-collapse">
                    <thead>
                      <tr className="bg-black/[0.03] dark:bg-white/[0.04] border-b border-black/[0.07] dark:border-white/[0.08]">
                        <th className="py-3 px-4 text-xs sm:text-sm font-extrabold text-[var(--text-primary)] text-start">
                          {content.commercialItemCol}
                        </th>
                        <th className="py-3 px-4 text-xs sm:text-sm font-extrabold text-[var(--text-primary)] text-end">
                          {content.commercialAmountCol}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.05] dark:divide-white/[0.06]">
                      {content.commercialBreakdown.map((item, idx) => {
                        const rowBg =
                          item.style === "final"
                            ? "bg-brand-green/15 font-black"
                            : item.style === "current"
                              ? "bg-black/[0.02] dark:bg-white/[0.03] font-bold"
                              : "";
                        const amountColor =
                          item.style === "discount"
                            ? "text-rose-500"
                            : item.style === "final"
                              ? "text-brand-green text-base"
                              : "text-[var(--text-primary)]";

                        return (
                          <tr key={idx} className={rowBg}>
                            <td className="py-3.5 px-4 text-xs sm:text-sm text-[var(--text-primary)] text-start">
                              {item.label}
                            </td>
                            <td
                              dir="ltr"
                              className={`py-3.5 px-4 text-xs sm:text-sm font-mono font-bold text-end whitespace-nowrap ${amountColor}`}
                            >
                              {item.amount}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Price Summary Callouts */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl apple-glass border border-black/[0.07] dark:border-white/[0.1] flex items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                    {content.currentPriceLabel}
                  </span>
                  <span className="text-lg sm:text-xl font-black font-mono text-[var(--text-primary)]">
                    {content.currentPriceValue}
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-green/15 to-emerald-500/5 border border-brand-green/40 space-y-2.5">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="text-sm sm:text-base font-extrabold text-brand-green">
                      {content.promoPriceLabel}
                    </span>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-brand-green">
                      {content.promoPriceValue}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[var(--text-secondary)]">
                    {content.promoPriceWords}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-600/10 dark:bg-red-500/15 border border-red-600/45 dark:border-red-500/55 text-red-600 dark:text-red-400 text-sm sm:text-base font-black">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{content.kpiPromoSub}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* PAYMENT TERMS (TWO OPTIONS)                                      */}
        {/* ================================================================ */}
        <section id="payment-terms" className="scroll-mt-24 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass border border-brand-green/25 text-brand-green text-xs font-bold">
              <Wallet className="w-4 h-4" />
              <span>{content.paymentBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-[var(--font-display)] text-[var(--text-primary)]">
              {content.paymentTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Option 1: Without Promo Contract */}
            <div
              onClick={() => setSelectedPlan("standard")}
              className={`apple-card apple-specular-edge rounded-3xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                selectedPlan === "standard"
                  ? "border-2 border-brand-green shadow-2xl shadow-brand-green/10"
                  : "border border-black/[0.08] dark:border-white/[0.1] hover:border-brand-green/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full apple-glass text-xs font-bold text-[var(--text-muted)]">
                    {content.option1Tag}
                  </span>
                  <span
                    dir="ltr"
                    className="font-mono font-black text-xl text-foreground"
                  >
                    146,000 DA
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold font-[var(--font-display)] text-[var(--text-primary)] mb-5">
                  {content.option1Title} —{" "}
                  <span dir="ltr" className="font-mono">
                    146,000 DA
                  </span>
                </h3>

                <div className="overflow-x-auto rounded-2xl border border-black/[0.07] dark:border-white/[0.08] mb-6">
                  <table className="w-full text-start border-collapse">
                    <thead>
                      <tr className="bg-black/[0.03] dark:bg-white/[0.04] border-b border-black/[0.07] dark:border-white/[0.08]">
                        <th className="py-3 px-4 text-xs sm:text-sm font-extrabold text-start">
                          {content.paymentColLabel}
                        </th>
                        <th className="py-3 px-4 text-xs sm:text-sm font-extrabold text-end">
                          {content.paymentAmountCol}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.05] dark:divide-white/[0.06]">
                      <tr>
                        <td className="py-3.5 px-4 text-xs sm:text-sm text-[var(--text-secondary)] text-start">
                          {content.option1Initial}
                        </td>
                        <td
                          dir="ltr"
                          className="py-3.5 px-4 text-xs sm:text-sm font-mono font-bold text-end whitespace-nowrap"
                        >
                          31,000 DA
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 text-xs sm:text-sm text-[var(--text-secondary)] text-start">
                          {content.option1Remaining}
                        </td>
                        <td
                          dir="ltr"
                          className="py-3.5 px-4 text-xs sm:text-sm font-mono font-bold text-end whitespace-nowrap"
                        >
                          115,000 DA
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-black/[0.04] dark:bg-white/[0.05] border-t-2 border-black/[0.08] dark:border-white/[0.12]">
                        <td className="py-3.5 px-4 text-sm font-black text-start">
                          {content.paymentTotalLabel}
                        </td>
                        <td
                          dir="ltr"
                          className="py-3.5 px-4 text-sm sm:text-base font-mono font-black text-end whitespace-nowrap"
                        >
                          146,000 DA
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPlan("standard");
                  handleConfirmPlan("standard");
                }}
                className="w-full h-12 rounded-2xl apple-card apple-press border border-black/[0.1] dark:border-white/[0.15] hover:border-brand-green/60 font-bold text-sm flex items-center justify-center gap-2 text-foreground cursor-pointer print:hidden"
              >
                <ShoppingCart className="w-4 h-4 text-brand-green" />
                <span>{content.option1Cta}</span>
              </button>
            </div>

            {/* Option 2: With Promo Contract */}
            <div
              onClick={() => setSelectedPlan("promo")}
              className={`apple-card apple-specular-edge rounded-3xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer relative overflow-hidden transition-all duration-300 ${
                selectedPlan === "promo"
                  ? "border-2 border-brand-green shadow-2xl shadow-brand-green/15"
                  : "border border-brand-green/40 hover:border-brand-green/70"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green text-white text-xs font-extrabold shadow-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{content.option2Tag}</span>
                  </span>
                  <span
                    dir="ltr"
                    className="font-mono font-black text-xl text-brand-green"
                  >
                    124,000 DA
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold font-[var(--font-display)] text-[var(--text-primary)] mb-3">
                  {content.option2Title} —{" "}
                  <span dir="ltr" className="font-mono text-brand-green">
                    124,000 DA
                  </span>
                </h3>

                <div className="mb-5 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-600/10 dark:bg-red-500/15 border-2 border-red-600/45 dark:border-red-500/55 text-red-600 dark:text-red-400 text-sm sm:text-base font-black">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{content.kpiPromoSub}</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-brand-green/25 mb-6">
                  <table className="w-full text-start border-collapse">
                    <thead>
                      <tr className="bg-brand-green/10 border-b border-brand-green/20">
                        <th className="py-3 px-4 text-xs sm:text-sm font-extrabold text-start">
                          {content.paymentColLabel}
                        </th>
                        <th className="py-3 px-4 text-xs sm:text-sm font-extrabold text-end">
                          {content.paymentAmountCol}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.05] dark:divide-white/[0.06]">
                      <tr>
                        <td className="py-3.5 px-4 text-xs sm:text-sm text-[var(--text-secondary)] text-start">
                          {content.option2Initial}
                        </td>
                        <td
                          dir="ltr"
                          className="py-3.5 px-4 text-xs sm:text-sm font-mono font-bold text-end whitespace-nowrap"
                        >
                          31,000 DA
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 text-xs sm:text-sm text-[var(--text-secondary)] text-start">
                          {content.option2Remaining}
                        </td>
                        <td
                          dir="ltr"
                          className="py-3.5 px-4 text-xs sm:text-sm font-mono font-bold text-end whitespace-nowrap"
                        >
                          93,000 DA
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-brand-green/15 border-t-2 border-brand-green/35">
                        <td className="py-3.5 px-4 text-sm font-black text-start">
                          {content.paymentTotalLabel}
                        </td>
                        <td
                          dir="ltr"
                          className="py-3.5 px-4 text-sm sm:text-base font-mono font-black text-brand-green text-end whitespace-nowrap"
                        >
                          124,000 DA
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPlan("promo");
                  handleConfirmPlan("promo");
                }}
                className="w-full h-12 rounded-2xl apple-btn-primary apple-press font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg print:hidden"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{content.option2Cta}</span>
              </button>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* PROJECT EXECUTION TIMELINE (30 TO 35 DAYS)                       */}
        {/* ================================================================ */}
        <section id="execution-timeline" className="scroll-mt-24 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass border border-brand-green/25 text-brand-green text-xs font-bold">
              <Calendar className="w-4 h-4" />
              <span>{content.timelineBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-[var(--font-display)] text-[var(--text-primary)]">
              {content.timelineTitle}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              {content.timelineSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {content.phases.map((phase) => {
              const Icon = PHASE_ICONS[phase.icon];
              return (
                <div
                  key={phase.step}
                  className="apple-card apple-specular-edge rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    {/* Phase Top Bar */}
                    <div className="flex items-center justify-between gap-2 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-brand-green/10 border border-brand-green/25 text-brand-green flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div
                            dir="ltr"
                            className="font-mono text-[10px] font-bold text-brand-green tracking-wider text-start rtl:text-right"
                          >
                            [ {phase.code} ]
                          </div>
                          <h3 className="text-base sm:text-lg font-extrabold font-[var(--font-display)] text-[var(--text-primary)]">
                            {phase.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-brand-green/10 border border-brand-green/25">
                      <span className="text-xs font-bold text-[var(--text-secondary)] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-green" />
                        <span>{content.timelineDurationLabel}</span>
                      </span>
                      <span className="text-sm font-extrabold text-brand-green">
                        {phase.duration}
                      </span>
                    </div>

                    {phase.subtitle && (
                      <p className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                        {phase.subtitle}
                      </p>
                    )}

                    {/* Phase Tasks */}
                    <ul className="space-y-2.5">
                      {phase.tasks.map((task, tIdx) => (
                        <li
                          key={tIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Phase 1 Milestone & Approval Gate */}
                  {phase.milestone && (
                    <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] space-y-3">
                      <div className="p-3.5 rounded-2xl bg-brand-green/10 border border-brand-green/30 text-xs leading-relaxed text-[var(--text-primary)] font-medium space-y-1.5">
                        <div className="flex items-center gap-1.5 font-extrabold text-brand-green">
                          <Eye className="w-4 h-4 shrink-0" />
                          <span>{phase.milestone.previewTitle}</span>
                        </div>
                        <p>{phase.milestone.previewNote}</p>
                      </div>

                      <div className="p-3 rounded-2xl apple-glass border border-black/[0.06] dark:border-white/[0.08] text-xs font-bold text-[var(--text-primary)]">
                        {phase.milestone.approvalNote}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Total Duration & Important Note Banner */}
          <div className="apple-card apple-specular-edge rounded-3xl p-6 sm:p-8 border border-brand-green/40 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-brand-green shrink-0" />
                <span className="text-base sm:text-lg font-extrabold text-[var(--text-primary)]">
                  {content.timelineTotalLabel}
                </span>
              </div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-green text-white text-sm font-black shadow-xs self-start sm:self-center">
                {content.timelineTotalValue}
              </span>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs sm:text-sm font-bold leading-relaxed">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p>{content.timelineNote}</p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* PROMOTIONAL DISCOUNT TERMS                                       */}
        {/* ================================================================ */}
        <section className="apple-card apple-specular-edge rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-red-600/35 dark:border-red-500/40 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-red-600/20 dark:border-red-500/25">
            <div className="w-11 h-11 rounded-2xl bg-red-600/10 dark:bg-red-500/15 border border-red-600/30 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-[var(--font-display)] text-red-600 dark:text-red-400">
                {content.promoTermsTitle}
              </h2>
            </div>
          </div>

          <ol className="space-y-3">
            {content.promoTerms.map((rule, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl apple-glass border border-red-600/15 dark:border-red-500/20"
              >
                <span className="w-6 h-6 rounded-full bg-red-600/15 text-red-600 dark:text-red-400 font-mono font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-semibold">
                  {rule}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* ================================================================ */}
        {/* GENERAL CONTRACTUAL NOTES                                        */}
        {/* ================================================================ */}
        <section className="apple-card apple-specular-edge rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div className="w-11 h-11 rounded-2xl bg-brand-green/10 border border-brand-green/25 text-brand-green flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-[var(--font-display)] text-[var(--text-primary)]">
                {content.generalNotesTitle}
              </h2>
            </div>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {content.generalNotes.map((note, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 p-3.5 rounded-2xl apple-glass border border-black/[0.05] dark:border-white/[0.07] text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ================================================================ */}
        {/* OFFICIAL QUOTATION SIGN-OFF                                      */}
        {/* ================================================================ */}
        <section className="relative rounded-3xl p-8 sm:p-10 border border-brand-green/30 apple-specular-edge bg-gradient-to-b from-brand-green/15 via-[#0D1913] to-[#070D0A] text-white shadow-2xl text-center space-y-5 overflow-hidden">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
            <Image
              src="/logo.png"
              alt="Salon DZ Tech"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span className="font-bold text-sm tracking-wide" dir="ltr">
              Salon DZ Tech
            </span>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-extrabold font-[var(--font-display)]" dir="ltr">
              Salon DZ Tech
            </h2>
            <p className="text-sm sm:text-base font-mono font-bold text-brand-green" dir="ltr">
              E-COM SHYMSS — Project Quotation
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 print:hidden">
            <button
              type="button"
              onClick={() => handleConfirmPlan(selectedPlan)}
              className="apple-btn-primary apple-press px-7 h-12 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>
                {content.confirmBtnPrefix} ({selectedPlan === "promo" ? "124,000 DA" : "146,000 DA"})
              </span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-6 h-12 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>{content.printFooterBtn}</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
