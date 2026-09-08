'use client'

import type { GeoIpProgressEvent } from '@/types/geoipProgress'
import type { GeoIpStreamHandlers, UseGeoIpReturn } from '@/types/settings'
import { getEtaText } from '@/utils/geoip'
import {
  fetchGeoIpSettings,
  openGeoIpUpdateStream,
  saveGeoIpLicenseKey,
} from '@/utils/settings'
import { useEffect, useState } from 'react'

export function useGeoIp(apiKey: string): UseGeoIpReturn {
  const [licenseKey, setLicenseKey] = useState('')
  const [hasLicenseKey, setHasLicenseKey] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)
  const [errorStatus, setErrorStatus] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdatingDb, setIsUpdatingDb] = useState(false)
  const [message, setMessage] = useState('')
  const [progressData, setProgressData] = useState<GeoIpProgressEvent | null>(
    null,
  )
  const [startTime, setStartTime] = useState<number | null>(null)

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

  function handleUpdateDb(): void {
    if (!hasLicenseKey && !licenseKey) return
    setIsUpdatingDb(true)
    setMessage('')
    setProgressData({ step: 'Starting download...', progress: 0 })
    setStartTime(Date.now())

    const handlers: GeoIpStreamHandlers = {
      onProgress: setProgressData,
      onDone: () => {
        setTimeout(() => {
          setIsUpdatingDb(false)
          setMessage('Database updated successfully!')
          setLastUpdate(new Date().toISOString())
          setErrorStatus(null)
          setProgressData(null)
        }, 1000)
      },
      onError: (errMsg: string) => {
        setIsUpdatingDb(false)
        setMessage(errMsg)
        setProgressData(null)
      },
    }

    void openGeoIpUpdateStream(apiKey, handlers)
  }

  const etaText = getEtaText(isUpdatingDb, progressData, startTime)

  return {
    licenseKey,
    setLicenseKey,
    hasLicenseKey,
    lastUpdate,
    errorStatus,
    isLoading,
    isUpdatingDb,
    message,
    progressData,
    startTime,
    etaText,
    handleSaveKey,
    handleUpdateDb,
  }
}
