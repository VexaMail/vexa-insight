import type { GeoIpProgressEvent } from '@/types/geoipProgress'

export type UpdateGeoIpDbOptions = {
  licenseKey?: string
  onProgress?: (event: GeoIpProgressEvent) => void
}
