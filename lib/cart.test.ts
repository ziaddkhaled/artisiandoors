import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  generateCartItemId,
  cartReducer,
  calculateCartTotals,
  saveCartToStorage,
  loadCartFromStorage,
  clearCartStorage,
  CART_STORAGE_KEY,
} from './cart';
import type { CartItem, CartState, SelectedOptions } from '@/types';

// ── Helper: create a mock cart item ─────────────────────────────────

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

function createInitialState(items: CartItem[] = []): CartState {
  return { items, isHydrated: true };
}

describe('lib/cart', () => {
  // ── CART_STORAGE_KEY ──────────────────────────────────────────────

  describe('CART_STORAGE_KEY', () => {
    it('equals "artisandoors-cart"', () => {
      expect(CART_STORAGE_KEY).toBe('artisandoors-cart');
    });
  });

  // ── generateCartItemId ────────────────────────────────────────────

  describe('generateCartItemId', () => {
    it('creates an ID from product slug and option IDs', () => {
      const options: SelectedOptions = {
        material: 'oak',
        finish: 'natural',
        size: 'standard',
        hardware: 'classic-brass',
      };
      const id = generateCartItemId('metropolitan-edge', options);
      expect(id).toBe('metropolitan-edge::oak-natural-standard-classic-brass');
    });

    it('creates the same ID for the same product and options', () => {
      const options: SelectedOptions = {
        material: 'walnut',
        finish: 'matte-black',
        size: 'wide',
        hardware: 'crystal',
      };
      const id1 = generateCartItemId('zen-pivot', options);
      const id2 = generateCartItemId('zen-pivot', options);
      expect(id1).toBe(id2);
    });

    it('creates different IDs for the same product with different options', () => {
      const options1: SelectedOptions = {
        material: 'oak',
        finish: 'natural',
        size: 'standard',
        hardware: 'classic-brass',
      };
      const options2: SelectedOptions = {
        material: 'walnut',
        finish: 'natural',
        size: 'standard',
        hardware: 'classic-brass',
      };
      const id1 = generateCartItemId('metropolitan-edge', options1);
      const id2 = generateCartItemId('metropolitan-edge', options2);
      expect(id1).not.toBe(id2);
    });

    it('creates different IDs for different products with the same options', () => {
      const options: SelectedOptions = {
        material: 'oak',
        finish: 'natural',
        size: 'standard',
        hardware: 'classic-brass',
      };
      const id1 = generateCartItemId('metropolitan-edge', options);
      const id2 = generateCartItemId('aurora-glass', options);
      expect(id1).not.toBe(id2);
    });
  });

  // ── cartReducer ───────────────────────────────────────────────────

  describe('cartReducer', () => {
    describe('ADD_ITEM', () => {
      it('adds a new item to an empty cart', () => {
        const state = createInitialState();
        const item = createMockCartItem();
        const newState = cartReducer(state, { type: 'ADD_ITEM', payload: item });
        expect(newState.items).toHaveLength(1);
        expect(newState.items[0]).toEqual(item);
      });

      it('increments quantity when adding an item with the same ID', () => {
        const item = createMockCartItem({ quantity: 1 });
        const state = createInitialState([item]);
        const sameItem = createMockCartItem({ quantity: 2 });
        const newState = cartReducer(state, { type: 'ADD_ITEM', payload: sameItem });
        expect(newState.items).toHaveLength(1);
        expect(newState.items[0].quantity).toBe(3); // 1 + 2
      });

      it('adds a separate item when ID differs', () => {
        const item1 = createMockCartItem();
        const item2 = createMockCartItem({
          id: 'aurora-glass::walnut-matte-black-wide-crystal',
          productSlug: 'aurora-glass',
          productName: 'The Aurora Glass',
        });
        const state = createInitialState([item1]);
        const newState = cartReducer(state, { type: 'ADD_ITEM', payload: item2 });
        expect(newState.items).toHaveLength(2);
      });

      it('does not mutate the original state', () => {
        const state = createInitialState();
        const item = createMockCartItem();
        const newState = cartReducer(state, { type: 'ADD_ITEM', payload: item });
        expect(state.items).toHaveLength(0);
        expect(newState.items).toHaveLength(1);
      });
    });

    describe('REMOVE_ITEM', () => {
      it('removes an item by ID', () => {
        const item = createMockCartItem();
        const state = createInitialState([item]);
        const newState = cartReducer(state, { type: 'REMOVE_ITEM', payload: item.id });
        expect(newState.items).toHaveLength(0);
      });

      it('does nothing when the item ID does not exist', () => {
        const item = createMockCartItem();
        const state = createInitialState([item]);
        const newState = cartReducer(state, {
          type: 'REMOVE_ITEM',
          payload: 'nonexistent-id',
        });
        expect(newState.items).toHaveLength(1);
      });

      it('only removes the targeted item from a multi-item cart', () => {
        const item1 = createMockCartItem({ id: 'item-1' });
        const item2 = createMockCartItem({ id: 'item-2' });
        const item3 = createMockCartItem({ id: 'item-3' });
        const state = createInitialState([item1, item2, item3]);
        const newState = cartReducer(state, { type: 'REMOVE_ITEM', payload: 'item-2' });
        expect(newState.items).toHaveLength(2);
        expect(newState.items.map((i) => i.id)).toEqual(['item-1', 'item-3']);
      });
    });

    describe('UPDATE_QUANTITY', () => {
      it('updates quantity for a given item', () => {
        const item = createMockCartItem({ quantity: 1 });
        const state = createInitialState([item]);
        const newState = cartReducer(state, {
          type: 'UPDATE_QUANTITY',
          payload: { id: item.id, quantity: 5 },
        });
        expect(newState.items[0].quantity).toBe(5);
      });

      it('does not allow quantity below 1', () => {
        const item = createMockCartItem({ quantity: 1 });
        const state = createInitialState([item]);
        const newState = cartReducer(state, {
          type: 'UPDATE_QUANTITY',
          payload: { id: item.id, quantity: 0 },
        });
        expect(newState.items[0].quantity).toBe(1); // unchanged
      });

      it('does not allow quantity above 99', () => {
        const item = createMockCartItem({ quantity: 5 });
        const state = createInitialState([item]);
        const newState = cartReducer(state, {
          type: 'UPDATE_QUANTITY',
          payload: { id: item.id, quantity: 100 },
        });
        expect(newState.items[0].quantity).toBe(5); // unchanged
      });

      it('allows quantity of exactly 1 (minimum)', () => {
        const item = createMockCartItem({ quantity: 5 });
        const state = createInitialState([item]);
        const newState = cartReducer(state, {
          type: 'UPDATE_QUANTITY',
          payload: { id: item.id, quantity: 1 },
        });
        expect(newState.items[0].quantity).toBe(1);
      });

      it('allows quantity of exactly 99 (maximum)', () => {
        const item = createMockCartItem({ quantity: 5 });
        const state = createInitialState([item]);
        const newState = cartReducer(state, {
          type: 'UPDATE_QUANTITY',
          payload: { id: item.id, quantity: 99 },
        });
        expect(newState.items[0].quantity).toBe(99);
      });
    });

    describe('CLEAR_CART', () => {
      it('removes all items from the cart', () => {
        const items = [
          createMockCartItem({ id: 'item-1' }),
          createMockCartItem({ id: 'item-2' }),
        ];
        const state = createInitialState(items);
        const newState = cartReducer(state, { type: 'CLEAR_CART' });
        expect(newState.items).toHaveLength(0);
      });

      it('does nothing to an already empty cart', () => {
        const state = createInitialState();
        const newState = cartReducer(state, { type: 'CLEAR_CART' });
        expect(newState.items).toHaveLength(0);
      });

      it('preserves isHydrated flag', () => {
        const state = createInitialState();
        const newState = cartReducer(state, { type: 'CLEAR_CART' });
        expect(newState.isHydrated).toBe(true);
      });
    });

    describe('LOAD_CART', () => {
      it('loads items and sets isHydrated to true', () => {
        const state: CartState = { items: [], isHydrated: false };
        const items = [createMockCartItem()];
        const newState = cartReducer(state, { type: 'LOAD_CART', payload: items });
        expect(newState.items).toHaveLength(1);
        expect(newState.isHydrated).toBe(true);
      });

      it('replaces existing items', () => {
        const oldItem = createMockCartItem({ id: 'old-item' });
        const state = createInitialState([oldItem]);
        const newItems = [createMockCartItem({ id: 'new-item' })];
        const newState = cartReducer(state, { type: 'LOAD_CART', payload: newItems });
        expect(newState.items).toHaveLength(1);
        expect(newState.items[0].id).toBe('new-item');
      });
    });

    describe('unknown action', () => {
      it('returns the state unchanged for an unknown action type', () => {
        const state = createInitialState();
        // @ts-expect-error -- testing unknown action type
        const newState = cartReducer(state, { type: 'UNKNOWN_ACTION' });
        expect(newState).toBe(state);
      });
    });
  });

  // ── calculateCartTotals ───────────────────────────────────────────

  describe('calculateCartTotals', () => {
    it('returns zeros for an empty cart', () => {
      const totals = calculateCartTotals([]);
      expect(totals.totalItems).toBe(0);
      expect(totals.subtotal).toBe(0);
      expect(totals.tax).toBe(0);
      expect(totals.total).toBe(0);
    });

    it('calculates totals for a single item with quantity 1', () => {
      const items = [createMockCartItem({ unitPrice: 349900, quantity: 1 })];
      const totals = calculateCartTotals(items);
      expect(totals.totalItems).toBe(1);
      expect(totals.subtotal).toBe(349900);
      expect(totals.tax).toBe(Math.round(349900 * 0.085));
      expect(totals.total).toBe(349900 + Math.round(349900 * 0.085));
    });

    it('calculates totals for a single item with quantity > 1', () => {
      const items = [createMockCartItem({ unitPrice: 100000, quantity: 3 })];
      const totals = calculateCartTotals(items);
      expect(totals.totalItems).toBe(3);
      expect(totals.subtotal).toBe(300000);
      expect(totals.tax).toBe(Math.round(300000 * 0.085));
      expect(totals.total).toBe(300000 + Math.round(300000 * 0.085));
    });

    it('calculates totals for multiple items', () => {
      const items = [
        createMockCartItem({ id: 'item-1', unitPrice: 100000, quantity: 2 }),
        createMockCartItem({ id: 'item-2', unitPrice: 200000, quantity: 1 }),
      ];
      const totals = calculateCartTotals(items);
      expect(totals.totalItems).toBe(3); // 2 + 1
      expect(totals.subtotal).toBe(400000); // 200000 + 200000
      expect(totals.tax).toBe(Math.round(400000 * 0.085));
      expect(totals.total).toBe(400000 + Math.round(400000 * 0.085));
    });

    it('total equals subtotal + tax', () => {
      const items = [createMockCartItem({ unitPrice: 349900, quantity: 2 })];
      const totals = calculateCartTotals(items);
      expect(totals.total).toBe(totals.subtotal + totals.tax);
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

    describe('saveCartToStorage', () => {
      it('saves cart items to localStorage', () => {
        const items = [createMockCartItem()];
        saveCartToStorage(items);
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        expect(stored).not.toBeNull();
        expect(JSON.parse(stored!)).toEqual(items);
      });

      it('saves an empty array', () => {
        saveCartToStorage([]);
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        expect(JSON.parse(stored!)).toEqual([]);
      });
    });

    describe('loadCartFromStorage', () => {
      it('loads cart items from localStorage', () => {
        const items = [createMockCartItem()];
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        const loaded = loadCartFromStorage();
        expect(loaded).toEqual(items);
      });

      it('returns empty array when nothing is stored', () => {
        const loaded = loadCartFromStorage();
        expect(loaded).toEqual([]);
      });

      it('returns empty array for invalid JSON', () => {
        localStorage.setItem(CART_STORAGE_KEY, 'not json');
        const loaded = loadCartFromStorage();
        expect(loaded).toEqual([]);
      });

      it('returns empty array when stored data is not an array', () => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ foo: 'bar' }));
        const loaded = loadCartFromStorage();
        expect(loaded).toEqual([]);
      });

      it('filters out invalid items (missing required fields)', () => {
        const validItem = createMockCartItem();
        const invalidItem = { someField: 'value' };
        localStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify([validItem, invalidItem])
        );
        const loaded = loadCartFromStorage();
        expect(loaded).toHaveLength(1);
        expect(loaded[0].id).toBe(validItem.id);
      });
    });

    describe('clearCartStorage', () => {
      it('removes cart data from localStorage', () => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([createMockCartItem()]));
        clearCartStorage();
        expect(localStorage.getItem(CART_STORAGE_KEY)).toBeNull();
      });

      it('does not throw when key does not exist', () => {
        expect(() => clearCartStorage()).not.toThrow();
      });
    });

    describe('full save/load cycle', () => {
      it('round-trips cart items through localStorage', () => {
        const items = [
          createMockCartItem({ id: 'item-1', quantity: 2 }),
          createMockCartItem({ id: 'item-2', unitPrice: 500000, quantity: 1 }),
        ];
        saveCartToStorage(items);
        const loaded = loadCartFromStorage();
        expect(loaded).toEqual(items);
      });
    });
  });
});
