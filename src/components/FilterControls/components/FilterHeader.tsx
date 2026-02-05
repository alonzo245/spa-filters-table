import { Button } from 'react-aria-components';
import { clsx } from 'clsx';

interface FilterHeaderProps {
  hasActiveFilters: boolean;
  activeFiltersCount: number;
  isExpanded: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export function FilterHeader({
  hasActiveFilters,
  activeFiltersCount,
  isExpanded,
  onToggle,
  onReset,
}: FilterHeaderProps) {
  return (
    <div className="p-3 sm:p-4 md:p-6 pb-3 sm:pb-4 border-b border-gray-700 dark:border-gray-700">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-100 dark:text-gray-100">
            Filters
          </h2>
          {hasActiveFilters && (
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium text-gray-900 dark:text-gray-900 bg-blue-400 dark:bg-blue-400 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              onPress={onReset}
              className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-300 dark:text-gray-300 bg-gray-700 dark:bg-gray-700 rounded-md hover:bg-gray-600 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Clear
            </Button>
          )}
          <button
            onClick={onToggle}
            className="p-2 text-gray-400 dark:text-gray-400 hover:text-gray-200 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors"
            aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
            aria-expanded={isExpanded}
          >
            <svg
              className={clsx(
                'w-5 h-5 transition-transform duration-200',
                isExpanded && 'rotate-180'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
