import type { OptionGroup } from '@/types';

/**
 * Default customization option groups.
 * Products reference these or define their own overrides.
 * All priceModifier values are in cents.
 */

export const defaultMaterials: OptionGroup = {
  label: 'Material',
  options: [
    {
      id: 'oak',
      label: 'Solid Oak',
      priceModifier: 0,
      description: 'Premium white oak, sustainably sourced from managed forests.',
    },
    {
      id: 'walnut',
      label: 'Walnut',
      priceModifier: 30000, // +$300
      description: 'Rich American black walnut with distinctive grain patterns.',
    },
    {
      id: 'mahogany',
      label: 'Mahogany',
      priceModifier: 50000, // +$500
      description: 'Genuine Honduran mahogany, prized for its deep reddish-brown tone.',
    },
    {
      id: 'reclaimed-teak',
      label: 'Reclaimed Teak',
      priceModifier: 80000, // +$800
      description: 'Salvaged old-growth teak with unique weathering and character.',
    },
  ],
};

export const defaultFinishes: OptionGroup = {
  label: 'Finish',
  options: [
    {
      id: 'natural',
      label: 'Natural',
      priceModifier: 0,
      description: 'Clear matte coat that lets the wood grain shine through.',
    },
    {
      id: 'matte-black',
      label: 'Matte Black',
      priceModifier: 20000, // +$200
      description: 'Sophisticated matte black finish with soft-touch coating.',
    },
    {
      id: 'brushed-bronze',
      label: 'Brushed Bronze',
      priceModifier: 35000, // +$350
      description: 'Hand-applied bronze patina with brushed metallic highlights.',
    },
    {
      id: 'hand-lacquered',
      label: 'Hand-Lacquered',
      priceModifier: 50000, // +$500
      description: 'Eight-coat hand-lacquered finish for a mirror-smooth surface.',
    },
  ],
};

export const defaultSizes: OptionGroup = {
  label: 'Size',
  options: [
    {
      id: 'standard',
      label: 'Standard 36"x80"',
      priceModifier: 0,
      description: 'Standard single-door opening suitable for most interiors.',
    },
    {
      id: 'wide',
      label: 'Wide 42"x80"',
      priceModifier: 30000, // +$300
      description: 'Extended width for grander entrances and accessibility.',
    },
    {
      id: 'double',
      label: 'Double 72"x80"',
      priceModifier: 60000, // +$600
      description: 'Double-door configuration for dramatic entryways.',
    },
    {
      id: 'grand',
      label: 'Grand 72"x96"',
      priceModifier: 100000, // +$1,000
      description: 'Oversized double doors for palatial entrances and commercial spaces.',
    },
  ],
};

export const defaultHardware: OptionGroup = {
  label: 'Hardware',
  options: [
    {
      id: 'classic-brass',
      label: 'Classic Brass',
      priceModifier: 0,
      description: 'Timeless polished brass hardware with lever handle.',
    },
    {
      id: 'matte-black-hw',
      label: 'Matte Black',
      priceModifier: 15000, // +$150
      description: 'Modern matte black hardware with angular profile.',
    },
    {
      id: 'artisan-iron',
      label: 'Artisan Iron',
      priceModifier: 30000, // +$300
      description: 'Hand-forged iron hardware with rustic charm and heft.',
    },
    {
      id: 'crystal',
      label: 'Crystal',
      priceModifier: 40000, // +$400
      description: 'Cut crystal knobs with faceted light-catching surfaces.',
    },
  ],
};
