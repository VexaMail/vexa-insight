import type { GeoIpProgressEvent } from '@/types/geoipProgress'

export type UseGeoIpDbUpdateReturn = {
  readonly isUpdatingDb: boolean
  readonly progressData: GeoIpProgressEvent | null
  readonly startTime: number | null
  readonly handleUpdateDb: () => void
}
