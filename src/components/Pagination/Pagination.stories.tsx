import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Decorator } from '@storybook/react';
import { Pagination } from './Pagination';
import { useBreweryStore } from '../../store/breweryStore';
import { useEffect } from 'react';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    ((Story, context) => {
      const { setCurrentPage } = useBreweryStore();
      
      useEffect(() => {
        // Set initial page from story args
        const initialPage = (context.args as { initialPage?: number }).initialPage || 1;
        setCurrentPage(initialPage);
      }, [context.args, setCurrentPage]);
      
      return (
        <div className="bg-gray-900 p-4">
          <Story />
        </div>
      );
    }) as Decorator,
  ],
  argTypes: {
    initialPage: {
      control: { type: 'number', min: 1 },
      description: 'Initial page number',
    },
  },
} satisfies Meta<typeof Pagination & { initialPage?: number }>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default pagination on first page
 */
export const Default: Story = {
  args: {
    initialPage: 1,
  },
};

/**
 * Pagination on page 5
 */
export const PageFive: Story = {
  args: {
    initialPage: 5,
  },
};

/**
 * Pagination on page 10
 */
export const PageTen: Story = {
  args: {
    initialPage: 10,
  },
};

/**
 * First page state (Previous button disabled)
 */
export const FirstPage: Story = {
  args: {
    initialPage: 1,
  },
};
