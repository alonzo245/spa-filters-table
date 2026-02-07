import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Decorator } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BreweryTable } from './BreweryTable';

const meta = {
  title: 'Components/BreweryTable',
  component: BreweryTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    ((Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { 
            retry: false,
          },
        },
      });
      
      return (
        <QueryClientProvider client={queryClient}>
          <div className="bg-gray-800 p-4 rounded-lg min-h-[400px]">
            <Story />
          </div>
        </QueryClientProvider>
      );
    }) as Decorator,
  ],
} satisfies Meta<typeof BreweryTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state showing breweries table with data from the API
 */
export const Default: Story = {};

/**
 * Loading state - shows while fetching breweries
 */
export const Loading: Story = {
  parameters: {
    // Note: To test loading state, you may need to throttle network in browser DevTools
    // or use MSW to mock a delayed response
  },
};

/**
 * Error state - shows when API request fails
 */
export const ErrorState: Story = {
  parameters: {
    // Note: To test error state, you may need to block network requests
    // or use MSW to mock an error response
  },
};
