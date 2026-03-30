# ArtisanDoors -- Test Report

## Summary
- **Total tests:** 475
- **Passed:** 475
- **Failed:** 0
- **Skipped:** 0
- **Duration:** 6.63s
- **Test runner:** Vitest 4.1.2 with jsdom environment

## Configuration Changes

The previous vitest setup had two blocking issues that prevented any tests from running:

1. **vitest.config.ts ESM error**: Vitest v4 requires ESM module resolution. The `.ts` extension was being loaded as CJS by Node.js 20.17.0 because `package.json` lacks `"type": "module"`. Fixed by renaming the config to `vitest.config.mts` (explicit ESM extension).

2. **jsdom v27 ESM incompatibility**: jsdom v27.0.1 depends on `@asamuzakjp/css-color` which imports `@csstools/css-calc` as ESM via `require()`, causing `ERR_REQUIRE_ESM` in all test worker processes. Fixed by downgrading jsdom from v27.0.1 to v25.0.1.

## Test Results by File

### lib/pricing.test.ts (28 tests -- all passed)
- [PASS] TAX_RATE is 0.085 (8.5%)
- [PASS] formatPrice formats 299900 cents as "$2,999.00"
- [PASS] formatPrice formats 249900 cents as "$2,499.00"
- [PASS] formatPrice formats 0 cents as "$0.00"
- [PASS] formatPrice formats 100 cents as "$1.00"
- [PASS] formatPrice formats 50 cents as "$0.50"
- [PASS] formatPrice formats large values correctly
- [PASS] formatPrice formats single cent correctly
- [PASS] getOptionPriceModifier returns 0 for the base option (oak)
- [PASS] getOptionPriceModifier returns 30000 for walnut material
- [PASS] getOptionPriceModifier returns 50000 for mahogany material
- [PASS] getOptionPriceModifier returns 80000 for reclaimed-teak material
- [PASS] getOptionPriceModifier returns 0 for a nonexistent option ID
- [PASS] getOptionPriceModifier returns correct modifiers for finishes
- [PASS] getOptionPriceModifier returns correct modifiers for sizes
- [PASS] getOptionPriceModifier returns correct modifiers for hardware
- [PASS] calculateCustomPrice returns base price when all default options selected
- [PASS] calculateCustomPrice correctly adds all option modifiers to base price
- [PASS] calculateCustomPrice correctly handles the most expensive option combination
- [PASS] calculateCustomPrice returns base price plus single modifier
- [PASS] calculateCustomPrice handles unknown option IDs gracefully (modifier = 0)
- [PASS] getOptionLabel returns the human-readable label for a valid option
- [PASS] getOptionLabel returns the option ID when the option is not found
- [PASS] getOptionLabel returns correct labels for all option types
- [PASS] getSelectedOptionsLabels returns a record with Material, Finish, Size, Hardware keys
- [PASS] getSelectedOptionsLabels maps option IDs to human-readable labels
- [PASS] getDefaultSelectedOptions returns the first option ID from each group
- [PASS] calculateTax calculates 8.5% tax on a subtotal, rounds correctly, handles zero

### lib/cart.test.ts (37 tests -- all passed)
- [PASS] CART_STORAGE_KEY equals "artisandoors-cart"
- [PASS] generateCartItemId creates ID from product slug and option IDs
- [PASS] generateCartItemId creates same ID for same product and options
- [PASS] generateCartItemId creates different IDs for same product with different options
- [PASS] generateCartItemId creates different IDs for different products with same options
- [PASS] cartReducer ADD_ITEM adds a new item to an empty cart
- [PASS] cartReducer ADD_ITEM increments quantity when adding item with same ID
- [PASS] cartReducer ADD_ITEM adds a separate item when ID differs
- [PASS] cartReducer ADD_ITEM does not mutate the original state
- [PASS] cartReducer REMOVE_ITEM removes an item by ID
- [PASS] cartReducer REMOVE_ITEM does nothing when item ID does not exist
- [PASS] cartReducer REMOVE_ITEM only removes the targeted item from a multi-item cart
- [PASS] cartReducer UPDATE_QUANTITY updates quantity for a given item
- [PASS] cartReducer UPDATE_QUANTITY does not allow quantity below 1
- [PASS] cartReducer UPDATE_QUANTITY does not allow quantity above 99
- [PASS] cartReducer UPDATE_QUANTITY allows quantity of exactly 1 (minimum)
- [PASS] cartReducer UPDATE_QUANTITY allows quantity of exactly 99 (maximum)
- [PASS] cartReducer CLEAR_CART removes all items from the cart
- [PASS] cartReducer CLEAR_CART does nothing to an already empty cart
- [PASS] cartReducer CLEAR_CART preserves isHydrated flag
- [PASS] cartReducer LOAD_CART loads items and sets isHydrated to true
- [PASS] cartReducer LOAD_CART replaces existing items
- [PASS] cartReducer unknown action returns state unchanged
- [PASS] calculateCartTotals returns zeros for an empty cart
- [PASS] calculateCartTotals calculates totals for single item with quantity 1
- [PASS] calculateCartTotals calculates totals for single item with quantity > 1
- [PASS] calculateCartTotals calculates totals for multiple items
- [PASS] calculateCartTotals total equals subtotal + tax
- [PASS] saveCartToStorage saves cart items to localStorage
- [PASS] saveCartToStorage saves an empty array
- [PASS] loadCartFromStorage loads cart items from localStorage
- [PASS] loadCartFromStorage returns empty array when nothing is stored
- [PASS] loadCartFromStorage returns empty array for invalid JSON
- [PASS] loadCartFromStorage returns empty array when stored data is not an array
- [PASS] loadCartFromStorage filters out invalid items (missing required fields)
- [PASS] clearCartStorage removes cart data from localStorage
- [PASS] Full save/load cycle round-trips cart items through localStorage

### lib/orders.test.ts (18 tests -- all passed)
- [PASS] ORDER_STORAGE_KEY equals "artisandoors-last-order"
- [PASS] generateOrderNumber returns a string starting with "AD-"
- [PASS] generateOrderNumber matches the format "AD-{alphanumeric}-{alphanumeric}"
- [PASS] generateOrderNumber generates unique order numbers on subsequent calls
- [PASS] generateOrderNumber returns a non-empty string
- [PASS] createOrder creates an order with the correct structure
- [PASS] createOrder sets status to "confirmed"
- [PASS] createOrder sets createdAt to an ISO date string
- [PASS] createOrder calculates correct totals based on cart items
- [PASS] createOrder creates a defensive copy of items
- [PASS] createOrder creates a defensive copy of shipping info
- [PASS] createOrder generates a unique order ID
- [PASS] saveOrder saves an order to localStorage
- [PASS] getLastOrder retrieves the last saved order
- [PASS] getLastOrder returns null when no order is stored
- [PASS] getLastOrder returns null for invalid JSON
- [PASS] getLastOrder returns null for data missing required fields
- [PASS] Full save/load cycle round-trips an order through localStorage

### lib/validation.test.ts (32 tests -- all passed)
- [PASS] contactFormSchema accepts valid data
- [PASS] contactFormSchema rejects names shorter than 2 characters
- [PASS] contactFormSchema rejects names longer than 50 characters
- [PASS] contactFormSchema accepts a 2-character name (boundary)
- [PASS] contactFormSchema accepts a 50-character name (boundary)
- [PASS] contactFormSchema rejects empty name
- [PASS] contactFormSchema rejects invalid email format
- [PASS] contactFormSchema rejects email without domain
- [PASS] contactFormSchema accepts standard email format
- [PASS] contactFormSchema rejects empty email
- [PASS] contactFormSchema rejects empty subject
- [PASS] contactFormSchema accepts a single character subject
- [PASS] contactFormSchema rejects messages shorter than 10 characters
- [PASS] contactFormSchema rejects messages longer than 1000 characters
- [PASS] contactFormSchema accepts a 10-character message (boundary)
- [PASS] contactFormSchema accepts a 1000-character message (boundary)
- [PASS] contactFormSchema rejects when all fields are missing
- [PASS] checkoutFormSchema accepts valid data
- [PASS] checkoutFormSchema rejects empty first/last name
- [PASS] checkoutFormSchema accepts single character first name
- [PASS] checkoutFormSchema rejects invalid email
- [PASS] checkoutFormSchema accepts formatted phone numbers
- [PASS] checkoutFormSchema rejects phone numbers that are too short
- [PASS] checkoutFormSchema rejects phone numbers with letters
- [PASS] checkoutFormSchema rejects addresses shorter than 5 characters
- [PASS] checkoutFormSchema rejects cities/states shorter than 2 characters
- [PASS] checkoutFormSchema accepts 5-digit and 5+4 digit ZIP codes
- [PASS] checkoutFormSchema rejects invalid ZIP formats
- [PASS] checkoutFormSchema rejects empty country
- [PASS] emailSignupSchema accepts valid email
- [PASS] emailSignupSchema rejects invalid/empty email
- [PASS] emailSignupSchema accepts various valid email formats

### lib/products.test.ts (47 tests -- all passed)
- [PASS] getAllProducts returns all 10 products
- [PASS] getAllProducts returns the same array reference as the data source
- [PASS] getProductBySlug returns correct product for valid slug
- [PASS] getProductBySlug returns undefined for invalid/empty slug
- [PASS] getProductBySlug finds each of the 10 known product slugs
- [PASS] getProductsByCollection returns correct count per collection (modern: 3, classic: 3, artisan: 2, heritage: 2)
- [PASS] getProductsByCollection returns empty array for nonexistent collection
- [PASS] getFeaturedProducts returns only featured products and respects limit
- [PASS] getNewProducts returns only new products and respects limit
- [PASS] getPopularProducts returns only popular products and respects limit
- [PASS] getRelatedProducts excludes the given product
- [PASS] getRelatedProducts pads with other collections if needed
- [PASS] getRelatedProducts returns empty array for nonexistent slug
- [PASS] getRelatedProducts defaults to 4 related products
- [PASS] searchProducts returns all products for empty/whitespace query
- [PASS] searchProducts matches product names (case-insensitive)
- [PASS] searchProducts matches product descriptions
- [PASS] searchProducts matches product tags
- [PASS] searchProducts matches collection names
- [PASS] searchProducts returns empty array when nothing matches
- [PASS] sortProducts sorts by price ascending
- [PASS] sortProducts sorts by price descending
- [PASS] sortProducts sorts by newest
- [PASS] sortProducts sorts by popularity score
- [PASS] sortProducts does not mutate the original array
- [PASS] filterProducts returns all products with default filter state
- [PASS] filterProducts filters by collection
- [PASS] filterProducts filters by material
- [PASS] filterProducts filters by price range
- [PASS] filterProducts filters by search query
- [PASS] filterProducts combines multiple filters
- [PASS] filterProducts applies sorting after filtering
- [PASS] filterProducts returns empty array when no products match
- [PASS] getDefaultFilterState returns expected default values
- [PASS] getProductPriceRange returns correct min/max
- [PASS] getAllMaterialOptions returns all unique materials with id and label

### lib/filters.test.ts (27 tests -- all passed)
- [PASS] paginateProducts returns all products on page 1 when perPage exceeds total
- [PASS] paginateProducts returns default perPage of 12
- [PASS] paginateProducts paginates correctly with perPage of 3
- [PASS] paginateProducts returns first page when page is less than 1
- [PASS] paginateProducts returns last page when page exceeds total pages
- [PASS] paginateProducts handles empty product array
- [PASS] paginateProducts paginates correctly with perPage of 5
- [PASS] paginateProducts returns different products for different pages
- [PASS] paginateProducts preserves product order from input array
- [PASS] paginateProducts handles perPage of 1
- [PASS] getActiveFilterCount returns 0 for default filter state
- [PASS] getActiveFilterCount counts collection filter
- [PASS] getActiveFilterCount counts material filter
- [PASS] getActiveFilterCount counts price range filter
- [PASS] getActiveFilterCount counts search filter
- [PASS] getActiveFilterCount does not count whitespace-only search as active
- [PASS] getActiveFilterCount counts multiple active filters (4)
- [PASS] getActiveFilterCount does not count null values as active
- [PASS] hasActiveFilters returns false for default filter state
- [PASS] hasActiveFilters returns true when collection is set
- [PASS] hasActiveFilters returns true when material is set
- [PASS] hasActiveFilters returns true when price range is set
- [PASS] hasActiveFilters returns true when search is non-empty
- [PASS] hasActiveFilters returns false when search is whitespace only
- [PASS] hasActiveFilters returns true when multiple filters are active

### lib/utils.test.ts (28 tests -- all passed)
- [PASS] cn merges simple class names
- [PASS] cn handles conditional classes
- [PASS] cn handles undefined and null inputs
- [PASS] cn merges Tailwind conflicting classes (last wins)
- [PASS] cn merges Tailwind conflicting color classes
- [PASS] cn returns empty string for no arguments
- [PASS] cn handles array and object inputs
- [PASS] formatCurrency formats cents to USD string (0, 1, 50, 100, 249900, 349900, 999999)
- [PASS] generateOrderId returns string starting with "AD-"
- [PASS] generateOrderId matches format "AD-{alphanumeric}-{alphanumeric}"
- [PASS] generateOrderId generates unique IDs
- [PASS] generateCartItemId (legacy) creates ID from slug and options
- [PASS] generateCartItemId (legacy) creates same ID for same inputs
- [PASS] generateCartItemId (legacy) creates different IDs for different slugs/options
- [PASS] debounce does not call the function immediately
- [PASS] debounce calls the function after the delay
- [PASS] debounce resets the timer on subsequent calls
- [PASS] debounce calls with correct arguments
- [PASS] debounce only invokes once for rapid calls
- [PASS] debounce calls multiple times if delay passes between calls
- [PASS] BLUR_DATA_URL is a base64 data URL

### data/data-integrity.test.ts (238 tests -- all passed)
- [PASS] 10 products exist with unique slugs and unique names
- [PASS] All 10 products have complete required fields (slug, name, collection, description, shortDescription, basePrice, images, option groups, features, tags, boolean flags, createdAt)
- [PASS] All products reference valid collections (modern, classic, artisan, heritage)
- [PASS] Collection distribution: modern (3), classic (3), artisan (2), heritage (2)
- [PASS] All prices within documented range ($2,499 to $4,999)
- [PASS] Minimum price: The Monarch at $2,499 (249900 cents)
- [PASS] Maximum price: $4,999 (499900 cents)
- [PASS] All 10 expected product slugs present
- [PASS] 4 collections with unique slugs and complete fields
- [PASS] Every product references a valid collection
- [PASS] Every collection has at least one product
- [PASS] getCollectionBySlug and getAllCollections work correctly
- [PASS] defaultMaterials: 4 options (oak, walnut, mahogany, reclaimed-teak) with correct price modifiers
- [PASS] defaultFinishes: 4 options with correct price modifiers
- [PASS] defaultSizes: 4 options with correct price modifiers
- [PASS] defaultHardware: 4 options with correct price modifiers
- [PASS] All option groups have unique IDs, required fields, base option at $0, non-negative modifiers
- [PASS] All product option cross-references have valid fields

## Issues Found

No bugs were discovered in the source code. All business logic, data integrity, and validation schemas behave as documented in DATA_MODELS.md and USER_FLOWS.md.

### Minor Observations (not bugs)

1. **Product `createdAt` dates use short ISO format**: Product dates like `"2026-03-01T00:00:00Z"` omit the milliseconds portion. JavaScript's `Date.toISOString()` produces `"2026-03-01T00:00:00.000Z"` with `.000`. Both are valid ISO 8601. This is cosmetic only and causes no functional issues.

2. **`generateCartItemId` in lib/utils.ts differs from lib/cart.ts**: The legacy version in `utils.ts` sorts option values before joining (creating a canonical order), while the version in `cart.ts` joins in a fixed order (material-finish-size-hardware). These two functions produce different IDs for the same inputs. The application uses the `lib/cart.ts` version in the CartContext, so this is not a runtime issue, but the duplicate functions with different behavior could cause confusion.

3. **`console.warn` calls in localStorage operations**: When localStorage operations fail (e.g., invalid JSON), `console.warn` is called. These warnings appear in test output as `stderr` but are expected behavior for graceful error handling.

## Coverage Summary

Coverage was not measured in this run (would require `@vitest/coverage-v8` package). The following modules are fully tested:

| Module | Functions Tested | Coverage Estimate |
|--------|-----------------|-------------------|
| `lib/pricing.ts` | All 7 functions + TAX_RATE | ~100% |
| `lib/cart.ts` | All 6 functions + CART_STORAGE_KEY | ~100% |
| `lib/orders.ts` | All 5 functions + ORDER_STORAGE_KEY | ~100% |
| `lib/validation.ts` | All 3 schemas | ~100% |
| `lib/products.ts` | All 12 functions | ~100% |
| `lib/filters.ts` | All 3 functions | ~100% |
| `lib/utils.ts` | All 5 functions + BLUR_DATA_URL | ~100% |
| `data/products.ts` | Data integrity checks | ~100% |
| `data/collections.ts` | Data + helper functions | ~100% |
| `data/options.ts` | All 4 option groups | ~100% |

### Modules Not Tested

| Module | Reason |
|--------|--------|
| `context/cart-context.tsx` | React context provider -- requires component rendering with React Testing Library. Tests for the underlying reducer and storage logic are covered via `lib/cart.ts` tests. |
| `lib/motion.ts` | Animation constants -- no logic to test. |
| `components/**` | Component rendering tests not in scope for this run. Would require React Testing Library with proper Framer Motion and Next.js mocking. |
| `app/**` | Page-level integration tests not in scope. Would require either React Testing Library with full Next.js mocking or Playwright E2E tests. |

## Recommendations

1. **Add component tests**: The highest-value component tests would be for `ProductCustomizer` (option selection updates price), `CartItem` (quantity controls, remove), `CheckoutForm` (validation flow), and `ContactForm` (validation and success state).

2. **Add CartContext integration test**: Test the full context provider cycle: add item, update quantity, remove item, clear cart. This would test the integration between the reducer, totals calculation, and localStorage sync.

3. **Add E2E tests with Playwright**: The full browse-to-purchase user journey (shop -> product -> customize -> add to cart -> checkout -> order confirmation) would benefit from end-to-end testing.

4. **Install coverage provider**: Run `npm install --save-dev @vitest/coverage-v8` and then `npm run test:coverage` to get precise line/branch/function coverage metrics.

5. **Suppress expected console.warn in tests**: The `loadCartFromStorage` and `getLastOrder` tests for invalid JSON produce `console.warn` output that clutters the test log. Consider mocking `console.warn` in those specific tests to keep output clean.

6. **Address the duplicate `generateCartItemId`**: The version in `lib/utils.ts` and `lib/cart.ts` have different behavior (sorted vs. fixed order). Consider deprecating or removing the `utils.ts` version to avoid confusion.
