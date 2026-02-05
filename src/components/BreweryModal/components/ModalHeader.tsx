import { Heading } from 'react-aria-components';

interface ModalHeaderProps {
  isLoading: boolean;
  breweryName?: string;
  onClose: () => void;
}

export function ModalHeader({ isLoading, breweryName, onClose }: ModalHeaderProps) {
  return (
    <div className="flex justify-between items-start gap-3 mb-3 sm:mb-4">
      <Heading className="text-xl sm:text-2xl font-bold text-gray-100 dark:text-gray-100 flex-1 pr-2">
        {isLoading ? 'Loading...' : breweryName || 'Brewery Details'}
      </Heading>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-200 dark:text-gray-400 dark:hover:text-gray-200 text-2xl sm:text-3xl font-bold leading-none flex-shrink-0"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}
