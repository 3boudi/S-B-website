"use client";

import React, { useEffect, useRef } from "react";

/**
 * BARBER_CONFIG
 * Central configuration for the interactive floating barber tools background.
 * Adjust these values to tweak appearance, physics, and interaction feel.
 */
export const BARBER_CONFIG = {
  // Density & Counts (Enhanced for richer presence across the entire canvas)
  iconCountDesktop: 88,        // Total scattered icons on desktop screens
  iconCountMobile: 42,         // Total scattered icons on mobile (<768px)

  // Icon Size Range (px)
  sizeMin: 24,                 // Smallest icon size (back layer)
  sizeMax: 66,                 // Largest icon size (front layer)

  // Opacity Range (keeps all site text 100% readable while beautifully visible)
  opacityMin: 0.11,            // Base opacity for back layer icons
  opacityMax: 0.38,            // Base opacity for front layer icons
  proximityGlowBoost: 0.25,    // Extra opacity boost when cursor is hovering near

  // Colors: Dark Theme (near-black green base + glowing mint & vivid emerald)
  dark: {
    bgTop: "#05160e",          // Dark emerald base at top
    bgBottom: "#020705",       // Deep obsidian base at bottom
    vignette: "rgba(16, 185, 129, 0.06)",
    backLayerColor: "#059669", // Medium emerald for back layer
    midLayerColor: "#10b981",  // Vivid green
    frontLayerColor: "#6ee7b7",// Mint green
    highlightColor: "#d1fae5", // Soft light green sheen
    glowColor: "rgba(110, 231, 183, 0.45)",
  },

  // Colors: Light Theme (creamy mint base + deep emerald & forest icons)
  light: {
    bgTop: "#f9fcf9",          // Creamy mint base
    bgBottom: "#f2f8f4",       // Soft pale wash
    vignette: "rgba(16, 185, 129, 0.04)",
    backLayerColor: "#34d399", // Mint for back layer
    midLayerColor: "#047857",  // Forest green
    frontLayerColor: "#064e3b",// Deep emerald
    highlightColor: "#10b981", // Vivid green
    glowColor: "rgba(4, 120, 87, 0.25)",
  },

  // Mouse & Touch Physics
  mouseRadius: 260,            // Repulsion influence radius in pixels (200-280px)
  mouseStrength: 52,           // Maximum repulsive displacement force
  mouseLerp: 0.09,             // Mouse interpolation smoothing (0.08 - 0.12 = buttery, fluid delay)
  springStiffness: 0.034,      // Elastic restore rate (0.02 - 0.05 = soft, damped return)
  damping: 0.88,               // Velocity damping (0.85 - 0.92 = prevents oscillation)
  rotationReaction: 0.0012,    // How strongly icons tilt away from cursor push
  hoverScaleMax: 1.14,         // Scale multiplier when cursor is directly over icon
  fieldParallaxDesktop: 0.025, // Global field parallax shift factor

  // Autonomous Idle Float (Drift & Wobble)
  idleDriftSpeed: 0.0013,      // Primary floating frequency
  idleDriftAmpX: 14,           // Horizontal drift amplitude in px
  idleDriftAmpY: 10,           // Vertical drift amplitude in px
  idleWobbleAngle: 0.08,       // Rotation wobble in radians (~4.5 degrees)
};

type DepthLayer = "back" | "mid" | "front";

interface ToolIconDefinition {
  name: string;
  path: Path2D;
  hasFill?: boolean;
}

interface ScatteredIcon {
  def: ToolIconDefinition;
  anchorX: number;
  anchorY: number;
  anchorRot: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  baseSize: number;
  currentScaleMult: number;
  targetScaleMult: number;
  baseAlpha: number;
  currentGlow: number;
  lineWidth: number;
  layer: DepthLayer;
  parallaxFactor: number;
  mouseInfluence: number;
  driftFactor: number;
  phase: number;
  color: string;
  hasFill: boolean;
}

/**
 * Creates 25 distinct barber and hair-salon tool SVG Path2D vector objects
 * All icons are centered at (0, 0) with balanced coordinates in [-18, 18].
 */
function createBarberToolPaths(): ToolIconDefinition[] {
  return [
    // 1. Scissors (Open)
    {
      name: "scissors_open",
      path: new Path2D(
        "M -2,0 L 14,-17 Q 15,-18 16,-17 Q 17,-16 16,-15 L 2,1 " +
        "M 2,0 L -14,-17 Q -15,-18 -16,-17 Q -17,-16 -16,-15 L -2,1 " +
        "M -2,1 L -7,10 Q -9,14 -12,14 Q -16,14 -16,10 Q -16,6 -12,6 Q -9,6 -7,10 " +
        "M 2,1 L 7,10 Q 9,14 12,14 Q 16,14 16,10 Q 16,6 12,6 Q 9,6 7,10 " +
        "M 15,10 L 18,12 " +
        "M 0,0.5 m -1.5,0 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0"
      ),
    },

    // 2. Scissors (Closed)
    {
      name: "scissors_closed",
      path: new Path2D(
        "M -1.5,0 L -1,-17 Q 0,-19 1,-17 L 1.5,0 " +
        "M -1.5,0 L -5,9 Q -7,13 -10,13 Q -14,13 -14,9 Q -14,5 -10,5 Q -7,5 -5,9 " +
        "M 1.5,0 L 5,9 Q 7,13 10,13 Q 14,13 14,9 Q 14,5 10,5 Q 7,5 5,9 " +
        "M 13,9 L 16,11 " +
        "M 0,0 m -1.2,0 a 1.2,1.2 0 1,0 2.4,0 a 1.2,1.2 0 1,0 -2.4,0"
      ),
    },

    // 3. Hair Comb (with spine and fine teeth)
    {
      name: "comb",
      path: new Path2D(
        "M -16,-4 C -16,-8 15,-8 16,-4 L 16,-1 C 16,0 15,1 14,1 L -14,1 " +
        "C -15,1 -16,2 -18,5 C -18.5,5.5 -19,5 -18.5,4 C -17,1 -16,-2 -16,-4 Z " +
        "M -12,1 L -12,11 " +
        "M -9,1 L -9,11 " +
        "M -6,1 L -6,11 " +
        "M -3,1 L -3,11 " +
        "M 0,1 L 0,11 " +
        "M 3,1 L 3,11 " +
        "M 6,1 L 6,11 " +
        "M 9,1 L 9,11 " +
        "M 12,1 L 12,11"
      ),
    },

    // 4. Straight Razor (Cut-throat barber razor)
    {
      name: "straight_razor",
      path: new Path2D(
        "M -1,2 L -3,6 C -3.5,7 -4,8 -3.5,9 C -3,10 -2,10 -1.5,9 L 1,4 " +
        "M 0,1 L 5,-12 C 5.5,-13 6,-14 7,-14 L 13,-9 C 13.5,-8.5 13,-7.5 12,-7.5 L 3,3 Z " +
        "M 6,-11 L 11,-7 " +
        "M 0,2 m -1.2,0 a 1.2,1.2 0 1,0 2.4,0 a 1.2,1.2 0 1,0 -2.4,0 " +
        "M 0,2 C -4,7 -8,11 -13,15 C -14,16 -15,15 -14.5,14 C -9.5,10 -5,5 -1,1 " +
        "M -13,14 m -0.8,0 a 0.8,0.8 0 1,0 1.6,0 a 0.8,0.8 0 1,0 -1.6,0"
      ),
    },

    // 5. Electric Hair Clipper / Trimmer
    {
      name: "clipper",
      hasFill: true,
      path: new Path2D(
        "M -6,-7 C -6,-10 6,-10 6,-7 L 7,10 C 7,14 4,16 0,16 C -4,16 -7,14 -7,10 Z " +
        "M -8,-7 L 8,-7 L 9,-11 L -9,-11 Z " +
        "M -8,-11 L -8,-14 L -6,-11 L -4,-14 L -2,-11 L 0,-14 L 2,-11 L 4,-14 L 6,-11 L 8,-14 L 8,-11 " +
        "M -4,2 L 4,2 " +
        "M -4,5 L 4,5 " +
        "M -2,9 L 2,9 L 2,12 L -2,12 Z"
      ),
    },

    // 6. Water Spray Bottle
    {
      name: "spray_bottle",
      hasFill: true,
      path: new Path2D(
        "M -7,-1 C -7,-2 -4,-3 -4,-5 L 4,-5 C 4,-3 7,-2 7,-1 L 8,13 C 8,16 6,17 0,17 C -6,17 -8,16 -8,13 Z " +
        "M -4,-5 L 4,-5 L 4,-7 L -4,-7 Z " +
        "M -4,-7 L -4,-11 C -4,-13 0,-13 4,-11 L 4,-7 " +
        "M -4,-10 L -10,-10 L -10,-8 L -4,-8 " +
        "M -2,-8 C -4,-6 -6,-5 -7,-2 C -7.5,-1 -6.5,-1 -6,-2 C -5,-4 -3,-5 -2,-7"
      ),
    },

    // 7. Barber Pole
    {
      name: "barber_pole",
      path: new Path2D(
        "M 0,-16 m -2.5,0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 " +
        "M -6,-13 L 6,-13 L 5,-11 L -5,-11 Z " +
        "M -5,-11 L -5,11 L 5,11 L 5,-11 " +
        "M -5,-8 L 5,-4 " +
        "M -5,-2 L 5,2 " +
        "M -5,4 L 5,8 " +
        "M -6,13 L 6,13 L 5,11 L -5,11 Z " +
        "M 0,15.5 m -2,0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0"
      ),
    },

    // 8. Hair Dryer
    {
      name: "hair_dryer",
      hasFill: true,
      path: new Path2D(
        "M -14,-7 L -3,-7 C 2,-7 6,-9 6,-4 C 6,1 2,0 -3,0 L -14,0 Z " +
        "M 6,-6 C 8,-6 9,-5 9,-3.5 C 9,-2 8,-1 6,-1 " +
        "M -14,-8 L -14,1 " +
        "M -1,0 L 2,12 C 2.5,14 1.5,15 0,15 C -1,15 -1.5,14 -2,12 L -5,0 " +
        "M 1,15 C 2,17 3,18 2,19"
      ),
    },

    // 9. Round / Paddle Cushion Brush
    {
      name: "paddle_brush",
      path: new Path2D(
        "M 0,-15 C 8,-15 10,-8 10,-2 C 10,4 6,7 3,8 L 2,16 C 2,18 0,19 -1,19 C -2,19 -3,18 -3,16 L -3,8 C -6,7 -10,4 -10,-2 C -10,-8 -8,-15 0,-15 Z " +
        "M 0,-12 C 6,-12 7,-7 7,-2 C 7,3 4,5 0,5 C -4,5 -7,3 -7,-2 C -7,-7 -6,-12 0,-12 Z " +
        "M 0,-8 L 0,-6 M -3,-5 L -3,-3 M 3,-5 L 3,-3 M 0,-2 L 0,0 M -3,1 L -3,3 M 3,1 L 3,3"
      ),
    },

    // 10. Hand Mirror
    {
      name: "hand_mirror",
      hasFill: true,
      path: new Path2D(
        "M 0,-16 C 9,-16 11,-7 11,-1 C 11,5 7,8 3,9 L 2,17 C 2,19 0,20 -1,20 C -2,20 -3,19 -3,17 L -3,9 C -7,8 -11,5 -11,-1 C -11,-7 -9,-16 0,-16 Z " +
        "M 0,-13 C 6.5,-13 8,-6 8,-1 C 8,4 5,6 0,6 C -5,6 -8,4 -8,-1 C -8,-6 -6.5,-13 0,-13 Z " +
        "M 3,-10 L -4,-3"
      ),
    },

    // 11. Salon Sectioning Hair Clip
    {
      name: "hair_clip",
      path: new Path2D(
        "M -15,-2 C -8,-5 8,-6 14,-3 C 15,-2 14,0 13,0 L -15,0 Z " +
        "M -15,1 L 13,1 C 14,1 15,3 14,4 C 8,7 -8,6 -15,3 Z " +
        "M 13,0 C 14,-2 17,-3 18,-2 C 19,-1 18,1 16,1 L 13,1 " +
        "M 13,0 L 13,1"
      ),
    },

    // 12. Shaving Brush & Bowl
    {
      name: "shaving_brush_bowl",
      hasFill: true,
      path: new Path2D(
        "M -6,-17 C -8,-14 -7,-11 -5,-9 L 5,-9 C 7,-11 8,-14 6,-17 C 3,-18 -3,-18 -6,-17 Z " +
        "M -2,-17 L -1,-10 M 2,-17 L 1,-10 " +
        "M -5,-9 C -5,-7 -3,-6 -3,-4 C -5,-2 -5,0 -4,1 L 4,1 C 5,0 5,-2 3,-4 C 3,-6 5,-7 5,-9 Z " +
        "M -12,4 L 12,4 C 12,11 6,14 0,14 C -6,14 -12,11 -12,4 Z " +
        "M -5,14 L -5,16 L 5,16 L 5,14"
      ),
    },

    // 13. Hair Curler / Curling Iron
    {
      name: "curling_iron",
      path: new Path2D(
        "M -15,-15 m -1.5,0 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0 " +
        "M -14,-14 L -1,-1 L 1,1 L -12,-12 Z " +
        "M -13,-11 L -2,0 " +
        "M 0,2 C 1,4 3,4 3,2 " +
        "M 1,1 L 12,12 C 14,14 15,13 14,11 L 3,0 Z"
      ),
    },

    // 14. Salon Drape / Cape
    {
      name: "salon_cape",
      hasFill: true,
      path: new Path2D(
        "M -6,-12 C -3,-14 3,-14 6,-12 L 5,-10 C 2,-11 -2,-11 -5,-10 Z " +
        "M 3,-11 m -1,0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 " +
        "M -5,-10 C -11,-8 -14,-3 -15,8 C -15,12 -12,13 -10,12 C -6,10 6,10 10,12 C 12,13 15,12 15,8 C 14,-3 11,-8 5,-10 " +
        "M -4,-8 C -5,0 -6,6 -7,11 " +
        "M 4,-8 C 5,0 6,6 7,11"
      ),
    },

    // 15. Sparkle & Botanical Accents
    {
      name: "sparkle_accent",
      hasFill: true,
      path: new Path2D(
        "M 0,-13 Q 0,-2 11,-2 Q 0,-2 0,-13 " +
        "M 11,-2 Q 0,-2 0,9 Q 0,-2 11,-2 " +
        "M 0,9 Q 0,-2 -11,-2 Q 0,-2 0,9 " +
        "M -11,-2 Q 0,-2 0,-13 Q 0,-2 -11,-2 " +
        "M 8,8 Q 8,5 11,5 Q 8,5 8,8 Q 8,11 8,8 Q 5,8 8,8"
      ),
    },

    // 16. Double-Edge Safety Razor Blade
    {
      name: "safety_razor_blade",
      hasFill: true,
      path: new Path2D(
        "M -15,-9 L -13,-9 L -13,-7 C -11,-7 -11,-9 -9,-9 L 9,-9 C 9,-7 11,-7 13,-7 L 13,-9 L 15,-9 " +
        "C 16.5,-9 17,-8 17,-6.5 L 17,-2 C 16,-2 15,-1 15,0 C 15,1 16,2 17,2 L 17,6.5 " +
        "C 17,8 16.5,9 15,9 L 13,9 L 13,7 C 11,7 11,9 9,9 L -9,9 C -9,7 -11,7 -13,7 L -13,9 L -15,9 " +
        "C -16.5,9 -17,8 -17,6.5 L -17,2 C -16,2 -15,1 -15,0 C -15,-1 -16,-2 -17,-2 L -17,-6.5 " +
        "C -17,-8 -16.5,-9 -15,-9 Z " +
        "M 0,0 m -2.5,0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 " +
        "M -10,-1 L -3,-1 L -3,1 L -10,1 Z " +
        "M 3,-1 L 10,-1 L 10,1 L 3,1 Z"
      ),
    },

    // 17. Afro Pick / Long-Tooth Beard Styling Comb
    {
      name: "afro_pick",
      hasFill: true,
      path: new Path2D(
        "M -6,4 L -6,15 C -6,17.5 6,17.5 6,15 L 6,4 L 11,4 C 12,4 12,2 11,2 L -11,2 C -12,2 -12,4 -11,4 Z " +
        "M -8,2 L -8,-15 C -8,-16.5 -6.5,-16.5 -6.5,-15 L -6.5,2 " +
        "M -4,2 L -4,-15 C -4,-16.5 -2.5,-16.5 -2.5,-15 L -2.5,2 " +
        "M 0,2 L 0,-15 C 0,-16.5 1.5,-16.5 1.5,-15 L 1.5,2 " +
        "M 4,2 L 4,-15 C 4,-16.5 5.5,-16.5 5.5,-15 L 5.5,2 " +
        "M 8,2 L 8,-15 C 8,-16.5 9.5,-16.5 9.5,-15 L 9.5,2 " +
        "M 0,10 m -1.5,0 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0"
      ),
    },

    // 18. Aerosol Hair Spray Can
    {
      name: "aerosol_hairspray",
      hasFill: true,
      path: new Path2D(
        "M -6,-6 C -6,-8 6,-8 6,-6 L 6,14 C 6,16 4,17 0,17 C -4,17 -6,16 -6,14 Z " +
        "M -4,-8 L 4,-8 L 4,-12 L -4,-12 Z " +
        "M -2,-12 L 2,-12 L 2,-15 L -2,-15 Z " +
        "M 4,-14 L 8,-17 M 5,-13 L 11,-14 M 5,-12 L 9,-9 " +
        "M -6,3 L 6,3"
      ),
    },

    // 19. Hair Pomade / Styling Wax Tin
    {
      name: "pomade_tin",
      hasFill: true,
      path: new Path2D(
        "M -14,2 L -14,8 C -14,13 14,13 14,8 L 14,2 Z " +
        "M 0,-3 m -14,0 a 14,5 0 1,0 28,0 a 14,5 0 1,0 -28,0 " +
        "M 0,-3 m -8,0 a 8,2.8 0 1,0 16,0 a 8,2.8 0 1,0 -16,0"
      ),
    },

    // 20. Flat Iron Hair Straightener
    {
      name: "flat_iron",
      path: new Path2D(
        "M -14,-7 L 7,-3 C 9,-2.5 11,-2 13,-2 C 15,-2 16,-3 15,-4 L -11,-10 C -13,-11 -15,-9 -14,-7 Z " +
        "M 0,-4 L 11,-2 " +
        "M -14,-5 L 7,2 C 9,2.5 11,3 13,3 C 15,3 16,4 15,5 L -11,9 C -13,10 -15,8 -14,6 Z " +
        "M 0,3 L 11,3 " +
        "M -14,-6 m -2,0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 " +
        "M -16,-6 C -18,-6 -19,-3 -18,1 C -17,4 -19,6 -17,9"
      ),
    },

    // 21. Barber Neck Duster Powder Brush
    {
      name: "neck_duster",
      hasFill: true,
      path: new Path2D(
        "M -12,-8 C -15,-15 15,-15 12,-8 C 9,-4 6,-2 4,-1 L -4,-1 C -6,-2 -9,-4 -12,-8 Z " +
        "M -8,-10 L -4,-3 M 0,-12 L 0,-2 M 8,-10 L 4,-3 " +
        "M -4,-1 L 4,-1 L 3,3 L -3,3 Z " +
        "M -3,3 C -2,7 -5,11 -5,14 C -5,16.5 5,16.5 5,14 C 5,11 2,7 3,3 Z"
      ),
    },

    // 22. Classic Handlebar Mustache
    {
      name: "mustache",
      hasFill: true,
      path: new Path2D(
        "M 0,0 C -3,-5 -10,-7 -15,-4 C -18,-2 -17,3 -14,2 C -10,1 -6,2 -3,6 C -1,8 0,8 0,6 " +
        "C 0,8 1,8 3,6 C 6,2 10,1 14,2 C 17,3 18,-2 15,-4 C 10,-7 3,-5 0,0 Z"
      ),
    },

    // 23. Salon Hydraulic Styling Chair
    {
      name: "barber_chair",
      path: new Path2D(
        "M -4,-16 L 4,-16 C 5,-16 5,-14 4,-14 L -4,-14 C -5,-14 -5,-16 -4,-16 Z " +
        "M 0,-14 L 0,-11 " +
        "M -7,-11 L 7,-11 C 8.5,-11 8.5,-3 7,-3 L -7,-3 C -8.5,-3 -8.5,-11 -7,-11 Z " +
        "M -9,-4 L -9,2 L 9,2 L 9,-4 " +
        "M -8,2 L 8,2 C 9,2 9,6 8,6 L -8,6 C -9,6 -9,2 -8,2 Z " +
        "M 0,6 L 0,14 " +
        "M 5,5 L 11,8 L 11,11 L 6,9 " +
        "M -9,14 L 9,14 C 10,14 10,16 9,16 L -9,16 C -10,16 -10,14 -9,14 Z"
      ),
    },

    // 24. Shaving / Aftershave Cream Squeeze Tube
    {
      name: "cream_tube",
      hasFill: true,
      path: new Path2D(
        "M -7,-15 L 7,-15 L 7,-13 L -7,-13 Z " +
        "M -7,-13 L -6,2 C -6,5 -3,7 -3,9 L 3,9 C 3,7 6,5 6,2 L 7,-13 " +
        "M -2.5,9 L 2.5,9 L 2.5,14 L -2.5,14 Z " +
        "M 0,16 C 1,17 1,18 0,19 C -1,18 -1,17 0,16"
      ),
    },

    // 25. Pair of Hairpins / Bobby Pins
    {
      name: "bobby_pin_pair",
      path: new Path2D(
        "M -14,-7 C -16,-7 -17,-5 -16,-4 C -15,-3 -14,-3 -13,-4 " +
        "L -7,-4 C -6,-2 -4,-6 -2,-4 C 0,-2 2,-6 4,-4 C 6,-2 8,-6 10,-4 L 14,-4 C 15.5,-4 15.5,-2 14,-2 " +
        "M -16,-5.5 L 14,-1.5 C 15.5,-1.5 15.5,0.5 14,0.5 " +
        "M -12,4 L 12,8 C 13.5,8.2 13.5,10.2 12,10 L -12,6 C -14,5.8 -14,3.8 -12,4"
      ),
    },
  ];
}

export default function BarberBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isDark = document.documentElement.classList.contains("dark");
    let prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse state with spring-damper delayed interpolation
    const mouse = {
      targetX: -9999,
      targetY: -9999,
      smoothX: -9999,
      smoothY: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      active: false,
    };

    let icons: ScatteredIcon[] = [];
    const toolDefs = createBarberToolPaths();

    /**
     * Scatter icons using a jittered grid with relaxation to ensure organic,
     * non-overlapping coverage across any screen resolution.
     */
    const initScatteredIcons = () => {
      const isMobile = width < 768;
      const targetCount = isMobile
        ? BARBER_CONFIG.iconCountMobile
        : BARBER_CONFIG.iconCountDesktop;

      const palette = isDark ? BARBER_CONFIG.dark : BARBER_CONFIG.light;

      // Determine grid dimensions based on target count and aspect ratio
      const aspect = Math.max(0.5, width / Math.max(1, height));
      let cols = Math.round(Math.sqrt(targetCount * aspect));
      cols = Math.max(3, cols);
      const rows = Math.max(3, Math.ceil(targetCount / cols));
      const totalCells = cols * rows;

      const cellW = width / cols;
      const cellH = height / rows;

      icons = [];

      let defIndex = 0;
      for (let i = 0; i < totalCells && icons.length < targetCount; i++) {
        const c = i % cols;
        const r = Math.floor(i / cols);

        // Layer distribution: 35% back, 45% mid, 20% front
        const randLayer = Math.random();
        let layer: DepthLayer = "mid";
        let baseSize = 42;
        let baseAlpha = 0.18;
        let parallaxFactor = 0.035;
        let mouseInfluence = 1.0;
        let color = palette.midLayerColor;
        let lineWidth = 1.35;
        let hasFill = false;

        if (randLayer < 0.35) {
          layer = "back";
          baseSize = BARBER_CONFIG.sizeMin + Math.random() * 10;
          baseAlpha = BARBER_CONFIG.opacityMin + Math.random() * 0.06;
          parallaxFactor = 0.015;
          mouseInfluence = 0.55;
          color = palette.backLayerColor;
          lineWidth = 1.1;
        } else if (randLayer > 0.80) {
          layer = "front";
          baseSize = 52 + Math.random() * (BARBER_CONFIG.sizeMax - 52);
          baseAlpha = BARBER_CONFIG.opacityMax - Math.random() * 0.08;
          parallaxFactor = 0.065;
          mouseInfluence = 1.45;
          color = palette.frontLayerColor;
          lineWidth = 1.65;
          hasFill = true;
        } else {
          baseSize = 36 + Math.random() * 14;
          baseAlpha = 0.16 + Math.random() * 0.08;
        }

        // Jittered anchor position inside cell with slight padding
        const jitterX = (Math.random() - 0.5) * cellW * 0.65;
        const jitterY = (Math.random() - 0.5) * cellH * 0.65;
        const anchorX = (c + 0.5) * cellW + jitterX;
        const anchorY = (r + 0.5) * cellH + jitterY;
        const anchorRot = (Math.random() - 0.5) * Math.PI * 0.85;

        const def = toolDefs[defIndex % toolDefs.length];
        defIndex++;

        icons.push({
          def,
          anchorX,
          anchorY,
          anchorRot,
          x: anchorX,
          y: anchorY,
          vx: 0,
          vy: 0,
          rot: anchorRot,
          vrot: 0,
          baseSize,
          currentScaleMult: 1,
          targetScaleMult: 1,
          baseAlpha,
          currentGlow: 0,
          lineWidth,
          layer,
          parallaxFactor,
          mouseInfluence,
          driftFactor: 0.7 + Math.random() * 0.6,
          phase: Math.random() * Math.PI * 2,
          color,
          hasFill: hasFill && !!def.hasFill,
        });
      }

      // Relaxation pass to prevent any accidental overlaps
      for (let pass = 0; pass < 3; pass++) {
        for (let a = 0; a < icons.length; a++) {
          for (let b = a + 1; b < icons.length; b++) {
            const i1 = icons[a];
            const i2 = icons[b];
            const dx = i2.anchorX - i1.anchorX;
            const dy = i2.anchorY - i1.anchorY;
            const dist = Math.hypot(dx, dy);
            const minDist = (i1.baseSize + i2.baseSize) * 0.75;
            if (dist < minDist && dist > 0.001) {
              const overlap = (minDist - dist) * 0.5;
              const nx = dx / dist;
              const ny = dy / dist;
              i1.anchorX -= nx * overlap;
              i1.anchorY -= ny * overlap;
              i2.anchorX += nx * overlap;
              i2.anchorY += ny * overlap;
              i1.x = i1.anchorX;
              i1.y = i1.anchorY;
              i2.x = i2.anchorX;
              i2.y = i2.anchorY;
            }
          }
        }
      }

      // Sort icons by layer: back first, mid second, front on top
      icons.sort((a, b) => {
        const order: Record<DepthLayer, number> = { back: 0, mid: 1, front: 2 };
        return order[a.layer] - order[b.layer];
      });
    };

    // Canvas resize handler with DPR cap of 2 for sharp 60fps rendering
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initScatteredIcons();
    };

    handleResize();

    // Debounced resize listener
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onWindowResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        handleResize();
        if (prefersReducedMotion) {
          renderStaticFrame();
        }
      }, 150);
    };
    window.addEventListener("resize", onWindowResize);

    // Watch for dark/light mode toggle
    const themeObserver = new MutationObserver(() => {
      const currentlyDark = document.documentElement.classList.contains("dark");
      if (currentlyDark !== isDark) {
        isDark = currentlyDark;
        // Update icon color assignments
        const palette = isDark ? BARBER_CONFIG.dark : BARBER_CONFIG.light;
        for (const icon of icons) {
          if (icon.layer === "back") icon.color = palette.backLayerColor;
          else if (icon.layer === "front") icon.color = palette.frontLayerColor;
          else icon.color = palette.midLayerColor;
        }
        if (prefersReducedMotion) {
          renderStaticFrame();
        }
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Watch for prefers-reduced-motion change
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        cancelAnimationFrame(animationFrameId);
        renderStaticFrame();
      } else {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };
    motionMediaQuery.addEventListener("change", onMotionChange);

    // Pointer events (smooth mouse tracking with interpolation)
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      if (!mouse.active) {
        mouse.smoothX = e.clientX;
        mouse.smoothY = e.clientY;
        mouse.prevX = e.clientX;
        mouse.prevY = e.clientY;
        mouse.active = true;
      }
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    // Touch events for mobile support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.targetX = touch.clientX;
        mouse.targetY = touch.clientY;
        mouse.smoothX = touch.clientX;
        mouse.smoothY = touch.clientY;
        mouse.prevX = touch.clientX;
        mouse.prevY = touch.clientY;
        mouse.active = true;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.targetX = touch.clientX;
        mouse.targetY = touch.clientY;
        mouse.active = true;
      }
    };

    const onTouchEnd = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Draw the soft deep gradient base behind the icons
    const drawBackgroundBase = () => {
      const palette = isDark ? BARBER_CONFIG.dark : BARBER_CONFIG.light;
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, palette.bgTop);
      bgGrad.addColorStop(1, palette.bgBottom);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle atmospheric emerald radial vignette
      const radialGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      radialGrad.addColorStop(0, palette.vignette);
      radialGrad.addColorStop(0.7, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);
    };

    // Static frame renderer for prefers-reduced-motion users
    const renderStaticFrame = () => {
      drawBackgroundBase();
      const palette = isDark ? BARBER_CONFIG.dark : BARBER_CONFIG.light;

      for (let i = 0; i < icons.length; i++) {
        const icon = icons[i];
        const scale = icon.baseSize / 36;

        ctx.save();
        ctx.translate(icon.anchorX, icon.anchorY);
        ctx.rotate(icon.anchorRot);
        ctx.scale(scale, scale);

        if (icon.hasFill) {
          ctx.fillStyle = hexToRgba(palette.frontLayerColor, 0.05);
          ctx.fill(icon.def.path);
        }

        ctx.strokeStyle = hexToRgba(icon.color, icon.baseAlpha);
        ctx.lineWidth = icon.lineWidth / scale;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke(icon.def.path);
        ctx.restore();
      }
    };

    let lastTime = performance.now();

    // Main 60fps Physics & Render Loop
    const renderLoop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // 1. Mouse interpolation and velocity calculation
      if (mouse.active) {
        mouse.smoothX += (mouse.targetX - mouse.smoothX) * BARBER_CONFIG.mouseLerp;
        mouse.smoothY += (mouse.targetY - mouse.smoothY) * BARBER_CONFIG.mouseLerp;
        mouse.vx = (mouse.smoothX - mouse.prevX);
        mouse.vy = (mouse.smoothY - mouse.prevY);
        mouse.prevX = mouse.smoothX;
        mouse.prevY = mouse.smoothY;
      } else {
        mouse.vx *= 0.92;
        mouse.vy *= 0.92;
      }

      drawBackgroundBase();

      const palette = isDark ? BARBER_CONFIG.dark : BARBER_CONFIG.light;
      const time = currentTime;

      // Global subtle field parallax shift based on cursor
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const mouseNormX = mouse.active ? (mouse.smoothX - centerX) / centerX : 0;
      const mouseNormY = mouse.active ? (mouse.smoothY - centerY) / centerY : 0;

      // 2. Physics update and render for each icon
      for (let i = 0; i < icons.length; i++) {
        const icon = icons[i];

        // Layer-dependent field parallax
        const parallaxX = mouseNormX * icon.parallaxFactor * 45;
        const parallaxY = mouseNormY * icon.parallaxFactor * 45;

        // Autonomous idle drift & wobble
        const idleX =
          Math.sin(time * BARBER_CONFIG.idleDriftSpeed + icon.phase) *
          BARBER_CONFIG.idleDriftAmpX *
          icon.driftFactor;

        const idleY =
          Math.cos(time * BARBER_CONFIG.idleDriftSpeed * 0.85 + icon.phase * 1.3) *
          BARBER_CONFIG.idleDriftAmpY *
          icon.driftFactor;

        const idleRot =
          Math.sin(time * BARBER_CONFIG.idleDriftSpeed * 0.6 + icon.phase) *
          BARBER_CONFIG.idleWobbleAngle *
          icon.driftFactor;

        const targetX = icon.anchorX + parallaxX + idleX;
        const targetY = icon.anchorY + parallaxY + idleY;
        const targetRot = icon.anchorRot + idleRot;

        // Spring restoration force
        let fx = (targetX - icon.x) * BARBER_CONFIG.springStiffness;
        let fy = (targetY - icon.y) * BARBER_CONFIG.springStiffness;
        let frot = (targetRot - icon.rot) * (BARBER_CONFIG.springStiffness * 0.9);

        // Mouse repulsion & aerodynamic wake
        if (mouse.active || Math.abs(mouse.vx) > 0.05 || Math.abs(mouse.vy) > 0.05) {
          const dx = icon.x - mouse.smoothX;
          const dy = icon.y - mouse.smoothY;
          const dist = Math.hypot(dx, dy);
          const radius = BARBER_CONFIG.mouseRadius;

          if (dist < radius) {
            const normDist = 1 - dist / radius;
            const falloff = normDist * normDist; // smooth quadratic falloff

            // Repulsion push away from cursor
            const safeDist = dist + 16;
            const push =
              (BARBER_CONFIG.mouseStrength / safeDist) *
              36 *
              falloff *
              icon.mouseInfluence;

            fx += (dx / safeDist) * push;
            fy += (dy / safeDist) * push;

            // Directional wake from cursor movement
            fx += mouse.vx * 0.28 * falloff * icon.mouseInfluence;
            fy += mouse.vy * 0.28 * falloff * icon.mouseInfluence;

            // Rotational deflection: gently tilts based on push angle
            const pushAngle = Math.atan2(dy, dx);
            const rotForce =
              Math.sin(pushAngle - icon.rot) *
              BARBER_CONFIG.rotationReaction *
              75 *
              falloff *
              icon.mouseInfluence;
            frot += rotForce;

            // Proximity scale & glow boost
            icon.targetScaleMult = 1 + (BARBER_CONFIG.hoverScaleMax - 1) * falloff;
            icon.currentGlow = falloff;
          } else {
            icon.targetScaleMult = 1;
            icon.currentGlow *= 0.94;
          }
        } else {
          icon.targetScaleMult = 1;
          icon.currentGlow *= 0.94;
        }

        // Velocity integration with damping
        icon.vx = (icon.vx + fx) * BARBER_CONFIG.damping;
        icon.vy = (icon.vy + fy) * BARBER_CONFIG.damping;
        icon.vrot = (icon.vrot + frot) * (BARBER_CONFIG.damping * 0.95);

        icon.x += icon.vx;
        icon.y += icon.vy;
        icon.rot += icon.vrot;

        // Smooth scale transition
        icon.currentScaleMult +=
          (icon.targetScaleMult - icon.currentScaleMult) * 0.12;

        // 3. Render icon to canvas
        const finalScale = (icon.baseSize / 36) * icon.currentScaleMult;
        const effectiveAlpha = Math.min(
          0.70,
          icon.baseAlpha + icon.currentGlow * BARBER_CONFIG.proximityGlowBoost
        );

        ctx.save();
        ctx.translate(icon.x, icon.y);
        ctx.rotate(icon.rot);
        ctx.scale(finalScale, finalScale);

        // Soft glow for front layer or proximity hover
        if (icon.currentGlow > 0.08 || icon.layer === "front") {
          ctx.shadowColor = palette.glowColor;
          ctx.shadowBlur = (6 + icon.currentGlow * 14);
        }

        // Soft gradient fill for select front tools
        if (icon.hasFill) {
          ctx.fillStyle = hexToRgba(
            palette.frontLayerColor,
            0.05 + icon.currentGlow * 0.12
          );
          ctx.fill(icon.def.path);
        }

        // Thin elegant outline
        ctx.strokeStyle = hexToRgba(icon.color, effectiveAlpha);
        ctx.lineWidth = icon.lineWidth / finalScale;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke(icon.def.path);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Pause animation when the browser tab is hidden to save battery
    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (!prefersReducedMotion) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Start loop or static frame
    if (prefersReducedMotion) {
      renderStaticFrame();
    } else {
      animationFrameId = requestAnimationFrame(renderLoop);
    }

    // Cleanup all listeners on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      themeObserver.disconnect();
      motionMediaQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}

/**
 * Utility: converts 6-character hex color to rgba string
 */
function hexToRgba(hex: string, alpha: number): string {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
}
