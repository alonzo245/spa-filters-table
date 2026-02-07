import { useCallback } from 'react';
import { useBreweryStore } from '../../../store/breweryStore';
import { SortField } from '../../../types/brewery';
import { useBreweries } from './useBreweries';
import { useProcessedBreweries } from './useProcessedBreweries';

/**
 * Main hook for BreweryTable component.
 * Fetches page data from API (pagination + sort only); filters are applied client-side.
 */
export function useBreweryTable() {
  const {
    sortField,
    sortDirection,
    filters,
    setSortField,
    setSortDirection,
    setSelectedBreweryId,
  } = useBreweryStore();

  const { data: rawBreweries = [], isLoading, error } = useBreweries();
  const breweries = useProcessedBreweries({
    breweries: rawBreweries,
    filters,
    sortField,
    sortDirection,
  });

  const handleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortField(field);
        setSortDirection('asc');
      }
    },
    [sortField, sortDirection, setSortField, setSortDirection]
  );

  const handleSelectBrewery = useCallback(
    (id: string) => {
      setSelectedBreweryId(id);
    },
    [setSelectedBreweryId]
  );

  return {
    breweries,
    isLoading,
    error,
    sortField,
    sortDirection,
    handleSort,
    handleSelectBrewery,
  };
}
