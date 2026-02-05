import { useMemo } from 'react';
import { filterBreweries, sortBreweries } from '../../../utils/filterAndSort';
import { Brewery, Filters, SortField, SortDirection } from '../../../types/brewery';

interface UseProcessedBreweriesParams {
  breweries: Brewery[];
  filters: Filters;
  sortField: SortField | null;
  sortDirection: SortDirection;
}

/**
 * Hook for processing breweries (filtering and sorting)
 * Memoizes the result to prevent unnecessary recalculations
 */
export function useProcessedBreweries({
  breweries,
  filters,
  sortField,
  sortDirection,
}: UseProcessedBreweriesParams) {
  return useMemo(() => {
    if (!breweries.length) return [];
    const filtered = filterBreweries(breweries, filters);
    return sortBreweries(filtered, sortField, sortDirection);
  }, [breweries, filters, sortField, sortDirection]);
}
