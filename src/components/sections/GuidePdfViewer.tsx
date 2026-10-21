"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Download,
  Printer,
  ExternalLink,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Sparkles,
  Laptop,
  CreditCard,
  MessageSquareCode,
  Users,
  Package,
  BarChart3,
  CheckCircle2,
  Globe,
  Monitor
} from "lucide-react";

export default function GuidePdfViewer() {
  const t = useTranslations("guidePage");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewerMode, setViewerMode] = useState<"native" | "google">("native");
  const containerRef = useRef<HTMLDivElement>(null);

  const pdfUrl = "/salon%20guide.pdf";
  const [fullDomainUrl, setFullDomainUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullDomainUrl(`${window.location.origin}${pdfUrl}`);
    }
  }, [pdfUrl]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => setIsFullscreen(true));
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => setIsFullscreen(false));
      } else {
        setIsFullscreen(false);
      }
    }
  };

  const handlePrint = () => {
    window.open(pdfUrl, "_blank");
  };

  const googleDocsViewerUrl = fullDomainUrl
    ? `https://docs.google.com/gview?url=${encodeURIComponent(fullDomainUrl)}&embedded=true`
    : "";

  const chapters = [
    {
      icon: Laptop,
      title: t("chapter1Title"),
      desc: t("chapter1Desc"),
      color: "from-emerald-500/20 to-emerald-500/5 text-emerald-500 border-emerald-500/30",
    },
    {
      icon: CreditCard,
      title: t("chapter2Title"),
      desc: t("chapter2Desc"),
      color: "from-blue-500/20 to-blue-500/5 text-blue-500 border-blue-500/30",
    },
    {
      icon: MessageSquareCode,
      title: t("chapter3Title"),
      desc: t("chapter3Desc"),
      color: "from-brand-green/20 to-brand-green/5 text-brand-green border-brand-green/30",
    },
    {
      icon: Users,
      title: t("chapter4Title"),
      desc: t("chapter4Desc"),
      color: "from-amber-500/20 to-amber-500/5 text-amber-500 border-amber-500/30",
    },
    {
      icon: Package,
      title: t("chapter5Title"),
      desc: t("chapter5Desc"),
      color: "from-purple-500/20 to-purple-500/5 text-purple-500 border-purple-500/30",
    },
    {
      icon: BarChart3,
      title: t("chapter6Title"),
      desc: t("chapter6Desc"),
      color: "from-cyan-500/20 to-cyan-500/5 text-cyan-500 border-cyan-500/30",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass border-black/[0.06] dark:border-white/[0.1] text-brand-green text-xs font-semibold tracking-tight shadow-xs mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{t("badge")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] font-[var(--font-display)] tracking-tight mb-3">
          {t("title")}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
          {t("desc")}
        </p>

        {/* Quick Action Apple Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={pdfUrl}
            download="salondztech_user_guide.pdf"
            className="apple-btn-primary apple-press rounded-2xl h-11 px-6 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>{t("downloadPdf")}</span>
          </a>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-card apple-press rounded-2xl h-11 px-5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 text-foreground cursor-pointer shadow-xs hover:border-brand-green/50"
          >
            <ExternalLink className="h-4 w-4 text-brand-green" />
            <span>{t("openNewTab")}</span>
          </a>

          <button
            onClick={handlePrint}
            className="apple-card apple-press rounded-2xl h-11 px-5 text-xs sm:text-sm font-semibold hidden sm:inline-flex items-center justify-center gap-2 text-foreground cursor-pointer shadow-xs hover:border-brand-green/50"
          >
            <Printer className="h-4 w-4 text-brand-green" />
            <span>{t("printPdf")}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive PDF Viewer Card with macOS styling */}
      <div
        ref={containerRef}
        className={`relative transition-all duration-300 rounded-3xl apple-card apple-specular-edge shadow-2xl border border-black/[0.08] dark:border-white/[0.12] overflow-hidden ${
          isFullscreen ? "fixed inset-0 z-50 rounded-none border-none" : "mb-14"
        }`}
      >
        {/* macOS Style Titlebar Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 apple-glass border-b border-black/[0.06] dark:border-white/[0.08]">
          {/* Left: Window Controls + Document Title */}
          <div className="flex items-center gap-3">
            {/* macOS Window Controls */}
            <div className="hidden sm:flex items-center gap-1.5 me-1">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/40" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/40" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/40" />
            </div>

            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-brand-green/15 text-brand-green flex items-center justify-center font-bold shadow-xs">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xs sm:text-sm font-bold text-foreground leading-tight truncate max-w-[150px] sm:max-w-none">
                  salondztech Guide.pdf
                </h2>
                <span className="text-[10px] text-brand-green flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="h-3 w-3 inline" /> HD Verified PDF Document
                </span>
              </div>
            </div>
          </div>

          {/* Right: Controls & Engine Selector */}
          <div className="flex items-center gap-2">
            {/* Apple Segmented Control for Engine */}
            <div className="relative inline-flex p-1 rounded-full apple-glass border border-black/[0.08] dark:border-white/[0.1] shadow-xs">
              <button
                type="button"
                onClick={() => setViewerMode("native")}
                className={`relative px-3 py-1 text-xs font-bold rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewerMode === "native"
                    ? "text-white"
                    : "text-slate-700 dark:text-slate-300 hover:text-foreground"
                }`}
                title="Native Engine"
              >
                {viewerMode === "native" && (
                  <motion.div
                    layoutId="guide-engine-pill"
                    className="absolute inset-0 apple-btn-primary rounded-full shadow-xs"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Monitor className="h-3.5 w-3.5 relative z-10" />
                <span className="relative z-10 hidden sm:inline">Native</span>
              </button>
              <button
                type="button"
                onClick={() => setViewerMode("google")}
                className={`relative px-3 py-1 text-xs font-bold rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewerMode === "google"
                    ? "text-white"
                    : "text-slate-700 dark:text-slate-300 hover:text-foreground"
                }`}
                title="Google Docs Engine"
              >
                {viewerMode === "google" && (
                  <motion.div
                    layoutId="guide-engine-pill"
                    className="absolute inset-0 apple-btn-primary rounded-full shadow-xs"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Globe className="h-3.5 w-3.5 relative z-10" />
                <span className="relative z-10 hidden sm:inline">Google</span>
              </button>
            </div>

            {/* Print & External Link in Apple Glass */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={t("openNewTab")}
              className="h-8 w-8 rounded-full apple-glass apple-press border border-black/[0.08] dark:border-white/[0.1] flex items-center justify-center text-foreground hover:text-brand-green transition-colors cursor-pointer"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? t("exitFullscreen") : t("fullscreen")}
              className="h-8 w-8 rounded-full apple-glass apple-press border border-black/[0.08] dark:border-white/[0.1] flex items-center justify-center text-foreground hover:text-brand-green transition-colors cursor-pointer"
            >
              {isFullscreen ? (
                <Minimize2 className="h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* PDF Embedded Viewport */}
        <div
          className={`w-full bg-[#111B21] relative overflow-hidden transition-all duration-300 ${
            isFullscreen ? "h-[calc(100vh-57px)]" : "h-[600px] sm:h-[780px] lg:h-[880px]"
          }`}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {viewerMode === "native" ? (
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=1&view=FitH`}
              className="w-full h-full border-none"
              title="salondztech PDF User Guide - Native Engine"
            />
          ) : (
            <iframe
              src={googleDocsViewerUrl || `${pdfUrl}#toolbar=1&navpanes=1`}
              className="w-full h-full border-none"
              title="salondztech PDF User Guide - Google Engine"
            />
          )}
        </div>

        {/* Bottom Bar Info with Liquid Glass */}
        <div className="px-5 py-3 apple-glass border-t border-black/[0.06] dark:border-white/[0.08] flex flex-wrap items-center justify-between text-xs text-[var(--text-secondary)] gap-2">
          <p className="text-xs font-medium">{t("mobileNotice")}</p>
          <a
            href={pdfUrl}
            download="salondztech_user_guide.pdf"
            className="text-brand-green font-bold hover:underline flex items-center gap-1.5 ms-auto cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{t("downloadPdf")}</span>
          </a>
        </div>
      </div>

      {/* Chapters Grid Section */}
      <div className="mt-14 mb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] text-center mb-8 font-[var(--font-display)] tracking-tight">
          {t("chaptersTitle")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {chapters.map((ch, idx) => {
            const Icon = ch.icon;
            return (
              <div
                key={idx}
                className="apple-card apple-press apple-specular-edge group p-6 rounded-3xl border border-black/[0.08] dark:border-white/[0.1] hover:border-brand-green/50 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden"
              >
                <div className="inline-flex p-3 rounded-2xl apple-glass text-brand-green border border-brand-green/30 mb-4 shadow-xs">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-brand-green transition-colors font-[var(--font-display)]">
                  {ch.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {ch.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Back to Home CTA */}
      <div className="text-center mt-10">
        <Button
          variant="outline"
          className="apple-card apple-press font-bold px-8 h-12 rounded-2xl text-sm border-black/[0.08] dark:border-white/[0.1] hover:border-brand-green/50 text-foreground cursor-pointer inline-flex items-center gap-2"
          asChild
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            <span>{t("backHome")}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
