import type { PaginatedProgressItems, ProgressItem } from '@/types/dashboard'

/** One page of an already ordered item list. */
export function paginateProgressItems(
  ordered: readonly ProgressItem[],
  page: number,
  pageSize: number,
): PaginatedProgressItems {
  const start = (page - 1) * pageSize
  return {
    items: ordered.slice(start, start + pageSize),
    total: ordered.length,
    page,
    pageSize,
  }
}
