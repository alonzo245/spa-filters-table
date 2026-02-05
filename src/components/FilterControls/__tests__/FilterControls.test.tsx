import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterControls } from '../FilterControls';
import { useBreweryStore } from '../../../store/breweryStore';

// Mock the store
vi.mock('../../../store/breweryStore', () => ({
  useBreweryStore: vi.fn(),
}));

describe('FilterControls', () => {
  const mockSetFilters = vi.fn();
  const mockResetFilters = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useBreweryStore as any).mockReturnValue({
      filters: {
        name: '',
        type: '',
        city: '',
        state: '',
      },
      setFilters: mockSetFilters,
      resetFilters: mockResetFilters,
    });
  });

  it('should render filter controls', () => {
    render(<FilterControls />);
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('should show active filter count badge when filters are active', () => {
    (useBreweryStore as any).mockReturnValue({
      filters: {
        name: 'test',
        type: 'micro',
        city: '',
        state: '',
      },
      setFilters: mockSetFilters,
      resetFilters: mockResetFilters,
    });

    render(<FilterControls />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should show clear button when filters are active', () => {
    (useBreweryStore as any).mockReturnValue({
      filters: {
        name: 'test',
        type: '',
        city: '',
        state: '',
      },
      setFilters: mockSetFilters,
      resetFilters: mockResetFilters,
    });

    render(<FilterControls />);
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('should call resetFilters when clear button is clicked', async () => {
    const user = userEvent.setup();
    (useBreweryStore as any).mockReturnValue({
      filters: {
        name: 'test',
        type: '',
        city: '',
        state: '',
      },
      setFilters: mockSetFilters,
      resetFilters: mockResetFilters,
    });

    render(<FilterControls />);
    const clearButton = screen.getByText('Clear');
    await user.click(clearButton);
    expect(mockResetFilters).toHaveBeenCalledTimes(1);
  });

  it('should toggle expansion when toggle button is clicked', async () => {
    const user = userEvent.setup();
    render(<FilterControls />);
    
    const toggleButton = screen.getByLabelText('Collapse filters');
    await user.click(toggleButton);
    
    // After clicking, the button should change to "Expand filters"
    await waitFor(() => {
      expect(screen.getByLabelText('Expand filters')).toBeInTheDocument();
    });
  });

  it('should render all filter input fields', () => {
    render(<FilterControls />);
    expect(screen.getByPlaceholderText('Search by name...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by type...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by city...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by state...')).toBeInTheDocument();
  });

  it('should update filter when input value changes', async () => {
    const user = userEvent.setup();
    render(<FilterControls />);
    
    const nameInput = screen.getByPlaceholderText('Search by name...');
    await user.type(nameInput, 'test');
    
    // The onChange should be called for each character
    expect(mockSetFilters).toHaveBeenCalled();
  });
});
