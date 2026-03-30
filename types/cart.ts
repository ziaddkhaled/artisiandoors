// Cart-related type definitions for ArtisanDoors

import type { SelectedOptions } from './product';

export interface CartItem {
  id: string; // unique: slug + options hash
  productSlug: string;
  productName: string;
  productImage: string;
  selectedOptions: SelectedOptions;
  selectedOptionsLabels: Record<string, string>; // human-readable option labels
  quantity: number;
  unitPrice: number; // base price + modifiers, in cents
}

export interface CartState {
  items: CartItem[];
  isHydrated: boolean; // tracks whether localStorage has been loaded
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string } // item ID
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

export interface CartTotals {
  totalItems: number;
  subtotal: number; // in cents
  tax: number; // in cents (8.5% demo rate)
  total: number; // in cents
}

export interface CartContextValue extends CartState, CartTotals {
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}
