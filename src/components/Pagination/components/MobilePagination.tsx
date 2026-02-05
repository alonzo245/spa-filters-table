import { Button } from 'react-aria-components';
import { clsx } from 'clsx';

interface MobilePaginationProps {
  currentPage: number;
  canGoPrevious: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function MobilePagination({
  currentPage,
  canGoPrevious,
  onPrevious,
  onNext,
}: MobilePaginationProps) {
  return (
    <div className="flex flex-1 justify-between sm:hidden">
      <Button
        onPress={onPrevious}
        isDisabled={!canGoPrevious}
        className={clsx(
          'relative inline-flex items-center rounded-md border border-gray-600 dark:border-gray-600 bg-gray-700 dark:bg-gray-700 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium',
          !canGoPrevious
            ? 'text-gray-500 dark:text-gray-500 cursor-not-allowed'
            : 'text-gray-200 dark:text-gray-200 hover:bg-gray-600 dark:hover:bg-gray-600'
        )}
      >
        Previous
      </Button>
      <Button
        onPress={onNext}
        className="relative ml-2 sm:ml-3 inline-flex items-center rounded-md border border-gray-600 dark:border-gray-600 bg-gray-700 dark:bg-gray-700 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-200 dark:text-gray-200 hover:bg-gray-600 dark:hover:bg-gray-600"
      >
        Next
      </Button>
    </div>
  );
}
