import type { CartItem, Order, ShippingInfo } from '@/types';
import { calculateCartTotals } from './cart';
import { orderSchema } from './validation';

/**
 * localStorage key for persisting the last placed order.
 */
export const ORDER_STORAGE_KEY = 'artisandoors-last-order';

/**
 * Generates a unique order number.
 * Format: "AD-{timestamp_base36}-{random_base36}" e.g., "AD-M1KF2-X9T3"
 */
export function generateOrderNumber(): string {
  const prefix = 'AD';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Creates a new Order object from cart items and shipping information.
 * Does NOT persist to storage -- call saveOrder() separately.
 */
export function createOrder(
  items: CartItem[],
  shippingInfo: ShippingInfo
): Order {
  const { subtotal, tax, total } = calculateCartTotals(items);

  return {
    id: generateOrderNumber(),
    items: [...items], // defensive copy
    subtotal,
    tax,
    total,
    shipping: { ...shippingInfo },
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };
}

/**
 * Saves an order to localStorage.
 * Only the most recent order is stored (overwrites previous).
 */
export function saveOrder(order: Order): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Failed to save order to localStorage:', error);
    }
  }
}

/**
 * Retrieves the last placed order from localStorage.
 * Returns null if no order exists or on error.
 */
export function getLastOrder(): Order | null {
  try {
    if (typeof window === 'undefined') return null;
    const stored = window.localStorage.getItem(ORDER_STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);

    // Full structural validation via Zod (SEC-002)
    const result = orderSchema.safeParse(parsed);
    if (result.success) {
      return result.data as Order;
    }

    return null;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Failed to load order from localStorage:', error);
    }
    return null;
  }
}

/**
 * Clears the stored order from localStorage.
 */
export function clearLastOrder(): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(ORDER_STORAGE_KEY);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Failed to clear order from localStorage:', error);
    }
  }
}
