# ArtisanDoors -- Data Models & API Contract

> This document is the contract between the data/logic layer (logician) and the
> frontend layer (builder). It describes every type, data source, utility function,
> context provider, and validation schema the frontend can rely on.

---

## Table of Contents

1. [TypeScript Interfaces](#typescript-interfaces)
2. [Mock Data](#mock-data)
3. [Utility Functions](#utility-functions)
4. [Cart Context](#cart-context)
5. [Validation Schemas](#validation-schemas)
6. [localStorage Keys](#localstorage-keys)
7. [Import Cheat Sheet](#import-cheat-sheet)

---

## TypeScript Interfaces

All types are defined in `types/` and re-exported from `types/index.ts`.

### Product Types (`types/product.ts`)

```ts
interface ProductImage {
  src: string;       // Unsplash URL (e.g., "https://images.unsplash.com/photo-...?w=800&q=80")
  alt: string;       // Descriptive alt text
  width: number;     // Original width in pixels
  height: number;    // Original height in pixels
}

interface Option {
  id: string;            // Unique ID (e.g., "oak", "matte-black")
  label: string;         // Human-readable label (e.g., "Solid Oak")
  priceModifier: number; // Price change in cents (+30000 = +$300, 0 = no change)
  description?: string;  // Optional description of the option
}

interface OptionGroup {
  label: string;      // Group name: "Material", "Finish", "Size", "Hardware"
  options: Option[];   // Available options in this group
}

interface Product {
  slug: string;                                        // URL-safe identifier
  name: string;                                        // Display name
  collection: 'modern' | 'classic' | 'artisan' | 'heritage';
  description: string;                                 // Full description (2-3 sentences)
  shortDescription: string;                            // One-line description for cards
  basePrice: number;                                   // Base price in cents
  images: ProductImage[];                              // 3+ images per product
  materials: OptionGroup;                              // Material customization options
  finishes: OptionGroup;                               // Finish customization options
  sizes: OptionGroup;                                  // Size customization options
  hardware: OptionGroup;                               // Hardware customization options
  features: string[];                                  // Bullet-point features
  tags: string[];                                      // Search/filter tags
  isFeatured: boolean;                                 // Show in featured section
  isNew: boolean;                                      // Show "New" badge
  isPopular: boolean;                                  // Boost in popularity sort
  inStock: boolean;                                    // Availability flag
  createdAt: string;                                   // ISO date for "newest" sorting
}

interface Collection {
  slug: string;        // URL-safe identifier
  name: string;        // Display name
  description: string; // Collection description
  image: string;       // Representative image URL
}

interface SelectedOptions {
  material: string;    // Option ID from materials group
  finish: string;      // Option ID from finishes group
  size: string;        // Option ID from sizes group
  hardware: string;    // Option ID from hardware group
}

type SortOption = 'price-asc' | 'price-desc' | 'newest' | 'popular';

interface FilterState {
  collection: string | null;          // Collection slug or null for "all"
  material: string | null;            // Material option ID or null for "all"
  priceRange: [number, number] | null; // [min, max] in cents, or null for "all"
  search: string;                     // Search query (empty string = no search)
  sortBy: SortOption;                 // Current sort order
}
```

### Cart Types (`types/cart.ts`)

```ts
interface CartItem {
  id: string;                                    // Unique ID: "{slug}::{material}-{finish}-{size}-{hardware}"
  productSlug: string;                           // Product slug for lookups
  productName: string;                           // Cached product name
  productImage: string;                          // Cached first product image URL
  selectedOptions: SelectedOptions;              // Chosen option IDs
  selectedOptionsLabels: Record<string, string>; // Human-readable: { Material: "Walnut", ... }
  quantity: number;                              // Item count (1-99)
  unitPrice: number;                             // Base price + all modifiers, in cents
}

interface CartState {
  items: CartItem[];     // All items in the cart
  isHydrated: boolean;   // True after localStorage has been loaded
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }                        // item ID
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartTotals {
  totalItems: number;  // Sum of all item quantities
  subtotal: number;    // Sum of (unitPrice * quantity) for all items, in cents
  tax: number;         // 8.5% of subtotal, in cents (rounded)
  total: number;       // subtotal + tax, in cents
}

interface CartContextValue extends CartState, CartTotals {
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}
```

### Order Types (`types/order.ts`)

```ts
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

type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';

interface Order {
  id: string;              // Generated order number (e.g., "AD-M1KF2-X9T3")
  items: CartItem[];       // Snapshot of cart items at time of order
  subtotal: number;        // In cents
  tax: number;             // In cents
  total: number;           // In cents
  shipping: ShippingInfo;  // Customer shipping details
  status: OrderStatus;     // Always "confirmed" for demo orders
  createdAt: string;       // ISO date string
}
```

---

## Mock Data

### Products (`data/products.ts`)

**10 products** across 4 collections:

| # | Slug | Name | Collection | Base Price |
|---|------|------|-----------|-----------|
| 1 | `metropolitan-edge` | The Metropolitan Edge | Modern | $3,499 |
| 2 | `aurora-glass` | The Aurora Glass | Modern | $4,199 |
| 3 | `zen-pivot` | The Zen Pivot | Modern | $4,999 |
| 4 | `villa-classica` | The Villa Classica | Classic | $2,999 |
| 5 | `the-monarch` | The Monarch | Classic | $2,499 |
| 6 | `cambridge-arch` | The Cambridge Arch | Classic | $3,799 |
| 7 | `mosaic-artistry` | The Mosaic Artistry | Artisan | $4,499 |
| 8 | `carved-wilderness` | The Carved Wilderness | Artisan | $4,999 |
| 9 | `andalusian-gate` | The Andalusian Gate | Heritage | $4,599 |
| 10 | `kyoto-shoji` | The Kyoto Shoji | Heritage | $3,899 |

**Import:** `import { products } from '@/data/products'`

### Collections (`data/collections.ts`)

4 collections: Modern, Classic, Artisan, Heritage.

**Import:**
```ts
import { collections, getCollectionBySlug, getAllCollections } from '@/data/collections'
```

### Customization Options (`data/options.ts`)

All products share the same default option groups (products reference them directly):

| Group | Options | Price Modifiers |
|-------|---------|----------------|
| Material | Solid Oak, Walnut, Mahogany, Reclaimed Teak | +$0, +$300, +$500, +$800 |
| Finish | Natural, Matte Black, Brushed Bronze, Hand-Lacquered | +$0, +$200, +$350, +$500 |
| Size | Standard 36"x80", Wide 42"x80", Double 72"x80", Grand 72"x96" | +$0, +$300, +$600, +$1,000 |
| Hardware | Classic Brass, Matte Black, Artisan Iron, Crystal | +$0, +$150, +$300, +$400 |

**Import:**
```ts
import { defaultMaterials, defaultFinishes, defaultSizes, defaultHardware } from '@/data/options'
```

### Site Data (`data/site.ts`)

Contains: `navLinks`, `footerLinks`, `contactInfo`, `contactSubjects`, `countries`,
`marqueeItems`, `metrics`, `features`.

**Import:** `import { navLinks, contactInfo, ... } from '@/data/site'`

---

## Utility Functions

### Product Utilities (`lib/products.ts`)

| Function | Signature | Description |
|----------|-----------|-------------|
| `getAllProducts` | `() => Product[]` | Returns all 10 products |
| `getProductBySlug` | `(slug: string) => Product \| undefined` | Find product by URL slug |
| `getProductsByCollection` | `(collectionSlug: string) => Product[]` | Filter by collection |
| `getFeaturedProducts` | `(limit?: number) => Product[]` | Get featured products |
| `getNewProducts` | `(limit?: number) => Product[]` | Get new products |
| `getPopularProducts` | `(limit?: number) => Product[]` | Get popular products |
| `getRelatedProducts` | `(productSlug: string, limit?: number) => Product[]` | Same collection, excl. current; pads from other collections if needed |
| `searchProducts` | `(query: string) => Product[]` | Search by name, description, tags |
| `sortProducts` | `(items: Product[], sortBy: SortOption) => Product[]` | Sort products (returns new array) |
| `filterProducts` | `(items: Product[], filters: FilterState) => Product[]` | Apply all filters + sort |
| `getDefaultFilterState` | `() => FilterState` | Returns initial filter state |
| `getProductPriceRange` | `() => [number, number]` | Min/max base price across all products |
| `getAllMaterialOptions` | `() => { id: string; label: string }[]` | Unique material options |

### Pricing Utilities (`lib/pricing.ts`)

| Function | Signature | Description |
|----------|-----------|-------------|
| `formatPrice` | `(priceInCents: number) => string` | Format cents as "$X,XXX.XX" |
| `calculateCustomPrice` | `(product: Product, selectedOptions: SelectedOptions) => number` | Base price + all option modifiers |
| `getOptionPriceModifier` | `(product, optionType, optionId) => number` | Get a single option's modifier |
| `getOptionLabel` | `(product, optionType, optionId) => string` | Get human-readable option label |
| `getSelectedOptionsLabels` | `(product, selectedOptions) => Record<string, string>` | All option labels as a record |
| `getDefaultSelectedOptions` | `(product: Product) => SelectedOptions` | First option in each group |
| `calculateTax` | `(subtotalInCents: number) => number` | 8.5% tax calculation |
| `TAX_RATE` | `0.085` | Tax rate constant |

### Cart Utilities (`lib/cart.ts`)

| Function | Signature | Description |
|----------|-----------|-------------|
| `generateCartItemId` | `(productSlug, selectedOptions) => string` | Unique ID from product + options |
| `cartReducer` | `(state: CartState, action: CartAction) => CartState` | Pure reducer for cart state |
| `calculateCartTotals` | `(items: CartItem[]) => CartTotals` | Compute totalItems, subtotal, tax, total |
| `saveCartToStorage` | `(items: CartItem[]) => void` | Persist to localStorage |
| `loadCartFromStorage` | `() => CartItem[]` | Load from localStorage (with validation) |
| `clearCartStorage` | `() => void` | Remove cart from localStorage |
| `CART_STORAGE_KEY` | `'artisandoors-cart'` | localStorage key constant |

### Order Utilities (`lib/orders.ts`)

| Function | Signature | Description |
|----------|-----------|-------------|
| `generateOrderNumber` | `() => string` | Generate "AD-{timestamp}-{random}" |
| `createOrder` | `(items: CartItem[], shippingInfo: ShippingInfo) => Order` | Create order object (does not persist) |
| `saveOrder` | `(order: Order) => void` | Save to localStorage |
| `getLastOrder` | `() => Order \| null` | Retrieve last order from localStorage |
| `clearLastOrder` | `() => void` | Remove order from localStorage |
| `ORDER_STORAGE_KEY` | `'artisandoors-last-order'` | localStorage key constant |

### Filter Utilities (`lib/filters.ts`)

| Function | Signature | Description |
|----------|-----------|-------------|
| `paginateProducts` | `(products, page, perPage?) => { products, totalPages }` | Paginate product arrays |
| `getActiveFilterCount` | `(filters: FilterState) => number` | Count of active filters |
| `hasActiveFilters` | `(filters: FilterState) => boolean` | Whether any filter is active |

### General Utilities (`lib/utils.ts`)

| Function | Signature | Description |
|----------|-----------|-------------|
| `cn` | `(...inputs: ClassValue[]) => string` | Tailwind class name merger (clsx + tw-merge) |
| `formatCurrency` | `(cents: number) => string` | Same as `formatPrice` (alias) |
| `generateOrderId` | `() => string` | Same as `generateOrderNumber` (alias) |
| `generateCartItemId` | `(slug, options) => string` | Legacy version (takes Record) |
| `debounce` | `(fn, delay) => debouncedFn` | Generic debounce utility |
| `BLUR_DATA_URL` | `string` | Base64 1x1 pixel for image placeholders |

### Motion Constants (`lib/motion.ts`)

Spring configs, easing curves, durations, and reusable animation variants for
Framer Motion. See file for full export list.

---

## Cart Context

### Provider Setup

Wrap the app (in `app/layout.tsx`) with `CartProvider`:

```tsx
import { CartProvider } from '@/context/cart-context';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
```

### useCart() Hook

```tsx
import { useCart } from '@/context/cart-context';

function MyComponent() {
  const {
    // State
    items,          // CartItem[] -- all items in cart
    isHydrated,     // boolean -- true after localStorage loaded

    // Computed totals
    totalItems,     // number -- sum of all quantities
    subtotal,       // number -- in cents
    tax,            // number -- in cents (8.5%)
    total,          // number -- in cents

    // Actions
    addItem,        // (item: CartItem) => void
    removeItem,     // (id: string) => void
    updateQuantity, // (id: string, quantity: number) => void
    clearCart,       // () => void
  } = useCart();
}
```

### Adding an Item to Cart

The frontend must construct a full `CartItem` before calling `addItem`.
Here is the pattern:

```tsx
import { useCart } from '@/context/cart-context';
import { generateCartItemId } from '@/lib/cart';
import { calculateCustomPrice, getSelectedOptionsLabels } from '@/lib/pricing';

function handleAddToCart(product: Product, selectedOptions: SelectedOptions) {
  const { addItem } = useCart();

  const cartItem: CartItem = {
    id: generateCartItemId(product.slug, selectedOptions),
    productSlug: product.slug,
    productName: product.name,
    productImage: product.images[0]?.src ?? '',
    selectedOptions,
    selectedOptionsLabels: getSelectedOptionsLabels(product, selectedOptions),
    quantity: 1,
    unitPrice: calculateCustomPrice(product, selectedOptions),
  };

  addItem(cartItem);
}
```

### Hydration Behavior

- On the server (SSR), `items` is `[]` and `isHydrated` is `false`.
- On mount, `LOAD_CART` is dispatched with items from localStorage.
- `isHydrated` becomes `true` after the load.
- Components that depend on cart data (e.g., cart badge count) should check
  `isHydrated` to avoid flash of empty state.

### localStorage Sync

- Writes are debounced by 300ms to avoid rapid writes during quantity changes.
- `clearCart()` immediately clears localStorage (no debounce).
- All localStorage operations are wrapped in try/catch for SSR safety,
  quota exceeded errors, and private browsing mode.

---

## Validation Schemas

All schemas are defined in `lib/validation.ts` using Zod.

### Contact Form

```ts
import { contactFormSchema, type ContactFormData } from '@/lib/validation';

// Fields: name, email, subject, message
// Use with React Hook Form:
const { register, handleSubmit, formState } = useForm<ContactFormData>({
  resolver: zodResolver(contactFormSchema),
  mode: 'onBlur',
});
```

| Field | Type | Validation |
|-------|------|-----------|
| name | string | Required, 2-50 chars |
| email | string | Required, valid email |
| subject | string | Required, min 1 char |
| message | string | Required, 10-1000 chars |

### Checkout Form

```ts
import { checkoutFormSchema, type CheckoutFormData } from '@/lib/validation';
```

| Field | Type | Validation |
|-------|------|-----------|
| firstName | string | Required, min 1 char |
| lastName | string | Required, min 1 char |
| email | string | Required, valid email |
| phone | string | Required, 7-15 digits (with formatting chars) |
| address | string | Required, min 5 chars |
| city | string | Required, min 2 chars |
| state | string | Required, min 2 chars |
| zip | string | Required, US format (5 or 5-4 digits) |
| country | string | Required, min 1 char |

### Email Signup

```ts
import { emailSignupSchema, type EmailSignupData } from '@/lib/validation';
```

| Field | Type | Validation |
|-------|------|-----------|
| email | string | Required, valid email |

---

## localStorage Keys

| Key | Content | Set By | Read By |
|-----|---------|--------|---------|
| `artisandoors-cart` | `CartItem[]` as JSON | CartProvider (debounced) | CartProvider on mount |
| `artisandoors-last-order` | `Order` as JSON | Checkout page on order creation | Order confirmation page |

Both keys can be cleared by the user clearing browser storage. All reads
handle missing/invalid data gracefully by returning empty defaults.

---

## Import Cheat Sheet

```ts
// Types (all from one barrel export)
import type { Product, CartItem, Order, SelectedOptions, FilterState, ... } from '@/types';

// Mock data
import { products } from '@/data/products';
import { collections, getCollectionBySlug } from '@/data/collections';
import { defaultMaterials, defaultFinishes, defaultSizes, defaultHardware } from '@/data/options';
import { navLinks, footerLinks, contactInfo, contactSubjects, countries, marqueeItems, metrics, features } from '@/data/site';

// Product utilities
import { getAllProducts, getProductBySlug, getFeaturedProducts, getRelatedProducts, filterProducts, sortProducts, searchProducts, getDefaultFilterState } from '@/lib/products';

// Pricing
import { formatPrice, calculateCustomPrice, getDefaultSelectedOptions, getSelectedOptionsLabels, TAX_RATE } from '@/lib/pricing';

// Cart logic
import { generateCartItemId, calculateCartTotals, CART_STORAGE_KEY } from '@/lib/cart';

// Orders
import { createOrder, saveOrder, getLastOrder, ORDER_STORAGE_KEY } from '@/lib/orders';

// Filters (pagination)
import { paginateProducts, getActiveFilterCount, hasActiveFilters } from '@/lib/filters';

// Validation
import { contactFormSchema, checkoutFormSchema, emailSignupSchema } from '@/lib/validation';
import type { ContactFormData, CheckoutFormData, EmailSignupData } from '@/lib/validation';

// Cart context
import { CartProvider, useCart } from '@/context/cart-context';

// General utilities
import { cn, formatCurrency, BLUR_DATA_URL } from '@/lib/utils';

// Motion
import { EASE_SMOOTH, DURATION_SLOW, fadeInUp, staggerContainer } from '@/lib/motion';
```

---

## Price Calculation Flow

All prices are stored and calculated in **cents** (integers) to avoid
floating-point precision issues. Display formatting uses `Intl.NumberFormat`.

```
Base Price (e.g., 349900 = $3,499.00)
  + Material Modifier (e.g., +50000 = +$500.00)
  + Finish Modifier (e.g., +20000 = +$200.00)
  + Size Modifier (e.g., +60000 = +$600.00)
  + Hardware Modifier (e.g., +30000 = +$300.00)
  ────────────────────────────────────
  = Unit Price (509900 = $5,099.00)
  x Quantity
  ────────────────────────────────────
  = Line Total

  Sum of all line totals = Subtotal
  Subtotal x 0.085 (rounded) = Tax
  Subtotal + Tax = Total
```

---

## Order Creation Flow

1. User completes checkout form (validated by `checkoutFormSchema`).
2. `createOrder(cartItems, shippingInfo)` produces an `Order` object.
3. `saveOrder(order)` persists to `localStorage['artisandoors-last-order']`.
4. `clearCart()` empties the cart state and `localStorage['artisandoors-cart']`.
5. Redirect to `/order-confirmation`.
6. Order confirmation page calls `getLastOrder()` to read the stored order.
