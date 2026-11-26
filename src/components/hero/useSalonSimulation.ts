"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { lerpPath, type Vec3 } from "./isoMath";

export interface ChairState {
  id: number;
  ticketNumber: number;
  progress: number; // 0..100
  speed: number; // progress % per second
  clientColor: string;
  barberColor: string;
  justCompletedAt: number;
}

export interface DataPacket {
  id: number;
  kind: "whatsapp_in" | "whatsapp_out" | "tv_sync" | "receipt_out";
  progress: number; // 0..1
  durationMs: number;
  startedAt: number;
}

export interface WalkingActor {
  id: number;
  kind: "arriving" | "to_chair" | "checkout";
  color: string;
  progress: number; // 0..1
  durationMs: number;
  startedAt: number;
  waypoints: ReadonlyArray<Vec3>;
}

export interface FloatingEvent {
  id: number;
  kind: "revenue" | "stock" | "loyalty";
  value: string;
  anchor: Vec3;
  createdAt: number;
}

export interface SalonSimulationState {
  tickNow: number;
  dailyRevenue: number;
  waitingCount: number;
  nextTicketNumber: number;
  chairs: [ChairState, ChairState, ChairState];
  waitingColors: string[];
  packets: DataPacket[];
  actors: WalkingActor[];
  events: FloatingEvent[];
  whatsappPulseAt: number;
  tvPulseAt: number;
  printerPulseAt: number;
  activeWhatsappMsg: "booking" | "confirmed" | "receipt";
}

export const PASTEL_CLIENT_PALETTE = [
  "#93c5fd", // soft sky
  "#c4b5fd", // soft lavender
  "#fdba74", // soft peach
  "#f9a8d4", // soft rose
  "#86efac", // soft mint
  "#fde047", // soft butter
  "#67e8f9", // soft cyan
] as const;

// Elevated WhatsApp Client (high UP ABOVE salon roof) -> Reception PC downward signal arc
export const WHATSAPP_TO_PC_PATH: ReadonlyArray<Vec3> = [
  { x: 1.55, y: -3.45, z: 2.85 },
  { x: 2.05, y: -1.45, z: 2.65 },
  { x: 2.55, y: 1.45, z: 1.65 },
];

export const PC_TO_WHATSAPP_PATH: ReadonlyArray<Vec3> = [
  { x: 2.55, y: 1.45, z: 1.65 },
  { x: 2.25, y: -1.25, z: 2.9 },
  { x: 1.55, y: -3.45, z: 2.85 },
];

export const PC_TO_TV_PATH: ReadonlyArray<Vec3> = [
  { x: 2.95, y: 1.35, z: 1.68 },
  { x: 5.2, y: 0.65, z: 2.05 },
  { x: 7.45, y: 0.35, z: 1.85 },
];

const ENTRANCE_TO_BENCH_PATH: ReadonlyArray<Vec3> = [
  { x: 3.1, y: 11.2, z: 0 },
  { x: 3.1, y: 9.0, z: 0 },
  { x: 3.75, y: 5.5, z: 0 },
  { x: 3.1, y: 2.9, z: 0 },
  { x: 2.15, y: 4.7, z: 0 },
];

const CHAIR_Y_COORDS = [3.1, 5.6, 8.1] as const;

function getBenchToChairPath(chairIndex: number): ReadonlyArray<Vec3> {
  const cy = CHAIR_Y_COORDS[chairIndex] ?? 5.6;
  return [
    { x: 2.1, y: 5.1, z: 0 },
    { x: 4.8, y: Math.min(cy, 6.2), z: 0 },
    { x: 7.5, y: cy, z: 0 },
  ];
}

function getChairToExitPath(chairIndex: number): ReadonlyArray<Vec3> {
  const cy = CHAIR_Y_COORDS[chairIndex] ?? 5.6;
  return [
    { x: 7.4, y: cy, z: 0 },
    { x: 4.8, y: Math.max(2.9, cy - 1.2), z: 0 },
    { x: 3.0, y: 2.75, z: 0 },
    { x: 3.5, y: 7.4, z: 0 },
    { x: 3.1, y: 11.1, z: 0 },
  ];
}

function createInitialState(): SalonSimulationState {
  return {
    tickNow: 0,
    dailyRevenue: 21500,
    waitingCount: 4,
    nextTicketNumber: 4,
    chairs: [
      {
        id: 0,
        ticketNumber: 1,
        progress: 78,
        speed: 8.2,
        clientColor: PASTEL_CLIENT_PALETTE[0],
        barberColor: "#25d366",
        justCompletedAt: 0,
      },
      {
        id: 1,
        ticketNumber: 2,
        progress: 44,
        speed: 6.8,
        clientColor: PASTEL_CLIENT_PALETTE[1],
        barberColor: "#10b981",
        justCompletedAt: 0,
      },
      {
        id: 2,
        ticketNumber: 3,
        progress: 16,
        speed: 7.5,
        clientColor: PASTEL_CLIENT_PALETTE[2],
        barberColor: "#059669",
        justCompletedAt: 0,
      },
    ],
    waitingColors: [
      PASTEL_CLIENT_PALETTE[3],
      PASTEL_CLIENT_PALETTE[4],
      PASTEL_CLIENT_PALETTE[5],
      PASTEL_CLIENT_PALETTE[6],
    ],
    packets: [],
    actors: [],
    events: [],
    whatsappPulseAt: 0,
    tvPulseAt: 0,
    printerPulseAt: 0,
    activeWhatsappMsg: "booking",
  };
}

export function useSalonSimulation(
  containerRef: React.RefObject<HTMLElement | null>,
  reducedMotion: boolean
) {
  const [sim, setSim] = useState<SalonSimulationState>(createInitialState);

  const idCounterRef = useRef(100);
  const colorCursorRef = useRef(0);
  const lastWhatsappAutoRef = useRef(0);
  const isVisibleRef = useRef(true);

  const nextId = useCallback(() => {
    idCounterRef.current += 1;
    return idCounterRef.current;
  }, []);

  const nextColor = useCallback(() => {
    const color =
      PASTEL_CLIENT_PALETTE[colorCursorRef.current % PASTEL_CLIENT_PALETTE.length];
    colorCursorRef.current += 1;
    return color;
  }, []);

  // Pause simulation automatically when hero scrolls out of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  // Continuous closed-loop simulation
  useEffect(() => {
    if (reducedMotion) return;

    let rafId = 0;
    let lastTick = performance.now();
    let lastRender = lastTick;
    let tabHidden = typeof document !== "undefined" && document.hidden;
    lastWhatsappAutoRef.current = lastTick - 5200;

    const onVisibilityChange = () => {
      tabHidden = document.hidden;
      if (!tabHidden) {
        lastTick = performance.now();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const step = (now: number) => {
      rafId = window.requestAnimationFrame(step);

      if (!isVisibleRef.current || tabHidden) {
        lastTick = now;
        return;
      }

      if (now - lastRender < 42) return;
      const dtSec = Math.min(0.12, (now - lastTick) / 1000);
      lastTick = now;
      lastRender = now;

      const shouldAutoWhatsapp = now - lastWhatsappAutoRef.current > 7600;
      if (shouldAutoWhatsapp) {
        lastWhatsappAutoRef.current = now;
      }

      setSim((prev) => {
        let dailyRevenue = prev.dailyRevenue;
        let waitingCount = prev.waitingCount;
        let nextTicketNumber = prev.nextTicketNumber;
        let tvPulseAt = prev.tvPulseAt;
        let printerPulseAt = prev.printerPulseAt;
        let whatsappPulseAt = prev.whatsappPulseAt;
        let activeWhatsappMsg = prev.activeWhatsappMsg;
        let waitingColors = prev.waitingColors;

        const packets = prev.packets
          .map((p) => {
            if (now < p.startedAt) return p;
            return {
              ...p,
              progress: (now - p.startedAt) / p.durationMs,
            };
          })
          .filter((p) => p.progress <= 1.02);

        const actors = prev.actors
          .map((a) => {
            if (now < a.startedAt) return a;
            return {
              ...a,
              progress: (now - a.startedAt) / a.durationMs,
            };
          })
          .filter((a) => a.progress <= 1.0);

        const events = prev.events.filter((e) => now - e.createdAt < 2400);

        const nextChairs = prev.chairs.map((chair, idx) => {
          const updatedProgress = chair.progress + chair.speed * dtSec;
          if (updatedProgress < 100) {
            return { ...chair, progress: updatedProgress };
          }

          const servicePrice = idx === 1 ? 2000 : 1500;
          dailyRevenue += servicePrice;
          printerPulseAt = now;
          tvPulseAt = now;
          activeWhatsappMsg = "receipt";

          const incomingColor = waitingColors[0] ?? nextColor();
          const newBenchColor = nextColor();
          waitingColors = [...waitingColors.slice(1), newBenchColor];
          waitingCount = Math.max(3, Math.min(4, waitingCount));

          const assignedTicket = nextTicketNumber;
          nextTicketNumber = nextTicketNumber >= 99 ? 4 : nextTicketNumber + 1;

          actors.push({
            id: nextId(),
            kind: "checkout",
            color: chair.clientColor,
            progress: 0,
            durationMs: 3600,
            startedAt: now,
            waypoints: getChairToExitPath(idx),
          });
          actors.push({
            id: nextId(),
            kind: "to_chair",
            color: incomingColor,
            progress: 0,
            durationMs: 2100,
            startedAt: now + 250,
            waypoints: getBenchToChairPath(idx),
          });

          packets.push(
            {
              id: nextId(),
              kind: "tv_sync",
              progress: 0,
              durationMs: 900,
              startedAt: now,
            },
            {
              id: nextId(),
              kind: "receipt_out",
              progress: 0,
              durationMs: 1200,
              startedAt: now + 350,
            }
          );

          // Placed cleanly in open air over each station — never colliding with static pills
          events.push(
            {
              id: nextId(),
              kind: "revenue",
              value: `+${servicePrice.toLocaleString("en-US")}`,
              anchor: { x: 2.35, y: 1.5, z: 2.35 },
              createdAt: now,
            },
            {
              id: nextId(),
              kind: "stock",
              value: "-1",
              anchor: { x: 4.9, y: 0.45, z: 2.55 },
              createdAt: now + 260,
            }
          );

          return {
            ...chair,
            ticketNumber: assignedTicket,
            progress: 0,
            clientColor: incomingColor,
            justCompletedAt: now,
          };
        }) as [ChairState, ChairState, ChairState];

        if (shouldAutoWhatsapp) {
          const arrivalColor = nextColor();
          whatsappPulseAt = now;
          tvPulseAt = now + 900;
          activeWhatsappMsg = "booking";
          waitingCount = Math.min(4, waitingCount + 1);
          waitingColors = [...waitingColors.slice(0, 3), arrivalColor];

          packets.push(
            {
              id: nextId(),
              kind: "whatsapp_in",
              progress: 0,
              durationMs: 1150,
              startedAt: now,
            },
            {
              id: nextId(),
              kind: "whatsapp_out",
              progress: 0,
              durationMs: 1050,
              startedAt: now + 950,
            },
            {
              id: nextId(),
              kind: "tv_sync",
              progress: 0,
              durationMs: 900,
              startedAt: now + 850,
            }
          );

          actors.push({
            id: nextId(),
            kind: "arriving",
            color: arrivalColor,
            progress: 0,
            durationMs: 4200,
            startedAt: now + 450,
            waypoints: ENTRANCE_TO_BENCH_PATH,
          });
        }

        if (
          activeWhatsappMsg === "booking" &&
          whatsappPulseAt > 0 &&
          now - whatsappPulseAt > 1250 &&
          now - whatsappPulseAt < 3800
        ) {
          activeWhatsappMsg = "confirmed";
        }

        return {
          tickNow: now,
          dailyRevenue,
          waitingCount,
          nextTicketNumber,
          chairs: nextChairs,
          waitingColors,
          packets: packets.slice(-8),
          actors: actors.slice(-4),
          events: events.slice(-4),
          whatsappPulseAt,
          tvPulseAt,
          printerPulseAt,
          activeWhatsappMsg,
        };
      });
    };

    rafId = window.requestAnimationFrame(step);
    return () => {
      window.cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [nextColor, nextId, reducedMotion]);

  return {
    sim,
    lerpActor: (actor: WalkingActor) => lerpPath(actor.waypoints, actor.progress),
    lerpPacket: (packet: DataPacket) => {
      const path =
        packet.kind === "whatsapp_in"
          ? WHATSAPP_TO_PC_PATH
          : packet.kind === "tv_sync"
          ? PC_TO_TV_PATH
          : PC_TO_WHATSAPP_PATH;
      return lerpPath(path, Math.max(0, Math.min(1, packet.progress)));
    },
  };
}
