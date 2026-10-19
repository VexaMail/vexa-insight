/** The reports list filters, as the KPI strip above it applies them. */
export type ReportsWindowFilter = {
  readonly from?: Date | undefined
  readonly to?: Date | undefined
  readonly org?: string | undefined
  readonly domain?: string | undefined
}
