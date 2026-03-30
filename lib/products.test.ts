import { describe, it, expect } from 'vitest';
import {
  getAllProducts,
  getProductBySlug,
  getProductsByCollection,
  getFeaturedProducts,
  getNewProducts,
  getPopularProducts,
  getRelatedProducts,
  searchProducts,
  sortProducts,
  filterProducts,
  getDefaultFilterState,
  getProductPriceRange,
  getAllMaterialOptions,
} from './products';
import { products } from '@/data/products';

describe('lib/products', () => {
  // ── getAllProducts ─────────────────────────────────────────────────

  describe('getAllProducts', () => {
    it('returns all 10 products', () => {
      const result = getAllProducts();
      expect(result).toHaveLength(10);
    });

    it('returns the same array reference as the data source', () => {
      const result = getAllProducts();
      expect(result).toBe(products);
    });
  });

  // ── getProductBySlug ──────────────────────────────────────────────

  describe('getProductBySlug', () => {
    it('returns the correct product for a valid slug', () => {
      const product = getProductBySlug('metropolitan-edge');
      expect(product).toBeDefined();
      expect(product!.name).toBe('The Metropolitan Edge');
      expect(product!.collection).toBe('modern');
    });

    it('returns undefined for an invalid slug', () => {
      const product = getProductBySlug('nonexistent-door');
      expect(product).toBeUndefined();
    });

    it('returns undefined for an empty string', () => {
      const product = getProductBySlug('');
      expect(product).toBeUndefined();
    });

    it('finds each of the 10 known product slugs', () => {
      const slugs = [
        'metropolitan-edge',
        'aurora-glass',
        'zen-pivot',
        'villa-classica',
        'the-monarch',
        'cambridge-arch',
        'mosaic-artistry',
        'carved-wilderness',
        'andalusian-gate',
        'kyoto-shoji',
      ];
      for (const slug of slugs) {
        expect(getProductBySlug(slug)).toBeDefined();
      }
    });
  });

  // ── getProductsByCollection ───────────────────────────────────────

  describe('getProductsByCollection', () => {
    it('returns 3 products for the "modern" collection', () => {
      const result = getProductsByCollection('modern');
      expect(result).toHaveLength(3);
      result.forEach((p) => expect(p.collection).toBe('modern'));
    });

    it('returns 3 products for the "classic" collection', () => {
      const result = getProductsByCollection('classic');
      expect(result).toHaveLength(3);
      result.forEach((p) => expect(p.collection).toBe('classic'));
    });

    it('returns 2 products for the "artisan" collection', () => {
      const result = getProductsByCollection('artisan');
      expect(result).toHaveLength(2);
      result.forEach((p) => expect(p.collection).toBe('artisan'));
    });

    it('returns 2 products for the "heritage" collection', () => {
      const result = getProductsByCollection('heritage');
      expect(result).toHaveLength(2);
      result.forEach((p) => expect(p.collection).toBe('heritage'));
    });

    it('returns empty array for a nonexistent collection', () => {
      const result = getProductsByCollection('luxury');
      expect(result).toHaveLength(0);
    });
  });

  // ── getFeaturedProducts ───────────────────────────────────────────

  describe('getFeaturedProducts', () => {
    it('returns only featured products', () => {
      const result = getFeaturedProducts();
      expect(result.length).toBeGreaterThan(0);
      result.forEach((p) => expect(p.isFeatured).toBe(true));
    });

    it('respects the limit parameter', () => {
      const result = getFeaturedProducts(2);
      expect(result.length).toBeLessThanOrEqual(2);
      result.forEach((p) => expect(p.isFeatured).toBe(true));
    });

    it('returns all featured products when limit is not specified', () => {
      const allFeatured = products.filter((p) => p.isFeatured);
      const result = getFeaturedProducts();
      expect(result).toHaveLength(allFeatured.length);
    });
  });

  // ── getNewProducts ────────────────────────────────────────────────

  describe('getNewProducts', () => {
    it('returns only new products', () => {
      const result = getNewProducts();
      expect(result.length).toBeGreaterThan(0);
      result.forEach((p) => expect(p.isNew).toBe(true));
    });

    it('respects the limit parameter', () => {
      const result = getNewProducts(1);
      expect(result.length).toBeLessThanOrEqual(1);
    });
  });

  // ── getPopularProducts ────────────────────────────────────────────

  describe('getPopularProducts', () => {
    it('returns only popular products', () => {
      const result = getPopularProducts();
      expect(result.length).toBeGreaterThan(0);
      result.forEach((p) => expect(p.isPopular).toBe(true));
    });

    it('respects the limit parameter', () => {
      const result = getPopularProducts(2);
      expect(result.length).toBeLessThanOrEqual(2);
    });
  });

  // ── getRelatedProducts ────────────────────────────────────────────

  describe('getRelatedProducts', () => {
    it('returns products from the same collection excluding the given product', () => {
      const result = getRelatedProducts('metropolitan-edge');
      expect(result.length).toBeGreaterThan(0);
      result.forEach((p) => {
        expect(p.slug).not.toBe('metropolitan-edge');
      });
      // At least some should be from the same collection
      const sameCollection = result.filter((p) => p.collection === 'modern');
      expect(sameCollection.length).toBeGreaterThan(0);
    });

    it('respects the limit parameter', () => {
      const result = getRelatedProducts('metropolitan-edge', 2);
      expect(result.length).toBeLessThanOrEqual(2);
    });

    it('pads with products from other collections if not enough in same collection', () => {
      // Heritage has only 2 products, so asking for 4 related to one of them requires padding
      const result = getRelatedProducts('andalusian-gate', 4);
      expect(result).toHaveLength(4);
      expect(result.find((p) => p.slug === 'andalusian-gate')).toBeUndefined();
    });

    it('returns empty array for a nonexistent product slug', () => {
      const result = getRelatedProducts('nonexistent-product');
      expect(result).toHaveLength(0);
    });

    it('defaults to 4 related products', () => {
      const result = getRelatedProducts('metropolitan-edge');
      expect(result.length).toBeLessThanOrEqual(4);
    });
  });

  // ── searchProducts ────────────────────────────────────────────────

  describe('searchProducts', () => {
    it('returns all products for an empty query', () => {
      const result = searchProducts('');
      expect(result).toHaveLength(10);
    });

    it('returns all products for a whitespace-only query', () => {
      const result = searchProducts('   ');
      expect(result).toHaveLength(10);
    });

    it('matches product names (case-insensitive)', () => {
      const result = searchProducts('metropolitan');
      expect(result.some((p) => p.slug === 'metropolitan-edge')).toBe(true);
    });

    it('matches product descriptions', () => {
      const result = searchProducts('frosted glass');
      expect(result.some((p) => p.slug === 'aurora-glass')).toBe(true);
    });

    it('matches product tags', () => {
      const result = searchProducts('japanese');
      const matches = result.map((p) => p.slug);
      expect(matches).toContain('zen-pivot');
      expect(matches).toContain('kyoto-shoji');
    });

    it('matches collection names', () => {
      const result = searchProducts('artisan');
      expect(result.some((p) => p.collection === 'artisan')).toBe(true);
    });

    it('returns empty array when nothing matches', () => {
      const result = searchProducts('xyznonexistent');
      expect(result).toHaveLength(0);
    });
  });

  // ── sortProducts ──────────────────────────────────────────────────

  describe('sortProducts', () => {
    it('sorts by price ascending', () => {
      const result = sortProducts(getAllProducts(), 'price-asc');
      for (let i = 1; i < result.length; i++) {
        expect(result[i].basePrice).toBeGreaterThanOrEqual(result[i - 1].basePrice);
      }
    });

    it('sorts by price descending', () => {
      const result = sortProducts(getAllProducts(), 'price-desc');
      for (let i = 1; i < result.length; i++) {
        expect(result[i].basePrice).toBeLessThanOrEqual(result[i - 1].basePrice);
      }
    });

    it('sorts by newest (most recent createdAt first)', () => {
      const result = sortProducts(getAllProducts(), 'newest');
      for (let i = 1; i < result.length; i++) {
        const dateA = new Date(result[i - 1].createdAt).getTime();
        const dateB = new Date(result[i].createdAt).getTime();
        expect(dateA).toBeGreaterThanOrEqual(dateB);
      }
    });

    it('sorts by popularity score (isFeatured=3, isPopular=2, isNew=1)', () => {
      const result = sortProducts(getAllProducts(), 'popular');
      const getScore = (p: typeof result[0]) =>
        (p.isFeatured ? 3 : 0) + (p.isPopular ? 2 : 0) + (p.isNew ? 1 : 0);
      for (let i = 1; i < result.length; i++) {
        expect(getScore(result[i - 1])).toBeGreaterThanOrEqual(getScore(result[i]));
      }
    });

    it('does not mutate the original array', () => {
      const original = getAllProducts();
      const firstSlug = original[0].slug;
      sortProducts(original, 'price-desc');
      expect(original[0].slug).toBe(firstSlug);
    });
  });

  // ── filterProducts ────────────────────────────────────────────────

  describe('filterProducts', () => {
    it('returns all products with default filter state', () => {
      const filters = getDefaultFilterState();
      const result = filterProducts(getAllProducts(), filters);
      expect(result).toHaveLength(10);
    });

    it('filters by collection', () => {
      const filters = { ...getDefaultFilterState(), collection: 'modern' };
      const result = filterProducts(getAllProducts(), filters);
      expect(result).toHaveLength(3);
      result.forEach((p) => expect(p.collection).toBe('modern'));
    });

    it('filters by material', () => {
      const filters = { ...getDefaultFilterState(), material: 'oak' };
      const result = filterProducts(getAllProducts(), filters);
      // All products share the same materials, so all should match
      expect(result).toHaveLength(10);
    });

    it('filters by price range', () => {
      const filters = {
        ...getDefaultFilterState(),
        priceRange: [200000, 350000] as [number, number],
      };
      const result = filterProducts(getAllProducts(), filters);
      result.forEach((p) => {
        expect(p.basePrice).toBeGreaterThanOrEqual(200000);
        expect(p.basePrice).toBeLessThanOrEqual(350000);
      });
    });

    it('filters by search query', () => {
      const filters = { ...getDefaultFilterState(), search: 'pivot' };
      const result = filterProducts(getAllProducts(), filters);
      expect(result.some((p) => p.slug === 'zen-pivot')).toBe(true);
    });

    it('combines multiple filters (collection + price range)', () => {
      const filters = {
        ...getDefaultFilterState(),
        collection: 'classic',
        priceRange: [200000, 300000] as [number, number],
      };
      const result = filterProducts(getAllProducts(), filters);
      result.forEach((p) => {
        expect(p.collection).toBe('classic');
        expect(p.basePrice).toBeGreaterThanOrEqual(200000);
        expect(p.basePrice).toBeLessThanOrEqual(300000);
      });
    });

    it('applies sorting after filtering', () => {
      const filters = {
        ...getDefaultFilterState(),
        collection: 'modern',
        sortBy: 'price-asc' as const,
      };
      const result = filterProducts(getAllProducts(), filters);
      for (let i = 1; i < result.length; i++) {
        expect(result[i].basePrice).toBeGreaterThanOrEqual(result[i - 1].basePrice);
      }
    });

    it('returns empty array when no products match filters', () => {
      const filters = {
        ...getDefaultFilterState(),
        priceRange: [1, 100] as [number, number],
      };
      const result = filterProducts(getAllProducts(), filters);
      expect(result).toHaveLength(0);
    });
  });

  // ── getDefaultFilterState ─────────────────────────────────────────

  describe('getDefaultFilterState', () => {
    it('returns the expected default values', () => {
      const state = getDefaultFilterState();
      expect(state.collection).toBeNull();
      expect(state.material).toBeNull();
      expect(state.priceRange).toBeNull();
      expect(state.search).toBe('');
      expect(state.sortBy).toBe('popular');
    });
  });

  // ── getProductPriceRange ──────────────────────────────────────────

  describe('getProductPriceRange', () => {
    it('returns a tuple with min and max prices in cents', () => {
      const [min, max] = getProductPriceRange();
      expect(min).toBe(249900); // The Monarch at $2,499
      expect(max).toBe(499900); // Zen Pivot or Carved Wilderness at $4,999
    });

    it('returns min <= max', () => {
      const [min, max] = getProductPriceRange();
      expect(min).toBeLessThanOrEqual(max);
    });
  });

  // ── getAllMaterialOptions ─────────────────────────────────────────

  describe('getAllMaterialOptions', () => {
    it('returns all unique material options', () => {
      const materials = getAllMaterialOptions();
      expect(materials.length).toBeGreaterThan(0);
      // Should include the default materials
      const ids = materials.map((m) => m.id);
      expect(ids).toContain('oak');
      expect(ids).toContain('walnut');
      expect(ids).toContain('mahogany');
      expect(ids).toContain('reclaimed-teak');
    });

    it('returns objects with id and label fields', () => {
      const materials = getAllMaterialOptions();
      materials.forEach((m) => {
        expect(m).toHaveProperty('id');
        expect(m).toHaveProperty('label');
        expect(typeof m.id).toBe('string');
        expect(typeof m.label).toBe('string');
      });
    });
  });
});
