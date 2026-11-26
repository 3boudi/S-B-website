"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import {
  BarChart3,
  CalendarClock,
  CreditCard,
  LayoutDashboard,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Sparkles,
  Tv,
  X,
} from "lucide-react";
import {
  REAL_APP_VIDEO_SCENES,
  resolveCameraPose,
  type AppSceneId,
} from "./videoScenes";

const SCENE_ICONS: Record<AppSceneId, React.ReactNode> = {
  dashboard: <LayoutDashboard className="h-3.5 w-3.5 shrink-0" />,
  pos: <CreditCard className="h-3.5 w-3.5 shrink-0" />,
  queue: <Tv className="h-3.5 w-3.5 shrink-0" />,
  appointments: <CalendarClock className="h-3.5 w-3.5 shrink-0" />,
  reports: <BarChart3 className="h-3.5 w-3.5 shrink-0" />,
};

const ACCENT_CLASSES = {
  emerald: {
    dot: "bg-brand-green",
    pill: "border-brand-green/35 text-emerald-700 dark:text-brand-green bg-brand-green/10",
    glow: "from-brand-green/25 via-emerald-400/10 to-transparent",
  },
  sky: {
    dot: "bg-sky-500",
    pill: "border-sky-500/35 text-sky-700 dark:text-sky-300 bg-sky-500/10",
    glow: "from-sky-500/20 via-brand-green/10 to-transparent",
  },
  amber: {
    dot: "bg-amber-500",
    pill: "border-amber-500/35 text-amber-700 dark:text-amber-300 bg-amber-500/10",
    glow: "from-amber-400/20 via-brand-green/10 to-transparent",
  },
  violet: {
    dot: "bg-violet-500",
    pill: "border-violet-500/35 text-violet-700 dark:text-violet-300 bg-violet-500/10",
    glow: "from-violet-500/20 via-brand-green/10 to-transparent",
  },
} as const;

export default function DashboardMotionShowcase() {
  const t = useTranslations("dashboard.showcase");
  const reducedMotion = Boolean(useReducedMotion());

  const stageRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(!reducedMotion);
  const [playbackRate, setPlaybackRate] = useState<1 | 1.25>(1.25);
  const [isInView, setIsInView] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activeScene = REAL_APP_VIDEO_SCENES[activeIdx];
  const nextScene =
    REAL_APP_VIDEO_SCENES[(activeIdx + 1) % REAL_APP_VIDEO_SCENES.length];

  // Scroll-driven Apple-Keynote perspective entrance
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "center center"],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });
  const stageRotateX = useTransform(
    smoothScroll,
    [0, 1],
    reducedMotion ? [0, 0] : [6.5, 0]
  );
  const stageScale = useTransform(
    smoothScroll,
    [0, 1],
    reducedMotion ? [1, 1] : [0.96, 1]
  );

  // Track viewport visibility so playback pauses cleanly off-screen
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.18 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Close cinema lightbox on Escape
  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isLightboxOpen]);

  // Synchronize actual HTMLVideoElement playback, speed, and visibility
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.playbackRate = playbackRate;

    if (reducedMotion || !isPlaying || (!isInView && !isLightboxOpen)) {
      vid.pause();
      return;
    }

    const playPromise = vid.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  }, [activeIdx, isInView, isLightboxOpen, isPlaying, playbackRate, reducedMotion]);

  // Efficient progress tracking: runs ONLY while visible & playing (~15fps React updates, CSS smooths transitions)
  useEffect(() => {
    if (reducedMotion || !isPlaying || (!isInView && !isLightboxOpen)) return;
    let rafId = 0;
    let lastUpdate = 0;

    const tick = (now: number) => {
      rafId = window.requestAnimationFrame(tick);
      if (now - lastUpdate < 66) return;
      lastUpdate = now;

      const vid = videoRef.current;
      if (vid && vid.duration && Number.isFinite(vid.duration) && vid.duration > 0) {
        setProgress(Math.min(1, vid.currentTime / vid.duration));
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [activeIdx, isInView, isLightboxOpen, isPlaying, reducedMotion]);

  const handleSelectScene = useCallback((idx: number) => {
    setActiveIdx(idx);
    setProgress(0);
    setIsPlaying(true);
  }, []);

  const handleVideoEnded = useCallback(() => {
    setProgress(0);
    setActiveIdx((prev) => (prev + 1) % REAL_APP_VIDEO_SCENES.length);
  }, []);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleToggleSpeed = useCallback(() => {
    setPlaybackRate((prev) => (prev === 1 ? 1.25 : 1));
  }, []);

  // Compute current kinetic camera zoom/pan pose from real video timestamp
  const cameraPose = useMemo(() => {
    if (reducedMotion || isLightboxOpen) {
      return { at: 0, scale: 1, originX: 50, originY: 50 };
    }
    return resolveCameraPose(activeScene.cameraKeyframes, progress);
  }, [activeScene.cameraKeyframes, isLightboxOpen, progress, reducedMotion]);

  // Resolve current timestamp-synced Motion Design Callout Beat
  const activeBeat = useMemo(() => {
    return (
      activeScene.beats.find(
        (b) => progress >= b.startAt && progress <= b.endAt
      ) ?? activeScene.beats[0]
    );
  }, [activeScene.beats, progress]);

  const accentStyle = ACCENT_CLASSES[activeBeat.accent];

  const renderVideoStage = (expanded: boolean) => (
    <div
      className={`relative w-full overflow-hidden bg-white dark:bg-[#08120d] border border-black/[0.09] dark:border-white/[0.12] shadow-2xl shadow-black/10 dark:shadow-emerald-950/50 ${
        expanded
          ? "rounded-2xl max-w-6xl mx-auto"
          : "rounded-2xl sm:rounded-3xl"
      }`}
    >
      {/* Top Native Desktop App Window Chrome */}
      <div className="flex items-center justify-between gap-2 px-3 sm:px-5 py-2 border-b border-black/[0.07] dark:border-white/[0.08] bg-[#fafaf8]/95 dark:bg-[#0c1611]/95 backdrop-blur-md">
        {/* Traffic lights + Real App Route Pill */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green" />
            </span>
            <span className="sm:hidden text-[11px] font-bold text-foreground truncate">
              {activeScene.indexLabel} · {t(activeScene.titleKey)}
            </span>
            <span
              dir="ltr"
              className="hidden sm:inline text-xs font-mono font-semibold text-foreground/80 truncate"
            >
              {activeScene.routeLabel}
            </span>
          </div>
        </div>

        {/* Real App Capture Badge + Tactile Thumb-Friendly Director Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-brand-green/12 text-emerald-700 dark:text-brand-green border border-brand-green/25">
            <Sparkles className="h-3 w-3" />
            <span>{t("realAppBadge")}</span>
          </span>

          {/* Speed Selector */}
          {!reducedMotion && (
            <button
              type="button"
              onClick={handleToggleSpeed}
              className="min-h-[38px] min-w-[44px] sm:min-h-[30px] sm:min-w-0 px-2.5 sm:px-2 py-1 rounded-xl sm:rounded-lg text-xs sm:text-[10.5px] font-bold tabular-nums bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-foreground/80 transition-colors cursor-pointer"
              title={t("speedTooltip")}
            >
              {playbackRate}×
            </button>
          )}

          {/* Play / Pause */}
          {!reducedMotion && (
            <button
              type="button"
              onClick={handleTogglePlay}
              aria-label={isPlaying ? t("pause") : t("play")}
              title={isPlaying ? t("pause") : t("play")}
              className="inline-flex items-center justify-center h-[38px] w-[38px] sm:h-7 sm:w-7 rounded-xl sm:rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-brand-green/15 hover:text-brand-green text-foreground/80 transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 sm:h-3.5 sm:w-3.5 fill-current" />
              ) : (
                <Play className="h-4 w-4 sm:h-3.5 sm:w-3.5 fill-current" />
              )}
            </button>
          )}

          {/* Expand / Close Cinema View */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen((open) => !open)}
            aria-label={expanded ? t("closeFullscreen") : t("fullscreen")}
            title={expanded ? t("closeFullscreen") : t("fullscreen")}
            className="inline-flex items-center justify-center h-[38px] w-[38px] sm:h-7 sm:w-7 rounded-xl sm:rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-brand-green/15 hover:text-brand-green text-foreground/80 transition-colors cursor-pointer"
          >
            {expanded ? (
              <Minimize2 className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
            ) : (
              <Maximize2 className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Main 16:10 Real App Screen Video Viewport + Kinetic Camera Layer */}
      <div className="relative w-full aspect-[16/10] bg-[#f8faf8] dark:bg-[#08120d] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene.id}
            initial={{ opacity: 0.35, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.25, scale: 1.008 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
          >
            {/* Kinetic Motion-Design Camera Transform */}
            <motion.div
              animate={{
                scale: cameraPose.scale,
                transformOrigin: `${cameraPose.originX}% ${cameraPose.originY}%`,
              }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full will-change-transform"
            >
              {reducedMotion ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={activeScene.posterSrc}
                  alt={t(activeScene.titleKey)}
                  className="w-full h-full object-cover object-top block select-none"
                />
              ) : (
                <video
                  ref={expanded ? undefined : videoRef}
                  key={`${activeScene.videoSrc}-${expanded ? "full" : "main"}`}
                  src={activeScene.videoSrc}
                  poster={activeScene.posterSrc}
                  autoPlay={isPlaying && (isInView || expanded)}
                  muted
                  playsInline
                  preload={isInView || expanded ? "auto" : "none"}
                  onLoadedMetadata={(e) => {
                    e.currentTarget.playbackRate = playbackRate;
                  }}
                  onEnded={handleVideoEnded}
                  className="w-full h-full object-cover object-top block select-none"
                />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Subtle Bottom Gradient Vignette solely on sm+ where callout floats over video */}
        <div className="hidden sm:block pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

        {/* Desktop/Tablet Floating Timestamp-Synced Callout Card (hidden on <sm so video stays 100% unobstructed) */}
        <div className="hidden sm:flex pointer-events-none absolute bottom-5 inset-x-5 items-end justify-between gap-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeScene.id}-${activeBeat.id}`}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md rounded-2xl px-4 py-3 apple-glass-prominent border border-black/10 dark:border-white/15 shadow-xl"
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold border ${accentStyle.pill}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${accentStyle.dot}`} />
                  <span>{t(activeBeat.tagKey)}</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-muted-foreground tabular-nums">
                  {activeScene.indexLabel} / 05
                </span>
              </div>
              <p className="text-sm font-extrabold text-foreground leading-snug">
                {t(activeBeat.titleKey)}
              </p>
              <p className="text-[11.5px] text-muted-foreground leading-snug mt-0.5">
                {t(activeBeat.descKey)}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Compact Live Time Progress Chip */}
          <div className="flex items-center gap-2 rounded-full px-3 py-1.5 apple-glass-prominent border border-black/10 dark:border-white/15 text-[11px] font-bold text-foreground shadow-lg">
            <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
            <span className="tabular-nums">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </div>

        {/* Hidden Preloader for Zero-Gap Next Scene Transition (only once visible) */}
        {!reducedMotion && (isInView || expanded) && (
          <video
            key={`preload-${nextScene.videoSrc}`}
            src={nextScene.videoSrc}
            preload="metadata"
            muted
            playsInline
            aria-hidden="true"
            className="hidden"
          />
        )}
      </div>

      {/* Continuous Razor-Thin Top Scrubber Bar at Bottom Edge of Video */}
      <div className="h-1 w-full bg-black/[0.06] dark:bg-white/[0.08] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-green via-emerald-400 to-teal-400 transition-[width] duration-75"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      {/* Mobile Unobstructed Callout Strip (sits cleanly BELOW the video on <sm phones!) */}
      <div className="sm:hidden px-3.5 py-3 bg-[#fafaf8] dark:bg-[#0c1611] border-t border-black/[0.06] dark:border-white/[0.08] text-start">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold border ${accentStyle.pill}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${accentStyle.dot}`} />
            <span>{t(activeBeat.tagKey)}</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-muted-foreground tabular-nums">
            {activeScene.indexLabel} / 05 · {Math.round(progress * 100)}%
          </span>
        </div>
        <p className="text-xs font-extrabold text-foreground leading-snug">
          {t(activeBeat.titleKey)}
        </p>
        <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
          {t(activeBeat.descKey)}
        </p>
      </div>
    </div>
  );

  return (
    <div ref={stageRef} className="relative mx-auto max-w-6xl xl:max-w-7xl">
      {/* Dynamic Scene-Tinted Ambient Halo */}
      <div
        className={`absolute -inset-2 bg-gradient-to-tr ${accentStyle.glow} rounded-[28px] sm:rounded-[36px] blur-2xl opacity-60 dark:opacity-45 pointer-events-none transition-colors duration-700`}
      />

      {/* Scroll-Driven 3D Perspective Stage */}
      <div style={{ perspective: "1400px" }}>
        <motion.div
          style={{
            rotateX: stageRotateX,
            scale: stageScale,
            transformStyle: "preserve-3d",
          }}
        >
          {renderVideoStage(false)}
        </motion.div>
      </div>

      {/* =================================================================
          INTERACTIVE 5-CHAPTER STORYBOARD DOCK
          Mobile/Tablet (<lg): Smooth horizontal scroll-snap swipe bar (zero orphan card!)
          Desktop (lg+): Clean 5-column architectural row
          ================================================================= */}
      <div
        className="mt-3.5 sm:mt-5 flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-2.5 pb-1 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0"
        role="tablist"
        aria-label={t("storyboardAria")}
      >
        {REAL_APP_VIDEO_SCENES.map((scene, idx) => {
          const isActive = idx === activeIdx;
          const isCompleted = idx < activeIdx;

          return (
            <button
              key={scene.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelectScene(idx)}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl p-3 text-start transition-all duration-200 cursor-pointer border shrink-0 snap-start w-[62%] sm:w-[38%] lg:w-auto min-h-[78px] ${
                isActive
                  ? "apple-card border-brand-green/60 shadow-md shadow-brand-green/10"
                  : "apple-glass border-black/[0.07] dark:border-white/[0.08] hover:border-brand-green/35 opacity-85 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between gap-1.5 mb-1">
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider ${
                    isActive
                      ? "text-brand-green"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {SCENE_ICONS[scene.id]}
                  <span className="font-mono">{scene.indexLabel}</span>
                </span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
                )}
              </div>

              <div className="text-xs sm:text-[13px] font-bold text-foreground leading-snug line-clamp-1">
                {t(scene.titleKey)}
              </div>
              <div className="text-[10.5px] text-muted-foreground leading-tight line-clamp-1 mt-0.5">
                {t(scene.shortDescKey)}
              </div>

              {/* Per-Chapter Animated Progress Track */}
              <div className="mt-2.5 h-1 w-full rounded-full bg-black/[0.06] dark:bg-white/[0.08] overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-green transition-[width] duration-75"
                  style={{
                    width: isActive
                      ? `${Math.round(progress * 100)}%`
                      : isCompleted
                      ? "100%"
                      : "0%",
                    opacity: isCompleted ? 0.35 : 1,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Cinema Lightbox Fullscreen Overlay */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl"
            >
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                aria-label={t("closeFullscreen")}
                className="absolute -top-11 end-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-bold backdrop-blur-md cursor-pointer transition-colors"
              >
                <X className="h-4 w-4" />
                <span>{t("closeFullscreen")}</span>
              </button>
              {renderVideoStage(true)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
