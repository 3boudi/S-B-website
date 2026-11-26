export type AppSceneId =
  | "dashboard"
  | "pos"
  | "queue"
  | "appointments"
  | "reports";

export interface CameraKeyframe {
  /** Normalized playback timestamp in [0, 1] */
  at: number;
  scale: number;
  originX: number; // %
  originY: number; // %
}

export interface MotionCalloutBeat {
  id: string;
  startAt: number; // normalized [0, 1]
  endAt: number; // normalized [0, 1]
  titleKey: string;
  descKey: string;
  tagKey: string;
  accent: "emerald" | "sky" | "amber" | "violet";
}

export interface RealAppVideoScene {
  id: AppSceneId;
  indexLabel: string;
  routeLabel: string;
  videoSrc: string;
  posterSrc: string;
  durationSec: number;
  titleKey: string;
  shortDescKey: string;
  cameraKeyframes: ReadonlyArray<CameraKeyframe>;
  beats: ReadonlyArray<MotionCalloutBeat>;
}

export const REAL_APP_VIDEO_SCENES: ReadonlyArray<RealAppVideoScene> = [
  {
    id: "dashboard",
    indexLabel: "01",
    routeLabel: "salondztech / dashboard",
    videoSrc: "/videos/app-scenes/scene-01-dashboard.mp4",
    posterSrc: "/videos/app-scenes/scene-01-dashboard.webp",
    durationSec: 9.2,
    titleKey: "scenes.dashboard.title",
    shortDescKey: "scenes.dashboard.short",
    cameraKeyframes: [
      { at: 0, scale: 1, originX: 50, originY: 32 },
      { at: 0.22, scale: 1.055, originX: 28, originY: 20 },
      { at: 0.56, scale: 1.04, originX: 38, originY: 64 },
      { at: 0.88, scale: 1.02, originX: 46, originY: 54 },
    ],
    beats: [
      {
        id: "dash-a",
        startAt: 0.04,
        endAt: 0.48,
        titleKey: "scenes.dashboard.beat1Title",
        descKey: "scenes.dashboard.beat1Desc",
        tagKey: "scenes.dashboard.beat1Tag",
        accent: "emerald",
      },
      {
        id: "dash-b",
        startAt: 0.52,
        endAt: 0.96,
        titleKey: "scenes.dashboard.beat2Title",
        descKey: "scenes.dashboard.beat2Desc",
        tagKey: "scenes.dashboard.beat2Tag",
        accent: "sky",
      },
    ],
  },
  {
    id: "pos",
    indexLabel: "02",
    routeLabel: "salondztech / payment",
    videoSrc: "/videos/app-scenes/scene-02-pos.mp4",
    posterSrc: "/videos/app-scenes/scene-02-pos.webp",
    durationSec: 13.0,
    titleKey: "scenes.pos.title",
    shortDescKey: "scenes.pos.short",
    cameraKeyframes: [
      { at: 0, scale: 1, originX: 50, originY: 35 },
      { at: 0.3, scale: 1.05, originX: 44, originY: 36 },
      { at: 0.62, scale: 1.04, originX: 42, originY: 68 },
      { at: 0.82, scale: 1.075, originX: 36, originY: 64 },
    ],
    beats: [
      {
        id: "pos-a",
        startAt: 0.05,
        endAt: 0.55,
        titleKey: "scenes.pos.beat1Title",
        descKey: "scenes.pos.beat1Desc",
        tagKey: "scenes.pos.beat1Tag",
        accent: "emerald",
      },
      {
        id: "pos-b",
        startAt: 0.62,
        endAt: 0.97,
        titleKey: "scenes.pos.beat2Title",
        descKey: "scenes.pos.beat2Desc",
        tagKey: "scenes.pos.beat2Tag",
        accent: "amber",
      },
    ],
  },
  {
    id: "queue",
    indexLabel: "03",
    routeLabel: "salondztech / queue + tv",
    videoSrc: "/videos/app-scenes/scene-03-queue.mp4",
    posterSrc: "/videos/app-scenes/scene-03-queue.webp",
    durationSec: 7.4,
    titleKey: "scenes.queue.title",
    shortDescKey: "scenes.queue.short",
    cameraKeyframes: [
      { at: 0, scale: 1, originX: 50, originY: 45 },
      { at: 0.25, scale: 1.055, originX: 48, originY: 56 },
      { at: 0.6, scale: 1.03, originX: 46, originY: 52 },
      { at: 0.72, scale: 1.0, originX: 50, originY: 50 },
    ],
    beats: [
      {
        id: "queue-a",
        startAt: 0.04,
        endAt: 0.54,
        titleKey: "scenes.queue.beat1Title",
        descKey: "scenes.queue.beat1Desc",
        tagKey: "scenes.queue.beat1Tag",
        accent: "violet",
      },
      {
        id: "queue-b",
        startAt: 0.6,
        endAt: 0.98,
        titleKey: "scenes.queue.beat2Title",
        descKey: "scenes.queue.beat2Desc",
        tagKey: "scenes.queue.beat2Tag",
        accent: "sky",
      },
    ],
  },
  {
    id: "appointments",
    indexLabel: "04",
    routeLabel: "salondztech / appointments",
    videoSrc: "/videos/app-scenes/scene-04-appointments.mp4",
    posterSrc: "/videos/app-scenes/scene-04-appointments.webp",
    durationSec: 6.4,
    titleKey: "scenes.appointments.title",
    shortDescKey: "scenes.appointments.short",
    cameraKeyframes: [
      { at: 0, scale: 1, originX: 50, originY: 38 },
      { at: 0.35, scale: 1.05, originX: 42, originY: 66 },
      { at: 0.66, scale: 1.07, originX: 42, originY: 58 },
    ],
    beats: [
      {
        id: "appt-a",
        startAt: 0.04,
        endAt: 0.52,
        titleKey: "scenes.appointments.beat1Title",
        descKey: "scenes.appointments.beat1Desc",
        tagKey: "scenes.appointments.beat1Tag",
        accent: "sky",
      },
      {
        id: "appt-b",
        startAt: 0.58,
        endAt: 0.98,
        titleKey: "scenes.appointments.beat2Title",
        descKey: "scenes.appointments.beat2Desc",
        tagKey: "scenes.appointments.beat2Tag",
        accent: "emerald",
      },
    ],
  },
  {
    id: "reports",
    indexLabel: "05",
    routeLabel: "salondztech / workers + reports",
    videoSrc: "/videos/app-scenes/scene-05-reports.mp4",
    posterSrc: "/videos/app-scenes/scene-05-reports.webp",
    durationSec: 7.4,
    titleKey: "scenes.reports.title",
    shortDescKey: "scenes.reports.short",
    cameraKeyframes: [
      { at: 0, scale: 1.03, originX: 46, originY: 36 },
      { at: 0.45, scale: 1.0, originX: 50, originY: 48 },
      { at: 0.72, scale: 1.05, originX: 42, originY: 56 },
    ],
    beats: [
      {
        id: "rep-a",
        startAt: 0.04,
        endAt: 0.44,
        titleKey: "scenes.reports.beat1Title",
        descKey: "scenes.reports.beat1Desc",
        tagKey: "scenes.reports.beat1Tag",
        accent: "amber",
      },
      {
        id: "rep-b",
        startAt: 0.5,
        endAt: 0.98,
        titleKey: "scenes.reports.beat2Title",
        descKey: "scenes.reports.beat2Desc",
        tagKey: "scenes.reports.beat2Tag",
        accent: "emerald",
      },
    ],
  },
];

/**
 * Resolves the active camera focal transform for a scene at normalized progress [0..1].
 */
export function resolveCameraPose(
  keyframes: ReadonlyArray<CameraKeyframe>,
  progress: number
): CameraKeyframe {
  if (keyframes.length === 0) {
    return { at: 0, scale: 1, originX: 50, originY: 50 };
  }
  const clamped = Math.max(0, Math.min(1, progress));
  let active = keyframes[0];
  for (const kf of keyframes) {
    if (clamped >= kf.at) {
      active = kf;
    } else {
      break;
    }
  }
  return active;
}
