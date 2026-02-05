import { memo } from 'react';

export const ErrorState = memo(() => (
  <div className="flex justify-center items-center py-12">
    <div className="text-lg text-red-400 dark:text-red-400">
      Error loading breweries. Please try again.
    </div>
  </div>
));

ErrorState.displayName = 'ErrorState';
