export type IpHostnameRefreshProps = Readonly<{
  hostnameLastLookupAt: number | null | undefined
  isRefreshing: boolean
  ip: string
  onRefresh: (e: React.MouseEvent, ip: string) => void
}>
