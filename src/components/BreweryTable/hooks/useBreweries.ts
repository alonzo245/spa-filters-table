import { useQuery } from '@tanstack/react-query';
import { fetchBreweries } from '../../../services/api';
import { useBreweryStore } from '../../../store/breweryStore';

/**
 * Hook for fetching breweries from the API
 * Uses React Query for caching and state management
 */
export function useBreweries() {
  const { currentPage, perPage } = useBreweryStore();

  return useQuery({
    queryKey: ['breweries', currentPage, perPage],
    queryFn: () => fetchBreweries(currentPage, perPage),
  });
}
