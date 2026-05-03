import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coiffer — Offline Salon Management System for Algerian Barbershops",
  description:
    "Coiffer is the complete offline management system for barbershops and hair salons. Appointments, payroll, inventory, loyalty — all in one beautiful dashboard. No internet required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
