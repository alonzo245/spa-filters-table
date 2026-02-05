import { describe, it, expect } from 'vitest';
import { filterBreweries, sortBreweries } from '../filterAndSort';
import { mockBreweries } from '../../test/mockData';
import { Filters, SortField, SortDirection } from '../../types/brewery';

describe('filterBreweries', () => {
  it('should return all breweries when no filters are applied', () => {
    const filters: Filters = {
      name: '',
      type: '',
      city: '',
      state: '',
    };
    const result = filterBreweries(mockBreweries, filters);
    expect(result).toHaveLength(3);
  });

  it('should filter by name', () => {
    const filters: Filters = {
      name: 'Test',
      type: '',
      city: '',
      state: '',
    };
    const result = filterBreweries(mockBreweries, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Test Brewery 1');
  });

  it('should filter by type', () => {
    const filters: Filters = {
      name: '',
      type: 'micro',
      city: '',
      state: '',
    };
    const result = filterBreweries(mockBreweries, filters);
    expect(result).toHaveLength(1);
    expect(result[0].brewery_type).toBe('micro');
  });

  it('should filter by city', () => {
    const filters: Filters = {
      name: '',
      type: '',
      city: 'Seattle',
      state: '',
    };
    const result = filterBreweries(mockBreweries, filters);
    expect(result).toHaveLength(1);
    expect(result[0].city).toBe('Seattle');
  });

  it('should filter by state', () => {
    const filters: Filters = {
      name: '',
      type: '',
      city: '',
      state: 'Oregon',
    };
    const result = filterBreweries(mockBreweries, filters);
    expect(result).toHaveLength(1);
    expect(result[0].state).toBe('Oregon');
  });

  it('should filter by multiple criteria', () => {
    const filters: Filters = {
      name: '',
      type: 'micro',
      city: 'Portland',
      state: 'Oregon',
    };
    const result = filterBreweries(mockBreweries, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Test Brewery 1');
  });

  it('should be case-insensitive', () => {
    const filters: Filters = {
      name: 'test',
      type: '',
      city: '',
      state: '',
    };
    const result = filterBreweries(mockBreweries, filters);
    expect(result).toHaveLength(1);
  });

  it('should return empty array when no matches found', () => {
    const filters: Filters = {
      name: 'NonExistent',
      type: '',
      city: '',
      state: '',
    };
    const result = filterBreweries(mockBreweries, filters);
    expect(result).toHaveLength(0);
  });
});

describe('sortBreweries', () => {
  it('should return unsorted array when sortField is null', () => {
    const result = sortBreweries(mockBreweries, null, 'asc');
    expect(result).toEqual(mockBreweries);
  });

  it('should sort by name ascending', () => {
    const result = sortBreweries(mockBreweries, 'name', 'asc');
    expect(result[0].name).toBe('Another Brewery');
    expect(result[1].name).toBe('Test Brewery 1');
    expect(result[2].name).toBe('Zebra Brewing');
  });

  it('should sort by name descending', () => {
    const result = sortBreweries(mockBreweries, 'name', 'desc');
    expect(result[0].name).toBe('Zebra Brewing');
    expect(result[1].name).toBe('Test Brewery 1');
    expect(result[2].name).toBe('Another Brewery');
  });

  it('should sort by type ascending', () => {
    const result = sortBreweries(mockBreweries, 'brewery_type', 'asc');
    expect(result[0].brewery_type).toBe('brewpub');
    expect(result[1].brewery_type).toBe('micro');
    expect(result[2].brewery_type).toBe('regional');
  });

  it('should sort by city ascending', () => {
    const result = sortBreweries(mockBreweries, 'city', 'asc');
    expect(result[0].city).toBe('Denver');
    expect(result[1].city).toBe('Portland');
    expect(result[2].city).toBe('Seattle');
  });

  it('should sort by state ascending', () => {
    const result = sortBreweries(mockBreweries, 'state', 'asc');
    expect(result[0].state).toBe('Colorado');
    expect(result[1].state).toBe('Oregon');
    expect(result[2].state).toBe('Washington');
  });

  it('should be case-insensitive', () => {
    const breweries = [
      { ...mockBreweries[0], name: 'apple' },
      { ...mockBreweries[1], name: 'Zebra' },
    ];
    const result = sortBreweries(breweries, 'name', 'asc');
    expect(result[0].name).toBe('apple');
    expect(result[1].name).toBe('Zebra');
  });
});
