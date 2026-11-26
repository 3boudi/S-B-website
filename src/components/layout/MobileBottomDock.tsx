"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Download, Layers, ShoppingCart, Tag } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { useBuyModal } from "@/components/ui/BuyModal";

/**
 * Ergonomic Apple-Liquid-Glass Mobile Bottom Thumb Dock (md:hidden).
 * Anchors primary actions inside the natural one-hand thumb grip zone,
 * respects iPhone/Android safe-area inset, and hides while BuyModal is open.
 */
export default function MobileBottomDock() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { open, openModal } = useBuyModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > 240);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const showBar = visible && !open;

  return (
    <nav
      aria-label={t("mobileDockAria")}
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 px-3 pt-2 pb-[max(0.65rem,env(safe-area-inset-bottom))] transition-all duration-300 ease-out ${
        showBar
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto max-w-md rounded-2xl apple-glass-prominent border border-black/[0.1] dark:border-white/[0.14] shadow-[0_12px_36px_-8px_rgba(0,0,0,0.22)] p-1.5 grid grid-cols-[1fr_1fr_1fr_1.35fr] items-center gap-1">
        <Link
          href="/#features"
          onClick={(e) => handleAnchorClick(e, "#features")}
          className="flex flex-col items-center justify-center min-h-[46px] rounded-xl text-foreground/75 hover:text-brand-green active:scale-95 transition-all px-1"
        >
          <Layers className="h-4 w-4 mb-0.5 shrink-0" />
          <span className="text-[10px] font-bold leading-none truncate max-w-full">
            {t("features")}
          </span>
        </Link>

        <Link
          href="/#pricing"
          onClick={(e) => handleAnchorClick(e, "#pricing")}
          className="flex flex-col items-center justify-center min-h-[46px] rounded-xl text-foreground/75 hover:text-brand-green active:scale-95 transition-all px-1"
        >
          <Tag className="h-4 w-4 mb-0.5 shrink-0" />
          <span className="text-[10px] font-bold leading-none truncate max-w-full">
            {t("pricing")}
          </span>
        </Link>

        <Link
          href="/download"
          className="flex flex-col items-center justify-center min-h-[46px] rounded-xl text-foreground/75 hover:text-brand-green active:scale-95 transition-all px-1"
        >
          <Download className="h-4 w-4 mb-0.5 shrink-0" />
          <span className="text-[10px] font-bold leading-none truncate max-w-full">
            {t("dockDownload")}
          </span>
        </Link>

        <button
          type="button"
          onClick={() => openModal()}
          className="apple-btn-primary apple-press flex items-center justify-center gap-1.5 min-h-[46px] rounded-xl px-2.5 text-[11px] font-extrabold text-white shadow-md cursor-pointer whitespace-nowrap"
        >
          <ShoppingCart className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{t("dockOrder")}</span>
        </button>
      </div>
    </nav>
  );
}
