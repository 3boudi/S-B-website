import { setRequestLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TutorialsPlaylistViewer from "@/components/sections/TutorialsPlaylistViewer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tutorialsPage" });

  return {
    title: `${t("title")} | salondztech`,
    description: t("desc"),
    openGraph: {
      title: `${t("title")} | salondztech`,
      description: t("desc"),
      images: [
        {
          url: "https://img.youtube.com/vi/2aAGp-V9TII/hqdefault.jpg",
          width: 1280,
          height: 720,
          alt: t("title"),
        },
      ],
    },
  };
}

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
      <main className="relative min-h-screen pt-20 sm:pt-24 pb-20 z-10">
        <TutorialsPlaylistViewer locale={locale} />
      </main>
      <Footer />
    </>
  );
}

