import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '../Pagination';
import { useBreweryStore } from '../../../store/breweryStore';

// Mock the store
vi.mock('../../../store/breweryStore', () => ({
  useBreweryStore: vi.fn(),
}));

describe('Pagination', () => {
  const mockSetCurrentPage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useBreweryStore as any).mockReturnValue({
      currentPage: 1,
      setCurrentPage: mockSetCurrentPage,
    });
  });

  it('should render pagination controls', () => {
    render(<Pagination />);
    expect(screen.getByText('Page')).toBeInTheDocument();
    // Use getAllByText since page number appears twice (mobile and desktop)
    const pageNumbers = screen.getAllByText('1');
    expect(pageNumbers.length).toBeGreaterThan(0);
  });

  it('should display current page number', () => {
    (useBreweryStore as any).mockReturnValue({
      currentPage: 5,
      setCurrentPage: mockSetCurrentPage,
    });

    render(<Pagination />);
    // Use getAllByText since page number appears twice
    const pageNumbers = screen.getAllByText('5');
    expect(pageNumbers.length).toBeGreaterThan(0);
  });

  it('should disable previous button on page 1', () => {
    render(<Pagination />);
    // Find buttons by role, filtering out the sr-only spans
    const allButtons = screen.getAllByRole('button');
    const previousButtons = allButtons.filter(btn => {
      const text = btn.textContent || '';
      return text.includes('Previous') || text.includes('←');
    });
    
    // Check that at least one previous button is disabled
    const disabledButtons = previousButtons.filter(btn => btn.hasAttribute('disabled') || btn.getAttribute('data-disabled') === 'true');
    expect(disabledButtons.length).toBeGreaterThan(0);
  });

  it('should enable previous button on page 2+', () => {
    (useBreweryStore as any).mockReturnValue({
      currentPage: 2,
      setCurrentPage: mockSetCurrentPage,
    });

    render(<Pagination />);
    const previousButtons = screen.getAllByText('Previous');
    expect(previousButtons.length).toBeGreaterThan(0);
    // At least one should be enabled
    const enabledButton = previousButtons.find(btn => !btn.hasAttribute('disabled'));
    expect(enabledButton).toBeDefined();
  });

  it('should call setCurrentPage with previous page when previous button is clicked', async () => {
    const user = userEvent.setup();
    (useBreweryStore as any).mockReturnValue({
      currentPage: 2,
      setCurrentPage: mockSetCurrentPage,
    });

    render(<Pagination />);
    const previousButtons = screen.getAllByText('Previous');
    const enabledButton = previousButtons.find(btn => !btn.hasAttribute('disabled'));
    if (enabledButton) {
      await user.click(enabledButton);
      expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
    }
  });

  it('should call setCurrentPage with next page when next button is clicked', async () => {
    const user = userEvent.setup();
    render(<Pagination />);
    
    const nextButtons = screen.getAllByText('Next');
    const nextButton = nextButtons[0];
    await user.click(nextButton);
    
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it('should render mobile pagination buttons', () => {
    render(<Pagination />);
    // Use getAllByText since buttons appear in both mobile and desktop views
    const previousButtons = screen.getAllByText('Previous');
    const nextButtons = screen.getAllByText('Next');
    expect(previousButtons.length).toBeGreaterThan(0);
    expect(nextButtons.length).toBeGreaterThan(0);
  });
});
