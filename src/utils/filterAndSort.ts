import { Brewery, SortField, SortDirection, Filters } from '../types/brewery';

export const filterBreweries = (
  breweries: Brewery[],
  filters: Filters
): Brewery[] => {
  return breweries.filter((brewery) => {
    const nameMatch =
      !filters.name ||
      brewery.name.toLowerCase().includes(filters.name.toLowerCase());
    const typeMatch =
      !filters.type ||
      brewery.brewery_type.toLowerCase().includes(filters.type.toLowerCase());
    const cityMatch =
      !filters.city ||
      brewery.city.toLowerCase().includes(filters.city.toLowerCase());
    const stateMatch =
      !filters.state ||
      brewery.state.toLowerCase().includes(filters.state.toLowerCase());

    return nameMatch && typeMatch && cityMatch && stateMatch;
  });
};

export const sortBreweries = (
  breweries: Brewery[],
  sortField: SortField | null,
  sortDirection: SortDirection
): Brewery[] => {
  if (!sortField) return breweries;

  const sorted = [...breweries].sort((a, b) => {
    let aValue: string;
    let bValue: string;

    switch (sortField) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'brewery_type':
        aValue = a.brewery_type.toLowerCase();
        bValue = b.brewery_type.toLowerCase();
        break;
      case 'city':
        aValue = a.city.toLowerCase();
        bValue = b.city.toLowerCase();
        break;
      case 'state':
        aValue = a.state.toLowerCase();
        bValue = b.state.toLowerCase();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};
