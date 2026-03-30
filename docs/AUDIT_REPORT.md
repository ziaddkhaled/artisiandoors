# ArtisanDoors — Audit Report

Generated: 2026-03-30

---

## Summary

- **Total findings: 32**
- **Critical: 4** | **Warning: 17** | **Info: 11**

---

## Security

### Critical

- **SEC-001**: Missing HTTP security headers
  - **Location**: `next.config.ts:1`
  - **Risk**: Without `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, and `Strict-Transport-Security`, the site is exposed to clickjacking, MIME sniffing, XSS escalation, and protocol-downgrade attacks, even for a demo deployment.
  - **Fix**: Add a `headers()` function to `next.config.ts`:
    ```ts
    async headers() {
      return [{
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=()' },
        ],
      }];
    }
    ```
    A full `Content-Security-Policy` should also be added once image CDN origins (`images.unsplash.com`, `images.pexels.com`) and font origins are inventoried.

- **SEC-002**: Unsafe type cast on parsed localStorage order data
  - **Location**: `lib/orders.ts:75`
  - **Risk**: The parsed value is cast directly to `Order` (`return parsed as Order`) after only checking for three top-level keys (`id`, `items`, `total`). An attacker who can write to the target origin's `localStorage` (via a browser extension, shared device, or future XSS surface) can inject a crafted object that passes these checks but fails at runtime inside `OrderConfirmation`, crashing the component tree. It also means the `shipping` field, which is rendered verbatim, is never validated.
  - **Fix**: Validate the full `Order` shape before casting — either with Zod (preferred, since it is already a dependency) or with an explicit structural guard that checks `typeof parsed.shipping === 'object'` and all required nested fields before accepting the value.

### Warnings

- **SEC-003**: Loose localStorage cart item validation
  - **Location**: `lib/cart.ts:130-139`
  - **Risk**: `loadCartFromStorage` validates only four keys (`id`, `productSlug`, `quantity`, `unitPrice`) on each item. Fields that are rendered in the UI — `productName`, `productImage`, `selectedOptionsLabels` — are never validated. A tampered payload could set `productName` to a very long string or `productImage` to an unexpected URL and cause rendering issues.
  - **Fix**: Add Zod schema validation for the full `CartItem` shape in `lib/cart.ts`. The `zod` package is already installed. A `cartItemSchema` can be inferred and used in place of the manual property checks.

- **SEC-004**: `console.warn` calls expose internal error context in production
  - **Location**: `lib/cart.ts:112,141,154`, `lib/orders.ts:51,80,93`
  - **Risk**: `console.warn('Failed to save cart to localStorage:', error)` outputs the full error object to the browser console. While lower severity for a demo, this can leak internal stack traces or browser storage quota details in production builds.
  - **Fix**: Guard with `process.env.NODE_ENV !== 'production'` before each `console.warn`, or replace with a silent no-op in production.

- **SEC-005**: Order confirmation page renders shipping data without output escaping
  - **Location**: `components/feedback/OrderConfirmation.tsx:155-161`
  - **Risk**: Shipping fields (`firstName`, `lastName`, `address`, `city`, `state`, `zip`, `country`, `email`) are read from `localStorage` and rendered via JSX. React's JSX escaping protects against HTML injection; however, if a crafted payload is written to storage (see SEC-002), field values with unusual Unicode or control characters will render verbatim. This is low severity in the current architecture but becomes higher if any storage origin ever processes these values server-side.
  - **Fix**: Validate and sanitize all `shipping` fields at the point of reading from storage (see SEC-002 fix). Zod `z.string().max(N).trim()` constraints on each field are sufficient.

### Info

- **SEC-006**: `npm audit` — zero vulnerabilities
  - **Location**: `package.json`
  - **Risk**: None at time of audit.
  - **Fix**: No action required. Re-run before each production deployment.

- **SEC-007**: No real secrets, API keys, or credentials found in the codebase
  - **Location**: All source files reviewed.
  - **Risk**: None.
  - **Fix**: No action required. Ensure `.env.local` (not present) is in `.gitignore` if added in future.

- **SEC-008**: CORS not applicable; no API routes exist
  - **Location**: `next.config.ts`
  - **Risk**: None in current architecture. Note for future: if API routes are added, CORS policy must be explicitly configured.
  - **Fix**: No action required now.

---

## Performance

### Critical

- **PERF-001**: Lenis `requestAnimationFrame` loop is never cancelled
  - **Location**: `components/layout/LenisProvider.tsx:16-19`
  - **Risk**: The `raf` function calls `requestAnimationFrame(raf)` unconditionally. The `useEffect` cleanup calls `lenis.destroy()`, which stops Lenis from processing scroll events, but the `requestAnimationFrame` loop itself continues running after the component unmounts. In development with React StrictMode (double-invocation of effects), this creates two uncontrolled loops simultaneously. In production it creates one perpetual loop that persists across client-side navigations, consuming CPU every frame for the entire session.
  - **Fix**: Store the rAF ID and cancel it in the cleanup:
    ```ts
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
    ```

### Warnings

- **PERF-002**: `will-change: filter, opacity, transform` applied to every character/word in BlurText
  - **Location**: `components/content/BlurText.tsx:155`, `components/content/BlurText.tsx:267`
  - **Risk**: `will-change` promotes each element to its own GPU compositing layer. For the hero heading "Entrance to Elegance" (19 characters), this creates 19 separate compositing layers simultaneously. At larger text sizes with many BlurText instances on a page, this significantly increases GPU memory consumption and can cause jank on lower-end devices, particularly on the About page which has multiple BlurText headings.
  - **Fix**: Apply `will-change` only during the animation window and remove it afterward. Use Framer Motion's `onAnimationStart`/`onAnimationComplete` to toggle a CSS class, or add `will-change: auto` after the animation completes. For the `InViewBlurText` variant, consider only applying `will-change` when `!isInView` (i.e., during the pre-reveal state).

- **PERF-003**: All pages are wrapped in client components; no per-page Server Component rendering
  - **Location**: `app/shop/ShopPageClient.tsx:1`, `app/cart/CartPageClient.tsx:1`, `app/checkout/CheckoutPageClient.tsx:1`, `app/order-confirmation/OrderConfirmationClient.tsx:1`, `app/about/AboutPageClient.tsx:1`, `app/contact/ContactPageClient.tsx:1`
  - **Risk**: The page-level Server Component (`page.tsx`) does no work — it simply returns the client component. Static content (product lists, about copy, contact info) could be rendered server-side, improving LCP by delivering HTML without waiting for JavaScript hydration.
  - **Fix**: For the Shop page, the product grid can be rendered as a Server Component since the data is static. Pass the pre-filtered/sorted data as props to a leaner Client Component that only handles filter state. The About and Contact pages contain no interactive state that requires the entire component tree to be a Client Component — only the form and animation wrappers need `"use client"`.

- **PERF-004**: `useMemo(() => getAllProducts(), [])` in ShopPageClient
  - **Location**: `app/shop/ShopPageClient.tsx:20`
  - **Risk**: `getAllProducts()` returns a static in-memory array from `data/products.ts`. Wrapping it in `useMemo` with an empty dependency array adds hook overhead with no benefit — the memoized result is never invalidated and the underlying call is essentially free.
  - **Fix**: Replace with a module-level constant outside the component: `const allProducts = getAllProducts()` defined once at module load. If the Shop page is moved to a Server Component (PERF-003), this disappears entirely.

- **PERF-005**: Framer Motion `layout` prop on `ProductCustomizer` option labels causes layout thrashing
  - **Location**: `components/product/ProductCustomizer.tsx:61`
  - **Risk**: Every option `<motion.label>` has `layout` set, meaning Framer Motion measures and animates the layout of all option chips on every selection change. For a customizer with 4 groups of 4 options each (16 elements), this triggers 16 layout measurements per interaction.
  - **Fix**: Remove the `layout` prop from option labels. The visual selected-state change (background fill, text color inversion) is already handled by CSS class transitions, which are sufficient for this interaction. `layout` animation is appropriate when elements physically move or resize relative to siblings, which does not happen here.

- **PERF-006**: `BlurText` with `scrub` mode on hero heading creates multiple `useScroll` + `useTransform` hooks per character
  - **Location**: `components/content/BlurText.tsx:194-233`, `components/content/HeroSection.tsx:32-38`
  - **Risk**: "Entrance to Elegance" contains 19 characters. Each character is a `ScrubChar` component, and each calls `useTransform` three times (opacity, blur, y). This is 57 `useTransform` subscriptions plus 1 `useScroll` subscription, all active simultaneously during scrolling. On lower-end devices this can cause measurable scroll jank.
  - **Fix**: Consider reducing the hero heading to word-level scrubbing (6 words instead of 19 characters) for better performance. Alternatively, batch the transforms so siblings share computed values rather than each having independent subscriptions.

- **PERF-007**: Product detail images load with `priority` on all thumbnails
  - **Location**: `components/product/ProductGallery.tsx:52`, `components/product/ProductGallery.tsx:77-85`
  - **Risk**: The main gallery image correctly uses `priority`. However, all thumbnail images also lack `loading="lazy"` (the Next.js `Image` default). Since thumbnails are below-fold on mobile, they load eagerly, competing with the main image and other above-fold resources.
  - **Fix**: Thumbnail buttons render `<Image>` without explicit `priority` (which is correct — it defaults to `false`), but there is no `loading="lazy"` prop. This is actually already handled correctly by `next/image` defaults. This finding is informational — no change needed unless profiling shows thumbnail loading causing LCP regression.

- **PERF-008**: No virtualization for large product lists
  - **Location**: `app/shop/ShopPageClient.tsx:78-86`
  - **Risk**: The current product set is 10 items, so this is not a present concern. However, the infrastructure for pagination exists but `PRODUCTS_PER_PAGE` is set to 12, meaning all 10 products are always on one page. If the product catalog grows significantly, all cards will be rendered in the DOM simultaneously. Each `ProductCard` uses Framer Motion with `whileInView`, which adds a MutationObserver per card.
  - **Fix**: The existing pagination implementation is sufficient for the current scale. No immediate action required. If the catalog exceeds ~50 items per page, consider `@tanstack/react-virtual` for the product grid.

### Info

- **PERF-009**: `BlurText` `will-change` not cleared after animation completes
  - **Location**: `components/content/BlurText.tsx:152-156`
  - **Risk**: After the blur animation completes, `will-change-[filter,opacity,transform]` remains in the class list indefinitely. Browsers are advised to clear `will-change` after the animation to free compositor resources. This compounds the concern raised in PERF-002.
  - **Fix**: Use Framer Motion's `onAnimationComplete` on the parent container to remove or toggle the `will-change` class after the stagger animation finishes.

- **PERF-010**: Font loads `weight: ["200","300","400","500","600","700","800","900"]` — 8 weights
  - **Location**: `app/layout.tsx:10-14`
  - **Risk**: Loading 8 Nunito font weights increases the total font transfer size. The design system documents usage of weights 300, 400, 500, 600, 700 only (5 weights). Weights 200, 800, and 900 are loaded but not referenced in the design tokens or codebase.
  - **Fix**: Remove weights `"200"`, `"800"`, and `"900"` from the Nunito configuration. Use `weight: ["300","400","500","600","700"]`.

---

## Accessibility

### Critical

- **A11Y-001**: No skip-navigation link
  - **Location**: `app/layout.tsx:33-50`
  - **Risk**: Keyboard and screen reader users must tab through the entire Navbar (logo, 4 nav links, "Get Started" CTA, cart icon, mobile hamburger — 7+ interactive elements) before reaching main page content on every page load and navigation. This is a WCAG 2.4.1 (Level A) failure.
  - **Fix**: Add a visually-hidden skip link as the first focusable element in `<body>`. It should become visible on focus and link to `#main-content`. Add `id="main-content"` to the `<main>` element in `layout.tsx`:
    ```tsx
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-foreground focus:text-primary-cta-text focus:rounded-[12px]"
    >
      Skip to main content
    </a>
    <main id="main-content" className="flex-1">{children}</main>
    ```

- **A11Y-002**: QuantityControl buttons are 32px × 32px — below the 44×44px WCAG 2.5.5 minimum touch target
  - **Location**: `components/cart/QuantityControl.tsx:33,59`
  - **Risk**: The `w-8 h-8` (32px × 32px) size on the decrement and increment buttons falls short of the 44×44px minimum touch target recommended by WCAG 2.5.5 (Level AAA) and the Apple/Google HIG. On mobile this makes quantity adjustment error-prone, particularly for users with motor impairments. The Trash2 remove button in `CartItem` at `p-1.5` with a `w-4 h-4` icon has an effective touch area of approximately 28–32px square.
  - **Fix**: Increase the quantity control buttons to `w-11 h-11` (44px). For the remove button in `CartItem.tsx:89`, use `p-2.5` to reach at least 40px effective touch area. Alternatively, apply a transparent touch-target pseudo-element using the `after:` pattern with `after:absolute after:inset-[-6px]`.

- **A11Y-003**: `Section` component lacks `aria-labelledby` — sections are not programmatically labelled
  - **Location**: `components/layout/Section.tsx:22-37`
  - **Risk**: Multiple `<section>` elements on pages (Features, Metrics, About, Contact sections on the home page; Philosophy, Metrics sections on the About page) have no `aria-labelledby` or `aria-label`. Screen reader users navigating by landmarks will encounter unlabelled regions, making it difficult to understand the page structure. WCAG 1.3.1 (Level A) requires that sections which are used as structural landmarks be identifiable.
  - **Fix**: The `Section` component spec in `COMPONENTS.md` calls for `aria-labelledby` pointing to the section heading. Implement this by requiring a `headingId` prop or by automatically associating the first `<h2>` inside the section. A simpler approach: add `aria-label` as an optional prop to `Section` and pass a descriptive value at each usage site.

### Warnings

- **A11Y-004**: `EmailForm` input has `aria-label` but no associated `<label>` element
  - **Location**: `components/forms/EmailForm.tsx:55-61`
  - **Risk**: The email input uses `aria-label="Email address"` in place of a visible `<label>`. While this satisfies screen reader requirements, it provides no visible label. WCAG 2.4.6 (Level AA) recommends visible labels where possible. For the compact inline form layout, at minimum a visually-hidden `<label>` should be used over `aria-label` so that it remains associated with the input in the accessibility tree.
  - **Fix**: Replace `aria-label="Email address"` with a visually-hidden `<label>` using `@radix-ui/react-visually-hidden` (already installed):
    ```tsx
    <VisuallyHidden.Root>
      <label htmlFor="email-signup">Email address</label>
    </VisuallyHidden.Root>
    <input id="email-signup" type="email" ... />
    ```

- **A11Y-005**: `ProductCustomizer` uses a redundant `role="radiogroup"` inside a `<fieldset>`
  - **Location**: `components/product/ProductCustomizer.tsx:38`
  - **Risk**: The `<div role="radiogroup">` wraps radio inputs that are already inside a `<fieldset>`. The `<fieldset>` element implicitly has `role="group"`, and the inner `radiogroup` role is redundant and potentially confusing to screen readers. The `<fieldset>` with `<legend>` is the correct and sufficient pattern here.
  - **Fix**: Remove `role="radiogroup"` from the `<div>` wrapper on line 38. The `<fieldset>`/`<legend>` pattern is already correct.

- **A11Y-006**: `Navbar` mobile hamburger does not have `aria-controls` pointing to the menu
  - **Location**: `components/navigation/Navbar.tsx:88-95`
  - **Risk**: The hamburger button has `aria-expanded` (correct), but lacks `aria-controls` pointing to the `Dialog.Content` ID. Without `aria-controls`, screen reader users cannot programmatically determine which element the button expands. WCAG 4.1.2 (Level A) requires that the relationship between a control and the region it controls be programmatically determinable.
  - **Fix**: Add `aria-controls="mobile-nav-dialog"` to the hamburger button and `id="mobile-nav-dialog"` to the `Dialog.Content` motion div in `MobileMenu.tsx`.

- **A11Y-007**: `SortDropdown` trigger uses `aria-haspopup="true"` instead of `aria-haspopup="menu"`
  - **Location**: `components/shop/SortDropdown.tsx:28`
  - **Risk**: `aria-haspopup="true"` is equivalent to `aria-haspopup="menu"` in many implementations, but the explicit `"menu"` value is more precise and better supported across screen readers. This is a minor conformance issue but worth correcting for clarity.
  - **Fix**: Change to `aria-haspopup="menu"`. Note that Radix `DropdownMenu.Trigger` sets this automatically, so the manual `aria-haspopup` attribute on the inner `<button>` may be redundant and can be removed.

- **A11Y-008**: `MetricCard` swaps `<dl>`/`<dt>`/`<dd>` semantics — the large number is in `<dt>` and label in `<dd>`
  - **Location**: `components/content/MetricCard.tsx:91-98`
  - **Risk**: The HTML `<dl>` pattern expects `<dt>` to be the term (label) and `<dd>` to be the description (value). The implementation inverts this: `<dt>` contains the numeric value ("15+") and `<dd>` contains the descriptive label ("Years of Craftsmanship"). Screen readers announce the term-description relationship, so users hear a number as the term and the actual label as the description, which is semantically backwards.
  - **Fix**: Swap the elements:
    ```tsx
    <dt className="text-[length:var(--text-sm)] text-muted mt-auto">{label}</dt>
    <dd className="text-[length:var(--text-9xl)] font-medium text-foreground leading-none">
      {/* count-up value */}
    </dd>
    ```
    Also note that the parent `MetricsSection` and `AboutPageClient` both wrap `MetricCard` instances in a `<dl>`, which is correct.

- **A11Y-009**: `Toast` component uses both `role` and `aria-live` — the `role="alert"` implies `aria-live="assertive"`, conflicting with the explicit `aria-live="polite"`
  - **Location**: `components/feedback/Toast.tsx:82-83`
  - **Risk**: For the `error` variant, `role="alert"` is set alongside `aria-live="polite"`. `role="alert"` implicitly sets `aria-live="assertive"` and `aria-atomic="true"`. Adding `aria-live="polite"` creates a conflict — browsers resolve this inconsistently. The success toast similarly has `role="status"` with `aria-live="polite"` which is redundant but consistent, so only the error variant is problematic.
  - **Fix**: Remove `aria-live="polite"` from the outer `motion.div` for the `error` variant. For `success` and `info` toasts, `role="status"` with `aria-live="polite"` is fine; `aria-live` can be kept or removed since `role="status"` already implies it.

- **A11Y-010**: `BlurText` renders individual character `<span>` elements inside `<h1>` with `aria-hidden`, but the wrapper uses `aria-label` directly on the heading element
  - **Location**: `components/content/BlurText.tsx:144-148`, `components/content/BlurText.tsx:216-220`
  - **Risk**: The component correctly applies `aria-label` on the heading element and `aria-hidden` on the individual `<span>` children. This is a valid and well-known pattern. However, the `aria-label` is being applied to a native heading element (`h1`, `h2`, etc.) which already has an implicit accessible name from its content. When the `aria-hidden` children are the entire content, the `aria-label` becomes the accessible name, which is correct. This is working as intended. No action required, recorded for completeness.
  - **Fix**: No fix required. Pattern is correct.

- **A11Y-011**: `Section` components do not propagate the `aria-labelledby` called for in `COMPONENTS.md`
  - **Location**: `components/layout/Section.tsx`, spec at `docs/COMPONENTS.md:38`
  - **Risk**: The spec states: "Accessibility: Uses `<section>` element with `aria-labelledby` pointing to section heading." The implementation does not include `aria-labelledby`. Combined with A11Y-003, this represents a gap between specification and implementation.
  - **Fix**: See A11Y-003 for the combined fix.

- **A11Y-012**: `accent` color (`#8a8a8a`) on `#f5f4f0` background has insufficient contrast for small text
  - **Location**: `app/globals.css:35`, `docs/DESIGN_SYSTEM.md`
  - **Risk**: The design system documents this explicitly: `#8a8a8a` on `#f5f4f0` achieves 3.5:1, which passes WCAG AA only for large text (18pt / 14pt bold) and fails for normal text. The `text-accent` class is used for: placeholder text, option price modifiers in `ProductCustomizer`, selected options labels in `CartItem`, step numbers in About page process, and `SortDropdown` checkmark. Some of these usages are at `--text-xs` (~0.7rem / ~11px), which is well below the 18pt threshold. This is a WCAG 1.4.3 (Level AA) failure for those text instances.
  - **Fix**: For body/small text contexts, use `text-muted` (`#6b6b6b`, 5.0:1 contrast) instead of `text-accent`. Reserve `text-accent` exclusively for decorative labels, placeholders, and text that is 16px or larger. Audit all `text-accent` usages and replace with `text-muted` where text is below 18pt.

### Info

- **A11Y-013**: `Footer` copyright line is missing the `©` symbol
  - **Location**: `components/content/Footer.tsx:74`
  - **Risk**: "2025 ArtisanDoors. All rights reserved." is missing the copyright symbol `©`. Not an accessibility issue, but the text reads as an orphaned year. Screen readers announce it as a number with no context.
  - **Fix**: Change to `&copy; 2025 ArtisanDoors. All rights reserved.` and update the year to 2026 to match the current date.

- **A11Y-014**: `Breadcrumbs` uses `animate="visible"` variant without a corresponding `initial="hidden"` state
  - **Location**: `components/layout/Breadcrumbs.tsx:22-29`
  - **Risk**: The `motion.ol` is set to `initial="visible"` implicitly (no `initial` prop), then `animate="visible"`. The children have `variants={fadeIn}`, but since the parent has no `initial` variant, the stagger children animation may not work correctly in all cases — specifically, if the component is rendered after hydration, the children may not animate in at all. This is a minor animation gap, not an accessibility issue.
  - **Fix**: Add `initial="hidden"` to the `motion.ol` to match the children's `fadeIn` variant expectations.

---

## SEO

### Critical

- **SEO-001**: No `robots.txt` file
  - **Location**: `public/` directory (absent)
  - **Risk**: Without a `robots.txt`, crawlers have no guidance on which routes to index and which to skip. The `/order-confirmation`, `/checkout`, and `/cart` pages should be disallowed to prevent indexing of transactional/dynamic pages that contain no SEO value. Without `robots.txt`, these may appear in search results or waste crawl budget.
  - **Fix**: Create `public/robots.txt`:
    ```
    User-agent: *
    Allow: /
    Disallow: /cart
    Disallow: /checkout
    Disallow: /order-confirmation
    Sitemap: https://artisandoors.com/sitemap.xml
    ```
    Alternatively, use the Next.js `app/robots.ts` file to generate this programmatically.

- **SEO-002**: No XML sitemap
  - **Location**: `app/` directory (absent)
  - **Risk**: Search engines have no machine-readable map of the site's indexable URLs. Without a sitemap, newly added product pages may not be discovered promptly. For a demo with 10 products across static routes, this is lower immediate risk, but it is a foundational SEO requirement.
  - **Fix**: Create `app/sitemap.ts`:
    ```ts
    import { MetadataRoute } from 'next';
    import { getAllProducts } from '@/lib/products';
    export default function sitemap(): MetadataRoute.Sitemap {
      const products = getAllProducts();
      return [
        { url: 'https://artisandoors.com', lastModified: new Date() },
        { url: 'https://artisandoors.com/shop', lastModified: new Date() },
        { url: 'https://artisandoors.com/about', lastModified: new Date() },
        { url: 'https://artisandoors.com/contact', lastModified: new Date() },
        ...products.map((p) => ({
          url: `https://artisandoors.com/shop/${p.slug}`,
          lastModified: new Date(p.createdAt),
        })),
      ];
    }
    ```

- **SEO-003**: Missing Open Graph `og:image` on root layout and most pages
  - **Location**: `app/layout.tsx:26-30`, `app/about/page.tsx:3-8`, `app/contact/page.tsx:3-8`
  - **Risk**: The root layout `openGraph` object has no `images` property. The About and Contact pages export no `openGraph` metadata at all. When these pages are shared on social media, platforms fall back to automatically selected images or display no image, significantly reducing click-through rates on social shares.
  - **Fix**: Add `images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ArtisanDoors luxury door studio' }]` to the root layout `openGraph`. Add page-specific `openGraph` with `images` to `app/about/page.tsx` and `app/contact/page.tsx`. Create `public/og-image.jpg` (a 1200×630 brand image). The product detail pages already set OG images from the product's first image, which is correct.

### Warnings

- **SEO-004**: No Twitter/X Card metadata on any page
  - **Location**: All page `metadata` exports
  - **Risk**: Without `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image` tags, link previews on Twitter/X are minimal or use fallback values. This reduces engagement on social shares.
  - **Fix**: Add to root layout `metadata`:
    ```ts
    twitter: {
      card: 'summary_large_image',
      title: 'ArtisanDoors | Luxury Bespoke Door Design Studio',
      description: 'Handcrafted bespoke doors tailored to your home\'s unique character.',
      images: ['/og-image.jpg'],
    }
    ```
    Page-level `twitter` overrides can be added to product detail pages to use product images.

- **SEO-005**: No JSON-LD structured data implemented
  - **Location**: `app/page.tsx`, `app/shop/[slug]/page.tsx`
  - **Risk**: The `TECH_SPEC.md` explicitly specifies JSON-LD for Organization (home page), Product (product detail pages), and BreadcrumbList (all inner pages). None of these are implemented. Missing Product schema means product pages cannot display rich results (pricing, availability) in Google Search.
  - **Fix**: Add `<script type="application/ld+json">` in each relevant Server Component page. For product detail:
    ```tsx
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.shortDescription,
      image: product.images[0].src,
      offers: { '@type': 'Offer', priceCurrency: 'USD', price: product.basePrice / 100, availability: 'https://schema.org/InStock' },
    };
    // <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    ```

- **SEO-006**: Product detail URL path uses `/shop/[slug]` but `USER_FLOWS.md` specifies `/product/[slug]`
  - **Location**: `app/shop/[slug]/page.tsx`, `docs/USER_FLOWS.md:12`
  - **Risk**: The user flows specification lists the product detail URL as `/product/[slug]`. The implementation uses `/shop/[slug]`. While the current implementation is internally consistent (all links use `/shop/${slug}`), the discrepancy with the spec could cause confusion during future development. The current path `/shop/[slug]` is actually more SEO-friendly as it places products within the shop hierarchy, but the spec mismatch should be documented as a resolved design decision.
  - **Fix**: Update `USER_FLOWS.md` to reflect the actual `/shop/[slug]` path, or document in `docs/decisions.md` that `/shop/[slug]` was chosen over `/product/[slug]` for URL hierarchy clarity.

- **SEO-007**: `About` and `Contact` pages have no `openGraph` metadata
  - **Location**: `app/about/page.tsx:3-8`, `app/contact/page.tsx:3-8`
  - **Risk**: These pages export `title` and `description` but no `openGraph` block. Next.js will not generate Open Graph tags without an explicit `openGraph` object (or inheritance from the root layout). The root layout OG description is generic and does not describe these pages.
  - **Fix**: Add `openGraph` to both pages:
    ```ts
    // app/about/page.tsx
    openGraph: {
      title: 'Our Story | ArtisanDoors',
      description: 'Over 15 years of handcrafted excellence. Discover the ArtisanDoors story.',
      images: [{ url: '/og-image.jpg' }],
    }
    ```

- **SEO-008**: `Cart`, `Checkout`, and `Order Confirmation` pages should have `robots: noindex`
  - **Location**: `app/cart/page.tsx`, `app/checkout/page.tsx`, `app/order-confirmation/page.tsx`
  - **Risk**: These transactional pages should not appear in search results. They have no SEO value and include content that is meaningless to a crawler (empty cart, empty form, no order data). Without explicit `noindex`, they will be indexed if discovered.
  - **Fix**: Add `robots: { index: false, follow: false }` to the metadata export in each transactional page.

- **SEO-009**: Product OG image URLs are external Unsplash URLs without `width` and `height`
  - **Location**: `app/shop/[slug]/page.tsx:28`
  - **Risk**: `images: [{ url: product.images[0].src }]` passes an Unsplash URL without `width` or `height` properties. Some social media crawlers require explicit dimensions to render the large-card preview format. Without dimensions, they may fall back to a smaller summary card.
  - **Fix**: Add dimensions to the OG image object:
    ```ts
    images: [{ url: product.images[0].src, width: 800, height: 1067, alt: product.images[0].alt }]
    ```

### Info

- **SEO-010**: No `og:url` specified on any page
  - **Location**: All `metadata` exports
  - **Risk**: `og:url` is used by social platforms to deduplicate shares and establish canonical social links. Without it, platforms may use the referring URL or the page URL, which is usually correct but not guaranteed.
  - **Fix**: Add `url` to each page's `openGraph` object. With `metadataBase` set in the root layout, Next.js can construct the full URL using `alternates: { canonical: '/' }` patterns. For product pages: `openGraph: { url: \`/shop/${product.slug}\` }`.

- **SEO-011**: Heading hierarchy skips from `h2` to `h4` on the About page process section
  - **Location**: `app/about/AboutPageClient.tsx:176`
  - **Risk**: The four process steps (Consultation, Design, Craft, Install) use `<h4>` inside a content area where the parent section heading uses BlurText as `h2`. There is no `h3` between them. While this does not affect Google rankings significantly, it creates an inconsistent content outline for screen reader users navigating by headings.
  - **Fix**: Change the step title elements from `<h4>` to `<h3>`.

---

## Recommendations (prioritized fix list)

The following list prioritizes fixes by impact and effort.

### Immediate (before any public deployment)

1. **A11Y-001** — Add skip navigation link. Low effort, high accessibility impact. One-line change in `layout.tsx`.
2. **SEC-001** — Add security headers to `next.config.ts`. Low effort, eliminates clickjacking and MIME sniffing vectors.
3. **SEO-001** — Create `public/robots.txt` or `app/robots.ts`. Low effort, prevents transactional pages from being indexed.
4. **SEO-008** — Add `robots: noindex` to cart, checkout, and order-confirmation page metadata. One-line addition per page.
5. **PERF-001** — Fix Lenis rAF loop memory leak in `LenisProvider.tsx`. Critical runtime leak, minimal code change.

### High priority (sprint 1)

6. **SEO-002** — Implement `app/sitemap.ts` for search engine discovery.
7. **SEO-003** — Create `public/og-image.jpg` and add OG image to root layout and all pages lacking it.
8. **SEO-004** — Add Twitter Card metadata to root layout.
9. **SEO-005** — Implement JSON-LD structured data for Product pages and the Organization on the home page.
10. **SEC-002 / SEC-003** — Harden localStorage deserialization with Zod validation on both cart items and order objects.
11. **A11Y-002** — Increase QuantityControl and remove-button touch targets to 44px minimum.
12. **A11Y-012** — Audit and replace `text-accent` with `text-muted` where used on small (< 16px) text.

### Medium priority (sprint 2)

13. **A11Y-003 / A11Y-011** — Add `aria-label` or `aria-labelledby` to all `<Section>` elements.
14. **A11Y-006** — Add `aria-controls` to hamburger button pointing to mobile menu dialog.
15. **A11Y-008** — Fix `<dt>`/`<dd>` inversion in `MetricCard`.
16. **A11Y-009** — Remove conflicting `aria-live` from error toast.
17. **PERF-002 / PERF-009** — Clear `will-change` after BlurText animation completes.
18. **PERF-010** — Remove unused Nunito font weights (200, 800, 900).
19. **SEC-004** — Guard `console.warn` calls behind `NODE_ENV !== 'production'`.

### Lower priority / backlog

20. **PERF-003** — Refactor pages to use Server Components for static content, passing data as props to leaner Client Components.
21. **PERF-004** — Replace `useMemo(() => getAllProducts(), [])` with a module-level constant.
22. **PERF-005** — Remove `layout` prop from ProductCustomizer option labels.
23. **A11Y-004** — Replace `aria-label` on EmailForm input with a VisuallyHidden label element.
24. **A11Y-005** — Remove redundant `role="radiogroup"` from ProductCustomizer option container.
25. **A11Y-007** — Change `aria-haspopup="true"` to `aria-haspopup="menu"` on SortDropdown trigger.
26. **SEO-006** — Reconcile `/shop/[slug]` vs `/product/[slug]` in spec documentation.
27. **SEO-007** — Add `openGraph` to About and Contact pages.
28. **SEO-009** — Add explicit `width`, `height`, and `alt` to OG image objects for product pages.
29. **SEO-010** — Add `og:url` to all page `openGraph` metadata.
30. **SEO-011** — Change process step headings in About page from `h4` to `h3`.
31. **A11Y-013** — Add `©` symbol and correct year to footer copyright text.
32. **A11Y-014** — Add `initial="hidden"` to Breadcrumbs `motion.ol` for correct stagger animation.
