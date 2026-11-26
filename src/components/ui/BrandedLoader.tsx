"use client";

import Image from "next/image";

/**
 * Full-screen Salon DZ Tech loading screen displaying the untouched original loading.gif
 * at its crisp native 800x450 resolution (unoptimized, never upscaled, zero quality loss)
 * seamlessly centered on its exact matching background (#f7f5f8).
 */
export default function BrandedLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#f7f5f8] overflow-hidden select-none">
      <Image
        src="/loading.gif"
        alt="Loading salondztech"
        width={800}
        height={450}
        unoptimized
        priority
        className="max-w-[min(800px,100vw)] max-h-[min(450px,100vh)] w-auto h-auto object-contain"
      />
    </div>
  );
}
