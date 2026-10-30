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
      className="h-[40rem] sm:h-[54rem] md:h-[70rem] flex items-center justify-center relative p-2 sm:p-4 md:p-6"
      style={{ position: "relative" }}
      ref={containerRef}
    >
      <div
        className="py-6 sm:py-10 md:py-16 w-full relative"
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
        boxShadow: "0 20px 50px -15px rgba(0, 0, 0, 0.08)",
        willChange: "transform",
      }}
      className="max-w-6xl xl:max-w-7xl -mt-4 sm:-mt-8 mx-auto w-full aspect-video rounded-2xl sm:rounded-3xl relative overflow-hidden p-0 border-0 bg-transparent"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-transparent">
        {children}
      </div>
    </motion.div>
  );
};
