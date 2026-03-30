// Order-related type definitions for ArtisanDoors

import type { CartItem } from './cart';

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';

export interface Order {
  id: string; // generated order number (e.g., "AD-M1KF2-X9T3")
  items: CartItem[];
  subtotal: number; // in cents
  tax: number; // in cents
  total: number; // in cents
  shipping: ShippingInfo;
  status: OrderStatus;
  createdAt: string; // ISO date string
}
