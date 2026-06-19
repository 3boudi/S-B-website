"use client";
// Design intent: Feature grid showcasing all Salon Tech DZ capabilities.
// Layout: 3-column desktop (for perfect 3x3 balance), 2-column tablet, 1-column mobile.
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
  MessageSquare,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  pos: CreditCard,
  appointments: CalendarCheck,
  payroll: Users,
  inventory: Package,
  loyalty: Star,
  analytics: BarChart3,
  whatsapp: MessageSquare,
  multilang: Globe,
};

export default function Features() {
  const t = useTranslations("features");

  // Access the array of features via raw messages
  const list = t.raw("list") as Array<{ key: string; title: string; description: string }>;

  return (
    <section id="features" className="py-20 md:py-28 bg-[var(--bg-primary)] dark:bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl font-[var(--font-display)] text-[var(--text-primary)]">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            {t("subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {list.map((item, index) => {
            const Icon = ICON_MAP[item.key];
            return (
              <motion.article
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group rounded-xl border border-border bg-[var(--bg-card)] p-4 sm:p-6 shadow-sm transition-all duration-200 hover:border-brand-green hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green-muted dark:bg-brand-green-dark/40 transition-colors group-hover:bg-brand-green-muted/80 dark:group-hover:bg-brand-green-dark/60">
                  {Icon && <Icon className="h-5 w-5 text-brand-green-dark dark:text-brand-green" />}
                </div>
                <h3 className="mb-2 text-base font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
