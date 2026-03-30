import { products } from '@/data/products';
import type { Product, FilterState, SortOption } from '@/types';

/**
 * Returns all products.
 */
export function getAllProducts(): Product[] {
  return products;
}

/**
 * Finds a product by its slug. Returns undefined if not found.
 */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/**
 * Returns products belonging to a specific collection.
 */
export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((p) => p.collection === collectionSlug);
}

/**
 * Returns featured products, optionally limited.
 */
export function getFeaturedProducts(limit?: number): Product[] {
  const featured = products.filter((p) => p.isFeatured);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Returns new products, optionally limited.
 */
export function getNewProducts(limit?: number): Product[] {
  const newProducts = products.filter((p) => p.isNew);
  return limit ? newProducts.slice(0, limit) : newProducts;
}

/**
 * Returns popular products, optionally limited.
 */
export function getPopularProducts(limit?: number): Product[] {
  const popular = products.filter((p) => p.isPopular);
  return limit ? popular.slice(0, limit) : popular;
}

/**
 * Returns related products (same collection, excluding the given product).
 */
export function getRelatedProducts(productSlug: string, limit: number = 4): Product[] {
  const product = getProductBySlug(productSlug);
  if (!product) return [];

  const related = products.filter(
    (p) => p.collection === product.collection && p.slug !== productSlug
  );

  // If not enough in same collection, pad with other products
  if (related.length < limit) {
    const others = products.filter(
      (p) => p.collection !== product.collection && p.slug !== productSlug
    );
    return [...related, ...others].slice(0, limit);
  }

  return related.slice(0, limit);
}

/**
 * Searches products by name and description (case-insensitive).
 */
export function searchProducts(query: string): Product[] {
  if (!query.trim()) return products;

  const lowerQuery = query.toLowerCase().trim();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.shortDescription.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      p.collection.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Sorts an array of products by the given sort option.
 * Returns a new array (does not mutate the input).
 */
export function sortProducts(items: Product[], sortBy: SortOption): Product[] {
  const sorted = [...items];

  switch (sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => a.basePrice - b.basePrice);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.basePrice - a.basePrice);
      break;
    case 'newest':
      sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case 'popular':
      // Popularity score: isFeatured = 3, isPopular = 2, isNew = 1
      sorted.sort((a, b) => {
        const scoreA = (a.isFeatured ? 3 : 0) + (a.isPopular ? 2 : 0) + (a.isNew ? 1 : 0);
        const scoreB = (b.isFeatured ? 3 : 0) + (b.isPopular ? 2 : 0) + (b.isNew ? 1 : 0);
        return scoreB - scoreA;
      });
      break;
  }

  return sorted;
}

/**
 * Applies all active filters to a product list.
 * Returns a new filtered and sorted array.
 */
export function filterProducts(items: Product[], filters: FilterState): Product[] {
  let result = [...items];

  // Filter by collection
  if (filters.collection) {
    result = result.filter((p) => p.collection === filters.collection);
  }

  // Filter by material (checks if the product has a material option matching the filter)
  if (filters.material) {
    result = result.filter((p) =>
      p.materials.options.some((opt) => opt.id === filters.material)
    );
  }

  // Filter by price range
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    result = result.filter((p) => p.basePrice >= min && p.basePrice <= max);
  }

  // Filter by search query
  if (filters.search.trim()) {
    const lowerQuery = filters.search.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.shortDescription.toLowerCase().includes(lowerQuery) ||
        p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // Sort
  result = sortProducts(result, filters.sortBy);

  return result;
}

/**
 * Returns the default/initial filter state.
 */
export function getDefaultFilterState(): FilterState {
  return {
    collection: null,
    material: null,
    priceRange: null,
    search: '',
    sortBy: 'popular',
  };
}

/**
 * Returns the price range across all products [min, max] in cents.
 */
export function getProductPriceRange(): [number, number] {
  if (products.length === 0) return [0, 0];
  const prices = products.map((p) => p.basePrice);
  return [Math.min(...prices), Math.max(...prices)];
}

/**
 * Returns all unique material option IDs across all products.
 */
export function getAllMaterialOptions(): { id: string; label: string }[] {
  const seen = new Map<string, string>();
  for (const product of products) {
    for (const opt of product.materials.options) {
      if (!seen.has(opt.id)) {
        seen.set(opt.id, opt.label);
      }
    }
  }
  return Array.from(seen.entries()).map(([id, label]) => ({ id, label }));
}
