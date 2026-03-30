# ArtisanDoors -- Component Inventory

> Complete catalog of every component needed across all 8 pages.
> Grouped by category. Each entry specifies props, variants, states,
> responsive behavior, animation intent, and accessibility notes.

---

## Layout Components

### Container

- **Purpose:** Wraps page content to enforce max-width and horizontal centering.
- **Props:**
  - `children: ReactNode`
  - `className?: string` -- additional classes
  - `as?: 'div' | 'section' | 'main'` -- HTML element (default: `div`)
- **Variants:** None
- **States:** None
- **Responsive:** `max-width: clamp(40rem, 80vw, 100rem)`, `padding-inline: 16px` mobile, `24px` tablet+
- **Animation Intent:** `none`
- **Accessibility:** Semantic element via `as` prop

### Section

- **Purpose:** Wraps major page sections with consistent vertical padding and optional background color.
- **Props:**
  - `children: ReactNode`
  - `variant: 'light' | 'dark'` -- determines background/text colors
  - `className?: string`
  - `id?: string` -- for anchor linking
- **Variants:**
  - `light`: `bg-[#f5f4f0]`, `text-[#1a1a1a]`
  - `dark`: `bg-[#1a1a1a]`, `text-[#f5f4f0]`
- **States:** None
- **Responsive:** `padding-block: 48px` mobile, `80px` desktop
- **Animation Intent:** `none` (children handle their own animations)
- **Accessibility:** Uses `<section>` element with `aria-labelledby` pointing to section heading

### PageHeader

- **Purpose:** Reusable header for inner pages (Shop, Cart, Checkout, About, Contact). Large title + optional subtitle + breadcrumbs.
- **Props:**
  - `title: string`
  - `subtitle?: string`
  - `breadcrumbs: Array<{ label: string; href?: string }>`
- **Variants:** None
- **States:** None
- **Responsive:** Title scales down on mobile. Breadcrumbs wrap on small screens.
- **Animation Intent:** `entrance` -- title and subtitle fade in with blur-word animation. Breadcrumbs fade in after a short delay.
- **Accessibility:** `<nav aria-label="Breadcrumb">` with `<ol>` list. Current page has `aria-current="page"`.

### Breadcrumbs

- **Purpose:** Shows navigation path hierarchy.
- **Props:**
  - `items: Array<{ label: string; href?: string }>`
- **Variants:** None
- **States:** Last item is not a link (current page)
- **Responsive:** Horizontal list, wraps on mobile if needed
- **Animation Intent:** `entrance` -- subtle fade-in with stagger
- **Accessibility:** `<nav aria-label="Breadcrumb">`, `<ol>` semantic list, separator is `aria-hidden`, last item has `aria-current="page"`

---

## Navigation Components

### Navbar

- **Purpose:** Fixed navigation bar at the top of every page. Glass morphism style.
- **Props:**
  - `cartItemCount: number` -- badge on cart icon
- **Variants:** None (single style across all pages)
- **States:**
  - `visible` -- normal position
  - `hidden` -- slides up out of view on scroll down
  - `scrolled` -- identical style but re-appears on scroll up
- **Responsive:**
  - Desktop (`md+`): Logo left, nav links center, CTA + cart icon right
  - Mobile: Logo left, hamburger menu icon right. Opens full-screen mobile nav overlay.
- **Animation Intent:**
  - `transition` -- hide/show on scroll direction change via `transform: translateY()` with `900ms` `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
  - Mobile menu: `AnimatePresence` with slide-down + fade overlay
- **Composition:** Contains `Logo`, `NavLink` (multiple), `PrimaryButton`, cart icon with badge, `MobileMenu`
- **Accessibility:** `<nav aria-label="Main navigation">`. Mobile menu trigger is `<button aria-expanded>`. Focus trap in mobile menu when open.

### Logo

- **Purpose:** Brand text "ArtisanDoors" that links to home.
- **Props:** None (static)
- **Variants:** None
- **States:** None
- **Responsive:** Same size across breakpoints (~16px bold)
- **Animation Intent:** `none`
- **Accessibility:** `<a href="/">` with text content serving as accessible name

### NavLink

- **Purpose:** Individual navigation link with animated underline on hover.
- **Props:**
  - `href: string`
  - `label: string`
  - `active?: boolean` -- current page
- **Variants:**
  - `default` -- on light nav bar
  - `mobile` -- larger text in mobile menu
- **States:**
  - `default` -- no underline
  - `hover` -- `::after` underline slides in from left (width 0 to 100%)
  - `active` -- underline visible permanently
- **Responsive:** Hidden on mobile (shown in mobile menu instead)
- **Animation Intent:** `hover` -- underline width transition, `300ms`, ease-out
- **Accessibility:** Uses `<a>` with `aria-current="page"` when active

### MobileMenu

- **Purpose:** Full-screen overlay menu on mobile.
- **Props:**
  - `isOpen: boolean`
  - `onClose: () => void`
  - `cartItemCount: number`
- **Variants:** None
- **States:** Open / Closed
- **Responsive:** Only renders on mobile (`md` and below)
- **Animation Intent:** `transition` -- `AnimatePresence` with backdrop fade + menu slide down. Links stagger in with `0.05s` delay each.
- **Accessibility:** Focus trap when open. Close on `Escape`. `aria-modal="true"`, `role="dialog"`.

---

## Content Components

### BlurText

- **Purpose:** Core animation component. Wraps text and reveals characters or words progressively with a blur-to-sharp scroll animation.
- **Props:**
  - `text: string`
  - `variant: 'char' | 'word'` -- split by character or word
  - `as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'` -- rendered element
  - `className?: string`
  - `staggerDelay?: number` -- override default stagger (default: `0.02` for char, `0.04` for word)
  - `scrub?: boolean` -- if true, animation is scroll-scrubbed; if false, triggers on whileInView (default: `false`)
- **Variants:**
  - `char` -- each character wrapped in individual motion span
  - `word` -- each word wrapped in individual motion span
- **States:** Animating (blurred) / Revealed (sharp)
- **Responsive:** Text inherits parent sizing. Works at any scale.
- **Animation Intent:** `scroll` -- Characters/words start at `filter: blur(10px), opacity: 0` and animate to `filter: blur(0), opacity: 1`. For scrub mode, uses `useScroll` + `useTransform`. For trigger mode, uses `whileInView` with staggered children.
- **Accessibility:** `aria-label` on the wrapper with the full text string so screen readers get the complete text immediately. Individual spans are `aria-hidden="true"`. Respects `prefers-reduced-motion` by showing text immediately with a simple opacity fade.

### Badge

- **Purpose:** Small pill/chip label used for category labels, section markers ("Our Philosophy", "Get in touch"), collection tags.
- **Props:**
  - `label: string`
  - `variant?: 'glass' | 'solid' | 'outline'`
  - `size?: 'sm' | 'md'`
- **Variants:**
  - `glass` (default) -- glassmorphic card gradient, white border (used on dark backgrounds)
  - `solid` -- solid background color (used for collection/category tags)
  - `outline` -- transparent with border
- **States:** None (decorative element)
- **Responsive:** Same across breakpoints
- **Animation Intent:** `entrance` -- fades in with parent section, no independent animation
- **Accessibility:** Rendered as `<span>`, purely decorative text

### HeroSection

- **Purpose:** Full-viewport hero on the landing page. Two-column layout with animated heading, subtext, CTA, avatar group, and hero image.
- **Props:** None (content is static/hardcoded for landing page)
- **Variants:** None
- **States:** None
- **Responsive:**
  - Desktop (`lg+`): Two columns 50/50, `gap-16`
  - Tablet/Mobile: Single column, image below text, reduced heading size
- **Animation Intent:**
  - `scroll` -- Heading uses `BlurText variant="char"`, subheading uses `BlurText variant="word"`
  - `entrance` -- CTA button and avatar group fade in after text reveal
  - `continuous` -- Marquee ticker at bottom
- **Composition:** `BlurText`, `PrimaryButton`, `AvatarGroup`, `MarqueeTicker`
- **Accessibility:** Hero image has descriptive `alt` text. Heading is `<h1>`.

### AvatarGroup

- **Purpose:** Row of overlapping circular avatar images with count text ("Trusted by 2000+ homeowners").
- **Props:**
  - `avatars: Array<{ src: string; alt: string }>`
  - `text: string`
- **Variants:** None
- **States:** None
- **Responsive:** Same layout, may reduce avatar size slightly on mobile
- **Animation Intent:** `entrance` -- fade in as a group, slight scale from 0.9 to 1
- **Accessibility:** Each `<img>` has `alt` text. Text is visible.

### MarqueeTicker

- **Purpose:** Infinite horizontal scrolling ticker of pill/chip items at the bottom of the hero.
- **Props:**
  - `items: string[]` -- list of text items to display
- **Variants:** None
- **States:** Scrolling (always)
- **Responsive:** Full width, same on all breakpoints
- **Animation Intent:** `continuous` -- `react-fast-marquee`, ~52s duration, linear, seamless loop
- **Composition:** Uses `Badge` components as items
- **Accessibility:** `aria-hidden="true"` on the marquee container (decorative). Content is supplementary, not critical information. Pauses on `prefers-reduced-motion`.

### AboutSection

- **Purpose:** Dark section on landing page with philosophy badge, heading, description, and CTA.
- **Props:** None (static content)
- **Variants:** None
- **States:** None
- **Responsive:** Text-centered, single column on all breakpoints
- **Animation Intent:** `scroll` -- Badge fades in, heading uses `BlurText variant="word"`, CTA fades in
- **Composition:** `Section variant="dark"`, `Badge`, `BlurText`, `PrimaryButton`
- **Accessibility:** Section heading is `<h2>`

### FeatureCard

- **Purpose:** Large sticky card in the Features section. Contains number badge, title, description, and image.
- **Props:**
  - `number: number` -- 1, 2, or 3
  - `title: string`
  - `description: string`
  - `imageSrc: string`
  - `imageAlt: string`
  - `stickyOffset: number` -- top value for sticky positioning (e.g., 85, 90, 95)
- **Variants:** None (all three cards share the same style)
- **States:** None
- **Responsive:**
  - Desktop (`lg+`): `position: sticky`, full-width, `height: 75vh`, two-column layout (text left, image right)
  - Mobile: Normal flow (not sticky), stacked layout (image on top), auto height
- **Animation Intent:** `scroll` -- On desktop, stacking effect is purely CSS `position: sticky`. Description text uses `BlurText variant="word"`. On mobile, each card fades in via `whileInView`.
- **Composition:** `Badge` (number), `BlurText`
- **Accessibility:** Number badge is decorative. Card content in semantic order.

### MetricCard

- **Purpose:** Large number display card (e.g., "15+", "2000+", "98%") used in the Metrics section.
- **Props:**
  - `value: string` -- the large number/text
  - `label: string` -- description below
- **Variants:** None
- **States:** None
- **Responsive:** Full-width on mobile, third-width in 3-col grid on tablet+
- **Animation Intent:** `scroll` -- `whileInView` fade-up + number counting animation (value increments from 0 to target over 1.5s). Card itself fades in with stagger.
- **Accessibility:** Number and label are in a single card. Use `<dl>`, `<dt>`, `<dd>` semantics.

### ContactSection

- **Purpose:** Landing page contact section. Two-column grid with email signup form and image.
- **Props:** None (static content)
- **Variants:** None
- **States:** Form submission (success/error)
- **Responsive:** Two columns on `md+`, stacked on mobile (image hidden on mobile to save space, or shown below)
- **Animation Intent:** `scroll` -- Badge and heading use `BlurText variant="word"`. Form fades in. Image fades in with slight scale.
- **Composition:** `Section`, `Badge`, `BlurText`, `EmailForm`
- **Accessibility:** Form has proper labels and error messaging.

### Footer

- **Purpose:** Site-wide footer with brand text, link columns, and copyright.
- **Props:** None (static content)
- **Variants:** None
- **States:** None
- **Responsive:** Links in row on `md+`, stacked on mobile. Bottom bar wraps on mobile.
- **Animation Intent:** `none` -- footer is static
- **Accessibility:** `<footer>` element. Link groups in `<nav>` with `aria-label`.

---

## Product Components

### ProductCard

- **Purpose:** Card displaying a single product in the shop grid. Shows image, name, collection, and price.
- **Props:**
  - `product: Product` -- product data object
  - `priority?: boolean` -- for above-fold image loading
- **Variants:**
  - `default` -- standard grid card
  - `featured` -- larger card (spans 2 columns on desktop) for featured products
- **States:**
  - `default` -- resting state
  - `hover` -- card lifts (`translateY(-4px)`), shadow increases, image scales slightly (`scale(1.03)`)
  - `loading` -- skeleton placeholder
- **Responsive:**
  - Mobile: Full-width card
  - Tablet: Half-width
  - Desktop: Third or quarter width depending on grid
- **Animation Intent:**
  - `entrance` -- `whileInView` fade-up with stagger when grid loads (`0.08s` per card)
  - `hover` -- card lift + image zoom, `300ms` ease-out
- **Composition:** Glass card container, `next/image`, `Badge` (collection label), price text
- **Accessibility:** Entire card is wrapped in `<a>` linking to product detail. Image has descriptive `alt`. Price announced clearly.

### ProductGallery

- **Purpose:** Image gallery on the product detail page. Main large image with thumbnail strip below.
- **Props:**
  - `images: Array<{ src: string; alt: string }>`
- **Variants:** None
- **States:**
  - `default` -- first image shown as main
  - `active thumbnail` -- selected thumbnail has border highlight
  - `transitioning` -- crossfade between images
- **Responsive:**
  - Desktop: Main image (aspect 3:4) with horizontal thumbnail strip below
  - Mobile: Main image with smaller thumbnail strip, or swipeable
- **Animation Intent:**
  - `transition` -- `AnimatePresence` crossfade on main image when thumbnail clicked (opacity + slight scale)
  - `hover` -- thumbnails brighten/scale slightly on hover
- **Accessibility:** Thumbnails are `<button>` elements with `aria-label="View image N"`. Main image has full `alt` text.

### ProductCustomizer

- **Purpose:** Option selectors on the product detail page. Allows choosing material, finish, size, and hardware style. Each selection may modify the price.
- **Props:**
  - `options: ProductOptions` -- available options with price modifiers
  - `selected: SelectedOptions` -- currently selected options
  - `onChange: (options: SelectedOptions) => void`
- **Variants:** None
- **States:**
  - `default` -- all options at default selection
  - `modified` -- one or more options changed from default (price updates)
- **Responsive:** Full-width, each option group stacks vertically. Option chips wrap in a row.
- **Animation Intent:**
  - `hover` -- option chips scale slightly on hover
  - `layout` -- selected chip gets a filled background with `layout` animation for smooth indicator movement
- **Composition:** Option group labels, selectable chips/pills, price modifier display
- **Accessibility:** Each option group is a `<fieldset>` with `<legend>`. Options are `<input type="radio">` with visual chip styling. Selected state announced via `aria-checked`.

### PriceDisplay

- **Purpose:** Shows the current price, updating dynamically as customization options change.
- **Props:**
  - `basePrice: number`
  - `modifiers: Array<{ label: string; amount: number }>`
  - `currency?: string` -- default `'USD'`
- **Variants:** None
- **States:**
  - `default` -- showing price
  - `updating` -- brief highlight animation when price changes
- **Responsive:** Same across breakpoints
- **Animation Intent:** `layout` -- price number animates when it changes (counter animation or fade-swap via `AnimatePresence`)
- **Accessibility:** `aria-live="polite"` on price container so screen readers announce changes.

### RelatedProducts

- **Purpose:** Horizontal row of product cards shown at the bottom of the product detail page.
- **Props:**
  - `products: Product[]`
  - `title?: string` -- default "You May Also Like"
- **Variants:** None
- **States:** None
- **Responsive:** Horizontal scroll on mobile (snap scrolling), grid row on desktop
- **Animation Intent:** `scroll` -- `whileInView` fade-up with stagger
- **Composition:** `ProductCard` components
- **Accessibility:** `<section aria-labelledby>` with heading. Scrollable container has `role="region"` and `aria-label`.

---

## Cart Components

### CartItem

- **Purpose:** Single item row in the cart page. Shows product image, name, selected options, quantity controls, and line total.
- **Props:**
  - `item: CartItem` -- cart item data
  - `onUpdateQuantity: (id: string, qty: number) => void`
  - `onRemove: (id: string) => void`
- **Variants:** None
- **States:**
  - `default` -- normal display
  - `updating` -- brief opacity pulse when quantity changes
  - `removing` -- animate out (slide left + fade)
- **Responsive:**
  - Desktop: Horizontal row (image, details, quantity controls, price inline)
  - Mobile: Stacked layout (image + name top, options below, quantity + price row bottom)
- **Animation Intent:**
  - `layout` -- `AnimatePresence` with `layout` prop so items re-flow smoothly when one is removed
  - `transition` -- exit animation: slide left + fade out, `300ms`
- **Composition:** `next/image`, `QuantityControl`, remove button (Lucide Trash2 icon)
- **Accessibility:** Remove button has `aria-label="Remove {product name} from cart"`. Quantity controls are keyboard-accessible.

### QuantityControl

- **Purpose:** Increment/decrement stepper for cart item quantity.
- **Props:**
  - `value: number`
  - `min?: number` -- default 1
  - `max?: number` -- default 99
  - `onChange: (value: number) => void`
- **Variants:** None
- **States:**
  - `default` -- both buttons active
  - `min-reached` -- decrement button disabled
  - `max-reached` -- increment button disabled
- **Responsive:** Same across breakpoints
- **Animation Intent:** `hover` -- buttons have subtle background fill on hover
- **Accessibility:** `<button aria-label="Decrease quantity">`, `<button aria-label="Increase quantity">`, current value in `<span aria-live="polite">`.

### CartSummary

- **Purpose:** Order summary panel showing subtotal, estimated tax, and total. Appears in cart page sidebar and checkout sidebar.
- **Props:**
  - `subtotal: number`
  - `itemCount: number`
  - `tax: number`
  - `total: number`
  - `ctaLabel: string` -- "Proceed to Checkout" or "Place Order"
  - `ctaAction: () => void`
  - `isLoading?: boolean`
- **Variants:**
  - `cart` -- shows "Proceed to Checkout"
  - `checkout` -- shows "Place Order (Demo)"
- **States:**
  - `default` -- normal
  - `loading` -- CTA shows spinner, disabled
- **Responsive:**
  - Desktop: Sticky sidebar card
  - Mobile: Fixed bottom bar with summary + CTA, or full-width card below items
- **Animation Intent:** `entrance` -- fade in with slight slide-up
- **Accessibility:** Summary uses `<dl>` for label-value pairs. CTA is prominent `<button>`.

### EmptyState

- **Purpose:** Shown when cart is empty or shop search/filter returns no results.
- **Props:**
  - `icon: LucideIcon` -- icon to display
  - `title: string`
  - `description: string`
  - `ctaLabel?: string`
  - `ctaHref?: string`
- **Variants:**
  - `cart` -- "Your cart is empty" with shopping bag icon
  - `search` -- "No products found" with search icon
- **States:** None
- **Responsive:** Centered layout, responsive text sizing
- **Animation Intent:** `entrance` -- fade in with slight scale from 0.95
- **Accessibility:** Icon is `aria-hidden`. Text conveys all meaning.

---

## Form Components

### ContactForm

- **Purpose:** Full contact form on the Contact page. Fields: name, email, subject, message.
- **Props:**
  - `onSubmit: (data: ContactFormData) => void`
- **Variants:** None
- **States:**
  - `default` -- empty form
  - `filling` -- partially filled, validation active on blur
  - `submitting` -- button shows loading state
  - `success` -- form replaced with success message
  - `error` -- error toast or message
- **Responsive:** Single column on all breakpoints. Fields full-width.
- **Animation Intent:**
  - `entrance` -- fields stagger in with `0.06s` delay each on page load
  - `transition` -- success state crossfades in via `AnimatePresence`
- **Composition:** `FormField` components, `PrimaryButton`
- **Accessibility:** All fields have visible `<label>` elements. Error messages linked via `aria-describedby`. Form has `aria-label`.

### CheckoutForm

- **Purpose:** Shipping information form on the checkout page.
- **Props:**
  - `onSubmit: (data: ShippingFormData) => void`
  - `isSubmitting: boolean`
- **Variants:** None
- **States:** Same as ContactForm (default, filling, submitting, error)
- **Responsive:** Two-column for name fields (first/last), single column for address fields on all sizes
- **Animation Intent:**
  - `entrance` -- fields stagger in
- **Composition:** `FormField` components, `PaymentPlaceholder`, `PrimaryButton`
- **Accessibility:** Fieldsets with legends for grouped fields (name group, address group). Required fields marked with `aria-required`.

### FormField

- **Purpose:** Reusable form field wrapper with label, input, and error message.
- **Props:**
  - `label: string`
  - `name: string`
  - `type: 'text' | 'email' | 'tel' | 'textarea' | 'select'`
  - `placeholder?: string`
  - `required?: boolean`
  - `error?: string`
  - `register: UseFormRegister` -- React Hook Form register
- **Variants:**
  - `text` -- standard text input
  - `textarea` -- multi-line (for message field)
  - `select` -- dropdown (for subject, state/country)
- **States:**
  - `default` -- empty, neutral border
  - `focus` -- border color changes to `--foreground`, subtle glow
  - `filled` -- has content, neutral border
  - `error` -- red border (`--error`), error message visible below
  - `disabled` -- muted background, not interactive
- **Responsive:** Full-width by default
- **Animation Intent:** `hover` -- border color transition on focus, `150ms`. Error message slides in from top with `AnimatePresence`.
- **Accessibility:** `<label>` associated via `htmlFor`. Error message in `<span role="alert" aria-live="polite">`. Required fields: `aria-required="true"`.

### EmailForm

- **Purpose:** Compact inline email signup form (used in landing page contact section and optionally in footer).
- **Props:**
  - `onSubmit: (email: string) => void`
  - `variant?: 'inline' | 'stacked'`
- **Variants:**
  - `inline` -- input and button side by side in a card-bordered container
  - `stacked` -- input above button (mobile fallback)
- **States:** default, submitting, success, error
- **Responsive:** Inline on `md+`, may stack on very small screens
- **Animation Intent:** `hover` -- input container border brightens on focus
- **Composition:** Input, `PrimaryButton` (small)
- **Accessibility:** `<label>` (visually hidden if no visible label). Button text is descriptive.

### PaymentPlaceholder

- **Purpose:** Styled placeholder in the checkout flow where payment integration would go. Shows a message like "Payment integration coming soon" in a tasteful card.
- **Props:** None
- **Variants:** None
- **States:** None (static display)
- **Responsive:** Full-width within form
- **Animation Intent:** `entrance` -- fades in with the rest of the form
- **Accessibility:** `role="status"`, clear text explanation.

---

## Shop Components

### FilterBar

- **Purpose:** Horizontal bar of filter controls for the shop page. Includes collection filter, material filter, style filter.
- **Props:**
  - `collections: string[]`
  - `materials: string[]`
  - `styles: string[]`
  - `activeFilters: FilterState`
  - `onFilterChange: (filters: FilterState) => void`
  - `onClearAll: () => void`
- **Variants:** None
- **States:**
  - `default` -- no filters active
  - `filtered` -- one or more filters active, "Clear All" button appears
- **Responsive:**
  - Desktop: Horizontal row of dropdown triggers
  - Mobile: "Filter" button opens a slide-up sheet/modal with all filters
- **Animation Intent:**
  - `hover` -- filter pills have background fill on hover
  - `layout` -- active filter chips animate in/out with `AnimatePresence`
- **Composition:** `FilterDropdown` (Radix DropdownMenu), `Badge` (active filter chips), clear button
- **Accessibility:** Filter dropdowns built on Radix DropdownMenu for full keyboard support. Active filters announced. "Clear all" button clearly labeled.

### SortDropdown

- **Purpose:** Dropdown to sort products by price (low-high, high-low), newest, or popularity.
- **Props:**
  - `value: SortOption`
  - `onChange: (value: SortOption) => void`
- **Variants:** None
- **States:** Closed / Open
- **Responsive:** Same across breakpoints
- **Animation Intent:** `transition` -- dropdown menu fades in + slides down via Radix + CSS
- **Composition:** Radix DropdownMenu
- **Accessibility:** Full Radix keyboard navigation. Trigger has `aria-haspopup` and `aria-expanded`.

### Pagination

- **Purpose:** Page navigation for shop product grid.
- **Props:**
  - `currentPage: number`
  - `totalPages: number`
  - `onPageChange: (page: number) => void`
- **Variants:** None
- **States:**
  - `default` -- showing page numbers
  - `first-page` -- previous button disabled
  - `last-page` -- next button disabled
  - `single-page` -- hidden entirely
- **Responsive:** Shows fewer page numbers on mobile (1...3...10 pattern)
- **Animation Intent:** `none`
- **Accessibility:** `<nav aria-label="Pagination">`. Current page: `aria-current="page"`. Disabled buttons: `aria-disabled`.

---

## Feedback Components

### OrderConfirmation

- **Purpose:** Full-page confirmation after successful demo order. Shows success icon, order number, order summary, and "Continue Shopping" CTA.
- **Props:**
  - `order: Order` -- order data from localStorage
- **Variants:** None
- **States:**
  - `default` -- showing confirmation
  - `not-found` -- no order data, shows error state
- **Responsive:** Centered card layout, single column
- **Animation Intent:**
  - `entrance` -- success checkmark scales in with spring animation, order details fade in with stagger
- **Composition:** Success icon (Lucide CheckCircle), glass card, `PrimaryButton`
- **Accessibility:** `role="status"` on success message. Order number in bold. "Continue Shopping" is a clear CTA.

### LoadingSkeleton

- **Purpose:** Placeholder UI shown while content is loading. Mimics the shape of the content it replaces.
- **Props:**
  - `variant: 'product-card' | 'product-detail' | 'cart-item' | 'text-line' | 'image'`
  - `count?: number` -- repeat the skeleton pattern N times
- **Variants:** One per content type (product card skeleton, text skeleton, image skeleton)
- **States:** Always animating (pulse)
- **Responsive:** Matches the responsive layout of the content it replaces
- **Animation Intent:** `continuous` -- subtle pulse animation (opacity 0.4 to 0.7, `1.5s` duration, infinite)
- **Accessibility:** `aria-busy="true"`, `aria-label="Loading content"`

### Toast

- **Purpose:** Brief notification messages (e.g., "Added to cart", "Order placed", form errors).
- **Props:**
  - `message: string`
  - `variant: 'success' | 'error' | 'info'`
  - `duration?: number` -- auto-dismiss after ms (default: 3000)
- **Variants:**
  - `success` -- green left border, check icon
  - `error` -- red left border, alert icon
  - `info` -- blue left border, info icon
- **States:** Entering / Visible / Exiting
- **Responsive:** Fixed position, bottom-right on desktop, bottom-center full-width on mobile
- **Animation Intent:** `transition` -- slide in from right (desktop) or up from bottom (mobile) via `AnimatePresence`, auto-dismisses
- **Accessibility:** `role="alert"` for errors, `role="status"` for success/info. `aria-live="polite"`.

---

## Shared / Utility Components

### PrimaryButton

- **Purpose:** Main CTA button used site-wide. Dark gradient with arrow icon and hover expansion.
- **Props:**
  - `label: string`
  - `href?: string` -- renders as `<a>` if provided
  - `onClick?: () => void` -- renders as `<button>` if provided
  - `size?: 'sm' | 'md' | 'lg'`
  - `disabled?: boolean`
  - `loading?: boolean`
  - `fullWidth?: boolean`
  - `icon?: boolean` -- show arrow icon (default true)
- **Variants:**
  - `sm` -- `padding: 8px 12px`, smaller text
  - `md` -- `padding: 10px 16px` (default)
  - `lg` -- `padding: 14px 24px`, larger text
- **States:**
  - `default` -- gradient background
  - `hover` -- dark panel expands from right, text color inverts, `900ms` `cubic-bezier(.77,0,.18,1)`
  - `active` -- slightly darker, shadow reduces
  - `focus` -- focus ring (2px offset outline matching `--foreground`)
  - `disabled` -- muted background, reduced opacity, cursor not-allowed
  - `loading` -- spinner replaces arrow icon, text stays, button disabled
- **Responsive:** Same across breakpoints. `fullWidth` prop makes it 100% width on mobile.
- **Animation Intent:** `hover` -- background expansion animation as described in reference design
- **Accessibility:** Proper `<button>` or `<a>` semantics. `disabled` state: `aria-disabled`. Loading: `aria-busy`.

### SecondaryButton

- **Purpose:** Secondary action button (e.g., "Read Our Story", "Continue Shopping", "Clear Cart").
- **Props:** Same as PrimaryButton
- **Variants:** Same sizes
- **States:** default, hover (border darkens, subtle shadow), active, focus, disabled, loading
- **Responsive:** Same as PrimaryButton
- **Animation Intent:** `hover` -- subtle border and shadow transition, `300ms`
- **Accessibility:** Same as PrimaryButton

### GlassCard

- **Purpose:** Generic glassmorphic container used as a building block for more specific cards.
- **Props:**
  - `children: ReactNode`
  - `className?: string`
  - `padding?: 'none' | 'sm' | 'md' | 'lg'` -- `sm: 8px`, `md: 16px`, `lg: 24px`
  - `hover?: boolean` -- enable hover lift effect
  - `as?: 'div' | 'article' | 'aside'`
- **Variants:** None (glass card style is universal)
- **States:**
  - `default` -- standard glass style
  - `hover` (if enabled) -- lifts with `translateY(-4px)`, shadow increases
- **Responsive:** Same styling across breakpoints
- **Animation Intent:**
  - `hover` (if enabled) -- transform + shadow transition, `300ms`
  - `entrance` (optional) -- `whileInView` fade-up if used with scroll content
- **Accessibility:** Semantic element via `as` prop

### MapPlaceholder

- **Purpose:** Visual placeholder for a map on the Contact page. Shows a styled box with location pin icon and address text.
- **Props:**
  - `address: string`
- **Variants:** None
- **States:** None
- **Responsive:** Full-width, fixed aspect ratio (16:9 on desktop, 4:3 on mobile)
- **Animation Intent:** `entrance` -- fades in with section
- **Accessibility:** `aria-label="Map showing business location"`. Address text is readable.
