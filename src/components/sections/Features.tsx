"use client";
// Design intent: Feature grid showcasing all Salon Tech DZ capabilities.
// Layout: 4-column desktop, 2-column tablet, 1-column mobile.
// Each card has whileInView fade-up animation with stagger.
// States: default (border, shadow-sm), hover (green border, shadow-md, translateY(-2px)).
// Accessibility: cards are semantic articles with proper heading hierarchy.

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
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  pos: CreditCard,
  appointments: CalendarCheck,
  payroll: Users,
  inventory: Package,
  loyalty: Star,
  analytics: BarChart3,
  multilang: Globe,
};

export default function Features() {
  const t = useTranslations("features");

  // Access the array of features via raw messages
  const featureKeys = [
    "dashboard", "pos", "appointments", "payroll",
    "inventory", "loyalty", "analytics", "multilang"
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-[var(--bg-primary)] dark:bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-[var(--font-display)] text-[var(--text-primary)]">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            {t("subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featureKeys.map((key, index) => {
            const Icon = ICON_MAP[key];
            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group rounded-xl border border-border bg-[var(--bg-card)] p-6 shadow-sm transition-all duration-200 hover:border-green-500 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/40 transition-colors group-hover:bg-green-200 dark:group-hover:bg-green-900/60">
                  {Icon && <Icon className="h-5 w-5 text-green-600" />}
                </div>
                <h3 className="mb-2 text-base font-semibold text-[var(--text-primary)]">
                  {t(`list.${index}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`list.${index}.description`)}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
