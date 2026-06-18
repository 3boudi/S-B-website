"use client";
// Design intent: Language switcher dropdown for en/fr/ar locale selection.
// States: default, hover, focus-visible, open (dropdown visible).
// Accessibility: keyboard navigation through dropdown items, focus-visible ring.

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    router.replace(pathname, { locale: code as "en" | "fr" | "ar" });
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, code: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(code);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-accent active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        aria-label="Change language"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4" />
        <span>{locale.toUpperCase()}</span>
      </button>

      {open && (
        <div
          className="absolute start-0 md:start-auto md:end-0 mt-2 w-36 rounded-lg border border-border bg-popover p-1 shadow-lg z-50"
          role="listbox"
          aria-label="Language options"
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={locale === l.code}
              onClick={() => handleSelect(l.code)}
              onKeyDown={(e) => handleKeyDown(e, l.code)}
              className={`flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                locale === l.code
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-popover-foreground"
              }`}
            >
              {l.label === "AR" ? "العربية" : l.label === "FR" ? "Français" : "English"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
