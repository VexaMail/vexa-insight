export type IpHostnameProps = Readonly<{
  hostname?: string | null | undefined
  showHostname: boolean | 'if-present'
  isRefreshing: boolean
  ip: string
  onRefresh?: ((e: React.MouseEvent, ip: string) => void) | undefined
}>
