"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import HairlineFigure from "@/components/ui/HairlineFigure";

export default function FAQ() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = Array.from({ length: 7 }, (_, i) => ({
    q: t(`items.${i}.q`),
    a: t(`items.${i}.a`),
  }));

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleItem(index);
    }
  };

  return (
    <section id="faq" className="py-20 md:py-28 relative overflow-hidden">
      {/* Hairline subtle background grid */}
      <div className="absolute inset-0 hairline-grid opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 md:px-6 relative z-10">
        {/* Header with Hairline Query Figure */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 text-center sm:text-start rtl:sm:text-right">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass border-black/[0.06] dark:border-white/[0.1] text-brand-green text-xs font-semibold tracking-wider uppercase shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl font-[var(--font-display)] text-[var(--text-primary)]">
              {t("title")}
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Interactive Hairline Query Figure */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl apple-card p-2 shrink-0 flex items-center justify-center shadow-md hover:border-brand-green/40 transition-colors">
            <HairlineFigure
              name="query"
              intensity={0.8}
              play={true}
              className="w-full h-full"
              label="Interactive Question Figure"
            />
          </div>
        </div>

        {/* FAQ Items in an Apple Grouped List Container */}
        <div className="rounded-3xl apple-card divide-y divide-black/[0.06] dark:divide-white/[0.08] overflow-hidden p-2 sm:p-4 shadow-xl">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`transition-all duration-200 rounded-2xl ${
                  isOpen
                    ? "bg-brand-green/[0.04] dark:bg-brand-green/[0.06] border-s-2 border-s-brand-green ps-4 sm:ps-5 pe-2"
                    : "hover:bg-black/[0.02] dark:hover:bg-white/[0.03] ps-3 sm:ps-4 pe-2"
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggleItem(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="flex w-full items-center justify-between py-4.5 text-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center gap-3 pe-4">
                    <span className="text-xs font-bold text-brand-green/80 flex items-center justify-center w-5 h-5 rounded-full bg-brand-green/10">
                      {index + 1}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                      {item.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-brand-green transition-transform duration-200 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 pt-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-brand-green/10">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
