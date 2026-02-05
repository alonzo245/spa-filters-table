import { useQuery } from '@tanstack/react-query';
import {
  Dialog,
  Modal,
  ModalOverlay,
  Heading,
} from 'react-aria-components';
import { fetchBreweryById } from '../services/api';
import { useBreweryStore } from '../store/breweryStore';
import { BreweryMap } from './BreweryMap/BreweryMap';

export function BreweryModal() {
  const { selectedBreweryId, setSelectedBreweryId } = useBreweryStore();

  const { data: brewery, isLoading } = useQuery({
    queryKey: ['brewery', selectedBreweryId],
    queryFn: () => fetchBreweryById(selectedBreweryId!),
    enabled: !!selectedBreweryId,
  });

  const isOpen = selectedBreweryId !== null;

  const handleClose = () => {
    setSelectedBreweryId(null);
  };

  const getFullAddress = (brewery: typeof brewery) => {
    if (!brewery) return 'N/A';
    const parts = [
      brewery.street,
      brewery.address_1,
      brewery.address_2,
      brewery.address_3,
      brewery.city,
      brewery.state,
      brewery.postal_code,
      brewery.country,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'N/A';
  };

  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={(isOpen) => !isOpen && handleClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 dark:bg-black/70"
    >
      <Modal className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <Dialog className="p-6">
          {({ close }) => (
            <>
              <div className="flex justify-between items-start mb-4">
                <Heading className="text-2xl font-bold text-gray-100 dark:text-gray-100">
                  {isLoading ? 'Loading...' : brewery?.name || 'Brewery Details'}
                </Heading>
                <button
                  onClick={close}
                  className="text-gray-400 hover:text-gray-200 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {isLoading ? (
                <div className="py-8 text-center text-gray-400 dark:text-gray-400">Loading...</div>
              ) : brewery ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-400 dark:text-gray-400">Name</dt>
                      <dd className="mt-1 text-sm text-gray-100 dark:text-gray-100">{brewery.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-400 dark:text-gray-400">Type</dt>
                      <dd className="mt-1 text-sm text-gray-100 dark:text-gray-100">{brewery.brewery_type}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-400 dark:text-gray-400">City</dt>
                      <dd className="mt-1 text-sm text-gray-100 dark:text-gray-100">{brewery.city}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-400 dark:text-gray-400">State</dt>
                      <dd className="mt-1 text-sm text-gray-100 dark:text-gray-100">{brewery.state}</dd>
                    </div>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-400 dark:text-gray-400">Full Address</dt>
                    <dd className="mt-1 text-sm text-gray-100 dark:text-gray-100">{getFullAddress(brewery)}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-400 dark:text-gray-400">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-100 dark:text-gray-100">
                      {brewery.phone || 'N/A'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-400 dark:text-gray-400">Website</dt>
                    <dd className="mt-1 text-sm">
                      {brewery.website_url ? (
                        <a
                          href={brewery.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300 underline"
                        >
                          {brewery.website_url}
                        </a>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-400">N/A</span>
                      )}
                    </dd>
                  </div>

                  {brewery.latitude && brewery.longitude && (
                    <div className="mt-6">
                      <dt className="text-sm font-medium text-gray-400 dark:text-gray-400 mb-2">Location</dt>
                      <dd className="mt-1">
                        <BreweryMap
                          latitude={parseFloat(brewery.latitude)}
                          longitude={parseFloat(brewery.longitude)}
                          name={brewery.name}
                        />
                      </dd>
                    </div>
                  )}
                </div>
              ) : null}
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
