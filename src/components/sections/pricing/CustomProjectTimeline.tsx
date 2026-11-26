"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Compass,
  FileCheck2,
  FlaskConical,
  Globe,
  Layers,
  Monitor,
  PackageCheck,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import type { CustomProjectContent } from "./types";

interface CustomProjectTimelineProps {
  content: CustomProjectContent;
  onStartProject: (planLabel: string, customMessage: string) => void;
}

const STEP_ICONS = [
  Compass,
  Layers,
  FileCheck2,
  Code2,
  FlaskConical,
  PackageCheck,
];

export default function CustomProjectTimeline({
  content,
  onStartProject,
}: CustomProjectTimelineProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div id="custom-project" className="mt-24 md:mt-28 scroll-mt-24">
      <div className="border border-black/10 dark:border-white/15 bg-white dark:bg-[#050505]">
        {/* ================= SPLIT EDITORIAL RAIL + VERTICAL STEP-BY-STEP TIMELINE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* START COLUMN: Sticky Architectural Narrative & Ownership Promise */}
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-e border-black/10 dark:border-white/15 bg-zinc-50/60 dark:bg-[#080808]">
            <div className="lg:sticky lg:top-24 text-start">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm border border-[#25d366]/35 bg-[#25d366]/10 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800 dark:text-[#25d366] mb-4">
                <span className="h-1.5 w-1.5 bg-[#25d366]" />
                <span>{content.eyebrow}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-extrabold tracking-tight leading-[1.18] font-[var(--font-display)] text-black dark:text-white">
                {content.title}
              </h3>

              <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-black/65 dark:text-white/65">
                {content.subtitle}
              </p>

              {/* 100% Ownership Callout Strip */}
              <div className="mt-6 p-4 border border-[#25d366]/35 bg-[#f2fbf6] dark:bg-[#08130d] rounded-sm flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-700 dark:text-[#25d366] shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-black/80 dark:text-white/85 font-medium">
                  {content.guarantees.join(" · ")}
                </div>
              </div>

              {/* 3 Bespoke Platform Scope Tiles */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-0 border border-black/10 dark:border-white/15 divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse lg:divide-x-0 lg:divide-y divide-black/10 dark:divide-white/15 bg-white dark:bg-[#050505]">
                <div className="flex items-center gap-3 px-4 py-3 text-start">
                  <Globe className="h-4 w-4 text-emerald-700 dark:text-[#25d366] shrink-0" />
                  <span className="text-xs font-bold text-black/85 dark:text-white/85 leading-tight">
                    {content.scopes.website}
                  </span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-start">
                  <Monitor className="h-4 w-4 text-emerald-700 dark:text-[#25d366] shrink-0" />
                  <span className="text-xs font-bold text-black/85 dark:text-white/85 leading-tight">
                    {content.scopes.desktop}
                  </span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-start">
                  <Smartphone className="h-4 w-4 text-emerald-700 dark:text-[#25d366] shrink-0" />
                  <span className="text-xs font-bold text-black/85 dark:text-white/85 leading-tight">
                    {content.scopes.mobile}
                  </span>
                </div>
              </div>

              {/* Quick Step Progress Dots (Desktop) */}
              <div className="hidden lg:flex items-center gap-1.5 mt-7">
                {content.steps.map((step, idx) => {
                  const reached = idx <= activeStep;
                  return (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      className={`h-7 px-2 font-mono text-[11px] font-extrabold border rounded-sm transition-colors cursor-pointer ${
                        idx === activeStep
                          ? "border-[#25d366] bg-[#25d366] text-[#050505]"
                          : reached
                          ? "border-[#25d366]/45 bg-[#25d366]/10 text-emerald-800 dark:text-[#25d366]"
                          : "border-black/15 dark:border-white/15 text-black/45 dark:text-white/45 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {step.number}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* END COLUMN: Pure Vertical Step-by-Step Timeline (01 -> 06 on ALL viewports) */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 bg-white dark:bg-[#050505]">
            <ol className="relative space-y-0">
              {content.steps.map((step, idx) => {
                const Icon = STEP_ICONS[idx] || Compass;
                const isActive = activeStep === idx;
                const isCompleted = idx < activeStep;
                const isLast = idx === content.steps.length - 1;

                return (
                  <motion.li
                    key={step.number}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    onMouseEnter={() => setActiveStep(idx)}
                    onClick={() => setActiveStep(idx)}
                    className={`relative flex items-stretch gap-4 sm:gap-6 cursor-pointer group ${
                      isLast ? "" : "pb-6 sm:pb-7"
                    }`}
                  >
                    {/* Vertical Spine + Numbered Node */}
                    <div className="relative flex flex-col items-center shrink-0">
                      <span
                        className={`relative z-10 inline-flex h-10 w-10 items-center justify-center font-mono text-xs font-extrabold rounded-sm border transition-all duration-200 ${
                          isActive
                            ? "border-[#25d366] bg-[#25d366] text-[#050505] shadow-[0_0_20px_-4px_rgba(37,211,102,0.65)]"
                            : isCompleted || isLast
                            ? "border-[#25d366]/55 bg-[#f2fbf6] dark:bg-[#08130d] text-emerald-800 dark:text-[#25d366]"
                            : "border-black/15 dark:border-white/20 bg-white dark:bg-[#0a0a0a] text-black dark:text-white group-hover:border-[#25d366]/60"
                        }`}
                      >
                        {step.number}
                      </span>

                      {/* Continuous Vertical Connecting Line to Next Step */}
                      {!isLast && (
                        <div
                          aria-hidden="true"
                          className={`w-[1px] flex-1 mt-1.5 transition-colors duration-300 ${
                            isCompleted || isActive
                              ? "bg-[#25d366]"
                              : "bg-black/15 dark:bg-white/15"
                          }`}
                        />
                      )}
                    </div>

                    {/* Step Card Body */}
                    <div
                      className={`flex-1 min-w-0 border p-5 sm:p-6 text-start transition-all duration-200 relative ${
                        isActive
                          ? "border-[#25d366]/60 bg-[#f4fbf7] dark:bg-[#08120c]"
                          : "border-black/10 dark:border-white/15 bg-white dark:bg-[#070707] hover:border-black/25 dark:hover:border-white/25"
                      }`}
                    >
                      {/* Active Accent Top Hairline */}
                      <div
                        aria-hidden="true"
                        className={`absolute top-0 inset-x-0 h-[2px] bg-[#25d366] transition-opacity duration-200 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />

                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border transition-colors ${
                              isActive
                                ? "border-[#25d366]/45 bg-[#25d366]/15 text-emerald-700 dark:text-[#25d366]"
                                : "border-black/10 dark:border-white/15 bg-zinc-50 dark:bg-[#0d0d0d] text-emerald-700 dark:text-[#25d366]"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <h4 className="text-base sm:text-[1.05rem] font-extrabold tracking-tight text-black dark:text-white font-[var(--font-display)] leading-snug">
                            {step.title}
                          </h4>
                        </div>

                        {isLast && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-700 dark:text-[#25d366] shrink-0 mt-1" />
                        )}
                      </div>

                      <p className="mt-2.5 text-[13px] sm:text-sm leading-relaxed text-black/65 dark:text-white/65">
                        {step.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* ================= BOTTOM CONVERSION & GUARANTEES STRIP ================= */}
        <div className="border-t border-black/10 dark:border-white/15 bg-zinc-50/90 dark:bg-[#0a0a0a] px-6 py-6 sm:px-10 lg:px-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-start">
            {content.guarantees.map((guarantee) => (
              <span
                key={guarantee}
                className="inline-flex items-center gap-2 text-xs font-bold text-black/80 dark:text-white/85"
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-[5px] w-[5px] bg-[#25d366] shrink-0"
                />
                <span>{guarantee}</span>
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              onStartProject(content.modalPlanLabel, content.whatsappMessage)
            }
            className="shrink-0 h-12 px-7 rounded-full bg-[#25d366] hover:bg-[#1fc25c] text-[#050505] text-sm font-extrabold tracking-tight transition-colors duration-200 inline-flex items-center justify-center gap-2 shadow-[0_10px_28px_-8px_rgba(37,211,102,0.55)] cursor-pointer"
          >
            <span>{content.cta}</span>
            <ArrowUpRight className="h-4 w-4 rtl:rotate-[-90deg]" />
          </button>
        </div>
      </div>
    </div>
  );
}
