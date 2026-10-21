"use client";

import { useTranslations } from "next-intl";
import { Download, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuyModal } from "@/components/ui/BuyModal";
import { Link } from "@/i18n/routing";

export default function CTA() {
  const t = useTranslations("cta");
  const { openModal } = useBuyModal();

  return (
    <section className="relative overflow-hidden py-20 md:py-28 text-white">
      {/* Hairline grid pattern */}
      <div className="absolute inset-0 hairline-grid opacity-20 pointer-events-none" />

      {/* Radial emerald glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(37,211,102,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 md:px-6 z-10">
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 border border-brand-green/30 apple-specular-edge bg-gradient-to-b from-brand-green/15 via-[#0D1913] to-[#070D0A] shadow-2xl overflow-hidden text-center">
          <div className="mx-auto w-16 h-16 mb-6 rounded-2xl bg-brand-green/15 border border-brand-green/30 flex items-center justify-center text-brand-green shadow-md">
            <Download className="w-7 h-7" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl font-[var(--font-display)] text-white">
            {t("title")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto w-full">
            <Button
              size="lg"
              className="apple-btn-primary apple-press font-bold h-12 px-7 rounded-2xl w-full sm:w-auto shadow-lg flex items-center justify-center gap-2.5 cursor-pointer text-sm whitespace-nowrap shrink-0"
              asChild
            >
              <Link href="/download" className="flex items-center justify-center gap-2.5 whitespace-nowrap">
                <Download className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">{t("downloadApp")}</span>
              </Link>
            </Button>

            <button
              className="apple-card apple-press hover:border-brand-green/50 text-emerald-600 dark:text-brand-green font-bold h-12 px-7 rounded-2xl w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer text-sm whitespace-nowrap shrink-0"
              onClick={() => openModal()}
            >
              <ShoppingCart className="h-4 w-4 text-emerald-600 dark:text-brand-green shrink-0" />
              <span className="whitespace-nowrap">{t("buyNow")}</span>
            </button>
          </div>

          <p className="mt-6 text-xs text-emerald-300/70 font-medium">
            {t("offlineNote")}
          </p>
        </div>
      </div>
    </section>
  );
}

