import { FilterControls } from "../components/FilterControls";
import { BreweryTable } from "../components/BreweryTable/BreweryTable";
import { Pagination } from "../components/Pagination";

export function HomePage() {
  return (
    <>
      <FilterControls />
      <div className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4 sm:mb-6">
        <BreweryTable />
      </div>
      <Pagination />
    </>
  );
}
