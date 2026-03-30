// Product-related type definitions for ArtisanDoors

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Option {
  id: string;
  label: string;
  priceModifier: number; // in cents, positive or negative
  description?: string;
}

export interface OptionGroup {
  label: string; // "Material", "Finish", etc.
  options: Option[];
}

export interface Product {
  slug: string;
  name: string;
  collection: 'modern' | 'classic' | 'artisan' | 'heritage';
  description: string;
  shortDescription: string;
  basePrice: number; // in cents (e.g., 249900 = $2,499.00)
  images: ProductImage[];
  materials: OptionGroup;
  finishes: OptionGroup;
  sizes: OptionGroup;
  hardware: OptionGroup;
  features: string[];
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  isPopular: boolean;
  inStock: boolean;
  createdAt: string; // ISO date string for sorting
}

export interface Collection {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface SelectedOptions {
  material: string; // option ID
  finish: string;
  size: string;
  hardware: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'newest' | 'popular';

export interface FilterState {
  collection: string | null;
  material: string | null;
  priceRange: [number, number] | null; // [min, max] in cents
  search: string;
  sortBy: SortOption;
}
