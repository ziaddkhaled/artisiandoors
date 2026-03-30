import { z } from 'zod';

// ── Contact Form Schema ────────────────────────────────────────────────

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  subject: z
    .string()
    .min(1, 'Please select a subject'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message is too long'),
});

/** @deprecated Use contactFormSchema instead */
export const contactSchema = contactFormSchema;

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ── Checkout Form Schema ───────────────────────────────────────────────

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required'),
  lastName: z
    .string()
    .min(1, 'Last name is required'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^[\d\s\-+()]{7,15}$/, 'Please enter a valid phone number'),
  address: z
    .string()
    .min(5, 'Address is required'),
  city: z
    .string()
    .min(2, 'City is required'),
  state: z
    .string()
    .min(2, 'State is required'),
  zip: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  country: z
    .string()
    .min(1, 'Country is required'),
});

/** @deprecated Use checkoutFormSchema instead */
export const checkoutSchema = checkoutFormSchema;

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

// ── Email Signup Schema ────────────────────────────────────────────────

export const emailSignupSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address'),
});

/** @deprecated Use emailSignupSchema instead */
export const emailSchema = emailSignupSchema;

export type EmailSignupData = z.infer<typeof emailSignupSchema>;

/** @deprecated Use EmailSignupData instead */
export type EmailFormData = EmailSignupData;

// ── SelectedOptions Schema ────────────────────────────────────────────

export const selectedOptionsSchema = z.object({
  material: z.string(),
  finish: z.string(),
  size: z.string(),
  hardware: z.string(),
});

// ── CartItem Schema (SEC-003) ─────────────────────────────────────────
// Validates the full CartItem shape when deserializing from localStorage.

export const cartItemSchema = z.object({
  id: z.string().min(1).max(500),
  productSlug: z.string().min(1).max(200),
  productName: z.string().min(1).max(500),
  productImage: z.string().min(1).max(2000),
  selectedOptions: selectedOptionsSchema,
  selectedOptionsLabels: z.record(z.string(), z.string().max(500)),
  quantity: z.number().int().min(1).max(99),
  unitPrice: z.number().int().min(0),
});

// ── ShippingInfo Schema ───────────────────────────────────────────────

export const shippingInfoSchema = z.object({
  firstName: z.string().min(1).max(100).trim(),
  lastName: z.string().min(1).max(100).trim(),
  email: z.string().email().max(320),
  phone: z.string().min(1).max(30),
  address: z.string().min(1).max(500).trim(),
  city: z.string().min(1).max(200).trim(),
  state: z.string().min(1).max(200).trim(),
  zip: z.string().min(1).max(20),
  country: z.string().min(1).max(200).trim(),
});

// ── Order Schema (SEC-002) ────────────────────────────────────────────
// Validates the full Order shape when deserializing from localStorage.

export const orderSchema = z.object({
  id: z.string().min(1).max(100),
  items: z.array(cartItemSchema).min(1),
  subtotal: z.number().int().min(0),
  tax: z.number().int().min(0),
  total: z.number().int().min(0),
  shipping: shippingInfoSchema,
  status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered']),
  createdAt: z.string().min(1),
});
