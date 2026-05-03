"use client";
// Design intent: Single pricing card with green gradient border and feature checklist.
// Max width 480px, centered. Green gradient outer border creates premium feel.
// States: CTA button has default, hover (darken), focus-visible (ring), active (scale 0.98).
// Accessibility: feature list is semantic, button opens BuyModal.

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/routing";

export default function Pricing() {
  const t = useTranslations("pricing");

  const features = [
    t("plans.0.features.0"),
    t("plans.0.features.1"),
    t("plans.0.features.2"),
    t("plans.0.features.3"),
    t("plans.0.features.4"),
    t("plans.0.features.5"),
    t("plans.0.features.6"),
    t("plans.0.features.7"),
    t("plans.0.features.8"),
    t("plans.0.features.9"),
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[var(--bg-primary)] dark:bg-[var(--bg-primary)]">
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

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-[480px]"
        >
          {/* Gradient border wrapper */}
          <div className="rounded-2xl bg-gradient-to-br from-green-500 to-green-700 p-px">
            <div className="relative rounded-2xl bg-[var(--bg-card)] p-6 sm:p-8">
              {/* Badge */}
              <div className="absolute -top-3 right-4 sm:right-6">
                <span className="rounded-full bg-brand-green px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold font-[var(--font-display)] text-[var(--text-primary)]">
                {t("plans.0.name")}
              </h3>

              {/* Price */}
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-brand-green font-[var(--font-display)]">
                  {t("plans.0.price")}
                </span>
                <span className="ml-2 text-sm text-[var(--text-muted)]">
                  {t("plans.0.period")}
                </span>
              </div>

              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {t("plans.0.description")}
              </p>

              <Separator className="my-6" />

              {/* What's Included */}
              <p className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
                {t("whatsIncluded")}
              </p>

              {/* Feature List */}
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                    <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                size="lg"
                className="w-full"
                asChild
              >
                <Link href="/contact">
                  <ShoppingCart className="h-5 w-5" />
                  {t("plans.0.cta")}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
          {t("contactToBuy")}
        </p>
      </div>
    </section>
  );
}
