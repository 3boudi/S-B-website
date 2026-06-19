"use client";
// Design intent: Sticky navigation bar with transparent-to-blurred transition on scroll.
// Tokens: backdrop-blur, border-bottom on scroll, green accent for active states.
// States: transparent (top), scrolled (blur+border), mobile (sheet slide-in).
// Accessibility: all nav links have focus-visible rings, mobile menu is keyboard accessible.

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Menu, X, MonitorPlay, ShoppingCart } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useBuyModal } from "@/components/ui/BuyModal";

const NAV_ITEMS = [
  { key: "features", href: "#features" },
  { key: "howItWorks", href: "#how-it-works" },
  { key: "pricing", href: "#pricing" },
  { key: "faq", href: "#faq" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const { openModal } = useBuyModal();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setMobileOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Allow Link to handle cross-page navigation natively
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
          }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
            <Image src="/logo.png" alt="salondztech logo" width={40} height={40} className="rounded-xl shadow-sm" />
            <span className="text-xl font-bold font-[var(--font-display)]">Salon DZ tech</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={`/${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <a href="https://salonsoftware.netlify.app/" target="_blank" rel="noopener noreferrer">
                <MonitorPlay className="h-4 w-4" />
                {t("tryFree")}
              </a>
            </Button>
            <Button size="sm" onClick={() => openModal()}>
              <ShoppingCart className="h-4 w-4" />
              {t("buy")}
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-background border-l border-border p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-bold font-[var(--font-display)]">salondztech</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  href={`/${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://salonsoftware.netlify.app/" target="_blank" rel="noopener noreferrer">
                  <MonitorPlay className="h-4 w-4" />
                  {t("tryFree")}
                </a>
              </Button>
              <Button className="w-full" onClick={() => { setMobileOpen(false); openModal(); }}>
                <ShoppingCart className="h-4 w-4" />
                {t("buy")}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
