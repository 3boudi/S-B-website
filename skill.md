---
name: sheymss-design-system
description: Use this skill whenever building, styling, reviewing, or extending ANY UI in the SHEYMSS project — pages, components, forms, modals, navigation, or button interactions. It defines the full design token system, component styling rules, and the mandatory click-sound ("Click Voice") interaction pattern that must be present on every clickable element in the software.
---

<role>
You are an expert frontend engineer and UI/UX designer implementing the SHEYMSS design system. Before writing or editing any UI code:

- Identify the current stack (assumed default: React + Tailwind CSS + shadcn/ui, `base: "base"`). If the project uses something else, translate the tokens below into that stack's idioms — the colors, spacing, and sound rules stay identical regardless of framework.
- Centralize every color, radius, and shadow value as a token (CSS variable or Tailwind theme extension) — never hardcode a hex value inline in a component.
- Never ship a clickable element (button, icon button, tab, toggle, nav link, modal action) without wiring it to the Click Voice sound utility defined below. This is a hard requirement, not a nice-to-have.
- Match existing folder structure and naming conventions already present in the codebase rather than inventing new patterns.
- Leave the codebase cleaner and more consistent than you found it.
</role>

# SHEYMSS Design Skill

## 1. Design Philosophy

SHEYMSS is a **modern beauty-editorial** interface: monochrome confidence borrowed straight from the wordmark, warmed up by a single precise accent of pink. It should feel premium, calm, and precise — closer to a high-end salon reception desk than a generic SaaS dashboard.

- **Vibe**: Elegant, minimal, confident, feminine-premium, salon/beauty-industry appropriate.
- **Contrast-first**: The interface lives in black and white. Pink is never a background flood — it's a signal. It appears only on hover, active, and selected states, which makes those states feel deliberate and satisfying.
- **Quiet ornamentation**: Thin strokes, generous whitespace, no heavy drop shadows or busy gradients.
- **Tactile feedback**: Every interaction — visual and audible — confirms itself immediately. Hover shifts to pink. Clicks make a sound. Nothing feels dead or unresponsive.

## 2. Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `--sheymss-ink` | `#0E0E0E` | Logo black — primary text, primary button background, icons |
| `--sheymss-white` | `#FFFFFF` | Base app background |
| `--sheymss-white-soft` | `#FAF9F8` | Card / section background, subtle separation from base |
| `--sheymss-pink` | `#F3A8C6` | **Beauty Pink** — the accent. Used on hover, focus, active, selected states |
| `--sheymss-pink-deep` | `#E589AE` | Pressed / hover-on-pink state (e.g. hovering a pink button) |
| `--sheymss-border` | `#EAE7E4` | Dividers, card borders, input borders |
| `--sheymss-muted` | `#6F6F6F` | Secondary/helper text |

```css
:root {
  --sheymss-ink: #0E0E0E;
  --sheymss-white: #FFFFFF;
  --sheymss-white-soft: #FAF9F8;
  --sheymss-pink: #F3A8C6;
  --sheymss-pink-deep: #E589AE;
  --sheymss-border: #EAE7E4;
  --sheymss-muted: #6F6F6F;
}
```

```js
// tailwind.config.js (extend, don't override, existing theme)
theme: {
  extend: {
    colors: {
      ink: "#0E0E0E",
      "beauty-pink": "#F3A8C6",
      "beauty-pink-deep": "#E589AE",
      stone: "#EAE7E4",
    },
  },
}
```

**Rule**: Beauty Pink is the *only* color allowed to appear on `:hover`, `:focus`, and `[data-state=active]` across the entire app. If a component's hover state isn't pink, it's not following the design system.

## 3. Typography

- **Headings**: An elegant, high-contrast serif that echoes the wordmark's Didone character — **"Bodoni Moda"** or **"Playfair Display"** (Google Fonts). Weight 600–700. Use for page titles, section headers, empty-state headlines.
- **Body / UI text**: A clean, legible sans — **"Inter"** or **"Work Sans"**. Weight 400/500. This is a working software product, not a marketing site — body text must stay highly legible at small sizes (forms, tables, dense salon-scheduling views).
- **Scale**: Headings large and confident (`text-3xl`–`text-5xl`), body conservative (`text-sm`–`text-base`) since this is dense operational software, not an editorial page.

## 4. Radius & Shapes

- Buttons: `rounded-full` (pill) for primary actions.
- Cards, modals, inputs: `rounded-2xl` (16px) — soft but not overly organic; this is functional software, not a lifestyle brand site.
- Icon buttons: `rounded-full`.
- Border weight: `1px` solid `--sheymss-border`, never heavier.

## 5. Shadows

Soft, diffused, ink-tinted — never pure black drop shadows.

```css
--shadow-sm: 0 2px 4px -1px rgba(14, 14, 14, 0.05);
--shadow-md: 0 8px 16px -4px rgba(14, 14, 14, 0.06);
--shadow-lg: 0 20px 32px -8px rgba(14, 14, 14, 0.10);
```

## 6. Click Voice — Mandatory Sound Feedback

Every clickable element in the software plays a short, soft click tone on interaction. This is generated in-browser (no audio asset to ship) using the Web Audio API, so it works identically in web and Electron builds.

```js
// lib/clickVoice.js
let audioCtx;
let muted = false; // wire this to a user setting, see below

export function setClickVoiceMuted(value) {
  muted = value;
}

export function playClickVoice(volume = 0.12) {
  if (muted || typeof window === "undefined") return;
  audioCtx ??= new (window.AudioContext || window.webkitAudioContext)();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(1100, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(500, audioCtx.currentTime + 0.05);

  gain.gain.setValueAtTime(volume, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.09);

  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.09);
}
```

**Wire it once, centrally — not per-component.** If the project uses shadcn/ui, patch the shared `Button` component so every button in the app gets the sound automatically:

```jsx
// components/ui/button.jsx (shadcn base — extend, don't duplicate)
import { playClickVoice } from "@/lib/clickVoice";

const Button = React.forwardRef(({ onClick, ...props }, ref) => {
  const handleClick = (e) => {
    playClickVoice();
    onClick?.(e);
  };
  return <button ref={ref} onClick={handleClick} {...props} />;
});
```

Apply the same pattern to any other clickable primitive that doesn't go through `Button` — icon buttons, tabs, toggle switches, checkboxes, table row actions, modal confirm/cancel.

**Non-negotiable details**:
- Keep volume low (`0.10`–`0.15`) — this will be clicked hundreds of times a day at a salon front desk. It should never become annoying or feel like a game.
- Add a **mute toggle** in app settings (`setClickVoiceMuted`) — persist the preference (localStorage / SQLite settings table).
- Never let sounds stack on rapid double-clicks — the `audioCtx` singleton pattern above naturally handles this since each call is a fresh short-lived oscillator.
- Sound is a *supplement* to visual feedback, never a replacement — hover/active states must still work with sound muted.

## 7. Component Styling

**Primary Button**
- Background `--sheymss-ink`, text white, `rounded-full`, uppercase, `tracking-wide`, `text-sm`.
- Hover → background `--sheymss-pink`, text stays white or shifts to `--sheymss-ink` (pick one and apply consistently).
- Active/pressed → `--sheymss-pink-deep`.
- `duration-300 ease-out` transition on background-color.

**Secondary Button**
- Transparent background, `1px` border `--sheymss-ink`, text `--sheymss-ink`.
- Hover → border and text shift to `--sheymss-pink`.

**Cards**
- Background `--sheymss-white-soft` or white, `rounded-2xl`, border `--sheymss-border` or none + `shadow-sm`.
- Hover (if interactive) → `-translate-y-0.5` + `shadow-md`, border tints toward `--sheymss-pink`.

**Inputs**
- Underlined (`border-b`) or pill-shaped with `--sheymss-white-soft` fill.
- Focus → ring/border shifts to `--sheymss-pink`, no default browser blue.

**Navigation / Tabs**
- Active tab indicator and active nav link use `--sheymss-pink`, not the ink color — ink is reserved for default/idle state.

**Icons**
- Lucide React, `stroke-width={1.5}`, default `--sheymss-ink`, `--sheymss-pink` on hover/active.

## 8. Animation

- Standard transitions: `duration-300 ease-out` for color/border shifts (hover states must feel instant, not sluggish, since this is operational software).
- Card lifts / modal entrances: `duration-500 ease-out`.
- Respect `prefers-reduced-motion` — disable translate/scale transforms (but keep color transitions and Click Voice, since those aren't motion).

## 9. Accessibility Checklist

- Focus rings: visible `--sheymss-pink` ring, `2px`, with offset — never remove focus outlines without replacing them.
- Color contrast: ink-on-white and white-on-ink both pass AA; verify pink-on-white text contrast before using pink for body text (use it for accents/borders/icons instead if it fails).
- Click Voice must be independently mutable and must never be the *only* indicator of a successful action — always pair with a visual state change.

## 10. Implementation Checklist for the Agent

1. Add the color tokens (Section 2) to the project's theme config or `:root`.
2. Add `lib/clickVoice.js` (Section 6) and a settings entry for mute state.
3. Patch the shared `Button` (and any other clickable primitives) to call `playClickVoice()`.
4. Apply hover-pink rule (Section 2's non-negotiable rule) across existing components — audit and fix any hover state that isn't currently pink.
5. Update typography to the serif/sans pairing in Section 3 for headings vs. body respectively.
