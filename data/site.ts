// Site-wide constants: navigation links, footer content, contact info

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Shop', href: '/shop' },
  ],
  support: [
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '#' },
  ],
} as const;

export const contactInfo = {
  address: '147 Artisan Lane, Brooklyn, NY 11201',
  phone: '+1 (718) 555-0142',
  email: 'hello@artisandoors.com',
  hours: 'Mon - Fri: 9:00 AM - 6:00 PM EST',
} as const;

export const contactSubjects = [
  'General Inquiry',
  'Custom Door Design',
  'Order Support',
  'Partnership',
  'Other',
] as const;

export const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Japan',
  'Other',
] as const;

export const marqueeItems = [
  'Bespoke Craftsmanship',
  'Premium Materials',
  'Free Consultation',
  'Lifetime Warranty',
  'Custom Sizing',
  'Hand-Finished',
  'Sustainable Sourcing',
  'Architectural Design',
  'White-Glove Delivery',
  'Expert Installation',
] as const;

export const metrics = [
  { value: '15+', label: 'Years of Craftsmanship' },
  { value: '2000+', label: 'Doors Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
] as const;

export const features = [
  {
    number: 1,
    title: 'Bespoke Design Consultation',
    description:
      'Every project begins with a one-on-one consultation where our designers understand your space, style, and vision. We create detailed 3D renderings so you can see your door before a single cut is made.',
    imageSrc: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80',
    imageAlt: 'Designer consulting with client over door blueprints',
  },
  {
    number: 2,
    title: 'Master Craftsmanship',
    description:
      'Our artisans bring decades of experience to every door they create. Using time-honored techniques alongside precision modern tools, each door is a testament to the marriage of tradition and innovation.',
    imageSrc: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
    imageAlt: 'Craftsman working on a wooden door in workshop',
  },
  {
    number: 3,
    title: 'White-Glove Installation',
    description:
      'Our installation team ensures every door is hung with the same care with which it was built. From precise alignment to final hardware adjustment, we handle every detail so your door performs flawlessly for decades.',
    imageSrc: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    imageAlt: 'Professional team installing a luxury door',
  },
] as const;
