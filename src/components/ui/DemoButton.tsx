"use client";
// Design intent: Persistent floating CTA button — always visible, bottom-right (bottom-left in RTL).
// Pulse animation ring creates urgency. Tooltip on hover explains no-signup.
// States: default, hover (scale up slightly), focus-visible (ring), active.
// Accessibility: button role, descriptive aria-label, tooltip via title attribute.

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { MonitorPlay } from "lucide-react";
import { motion } from "framer-motion";

export default function DemoButton() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div
      className={`fixed bottom-6 z-50 ${isRTL ? "left-6" : "right-6"}`}
    >
      {/* Pulse ring */}
      <div className="absolute inset-0 rounded-full bg-brand-green/40 animate-ping-slow" />

      <a
        href="https://salonsoftware.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-4 text-sm font-bold text-white shadow-2xl transition-all duration-200 hover:scale-105 hover:shadow-green-500/25 hover:shadow-[0_0_40px_rgba(22,163,74,0.3)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
        title={t("noCredit")}
        aria-label={t("tryFree")}
      >
        <MonitorPlay className="h-5 w-5" />
        <span>{t("tryFree")}</span>
      </a>
    </div>
  );
}
