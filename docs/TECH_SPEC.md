# ArtisanDoors -- Technical Specification

> Implementation details for the confirmed tech stack in `decisions.md`.
> This document adds practical guidance; it does not override any confirmed decisions.

---

## Project Structure

```
artisandoors/
├── app/
│   ├── layout.tsx              # Root layout: font, Lenis, CartProvider, Navbar, Footer
│   ├── page.tsx                # Landing page (home)
│   ├── shop/
│   │   └── page.tsx            # Shop / catalog page
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx        # Product detail page
│   ├── cart/
│   │   └── page.tsx            # Cart page
│   ├── checkout/
│   │   └── page.tsx            # Checkout page
│   ├── order-confirmation/
│   │   └── page.tsx            # Order confirmation page
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── contact/
│   │   └── page.tsx            # Contact page
│   ├── not-found.tsx           # Custom 404 page
│   ├── error.tsx               # Error boundary
│   └── globals.css             # Tailwind v4 config + custom properties
├── components/
│   ├── layout/
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   ├── PageHeader.tsx
│   │   └── Breadcrumbs.tsx
│   ├── navigation/
│   │   ├── Navbar.tsx
│   │   ├── Logo.tsx
│   │   ├── NavLink.tsx
│   │   └── MobileMenu.tsx
│   ├── content/
│   │   ├── BlurText.tsx
│   │   ├── Badge.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AvatarGroup.tsx
│   │   ├── MarqueeTicker.tsx
│   │   ├── AboutSection.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── MetricCard.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── ProductCustomizer.tsx
│   │   ├── PriceDisplay.tsx
│   │   └── RelatedProducts.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── QuantityControl.tsx
│   │   ├── CartSummary.tsx
│   │   └── EmptyState.tsx
│   ├── forms/
│   │   ├── FormField.tsx
│   │   ├── ContactForm.tsx
│   │   ├── CheckoutForm.tsx
│   │   ├── EmailForm.tsx
│   │   └── PaymentPlaceholder.tsx
│   ├── shop/
│   │   ├── FilterBar.tsx
│   │   ├── SortDropdown.tsx
│   │   └── Pagination.tsx
│   ├── feedback/
│   │   ├── OrderConfirmation.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   └── Toast.tsx
│   └── ui/
│       ├── PrimaryButton.tsx
│       ├── SecondaryButton.tsx
│       └── GlassCard.tsx
├── context/
│   └── CartContext.tsx          # Cart state provider
├── data/
│   ├── products.ts             # Mock product data
│   ├── collections.ts          # Mock collection data
│   └── site.ts                 # Site-wide constants (nav links, footer links, etc.)
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   ├── utils.ts                # Utility functions (formatCurrency, cn, etc.)
│   ├── cart.ts                 # Cart logic functions
│   ├── orders.ts               # Order creation/retrieval
│   ├── filters.ts              # Product filtering/sorting logic
│   └── validation.ts           # Zod schemas
├── hooks/
│   ├── useScrollDirection.ts   # Detect scroll direction for navbar
│   ├── useLenis.ts             # Lenis integration hook
│   └── useLocalStorage.ts      # localStorage with SSR safety
├── public/
│   └── (placeholder favicons, og images)
├── next.config.ts
├── package.json
├── tsconfig.json
└── postcss.config.mjs
```

### Routing Strategy

- **App Router** with file-based routing
- **Server Components** by default for all page-level components (pages render on the server, hydrate on client)
- **Client Components** (`'use client'`) only where needed: interactive components (Navbar, forms, cart, product customizer, animated components using Framer Motion hooks)
- **Dynamic routes:** `product/[slug]` uses `generateStaticParams()` to pre-render all product pages from mock data at build time
- **No API routes** -- all data is in-memory TypeScript arrays
- **No middleware** -- no auth or redirects needed

---

## Tailwind CSS v4 Setup

Tailwind v4 uses a CSS-first configuration. All tokens are defined in `globals.css` using the `@theme` directive. No `tailwind.config.js` file is needed.

### `globals.css` Structure

```css
@import "tailwindcss";

@theme {
  /* Color tokens */
  --color-background: #f5f4f0;
  --color-background-accent: #e8e6e1;
  --color-card: #ffffff;
  --color-foreground: #1a1a1a;
  --color-primary-cta: #2c2c2c;
  --color-primary-cta-text: #f5f4f0;
  --color-secondary-cta: #f5f4f0;
  --color-secondary-cta-text: #1a1a1a;
  --color-accent: #8a8a8a;
  --color-muted: #6b6b6b;
  --color-success: #3d7a4a;
  --color-success-light: #e8f5e9;
  --color-warning: #b8860b;
  --color-warning-light: #fef3cd;
  --color-error: #c0392b;
  --color-error-light: #fdecea;

  /* Font */
  --font-sans: 'Nunito', ui-sans-serif, system-ui, -apple-system, sans-serif;

  /* Border radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  /* Shadows */
  --shadow-xs: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
  --shadow-xl: 0 16px 48px rgba(0,0,0,0.15);
}

/* Fluid typography custom properties (outside @theme, as CSS variables) */
:root {
  --text-xs: clamp(0.55rem, 0.7vw, 0.7rem);
  --text-sm: clamp(0.615rem, 0.82vw, 0.82rem);
  --text-base: clamp(0.75rem, 1vw, 1rem);
  --text-lg: clamp(0.875rem, 1.1vw, 1.1rem);
  --text-xl: clamp(1rem, 1.3vw, 1.3rem);
  --text-2xl: clamp(1.25rem, 1.6vw, 1.6rem);
  --text-3xl: clamp(1.5rem, 2vw, 2rem);
  --text-4xl: clamp(1.75rem, 2.5vw, 2.5rem);
  --text-5xl: clamp(2rem, 3vw, 3rem);
  --text-7xl: clamp(3rem, 4vw, 4rem);
  --text-9xl: clamp(5.25rem, 7vw, 7rem);
}

/* Glass card utility class */
.card {
  position: relative;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background: linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(255,255,255,0.4));
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  border: 1px solid #ffffff;
  border-radius: 12px;
}

/* Primary button utility class */
.btn-primary {
  background: linear-gradient(to bottom, rgba(44,44,44,0.75), #2c2c2c);
  box-shadow: inset 0 1px 1px rgba(245,244,240,0.25), 3px 3px 3px rgba(44,44,44,0.15);
  border-radius: 12px;
  color: #f5f4f0;
}

/* Global defaults */
body {
  background-color: #f5f4f0;
  color: #1a1a1a;
}
```

### Usage Pattern

Reference tokens as Tailwind classes: `bg-background`, `text-foreground`, `rounded-[--radius]`, `shadow-xs`, etc. For fluid font sizes, use inline styles or custom utility classes since the clamp values are CSS custom properties.

---

## Framer Motion Patterns

### BlurText Scroll Animation (Core Pattern)

This is the signature animation of the site. Two approaches:

**Approach A: whileInView (simpler, recommended for most uses)**

```tsx
// Each character/word is a motion.span
<motion.span
  initial={{ filter: 'blur(10px)', opacity: 0 }}
  whileInView={{ filter: 'blur(0px)', opacity: 1 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 0.5, delay: index * staggerDelay }}
>
  {char}
</motion.span>
```

**Approach B: useScroll + useTransform (scrub mode, for hero heading)**

```tsx
// 1. Get scroll progress for the container
const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });

// 2. Map each character's reveal to a slice of scroll progress
const charStart = index / totalChars;
const charEnd = (index + 1) / totalChars;
const opacity = useTransform(scrollYProgress, [charStart * 0.5, charEnd * 0.5 + 0.1], [0, 1]);
const blur = useTransform(scrollYProgress, [charStart * 0.5, charEnd * 0.5 + 0.1], [10, 0]);

// 3. Apply via style prop
<motion.span style={{ opacity, filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none' }}>
  {char}
</motion.span>
```

The motionist will fine-tune exact timing and scroll ranges, but the builder should set up the structural code with `motion.span` wrappers, refs, and the `useScroll`/`useTransform` hooks.

### Page Transitions

Use `AnimatePresence` in the root layout to wrap page content:

```tsx
// In layout.tsx, wrap {children} with a client component that provides AnimatePresence
// Each page exports a motion.div wrapper with enter/exit animations

// Page wrapper pattern:
<motion.main
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
>
  {/* page content */}
</motion.main>
```

**Note on App Router:** `AnimatePresence` with exit animations requires a client-side page transition wrapper since App Router does not natively support exit animations. Use a `PageTransition` client component that listens to route changes via `usePathname()`.

### whileInView Pattern (for section content)

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>
  {/* Section content */}
</motion.div>
```

### Staggered Children

```tsx
// Parent
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={{
    visible: { transition: { staggerChildren: 0.08 } },
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {/* item content */}
    </motion.div>
  ))}
</motion.div>
```

### Spring Config Constants

Define in a shared file (`lib/motion.ts`):

```tsx
export const SPRING_SETTLE = { stiffness: 100, damping: 15, mass: 1 };
export const SPRING_GENTLE = { stiffness: 60, damping: 20, mass: 1 };
export const EASE_SMOOTH = [0.16, 1, 0.3, 1];
export const EASE_DEFAULT = [0.25, 0.46, 0.45, 0.94];
export const EASE_BUTTON = [0.77, 0, 0.18, 1];
export const DURATION_FAST = 0.15;
export const DURATION_NORMAL = 0.3;
export const DURATION_SLOW = 0.5;
export const DURATION_SLOWER = 0.7;
export const DURATION_SLOWEST = 0.9;
```

---

## Lenis Smooth Scroll Setup

### Integration with Next.js App Router

Create a `LenisProvider` client component that initializes Lenis and integrates with Framer Motion's scroll system:

```tsx
'use client';
import Lenis from 'lenis';
import { useEffect } from 'react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
```

Place in root `layout.tsx` wrapping the page content (but inside the CartProvider).

**Important:** Lenis must be disabled or configured to not interfere with native scroll on form fields and dropdowns. Add `data-lenis-prevent` to scrollable modals and mobile menu.

---

## Radix Primitives Usage

| Radix Primitive | Where Used | Rationale |
|----------------|------------|-----------|
| `@radix-ui/react-dropdown-menu` | `SortDropdown`, `FilterBar` | Keyboard navigation, ARIA, focus management out of the box |
| `@radix-ui/react-dialog` | `MobileMenu` (full-screen overlay) | Focus trap, body scroll lock, `aria-modal` |
| `@radix-ui/react-visually-hidden` | Hidden labels for icon-only buttons | Accessible hiding without layout shift |
| `@radix-ui/react-slot` | Button component (polymorphic rendering) | Render `<a>` or `<button>` with same styles via `asChild` |

**Not using Radix for:** Form inputs (React Hook Form handles them), Tabs, Accordion, Toast (custom implementation with Framer Motion for animation control).

### Installation

```bash
npm install @radix-ui/react-dropdown-menu @radix-ui/react-dialog @radix-ui/react-visually-hidden @radix-ui/react-slot
```

---

## React Hook Form + Zod

### Form Pattern

Every form uses the same architecture:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({ /* ... */ });
type FormData = z.infer<typeof schema>;

function MyForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',  // Validate on blur for good UX
  });

  const onSubmit = async (data: FormData) => { /* ... */ };

  return <form onSubmit={handleSubmit(onSubmit)}>{/* FormField components */}</form>;
}
```

### Validation Schemas (defined in `lib/validation.ts`)

**Contact Form:**
```tsx
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
});
```

**Checkout Form:**
```tsx
const checkoutSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[\d\s\-\+\(\)]{7,15}$/, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  country: z.string().min(1, 'Country is required'),
});
```

**Email Signup:**
```tsx
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});
```

---

## Cart Context Architecture

### Provider Setup

```tsx
// context/CartContext.tsx
'use client';
import { createContext, useContext, useReducer, useEffect } from 'react';

interface CartState {
  items: CartItem[];
  isOpen: boolean;  // for potential cart drawer (not used in current spec, but future-proof)
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }  // item ID
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

// Reducer handles all state transitions
function cartReducer(state: CartState, action: CartAction): CartState { /* ... */ }

// Provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('artisandoors-cart');
    if (saved) dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) });
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('artisandoors-cart', JSON.stringify(state.items));
  }, [state.items]);

  // Expose actions as functions
  const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
```

### Cart Item Identity

When adding to cart, generate a unique ID from `productSlug + selectedOptions` hash. This way, the same product with different customizations is treated as separate cart items.

### localStorage Key

`artisandoors-cart` -- stores `CartItem[]` as JSON.

---

## Mock Data Structure

### TypeScript Interfaces (`lib/types.ts`)

```tsx
interface Product {
  slug: string;
  name: string;
  collection: string;              // 'modern' | 'classic' | 'artisan' | 'heritage'
  description: string;
  shortDescription: string;
  basePrice: number;               // in cents (e.g., 249900 = $2,499.00)
  images: ProductImage[];
  materials: OptionGroup;
  finishes: OptionGroup;
  sizes: OptionGroup;
  hardware: OptionGroup;
  features: string[];
  tags: string[];
  isFeatured: boolean;
  createdAt: string;               // ISO date for sorting
}

interface ProductImage {
  src: string;                     // Unsplash/Pexels URL
  alt: string;
  width: number;
  height: number;
}

interface OptionGroup {
  label: string;                   // "Material", "Finish", etc.
  options: Option[];
}

interface Option {
  id: string;
  label: string;
  priceModifier: number;           // in cents, positive or negative
  description?: string;
}

interface SelectedOptions {
  material: string;                // option ID
  finish: string;
  size: string;
  hardware: string;
}

interface CartItem {
  id: string;                      // unique: slug + options hash
  productSlug: string;
  productName: string;
  productImage: string;
  selectedOptions: SelectedOptions;
  selectedOptionsLabels: Record<string, string>;  // human-readable option labels
  quantity: number;
  unitPrice: number;               // base price + modifiers, in cents
}

interface Order {
  id: string;                      // generated order number
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  shipping: ShippingInfo;
  createdAt: string;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface Collection {
  slug: string;
  name: string;
  description: string;
  image: string;
}

type SortOption = 'price-asc' | 'price-desc' | 'newest' | 'popular';

interface FilterState {
  collection: string | null;
  material: string | null;
  style: string | null;
  search: string;
}
```

### Mock Data Conventions

- **Product count:** 10 products (covering all 4 collections)
- **Collections:** Modern (3 products), Classic (3), Artisan (2), Heritage (2)
- **Price range:** $1,299 to $4,999 base price
- **Images:** Use Unsplash URLs with `?w=800&q=80` for product images, `?w=400&q=80` for thumbnails
- **Option modifiers:** Materials range from -$0 to +$800. Premium finishes +$200-$500. Larger sizes +$300-$600. Hardware +$0-$400.

---

## Image Strategy

### next/image Configuration

In `next.config.ts`:

```tsx
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};
```

### Usage Patterns

- **Product cards:** `<Image width={400} height={533} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw">`
- **Product gallery main:** `<Image width={800} height={1067} sizes="(max-width: 1024px) 100vw, 50vw" priority>`
- **Hero image:** `<Image fill className="object-cover" priority>`
- **Avatars:** `<Image width={48} height={48}>`

Use `priority` on above-fold images (hero, first product cards). Use `loading="lazy"` (default) for everything else.

### Placeholder Strategy

Use `placeholder="blur"` with `blurDataURL` set to a tiny base64 encoded solid color matching `--background-accent` (`#e8e6e1`). This gives a subtle warm placeholder while images load.

---

## SEO Strategy

### Metadata API

Each page exports a `metadata` object or `generateMetadata` function:

```tsx
// app/page.tsx
export const metadata: Metadata = {
  title: 'ArtisanDoors | Luxury Bespoke Door Design Studio',
  description: 'Handcrafted bespoke doors tailored to your home\'s unique character. Premium materials, artisan craftsmanship, architectural excellence.',
  openGraph: {
    title: 'ArtisanDoors | Luxury Bespoke Door Design Studio',
    description: '...',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
};

// app/product/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  return {
    title: `${product.name} | ArtisanDoors`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | ArtisanDoors`,
      images: [{ url: product.images[0].src }],
    },
  };
}
```

### Root Layout Metadata

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://artisandoors.com'),
  title: { default: 'ArtisanDoors', template: '%s | ArtisanDoors' },
  description: 'Luxury bespoke door design studio.',
  robots: { index: true, follow: true },
};
```

### Structured Data

Add JSON-LD for:
- **Organization** (on home page)
- **Product** (on product detail pages) -- name, description, price, image, availability
- **BreadcrumbList** (on all inner pages)

### Semantic HTML

- Use `<main>`, `<header>`, `<footer>`, `<nav>`, `<section>`, `<article>` appropriately
- Headings follow a logical hierarchy (one `<h1>` per page, sequential `<h2>` to `<h4>`)
- Images have descriptive `alt` text
- Links have descriptive text (no "click here")

---

## Accessibility Strategy

### Keyboard Navigation

- All interactive elements reachable via `Tab`
- Modal/menu dialogs trap focus (handled by Radix)
- `Escape` closes overlays
- Arrow keys navigate within dropdown menus (handled by Radix)
- Visible focus indicators on all focusable elements (2px outline, offset 2px, using `--foreground` color)

### Focus Management

- When mobile menu opens, focus moves to the first link
- When adding to cart, a toast appears (announced via `aria-live`)
- Checkout form: on validation error, focus moves to first invalid field
- Page transitions: focus returns to top of page

### ARIA Patterns

- Navigation: `aria-label`, `aria-current`
- Forms: `aria-required`, `aria-invalid`, `aria-describedby` (linking to error messages)
- Live regions: `aria-live="polite"` for price updates, cart count, toasts
- Decorative elements: `aria-hidden="true"` for icons, marquee, blur-text individual spans
- Loading states: `aria-busy="true"`

### Color Contrast

All text meets WCAG AA contrast ratios:
- `#1a1a1a` on `#f5f4f0`: 14.4:1 (passes AAA)
- `#f5f4f0` on `#1a1a1a`: 14.4:1 (passes AAA)
- `#8a8a8a` (accent) on `#f5f4f0`: 3.5:1 (passes AA for large text only; use for labels 16px+)
- `#6b6b6b` (muted) on `#f5f4f0`: 5.0:1 (passes AA)

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Plus, in JavaScript: check `window.matchMedia('(prefers-reduced-motion: reduce)')` and skip Framer Motion animations (set `initial` to false or use reduced variants).

---

## Utility Functions

### `cn()` -- Class Name Merger

Use `clsx` + `tailwind-merge` for conditional class composition:

```tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Install: `npm install clsx tailwind-merge`

### `formatCurrency()`

```tsx
export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}
```

### `generateOrderId()`

```tsx
export function generateOrderId(): string {
  const prefix = 'AD';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}
```
