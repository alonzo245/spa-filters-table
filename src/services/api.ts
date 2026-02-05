import { Brewery } from '../types/brewery';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.openbrewerydb.org/v1';
const API_TIMEOUT = 10000; // 10 seconds

/**
 * Fetch with timeout
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = API_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout: The server took too long to respond');
    }
    throw error;
  }
}

/**
 * Handle API errors with better error messages
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = 'Failed to fetch data';
    
    if (response.status === 404) {
      errorMessage = 'The requested resource was not found';
    } else if (response.status === 500) {
      errorMessage = 'Server error: Please try again later';
    } else if (response.status >= 400 && response.status < 500) {
      errorMessage = 'Invalid request: Please check your input';
    }
    
    throw new Error(errorMessage);
  }
  
  return response.json();
}

export const fetchBreweries = async (
  page: number = 1,
  perPage: number = 20
): Promise<Brewery[]> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/breweries?page=${page}&per_page=${perPage}`
    );
    return handleResponse<Brewery[]>(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error: Please check your internet connection');
  }
};

export const fetchBreweryById = async (id: string): Promise<Brewery> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/breweries/${id}`
    );
    return handleResponse<Brewery>(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error: Please check your internet connection');
  }
};
