export type UseIpSectionListReturn<Row, Query> = {
  rows: Row[]
  query: Query
  isLoading: boolean
  hasMore: boolean
  handleQueryChange: (query: Query) => void
  handleLoadMore: () => Promise<void>
}
