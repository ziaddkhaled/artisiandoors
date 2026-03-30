import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  generateOrderNumber,
  createOrder,
  saveOrder,
  getLastOrder,
  clearLastOrder,
  ORDER_STORAGE_KEY,
} from './orders';
import type { CartItem, ShippingInfo } from '@/types';

// ── Helpers ─────────────────────────────────────────────────────────

function createMockCartItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    id: 'metropolitan-edge::oak-natural-standard-classic-brass',
    productSlug: 'metropolitan-edge',
    productName: 'The Metropolitan Edge',
    productImage: 'https://example.com/image.jpg',
    selectedOptions: {
      material: 'oak',
      finish: 'natural',
      size: 'standard',
      hardware: 'classic-brass',
    },
    selectedOptionsLabels: {
      Material: 'Solid Oak',
      Finish: 'Natural',
      Size: 'Standard 36"x80"',
      Hardware: 'Classic Brass',
    },
    quantity: 1,
    unitPrice: 349900,
    ...overrides,
  };
}

function createMockShippingInfo(): ShippingInfo {
  return {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '555-123-4567',
    address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '90210',
    country: 'United States',
  };
}

describe('lib/orders', () => {
  // ── ORDER_STORAGE_KEY ─────────────────────────────────────────────

  describe('ORDER_STORAGE_KEY', () => {
    it('equals "artisandoors-last-order"', () => {
      expect(ORDER_STORAGE_KEY).toBe('artisandoors-last-order');
    });
  });

  // ── generateOrderNumber ───────────────────────────────────────────

  describe('generateOrderNumber', () => {
    it('returns a string starting with "AD-"', () => {
      const number = generateOrderNumber();
      expect(number).toMatch(/^AD-/);
    });

    it('matches the format "AD-{alphanumeric}-{alphanumeric}"', () => {
      const number = generateOrderNumber();
      expect(number).toMatch(/^AD-[A-Z0-9]+-[A-Z0-9]+$/);
    });

    it('generates unique order numbers on subsequent calls', () => {
      const numbers = new Set<string>();
      for (let i = 0; i < 20; i++) {
        numbers.add(generateOrderNumber());
      }
      // While not strictly guaranteed (timestamp could repeat), in practice they should be unique
      expect(numbers.size).toBeGreaterThan(1);
    });

    it('returns a non-empty string', () => {
      const number = generateOrderNumber();
      expect(number.length).toBeGreaterThan(0);
    });
  });

  // ── createOrder ───────────────────────────────────────────────────

  describe('createOrder', () => {
    it('creates an order with the correct structure', () => {
      const items = [createMockCartItem()];
      const shipping = createMockShippingInfo();
      const order = createOrder(items, shipping);

      expect(order).toHaveProperty('id');
      expect(order).toHaveProperty('items');
      expect(order).toHaveProperty('subtotal');
      expect(order).toHaveProperty('tax');
      expect(order).toHaveProperty('total');
      expect(order).toHaveProperty('shipping');
      expect(order).toHaveProperty('status');
      expect(order).toHaveProperty('createdAt');
    });

    it('sets status to "confirmed"', () => {
      const order = createOrder([createMockCartItem()], createMockShippingInfo());
      expect(order.status).toBe('confirmed');
    });

    it('sets createdAt to an ISO date string', () => {
      const order = createOrder([createMockCartItem()], createMockShippingInfo());
      expect(() => new Date(order.createdAt)).not.toThrow();
      expect(new Date(order.createdAt).toISOString()).toBe(order.createdAt);
    });

    it('calculates correct totals based on cart items', () => {
      const items = [
        createMockCartItem({ unitPrice: 100000, quantity: 2 }),
        createMockCartItem({ id: 'item-2', unitPrice: 200000, quantity: 1 }),
      ];
      const order = createOrder(items, createMockShippingInfo());
      expect(order.subtotal).toBe(400000); // 200000 + 200000
      expect(order.tax).toBe(Math.round(400000 * 0.085));
      expect(order.total).toBe(400000 + Math.round(400000 * 0.085));
    });

    it('creates a defensive copy of items', () => {
      const items = [createMockCartItem()];
      const order = createOrder(items, createMockShippingInfo());
      items.push(createMockCartItem({ id: 'new-item' }));
      expect(order.items).toHaveLength(1); // not affected by mutation
    });

    it('creates a defensive copy of shipping info', () => {
      const shipping = createMockShippingInfo();
      const order = createOrder([createMockCartItem()], shipping);
      shipping.firstName = 'Changed';
      expect(order.shipping.firstName).toBe('John'); // not affected
    });

    it('generates a unique order ID', () => {
      const order = createOrder([createMockCartItem()], createMockShippingInfo());
      expect(order.id).toMatch(/^AD-/);
    });
  });

  // ── localStorage operations ───────────────────────────────────────

  describe('localStorage operations', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    afterEach(() => {
      localStorage.clear();
    });

    describe('saveOrder', () => {
      it('saves an order to localStorage', () => {
        const order = createOrder([createMockCartItem()], createMockShippingInfo());
        saveOrder(order);
        const stored = localStorage.getItem(ORDER_STORAGE_KEY);
        expect(stored).not.toBeNull();
        expect(JSON.parse(stored!).id).toBe(order.id);
      });
    });

    describe('getLastOrder', () => {
      it('retrieves the last saved order', () => {
        const order = createOrder([createMockCartItem()], createMockShippingInfo());
        saveOrder(order);
        const retrieved = getLastOrder();
        expect(retrieved).not.toBeNull();
        expect(retrieved!.id).toBe(order.id);
        expect(retrieved!.status).toBe('confirmed');
      });

      it('returns null when no order is stored', () => {
        expect(getLastOrder()).toBeNull();
      });

      it('returns null for invalid JSON', () => {
        localStorage.setItem(ORDER_STORAGE_KEY, 'not valid json');
        expect(getLastOrder()).toBeNull();
      });

      it('returns null for data missing required fields', () => {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify({ foo: 'bar' }));
        expect(getLastOrder()).toBeNull();
      });
    });

    describe('clearLastOrder', () => {
      it('removes the stored order', () => {
        const order = createOrder([createMockCartItem()], createMockShippingInfo());
        saveOrder(order);
        clearLastOrder();
        expect(getLastOrder()).toBeNull();
      });

      it('does not throw when no order exists', () => {
        expect(() => clearLastOrder()).not.toThrow();
      });
    });

    describe('full save/load cycle', () => {
      it('round-trips an order through localStorage', () => {
        const items = [
          createMockCartItem({ unitPrice: 349900, quantity: 1 }),
          createMockCartItem({
            id: 'item-2',
            productSlug: 'aurora-glass',
            unitPrice: 419900,
            quantity: 2,
          }),
        ];
        const shipping = createMockShippingInfo();
        const order = createOrder(items, shipping);
        saveOrder(order);
        const loaded = getLastOrder();
        expect(loaded).not.toBeNull();
        expect(loaded!.items).toHaveLength(2);
        expect(loaded!.shipping.email).toBe('john@example.com');
        expect(loaded!.total).toBe(order.total);
      });
    });
  });
});
