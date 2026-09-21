export type UseIpSectionListParams<Row, Query> = {
  initialRows: Row[]
  /** Re-seeds the list when it changes, typically ip plus date range. */
  filterKey: string
  pageSize: number
  defaultQuery: Query
  keyOf: (row: Row) => number | string
  fetchPage: (offset: number, query: Query) => Promise<Row[]>
}
