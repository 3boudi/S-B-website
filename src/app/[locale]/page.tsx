import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";

// Code-split below-the-fold sections while preserving full SSR HTML for SEO & zero CLS
const Dashboard = dynamic(() => import("@/components/sections/Dashboard"), { ssr: true });
const Features = dynamic(() => import("@/components/sections/Features"), { ssr: true });
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"), { ssr: true });
const Pricing = dynamic(() => import("@/components/sections/Pricing"), { ssr: true });
const FAQ = dynamic(() => import("@/components/sections/FAQ"), { ssr: true });
const CTA = dynamic(() => import("@/components/sections/CTA"), { ssr: true });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });
const MobileBottomDock = dynamic(
  () => import("@/components/layout/MobileBottomDock"),
  { ssr: true }
);
const DemoButton = dynamic(() => import("@/components/ui/DemoButton"), { ssr: true });

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Dashboard />
        <div className="cv-auto">
          <Features />
        </div>
        <div className="cv-auto">
          <HowItWorks />
        </div>
        <div className="cv-auto">
          <Pricing />
        </div>
        <div className="cv-auto">
          <FAQ />
        </div>
        <div className="cv-auto">
          <CTA />
        </div>
      </main>
      <div className="cv-auto">
        <Footer />
      </div>
      <MobileBottomDock />
      <DemoButton />
    </>
  );
}
