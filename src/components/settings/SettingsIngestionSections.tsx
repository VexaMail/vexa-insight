import type { SettingsIngestionSectionsProps } from '@/types/settings'
import AdvancedSection from './AdvancedSection'
import { AiSettingsSection } from './AiSettingsSection'
import { GeoIpSection } from './GeoIpSection'
import IngestionSection from './IngestionSection'
import IpHostnameSection from './IpHostnameSection'

/** Ingestion cadence, environment, GeoIP, AI and hostname enrichment. */
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

      <AdvancedSection
        corsOrigins={form.backendCorsOrigins}
        environment={
          form.environment as 'development' | 'staging' | 'production'
        }
        onCorsChange={(v) => {
          setForm((prev) => ({ ...prev, backendCorsOrigins: v }))
        }}
        onEnvironmentChange={(v) => {
          setForm((prev) => ({ ...prev, environment: v }))
        }}
      />

      <GeoIpSection apiKey={apiKey} />

      <AiSettingsSection apiKey={apiKey} />

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
    </>
  )
}
