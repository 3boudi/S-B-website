"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Play,
  PlayCircle,
  Video,
  Clock,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  BookOpen,
  Download,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Film,
  Radio,
} from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

interface VideoItem {
  id: string;
  isShort: boolean;
  badge: string;
  duration: string;
  title: string;
  desc: string;
  youtubeUrl: string;
}

export default function TutorialsPlaylistViewer({ locale }: { locale: string }) {
  const t = useTranslations("tutorialsPage");
  const isRTL = locale === "ar";

  // Raw array of videos from translations
  const videos: VideoItem[] = (t.raw("videos") as VideoItem[]) || [];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hasStartedPlaying, setHasStartedPlaying] = useState<boolean>(false);

  const activeVideo = videos[activeIndex] || videos[0];

  const handleSelectVideo = (index: number) => {
    setActiveIndex(index);
    setHasStartedPlaying(true);
  };

  const handleNext = () => {
    if (activeIndex < videos.length - 1) {
      setActiveIndex((prev) => prev + 1);
      setHasStartedPlaying(true);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
      setHasStartedPlaying(true);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Radial emerald atmospheric glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(37,211,102,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass border-black/[0.06] dark:border-white/[0.1] text-brand-green text-xs font-semibold tracking-tight shadow-xs mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{t("badge")}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
          <span className="text-[var(--text-secondary)] font-normal">
            {t("playlistCount")}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] font-[var(--font-display)] tracking-tight mb-3">
          {t("title")}
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mx-auto">
          {t("desc")}
        </p>

        {/* Global Quick Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
          <a
            href="https://www.youtube.com/@SalonDZtech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl apple-card apple-press border-black/[0.08] dark:border-white/[0.1] text-xs font-semibold hover:border-red-500/50 hover:text-red-500 transition-colors shadow-xs"
          >
            <FaYoutube className="h-4 w-4 text-[#FF0000]" />
            <span>{t("subscribeChannel")}</span>
          </a>

          <Button
            variant="outline"
            size="sm"
            className="apple-card apple-press font-semibold rounded-xl text-xs border-black/[0.08] dark:border-white/[0.1] hover:border-brand-green/50 text-foreground cursor-pointer flex items-center gap-1.5 h-9 px-4"
            asChild
          >
            <Link href="/guide">
              <BookOpen className="h-3.5 w-3.5 text-brand-green" />
              <span>{t("viewGuide")}</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="apple-card apple-press font-semibold rounded-xl text-xs border-black/[0.08] dark:border-white/[0.1] hover:border-brand-green/50 text-foreground cursor-pointer flex items-center gap-1.5 h-9 px-4"
            asChild
          >
            <Link href="/download">
              <Download className="h-3.5 w-3.5 text-brand-green" />
              <span>{t("downloadApp")}</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Interactive Grid: Player on left/top, Playlist on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Cinema Video Player (8 cols on desktop) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Video Container Card */}
          <div className="apple-card apple-specular-edge rounded-3xl border border-black/[0.08] dark:border-white/[0.12] overflow-hidden shadow-2xl relative bg-black/[0.02] dark:bg-black/[0.4]">
            {/* Top Bar inside Player Card */}
            <div className="px-4 sm:px-6 py-3 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full apple-glass text-xs font-bold text-brand-green border border-brand-green/30">
                  <Film className="h-3 w-3" />
                  <span>{activeVideo.badge}</span>
                </span>
                <span className="text-xs text-[var(--text-secondary)] font-medium">
                  {t("videoIndex", {
                    current: (activeIndex + 1).toString(),
                    total: videos.length.toString(),
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full apple-glass text-xs text-[var(--text-secondary)]">
                  <Clock className="h-3 w-3 text-brand-green" />
                  <span className="font-semibold">{activeVideo.duration}</span>
                </span>

                <a
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 hover:bg-red-600/20 text-[#FF0000] text-xs font-bold transition-all border border-red-500/20 apple-press"
                  title={t("watchOnYouTube")}
                >
                  <FaYoutube className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{t("watchOnYouTube")}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Embedded Responsive Player */}
            <div className="relative w-full bg-black/95 flex items-center justify-center overflow-hidden">
              {activeVideo.isShort ? (
                /* Shorts Smart Player Container (Centered 9:16 aspect with blurred background) */
                <div className="w-full relative py-4 sm:py-6 flex items-center justify-center bg-radial from-slate-900 to-black">
                  <div className="w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(37,211,102,0.15)] border border-white/[0.1] relative">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=${
                        hasStartedPlaying ? 1 : 0
                      }&rel=0&modestbranding=1&playsinline=1`}
                      title={activeVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                </div>
              ) : (
                /* Standard Landscape 16:9 Video Player */
                <div className="w-full aspect-video relative">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=${
                      hasStartedPlaying ? 1 : 0
                    }&rel=0&modestbranding=1&playsinline=1`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              )}
            </div>

            {/* Bottom Meta & Navigation within Player Card */}
            <div className="p-5 sm:p-6 bg-card/60 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold text-brand-green uppercase tracking-wider">
                      {activeVideo.badge}
                    </span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className="text-xs text-[var(--text-secondary)]">
                      {activeVideo.isShort ? t("shortsBadge") : t("fullHdBadge")}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-primary)] font-[var(--font-display)] leading-snug">
                    {activeVideo.title}
                  </h2>
                </div>

                {/* Previous / Next Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrev}
                    disabled={activeIndex === 0}
                    className="apple-card apple-press h-9 px-3 rounded-xl text-xs font-semibold border-black/[0.08] dark:border-white/[0.1] disabled:opacity-30 cursor-pointer flex items-center gap-1"
                  >
                    {isRTL ? (
                      <ArrowRight className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowLeft className="h-3.5 w-3.5" />
                    )}
                    <span>{t("prevVideo")}</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    disabled={activeIndex === videos.length - 1}
                    className="apple-btn-primary apple-press h-9 px-3 rounded-xl text-xs font-semibold disabled:opacity-30 cursor-pointer flex items-center gap-1 shadow-sm"
                  >
                    <span>{t("nextVideo")}</span>
                    {isRTL ? (
                      <ArrowLeft className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-black/[0.06] dark:border-white/[0.08] pt-3">
                {activeVideo.desc}
              </p>

              {/* Direct Buttons Footer */}
              <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between flex-wrap gap-2 text-xs">
                <a
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-[#FF0000] hover:underline"
                >
                  <FaYoutube className="h-4 w-4" />
                  <span>{t("watchOnYouTube")}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <span>{t("playlistChannel")}</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-green" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Playlist Sidebar (4 cols on desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="apple-card apple-specular-edge rounded-3xl p-5 border border-black/[0.08] dark:border-white/[0.12] shadow-xl">
            {/* Playlist Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl apple-glass text-brand-green flex items-center justify-center border border-brand-green/30">
                  <PlayCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] font-[var(--font-display)]">
                    {t("title")}
                  </h3>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    {t("videoIndex", {
                      current: (activeIndex + 1).toString(),
                      total: videos.length.toString(),
                    })}
                  </p>
                </div>
              </div>

              <a
                href="https://www.youtube.com/@SalonDZtech"
                target="_blank"
                rel="noopener noreferrer"
                title={t("openPlaylist")}
                className="text-[#FF0000] hover:opacity-80 transition-opacity p-1.5 rounded-lg apple-glass"
              >
                <FaYoutube className="h-4 w-4" />
              </a>
            </div>

            {/* List of 5 Videos */}
            <div className="flex flex-col gap-2.5 max-h-[620px] overflow-y-auto pr-1">
              {videos.map((vid, idx) => {
                const isCurrent = idx === activeIndex;

                return (
                  <div
                    key={vid.id}
                    onClick={() => handleSelectVideo(idx)}
                    className={`group apple-press rounded-2xl p-2.5 transition-all duration-200 border cursor-pointer text-start flex gap-3 items-center relative ${
                      isCurrent
                        ? "bg-brand-green/10 border-brand-green/50 shadow-md ring-1 ring-brand-green/30"
                        : "apple-card border-black/[0.06] dark:border-white/[0.08] hover:border-brand-green/30 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                    }`}
                  >
                    {/* Thumbnail with overlay duration */}
                    <div className="relative w-24 sm:w-28 h-16 shrink-0 rounded-xl overflow-hidden bg-black/40 border border-black/[0.08] dark:border-white/[0.1]">
                      <Image
                        src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`}
                        alt={vid.title}
                        fill
                        sizes="120px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />

                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />

                      {/* Play icon overlay */}
                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                          isCurrent
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <div className="w-7 h-7 rounded-full bg-brand-green text-white flex items-center justify-center shadow-lg">
                          <Play className="h-3 w-3 fill-current ml-0.5 rtl:mr-0.5 rtl:ml-0" />
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <span className="absolute bottom-1 right-1 rtl:right-auto rtl:left-1 bg-black/80 text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
                        {vid.duration}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                            isCurrent
                              ? "bg-brand-green text-white"
                              : "apple-glass text-brand-green border border-brand-green/20"
                          }`}
                        >
                          {vid.badge}
                        </span>

                        {isCurrent && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-green animate-pulse">
                            <Radio className="h-2.5 w-2.5" />
                            <span>{t("nowPlaying")}</span>
                          </span>
                        )}
                      </div>

                      <h4
                        className={`text-xs font-bold line-clamp-2 leading-snug mb-1 transition-colors ${
                          isCurrent
                            ? "text-brand-green"
                            : "text-[var(--text-primary)] group-hover:text-brand-green"
                        }`}
                      >
                        {vid.title}
                      </h4>

                      <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
                        <span className="truncate">{vid.duration}</span>
                        <a
                          href={vid.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#FF0000] hover:underline inline-flex items-center gap-0.5"
                          title={t("watchOnYouTube")}
                        >
                          <FaYoutube className="h-3 w-3" />
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions inside playlist box */}
            <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-2">
              <a
                href="https://www.youtube.com/@SalonDZtech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#FF0000] font-bold flex items-center gap-1.5 hover:underline"
              >
                <FaYoutube className="h-4 w-4" />
                <span>{t("openPlaylist")}</span>
              </a>

              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <Link href="/">
                  <ArrowLeft className="h-3 w-3 rtl:rotate-180" />
                  <span>{t("backHome")}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
