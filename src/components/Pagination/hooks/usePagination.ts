import { useCallback } from 'react';
import { useBreweryStore } from '../../../store/breweryStore';
import { useBreweries } from '../../BreweryTable/hooks/useBreweries';
import { canGoToPrevious, getPreviousPage, getNextPage } from '../utils/paginationUtils';

/**
 * Hook for managing pagination state and handlers
 * Uses same React Query cache as BreweryTable to know if there is a next page
 */
export function usePagination() {
  const { currentPage, perPage, setCurrentPage } = useBreweryStore();
  const { data = [] } = useBreweries();

  const canGoPrevious = canGoToPrevious(currentPage);
  const canGoNext = data.length === perPage;

  const handlePrevious = useCallback(() => {
    if (canGoPrevious) {
      setCurrentPage(getPreviousPage(currentPage));
    }
  }, [currentPage, canGoPrevious, setCurrentPage]);

  const handleNext = useCallback(() => {
    if (canGoNext) {
      setCurrentPage(getNextPage(currentPage));
    }
  }, [currentPage, canGoNext, setCurrentPage]);

  return {
    currentPage,
    canGoPrevious,
    canGoNext,
    handlePrevious,
    handleNext,
  };
}
