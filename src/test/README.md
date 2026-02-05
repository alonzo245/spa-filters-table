# Testing Guide

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm test -- --run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Structure

Tests are organized alongside the code they test:
- Utility functions: `utils/__tests__/`
- Components: `components/ComponentName/__tests__/`
- Hooks: `hooks/__tests__/`

## Writing Tests

### Utility Function Tests
Test pure functions with various inputs and edge cases.

### Component Tests
- Mock external dependencies (stores, APIs)
- Test user interactions
- Test rendering states (loading, error, success)
- Test accessibility

### Hook Tests
- Test state changes
- Test side effects
- Test return values

## Mock Data

Use `src/test/mockData.ts` for consistent test data across tests.
