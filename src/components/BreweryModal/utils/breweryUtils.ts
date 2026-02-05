import { Brewery } from '../../../types/brewery';

/**
 * Formats a brewery's full address from its address components
 */
export function getFullAddress(brewery: Brewery | undefined): string {
  if (!brewery) return 'N/A';
  
  const parts = [
    brewery.street,
    brewery.address_1,
    brewery.address_2,
    brewery.address_3,
    brewery.city,
    brewery.state,
    brewery.postal_code,
    brewery.country,
  ].filter(Boolean);
  
  return parts.length > 0 ? parts.join(', ') : 'N/A';
}

/**
 * Checks if a brewery has valid coordinates for map display
 */
export function hasValidCoordinates(brewery: Brewery | undefined): boolean {
  if (!brewery) return false;
  return !!(brewery.latitude && brewery.longitude);
}

/**
 * Parses brewery coordinates for map component
 */
export function parseCoordinates(brewery: Brewery | undefined): {
  latitude: number;
  longitude: number;
} | null {
  if (!hasValidCoordinates(brewery)) return null;
  
  return {
    latitude: parseFloat(brewery!.latitude!),
    longitude: parseFloat(brewery!.longitude!),
  };
}
