"use client";
// Design intent: Multi-tier pricing cards in a grid layout (max 3 plans).
// Middle card is highlighted with a green gradient border and a badge to guide user focus.
// CTA buttons hook directly into the useBuyModal hook to trigger the WhatsApp/Social selection.
// Accessibility: semantic structure, list of features uses appropriate check icons.

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useBuyModal } from "@/components/ui/BuyModal";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export default function Pricing() {
  const t = useTranslations("pricing");
  const { openModal } = useBuyModal();

  // Retrieve raw plans from translations json
  const plans = t.raw("plans") as Plan[];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[var(--bg-primary)] dark:bg-[var(--bg-primary)]">
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
                {/* Gradient border wrapper for highlighted card, default border for others */}
                <div
                  className={`flex flex-col h-full rounded-2xl p-px ${
                    isHighlighted
                      ? "bg-gradient-to-br from-brand-green-light via-brand-green to-brand-green-dark shadow-xl shadow-brand-green/10"
                      : "border border-border bg-[var(--bg-card)]"
                  }`}
                >
                  <div className={`relative flex flex-col justify-between h-full rounded-2xl bg-[var(--bg-card)] p-6 sm:p-8`}>
                    
                    {/* Highlight Badge */}
                    {isHighlighted && (
                      <div className="absolute -top-3 right-4 sm:right-6">
                        <span className="rounded-full bg-brand-green px-3 py-1 text-xs font-semibold text-white">
                          {t("bestChoice")}
                        </span>
                      </div>
                    )}

                    <div>
                      {/* Plan Name */}
                      <h3 className="text-xl font-bold font-[var(--font-display)] text-[var(--text-primary)]">
                        {plan.name}
                      </h3>

                      {/* Price */}
                      <div className="mt-4 flex items-baseline">
                        <span className="text-4xl font-extrabold text-brand-green font-[var(--font-display)]">
                          {plan.price}
                        </span>
                        <span className="ml-2 text-sm text-[var(--text-muted)]">
                          {plan.period}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-[var(--text-secondary)]">
                        {plan.description}
                      </p>

                      <Separator className="my-6" />

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
                    <Button
                      size="lg"
                      className="w-full mt-auto"
                      variant={isHighlighted ? "default" : "outline"}
                      onClick={() => openModal(plan.name)}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
          {t("contactToBuy")}
        </p>
      </div>
    </section>
  );
}
