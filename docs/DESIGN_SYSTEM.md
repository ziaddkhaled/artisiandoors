# ArtisanDoors -- Design System

> Visual identity specification for the ArtisanDoors luxury bespoke door studio.
> All values are extracted from `reference-design.md` and extended to cover all 8 pages.

---

## UI Metaphor: Warm Glassmorphism

The design philosophy is **"Warm Glassmorphism"** -- a marriage of frosted-glass translucency with a warm, organic color palette. The site should feel like browsing a high-end furniture showroom: tactile, understated, and confident. Nothing flashy or corporate. Glass layers create depth and hierarchy without competing with the product imagery. Every surface has a handcrafted quality -- soft edges, gentle gradients, and unhurried animations that convey precision craftsmanship.

**Key principles:**
- Warmth over sterility: cream backgrounds, not pure white
- Depth through translucency, not heavy shadows
- Typography does the heavy lifting: large, confident headings with restrained body text
- Motion that feels deliberate and premium, never playful or bouncy
- Generous whitespace that lets the product breathe

---

## Color Palette

### Core Tokens

| Token | Hex | HSL | Usage |
|-------|-----|-----|-------|
| `--background` | `#f5f4f0` | `hsl(40, 24%, 95%)` | Page background, light sections |
| `--background-accent` | `#e8e6e1` | `hsl(40, 16%, 90%)` | Subtle section differentiation, dividers |
| `--card` | `#ffffff` | `hsl(0, 0%, 100%)` | Card base color (used in gradients) |
| `--foreground` | `#1a1a1a` | `hsl(0, 0%, 10%)` | Primary text, dark section backgrounds |
| `--primary-cta` | `#2c2c2c` | `hsl(0, 0%, 17%)` | Primary buttons, dark accents |
| `--primary-cta-text` | `#f5f4f0` | `hsl(40, 24%, 95%)` | Text on primary buttons |
| `--secondary-cta` | `#f5f4f0` | `hsl(40, 24%, 95%)` | Secondary button background |
| `--secondary-cta-text` | `#1a1a1a` | `hsl(0, 0%, 10%)` | Text on secondary buttons |
| `--accent` | `#8a8a8a` | `hsl(0, 0%, 54%)` | Muted text, labels, placeholders |
| `--muted` | `#6b6b6b` | `hsl(0, 0%, 42%)` | Disabled states, less important text |

### Semantic Colors

| Token | Hex | HSL | Usage |
|-------|-----|-----|-------|
| `--success` | `#3d7a4a` | `hsl(133, 33%, 36%)` | Order confirmation, success states |
| `--success-light` | `#e8f5e9` | `hsl(125, 39%, 93%)` | Success backgrounds |
| `--warning` | `#b8860b` | `hsl(43, 89%, 38%)` | Low stock, price alerts |
| `--warning-light` | `#fef3cd` | `hsl(45, 95%, 90%)` | Warning backgrounds |
| `--error` | `#c0392b` | `hsl(6, 63%, 46%)` | Form errors, destructive actions |
| `--error-light` | `#fdecea` | `hsl(6, 86%, 95%)` | Error backgrounds |
| `--info` | `#2c5f8a` | `hsl(209, 52%, 36%)` | Informational badges, links |
| `--info-light` | `#e3f2fd` | `hsl(207, 89%, 94%)` | Info backgrounds |

### Dark Section Palette

Used for About, Metrics, and Footer sections (inverted context):

| Token | Hex | HSL | Usage |
|-------|-----|-----|-------|
| `--dark-bg` | `#1a1a1a` | `hsl(0, 0%, 10%)` | Dark section background |
| `--dark-text` | `#f5f4f0` | `hsl(40, 24%, 95%)` | Text on dark backgrounds |
| `--dark-muted` | `#a0a0a0` | `hsl(0, 0%, 63%)` | Secondary text on dark backgrounds |
| `--dark-border` | `rgba(245, 244, 240, 0.2)` | -- | Borders/dividers on dark backgrounds |
| `--footer-gradient-start` | `rgba(26, 26, 26, 0.75)` | -- | Footer gradient top |
| `--footer-gradient-end` | `#2c2c2c` | `hsl(0, 0%, 17%)` | Footer gradient bottom |

### Glassmorphic Surfaces

| Surface | Background | Backdrop | Border |
|---------|-----------|----------|--------|
| Card (light bg) | `linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(255,255,255,0.4))` | `blur(8px)` | `1px solid #ffffff` |
| Card (dark bg) | `linear-gradient(to right bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.4))` | `blur(8px)` | `1px solid #ffffff` |
| Nav bar | `linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(255,255,255,0.4))` | `blur(8px)` | `1px solid #ffffff` |
| Input field container | transparent bg, no blur | none | `1px solid #ffffff` |

---

## Typography

### Font Family

- **Primary:** `Nunito`, weight range 200--1000
- **Loading:** `next/font/google` with `display: swap`
- **Fallback stack:** `'Nunito', ui-sans-serif, system-ui, -apple-system, sans-serif`

### Type Scale

All sizes use `clamp()` for fluid scaling between mobile and desktop.

| Token | Min | Preferred | Max | Weight | Line Height | Usage |
|-------|-----|-----------|-----|--------|-------------|-------|
| `--text-xs` | `0.55rem` | `0.7vw` | `0.7rem` | 400 | 1.5 | Fine print, disclaimers |
| `--text-sm` | `0.615rem` | `0.82vw` | `0.82rem` | 400 | 1.5 | Labels, badges, nav links, captions |
| `--text-base` | `0.75rem` | `1vw` | `1rem` | 400 | 1.6 | Body text, descriptions |
| `--text-lg` | `0.875rem` | `1.1vw` | `1.1rem` | 400 | 1.6 | Subheadings, lead paragraphs |
| `--text-xl` | `1rem` | `1.3vw` | `1.3rem` | 500 | 1.4 | Section subheadings |
| `--text-2xl` | `1.25rem` | `1.6vw` | `1.6rem` | 500 | 1.3 | Card titles |
| `--text-3xl` | `1.5rem` | `2vw` | `2rem` | 500 | 1.3 | Section headings (small) |
| `--text-4xl` | `1.75rem` | `2.5vw` | `2.5rem` | 500 | 1.2 | Section headings (medium) |
| `--text-5xl` | `2rem` | `3vw` | `3rem` | 500 | 1.2 | Section headings (large) |
| `--text-7xl` | `3rem` | `4vw` | `4rem` | 500 | 1.1 | Hero heading |
| `--text-9xl` | `5.25rem` | `7vw` | `7rem` | 500 | 1.0 | Metric numbers |

### Letter Spacing

| Context | Value |
|---------|-------|
| Headings (3xl+) | `-0.02em` |
| Body text | `0` |
| Labels / badges | `0.02em` |
| All-caps labels | `0.08em` |

### Font Weights Used

| Weight | Name | Usage |
|--------|------|-------|
| 300 | Light | Subtle labels, disclaimers |
| 400 | Regular | Body text, descriptions, nav links |
| 500 | Medium | Headings, card titles, metric numbers |
| 600 | Semibold | Buttons, emphasis |
| 700 | Bold | Logo text, strong emphasis |

---

## Spacing System

Base unit: **4px**. All spacing follows this scale.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | `4px` / `0.25rem` | Tight internal padding |
| `--space-2` | `8px` / `0.5rem` | Badge padding, small gaps |
| `--space-3` | `12px` / `0.75rem` | Card internal padding (small) |
| `--space-4` | `16px` / `1rem` | Card padding, standard gap |
| `--space-5` | `20px` / `1.25rem` | Between related elements |
| `--space-6` | `24px` / `1.5rem` | Nav top offset, medium gaps |
| `--space-8` | `32px` / `2rem` | Between components |
| `--space-10` | `40px` / `2.5rem` | Section internal spacing |
| `--space-12` | `48px` / `3rem` | Between major sections (mobile) |
| `--space-14` | `56px` / `3.5rem` | Grid gaps |
| `--space-16` | `64px` / `4rem` | Large section gaps |
| `--space-20` | `80px` / `5rem` | Section vertical padding (desktop) |
| `--space-24` | `96px` / `6rem` | Hero area padding |

### Content Width

```css
max-width: clamp(40rem, 80vw, 100rem);
margin-inline: auto;
```

### Section Padding Pattern

```
Light sections: padding-block: 80px (desktop), 48px (mobile)
Dark sections:  padding-block: 80px (desktop), 48px (mobile)
```

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-none` | `0px` | Not used (nothing is sharp) |
| `--radius-sm` | `6px` | Input fields, small chips |
| `--radius-md` | `8px` | Dropdown items, small cards |
| `--radius` | `12px` | Primary radius: cards, buttons, images, badges, nav, modals |
| `--radius-lg` | `16px` | Hero image container, large cards |
| `--radius-xl` | `24px` | Decorative elements |
| `--radius-full` | `9999px` | Circular avatars, pills (when needed) |

**Note:** `12px` is the dominant radius used site-wide. Maintain this consistently across all pages. Only deviate for specific cases documented above.

---

## Shadow System

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,0.05)` | Glass cards (default) |
| `--shadow-sm` | `0 2px 4px rgba(0,0,0,0.08)` | Hovered cards |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.1)` | Dropdowns, elevated cards |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` | Modals, overlays |
| `--shadow-xl` | `0 16px 48px rgba(0,0,0,0.15)` | Cart drawer |
| `--shadow-button` | `inset 0 1px 1px rgba(245,244,240,0.25), 3px 3px 3px rgba(44,44,44,0.15)` | Primary button |
| `--shadow-button-hover` | `inset 0 1px 1px rgba(245,244,240,0.25), 5px 5px 8px rgba(44,44,44,0.2)` | Primary button hover |

---

## Button Styles

### Primary Button

```css
.primary-button {
  background: linear-gradient(to bottom, rgba(44,44,44,0.75), #2c2c2c);
  box-shadow: inset 0 1px 1px rgba(245,244,240,0.25), 3px 3px 3px rgba(44,44,44,0.15);
  border-radius: 12px;
  color: #f5f4f0;
  padding: 10px 16px;
  font-weight: 600;
  font-size: var(--text-sm);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
```

**Structure:** Outer `<button>` with `group` class. Inner layout: text `<span>` + absolutely positioned right area with Lucide `ArrowUpRight` icon (16px). On hover, a dark background panel expands from the right, text color transitions to `--secondary-cta-text` over `900ms` with `cubic-bezier(.77, 0, .18, 1)`.

### Secondary Button

```css
.secondary-button {
  background: var(--secondary-cta);
  color: var(--secondary-cta-text);
  border: 1px solid rgba(26, 26, 26, 0.15);
  border-radius: 12px;
  padding: 10px 16px;
  font-weight: 600;
  font-size: var(--text-sm);
}
```

Hover: border darkens to `rgba(26, 26, 26, 0.3)`, subtle shadow appears.

### Ghost Button (for pagination, minor actions)

```css
.ghost-button {
  background: transparent;
  color: var(--foreground);
  border: 1px solid rgba(26, 26, 26, 0.15);
  border-radius: 12px;
  padding: 8px 14px;
  font-size: var(--text-sm);
}
```

Hover: background fills to `rgba(26, 26, 26, 0.05)`.

---

## Card Styles

### Glass Card (Light Background)

```css
.card {
  position: relative;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background: linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(255,255,255,0.4));
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  border: 1px solid #ffffff;
  border-radius: 12px;
}
```

### Glass Card (Dark Background)

Same gradient and blur, but rendered on `#1a1a1a` background. The white gradient appears more prominent against the dark. Same border, same blur.

### Product Card (Extended)

Glass card base + the following additions:
- Image area: `aspect-ratio: 3/4`, `object-fit: cover`, `border-radius: 12px`, overflow hidden
- Content area: padding `16px`, containing product name, collection badge, and price
- Hover: card lifts slightly with `translateY(-4px)` and shadow increases to `--shadow-sm`

### Cart Item Card

Glass card base, horizontal layout (image left, details right), padding `16px`, with quantity controls right-aligned.

---

## Dark / Light Section Patterns

### Light Sections (Default)

- **Background:** `#f5f4f0`
- **Text:** `#1a1a1a`
- **Cards:** Glass card with white gradient
- **Used on:** Hero, Features, Contact, Shop, Product Detail, Cart, Checkout, About (expanded)

### Dark Sections

- **Background:** `#1a1a1a`
- **Text:** `#f5f4f0`
- **Cards:** Same glass gradient (white), creating high contrast against dark bg
- **Muted text:** `#a0a0a0`
- **Borders:** `rgba(245, 244, 240, 0.2)`
- **Used on:** About (landing), Metrics, Footer

### Page-Level Pattern for Inner Pages

All inner pages (Shop, Product, Cart, Checkout, About, Contact, Order Confirmation) follow:
1. **Page Header:** Light background with large heading + breadcrumbs
2. **Main Content:** Light background
3. **Footer:** Dark gradient (same as landing page)

Exception: The About page may include a dark section for metrics/philosophy, mirroring the landing page pattern.

---

## Motion Tokens

### Philosophy: "Precise and Unhurried"

Animations should feel like the careful, deliberate movements of a master craftsman. Nothing snaps or bounces. Everything glides, reveals, and settles with quiet confidence. Speed should feel natural -- not slow enough to frustrate, not fast enough to feel cheap.

### Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | `150ms` | Micro-interactions (opacity, color shifts) |
| `--duration-normal` | `300ms` | Standard transitions (hover states, small reveals) |
| `--duration-slow` | `500ms` | Section reveals, card animations |
| `--duration-slower` | `700ms` | Page transitions, large element animations |
| `--duration-slowest` | `900ms` | Button hover expansion, nav show/hide |

### Easing Curves

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-default` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | General-purpose ease-out |
| `--ease-smooth` | `cubic-bezier(0.16, 1, 0.3, 1)` | Smooth deceleration for reveals |
| `--ease-button` | `cubic-bezier(0.77, 0, 0.18, 1)` | Button hover expansion (aggressive ease-in-out) |
| `--ease-spring` | Spring: `{ stiffness: 100, damping: 15, mass: 1 }` | Framer Motion spring for bouncy-free settling |
| `--ease-gentle-spring` | Spring: `{ stiffness: 60, damping: 20, mass: 1 }` | Slow, gentle settling for page elements |

### Stagger Timing

| Context | Delay per item |
|---------|---------------|
| Blur characters (hero) | `0.02s` per character |
| Blur words (sections) | `0.04s` per word |
| Card grid items | `0.08s` per card |
| Nav links | `0.05s` per link |
| Form fields appearing | `0.06s` per field |

### Scroll Animation Defaults

- **whileInView trigger threshold:** `amount: 0.3` (30% visible before triggering)
- **Viewport once:** `true` for entrance animations (play once, do not reverse)
- **Blur reveal scroll range:** Scrubbed via `useScroll` with `offset: ["start end", "end start"]`

### Reduced Motion

All motion must respect `prefers-reduced-motion: reduce`. When active:
- Replace all blur/slide animations with simple `opacity: 0 -> 1` fades at `--duration-normal`
- Disable marquee scrolling (show static content)
- Disable sticky card stacking (render as normal flow)
- Remove hover transform effects
- Keep nav hide/show as instant visibility toggle

---

## Responsive Breakpoints

| Name | Min Width | Tailwind | Usage |
|------|-----------|----------|-------|
| Mobile | `0px` | default | Single column, stacked layouts |
| Tablet | `768px` | `md:` | Two-column grids, side-by-side layouts |
| Desktop | `1024px` | `lg:` | Full layouts, sticky cards, hero two-col |
| Wide | `1280px` | `xl:` | Max content width reached, generous spacing |
| Ultra | `1536px` | `2xl:` | Content stays centered, no wider |

### Responsive Behavior Summary

- **Hero:** Two columns on `lg+`, stacked on mobile/tablet
- **Feature cards:** Sticky stacking on `lg+`, normal vertical flow on mobile
- **Product grid:** 1 col mobile, 2 col tablet, 3 col desktop, 4 col wide
- **Contact grid:** 2 cols on `md+`, stacked on mobile
- **Cart layout:** Summary sidebar on `lg+`, stacked below on mobile
- **Checkout:** Form + sidebar on `lg+`, stacked on mobile
- **Navigation:** Full nav on `md+`, hamburger menu on mobile
- **Metric cards:** 1 col mobile, 3 col on `md+`
- **Footer columns:** Stacked on mobile, row on `md+`

---

## Layout Patterns

### Content Container

```css
.container {
  width: 100%;
  max-width: clamp(40rem, 80vw, 100rem);
  margin-inline: auto;
  padding-inline: 16px; /* mobile */
}

@media (min-width: 768px) {
  .container {
    padding-inline: 24px;
  }
}
```

### Section Layout

```css
.section {
  padding-block: 48px; /* mobile */
}

@media (min-width: 1024px) {
  .section {
    padding-block: 80px;
  }
}
```

### Grid Patterns

| Pattern | CSS | Usage |
|---------|-----|-------|
| Two-column equal | `grid grid-cols-1 md:grid-cols-2 gap-4` | Contact, About sections |
| Product grid | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6` | Shop page |
| Sidebar layout | `grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8` | Cart, Checkout |
| Metric row | `grid grid-cols-1 md:grid-cols-3 gap-4` | Metrics section |

---

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--z-base` | `0` | Normal flow |
| `--z-sticky` | `10` | Sticky feature cards |
| `--z-header` | `50` | Fixed navigation |
| `--z-overlay` | `60` | Cart drawer backdrop |
| `--z-drawer` | `70` | Cart drawer panel |
| `--z-modal` | `80` | Modal dialogs |
| `--z-toast` | `90` | Toast notifications |
| `--z-max` | `100` | Navigation bar |
