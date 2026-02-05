import { useBreweryStore } from '../../../store/breweryStore';
import { useBrewery } from './useBrewery';

/**
 * Main hook for BreweryModal component
 * Combines brewery fetching with modal state management
 */
export function useBreweryModal() {
  const { selectedBreweryId, setSelectedBreweryId } = useBreweryStore();
  
  const { data: brewery, isLoading } = useBrewery(selectedBreweryId);
  
  const isOpen = selectedBreweryId !== null;
  
  const handleClose = () => {
    setSelectedBreweryId(null);
  };
  
  return {
    brewery,
    isLoading,
    isOpen,
    handleClose,
  };
}
