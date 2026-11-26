"use client";
// Design intent: Site footer with compact 2-column mobile links grid, 40px+ touch targets,
// full AR/FR/EN localization, and bottom thumb-dock safe-area clearance.

import { useTranslations } from "next-intl";
import Image from "next/image";
import { MessageSquare, Camera } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { Link, usePathname } from "@/i18n/routing";
import { FaYoutube, FaTiktok } from "react-icons/fa";

const FOOTER_NAV = [
  { key: "features", href: "#features" },
  { key: "pricing", href: "#pricing" },
  { key: "downloadPage", href: "download" },
  { key: "guide", href: "guide" },
  { key: "tutorials", href: "tutorials" },
] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-black/[0.06] dark:border-white/[0.08] bg-background/85 backdrop-blur-xl scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 md:px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {/* Brand Column (Full Width on Mobile) */}
          <div className="col-span-2 lg:col-span-1 space-y-3 text-start">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="salondztech logo"
                width={38}
                height={38}
                className="rounded-xl shadow-sm"
              />
              <span className="text-xl font-bold font-[var(--font-display)]">
                salondztech
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {t("tagline")}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="text-start">
            <h3 className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
              {t("links.title")}
            </h3>
            <ul className="space-y-0.5">
              {FOOTER_NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${item.href}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="inline-flex items-center min-h-[40px] py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    {t(`links.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="text-start">
            <h3 className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
              {t("contact.title")}
            </h3>
            <ul className="space-y-0.5">
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 min-h-[40px] py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4 shrink-0" />
                  <span>{t("contact.facebook")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 min-h-[40px] py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm cursor-pointer"
                >
                  <Camera className="h-4 w-4 shrink-0" />
                  <span>{t("contact.instagram")}</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@SalonDZtech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 min-h-[40px] py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm cursor-pointer"
                >
                  <FaYoutube className="h-4 w-4 shrink-0 text-[#FF0000]" />
                  <span>{t("contact.youtube")}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@salondztech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 min-h-[40px] py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm cursor-pointer"
                >
                  <FaTiktok className="h-4 w-4 shrink-0 text-[#000000] dark:text-[#FFFFFF]" />
                  <span>{t("contact.tiktok")}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Language & Theme Column (Full Width row on mobile) */}
          <div className="col-span-2 lg:col-span-1 flex flex-row lg:flex-col items-center lg:items-start justify-between gap-3 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] lg:pt-0 lg:border-t-0">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground lg:mb-3">
              {t("settingsTitle")}
            </h3>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar (clears Floating Mobile Bottom Dock cleanly on < md) */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 pt-4 pb-24 md:pb-5 sm:flex-row md:px-6">
          <p className="text-xs text-muted-foreground text-center sm:text-start">
            {t("copyright")}
          </p>
          <Link
            href="/privacy"
            className="inline-flex items-center min-h-[36px] text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            {t("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
