import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import { BuyModalProvider } from "@/components/ui/BuyModal";
import BarberBackground from "@/components/ui/BarberBackground";
import { routing } from "@/i18n/routing";
import Script from "next/script";
import { Inter, DM_Sans, Noto_Kufi_Arabic } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-kufi",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const isRTL = locale === "ar";

  // Software Application Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "salondztech",
    "operatingSystem": "Windows 10, Windows 11",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "DZD",
      "lowPrice": "19000",
      "highPrice": "35000",
      "offerCount": "3"
    },
    "description": locale === "ar"
      ? "salondztech هو نظام إدارة محلي للحلاقين وصالونات التجميل. يعمل أوفلاين للتسيير اليومي والكاش والمخزون، ويحتاج للإنترنت فقط لتفعيل الرخصة والواتساب."
      : locale === "fr"
      ? "salondztech est un système de gestion locale pour les salons de coiffure et d'esthétique. Il fonctionne hors ligne pour l'encaissement et la gestion quotidienne, et requiert internet uniquement pour l'activation et les notifications WhatsApp."
      : "salondztech is a local management system for barbershops and beauty salons. It runs offline for daily POS, appointments, and inventory, and only requires internet for application activation and WhatsApp notifications.",
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61589216799202",
      "https://www.instagram.com/salontech.dz/",
      "https://www.tiktok.com/@salondztech",
      "https://www.youtube.com/@SalonDZtech"
    ]
  };

  // FAQ Page Schema
  const faqData = (messages as any).faq?.items || [];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item: any) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${dmSans.variable} ${notoKufiArabic.variable}`}
    >
      <body className="min-h-screen bg-transparent text-foreground antialiased">
        <Script id="theme-loader" strategy="beforeInteractive">
          {`(function(){try{var s=localStorage.getItem('theme');if(s==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`}
        </Script>
        <Script id="remove-netlify-badge" strategy="afterInteractive">
          {`(function(){function r(){var s=['iframe[src*="netlify"]','iframe[id*="netlify"]','iframe[title*="Netlify" i]','div[id*="netlify"]','div[class*="netlify"]','[data-netlify-badge]','.netlify-badge','netlify-drawer','#netlify-badge'];s.forEach(function(sel){document.querySelectorAll(sel).forEach(function(el){el.remove()})})}r();if(typeof MutationObserver!=='undefined'){new MutationObserver(r).observe(document.documentElement,{childList:true,subtree:true})}})()`}
        </Script>

        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <ThemeProvider>
          <BarberBackground />
          <NextIntlClientProvider messages={messages}>
            <BuyModalProvider>{children}</BuyModalProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

