import type { Preview } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import '../src/index.css';

// Create a new QueryClient for each story
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#111827',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
  },

  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="dark">
            <Story />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    ),
  ],
};

export default preview;