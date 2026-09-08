/** Resolved filters of the paginated reports query, ready to become SQL. */
export type ReportsListFilter = {
  allowedIds: number[] | null
  domainId?: number | undefined
  org?: string | undefined
}
