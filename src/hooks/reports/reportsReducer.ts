import type { ReportsTableAction, ReportsTableState } from '@/types/reports'
import { toggledSortDir } from '@/utils/reports'

export function reducer(
  state: ReportsTableState,
  action: ReportsTableAction,
): ReportsTableState {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.payload }
    case 'SET_FILTER_ORG':
      return { ...state, filterOrg: action.payload, page: 1 }
    case 'SET_FILTER_DOMAIN':
      return { ...state, filterDomain: action.payload, page: 1 }
    case 'SET_PAGE':
      return { ...state, page: action.payload }
    case 'SET_PAGE_SIZE':
      return { ...state, pageSize: action.payload, page: 1 }
    case 'SET_SORT':
      return {
        ...state,
        sortKey: action.payload.key,
        sortDir: toggledSortDir(state, action.payload.key),
      }
    case 'FETCH_START':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, data: action.payload }
    case 'FETCH_END':
      return { ...state, loading: false }
    default:
      return state
  }
}
