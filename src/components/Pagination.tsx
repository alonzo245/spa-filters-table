import { Button } from 'react-aria-components';
import { useBreweryStore } from '../store/breweryStore';
import { clsx } from 'clsx';

export function Pagination() {
  const { currentPage, setCurrentPage } = useBreweryStore();

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-800 px-4 py-3 sm:px-6 rounded-lg shadow-md">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          onPress={handlePrevious}
          isDisabled={currentPage === 1}
          className={clsx(
            'relative inline-flex items-center rounded-md border border-gray-600 dark:border-gray-600 bg-gray-700 dark:bg-gray-700 px-4 py-2 text-sm font-medium',
            currentPage === 1
              ? 'text-gray-500 dark:text-gray-500 cursor-not-allowed'
              : 'text-gray-200 dark:text-gray-200 hover:bg-gray-600 dark:hover:bg-gray-600'
          )}
        >
          Previous
        </Button>
        <Button
          onPress={handleNext}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-600 dark:border-gray-600 bg-gray-700 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-200 dark:text-gray-200 hover:bg-gray-600 dark:hover:bg-gray-600"
        >
          Next
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-300 dark:text-gray-300">
            Page <span className="font-medium">{currentPage}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <Button
              onPress={handlePrevious}
              isDisabled={currentPage === 1}
              className={clsx(
                'relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 dark:text-gray-400 ring-1 ring-inset ring-gray-600 dark:ring-gray-600 bg-gray-700 dark:bg-gray-700 focus:z-20 focus:outline-offset-0',
                currentPage === 1
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-gray-600 dark:hover:bg-gray-600'
              )}
            >
              <span className="sr-only">Previous</span>
              ←
            </Button>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-100 dark:text-gray-100 ring-1 ring-inset ring-gray-600 dark:ring-gray-600 bg-gray-700 dark:bg-gray-700">
              {currentPage}
            </span>
            <Button
              onPress={handleNext}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 dark:text-gray-400 ring-1 ring-inset ring-gray-600 dark:ring-gray-600 bg-gray-700 dark:bg-gray-700 hover:bg-gray-600 dark:hover:bg-gray-600 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              →
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
