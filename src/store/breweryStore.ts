import { create } from 'zustand';
import { SortField, SortDirection, Filters } from '../types/brewery';

interface BreweryStore {
  currentPage: number;
  perPage: number;
  sortField: SortField | null;
  sortDirection: SortDirection;
  filters: Filters;
  selectedBreweryId: string | null;
  
  setCurrentPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  setSortField: (field: SortField | null) => void;
  setSortDirection: (direction: SortDirection) => void;
  setFilters: (filters: Partial<Filters>) => void;
  setSelectedBreweryId: (id: string | null) => void;
  resetFilters: () => void;
}

const initialFilters: Filters = {
  name: '',
  type: '',
  city: '',
  state: '',
};

export const useBreweryStore = create<BreweryStore>((set) => ({
  currentPage: 1,
  perPage: 20,
  sortField: null,
  sortDirection: 'asc',
  filters: initialFilters,
  selectedBreweryId: null,
  
  setCurrentPage: (page) => set({ currentPage: page }),
  setPerPage: (perPage) => set({ perPage }),
  setSortField: (field) => set({ sortField: field }),
  setSortDirection: (direction) => set({ sortDirection: direction }),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1, // Reset to first page when filters change
    })),
  setSelectedBreweryId: (id) => set({ selectedBreweryId: id }),
  resetFilters: () => set({ filters: initialFilters, currentPage: 1 }),
}));
