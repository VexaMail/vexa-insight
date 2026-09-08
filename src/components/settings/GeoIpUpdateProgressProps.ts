import type { GeoIpProgressEvent } from '@/types/geoipProgress'

export type GeoIpUpdateProgressProps = {
  readonly progress: GeoIpProgressEvent
  readonly etaText: string | null
}
