"use client";
// Design intent: Sticky navigation bar with transparent-to-blurred transition on scroll.
// Tokens: backdrop-blur, border-bottom on scroll, green accent for active states.
// States: transparent (top), scrolled (blur+border), mobile (sheet slide-in).
// Accessibility: all nav links have focus-visible rings, mobile menu is keyboard accessible.

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Menu, X, MonitorPlay, ShoppingCart, Download } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useBuyModal } from "@/components/ui/BuyModal";

const NAV_ITEMS = [
  { key: "features", href: "#features" },
  { key: "pricing", href: "#pricing" },
  { key: "guide", href: "guide" },
  { key: "tutorials", href: "tutorials" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const { openModal } = useBuyModal();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  // Sync active nav item with route or scroll position
  useEffect(() => {
    if (pathname.includes("guide")) {
      setActiveNav("guide");
      return;
    }
    if (pathname.includes("tutorials")) {
      setActiveNav("tutorials");
      return;
    }

    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (hash === "pricing" || hash === "features") {
        setActiveNav(hash);
      }
    }

    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 250;
      const pricingEl = document.getElementById("pricing");
      const featuresEl = document.getElementById("features");

      if (pricingEl && scrollPos >= pricingEl.offsetTop - 80) {
        setActiveNav("pricing");
      } else if (featuresEl && scrollPos >= featuresEl.offsetTop - 80) {
        setActiveNav("features");
      } else if (window.scrollY < 200) {
        setActiveNav(null);
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

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

  const handleNavClick = (e: React.MouseEvent, key: string, href: string) => {
    setActiveNav(key);
    setMobileOpen(false);
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "apple-glass border-b border-black/[0.06] dark:border-white/[0.08] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl apple-press"
          >
            <Image
              src="/logo.png"
              alt="salondztech logo"
              width={38}
              height={38}
              className="rounded-xl shadow-xs"
            />
            <span className="text-lg font-bold tracking-tight font-[var(--font-display)] text-foreground">
              Salon DZ tech
            </span>
          </Link>

          {/* Desktop Nav: Centered Apple Pill Group */}
          <div className="relative hidden md:flex items-center gap-1 p-1 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.key;
              return (
                <Link
                  key={item.key}
                  href={`/${item.href}`}
                  onClick={(e) => handleNavClick(e, item.key, item.href)}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                    !isActive ? "hover:bg-brand-green/10" : ""
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 apple-btn-primary rounded-full shadow-xs"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors ${
                      isActive
                        ? "text-white font-bold"
                        : "text-slate-700 dark:text-slate-300 group-hover:text-brand-green font-semibold"
                    }`}
                  >
                    {t(item.key)}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Right: Apple Functional Layer */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />

            <Button
              variant="outline"
              size="sm"
              className="rounded-full h-9 px-4 text-xs font-semibold border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-all cursor-pointer apple-press"
              asChild
            >
              <Link href="/download">
                <Download className="h-3.5 w-3.5" />
                {t("download")}
              </Link>
            </Button>

            <button
              onClick={() => openModal()}
              className="apple-btn-primary apple-press rounded-full h-9 px-4 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>{t("buy")}</span>
            </button>
          </div>

          {/* Mobile Hamburger (44pt accessible target) */}
          <button
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Sheet (Apple HIG Compliant Drawer) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="absolute right-0 top-0 h-full w-[85%] max-w-sm apple-glass-prominent border-l border-black/[0.08] dark:border-white/[0.1] p-6 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Image
                    src="/logo.png"
                    alt="salondztech logo"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <span className="text-base font-bold tracking-tight font-[var(--font-display)]">
                    Salon DZ tech
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-black/[0.05] dark:hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeNav === item.key;
                  return (
                    <Link
                      key={item.key}
                      href={`/${item.href}`}
                      onClick={(e) => handleNavClick(e, item.key, item.href)}
                      className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all flex items-center justify-between ${
                        isActive
                          ? "bg-brand-green/15 text-brand-green font-bold border border-brand-green/30"
                          : "text-foreground hover:bg-brand-green/10 hover:text-brand-green"
                      }`}
                    >
                      <span>{t(item.key)}</span>
                      <span className={isActive ? "text-brand-green font-bold text-xs" : "text-muted-foreground text-xs"}>›</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-3">
              <div className="flex items-center justify-between px-1 mb-1">
                <span className="text-xs font-medium text-muted-foreground">Settings</span>
                <div className="flex items-center gap-2">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full h-11 rounded-xl text-sm font-semibold border-black/[0.08] dark:border-white/[0.1]"
                asChild
              >
                <Link href="/download" onClick={() => setMobileOpen(false)}>
                  <Download className="h-4 w-4" />
                  {t("download")}
                </Link>
              </Button>

              <button
                className="apple-btn-primary apple-press w-full h-11 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => {
                  setMobileOpen(false);
                  openModal();
                }}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{t("buy")}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
