import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://salonalgeria.netlify.app"),
  title: "Salon Tech DZ | Logiciel Salon de Coiffure Algérie | برنامج تسيير صالون حلاقة",
  description:
    "Salon Tech DZ is the ultimate offline software for barbershops in Algeria. لوجيسيال سالون كوافار, gestion salon dz, appointments, POS, sans internet. Logicel ta3 salon coiffer.",
  keywords: [
    // Official Arabic
    "برنامج تسيير صالون حلاقة الجزائر",
    "نظام إدارة صالونات التجميل",
    "برنامج نقاط البيع للحلاقين",
    // Algerian Arabic (Darija)
    "لوجيسيال سالون كوافار",
    "سيستام تاع حفاف",
    "برنامج كاسيطة للحلاق",
    "تطبيق تسيير الحوانت",
    // Official French
    "Logiciel de gestion pour salon de coiffure Algérie",
    "système POS coiffeur",
    "application salon de beauté dz",
    "logiciel de caisse algerie",
    // Franco-Arabic (Derja Typed in Latin)
    "logicel ta3 salon coiffer",
    "logisiel coiffure dz",
    "system ta3 7afaf",
    "gestion salon dz",
    "application ta3 coiffeur"
  ],
  authors: [{ name: "Salon Tech DZ" }],
  creator: "Salon Tech DZ",
  publisher: "Salon Tech DZ",
  openGraph: {
    title: "Salon Tech DZ | Logiciel Salon de Coiffure Algérie",
    description: "لوجيسيال سالون كوافار يخدم 100% أوفلاين. Logiciel de gestion pour salon de coiffure en Algérie. Gagnez du temps et gérez votre salon comme un pro.",
    siteName: "Salon Tech DZ",
    images: [
      {
        url: "/dashboard.png",
        width: 1200,
        height: 630,
        alt: "Salon Tech DZ Salon Management Dashboard Preview",
      },
    ],
    locale: "fr_DZ",
    alternateLocale: ["ar_DZ", "en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salon Tech DZ | Logiciel Salon Coiffure Algérie",
    description: "لوجيسيال سالون كوافار يخدم 100% أوفلاين. Logiciel de gestion pour salon de coiffure en Algérie.",
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
