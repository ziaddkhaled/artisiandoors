import { describe, it, expect } from 'vitest';
import {
  TAX_RATE,
  formatPrice,
  getOptionPriceModifier,
  calculateCustomPrice,
  getOptionLabel,
  getSelectedOptionsLabels,
  getDefaultSelectedOptions,
  calculateTax,
} from './pricing';
import { getProductBySlug } from './products';
import type { Product, SelectedOptions } from '@/types';

// Helper: get a known product for testing
function getTestProduct(): Product {
  const product = getProductBySlug('metropolitan-edge');
  if (!product) throw new Error('Test product metropolitan-edge not found');
  return product;
}

describe('lib/pricing', () => {
  // ── TAX_RATE ──────────────────────────────────────────────────────

  describe('TAX_RATE', () => {
    it('is 0.085 (8.5%)', () => {
      expect(TAX_RATE).toBe(0.085);
    });
  });

  // ── formatPrice ───────────────────────────────────────────────────

  describe('formatPrice', () => {
    it('formats 299900 cents as "$2,999.00"', () => {
      expect(formatPrice(299900)).toBe('$2,999.00');
    });

    it('formats 249900 cents as "$2,499.00"', () => {
      expect(formatPrice(249900)).toBe('$2,499.00');
    });

    it('formats 0 cents as "$0.00"', () => {
      expect(formatPrice(0)).toBe('$0.00');
    });

    it('formats 100 cents as "$1.00"', () => {
      expect(formatPrice(100)).toBe('$1.00');
    });

    it('formats 50 cents as "$0.50"', () => {
      expect(formatPrice(50)).toBe('$0.50');
    });

    it('formats large values correctly', () => {
      expect(formatPrice(999999)).toBe('$9,999.99');
    });

    it('formats single cent correctly', () => {
      expect(formatPrice(1)).toBe('$0.01');
    });
  });

  // ── getOptionPriceModifier ────────────────────────────────────────

  describe('getOptionPriceModifier', () => {
    it('returns 0 for the base option (oak)', () => {
      const product = getTestProduct();
      expect(getOptionPriceModifier(product, 'materials', 'oak')).toBe(0);
    });

    it('returns 30000 for walnut material', () => {
      const product = getTestProduct();
      expect(getOptionPriceModifier(product, 'materials', 'walnut')).toBe(30000);
    });

    it('returns 50000 for mahogany material', () => {
      const product = getTestProduct();
      expect(getOptionPriceModifier(product, 'materials', 'mahogany')).toBe(50000);
    });

    it('returns 80000 for reclaimed-teak material', () => {
      const product = getTestProduct();
      expect(getOptionPriceModifier(product, 'materials', 'reclaimed-teak')).toBe(80000);
    });

    it('returns 0 for a nonexistent option ID', () => {
      const product = getTestProduct();
      expect(getOptionPriceModifier(product, 'materials', 'nonexistent')).toBe(0);
    });

    it('returns correct modifiers for finishes', () => {
      const product = getTestProduct();
      expect(getOptionPriceModifier(product, 'finishes', 'natural')).toBe(0);
      expect(getOptionPriceModifier(product, 'finishes', 'matte-black')).toBe(20000);
      expect(getOptionPriceModifier(product, 'finishes', 'brushed-bronze')).toBe(35000);
      expect(getOptionPriceModifier(product, 'finishes', 'hand-lacquered')).toBe(50000);
    });

    it('returns correct modifiers for sizes', () => {
      const product = getTestProduct();
      expect(getOptionPriceModifier(product, 'sizes', 'standard')).toBe(0);
      expect(getOptionPriceModifier(product, 'sizes', 'wide')).toBe(30000);
      expect(getOptionPriceModifier(product, 'sizes', 'double')).toBe(60000);
      expect(getOptionPriceModifier(product, 'sizes', 'grand')).toBe(100000);
    });

    it('returns correct modifiers for hardware', () => {
      const product = getTestProduct();
      expect(getOptionPriceModifier(product, 'hardware', 'classic-brass')).toBe(0);
      expect(getOptionPriceModifier(product, 'hardware', 'matte-black-hw')).toBe(15000);
      expect(getOptionPriceModifier(product, 'hardware', 'artisan-iron')).toBe(30000);
      expect(getOptionPriceModifier(product, 'hardware', 'crystal')).toBe(40000);
    });
  });

  // ── calculateCustomPrice ──────────────────────────────────────────

  describe('calculateCustomPrice', () => {
    it('returns base price when all default (zero modifier) options are selected', () => {
      const product = getTestProduct();
      const options: SelectedOptions = {
        material: 'oak',
        finish: 'natural',
        size: 'standard',
        hardware: 'classic-brass',
      };
      expect(calculateCustomPrice(product, options)).toBe(product.basePrice);
    });

    it('correctly adds all option modifiers to base price', () => {
      const product = getTestProduct();
      // Walnut (+300), Matte Black (+200), Wide (+300), Artisan Iron (+300) = +$1,100 = +110000 cents
      const options: SelectedOptions = {
        material: 'walnut',
        finish: 'matte-black',
        size: 'wide',
        hardware: 'artisan-iron',
      };
      const expected = product.basePrice + 30000 + 20000 + 30000 + 30000;
      expect(calculateCustomPrice(product, options)).toBe(expected);
    });

    it('correctly handles the most expensive option combination', () => {
      const product = getTestProduct();
      // Reclaimed Teak (+800), Hand-Lacquered (+500), Grand (+1000), Crystal (+400) = +$2,700 = +270000 cents
      const options: SelectedOptions = {
        material: 'reclaimed-teak',
        finish: 'hand-lacquered',
        size: 'grand',
        hardware: 'crystal',
      };
      const expected = product.basePrice + 80000 + 50000 + 100000 + 40000;
      expect(calculateCustomPrice(product, options)).toBe(expected);
    });

    it('returns base price plus single modifier when only one option has a modifier', () => {
      const product = getTestProduct();
      const options: SelectedOptions = {
        material: 'mahogany',
        finish: 'natural',
        size: 'standard',
        hardware: 'classic-brass',
      };
      expect(calculateCustomPrice(product, options)).toBe(product.basePrice + 50000);
    });

    it('handles unknown option IDs gracefully (modifier = 0)', () => {
      const product = getTestProduct();
      const options: SelectedOptions = {
        material: 'unknown',
        finish: 'unknown',
        size: 'unknown',
        hardware: 'unknown',
      };
      // All modifiers should be 0, so price equals base price
      expect(calculateCustomPrice(product, options)).toBe(product.basePrice);
    });
  });

  // ── getOptionLabel ────────────────────────────────────────────────

  describe('getOptionLabel', () => {
    it('returns the human-readable label for a valid option', () => {
      const product = getTestProduct();
      expect(getOptionLabel(product, 'materials', 'walnut')).toBe('Walnut');
    });

    it('returns the option ID when the option is not found', () => {
      const product = getTestProduct();
      expect(getOptionLabel(product, 'materials', 'unknown-material')).toBe('unknown-material');
    });

    it('returns correct labels for all option types', () => {
      const product = getTestProduct();
      expect(getOptionLabel(product, 'materials', 'oak')).toBe('Solid Oak');
      expect(getOptionLabel(product, 'finishes', 'brushed-bronze')).toBe('Brushed Bronze');
      expect(getOptionLabel(product, 'sizes', 'double')).toBe('Double 72"x80"');
      expect(getOptionLabel(product, 'hardware', 'crystal')).toBe('Crystal');
    });
  });

  // ── getSelectedOptionsLabels ──────────────────────────────────────

  describe('getSelectedOptionsLabels', () => {
    it('returns a record with Material, Finish, Size, Hardware keys', () => {
      const product = getTestProduct();
      const options: SelectedOptions = {
        material: 'oak',
        finish: 'natural',
        size: 'standard',
        hardware: 'classic-brass',
      };
      const labels = getSelectedOptionsLabels(product, options);
      expect(labels).toHaveProperty('Material');
      expect(labels).toHaveProperty('Finish');
      expect(labels).toHaveProperty('Size');
      expect(labels).toHaveProperty('Hardware');
    });

    it('maps option IDs to human-readable labels', () => {
      const product = getTestProduct();
      const options: SelectedOptions = {
        material: 'walnut',
        finish: 'matte-black',
        size: 'wide',
        hardware: 'artisan-iron',
      };
      const labels = getSelectedOptionsLabels(product, options);
      expect(labels.Material).toBe('Walnut');
      expect(labels.Finish).toBe('Matte Black');
      expect(labels.Size).toBe('Wide 42"x80"');
      expect(labels.Hardware).toBe('Artisan Iron');
    });
  });

  // ── getDefaultSelectedOptions ─────────────────────────────────────

  describe('getDefaultSelectedOptions', () => {
    it('returns the first option ID from each group', () => {
      const product = getTestProduct();
      const defaults = getDefaultSelectedOptions(product);
      expect(defaults.material).toBe('oak');
      expect(defaults.finish).toBe('natural');
      expect(defaults.size).toBe('standard');
      expect(defaults.hardware).toBe('classic-brass');
    });

    it('returns all four option keys', () => {
      const product = getTestProduct();
      const defaults = getDefaultSelectedOptions(product);
      expect(Object.keys(defaults)).toEqual(
        expect.arrayContaining(['material', 'finish', 'size', 'hardware'])
      );
    });
  });

  // ── calculateTax ──────────────────────────────────────────────────

  describe('calculateTax', () => {
    it('calculates 8.5% tax on a subtotal', () => {
      // $100.00 subtotal = 10000 cents, 8.5% = 850 cents = $8.50
      expect(calculateTax(10000)).toBe(850);
    });

    it('rounds to the nearest cent', () => {
      // 10001 * 0.085 = 850.085 => rounds to 850
      expect(calculateTax(10001)).toBe(850);
      // 10006 * 0.085 = 850.51 => rounds to 851
      expect(calculateTax(10006)).toBe(851);
    });

    it('returns 0 for a zero subtotal', () => {
      expect(calculateTax(0)).toBe(0);
    });

    it('calculates tax for a realistic cart subtotal', () => {
      // $3,499.00 = 349900 cents, 8.5% = 29741.5 => 29742
      expect(calculateTax(349900)).toBe(Math.round(349900 * 0.085));
    });
  });
});
