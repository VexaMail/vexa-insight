'use client'

import { useAiSettings, useProviderModels } from '@/hooks/settings'
import { m as motion } from 'framer-motion'
import { AiProviderSelect } from './AiProviderSelect'
import { AiSettingsHeader } from './AiSettingsHeader'
import { AiSettingsMessage } from './AiSettingsMessage'
import { AiSettingsProviderFields } from './AiSettingsProviderFields'
import type { AiSettingsSectionProps } from './AiSettingsSectionProps'

export function AiSettingsSection({
  apiKey,
}: Readonly<AiSettingsSectionProps>) {
  const settings = useAiSettings(apiKey)
  const { form, isConfigured, saveStatus, message } = settings
  const providerModels = useProviderModels(apiKey, form.providerId, form.apiKey)

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-border/50 bg-background/50 space-y-4 rounded-lg border p-6 backdrop-blur-sm"
    >
      <AiSettingsHeader isConfigured={isConfigured} />

      <p className="text-muted-foreground text-sm">
        Connect an AI provider to enable AI-powered report insights,
        explanations, and recommendations. Your API key is encrypted at rest.
      </p>

      <div className="flex max-w-xl flex-col gap-4 pt-2">
        <AiProviderSelect
          value={form.providerId}
          onChange={settings.handleProviderChange}
        />

        {form.providerId != null && (
          <AiSettingsProviderFields
            form={form}
            apiKeyMasked={settings.apiKeyMasked}
            isConfigured={isConfigured}
            saveStatus={saveStatus}
            models={providerModels.models}
            isLoadingModels={providerModels.isLoading}
            modelsError={providerModels.error}
            onApiKeyChange={settings.handleApiKeyChange}
            onModelChange={settings.handleModelChange}
            onSave={settings.handleSave}
            onClear={settings.handleClear}
          />
        )}

        <AiSettingsMessage message={message} saveStatus={saveStatus} />
      </div>
    </motion.section>
  )
}
