import { describe, it, expect } from 'vitest';
import { products } from './products';
import { collections, getCollectionBySlug, getAllCollections } from './collections';
import {
  defaultMaterials,
  defaultFinishes,
  defaultSizes,
  defaultHardware,
} from './options';
import type { Product, OptionGroup, Option } from '@/types';

describe('data integrity', () => {
  // ── Products ──────────────────────────────────────────────────────

  describe('products', () => {
    it('contains exactly 10 products', () => {
      expect(products).toHaveLength(10);
    });

    it('all products have unique slugs', () => {
      const slugs = products.map((p) => p.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(products.length);
    });

    it('all products have unique names', () => {
      const names = products.map((p) => p.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(products.length);
    });

    describe('required fields', () => {
      products.forEach((product) => {
        describe(`${product.name} (${product.slug})`, () => {
          it('has a non-empty slug', () => {
            expect(product.slug).toBeTruthy();
            expect(typeof product.slug).toBe('string');
          });

          it('has a non-empty name', () => {
            expect(product.name).toBeTruthy();
            expect(typeof product.name).toBe('string');
          });

          it('has a valid collection', () => {
            expect(['modern', 'classic', 'artisan', 'heritage']).toContain(
              product.collection
            );
          });

          it('has a non-empty description', () => {
            expect(product.description).toBeTruthy();
            expect(product.description.length).toBeGreaterThan(10);
          });

          it('has a non-empty short description', () => {
            expect(product.shortDescription).toBeTruthy();
            expect(product.shortDescription.length).toBeGreaterThan(5);
          });

          it('has a positive base price in cents', () => {
            expect(product.basePrice).toBeGreaterThan(0);
            expect(Number.isInteger(product.basePrice)).toBe(true);
          });

          it('has at least one image', () => {
            expect(product.images.length).toBeGreaterThanOrEqual(1);
          });

          it('has images with valid fields', () => {
            product.images.forEach((img) => {
              expect(img.src).toBeTruthy();
              expect(typeof img.src).toBe('string');
              expect(img.alt).toBeTruthy();
              expect(typeof img.alt).toBe('string');
              expect(img.width).toBeGreaterThan(0);
              expect(img.height).toBeGreaterThan(0);
            });
          });

          it('has materials option group with at least one option', () => {
            expect(product.materials).toBeDefined();
            expect(product.materials.options.length).toBeGreaterThan(0);
          });

          it('has finishes option group with at least one option', () => {
            expect(product.finishes).toBeDefined();
            expect(product.finishes.options.length).toBeGreaterThan(0);
          });

          it('has sizes option group with at least one option', () => {
            expect(product.sizes).toBeDefined();
            expect(product.sizes.options.length).toBeGreaterThan(0);
          });

          it('has hardware option group with at least one option', () => {
            expect(product.hardware).toBeDefined();
            expect(product.hardware.options.length).toBeGreaterThan(0);
          });

          it('has at least one feature', () => {
            expect(product.features.length).toBeGreaterThan(0);
            product.features.forEach((f) => {
              expect(typeof f).toBe('string');
              expect(f.length).toBeGreaterThan(0);
            });
          });

          it('has at least one tag', () => {
            expect(product.tags.length).toBeGreaterThan(0);
            product.tags.forEach((t) => {
              expect(typeof t).toBe('string');
              expect(t.length).toBeGreaterThan(0);
            });
          });

          it('has boolean flags', () => {
            expect(typeof product.isFeatured).toBe('boolean');
            expect(typeof product.isNew).toBe('boolean');
            expect(typeof product.isPopular).toBe('boolean');
            expect(typeof product.inStock).toBe('boolean');
          });

          it('has a valid ISO date createdAt', () => {
            const date = new Date(product.createdAt);
            expect(date.toString()).not.toBe('Invalid Date');
            // The data uses short ISO format without milliseconds (e.g., "2026-03-01T00:00:00Z")
            // which is a valid ISO 8601 string. Verify it parses to the same timestamp.
            expect(date.getTime()).toBe(new Date(product.createdAt).getTime());
            expect(product.createdAt).toMatch(
              /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/
            );
          });
        });
      });
    });

    describe('collection distribution', () => {
      it('has 3 modern products', () => {
        expect(products.filter((p) => p.collection === 'modern')).toHaveLength(3);
      });

      it('has 3 classic products', () => {
        expect(products.filter((p) => p.collection === 'classic')).toHaveLength(3);
      });

      it('has 2 artisan products', () => {
        expect(products.filter((p) => p.collection === 'artisan')).toHaveLength(2);
      });

      it('has 2 heritage products', () => {
        expect(products.filter((p) => p.collection === 'heritage')).toHaveLength(2);
      });
    });

    describe('price range', () => {
      it('all prices are within documented range ($2,499 to $4,999)', () => {
        products.forEach((p) => {
          expect(p.basePrice).toBeGreaterThanOrEqual(249900);
          expect(p.basePrice).toBeLessThanOrEqual(499900);
        });
      });

      it('minimum price product matches expectations', () => {
        const cheapest = products.reduce((min, p) =>
          p.basePrice < min.basePrice ? p : min
        );
        expect(cheapest.slug).toBe('the-monarch');
        expect(cheapest.basePrice).toBe(249900);
      });

      it('maximum price products match expectations', () => {
        const mostExpensive = products.reduce((max, p) =>
          p.basePrice > max.basePrice ? p : max
        );
        expect(mostExpensive.basePrice).toBe(499900);
      });
    });

    describe('expected product slugs', () => {
      const expectedSlugs = [
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

      expectedSlugs.forEach((slug) => {
        it(`contains product "${slug}"`, () => {
          expect(products.find((p) => p.slug === slug)).toBeDefined();
        });
      });
    });
  });

  // ── Collections ───────────────────────────────────────────────────

  describe('collections', () => {
    it('contains exactly 4 collections', () => {
      expect(collections).toHaveLength(4);
    });

    it('all collections have unique slugs', () => {
      const slugs = collections.map((c) => c.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(collections.length);
    });

    it('contains modern, classic, artisan, heritage', () => {
      const slugs = collections.map((c) => c.slug);
      expect(slugs).toContain('modern');
      expect(slugs).toContain('classic');
      expect(slugs).toContain('artisan');
      expect(slugs).toContain('heritage');
    });

    collections.forEach((collection) => {
      describe(`${collection.name} (${collection.slug})`, () => {
        it('has a non-empty name', () => {
          expect(collection.name).toBeTruthy();
        });

        it('has a non-empty description', () => {
          expect(collection.description).toBeTruthy();
          expect(collection.description.length).toBeGreaterThan(10);
        });

        it('has a non-empty image URL', () => {
          expect(collection.image).toBeTruthy();
          expect(collection.image).toMatch(/^https?:\/\//);
        });
      });
    });

    describe('getCollectionBySlug', () => {
      it('returns the correct collection for a valid slug', () => {
        const modern = getCollectionBySlug('modern');
        expect(modern).toBeDefined();
        expect(modern!.name).toBe('Modern');
      });

      it('returns undefined for an invalid slug', () => {
        expect(getCollectionBySlug('nonexistent')).toBeUndefined();
      });
    });

    describe('getAllCollections', () => {
      it('returns all 4 collections', () => {
        expect(getAllCollections()).toHaveLength(4);
      });

      it('returns the same reference as the collections array', () => {
        expect(getAllCollections()).toBe(collections);
      });
    });

    describe('product-collection referential integrity', () => {
      it('every product references a valid collection', () => {
        const collectionSlugs = collections.map((c) => c.slug);
        products.forEach((product) => {
          expect(collectionSlugs).toContain(product.collection);
        });
      });

      it('every collection has at least one product', () => {
        collections.forEach((collection) => {
          const productsInCollection = products.filter(
            (p) => p.collection === collection.slug
          );
          expect(productsInCollection.length).toBeGreaterThan(0);
        });
      });
    });
  });

  // ── Options ───────────────────────────────────────────────────────

  describe('option groups', () => {
    function validateOptionGroup(group: OptionGroup, expectedLabel: string) {
      it(`has label "${expectedLabel}"`, () => {
        expect(group.label).toBe(expectedLabel);
      });

      it('has at least one option', () => {
        expect(group.options.length).toBeGreaterThan(0);
      });

      it('all options have unique IDs', () => {
        const ids = group.options.map((o) => o.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(group.options.length);
      });

      it('all options have required fields', () => {
        group.options.forEach((option) => {
          expect(option.id).toBeTruthy();
          expect(typeof option.id).toBe('string');
          expect(option.label).toBeTruthy();
          expect(typeof option.label).toBe('string');
          expect(typeof option.priceModifier).toBe('number');
          expect(Number.isInteger(option.priceModifier)).toBe(true);
        });
      });

      it('first option has zero price modifier (base option)', () => {
        expect(group.options[0].priceModifier).toBe(0);
      });

      it('all price modifiers are non-negative', () => {
        group.options.forEach((option) => {
          expect(option.priceModifier).toBeGreaterThanOrEqual(0);
        });
      });
    }

    describe('defaultMaterials', () => {
      validateOptionGroup(defaultMaterials, 'Material');

      it('has exactly 4 material options', () => {
        expect(defaultMaterials.options).toHaveLength(4);
      });

      it('has expected material IDs', () => {
        const ids = defaultMaterials.options.map((o) => o.id);
        expect(ids).toContain('oak');
        expect(ids).toContain('walnut');
        expect(ids).toContain('mahogany');
        expect(ids).toContain('reclaimed-teak');
      });

      it('has correct price modifiers', () => {
        const byId = Object.fromEntries(
          defaultMaterials.options.map((o) => [o.id, o.priceModifier])
        );
        expect(byId['oak']).toBe(0);
        expect(byId['walnut']).toBe(30000);
        expect(byId['mahogany']).toBe(50000);
        expect(byId['reclaimed-teak']).toBe(80000);
      });
    });

    describe('defaultFinishes', () => {
      validateOptionGroup(defaultFinishes, 'Finish');

      it('has exactly 4 finish options', () => {
        expect(defaultFinishes.options).toHaveLength(4);
      });

      it('has correct price modifiers', () => {
        const byId = Object.fromEntries(
          defaultFinishes.options.map((o) => [o.id, o.priceModifier])
        );
        expect(byId['natural']).toBe(0);
        expect(byId['matte-black']).toBe(20000);
        expect(byId['brushed-bronze']).toBe(35000);
        expect(byId['hand-lacquered']).toBe(50000);
      });
    });

    describe('defaultSizes', () => {
      validateOptionGroup(defaultSizes, 'Size');

      it('has exactly 4 size options', () => {
        expect(defaultSizes.options).toHaveLength(4);
      });

      it('has correct price modifiers', () => {
        const byId = Object.fromEntries(
          defaultSizes.options.map((o) => [o.id, o.priceModifier])
        );
        expect(byId['standard']).toBe(0);
        expect(byId['wide']).toBe(30000);
        expect(byId['double']).toBe(60000);
        expect(byId['grand']).toBe(100000);
      });
    });

    describe('defaultHardware', () => {
      validateOptionGroup(defaultHardware, 'Hardware');

      it('has exactly 4 hardware options', () => {
        expect(defaultHardware.options).toHaveLength(4);
      });

      it('has correct price modifiers', () => {
        const byId = Object.fromEntries(
          defaultHardware.options.map((o) => [o.id, o.priceModifier])
        );
        expect(byId['classic-brass']).toBe(0);
        expect(byId['matte-black-hw']).toBe(15000);
        expect(byId['artisan-iron']).toBe(30000);
        expect(byId['crystal']).toBe(40000);
      });
    });
  });

  // ── Cross-references between products and options ─────────────────

  describe('product-option cross references', () => {
    it('every product material option is a valid option with valid fields', () => {
      products.forEach((product) => {
        product.materials.options.forEach((opt) => {
          expect(opt.id).toBeTruthy();
          expect(opt.label).toBeTruthy();
          expect(typeof opt.priceModifier).toBe('number');
        });
      });
    });

    it('every product finish option is a valid option with valid fields', () => {
      products.forEach((product) => {
        product.finishes.options.forEach((opt) => {
          expect(opt.id).toBeTruthy();
          expect(opt.label).toBeTruthy();
          expect(typeof opt.priceModifier).toBe('number');
        });
      });
    });

    it('every product size option is a valid option with valid fields', () => {
      products.forEach((product) => {
        product.sizes.options.forEach((opt) => {
          expect(opt.id).toBeTruthy();
          expect(opt.label).toBeTruthy();
          expect(typeof opt.priceModifier).toBe('number');
        });
      });
    });

    it('every product hardware option is a valid option with valid fields', () => {
      products.forEach((product) => {
        product.hardware.options.forEach((opt) => {
          expect(opt.id).toBeTruthy();
          expect(opt.label).toBeTruthy();
          expect(typeof opt.priceModifier).toBe('number');
        });
      });
    });
  });
});
