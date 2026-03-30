import { describe, it, expect } from 'vitest';
import {
  paginateProducts,
  getActiveFilterCount,
  hasActiveFilters,
} from './filters';
import { getAllProducts, getDefaultFilterState } from './products';
import type { FilterState, Product } from '@/types';

describe('lib/filters', () => {
  // ── paginateProducts ──────────────────────────────────────────────

  describe('paginateProducts', () => {
    const allProducts = getAllProducts();

    it('returns all products on page 1 when perPage exceeds total', () => {
      const result = paginateProducts(allProducts, 1, 20);
      expect(result.products).toHaveLength(allProducts.length);
      expect(result.totalPages).toBe(1);
    });

    it('returns default perPage of 12', () => {
      const result = paginateProducts(allProducts, 1);
      // With 10 products and perPage=12, all fit on one page
      expect(result.products).toHaveLength(10);
      expect(result.totalPages).toBe(1);
    });

    it('paginates correctly with perPage of 3', () => {
      const result1 = paginateProducts(allProducts, 1, 3);
      expect(result1.products).toHaveLength(3);
      expect(result1.totalPages).toBe(4); // ceil(10/3) = 4

      const result2 = paginateProducts(allProducts, 2, 3);
      expect(result2.products).toHaveLength(3);

      const result3 = paginateProducts(allProducts, 3, 3);
      expect(result3.products).toHaveLength(3);

      const result4 = paginateProducts(allProducts, 4, 3);
      expect(result4.products).toHaveLength(1); // 10 - 9 = 1 remaining
    });

    it('returns first page when page is less than 1', () => {
      const result = paginateProducts(allProducts, 0, 3);
      expect(result.products).toHaveLength(3);
      // Should return page 1 products
      expect(result.products[0].slug).toBe(allProducts[0].slug);
    });

    it('returns last page when page exceeds total pages', () => {
      const result = paginateProducts(allProducts, 100, 3);
      expect(result.totalPages).toBe(4);
      // safePage should be clamped to totalPages (4)
      expect(result.products).toHaveLength(1); // last page with 1 item
    });

    it('handles empty product array', () => {
      const result = paginateProducts([], 1, 3);
      expect(result.products).toHaveLength(0);
      expect(result.totalPages).toBe(1); // Math.max(1, ...) ensures at least 1
    });

    it('paginates correctly with perPage of 5', () => {
      const result = paginateProducts(allProducts, 1, 5);
      expect(result.products).toHaveLength(5);
      expect(result.totalPages).toBe(2); // ceil(10/5) = 2

      const result2 = paginateProducts(allProducts, 2, 5);
      expect(result2.products).toHaveLength(5);
    });

    it('returns different products for different pages', () => {
      const page1 = paginateProducts(allProducts, 1, 5);
      const page2 = paginateProducts(allProducts, 2, 5);
      const page1Slugs = page1.products.map((p) => p.slug);
      const page2Slugs = page2.products.map((p) => p.slug);
      // No overlap between pages
      for (const slug of page1Slugs) {
        expect(page2Slugs).not.toContain(slug);
      }
    });

    it('preserves product order from input array', () => {
      const result = paginateProducts(allProducts, 1, 5);
      for (let i = 0; i < result.products.length; i++) {
        expect(result.products[i].slug).toBe(allProducts[i].slug);
      }
    });

    it('handles perPage of 1', () => {
      const result = paginateProducts(allProducts, 1, 1);
      expect(result.products).toHaveLength(1);
      expect(result.totalPages).toBe(10);
    });
  });

  // ── getActiveFilterCount ──────────────────────────────────────────

  describe('getActiveFilterCount', () => {
    it('returns 0 for default filter state', () => {
      const filters = getDefaultFilterState();
      expect(getActiveFilterCount(filters)).toBe(0);
    });

    it('counts collection filter', () => {
      const filters: FilterState = { ...getDefaultFilterState(), collection: 'modern' };
      expect(getActiveFilterCount(filters)).toBe(1);
    });

    it('counts material filter', () => {
      const filters: FilterState = { ...getDefaultFilterState(), material: 'oak' };
      expect(getActiveFilterCount(filters)).toBe(1);
    });

    it('counts price range filter', () => {
      const filters: FilterState = {
        ...getDefaultFilterState(),
        priceRange: [100000, 500000],
      };
      expect(getActiveFilterCount(filters)).toBe(1);
    });

    it('counts search filter', () => {
      const filters: FilterState = { ...getDefaultFilterState(), search: 'door' };
      expect(getActiveFilterCount(filters)).toBe(1);
    });

    it('does not count whitespace-only search as active', () => {
      const filters: FilterState = { ...getDefaultFilterState(), search: '   ' };
      expect(getActiveFilterCount(filters)).toBe(0);
    });

    it('counts multiple active filters', () => {
      const filters: FilterState = {
        ...getDefaultFilterState(),
        collection: 'modern',
        material: 'walnut',
        priceRange: [100000, 500000],
        search: 'edge',
      };
      expect(getActiveFilterCount(filters)).toBe(4);
    });

    it('does not count null collection as active', () => {
      const filters: FilterState = { ...getDefaultFilterState(), collection: null };
      expect(getActiveFilterCount(filters)).toBe(0);
    });

    it('does not count null material as active', () => {
      const filters: FilterState = { ...getDefaultFilterState(), material: null };
      expect(getActiveFilterCount(filters)).toBe(0);
    });

    it('does not count null price range as active', () => {
      const filters: FilterState = { ...getDefaultFilterState(), priceRange: null };
      expect(getActiveFilterCount(filters)).toBe(0);
    });
  });

  // ── hasActiveFilters ──────────────────────────────────────────────

  describe('hasActiveFilters', () => {
    it('returns false for default filter state', () => {
      expect(hasActiveFilters(getDefaultFilterState())).toBe(false);
    });

    it('returns true when collection is set', () => {
      const filters: FilterState = { ...getDefaultFilterState(), collection: 'classic' };
      expect(hasActiveFilters(filters)).toBe(true);
    });

    it('returns true when material is set', () => {
      const filters: FilterState = { ...getDefaultFilterState(), material: 'oak' };
      expect(hasActiveFilters(filters)).toBe(true);
    });

    it('returns true when price range is set', () => {
      const filters: FilterState = {
        ...getDefaultFilterState(),
        priceRange: [100000, 300000],
      };
      expect(hasActiveFilters(filters)).toBe(true);
    });

    it('returns true when search is non-empty', () => {
      const filters: FilterState = { ...getDefaultFilterState(), search: 'zen' };
      expect(hasActiveFilters(filters)).toBe(true);
    });

    it('returns false when search is whitespace only', () => {
      const filters: FilterState = { ...getDefaultFilterState(), search: '   ' };
      expect(hasActiveFilters(filters)).toBe(false);
    });

    it('returns true when multiple filters are active', () => {
      const filters: FilterState = {
        ...getDefaultFilterState(),
        collection: 'artisan',
        search: 'mosaic',
      };
      expect(hasActiveFilters(filters)).toBe(true);
    });
  });
});
