export type HostnameCellProps = {
  readonly hostname: string | null
  readonly isRefreshing: boolean
  readonly onRefresh: () => void
}
