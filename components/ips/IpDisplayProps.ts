export type IpDisplayProps = {
  ip: string
  countryCode?: string | null
  countryName?: string | null
  hostname?: string | null
  hostnameLastLookupAt?: number | null

  layout?: 'stacked' | 'inline' | 'none'
  showFlag?: boolean
  showIp?: boolean
  showHostname?: boolean | 'if-present'
  ipAsLink?: boolean

  isRefreshing?: boolean
  onRefresh?: (e: React.MouseEvent, ip: string) => void

  className?: string
}
