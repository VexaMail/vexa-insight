import type { DashboardFiltersState } from '@/types/stores'
import { create } from 'zustand'

export const useDashboardFilters = create<DashboardFiltersState>((set) => ({
  days: 30,
  from: undefined,
  to: undefined,
  setFilter: (days, from, to) => {
    set({ days, from, to })
  },
}))
