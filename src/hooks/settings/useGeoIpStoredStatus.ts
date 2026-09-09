'use client'

import type { GeoIpStoredStatus } from '@/types/settings'
import { fetchGeoIpSettings } from '@/utils/settings'
import { useEffect, useState } from 'react'

/** Loads the stored GeoIP settings once a key is available. */
export function useGeoIpStoredStatus(apiKey: string): GeoIpStoredStatus {
  const [hasLicenseKey, setHasLicenseKey] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)
  const [errorStatus, setErrorStatus] = useState<string | null>(null)

  useEffect(() => {
    if (!apiKey) return
    const loadSettings = async () => {
      const settings = await fetchGeoIpSettings(apiKey)
      if (!settings) return
      setHasLicenseKey(settings.hasLicenseKey)
      setLastUpdate(settings.geoipLastDbUpdateAt)
      setErrorStatus(settings.geoipLastDbUpdateError)
    }
    void loadSettings()
  }, [apiKey])

  return {
    hasLicenseKey,
    setHasLicenseKey,
    lastUpdate,
    setLastUpdate,
    errorStatus,
    setErrorStatus,
  }
}
