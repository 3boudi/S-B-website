"use client";
// Design intent: Site footer with brand, navigation, contact, and language/theme sections.
// 4-column grid desktop, 2-column tablet, 1-column mobile.
// All text from translations. All links have focus-visible rings.

import { useTranslations } from "next-intl";
import Image from "next/image";
import { MessageSquare, Camera, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { Link, usePathname } from "@/i18n/routing";

const FOOTER_NAV = [
  { key: "features", href: "#features" },
  { key: "howItWorks", href: "#how-it-works" },
  { key: "pricing", href: "#pricing" },
  { key: "faq", href: "#faq" },
] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Salon Tech DZ logo" width={40} height={40} className="h-10 w-auto rounded-xl shadow-sm" />
              <span className="text-xl font-bold font-[var(--font-display)]">Salon Tech DZ</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("tagline")}
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href="https://salonsoftware.netlify.app/" target="_blank" rel="noopener noreferrer">
                <MonitorPlay className="h-4 w-4" />
                {t("tryFree")}
              </a>
            </Button>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("links.title")}
            </h3>
            <ul className="space-y-2">
              {FOOTER_NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${item.href}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    {t(`links.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("contact.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4" />
                  {t("contact.facebook")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm cursor-pointer"
                >
                  <Camera className="h-4 w-4" />
                  {t("contact.instagram")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Language & Theme Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Settings
            </h3>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 sm:flex-row md:px-6">
          <p className="text-xs text-muted-foreground">{t("copyright")}</p>
          <a
            href="https://salonsoftware.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            {t("tryFree")}
          </a>
        </div>
      </div>
    </footer>
  );
}
