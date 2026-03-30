import type { Collection } from '@/types';

export const collections: Collection[] = [
  {
    slug: 'modern',
    name: 'Modern',
    description:
      'Clean lines, contemporary materials, and bold minimal designs that make a statement. Our Modern collection embraces the beauty of simplicity with precision-engineered doors for the forward-thinking homeowner.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
  },
  {
    slug: 'classic',
    name: 'Classic',
    description:
      'Timeless elegance meets traditional craftsmanship. The Classic collection draws on centuries of doormaking heritage, featuring ornate details and refined proportions that never go out of style.',
    image: 'https://images.unsplash.com/photo-1506269351674-30d55412be3e?w=800&q=80',
  },
  {
    slug: 'artisan',
    name: 'Artisan',
    description:
      'Hand-crafted, unique designs born from artistic expression. Each Artisan door is a one-of-a-kind masterpiece created by our most experienced craftspeople using techniques passed down through generations.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
  },
  {
    slug: 'heritage',
    name: 'Heritage',
    description:
      'Historical inspiration brought to life with restored techniques and cultural motifs. The Heritage collection pays tribute to architectural traditions from around the world, reimagined for the modern home.',
    image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&q=80',
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getAllCollections(): Collection[] {
  return collections;
}
