"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CreditCard,
  CalendarCheck,
  Users,
  Package,
  Star,
  BarChart3,
  Globe,
  MessageSquare,
  Bot,
  ListOrdered,
} from "lucide-react";

type FeatureGroup = "all" | "operations" | "growth";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  pos: CreditCard,
  appointments: CalendarCheck,
  queue: ListOrdered,
  payroll: Users,
  inventory: Package,
  loyalty: Star,
  analytics: BarChart3,
  whatsapp: MessageSquare,
  chatbot: Bot,
  multilang: Globe,
};

const OPERATIONS_KEYS = new Set([
  "dashboard",
  "pos",
  "appointments",
  "queue",
  "payroll",
  "inventory",
]);

const GROWTH_KEYS = new Set([
  "whatsapp",
  "chatbot",
  "loyalty",
  "analytics",
  "multilang",
]);

const FILTER_TABS: FeatureGroup[] = ["all", "operations", "growth"];

export default function Features() {
  const t = useTranslations("features");
  const [activeGroup, setActiveGroup] = useState<FeatureGroup>("all");

  const list = t.raw("list") as Array<{
    key: string;
    title: string;
    description: string;
  }>;

  const filteredList = list.filter((item) => {
    if (activeGroup === "all") return true;
    if (activeGroup === "operations") return OPERATIONS_KEYS.has(item.key);
    return GROWTH_KEYS.has(item.key);
  });

  return (
    <section
      id="features"
      className="py-14 sm:py-20 md:py-28 relative overflow-hidden scroll-mt-20"
    >
      {/* Hairline subtle background grid */}
      <div className="absolute inset-0 hairline-grid opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        {/* Header with Localized Apple Status Capsule */}
        <div className="mx-auto max-w-2xl text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass border-black/[0.06] dark:border-white/[0.1] text-brand-green text-xs font-semibold tracking-wider uppercase shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span>{t("eyebrow")}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-[var(--font-display)] text-[var(--text-primary)]">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Ergonomic Swipeable Filter Pills (makes 11 features effortlessly scannable on phones) */}
        <div
          role="tablist"
          aria-label={t("eyebrow")}
          className="mb-6 sm:mb-10 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-1"
        >
          {FILTER_TABS.map((tab) => {
            const active = activeGroup === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveGroup(tab)}
                className={`min-h-[40px] px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? "bg-[#25d366] border-[#25d366] text-[#050505] shadow-sm shadow-[#25d366]/25"
                    : "apple-glass border-black/10 dark:border-white/15 text-foreground/75 hover:border-brand-green/45 hover:text-foreground"
                }`}
              >
                {t(`tabs.${tab}`)}
              </button>
            );
          })}
        </div>

        {/* Apple Bento Cards Grid — Compact Inline Header on Mobile, Spacious Bento on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6 lg:gap-8 max-w-5xl lg:max-w-6xl mx-auto">
          {filteredList.map((item, index) => {
            const Icon = ICON_MAP[item.key];
            const isCenteredLastOdd =
              filteredList.length % 2 === 1 && index === filteredList.length - 1;

            return (
              <motion.article
                key={item.key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.24) }}
                className={`group relative rounded-2xl apple-card p-4 sm:p-7 flex flex-col justify-between overflow-hidden cursor-default transition-all duration-300 text-start ${
                  isCenteredLastOdd
                    ? "sm:col-span-2 sm:max-w-xl sm:mx-auto w-full"
                    : ""
                }`}
              >
                <div>
                  {/* Mobile Inline Icon + Title Row -> Stacked Tile on sm+ */}
                  <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0 mb-2.5 sm:mb-2">
                    <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 sm:mb-5 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-brand-green/10 dark:bg-brand-green/15 border border-brand-green/20 text-brand-green transition-transform duration-300 group-hover:scale-105 shadow-2xs">
                      {Icon && <Icon className="h-5 w-5" />}
                    </div>
                    <h3 className="text-[15px] sm:text-lg font-bold text-[var(--text-primary)] font-[var(--font-display)] tracking-tight leading-snug group-hover:text-brand-green transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Localized Bottom Status Row */}
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-3.5 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-[11px] sm:text-xs text-[var(--text-muted)] font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green/70 group-hover:bg-brand-green transition-colors" />
                    <span>{t("offlineBadge")}</span>
                  </span>
                  <span className="text-brand-green font-semibold text-[11px] opacity-85 group-hover:opacity-100 transition-opacity">
                    {t("includedBadge")}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
