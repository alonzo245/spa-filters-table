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
      <Cell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 dark:text-gray-100">
        {brewery.name}
      </Cell>
      <Cell className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 dark:text-gray-400">
        {brewery.brewery_type}
      </Cell>
      <Cell className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 dark:text-gray-400">
        {brewery.city}
      </Cell>
      <Cell className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 dark:text-gray-400">
        {brewery.state}
      </Cell>
    </Row>
  );
});

BreweryTableRow.displayName = 'BreweryTableRow';
