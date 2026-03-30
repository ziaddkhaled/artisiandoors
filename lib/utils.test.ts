import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  cn,
  formatCurrency,
  generateOrderId,
  generateCartItemId,
  debounce,
  BLUR_DATA_URL,
} from './utils';

describe('lib/utils', () => {
  // ── cn (class name merger) ────────────────────────────────────────

  describe('cn', () => {
    it('merges simple class names', () => {
      const result = cn('foo', 'bar');
      expect(result).toContain('foo');
      expect(result).toContain('bar');
    });

    it('handles conditional classes', () => {
      const result = cn('base', true && 'active', false && 'disabled');
      expect(result).toContain('base');
      expect(result).toContain('active');
      expect(result).not.toContain('disabled');
    });

    it('handles undefined and null inputs', () => {
      const result = cn('base', undefined, null);
      expect(result).toBe('base');
    });

    it('merges Tailwind conflicting classes (last wins)', () => {
      // tailwind-merge should resolve conflicts: p-4 and p-2 -> p-2
      const result = cn('p-4', 'p-2');
      expect(result).toBe('p-2');
    });

    it('merges Tailwind conflicting color classes', () => {
      const result = cn('bg-red-500', 'bg-blue-500');
      expect(result).toBe('bg-blue-500');
    });

    it('returns empty string for no arguments', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('handles array inputs', () => {
      const result = cn(['foo', 'bar']);
      expect(result).toContain('foo');
      expect(result).toContain('bar');
    });

    it('handles object inputs', () => {
      const result = cn({ active: true, disabled: false });
      expect(result).toContain('active');
      expect(result).not.toContain('disabled');
    });
  });

  // ── formatCurrency ────────────────────────────────────────────────

  describe('formatCurrency', () => {
    it('formats 249900 cents as "$2,499.00"', () => {
      expect(formatCurrency(249900)).toBe('$2,499.00');
    });

    it('formats 0 cents as "$0.00"', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('formats 100 cents as "$1.00"', () => {
      expect(formatCurrency(100)).toBe('$1.00');
    });

    it('formats 50 cents as "$0.50"', () => {
      expect(formatCurrency(50)).toBe('$0.50');
    });

    it('formats 1 cent as "$0.01"', () => {
      expect(formatCurrency(1)).toBe('$0.01');
    });

    it('formats large values correctly', () => {
      expect(formatCurrency(999999)).toBe('$9,999.99');
    });

    it('formats a typical product price correctly', () => {
      expect(formatCurrency(349900)).toBe('$3,499.00');
    });
  });

  // ── generateOrderId ───────────────────────────────────────────────

  describe('generateOrderId', () => {
    it('returns a string starting with "AD-"', () => {
      const id = generateOrderId();
      expect(id).toMatch(/^AD-/);
    });

    it('matches format "AD-{alphanumeric}-{alphanumeric}"', () => {
      const id = generateOrderId();
      expect(id).toMatch(/^AD-[A-Z0-9]+-[A-Z0-9]+$/);
    });

    it('generates unique IDs', () => {
      const ids = new Set<string>();
      for (let i = 0; i < 20; i++) {
        ids.add(generateOrderId());
      }
      expect(ids.size).toBeGreaterThan(1);
    });

    it('returns a non-empty string', () => {
      const id = generateOrderId();
      expect(id.length).toBeGreaterThan(0);
    });
  });

  // ── generateCartItemId (legacy version) ───────────────────────────

  describe('generateCartItemId (legacy)', () => {
    it('creates an ID from slug and options', () => {
      const id = generateCartItemId('metropolitan-edge', {
        material: 'oak',
        finish: 'natural',
        size: 'standard',
        hardware: 'classic-brass',
      });
      expect(id).toContain('metropolitan-edge');
    });

    it('creates the same ID for the same slug and options', () => {
      const options = {
        material: 'walnut',
        finish: 'matte-black',
        size: 'wide',
        hardware: 'crystal',
      };
      const id1 = generateCartItemId('zen-pivot', options);
      const id2 = generateCartItemId('zen-pivot', options);
      expect(id1).toBe(id2);
    });

    it('creates different IDs for different slugs', () => {
      const options = { material: 'oak', finish: 'natural', size: 'standard', hardware: 'classic-brass' };
      const id1 = generateCartItemId('metropolitan-edge', options);
      const id2 = generateCartItemId('aurora-glass', options);
      expect(id1).not.toBe(id2);
    });

    it('creates different IDs for different options', () => {
      const options1 = { material: 'oak', finish: 'natural', size: 'standard', hardware: 'classic-brass' };
      const options2 = { material: 'walnut', finish: 'natural', size: 'standard', hardware: 'classic-brass' };
      const id1 = generateCartItemId('metropolitan-edge', options1);
      const id2 = generateCartItemId('metropolitan-edge', options2);
      expect(id1).not.toBe(id2);
    });

    it('returns a non-empty string', () => {
      const id = generateCartItemId('test', { a: 'b' });
      expect(id.length).toBeGreaterThan(0);
    });
  });

  // ── debounce ──────────────────────────────────────────────────────

  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('does not call the function immediately', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);
      debounced();
      expect(fn).not.toHaveBeenCalled();
    });

    it('calls the function after the delay', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);
      debounced();
      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('resets the timer on subsequent calls', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);
      debounced();
      vi.advanceTimersByTime(50);
      debounced(); // reset
      vi.advanceTimersByTime(50);
      expect(fn).not.toHaveBeenCalled(); // only 50ms since reset
      vi.advanceTimersByTime(50);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('calls the function with the correct arguments', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);
      debounced('arg1', 'arg2');
      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('only invokes once for rapid calls', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);
      for (let i = 0; i < 10; i++) {
        debounced();
      }
      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('calls multiple times if delay passes between calls', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);
      debounced();
      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
      debounced();
      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  // ── BLUR_DATA_URL ─────────────────────────────────────────────────

  describe('BLUR_DATA_URL', () => {
    it('is a base64 data URL', () => {
      expect(BLUR_DATA_URL).toMatch(/^data:image\/png;base64,/);
    });

    it('is a non-empty string', () => {
      expect(BLUR_DATA_URL.length).toBeGreaterThan(0);
    });
  });
});
