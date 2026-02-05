import { useQuery } from '@tanstack/react-query';
import { fetchBreweryById } from '../../../services/api';

/**
 * Hook for fetching a single brewery by ID
 * Uses React Query for caching and state management
 */
export function useBrewery(breweryId: string | null) {
  return useQuery({
    queryKey: ['brewery', breweryId],
    queryFn: () => fetchBreweryById(breweryId!),
    enabled: !!breweryId,
  });
}
