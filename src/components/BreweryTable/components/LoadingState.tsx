import { memo } from 'react';

export const LoadingState = memo(() => (
  <div className="flex justify-center items-center py-12">
    <div className="text-lg text-gray-400 dark:text-gray-400">Loading breweries...</div>
  </div>
));

LoadingState.displayName = 'LoadingState';
