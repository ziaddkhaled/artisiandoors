# Reference Design — Landing Page Specification

> This document was generated from the existing ArtisanDoors landing page built on
> webuild.io. It serves as the visual and technical reference for the entire site.
> All pages must match this design language. The designer should extract the design
> system, component patterns, and motion principles from this reference.

---

## Claude Code Prompt: Replicate "ArtisanDoors" Website

Build a single-page, responsive website called "ArtisanDoors" — a luxury bespoke door design studio landing page. Use Next.js (App Router) with Tailwind CSS v4, Lenis smooth scroll, Framer Motion (for scroll-triggered blur animations and all other motion), and react-fast-marquee. The site uses the Nunito font from Google Fonts.

> **Note:** The original reference used GSAP + ScrollTrigger. This project uses
> **Framer Motion** instead — all scroll-triggered animations (including the
> per-character blur-unblur effect) should be implemented with `useScroll`,
> `useTransform`, and `whileInView`. The per-character scroll-scrubbed blur effect
> will require custom code with `useScroll` + `useTransform` but is achievable.

### COLOR PALETTE (CSS Custom Properties)

- `--background`: #f5f4f0 (warm off-white/cream)
- `--card`: #ffffff
- `--foreground`: #1a1a1a (near-black)
- `--primary-cta`: #2c2c2c (dark charcoal)
- `--primary-cta-text`: #f5f4f0
- `--secondary-cta`: #f5f4f0
- `--secondary-cta-text`: #1a1a1a
- `--accent`: #8a8a8a
- `--background-accent`: #e8e6e1

### GLOBAL THEME TOKENS

- Border radius: ~12px (used everywhere: cards, buttons, images, badges)
- Content width: clamp(40rem, 80vw, 100rem) centered with mx-auto
- Font: Nunito (weight range 200-1000), fallback sans-serif
- Font sizes are fluid/clamped (e.g., --text-sm: clamp(0.615rem, 0.82vw, 0.82rem), --text-7xl: clamp(3rem, 4vw, 4rem))
- Body background: #f5f4f0, text color: #1a1a1a

### CARD STYLE (reusable .card class)

```css
.card {
  position: relative;
  backdrop-filter: blur(8px);
  background: linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(255,255,255,0.4));
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  border: 1px solid #ffffff;
}
```

### PRIMARY BUTTON STYLE

```css
.primary-button {
  background: linear-gradient(to bottom, rgba(44,44,44,0.75), #2c2c2c);
  box-shadow: inset 0 1px 1px rgba(245,244,240,0.25), 3px 3px 3px rgba(44,44,44,0.15);
  border-radius: 12px;
  color: #f5f4f0;
}
```

Button structure: An outer `<button>` with group class. Inside: text label (`<span>`) + an absolutely positioned overlay area on the right with a small arrow icon (Lucide arrow-up-right SVG). On hover (md+), the background expands/slides with a 900ms cubic-bezier(.77,0,.18,1) transition, and text color inverts to --secondary-cta-text.

---

## SECTION 1: NAVIGATION (Fixed)

- Position: Fixed at top, z-100, top: 24px, full width
- Inner container: Centered, max content-width, flex row, space-between, align-items: center
- Style: Glass morphism — backdrop-filter: blur(8px), border: 1px solid white, border-radius: 12px, padding ~7px 7px 7px 14px
- Left: Logo text "ArtisanDoors" (bold, ~16px)
- Center: Nav links: Home, About, Features, Contact (~11px, normal weight). Each has a ::after pseudo-element underline (1px solid currentColor, absolute bottom, full width) that animates on hover
- Right: "Get Started" CTA button (primary-button style with arrow icon)
- Scroll behavior: Nav hides on scroll down, shows on scroll up via transform: translateY() with 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) transition

## SECTION 2: HERO

- Full viewport height (h-svh) on desktop, flex centered
- Layout: Two columns (50/50) with ~60px gap

**Left column:**
- Heading: "Entrance to Elegance" — text-7xl (clamp 3rem-4rem), font-weight 500. KEY ANIMATION: Each character is individually wrapped in a `<div class="blur-char">` element. On scroll into view (using Framer Motion useScroll/useTransform or whileInView with Intersection Observer), characters progressively un-blur from blur(~10px) opacity(0) to blur(0) opacity(1) with a staggered delay per character. The blur and opacity are animated via will-change: filter, opacity, transform
- Subheading: "Crafting bespoke door designs tailored to your home's unique character. Excellence in every entry." — text-lg (~1rem), same blur-char animation applied to each word
- CTA Button: "View Our Collection" — primary-button with arrow icon (same hover pattern as nav)
- Avatar group: 5 circular avatar images (48px squares, rounded-12px, overflow hidden) with slight negative margin overlap, followed by "Trusted by 2000+ homeowners" text

**Right column:**
- Image container: .card styled, rounded 12px, padding 16px, max-height 75svh
- Image: Fills container, object-fit: cover, rounded 12px
- Use any architectural door/entrance photo from Unsplash

**Bottom marquee/ticker** (absolute positioned at bottom of hero):
- Uses react-fast-marquee (infinite horizontal scroll, ~52s duration, linear)
- Items: "Sustainable Oak", "Precision Steel", "Hand-Carved", "Architectural Design", "Bespoke Hardware" — repeated
- Each item is a pill/chip: .card style, rounded 12px, border: 1px solid white, padding ~7px 9px, text-sm, horizontal margin ~5px

## SECTION 3: ABOUT

- Background: #1a1a1a (foreground/dark), full width, padding 80px 0
- Content centered with text-center
- Badge: "Our Philosophy" — small pill with .card gradient glass style (white glassmorphism on dark bg), rounded 12px, padding ~2px 7px, text-sm
- Heading: "The Art of Entry" — ~32px, font-weight 500, color #f5f4f0. Apply the same blur-word scroll animation (words unblur as section scrolls into view)
- CTA: "Read Our Story" button — primary-button style with arrow icon

## SECTION 4: FEATURES (Sticky Stacking Cards)

- Padding 80px 0, light background (inherits #f5f4f0)
- Header: "Designed for You" — ~40px, font-weight 500, centered. Below: "Our custom designs transform standard entryways into architectural statements." with blur-word animation
- 3 Feature cards that use CSS position: sticky to create a stacking/overlapping scroll effect:
  - Each card: sticky, top: ~85px (varies slightly per card to create stacking), full content width, height ~75vh, .card glass style with border: 1px solid white, border-radius: 12px
  - Internal layout: flex row, left side has text, right side has image
  - Number badge: 32px circle, primary-button gradient, centered number (1, 2, 3), text-sm, rounded 12px
  - Card 1: "Modern Precision" / "High-performance materials for durability and style." + door entrance photo
  - Card 2: "Artisan Craft" / "Hand-finished details that define true elegance." + wood texture photo
  - Card 3: "Bespoke Finishing" / "Custom glass, hardware, and textures to your taste." + elegant person/door photo

## SECTION 5: METRICS

- Background: #1a1a1a, padding 80px 0
- Header: "Quality in Numbers" — ~40px, font-weight 500, color #f5f4f0, centered. Sub: "Proven performance and satisfaction in every build." — blur-word animation
- 3 metric cards in a row (equal width, ~280px height):
  - Each card: background: linear-gradient(to right bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.4)) (white glass on dark bg), rounded 12px, padding ~14px
  - Large number: "15+", "2000+", "98%" — text-9xl (clamp 5.25rem-7rem), font-weight 500, color #1a1a1a
  - Label below: "Years of Craftsmanship", "Happy Clients", "Referral Rate" — ~13px, positioned at card bottom

## SECTION 6: CONTACT

- Padding 80px 0, light background
- Grid layout: 2 columns, gap ~14px, equal height rows (~520px)

**Left column:** .card glass container, centered content, flex column
- Badge: "Get in touch" — same glass pill as "Our Philosophy"
- Heading: "Start Your Design" — ~32px, blur-word animation
- Subheading: "Consult with our designers and bring your vision to life today." — blur-word animation
- Email form: .card border container (rounded 12px, border: 1px solid white, padding ~2px), flex row:
  - Email input: transparent background, placeholder "Enter your email", no border, text-sm
  - "Sign Up" button: primary-button style with arrow icon
- Disclaimer: "By clicking Sign Up you're confirming that you agree with our Terms and Conditions." — tiny text

**Right column:** Full-height image, object-fit: cover, rounded 12px, overflow hidden

## SECTION 7: FOOTER

- Background: linear-gradient(rgba(26,26,26,0.75), #2c2c2c) — dark gradient
- Padding: 60px 0
- Color: #f5f4f0 for all text
- Layout: Top area = flex row between:
  - Left: "ArtisanDoors" brand text (bold, ~24px)
  - Right: Two link columns:
    - "Company": About, Features
    - "Support": Contact, FAQ
- Divider: 1px top border rgba(245,244,240, 0.2)
- Bottom: "2024 ArtisanDoors. All rights reserved." left, "Privacy Policy" right

---

## ANIMATIONS & INTERACTIONS SUMMARY

- **Blur-char/word scroll reveal:** Characters or words start fully blurred (filter: blur(~10px), opacity: 0) and progressively sharpen to blur(0), opacity: 1 as user scrolls them into view. Uses will-change: filter, opacity, transform. Implement with Framer Motion whileInView with staggered delays, or useScroll + useTransform for scroll-scrubbed versions.
- **Marquee ticker:** Infinite horizontal scroll using react-fast-marquee, ~52s per loop, linear, seamless repeat.
- **Sticky stacking cards:** Feature cards use position: sticky with incrementing top values so they stack on top of each other as user scrolls.
- **Navbar hide/show:** transform: translateY(-100%) / translateY(0) with 900ms ease-out transition triggered by scroll direction detection.
- **CTA button hover:** On hover, an inner dark background expands/translates, text color transitions from light to dark over 900ms with cubic-bezier(.77,0,.18,1).
- **Nav link underline:** ::after pseudo-element, absolute bottom, 1px height, bg-current, appears on hover with width transition.
- **Smooth scroll:** Use Lenis for smooth scroll behavior across the entire page.

---

## IMAGE ASSETS

Use free Unsplash/Pexels images of:
- Luxury/architectural entrance doors
- Wood texture close-up
- Modern minimalist house entrances
- Japanese-style house entrances
- Elegant doorways

For the avatar group, use 5 small square images (doors/architecture thumbnails).

---

## TECH STACK

- Next.js 14+ (App Router)
- Tailwind CSS v4
- Google Fonts: Nunito (weight 200-1000)
- Framer Motion (for all animations including scroll-triggered blur effects)
- Lenis (smooth scroll)
- react-fast-marquee (ticker)
- Lucide React (arrow-up-right icon)
