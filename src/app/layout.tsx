import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://salondz.tech"),
  title: "salondztech | Premium Barber & Salon Management Software | برنامج تسيير صالون حلاقة وتجميل",
  description:
    "salondztech is the ultimate local software for barbershops and beauty salons. Manage checkouts, staff, loyalty, and inventory offline, with internet needed only for activation and WhatsApp notifications.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  keywords: [
    // International
    "barbershop software",
    "salon management system",
    "barber POS software",
    "beauty salon booking app",
    "offline salon database",
    "logiciel salon de coiffure",
    "logiciel de caisse coiffeur",
    // Official Arabic
    "برنامج تسيير صالون حلاقة وتجميل",
    "نظام إدارة صالونات التجميل",
    "برنامج نقاط البيع للحلاقين",
    // Algerian Arabic (Darija)
    "لوجيسيال سالون كوافار",
    "سيستام تاع حفاف",
    "برنامج كاسيطة للحلاق",
    "تطبيق تسيير الحوانت",
    // Franco-Arabic (Derja Typed in Latin)
    "logicel ta3 salon coiffer",
    "logisiel coiffure dz",
    "system ta3 7afaf",
    "gestion salon dz",
    "application ta3 coiffeur"
  ],
  authors: [{ name: "salondztech" }],
  creator: "salondztech",
  publisher: "salondztech",
  openGraph: {
    title: "salondztech | Premium Barber & Salon Management Software",
    description: "تسيير محلي أوفلاين مع تفعيل ورسائل واتساب عبر الإنترنت. Logiciel de gestion locale pour salon de coiffure et beauté.",
    siteName: "salondztech",
    images: [
      {
        url: "/dashboard.png",
        width: 1200,
        height: 630,
        alt: "salondztech Salon Management Dashboard Preview",
      },
    ],
    locale: "fr_FR",
    alternateLocale: ["ar_DZ", "en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "salondztech | Premium Barber & Salon Management Software",
    description: "تسيير محلي أوفلاين مع تفعيل ورسائل واتساب عبر الإنترنت. Logiciel de gestion locale pour salon de coiffure et beauté.",
    images: ["/dashboard.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "Z9JRD31q7XBLqqJv9fbo9FuLJ6lIlasOMc5aJTS3Eb4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
