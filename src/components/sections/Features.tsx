"use client";

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
  Sparkles,
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
  chatbot: Bot,
  multilang: Globe,
};

export default function Features() {
  const t = useTranslations("features");

  // Access the array of features via raw messages
  const list = t.raw("list") as Array<{ key: string; title: string; description: string }>;

  return (
    <section id="features" className="py-20 md:py-28 relative overflow-hidden">
      {/* Hairline subtle background grid */}
      <div className="absolute inset-0 hairline-grid opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        {/* Header with Apple Status Capsule */}
        <div className="mx-auto max-w-2xl text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass border-black/[0.06] dark:border-white/[0.1] text-brand-green text-xs font-semibold tracking-wider uppercase shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span>MODULAR CAPABILITIES</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl font-[var(--font-display)] text-[var(--text-primary)]">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Apple Bento Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((item, index) => {
            const Icon = ICON_MAP[item.key];

            return (
              <motion.article
                key={item.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative rounded-2xl apple-card p-6 sm:p-7 flex flex-col justify-between overflow-hidden cursor-default transition-all duration-300"
              >
                <div>
                  {/* Top Bar with Icon Tile */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 dark:bg-brand-green/15 border border-brand-green/20 text-brand-green transition-transform duration-300 group-hover:scale-105 shadow-2xs">
                      {Icon && <Icon className="h-5 w-5" />}
                    </div>
                  </div>

                  <h3 className="mb-2 text-base sm:text-lg font-bold text-[var(--text-primary)] font-[var(--font-display)] tracking-tight group-hover:text-brand-green transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Status Row */}
                <div className="mt-6 pt-3.5 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green/70 group-hover:bg-brand-green transition-colors" />
                    <span>Native Offline</span>
                  </span>
                  <span className="text-brand-green font-semibold text-[11px] opacity-75 group-hover:opacity-100 transition-opacity">
                    Included ✓
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

