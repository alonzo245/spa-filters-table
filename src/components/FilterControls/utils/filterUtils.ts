import { Filters } from '../../../types/brewery';

/**
 * Checks if there are any active filters
 */
export function hasActiveFilters(filters: Filters): boolean {
  return Object.values(filters).some((value) => value.trim() !== '');
}

/**
 * Counts the number of active filters
 */
export function countActiveFilters(filters: Filters): number {
  return Object.values(filters).filter((v) => v.trim() !== '').length;
}
