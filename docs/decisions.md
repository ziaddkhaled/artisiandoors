# ArtisanDoors — Project Decisions

> Confirmed by the client on 2026-03-30. This is the source of truth for all technology decisions.

## Project Type
- **Genre:** E-commerce (demo build)
- **Scenario:** Scenario A (Custom CMS) in demo mode — production-quality frontend, mock backend
- **Scope:** 8 pages with full user flows, no real integrations

## Tech Stack

| Layer | Tool | Version/Notes |
|-------|------|---------------|
| Framework | Next.js 15 | App Router, Server Components, file-based routing |
| Language | TypeScript | Strict mode, all files `.ts`/`.tsx` |
| Styling | Tailwind CSS v4 | CSS-first config (`@theme` block in `global.css`, no JS config) |
| UI Primitives | Radix Primitives | Unstyled accessibility primitives (Dialog, DropdownMenu, etc.) |
| Components | Fully custom | Hand-built on Radix, styled with Tailwind, premium feel |
| Animation | Framer Motion | Blur-char/word scroll reveals, page transitions, micro-interactions |
| Smooth Scroll | Lenis | Smooth scroll behavior across all pages |
| Marquee | react-fast-marquee | Hero ticker |
| Icons | Lucide React | Tree-shakeable, consistent icon set |
| Font | Nunito (next/font/google) | Weight range 200-1000, display: swap |
| Forms | React Hook Form + Zod | Schema validation on checkout, contact, and email forms |
| Data Layer | Mock data in TypeScript | Typed product arrays, collections, no database |
| Cart State | React Context + localStorage | Client-side persistence, no server required |
| Images | Unsplash/Pexels URLs | Free stock images — no client assets provided |

## Explicitly NOT Included

| Feature | Reason |
|---------|--------|
| Database (PostgreSQL, Prisma) | Demo build — mock data only |
| tRPC / API routes | No backend needed |
| Authentication (Clerk) | Not needed |
| Payments (Stripe) | Demo mode — styled placeholder only |
| Image hosting (Cloudinary) | Using Unsplash/Pexels URLs |
| Internationalization (next-intl) | English only |
| Email sending (Resend) | Not needed |
| CMS / Admin panel | Not needed |
| Deployment config | Not requested |

## Pages

1. **Landing Page (Home)** — Per `docs/reference-design.md` specification exactly
2. **Shop / Catalog** — Product grid, filtering, sorting, pagination
3. **Product Detail** — Gallery, customization options, dynamic pricing, add to cart
4. **Cart** — Item list, quantity controls, order summary
5. **Checkout (Demo)** — Shipping form, demo payment placeholder, place order
6. **Order Confirmation** — Success message, order number, summary
7. **About** — Expanded brand story, craftsmanship philosophy
8. **Contact** — Contact form, business info, map placeholder

## Design Language

All pages must match the design system defined in `docs/reference-design.md`:
- Warm cream palette (`#f5f4f0` background, `#1a1a1a` foreground)
- Glassmorphic cards (backdrop-blur, gradient white backgrounds)
- Blur-word/char scroll animations (Framer Motion)
- Nunito typography
- 12px border radius throughout
- Primary button with gradient and hover animation
- Lenis smooth scroll on all pages

## Mock Data Requirements

- 6-12 door products with realistic names, descriptions, prices
- 3-4 collections/categories (e.g., Modern, Classic, Artisan, Heritage)
- Customization options per product: material, finish, size, hardware style
- Price modifiers based on selected options
- Unsplash/Pexels image URLs for all product images
