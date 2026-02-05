import { clsx } from 'clsx';
import { Filters } from '../../../types/brewery';
import { FILTER_FIELDS } from '../constants';
import { FilterInput } from './FilterInput';

interface FilterInputsProps {
  filters: Filters;
  isExpanded: boolean;
  onFilterChange: (field: keyof Filters, value: string) => void;
}

export function FilterInputs({
  filters,
  isExpanded,
  onFilterChange,
}: FilterInputsProps) {
  return (
    <div
      className={clsx(
        'transition-all duration-300 ease-in-out overflow-hidden',
        isExpanded
          ? 'max-h-[1000px] opacity-100'
          : 'max-h-0 opacity-0 pointer-events-none'
      )}
    >
      <div
        className={clsx(
          'p-3 sm:p-4 md:p-6 pt-3 sm:pt-4',
          !isExpanded && 'invisible'
        )}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4">
          {FILTER_FIELDS.map((field) => (
            <FilterInput
              key={field.key}
              field={field.key}
              label={field.label}
              placeholder={field.placeholder}
              value={filters[field.key]}
              onChange={(value) => onFilterChange(field.key, value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
