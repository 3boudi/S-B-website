import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Note: we fetch translations on the server if needed, or use a client component.
  // We will make a client component for the contact cards so we can use useTranslations
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}

// Extracting to a separate component to use translations easily
import ContactContent from "@/components/sections/ContactContent";
