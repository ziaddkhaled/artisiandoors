import type { Product, SelectedOptions } from '@/types';

/**
 * TAX_RATE is the demo tax rate (8.5%).
 */
export const TAX_RATE = 0.085;

/**
 * Formats a price in cents as a USD currency string.
 * Example: 249900 => "$2,499.00"
 */
export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(priceInCents / 100);
}

/**
 * Looks up the price modifier for a specific option within a product.
 * Returns 0 if the option is not found.
 */
export function getOptionPriceModifier(
  product: Product,
  optionType: keyof Pick<Product, 'materials' | 'finishes' | 'sizes' | 'hardware'>,
  optionId: string
): number {
  const group = product[optionType];
  const option = group.options.find((opt) => opt.id === optionId);
  return option?.priceModifier ?? 0;
}

/**
 * Calculates the total price for a product with the given customization options.
 * Returns the total in cents.
 */
export function calculateCustomPrice(
  product: Product,
  selectedOptions: SelectedOptions
): number {
  const materialMod = getOptionPriceModifier(product, 'materials', selectedOptions.material);
  const finishMod = getOptionPriceModifier(product, 'finishes', selectedOptions.finish);
  const sizeMod = getOptionPriceModifier(product, 'sizes', selectedOptions.size);
  const hardwareMod = getOptionPriceModifier(product, 'hardware', selectedOptions.hardware);

  return product.basePrice + materialMod + finishMod + sizeMod + hardwareMod;
}

/**
 * Returns the human-readable label for a selected option within a product.
 */
export function getOptionLabel(
  product: Product,
  optionType: keyof Pick<Product, 'materials' | 'finishes' | 'sizes' | 'hardware'>,
  optionId: string
): string {
  const group = product[optionType];
  const option = group.options.find((opt) => opt.id === optionId);
  return option?.label ?? optionId;
}

/**
 * Builds a record of human-readable labels for all selected options.
 */
export function getSelectedOptionsLabels(
  product: Product,
  selectedOptions: SelectedOptions
): Record<string, string> {
  return {
    Material: getOptionLabel(product, 'materials', selectedOptions.material),
    Finish: getOptionLabel(product, 'finishes', selectedOptions.finish),
    Size: getOptionLabel(product, 'sizes', selectedOptions.size),
    Hardware: getOptionLabel(product, 'hardware', selectedOptions.hardware),
  };
}

/**
 * Returns the default selected options for a product (first option in each group).
 */
export function getDefaultSelectedOptions(product: Product): SelectedOptions {
  return {
    material: product.materials.options[0]?.id ?? '',
    finish: product.finishes.options[0]?.id ?? '',
    size: product.sizes.options[0]?.id ?? '',
    hardware: product.hardware.options[0]?.id ?? '',
  };
}

/**
 * Calculates tax for a subtotal (in cents).
 * Returns tax amount in cents, rounded to the nearest cent.
 */
export function calculateTax(subtotalInCents: number): number {
  return Math.round(subtotalInCents * TAX_RATE);
}
