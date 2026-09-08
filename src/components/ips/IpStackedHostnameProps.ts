import type { MouseEvent } from 'react'

export type IpStackedHostnameProps = {
  hostname?: string | null | undefined
  ip: string
  isRefreshing: boolean
  lastLookup: { relative: string; absolute: string } | null
  onRefresh?: ((e: MouseEvent, ip: string) => void) | undefined
}
