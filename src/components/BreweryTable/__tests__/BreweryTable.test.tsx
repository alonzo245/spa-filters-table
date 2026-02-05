import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BreweryTable } from '../BreweryTable';
import { useBreweryStore } from '../../../store/breweryStore';
import { mockBreweries } from '../../../test/mockData';

// Mock the store
vi.mock('../../../store/breweryStore', () => ({
  useBreweryStore: vi.fn(),
}));

// Mock the hooks
const mockUseBreweryTable = vi.fn();
vi.mock('../hooks/useBreweryTable', async () => {
  return {
    useBreweryTable: () => mockUseBreweryTable(),
  };
});

describe('BreweryTable', () => {
  const mockSetSelectedBreweryId = vi.fn();
  const mockHandleSort = vi.fn();
  const mockHandleSelectBrewery = vi.fn();

  const createQueryClient = () => {
    return new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useBreweryStore as any).mockReturnValue({
      currentPage: 1,
      perPage: 20,
      sortField: null,
      sortDirection: 'asc',
      filters: {
        name: '',
        type: '',
        city: '',
        state: '',
      },
      setSortField: vi.fn(),
      setSortDirection: vi.fn(),
      setSelectedBreweryId: mockSetSelectedBreweryId,
    });

    mockUseBreweryTable.mockReturnValue({
      breweries: mockBreweries,
      isLoading: false,
      error: null,
      sortField: null,
      sortDirection: 'asc',
      handleSort: mockHandleSort,
      handleSelectBrewery: mockHandleSelectBrewery,
    });
  });

  const renderWithProviders = (component: React.ReactElement) => {
    const queryClient = createQueryClient();
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  it('should render loading state', () => {
    mockUseBreweryTable.mockReturnValue({
      breweries: [],
      isLoading: true,
      error: null,
      sortField: null,
      sortDirection: 'asc',
      handleSort: mockHandleSort,
      handleSelectBrewery: mockHandleSelectBrewery,
    });

    renderWithProviders(<BreweryTable />);
    expect(screen.getByText('Loading breweries...')).toBeInTheDocument();
  });

  it('should render error state', () => {
    mockUseBreweryTable.mockReturnValue({
      breweries: [],
      isLoading: false,
      error: new Error('Failed to fetch'),
      sortField: null,
      sortDirection: 'asc',
      handleSort: mockHandleSort,
      handleSelectBrewery: mockHandleSelectBrewery,
    });

    renderWithProviders(<BreweryTable />);
    expect(
      screen.getByText('Error loading breweries. Please try again.')
    ).toBeInTheDocument();
  });

  it('should render brewery table with data', () => {
    renderWithProviders(<BreweryTable />);
    expect(screen.getByText('Test Brewery 1')).toBeInTheDocument();
    expect(screen.getByText('Another Brewery')).toBeInTheDocument();
    expect(screen.getByText('Zebra Brewing')).toBeInTheDocument();
  });

  it('should render table headers', () => {
    renderWithProviders(<BreweryTable />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.getByText('State')).toBeInTheDocument();
  });

  it('should call handleSelectBrewery when row is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<BreweryTable />);
    
    const firstRow = screen.getByText('Test Brewery 1').closest('tr');
    if (firstRow) {
      await user.click(firstRow);
      expect(mockHandleSelectBrewery).toHaveBeenCalled();
    }
  });

  it('should call handleSort when column header is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<BreweryTable />);
    
    const nameHeader = screen.getByText('Name');
    await user.click(nameHeader);
    
    expect(mockHandleSort).toHaveBeenCalled();
  });
});
