'use client'

import { useAiSettings, useProviderModels } from '@/hooks/settings'
import { m as motion } from 'framer-motion'
import { AiApiKeyField } from './AiApiKeyField'
import { AI_PROVIDERS } from './aiProviders'
import { AiProviderSelect } from './AiProviderSelect'
import { AiSettingsActions } from './AiSettingsActions'
import { AiSettingsHeader } from './AiSettingsHeader'
import { AiSettingsMessage } from './AiSettingsMessage'
import type { AiSettingsSectionProps } from './AiSettingsSectionProps'
import { ModelCombobox } from './ModelCombobox'

export function AiSettingsSection({
  apiKey,
}: Readonly<AiSettingsSectionProps>) {
  const {
    form,
    apiKeyMasked,
    isConfigured,
    saveStatus,
    message,
    handleProviderChange,
    handleApiKeyChange,
    handleModelChange,
    handleSave,
    handleClear,
  } = useAiSettings(apiKey)

  const {
    models,
    isLoading: isLoadingModels,
    error: modelsError,
  } = useProviderModels(apiKey, form.providerId, form.apiKey)

  const isSaving = saveStatus === 'loading' || saveStatus === 'validating'
  const savedModelMissing =
    form.model !== '' &&
    models.length > 0 &&
    !models.some((m) => m.id === form.model)

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
          onChange={handleProviderChange}
        />

        {form.providerId != null && (
          <>
            <AiApiKeyField
              value={form.apiKey}
              apiKeyMasked={apiKeyMasked}
              providerPlaceholder={
                AI_PROVIDERS.find((p) => p.id === form.providerId)?.placeholder
              }
              onChange={handleApiKeyChange}
            />
            <ModelCombobox
              models={models}
              value={form.model}
              isLoading={isLoadingModels}
              error={modelsError}
              savedModelMissing={savedModelMissing}
              onChange={handleModelChange}
            />
            <AiSettingsActions
              saveStatus={saveStatus}
              isSaving={isSaving}
              isConfigured={isConfigured}
              canSave={form.apiKey.trim() !== '' || isConfigured}
              onSave={() => {
                void handleSave()
              }}
              onClear={() => {
                void handleClear()
              }}
            />
          </>
        )}

        <AiSettingsMessage message={message} saveStatus={saveStatus} />
      </div>
    </motion.section>
  )
}
