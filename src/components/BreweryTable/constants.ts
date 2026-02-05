import { SortField } from '../../types/brewery';

export const COLUMNS: Array<{
  id: string;
  label: string;
  field: SortField;
  isRowHeader?: boolean;
}> = [
  { id: 'name', label: 'Name', field: 'name', isRowHeader: true },
  { id: 'brewery_type', label: 'Type', field: 'brewery_type' },
  { id: 'city', label: 'City', field: 'city' },
  { id: 'state', label: 'State', field: 'state' },
];
