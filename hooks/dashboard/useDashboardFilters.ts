import { create } from 'zustand'
import type { DashboardFiltersState } from '../../store/DashboardFiltersState'

export const useDashboardFilters = create<DashboardFiltersState>((set) => ({
  days: 30,
  from: undefined,
  to: undefined,
  setFilter: (days, from, to) => set({ days, from, to }),
}))
