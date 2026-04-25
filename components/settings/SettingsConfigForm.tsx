'use client'

import { Button } from '@/components/ui'
import type { SettingsConfigFormProps } from '@/types/settings'
import { m as motion } from 'framer-motion'
import { useSettingsConfig } from '../../hooks/settings/useSettingsConfig'
import AdvancedSection from './AdvancedSection'
import { AiSettingsSection } from './AiSettingsSection'
import ApiKeySection from './ApiKeySection'
import { GeoIpSection } from './GeoIpSection'
import ImapAccountsSection from './ImapAccountsSection'
import IngestionSection from './IngestionSection'
import IpHostnameSection from './IpHostnameSection'

export default function SettingsConfigForm({
  className = '',
  initialData,
}: Readonly<SettingsConfigFormProps>) {
  const {
    apiKey,
    form,
    setForm,
    saveStatus,
    message,
    handleCopyApiKey,
    handleGenerateNewApiKey,
    handleTestConnection,
    handleImapUpdate,
    handleImapAdd,
    handleImapRemove,
    handleSubmit,
  } = useSettingsConfig(initialData)

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e)
      }}
      className={`space-y-6 ${className}`}
    >
      <ApiKeySection
        apiKey={apiKey}
        newKey={form.secretKeyNew}
        onCopy={handleCopyApiKey}
        onGenerate={handleGenerateNewApiKey}
        onNewKeyChange={(v) =>
          setForm((prev) => ({ ...prev, secretKeyNew: v }))
        }
      />

      <ImapAccountsSection
        accounts={form.imapAccounts}
        apiKey={apiKey}
        onUpdate={handleImapUpdate}
        onAdd={handleImapAdd}
        onRemove={handleImapRemove}
        onTestConnection={(id) => {
          void handleTestConnection(id)
        }}
      />

      <IngestionSection
        intervalMinutes={form.ingestionIntervalMinutes}
        daysBack={form.ingestionDaysBack}
        onIntervalChange={(v) =>
          setForm((prev) => ({ ...prev, ingestionIntervalMinutes: v }))
        }
        onDaysBackChange={(v) =>
          setForm((prev) => ({ ...prev, ingestionDaysBack: v }))
        }
      />

      <AdvancedSection
        corsOrigins={form.backendCorsOrigins}
        environment={
          form.environment as 'development' | 'staging' | 'production'
        }
        onCorsChange={(v) =>
          setForm((prev) => ({ ...prev, backendCorsOrigins: v }))
        }
        onEnvironmentChange={(v) =>
          setForm((prev) => ({ ...prev, environment: v }))
        }
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="flex flex-wrap items-center gap-4"
      >
        <Button
          type="submit"
          disabled={saveStatus === 'loading' || !apiKey.trim()}
        >
          {saveStatus === 'loading' ? 'Saving…' : 'Save configuration'}
        </Button>
        {message && (
          <p
            role="status"
            className={`text-sm ${saveStatus === 'error' ? 'text-danger' : 'text-success'}`}
          >
            {message}
          </p>
        )}
      </motion.div>
    </form>
  )
}
