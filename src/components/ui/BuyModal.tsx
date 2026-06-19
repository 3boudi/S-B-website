"use client";
// Design intent: Global modal for purchase flow, triggered from any "Buy Now" button.
// Uses React context to allow opening from any component without prop drilling.
// Supports custom pre-filled messaging based on the selected pricing plan.
// Accessibility: Dialog is keyboard-accessible, focus is trapped inside when open, Escape closes.

import React, { createContext, useContext, useState, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations, useLocale } from "next-intl";
import { FaWhatsapp, FaFacebook, FaInstagram, FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { X, Zap } from "lucide-react";

interface BuyModalContextValue {
  open: boolean;
  openModal: (plan?: string) => void;
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

  const openModal = useCallback((plan?: string) => {
    setSelectedPlan(plan || null);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedPlan(null);
    setOpen(false);
  }, []);

  return (
    <BuyModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
      <BuyModalDialog open={open} onOpenChange={setOpen} selectedPlan={selectedPlan} />
    </BuyModalContext.Provider>
  );
}

function BuyModalDialog({
  open,
  onOpenChange,
  selectedPlan,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan: string | null;
}) {
  const t = useTranslations("buyModal");
  const locale = useLocale();

  // Create custom pre-filled message based on selected locale and plan
  let message = "";
  if (locale === "ar") {
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
  const facebookUrl = "https://www.facebook.com/share/1FuxcTwdHM/";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-2xl border border-border bg-background p-6 shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Dialog.Close>

          <div className="text-center mb-6">
            <Dialog.Title className="text-2xl font-bold font-[var(--font-display)]">
              {t("title")}
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-muted-foreground text-sm">
              {t("subtitle")}
            </Dialog.Description>
            {selectedPlan && (
              <div className="mt-3 inline-flex items-center rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green ring-1 ring-brand-green/20">
                {selectedPlan}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {/* WhatsApp Card */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center text-center gap-3 rounded-xl bg-[#25D366] p-4 text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-lg hover:shadow-[#25D366]/20 cursor-pointer animate-pulse-subtle"
            >
              <FaWhatsapp className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm font-bold leading-tight">{t("whatsapp")}</span>
              <span className="text-[10px] text-white/80">{t("chatDescription")}</span>
            </a>

            {/* Instagram Card */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center text-center gap-3 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-4 text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-lg hover:shadow-pink-500/20 cursor-pointer"
            >
              <FaInstagram className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm font-bold leading-tight">{t("instagram")}</span>
              <span className="text-[10px] text-white/80">{t("chatDescription")}</span>
            </a>

            {/* Facebook Card */}
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center text-center gap-3 rounded-xl bg-[#1877F2] p-4 text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-lg hover:shadow-[#1877F2]/20 cursor-pointer"
            >
              <FaFacebook className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm font-bold leading-tight">{t("facebook")}</span>
              <span className="text-[10px] text-white/80">{t("chatDescription")}</span>
            </a>
          </div>

          {/* Payment Methods Section */}
          <div className="border-t border-border pt-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 text-center">
              {locale === "ar" ? "طرق الدفع المتوفرة للطلب" : locale === "fr" ? "Modes de paiement disponibles" : "Available Payment Methods"}
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-border bg-accent/20">
                <span className="text-[9px] font-bold text-muted-foreground uppercase mb-1.5">
                  {locale === "ar" ? "محلي (الجزائر)" : locale === "fr" ? "Local (Algérie)" : "Local (Algeria)"}
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=ru.bpc.mobilebank.bpc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform duration-200 hover:scale-110 cursor-pointer"
                    title="BaridiMob Play Store"
                  >
                    <img src="/baridimob.png" alt="BaridiMob" className="h-5 w-auto object-contain" />
                  </a>
                  <a
                    href="https://en.wikipedia.org/wiki/Alg%C3%A9rie_Poste"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform duration-200 hover:scale-110 cursor-pointer"
                    title="Algérie Poste CCP"
                  >
                    <img src="/ccp.svg" alt="CCP" className="h-5 w-auto object-contain" />
                  </a>
                </div>
                <span className="text-[10px] font-semibold text-foreground mt-1.5">BaridiMob / CCP</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-border bg-accent/20">
                <span className="text-[9px] font-bold text-muted-foreground uppercase mb-1.5">
                  {locale === "ar" ? "دولي" : locale === "fr" ? "International" : "International"}
                </span>
                <div className="flex items-center gap-2">
                  <FaCcVisa className="h-5 w-7 text-[#151D8F] dark:text-white" />
                  <FaCcMastercard className="h-5 w-7 text-[#EB001B]" />
                </div>
                <span className="text-[10px] font-semibold text-foreground mt-1.5">Visa / Mastercard</span>
              </div>
            </div>

            <div className="text-center bg-brand-green/10 border border-brand-green/20 rounded-xl p-3">
              <p className="text-xs font-bold text-brand-green flex items-center justify-center gap-1.5">
                <Zap className="h-3.5 w-3.5 fill-current shrink-0" />
                <span>{locale === "ar" ? "تدفع نرسلك كود التفعيل مباشرة" : locale === "fr" ? "Payez, nous vous envoyons le code d'activation immédiatement" : "Pay, we send you the activation code instantly"}</span>
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
