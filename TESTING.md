# Testing Documentation

## Test Setup

The project uses:
- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing utilities
- **@testing-library/user-event** - User interaction simulation
- **jsdom** - DOM environment for tests

## Running Tests

```bash
# Run tests in watch mode (development)
npm test

# Run tests once
npm test -- --run

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Test Coverage

### ✅ Utility Functions (100% coverage target)

1. **`filterAndSort.ts`**
   - ✅ `filterBreweries()` - All filter scenarios
   - ✅ `sortBreweries()` - All sort fields and directions

2. **`filterUtils.ts`**
   - ✅ `hasActiveFilters()` - Edge cases
   - ✅ `countActiveFilters()` - Counting logic

3. **`paginationUtils.ts`**
   - ✅ `canGoToPrevious()` - Boundary conditions
   - ✅ `getPreviousPage()` - Edge cases
   - ✅ `getNextPage()` - Basic functionality

4. **`breweryUtils.ts`**
   - ✅ `getFullAddress()` - Various address formats
   - ✅ `hasValidCoordinates()` - Validation logic
   - ✅ `parseCoordinates()` - Parsing logic

### ✅ Components

1. **`FilterControls`**
   - ✅ Rendering
   - ✅ Active filter badge
   - ✅ Clear button functionality
   - ✅ Toggle expansion
   - ✅ Filter input changes

2. **`Pagination`**
   - ✅ Page display
   - ✅ Previous/Next buttons
   - ✅ Disabled states
   - ✅ Navigation handlers

3. **`BreweryTable`**
   - ✅ Loading state
   - ✅ Error state
   - ✅ Data rendering
   - ✅ Row click handlers
   - ✅ Sort functionality

4. **`ErrorBoundary`**
   - ✅ Error catching
   - ✅ Error UI display
   - ✅ Reload functionality
   - ✅ Development error details

## Test Structure

```
src/
├── test/
│   ├── setup.ts          # Test configuration
│   ├── mockData.ts       # Shared test data
│   └── README.md         # Testing guide
├── utils/
│   └── __tests__/
│       └── filterAndSort.test.ts
└── components/
    ├── __tests__/
    │   └── ErrorBoundary.test.tsx
    ├── FilterControls/
    │   ├── __tests__/
    │   │   └── FilterControls.test.tsx
    │   └── utils/
    │       └── __tests__/
    │           └── filterUtils.test.ts
    ├── Pagination/
    │   ├── __tests__/
    │   │   └── Pagination.test.tsx
    │   └── utils/
    │       └── __tests__/
    │           └── paginationUtils.test.ts
    ├── BreweryTable/
    │   └── __tests__/
    │       └── BreweryTable.test.tsx
    └── BreweryModal/
        └── utils/
            └── __tests__/
                └── breweryUtils.test.ts
```

## Writing New Tests

### Example: Testing a Utility Function

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '../myFunction';

describe('myFunction', () => {
  it('should handle normal case', () => {
    expect(myFunction('input')).toBe('expected');
  });

  it('should handle edge case', () => {
    expect(myFunction('')).toBe('default');
  });
});
```

### Example: Testing a Component

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('should render', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);
    await user.click(screen.getByRole('button'));
    // Assert expected behavior
  });
});
```

## Best Practices

1. **Test behavior, not implementation** - Test what users see and do
2. **Use descriptive test names** - "should do X when Y"
3. **Test edge cases** - Empty states, null values, boundaries
4. **Mock external dependencies** - APIs, stores, browser APIs
5. **Keep tests isolated** - Each test should be independent
6. **Use data-testid sparingly** - Prefer accessible queries (getByRole, getByLabelText)

## Coverage Goals

- **Utilities**: 100% coverage
- **Components**: 80%+ coverage
- **Hooks**: 80%+ coverage

## Continuous Integration

Tests should run automatically on:
- Pull requests
- Before deployment
- On every commit (optional)
