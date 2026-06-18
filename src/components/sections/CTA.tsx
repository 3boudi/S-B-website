"use client";
// Design intent: Full-width green gradient CTA section to drive conversions.
// White text on green gradient background. Two buttons: Try Free (white) and Buy (white outline).
// Accessibility: semantic heading, clear button labels, adequate contrast.

import { useTranslations } from "next-intl";
import { MonitorPlay, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuyModal } from "@/components/ui/BuyModal";

export default function CTA() {
  const t = useTranslations("cta");
  const { openModal } = useBuyModal();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-green-dark to-brand-green py-20 md:py-28">
      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center md:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl font-[var(--font-display)]">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-white/80 leading-relaxed">
          {t("subtitle")}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center w-full">
          <Button
            size="lg"
            className="bg-white text-brand-green-dark hover:bg-white/90 active:scale-[0.98] w-full sm:w-auto"
            asChild
          >
            <a href="https://salonsoftware.netlify.app/" target="_blank" rel="noopener noreferrer">
              <MonitorPlay className="h-5 w-5" />
              {t("tryFree")}
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 bg-white text-black hover:bg-gray-100 w-full sm:w-auto"
            onClick={() => openModal()}
          >
            <ShoppingCart className="h-5 w-5" />
            {t("buyNow")}
          </Button>
        </div>

        <p className="mt-6 text-sm text-white/60">
          {t("offlineNote")}
        </p>
      </div>
    </section>
  );
}
