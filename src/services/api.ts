import { Brewery, Filters } from '../types/brewery';

const OPEN_BREWERY_DB_BASE = 'https://api.openbrewerydb.org/v1';

function getApiBaseUrl(): string {
  const env = import.meta.env.VITE_API_BASE_URL;
  if (!env || typeof env !== 'string' || env.trim() === '') return OPEN_BREWERY_DB_BASE;
  const u = env.trim();
  if (u.startsWith('/')) return OPEN_BREWERY_DB_BASE;
  try {
    const url = new URL(u);
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') return OPEN_BREWERY_DB_BASE;
  } catch {
    return OPEN_BREWERY_DB_BASE;
  }
  return u;
}

const API_BASE_URL = getApiBaseUrl();
const API_TIMEOUT = 10000; // 10 seconds

/** Params for list breweries – pagination and sort only; filtering is done client-side */
export interface FetchBreweriesParams {
  page?: number;
  perPage?: number;
  sort?: string; // e.g. "name:asc" or "brewery_type:desc"
}

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

/** Open Brewery DB sometimes returns 302 and a welcome message instead of data; treat as no results */
function ensureBreweryArray(body: unknown): Brewery[] {
  if (Array.isArray(body)) return body as Brewery[];
  if (body && typeof body === 'object' && 'message' in body) {
    return [];
  }
  return [];
}

/**
 * Build query params for list endpoint – page, per_page, sort only (no filter params).
 */
function buildListParams(params: FetchBreweriesParams): string {
  const search = new URLSearchParams();
  search.set('page', String(params.page ?? 1));
  search.set('per_page', String(Math.min(params.perPage ?? 20, 200)));
  if (params.sort) search.set('sort', params.sort);
  return search.toString();
}

export const fetchBreweries = async (
  params: FetchBreweriesParams
): Promise<Brewery[]> => {
  try {
    const query = buildListParams(params);
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/breweries?${query}`
    );
    const body = await response.json();
    if (!response.ok) throw new Error('Failed to fetch breweries');
    return ensureBreweryArray(body);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error: Please check your internet connection');
  }
};

/** Meta response: total count for current filters (Open Brewery DB) */
export interface BreweriesMetaResponse {
  total?: string;
}

export const fetchBreweriesMeta = async (
  filters: Pick<Filters, 'name' | 'type' | 'city' | 'state'>
): Promise<BreweriesMetaResponse> => {
  try {
    const search = new URLSearchParams();
    if (filters.name?.trim()) search.set('by_name', filters.name.trim());
    if (filters.city?.trim()) search.set('by_city', filters.city.trim());
    if (filters.state?.trim()) search.set('by_state', filters.state.trim());
    if (filters.type?.trim()) search.set('by_type', filters.type.trim());
    const query = search.toString();
    const url = query ? `${API_BASE_URL}/breweries/meta?${query}` : `${API_BASE_URL}/breweries/meta`;
    const response = await fetchWithTimeout(url);
    return handleResponse<BreweriesMetaResponse>(response);
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
