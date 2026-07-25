"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Laptop,
  CreditCard,
  MessageSquareCode,
  Users,
  Package,
  BarChart3,
  CheckCircle2,
  Loader2,
  Layers,
  LayoutList,
  FileText
} from "lucide-react";

export default function GuidePdfViewer() {
  const t = useTranslations("guidePage");

  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [viewMode, setViewMode] = useState<"single" | "scroll">("single");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [loadError, setLoadError] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const renderTaskRef = useRef<any>(null);

  const pdfUrl = "/salon%20guide.pdf";

  // Load PDF.js from CDN
  useEffect(() => {
    let isMounted = true;

    const loadPdfJs = async () => {
      try {
        if (!(window as any).pdfjsLib) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src =
              "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        const pdfjsLib = (window as any).pdfjsLib;
        if (!pdfjsLib) throw new Error("PDF.js failed to load");

        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        const loadingTask = pdfjsLib.getDocument(pdfUrl);

        loadingTask.onProgress = (progressData: { loaded: number; total: number }) => {
          if (progressData.total > 0 && isMounted) {
            const percent = Math.round((progressData.loaded / progressData.total) * 100);
            setLoadProgress(percent);
          }
        };

        const doc = await loadingTask.promise;
        if (!isMounted) return;

        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setLoading(false);
      } catch (err) {
        console.error("PDF.js loading error:", err);
        if (isMounted) {
          setLoadError(true);
          setLoading(false);
        }
      }
    };

    loadPdfJs();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

  // Render current page onto Canvas (Single Page Mode)
  const renderPage = useCallback(
    async (pageNumber: number) => {
      if (!pdfDoc || !canvasRef.current || viewMode !== "single") return;

      try {
        // Cancel previous render task if active
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const page = await pdfDoc.getPage(pageNumber);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Calculate responsive scale based on container width
        const containerWidth =
          containerRef.current?.clientWidth || window.innerWidth || 800;
        const unscaledViewport = page.getViewport({ scale: 1.0 });

        // Base fit-to-width factor
        const padding = window.innerWidth < 640 ? 16 : 32;
        const targetWidth = Math.min(containerWidth - padding, 900);
        const autoFitScale = targetWidth / unscaledViewport.width;

        const finalScale = autoFitScale * scale;
        const viewport = page.getViewport({ scale: finalScale });

        // Device Pixel Ratio for High-DPI / Retina Mobile Screens
        const dpr = window.devicePixelRatio || 1;
        canvas.width = viewport.width * dpr;
        canvas.height = viewport.height * dpr;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        ctx.scale(dpr, dpr);

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };

        const task = page.render(renderContext);
        renderTaskRef.current = task;
        await task.promise;
      } catch (err: any) {
        if (err?.name !== "RenderingCancelledException") {
          console.error("Error rendering page:", err);
        }
      }
    },
    [pdfDoc, scale, viewMode]
  );

  // Trigger render when page or scale changes
  useEffect(() => {
    if (viewMode === "single" && pdfDoc) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage, scale, viewMode, renderPage]);

  // Render all pages in Scroll Mode
  useEffect(() => {
    if (viewMode !== "scroll" || !pdfDoc || !scrollContainerRef.current) return;

    let isCancelled = false;

    const renderAllPages = async () => {
      const container = scrollContainerRef.current;
      if (!container) return;
      container.innerHTML = ""; // Clear existing

      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        if (isCancelled) break;

        const page = await pdfDoc.getPage(pageNum);
        const canvas = document.createElement("canvas");
        canvas.className = "mb-6 rounded-xl shadow-lg border border-border bg-white dark:bg-[#1A1E21] mx-auto block max-w-full";
        container.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        if (!ctx) continue;

        const containerWidth = container.clientWidth || 800;
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const padding = window.innerWidth < 640 ? 16 : 32;
        const targetWidth = Math.min(containerWidth - padding, 900);
        const autoFitScale = targetWidth / unscaledViewport.width;

        const finalScale = autoFitScale * scale;
        const viewport = page.getViewport({ scale: finalScale });

        const dpr = window.devicePixelRatio || 1;
        canvas.width = viewport.width * dpr;
        canvas.height = viewport.height * dpr;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        ctx.scale(dpr, dpr);

        await page.render({
          canvasContext: ctx,
          viewport: viewport,
        }).promise;
      }
    };

    renderAllPages();

    return () => {
      isCancelled = true;
    };
  }, [pdfDoc, viewMode, scale]);

  const handleNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.15, 2.0));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.15, 0.6));
  const handleResetZoom = () => setScale(1.0);

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

      {/* Main Interactive PDF Viewer Container */}
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
              <h2 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] leading-tight truncate max-w-[140px] sm:max-w-none">
                salondztech Guide.pdf
              </h2>
              {numPages > 0 && (
                <span className="text-[10px] text-brand-green font-semibold block">
                  {numPages} {t("page")}s
                </span>
              )}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* View Mode Toggle (Single Page vs Scroll) */}
            <div className="flex items-center bg-black/10 dark:bg-white/5 rounded-xl p-1 border border-border/50 me-1">
              <button
                onClick={() => setViewMode("single")}
                title="Single Page"
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  viewMode === "single"
                    ? "bg-brand-green text-brand-black shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Single</span>
              </button>
              <button
                onClick={() => setViewMode("scroll")}
                title="Continuous Scroll"
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  viewMode === "scroll"
                    ? "bg-brand-green text-brand-black shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <LayoutList className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Scroll</span>
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center bg-black/10 dark:bg-white/5 rounded-xl p-1 border border-border/50">
              <button
                onClick={handleZoomOut}
                title={t("zoomOut")}
                className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-primary)] transition-colors"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="px-1.5 text-[11px] font-mono font-semibold text-[var(--text-primary)] min-w-[36px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                title={t("zoomIn")}
                className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-primary)] transition-colors"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
              {scale !== 1.0 && (
                <button
                  onClick={handleResetZoom}
                  title={t("resetZoom")}
                  className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-secondary)] transition-colors border-s border-border/50 ms-0.5"
                >
                  <RotateCcw className="h-3 w-3" />
                </button>
              )}
            </div>

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

        {/* Viewport Render Area */}
        <div
          className={`w-full overflow-auto bg-[#13171A] dark:bg-[#0B0E10] flex flex-col items-center justify-center relative p-3 sm:p-6 ${
            isFullscreen
              ? "h-[calc(100vh-110px)]"
              : "min-h-[480px] sm:min-h-[680px] max-h-[82vh]"
          }`}
        >
          {/* Loading Indicator */}
          {loading && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Loader2 className="h-10 w-10 text-brand-green animate-spin mb-4" />
              <p className="text-base font-bold text-white mb-2">
                جاري تحميل دليل المستخدم...
              </p>
              <div className="w-48 bg-white/10 rounded-full h-2 overflow-hidden mb-2">
                <div
                  className="bg-brand-green h-full transition-all duration-200"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <span className="text-xs text-white/70 font-mono">
                {loadProgress}%
              </span>
            </div>
          )}

          {/* Error Fallback */}
          {loadError && (
            <div className="text-center p-8 max-w-md bg-black/40 rounded-2xl border border-white/10 backdrop-blur-md">
              <FileText className="h-12 w-12 text-amber-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">
                عينة الدليل جاهزة للتحميل
              </h3>
              <p className="text-xs text-white/70 mb-6 leading-relaxed">
                يمكنك فتح ملف PDF مباشرة في المتصفح أو رفعه بجهازك لقراءة جميع الصفحات بوضوح.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-brand-green text-black font-bold">
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" /> فتح الملف الكامل
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-white/20 text-white">
                  <a href={pdfUrl} download="salondztech_user_guide.pdf">
                    <Download className="h-4 w-4" /> تحميل PDF
                  </a>
                </Button>
              </div>
            </div>
          )}

          {/* Canvas Rendering (Single Page Mode) */}
          {!loading && !loadError && viewMode === "single" && (
            <div className="relative flex flex-col items-center justify-center max-w-full">
              <canvas
                ref={canvasRef}
                className="rounded-xl shadow-2xl border border-white/10 max-w-full bg-white dark:bg-[#1A1E21]"
              />
            </div>
          )}

          {/* Canvas Scroll Stack (Scroll Mode) */}
          {!loading && !loadError && viewMode === "scroll" && (
            <div
              ref={scrollContainerRef}
              className="w-full flex flex-col items-center gap-4 py-4"
            />
          )}
        </div>

        {/* Page Navigation Footer (Single Page Mode Controls) */}
        {!loading && !loadError && viewMode === "single" && numPages > 0 && (
          <div className="px-3 py-3 bg-black/10 dark:bg-black/50 border-t border-border flex flex-wrap items-center justify-between gap-2">
            {/* Prev Page Button */}
            <Button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              variant="outline"
              size="sm"
              className="border-border hover:bg-brand-green/10 text-xs font-semibold gap-1 px-3"
            >
              <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              <span>{t("zoomOut") === "Zoom Out" ? "Previous" : "السابق"}</span>
            </Button>

            {/* Page Counter & Direct Selector */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-primary)]">
              <span>{t("page")}</span>
              <span className="px-2 py-1 rounded-lg bg-brand-green/10 text-brand-green font-mono">
                {currentPage}
              </span>
              <span>{t("of")}</span>
              <span className="font-mono">{numPages}</span>
            </div>

            {/* Next Page Button */}
            <Button
              onClick={handleNextPage}
              disabled={currentPage >= numPages}
              variant="outline"
              size="sm"
              className="border-border hover:bg-brand-green/10 text-xs font-semibold gap-1 px-3"
            >
              <span>{t("zoomOut") === "Zoom Out" ? "Next" : "التالي"}</span>
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </div>
        )}

        {/* Bottom Mobile Notice */}
        <div className="px-4 py-2 bg-black/5 dark:bg-black/40 border-t border-border flex flex-wrap items-center justify-between text-[11px] text-[var(--text-secondary)]">
          <p className="truncate max-w-full">{t("mobileNotice")}</p>
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
