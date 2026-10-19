'use client'

import { StatusPill } from '@/components/ui'
import { useAiSettings, useProviderModels } from '@/hooks/settings'
import { Sparkles } from 'lucide-react'
import { AiProviderSelect } from './AiProviderSelect'
import { AiSettingsMessage } from './AiSettingsMessage'
import { AiSettingsProviderFields } from './AiSettingsProviderFields'
import type { AiSettingsSectionProps } from './AiSettingsSectionProps'
import { SettingsSection } from './SettingsSection'

export function AiSettingsSection({
  apiKey,
}: Readonly<AiSettingsSectionProps>) {
  const settings = useAiSettings(apiKey)
  const { form, isConfigured, saveStatus, message } = settings
  const providerModels = useProviderModels(apiKey, form.providerId, form.apiKey)

  return (
    <SettingsSection
      anchorId="ai"
      headingId="settings-ai-heading"
      icon={<Sparkles />}
      title="AI provider"
      description="Optional. Report explanations and recommendations; the key is encrypted at rest."
      actions={
        <StatusPill tone={isConfigured ? 'success' : 'neutral'} dot>
          {isConfigured ? 'Configured' : 'Not configured'}
        </StatusPill>
      }
    >
      <div className="flex flex-col gap-4">
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
    </SettingsSection>
  )
}
