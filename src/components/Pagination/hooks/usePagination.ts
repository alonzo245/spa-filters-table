import { useCallback } from 'react';
import { useBreweryStore } from '../../../store/breweryStore';
import { canGoToPrevious, getPreviousPage, getNextPage } from '../utils/paginationUtils';

/**
 * Hook for managing pagination state and handlers
 */
export function usePagination() {
  const { currentPage, setCurrentPage } = useBreweryStore();

  const canGoPrevious = canGoToPrevious(currentPage);
  const canGoNext = true; // Always can go to next page (API handles limits)

  const handlePrevious = useCallback(() => {
    if (canGoPrevious) {
      setCurrentPage(getPreviousPage(currentPage));
    }
  }, [currentPage, canGoPrevious, setCurrentPage]);

  const handleNext = useCallback(() => {
    setCurrentPage(getNextPage(currentPage));
  }, [currentPage, setCurrentPage]);

  return {
    currentPage,
    canGoPrevious,
    canGoNext,
    handlePrevious,
    handleNext,
  };
}
