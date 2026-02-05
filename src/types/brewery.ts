export interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  street: string | null;
  address_1: string | null;
  address_2: string | null;
  address_3: string | null;
  city: string;
  state: string;
  county_province: string | null;
  postal_code: string | null;
  country: string;
  longitude: string | null;
  latitude: string | null;
  phone: string | null;
  website_url: string | null;
  state_province: string | null;
}

export type SortField = 'name' | 'brewery_type' | 'city' | 'state';
export type SortDirection = 'asc' | 'desc';

export interface Filters {
  name: string;
  type: string;
  city: string;
  state: string;
}
