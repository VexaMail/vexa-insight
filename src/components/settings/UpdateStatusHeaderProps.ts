export type UpdateStatusHeaderProps = {
  readonly isRefreshing: boolean
  readonly isLoading: boolean
  readonly apiKey: string
  readonly onRefresh: () => void
}
