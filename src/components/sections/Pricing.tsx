"use client";
// Design intent: Multi-tier pricing cards in a grid layout (max 3 plans).
// Middle card is highlighted with a green gradient border and a badge to guide user focus.
// CTA buttons hook directly into the useBuyModal hook to trigger the WhatsApp/Social selection.
// Accessibility: semantic structure, list of features uses appropriate check icons.

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Check, ShoppingCart, Gift, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useBuyModal } from "@/components/ui/BuyModal";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";

interface Plan {
  name: string;
  priceDzd: string;
  priceUsd: string;
  periodDzd: string;
  periodUsd: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  originalPriceDzd?: string;
  originalPriceUsd?: string;
  discountBadgeDzd?: string;
  discountBadgeUsd?: string;
  promoNoticeDzd?: string;
  promoNoticeUsd?: string;
}

export default function Pricing() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const { openModal } = useBuyModal();
  const [currency, setCurrency] = useState<"DZD" | "USD">("DZD");

  // Retrieve raw plans from translations json
  const plans = t.raw("plans") as Plan[];

  return (
    <section id="pricing" className="py-20 md:py-28 relative overflow-hidden">
      {/* Hairline subtle background grid */}
      <div className="absolute inset-0 hairline-grid opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass border-black/[0.06] dark:border-white/[0.1] text-brand-green text-xs font-semibold tracking-wider uppercase mb-4 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span>LICENSING & PRICING</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl font-[var(--font-display)] text-[var(--text-primary)]">
            {t("title")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
            {t("subtitle")}
          </p>

          {/* Apple Segmented Control for Currency */}
          <div className="relative inline-flex p-1.5 apple-glass rounded-full shadow-xs justify-center mx-auto border border-black/[0.08] dark:border-white/[0.1]">
            <button
              type="button"
              onClick={() => setCurrency("DZD")}
              className={`relative px-5 py-2 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                currency === "DZD"
                  ? "text-emerald-600 dark:text-brand-green font-extrabold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold"
              }`}
            >
              {currency === "DZD" && (
                <motion.div
                  layoutId="active-currency-bg"
                  className="absolute inset-0 bg-white dark:bg-zinc-800/90 rounded-full shadow-md border border-black/[0.06] dark:border-white/[0.1]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{t("toggleDzd")}</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`relative px-5 py-2 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                currency === "USD"
                  ? "text-emerald-600 dark:text-brand-green font-extrabold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold"
              }`}
            >
              {currency === "USD" && (
                <motion.div
                  layoutId="active-currency-bg"
                  className="absolute inset-0 bg-white dark:bg-zinc-800/90 rounded-full shadow-md border border-black/[0.06] dark:border-white/[0.1]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{t("toggleUsd")}</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => {
            const isHighlighted = plan.highlighted;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col h-full"
              >
                {/* Apple Card Styling */}
                <div
                  className={`relative flex flex-col justify-between h-full rounded-3xl apple-card p-6 sm:p-8 transition-all duration-300 ${
                    isHighlighted
                      ? "apple-specular-edge border-2 border-brand-green/70 shadow-2xl shadow-brand-green/15"
                      : "hover:border-brand-green/40 shadow-lg"
                  }`}
                >
                  {/* Highlight Badge */}
                  {isHighlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                      <span className="rounded-full bg-gradient-to-r from-emerald-600 via-[#25d366] to-emerald-600 text-white px-4 py-1.5 text-xs font-extrabold tracking-wide uppercase shadow-lg shadow-brand-green/30 border border-white/30 flex items-center gap-1.5 whitespace-nowrap">
                        <span className="text-amber-300 drop-shadow-xs text-sm leading-none">★</span>
                        <span className="drop-shadow-xs font-black">{t("bestChoice")}</span>
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Plan Header */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="text-[11px] font-semibold text-brand-green tracking-wider uppercase mb-1">
                          {isHighlighted ? "Flagship Edition" : `Tier 0${index + 1}`}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold font-[var(--font-display)] text-[var(--text-primary)]">
                          {plan.name}
                        </h3>
                      </div>
                    </div>

                      {/* Price */}
                      <div className="mt-4 flex flex-col justify-start">
                        {/* Original Price & Discount Badge */}
                        {(currency === "DZD" ? plan.originalPriceDzd : plan.originalPriceUsd) && (
                          <div className="flex items-center gap-3 mb-2 justify-start">
                            <span className="text-sm line-through text-[var(--text-muted)] font-semibold opacity-75">
                              {currency === "DZD" ? plan.originalPriceDzd : plan.originalPriceUsd}
                            </span>
                            <motion.span
                              animate={{ scale: [1, 1.06, 1] }}
                              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                              className="text-[10px] font-black bg-gradient-to-r from-red-500 to-rose-600 text-white px-2.5 py-1 rounded-full shadow-md shadow-red-500/20 border border-red-400/20 tracking-wider uppercase font-[var(--font-display)]"
                            >
                              {currency === "DZD" ? plan.discountBadgeDzd : plan.discountBadgeUsd}
                            </motion.span>
                          </div>
                        )}
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:flex-wrap gap-1">
                          <div className="overflow-hidden h-11 flex items-center">
                            <motion.span
                              key={currency}
                              initial={{ y: 24, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 24 }}
                              className="text-3xl sm:text-4xl font-extrabold text-brand-green font-[var(--font-display)] leading-none"
                            >
                              {currency === "DZD" ? plan.priceDzd : plan.priceUsd}
                            </motion.span>
                          </div>
                          <motion.span
                            key={`period-${currency}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs sm:text-sm text-[var(--text-muted)] font-medium leading-none"
                          >
                            {currency === "DZD" ? plan.periodDzd : plan.periodUsd}
                          </motion.span>
                        </div>
                        {/* Promo Notice */}
                        {(currency === "DZD" ? plan.promoNoticeDzd : plan.promoNoticeUsd) && (
                          <span className="text-[11px] font-bold text-brand-green mt-2 flex items-center gap-1 justify-start">
                            <Zap className="h-3.5 w-3.5 fill-current shrink-0 animate-pulse text-amber-500" />
                            {currency === "DZD" ? plan.promoNoticeDzd : plan.promoNoticeUsd}
                          </span>
                        )}
                      </div>

                      {/* Marketing Message Box (حيز واضح وكتابة خاصة للرسالة التسوقية مع السعر القديم والتخفيض) */}
                      <div className={`mt-5 p-4 rounded-xl border text-left rtl:text-right ${
                        isHighlighted 
                          ? "bg-brand-green/5 border-brand-green/20" 
                          : plan.originalPriceDzd
                            ? "bg-red-500/5 border-red-500/10"
                            : "bg-blue-500/5 border-blue-500/10"
                      }`}>
                        <p className={`text-[13px] font-semibold leading-relaxed text-[var(--text-primary)] italic ${
                          (currency === "DZD" ? plan.originalPriceDzd : plan.originalPriceUsd) ? "mb-3" : "mb-0"
                        }`}>
                          {plan.description}
                        </p>

                        {(currency === "DZD" ? plan.originalPriceDzd : plan.originalPriceUsd) && (
                          <div className="flex flex-col gap-2 pt-3 border-t border-dashed border-border text-xs">
                            <div className="flex justify-between">
                              <span className="text-[var(--text-muted)] font-medium">
                                {locale === "ar" ? "السعر قبل التخفيض:" : locale === "fr" ? "Prix d'origine :" : "Original Price:"}
                              </span>
                              <span className="line-through text-red-500 font-bold">
                                {currency === "DZD" ? plan.originalPriceDzd : plan.originalPriceUsd}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[var(--text-muted)] font-medium">
                                {locale === "ar" ? "قيمة التخفيض الموفرة:" : locale === "fr" ? "Économie réalisée :" : "You Save:"}
                              </span>
                              <span className="text-emerald-500 dark:text-emerald-400 font-black text-sm animate-pulse">
                                {currency === "DZD" ? plan.discountBadgeDzd : plan.discountBadgeUsd}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <Separator className="my-6" />

                      {/* Special Free Bonuses Banner for VIP Plan */}
                      {isHighlighted && (
                        <div className="relative mb-6 p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 shadow-xs overflow-hidden text-left rtl:text-right">
                          <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-wider animate-pulse">
                            {locale === "ar" ? "هدية مجانية" : locale === "fr" ? "OFFERT" : "FREE BONUS"}
                          </div>
                          
                          <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3 flex items-center gap-1.5 font-[var(--font-display)] justify-start">
                            <Gift className="h-4 w-4 text-emerald-500 shrink-0" /> {locale === "ar" ? "العروض المجانية المشمولة بالرخصة:" : locale === "fr" ? "Bonus Exclusifs Offerts :" : "Included Free Bonuses:"}
                          </h4>
                          
                          <div className="space-y-3">
                            <div className="flex items-start gap-2.5">
                              <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-500 mt-0.5 shrink-0">
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-bold text-[var(--text-primary)]">
                                  {locale === "ar" ? "واجهة خاصة مخصصة حسب المحل" : locale === "fr" ? "Interface personnalisée selon votre marque" : "Custom Branded App Interface"}
                                </p>
                                <p className="text-[10px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                                  {locale === "ar" ? "نصمم لك ألوان وثيم لوحة التحكم متوافقة مع شعار وهوية صالونك" : locale === "fr" ? "Personnalisation complète du thème et logo de l'application de bureau" : "We tailor the app's visual style, colors, and logo to fit your brand"}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-2.5">
                              <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-500 mt-0.5 shrink-0">
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9c1.657 0 3 4.03 3 9s-1.343 9-3 9m0-18c-1.657 0-3 4.03-3 9s1.343 9 3 9m-9-9a9 9 0 019-9" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-bold text-[var(--text-primary)]">
                                  {locale === "ar" ? "موقع ويب استعراضي احترافي مجاناً" : locale === "fr" ? "Site web vitrine professionnel offert" : "Free Showcase Website"}
                                </p>
                                <p className="text-[10px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                                  {locale === "ar" ? "موقع تعريفي خاص بصالونك فيه الخدمات والصور والروابط لجلب زبائن جدد" : locale === "fr" ? "Un site public élégant avec galerie, tarifs et contacts pour attirer les clients" : "A public marketing website displaying your gallery, prices, and locations"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* What's Included */}
                      <p className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
                        {t("whatsIncluded")}
                      </p>

                      {/* Feature List */}
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-3">
                            <Check className="h-4 w-4 mt-0.5 text-brand-green shrink-0" />
                            <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button
                      className={`w-full mt-auto h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 cursor-pointer apple-press transition-all ${
                        isHighlighted
                          ? "apple-btn-primary shadow-md"
                          : "apple-card hover:border-brand-green/50 text-foreground"
                      }`}
                      onClick={() => openModal(plan.name)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>{plan.cta}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        {/* Payment Methods Showcase */}
        <div className="mt-16 text-center max-w-xl mx-auto apple-card p-6 sm:p-8 rounded-3xl shadow-lg">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold tracking-wider uppercase font-[var(--font-display)] mb-4">
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>{t("paymentsTitle")}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-5">
            {/* BaridiMob */}
            <a
              href="https://play.google.com/store/apps/details?id=ru.bpc.mobilebank.bpc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center apple-glass px-3.5 py-2 rounded-xl shadow-xs transition-transform duration-200 hover:scale-[1.03] hover:border-brand-green/40 cursor-pointer apple-press"
              title="BaridiMob App"
            >
              <img src="/baridimob.png" alt="BaridiMob" className="h-5 w-auto object-contain mr-2" />
              <span className="text-xs font-semibold text-foreground">BaridiMob</span>
            </a>
            {/* CCP */}
            <a
              href="https://en.wikipedia.org/wiki/Alg%C3%A9rie_Poste"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center apple-glass px-3.5 py-2 rounded-xl shadow-xs transition-transform duration-200 hover:scale-[1.03] hover:border-brand-green/40 cursor-pointer apple-press"
              title="Algérie Poste CCP"
            >
              <img src="/ccp.svg" alt="CCP" className="h-5 w-auto object-contain mr-2" />
              <span className="text-xs font-semibold text-foreground">CCP</span>
            </a>
            {/* Visa */}
            <div className="flex items-center justify-center apple-glass px-3.5 py-2 rounded-xl shadow-xs" title="Visa">
              <FaCcVisa className="h-5 w-8 text-[#151D8F] dark:text-white mr-2" />
              <span className="text-xs font-semibold text-foreground">Visa</span>
            </div>
            {/* Mastercard */}
            <div className="flex items-center justify-center apple-glass px-3.5 py-2 rounded-xl shadow-xs" title="Mastercard">
              <FaCcMastercard className="h-5 w-8 text-[#EB001B] mr-2" />
              <span className="text-xs font-semibold text-foreground">Mastercard</span>
            </div>
          </div>

          <div className="inline-block bg-brand-green/10 text-brand-green px-4 py-2 rounded-full border border-brand-green/20 mb-3">
            <span className="text-xs font-bold flex items-center justify-center gap-1.5">
              <Zap className="h-3.5 w-3.5 fill-current shrink-0" />
              <span>{t("activationNotice")}</span>
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            {t("contactToBuy")}
          </p>
        </div>
      </div>
    </section>
  );
}
