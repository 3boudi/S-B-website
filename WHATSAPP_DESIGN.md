# WhatsApp UI Design Guidelines

## Context and Goals
**Design Intent**: To deliver an implementation-ready, token-driven UI framework for WhatsApp content sites, ensuring seamless accessibility, rigid design token compliance, and optimized performance for readers and knowledge seekers.

This document serves as the single source of truth for engineering and design teams implementing content sites for the WhatsApp brand.

---

## Design Tokens and Foundations

### 1. Typography
All text must utilize the custom brand typeface `WhatsApp Sans Var`.

| Token | CSS Variable / Value | Description / Fallback |
| :--- | :--- | :--- |
| `font.family.primary` | `var(--font-whatsapp-primary, "WhatsApp Sans Var")` | Primary Brand Typeface |
| `font.family.stack` | `var(--font-whatsapp-stack, "WhatsApp Sans Var", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif)` | Full Font Stack |
| `font.size.base` | `12px` | Base reading font size |
| `font.weight.base` | `400` | Regular weight |
| `font.lineHeight.base` | `16.08px` (1.34) | Base line height |

#### Typography Scale
*   `font.size.xs` = `12px` (Line height: `16.08px`)
*   `font.size.sm` = `16px` (Line height: `22px`)
*   `font.size.md` = `18px` (Line height: `24px`)
*   `font.size.lg` = `48px` (Line height: `56px`)
*   `font.size.xl` = `60px` (Line height: `72px`)
*   `font.size.2xl` = `80px` (Line height: `96px`)

### 2. Color Palette
Colors must be applied using these semantic variables to support contrast compliance under WCAG 2.2 AA.

| Token | Hex Value | Application | Contrast (vs BG) |
| :--- | :--- | :--- | :--- |
| `color.text.primary` | `#1c1e21` | Body text, high-density text on light surfaces | > 4.5:1 |
| `color.text.secondary`| `#ffffff` | Light text on dark surfaces | > 4.5:1 |
| `color.text.tertiary` | `#111b21` | Headings, dark-mode body text | > 7:1 |
| `color.text.inverse`  | `#5e5e5e` | Secondary/muted labels, captions | > 3.0:1 |
| `color.surface.base`  | `#000000` | Deep background, page-level backdrop | Dark Mode base |
| `color.surface.muted` | `#fcf5eb` | Light background accent (warm cream) | Light Mode base |
| `color.surface.raised`| `#25d366` | Accents, CTA buttons, active state surfaces | Brand Green |

### 3. Spacing Scale
Spacing must strictly adhere to the following scale. No custom or fractional margins/paddings are allowed.

*   `space.1` = `12px`
*   `space.2` = `14px`
*   `space.3` = `16px`
*   `space.4` = `18px`
*   `space.5` = `20px`
*   `space.6` = `28px`
*   `space.7` = `32px`
*   `space.8` = `56px`

### 4. Corner Radius
Rounded corners are unified into two tokens to create a modern pill-like aesthetic.

*   `radius.xs` = `25px` (Used for smaller cards, input fields, badge overlays)
*   `radius.sm` = `50px` (Used for standard buttons, high-level container curves)

### 5. Motion
Transitions and animations must feel instant yet natural.

*   `motion.duration.instant` = `330ms` (Applied to all color hover transitions, dropdown collapses, and focus states)

---

## Component-Level Rules

### Page Density Targets
Guidance must support pages exhibiting typical content-site density:
*   **Links**: 73
*   **Cards**: 16
*   **Lists**: 4
*   **Inputs**: 2
*   **Buttons**: 1
*   **Navigation**: 1

---

### Component 1: Action Button (Primary CTA)
**Anatomy**: Text Label (`font.size.sm`), Optional Leading Icon, Container with `radius.sm`.

```
+------------------------------------------+
|  (Icon)  WhatsApp Web / Get Started      |  <- radius.sm (50px)
+------------------------------------------+
```

#### States & Interaction Rules
1.  **Default State**:
    *   Background: `color.surface.raised` (`#25d366`)
    *   Text Color: `color.text.tertiary` (`#111b21`)
2.  **Hover State**:
    *   Background: `#1ebd54` (Darker green brand variant)
    *   Transition: `background-color` over `motion.duration.instant` (`330ms`)
3.  **Focus-Visible State**:
    *   Must show a thick outline: `3px solid color.surface.base` (`#000000`) offset by `2px`.
4.  **Active State**:
    *   Background: `#189d45` (Deepest green brand variant)
    *   Scale: `scale(0.98)`
5.  **Disabled State**:
    *   Background: `#e9e9e9`
    *   Text Color: `color.text.inverse` (`#5e5e5e`)
    *   Pointer-events: `none`
6.  **Loading State**:
    *   Replace text with a rotating spinner using `color.text.tertiary` (`#111b21`). Button width must remain static to prevent layout shift.
7.  **Error State**:
    *   Border flashes with red alert color; clear system message displayed below the button.

#### Responsive & Edge-Case Handling
*   **Long text**: Labels exceeding 30 characters must truncate with an ellipsis (`...`) or wrap if flex constraints permit. Max-width must be constrained to `320px` on mobile displays.
*   **Pointer/Touch**: Target size must remain at least `48px` high to ensure touch targets are easily selectable.

---

### Component 2: Content Card
**Anatomy**: Thumbnail/Image, Category Tag, Header (`font.size.md`), Description text, Action link. Container with `radius.xs`.

#### States & Interaction Rules
1.  **Default State**:
    *   Background: `color.surface.muted` (`#fcf5eb`)
    *   Border: `1px solid rgba(0, 0, 0, 0.05)`
2.  **Hover State**:
    *   Translate: `translateY(-4px)`
    *   Shadow: `0 10px 20px rgba(0, 0, 0, 0.05)`
3.  **Focus-Visible State**:
    *   Outline: `2px solid color.text.primary` around the card wrapper when keyboard-focused.
4.  **Disabled / Empty State**:
    *   If no content is returned, render a muted fallback illustration with description text in `color.text.inverse`.

#### Spacing Tokens
*   Card padding: `space.3` (`16px`)
*   Gap between items in grid: `space.4` (`18px`)

---

### Component 3: Input Field
**Anatomy**: Label, Input Box, Placeholder Text, Inline Validation status. Container with `radius.xs`.

#### States & Interaction Rules
1.  **Default State**:
    *   Background: `color.surface.muted` (`#fcf5eb`)
    *   Border: `1px solid color.text.inverse` (`#5e5e5e`)
2.  **Focus-Visible State**:
    *   Border color: `color.surface.raised` (`#25d366`)
    *   Outline: `2px solid color.surface.raised`
3.  **Error State**:
    *   Border: `1px solid #d93025` (WCAG compliant red)
    *   Error Text shown immediately below: `font.size.xs`, `#d93025`.

---

## Accessibility Requirements & Acceptance Criteria
All implementations must comply with WCAG 2.2 AA requirements.

### Acceptance Criteria:
*   **Contrast Ratio**: All readable text (`color.text.primary`, `color.text.tertiary`) must sustain a contrast of `4.5:1` against their respective backgrounds (`color.surface.muted`, `color.surface.base`).
*   **Keyboard Focus**: Focus indicator must never be hidden or omitted. Focus ring contrast against adjacent background must be `3.0:1` or higher.
*   **Skip Navigation**: Pages with high-density navigation must provide a visible "Skip to main content" link on receiving focus.
*   **ARIA attributes**: Interactive components must have explicit roles (e.g., `role="button"`, `aria-expanded="false"` on menus).

---

## Content and Tone Standards

### Tone of Voice
Our writing must be **concise, confident, and implementation-focused**. Avoid verbose filler text, marketing jargon, and ambiguous call-to-actions.

| Unacceptable (Verbose/Ambiguous) | Acceptable (WhatsApp Tone) |
| :--- | :--- |
| Click here to discover the amazing features we created for you. | Open WhatsApp Web. |
| You might have some missing inputs. Please try verifying them. | Enter a valid email address. |

---

## Anti-Patterns and Prohibited Implementations
*   **No Raw Hex**: Do not write raw hex colors like `color: #25d366` in local component files. Always resolve to var(`--color-surface-raised`).
*   **No Low Contrast**: Avoid putting `color.text.inverse` (`#5e5e5e`) directly on dark background colors.
*   **No One-off Spacings**: Do not introduce unique values such as `padding: 13px` or `margin-top: 25px`. Use spacing tokens.
*   **No Hidden Focus**: Never apply `outline: none` without a custom `:focus-visible` ring override.

---

## QA Checklist

- [ ] Ensure `WhatsApp Sans Var` is imported and loaded correctly.
- [ ] Confirm typography base scales down to exactly `12px` base size.
- [ ] Verify focus ring is fully visible and navigable via keyboard `Tab` keys.
- [ ] Check contrast ratio on all text configurations (must be ≥ 4.5:1).
- [ ] Confirm padding values match the `space.1` through `space.8` scale.
- [ ] Ensure buttons have `radius.sm` (50px) and inputs/cards have `radius.xs` (25px).
- [ ] Confirm transition timings align with `motion.duration.instant` (330ms).
- [ ] Test layout responsiveness under 320px viewport widths.
