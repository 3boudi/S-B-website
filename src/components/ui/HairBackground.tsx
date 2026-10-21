"use client";

import React, { useEffect, useRef } from "react";

/**
 * HAIR_CONFIG
 * Central configuration for the interactive green hair strands background.
 * Adjust these values to tweak appearance, physics, and interaction feel.
 */
export const HAIR_CONFIG = {
  // Density & Geometry
  strandCountDesktop: 160,       // Total strands on desktop displays
  strandCountMobile: 70,         // Reduced count on mobile (<768px) for 60fps performance
  nodesPerStrand: 8,             // Physics segments per strand (7-9 gives silky smooth curves)
  baseStrandWidth: 1.3,          // Base line thickness in px
  strandWidthVariation: 0.9,     // Random width variance per strand

  // Colors: Dark Theme (Deep obsidian base, glowing emerald, forest, vivid green, and mint)
  dark: {
    bgTop: "#05160e",            // Very dark emerald base at top
    bgBottom: "#020705",         // Near-black base at bottom
    rootColor: "#064e3b",        // Deep emerald at root
    midColor1: "#047857",        // Forest green
    midColor2: "#10b981",        // Vivid green
    tipColor: "#6ee7b7",         // Mint green tip
    sheenColor: "#d1fae5",       // Soft glossy highlight sheen
  },

  // Colors: Light Theme (Soft cream base with elegant jade & emerald ribbons)
  light: {
    bgTop: "#f9fcf9",            // Creamy mint base
    bgBottom: "#f2f8f4",         // Soft wash
    rootColor: "#064e3b",        // Emerald
    midColor1: "#047857",        // Forest
    midColor2: "#10b981",        // Vivid green
    tipColor: "#34d399",         // Mint
    sheenColor: "#6ee7b7",       // Light sheen
  },

  // Mouse & Touch Physics
  mouseRadius: 280,              // Radius of cursor influence in pixels (200-300px)
  mouseStrength: 45,             // Maximum repulsion displacement
  mouseVelocityWeight: 0.50,     // Directional aerodynamic wake from cursor movement
  mouseLerp: 0.085,              // Interpolation smoothing (0.06 - 0.12 = buttery, fluid delay)
  springStiffness: 0.036,        // Elastic restore rate (lower = softer, silkier return)
  damping: 0.89,                 // Velocity damping (prevents harsh oscillation)

  // Autonomous Ambient Sway (Wind Currents)
  idleSwaySpeed: 0.0014,         // Primary breathing rate
  idleSwayAmplitude: 28,         // Primary wave horizontal amplitude in pixels
  idleSecondarySpeed: 0.0022,    // Harmonizing wave speed
  idleSecondaryAmp: 12,          // Harmonizing wave amplitude

  // Specular Glossy Sheen
  sheenSpeed: 0.0016,            // Speed of the traveling light sheen wave down the strands
  sheenWidth: 0.18,              // Relative width of the highlight zone [0..1]
};

interface StrandNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  restX: number;
  restY: number;
}

interface Strand {
  nodes: StrandNode[];
  rootX: number;
  rootY: number;
  length: number;
  baseCurvature: number;
  phase: number;
  sheenPhase: number;
  lineWidth: number;
  layer: "back" | "mid" | "front";
  alphaMultiplier: number;
  mouseInfluence: number;
  colorVariation: number;
}

export default function HairBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isDark = document.documentElement.classList.contains("dark");
    let prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Viewport dimensions
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse state with spring-like delayed interpolation
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

    let strands: Strand[] = [];

    // Helper: generate hair strands across the top and upper edges
    const initStrands = () => {
      const isMobile = width < 768;
      const totalCount = isMobile
        ? HAIR_CONFIG.strandCountMobile
        : HAIR_CONFIG.strandCountDesktop;

      strands = [];

      for (let i = 0; i < totalCount; i++) {
        // Distribute layers: 35% back (soft/deep), 45% mid (body), 20% front (glossy/fast)
        const randLayer = Math.random();
        let layer: "back" | "mid" | "front" = "mid";
        let alphaMultiplier = 0.65;
        let mouseInfluence = 1.0;
        let widthFactor = 1.0;

        if (randLayer < 0.35) {
          layer = "back";
          alphaMultiplier = isDark ? 0.40 : 0.28;
          mouseInfluence = 0.55;
          widthFactor = 0.85;
        } else if (randLayer > 0.80) {
          layer = "front";
          alphaMultiplier = isDark ? 0.95 : 0.85;
          mouseInfluence = 1.35;
          widthFactor = 1.30;
        }

        // Horizontal distribution spanning slightly wider than viewport (-10% to +110%)
        const spreadRatio = (i + Math.random() * 0.8) / totalCount;
        const rootX = -width * 0.08 + spreadRatio * (width * 1.16);
        const rootY = -20 + (Math.random() - 0.5) * 30;

        // Strand length: reaches down past the viewport
        const length = height * (1.05 + Math.random() * 0.35);
        const baseCurvature = (Math.random() - 0.5) * 0.5; // Natural wave tilt
        const phase = Math.random() * Math.PI * 2;
        const sheenPhase = Math.random() * Math.PI * 2;

        const lineWidth =
          (HAIR_CONFIG.baseStrandWidth +
            Math.random() * HAIR_CONFIG.strandWidthVariation) *
          widthFactor;

        // Build nodes along the strand
        const nodes: StrandNode[] = [];
        const numNodes = HAIR_CONFIG.nodesPerStrand;

        for (let j = 0; j < numNodes; j++) {
          const progress = j / (numNodes - 1);
          // Initial relaxed S-curve
          const initialWave =
            Math.sin(progress * Math.PI * 1.5 + phase) * (30 * progress);
          const initialX = rootX + baseCurvature * progress * 80 + initialWave;
          const initialY = rootY + progress * length;

          nodes.push({
            x: initialX,
            y: initialY,
            vx: 0,
            vy: 0,
            restX: initialX,
            restY: initialY,
          });
        }

        strands.push({
          nodes,
          rootX,
          rootY,
          length,
          baseCurvature,
          phase,
          sheenPhase,
          lineWidth,
          layer,
          alphaMultiplier,
          mouseInfluence,
          colorVariation: (Math.random() - 0.5) * 0.15, // Micro shade variation
        });
      }

      // Sort strands so back layer renders first, front layer renders on top
      strands.sort((a, b) => {
        const order = { back: 0, mid: 1, front: 2 };
        return order[a.layer] - order[b.layer];
      });
    };

    // Resize canvas with devicePixelRatio cap of 2 for sharp 60fps
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

      initStrands();
    };

    handleResize();

    // Debounced resize observer
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

    // Touch events for mobile
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

    // Render single static frame for reduced motion users
    const renderStaticFrame = () => {
      drawBackgroundBase();
      const palette = isDark ? HAIR_CONFIG.dark : HAIR_CONFIG.light;
      const numNodes = HAIR_CONFIG.nodesPerStrand;

      for (let i = 0; i < strands.length; i++) {
        const s = strands[i];
        // Draw elegant resting curve
        ctx.beginPath();
        ctx.moveTo(s.nodes[0].restX, s.nodes[0].restY);
        for (let j = 1; j < numNodes - 1; j++) {
          const xc = (s.nodes[j].restX + s.nodes[j + 1].restX) * 0.5;
          const yc = (s.nodes[j].restY + s.nodes[j + 1].restY) * 0.5;
          ctx.quadraticCurveTo(s.nodes[j].restX, s.nodes[j].restY, xc, yc);
        }
        ctx.quadraticCurveTo(
          s.nodes[numNodes - 1].restX,
          s.nodes[numNodes - 1].restY,
          s.nodes[numNodes - 1].restX,
          s.nodes[numNodes - 1].restY
        );

        const grad = ctx.createLinearGradient(
          s.nodes[0].restX,
          s.nodes[0].restY,
          s.nodes[numNodes - 1].restX,
          s.nodes[numNodes - 1].restY
        );
        grad.addColorStop(0, hexToRgba(palette.rootColor, 0.4 * s.alphaMultiplier));
        grad.addColorStop(0.4, hexToRgba(palette.midColor1, 0.65 * s.alphaMultiplier));
        grad.addColorStop(0.75, hexToRgba(palette.midColor2, 0.85 * s.alphaMultiplier));
        grad.addColorStop(1, hexToRgba(palette.tipColor, 0.95 * s.alphaMultiplier));

        ctx.strokeStyle = grad;
        ctx.lineWidth = s.lineWidth;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    };

    // Draw the soft deep gradient base behind the hair
    const drawBackgroundBase = () => {
      const palette = isDark ? HAIR_CONFIG.dark : HAIR_CONFIG.light;
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, palette.bgTop);
      bgGrad.addColorStop(1, palette.bgBottom);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle atmospheric emerald radial vignette
      const radialGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.25,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      if (isDark) {
        radialGrad.addColorStop(0, "rgba(16, 185, 129, 0.08)");
        radialGrad.addColorStop(0.6, "rgba(4, 120, 87, 0.03)");
        radialGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        radialGrad.addColorStop(0, "rgba(16, 185, 129, 0.05)");
        radialGrad.addColorStop(0.6, "rgba(110, 231, 183, 0.02)");
        radialGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      }
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);
    };

    let lastTime = performance.now();

    // Main 60fps Physics & Render Loop
    const renderLoop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // 1. Mouse smoothing (lerp) & velocity calculation
      if (mouse.active) {
        mouse.smoothX += (mouse.targetX - mouse.smoothX) * HAIR_CONFIG.mouseLerp;
        mouse.smoothY += (mouse.targetY - mouse.smoothY) * HAIR_CONFIG.mouseLerp;
        mouse.vx = (mouse.smoothX - mouse.prevX) * 0.8;
        mouse.vy = (mouse.smoothY - mouse.prevY) * 0.8;
        mouse.prevX = mouse.smoothX;
        mouse.prevY = mouse.smoothY;
      } else {
        mouse.vx *= 0.92;
        mouse.vy *= 0.92;
      }

      drawBackgroundBase();

      const palette = isDark ? HAIR_CONFIG.dark : HAIR_CONFIG.light;
      const numNodes = HAIR_CONFIG.nodesPerStrand;
      const time = currentTime;

      // 2. Physics update and render for each strand
      for (let i = 0; i < strands.length; i++) {
        const strand = strands[i];

        // Layer-dependent ambient wind sway
        const layerWindMult =
          strand.layer === "back" ? 0.7 : strand.layer === "front" ? 1.25 : 1.0;

        const sway1 =
          Math.sin(time * HAIR_CONFIG.idleSwaySpeed + strand.phase) *
          HAIR_CONFIG.idleSwayAmplitude *
          layerWindMult;

        const sway2 =
          Math.cos(
            time * HAIR_CONFIG.idleSecondarySpeed + strand.phase * 1.4
          ) *
          HAIR_CONFIG.idleSecondaryAmp *
          layerWindMult;

        const totalSway = sway1 + sway2;

        // Node 0 is fixed at root
        strand.nodes[0].x = strand.rootX;
        strand.nodes[0].y = strand.rootY;

        for (let j = 1; j < numNodes; j++) {
          const node = strand.nodes[j];
          const progress = j / (numNodes - 1); // 0 at root, 1 at tip

          // Target equilibrium position (natural relaxed S-curve with ambient wave)
          const targetX =
            strand.rootX +
            strand.baseCurvature * progress * 80 +
            totalSway * Math.pow(progress, 1.2);
          const targetY = strand.rootY + progress * strand.length;

          // Spring restoration force
          const springK = HAIR_CONFIG.springStiffness * (1 - progress * 0.25);
          let fx = (targetX - node.x) * springK;
          let fy = (targetY - node.y) * springK;

          // Mouse interaction (repulsion + aerodynamic dragging wake)
          if (mouse.active || Math.abs(mouse.vx) > 0.1 || Math.abs(mouse.vy) > 0.1) {
            const dx = node.x - mouse.smoothX;
            const dy = node.y - mouse.smoothY;
            const dist = Math.hypot(dx, dy);
            const radius = HAIR_CONFIG.mouseRadius;

            if (dist < radius) {
              // Smooth quadratic falloff
              const normDist = 1 - dist / radius;
              const falloff = normDist * normDist;

              // Repulsion (hair parts softly around cursor)
              const safeDist = dist + 12;
              const pushX =
                (dx / safeDist) *
                HAIR_CONFIG.mouseStrength *
                falloff *
                strand.mouseInfluence;
              const pushY =
                (dy / safeDist) *
                HAIR_CONFIG.mouseStrength *
                0.4 *
                falloff *
                strand.mouseInfluence;

              // Aerodynamic wake (hair flows in cursor direction)
              const wakeX =
                mouse.vx *
                HAIR_CONFIG.mouseVelocityWeight *
                falloff *
                strand.mouseInfluence;
              const wakeY =
                mouse.vy *
                HAIR_CONFIG.mouseVelocityWeight *
                falloff *
                strand.mouseInfluence;

              fx += pushX + wakeX;
              fy += pushY + wakeY;
            }
          }

          // Catenary continuity: gentle pull from parent node (delivers silky trailing lag)
          const parent = strand.nodes[j - 1];
          const pdx = parent.x - node.x;
          const pdy = parent.y - node.y;
          const pDist = Math.hypot(pdx, pdy);
          const idealDist = strand.length / (numNodes - 1);
          if (pDist > 0.001) {
            const stretch = (pDist - idealDist) / pDist;
            fx += pdx * stretch * 0.18;
            fy += pdy * stretch * 0.18;
          }

          // Velocity integration with damping
          node.vx = (node.vx + fx) * HAIR_CONFIG.damping;
          node.vy = (node.vy + fy) * HAIR_CONFIG.damping;
          node.x += node.vx;
          node.y += node.vy;
        }

        // 3. Draw smooth spline curve through node midpoints
        ctx.beginPath();
        ctx.moveTo(strand.nodes[0].x, strand.nodes[0].y);

        for (let j = 1; j < numNodes - 1; j++) {
          const xc = (strand.nodes[j].x + strand.nodes[j + 1].x) * 0.5;
          const yc = (strand.nodes[j].y + strand.nodes[j + 1].y) * 0.5;
          ctx.quadraticCurveTo(strand.nodes[j].x, strand.nodes[j].y, xc, yc);
        }

        const lastNode = strand.nodes[numNodes - 1];
        const secondLastNode = strand.nodes[numNodes - 2];
        ctx.quadraticCurveTo(
          secondLastNode.x,
          secondLastNode.y,
          lastNode.x,
          lastNode.y
        );

        // Traveling glossy specular sheen (like sunlight sliding down silky combed hair)
        const sheenProgress =
          Math.sin(time * HAIR_CONFIG.sheenSpeed + strand.sheenPhase) * 0.5 + 0.5;

        const grad = ctx.createLinearGradient(
          strand.nodes[0].x,
          strand.nodes[0].y,
          lastNode.x,
          lastNode.y
        );

        const a = strand.alphaMultiplier;
        const sheenPeak = Math.max(0.08, Math.min(0.92, sheenProgress));
        const sheenHalfWidth = HAIR_CONFIG.sheenWidth * 0.5;
        const sheenStart = Math.max(0.02, sheenPeak - sheenHalfWidth);
        const sheenEnd = Math.min(0.98, sheenPeak + sheenHalfWidth);

        const stops: { offset: number; color: string }[] = [
          { offset: 0, color: hexToRgba(palette.rootColor, 0.35 * a) },
          { offset: 0.35, color: hexToRgba(palette.midColor1, 0.65 * a) },
          { offset: 0.70, color: hexToRgba(palette.midColor2, 0.80 * a) },
          { offset: 1, color: hexToRgba(palette.tipColor, 0.95 * a) },
          { offset: sheenStart, color: hexToRgba(palette.midColor2, 0.75 * a) },
          { offset: sheenPeak, color: hexToRgba(palette.sheenColor, 0.98 * a) },
          { offset: sheenEnd, color: hexToRgba(palette.midColor2, 0.75 * a) },
        ];

        stops.sort((s1, s2) => s1.offset - s2.offset);

        for (let sIdx = 0; sIdx < stops.length; sIdx++) {
          grad.addColorStop(stops[sIdx].offset, stops[sIdx].color);
        }

        ctx.strokeStyle = grad;
        ctx.lineWidth = strand.lineWidth;
        ctx.lineCap = "round";
        ctx.stroke();
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

    // Cleanup on unmount
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
