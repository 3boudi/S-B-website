import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EcomShymssOfferView from "@/components/sections/EcomShymssOfferView";
import { OFFER_CONTENT, type OfferLocale } from "@/data/ecomShymssOffer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: OfferLocale =
    locale === "fr" || locale === "en" ? locale : "ar";
  const content = OFFER_CONTENT[loc];

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default async function EcomShymssOfferPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className="print:hidden">
        <Navbar />
      </div>
      <main className="relative min-h-screen pt-24 sm:pt-28 pb-16 z-10 print:pt-4 print:pb-4">
        <EcomShymssOfferView />
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}
