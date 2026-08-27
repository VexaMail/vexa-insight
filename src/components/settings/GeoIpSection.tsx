'use client'

import { Button } from '@/components/ui'
import { m as motion } from 'framer-motion'
import {
  AlertCircle,
  CheckCircle,
  Database,
  Download,
  Save,
} from 'lucide-react'
import { useGeoIp } from '../../hooks/settings/useGeoIp'

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

  let dbStatusContent = (
    <>
      <AlertCircle className="text-warning h-4 w-4" />
      <span>No database present / Not updated</span>
    </>
  )
  if (errorStatus) {
    dbStatusContent = (
      <>
        <AlertCircle className="text-danger h-4 w-4" />
        <span>Failed: {errorStatus}</span>
      </>
    )
  } else if (lastUpdate) {
    dbStatusContent = (
      <>
        <CheckCircle className="text-success h-4 w-4" />
        <span>Last updated: {new Date(lastUpdate).toLocaleString()}</span>
      </>
    )
  }

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
        <div className="flex flex-col gap-2">
          <label htmlFor="maxmind-license-key" className="text-sm font-medium">
            MaxMind License Key
          </label>
          <div className="flex gap-2">
            <input
              id="maxmind-license-key"
              type="password"
              placeholder={
                hasLicenseKey ? '••••••••••••••••' : 'Enter license key...'
              }
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              value={licenseKey}
              onChange={(e) => {
                setLicenseKey(e.target.value)
              }}
            />
            <Button
              type="button"
              variant="secondary"
              disabled={isLoading || !licenseKey.trim()}
              onClick={handleSaveKey}
            >
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>

        <div className="border-border/50 bg-muted/20 flex flex-col gap-3 rounded-md border p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-sm font-medium">GeoIP Database Status</span>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                {dbStatusContent}
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={isUpdatingDb || (!hasLicenseKey && !licenseKey)}
              onClick={handleUpdateDb}
            >
              <Download className="mr-2 h-4 w-4" />
              {isUpdatingDb ? 'Updating...' : 'Update Database'}
            </Button>
          </div>

          {isUpdatingDb && progressData !== null ? (
            <div className="border-border/50 bg-background/50 flex flex-col gap-2 rounded-md border p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground font-medium">
                  {progressData.step}
                </span>
                <span className="text-muted-foreground">
                  {Math.round(progressData.progress)}%
                </span>
              </div>
              <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                <div
                  className="bg-primary h-full transition-all duration-300 ease-out"
                  style={{
                    width: `${String(Math.max(2, progressData.progress))}%`,
                  }}
                />
              </div>
              {etaText !== null && etaText !== '' && (
                <div className="text-muted-foreground text-right text-xs">
                  {etaText}
                </div>
              )}
            </div>
          ) : null}
        </div>

        {message !== '' && !isUpdatingDb && (
          <p className="text-foreground text-sm font-medium">{message}</p>
        )}
      </div>
    </motion.section>
  )
}
