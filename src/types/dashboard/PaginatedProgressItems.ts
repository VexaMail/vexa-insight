import type { ProgressItem } from './ProgressItem'
/**
 * Paginated slice of progress items for GET /api/v1/poll-status.
 */
export type PaginatedProgressItems = {
  items: ProgressItem[]
  total: number
  page: number
  pageSize: number
}
