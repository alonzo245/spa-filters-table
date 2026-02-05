import { memo, useCallback } from 'react';
import { Column } from 'react-aria-components';
import { SortField, SortDirection } from '../../../types/brewery';

interface SortableColumnHeaderProps {
  id: string;
  label: string;
  field: SortField;
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  isRowHeader?: boolean;
}

export const SortableColumnHeader = memo(
  ({
    id,
    label,
    field,
    sortField,
    sortDirection,
    onSort,
    isRowHeader = false,
  }: SortableColumnHeaderProps) => {
    const isActive = sortField === field;
    const handleClick = useCallback(() => {
      onSort(field);
    }, [field, onSort]);

    return (
      <Column
        id={id}
        isRowHeader={isRowHeader}
        className="px-6 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-400 uppercase tracking-wider"
      >
        <button
          onClick={handleClick}
          className="flex items-center cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-700 -mx-6 -my-3 px-6 py-3 w-full text-left"
          aria-label={`Sort by ${label}${
            isActive
              ? ` (${sortDirection === 'asc' ? 'ascending' : 'descending'})`
              : ''
          }`}
        >
          {label}
          {isActive && (
            <span className="ml-2" aria-hidden="true">
              {sortDirection === 'asc' ? '↑' : '↓'}
            </span>
          )}
        </button>
      </Column>
    );
  }
);

SortableColumnHeader.displayName = 'SortableColumnHeader';
