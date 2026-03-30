import type { Product } from '@/types';
import {
  defaultMaterials,
  defaultFinishes,
  defaultSizes,
  defaultHardware,
} from './options';

export const products: Product[] = [
  // ── Modern Collection (3 products) ──────────────────────────────────
  {
    slug: 'metropolitan-edge',
    name: 'The Metropolitan Edge',
    collection: 'modern',
    description:
      'A striking fusion of blackened steel and warm timber, the Metropolitan Edge commands attention with its razor-sharp geometry. Designed for urban residences and contemporary interiors, this door transforms every threshold into an architectural statement. Hand-assembled in our studio using precision CNC-cut panels married to a concealed steel frame.',
    shortDescription:
      'Bold geometric door blending blackened steel and warm timber for modern urban residences.',
    basePrice: 349900, // $3,499
    images: [
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80', alt: 'Metropolitan Edge door front view', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1506269351674-30d55412be3e?w=800&q=80', alt: 'Metropolitan Edge detail of steel inlay', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=800&q=80', alt: 'Metropolitan Edge in a modern hallway', width: 800, height: 1067 },
    ],
    materials: defaultMaterials,
    finishes: defaultFinishes,
    sizes: defaultSizes,
    hardware: defaultHardware,
    features: ['Concealed steel core frame', 'CNC precision-cut panels', 'Thermal break insulation', 'Multi-point locking system'],
    tags: ['modern', 'steel', 'geometric', 'urban'],
    isFeatured: true,
    isNew: true,
    isPopular: true,
    inStock: true,
    createdAt: '2026-03-01T00:00:00Z',
  },
  {
    slug: 'aurora-glass',
    name: 'The Aurora Glass',
    collection: 'modern',
    description:
      'Light becomes a design element with the Aurora Glass. Featuring a floor-to-ceiling frosted glass panel framed in solid hardwood, this door floods interiors with diffused natural light while preserving complete privacy. The seamless integration of glass and wood showcases our precision joinery at its finest.',
    shortDescription:
      'Floor-to-ceiling frosted glass panel framed in solid hardwood, flooding interiors with natural light.',
    basePrice: 419900, // $4,199
    images: [
      { src: 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=800&q=80', alt: 'Aurora Glass door with frosted panel', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', alt: 'Aurora Glass in a bright interior', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80', alt: 'Aurora Glass hardware detail', width: 800, height: 1067 },
    ],
    materials: defaultMaterials,
    finishes: defaultFinishes,
    sizes: defaultSizes,
    hardware: defaultHardware,
    features: ['Tempered frosted glass panel', 'UV-resistant coating', 'Sound dampening core', 'Flush-mount hinges'],
    tags: ['modern', 'glass', 'light', 'minimalist'],
    isFeatured: false,
    isNew: true,
    isPopular: false,
    inStock: true,
    createdAt: '2026-02-20T00:00:00Z',
  },
  {
    slug: 'zen-pivot',
    name: 'The Zen Pivot',
    collection: 'modern',
    description:
      'Inspired by the serene minimalism of Japanese architecture, the Zen Pivot rotates on a central axis for a dramatic entrance experience. Its clean, unadorned surface celebrates the raw beauty of the chosen wood, while the pivot mechanism eliminates the need for traditional hinges. A meditation on simplicity and balance.',
    shortDescription:
      'Central-pivot door inspired by Japanese minimalism, celebrating raw wood beauty.',
    basePrice: 499900, // $4,999
    images: [
      { src: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&q=80', alt: 'Zen Pivot door front view', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80', alt: 'Zen Pivot in a minimal interior', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', alt: 'Zen Pivot showing pivot mechanism', width: 800, height: 1067 },
    ],
    materials: defaultMaterials,
    finishes: defaultFinishes,
    sizes: defaultSizes,
    hardware: defaultHardware,
    features: ['Central pivot mechanism', 'Self-closing dampener', 'Seamless edge profile', 'Floor-recessed hardware'],
    tags: ['modern', 'pivot', 'japanese', 'minimal'],
    isFeatured: true,
    isNew: false,
    isPopular: true,
    inStock: true,
    createdAt: '2025-11-15T00:00:00Z',
  },

  // ── Classic Collection (3 products) ─────────────────────────────────
  {
    slug: 'villa-classica',
    name: 'The Villa Classica',
    collection: 'classic',
    description:
      'Evoking the grandeur of Tuscan country estates, the Villa Classica features raised panels framed by hand-carved mouldings and a graceful arched transom option. Every curve and contour is shaped by hand from a single timber selection, ensuring grain continuity across the entire door face. A masterwork of traditional European door craftsmanship.',
    shortDescription:
      'Tuscan-inspired raised-panel door with hand-carved mouldings and graceful proportions.',
    basePrice: 299900, // $2,999
    images: [
      { src: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&q=80', alt: 'Villa Classica door front view', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', alt: 'Villa Classica moulding detail', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', alt: 'Villa Classica installed in estate entrance', width: 800, height: 1067 },
    ],
    materials: defaultMaterials,
    finishes: defaultFinishes,
    sizes: defaultSizes,
    hardware: defaultHardware,
    features: ['Hand-carved raised panels', 'Single-timber grain matching', 'Arched transom option', 'Mortise & tenon joinery'],
    tags: ['classic', 'tuscan', 'carved', 'traditional'],
    isFeatured: true,
    isNew: false,
    isPopular: true,
    inStock: true,
    createdAt: '2025-09-10T00:00:00Z',
  },
  {
    slug: 'the-monarch',
    name: 'The Monarch',
    collection: 'classic',
    description:
      'Named for its regal bearing, The Monarch is our flagship classic door. Six perfectly proportioned panels are set within a solid stile-and-rail frame, each surface hand-sanded through five grits for a finish that invites touch. From grand foyers to library entries, this door sets the standard for enduring elegance.',
    shortDescription:
      'Flagship six-panel classic door with hand-sanded perfection and regal proportions.',
    basePrice: 249900, // $2,499
    images: [
      { src: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&q=80', alt: 'The Monarch door front view', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', alt: 'The Monarch panel detail', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', alt: 'The Monarch in a traditional hallway', width: 800, height: 1067 },
    ],
    materials: defaultMaterials,
    finishes: defaultFinishes,
    sizes: defaultSizes,
    hardware: defaultHardware,
    features: ['Six-panel stile-and-rail construction', 'Five-grit hand-sanding', 'Weatherstripping included', 'Pre-hung option available'],
    tags: ['classic', 'panel', 'traditional', 'elegant'],
    isFeatured: false,
    isNew: false,
    isPopular: true,
    inStock: true,
    createdAt: '2025-06-01T00:00:00Z',
  },
  {
    slug: 'cambridge-arch',
    name: 'The Cambridge Arch',
    collection: 'classic',
    description:
      'Drawing inspiration from the hallowed halls of English academia, the Cambridge Arch pairs a bold semicircular arch with recessed rectangular panels. The proportions follow the golden ratio, creating a subconscious sense of harmony. Each door is fitted with period-accurate iron strap hinges that reference centuries of British doormaking tradition.',
    shortDescription:
      'English-inspired arched door with golden-ratio proportions and period iron hardware.',
    basePrice: 379900, // $3,799
    images: [
      { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', alt: 'Cambridge Arch door front view', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', alt: 'Cambridge Arch iron hinge detail', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', alt: 'Cambridge Arch in a formal entryway', width: 800, height: 1067 },
    ],
    materials: defaultMaterials,
    finishes: defaultFinishes,
    sizes: defaultSizes,
    hardware: defaultHardware,
    features: ['Semicircular arch profile', 'Golden-ratio proportions', 'Period iron strap hinges', 'Recessed panel construction'],
    tags: ['classic', 'arch', 'english', 'formal'],
    isFeatured: false,
    isNew: true,
    isPopular: false,
    inStock: true,
    createdAt: '2026-01-25T00:00:00Z',
  },

  // ── Artisan Collection (2 products) ─────────────────────────────────
  {
    slug: 'mosaic-artistry',
    name: 'The Mosaic Artistry',
    collection: 'artisan',
    description:
      'A breathtaking tapestry of hand-inlaid wood species, the Mosaic Artistry door transforms entrance design into fine art. Over 200 individually cut timber pieces are assembled into an organic geometric pattern, with each species chosen for its contrasting tone and grain direction. No two doors are identical — each is a signed original from our master inlay craftsman.',
    shortDescription:
      'Hand-inlaid mosaic of 200+ timber pieces creating a unique geometric work of art.',
    basePrice: 449900, // $4,499
    images: [
      { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', alt: 'Mosaic Artistry door front view', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80', alt: 'Mosaic Artistry inlay close-up', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80', alt: 'Mosaic Artistry installed in gallery space', width: 800, height: 1067 },
    ],
    materials: defaultMaterials,
    finishes: defaultFinishes,
    sizes: defaultSizes,
    hardware: defaultHardware,
    features: ['200+ hand-cut timber inlays', 'Multi-species wood selection', 'Signed by master craftsman', 'Museum-grade clear finish'],
    tags: ['artisan', 'inlay', 'mosaic', 'unique'],
    isFeatured: true,
    isNew: false,
    isPopular: false,
    inStock: true,
    createdAt: '2025-10-05T00:00:00Z',
  },
  {
    slug: 'carved-wilderness',
    name: 'The Carved Wilderness',
    collection: 'artisan',
    description:
      'Nature rendered in three dimensions, the Carved Wilderness features a hand-sculpted bas-relief of intertwining branches, leaves, and woodland creatures emerging from a thick slab of old-growth timber. Our master carver spends over 120 hours on each door, creating a living artwork that bridges the natural world and the built environment.',
    shortDescription:
      'Hand-sculpted bas-relief door depicting woodland scenes carved over 120 hours.',
    basePrice: 499900, // $4,999
    images: [
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', alt: 'Carved Wilderness door front view', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80', alt: 'Carved Wilderness relief detail', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80', alt: 'Carved Wilderness in a rustic lodge entrance', width: 800, height: 1067 },
    ],
    materials: defaultMaterials,
    finishes: defaultFinishes,
    sizes: defaultSizes,
    hardware: defaultHardware,
    features: ['120+ hours hand carving', 'Bas-relief woodland scenes', 'Old-growth timber slab', 'Protective UV sealant'],
    tags: ['artisan', 'carved', 'nature', 'sculptural'],
    isFeatured: false,
    isNew: false,
    isPopular: true,
    inStock: true,
    createdAt: '2025-08-20T00:00:00Z',
  },

  // ── Heritage Collection (2 products) ────────────────────────────────
  {
    slug: 'andalusian-gate',
    name: 'The Andalusian Gate',
    collection: 'heritage',
    description:
      'Inspired by the ornate cedar doors of Moorish palaces, the Andalusian Gate features intricate geometric lattice work hand-carved using traditional compass-and-straightedge techniques. The pattern is based on authentic 14th-century Alhambra designs, faithfully reproduced by artisans who trained in restoration workshops in Granada. A door that carries eight centuries of culture.',
    shortDescription:
      'Moorish-inspired geometric lattice door based on authentic 14th-century Alhambra designs.',
    basePrice: 459900, // $4,599
    images: [
      { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', alt: 'Andalusian Gate door front view', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=800&q=80', alt: 'Andalusian Gate lattice work detail', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', alt: 'Andalusian Gate in a courtyard entrance', width: 800, height: 1067 },
    ],
    materials: defaultMaterials,
    finishes: defaultFinishes,
    sizes: defaultSizes,
    hardware: defaultHardware,
    features: ['Compass-and-straightedge lattice', 'Alhambra-inspired geometry', 'Granada-trained artisans', 'Cedar or mahogany base'],
    tags: ['heritage', 'moorish', 'geometric', 'lattice'],
    isFeatured: false,
    isNew: true,
    isPopular: false,
    inStock: true,
    createdAt: '2026-02-10T00:00:00Z',
  },
  {
    slug: 'kyoto-shoji',
    name: 'The Kyoto Shoji',
    collection: 'heritage',
    description:
      'A contemporary homage to the sliding shoji screens of Kyoto tea houses, this door pairs a lightweight hinoki cypress frame with translucent washi-inspired panels. The kumiko lattice work is assembled without nails or glue using centuries-old Japanese joinery techniques. Perfectly balanced on its track, it glides open with a whisper and brings meditative calm to any space.',
    shortDescription:
      'Japanese shoji-inspired sliding door with kumiko lattice and translucent panels.',
    basePrice: 389900, // $3,899
    images: [
      { src: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80', alt: 'Kyoto Shoji door front view', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&q=80', alt: 'Kyoto Shoji kumiko lattice detail', width: 800, height: 1067 },
      { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', alt: 'Kyoto Shoji in a serene interior', width: 800, height: 1067 },
    ],
    materials: defaultMaterials,
    finishes: defaultFinishes,
    sizes: defaultSizes,
    hardware: defaultHardware,
    features: ['Kumiko lattice (no nails/glue)', 'Hinoki cypress frame', 'Washi-inspired panels', 'Whisper-glide track system'],
    tags: ['heritage', 'japanese', 'shoji', 'sliding'],
    isFeatured: true,
    isNew: false,
    isPopular: false,
    inStock: true,
    createdAt: '2025-12-01T00:00:00Z',
  },
];
