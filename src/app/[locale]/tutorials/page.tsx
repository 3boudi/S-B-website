import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Video, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

export default async function TutorialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col justify-center items-center pt-24 bg-[var(--bg-primary)] dark:bg-[#0A0F0D]">
        <TutorialsContent />
      </main>
      <Footer />
    </>
  );
}

function TutorialsContent() {
  const t = useTranslations("tutorialsPage");

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <div className="rounded-3xl border border-border bg-[var(--bg-card)] dark:bg-[#111B21] p-10 shadow-lg relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-brand-green/10 blur-3xl" />
        
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green">
          <Video className="h-8 w-8" />
        </div>
        
        <span className="mb-3 inline-block rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
          {t("comingSoon")}
        </span>
        
        <h1 className="text-3xl font-bold font-[var(--font-display)] text-[var(--text-primary)] mb-4">
          {t("title")}
        </h1>
        
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
          {t("desc")}
        </p>
        
        <Button className="font-bold flex items-center justify-center gap-2 mx-auto" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("backHome")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
