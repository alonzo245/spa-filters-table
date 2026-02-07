import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Decorator } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BreweryModal } from './BreweryModal';
import { useBreweryStore } from '../../store/breweryStore';
import { useEffect } from 'react';

const meta = {
  title: 'Components/BreweryModal',
  component: BreweryModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    ((Story, context) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { 
            retry: false,
          },
        },
      });
      
      const { setSelectedBreweryId } = useBreweryStore();
      
      const args = context.args as { breweryId?: string; isOpen?: boolean };
      
      useEffect(() => {
        if (args.isOpen !== false && args.breweryId) {
          setSelectedBreweryId(args.breweryId);
        } else if (args.isOpen !== false) {
          setSelectedBreweryId('1');
        } else {
          setSelectedBreweryId(null);
        }
      }, [args.isOpen, args.breweryId, setSelectedBreweryId]);
      
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    }) as Decorator,
  ],
  argTypes: {
    breweryId: {
      control: 'text',
      description: 'Selected brewery ID',
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether modal is open',
    },
  },
} satisfies Meta<typeof BreweryModal & { breweryId?: string; isOpen?: boolean }>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default modal showing brewery details
 */
export const Default: Story = {
  args: {
    breweryId: '1',
    isOpen: true,
  },
};

/**
 * Modal with brewery that has map coordinates
 */
export const WithMap: Story = {
  args: {
    breweryId: '1',
    isOpen: true,
  },
};

/**
 * Modal with brewery without coordinates (no map shown)
 */
export const WithoutCoordinates: Story = {
  args: {
    breweryId: '3',
    isOpen: true,
  },
};

/**
 * Closed modal state
 */
export const Closed: Story = {
  args: {
    isOpen: false,
  },
};
