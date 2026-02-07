import { useQuery } from '@tanstack/react-query';
import { fetchBreweries } from '../../../services/api';
import { useBreweryStore } from '../../../store/breweryStore';
import { SortField } from '../../../types/brewery';

/**
 * Build API sort param from store sort state (Open Brewery DB: "field:asc" | "field:desc")
 */
function buildSortParam(
  sortField: SortField | null,
  sortDirection: 'asc' | 'desc'
): string | undefined {
  if (!sortField) return undefined;
  return `${sortField}:${sortDirection}`;
}

/**
 * Hook for fetching breweries from the Open Brewery DB API.
 * Only pagination and sort are sent to the API; filters are applied client-side to this data.
 */
export function useBreweries() {
  const { currentPage, perPage, sortField, sortDirection } = useBreweryStore();
  const sort = buildSortParam(sortField, sortDirection);

  return useQuery({
    queryKey: ['breweries', currentPage, perPage, sortField, sortDirection],
    queryFn: () =>
      fetchBreweries({
        page: currentPage,
        perPage,
        sort: sort ?? undefined,
      }),
  });
}
