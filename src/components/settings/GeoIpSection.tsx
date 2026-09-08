'use client'

import { m as motion } from 'framer-motion'
import { Database } from 'lucide-react'
import { useGeoIp } from '../../hooks/settings/useGeoIp'
import { GeoIpDatabaseCard } from './GeoIpDatabaseCard'
import { GeoIpLicenseKeyField } from './GeoIpLicenseKeyField'

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
      <div className="flex items-center gap-2">
        <Database className="text-muted-foreground h-5 w-5" />
        <h2 className="text-xl font-semibold tracking-tight">
          GeoIP (MaxMind)
        </h2>
      </div>

      <p className="text-muted-foreground text-sm">
        Create a free MaxMind account and generate a license key to enable GeoIP
        enrichment. The database must be downloaded before features will work.
        <br />
        <span className="text-warning font-semibold">
          Notice: Database updates can be resource-intensive.
        </span>
      </p>

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
