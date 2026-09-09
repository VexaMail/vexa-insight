'use client'

import type { UseGeoIpReturn } from '@/types/settings'
import { getEtaText } from '@/utils/geoip'
import { saveGeoIpLicenseKey } from '@/utils/settings'
import { useState } from 'react'
import { useGeoIpDbUpdate } from './useGeoIpDbUpdate'
import { useGeoIpStoredStatus } from './useGeoIpStoredStatus'

export function useGeoIp(apiKey: string): UseGeoIpReturn {
  const [licenseKey, setLicenseKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const stored = useGeoIpStoredStatus(apiKey)
  const { hasLicenseKey, setHasLicenseKey, setLastUpdate, setErrorStatus } =
    stored

  const update = useGeoIpDbUpdate({
    apiKey,
    canUpdate: hasLicenseKey || licenseKey !== '',
    setMessage,
    onUpdated: () => {
      setLastUpdate(new Date().toISOString())
      setErrorStatus(null)
    },
  })

  function handleSaveKey(): void {
    if (!licenseKey.trim()) return
    setIsLoading(true)
    setMessage('')
    const saveKey = async () => {
      const result = await saveGeoIpLicenseKey(apiKey, licenseKey)
      setMessage(result.message)
      if (result.ok) {
        setHasLicenseKey(true)
        setLicenseKey('')
      }
      setIsLoading(false)
    }
    void saveKey()
  }

  const etaText = getEtaText(
    update.isUpdatingDb,
    update.progressData,
    update.startTime,
  )

  return {
    licenseKey,
    setLicenseKey,
    hasLicenseKey,
    lastUpdate: stored.lastUpdate,
    errorStatus: stored.errorStatus,
    isLoading,
    message,
    etaText,
    handleSaveKey,
    ...update,
  }
}
