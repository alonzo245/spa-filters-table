import { Dialog, Modal, ModalOverlay } from 'react-aria-components';
import { useBreweryModal } from './hooks/useBreweryModal';
import { ModalHeader } from './components/ModalHeader';
import { LoadingState } from './components/LoadingState';
import { BreweryDetails } from './components/BreweryDetails';

/**
 * BreweryModal component
 * Displays detailed information about a selected brewery in a modal
 */
export function BreweryModal() {
  const { brewery, isLoading, isOpen, handleClose } = useBreweryModal();

  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={(isOpen) => !isOpen && handleClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 dark:bg-black/70 p-3 sm:p-4"
    >
      <Modal className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <Dialog className="p-4 sm:p-5 md:p-6">
          {({ close }) => (
            <>
              <ModalHeader
                isLoading={isLoading}
                breweryName={brewery?.name}
                onClose={close}
              />
              {isLoading ? (
                <LoadingState />
              ) : brewery ? (
                <BreweryDetails brewery={brewery} />
              ) : null}
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
