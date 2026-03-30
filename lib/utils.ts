import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names using clsx and tailwind-merge.
 * Handles conditional classes and resolves Tailwind conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a price in cents as a USD currency string.
 * Example: 249900 => "$2,499.00"
 */
export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

/**
 * Generates a unique order number.
 * Format: "AD-{timestamp_base36}-{random_base36}" e.g., "AD-M1KF2-X9T3"
 */
export function generateOrderId(): string {
  const prefix = 'AD';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Generates a unique cart item ID from the product slug and selected options.
 * Same product + same options = same ID (quantity increments).
 * Same product + different options = different ID (separate cart items).
 */
export function generateCartItemId(
  slug: string,
  options: Record<string, string>
): string {
  const optionStr = Object.values(options).sort().join('-');
  return `${slug}-${optionStr}`;
}

/**
 * Debounces a function call by the specified delay in milliseconds.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Tiny base64 encoded 1x1 pixel in the warm background color.
 * Used as blurDataURL for next/image placeholder.
 */
export const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/+N9PQAI+wN5G/YMjwAAAABJRU5ErkJggg==';
