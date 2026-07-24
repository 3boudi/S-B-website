import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GuidePdfViewer from "@/components/sections/GuidePdfViewer";

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-[var(--bg-primary)] dark:bg-[#0A0F0D]">
        <GuidePdfViewer />
      </main>
      <Footer />
    </>
  );
}
