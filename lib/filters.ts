import type { Product, FilterState } from '@/types';

// Re-export from products.ts for backward compatibility
export { filterProducts, sortProducts } from './products';

/**
 * Paginates a product array into pages.
 * Returns the current page's products and the total page count.
 */
export function paginateProducts(
  products: Product[],
  page: number,
  perPage = 12
): { products: Product[]; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(products.length / perPage));
  const safePage = Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * perPage;
  const end = start + perPage;

  return {
    products: products.slice(start, end),
    totalPages,
  };
}

/**
 * Returns the count of active filters (non-null, non-empty values).
 * Useful for showing a "3 filters active" badge.
 */
export function getActiveFilterCount(filters: FilterState): number {
  let count = 0;
  if (filters.collection) count++;
  if (filters.material) count++;
  if (filters.priceRange) count++;
  if (filters.search.trim()) count++;
  return count;
}

/**
 * Checks whether any filters are active.
 */
export function hasActiveFilters(filters: FilterState): boolean {
  return getActiveFilterCount(filters) > 0;
}
