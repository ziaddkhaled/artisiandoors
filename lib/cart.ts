import type { CartItem, CartState, CartAction, CartTotals } from '@/types';
import type { SelectedOptions } from '@/types';
import { TAX_RATE } from './pricing';
import { cartItemSchema } from './validation';

/**
 * localStorage key for persisting the cart.
 */
export const CART_STORAGE_KEY = 'artisandoors-cart';

/**
 * Generates a unique cart item ID from the product slug and selected options.
 * Same product + same options = same ID (quantity increments instead of duplicate).
 * Same product + different options = different ID (separate cart items).
 */
export function generateCartItemId(
  productSlug: string,
  selectedOptions: SelectedOptions
): string {
  const optionString = [
    selectedOptions.material,
    selectedOptions.finish,
    selectedOptions.size,
    selectedOptions.hardware,
  ].join('-');
  return `${productSlug}::${optionString}`;
}

/**
 * Cart reducer handling all state transitions.
 * Pure function -- no side effects.
 */
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        // Same product + same options: increment quantity
        const updatedItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return { ...state, items: updatedItems };
      }

      // New unique combination: add as new cart item
      return { ...state, items: [...state.items, action.payload] };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;

      // Enforce minimum of 1, maximum of 99
      if (quantity < 1 || quantity > 99) return state;

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }

    case 'LOAD_CART': {
      return { ...state, items: action.payload, isHydrated: true };
    }

    default:
      return state;
  }
}

/**
 * Calculates cart totals from the current list of cart items.
 */
export function calculateCartTotals(items: CartItem[]): CartTotals {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  return { totalItems, subtotal, tax, total };
}

/**
 * Persists the cart items to localStorage.
 * Handles errors gracefully (quota exceeded, SSR, private browsing).
 */
export function saveCartToStorage(items: CartItem[]): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    // Silently fail -- quota exceeded or storage unavailable
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Failed to save cart to localStorage:', error);
    }
  }
}

/**
 * Loads cart items from localStorage.
 * Returns an empty array if nothing is stored or on error.
 */
export function loadCartFromStorage(): CartItem[] {
  try {
    if (typeof window === 'undefined') return [];
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);

    // Structural validation: ensure it's an array, then validate each item via Zod (SEC-003)
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item: unknown) => cartItemSchema.safeParse(item))
      .filter((result): result is { success: true; data: CartItem } => result.success)
      .map((result) => result.data as CartItem);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Failed to load cart from localStorage:', error);
    }
    return [];
  }
}

/**
 * Removes the cart data from localStorage.
 */
export function clearCartStorage(): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Failed to clear cart from localStorage:', error);
    }
  }
}
