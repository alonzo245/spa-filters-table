import { Table, TableHeader, TableBody } from 'react-aria-components';
import { useBreweryTable } from './hooks/useBreweryTable';
import { SortableColumnHeader } from './components/SortableColumnHeader';
import { BreweryTableRow } from './components/BreweryTableRow';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { COLUMNS } from './constants';

/**
 * Main BreweryTable component
 * Handles rendering of the breweries table with sorting and filtering
 */
export function BreweryTable() {
  const {
    breweries,
    isLoading,
    error,
    sortField,
    sortDirection,
    handleSort,
    handleSelectBrewery,
  } = useBreweryTable();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="overflow-x-auto -mx-3 sm:-mx-4 md:mx-0">
      <Table
        aria-label="Breweries table"
        className="min-w-full divide-y divide-gray-700 dark:divide-gray-700"
      >
        <TableHeader>
          {COLUMNS.map((column) => (
            <SortableColumnHeader
              key={column.id}
              id={column.id}
              label={column.label}
              field={column.field}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              isRowHeader={column.isRowHeader}
            />
          ))}
        </TableHeader>
        <TableBody
          items={breweries}
          className="bg-gray-800 dark:bg-gray-800 divide-y divide-gray-700 dark:divide-gray-700"
        >
          {(brewery) => (
            <BreweryTableRow
              key={brewery.id}
              brewery={brewery}
              onSelect={handleSelectBrewery}
            />
          )}
        </TableBody>
      </Table>
    </div>
  );
}
