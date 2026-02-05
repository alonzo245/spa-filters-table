import { TextField, Label, Input } from 'react-aria-components';
import { useBreweryStore } from '../store/breweryStore';

export function FilterControls() {
  const { filters, setFilters, resetFilters } = useBreweryStore();

  return (
    <div className="bg-gray-800 dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100 dark:text-gray-100">Filters</h2>
        <button
          onClick={resetFilters}
          className="px-4 py-2 text-sm font-medium text-gray-200 dark:text-gray-200 bg-gray-700 dark:bg-gray-700 rounded-md hover:bg-gray-600 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Reset Filters
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TextField
          value={filters.name}
          onChange={(value) => setFilters({ name: value })}
          className="flex flex-col"
        >
          <Label className="text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">Name</Label>
          <Input
            placeholder="Filter by name..."
            className="px-3 py-2 bg-gray-700 dark:bg-gray-700 border border-gray-600 dark:border-gray-600 rounded-md text-gray-100 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </TextField>

        <TextField
          value={filters.type}
          onChange={(value) => setFilters({ type: value })}
          className="flex flex-col"
        >
          <Label className="text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">Type</Label>
          <Input
            placeholder="Filter by type..."
            className="px-3 py-2 bg-gray-700 dark:bg-gray-700 border border-gray-600 dark:border-gray-600 rounded-md text-gray-100 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </TextField>

        <TextField
          value={filters.city}
          onChange={(value) => setFilters({ city: value })}
          className="flex flex-col"
        >
          <Label className="text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">City</Label>
          <Input
            placeholder="Filter by city..."
            className="px-3 py-2 bg-gray-700 dark:bg-gray-700 border border-gray-600 dark:border-gray-600 rounded-md text-gray-100 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </TextField>

        <TextField
          value={filters.state}
          onChange={(value) => setFilters({ state: value })}
          className="flex flex-col"
        >
          <Label className="text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">State</Label>
          <Input
            placeholder="Filter by state..."
            className="px-3 py-2 bg-gray-700 dark:bg-gray-700 border border-gray-600 dark:border-gray-600 rounded-md text-gray-100 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </TextField>
      </div>
    </div>
  );
}
