import { describe, it, expect } from 'vitest';
import {
  contactFormSchema,
  checkoutFormSchema,
  emailSignupSchema,
} from './validation';

describe('lib/validation', () => {
  // ── contactFormSchema ─────────────────────────────────────────────

  describe('contactFormSchema', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'General Inquiry',
      message: 'I would like to know more about your doors and custom options.',
    };

    it('accepts valid data', () => {
      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    describe('name field', () => {
      it('rejects names shorter than 2 characters', () => {
        const result = contactFormSchema.safeParse({ ...validData, name: 'J' });
        expect(result.success).toBe(false);
      });

      it('rejects names longer than 50 characters', () => {
        const result = contactFormSchema.safeParse({
          ...validData,
          name: 'A'.repeat(51),
        });
        expect(result.success).toBe(false);
      });

      it('accepts a 2-character name', () => {
        const result = contactFormSchema.safeParse({ ...validData, name: 'Jo' });
        expect(result.success).toBe(true);
      });

      it('accepts a 50-character name', () => {
        const result = contactFormSchema.safeParse({
          ...validData,
          name: 'A'.repeat(50),
        });
        expect(result.success).toBe(true);
      });

      it('rejects empty name', () => {
        const result = contactFormSchema.safeParse({ ...validData, name: '' });
        expect(result.success).toBe(false);
      });
    });

    describe('email field', () => {
      it('rejects invalid email format', () => {
        const result = contactFormSchema.safeParse({ ...validData, email: 'not-an-email' });
        expect(result.success).toBe(false);
      });

      it('rejects email without domain', () => {
        const result = contactFormSchema.safeParse({ ...validData, email: 'john@' });
        expect(result.success).toBe(false);
      });

      it('accepts standard email format', () => {
        const result = contactFormSchema.safeParse({ ...validData, email: 'user@domain.com' });
        expect(result.success).toBe(true);
      });

      it('rejects empty email', () => {
        const result = contactFormSchema.safeParse({ ...validData, email: '' });
        expect(result.success).toBe(false);
      });
    });

    describe('subject field', () => {
      it('rejects empty subject', () => {
        const result = contactFormSchema.safeParse({ ...validData, subject: '' });
        expect(result.success).toBe(false);
      });

      it('accepts a single character subject', () => {
        const result = contactFormSchema.safeParse({ ...validData, subject: 'X' });
        expect(result.success).toBe(true);
      });
    });

    describe('message field', () => {
      it('rejects messages shorter than 10 characters', () => {
        const result = contactFormSchema.safeParse({ ...validData, message: 'Short' });
        expect(result.success).toBe(false);
      });

      it('rejects messages longer than 1000 characters', () => {
        const result = contactFormSchema.safeParse({
          ...validData,
          message: 'A'.repeat(1001),
        });
        expect(result.success).toBe(false);
      });

      it('accepts a 10-character message', () => {
        const result = contactFormSchema.safeParse({
          ...validData,
          message: 'Hello ther',
        });
        expect(result.success).toBe(true);
      });

      it('accepts a 1000-character message', () => {
        const result = contactFormSchema.safeParse({
          ...validData,
          message: 'A'.repeat(1000),
        });
        expect(result.success).toBe(true);
      });
    });

    it('rejects when all fields are missing', () => {
      const result = contactFormSchema.safeParse({});
      expect(result.success).toBe(false);
    });
  });

  // ── checkoutFormSchema ────────────────────────────────────────────

  describe('checkoutFormSchema', () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '555-123-4567',
      address: '123 Main Street',
      city: 'Anytown',
      state: 'CA',
      zip: '90210',
      country: 'United States',
    };

    it('accepts valid data', () => {
      const result = checkoutFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    describe('firstName field', () => {
      it('rejects empty first name', () => {
        const result = checkoutFormSchema.safeParse({ ...validData, firstName: '' });
        expect(result.success).toBe(false);
      });

      it('accepts a single character first name', () => {
        const result = checkoutFormSchema.safeParse({ ...validData, firstName: 'J' });
        expect(result.success).toBe(true);
      });
    });

    describe('lastName field', () => {
      it('rejects empty last name', () => {
        const result = checkoutFormSchema.safeParse({ ...validData, lastName: '' });
        expect(result.success).toBe(false);
      });
    });

    describe('email field', () => {
      it('rejects invalid email', () => {
        const result = checkoutFormSchema.safeParse({ ...validData, email: 'bad' });
        expect(result.success).toBe(false);
      });

      it('accepts valid email', () => {
        const result = checkoutFormSchema.safeParse({
          ...validData,
          email: 'test@test.co.uk',
        });
        expect(result.success).toBe(true);
      });
    });

    describe('phone field', () => {
      it('accepts formatted phone numbers', () => {
        expect(checkoutFormSchema.safeParse({ ...validData, phone: '555-123-4567' }).success).toBe(true);
        expect(checkoutFormSchema.safeParse({ ...validData, phone: '(555) 123-4567' }).success).toBe(true);
        expect(checkoutFormSchema.safeParse({ ...validData, phone: '+1 555 123 4567' }).success).toBe(true);
      });

      it('rejects phone numbers that are too short', () => {
        const result = checkoutFormSchema.safeParse({ ...validData, phone: '123' });
        expect(result.success).toBe(false);
      });

      it('rejects phone numbers with letters', () => {
        const result = checkoutFormSchema.safeParse({ ...validData, phone: 'abc-def-ghij' });
        expect(result.success).toBe(false);
      });
    });

    describe('address field', () => {
      it('rejects addresses shorter than 5 characters', () => {
        const result = checkoutFormSchema.safeParse({ ...validData, address: '123' });
        expect(result.success).toBe(false);
      });

      it('accepts a valid address', () => {
        const result = checkoutFormSchema.safeParse({
          ...validData,
          address: '456 Oak Avenue, Suite 100',
        });
        expect(result.success).toBe(true);
      });
    });

    describe('city field', () => {
      it('rejects cities shorter than 2 characters', () => {
        const result = checkoutFormSchema.safeParse({ ...validData, city: 'A' });
        expect(result.success).toBe(false);
      });
    });

    describe('state field', () => {
      it('rejects states shorter than 2 characters', () => {
        const result = checkoutFormSchema.safeParse({ ...validData, state: 'C' });
        expect(result.success).toBe(false);
      });
    });

    describe('zip field', () => {
      it('accepts 5-digit ZIP codes', () => {
        const result = checkoutFormSchema.safeParse({ ...validData, zip: '90210' });
        expect(result.success).toBe(true);
      });

      it('accepts 5+4 digit ZIP codes', () => {
        const result = checkoutFormSchema.safeParse({ ...validData, zip: '90210-1234' });
        expect(result.success).toBe(true);
      });

      it('rejects invalid ZIP formats', () => {
        expect(checkoutFormSchema.safeParse({ ...validData, zip: '1234' }).success).toBe(false);
        expect(checkoutFormSchema.safeParse({ ...validData, zip: 'ABCDE' }).success).toBe(false);
        expect(checkoutFormSchema.safeParse({ ...validData, zip: '123456' }).success).toBe(false);
        expect(checkoutFormSchema.safeParse({ ...validData, zip: '90210-12' }).success).toBe(false);
      });
    });

    describe('country field', () => {
      it('rejects empty country', () => {
        const result = checkoutFormSchema.safeParse({ ...validData, country: '' });
        expect(result.success).toBe(false);
      });
    });

    it('rejects when all fields are missing', () => {
      const result = checkoutFormSchema.safeParse({});
      expect(result.success).toBe(false);
    });
  });

  // ── emailSignupSchema ─────────────────────────────────────────────

  describe('emailSignupSchema', () => {
    it('accepts a valid email', () => {
      const result = emailSignupSchema.safeParse({ email: 'user@example.com' });
      expect(result.success).toBe(true);
    });

    it('rejects an invalid email', () => {
      const result = emailSignupSchema.safeParse({ email: 'not-email' });
      expect(result.success).toBe(false);
    });

    it('rejects an empty email', () => {
      const result = emailSignupSchema.safeParse({ email: '' });
      expect(result.success).toBe(false);
    });

    it('rejects missing email field', () => {
      const result = emailSignupSchema.safeParse({});
      expect(result.success).toBe(false);
    });

    it('accepts various valid email formats', () => {
      const validEmails = [
        'user@domain.com',
        'user.name@domain.com',
        'user+tag@domain.co.uk',
        'user@subdomain.domain.org',
      ];
      for (const email of validEmails) {
        expect(emailSignupSchema.safeParse({ email }).success).toBe(true);
      }
    });
  });
});
