import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salon DZ Tech — TV Queue Display Connect | ربط شاشة التلفاز",
  description:
    "Enter your 4-digit pairing code from Salon DZ Tech desktop app to launch the live salon waiting queue on your Smart TV.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TvLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
