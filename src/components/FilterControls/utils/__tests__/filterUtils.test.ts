import { describe, it, expect } from 'vitest';
import { hasActiveFilters, countActiveFilters } from '../filterUtils';
import { Filters } from '../../../../types/brewery';

describe('filterUtils', () => {
  describe('hasActiveFilters', () => {
    it('should return false when all filters are empty', () => {
      const filters: Filters = {
        name: '',
        type: '',
        city: '',
        state: '',
      };
      expect(hasActiveFilters(filters)).toBe(false);
    });

    it('should return true when name filter is active', () => {
      const filters: Filters = {
        name: 'test',
        type: '',
        city: '',
        state: '',
      };
      expect(hasActiveFilters(filters)).toBe(true);
    });

    it('should return true when type filter is active', () => {
      const filters: Filters = {
        name: '',
        type: 'micro',
        city: '',
        state: '',
      };
      expect(hasActiveFilters(filters)).toBe(true);
    });

    it('should return true when city filter is active', () => {
      const filters: Filters = {
        name: '',
        type: '',
        city: 'Portland',
        state: '',
      };
      expect(hasActiveFilters(filters)).toBe(true);
    });

    it('should return true when state filter is active', () => {
      const filters: Filters = {
        name: '',
        type: '',
        city: '',
        state: 'Oregon',
      };
      expect(hasActiveFilters(filters)).toBe(true);
    });

    it('should return true when multiple filters are active', () => {
      const filters: Filters = {
        name: 'test',
        type: 'micro',
        city: '',
        state: '',
      };
      expect(hasActiveFilters(filters)).toBe(true);
    });

    it('should ignore whitespace-only filters', () => {
      const filters: Filters = {
        name: '   ',
        type: '',
        city: '',
        state: '',
      };
      // Whitespace-only strings are trimmed, so they're treated as empty
      expect(hasActiveFilters(filters)).toBe(false);
    });
  });

  describe('countActiveFilters', () => {
    it('should return 0 when no filters are active', () => {
      const filters: Filters = {
        name: '',
        type: '',
        city: '',
        state: '',
      };
      expect(countActiveFilters(filters)).toBe(0);
    });

    it('should return 1 when one filter is active', () => {
      const filters: Filters = {
        name: 'test',
        type: '',
        city: '',
        state: '',
      };
      expect(countActiveFilters(filters)).toBe(1);
    });

    it('should return correct count for multiple active filters', () => {
      const filters: Filters = {
        name: 'test',
        type: 'micro',
        city: 'Portland',
        state: '',
      };
      expect(countActiveFilters(filters)).toBe(3);
    });

    it('should return 4 when all filters are active', () => {
      const filters: Filters = {
        name: 'test',
        type: 'micro',
        city: 'Portland',
        state: 'Oregon',
      };
      expect(countActiveFilters(filters)).toBe(4);
    });
  });
});
