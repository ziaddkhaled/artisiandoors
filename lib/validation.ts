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
