'use client'

import { StatusPill } from '@/components/ui'
import { Database } from 'lucide-react'
import { useGeoIp } from '../../hooks/settings/useGeoIp'
import { GeoIpDatabaseCard } from './GeoIpDatabaseCard'
import { GeoIpLicenseKeyField } from './GeoIpLicenseKeyField'
import { GeoIpSectionIntro } from './GeoIpSectionIntro'
import { SettingsSection } from './SettingsSection'

export function GeoIpSection({ apiKey }: Readonly<{ apiKey: string }>) {
  const geoIp = useGeoIp(apiKey)
  const { licenseKey, hasLicenseKey, isUpdatingDb, message } = geoIp

  return (
    <SettingsSection
      anchorId="geoip"
      headingId="settings-geoip-heading"
      icon={<Database />}
      title="GeoIP"
      description="Country and network names for source IPs, from a local MaxMind database."
      actions={
        <StatusPill tone={hasLicenseKey ? 'success' : 'unknown'} dot>
          {hasLicenseKey ? 'Key saved' : 'No key'}
        </StatusPill>
      }
    >
      <div className="flex flex-col gap-4">
        <GeoIpSectionIntro />
        <GeoIpLicenseKeyField
          licenseKey={licenseKey}
          hasLicenseKey={hasLicenseKey}
          isLoading={geoIp.isLoading}
          onChange={geoIp.setLicenseKey}
          onSave={geoIp.handleSaveKey}
        />
        <GeoIpDatabaseCard
          errorStatus={geoIp.errorStatus}
          lastUpdate={geoIp.lastUpdate}
          isUpdatingDb={isUpdatingDb}
          canUpdate={hasLicenseKey || licenseKey !== ''}
          progressData={geoIp.progressData}
          etaText={geoIp.etaText}
          onUpdate={geoIp.handleUpdateDb}
        />
        {message !== '' && !isUpdatingDb && (
          <p className="text-foreground text-sm font-medium" role="status">
            {message}
          </p>
        )}
      </div>
    </SettingsSection>
  )
}
