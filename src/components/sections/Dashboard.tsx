"use client";
// Design intent: Scroll-driven 3D perspective dashboard reveal using ContainerScroll.
// Displays the high-quality 1080p staff animation video in full-fit edge-to-edge frame.
// Responsive: Auto-scales across mobile, tablet, and desktop with perfect 16:9 proportion.

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Dashboard() {
  const t = useTranslations("dashboard");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set 1.5x playback speed immediately
    video.playbackRate = 1.5;

    // High performance: only play when in viewport, pause when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!video) return;
        if (entry.isIntersecting) {
          video.playbackRate = 1.5;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1, rootMargin: "150px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="dashboard" className="relative overflow-hidden py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-4 mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass border-black/[0.06] dark:border-white/[0.1] text-xs font-semibold text-brand-green tracking-wider uppercase shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span>{t("livePreview")}</span>
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl font-[var(--font-display)] text-[var(--text-primary)] px-2">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Video Showcase Screen — Static, Flat, Big Height on Mobile, Responsive */}
        <div className="relative mx-auto max-w-6xl xl:max-w-7xl">
          {/* Subtle atmospheric ambient glow */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-green/20 via-emerald-400/10 to-brand-green/20 rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] blur-xl opacity-40 dark:opacity-25 pointer-events-none" />

          {/* Screen Showcase Container:
              - Mobile (<640px): h-[380px] for a big, immersive, prominent height
              - Small tablet (640-767px): sm:h-[460px]
              - Tablet / Desktop (768px+): md:h-auto md:aspect-video for true 16:9 widescreen
          */}
          <div className="relative w-full h-[380px] sm:h-[460px] md:h-auto md:aspect-video rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden bg-white dark:bg-[#071b12] border border-black/[0.08] dark:border-white/[0.12] shadow-2xl shadow-black/8 dark:shadow-emerald-950/30">
            <video
              ref={videoRef}
              src="/videos/Salon_animation_with_working_staff_324f1b99_1080p.mp4"
              poster="/videos/Salon_animation_with_working_staff_324f1b99.gif"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onLoadedMetadata={(e) => {
                e.currentTarget.playbackRate = 1.5;
              }}
              className="w-full h-full object-cover object-center block border-0 outline-none ring-0 select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


