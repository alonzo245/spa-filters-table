import { useFilterControls } from './hooks/useFilterControls';
import { FilterHeader } from './components/FilterHeader';
import { FilterInputs } from './components/FilterInputs';

/**
 * FilterControls component
 * Provides filtering functionality for breweries with collapsible UI
 */
export function FilterControls() {
  const {
    filters,
    isExpanded,
    hasActiveFilters,
    activeFiltersCount,
    toggleExpanded,
    handleFilterChange,
    resetFilters,
  } = useFilterControls();

  return (
    <div className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-md mb-4 sm:mb-6 overflow-hidden">
      <FilterHeader
        hasActiveFilters={hasActiveFilters}
        activeFiltersCount={activeFiltersCount}
        isExpanded={isExpanded}
        onToggle={toggleExpanded}
        onReset={resetFilters}
      />
      <FilterInputs
        filters={filters}
        isExpanded={isExpanded}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}
