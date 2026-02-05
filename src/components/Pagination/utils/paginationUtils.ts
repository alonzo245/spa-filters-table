/**
 * Checks if the previous page button should be disabled
 */
export function canGoToPrevious(currentPage: number): boolean {
  return currentPage > 1;
}

/**
 * Calculates the previous page number
 */
export function getPreviousPage(currentPage: number): number {
  return Math.max(1, currentPage - 1);
}

/**
 * Calculates the next page number
 */
export function getNextPage(currentPage: number): number {
  return currentPage + 1;
}
