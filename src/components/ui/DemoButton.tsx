"use client";
// Design intent: Persistent floating CTA button — always visible, bottom-right (bottom-left in RTL).
// Pulse animation ring creates urgency. Tooltip on hover explains no-signup.
// States: default, hover (scale up slightly), focus-visible (ring), active.
// Accessibility: button role, descriptive aria-label, tooltip via title attribute.

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { MonitorPlay } from "lucide-react";
import { motion } from "framer-motion";

export default function DemoButton() {
  return null;
}
