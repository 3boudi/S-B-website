// ============================================
// TV PAIRING CODEC — Stateless 4-Digit LAN Pairing
// ============================================
// Exact mirror of barber/tvPairingCodec.cjs.
// Decodes a 4-digit numeric code (1000-9635) into the salon PC's local Wi-Fi URL
// with zero backend database and zero HTTPS->HTTP Mixed Content fetch calls.

export const SUBNET_PREFIXES = [
  '192.168.1',   // 0  - Algérie Télécom / TP-Link / D-Link / Fiber
  '192.168.0',   // 1  - D-Link / TP-Link / Netgear
  '192.168.100', // 2  - Huawei Fiber ONT
  '192.168.8',   // 3  - Huawei 4G LTE / Mobilis / Djezzy / Ooredoo
  '192.168.2',   // 4  - Secondary / Belkin
  '192.168.43',  // 5  - Android Hotspot
  '192.168.10',  // 6  - Office / Mikrotik
  '192.168.31',  // 7  - Xiaomi Mi Router
  '192.168.50',  // 8  - Asus Router
  '192.168.137', // 9  - Windows Mobile Hotspot / ICS
  '192.168.4',   // 10 - Secondary AP
  '192.168.11',  // 11 - Access Point
  '192.168.15',  // 12 - Modem / Bridge
  '10.0.0',      // 13 - Enterprise / LAN
  '10.0.1',      // 14 - Enterprise / LAN
  '10.1.1',      // 15 - Enterprise / LAN
  '172.20.10',   // 16 - iPhone Hotspot
] as const;

const BASE_CODE = 1000;
const HOSTS_PER_SUBNET = 254;
export const MAX_PAIRING_CODE = BASE_CODE + SUBNET_PREFIXES.length * 2 * HOSTS_PER_SUBNET - 1;

export interface DecodedTvTarget {
  ip: string;
  port: number;
  url: string;
}

export function normalizeDigits(raw: string): string {
  return String(raw || '')
    .replace(/[\u0660-\u0669]/g, (ch) => String(ch.charCodeAt(0) - 0x0660))
    .replace(/[\u06F0-\u06F9]/g, (ch) => String(ch.charCodeAt(0) - 0x06F0))
    .replace(/\D/g, '');
}

export function decodePairingCode(codeInput: string): DecodedTvTarget | null {
  const clean = normalizeDigits(codeInput);
  if (clean.length !== 4) return null;

  const num = parseInt(clean, 10);
  const maxOffset = SUBNET_PREFIXES.length * 2 * HOSTS_PER_SUBNET;
  const offset = num - BASE_CODE;
  if (Number.isNaN(offset) || offset < 0 || offset >= maxOffset) return null;

  const slot = Math.floor(offset / HOSTS_PER_SUBNET);
  const lastOctet = (offset % HOSTS_PER_SUBNET) + 1;
  const subnetIdx = Math.floor(slot / 2);
  const port = slot % 2 === 1 ? 4747 : 80;
  const prefix = SUBNET_PREFIXES[subnetIdx];
  if (!prefix) return null;

  const ip = `${prefix}.${lastOctet}`;
  const url = port === 80 ? `http://${ip}` : `http://${ip}:${port}`;
  return { ip, port, url };
}

/**
 * Normalizes a manual LAN IP/host entry (e.g. "192.168.1.20", "192.168.1.20:4747", "salontv.local")
 * into a safe http:// URL, rejecting invalid hosts or non-HTTP schemes.
 */
export function normalizeManualUrl(raw: string): string | null {
  const trimmed = String(raw || '').trim();
  if (!trimmed) return null;

  const withoutScheme = trimmed.replace(/^https?:\/\//i, '').split('/')[0];
  if (!withoutScheme || /[^a-zA-Z0-9.:-]/.test(withoutScheme)) return null;

  const [host, portStr] = withoutScheme.split(':');
  if (!host) return null;

  if (portStr !== undefined) {
    const portNum = parseInt(portStr, 10);
    if (Number.isNaN(portNum) || portNum < 1 || portNum > 65535) return null;
  }

  const isLocalHost =
    /^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.|127\.0\.0\.1$)/.test(host) ||
    /^[a-zA-Z0-9-]+\.local$/i.test(host);

  if (!isLocalHost) return null;

  return portStr ? `http://${host}:${portStr}` : `http://${host}`;
}
