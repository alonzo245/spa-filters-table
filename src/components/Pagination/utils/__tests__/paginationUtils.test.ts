import { describe, it, expect } from 'vitest';
import {
  canGoToPrevious,
  getPreviousPage,
  getNextPage,
} from '../paginationUtils';

describe('paginationUtils', () => {
  describe('canGoToPrevious', () => {
    it('should return false for page 1', () => {
      expect(canGoToPrevious(1)).toBe(false);
    });

    it('should return true for page 2', () => {
      expect(canGoToPrevious(2)).toBe(true);
    });

    it('should return true for any page greater than 1', () => {
      expect(canGoToPrevious(5)).toBe(true);
      expect(canGoToPrevious(10)).toBe(true);
      expect(canGoToPrevious(100)).toBe(true);
    });
  });

  describe('getPreviousPage', () => {
    it('should return 1 when current page is 1', () => {
      expect(getPreviousPage(1)).toBe(1);
    });

    it('should return correct previous page', () => {
      expect(getPreviousPage(2)).toBe(1);
      expect(getPreviousPage(5)).toBe(4);
      expect(getPreviousPage(10)).toBe(9);
    });

    it('should never return less than 1', () => {
      expect(getPreviousPage(1)).toBe(1);
      expect(getPreviousPage(0)).toBe(1);
      expect(getPreviousPage(-5)).toBe(1);
    });
  });

  describe('getNextPage', () => {
    it('should return next page number', () => {
      expect(getNextPage(1)).toBe(2);
      expect(getNextPage(5)).toBe(6);
      expect(getNextPage(10)).toBe(11);
    });
  });
});
