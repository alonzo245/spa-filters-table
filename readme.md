# Brewery Browser App

A modern React application for browsing breweries using the Open Brewery DB API.

## Features

- **Brewery Table with Pagination**: Browse breweries in a paginated table view
- **Modal Details**: Click any brewery row to view detailed information
- **Sorting & Filtering**: Sort and filter breweries by name, type, city, and state
- **Interactive Map**: View brewery locations on an interactive map (when coordinates are available)

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Styling
- **React Aria Components** - Accessible UI components
- **React Router** - Routing (configured for future use)
- **Zustand** - State management
- **Leaflet.js** - Interactive maps
- **clsx** - Conditional class names

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── BreweryTable.tsx    # Main table component
│   ├── BreweryModal.tsx    # Modal for brewery details
│   ├── BreweryMap.tsx      # Leaflet map component
│   ├── FilterControls.tsx  # Filter inputs
│   └── Pagination.tsx      # Pagination controls
├── services/            # API services
│   └── api.ts             # Open Brewery DB API client
├── store/              # Zustand stores
│   └── breweryStore.ts   # Application state
├── types/              # TypeScript types
│   └── brewery.ts        # Brewery data types
├── utils/              # Utility functions
│   └── filterAndSort.ts # Filtering and sorting logic
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Usage

1. **Viewing Breweries**: The table displays breweries fetched from the API with pagination controls at the bottom.

2. **Filtering**: Use the filter inputs at the top to filter breweries by name, type, city, or state. Filters update the table dynamically.

3. **Sorting**: Click on any column header to sort by that field. Click again to reverse the sort order.

4. **Viewing Details**: Click on any brewery row to open a modal with detailed information including address, phone, website, and location map.

5. **Map View**: If a brewery has latitude/longitude coordinates, a map will be displayed in the modal showing its location.

## API

This application uses the [Open Brewery DB API](https://www.openbrewerydb.org/), a free and open-source dataset of breweries.

## License

MIT
