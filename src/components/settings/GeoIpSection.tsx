'use client'

import { m as motion } from 'framer-motion'
import { useGeoIp } from '../../hooks/settings/useGeoIp'
import { GeoIpDatabaseCard } from './GeoIpDatabaseCard'
import { GeoIpLicenseKeyField } from './GeoIpLicenseKeyField'
import { GeoIpSectionIntro } from './GeoIpSectionIntro'

export function GeoIpSection({ apiKey }: Readonly<{ apiKey: string }>) {
  const {
    licenseKey,
    setLicenseKey,
    hasLicenseKey,
    lastUpdate,
    errorStatus,
    isLoading,
    isUpdatingDb,
    message,
    progressData,
    etaText,
    handleSaveKey,
    handleUpdateDb,
  } = useGeoIp(apiKey)

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-border/50 bg-background/50 space-y-4 rounded-lg border p-6 backdrop-blur-sm"
    >
      <GeoIpSectionIntro />

      <div className="flex max-w-xl flex-col gap-4 pt-2">
        <GeoIpLicenseKeyField
          licenseKey={licenseKey}
          hasLicenseKey={hasLicenseKey}
          isLoading={isLoading}
          onChange={setLicenseKey}
          onSave={handleSaveKey}
        />

        <GeoIpDatabaseCard
          errorStatus={errorStatus}
          lastUpdate={lastUpdate}
          isUpdatingDb={isUpdatingDb}
          canUpdate={hasLicenseKey || licenseKey !== ''}
          progressData={progressData}
          etaText={etaText}
          onUpdate={handleUpdateDb}
        />

        {message !== '' && !isUpdatingDb && (
          <p className="text-foreground text-sm font-medium">{message}</p>
        )}
      </div>
    </motion.section>
  )
}
