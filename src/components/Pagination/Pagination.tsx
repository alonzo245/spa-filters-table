import { usePagination } from './hooks/usePagination';
import { MobilePagination } from './components/MobilePagination';
import { DesktopPagination } from './components/DesktopPagination';

/**
 * Pagination component
 * Provides pagination controls for navigating through brewery pages
 */
export function Pagination() {
  const {
    currentPage,
    canGoPrevious,
    handlePrevious,
    handleNext,
  } = usePagination();

  return (
    <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-800 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg shadow-md">
      <MobilePagination
        currentPage={currentPage}
        canGoPrevious={canGoPrevious}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
      <DesktopPagination
        currentPage={currentPage}
        canGoPrevious={canGoPrevious}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
