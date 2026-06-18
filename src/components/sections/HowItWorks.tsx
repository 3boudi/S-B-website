"use client";
// Design intent: Three-step horizontal stepper (desktop) / vertical (mobile).
// Gradient connector line between steps. Large step numbers in muted green.
// Animation: whileInView stagger per step.
// Accessibility: ordered list semantics, clear step progression.

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Download, Settings, TrendingUp } from "lucide-react";

const STEP_ICONS = [Download, Settings, TrendingUp];

export default function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[var(--bg-secondary)] dark:bg-[var(--bg-secondary)]">
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

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {/* Desktop connector line */}
          <div className="absolute top-16 left-[16.67%] right-[16.67%] hidden md:block">
            <div className="h-0.5 w-full bg-gradient-to-r from-brand-green to-brand-green/0" />
          </div>

          {[0, 1, 2].map((index) => {
            const Icon = STEP_ICONS[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Mobile connector line */}
                {index < 2 && (
                  <div className="absolute left-1/2 top-full h-8 w-0.5 -translate-x-1/2 bg-gradient-to-b from-brand-green to-brand-green/0 md:hidden" />
                )}

                {/* Step number */}
                <span className="mb-4 block text-5xl font-extrabold text-brand-green/30 font-[var(--font-display)]">
                  {t(`steps.${index}.number`)}
                </span>

                {/* Icon */}
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-green-muted dark:bg-brand-green-dark/40">
                  <Icon className="h-6 w-6 text-brand-green-dark dark:text-brand-green" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)] font-[var(--font-display)]">
                  {t(`steps.${index}.title`)}
                </h3>

                {/* Description */}
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t(`steps.${index}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
