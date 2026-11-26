"use client";
// Design intent: Real screen-recorded app motion design showcase replacing the generic staff video.
// Plays 5 real recordings from the actual salondztech app with kinetic camera choreography,
// timestamp-synced trilingual callouts, and an interactive 5-chapter storyboard dock.

import { useTranslations } from "next-intl";
import DashboardMotionShowcase from "@/components/dashboard/DashboardMotionShowcase";

export default function Dashboard() {
  const t = useTranslations("dashboard");

  return (
    <section
      id="dashboard"
      className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-4 mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass border-black/[0.06] dark:border-white/[0.1] text-xs font-semibold text-brand-green tracking-wider uppercase shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
            <span>{t("livePreview")}</span>
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl font-[var(--font-display)] text-[var(--text-primary)] px-2">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Real App Screen-Recorded Motion Design Stage */}
        <DashboardMotionShowcase />
      </div>
    </section>
  );
}
