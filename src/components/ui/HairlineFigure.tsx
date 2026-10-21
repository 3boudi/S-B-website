"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Phone,
  Laptop,
  Keyboard,
  Plot,
  Drawer,
  Vault,
  Padlock,
  Query,
  Slow,
  Riffle,
  Terrain,
  Branches,
  Exploded,
  Basket,
  Elevator,
  type HairlineProps,
} from "@lucasmarkes/hairline/react";

export type HairlineFigureName =
  | "phone"
  | "laptop"
  | "keyboard"
  | "plot"
  | "drawer"
  | "vault"
  | "padlock"
  | "query"
  | "slow"
  | "riffle"
  | "terrain"
  | "branches"
  | "exploded"
  | "basket"
  | "elevator";

const FIGURES_MAP: Record<HairlineFigureName, React.ComponentType<HairlineProps>> = {
  phone: Phone,
  laptop: Laptop,
  keyboard: Keyboard,
  plot: Plot,
  drawer: Drawer,
  vault: Vault,
  padlock: Padlock,
  query: Query,
  slow: Slow,
  riffle: Riffle,
  terrain: Terrain,
  branches: Branches,
  exploded: Exploded,
  basket: Basket,
  elevator: Elevator,
};

interface HairlineFigureProps extends HairlineProps {
  name: HairlineFigureName;
  className?: string;
  fallbackAspect?: string;
}

export default function HairlineFigure({
  name,
  intensity = 0.6,
  theme = "auto",
  play = true,
  className = "",
  fallbackAspect = "aspect-[5/4]",
  ...rest
}: HairlineFigureProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const FigureComponent = FIGURES_MAP[name];

  if (!mounted || !FigureComponent) {
    return (
      <div
        className={`w-full ${fallbackAspect} flex items-center justify-center opacity-0 transition-opacity duration-300 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={`relative transition-transform duration-300 ${className}`}>
      <FigureComponent
        intensity={intensity}
        theme={theme}
        play={play}
        {...rest}
      />
    </div>
  );
}
