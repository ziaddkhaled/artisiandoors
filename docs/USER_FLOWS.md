# ArtisanDoors -- User Flows & Page Map

> Complete UX architecture covering every page, navigation path, form, and state transition.

---

## Site Map

```
/                          Landing Page (Home)
/shop                      Shop / Catalog (product grid with filters)
/product/[slug]            Product Detail (gallery, customizer, add to cart)
/cart                      Cart (item list, summary, proceed to checkout)
/checkout                  Checkout (shipping form, demo payment, place order)
/order-confirmation        Order Confirmation (success, order number, summary)
/about                     About (brand story, team, philosophy)
/contact                   Contact (form, business info, map)
```

### 404 Page

- Route: any unmatched URL
- Shows: "Page not found" message in brand style, "Return Home" CTA
- Design: Centered layout on light background, large "404" number, subtle description

### Error Boundary

- Route: any page that throws an error
- Shows: "Something went wrong" with "Try Again" and "Return Home" buttons
- Design: Same centered layout as 404

---

## Navigation Structure

### Primary Navigation (Desktop)

Located in the fixed Navbar. Links appear center-aligned.

| Label | Href | Notes |
|-------|------|-------|
| Home | `/` | Active on landing page |
| Shop | `/shop` | Active on shop and product pages |
| About | `/about` | Active on about page |
| Contact | `/contact` | Active on contact page |

Right side of navbar:
- **"Get Started" CTA** -- links to `/shop` (PrimaryButton with arrow)
- **Cart icon** (Lucide ShoppingBag) with item count badge -- links to `/cart`

### Mobile Navigation

Hamburger menu icon (Lucide Menu) that opens a full-screen overlay:

| Label | Href |
|-------|------|
| Home | `/` |
| Shop | `/shop` |
| About | `/about` |
| Contact | `/contact` |
| Cart (N items) | `/cart` |

Close button (Lucide X) in top-right corner.

### Footer Navigation

Two columns of links:

**Company:**
| Label | Href |
|-------|------|
| About | `/about` |
| Shop | `/shop` |

**Support:**
| Label | Href |
|-------|------|
| Contact | `/contact` |
| FAQ | `#` (placeholder, not a real page) |

Bottom bar: "2025 ArtisanDoors. All rights reserved." left, "Privacy Policy" right (placeholder link).

### Breadcrumb Navigation (Inner Pages)

Each inner page shows breadcrumbs below the PageHeader:

| Page | Breadcrumbs |
|------|-------------|
| Shop | Home > Shop |
| Product Detail | Home > Shop > {Product Name} |
| Cart | Home > Cart |
| Checkout | Home > Cart > Checkout |
| Order Confirmation | Home > Order Confirmation |
| About | Home > About |
| Contact | Home > Contact |

---

## Primary User Journey: Browse to Purchase

### Step 1: Landing Page

**Entry point.** User arrives at `/`.

1. Hero section loads with blur-text animations, hero image, CTA "View Our Collection"
2. User scrolls through About, Features, Metrics, Contact sections
3. User clicks "View Our Collection" CTA or "Shop" in nav

**State:** No cart items. Navbar shows empty cart icon (no badge).

### Step 2: Shop Page (`/shop`)

**Product browsing.** Grid of all products with filtering.

1. Page loads showing all products in a responsive grid (3-4 cols desktop, 2 tablet, 1 mobile)
2. FilterBar at top shows: Collection dropdown, Material dropdown, Style dropdown, Sort dropdown
3. Products display with: image, name, collection badge, base price
4. User may filter by collection (e.g., "Modern") -- grid updates instantly, URL does NOT change (client-side filtering)
5. User may sort by price or newest -- grid re-renders with sort applied
6. Active filters shown as removable chips, "Clear All" button appears
7. Pagination at bottom if more than 12 products visible (for demo, all products fit on one page)
8. User clicks a product card

**State changes:**
- Filter state stored in component state (not URL params -- demo simplicity)
- No loading states needed (data is in-memory)

### Step 3: Product Detail (`/product/[slug]`)

**Product exploration and customization.**

1. Page loads with: image gallery (main + thumbnails), product name, collection, description, base price
2. Below: ProductCustomizer with 4 option groups:
   - **Material:** e.g., Solid Oak (+$0), Walnut (+$300), Mahogany (+$500), Reclaimed Teak (+$800)
   - **Finish:** e.g., Natural (+$0), Matte Black (+$200), Brushed Bronze (+$350), Hand-Lacquered (+$500)
   - **Size:** e.g., Standard 36"x80" (+$0), Wide 42"x80" (+$300), Double 72"x80" (+$600)
   - **Hardware:** e.g., Classic Brass (+$0), Matte Black (+$150), Artisan Iron (+$300), Crystal (+$400)
3. PriceDisplay updates in real time as options change (base + sum of modifiers)
4. "Add to Cart" PrimaryButton below price
5. User selects desired options, clicks "Add to Cart"
6. Toast notification: "Added to cart" (success variant)
7. Navbar cart badge updates to show item count
8. Below the product: RelatedProducts section with 3-4 related items
9. User clicks "Cart" icon in navbar or proceeds via toast CTA

**State changes:**
- Selected options stored in component state
- On "Add to Cart": CartContext receives new item
- localStorage updates with new cart state
- Toast appears for 3 seconds

### Step 4: Cart Page (`/cart`)

**Cart review and modification.**

1. Page loads showing list of cart items, each with:
   - Product image (small)
   - Product name
   - Selected options (Material: Walnut, Finish: Matte Black, etc.)
   - Unit price (with modifiers applied)
   - Quantity control (- / count / +)
   - Line total
   - Remove button (trash icon)
2. Right sidebar (desktop) or below items (mobile): CartSummary with:
   - Subtotal
   - Estimated Tax (calculated as 8.5% of subtotal -- demo rate)
   - Total
   - "Proceed to Checkout" PrimaryButton
3. User may:
   - Update quantity (triggers price recalculation, toast "Cart updated")
   - Remove item (animate out, cart recalculates, if last item removed show EmptyState)
   - Click "Proceed to Checkout"

**State changes:**
- Quantity changes and removals update CartContext immediately
- localStorage syncs on every change
- CartSummary recalculates on every change

**Empty state:** If cart is empty, show EmptyState with shopping bag icon, "Your cart is empty", "Browse our collection" CTA linking to `/shop`.

### Step 5: Checkout Page (`/checkout`)

**Order placement (demo mode).**

1. Page loads with:
   - Left: CheckoutForm with shipping fields
   - Right sidebar (desktop) or above form (mobile): CartSummary showing order total
2. CheckoutForm fields (all within a glass card):
   - **Name row:** First Name (text, required), Last Name (text, required)
   - **Email** (email, required)
   - **Phone** (tel, required)
   - **Address** (text, required)
   - **City** (text, required)
   - **State/Province** (text, required)
   - **ZIP Code** (text, required)
   - **Country** (select dropdown, default "United States", required)
3. Below shipping form: PaymentPlaceholder card showing:
   - Credit card icon (Lucide CreditCard)
   - "Payment Integration Coming Soon"
   - "This is a demo checkout. No real payment will be processed."
   - Styled as a glass card with muted text
4. "Place Order (Demo)" PrimaryButton at bottom
5. User fills form, clicks "Place Order (Demo)"
6. Validation runs on all fields (Zod schema)
7. If validation fails: first invalid field is focused, error messages appear below each invalid field
8. If validation passes:
   - Button shows loading state (spinner, disabled)
   - Brief delay (800ms) to simulate processing
   - Order is created: generate order ID, save to localStorage
   - Cart is cleared
   - Redirect to `/order-confirmation`

**State changes:**
- Form state managed by React Hook Form
- On success: order saved to `localStorage` under key `artisandoors-last-order`
- Cart cleared from CartContext and localStorage
- Router pushes to `/order-confirmation`

**Edge case:** If user navigates to `/checkout` with empty cart, redirect to `/cart` (which will show empty state).

### Step 6: Order Confirmation (`/order-confirmation`)

**Success state.**

1. Page loads showing:
   - Large check circle icon (green)
   - "Order Placed Successfully!"
   - Order number (e.g., "AD-M1KF2-X9T3")
   - Order summary: list of items, quantities, options, prices
   - Subtotal, tax, total
   - Shipping info summary
   - "Continue Shopping" SecondaryButton linking to `/shop`
   - "Return Home" link
2. Confetti-like animation is NOT included (too playful for this brand). Instead: the checkmark scales in with a spring animation, details fade in with stagger.

**State source:** Reads from `localStorage` key `artisandoors-last-order`.

**Edge case:** If no order found in localStorage (direct navigation), show: "No recent order found" with "Return to Shop" CTA.

---

## Secondary Flows

### Landing Page to About

1. User clicks "Read Our Story" in About section or "About" in nav
2. Navigate to `/about`
3. About page loads with:
   - PageHeader: "Our Story" with breadcrumbs
   - Brand story section (2-column: text left, image right)
   - Philosophy section (dark background, centered text, blur-word animation)
   - Craftsmanship section (image gallery + description)
   - Team section (optional -- if included, grid of team member cards)
   - Metrics section (reuse MetricCard pattern from landing page)
   - CTA section: "Ready to transform your entrance?" with "Browse Collection" button

### Landing Page to Contact

1. User clicks "Contact" in nav or scrolls to contact section on landing page
2. Navigate to `/contact`
3. Contact page loads with:
   - PageHeader: "Get in Touch" with breadcrumbs
   - Two-column layout:
     - Left: ContactForm (name, email, subject dropdown, message textarea)
     - Right: Business info card (address, phone, email, hours) + MapPlaceholder
   - Subject dropdown options: "General Inquiry", "Custom Door Design", "Order Support", "Partnership", "Other"

### Shop Filtering & Sorting

All client-side, no URL changes:

1. **Filter by collection:** Click "Collection" dropdown, select "Modern" -- grid shows only Modern collection products. Active chip "Modern" appears. Other filters stack (AND logic).
2. **Filter by material:** Works the same way.
3. **Clear single filter:** Click X on the active filter chip.
4. **Clear all filters:** Click "Clear All" button.
5. **Sort:** Select from Sort dropdown. Options: "Price: Low to High", "Price: High to Low", "Newest", "Most Popular" (popularity is a static mock value).
6. **No results:** If active filters produce zero results, show EmptyState: "No products match your filters" with "Clear Filters" CTA.

### Cart Modifications

1. **Update quantity:** Click +/- on QuantityControl. Minimum 1, maximum 99. Cart totals recalculate immediately.
2. **Remove item:** Click trash icon. Item animates out (slide left + fade). If last item removed, cart transitions to EmptyState.
3. **Continue shopping:** Link in cart or empty state returns to `/shop`.

---

## Form Specifications

### Contact Form

| Field | Type | Required | Validation | Error Message |
|-------|------|----------|------------|---------------|
| Name | text | Yes | min 2 chars | "Name must be at least 2 characters" |
| Email | email | Yes | valid email | "Please enter a valid email address" |
| Subject | select | Yes | must select one | "Please select a subject" |
| Message | textarea | Yes | min 10, max 1000 chars | "Message must be at least 10 characters" / "Message is too long" |

**On submit (demo):** Button shows loading (800ms delay), then form is replaced with success message: "Thank you for your message! We'll get back to you within 24 hours." with a check icon.

**Data destination:** None (demo mode). The form validates and shows success. No email is sent.

### Checkout Form

| Field | Type | Required | Validation | Error Message |
|-------|------|----------|------------|---------------|
| First Name | text | Yes | min 1 char | "First name is required" |
| Last Name | text | Yes | min 1 char | "Last name is required" |
| Email | email | Yes | valid email | "Please enter a valid email address" |
| Phone | tel | Yes | 7-15 digits (with formatting chars) | "Please enter a valid phone number" |
| Address | text | Yes | min 5 chars | "Address is required" |
| City | text | Yes | min 2 chars | "City is required" |
| State | text | Yes | min 2 chars | "State is required" |
| ZIP Code | text | Yes | US format (5 or 5-4 digits) | "Please enter a valid ZIP code" |
| Country | select | Yes | must select one | "Country is required" |

**On submit:** Validate all fields. If valid: show loading, create order in localStorage, clear cart, redirect to `/order-confirmation`.

### Email Signup (Landing Page)

| Field | Type | Required | Validation | Error Message |
|-------|------|----------|------------|---------------|
| Email | email | Yes | valid email | "Please enter a valid email address" |

**On submit (demo):** Button shows loading (500ms), then input is replaced with "Thank you! You're on the list." Success state persists until page refresh.

---

## Cart Operations Detail

### Add to Cart

**Trigger:** "Add to Cart" button on product detail page.

**Logic:**
1. Create cart item ID: `${product.slug}-${hash(selectedOptions)}`
2. Calculate unit price: `product.basePrice + sum(option modifiers)`
3. Check if item with same ID already exists in cart:
   - If yes: increment quantity by 1
   - If no: add new CartItem with quantity 1
4. Dispatch to CartContext
5. Show success toast
6. Update navbar cart badge

### Remove from Cart

**Trigger:** Trash icon button on CartItem.

**Logic:**
1. Dispatch REMOVE_ITEM with item ID
2. CartItem animates out (AnimatePresence exit)
3. If cart becomes empty, show EmptyState (crossfade via AnimatePresence)

### Update Quantity

**Trigger:** +/- buttons on QuantityControl.

**Logic:**
1. If new quantity < 1: do nothing (min enforced)
2. Dispatch UPDATE_QUANTITY with item ID and new quantity
3. Price recalculates
4. Brief highlight pulse on the line total

### Clear Cart

**Trigger:** Only happens on successful order placement (checkout flow).

**Logic:**
1. Dispatch CLEAR_CART
2. All items removed from state and localStorage

### Price Calculations

```
Subtotal = sum(item.unitPrice * item.quantity) for all items
Tax = subtotal * 0.085 (8.5% demo rate)
Total = subtotal + tax
```

All prices stored and calculated in **cents** to avoid floating-point issues. Displayed using `Intl.NumberFormat`.

---

## Order Creation Flow

1. User clicks "Place Order (Demo)" on checkout page
2. Checkout form validates all fields via Zod
3. If invalid: focus first invalid field, show inline errors, stop
4. If valid:
   a. Set `isSubmitting = true` (button goes to loading state)
   b. Wait 800ms (simulated processing delay)
   c. Generate order ID via `generateOrderId()`
   d. Create Order object with: items (from cart), shipping (from form), subtotal, tax, total, createdAt
   e. Save Order to localStorage: `artisandoors-last-order`
   f. Clear cart (dispatch CLEAR_CART, remove `artisandoors-cart` from localStorage)
   g. Redirect to `/order-confirmation` via `router.push()`
5. Order confirmation page reads from `artisandoors-last-order`

---

## Error States

### Empty Cart

- **Where:** `/cart` when no items in cart
- **Display:** EmptyState component with ShoppingBag icon, "Your cart is empty", "Start exploring our collection of handcrafted doors.", "Browse Collection" PrimaryButton linking to `/shop`

### Product Not Found

- **Where:** `/product/[slug]` when slug does not match any product
- **Display:** Next.js `notFound()` triggers the `not-found.tsx` page. Shows "Product not found" with "Back to Shop" CTA.

### No Filter Results

- **Where:** `/shop` when active filters produce zero matching products
- **Display:** EmptyState component with Search icon, "No products match your filters", "Try adjusting your filters or browse our full collection.", "Clear Filters" button + "View All Products" link.

### No Order Found

- **Where:** `/order-confirmation` when no order in localStorage
- **Display:** EmptyState with Package icon, "No recent order found", "If you just placed an order, it may have been cleared from your browser.", "Return to Shop" CTA.

### Form Validation Errors

- **Where:** Contact form, Checkout form, Email signup
- **Display:** Inline error messages below each invalid field in red (`--error` color). Error message slides in with AnimatePresence. First invalid field receives focus on form submit.

### 404 Page

- **Display:** Centered layout, large "404" text in `--text-7xl`, "Page not found" heading, "The page you're looking for doesn't exist or has been moved.", "Return Home" PrimaryButton.

### Error Boundary

- **Display:** Centered layout, AlertTriangle icon, "Something went wrong", "An unexpected error occurred. Please try again.", "Try Again" SecondaryButton (calls `reset()`), "Return Home" PrimaryButton.

---

## Page Transitions

All page transitions use a consistent pattern via Framer Motion AnimatePresence:

**Enter animation:**
- `opacity: 0, y: 20` to `opacity: 1, y: 0`
- Duration: `500ms`
- Easing: `[0.16, 1, 0.3, 1]` (smooth deceleration)

**Exit animation:**
- `opacity: 1, y: 0` to `opacity: 0, y: -10`
- Duration: `300ms`
- Easing: `[0.16, 1, 0.3, 1]`

**Implementation:** A `PageTransition` client component wraps each page's content. It uses `usePathname()` as the `key` for `AnimatePresence` to trigger enter/exit on route changes.

**Scroll reset:** On page transition, Lenis scrolls to top instantly (no smooth scroll for this, just `window.scrollTo(0, 0)` or `lenis.scrollTo(0, { immediate: true })`).

---

## Loading States

### Initial Page Load

- Server-rendered HTML appears immediately (Server Components)
- Client components hydrate (Navbar, cart badge, interactive elements)
- Fonts load via `next/font` with `display: swap` (text visible immediately in fallback, then swaps)
- Images use `placeholder="blur"` with warm color blurDataURL

### Product Grid

- Data is in-memory, so no loading state is needed for initial render
- When filters change: instant re-render (no loading state needed)

### Cart Operations

- Add to cart: instant (in-memory state change), toast confirms
- Update quantity: instant, brief opacity pulse on price
- Remove item: exit animation (300ms), then re-flow

### Checkout Submission

- "Place Order" button transitions to loading state (spinner icon)
- 800ms simulated delay
- Redirect to confirmation page

### Image Loading

- Above-fold images: `priority` flag, loaded eagerly
- Below-fold images: lazy loaded by default
- All images: warm-toned blur placeholder during load
