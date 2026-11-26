"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  decodePairingCode,
  normalizeDigits,
  normalizeManualUrl,
} from "@/lib/tvPairingCodec";

type Lang = "ar" | "fr" | "en";

const COPY: Record<
  Lang,
  {
    dir: "rtl" | "ltr";
    title: string;
    subtitle: string;
    enterCode: string;
    connectBtn: string;
    connectingTo: string;
    cancelRedirect: string;
    invalidCode: string;
    bookmarkTip: string;
    sameWifiNote: string;
    tryLocalBtn: string;
    manualToggle: string;
    manualPlaceholder: string;
    manualConnect: string;
    manualInvalid: string;
    clear: string;
  }
> = {
  ar: {
    dir: "rtl",
    title: "ربط شاشة طابور الانتظار",
    subtitle: "أدخل الكود المكون من 4 أرقام الظاهر في برنامج Salon DZ Tech على الكمبيوتر",
    enterCode: "كود الربط (4 أرقام)",
    connectBtn: "فتح شاشة الطابور الآن",
    connectingTo: "جاري التحويل إلى شاشة الصالون...",
    cancelRedirect: "إلغاء",
    invalidCode: "الكود غير صحيح. تأكد من الأرقام الأربعة الظاهرة في البرنامج على الكمبيوتر.",
    bookmarkTip: "نصيحة: بعد فتح شاشة الطابور، احفظها في المفضلة (Bookmark) لتفتحها يومياً بضغطة واحدة.",
    sameWifiNote: "تأكد أن التلفاز والكمبيوتر متصلان بنفس شبكة Wi-Fi في الصالون.",
    tryLocalBtn: "فتح مباشر عبر salontv.local",
    manualToggle: "إدخال عنوان IP يدوياً (خيار متقدم)",
    manualPlaceholder: "مثال: 192.168.1.20 أو 192.168.1.20:4747",
    manualConnect: "اتصال",
    manualInvalid: "أدخل عنوان شبكة محلية صحيح مثل 192.168.1.20",
    clear: "مسح",
  },
  fr: {
    dir: "ltr",
    title: "Connecter l'Écran File d'Attente",
    subtitle: "Saisissez le code à 4 chiffres affiché dans Salon DZ Tech sur votre PC",
    enterCode: "Code de connexion (4 chiffres)",
    connectBtn: "Ouvrir l'écran file d'attente",
    connectingTo: "Redirection vers l'écran du salon...",
    cancelRedirect: "Annuler",
    invalidCode: "Code invalide. Vérifiez les 4 chiffres affichés sur votre ordinateur.",
    bookmarkTip: "Astuce : Une fois ouvert, ajoutez l'écran aux Favoris de la TV pour l'ouvrir en 1 clic.",
    sameWifiNote: "Assurez-vous que la TV et le PC sont sur le même réseau Wi-Fi.",
    tryLocalBtn: "Ouvrir via salontv.local",
    manualToggle: "Saisir une adresse IP locale manuellement",
    manualPlaceholder: "ex : 192.168.1.20 ou 192.168.1.20:4747",
    manualConnect: "Connecter",
    manualInvalid: "Saisissez une adresse locale valide (ex : 192.168.1.20)",
    clear: "Effacer",
  },
  en: {
    dir: "ltr",
    title: "Connect Lounge Queue TV",
    subtitle: "Enter the 4-digit code shown in Salon DZ Tech on your salon computer",
    enterCode: "4-Digit Pairing Code",
    connectBtn: "Open Queue Display",
    connectingTo: "Redirecting to your salon screen...",
    cancelRedirect: "Cancel",
    invalidCode: "Invalid code. Check the 4 digits shown in the Salon DZ Tech desktop app.",
    bookmarkTip: "Tip: Once connected, bookmark the page on your TV for 1-click daily launch.",
    sameWifiNote: "Make sure this TV and your salon PC are on the same Wi-Fi network.",
    tryLocalBtn: "Direct open via salontv.local",
    manualToggle: "Enter local IP address manually",
    manualPlaceholder: "e.g. 192.168.1.20 or 192.168.1.20:4747",
    manualConnect: "Connect",
    manualInvalid: "Please enter a valid local network IP (e.g. 192.168.1.20)",
    clear: "Clear",
  },
};

export default function TvConnectPage() {
  const [lang, setLang] = useState<Lang>("ar");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [showManual, setShowManual] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [manualError, setManualError] = useState("");
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const t = COPY[lang];

  const cancelPendingRedirect = useCallback(() => {
    if (redirectTimerRef.current) {
      clearTimeout(redirectTimerRef.current);
      redirectTimerRef.current = null;
    }
    setRedirectUrl(null);
  }, []);

  const triggerConnect = useCallback(
    (rawCode: string, immediate = false) => {
      cancelPendingRedirect();
      const decoded = decodePairingCode(rawCode);
      if (!decoded) {
        setError(COPY[lang].invalidCode);
        return;
      }
      setError("");
      setRedirectUrl(decoded.url);
      if (immediate) {
        window.location.href = decoded.url;
        return;
      }
      redirectTimerRef.current = setTimeout(() => {
        window.location.href = decoded.url;
      }, 750);
    },
    [cancelPendingRedirect, lang]
  );

  const appendDigit = useCallback(
    (digit: string) => {
      setError("");
      setCode((prev) => {
        if (prev.length >= 4) return prev;
        const next = prev + digit;
        if (next.length === 4) {
          setTimeout(() => triggerConnect(next, false), 0);
        }
        return next;
      });
    },
    [triggerConnect]
  );

  const backspace = useCallback(() => {
    cancelPendingRedirect();
    setError("");
    setCode((prev) => prev.slice(0, -1));
  }, [cancelPendingRedirect]);

  const clearCode = useCallback(() => {
    cancelPendingRedirect();
    setError("");
    setCode("");
  }, [cancelPendingRedirect]);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
    };
  }, []);

  // Support physical keyboards & Smart TV remote number keys directly
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }
      const norm = normalizeDigits(e.key);
      if (norm.length === 1) {
        e.preventDefault();
        appendDigit(norm);
      } else if (e.key === "Backspace") {
        e.preventDefault();
        backspace();
      } else if (e.key === "Escape") {
        e.preventDefault();
        clearCode();
      } else if (e.key === "Enter" && code.length === 4) {
        e.preventDefault();
        triggerConnect(code, true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [appendDigit, backspace, clearCode, code, triggerConnect]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const safeUrl = normalizeManualUrl(manualInput);
    if (!safeUrl) {
      setManualError(t.manualInvalid);
      return;
    }
    setManualError("");
    window.location.href = safeUrl;
  };

  const keypadRows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

  return (
    <main
      dir={t.dir}
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-6 sm:py-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50"
    >
      <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl">
        {/* Top Bar: Brand + Language Switcher */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-xl">
              TV
            </div>
            <div>
              <div className="font-extrabold text-lg tracking-tight text-white">
                Salon DZ Tech
              </div>
              <div className="text-xs font-semibold text-emerald-400">
                salondz.tech/tv
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-slate-800/80 p-1 border border-slate-700">
            {(["ar", "fr", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  lang === l
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {l === "ar" ? "عربي" : l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 4-Digit Code Display Boxes */}
        <div className="mb-4">
          <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            {t.enterCode}
          </div>
          <div dir="ltr" className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
            {[0, 1, 2, 3].map((idx) => {
              const ch = code[idx] || "";
              const isCurrent = idx === code.length;
              return (
                <div
                  key={idx}
                  className={`h-16 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-3xl sm:text-4xl font-black transition ${
                    ch
                      ? "border-emerald-400 bg-emerald-500/15 text-emerald-300"
                      : isCurrent
                      ? "border-emerald-500/70 bg-slate-800 text-slate-400"
                      : "border-slate-700 bg-slate-800/60 text-slate-500"
                  }`}
                >
                  {ch || "•"}
                </div>
              );
            })}
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-4 rounded-2xl border border-rose-500/40 bg-rose-500/15 px-4 py-3 text-center text-sm font-bold text-rose-200">
            {error}
          </div>
        )}

        {/* Redirecting Confirmation Banner */}
        {redirectUrl && (
          <div className="mb-4 rounded-2xl border border-emerald-500/50 bg-emerald-500/15 p-4 text-center">
            <div className="text-sm font-bold text-emerald-300 mb-1">
              {t.connectingTo}
            </div>
            <div
              dir="ltr"
              className="font-mono text-base font-black text-white mb-3 break-all"
            >
              {redirectUrl}
            </div>
            <div className="flex items-center justify-center gap-3">
              <a
                href={redirectUrl}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm focus:outline-none focus:ring-4 focus:ring-emerald-300"
              >
                {t.connectBtn}
              </a>
              <button
                type="button"
                onClick={cancelPendingRedirect}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                {t.cancelRedirect}
              </button>
            </div>
          </div>
        )}

        {/* TV-Remote Friendly Numeric Keypad */}
        <div dir="ltr" className="max-w-sm mx-auto grid grid-cols-3 gap-2.5 mb-5">
          {keypadRows.flat().map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => appendDigit(digit)}
              className="h-14 sm:h-16 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 text-2xl font-black text-white transition focus:outline-none focus:ring-4 focus:ring-emerald-400"
            >
              {digit}
            </button>
          ))}

          <button
            type="button"
            onClick={clearCode}
            className="h-14 sm:h-16 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-sm font-bold text-slate-300 transition focus:outline-none focus:ring-4 focus:ring-emerald-400"
          >
            {t.clear}
          </button>

          <button
            type="button"
            onClick={() => appendDigit("0")}
            className="h-14 sm:h-16 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 text-2xl font-black text-white transition focus:outline-none focus:ring-4 focus:ring-emerald-400"
          >
            0
          </button>

          <button
            type="button"
            onClick={backspace}
            aria-label="Backspace"
            className="h-14 sm:h-16 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xl font-black text-slate-200 transition focus:outline-none focus:ring-4 focus:ring-emerald-400"
          >
            ⌫
          </button>
        </div>

        {/* Primary Connect Button */}
        <button
          type="button"
          disabled={code.length !== 4}
          onClick={() => triggerConnect(code, true)}
          className="w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-black text-lg transition focus:outline-none focus:ring-4 focus:ring-emerald-300 mb-5"
        >
          {t.connectBtn}
        </button>

        {/* Secondary Options: salontv.local & Manual IP */}
        <div className="border-t border-slate-800 pt-4 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="http://salontv.local"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs sm:text-sm font-bold text-slate-200 transition focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {t.tryLocalBtn}
            </a>
            <button
              type="button"
              onClick={() => setShowManual((p) => !p)}
              className="px-4 py-2.5 rounded-xl bg-transparent hover:bg-slate-800 border border-slate-800 text-xs sm:text-sm font-semibold text-slate-400 hover:text-slate-200 transition focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {t.manualToggle}
            </button>
          </div>

          {showManual && (
            <form
              onSubmit={handleManualSubmit}
              className="rounded-2xl bg-slate-950/70 border border-slate-800 p-3.5 space-y-2"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  dir="ltr"
                  value={manualInput}
                  onChange={(e) => {
                    setManualInput(e.target.value);
                    setManualError("");
                  }}
                  placeholder={t.manualPlaceholder}
                  className="flex-1 rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-sm font-mono text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  {t.manualConnect}
                </button>
              </div>
              {manualError && (
                <div className="text-xs font-semibold text-rose-300">
                  {manualError}
                </div>
              )}
            </form>
          )}

          {/* Helpful Tips */}
          <div className="rounded-2xl bg-slate-800/40 border border-slate-800/80 px-4 py-3 text-xs text-slate-400 space-y-1.5 leading-relaxed">
            <div>⭐ {t.bookmarkTip}</div>
            <div>📶 {t.sameWifiNote}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
