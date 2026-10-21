"use client";
// Design intent: Scroll-driven 3D perspective reveal for dashboard screenshot.
// Tokens: perspective 1000px, rotateX 20deg→0deg, scale driven by scrollYProgress.
// States: initial (rotated/scaled), scrolling (interpolating), final (flat/full-scale).
// Accessibility: decorative animation — no keyboard interaction needed, motion respects prefers-reduced-motion via Framer Motion defaults.

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[45rem] sm:h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      style={{ position: "relative" }}
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        willChange: "transform",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[20rem] sm:h-[30rem] md:h-[42rem] w-full apple-card rounded-[28px] p-2 md:p-4 shadow-2xl relative overflow-hidden"
    >
      {/* Apple Window Chrome Titlebar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] rounded-t-[20px] mb-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#FF5F57] opacity-80" />
          <div className="h-3 w-3 rounded-full bg-[#FFBD2E] opacity-80" />
          <div className="h-3 w-3 rounded-full bg-[#28C840] opacity-80" />
        </div>
        <div className="text-[11px] font-medium text-muted-foreground font-mono">
          salondztech-workstation • POS & Stock
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-brand-green font-semibold px-2 py-0.5 rounded-full bg-brand-green/10">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
          <span>Active</span>
        </div>
      </div>

      <div className="h-[calc(100%-42px)] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900">
        {children}
      </div>
    </motion.div>
  );
};
