# ArtisanDoors — Luxury Bespoke Door Studio

## Overview
ArtisanDoors is a luxury bespoke door design studio that sells custom-crafted doors.
The website is a full e-commerce experience: customers browse collections, view
individual door products with customization options, add to cart, and place orders.

This is a **demo build** — the full frontend, user flows, and UI are built to
production quality, but no real payment processing, Shopify, or third-party
integrations are wired up. Checkout and order flows use demo/mock mode.

## Target Audience
- Homeowners investing in premium home upgrades
- Interior designers and architects sourcing custom doors
- High-end property developers

## Brand Tone
Luxury, minimal, warm. The design conveys craftsmanship and precision — not flashy,
not corporate. Think high-end furniture brand, not generic e-commerce.

## Design Reference
A complete visual and technical specification of the landing page exists in
`docs/reference-design.md`. This file describes every section, component, animation,
color, and interaction in detail — equivalent to a Figma handoff.

**The entire site must match this design language exactly.** All pages beyond the
landing page (shop, product detail, cart, checkout, etc.) must extend the same
visual system: the warm cream palette, glassmorphic cards, blur-word scroll
animations, Nunito typography, and motion patterns described in the reference.

## Pages Required

### Landing Page (Home)
Fully described in `docs/reference-design.md`. 7 sections:
Navigation, Hero, About, Features (sticky cards), Metrics, Contact, Footer.

### Shop / Catalog
- Grid of door products with filtering (by collection, material, style)
- Product cards following the glassmorphic card style from the reference
- Sort options (price, newest, popular)
- Pagination or infinite scroll

### Product Detail
- Large product image gallery (multiple angles)
- Product name, description, price
- Customization options: material, finish, size, hardware style
- Price updates based on selected options
- "Add to Cart" CTA (primary button style from reference)
- Related products section

### Cart
- List of items with quantities, selected options, and subtotals
- Update quantity / remove item
- Order summary with total
- "Proceed to Checkout" CTA

### Checkout (Demo)
- Shipping information form (name, address, phone, email)
- Order summary sidebar
- Payment section — **demo only**: display a styled placeholder that says
  "Payment integration coming soon" or similar. No real payment processing.
- "Place Order" button that creates a demo order

### Order Confirmation
- Success message
- Order number (generated)
- Order summary
- "Continue Shopping" CTA

### About (Full Page)
- Expanded version of the landing page About section
- Brand story, team, craftsmanship philosophy
- Image-heavy with the same scroll animations

### Contact (Full Page)
- Contact form (name, email, subject, message)
- Business information (address, phone, email, hours)
- Map placeholder or embed

## What This Project Needs
- All pages above, fully designed and built
- Complete user flows (browse -> product -> cart -> checkout -> confirmation)
- Responsive design (mobile, tablet, desktop)
- All animations and interactions from the reference design, extended to new pages
- Product data seeded with mock/demo content (6-12 door products with realistic names,
  descriptions, prices, and placeholder images)
- Cart functionality (client-side, localStorage is fine for demo)
- Form validation on all forms
- SEO meta tags and semantic HTML throughout

## What This Project Does NOT Need
- Real payment processing (no Stripe, no payment gateway)
- Shopify or any e-commerce platform integration
- Database or backend persistence (localStorage + mock data is sufficient for demo)
- Admin panel or CMS
- User authentication or accounts
- Email sending
- Deployment configuration
- Internationalization (English only)

## E-Commerce Genre
This project follows the e-commerce playbook, closest to **Scenario A (Custom CMS)**
but in **demo mode** — meaning the frontend and user flows are production-quality,
but the backend is mock/static data with no real integrations.
