"use client";
// Design intent: Global modal for purchase flow, triggered from any "Buy Now" button.
// Uses React context to allow opening from any component without prop drilling.
// Supports custom pre-filled messaging based on the selected pricing plan.
// Accessibility: Dialog is keyboard-accessible, focus is trapped inside when open, Escape closes.

import React, { createContext, useContext, useState, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FaWhatsapp, FaFacebook, FaInstagram, FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { X, Zap } from "lucide-react";

interface BuyModalContextValue {
  open: boolean;
  openModal: (plan?: string, customMessage?: string) => void;
  closeModal: () => void;
}

const BuyModalContext = createContext<BuyModalContextValue | undefined>(undefined);

export function useBuyModal() {
  const context = useContext(BuyModalContext);
  if (!context) {
    throw new Error("useBuyModal must be used within BuyModalProvider");
  }
  return context;
}

export function BuyModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState<string | null>(null);

  const openModal = useCallback((plan?: string, messageOverride?: string) => {
    setSelectedPlan(plan || null);
    setCustomMessage(messageOverride || null);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedPlan(null);
    setCustomMessage(null);
    setOpen(false);
  }, []);

  return (
    <BuyModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
      <BuyModalDialog
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (!nextOpen) {
            setCustomMessage(null);
          }
        }}
        selectedPlan={selectedPlan}
        customMessage={customMessage}
      />
    </BuyModalContext.Provider>
  );
}

function BuyModalDialog({
  open,
  onOpenChange,
  selectedPlan,
  customMessage,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan: string | null;
  customMessage: string | null;
}) {
  const t = useTranslations("buyModal");
  const locale = useLocale();

  // Create custom pre-filled message based on selected locale and plan (or explicit custom project message)
  let message = "";
  if (customMessage) {
    message = customMessage;
  } else if (locale === "ar") {
    message = selectedPlan
      ? `مرحباً! أنا مهتم بشراء برنامج صالون الحلاقة: ${selectedPlan}`
      : "مرحباً! أنا مهتم بشراء رخصة برنامج صالون الحلاقة (salondztech)";
  } else if (locale === "fr") {
    message = selectedPlan
      ? `Bonjour ! Je suis intéressé par l'achat de l'application Coiffeur : ${selectedPlan}`
      : "Bonjour ! Je suis intéressé par l'achat de la licence Coiffeur (salondztech)";
  } else {
    message = selectedPlan
      ? `Hello! I am interested in buying the Coiffeur app license: ${selectedPlan}`
      : "Hello! I am interested in buying the Coiffeur app license (salondztech)";
  }

  const whatsappUrl = `https://wa.me/213782549228?text=${encodeURIComponent(message)}`;
  const instagramUrl = "https://www.instagram.com/salontech.dz/";
  const facebookUrl = "https://www.facebook.com/profile.php?id=61589216799202";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed z-50 inset-x-0 bottom-0 top-auto sm:inset-auto sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] w-full sm:max-w-lg max-h-[90dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl apple-glass-prominent border-t sm:border border-black/[0.08] dark:border-white/[0.12] px-5 pt-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:p-8 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          {/* Mobile Native Sheet Drag Handle */}
          <div
            aria-hidden="true"
            className="sm:hidden mx-auto mb-3 h-1.5 w-11 rounded-full bg-black/15 dark:bg-white/20"
          />

          <Dialog.Close className="absolute end-3.5 top-3.5 sm:end-4 sm:top-4 inline-flex h-11 w-11 items-center justify-center rounded-full opacity-75 transition-all hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Dialog.Close>

          <div className="text-center mb-5 sm:mb-6 pt-1 sm:pt-0 px-8 sm:px-0">
            <Dialog.Title className="text-xl sm:text-2xl font-bold tracking-tight font-[var(--font-display)] text-foreground">
              {t("title")}
            </Dialog.Title>
            <Dialog.Description className="mt-1.5 sm:mt-2 text-muted-foreground text-xs sm:text-sm leading-relaxed">
              {t("subtitle")}
            </Dialog.Description>
            {selectedPlan && (
              <div className="mt-2.5 inline-flex items-center rounded-full bg-brand-green/10 px-3.5 py-1 text-xs font-semibold text-brand-green border border-brand-green/20 max-w-full">
                <span className="truncate">{selectedPlan}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 mb-5 sm:mb-6">
            {/* WhatsApp Card */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group apple-press flex flex-row sm:flex-col items-center justify-start sm:justify-center text-start sm:text-center gap-3.5 sm:gap-2.5 min-h-[58px] rounded-2xl bg-[#25D366] px-4 py-3 sm:p-4 text-white shadow-md shadow-[#25D366]/20 cursor-pointer"
            >
              <FaWhatsapp className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 transition-transform duration-200 group-hover:scale-105" />
              <div className="flex flex-col sm:items-center min-w-0">
                <span className="text-sm sm:text-xs font-bold leading-tight">{t("whatsapp")}</span>
                <span className="text-[11px] sm:text-[10px] text-white/85 leading-tight mt-0.5">{t("chatDescription")}</span>
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group apple-press flex flex-row sm:flex-col items-center justify-start sm:justify-center text-start sm:text-center gap-3.5 sm:gap-2.5 min-h-[58px] rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 px-4 py-3 sm:p-4 text-white shadow-md shadow-pink-500/20 cursor-pointer"
            >
              <FaInstagram className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 transition-transform duration-200 group-hover:scale-105" />
              <div className="flex flex-col sm:items-center min-w-0">
                <span className="text-sm sm:text-xs font-bold leading-tight">{t("instagram")}</span>
                <span className="text-[11px] sm:text-[10px] text-white/85 leading-tight mt-0.5">{t("chatDescription")}</span>
              </div>
            </a>

            {/* Facebook Card */}
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group apple-press flex flex-row sm:flex-col items-center justify-start sm:justify-center text-start sm:text-center gap-3.5 sm:gap-2.5 min-h-[58px] rounded-2xl bg-[#1877F2] px-4 py-3 sm:p-4 text-white shadow-md shadow-[#1877F2]/20 cursor-pointer"
            >
              <FaFacebook className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 transition-transform duration-200 group-hover:scale-105" />
              <div className="flex flex-col sm:items-center min-w-0">
                <span className="text-sm sm:text-xs font-bold leading-tight">{t("facebook")}</span>
                <span className="text-[11px] sm:text-[10px] text-white/85 leading-tight mt-0.5">{t("chatDescription")}</span>
              </div>
            </a>
          </div>

          {/* Payment Methods Section */}
          <div className="border-t border-black/[0.06] dark:border-white/[0.08] pt-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 text-center">
              {locale === "ar" ? "طرق الدفع المتوفرة للطلب" : locale === "fr" ? "Modes de paiement disponibles" : "Available Payment Methods"}
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl apple-card">
                <span className="text-[10px] font-medium text-muted-foreground uppercase mb-1.5">
                  {locale === "ar" ? "محلي (الجزائر)" : locale === "fr" ? "Local (Algérie)" : "Local (Algeria)"}
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=ru.bpc.mobilebank.bpc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform duration-200 hover:scale-105 cursor-pointer"
                    title="BaridiMob Play Store"
                  >
                    <Image src="/baridimob.png" alt="BaridiMob" width={24} height={24} className="h-6 w-6 object-contain" />
                  </a>
                  <a
                    href="https://en.wikipedia.org/wiki/Alg%C3%A9rie_Poste"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform duration-200 hover:scale-105 cursor-pointer"
                    title="Algérie Poste CCP"
                  >
                    <Image src="/ccp.svg" alt="CCP" width={20} height={24} className="h-6 w-auto object-contain" />
                  </a>
                </div>
                <span className="text-[11px] font-semibold text-foreground mt-1.5">BaridiMob / CCP</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl apple-card">
                <span className="text-[10px] font-medium text-muted-foreground uppercase mb-1.5">
                  {locale === "ar" ? "دولي" : locale === "fr" ? "International" : "International"}
                </span>
                <div className="flex items-center gap-2">
                  <FaCcVisa className="h-5 w-7 text-[#151D8F] dark:text-white" />
                  <FaCcMastercard className="h-5 w-7 text-[#EB001B]" />
                </div>
                <span className="text-[11px] font-semibold text-foreground mt-1.5">Visa / Mastercard</span>
              </div>
            </div>

            <div className="text-center bg-brand-green/10 border border-brand-green/20 rounded-2xl p-3">
              <p className="text-xs font-bold text-brand-green flex items-center justify-center gap-1.5">
                <Zap className="h-3.5 w-3.5 fill-current shrink-0" />
                <span>
                  {customMessage
                    ? locale === "ar"
                      ? "تواصل معنا لنناقش رؤية مشروعك ونعدّ لك عرضاً تفصيلياً مجاناً"
                      : locale === "fr"
                        ? "Contactez-nous pour discuter de votre projet et recevoir votre devis détaillé"
                        : "Message us to discuss your vision and receive a tailored project quote"
                    : locale === "ar"
                      ? "تدفع نرسلك كود التفعيل مباشرة"
                      : locale === "fr"
                        ? "Payez, nous vous envoyons le code d'activation immédiatement"
                        : "Pay, we send you the activation code instantly"}
                </span>
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
