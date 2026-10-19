import type { SettingsIngestionSectionsProps } from '@/types/settings'
import { AiSettingsSection } from './AiSettingsSection'
import { GeoIpSection } from './GeoIpSection'
import IngestionSection from './IngestionSection'
import IpHostnameSection from './IpHostnameSection'
import { SndsSection } from './SndsSection'

/** Ingestion cadence and the enrichment sources: hostnames, GeoIP, SNDS, AI. */
export function SettingsIngestionSections({
  apiKey,
  form,
  setForm,
}: SettingsIngestionSectionsProps) {
  return (
    <>
      <IngestionSection
        intervalMinutes={form.ingestionIntervalMinutes}
        daysBack={form.ingestionDaysBack}
        onIntervalChange={(v) => {
          setForm((prev) => ({ ...prev, ingestionIntervalMinutes: v }))
        }}
        onDaysBackChange={(v) => {
          setForm((prev) => ({ ...prev, ingestionDaysBack: v }))
        }}
      />

      <IpHostnameSection
        enabled={form.ipHostnameLookupEnabled}
        refreshIntervalHours={form.ipHostnameRefreshIntervalHours}
        timeoutMs={form.ipHostnameTimeoutMs}
        maxRetries={form.ipHostnameMaxRetries}
        retryBackoffMinutes={form.ipHostnameRetryBackoffMinutes}
        batchSize={form.ipHostnameBatchSize}
        manualRefreshEnabled={form.ipHostnameManualRefreshEnabled}
        allowPrivateIps={form.ipHostnameAllowPrivateIps}
        negativeCacheHours={form.ipHostnameNegativeCacheHours}
        onChange={(key, value) => {
          setForm((prev) => ({ ...prev, [key]: value }))
        }}
      />

      <GeoIpSection apiKey={apiKey} />

      <SndsSection apiKey={apiKey} />

      <AiSettingsSection apiKey={apiKey} />
    </>
  )
}
