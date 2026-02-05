import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 dark:text-gray-100">Brewery Browser</h1>
          <p className="mt-2 text-lg text-gray-400 dark:text-gray-400">
            Browse and explore breweries from around the world
          </p>
        </header>
        {children}
      </div>
    </div>
  );
}
