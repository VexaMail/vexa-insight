export type DashboardFiltersState = {
  days: number
  from: Date | undefined
  to: Date | undefined
  setFilter: (days: number, from?: Date, to?: Date) => void
}
