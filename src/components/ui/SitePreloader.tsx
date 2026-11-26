"use client";

import { useEffect, useState } from "react";
import BrandedLoader from "./BrandedLoader";

/**
 * Full-screen initial splash preloader displaying the full scissors GIF edge-to-edge.
 * Fades out smoothly once hydrated/loaded (1.25s max failsafe) and unmounts cleanly.
 */
export default function SitePreloader() {
  const [phase, setPhase] = useState<"visible" | "fading" | "gone">("visible");

  useEffect(() => {
    let dismissed = false;
    let unmountTimer: ReturnType<typeof setTimeout> | undefined;
    const minDisplayMs = 520;
    const maxFailsafeMs = 1250;
    const mountedAt = performance.now();

    const triggerDismiss = () => {
      if (dismissed) return;
      dismissed = true;
      setPhase("fading");
      unmountTimer = setTimeout(() => {
        setPhase("gone");
      }, 320);
    };

    const scheduleDismissAfterMin = () => {
      const elapsed = performance.now() - mountedAt;
      const remaining = Math.max(0, minDisplayMs - elapsed);
      setTimeout(triggerDismiss, remaining);
    };

    const failsafeTimer = setTimeout(triggerDismiss, maxFailsafeMs);

    if (document.readyState === "complete") {
      scheduleDismissAfterMin();
    } else {
      window.addEventListener("load", scheduleDismissAfterMin, { once: true });
    }

    return () => {
      clearTimeout(failsafeTimer);
      if (unmountTimer) clearTimeout(unmountTimer);
      window.removeEventListener("load", scheduleDismissAfterMin);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading salondztech"
      className={`fixed inset-0 z-[100] w-screen h-screen bg-[#f7f5f8] transition-opacity duration-300 ease-out ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <BrandedLoader />
    </div>
  );
}
