import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Pricing from "@/components/sections/Pricing";
import { Button } from "@/components/ui/button";
import { Download, Sparkles, ShieldCheck } from "lucide-react";

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 bg-[var(--bg-primary)] dark:bg-[#0A0F0D]">
        <DownloadContent />
      </main>
      <Footer />
    </>
  );
}

// Client container for translations & animation
function DownloadContent() {
  const t = useTranslations("downloadPage");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-[var(--font-display)] text-[var(--text-primary)]">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Grid of download items */}
      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto mb-20">
        {/* VIP Card (Free Trial) */}
        <div className="relative overflow-hidden rounded-2xl border border-brand-green/30 bg-[var(--bg-card)] dark:bg-[#111B21] p-8 shadow-md hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 bg-brand-green text-white dark:text-[#111B21] text-xs font-extrabold uppercase px-4 py-1.5 rounded-bl-xl tracking-wider flex items-center gap-1">
            <Sparkles className="h-3 w-3 fill-current" />
            <span>Recommended</span>
          </div>

          <h2 className="text-2xl font-bold font-[var(--font-display)] text-[var(--text-primary)] flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-brand-green" />
            {t("vipTitle")}
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 min-h-[80px]">
            {t("vipDesc")}
          </p>

          <Button size="lg" className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-bold h-12" asChild>
            <a href={t("downloadLinkVip")}>
              <Download className="h-5 w-5" />
              {t("vipCta")}
            </a>
          </Button>
        </div>

        {/* Standard Card */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-[var(--bg-card)] dark:bg-[#111B21] p-8 shadow-sm hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold font-[var(--font-display)] text-[var(--text-primary)] flex items-center gap-2 mb-4">
            <ShieldCheck className="h-6 w-6 text-[var(--text-muted)]" />
            {t("standardTitle")}
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 min-h-[80px]">
            {t("standardDesc")}
          </p>

          <Button size="lg" variant="outline" className="w-full h-12 border-border font-bold text-[var(--text-primary)]" asChild>
            <a href={t("downloadLinkStandard")}>
              <Download className="h-5 w-5" />
              {t("standardCta")}
            </a>
          </Button>
        </div>
      </div>

      {/* Separator Heading for Pricing */}
      <div className="relative my-16 text-center">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[var(--bg-primary)] dark:bg-[#0A0F0D] px-6 text-xl font-bold font-[var(--font-display)] text-[var(--text-primary)]">
            {t("pricingTitle")}
          </span>
        </div>
      </div>

      {/* Pricing component */}
      <div className="rounded-2xl overflow-hidden bg-transparent">
        <Pricing />
      </div>
    </div>
  );
}
