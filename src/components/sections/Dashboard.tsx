"use client";
// Design intent: Scroll-driven 3D perspective dashboard reveal using ContainerScroll.
// Shows the dashboard screenshot rotating from perspective to flat as user scrolls.
// Accessibility: decorative animation, image has alt text.

import { useTranslations } from "next-intl";
import Image from "next/image";
import { MonitorPlay } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const t = useTranslations("dashboard");

  return (
    <section id="dashboard" className="relative overflow-hidden bg-[#F8FAF9] dark:bg-[#111815]">
      <ContainerScroll
        titleComponent={
          <div className="space-y-4 mb-8">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-brand-green">
              {t("livePreview")}
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl font-[var(--font-display)] text-[var(--text-primary)] px-2">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[var(--text-secondary)]">
              {t("subtitle")}
            </p>
          </div>
        }
      >
        <Image
          src="/dashboard.png"
          alt="salondztech salon management dashboard — full preview"
          width={1200}
          height={750}
          className="w-full h-full object-cover object-left-top"
        />
      </ContainerScroll>

      <div className="flex flex-col items-center gap-3 pb-16 -mt-16 sm:-mt-32 relative z-10 px-4 w-full">
        <p className="text-sm text-[var(--text-muted)] text-center">{t("caption")}</p>
        <Button className="w-full sm:w-auto" asChild>
          <a href="https://salonsoftware.netlify.app/" target="_blank" rel="noopener noreferrer">
            <MonitorPlay className="h-4 w-4" />
            {t("tryFree")}
          </a>
        </Button>
      </div>
    </section>
  );
}
