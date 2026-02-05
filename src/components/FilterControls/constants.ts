import { Filters } from '../../types/brewery';

export interface FilterField {
  key: keyof Filters;
  label: string;
  placeholder: string;
}

export const FILTER_FIELDS: FilterField[] = [
  {
    key: 'name',
    label: 'Name',
    placeholder: 'Search by name...',
  },
  {
    key: 'type',
    label: 'Type',
    placeholder: 'Search by type...',
  },
  {
    key: 'city',
    label: 'City',
    placeholder: 'Search by city...',
  },
  {
    key: 'state',
    label: 'State',
    placeholder: 'Search by state...',
  },
];
