# Brewery Browser

A React SPA for browsing breweries using the [Open Brewery DB API](https://www.openbrewerydb.org/). Pagination and sorting are server-side; filters run client-side on the current page.

## Features

- **Paginated table** – Browse breweries with previous/next page controls (data fetched per page from the API).
- **Client-side filters** – Filter the current page by name, type, city, and state (no extra API calls).
- **Server-side sort** – Sort by name, type, city, or state via the API; column headers toggle asc/desc.
- **Brewery details** – Click a row to open a modal with address, phone, website, and map (when coordinates exist).
- **Responsive layout** – Layout and pagination adapt for mobile and desktop.

## Tech Stack

| Category        | Technology                |
|----------------|---------------------------|
| UI             | React 18, React Aria Components |
| Build          | Vite 5                    |
| Language       | TypeScript                |
| Data           | TanStack Query, Zustand   |
| Routing        | React Router 6            |
| Styling        | Tailwind CSS, clsx        |
| Map            | Leaflet, React Leaflet    |
| Testing        | Vitest, Testing Library   |
| Components     | Storybook                 |

## Getting Started

### Prerequisites

- **Node.js 18+** and npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Scripts

| Command           | Description                    |
|------------------|--------------------------------|
| `npm run dev`    | Start dev server               |
| `npm run build`  | Production build → `dist/`     |
| `npm run preview`| Serve production build locally |
| `npm run lint`   | Run ESLint                     |
| `npm run test`   | Run tests (Vitest)             |
| `npm run test:ui`| Vitest UI                      |
| `npm run test:coverage` | Coverage report         |

### Building for production

```bash
npm run build
```

Output is in `dist/`. To preview:

```bash
npm run preview
```

### Deploying to GitHub Pages

Deployment is set up via GitHub Actions.

1. In the repo: **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**.
2. Push to `main` or run the **Deploy to GitHub Pages** workflow from the **Actions** tab.

The site will be available at:

`https://<username>.github.io/<repo-name>/`

To build locally with the same base path (e.g. to test deployment):

```bash
VITE_BASE_PATH=/your-repo-name/ npm run build
npm run preview
```

Then open the URL shown (e.g. `http://localhost:4173/your-repo-name/`).

## Project Structure

```
src/
├── components/           # Feature components
│   ├── BreweryTable/     # Table, sorting, data hooks
│   ├── BreweryModal/     # Detail modal + map
│   ├── BreweryMap/       # Leaflet map
│   ├── FilterControls/   # Name, type, city, state filters
│   ├── Pagination/       # Page controls
│   ├── Layout.tsx
│   └── ErrorBoundary.tsx
├── routes/               # Pages and layout
│   ├── _layout.tsx
│   └── index.tsx         # Home (table + filters + pagination)
├── services/
│   └── api.ts            # Open Brewery DB client (list, by id)
├── store/
│   └── breweryStore.ts   # Filters, page, sort, selected brewery
├── types/
│   └── brewery.ts
├── utils/
│   └── filterAndSort.ts  # Client-side filter/sort helpers
├── test/                 # Test setup and mocks
├── App.tsx
├── main.tsx
└── index.css
```

## Usage

1. **Table** – Shows one page of breweries. Use **Previous/Next** to change pages (each page is a new API request).
2. **Filters** – Type in name, type, city, or state to filter the **current page** only; no new request is made.
3. **Sort** – Click a column header to sort by that field (request is sent to the API).
4. **Details** – Click a row to open the modal with full details and map when coordinates exist.

## API

Uses the free [Open Brewery DB API](https://www.openbrewerydb.org/documentation): list (with `page`, `per_page`, `sort`) and single-brewery by id. Filtering by name/type/city/state is done in the app on the current page.

## Testing

Unit and component tests use **Vitest** and **Testing Library**. See [TESTING.md](./TESTING.md) for how to run tests and coverage.

## License

MIT
