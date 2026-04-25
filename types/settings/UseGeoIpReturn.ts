import type { GeoIpProgressEvent } from '@/types/geoipProgress'

export type UseGeoIpReturn = {
  licenseKey: string
  setLicenseKey: (key: string) => void
  hasLicenseKey: boolean
  lastUpdate: string | null
  errorStatus: string | null
  isLoading: boolean
  isUpdatingDb: boolean
  message: string
  progressData: GeoIpProgressEvent | null
  startTime: number | null
  etaText: string | null
  handleSaveKey: () => void
  handleUpdateDb: () => void
}
