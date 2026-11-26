"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Download,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";

interface WorkflowStep {
  number: string;
  tag: string;
  title: string;
  description: string;
  duration: string;
  highlights: string[];
}

const STEP_ICONS = [Download, SlidersHorizontal, TrendingUp];

export default function HowItWorks() {
  const t = useTranslations("howItWorks");
  const steps = t.raw("steps") as WorkflowStep[];
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 78%", "end 62%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section
      id="how-it-works"
      className="py-14 sm:py-20 md:py-28 relative overflow-x-clip scroll-mt-20"
    >
      {/* Subtle matching architectural hairline grid — preserves BarberBackground underneath */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hairline-grid opacity-30 pointer-events-none"
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6 relative z-10">
        {/* Clean Localized Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center mb-10 sm:mb-16 md:mb-20 space-y-3 sm:space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm border border-black/10 dark:border-white/15 bg-white/80 dark:bg-[#0a0a0a]/90 backdrop-blur-md text-emerald-700 dark:text-[#25d366] text-[11px] font-bold tracking-[0.14em] uppercase">
            <span className="h-1.5 w-1.5 bg-[#25d366]" />
            <span>{t("eyebrow")}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-[var(--font-display)] text-black dark:text-white">
            {t("title")}
          </h2>

          <p className="text-sm sm:text-lg text-black/65 dark:text-white/65 max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Scroll-Animated Connected Vertical Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Base Hairline Spine Track (exact center of 40px col-1 on mobile: start-[19px], centered on md+) */}
          <div
            aria-hidden="true"
            className="absolute top-5 bottom-5 start-[19px] md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2 w-[2px] bg-black/10 dark:bg-white/15 rounded-full"
          />

          {/* Scroll-Driven Animated Emerald Progress Beam */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: smoothProgress, transformOrigin: "top" }}
            className="absolute top-5 bottom-5 start-[19px] md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2 w-[2px] bg-gradient-to-b from-[#25d366] via-[#25d366] to-emerald-400 rounded-full shadow-[0_0_14px_rgba(37,211,102,0.55)]"
          />

          <ol className="relative space-y-6 sm:space-y-10 md:space-y-14">
            {steps.map((step, index) => {
              const Icon = STEP_ICONS[index] || Download;
              const isEven = index % 2 === 0;
              const isActive = activeIndex === index;
              const isLast = index === steps.length - 1;

              return (
                <li
                  key={step.number}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className="relative grid grid-cols-[40px_1fr] md:grid-cols-[1fr_auto_1fr] items-start md:items-center gap-3.5 sm:gap-5 md:gap-8"
                >
                  {/* Desktop Alternating Start Slot (Steps 01 & 03) */}
                  <div className="hidden md:block md:order-1">
                    {isEven && (
                      <TimelineCard
                        step={step}
                        Icon={Icon}
                        index={index}
                        isActive={isActive}
                        isLast={isLast}
                        durationLabel={t("durationLabel")}
                        side="start"
                      />
                    )}
                  </div>

                  {/* Unclipped Milestone Node (Explicit Grid Column 1 on Mobile, Column 2 on Desktop) */}
                  <div className="relative md:order-2 z-20 flex items-center justify-center pt-3.5 md:pt-0">
                    <motion.div
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 22,
                        delay: index * 0.06,
                      }}
                      className="relative flex items-center justify-center"
                    >
                      {isActive && (
                        <motion.span
                          aria-hidden="true"
                          initial={{ scale: 0.9, opacity: 0.65 }}
                          animate={{ scale: 1.4, opacity: 0 }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                          className="absolute inset-0 rounded-sm border border-[#25d366]"
                        />
                      )}

                      <div
                        className={`h-10 w-10 md:h-11 md:w-11 rounded-sm border flex items-center justify-center font-mono text-xs font-extrabold transition-all duration-300 ${
                          isActive || isLast
                            ? "border-[#25d366] bg-[#25d366] text-[#050505] shadow-[0_0_20px_-4px_rgba(37,211,102,0.75)]"
                            : "border-black/15 dark:border-white/20 bg-white dark:bg-[#0a0f0c] text-black dark:text-white"
                        }`}
                      >
                        {step.number}
                      </div>
                    </motion.div>
                  </div>

                  {/* Mobile Card Slot (All Steps) + Desktop Alternating End Slot (Step 02) */}
                  <div className="min-w-0 md:order-3">
                    <div className={isEven ? "md:hidden" : "block"}>
                      <TimelineCard
                        step={step}
                        Icon={Icon}
                        index={index}
                        isActive={isActive}
                        isLast={isLast}
                        durationLabel={t("durationLabel")}
                        side="end"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  step,
  Icon,
  index,
  isActive,
  isLast,
  durationLabel,
  side,
}: {
  step: WorkflowStep;
  Icon: React.ComponentType<{ className?: string }>;
  index: number;
  isActive: boolean;
  isLast: boolean;
  durationLabel: string;
  side: "start" | "end";
}) {
  return (
    <motion.article
      initial={{ opacity: 0.01, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      className={`group relative border backdrop-blur-md p-4 sm:p-6 md:p-7 text-start transition-all duration-300 cursor-pointer ${
        isActive
          ? "border-[#25d366]/65 bg-white/95 dark:bg-[#08120c]/90 shadow-[0_14px_40px_-14px_rgba(37,211,102,0.22)]"
          : "border-black/10 dark:border-white/15 bg-white/85 dark:bg-[#070a08]/85 hover:border-[#25d366]/45"
      }`}
    >
      {/* Top 2px Emerald Accent Hairline */}
      <div
        aria-hidden="true"
        className={`absolute top-0 inset-x-0 h-[2px] bg-[#25d366] transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
        }`}
      />

      {/* Horizontal Hairline Connector Arm on Desktop */}
      <span
        aria-hidden="true"
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 h-[1px] transition-colors duration-300 ${
          side === "start" ? "-end-8" : "-start-8"
        } ${
          isActive
            ? "bg-[#25d366]"
            : "bg-black/15 dark:bg-white/15 group-hover:bg-[#25d366]/60"
        }`}
      />

      {/* Top Metadata Row: Wraps Cleanly on Mobile so Step Tag NEVER Truncates */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-3.5 border-b border-black/[0.08] dark:border-white/[0.1]">
        <div className="flex items-center gap-2.5">
          <div
            className={`inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-sm border transition-transform duration-300 group-hover:scale-105 ${
              isActive
                ? "border-[#25d366]/45 bg-[#25d366]/15 text-emerald-700 dark:text-[#25d366]"
                : "border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.04] text-emerald-700 dark:text-[#25d366]"
            }`}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <span className="text-xs font-extrabold tracking-wide text-emerald-700 dark:text-[#25d366]">
            {step.tag}
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-black/10 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.04] text-[11px] font-bold text-black/75 dark:text-white/80 shrink-0">
          {isLast ? (
            <CheckCircle2 className="h-3.5 w-3.5 text-[#25d366]" />
          ) : (
            <Clock className="h-3.5 w-3.5 text-[#25d366]" />
          )}
          <span className="sr-only">{durationLabel}: </span>
          <span>{step.duration}</span>
        </span>
      </div>

      {/* Step Title & Description */}
      <h3 className="text-base sm:text-xl font-extrabold tracking-tight text-black dark:text-white font-[var(--font-display)] leading-snug group-hover:text-emerald-700 dark:group-hover:text-[#25d366] transition-colors">
        {step.title}
      </h3>
      <p className="mt-2 text-xs sm:text-sm text-black/65 dark:text-white/65 leading-relaxed">
        {step.description}
      </p>

      {/* Crisp Micro-Highlights */}
      {step.highlights && step.highlights.length > 0 && (
        <div className="mt-3.5 pt-3 border-t border-black/[0.07] dark:border-white/[0.08] flex flex-wrap gap-x-3 gap-y-1.5">
          {step.highlights.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-black/70 dark:text-white/75"
            >
              <span
                aria-hidden="true"
                className="inline-block h-[4px] w-[4px] bg-[#25d366] shrink-0"
              />
              <span>{chip}</span>
            </span>
          ))}
        </div>
      )}
    </motion.article>
  );
}
