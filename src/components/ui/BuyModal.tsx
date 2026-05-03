"use client";
// Design intent: Global modal for purchase flow, triggered from any "Buy Now" button.
// Uses React context to allow opening from any component without prop drilling.
// Accessibility: Dialog is keyboard-accessible, focus is trapped inside when open, Escape closes.

import React, { createContext, useContext, useState, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import { MessageSquare, Camera, X } from "lucide-react";

interface BuyModalContextValue {
  open: boolean;
  openModal: () => void;
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
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <BuyModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
      <BuyModalDialog open={open} onOpenChange={setOpen} />
    </BuyModalContext.Provider>
  );
}

function BuyModalDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const t = useTranslations("buyModal");

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
            <Dialog.Description className="mt-2 text-muted-foreground">
              {t("subtitle")}
            </Dialog.Description>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Facebook Card */}
            <a
              href={t("facebookUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-xl bg-blue-600 p-6 text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
              role="button"
              tabIndex={0}
            >
              <MessageSquare className="h-12 w-12" />
              <span className="text-lg font-semibold">{t("facebook")}</span>
              <span className="text-sm text-white/80">{t("chatDescription")}</span>
            </a>

            {/* Instagram Card */}
            <a
              href={t("instagramUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-6 text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
              role="button"
              tabIndex={0}
            >
              <Camera className="h-12 w-12" />
              <span className="text-lg font-semibold">{t("instagram")}</span>
              <span className="text-sm text-white/80">{t("chatDescription")}</span>
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
