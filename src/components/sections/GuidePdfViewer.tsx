"use client";

import { useState, useRef } from "react";
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
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowLeft,
  Sparkles,
  Laptop,
  CreditCard,
  MessageSquareCode,
  Users,
  Package,
  BarChart3,
  CheckCircle2
} from "lucide-react";

export default function GuidePdfViewer() {
  const t = useTranslations("guidePage");
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const pdfUrl = "/salon%20guide.pdf";

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 20, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 20, 60));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {
          setIsFullscreen(true);
        });
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {
          setIsFullscreen(false);
        });
      } else {
        setIsFullscreen(false);
      }
    }
  };

  const handlePrint = () => {
    if (iframeRef.current?.contentWindow) {
      try {
        iframeRef.current.contentWindow.print();
      } catch {
        window.open(pdfUrl, "_blank");
      }
    } else {
      window.open(pdfUrl, "_blank");
    }
  };

  const chapters = [
    {
      icon: Laptop,
      title: t("chapter1Title"),
      desc: t("chapter1Desc"),
      color: "from-emerald-500/20 to-emerald-500/5 text-emerald-500 border-emerald-500/30"
    },
    {
      icon: CreditCard,
      title: t("chapter2Title"),
      desc: t("chapter2Desc"),
      color: "from-blue-500/20 to-blue-500/5 text-blue-500 border-blue-500/30"
    },
    {
      icon: MessageSquareCode,
      title: t("chapter3Title"),
      desc: t("chapter3Desc"),
      color: "from-brand-green/20 to-brand-green/5 text-brand-green border-brand-green/30"
    },
    {
      icon: Users,
      title: t("chapter4Title"),
      desc: t("chapter4Desc"),
      color: "from-amber-500/20 to-amber-500/5 text-amber-500 border-amber-500/30"
    },
    {
      icon: Package,
      title: t("chapter5Title"),
      desc: t("chapter5Desc"),
      color: "from-purple-500/20 to-purple-500/5 text-purple-500 border-purple-500/30"
    },
    {
      icon: BarChart3,
      title: t("chapter6Title"),
      desc: t("chapter6Desc"),
      color: "from-cyan-500/20 to-cyan-500/5 text-cyan-500 border-cyan-500/30"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-xs font-semibold mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{t("badge")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] font-[var(--font-display)] tracking-tight mb-4">
          {t("title")}
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
          {t("desc")}
        </p>

        {/* Quick Action Header Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className="bg-brand-green hover:bg-brand-green/90 text-brand-black font-bold shadow-lg shadow-brand-green/20"
          >
            <a href={pdfUrl} download="salondztech_user_guide.pdf">
              <Download className="h-4 w-4" />
              {t("downloadPdf")}
            </a>
          </Button>

          <Button
            variant="outline"
            className="border-border hover:bg-black/5 dark:hover:bg-white/5 font-semibold"
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
            className="border-border hover:bg-black/5 dark:hover:bg-white/5 font-semibold"
          >
            <Printer className="h-4 w-4" />
            {t("printPdf")}
          </Button>
        </div>
      </div>

      {/* Main Interactive PDF Viewer Card */}
      <div
        ref={containerRef}
        className={`relative transition-all duration-300 rounded-3xl border border-border bg-[var(--bg-card)] dark:bg-[#111B21] shadow-2xl overflow-hidden ${
          isFullscreen ? "fixed inset-0 z-50 rounded-none border-none" : "mb-16"
        }`}
      >
        {/* Toolbar Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-border bg-black/5 dark:bg-black/40 backdrop-blur-md">
          {/* Document Title Badge */}
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green font-bold">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] leading-tight">
                salondztech Guide.pdf
              </h2>
              <span className="text-[10px] text-emerald-500 flex items-center gap-1 font-medium">
                <CheckCircle2 className="h-3 w-3 inline" /> HD Verified Document
              </span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center bg-black/10 dark:bg-white/5 rounded-xl p-1 border border-border/50">
              <button
                onClick={handleZoomOut}
                title={t("zoomOut")}
                className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-primary)] transition-colors"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="px-2 text-xs font-mono font-semibold text-[var(--text-primary)] min-w-[44px] text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={handleZoomIn}
                title={t("zoomIn")}
                className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-primary)] transition-colors"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              {zoomLevel !== 100 && (
                <button
                  onClick={handleResetZoom}
                  title={t("resetZoom")}
                  className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-secondary)] transition-colors border-s border-border/50 ms-1"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Print & New Window Buttons on Toolbar */}
            <button
              onClick={handlePrint}
              title={t("printPdf")}
              className="p-2 rounded-xl border border-border bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-primary)] transition-colors hidden sm:flex items-center justify-center"
            >
              <Printer className="h-4 w-4" />
            </button>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={t("openNewTab")}
              className="p-2 rounded-xl border border-border bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-primary)] transition-colors hidden sm:flex items-center justify-center"
            >
              <ExternalLink className="h-4 w-4" />
            </a>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? t("exitFullscreen") : t("fullscreen")}
              className="p-2 rounded-xl border border-brand-green/30 bg-brand-green/10 hover:bg-brand-green/20 text-brand-green transition-colors flex items-center justify-center font-semibold gap-1 text-xs"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
              <span className="hidden md:inline">
                {isFullscreen ? t("exitFullscreen") : t("fullscreen")}
              </span>
            </button>
          </div>
        </div>

        {/* PDF Frame Area */}
        <div
          className={`w-full overflow-auto bg-[#1A1E21] transition-all duration-300 flex justify-center ${
            isFullscreen ? "h-[calc(100vh-57px)]" : "h-[650px] sm:h-[780px] lg:h-[880px]"
          }`}
        >
          <div
            className="w-full h-full transition-transform duration-200 origin-top flex justify-center"
            style={{
              transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : "none",
              width: zoomLevel > 100 ? `${zoomLevel}%` : "100%",
            }}
          >
            <iframe
              ref={iframeRef}
              src={`${pdfUrl}#toolbar=1&navpanes=1&view=FitH`}
              className="w-full h-full border-none"
              title="salondztech PDF User Guide"
            />
          </div>
        </div>

        {/* Bottom Bar Info */}
        <div className="px-4 py-2.5 bg-black/5 dark:bg-black/40 border-t border-border flex flex-wrap items-center justify-between text-xs text-[var(--text-secondary)]">
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
        <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-8 font-[var(--font-display)]">
          {t("chaptersTitle")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((ch, idx) => {
            const Icon = ch.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl border border-border bg-[var(--bg-card)] dark:bg-[#111B21] hover:border-brand-green/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${ch.color} mb-4 border`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-brand-green transition-colors">
                  {ch.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
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
          className="border-border hover:bg-black/5 dark:hover:bg-white/5 font-bold px-8 py-6 rounded-2xl"
          asChild
        >
          <Link href="/">
            <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
            {t("backHome")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
