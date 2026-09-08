import type { GeoIpProgressEvent } from '@/types/geoipProgress'

export type GeoIpDatabaseCardProps = {
  readonly errorStatus: string | null
  readonly lastUpdate: string | null
  readonly isUpdatingDb: boolean
  readonly canUpdate: boolean
  readonly progressData: GeoIpProgressEvent | null
  readonly etaText: string | null
  readonly onUpdate: () => void
}
