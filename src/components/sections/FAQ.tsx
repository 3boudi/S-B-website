"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HairlineFigure from "@/components/ui/HairlineFigure";

type FaqCategoryKey = "all" | "plans" | "features" | "custom";

interface FaqItem {
  q: string;
  a: string;
  category: Exclude<FaqCategoryKey, "all">;
}

const CATEGORY_KEYS: FaqCategoryKey[] = ["all", "plans", "features", "custom"];

export default function FAQ() {
  const t = useTranslations("faq");
  const [activeCategory, setActiveCategory] = useState<FaqCategoryKey>("all");
  const [openKey, setOpenKey] = useState<string | null>("0");

  const allItems = t.raw("items") as FaqItem[];
  const categoryLabels = t.raw("categories") as Record<FaqCategoryKey, string>;

  const visibleItems = allItems
    .map((item, idx) => ({ ...item, id: String(idx) }))
    .filter((item) => activeCategory === "all" || item.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenKey((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleItem(id);
    }
  };

  return (
    <section id="faq" className="py-14 sm:py-20 md:py-28 relative overflow-x-clip scroll-mt-20">
      {/* Hairline subtle background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hairline-grid opacity-30 pointer-events-none"
      />

      <div className="mx-auto max-w-4xl px-4 md:px-6 relative z-10">
        {/* Header with Hairline Query Figure */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 text-center sm:text-start">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-black/10 dark:border-white/15 bg-white/80 dark:bg-[#0a0a0a]/90 text-emerald-700 dark:text-[#25d366] text-[11px] font-bold tracking-[0.16em] uppercase">
              <span className="h-1.5 w-1.5 bg-[#25d366]" />
              <span>{t("eyebrow")}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-[var(--font-display)] text-black dark:text-white">
              {t("title")}
            </h2>
            <p className="text-sm sm:text-lg text-black/60 dark:text-white/60 max-w-xl leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Interactive Hairline Query Figure (compact on phones) */}
          <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-sm border border-black/10 dark:border-white/15 bg-white dark:bg-[#050505] p-1.5 sm:p-2 shrink-0 flex items-center justify-center hover:border-[#25d366]/50 transition-colors">
            <HairlineFigure
              name="query"
              intensity={0.8}
              play={true}
              className="w-full h-full"
              label="Interactive Question Figure"
            />
          </div>
        </div>

        {/* Swipeable Ergonomic Category Filter Tabs */}
        <div
          role="tablist"
          className="mb-5 sm:mb-6 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
        >
          {CATEGORY_KEYS.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenKey(null);
                }}
                className={`min-h-[40px] px-4 py-2 text-xs font-bold rounded-full border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? "border-[#25d366] bg-[#25d366] text-[#050505]"
                    : "border-black/15 dark:border-white/15 bg-white dark:bg-[#0a0a0a] text-black/65 dark:text-white/65 hover:border-black/35 dark:hover:border-white/35 hover:text-black dark:hover:text-white"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            );
          })}
        </div>

        {/* Architectural Hairline FAQ List */}
        <div className="border border-black/10 dark:border-white/15 bg-white dark:bg-[#050505] divide-y divide-black/10 dark:divide-white/15">
          {visibleItems.map((item, displayIdx) => {
            const isOpen = openKey === item.id;

            return (
              <div
                key={item.id}
                className={`transition-colors duration-200 ${
                  isOpen
                    ? "bg-[#f4fbf7] dark:bg-[#08120c]"
                    : "hover:bg-black/[0.015] dark:hover:bg-white/[0.02]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, item.id)}
                  className="flex w-full min-h-[56px] items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366] cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <span
                      className={`font-mono text-[11px] font-extrabold px-2 py-0.5 rounded-sm border shrink-0 mt-0.5 sm:mt-0 ${
                        isOpen
                          ? "border-[#25d366] bg-[#25d366] text-[#050505]"
                          : "border-black/15 dark:border-white/15 text-emerald-700 dark:text-[#25d366] bg-black/[0.02] dark:bg-white/[0.03]"
                      }`}
                    >
                      {String(displayIdx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm sm:text-[15px] font-bold text-black dark:text-white leading-snug">
                      {item.q}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm border border-black/10 dark:border-white/15 text-black/50 dark:text-white/50">
                      {categoryLabels[item.category]}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-emerald-700 dark:text-[#25d366] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-black/[0.06] dark:border-white/[0.08]">
                        <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 leading-relaxed sm:ps-11">
                          {item.a}
                        </p>
                      </div>
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
