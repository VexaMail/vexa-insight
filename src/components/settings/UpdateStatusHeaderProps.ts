export type UpdateStatusHeaderProps = {
  readonly updateAvailable: boolean
  readonly isRefreshing: boolean
  readonly isLoading: boolean
  readonly apiKey: string
  readonly onRefresh: () => void
}
