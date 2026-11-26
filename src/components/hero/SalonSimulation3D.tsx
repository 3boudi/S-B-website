"use client";

import { useMemo, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Monitor, Tv, Users } from "lucide-react";
import {
  iso,
  isoBox,
  isoDepth,
  isoPath,
  isoPercent,
  isoWirePath,
  SCENE_HEIGHT,
  SCENE_WIDTH,
  screenPercent,
} from "./isoMath";
import {
  PC_TO_TV_PATH,
  useSalonSimulation,
  WHATSAPP_TO_PC_PATH,
} from "./useSalonSimulation";

const INK = "var(--iso-ink)";

interface IsoPawnProps {
  x: number;
  y: number;
  z?: number;
  color: string;
  variant?: "client" | "barber" | "receptionist" | "whatsapp" | "seated";
  bobOffset?: number;
}

/**
 * Crisp designedtoscale.app-style rounded pawn/meeple character
 * with uniform ink stroke, specular highlight, and ground shadow.
 */
function IsoPawn({
  x,
  y,
  z = 0,
  color,
  variant = "client",
  bobOffset = 0,
}: IsoPawnProps) {
  const pos = iso(x, y, z);
  const py = pos.y + bobOffset;
  const isSeated = variant === "seated";
  const bodyHeight = isSeated ? 18 : 24;
  const headY = py - bodyHeight - 6.2;

  return (
    <g>
      {!isSeated && (
        <ellipse
          cx={pos.x}
          cy={pos.y + 1.8}
          rx={9.5}
          ry={4.8}
          fill="var(--iso-shadow)"
        />
      )}

      {/* Tapered rounded pawn torso */}
      <path
        d={`M ${pos.x - 7.6} ${py}
            C ${pos.x - 7.8} ${py - bodyHeight * 0.52}, ${pos.x - 6.2} ${py - bodyHeight}, ${pos.x} ${py - bodyHeight}
            C ${pos.x + 6.2} ${py - bodyHeight}, ${pos.x + 7.8} ${py - bodyHeight * 0.52}, ${pos.x + 7.6} ${py}
            Q ${pos.x} ${py + 3.6}, ${pos.x - 7.6} ${py} Z`}
        fill={color}
        stroke={INK}
        strokeWidth={1.55}
        strokeLinejoin="round"
      />

      {/* Barber apron accent */}
      {variant === "barber" && (
        <path
          d={`M ${pos.x - 4.2} ${py - bodyHeight * 0.58}
              L ${pos.x + 4.2} ${py - bodyHeight * 0.58}
              L ${pos.x + 5.1} ${py + 0.6}
              Q ${pos.x} ${py + 2.4}, ${pos.x - 5.1} ${py + 0.6} Z`}
          fill="#0f172a"
          fillOpacity={0.28}
        />
      )}

      {/* Seated client barber cape line */}
      {isSeated && (
        <path
          d={`M ${pos.x - 5.8} ${py - 10} Q ${pos.x} ${py - 7.2}, ${pos.x + 5.8} ${py - 10}`}
          fill="none"
          stroke="#ffffff"
          strokeWidth={1.4}
          strokeOpacity={0.68}
          strokeLinecap="round"
        />
      )}

      {/* Tactile gloss highlight */}
      <path
        d={`M ${pos.x - 4.4} ${py - bodyHeight * 0.25}
            C ${pos.x - 4.7} ${py - bodyHeight * 0.58}, ${pos.x - 3.6} ${py - bodyHeight * 0.8}, ${pos.x - 1.8} ${py - bodyHeight * 0.86}`}
        fill="none"
        stroke="#ffffff"
        strokeWidth={1.3}
        strokeOpacity={0.58}
        strokeLinecap="round"
      />

      {/* Circular Pawn Head */}
      <circle
        cx={pos.x}
        cy={headY}
        r={5.8}
        fill={variant === "barber" || variant === "receptionist" ? "#fef3c7" : "#fff7ed"}
        stroke={INK}
        strokeWidth={1.55}
      />

      {/* Glowing smartphone held by outside WhatsApp client */}
      {variant === "whatsapp" && (
        <g transform={`translate(${pos.x - 11}, ${py - 18}) rotate(-18)`}>
          <rect
            x={-3.4}
            y={-5.8}
            width={6.8}
            height={11.6}
            rx={1.8}
            fill="#111827"
            stroke={INK}
            strokeWidth={1.3}
          />
          <rect x={-2} y={-4.1} width={4} height={7.6} rx={0.7} fill="#25d366" />
        </g>
      )}
    </g>
  );
}

interface BoxProps {
  x: number;
  y: number;
  z: number;
  dx: number;
  dy: number;
  dz: number;
  topFill: string;
  leftFill: string;
  rightFill: string;
  strokeWidth?: number;
}

function IsoBlock({
  x,
  y,
  z,
  dx,
  dy,
  dz,
  topFill,
  leftFill,
  rightFill,
  strokeWidth = 1.5,
}: BoxProps) {
  const faces = isoBox(x, y, z, dx, dy, dz);
  return (
    <g>
      <path
        d={faces.left}
        fill={leftFill}
        stroke={INK}
        strokeWidth={strokeWidth * 0.75}
        strokeLinejoin="round"
      />
      <path
        d={faces.right}
        fill={rightFill}
        stroke={INK}
        strokeWidth={strokeWidth * 0.75}
        strokeLinejoin="round"
      />
      <path
        d={faces.top}
        fill={topFill}
        stroke={INK}
        strokeWidth={strokeWidth * 0.85}
        strokeLinejoin="round"
      />
      <path
        d={faces.outline}
        fill="none"
        stroke={INK}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </g>
  );
}

// Explicit pixel-verified perimeter coordinates on the 820x620 canvas
// Guaranteeing ZERO overlap between any pill, pawn, wall, TV, barber, or mirror.
const PILL_COORDS = {
  whatsapp: { x: 566, y: 42 },
  pos: { x: 296, y: 112 },
  waiting: { x: 118, y: 196 },
  tv: { x: 724, y: 244 },
  chairs: [
    { x: 720, y: 458 },
    { x: 636, y: 508 },
    { x: 552, y: 558 },
  ] as const,
  entrance: { x: 118, y: 544 },
} as const;

export default function SalonSimulation3D() {
  const t = useTranslations("hero.simulation");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = Boolean(useReducedMotion());

  const { sim, lerpActor, lerpPacket } = useSalonSimulation(
    containerRef,
    reducedMotion
  );

  // Precompute static architectural grid lines once
  const gridLines = useMemo(() => {
    const lines: string[] = [];
    for (let i = -4; i <= 14; i += 1) {
      lines.push(
        isoWirePath([
          { x: i, y: -5, z: -0.45 },
          { x: i, y: 14, z: -0.45 },
        ])
      );
      lines.push(
        isoWirePath([
          { x: -4, y: i, z: -0.45 },
          { x: 14, y: i, z: -0.45 },
        ])
      );
    }
    return lines;
  }, []);

  // Precompute interior floor tile lines
  const floorTiles = useMemo(() => {
    const lines: string[] = [];
    for (let i = 1; i < 10; i += 2) {
      lines.push(
        isoWirePath([
          { x: i, y: 0.3, z: 0.01 },
          { x: i, y: 9.8, z: 0.01 },
        ])
      );
      lines.push(
        isoWirePath([
          { x: 0.3, y: i, z: 0.01 },
          { x: 9.8, y: i, z: 0.01 },
        ])
      );
    }
    return lines;
  }, []);

  // Static isometric paths
  const staticPaths = useMemo(() => {
    const whatsappWire = isoWirePath(WHATSAPP_TO_PC_PATH);
    const tvWire = isoWirePath(PC_TO_TV_PATH);

    const centerRug = isoPath([
      { x: 2.75, y: 3.1, z: 0.02 },
      { x: 5.35, y: 3.1, z: 0.02 },
      { x: 5.35, y: 8.2, z: 0.02 },
      { x: 2.75, y: 8.2, z: 0.02 },
    ]);
    const centerRugInner = isoPath([
      { x: 3.0, y: 3.35, z: 0.03 },
      { x: 5.1, y: 3.35, z: 0.03 },
      { x: 5.1, y: 7.95, z: 0.03 },
      { x: 3.0, y: 7.95, z: 0.03 },
    ]);

    const welcomeMat = isoPath([
      { x: 2.15, y: 10.15, z: 0.02 },
      { x: 4.05, y: 10.15, z: 0.02 },
      { x: 4.05, y: 11.15, z: 0.02 },
      { x: 2.15, y: 11.15, z: 0.02 },
    ]);

    const floorShadow = isoPath([
      { x: -0.2, y: 0.2, z: -0.62 },
      { x: 10.2, y: 0.2, z: -0.62 },
      { x: 10.2, y: 10.4, z: -0.62 },
      { x: -0.2, y: 10.4, z: -0.62 },
    ]);

    const tvScreen = isoPath([
      { x: 6.42, y: 0.43, z: 1.15 },
      { x: 9.08, y: 0.43, z: 1.15 },
      { x: 9.08, y: 0.43, z: 2.48 },
      { x: 6.42, y: 0.43, z: 2.48 },
    ]);

    const pcScreen = isoPath([
      { x: 2.18, y: 1.72, z: 1.16 },
      { x: 2.95, y: 1.72, z: 1.16 },
      { x: 2.95, y: 1.72, z: 1.74 },
      { x: 2.18, y: 1.72, z: 1.74 },
    ]);

    const wallPoster = isoPath([
      { x: 0.36, y: 4.4, z: 1.45 },
      { x: 0.36, y: 6.9, z: 1.45 },
      { x: 0.36, y: 6.9, z: 2.35 },
      { x: 0.36, y: 4.4, z: 2.35 },
    ]);

    // Double Entrance Glass Doors swung cleanly away from the center walkway (x = 3.1)
    const backDoorRight = isoPath([
      { x: 4.45, y: 9.9, z: 0.02 },
      { x: 4.95, y: 9.05, z: 0.02 },
      { x: 4.95, y: 9.05, z: 1.55 },
      { x: 4.45, y: 9.9, z: 1.55 },
    ]);
    const frontDoorLeft = isoPath([
      { x: 1.75, y: 9.9, z: 0.02 },
      { x: 1.25, y: 9.05, z: 0.02 },
      { x: 1.25, y: 9.05, z: 1.55 },
      { x: 1.75, y: 9.9, z: 1.55 },
    ]);

    return {
      whatsappWire,
      tvWire,
      centerRug,
      centerRugInner,
      welcomeMat,
      floorShadow,
      tvScreen,
      pcScreen,
      wallPoster,
      backDoorRight,
      frontDoorLeft,
    };
  }, []);

  // Leader pin endpoints linking perimeter pills to their exact 3D targets
  const leaderTargets = useMemo(
    () => ({
      pos: iso(2.55, 1.65, 1.85),
      waiting: iso(0.95, 5.1, 1.35),
      tv: iso(7.8, 0.35, 2.65),
      chairs: [
        iso(9.85, 3.1, 0.55),
        iso(9.85, 5.6, 0.55),
        iso(9.85, 8.1, 0.55),
      ] as const,
      entrance: iso(3.1, 10.95, 0.05),
    }),
    []
  );

  // Depth-sorted walking actors
  const sortedActors = useMemo(() => {
    return sim.actors
      .filter((a) => a.progress > 0 && a.progress < 1)
      .map((actor) => {
        const pos = lerpActor(actor);
        return {
          actor,
          pos,
          depth: isoDepth(pos.x, pos.y, pos.z),
        };
      })
      .sort((a, b) => a.depth - b.depth);
  }, [lerpActor, sim.actors]);

  const nowMs = sim.tickNow;
  const isTvPulsing = sim.tvPulseAt > 0 && nowMs - sim.tvPulseAt < 1100;
  const isPrinterPulsing = sim.printerPulseAt > 0 && nowMs - sim.printerPulseAt < 1300;
  const isWhatsappPulsing = sim.whatsappPulseAt > 0 && nowMs - sim.whatsappPulseAt < 1500;

  const tvTopLeft = iso(6.54, 0.46, 2.38);
  const tvWifiPos = iso(6.16, 0.4, 2.68);
  // Separate anchors on Reception desk front so Scissors and salondztech NEVER collide
  const deskScissorsPos = iso(1.38, 2.31, 0.54);
  const deskBrandPos = iso(2.05, 2.31, 0.52);
  const printerPos = iso(1.28, 1.88, 1.16);
  const barberPolePos = iso(0.65, 9.7, 0);

  const chairStations = [
    { idx: 0, y: 3.1 },
    { idx: 1, y: 5.6 },
    { idx: 2, y: 8.1 },
  ] as const;

  const hudAnchors = useMemo(
    () => ({
      whatsapp: screenPercent(PILL_COORDS.whatsapp.x, PILL_COORDS.whatsapp.y),
      pos: screenPercent(PILL_COORDS.pos.x, PILL_COORDS.pos.y),
      waiting: screenPercent(PILL_COORDS.waiting.x, PILL_COORDS.waiting.y),
      tv: screenPercent(PILL_COORDS.tv.x, PILL_COORDS.tv.y),
      chairs: PILL_COORDS.chairs.map((c) => screenPercent(c.x, c.y)),
      entrance: screenPercent(PILL_COORDS.entrance.x, PILL_COORDS.entrance.y),
    }),
    []
  );

  const whatsappStatusLabel =
    sim.activeWhatsappMsg === "confirmed"
      ? t("whatsappConfirmed")
      : sim.activeWhatsappMsg === "receipt"
        ? t("whatsappReceipt")
        : t("whatsappBooking");

  return (
    <div
      ref={containerRef}
      className={[
        "relative w-full max-w-[780px] mx-auto select-none",
        // Light mode designedtoscale.app architectural palette
        "[--iso-ink:#1e242b]",
        "[--iso-grid:rgba(30,36,43,0.08)]",
        "[--iso-shadow:rgba(15,23,42,0.14)]",
        "[--iso-floor:#fffdf9]",
        "[--iso-floor-l:#e8e1d3]",
        "[--iso-floor-r:#d8d0c0]",
        "[--iso-wall-top:#ffffff]",
        "[--iso-wall-l:#f5f0e6]",
        "[--iso-wall-r:#ebe4d5]",
        "[--iso-rug:#ecfdf5]",
        "[--iso-rug-border:#6ee7b7]",
        "[--iso-desk-top:#ffffff]",
        "[--iso-desk-l:#dcfce7]",
        "[--iso-desk-r:#bbf7d0]",
        "[--iso-bench-top:#ede9fe]",
        "[--iso-bench-l:#ddd6fe]",
        "[--iso-bench-r:#c4b5fd]",
        "[--iso-vanity-top:#f8fafc]",
        "[--iso-vanity-l:#e2e8f0]",
        "[--iso-vanity-r:#cbd5e1]",
        "[--iso-chair-top:#dbeafe]",
        "[--iso-chair-l:#bfdbfe]",
        "[--iso-chair-r:#93c5fd]",
        "[--iso-tv-top:#334155]",
        "[--iso-tv-l:#1e293b]",
        "[--iso-tv-r:#0f172a]",
        "[--iso-wa-top:#ecfdf5]",
        "[--iso-wa-l:#bbf7d0]",
        "[--iso-wa-r:#86efac]",
        "[--iso-shelf-top:#fef3c7]",
        "[--iso-shelf-l:#fde68a]",
        "[--iso-shelf-r:#fcd34d]",
        // Dark mode obsidian architectural blueprint palette
        "dark:[--iso-ink:#d1fae5]",
        "dark:[--iso-grid:rgba(37,211,102,0.12)]",
        "dark:[--iso-shadow:rgba(0,0,0,0.5)]",
        "dark:[--iso-floor:#0f1914]",
        "dark:[--iso-floor-l:#0a120e]",
        "dark:[--iso-floor-r:#060c09]",
        "dark:[--iso-wall-top:#1b2e24]",
        "dark:[--iso-wall-l:#14231b]",
        "dark:[--iso-wall-r:#101c16]",
        "dark:[--iso-rug:#0f2a1d]",
        "dark:[--iso-rug-border:#25d366]",
        "dark:[--iso-desk-top:#193025]",
        "dark:[--iso-desk-l:#133827]",
        "dark:[--iso-desk-r:#0d2a1c]",
        "dark:[--iso-bench-top:#251f3d]",
        "dark:[--iso-bench-l:#1c1730]",
        "dark:[--iso-bench-r:#141124]",
        "dark:[--iso-vanity-top:#182621]",
        "dark:[--iso-vanity-l:#111d19]",
        "dark:[--iso-vanity-r:#0c1512]",
        "dark:[--iso-chair-top:#163047]",
        "dark:[--iso-chair-l:#112638]",
        "dark:[--iso-chair-r:#0c1c2a]",
        "dark:[--iso-tv-top:#1e293b]",
        "dark:[--iso-tv-l:#0f172a]",
        "dark:[--iso-tv-r:#020617]",
        "dark:[--iso-wa-top:#0f2e1f]",
        "dark:[--iso-wa-l:#0a2216]",
        "dark:[--iso-wa-r:#071810]",
        "dark:[--iso-shelf-top:#362b16]",
        "dark:[--iso-shelf-l:#29200f]",
        "dark:[--iso-shelf-r:#1f170a]",
      ].join(" ")}
      aria-label={t("ariaLabel")}
    >
      {/* Pure, Large, Overlap-Free 3D Isometric Diorama */}
      <div
        className="relative w-full"
        style={{ aspectRatio: `${SCENE_WIDTH} / ${SCENE_HEIGHT}` }}
      >
        <svg
          direction="ltr"
          style={{ direction: "ltr" }}
          viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
          className="w-full h-full overflow-visible"
          role="img"
          aria-label={t("ariaLabel")}
        >
          <defs>
            <radialGradient id="isoGridFadeGrad" cx="48%" cy="56%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="70%" stopColor="white" stopOpacity="0.52" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="isoGridMask">
              <rect width={SCENE_WIDTH} height={SCENE_HEIGHT} fill="url(#isoGridFadeGrad)" />
            </mask>

            <filter id="emeraldGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <pattern
              id="barberPoleStripes"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(35)"
            >
              <rect width="6" height="6" fill="#ffffff" />
              <rect width="2" height="6" fill="#ef4444" />
              <rect x="4" width="2" height="6" fill="#25d366" />
            </pattern>
          </defs>

          {/* 1. Ambient Isometric Ground Grid */}
          <g mask="url(#isoGridMask)" pointerEvents="none">
            {gridLines.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="var(--iso-grid)"
                strokeWidth={1}
              />
            ))}
          </g>

          {/* 2. Outside Remote WhatsApp Client Island — ELEVATED HIGH UP ABOVE THE SALON */}
          <g>
            <path
              d={isoPath([
                { x: 0.72, y: -4.65, z: 1.72 },
                { x: 2.52, y: -4.65, z: 1.72 },
                { x: 2.52, y: -2.85, z: 1.72 },
                { x: 0.72, y: -2.85, z: 1.72 },
              ])}
              fill="var(--iso-shadow)"
            />
            <IsoBlock
              x={0.75}
              y={-4.65}
              z={1.85}
              dx={1.75}
              dy={1.75}
              dz={0.3}
              topFill="var(--iso-wa-top)"
              leftFill="var(--iso-wa-l)"
              rightFill="var(--iso-wa-r)"
              strokeWidth={1.55}
            />
            {isWhatsappPulsing && (
              <path
                d={isoPath([
                  { x: 0.9, y: -4.5, z: 2.18 },
                  { x: 2.35, y: -4.5, z: 2.18 },
                  { x: 2.35, y: -3.05, z: 2.18 },
                  { x: 0.9, y: -3.05, z: 2.18 },
                ])}
                fill="none"
                stroke="#25d366"
                strokeWidth={2.2}
                strokeOpacity={0.9}
              />
            )}
            <IsoPawn
              x={1.62}
              y={-3.75}
              z={2.17}
              color="#86efac"
              variant="whatsapp"
            />
          </g>

          {/* 3. Enlarged Salon Base Platform Slab & Cast Shadow */}
          <path d={staticPaths.floorShadow} fill="var(--iso-shadow)" />
          <IsoBlock
            x={0}
            y={0}
            z={-0.45}
            dx={10}
            dy={10}
            dz={0.45}
            topFill="var(--iso-floor)"
            leftFill="var(--iso-floor-l)"
            rightFill="var(--iso-floor-r)"
            strokeWidth={1.75}
          />

          {/* Interior floor tiles */}
          <g opacity={0.42} pointerEvents="none">
            {floorTiles.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="var(--iso-grid)"
                strokeWidth={1}
              />
            ))}
          </g>

          {/* Center Walkway Carpet */}
          <path
            d={staticPaths.centerRug}
            fill="var(--iso-rug)"
            stroke="var(--iso-rug-border)"
            strokeWidth={1.3}
          />
          <path
            d={staticPaths.centerRugInner}
            fill="none"
            stroke="var(--iso-rug-border)"
            strokeWidth={1}
            strokeDasharray="3.5 3.5"
            opacity={0.78}
          />

          {/* Welcome Mat outside Entrance */}
          <path
            d={staticPaths.welcomeMat}
            fill="var(--iso-desk-l)"
            stroke={INK}
            strokeWidth={1.35}
          />

          {/* 4. Cutaway Architectural Back Walls */}
          <IsoBlock
            x={0}
            y={0}
            z={0}
            dx={0.32}
            dy={9.95}
            dz={2.72}
            topFill="var(--iso-wall-top)"
            leftFill="var(--iso-wall-l)"
            rightFill="var(--iso-wall-l)"
            strokeWidth={1.65}
          />
          <IsoBlock
            x={0.32}
            y={0}
            z={0}
            dx={9.68}
            dy={0.32}
            dz={2.72}
            topFill="var(--iso-wall-top)"
            leftFill="var(--iso-wall-r)"
            rightFill="var(--iso-wall-r)"
            strokeWidth={1.65}
          />

          {/* Framed Wall Poster above Waiting Bench */}
          <g>
            <path
              d={staticPaths.wallPoster}
              fill="var(--iso-desk-l)"
              stroke={INK}
              strokeWidth={1.3}
              strokeLinejoin="round"
            />
            <path
              d={isoPath([
                { x: 0.37, y: 4.75, z: 1.7 },
                { x: 0.37, y: 6.55, z: 1.7 },
                { x: 0.37, y: 6.55, z: 2.1 },
                { x: 0.37, y: 4.75, z: 2.1 },
              ])}
              fill="#25d366"
              fillOpacity={0.28}
            />
          </g>

          {/* 5. Product Inventory Shelf (Back-Right Wall) */}
          <g>
            <IsoBlock
              x={4.15}
              y={0.34}
              z={0.95}
              dx={1.55}
              dy={0.42}
              dz={0.14}
              topFill="var(--iso-shelf-top)"
              leftFill="var(--iso-shelf-l)"
              rightFill="var(--iso-shelf-r)"
              strokeWidth={1.25}
            />
            <IsoBlock
              x={4.15}
              y={0.34}
              z={1.55}
              dx={1.55}
              dy={0.42}
              dz={0.14}
              topFill="var(--iso-shelf-top)"
              leftFill="var(--iso-shelf-l)"
              rightFill="var(--iso-shelf-r)"
              strokeWidth={1.25}
            />
            {[
              { x: 4.35, z: 1.09, c: "#25d366" },
              { x: 4.75, z: 1.09, c: "#60a5fa" },
              { x: 5.15, z: 1.09, c: "#f472b6" },
              { x: 4.45, z: 1.69, c: "#fbbf24" },
              { x: 4.9, z: 1.69, c: "#a78bfa" },
              { x: 5.3, z: 1.69, c: "#34d399" },
            ].map((b, idx) => (
              <IsoBlock
                key={idx}
                x={b.x}
                y={0.45}
                z={b.z}
                dx={0.22}
                dy={0.22}
                dz={0.34}
                topFill={b.c}
                leftFill={b.c}
                rightFill={b.c}
                strokeWidth={1}
              />
            ))}
          </g>

          {/* 6. Wall-Mounted Lounge Smart TV */}
          <g>
            <IsoBlock
              x={6.25}
              y={0.32}
              z={1.02}
              dx={2.98}
              dy={0.12}
              dz={1.58}
              topFill="var(--iso-tv-top)"
              leftFill="var(--iso-tv-l)"
              rightFill="var(--iso-tv-r)"
              strokeWidth={1.55}
            />
            <path
              d={staticPaths.tvScreen}
              fill="#071510"
              stroke={isTvPulsing ? "#25d366" : "#1f3a2c"}
              strokeWidth={isTvPulsing ? 2 : 1.1}
            />
            <g
              transform={`translate(${tvTopLeft.x}, ${tvTopLeft.y}) matrix(0.8944 0.4472 0 1 0 0)`}
            >
              <rect x={0} y={0} width={94} height={7.8} rx={1.4} fill="#25d366" />
              <text
                x={4.5}
                y={6}
                fontSize="5.4"
                fontWeight="700"
                fill="#052e16"
                fontFamily="monospace"
              >
                salontv.local ● LIVE
              </text>

              {sim.chairs.map((chair, idx) => (
                <g key={chair.id} transform={`translate(${idx * 30.8}, 11)`}>
                  <rect
                    x={0}
                    y={0}
                    width={28}
                    height={14}
                    rx={2.2}
                    fill="#0f291e"
                    stroke="#25d366"
                    strokeOpacity={0.55}
                    strokeWidth={0.8}
                  />
                  <text
                    x={14}
                    y={9.8}
                    textAnchor="middle"
                    fontSize="7.4"
                    fontWeight="800"
                    fill="#ecfdf5"
                    fontFamily="monospace"
                  >
                    #{String(chair.ticketNumber).padStart(2, "0")}
                  </text>
                </g>
              ))}

              <rect
                x={0}
                y={28.5}
                width={94}
                height={9}
                rx={2}
                fill={isTvPulsing ? "#25d366" : "#14532d"}
              />
              <text
                x={47}
                y={34.8}
                textAnchor="middle"
                fontSize="6.1"
                fontWeight="700"
                fill={isTvPulsing ? "#052e16" : "#bbf7d0"}
                fontFamily="monospace"
              >
                NEXT #{String(sim.nextTicketNumber).padStart(2, "0")} · WAIT {sim.waitingCount}
              </text>
            </g>

            {/* Wi-Fi Sync Ripple Arcs beside Smart TV */}
            <g
              transform={`translate(${tvWifiPos.x}, ${tvWifiPos.y})`}
              opacity={isTvPulsing ? 0.95 : 0.48}
              style={{ transition: "opacity 220ms ease" }}
            >
              <path
                d="M -6.5 -2 A 7.5 7.5 0 0 1 6.5 -2"
                fill="none"
                stroke="#38bdf8"
                strokeWidth={1.45}
                strokeLinecap="round"
              />
              <path
                d="M -10 -6 A 12 12 0 0 1 10 -6"
                fill="none"
                stroke="#25d366"
                strokeWidth={1.45}
                strokeLinecap="round"
              />
              <circle cx={0} cy={1} r={1.8} fill="#38bdf8" />
            </g>
          </g>

          {/* 7. Waiting Lounge Bench + Seated Waiting Meeples */}
          <g>
            <IsoBlock
              x={0.36}
              y={3.05}
              z={0}
              dx={0.32}
              dy={5.2}
              dz={1.15}
              topFill="var(--iso-bench-top)"
              leftFill="var(--iso-bench-l)"
              rightFill="var(--iso-bench-r)"
              strokeWidth={1.45}
            />
            <IsoBlock
              x={0.68}
              y={3.05}
              z={0}
              dx={0.85}
              dy={5.2}
              dz={0.54}
              topFill="var(--iso-bench-top)"
              leftFill="var(--iso-bench-l)"
              rightFill="var(--iso-bench-r)"
              strokeWidth={1.45}
            />
            {[3.75, 4.95, 6.15, 7.35].map((wy, idx) => {
              if (idx >= Math.min(4, sim.waitingCount)) return null;
              return (
                <IsoPawn
                  key={idx}
                  x={1.12}
                  y={wy}
                  z={0.54}
                  color={sim.waitingColors[idx] ?? "#93c5fd"}
                  variant="seated"
                />
              );
            })}
          </g>

          {/* 8. Reception Hub — Receptionist + Desk + salondztech PC + Thermal Printer */}
          <g>
            <IsoPawn
              x={1.8}
              y={0.95}
              z={0.02}
              color="#25d366"
              variant="receptionist"
            />
            <IsoBlock
              x={0.85}
              y={1.35}
              z={0}
              dx={2.75}
              dy={0.95}
              dz={1.02}
              topFill="var(--iso-desk-top)"
              leftFill="var(--iso-desk-l)"
              rightFill="var(--iso-desk-r)"
              strokeWidth={1.6}
            />

            {/* Cleanly Separated Scissors Emblem + salondztech Brand Mark on Desk Front */}
            <g
              transform={`translate(${deskScissorsPos.x}, ${deskScissorsPos.y}) matrix(0.8944 0.4472 0 1 0 0)`}
              pointerEvents="none"
            >
              <circle cx={-3.2} cy={2.2} r={2.5} fill="none" stroke="#15803d" strokeWidth={1.35} />
              <circle cx={3.2} cy={2.2} r={2.5} fill="none" stroke="#15803d" strokeWidth={1.35} />
              <path
                d="M -1.8 0 L 4.5 -6.5 M 1.8 0 L -4.5 -6.5"
                stroke="#15803d"
                strokeWidth={1.4}
                strokeLinecap="round"
              />
            </g>
            <g
              transform={`translate(${deskBrandPos.x}, ${deskBrandPos.y}) matrix(0.8944 0.4472 0 1 0 0)`}
              pointerEvents="none"
            >
              <text
                x={0}
                y={2.5}
                fontSize="8.2"
                fontWeight="800"
                fill="#15803d"
                fontFamily="system-ui, sans-serif"
                letterSpacing="-0.2"
              >
                salondztech
              </text>
            </g>

            {/* salondztech Desktop PC Monitor */}
            <IsoBlock
              x={2.12}
              y={1.58}
              z={1.02}
              dx={0.92}
              dy={0.14}
              dz={0.78}
              topFill="var(--iso-tv-top)"
              leftFill="var(--iso-tv-l)"
              rightFill="var(--iso-tv-r)"
              strokeWidth={1.3}
            />
            <path
              d={staticPaths.pcScreen}
              fill="#052e16"
              stroke="#25d366"
              strokeWidth={1}
            />
            {(() => {
              const p0 = iso(2.3, 1.73, 1.24);
              const p1 = iso(2.55, 1.73, 1.38);
              const p2 = iso(2.78, 1.73, 1.48);
              return (
                <g stroke="#25d366" strokeWidth={2.4} strokeLinecap="round">
                  <line x1={p0.x} y1={p0.y + 4} x2={p0.x} y2={p0.y - 2} />
                  <line x1={p1.x} y1={p1.y + 4} x2={p1.x} y2={p1.y - 6} />
                  <line x1={p2.x} y1={p2.y + 4} x2={p2.x} y2={p2.y - 8} />
                </g>
              );
            })()}

            {/* Thermal Receipt Printer */}
            <IsoBlock
              x={1.12}
              y={1.65}
              z={1.02}
              dx={0.48}
              dy={0.44}
              dz={0.28}
              topFill="var(--iso-vanity-top)"
              leftFill="var(--iso-vanity-l)"
              rightFill="var(--iso-vanity-r)"
              strokeWidth={1.2}
            />
            <g
              transform={`translate(${printerPos.x}, ${printerPos.y - (isPrinterPulsing ? 9 : 2)
                })`}
              style={{ transition: "transform 280ms cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <rect
                x={-5}
                y={-10}
                width={10}
                height={11}
                rx={1.2}
                fill="#ffffff"
                stroke={INK}
                strokeWidth={1.1}
              />
              <line x1={-2.8} y1={-6.5} x2={2.8} y2={-6.5} stroke="#25d366" strokeWidth={1.2} />
              <line x1={-2.8} y1={-3.8} x2={2} y2={-3.8} stroke="#94a3b8" strokeWidth={1} />
            </g>
          </g>

          {/* 9. Back Glass Door Leaf (behind walking clients) */}
          <path
            d={staticPaths.backDoorRight}
            fill="#a7f3d0"
            fillOpacity={0.22}
            stroke={INK}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />

          {/* 10. Animated Walking Clients (walk cleanly between open double doors!) */}
          {sortedActors.map(({ actor, pos }) => (
            <IsoPawn
              key={actor.id}
              x={pos.x}
              y={pos.y}
              z={0.02}
              color={actor.color}
              variant="client"
              bobOffset={Math.sin(actor.progress * Math.PI * 16) * 1.5}
            />
          ))}

          {/* 11. 3 Active Barber Stations (100% Unobstructed — Barbers, Chairs, Clients & Vanity) */}
          <g>
            {chairStations.map(({ idx, y }) => {
              const chair = sim.chairs[idx];
              const sway = reducedMotion
                ? 0
                : Math.sin((chair.progress / 100) * Math.PI * 12 + idx * 2) * 1.2;

              return (
                <g key={chair.id}>
                  <IsoPawn
                    x={6.55}
                    y={y}
                    z={0.02}
                    color={chair.barberColor}
                    variant="barber"
                    bobOffset={sway}
                  />

                  {(() => {
                    const basePos = iso(7.72, y, 0.02);
                    return (
                      <ellipse
                        cx={basePos.x}
                        cy={basePos.y}
                        rx={14}
                        ry={7}
                        fill="#94a3b8"
                        fillOpacity={0.35}
                        stroke={INK}
                        strokeWidth={1.25}
                      />
                    );
                  })()}

                  <IsoBlock
                    x={7.28}
                    y={y - 0.48}
                    z={0.18}
                    dx={0.86}
                    dy={0.96}
                    dz={0.44}
                    topFill="var(--iso-chair-top)"
                    leftFill="var(--iso-chair-l)"
                    rightFill="var(--iso-chair-r)"
                    strokeWidth={1.4}
                  />
                  <IsoBlock
                    x={7.22}
                    y={y - 0.48}
                    z={0.62}
                    dx={0.22}
                    dy={0.96}
                    dz={0.56}
                    topFill="var(--iso-chair-top)"
                    leftFill="var(--iso-chair-l)"
                    rightFill="var(--iso-chair-r)"
                    strokeWidth={1.3}
                  />

                  <IsoPawn
                    x={7.76}
                    y={y}
                    z={0.62}
                    color={chair.clientColor}
                    variant="seated"
                  />
                </g>
              );
            })}

            {/* Low Cutaway Styling Vanity Counter & Mirrors */}
            <IsoBlock
              x={9.08}
              y={2.05}
              z={0}
              dx={0.74}
              dy={7.1}
              dz={0.72}
              topFill="var(--iso-vanity-top)"
              leftFill="var(--iso-vanity-l)"
              rightFill="var(--iso-vanity-r)"
              strokeWidth={1.5}
            />
            {[3.1, 5.6, 8.1].map((my, i) => (
              <path
                key={i}
                d={isoPath([
                  { x: 9.76, y: my - 0.72, z: 0.72 },
                  { x: 9.76, y: my + 0.72, z: 0.72 },
                  { x: 9.76, y: my + 0.72, z: 1.38 },
                  { x: 9.76, y: my - 0.72, z: 1.38 },
                ])}
                fill="#bae6fd"
                fillOpacity={0.36}
                stroke={INK}
                strokeWidth={1.3}
                strokeLinejoin="round"
              />
            ))}
          </g>

          {/* 12. Front-Left Glass Door Leaf & Classic Barber Pole */}
          <g>
            <path
              d={staticPaths.frontDoorLeft}
              fill="#a7f3d0"
              fillOpacity={0.22}
              stroke={INK}
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
            <g transform={`translate(${barberPolePos.x}, ${barberPolePos.y})`}>
              <rect
                x={-4.4}
                y={-30}
                width={8.8}
                height={23}
                rx={4.4}
                fill="url(#barberPoleStripes)"
                stroke={INK}
                strokeWidth={1.4}
              />
              <circle cx={0} cy={-31.8} r={4} fill="#e2e8f0" stroke={INK} strokeWidth={1.3} />
              <ellipse cx={0} cy={-6} rx={5.2} ry={2.5} fill="#94a3b8" stroke={INK} strokeWidth={1.2} />
            </g>
          </g>

          {/* 13. Crisp Thin Leader Pins connecting Perimeter Telemetry Pills -> Exact Stations */}
          <g stroke={INK} strokeOpacity={0.42} strokeWidth={1.25} strokeDasharray="2.5 2.5" pointerEvents="none">
            {/* POS pill -> Reception PC */}
            <line
              x1={PILL_COORDS.pos.x + 28}
              y1={PILL_COORDS.pos.y + 16}
              x2={leaderTargets.pos.x}
              y2={leaderTargets.pos.y}
            />
            {/* Waiting pill -> Waiting Bench */}
            <line
              x1={PILL_COORDS.waiting.x + 42}
              y1={PILL_COORDS.waiting.y + 12}
              x2={leaderTargets.waiting.x}
              y2={leaderTargets.waiting.y}
            />
            {/* TV pill -> Smart TV */}
            <line
              x1={PILL_COORDS.tv.x - 24}
              y1={PILL_COORDS.tv.y + 16}
              x2={leaderTargets.tv.x}
              y2={leaderTargets.tv.y}
            />
            {/* Chair 1, 2, 3 pills -> Vanity edge */}
            {PILL_COORDS.chairs.map((c, idx) => (
              <line
                key={idx}
                x1={c.x - 42}
                y1={c.y}
                x2={leaderTargets.chairs[idx].x}
                y2={leaderTargets.chairs[idx].y}
              />
            ))}
            {/* Entrance pill -> Welcome mat */}
            <line
              x1={PILL_COORDS.entrance.x + 12}
              y1={PILL_COORDS.entrance.y - 16}
              x2={leaderTargets.entrance.x}
              y2={leaderTargets.entrance.y}
            />
          </g>
          {/* Anchor Dots at Station Ends of Leader Pins */}
          <g fill="#25d366" stroke={INK} strokeWidth={1} pointerEvents="none">
            <circle cx={leaderTargets.pos.x} cy={leaderTargets.pos.y} r={2.8} />
            <circle cx={leaderTargets.waiting.x} cy={leaderTargets.waiting.y} r={2.8} />
            <circle cx={leaderTargets.tv.x} cy={leaderTargets.tv.y} r={2.8} />
            {leaderTargets.chairs.map((pt, idx) => (
              <circle key={idx} cx={pt.x} cy={pt.y} r={2.8} />
            ))}
            <circle cx={leaderTargets.entrance.x} cy={leaderTargets.entrance.y} r={2.8} />
          </g>

          {/* 14. Animated Data Flow Beams (Downward Elevated WhatsApp Arc + TV Wi-Fi Arc) */}
          <path
            d={staticPaths.whatsappWire}
            fill="none"
            stroke="#25d366"
            strokeWidth={2.3}
            strokeDasharray="6 5"
            strokeLinecap="round"
            strokeOpacity={0.85}
          />
          <path
            d={staticPaths.tvWire}
            fill="none"
            stroke="#38bdf8"
            strokeWidth={2}
            strokeDasharray="4.5 4.5"
            strokeLinecap="round"
            strokeOpacity={0.75}
          />

          {/* Glowing Signal Packets */}
          {sim.packets
            .filter((p) => p.progress > 0 && p.progress <= 1)
            .map((packet) => {
              const p3d = lerpPacket(packet);
              const pt = iso(p3d.x, p3d.y, p3d.z);
              const isTv = packet.kind === "tv_sync";
              const isReceipt = packet.kind === "receipt_out";
              const fillColor = isTv
                ? "#38bdf8"
                : isReceipt
                  ? "#fbbf24"
                  : "#25d366";

              return (
                <g key={packet.id} filter="url(#emeraldGlow)">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={5.8}
                    fill={fillColor}
                    stroke="#ffffff"
                    strokeWidth={1.8}
                  />
                </g>
              );
            })}
        </svg>

        {/* =================================================================
            ZERO-OVERLAP PERIMETER TELEMETRY PILLS (NATIVE AR / FR / EN)
            ================================================================= */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 1. Elevated WhatsApp 24/7 Pill (HIGH ABOVE Outside Client) */}
          <div
            style={{
              left: hudAnchors.whatsapp.left,
              top: hudAnchors.whatsapp.top,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex flex-col items-center gap-0.5 sm:gap-1">
              <div className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/95 dark:bg-[#0d1612]/95 px-2 sm:px-3 py-0.5 sm:py-1 border-[1.2px] sm:border-[1.5px] border-[#1e242b] dark:border-emerald-300/60 shadow-[0_1.5px_0_rgba(30,36,43,0.16)] sm:shadow-[0_2px_0_rgba(30,36,43,0.16)] dark:shadow-[0_2px_0_rgba(0,0,0,0.65)] whitespace-nowrap">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-brand-green" />
                </span>
                <span className="text-[7.5px] sm:text-[11px] font-bold text-[#1e242b] dark:text-white">
                  {t("whatsappTitle")}
                </span>
              </div>
              <div className="rounded-md sm:rounded-lg bg-emerald-500 text-white px-1.5 sm:px-2.5 py-0.5 text-[7px] sm:text-[10px] font-semibold border border-[#1e242b]/80 dark:border-emerald-200/50 shadow-xs whitespace-nowrap">
                {whatsappStatusLabel}
              </div>
            </div>
          </div>

          {/* 2. POS Revenue Pill (Outside Top-Left Roof) */}
          <div
            style={{
              left: hudAnchors.pos.left,
              top: hudAnchors.pos.top,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/95 dark:bg-[#0d1612]/95 px-1.5 sm:px-2.5 py-0.5 sm:py-1 border-[1.2px] sm:border-[1.5px] border-[#1e242b] dark:border-emerald-300/60 shadow-[0_1.5px_0_rgba(30,36,43,0.16)] sm:shadow-[0_2px_0_rgba(30,36,43,0.16)] dark:shadow-[0_2px_0_rgba(0,0,0,0.65)] whitespace-nowrap">
              <Monitor className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-brand-green shrink-0" />
              <span className="text-[7.5px] sm:text-[11px] font-bold text-[#1e242b] dark:text-white">
                {t("posLabel")}
              </span>
              <span className="text-[7.5px] sm:text-[11.5px] font-extrabold tabular-nums text-emerald-600 dark:text-brand-green">
                {sim.dailyRevenue.toLocaleString("en-US")} {t("currency")}
              </span>
            </div>
          </div>

          {/* 3. Waiting Lounge Queue Pill (Outside Back-Left Wall) */}
          <div
            style={{
              left: hudAnchors.waiting.left,
              top: hudAnchors.waiting.top,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/95 dark:bg-[#0d1612]/95 px-1.5 sm:px-2.5 py-0.5 sm:py-1 border-[1.2px] sm:border-[1.5px] border-[#1e242b] dark:border-violet-300/55 shadow-[0_1.5px_0_rgba(30,36,43,0.16)] sm:shadow-[0_2px_0_rgba(30,36,43,0.16)] dark:shadow-[0_2px_0_rgba(0,0,0,0.65)] whitespace-nowrap">
              <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-violet-500 dark:text-violet-300 shrink-0" />
              <span className="text-[7.5px] sm:text-[11px] font-bold tabular-nums text-[#1e242b] dark:text-white">
                {sim.waitingCount} {t("waitingLabel")}
              </span>
            </div>
          </div>

          {/* 4. Wall-Mounted Smart TV Pill (Outside Far-Right Roof — Zero Overlap!) */}
          <div
            style={{
              left: hudAnchors.tv.left,
              top: hudAnchors.tv.top,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/95 dark:bg-[#0d1612]/95 px-1.5 sm:px-2.5 py-0.5 sm:py-1 border-[1.2px] sm:border-[1.5px] border-[#1e242b] dark:border-sky-300/55 shadow-[0_1.5px_0_rgba(30,36,43,0.16)] sm:shadow-[0_2px_0_rgba(30,36,43,0.16)] dark:shadow-[0_2px_0_rgba(0,0,0,0.65)] whitespace-nowrap">
              <Tv className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-sky-500 shrink-0" />
              <span className="text-[7.5px] sm:text-[11px] font-bold text-[#1e242b] dark:text-white">
                {t("tvLabel")}
              </span>
              <span className="text-[7.5px] sm:text-[11px] font-extrabold tabular-nums text-sky-600 dark:text-sky-300">
                #{String(sim.nextTicketNumber).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* 5. 3 Chair Progress Pills (Cleanly Outside Front-Right Vanity Edge — Zero Overlap!) */}
          {sim.chairs.map((chair, idx) => {
            const pct = Math.min(100, Math.round(chair.progress));
            const barColor =
              pct >= 85
                ? "bg-emerald-500"
                : pct >= 50
                  ? "bg-amber-400"
                  : "bg-sky-400";
            const anchor = hudAnchors.chairs[idx];

            return (
              <div
                key={chair.id}
                style={{ left: anchor.left, top: anchor.top }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <div className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/95 dark:bg-[#0d1612]/95 px-1.5 sm:px-2.5 py-0.5 sm:py-1 border-[1.2px] sm:border-[1.45px] border-[#1e242b] dark:border-emerald-200/55 shadow-[0_1.5px_0_rgba(30,36,43,0.16)] sm:shadow-[0_2px_0_rgba(30,36,43,0.16)] dark:shadow-[0_2px_0_rgba(0,0,0,0.65)]">
                  <span
                    className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full shrink-0 ${barColor}`}
                  />
                  <div className="w-5 sm:w-10 h-1 sm:h-1.5 rounded-full bg-slate-200 dark:bg-white/15 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-[width] duration-75 ${barColor}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[7px] sm:text-[10px] font-extrabold tabular-nums text-[#1e242b] dark:text-white min-w-[18px] sm:min-w-[24px] text-end">
                    {pct}%
                  </span>
                </div>
              </div>
            );
          })}

          {/* 6. Entrance Pill (Cleanly Below-Left Welcome Mat) */}
          <div
            style={{
              left: hudAnchors.entrance.left,
              top: hudAnchors.entrance.top,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/95 dark:bg-[#0d1612]/95 px-1.5 sm:px-2.5 py-0.5 sm:py-1 border-[1.2px] sm:border-[1.45px] border-[#1e242b] dark:border-emerald-300/50 shadow-[0_1.5px_0_rgba(30,36,43,0.14)] whitespace-nowrap">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-brand-green" />
              <span className="text-[7.5px] sm:text-[10.5px] font-bold text-[#1e242b] dark:text-white">
                {t("entranceLabel")}
              </span>
            </div>
          </div>

          {/* 7. Subtle Transient Checkout Micro-Toasts (+1,500 DA, Stock -1) */}
          <AnimatePresence>
            {sim.events.map((evt) => {
              const pos = isoPercent(evt.anchor.x, evt.anchor.y, evt.anchor.z);
              const badgeStyle =
                evt.kind === "revenue"
                  ? "bg-emerald-500 text-white border-[#1e242b]"
                  : "bg-amber-400 text-[#1e242b] border-[#1e242b]";

              const label =
                evt.kind === "revenue"
                  ? `${evt.value} ${t("currency")}`
                  : `${t("stockToast")} ${evt.value}`;

              return (
                <motion.div
                  key={evt.id}
                  initial={{ opacity: 0, y: 4, scale: 0.9 }}
                  animate={{ opacity: 1, y: -12, scale: 1 }}
                  exit={{ opacity: 0, y: -22, scale: 0.92 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ left: pos.left, top: pos.top }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <div
                    className={`rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-extrabold tabular-nums border shadow-sm whitespace-nowrap ${badgeStyle}`}
                  >
                    {label}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
