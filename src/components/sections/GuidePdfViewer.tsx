"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
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
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-xs font-semibold mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{t("badge")}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] font-[var(--font-display)] tracking-tight mb-3">
          {t("title")}
        </h1>
        <p className="text-sm sm:text-lg text-[var(--text-secondary)] leading-relaxed px-2">
          {t("desc")}
        </p>

        {/* Quick Action Header Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <Button
            asChild
            className="bg-brand-green hover:bg-brand-green/90 text-brand-black font-bold shadow-lg shadow-brand-green/20 text-xs sm:text-sm"
          >
            <a href={pdfUrl} download="salondztech_user_guide.pdf">
              <Download className="h-4 w-4" />
              {t("downloadPdf")}
            </a>
          </Button>

          <Button
            variant="outline"
            className="border-border hover:bg-black/5 dark:hover:bg-white/5 font-semibold text-xs sm:text-sm"
            asChild
          >
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              {t("openNewTab")}
            </a>
          </Button>

          <Button
            variant="outline"
            onClick={handlePrint}
            className="border-border hover:bg-black/5 dark:hover:bg-white/5 font-semibold text-xs sm:text-sm hidden sm:inline-flex"
          >
            <Printer className="h-4 w-4" />
            {t("printPdf")}
          </Button>
        </div>
      </div>

      {/* Main Interactive PDF Viewer Card */}
      <div
        ref={containerRef}
        className={`relative transition-all duration-300 rounded-2xl sm:rounded-3xl border border-border bg-[var(--bg-card)] dark:bg-[#111B21] shadow-2xl overflow-hidden ${
          isFullscreen ? "fixed inset-0 z-50 rounded-none border-none" : "mb-12"
        }`}
      >
        {/* Toolbar Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-border bg-black/5 dark:bg-black/40 backdrop-blur-md">
          {/* Document Title Badge */}
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green font-bold">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] leading-tight truncate max-w-[150px] sm:max-w-none">
                salondztech Guide.pdf
              </h2>
              <span className="text-[10px] text-emerald-500 flex items-center gap-1 font-medium">
                <CheckCircle2 className="h-3 w-3 inline" /> HD Verified PDF Document
              </span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Viewer Engine Selector */}
            <div className="flex items-center bg-black/10 dark:bg-white/5 rounded-xl p-1 border border-border/50">
              <button
                onClick={() => setViewerMode("native")}
                className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  viewerMode === "native"
                    ? "bg-brand-green text-brand-black shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
                title="Native Engine"
              >
                <Monitor className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Native</span>
              </button>
              <button
                onClick={() => setViewerMode("google")}
                className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  viewerMode === "google"
                    ? "bg-brand-green text-brand-black shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
                title="Google Docs Engine"
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Google</span>
              </button>
            </div>

            {/* Print & External Link */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={t("openNewTab")}
              className="p-1.5 sm:p-2 rounded-xl border border-border bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-primary)] transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? t("exitFullscreen") : t("fullscreen")}
              className="p-1.5 sm:p-2 rounded-xl border border-brand-green/30 bg-brand-green/10 hover:bg-brand-green/20 text-brand-green transition-colors flex items-center justify-center font-semibold text-xs"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* PDF Embedded Viewport */}
        <div
          className={`w-full bg-[#1A1E21] relative overflow-hidden transition-all duration-300 ${
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

        {/* Bottom Bar Info */}
        <div className="px-4 py-2.5 bg-black/5 dark:bg-black/40 border-t border-border flex flex-wrap items-center justify-between text-xs text-[var(--text-secondary)] gap-2">
          <p className="text-xs">{t("mobileNotice")}</p>
          <a
            href={pdfUrl}
            download="salondztech_user_guide.pdf"
            className="text-brand-green font-semibold hover:underline flex items-center gap-1 ms-auto"
          >
            <Download className="h-3.5 w-3.5 inline" /> {t("downloadPdf")}
          </a>
        </div>
      </div>

      {/* Chapters Grid Section */}
      <div className="mt-12 mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] text-center mb-8 font-[var(--font-display)]">
          {t("chaptersTitle")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {chapters.map((ch, idx) => {
            const Icon = ch.icon;
            return (
              <div
                key={idx}
                className="group p-5 sm:p-6 rounded-2xl border border-border bg-[var(--bg-card)] dark:bg-[#111B21] hover:border-brand-green/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${ch.color} mb-3.5 border`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-1.5 group-hover:text-brand-green transition-colors">
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
      <div className="text-center mt-8">
        <Button
          variant="outline"
          className="border-border hover:bg-black/5 dark:hover:bg-white/5 font-bold px-6 py-5 rounded-2xl text-xs sm:text-sm"
          asChild
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("backHome")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
