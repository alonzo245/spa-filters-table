import { describe, it, expect } from 'vitest';
import {
  getFullAddress,
  hasValidCoordinates,
  parseCoordinates,
} from '../breweryUtils';
import { Brewery } from '../../../../types/brewery';

describe('breweryUtils', () => {
  const breweryWithAddress: Brewery = {
    id: '1',
    name: 'Test Brewery',
    brewery_type: 'micro',
    street: '123 Main St',
    address_1: 'Suite 100',
    address_2: null,
    address_3: null,
    city: 'Portland',
    state: 'Oregon',
    county_province: null,
    postal_code: '97201',
    country: 'United States',
    longitude: '-122.6765',
    latitude: '45.5152',
    phone: null,
    website_url: null,
    state_province: null,
  };

  const breweryWithoutAddress: Brewery = {
    ...breweryWithAddress,
    street: null,
    address_1: null,
    city: 'Portland',
    state: 'Oregon',
    postal_code: null,
    country: 'United States',
  };

  describe('getFullAddress', () => {
    it('should return N/A for undefined brewery', () => {
      expect(getFullAddress(undefined)).toBe('N/A');
    });

    it('should format full address with all components', () => {
      const result = getFullAddress(breweryWithAddress);
      expect(result).toBe(
        '123 Main St, Suite 100, Portland, Oregon, 97201, United States'
      );
    });

    it('should handle missing address components', () => {
      const brewery: Brewery = {
        ...breweryWithAddress,
        street: null,
        address_1: null,
        address_2: null,
        address_3: null,
      };
      const result = getFullAddress(brewery);
      expect(result).toBe('Portland, Oregon, 97201, United States');
    });

    it('should return N/A when no address components exist', () => {
      const result = getFullAddress(breweryWithoutAddress);
      expect(result).toBe('Portland, Oregon, United States');
    });

    it('should filter out null and undefined values', () => {
      const brewery: Brewery = {
        ...breweryWithAddress,
        address_2: null,
        address_3: null,
        county_province: null,
      };
      const result = getFullAddress(brewery);
      expect(result).not.toContain('null');
      expect(result).not.toContain('undefined');
    });
  });

  describe('hasValidCoordinates', () => {
    it('should return false for undefined brewery', () => {
      expect(hasValidCoordinates(undefined)).toBe(false);
    });

    it('should return true when both latitude and longitude exist', () => {
      expect(hasValidCoordinates(breweryWithAddress)).toBe(true);
    });

    it('should return false when latitude is missing', () => {
      const brewery: Brewery = {
        ...breweryWithAddress,
        latitude: null,
      };
      expect(hasValidCoordinates(brewery)).toBe(false);
    });

    it('should return false when longitude is missing', () => {
      const brewery: Brewery = {
        ...breweryWithAddress,
        longitude: null,
      };
      expect(hasValidCoordinates(brewery)).toBe(false);
    });

    it('should return false when both are missing', () => {
      const brewery: Brewery = {
        ...breweryWithAddress,
        latitude: null,
        longitude: null,
      };
      expect(hasValidCoordinates(brewery)).toBe(false);
    });
  });

  describe('parseCoordinates', () => {
    it('should return null for undefined brewery', () => {
      expect(parseCoordinates(undefined)).toBe(null);
    });

    it('should return null when coordinates are invalid', () => {
      const brewery: Brewery = {
        ...breweryWithAddress,
        latitude: null,
        longitude: null,
      };
      expect(parseCoordinates(brewery)).toBe(null);
    });

    it('should parse valid coordinates', () => {
      const result = parseCoordinates(breweryWithAddress);
      expect(result).toEqual({
        latitude: 45.5152,
        longitude: -122.6765,
      });
    });

    it('should parse string coordinates to numbers', () => {
      const brewery: Brewery = {
        ...breweryWithAddress,
        latitude: '40.7128',
        longitude: '-74.0060',
      };
      const result = parseCoordinates(brewery);
      expect(result).toEqual({
        latitude: 40.7128,
        longitude: -74.0060,
      });
      expect(typeof result?.latitude).toBe('number');
      expect(typeof result?.longitude).toBe('number');
    });
  });
});
