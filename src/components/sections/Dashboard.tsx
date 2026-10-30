"use client";
// Design intent: Scroll-driven 3D perspective dashboard reveal using ContainerScroll.
// Displays the high-quality 1080p staff animation video in full-fit edge-to-edge frame.
// Responsive: Auto-scales across mobile, tablet, and desktop with perfect 16:9 proportion.

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

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
    <section id="dashboard" className="relative overflow-hidden py-6 sm:py-10">
      <ContainerScroll
        titleComponent={
          <div className="space-y-4 mb-6 sm:mb-8">
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
        }
      >
        <div className="relative w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl bg-transparent select-none border-0 outline-none">
          {/* 1080p High Quality Animation Video — 1.5x Speed & Viewport Aware */}
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
            className="w-full h-full object-cover object-center block border-0 outline-none ring-0 rounded-2xl sm:rounded-3xl"
          />
        </div>
      </ContainerScroll>
    </section>
  );
}


