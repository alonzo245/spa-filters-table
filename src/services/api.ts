import { Brewery } from '../types/brewery';

const API_BASE_URL = 'https://api.openbrewerydb.org/v1';

export const fetchBreweries = async (
  page: number = 1,
  perPage: number = 20
): Promise<Brewery[]> => {
  const response = await fetch(
    `${API_BASE_URL}/breweries?page=${page}&per_page=${perPage}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch breweries');
  }
  return response.json();
};

export const fetchBreweryById = async (id: string): Promise<Brewery> => {
  const response = await fetch(`${API_BASE_URL}/breweries/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch brewery');
  }
  return response.json();
};
