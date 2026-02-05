import { useState, useMemo } from 'react';
import { useBreweryStore } from '../../../store/breweryStore';
import { hasActiveFilters, countActiveFilters } from '../utils/filterUtils';

/**
 * Hook for managing filter controls state and logic
 */
export function useFilterControls() {
  const { filters, setFilters, resetFilters } = useBreweryStore();
  const [isExpanded, setIsExpanded] = useState(true);

  const activeFiltersCount = useMemo(
    () => countActiveFilters(filters),
    [filters]
  );

  const hasActive = useMemo(
    () => hasActiveFilters(filters),
    [filters]
  );

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters({ [field]: value });
  };

  return {
    filters,
    isExpanded,
    hasActiveFilters: hasActive,
    activeFiltersCount,
    toggleExpanded,
    handleFilterChange,
    resetFilters,
  };
}
