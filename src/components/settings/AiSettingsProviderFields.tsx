'use client'

import { isSavedModelMissing } from '@/utils/settings'
import { AiApiKeyField } from './AiApiKeyField'
import { AI_PROVIDERS } from './aiProviders'
import { AiSettingsActions } from './AiSettingsActions'
import type { AiSettingsProviderFieldsProps } from './AiSettingsProviderFieldsProps'
import { ModelCombobox } from './ModelCombobox'

/** The key, model and action controls shown once a provider is chosen. */
export function AiSettingsProviderFields({
  form,
  apiKeyMasked,
  isConfigured,
  saveStatus,
  models,
  isLoadingModels,
  modelsError,
  onApiKeyChange,
  onModelChange,
  onSave,
  onClear,
}: AiSettingsProviderFieldsProps) {
  const isSaving = saveStatus === 'loading' || saveStatus === 'validating'

  return (
    <>
      <AiApiKeyField
        value={form.apiKey}
        apiKeyMasked={apiKeyMasked}
        providerPlaceholder={
          AI_PROVIDERS.find((p) => p.id === form.providerId)?.placeholder
        }
        onChange={onApiKeyChange}
      />
      <ModelCombobox
        models={models}
        value={form.model}
        isLoading={isLoadingModels}
        error={modelsError}
        savedModelMissing={isSavedModelMissing(form.model, models)}
        onChange={onModelChange}
      />
      <AiSettingsActions
        saveStatus={saveStatus}
        isSaving={isSaving}
        isConfigured={isConfigured}
        canSave={form.apiKey.trim() !== '' || isConfigured}
        onSave={() => {
          void onSave()
        }}
        onClear={() => {
          void onClear()
        }}
      />
    </>
  )
}
