// True 2:1 orthographic isometric projection & geometry helpers
// Coordinate system:
//   x: 0..10 (top-left -> bottom-right axis, toward the barber mirror wall)
//   y: 0..10 (top-right -> bottom-left axis, toward the entrance doors)
//   z: vertical height upwards (0 = salon floor)

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Point2D {
  x: number;
  y: number;
}

export interface IsoBoxFaces {
  top: string;
  left: string;
  right: string;
  outline: string;
}

export const SCENE_WIDTH = 820;
export const SCENE_HEIGHT = 620;

export const ISO_CONFIG = {
  originX: 382,
  originY: 232,
  tileW: 34,
  tileH: 17,
  tileZ: 27,
} as const;

/**
 * Projects a 3D isometric world coordinate (x, y, z) to 2D SVG canvas coordinates.
 */
export function iso(x: number, y: number, z = 0): Point2D {
  return {
    x: Number((ISO_CONFIG.originX + (x - y) * ISO_CONFIG.tileW).toFixed(2)),
    y: Number(
      (
        ISO_CONFIG.originY +
        (x + y) * ISO_CONFIG.tileH -
        z * ISO_CONFIG.tileZ
      ).toFixed(2)
    ),
  };
}

/**
 * Converts a 2D SVG pixel coordinate into exact percentage CSS positioning for HTML HUD overlays.
 */
export function screenPercent(sx: number, sy: number): { left: string; top: string } {
  return {
    left: `${((sx / SCENE_WIDTH) * 100).toFixed(3)}%`,
    top: `${((sy / SCENE_HEIGHT) * 100).toFixed(3)}%`,
  };
}

/**
 * Converts a projected 3D coordinate into percentage CSS positioning for HTML HUD overlays.
 */
export function isoPercent(x: number, y: number, z = 0): { left: string; top: string } {
  const pt = iso(x, y, z);
  return screenPercent(pt.x, pt.y);
}

/**
 * Converts an array of 3D world coordinates into an SVG polygon/path string.
 */
export function isoPath(points: ReadonlyArray<Vec3>, close = true): string {
  if (points.length === 0) return "";
  const projected = points.map((p) => iso(p.x, p.y, p.z));
  const segments = projected.map((p, idx) => `${idx === 0 ? "M" : "L"}${p.x} ${p.y}`);
  return close ? `${segments.join(" ")} Z` : segments.join(" ");
}

/**
 * Computes the three visible faces (top, front-left, front-right) of an axis-aligned 3D isometric box
 * starting at (x, y, z) with dimensions (dx, dy, dz).
 */
export function isoBox(
  x: number,
  y: number,
  z: number,
  dx: number,
  dy: number,
  dz: number
): IsoBoxFaces {
  const p001: Vec3 = { x, y, z: z + dz };
  const p101: Vec3 = { x: x + dx, y, z: z + dz };
  const p111: Vec3 = { x: x + dx, y: y + dy, z: z + dz };
  const p011: Vec3 = { x, y: y + dy, z: z + dz };

  const p100: Vec3 = { x: x + dx, y, z };
  const p110: Vec3 = { x: x + dx, y: y + dy, z };
  const p010: Vec3 = { x, y: y + dy, z };

  return {
    top: isoPath([p001, p101, p111, p011]),
    left: isoPath([p011, p111, p110, p010]),
    right: isoPath([p101, p111, p110, p100]),
    outline: isoPath([p001, p101, p100, p110, p010, p011]),
  };
}

/**
 * Returns painter's-algorithm depth key (larger values draw closer to viewer / on top).
 */
export function isoDepth(x: number, y: number, z = 0): number {
  return x + y + z * 0.01;
}

/**
 * Smoothly interpolates a 3D coordinate along a multi-segment waypoint path for t in [0, 1].
 */
export function lerpPath(waypoints: ReadonlyArray<Vec3>, rawT: number): Vec3 {
  if (waypoints.length === 0) return { x: 0, y: 0, z: 0 };
  if (waypoints.length === 1) return waypoints[0];

  const t = Math.max(0, Math.min(1, rawT));
  const segLengths: number[] = [];
  let totalLength = 0;

  for (let i = 0; i < waypoints.length - 1; i++) {
    const a = waypoints[i];
    const b = waypoints[i + 1];
    const len = Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
    segLengths.push(len);
    totalLength += len;
  }

  if (totalLength === 0) return waypoints[0];

  const targetDist = t * totalLength;
  let traversed = 0;

  for (let i = 0; i < segLengths.length; i++) {
    const segLen = segLengths[i];
    if (traversed + segLen >= targetDist || i === segLengths.length - 1) {
      const localT = segLen === 0 ? 0 : (targetDist - traversed) / segLen;
      const a = waypoints[i];
      const b = waypoints[i + 1];
      return {
        x: a.x + (b.x - a.x) * localT,
        y: a.y + (b.y - a.y) * localT,
        z: a.z + (b.z - a.z) * localT,
      };
    }
    traversed += segLen;
  }

  return waypoints[waypoints.length - 1];
}

/**
 * Converts a 3D polyline into an unclosed SVG path string.
 */
export function isoWirePath(points: ReadonlyArray<Vec3>): string {
  return isoPath(points, false);
}
