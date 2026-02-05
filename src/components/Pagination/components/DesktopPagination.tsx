import { Button } from 'react-aria-components';
import { clsx } from 'clsx';

interface DesktopPaginationProps {
  currentPage: number;
  canGoPrevious: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function DesktopPagination({
  currentPage,
  canGoPrevious,
  onPrevious,
  onNext,
}: DesktopPaginationProps) {
  return (
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-300">
          Page <span className="font-medium">{currentPage}</span>
        </p>
      </div>
      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <Button
            onPress={onPrevious}
            isDisabled={!canGoPrevious}
            className={clsx(
              'relative inline-flex items-center rounded-l-md px-2 sm:px-3 py-2 text-gray-400 dark:text-gray-400 ring-1 ring-inset ring-gray-600 dark:ring-gray-600 bg-gray-700 dark:bg-gray-700 focus:z-20 focus:outline-offset-0',
              !canGoPrevious
                ? 'cursor-not-allowed opacity-50'
                : 'hover:bg-gray-600 dark:hover:bg-gray-600'
            )}
          >
            <span className="sr-only">Previous</span>
            ←
          </Button>
          <span className="relative inline-flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-gray-100 dark:text-gray-100 ring-1 ring-inset ring-gray-600 dark:ring-gray-600 bg-gray-700 dark:bg-gray-700">
            {currentPage}
          </span>
          <Button
            onPress={onNext}
            className="relative inline-flex items-center rounded-r-md px-2 sm:px-3 py-2 text-gray-400 dark:text-gray-400 ring-1 ring-inset ring-gray-600 dark:ring-gray-600 bg-gray-700 dark:bg-gray-700 hover:bg-gray-600 dark:hover:bg-gray-600 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            →
          </Button>
        </nav>
      </div>
    </div>
  );
}
