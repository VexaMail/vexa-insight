import type { PaginatedReports } from '@/types/reports'
import type { SortKey } from './SortKey'

export type ReportsTableAction =
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_FILTER_ORG'; payload: string }
  | { type: 'SET_FILTER_DOMAIN'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_PAGE_SIZE'; payload: number }
  | { type: 'SET_SORT'; payload: { key: SortKey } }
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: PaginatedReports }
  | { type: 'FETCH_END' }
