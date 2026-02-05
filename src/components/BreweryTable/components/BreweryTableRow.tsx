import { memo, useCallback } from 'react';
import { Row, Cell } from 'react-aria-components';
import { clsx } from 'clsx';
import { Brewery } from '../../../types/brewery';

interface BreweryTableRowProps {
  brewery: Brewery;
  onSelect: (id: string) => void;
}

export const BreweryTableRow = memo(({ brewery, onSelect }: BreweryTableRowProps) => {
  const handleAction = useCallback(() => {
    onSelect(brewery.id);
  }, [brewery.id, onSelect]);

  return (
    <Row
      key={brewery.id}
      id={brewery.id}
      onAction={handleAction}
      className={clsx(
        'cursor-pointer transition-colors',
        'hover:bg-gray-700 dark:hover:bg-gray-700 focus:bg-gray-700 dark:focus:bg-gray-700 focus:outline-none'
      )}
    >
      <Cell className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm font-medium text-gray-100 dark:text-gray-100">
        <span className="truncate block">{brewery.name}</span>
      </Cell>
      <Cell className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-gray-400 dark:text-gray-400">
        <span className="truncate block">{brewery.brewery_type}</span>
      </Cell>
      <Cell className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-gray-400 dark:text-gray-400">
        <span className="truncate block">{brewery.city}</span>
      </Cell>
      <Cell className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-gray-400 dark:text-gray-400">
        <span className="truncate block">{brewery.state}</span>
      </Cell>
    </Row>
  );
});

BreweryTableRow.displayName = 'BreweryTableRow';
